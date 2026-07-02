<h1 align="center">
  LemGen AI Design MCP
</h1>

<p align="center">
  <strong>A visual creation MCP for Claude Code, Cursor, Codex, Windsurf, Roo Code, OpenClaw, and any MCP-compatible agent.</strong>
  <br>
  <sub>4,533 curated AI image/video prompts · 18 prompt languages · GPT Image · Nano Banana · Seedance · Midjourney · LemGen generation API</sub>
</p>

<p align="center">
  <a href="https://github.com/aithink001/lemgen-ai-design-mcp/actions"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/aithink001/lemgen-ai-design-mcp/validate.yml?branch=main&style=flat-square"></a>
  <img alt="MCP Server" src="https://img.shields.io/badge/Type-MCP_Server-blue?style=flat-square">
  <img alt="Languages" src="https://img.shields.io/badge/Prompt_languages-18-111?style=flat-square">
  <a href="https://lemgen.org"><img alt="LemGen" src="https://img.shields.io/badge/Powered_by-LemGen-111?style=flat-square"></a>
  <a href="LICENSE"><img alt="MIT" src="https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square"></a>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> ·
  <a href="#features">Features</a> ·
  <a href="#language-support">Languages</a> ·
  <a href="#client-setup">Clients</a> ·
  <a href="https://clawhub.ai/skills/lemgen-ai-design">OpenClaw Skill</a> ·
  <a href="#prompt-library">Prompt Library</a>
</p>

<p align="center">
  <strong>English</strong> |
  <a href="README.zh-CN.md">中文</a> |
  <a href="docs/i18n/README.ja.md">日本語</a> |
  <a href="docs/i18n/README.ko.md">한국어</a> |
  <a href="docs/i18n/README.es.md">Español</a> |
  <a href="docs/i18n/README.fr.md">Français</a> |
  <a href="docs/i18n/README.de.md">Deutsch</a> |
  <a href="docs/i18n/README.pt.md">Português</a>
</p>

---

## What Is This?

LemGen AI Design MCP turns an AI coding agent into a practical visual creative
assistant. Instead of asking the agent to invent prompts from nothing, it gives
the agent a searchable prompt library, prompt enhancement tools, model metadata,
local preferences, and optional image/video generation through LemGen.

Use it when you want your agent to:

- find visual references before writing a prompt;
- inspect full prompt examples with images, videos, model names, tags, and source links;
- translate, polish, or improve prompts across multiple languages;
- expand rough ideas into production-ready image or video prompts;
- generate images or videos only after the user approves the final prompt.

