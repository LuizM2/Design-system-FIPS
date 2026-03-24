import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  leftIcon?: React.ReactNode
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, leftIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon ? (
          <span className="pointer-events-none absolute top-1/2 left-3.5 z-10 -translate-y-1/2 text-[var(--color-fg-muted)]">
            {leftIcon}
          </span>
        ) : null}
        <select
          ref={ref}
          className={cn(
            'h-11 w-full appearance-none rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] pr-11 pl-4 text-sm text-[var(--color-fg)] shadow-[var(--shadow-field)] transition-all duration-200 hover:border-[var(--color-border-strong)] focus-visible:border-[var(--color-secondary)] focus-visible:ring-4 focus-visible:ring-[var(--color-ring)]/14 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-[var(--color-surface-muted)] disabled:text-[var(--color-fg-muted)] disabled:opacity-70 aria-[invalid=true]:border-red-300 aria-[invalid=true]:focus-visible:border-red-400 aria-[invalid=true]:focus-visible:ring-red-200/80',
            leftIcon && 'pl-11',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-[var(--color-fg-muted)]"
          aria-hidden
        />
      </div>
    )
  },
)
Select.displayName = 'Select'

export { Select }
