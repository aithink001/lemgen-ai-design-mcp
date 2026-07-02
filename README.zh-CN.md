<h1 align="center">
  LemGen AI Design MCP
</h1>

<p align="center">
  <strong>让 Claude Code、Cursor、Codex、Windsurf、Roo Code、OpenClaw 和所有 MCP Agent 拥有视觉创作能力。</strong>
  <br>
  <sub>4,533 条精选图片/视频提示词 · 18 种提示词语言 · GPT Image · Nano Banana · Seedance · Midjourney · LemGen 生成 API</sub>
</p>

<p align="center">
  <a href="https://github.com/aithink001/lemgen-ai-design-mcp/actions"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/aithink001/lemgen-ai-design-mcp/validate.yml?branch=main&style=flat-square"></a>
  <img alt="MCP Server" src="https://img.shields.io/badge/Type-MCP_Server-blue?style=flat-square">
  <img alt="Languages" src="https://img.shields.io/badge/Prompt_languages-18-111?style=flat-square">
  <a href="https://lemgen.org"><img alt="LemGen" src="https://img.shields.io/badge/Powered_by-LemGen-111?style=flat-square"></a>
  <a href="LICENSE"><img alt="MIT" src="https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square"></a>
</p>

<p align="center">
  <a href="#快速开始">快速开始</a> ·
  <a href="#功能">功能</a> ·
  <a href="#语言支持">语言支持</a> ·
  <a href="#客户端配置">客户端</a> ·
  <a href="https://clawhub.ai/skills/lemgen-ai-design">OpenClaw Skill</a> ·
  <a href="#提示词库">提示词库</a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <strong>中文</strong> |
  <a href="docs/i18n/README.ja.md">日本語</a> |
  <a href="docs/i18n/README.ko.md">한국어</a> |
  <a href="docs/i18n/README.es.md">Español</a> |
  <a href="docs/i18n/README.fr.md">Français</a> |
  <a href="docs/i18n/README.de.md">Deutsch</a> |
  <a href="docs/i18n/README.pt.md">Português</a>
</p>

---

## 这是什么？

LemGen AI Design MCP 会把 AI 编程 Agent 变成一个可实际使用的视觉创意助手。它不是让 Agent 凭空编提示词，而是给 Agent 一套完整工具：可搜索的提示词库、提示词增强、多语言提示词处理、模型信息、本地偏好，以及可选的 LemGen 图片/视频生成能力。

适合让 Agent 完成：

- 写 prompt 前先查真实视觉参考；
- 查看完整 prompt、预览图、视频、模型、标签和来源链接；
- 在多种语言之间翻译、润色、改写提示词；
- 把一句粗略想法扩写成可生成的图片或视频 prompt；
- 用户确认最终 prompt 后，再调用 LemGen 生成图片或视频。

