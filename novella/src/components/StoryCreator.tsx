import { useState } from 'react';
import { motion } from 'motion/react';
import { Wand2 } from 'lucide-react';
import type { AspectRatio, ArtStyle } from '@/types';
import {
  ART_STYLES,
  PLOT_PRESETS,
  FRAME_COUNT_OPTIONS,
  ASPECT_RATIO_OPTIONS,
} from '@/data';
import { Button, Card, Label, SelectTile, Textarea } from '@/components/ui';
import { cn } from '@/lib/cn';

interface StoryCreatorProps {
  onGenerate: (params: {
    premise: string;
    style: ArtStyle;
    aspectRatio: AspectRatio;
    numFrames: number;
  }) => void;
  isGenerating: boolean;
}

export default function StoryCreator({ onGenerate, isGenerating }: StoryCreatorProps) {
  const [premise, setPremise] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle>(ART_STYLES[0]);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('3:4');
  const [numFrames, setNumFrames] = useState(4);

  const charCount = premise.trim().length;
  const canGenerate = charCount > 10 && !isGenerating;

  const handleGenerate = () => {
    if (!canGenerate) return;
    onGenerate({ premise: premise.trim(), style: selectedStyle, aspectRatio, numFrames });
  };

  return (
    <Card className="overflow-hidden">
      <div className="space-y-8 p-6 sm:p-8">
        <section>
          <Label>What&apos;s your story about?</Label>
          <Textarea
            value={premise}
            onChange={(e) => setPremise(e.target.value)}
            placeholder="A lonely lighthouse keeper discovers messages in bottles from a civilization beneath the waves..."
            rows={4}
          />
          <p className="mt-2 text-xs text-gray-600">
            {charCount > 10 ? `${charCount} characters` : `${11 - charCount} more characters needed`}
          </p>
          <div className="mt-4">
            <Label hint>Or try a preset</Label>
            <div className="flex flex-wrap gap-2">
              {PLOT_PRESETS.map((preset) => (
                <Button
                  key={preset.id}
                  variant="pill"
                  size="sm"
                  onClick={() => setPremise(preset.premise)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.06] pt-8">
          <Label>Art style</Label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ART_STYLES.map((style) => (
              <SelectTile
                key={style.id}
                selected={selectedStyle.id === style.id}
                onClick={() => setSelectedStyle(style)}
                className="overflow-hidden text-left"
              >
                <div className="relative aspect-[4/3]">
                  <img src={style.previewUrl} alt={style.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <p className="absolute inset-x-0 bottom-0 p-2 text-xs font-medium text-white">
                    {style.name}
                  </p>
                </div>
              </SelectTile>
            ))}
          </div>
        </section>

        <section className="border-t border-white/[0.06] pt-8">
          <Label>Aspect ratio</Label>
          <div className="mb-6 grid grid-cols-4 gap-2">
            {ASPECT_RATIO_OPTIONS.map((opt) => (
              <SelectTile
                key={opt.value}
                selected={aspectRatio === opt.value}
                onClick={() => setAspectRatio(opt.value)}
                className="flex flex-col items-center gap-2 py-4"
              >
                <div
                  className={cn(
                    'border border-gray-500',
                    opt.value === '3:4' ? 'h-9 w-6' :
                    opt.value === '4:3' ? 'h-6 w-9' :
                    opt.value === '16:9' ? 'h-4 w-9' : 'h-7 w-7',
                  )}
                />
                <span className="text-xs font-medium text-gray-300">{opt.label}</span>
              </SelectTile>
            ))}
          </div>

          <Label>Number of panels</Label>
          <div className="grid grid-cols-5 gap-2">
            {FRAME_COUNT_OPTIONS.map((opt) => (
              <SelectTile
                key={opt.count}
                selected={numFrames === opt.count}
                onClick={() => setNumFrames(opt.count)}
                className="flex flex-col items-center py-4"
              >
                <span className="text-xl font-semibold text-white">{opt.count}</span>
                <span className="mt-0.5 text-[10px] text-gray-500">{opt.label}</span>
              </SelectTile>
            ))}
          </div>
        </section>
      </div>

      <div className="flex justify-end border-t border-white/[0.06] px-6 py-4 sm:px-8">
        <Button variant="primary" size="lg" onClick={handleGenerate} disabled={!canGenerate}>
          <Wand2 className="h-4 w-4" />
          Generate Story
        </Button>
      </div>
    </Card>
  );
}
