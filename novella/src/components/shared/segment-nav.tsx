import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface SegmentNavItem<T extends string> {
  id: T;
  label: string;
  icon?: LucideIcon;
  badge?: number;
}

interface SegmentNavProps<T extends string> {
  items: SegmentNavItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentNav<T extends string>({
  items,
  value,
  onChange,
  className,
}: SegmentNavProps<T>) {
  return (
    <nav className={cn('flex gap-1 rounded-full bg-white/[0.04] p-1', className)}>
      {items.map((item) => {
        const Icon = item.icon;
        const active = value === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              active
                ? 'bg-white/[0.1] text-white'
                : 'text-gray-500 hover:text-gray-300',
            )}
          >
            {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
            {item.label}
            {item.badge != null && item.badge > 0 ? (
              <span className="ml-0.5 rounded-full bg-blue-500/80 px-1.5 py-px text-[10px] font-semibold text-white">
                {item.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}
