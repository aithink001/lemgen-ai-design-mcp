# LemGen AI Design MCP

Open-source MCP server for AI image and video creation. Search a curated
LemGen prompt library, enhance rough ideas into production prompts, and generate
images or videos from Claude Code, Cursor, Codex, Windsurf, Roo Code, OpenClaw,
Hermes Agent, and any MCP-compatible host.

Free tools work without an API key. Generation tools require a LemGen API key
from https://lemgen.org.

## Features

| Tool | Free | Purpose |
| --- | --- | --- |
| `search_gallery` | Yes | Search curated image/video prompts with preview URLs. |
| `get_inspiration` | Yes | Fetch the full prompt, metadata, media, and source link. |
| `enhance_prompt` | Yes | Expand a short idea into a professional prompt. |
| `list_models` | Yes | Browse LemGen model capabilities. |
| `prompt_tools` | Yes | Translate, polish, or improve prompts. |
| `manage_preferences` | Yes | Store local style/model preferences. |
| `generate_image` | Token | Generate an image with LemGen. |
| `generate_video` | Token | Generate a video with LemGen. |

## Quick Start

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

To enable generation:

```json
{
  "mcpServers": {
    "lemgen": {
      "command": "npx",
      "args": ["-y", "lemgen@latest"],
      "env": {
        "LEMGEN_API_TOKEN": "sk_..."
      }
    }
  }
}
```

## Claude Code Plugin

```bash
/plugin marketplace add aithink001/lemgen-ai-design-mcp
/plugin install lemgen@lemgen-marketplace
```

Restart Claude Code after installation.

## Cursor / Codex / Windsurf / Roo Code

Add the MCP server to your host config:

```json
{
  "mcpServers": {
    "lemgen": {
      "command": "npx",
      "args": ["-y", "lemgen@latest"],
      "env": {
        "LEMGEN_API_TOKEN": "sk_..."
      }
    }
  }
}
```

## OpenClaw

Use `openclaw/SKILL.md` with the MCP config above, or install the packaged
plugin once published to your preferred OpenClaw bundle registry.

## Prompt Library

Prompt data lives in `data/trending-prompts.json` and can be refreshed from the
companion repository `lemgen-trending-prompts`.

Each item includes:

- `id`
- `prompt`
- `model`
- `categories`
- preview image/video URL
- engagement fields
- `source_url` linking back to LemGen

## Environment Variables

| Variable | Description |
| --- | --- |
| `LEMGEN_API_BASE_URL` | Defaults to `https://lemgen.org`. |
| `LEMGEN_API_TOKEN` | API key for generation tools. |
| `LEMGEN_OUTPUT_DIR` | Local image output directory for future CLI workflows. |
| `LEMGEN_VIDEO_OUTPUT_DIR` | Local video output directory for future CLI workflows. |
| `LEMGEN_PREFERENCES_PATH` | Local preferences JSON path. |

## Development

```bash
pnpm install
pnpm build
pnpm inspect
```

## License

MIT
