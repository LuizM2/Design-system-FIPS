import { Search } from 'lucide-react'
import { cn } from '../../lib/cn'

export type SearchPillProps = {
  compact?: boolean
  /**
   * shell — demo Application Shell (vidro original).
   * docHeader — header do DocLayout (alinhado ao sidebar FIPS).
   * docs — superfície clara.
   */
  variant?: 'shell' | 'docHeader' | 'docs'
  placeholder?: string
  className?: string
  'aria-label'?: string
}

export function SearchPill({
  compact = false,
  variant = 'docs',
  placeholder,
  className,
  'aria-label': ariaLabel,
}: SearchPillProps) {
  /**
   * Mesmas medidas do `DSInput` em InputDoc (sizeMap desktop / compact):
   * desktop: h 35px, font 13px, gap 8px, padding 0 12px, raio 8px, borda 1.5px, ícone 16px.
   * compact: h 30px, font 12px.
   */
  const shellClassic =
    'items-center rounded-lg border-[1.5px] border-white/[0.16] bg-white/[0.1] text-white/[0.72] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm'
  const docHeaderSkin =
    'items-center rounded-lg border-[1.5px] border-white/[0.16] bg-white/[0.08] text-white/[0.75] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm'
  const docs =
    'items-center rounded-lg border-[1.5px] border-[var(--color-border)]/60 bg-[var(--color-surface)] text-[var(--color-fg-muted)] shadow-sm'

  const defaultPlaceholder = variant === 'shell' ? 'Buscar...' : 'Buscar na documentação…'
  const ph = placeholder ?? defaultPlaceholder

  const layoutShell = compact
    ? 'sm:flex h-[30px] w-full max-w-[210px] gap-2 px-3'
    : 'md:flex h-[35px] w-full max-w-xs gap-2 px-3'
  const layoutDocs = 'md:flex h-[35px] w-full max-w-xs gap-2 px-3'

  const darkSkin = variant === 'docHeader' ? docHeaderSkin : shellClassic
  const isDarkVariant = variant === 'shell' || variant === 'docHeader'

  return (
    <div
      role="search"
      aria-label={ariaLabel ?? 'Buscar'}
      className={cn(
        'hidden',
        isDarkVariant ? darkSkin : docs,
        isDarkVariant ? layoutShell : layoutDocs,
        className,
      )}
    >
      <Search
        className={cn(
          'h-4 w-4 shrink-0',
          isDarkVariant ? 'text-white/[0.65]' : 'text-[var(--color-fg-muted)]',
        )}
        aria-hidden
      />
      <span
        className={cn(
          'min-w-0 truncate font-sans',
          compact ? 'text-[12px] leading-none' : 'text-[13px] leading-normal',
        )}
      >
        {ph}
      </span>
    </div>
  )
}
