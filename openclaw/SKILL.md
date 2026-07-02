---
name: lemgen-ai-design
description: Use LemGen MCP to search curated AI image/video prompts, enhance prompts, and generate images or videos with LemGen.
---

# LemGen AI Design Skill

Use this skill when the user wants AI image/video inspiration, prompt writing,
creative direction, or generation through LemGen.

## Workflow

1. For vague ideas, call `search_gallery` first and show preview URLs.
2. For short prompts, call `enhance_prompt` and ask for confirmation.
3. For a chosen gallery item, call `get_inspiration`.
4. For generation, call `generate_image` only after the user approves the prompt.
5. For video, always confirm because video jobs are slower and more expensive.

## Tools

- `search_gallery`: free prompt search.
- `get_inspiration`: full prompt and metadata.
- `enhance_prompt`: local prompt expansion.
- `list_models`: model capabilities.
- `prompt_tools`: translate, polish, improve.
- `manage_preferences`: local user preferences.
- `generate_image`: LemGen image generation, requires `LEMGEN_API_TOKEN`.
- `generate_video`: LemGen video generation, requires `LEMGEN_API_TOKEN`.

## Setup

```json
{
  "mcpServers": {
    "lemgen": {
      "command": "npx",
      "args": ["-y", "github:aithink001/lemgen-ai-design-mcp"],
      "env": {
        "LEMGEN_API_TOKEN": "sk_..."
      }
    }
  }
}
```

Create an API key at `https://lemgen.org`.
