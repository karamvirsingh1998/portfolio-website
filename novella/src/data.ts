import type { ArtStyle } from './types';

export const ART_STYLES: ArtStyle[] = [
  {
    id: 'fantasy-watercolor',
    name: 'Fantasy Watercolor',
    description: 'Soft washes, dreamy pastels, and ethereal light',
    promptAddon:
      'Fantasy watercolor illustration style, soft pastel colors, delicate brush strokes, ethereal lighting, whimsical atmosphere, hand-painted texture',
    previewUrl:
      'https://images.unsplash.com/photo-1579783902610-f72ea533cedf?w=400&h=300&fit=crop',
    bgColor: 'from-blue-900/80 to-purple-900/80',
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    description: 'Electric hues, rain-slick streets, and neon glow',
    promptAddon:
      'Cyberpunk neon aesthetic, vibrant electric colors, rain-slick reflective surfaces, holographic glow, dystopian futuristic cityscape, high contrast lighting',
    previewUrl:
      'https://images.unsplash.com/photo-1550745165-9bc0b4b6836e?w=400&h=300&fit=crop',
    bgColor: 'from-purple-900/80 to-pink-900/80',
  },
  {
    id: 'retro-comic',
    name: 'Retro Comic Book',
    description: 'Bold ink lines, halftone dots, and pop art energy',
    promptAddon:
      'Retro comic book style, bold black ink outlines, halftone dot shading, vibrant primary colors, dynamic action poses, vintage pulp magazine aesthetic',
    previewUrl:
      'https://images.unsplash.com/photo-1612036782180-6f0b6cd8460a?w=400&h=300&fit=crop',
    bgColor: 'from-red-900/80 to-yellow-900/80',
  },
  {
    id: 'classic-oil',
    name: 'Classic Oil Painting',
    description: 'Rich textures, chiaroscuro, and Renaissance depth',
    promptAddon:
      'Classic oil painting style, rich impasto textures, chiaroscuro lighting, Renaissance composition, warm golden tones, museum-quality fine art',
    previewUrl:
      'https://images.unsplash.com/photo-1579783901580-d79362f1d588?w=400&h=300&fit=crop',
    bgColor: 'from-amber-900/80 to-orange-900/80',
  },
  {
    id: 'anime-studio',
    name: 'Anime / Manga Studio',
    description: 'Expressive eyes, cel-shaded color, and dynamic motion',
    promptAddon:
      'Anime manga studio style, expressive large eyes, cel-shaded coloring, dynamic speed lines, vibrant saturated palette, Japanese animation aesthetic',
    previewUrl:
      'https://images.unsplash.com/photo-1613376023733-0a73315d9a06?w=400&h=300&fit=crop',
    bgColor: 'from-blue-900/80 to-indigo-900/80',
  },
  {
    id: 'claymation',
    name: '3D Claymation / Pixar',
    description: 'Sculpted forms, warm lighting, and tactile charm',
    promptAddon:
      '3D claymation Pixar style, sculpted rounded forms, warm studio lighting, tactile clay texture, charming character design, cinematic depth of field',
    previewUrl:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    bgColor: 'from-orange-900/80 to-rose-900/80',
  },
  {
    id: 'pastel-chalk',
    name: 'Pastel Chalk Sketch',
    description: 'Soft chalk strokes on textured paper',
    promptAddon:
      'Pastel chalk sketch style, soft smudged strokes, textured paper background, gentle muted colors, hand-drawn illustration feel, artistic sketch quality',
    previewUrl:
      'https://images.unsplash.com/photo-1513364774238-30d67c0a0de0?w=400&h=300&fit=crop',
    bgColor: 'from-slate-700/80 to-stone-800/80',
  },
  {
    id: 'cinematic-photo',
    name: 'Cinematic Photo',
    description: 'Film-grade realism with dramatic lighting',
    promptAddon:
      'Cinematic photograph style, film-grade realism, dramatic volumetric lighting, shallow depth of field, anamorphic lens flare, movie still quality',
    previewUrl:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=300&fit=crop',
    bgColor: 'from-zinc-900/80 to-neutral-900/80',
  },
];

export const PLOT_PRESETS = [
  {
    id: 'lost-robot',
    label: 'The Lost Robot',
    premise:
      'A tiny clockwork robot awakens alone in an overgrown, moss-covered ancient forest and tries to find its creator.',
  },
  {
    id: 'neon-detective',
    label: 'Neon Detective',
    premise:
      'A weary cybernetic detective navigates rain-soaked neon alleys to solve the mystery of a missing AI consciousness.',
  },
  {
    id: 'clockmakers-secret',
    label: "The Clockmaker's Secret",
    premise:
      'An apprentice discovers their master\'s final invention — a pocket watch that can rewind moments in time, but each use costs a cherished memory.',
  },
  {
    id: 'cosmic-bakery',
    label: 'Cosmic Bakery',
    premise:
      'On a space station orbiting a dying star, a lonely baker crafts pastries infused with stardust that grant glimpses of distant worlds.',
  },
];

export const FRAME_COUNT_OPTIONS = [
  { count: 2, label: 'Intro & Outro' },
  { count: 3, label: 'Classic Act' },
  { count: 4, label: 'Story Strip' },
  { count: 5, label: 'Detailed' },
  { count: 6, label: 'Detailed' },
];

export const ASPECT_RATIO_OPTIONS: Array<{
  value: '3:4' | '4:3' | '16:9' | '1:1';
  label: string;
  sublabel: string;
}> = [
  { value: '3:4', label: '3:4', sublabel: 'Portrait' },
  { value: '4:3', label: '4:3', sublabel: 'Landscape' },
  { value: '16:9', label: '16:9', sublabel: 'Wide' },
  { value: '1:1', label: '1:1', sublabel: 'Square' },
];