搜索、灵感、增强、模型列表和本地偏好都是免费工具，不需要 API Key。生成图片/视频需要在 [LemGen](https://lemgen.org) 获取 `LEMGEN_API_TOKEN`。

## 预览

<p align="center">
  <a href="https://lemgen.org/prompt/2071424170383364525"><img src="https://lemgen.org/lemgen/api-image-tweets-2071424170383364525-0-1adbcf3d.jpg" width="24%" alt="Editorial lifestyle prompt"></a>
  <a href="https://lemgen.org/prompt/2068374577009275026"><img src="https://lemgen.org/lemgen/api-image-tweets-2068374577009275026-0-e7c26ef1.jpg" width="24%" alt="Logo prompt"></a>
  <a href="https://lemgen.org/prompt/community_86e7eecf-8940-4616-95bc-8e99f26beafa"><img src="https://lemgen.org/lemgen/api-image-generations-2026-06-community_86e7eecf-8940-4616-95bc-8e99f26beafa-09a9aa30.png" width="24%" alt="Midjourney prompt"></a>
  <a href="https://lemgen.org/prompt/cdanceai-seedance-seedance-2-0-15-second-cinematic-japanese-romance-short-film"><img src="https://cdn.lemgen.org/uploads/seedance-2-0/seedance-2-0-15-second-cinematic-japanese-romance-short-film/cover-be8dfe1fb4.jpg" width="24%" alt="Seedance video prompt"></a>
</p>

## 快速开始

现在可以直接从 GitHub 安装：

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

如果要开启生成能力，加入 LemGen Token：

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

npm 包发布后，也可以改成：

```bash
npx -y lemgen@latest
```

## 功能

| 能力 | 工具 | 免费 | Agent 能拿到什么 |
| --- | --- | --- | --- |
| 提示词搜索 | `search_gallery` | 是 | 带预览图/视频和 LemGen 来源链接的提示词结果。 |
| 完整灵感 | `get_inspiration` | 是 | 完整 prompt、模型、标签、作者、热度、图片/视频、来源 URL。 |
| 提示词扩写 | `enhance_prompt` | 是 | 从一句粗略想法扩写出结构化专业 prompt。 |
| 模型参考 | `list_models` | 是 | 模型、媒体类型、比例、分辨率、参考图限制和适用场景。 |
| 多语言处理 | `prompt_tools` | 是 | 翻译、润色、改写图片/视频 prompt。 |
| 本地偏好 | `manage_preferences` | 是 | 本地保存风格、模型、比例、分辨率和收藏 prompt。 |
| 图片生成 | `generate_image` | 需 Token | 创建 LemGen 图片生成任务并返回状态和结果 URL。 |
| 视频生成 | `generate_video` | 需 Token | 创建 LemGen 视频生成任务；Agent 会先要求用户确认。 |

## 语言支持

LemGen MCP 面向多语言创作团队。Agent 回复应该跟随用户语言，模型名和 API 参数保持英文。

`prompt_tools.targetLanguage` 支持：

| Code | 语言 | Code | 语言 | Code | 语言 |
| --- | --- | --- | --- | --- | --- |
| `en` | English | `zh` | Chinese | `ja` | Japanese |
| `ko` | Korean | `es` | Spanish | `fr` | French |
| `de` | German | `pt` | Portuguese | `it` | Italian |
| `nl` | Dutch | `ru` | Russian | `ar` | Arabic |
| `hi` | Hindi | `id` | Indonesian | `vi` | Vietnamese |
| `th` | Thai | `tr` | Turkish | `pl` | Polish |

示例：

```json
{ "action": "translate", "targetLanguage": "ja", "mediaType": "image" }
```

```json
{ "action": "polish", "mediaType": "video" }
```

更多说明见 [docs/clients.md](docs/clients.md) 和
[docs/languages.md](docs/languages.md)。

## 客户端配置

### Claude Code

从这个 GitHub 仓库安装：

```bash
/plugin marketplace add aithink001/lemgen-ai-design-mcp
/plugin install lemgen@lemgen-marketplace
```

安装后重启 Claude Code。

### Cursor

加入 Cursor MCP 配置：

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

如果要生成图片/视频，在 Codex 的 MCP server 环境变量里加入 `LEMGEN_API_TOKEN`。

### Windsurf / Roo Code / Cline

使用同一段 MCP 配置：

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

从 ClawHub 安装：

```bash
clawhub install lemgen-ai-design
```

Skill 页面：

```txt
https://clawhub.ai/skills/lemgen-ai-design
```

本仓库同时保留源文件：

```txt
openclaw/SKILL.md
```

它定义了推荐工作流：先找灵感、再增强 prompt、确认后生成，视频必须单独确认。

## 提示词库

本仓库内置 `data/trending-prompts.json`，由 LemGen 导出。

| 类型 | 数量 |
| --- | ---: |
| 图片 prompt | 2,593 |
| 视频 prompt | 1,940 |
| 总计 | 4,533 |

| 模型 | 数量 |
| --- | ---: |
| GPT Image | 1,935 |
| Seedance 2.0 | 1,940 |
| Nano Banana Pro | 489 |
| Midjourney | 104 |
| 其他图片模型 | 65 |

Schema：

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

## 开发

```bash
pnpm install
pnpm validate
pnpm inspect
```

`pnpm validate` 会执行 TypeScript、构建、品牌扫描和 MCP smoke test。

## 环境变量

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `LEMGEN_API_BASE_URL` | `https://lemgen.org` | LemGen API 地址。 |
| `LEMGEN_API_TOKEN` | 无 | 图片/视频生成需要。 |
| `LEMGEN_OUTPUT_DIR` | `~/Pictures/lemgen` | 预留给后续 CLI 图片保存。 |
| `LEMGEN_VIDEO_OUTPUT_DIR` | `~/Movies/lemgen` | 预留给后续 CLI 视频保存。 |
| `LEMGEN_PREFERENCES_PATH` | `~/.lemgen/preferences.json` | 本地偏好文件。 |

## 原则

- 搜索和灵感免费，生成能力按需开启。
- 视频生成必须先获得用户明确确认。
- 返回真实 ID 和 URL，不编造没验证过的画面描述。
- 公开数据都链接回 LemGen。
- 文档和包信息保持品牌干净，避免重复品牌信号。

## Roadmap

- 发布 `lemgen` npm 包。
- 增加 hosted remote MCP endpoint。
- 为提示词库增加语义搜索。
- 增加产品摄影、Logo、人物、海报、视频广告等 prompt packs。
- 增加面向 shell/CI 的一键生成 CLI。

## License

MIT
