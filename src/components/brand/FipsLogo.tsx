import { cn } from '../../lib/cn'

/**
 * Logotipo oficial FIPS extraído do Brandbook (PDF), versões:
 * - branca: fundos escuros (sidebar)
 * - primária: ícone cinza + wordmark azul em fundos claros
 *
 * Arquivos em `public/brand/`. Para atualizar, exporte novamente do manual ou substitua os PNGs.
 */
const BRAND = {
  lockupWhite: '/brand/fips-lockup-white.png',
  lockupPrimary: '/brand/fips-lockup-primary.png',
  symbolWhite: '/brand/fips-symbol-white.png',
  symbolOnLight: '/brand/fips-symbol-only.png',
} as const

export function FipsLogo({
  className,
  variant = 'horizontal',
  inverted = true,
}: {
  className?: string
  variant?: 'horizontal' | 'symbol'
  /** Fundo escuro (sidebar) = arte branca do manual; fundo claro = versão primária */
  inverted?: boolean
}) {
  const lockup = inverted ? BRAND.lockupWhite : BRAND.lockupPrimary
  const symbol = inverted ? BRAND.symbolWhite : BRAND.symbolOnLight

  return (
    <div className={cn('min-w-0', className)}>
      <span className="sr-only">
        Design System FIPS — Ferrovia Interna do Porto de Santos
      </span>
      {variant === 'symbol' ? (
        <img
          src={symbol}
          alt=""
          className="mx-auto block h-9 w-9 object-contain object-center"
          width={36}
          height={36}
          decoding="async"
        />
      ) : (
        <img
          src={lockup}
          alt=""
          className="block h-10 w-auto max-w-[min(100%,220px)] object-contain object-left"
          height={40}
          width={220}
          decoding="async"
        />
      )}
    </div>
  )
}
