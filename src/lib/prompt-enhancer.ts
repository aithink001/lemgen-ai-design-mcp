const STYLE_HINTS: Record<string, string> = {
  realistic:
    'photorealistic, natural lighting, believable materials, precise camera language',
  product:
    'premium product photography, clean composition, commercial lighting, polished brand details',
  cinematic:
    'cinematic lighting, strong atmosphere, lens depth, carefully staged composition',
  anime:
    'expressive anime illustration, clean linework, rich color design, character-focused composition',
  poster:
    'editorial poster design, strong hierarchy, readable layout, high-impact visual system',
  minimal:
    'minimal composition, restrained palette, generous negative space, refined details',
};

export function enhancePrompt(params: {
  idea: string;
  style?: string;
  mediaType?: 'image' | 'video';
  aspectRatio?: string;
  referenceCount?: number;
}) {
  const idea = params.idea.trim();
  const style = params.style || 'realistic';
  const styleHint = STYLE_HINTS[style] || style;
  const medium =
    params.mediaType === 'video'
      ? 'Create a short AI video prompt'
      : 'Create an AI image prompt';
  const motion =
    params.mediaType === 'video'
      ? '\nMotion: describe camera movement, subject motion, pacing, and ending frame.'
      : '';
  const references =
    params.referenceCount && params.referenceCount > 0
      ? `\nReference usage: preserve the main subject identity and visual cues from ${params.referenceCount} reference image(s).`
      : '';
  const ratio = params.aspectRatio ? `\nAspect ratio: ${params.aspectRatio}.` : '';

  return `${medium}: ${idea}

Visual direction: ${styleHint}.
Composition: define the hero subject clearly, use layered foreground/midground/background, and keep the focal point immediately readable.
Lighting: specify light source, contrast, color temperature, and mood.
Details: include materials, texture, environment, lens/perspective, color palette, and finishing quality.${motion}${references}${ratio}
Output: professional, high-resolution, production-ready.`;
}

export function promptTool(params: {
  action: 'translate' | 'improve' | 'polish';
  text: string;
  targetLanguage?: 'zh' | 'en';
  mediaType?: 'image' | 'video';
}) {
  const text = params.text.trim();
  if (params.action === 'translate') {
    const target = params.targetLanguage === 'zh' ? 'Chinese' : 'English';
    return `Translate the following AI ${params.mediaType || 'image'} prompt into ${target}, preserving model instructions, camera terms, aspect ratio, and formatting:\n\n${text}`;
  }
  if (params.action === 'polish') {
    return `Polish this AI ${params.mediaType || 'image'} prompt for clarity, stronger visual hierarchy, and cleaner model execution. Keep the original intent:\n\n${text}`;
  }
  return enhancePrompt({
    idea: text,
    mediaType: params.mediaType,
    style: 'product',
  });
}
