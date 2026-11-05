import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

function Badge({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="badge"
      className={cn(
        'inline-flex w-fit shrink-0 items-center rounded-md border bg-secondary px-2 py-0.5 text-xs font-medium whitespace-nowrap text-secondary-foreground',
        className
      )}
      {...props}
    />
  );
}

export { Badge };
