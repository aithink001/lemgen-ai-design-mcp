<h1 align="center">LemGen AI Design MCP</h1>

<p align="center">
  <strong>Turn Claude Code, Cursor, Codex, Windsurf, Roo Code, and OpenClaw into a visual creative assistant.</strong>
  <br>
  <sub>4,533 curated AI image/video prompts · GPT Image · Nano Banana · Seedance · Midjourney · prompt enhancement · local preferences · LemGen generation tools</sub>
</p>

<p align="center">
  <a href="https://github.com/aithink001/lemgen-ai-design-mcp/actions"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/aithink001/lemgen-ai-design-mcp/validate.yml?branch=main&style=flat-square"></a>
  <a href="https://github.com/aithink001/lemgen-ai-design-mcp"><img alt="MCP" src="https://img.shields.io/badge/MCP-Server-blue?style=flat-square"></a>
  <a href="https://lemgen.org"><img alt="LemGen" src="https://img.shields.io/badge/Powered%20by-LemGen-111?style=flat-square"></a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square"></a>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> ·
  <a href="#what-you-can-do">Tools</a> ·
  <a href="#prompt-library">Prompt Library</a> ·
  <a href="#client-setup">Client Setup</a> ·
  <a href="README.zh-CN.md">中文</a>
</p>

---

## Why This Exists

Most AI coding agents are good at writing text and code, but weak at visual
creative work. LemGen MCP gives them a visual toolkit:

- Search a real prompt gallery before inventing prompts from scratch.
- Pull full prompts, images, model metadata, and source links into the agent context.
- Expand rough ideas into production-grade prompts.
- Generate images or videos through LemGen when the user approves the final prompt.
- Keep all exploratory tools free and local-friendly; only generation needs a token.

The result is a cleaner workflow: browse inspiration, craft the direction, then
generate without leaving your agent.

## See The Library

<p align="center">
  <a href="https://lemgen.org/prompt/2071424170383364525"><img src="https://lemgen.org/lemgen/api-image-tweets-2071424170383364525-0-1adbcf3d.jpg" width="24%" alt="Editorial lifestyle prompt"></a>
  <a href="https://lemgen.org/prompt/2068374577009275026"><img src="https://lemgen.org/lemgen/api-image-tweets-2068374577009275026-0-e7c26ef1.jpg" width="24%" alt="Logo prompt"></a>
  <a href="https://lemgen.org/prompt/community_86e7eecf-8940-4616-95bc-8e99f26beafa"><img src="https://lemgen.org/lemgen/api-image-generations-2026-06-community_86e7eecf-8940-4616-95bc-8e99f26beafa-09a9aa30.png" width="24%" alt="Midjourney prompt"></a>
  <a href="https://lemgen.org/prompt/cdanceai-seedance-seedance-2-0-15-second-cinematic-japanese-romance-short-film"><img src="https://cdn.lemgen.org/uploads/seedance-2-0/seedance-2-0-15-second-cinematic-japanese-romance-short-film/cover-be8dfe1fb4.jpg" width="24%" alt="Seedance video prompt"></a>
</p>

## Quick Start

Free inspiration tools work without any API key:

```json
{
  "mcpServers": {
    "lemgen": {
      "command": "npx",
      "args": ["-y", "lemgen@latest"]
    }
  }
}
```

To enable `generate_image` and `generate_video`, create an API key at
https://lemgen.org and add it to your MCP config:

```json
{
  "mcpServers": {
    "lemgen": {
      "command": "npx",
      "args": ["-y", "lemgen@latest"],
      "env": {
        "LEMGEN_API_TOKEN": "sk_your_key_here"
      }
    }
  }
}
```

During local development, run from this repository:

```bash
pnpm install
pnpm build
node bin/lemgen-mcp.js
```

## What You Can Do

| Tool | Free | What it does | When to use it |
| --- | --- | --- | --- |
| `search_gallery` | Yes | Searches 4,533 curated prompts with preview media and source links. | The user wants ideas, examples, style references, or prompt recipes. |
| `get_inspiration` | Yes | Returns the full prompt, images/video, model, tags, stats, and LemGen URL. | The user picked an item from search results. |
| `enhance_prompt` | Yes | Turns a rough idea into a detailed image/video prompt. | The user says something short like "luxury perfume ad". |
| `list_models` | Yes | Lists supported image/video models, ratios, resolutions, and reference limits. | The user asks which model to use. |
| `prompt_tools` | Yes | Translates, polishes, or improves prompts. | The user already has a prompt but wants it cleaner. |
| `manage_preferences` | Yes | Stores local style, model, ratio, and favorite prompt preferences. | The user says "remember this style". |
| `generate_image` | Token | Submits an image generation job to LemGen. | The user approved a final image prompt. |
| `generate_video` | Token | Submits a video generation job to LemGen. | The user explicitly confirmed video generation. |

