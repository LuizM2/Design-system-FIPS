import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'

export type UserChipProps = {
  compact?: boolean
  /** shell — Application Shell; docHeader — header DocLayout (sidebar FIPS); docs — tema claro */
  variant?: 'shell' | 'docHeader' | 'docs'
  className?: string
}

/** Altura alinhada ao SearchPill / DSInput: 35px desktop, 30px compact (tablet no shell). */
export function UserChip({ compact = false, variant = 'docs', className }: UserChipProps) {
  const layout = cn(
    'flex items-center rounded-full border-[1.5px]',
    compact ? 'h-[30px] gap-1.5 px-2' : 'h-[35px] gap-2 px-2.5',
  )
  const shellClassicSkin =
    'border-white/[0.12] bg-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm'
  const docHeaderSkin =
    'border-white/[0.16] bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm'
  const docsSkin =
    'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg)] shadow-[0_1px_2px_rgba(3,15,40,0.06)]'

  const shellSkin = variant === 'docHeader' ? docHeaderSkin : shellClassicSkin

  return (
    <div
      className={cn(layout, variant === 'docs' ? docsSkin : shellSkin, className)}
      aria-label="Conta do usuário (demonstração)"
    >
      <span
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full font-semibold',
          compact ? 'h-6 w-6 text-[11px]' : 'h-7 w-7 text-[12px]',
          variant === 'docs' ? 'bg-[var(--color-secondary)] text-white' : 'bg-white text-[var(--color-primary)]',
        )}
      >
        AF
      </span>
      {!compact ? (
        <span
          className={cn(
            'truncate font-sans text-[13px] leading-none',
            variant === 'docs' ? 'text-[var(--color-fg)]' : 'text-white/[0.82]',
          )}
        >
          Usuário
        </span>
      ) : null}
      <ChevronDown
        className={cn(
          'shrink-0',
          compact ? 'h-3 w-3' : 'h-3.5 w-3.5',
          variant === 'docs' ? 'text-[var(--color-fg-muted)]' : 'text-white/[0.65]',
        )}
        aria-hidden
      />
    </div>
  )
}
