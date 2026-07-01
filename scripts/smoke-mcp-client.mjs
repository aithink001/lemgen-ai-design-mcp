import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const expectedTools = [
  'search_gallery',
  'get_inspiration',
  'enhance_prompt',
  'list_models',
  'prompt_tools',
  'manage_preferences',
  'generate_image',
  'generate_video',
];

const client = new Client({ name: 'lemgen-smoke', version: '0.1.0' });
const transport = new StdioClientTransport({
  command: 'node',
  args: ['bin/lemgen-mcp.js'],
  cwd: process.cwd(),
});

try {
  await client.connect(transport);
  const tools = await client.listTools();
  const names = tools.tools.map((tool) => tool.name);
  const missing = expectedTools.filter((name) => !names.includes(name));
  if (missing.length) {
    throw new Error(`Missing tools: ${missing.join(', ')}`);
  }

  const result = await client.callTool({
    name: 'search_gallery',
    arguments: { query: 'product photography', limit: 2 },
  });
  const text = result.content?.[0]?.text || '';
  if (!text.includes('sourceUrl') && !text.includes('source_url')) {
    throw new Error('search_gallery smoke response did not include source URLs');
  }

  console.log(`MCP smoke passed: ${names.join(', ')}`);
} finally {
  await client.close();
}
