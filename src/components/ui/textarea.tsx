import * as React from 'react'
import { cn } from '../../lib/cn'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[124px] w-full resize-y rounded-xl border border-[var(--color-border)]/90 bg-[var(--color-surface)] px-3.5 py-3 text-sm text-[var(--color-fg)] shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-all duration-200 placeholder:text-[var(--color-fg-muted)] placeholder:opacity-90 hover:border-[var(--color-border-strong)]/90 focus-visible:border-[var(--color-secondary)] focus-visible:ring-[3px] focus-visible:ring-[var(--color-ring)]/14 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-[var(--color-surface-muted)] disabled:text-[var(--color-fg-muted)] disabled:opacity-70 aria-[invalid=true]:border-red-300 aria-[invalid=true]:focus-visible:border-red-400 aria-[invalid=true]:focus-visible:ring-red-200/80',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
