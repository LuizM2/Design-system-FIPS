import * as React from 'react'
import { cn } from '../../lib/cn'
import type { FieldDensity } from './field'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  density?: FieldDensity
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', leftIcon, density = 'default', ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon ? (
          <span
            className={cn(
              'pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 text-[var(--color-fg-muted)]',
              density === 'compact'
                ? 'left-3 [&_svg]:h-3.5 [&_svg]:w-3.5'
                : 'left-4 [&_svg]:h-4 [&_svg]:w-4',
            )}
          >
            {leftIcon}
          </span>
        ) : null}
        <input
          type={type}
          className={cn(
            'flex w-full rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)] text-[var(--color-fg)] transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-fg-muted)] placeholder:opacity-100 hover:border-[var(--color-border)]/80 focus-visible:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20 focus-visible:outline-none data-[state-preview=focused]:border-[var(--color-primary)] data-[state-preview=focused]:ring-2 data-[state-preview=focused]:ring-[var(--color-primary)]/20 data-[state-preview=focused]:outline-none disabled:cursor-not-allowed disabled:bg-[var(--color-surface-muted)] disabled:text-[var(--color-fg-muted)] disabled:opacity-70 aria-[invalid=true]:border-[var(--color-danger)]/70 aria-[invalid=true]:focus-visible:border-[var(--color-danger)] aria-[invalid=true]:focus-visible:ring-2 aria-[invalid=true]:focus-visible:ring-[var(--color-danger)]/20 aria-[invalid=true]:data-[state-preview=focused]:border-[var(--color-danger)] aria-[invalid=true]:data-[state-preview=focused]:ring-2 aria-[invalid=true]:data-[state-preview=focused]:ring-[var(--color-danger)]/20',
            density === 'compact'
              ? 'h-9 px-3 py-1.5 text-sm shadow-sm'
              : 'h-12 px-4 py-2 text-[1.08rem] shadow-sm',
            leftIcon && (density === 'compact' ? 'pl-9' : 'pl-11'),
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
