import * as React from 'react';
import { cn } from '@/lib/cn';

export function AlertBanner({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CodeBlock({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('rounded-lg bg-white/[0.03] p-3', className)} {...props}>
      {children}
    </div>
  );
}
