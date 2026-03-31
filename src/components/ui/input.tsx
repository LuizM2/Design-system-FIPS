import * as React from 'react'
import { cn } from '../../lib/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', leftIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon ? (
          <span className="pointer-events-none absolute top-1/2 left-3.5 z-10 -translate-y-1/2 text-[var(--color-fg-muted)]">
            {leftIcon}
          </span>
        ) : null}
        <input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-xl border border-[var(--color-border)]/90 bg-[var(--color-surface)] px-3.5 py-2 text-sm text-[var(--color-fg)] shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-fg-muted)] placeholder:opacity-90 hover:border-[var(--color-border-strong)]/90 focus-visible:border-[var(--color-secondary)] focus-visible:ring-[3px] focus-visible:ring-[var(--color-ring)]/14 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-[var(--color-surface-muted)] disabled:text-[var(--color-fg-muted)] disabled:opacity-70 aria-[invalid=true]:border-red-300 aria-[invalid=true]:focus-visible:border-red-400 aria-[invalid=true]:focus-visible:ring-red-200/80',
            leftIcon && 'pl-10',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
