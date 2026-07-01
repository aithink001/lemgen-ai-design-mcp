export type MediaType = 'image' | 'video';

export interface GalleryPrompt {
  rank: number;
  id: string;
  prompt: string;
  title?: string;
  author?: string;
  author_name?: string;
  handle?: string;
  likes?: number;
  views?: number;
  image?: string;
  images?: string[];
  video_url?: string;
  media_type?: MediaType;
  model?: string;
  categories?: string[];
  rating?: number;
  score?: number;
  date?: string;
  source_url?: string;
}

export interface LemgenGeneration {
  id: string;
  prompt: string;
  mediaType?: MediaType;
  model: string;
  status: string;
  resultImages?: string[];
  resultVideos?: string[];
  createdAt?: string;
}

export interface ApiEnvelope<T> {
  code: number;
  message: string;
  data: T;
}

export interface PromptSearchResult {
  items: GalleryPrompt[];
  total: number;
}
