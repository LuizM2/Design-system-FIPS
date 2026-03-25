import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  Headphones,
  Plus,
  Search,
} from 'lucide-react'
import { DocPage, DemoSection } from '../../components/DocPage'
import { PatternGuidelines } from '../../components/PatternGuidelines'
import { PageHero, PAGE_HERO_DEFAULT_DECORATION } from '../../../composites/PageHero'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
const kpis = [
  { label: 'Em andamento', value: '0', accent: 'bg-[var(--color-fips-blue-900)]' },
  { label: 'Concluídos', value: '1', accent: 'bg-[var(--color-fips-green-500)]' },
  { label: 'Pendentes', value: '3', accent: 'bg-[var(--color-fips-blue-700)]' },
  { label: 'SLA crítico', value: '0', accent: 'bg-[var(--color-accent-strong)]' },
]

const steps = [
  { n: '1', title: 'Solicitação', icon: Headphones },
  { n: '2', title: 'Triagem', icon: Search },
  { n: '3', title: 'Execução', icon: BarChart3 },
  { n: '4', title: 'Encerramento', icon: ClipboardList },
]

export default function DashboardDemo() {
  return (
    <DocPage
      title="Padrão: Dashboard"
      description="Dashboard institucional com hero de alto impacto, KPIs imediatos e trilha de processo. Use este padrão para home de módulo ou landing operacional."
    >
      <DemoSection
        title="Preview"
        className="!p-0 overflow-hidden"
        reference={`import { PageHero, PAGE_HERO_DEFAULT_DECORATION } from 'ds-fips'

/* Hero padrão FIPS: gradiente + trem sutil (imagem em ${PAGE_HERO_DEFAULT_DECORATION}) */
<PageHero>
  <div className="px-8 py-10">...</div>
</PageHero>

/* Só gradiente + silhueta SVG (sem foto) */
<PageHero decorationSrc={null} showTrainSilhouette />

/* Destaque no título */
className="text-[var(--color-accent)]"`}
        referenceLabel="PageHero + tokens"
      >
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <PageHero>
            <div className="mx-auto max-w-5xl space-y-4 px-8 py-10">
              <Badge variant="warning" className="border-0 bg-white/15 text-white">
                Sistema de governança
              </Badge>
              <h2 className="font-heading text-3xl font-semibold md:text-4xl">
                Governança de <span className="text-[var(--color-accent)]">projetos digitais</span>
              </h2>
              <p className="max-w-2xl text-sm text-white/85 md:text-base">
                Visão consolidada de demandas, indicadores e próximos passos — com a identidade visual
                FIPS aplicada a componentes reutilizáveis.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button variant="accent" className="gap-2 shadow-md">
                  <Plus className="h-4 w-4" aria-hidden />
                  Nova solicitação
                </Button>
                <Button
                  variant="outline"
                  className="border-white/60 bg-transparent text-white hover:bg-white/10"
                >
                  Ver meus projetos
                </Button>
              </div>
            </div>
          </PageHero>

          <div className="mx-auto max-w-5xl space-y-8 px-6 py-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {kpis.map((k) => (
                <Card key={k.label} className="overflow-hidden border-[var(--color-border)]">
                  <div className={`h-1 w-full ${k.accent}`} />
                  <CardContent className="flex items-center justify-between gap-3 pt-5">
                    <div>
                      <p className="text-xs font-medium text-[var(--color-fg-muted)]">{k.label}</p>
                      <p className="font-heading text-3xl font-semibold">{k.value}</p>
                    </div>
                    <div className="rounded-full bg-[var(--color-surface-muted)] p-2">
                      <BarChart3 className="h-5 w-5 text-[var(--color-primary)]" aria-hidden />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <h3 className="font-heading text-xl font-semibold">Como funciona</h3>
              <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                Fluxo simplificado para orientar o usuário no processo.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {steps.map((s) => (
                <Card
                  key={s.n}
                  className="relative border-[var(--color-border)] pt-8 text-center shadow-[var(--shadow-card)]"
                >
                  <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-[var(--color-fips-gray-900)]">
                    {s.n}
                  </div>
                  <CardContent className="space-y-2 pt-2">
                    <s.icon className="mx-auto h-6 w-6 text-[var(--color-primary)]" aria-hidden />
                    <p className="text-sm font-semibold">{s.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center pb-4">
              <Button variant="ghost" className="gap-2 text-[var(--color-primary)]">
                Ver documentação de tabelas
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </DemoSection>

      <PatternGuidelines
        rules={[
          'Use sempre o componente PageHero na faixa azul do cabeçalho do módulo (gradiente + trem sutil).',
          'A primeira dobra precisa comunicar propósito, contexto e próxima ação.',
          'KPIs devem ficar imediatamente abaixo do hero para leitura rápida.',
          'A trilha de processo funciona como orientação e não como diagrama técnico complexo.',
          'CTAs principais e secundárias devem aparecer no hero, nunca escondidas no rodapé.',
        ]}
        required={[
          'PageHero com arte padrão em /backgrounds/app-shell-home-trains.png (ou decorationSrc equivalente).',
          'Hero com gradiente institucional e destaque em amarelo/laranja.',
          'KPIs com métrica grande, rótulo curto e ícone em superfície suave.',
          'Seção “Como funciona” com passos numerados e muito espaço em branco.',
          'Hierarquia clara entre bloco institucional e conteúdo operacional.',
        ]}
        optional={[
          'Badge contextual acima do título.',
          'CTA secundária em outline sobre o hero.',
          'Links de continuidade no fim da página.',
        ]}
        avoid={[
          'Hero com excesso de texto técnico.',
          'KPIs sem contraste suficiente com o fundo.',
          'Fluxos com muitos passos ou com descrição longa dentro dos cards.',
        ]}
      />
    </DocPage>
  )
}
