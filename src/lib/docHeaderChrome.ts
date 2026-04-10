/**
 * Cromia do header da documentação alinhada ao sidebar (`#002A68`, `#004B9B`, DocsNeuSidebar).
 */
export const docHeaderShellBorder = ''

/** Lavagem sobre a arte (silhueta) — azul escuro FIPS + azul profundo. */
export const docHeaderArtWash =
  'bg-[linear-gradient(135deg,rgba(0,42,104,0.97)_0%,rgba(0,75,155,0.90)_44%,rgba(0,34,80,0.95)_100%)]'

/** Profundidade / vinheta institucional. */
export const docHeaderArtDepth =
  'bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.09),transparent_46%),radial-gradient(circle_at_100%_100%,rgba(0,26,64,0.55),transparent_38%)]'

/** Mesmo azul sólido do rail lateral (`aside` / DocsNeuSidebar `#002A68`) — padronizado só no header. */
export const docHeaderBarSurface = 'bg-[#002a68]'

/** Primeira faixa (toolbar): trilho, busca, ações. */
export const docHeaderBarTop = `border-b border-white/[0.08] ${docHeaderBarSurface}`

/** Superfície clara da faixa de abas. */
export const docHeaderTabsSurface = 'bg-white'

/** Faixa das abas de secção — fundo branco `#FFFFFF`. Sem padding inferior para o indicador ficar rente. */
export const docHeaderBarTabs = `${docHeaderTabsSurface} pt-2 pb-0`

/**
 * Espaçamentos, tamanhos e cores base do `TabsUnderline` com `size="md"` em
 * `src/docs/pages/components/TabsDoc.tsx` (padding 10×20, fs 13, gap 7, ícone 14, barra 2px, traço 3px).
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

/** Separador sob o `nav` de abas — borda inferior sutil em superfície clara `#EDF2F8`. */
export const docHeaderTabsNavSeparatorClass = 'border-b-2 border-[#E2E8F0]'
