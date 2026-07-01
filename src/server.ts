import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadConfig } from './config.js';
import { LemgenApiClient } from './lib/api.js';
import { getPromptById, searchPromptLibrary, summarizePrompt } from './lib/data.js';
import { LEMGEN_MODELS } from './lib/models.js';
import { enhancePrompt, promptTool } from './lib/prompt-enhancer.js';
import {
  addFavoritePrompt,
  getPreferences,
  removeFavoritePrompt,
  setPreferences,
} from './lib/preferences.js';

const SERVER_INSTRUCTIONS = `You are LemGen MCP, a visual creation assistant for AI image and video work.

Rules:
1. Use search_gallery and get_inspiration for inspiration before generation when the user is exploring.
2. Use enhance_prompt for short ideas; show the improved prompt before generating.
3. Do not describe generated images or videos unless the tool response contains that description.
4. Reply in the user's language. Keep model parameter names in English.
5. Never start video generation or batches above one item without user confirmation.
6. Free tools work without a token. generate_image and generate_video require LEMGEN_API_TOKEN from https://lemgen.org.
7. Prefer LemGen source links when sharing inspiration.`;

function text(content: unknown) {
  return {
    content: [
      {
        type: 'text' as const,
        text:
          typeof content === 'string' ? content : JSON.stringify(content, null, 2),
      },
    ],
  };
}

async function pollGeneration(
  client: LemgenApiClient,
  id: string,
  timeoutSeconds: number
) {
  const deadline = Date.now() + timeoutSeconds * 1000;
  let current = await client.getGeneration(id);
  while (
    Date.now() < deadline &&
    !['completed', 'success', 'failed', 'error'].includes(
      current.status.toLowerCase()
    )
  ) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    current = await client.getGeneration(id);
  }
  return current;
}

