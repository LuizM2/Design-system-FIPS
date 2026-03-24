import { DocPage, DemoSection } from '../components/DocPage'

const entries = [
  {
    version: '0.2.0',
    date: '2026-03-24',
    items: [
      'Logotipo FIPS: símbolo (junção de vias) + wordmark “Design System FIPS” e subtítulo institucional; SVG em /brand/fips-symbol.svg.',
      'Guia Markdown para implementação pixel perfect: /guias/guia-design-system-fips.md (download na visão geral).',
      'Bloco “Referência para copiar” em fundamentos, componentes e padrões.',
      'Ajustes de cor (--color-fg-muted), sidebar com gradiente e sombra.',
    ],
  },
  {
    version: '0.1.0',
    date: '2026-03-24',
    items: [
      'MVP da documentação navegável com menu lateral responsivo.',
      'Tokens de cor e tipografia alinhados ao Brandbook FIPS.',
      'Biblioteca inicial: Button, Input, Select, Textarea, Badge, Card, Tabs, Table, Dialog, Drawer, Tooltip e Toast (Sonner).',
      'Padrões de referência: dashboard, tabela de certificados e modal de formulário.',
    ],
  },
]

export default function ChangelogPage() {
  return (
    <DocPage
      title="Changelog"
      description="Histórico de evolução do pacote de design system e da documentação interna."
    >
      {entries.map((e) => (
        <DemoSection
          key={e.version}
          title={`${e.version} · ${e.date}`}
          reference={e.items.map((item) => `- ${item}`).join('\n')}
          referenceLabel="Itens (Markdown) — copiar para release notes"
        >
          <ul className="list-inside list-disc space-y-2 text-sm text-[var(--color-fg-muted)]">
            {e.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </DemoSection>
      ))}
    </DocPage>
  )
}
