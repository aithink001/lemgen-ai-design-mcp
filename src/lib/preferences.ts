import fs from 'node:fs/promises';
import path from 'node:path';

import type { LemgenConfig } from '../config.js';

export interface LemgenPreferences {
  style?: string;
  styleNotes?: string;
  model?: string;
  aspectRatio?: string;
  resolution?: string;
  favoritePromptIds?: string[];
}

async function readJson(filePath: string) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch {
    return {};
  }
}

export async function getPreferences(config: LemgenConfig): Promise<LemgenPreferences> {
  return readJson(config.preferencesPath);
}

export async function setPreferences(
  config: LemgenConfig,
  patch: LemgenPreferences
) {
  const current = await getPreferences(config);
  const next = { ...current, ...patch };
  await fs.mkdir(path.dirname(config.preferencesPath), { recursive: true });
  await fs.writeFile(config.preferencesPath, `${JSON.stringify(next, null, 2)}\n`);
  return next;
}

export async function addFavoritePrompt(config: LemgenConfig, id: string) {
  const current = await getPreferences(config);
  const favoritePromptIds = Array.from(
    new Set([...(current.favoritePromptIds || []), id])
  );
  return setPreferences(config, { favoritePromptIds });
}

export async function removeFavoritePrompt(config: LemgenConfig, id: string) {
  const current = await getPreferences(config);
  return setPreferences(config, {
    favoritePromptIds: (current.favoritePromptIds || []).filter(
      (item) => item !== id
    ),
  });
}
