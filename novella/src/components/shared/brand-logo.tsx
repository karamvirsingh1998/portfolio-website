import { ArrowLeft, Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';

export function BrandLogo({ className }: { className?: string }) {
  return (
    <a href="/" className={cn('group flex items-center gap-2.5', className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
        <Sparkles className="h-4 w-4 text-white" />
      </div>
      <div className="leading-none">
        <p className="font-display text-[15px] font-semibold text-white">Novella</p>
        <p className="mt-0.5 text-[10px] text-gray-500 group-hover:text-gray-400">
          <ArrowLeft className="mr-0.5 inline h-2.5 w-2.5" />
          Portfolio
        </p>
      </div>
    </a>
  );
}
