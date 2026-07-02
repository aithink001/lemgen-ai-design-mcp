# LemGen AI Design MCP

Claude Code, Cursor, Codex, Windsurf, Roo Code, OpenClaw 같은 MCP 호스트에서 사용할 수 있는 AI 이미지/비디오 제작 MCP 서버입니다.

- 큐레이션된 이미지/비디오 프롬프트 4,533개
- 18개 언어 프롬프트 번역 및 개선
- GPT Image, Nano Banana, Seedance, Midjourney 프롬프트 라이브러리
- LemGen API 기반 이미지/비디오 생성

## Quick Start

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

이미지/비디오 생성을 사용하려면 `LEMGEN_API_TOKEN` 이 필요합니다.

[English README](../../README.md) · [Languages](../languages.md)

