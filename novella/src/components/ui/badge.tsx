import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/cn';

const badgeVariants = cva('inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium', {
  variants: {
    variant: {
      neutral: 'bg-white/[0.06] text-gray-400',
      accent: 'bg-blue-500/15 text-blue-400',
      soft: 'bg-blue-500/10 text-blue-400',
      pill: 'rounded-full bg-white/[0.06] px-3 py-1 text-xs text-gray-400',
      draft: 'bg-amber-500/10 text-amber-400',
      ready: 'bg-emerald-500/10 text-emerald-400',
      brand: 'bg-blue-500/10 text-blue-400',
      emerald: 'bg-emerald-500/15 text-emerald-400',
      purple: 'bg-purple-500/15 text-purple-400',
      red: 'bg-red-500/15 text-red-400',
      blue: 'bg-blue-500/15 text-blue-400',
      amber: 'bg-amber-500/15 text-amber-400',
    },
  },
  defaultVariants: { variant: 'neutral' },
});

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export function styleBadgeVariant(style: string): BadgeProps['variant'] {
  const lower = style.toLowerCase();
  if (lower.includes('cyberpunk') || lower.includes('neon')) return 'purple';
  if (lower.includes('comic')) return 'red';
  if (lower.includes('anime')) return 'blue';
  if (lower.includes('oil')) return 'amber';
  return 'emerald';
}
