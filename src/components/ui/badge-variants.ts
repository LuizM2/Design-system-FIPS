import { cva, type VariantProps } from 'class-variance-authority'

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[var(--color-primary)]/10 text-[var(--color-primary)] dark:bg-[rgba(147,189,228,0.14)] dark:text-[#93BDE4]',
        secondary:
          'border-transparent bg-[var(--color-surface-muted)] text-[var(--color-fg)]',
        success:
          'border-transparent bg-[var(--color-success)]/14 text-[var(--color-success-strong)] dark:bg-[rgba(0,198,76,0.14)] dark:text-[#8BE5AD]',
        warning:
          'border-transparent bg-[var(--color-badge-warning-bg)] text-[var(--color-accent-strong)] dark:text-[#FDC24E]',
        danger: 'border-transparent bg-[var(--color-badge-danger-bg)] text-[var(--color-danger)] dark:text-[#FCA5A5]',
        outline: 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg)]',
        info: 'border-transparent bg-[var(--color-fips-blue-200)]/65 text-[var(--color-primary)] dark:bg-[rgba(147,189,228,0.14)] dark:text-[#93BDE4]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariantProps = VariantProps<typeof badgeVariants>
