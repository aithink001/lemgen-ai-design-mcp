<h1 align="center">LemGen AI Design MCP</h1>

<p align="center">
  <strong>把 Claude Code、Cursor、Codex、Windsurf、Roo Code、OpenClaw 变成视觉创意助手。</strong>
  <br>
  <sub>4,533 条精选图片/视频提示词 · GPT Image · Nano Banana · Seedance · Midjourney · 提示词增强 · 本地偏好 · LemGen 生成工具</sub>
</p>

<p align="center">
  <a href="https://github.com/aithink001/lemgen-ai-design-mcp/actions"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/aithink001/lemgen-ai-design-mcp/validate.yml?branch=main&style=flat-square"></a>
  <a href="https://github.com/aithink001/lemgen-ai-design-mcp"><img alt="MCP" src="https://img.shields.io/badge/MCP-Server-blue?style=flat-square"></a>
  <a href="https://lemgen.org"><img alt="LemGen" src="https://img.shields.io/badge/Powered%20by-LemGen-111?style=flat-square"></a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square"></a>
</p>

<p align="center">
  <a href="#快速开始">快速开始</a> ·
  <a href="#工具能力">工具能力</a> ·
  <a href="#提示词库">提示词库</a> ·
  <a href="#客户端配置">客户端配置</a> ·
  <a href="README.md">English</a>
</p>

---

## 为什么做这个

大多数 AI 编程 Agent 很会写代码和文字，但做视觉创意时容易空想：没有参考图、没有真实 prompt、也不知道不同模型该怎么写。LemGen MCP 给它们补上视觉工具箱：

- 先搜索真实提示词库，而不是凭空编 prompt。
- 把完整 prompt、预览图、模型、标签、来源链接拉进上下文。
- 把一句粗略想法扩写成可生成的专业提示词。
- 用户确认后，通过 LemGen 生成图片或视频。
- 搜索、灵感、增强、模型列表全部免费；只有生成需要 API Key。

这套流程更适合实际创作：找灵感、定方向、写 prompt、确认后生成。

## 真实示例

<p align="center">
  <a href="https://lemgen.org/prompt/2071424170383364525"><img src="https://lemgen.org/lemgen/api-image-tweets-2071424170383364525-0-1adbcf3d.jpg" width="24%" alt="Editorial lifestyle prompt"></a>
  <a href="https://lemgen.org/prompt/2068374577009275026"><img src="https://lemgen.org/lemgen/api-image-tweets-2068374577009275026-0-e7c26ef1.jpg" width="24%" alt="Logo prompt"></a>
  <a href="https://lemgen.org/prompt/community_86e7eecf-8940-4616-95bc-8e99f26beafa"><img src="https://lemgen.org/lemgen/api-image-generations-2026-06-community_86e7eecf-8940-4616-95bc-8e99f26beafa-09a9aa30.png" width="24%" alt="Midjourney prompt"></a>
  <a href="https://lemgen.org/prompt/cdanceai-seedance-seedance-2-0-15-second-cinematic-japanese-romance-short-film"><img src="https://cdn.lemgen.org/uploads/seedance-2-0/seedance-2-0-15-second-cinematic-japanese-romance-short-film/cover-be8dfe1fb4.jpg" width="24%" alt="Seedance video prompt"></a>
</p>

## 快速开始

只用免费工具时不需要 API Key：

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

如果要生成图片或视频，在 https://lemgen.org 创建 API Key，然后配置：

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

本地开发：

```bash
pnpm install
pnpm build
node bin/lemgen-mcp.js
```

## 工具能力

| 工具 | 免费 | 做什么 | 适合场景 |
| --- | --- | --- | --- |
| `search_gallery` | 是 | 搜索 4,533 条精选 prompt，返回预览图和来源链接。 | 找灵感、找风格、找案例。 |
| `get_inspiration` | 是 | 获取完整 prompt、图片/视频、模型、标签和 LemGen 链接。 | 用户选中了某个搜索结果。 |
| `enhance_prompt` | 是 | 把一句短想法扩写成专业图片/视频 prompt。 | “做个香水广告”“科技海报”这类需求。 |
| `list_models` | 是 | 查看模型能力、比例、分辨率和参考图限制。 | 用户问该用什么模型。 |
| `prompt_tools` | 是 | 翻译、润色、改写 prompt。 | 用户已有 prompt，但想优化。 |
| `manage_preferences` | 是 | 保存本地风格、模型、比例、收藏偏好。 | 用户说“记住这个风格”。 |
| `generate_image` | 需 Key | 调用 LemGen 生成图片。 | 用户确认最终 prompt 后。 |
| `generate_video` | 需 Key | 调用 LemGen 生成视频。 | 用户明确确认视频生成后。 |