## Example Workflows

### 1. Find A Visual Direction

User:

> Find product photography inspiration for a matte black perfume bottle.

Agent:

1. Calls `search_gallery(query="matte black perfume product photography")`.
2. Shows preview URLs and prompt IDs.
3. Calls `get_inspiration(id=...)` when the user picks one.
4. Adapts the prompt for the user's product.

### 2. Improve A Weak Prompt

User:

> Make a poster for a new AI design tool.

Agent:

1. Calls `enhance_prompt(idea="poster for a new AI design tool", style="poster")`.
2. Explains the visual direction.
3. Asks for approval before generation.

### 3. Generate An Image

User:

> Looks good, generate it in 16:9.

Agent:

1. Calls `generate_image(prompt=..., aspectRatio="16:9")`.
2. Returns the generation ID, status, and image URLs.
3. Does not invent a visual description it cannot verify.

### 4. Generate A Video

Video is slower and more expensive, so the agent should confirm first:

> This will create a LemGen video job. Continue?

After confirmation it calls `generate_video`.

## Prompt Library

This repository ships with `data/trending-prompts.json`.

Current snapshot:

| Type | Count |
| --- | ---: |
| Image prompts | 2,593 |
| Video prompts | 1,940 |
| Total | 4,533 |

Model coverage:

| Model | Count |
| --- | ---: |
| GPT Image | 1,935 |
| Seedance 2.0 | 1,940 |
| Nano Banana Pro | 489 |
| Midjourney | 104 |
| Other image models | 65 |

Each item includes:

```ts
type GalleryPrompt = {
  id: string;
  rank: number;
  title: string;
  prompt: string;
  author: string;
  model: string;
  categories: string[];
  image: string;
  images: string[];
  video_url?: string;
  media_type: "image" | "video";
  likes: number;
  views: number;
  source_url: string;
};
```

The companion data-only repository is:

https://github.com/aithink001/lemgen-trending-prompts

## Client Setup

### Claude Code Plugin

```bash
/plugin marketplace add aithink001/lemgen-ai-design-mcp
/plugin install lemgen@lemgen-marketplace
```

Restart Claude Code after installation.

### Cursor

Add this to your Cursor MCP config:

```json
{
  "mcpServers": {
    "lemgen": {
      "command": "npx",
      "args": ["-y", "lemgen@latest"],
      "env": {
        "LEMGEN_API_TOKEN": "sk_your_key_here"
      }
    }
  }
}
```

### Codex

```bash
codex mcp add lemgen -- npx -y lemgen@latest
```

For generation, add `LEMGEN_API_TOKEN` to the MCP server environment in your
Codex config.

### Windsurf / Roo Code / Cline

Use the same MCP server block:

```json
{
  "command": "npx",
  "args": ["-y", "lemgen@latest"],
  "env": {
    "LEMGEN_API_TOKEN": "sk_your_key_here"
  }
}
```

### OpenClaw

Use the included skill:

```txt
openclaw/SKILL.md
```

It defines the recommended workflow for inspiration search, prompt enhancement,
generation confirmation, and video safety.

## Environment Variables

| Variable | Default | Description |
| --- | --- | --- |
| `LEMGEN_API_BASE_URL` | `https://lemgen.org` | LemGen API host. |
| `LEMGEN_API_TOKEN` | none | Required for image/video generation. |
| `LEMGEN_OUTPUT_DIR` | `~/Pictures/lemgen` | Reserved for future CLI image saving. |
| `LEMGEN_VIDEO_OUTPUT_DIR` | `~/Movies/lemgen` | Reserved for future CLI video saving. |
| `LEMGEN_PREFERENCES_PATH` | `~/.lemgen/preferences.json` | Local preferences file. |

## Development

```bash
pnpm install
pnpm validate
pnpm inspect
```

Validation runs:

- TypeScript typecheck
- Build
- Brand scan
- MCP client smoke test

## Design Principles

- Free discovery first; generation second.
- Never generate expensive video without explicit confirmation.
- Return actual URLs and IDs; do not hallucinate what an image looks like.
- Keep prompt data source-linked to LemGen.
- Keep public docs and data clean of legacy or duplicate-brand signals.

## Roadmap

- Publish the `lemgen` npm package.
- Add a remote MCP endpoint at `https://mcp.lemgen.org/mcp`.
- Add richer semantic search over the prompt library.
- Add generated prompt packs for product photography, logos, portraits, posters, and video ads.
- Add one-shot CLI generation commands for shell and CI workflows.

## License

MIT
