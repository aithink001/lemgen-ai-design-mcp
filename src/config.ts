import os from 'node:os';
import path from 'node:path';

export interface LemgenConfig {
  apiBaseUrl: string;
  apiToken?: string;
  outputDir: string;
  videoOutputDir: string;
  preferencesPath: string;
}

function cleanBaseUrl(value: string | undefined) {
  return (value || 'https://lemgen.org').replace(/\/+$/, '');
}

export function loadConfig(): LemgenConfig {
  const home = os.homedir();
  const configDir = path.join(home, '.lemgen');
  return {
    apiBaseUrl: cleanBaseUrl(process.env.LEMGEN_API_BASE_URL),
    apiToken: process.env.LEMGEN_API_TOKEN,
    outputDir:
      process.env.LEMGEN_OUTPUT_DIR || path.join(home, 'Pictures', 'lemgen'),
    videoOutputDir:
      process.env.LEMGEN_VIDEO_OUTPUT_DIR ||
      path.join(home, 'Movies', 'lemgen'),
    preferencesPath:
      process.env.LEMGEN_PREFERENCES_PATH ||
      path.join(configDir, 'preferences.json'),
  };
}
