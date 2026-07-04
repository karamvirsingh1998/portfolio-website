import { cn } from '@/lib/cn';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  label: string;
}

interface StepProgressProps {
  steps: Step[];
  current: number;
  className?: string;
}

export function StepProgress({ steps, current, className }: StepProgressProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={step.id} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold transition-colors',
                  done && 'bg-blue-600 text-white',
                  active && 'bg-blue-600 text-white',
                  !done && !active && 'bg-white/[0.06] text-gray-500',
                )}
              >
                {done ? <Check className="h-3 w-3" /> : i + 1}
              </div>
              <span
                className={cn(
                  'hidden text-xs font-medium sm:inline',
                  active ? 'text-white' : done ? 'text-gray-400' : 'text-gray-600',
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  'h-px flex-1',
                  done ? 'bg-blue-600/40' : 'bg-white/[0.06]',
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