export function createServer() {
  const config = loadConfig();
  const client = new LemgenApiClient(config);
  const server = new McpServer(
    { name: 'lemgen', version: '0.1.0' },
    {
      instructions: SERVER_INSTRUCTIONS,
      capabilities: {
        tools: {},
      },
    }
  );

  server.tool(
    'search_gallery',
    'Search the LemGen curated AI image/video prompt library. Results include preview URLs and LemGen source links. Free, no API key required.',
    {
      query: z.string().optional().describe('Keywords or natural language idea.'),
      category: z.string().optional().describe('Category/tag filter, such as product, portrait, poster, Seedance.'),
      model: z.string().optional().describe('Model filter, such as GPT Image, Nano Banana, Seedance, Midjourney.'),
      mediaType: z.enum(['all', 'image', 'video']).optional().default('all'),
      sort: z.enum(['featured', 'latest', 'likes']).optional().default('featured'),
      limit: z.number().min(1).max(50).optional().default(10),
    },
    { readOnlyHint: true },
    async (params) => {
      const result = searchPromptLibrary(params);
      return text({
        total: result.total,
        items: result.items.map(summarizePrompt),
      });
    }
  );

  server.tool(
    'get_inspiration',
    'Get the full prompt, preview media, metadata, and LemGen source link for one gallery entry. Free, no API key required.',
    {
      id: z.string().describe('Prompt id from search_gallery.'),
    },
    { readOnlyHint: true },
    async ({ id }) => {
      const item = getPromptById(id);
      if (!item) return text(`No LemGen inspiration found for id: ${id}`);
      return text(item);
    }
  );

  server.tool(
    'enhance_prompt',
    'Turn a short idea into a professional image/video prompt. Free, local, no API key required.',
    {
      idea: z.string().min(1).describe('Short idea or rough prompt.'),
      style: z.string().optional().describe('realistic, product, cinematic, anime, poster, minimal, or a custom style phrase.'),
      mediaType: z.enum(['image', 'video']).optional().default('image'),
      aspectRatio: z.string().optional().describe('Optional ratio such as 1:1, 16:9, 9:16, or auto.'),
      referenceCount: z.number().int().min(0).max(10).optional().default(0),
    },
    { readOnlyHint: true },
    async (params) => text(enhancePrompt(params))
  );

  server.tool(
    'list_models',
    'List LemGen image and video models with strengths, ratios, resolutions, and reference limits. Free, no API key required.',
    {
      mediaType: z.enum(['all', 'image', 'video']).optional().default('all'),
    },
    { readOnlyHint: true },
    async ({ mediaType }) =>
      text(
        mediaType === 'all'
          ? LEMGEN_MODELS
          : LEMGEN_MODELS.filter((model) => model.mediaType === mediaType)
      )
  );

  server.tool(
    'prompt_tools',
    'Translate, polish, or improve an AI image/video prompt. Free locally; if LEMGEN_API_TOKEN is configured, the LemGen prompt tool may be used by callers separately.',
    {
      action: z.enum(['translate', 'improve', 'polish']),
      text: z.string().min(1),
      targetLanguage: z.enum(['zh', 'en']).optional().default('en'),
      mediaType: z.enum(['image', 'video']).optional().default('image'),
    },
    { readOnlyHint: true },
    async (params) => text(promptTool(params))
  );

  server.tool(
    'manage_preferences',
    'Read or update local LemGen preferences for style, model, aspect ratio, resolution, and favorite prompt ids. Free, local, no API key required.',
    {
      action: z.enum(['get', 'set', 'add_favorite', 'remove_favorite']),
      style: z.string().optional(),
      styleNotes: z.string().optional(),
      model: z.string().optional(),
      aspectRatio: z.string().optional(),
      resolution: z.string().optional(),
      promptId: z.string().optional(),
    },
    { readOnlyHint: false },
    async ({ action, promptId, ...patch }) => {
      if (action === 'get') return text(await getPreferences(config));
      if (action === 'add_favorite') {
        if (!promptId) return text('promptId is required for add_favorite.');
        return text(await addFavoritePrompt(config, promptId));
      }
      if (action === 'remove_favorite') {
        if (!promptId) return text('promptId is required for remove_favorite.');
        return text(await removeFavoritePrompt(config, promptId));
      }
      return text(await setPreferences(config, patch));
    }
  );

  server.tool(
    'generate_image',
    'Generate an AI image with LemGen. Requires LEMGEN_API_TOKEN. Use after the user approves a final prompt.',
    {
      prompt: z.string().min(1),
      promptId: z.string().optional(),
      model: z.string().optional().describe('Optional model name. Omit for LemGen default unless user asked for one.'),
      aspectRatio: z.string().optional().default('自动'),
      quality: z.string().optional().default('标准'),
      resolution: z.string().optional().default('2K'),
      referenceImages: z.array(z.string()).optional().default([]),
      wait: z.boolean().optional().default(true),
      timeoutSeconds: z.number().int().min(10).max(300).optional().default(120),
    },
    { readOnlyHint: false },
    async ({ wait, timeoutSeconds, ...params }) => {
      const created = await client.createGeneration({
        ...params,
        mediaType: 'image',
        model: params.model || 'GPT Image 2',
      });
      const result = wait
        ? await pollGeneration(client, created.id, timeoutSeconds)
        : created;
      return text({
        generationId: result.id,
        status: result.status,
        imageUrls: result.resultImages || [],
        prompt: result.prompt,
        model: result.model,
        lemgenUrl: `${config.apiBaseUrl}/`,
      });
    }
  );

  server.tool(
    'generate_video',
    'Generate an AI video with LemGen. Requires LEMGEN_API_TOKEN. Videos are slow and should only be called after explicit user confirmation.',
    {
      prompt: z.string().min(1),
      promptId: z.string().optional(),
      model: z.string().optional().default('Seedance'),
      aspectRatio: z.string().optional().default('自动'),
      resolution: z.string().optional().default('720p'),
      duration: z.number().int().min(1).max(15).optional().default(5),
      tier: z.string().optional(),
      referenceImages: z.array(z.string()).optional().default([]),
      referenceVideos: z.array(z.string()).optional().default([]),
      wait: z.boolean().optional().default(true),
      timeoutSeconds: z.number().int().min(30).max(900).optional().default(420),
    },
    { readOnlyHint: false },
    async ({ wait, timeoutSeconds, ...params }) => {
      const created = await client.createGeneration({
        ...params,
        mediaType: 'video',
        quality: '标准',
      });
      const result = wait
        ? await pollGeneration(client, created.id, timeoutSeconds)
        : created;
      return text({
        generationId: result.id,
        status: result.status,
        videoUrls: result.resultVideos || [],
        prompt: result.prompt,
        model: result.model,
        lemgenUrl: `${config.apiBaseUrl}/`,
      });
    }
  );

  return server;
}
