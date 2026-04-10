/**
 * Cromia do header da documentação alinhada ao sidebar (`#002A68`, `#004B9B`, DocsNeuSidebar).
 * Sem `border-b` aqui: o fecho visual fica nas faixas internas (`docHeaderBarTop`, `nav` das abas),
 * evitando duas linhas claras empilhadas e “faixa branca” grossa sobre o hero.
 */
export const docHeaderShellBorder = ''

/** Lavagem sobre a arte (silhueta) — azul escuro FIPS + azul profundo. */
export const docHeaderArtWash =
  'bg-[linear-gradient(135deg,rgba(0,42,104,0.97)_0%,rgba(0,75,155,0.90)_44%,rgba(0,34,80,0.95)_100%)]'

/** Profundidade / vinheta institucional. */
export const docHeaderArtDepth =
  'bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.09),transparent_46%),radial-gradient(circle_at_100%_100%,rgba(0,26,64,0.55),transparent_38%)]'

/** Primeira faixa (toolbar): vidro sobre o mesmo azul do sidebar. */
export const docHeaderBarTop =
  'border-b border-white/[0.08] bg-[linear-gradient(180deg,rgba(0,42,104,0.52),rgba(0,26,64,0.26))] backdrop-blur-md'

/** Faixa das abas de seção (borda inferior fica no `nav` — 2px como Tabs underline). */
export const docHeaderBarTabs =
  'border-t border-white/[0.06] bg-[linear-gradient(180deg,rgba(0,26,64,0.40),rgba(0,42,104,0.20))] backdrop-blur-sm'

/**
 * Espaçamentos, tamanhos e cores base do `TabsUnderline` com `size="md"` em
 * `src/docs/pages/components/TabsDoc.tsx` (padding 10×20, fs 13, gap 7, ícone 14, barra 2px, traço 3px).
 *
 * No header da documentação o fundo é azul escuro: texto/ícone inativos usam branco com opacidade
 * para contraste (no playground claro o mesmo papel é `#7B8C96` / ativo `#002A68`).
 */
export const docHeaderTabsUnderlineMd = {
  fontSizePx: 13,
  paddingXPx: 20,
  paddingYPx: 10,
  iconGapPx: 7,
  iconSizePx: 14,
  indicatorHeightPx: 3,
  borderBottomPx: 2,
  activeFontWeight: 600,
  inactiveFontWeight: 400,
  transitionMs: 200,
  indicatorTransition: 'left .3s cubic-bezier(.4,0,.2,1), width .3s cubic-bezier(.4,0,.2,1)',
  /** TabsDoc `C.amareloEscuro` ≡ `--color-fips-yellow-600` */
  accentHex: '#F6921E',
  /** Superfície clara (playground Tabs) */
  activeTextOnLightHex: '#002A68',
  mutedOnLightHex: '#7B8C96',
  hoverTextOnLightHex: '#333B41',
  separatorOnLightHex: '#E2E8F0',
} as const

/**
 * Linha inferior do `nav` de abas (2px): no TabsDoc é `C.cardBorder` (#E2E8F0) em card branco.
 * Sobre fundo azul escuro usamos o mesmo tom com opacidade — cinza-claro suave, não branco puro.
 */
export const docHeaderTabsNavSeparatorClass =
  'border-b-2 border-[rgba(226,232,240,0.22)]'