## 工作流示例

### 1. 找视觉方向

用户：

> 找一些黑色磨砂香水瓶的产品摄影灵感。

Agent：

1. 调用 `search_gallery(query="matte black perfume product photography")`
2. 展示预览图、模型、prompt id、来源链接
3. 用户选中后调用 `get_inspiration`
4. 基于参考 prompt 改写成用户自己的产品 prompt

### 2. 优化粗糙想法

用户：

> 给一个新的 AI 设计工具做海报。

Agent：

1. 调用 `enhance_prompt(idea="poster for a new AI design tool", style="poster")`
2. 解释视觉方向
3. 等用户确认后再生成

### 3. 生成图片

用户：

> 可以，按 16:9 生成。

Agent：

1. 调用 `generate_image(prompt=..., aspectRatio="16:9")`
2. 返回 generation id、状态、图片 URL
3. 不编造自己没看见的图片描述

### 4. 生成视频

视频更慢也更贵，Agent 必须先确认：

> 这会创建一个 LemGen 视频任务，要继续吗？

用户确认后再调用 `generate_video`。

## 提示词库

本仓库内置 `data/trending-prompts.json`。

当前快照：

| 类型 | 数量 |
| --- | ---: |
| 图片 prompt | 2,593 |
| 视频 prompt | 1,940 |
| 总计 | 4,533 |

模型覆盖：

| 模型 | 数量 |
| --- | ---: |
| GPT Image | 1,935 |
| Seedance 2.0 | 1,940 |
| Nano Banana Pro | 489 |
| Midjourney | 104 |
| 其他图片模型 | 65 |

数据字段：

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

纯数据仓库：

https://github.com/aithink001/lemgen-trending-prompts

## 客户端配置

### Claude Code Plugin

```bash
/plugin marketplace add aithink001/lemgen-ai-design-mcp
/plugin install lemgen@lemgen-marketplace
```

安装后重启 Claude Code。

### Cursor

把下面配置加入 Cursor MCP 配置：

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

如需生成能力，在 Codex MCP 配置里给该 server 添加 `LEMGEN_API_TOKEN`。

### Windsurf / Roo Code / Cline

使用同样的 MCP server 配置：

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

使用内置 skill：

```txt
openclaw/SKILL.md
```

它定义了推荐工作流：先找灵感、再增强 prompt、确认后生成，视频必须单独确认。

## 环境变量

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `LEMGEN_API_BASE_URL` | `https://lemgen.org` | LemGen API 地址。 |
| `LEMGEN_API_TOKEN` | 无 | 图片/视频生成需要。 |
| `LEMGEN_OUTPUT_DIR` | `~/Pictures/lemgen` | 预留给后续 CLI 图片保存。 |
| `LEMGEN_VIDEO_OUTPUT_DIR` | `~/Movies/lemgen` | 预留给后续 CLI 视频保存。 |
| `LEMGEN_PREFERENCES_PATH` | `~/.lemgen/preferences.json` | 本地偏好文件。 |

## 开发

```bash
pnpm install
pnpm validate
pnpm inspect
```

`validate` 会执行：

- TypeScript 类型检查
- 构建
- 品牌扫描
- MCP client smoke test

## 设计原则

- 免费发现优先，生成能力后置。
- 昂贵的视频任务必须先确认。
- 只返回真实 URL 和 ID，不编造图片内容。
- 所有 prompt 都链接回 LemGen 来源页。
- 公开文档和数据保持品牌干净。

## Roadmap

- 发布 `lemgen` npm 包。
- 增加 `https://mcp.lemgen.org/mcp` remote MCP。
- 增加更强的语义搜索。
- 做产品摄影、Logo、人物、海报、视频广告等 prompt packs。
- 增加面向 shell/CI 的一键生成 CLI。

## License

MIT
