import { Link } from 'react-router-dom'
import { ArrowRight, Download, Layers, Palette, PanelLeft, Sparkles, TableProperties } from 'lucide-react'
import { DocPage, DemoSection } from '../components/DocPage'
import { PatternGuidelines } from '../components/PatternGuidelines'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'

const GUIDE_HREF = '/guias/guia-design-system-fips.md'

const highlights = [
  {
    title: 'Application Shell',
    description: 'Sidebar, header, tabs e hero no padrão aprovado para futuros produtos.',
    to: '/docs/patterns/application-shell',
    icon: PanelLeft,
  },
  {
    title: 'Data Listing',
    description: 'Listagem com KPIs, toolbar branca, tabela desktop e cards mobile.',
    to: '/docs/patterns/data-listing',
    icon: TableProperties,
  },
  {
    title: 'Fundamentos',
    description: 'Cores, tipografia e espaçamento alinhados ao Brandbook FIPS.',
    to: '/docs/foundations/colors',
    icon: Sparkles,
  },
]

const overviewReference = `Design System FIPS — referência rápida

Nome do produto: Design System FIPS (não usar "DS FIPS").
Marca: Ferrovia Interna do Porto de Santos (FIPS).

Guia pixel perfect (baixar ou servir em produção):
/guias/guia-design-system-fips.md

Símbolo vetorial (Azul Profundo #004B9B):
/brand/fips-symbol.svg

Tokens CSS principais:
--color-primary: #004B9B
--color-accent: #FDC24E
--font-heading: Saira Expanded
--font-sans: Open Sans
`

export default function OverviewPage() {
  return (
    <DocPage
      title="Design System FIPS"
      description="Base visual, biblioteca e catálogo de padrões para produtos digitais da Ferrovia Interna do Porto de Santos. O foco desta versão é aprovação de cliente em cima de padrões completos, não apenas componentes isolados."
    >
      <DemoSection title="Guia para outros projetos">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 text-sm text-[var(--color-fg-muted)]">
            <p>
              Baixe o guia completo (Markdown) com paleta, tipografia, tokens CSS, checklist,
              componentes e padrões aprováveis — pensado para alinhar squads, fornecedores e
              implementações futuras ao Brandbook.
            </p>
            <p className="text-xs">
              Arquivo: <code className="rounded bg-[var(--color-surface-muted)] px-1.5 py-0.5 font-mono">public/guias/guia-design-system-fips.md</code>
            </p>
          </div>
          <Button variant="accent" className="shrink-0 gap-2" asChild>
            <a href={GUIDE_HREF} download="guia-design-system-fips.md">
              <Download className="h-4 w-4" aria-hidden />
              Baixar guia (.md)
            </a>
          </Button>
        </div>
      </DemoSection>

      <PatternGuidelines
        rules={[
          'Comece pela camada de padrões para revisar a experiência completa.',
          'Use foundations para tokens e componentes para implementação detalhada.',
          'Valide shell, listagem, formulário e modal antes de portar para outros produtos.',
        ]}
        required={[
          'Application Shell como base oficial de menu, header e navegação.',
          'Data Listing e Form Workspace como referência para fluxos operacionais.',
          'Fundamentos visuais alinhados ao Brandbook e aos prints aprovados.',
        ]}
        optional={[
          'Consultar páginas isoladas de componentes para ergonomia de implementação.',
          'Baixar o guia Markdown para alinhar squads externas.',
        ]}
      />

      <DemoSection
        title="Referência institucional (copiar)"
        reference={overviewReference.trim()}
        referenceLabel="Resumo + URLs do guia e do símbolo"
      >
        <p className="text-sm text-[var(--color-fg-muted)]">
          Use o bloco abaixo para colar em README, Notion ou briefing de implementação.
        </p>
      </DemoSection>

      <DemoSection title="Começar">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--color-fg-muted)]">
            A navegação foi reorganizada para destacar os padrões completos primeiro. Cada página
            inclui preview funcional, referência copiável e regras de uso.
          </p>
          <Button asChild>
            <Link to="/docs/patterns/application-shell" className="inline-flex items-center gap-2">
              Abrir Application Shell
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </DemoSection>

      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <Card key={item.to} className="border-[var(--color-border)] shadow-[var(--shadow-card)]">
            <CardHeader>
              <item.icon className="mb-2 h-8 w-8 text-[var(--color-primary)]" aria-hidden />
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link to={item.to}>Abrir</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <DemoSection title="Catálogo técnico">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Palette className="mb-2 h-8 w-8 text-[var(--color-primary)]" aria-hidden />
              <CardTitle>Fundamentos</CardTitle>
              <CardDescription>Cores, tipografia, espaçamento, raios, sombras e iconografia.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link to="/docs/foundations/colors">Explorar fundamentos</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Layers className="mb-2 h-8 w-8 text-[var(--color-primary)]" aria-hidden />
              <CardTitle>Componentes</CardTitle>
              <CardDescription>Biblioteca base pronta para implementação em produtos futuros.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link to="/docs/components/button">Explorar componentes</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </DemoSection>
    </DocPage>
  )
}
