import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-ring)]/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-secondary)] text-white shadow-[var(--shadow-card)] hover:bg-[var(--color-secondary-hover)] hover:shadow-[var(--shadow-card-hover)] active:translate-y-px',
        secondary:
          'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg)] shadow-sm hover:bg-[var(--color-surface-soft)] hover:border-[var(--color-border-strong)]',
        outline:
          'border border-[var(--color-primary)]/20 bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary)]/6 hover:border-[var(--color-primary)]/35',
        ghost: 'text-[var(--color-primary)] hover:bg-[var(--color-primary)]/8',
        accent:
          'bg-[var(--color-accent-strong)] text-white shadow-[var(--shadow-card)] hover:bg-[var(--color-warning)]/90',
        inverseOutline:
          'border border-white/60 bg-white/[0.06] text-white hover:border-white/70 hover:bg-white/[0.12]',
        success:
          'bg-[var(--color-success)] text-white shadow-[var(--shadow-card)] hover:bg-[var(--color-success-strong)] hover:shadow-[var(--shadow-card-hover)] active:translate-y-px',
        danger: 'bg-[var(--color-danger)] text-white shadow-[var(--shadow-card)] hover:bg-red-700',
        link: 'text-[var(--color-primary)] underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-10 px-3.5 text-sm',
        md: 'h-11 px-4',
        lg: 'h-12 px-6 text-base',
        icon: 'h-11 w-11 p-0',
        iconSm: 'h-8 w-8 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
