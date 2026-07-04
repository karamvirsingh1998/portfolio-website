import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'nv-surface flex flex-col items-center px-8 py-16 text-center',
        className,
      )}
    >
      <Icon className="mb-4 h-8 w-8 text-gray-600" strokeWidth={1.5} />
      <p className="font-display text-base font-medium text-gray-300">{title}</p>
      <p className="mt-1.5 max-w-xs text-sm text-gray-600">{description}</p>
    </div>
  );
}
