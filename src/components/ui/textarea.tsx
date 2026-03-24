import * as React from 'react'
import { cn } from '../../lib/cn'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[132px] w-full resize-y rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-fg)] shadow-[var(--shadow-field)] transition-all duration-200 placeholder:text-[var(--color-fg-muted)] hover:border-[var(--color-border-strong)] focus-visible:border-[var(--color-secondary)] focus-visible:ring-4 focus-visible:ring-[var(--color-ring)]/14 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-[var(--color-surface-muted)] disabled:text-[var(--color-fg-muted)] disabled:opacity-70 aria-[invalid=true]:border-red-300 aria-[invalid=true]:focus-visible:border-red-400 aria-[invalid=true]:focus-visible:ring-red-200/80',
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
