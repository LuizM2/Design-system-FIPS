import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

/** Arte de trem/fundo usada nos produtos FIPS (public/). */
export const PAGE_HERO_DEFAULT_DECORATION = '/backgrounds/app-shell-home-trains.png'

export type PageHeroProps = {
  children: ReactNode
  className?: string
  /**
   * Imagem sutil à direita (trem / infra). Padrão: trilho do DS.
   * Passe string vazia para desativar e usar só o SVG geométrico.
   */
  decorationSrc?: string | null
  /** Silhueta SVG leve (fallback ou reforço). Por padrão fica desligada se houver foto. */
  showTrainSilhouette?: boolean
}

/**
 * Faixa hero padrão dos módulos FIPS: gradiente azul institucional + trem/trilhos sutis à direita.
 * Usar abaixo da topbar em todas as páginas de módulo (ex.: Produção, Governança).
 */
export function PageHero({
  children,
  className,
  decorationSrc = PAGE_HERO_DEFAULT_DECORATION,
  showTrainSilhouette,
}: PageHeroProps) {
  const hasPhoto = Boolean(decorationSrc)
  const showSvg = showTrainSilhouette ?? !hasPhoto

  return (
    <section
      className={cn(
        'relative isolate min-h-[200px] overflow-hidden text-white',
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#031a3d] via-[var(--color-fips-blue-900)] to-[#1b6fd4] dark:bg-[#333B41] dark:bg-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-white/[0.03]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
        aria-hidden
      />

      {hasPhoto ? (
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[min(65vw,580px)] opacity-[0.22] mix-blend-soft-light sm:opacity-[0.28]"
          aria-hidden
        >
          <img
            src={decorationSrc!}
            alt=""
            className="h-full w-full object-cover object-right"
            decoding="async"
          />
        </div>
      ) : null}

      {showSvg ? (
        <div
          className="pointer-events-none absolute -right-4 bottom-0 top-8 w-[min(70vw,640px)] opacity-[0.1] sm:opacity-[0.12]"
          aria-hidden
        >
          <img
            src="/brand/hero-train-silhouette.svg"
            alt=""
            className="h-full w-full object-contain object-right-bottom"
            decoding="async"
          />
        </div>
      ) : null}

      <div className="relative z-10">{children}</div>
    </section>
  )
}