Free tools work without an API key. Generation tools require
`LEMGEN_API_TOKEN` from [LemGen](https://lemgen.org).

## Preview

<p align="center">
  <a href="https://lemgen.org/prompt/2071424170383364525"><img src="https://lemgen.org/lemgen/api-image-tweets-2071424170383364525-0-1adbcf3d.jpg" width="24%" alt="Editorial lifestyle prompt"></a>
  <a href="https://lemgen.org/prompt/2068374577009275026"><img src="https://lemgen.org/lemgen/api-image-tweets-2068374577009275026-0-e7c26ef1.jpg" width="24%" alt="Logo prompt"></a>
  <a href="https://lemgen.org/prompt/community_86e7eecf-8940-4616-95bc-8e99f26beafa"><img src="https://lemgen.org/lemgen/api-image-generations-2026-06-community_86e7eecf-8940-4616-95bc-8e99f26beafa-09a9aa30.png" width="24%" alt="Midjourney prompt"></a>
  <a href="https://lemgen.org/prompt/cdanceai-seedance-seedance-2-0-15-second-cinematic-japanese-romance-short-film"><img src="https://cdn.lemgen.org/uploads/seedance-2-0/seedance-2-0-15-second-cinematic-japanese-romance-short-film/cover-be8dfe1fb4.jpg" width="24%" alt="Seedance video prompt"></a>
</p>

## Quick Start

Install directly from GitHub today:

```json
{
  "mcpServers": {
    "lemgen": {
      "command": "npx",
      "args": ["-y", "github:aithink001/lemgen-ai-design-mcp"]
    }
  }
}
```

Enable generation by adding your LemGen token:

```json
{
  "mcpServers": {
    "lemgen": {
      "command": "npx",
      "args": ["-y", "github:aithink001/lemgen-ai-design-mcp"],
      "env": {
        "LEMGEN_API_TOKEN": "sk_your_key_here"
      }
    }
  }
}
```

After the npm package is published, the same server can be installed with:

```bash
npx -y lemgen@latest
```

## Features

| Capability | Tool | Free | What the agent gets |
| --- | --- | --- | --- |
| Prompt search | `search_gallery` | Yes | Ranked image/video prompt results with preview media and LemGen links. |
| Full inspiration | `get_inspiration` | Yes | Complete prompt, model, tags, author, stats, images/videos, and source URL. |
| Prompt expansion | `enhance_prompt` | Yes | A structured production prompt from a rough visual idea. |
| Model guidance | `list_models` | Yes | Supported models, media type, ratios, resolutions, reference limits, and strengths. |
| Prompt translation | `prompt_tools` | Yes | Translation, polish, and improvement workflows for image/video prompts. |
| Local memory | `manage_preferences` | Yes | Style, model, ratio, resolution, and favorite prompt IDs stored locally. |
| Image generation | `generate_image` | Token | LemGen image generation job with status and result URLs. |
| Video generation | `generate_video` | Token | LemGen video generation job; agents are instructed to ask before calling it. |

## Language Support

LemGen MCP is built for multilingual creative teams. Agent replies should follow
the user's language, while model names and API parameters stay in English.

`prompt_tools.targetLanguage` supports:

| Code | Language | Code | Language | Code | Language |
| --- | --- | --- | --- | --- | --- |
| `en` | English | `zh` | Chinese | `ja` | Japanese |
| `ko` | Korean | `es` | Spanish | `fr` | French |
| `de` | German | `pt` | Portuguese | `it` | Italian |
| `nl` | Dutch | `ru` | Russian | `ar` | Arabic |
| `hi` | Hindi | `id` | Indonesian | `vi` | Vietnamese |
| `th` | Thai | `tr` | Turkish | `pl` | Polish |

Examples:

```json
{ "action": "translate", "targetLanguage": "ja", "mediaType": "image" }
```

```json
{ "action": "polish", "mediaType": "video" }
```

More setup notes are in [docs/clients.md](docs/clients.md) and
[docs/languages.md](docs/languages.md).

## Client Setup

### Claude Code

Install from this GitHub repository:

```bash
/plugin marketplace add aithink001/lemgen-ai-design-mcp
/plugin install lemgen@lemgen-marketplace
```

Restart Claude Code after installation.

### Cursor

Add to Cursor MCP config:

```json
{
  "mcpServers": {
    "lemgen": {
      "command": "npx",
      "args": ["-y", "github:aithink001/lemgen-ai-design-mcp"],
      "env": {
        "LEMGEN_API_TOKEN": "sk_your_key_here"
      }
    }
  }
}
```

### Codex

```bash
codex mcp add lemgen -- npx -y github:aithink001/lemgen-ai-design-mcp
```

For generation, add `LEMGEN_API_TOKEN` to the MCP server environment in your
Codex config.

### Windsurf / Roo Code / Cline

Use the same MCP server block:

```json
{
  "command": "npx",
  "args": ["-y", "github:aithink001/lemgen-ai-design-mcp"],
  "env": {
    "LEMGEN_API_TOKEN": "sk_your_key_here"
  }
}
```

### OpenClaw

Install from ClawHub:

```bash
clawhub install lemgen-ai-design
```

Skill page:

```txt
https://clawhub.ai/skills/lemgen-ai-design
```

The source skill is included in this repository:

```txt
openclaw/SKILL.md
```

It defines the recommended workflow for inspiration search, prompt enhancement,
generation confirmation, and video safety.

## Prompt Library

This repository ships with `data/trending-prompts.json`, exported from LemGen.

| Type | Count |
| --- | ---: |
| Image prompts | 2,593 |
| Video prompts | 1,940 |
| Total | 4,533 |

| Model | Count |
| --- | ---: |
| GPT Image | 1,935 |
| Seedance 2.0 | 1,940 |
| Nano Banana Pro | 489 |
| Midjourney | 104 |
| Other image models | 65 |

Schema:

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

Data-only repository:

https://github.com/aithink001/lemgen-trending-prompts

## Development

```bash
pnpm install
pnpm validate
pnpm inspect
```

`pnpm validate` runs TypeScript, build, brand scan, and an MCP smoke test.

## Environment Variables

| Variable | Default | Description |
| --- | --- | --- |
| `LEMGEN_API_BASE_URL` | `https://lemgen.org` | LemGen API host. |
| `LEMGEN_API_TOKEN` | none | Required for image/video generation. |
| `LEMGEN_OUTPUT_DIR` | `~/Pictures/lemgen` | Reserved for future CLI image saving. |
| `LEMGEN_VIDEO_OUTPUT_DIR` | `~/Movies/lemgen` | Reserved for future CLI video saving. |
| `LEMGEN_PREFERENCES_PATH` | `~/.lemgen/preferences.json` | Local preferences file. |

## Principles

- Search and inspiration are free; generation is opt-in.
- Video generation requires explicit confirmation.
- Responses return real IDs and URLs, not guessed visual descriptions.
- Public data is source-linked to LemGen.
- Documentation and package metadata stay clean of duplicate-brand signals.

## Roadmap

- Publish the `lemgen` npm package.
- Add a hosted remote MCP endpoint.
- Add semantic search over the prompt library.
- Add focused prompt packs for product photography, logos, portraits, posters, and video ads.
- Add one-shot CLI generation commands for shell and CI workflows.

## License

MIT
