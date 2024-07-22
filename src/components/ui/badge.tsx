import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        dong: 'border-transparent bg-green-100 text-green-800 hover:bg-green-200',
        mo: 'border-transparent bg-grey-100 text-grey-800 hover:bg-grey-200',
        exercise:
          'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200',
        friend:
          'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        study:
          'border-transparent bg-purple-100 text-purple-800 hover:bg-purple-200',
        last: 'border-transparent bg-red-200 text-red-900 hover:bg-red-300',
      },
    },
    defaultVariants: {
      variant: 'dong',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
