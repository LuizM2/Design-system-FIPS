import { cva, type VariantProps } from 'class-variance-authority'

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
        secondary:
          'border-transparent bg-[var(--color-surface-muted)] text-[var(--color-fg)]',
        success:
          'border-transparent bg-[var(--color-success)]/14 text-[var(--color-success-strong)]',
        warning:
          'border-transparent bg-[var(--color-fips-orange-100)] text-[var(--color-accent-strong)]',
        danger: 'border-transparent bg-[var(--color-fips-red-100)] text-[var(--color-danger)]',
        outline: 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg)]',
        info: 'border-transparent bg-[var(--color-fips-blue-200)]/65 text-[var(--color-primary)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariantProps = VariantProps<typeof badgeVariants>
