import type { ApiEnvelope, LemgenGeneration } from '../types.js';
import type { LemgenConfig } from '../config.js';
import type { PromptLanguage } from './prompt-enhancer.js';

export class LemgenApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LemgenApiError';
  }
}

export class LemgenApiClient {
  constructor(private readonly config: LemgenConfig) {}

  private headers() {
    const headers: Record<string, string> = {
      'content-type': 'application/json',
    };
    if (this.config.apiToken) {
      headers.authorization = `Bearer ${this.config.apiToken}`;
    }
    return headers;
  }

  private async request<T>(path: string, init: RequestInit = {}) {
    const response = await fetch(`${this.config.apiBaseUrl}${path}`, {
      ...init,
      headers: {
        ...this.headers(),
        ...(init.headers as Record<string, string> | undefined),
      },
    });
    const text = await response.text();
    let payload: ApiEnvelope<T> | undefined;
    try {
      payload = text ? (JSON.parse(text) as ApiEnvelope<T>) : undefined;
    } catch {
      throw new LemgenApiError(`LemGen returned non-JSON response (${response.status})`);
    }
    if (!response.ok || !payload || payload.code !== 0) {
      throw new LemgenApiError(payload?.message || `LemGen request failed (${response.status})`);
    }
    return payload.data;
  }

  async createGeneration(params: {
    prompt: string;
    promptId?: string;
    mediaType?: 'image' | 'video';
    model?: string;
    quality?: string;
    aspectRatio?: string;
    resolution?: string;
    duration?: number;
    tier?: string;
    referenceImages?: string[];
    referenceVideos?: string[];
  }) {
    if (!this.config.apiToken) {
      throw new LemgenApiError(
        'No LemGen API token configured. Set LEMGEN_API_TOKEN to an API key from https://lemgen.org.'
      );
    }
    return this.request<LemgenGeneration>('/api/lemgen/generations', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getGeneration(id: string) {
    if (!this.config.apiToken) {
      throw new LemgenApiError('No LemGen API token configured.');
    }
    return this.request<LemgenGeneration>(
      `/api/lemgen/generations/${encodeURIComponent(id)}`
    );
  }

  async promptTool(params: {
    action: 'translate' | 'improve' | 'polish';
    text: string;
    targetLanguage?: PromptLanguage;
    mediaType?: 'image' | 'video';
    model?: string;
    aspectRatio?: string;
    resolution?: string;
    referenceImageCount?: number;
  }) {
    if (!this.config.apiToken) {
      throw new LemgenApiError('No LemGen API token configured.');
    }
    return this.request<{ text: string }>('/api/lemgen/prompt-tools', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }
}
