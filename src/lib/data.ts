import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { GalleryPrompt, MediaType, PromptSearchResult } from '../types.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(dirname, '..', '..');
const dataPath = path.join(packageRoot, 'data', 'trending-prompts.json');

let cache: GalleryPrompt[] | undefined;

function normalize(value: string | undefined) {
  return (value || '').toLowerCase();
}

function asText(item: GalleryPrompt) {
  return [
    item.title,
    item.prompt,
    item.author,
    item.author_name,
    item.handle,
    item.model,
    ...(item.categories || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export function loadPromptLibrary(): GalleryPrompt[] {
  if (cache) return cache;
  try {
    const raw = fs.readFileSync(dataPath, 'utf8');
    const parsed = JSON.parse(raw);
    cache = Array.isArray(parsed) ? parsed : [];
  } catch {
    cache = [];
  }
  return cache;
}

export function searchPromptLibrary(params: {
  query?: string;
  category?: string;
  model?: string;
  mediaType?: MediaType | 'all';
  sort?: 'featured' | 'latest' | 'likes';
  limit?: number;
}): PromptSearchResult {
  const query = normalize(params.query);
  const category = normalize(params.category);
  const model = normalize(params.model);
  const mediaType = params.mediaType || 'all';
  const limit = Math.min(Math.max(params.limit || 10, 1), 50);

  let items = loadPromptLibrary().filter((item) => {
    if (mediaType !== 'all' && (item.media_type || 'image') !== mediaType) {
      return false;
    }
    if (model && !normalize(item.model).includes(model)) return false;
    if (
      category &&
      !(item.categories || []).some((name) => normalize(name).includes(category))
    ) {
      return false;
    }
    if (query && !asText(item).includes(query)) return false;
    return true;
  });

  if (params.sort === 'latest') {
    items = items.sort(
      (a, b) => Date.parse(b.date || '') - Date.parse(a.date || '')
    );
  } else if (params.sort === 'likes') {
    items = items.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  } else {
    items = items.sort((a, b) => (b.score || 0) - (a.score || 0));
  }

  return { items: items.slice(0, limit), total: items.length };
}

export function getPromptById(id: string) {
  return loadPromptLibrary().find((item) => item.id === id);
}

export function summarizePrompt(item: GalleryPrompt) {
  return {
    id: item.id,
    title: item.title || item.prompt.slice(0, 80),
    model: item.model,
    mediaType: item.media_type || 'image',
    categories: item.categories || [],
    likes: item.likes || 0,
    preview: item.image || item.images?.[0],
    sourceUrl: item.source_url,
    prompt: item.prompt.length > 420 ? `${item.prompt.slice(0, 420)}...` : item.prompt,
  };
}
