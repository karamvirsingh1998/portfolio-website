import * as React from 'react';
import { cn } from '@/lib/cn';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  hint?: boolean;
};

export function Label({ className, hint, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        hint
          ? 'mb-2 block text-xs text-gray-500'
          : 'mb-2 block text-sm font-medium text-gray-200',
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}

export function FieldLabel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('mb-1.5 text-xs font-medium text-gray-500', className)} {...props}>
      {children}
    </p>
  );
}
