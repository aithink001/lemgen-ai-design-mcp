# Language Support

LemGen MCP supports multilingual prompt workflows through `prompt_tools`.

The server follows two rules:

- Reply in the user's language.
- Keep model names, API parameters, and prompt control tokens in English unless the user explicitly asks otherwise.

## Supported `targetLanguage` Values

| Code | Language |
| --- | --- |
| `en` | English |
| `zh` | Chinese |
| `ja` | Japanese |
| `ko` | Korean |
| `es` | Spanish |
| `fr` | French |
| `de` | German |
| `pt` | Portuguese |
| `it` | Italian |
| `nl` | Dutch |
| `ru` | Russian |
| `ar` | Arabic |
| `hi` | Hindi |
| `id` | Indonesian |
| `vi` | Vietnamese |
| `th` | Thai |
| `tr` | Turkish |
| `pl` | Polish |

## Examples

Translate an image prompt into Japanese:

```json
{
  "action": "translate",
  "targetLanguage": "ja",
  "mediaType": "image",
  "text": "premium product photo of a matte black perfume bottle"
}
```

Polish a video prompt without changing language:

```json
{
  "action": "polish",
  "mediaType": "video",
  "text": "camera moves around a futuristic shoe in a neon studio"
}
```

