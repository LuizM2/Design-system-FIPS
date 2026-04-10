/**
 * Cromia do header da documentação alinhada ao sidebar (`#002A68`, `#004B9B`, DocsNeuSidebar).
 * Sem degradê cyan — mesma família do rail lateral e bordas brancas ~6–8% opacidade.
 */
export const docHeaderShellBorder = 'border-b border-white/[0.06]'

/** Lavagem sobre a arte (silhueta) — azul escuro FIPS + azul profundo. */
export const docHeaderArtWash =
  'bg-[linear-gradient(135deg,rgba(0,42,104,0.97)_0%,rgba(0,75,155,0.90)_44%,rgba(0,34,80,0.95)_100%)]'

/** Profundidade / vinheta institucional. */
export const docHeaderArtDepth =
  'bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.09),transparent_46%),radial-gradient(circle_at_100%_100%,rgba(0,26,64,0.55),transparent_38%)]'

/** Primeira faixa (toolbar): vidro sobre o mesmo azul do sidebar. */
export const docHeaderBarTop =
  'border-b border-white/[0.08] bg-[linear-gradient(180deg,rgba(0,42,104,0.52),rgba(0,26,64,0.26))] backdrop-blur-md'

/** Faixa das abas de seção. */
export const docHeaderBarTabs =
  'border-t border-b border-white/[0.06] bg-[linear-gradient(180deg,rgba(0,26,64,0.40),rgba(0,42,104,0.20))] backdrop-blur-sm'
