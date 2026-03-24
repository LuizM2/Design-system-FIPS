/**
 * Tipografia oficial FIPS (Brandbook):
 * - Títulos / destaques: Saira Expanded
 * - Corpo / auxiliar: Open Sans
 */
export const fontFamilies = {
  heading: '"Saira Expanded", "Open Sans", system-ui, sans-serif',
  body: '"Open Sans", system-ui, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
} as const

export const typeScale = {
  display: 'text-4xl font-semibold tracking-tight md:text-5xl',
  h1: 'text-3xl font-semibold tracking-tight md:text-4xl',
  h2: 'text-2xl font-semibold tracking-tight',
  h3: 'text-xl font-semibold',
  lead: 'text-lg text-[var(--color-fg-muted)]',
  body: 'text-base leading-[1.5]',
  small: 'text-sm text-[var(--color-fg-muted)]',
  caption: 'text-xs text-[var(--color-fg-muted)]',
} as const
