import * as React from 'react'
import { cn } from '../../lib/cn'
import { badgeVariants, type BadgeVariantProps } from './badge-variants'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, BadgeVariantProps {
  dot?: boolean
}

function Badge({ className, variant, dot = false, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot ? <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden /> : null}
      {children}
    </div>
  )
}

export { Badge }
