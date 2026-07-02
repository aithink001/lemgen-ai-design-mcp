# Client Setup

LemGen MCP works in any host that can start a stdio MCP server.

## Current Install Source

Until the npm package is published, use the GitHub package source:

```json
{
  "command": "npx",
  "args": ["-y", "github:aithink001/lemgen-ai-design-mcp"]
}
```

Generation tools require a token:

```json
{
  "command": "npx",
  "args": ["-y", "github:aithink001/lemgen-ai-design-mcp"],
  "env": {
    "LEMGEN_API_TOKEN": "sk_your_key_here"
  }
}
```

## Claude Code

```bash
/plugin marketplace add aithink001/lemgen-ai-design-mcp
/plugin install lemgen@lemgen-marketplace
```

Restart Claude Code after installation.

## Cursor

Add this to Cursor's MCP configuration:

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

## Codex

```bash
codex mcp add lemgen -- npx -y github:aithink001/lemgen-ai-design-mcp
```

Add `LEMGEN_API_TOKEN` in the MCP environment when you want image/video
generation.

## Windsurf / Roo Code / Cline

Use the same server command:

```json
{
  "command": "npx",
  "args": ["-y", "github:aithink001/lemgen-ai-design-mcp"]
}
```

## Local Development

```bash
pnpm install
pnpm build
node bin/lemgen-mcp.js
```

