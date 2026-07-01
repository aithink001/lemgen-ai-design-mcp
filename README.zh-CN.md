# LemGen AI Design MCP

这是 LemGen 的开源 MCP Server，用于 AI 图片/视频创作：搜索精选提示词、
获取灵感详情、增强提示词，并通过 LemGen 生成图片或视频。

免费工具不需要 API Key。生成图片/视频需要在 https://lemgen.org 创建 API Key。

## 工具

| 工具 | 免费 | 用途 |
| --- | --- | --- |
| `search_gallery` | 是 | 搜索精选图片/视频提示词，返回预览图和来源链接。 |
| `get_inspiration` | 是 | 获取完整 prompt、媒体、模型和元数据。 |
| `enhance_prompt` | 是 | 把短想法扩写成专业提示词。 |
| `list_models` | 是 | 查看 LemGen 模型能力、比例、分辨率和参考图限制。 |
| `prompt_tools` | 是 | 翻译、润色、改写提示词。 |
| `manage_preferences` | 是 | 保存本地风格、模型和比例偏好。 |
| `generate_image` | 需 Key | 调用 LemGen 生成图片。 |
| `generate_video` | 需 Key | 调用 LemGen 生成视频。 |

## 安装

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

只使用搜索、灵感、提示词增强时，可以不配置 `LEMGEN_API_TOKEN`。

## Claude Code Plugin

```bash
/plugin marketplace add aithink001/lemgen-ai-design-mcp
/plugin install lemgen@lemgen-marketplace
```

安装后重启 Claude Code。

## 开发

```bash
pnpm install
pnpm build
pnpm inspect
```

## 许可证

MIT
