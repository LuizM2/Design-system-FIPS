import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileSearch,
  ShieldCheck,
} from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'

const cardPageSource = `import { CheckCircle2, ShieldCheck } from 'lucide-react'
import { Card, CardContent } from 'ds-fips'

export function KpiCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card className="border-l-[4px] border-l-[#2f7df6]">
        <CardContent className="flex items-center justify-between gap-4 !p-6">
          <div>
            <p className="text-sm font-semibold text-[var(--color-fg-muted)]">Total de Empresas</p>
            <p className="mt-1 text-4xl font-semibold text-[var(--color-fg)]">341</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f1ff] text-[#2f7df6]">
            <ShieldCheck className="h-6 w-6" aria-hidden />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}`

const kpiCards = [
  {
    label: 'Total de Empresas',
    value: '341',
    helper: 'Cadastradas no sistema',
    icon: ShieldCheck,
    borderClass: 'border-l-[#2f7df6]',
    iconClass: 'bg-[#e8f1ff] text-[#2f7df6]',
  },
  {
    label: 'Ativas',
    value: '296',
    helper: '87% do total',
    icon: CheckCircle2,
    borderClass: 'border-l-[#00c64c]',
    iconClass: 'bg-[#e8fbef] text-[#00a843]',
  },
  {
    label: 'Vencendo',
    value: '19',
    helper: 'Próximos 30 dias',
    icon: AlertTriangle,
    borderClass: 'border-l-[#f6921e]',
    iconClass: 'bg-[#fff0d6] text-[#f6921e]',
  },
  {
    label: 'Em análise',
    value: '14',
    helper: 'Aguardando revisão',
    icon: Clock3,
    borderClass: 'border-l-[#93bde4]',
    iconClass: 'bg-[#eef6fd] text-[#5092cb]',
  },
]

export default function CardDoc() {
  return (
    <DocPage
      title="Card"
      description="Container base para agrupar informações, métricas e ações. Esta página reúne as famílias de card que hoje fazem mais sentido para validação com o Diogo."
      pageSource={cardPageSource}
      pageDownloadName="CardExamples.tsx"
    >
      <DemoSection
        title="Cards KPI / stat"
        reference={`<Card className="border-l-[4px] border-l-[#2f7df6]">
  <CardContent className="flex items-center justify-between gap-4 !p-6">...</CardContent>
</Card>`}
        referenceLabel="Card KPI"
      >
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {kpiCards.map((item) => {
            const Icon = item.icon

            return (
              <Card key={item.label} className={`border-l-[4px] ${item.borderClass}`}>
                <CardContent className="flex items-center justify-between gap-4 !p-6">
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-fg-muted)]">{item.label}</p>
                    <p className="mt-1 text-4xl leading-none font-semibold text-[var(--color-fg)]">{item.value}</p>
                    <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{item.helper}</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${item.iconClass}`}>
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </DemoSection>

      <DemoSection
        title="Cards de resumo e informação"
        reference={`<Card>
  <CardHeader>
    <CardTitle>Resumo operacional</CardTitle>
    <CardDescription>Contexto curto do bloco.</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>`}
        referenceLabel="Card de informação"
      >
        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Resumo operacional</CardTitle>
              <CardDescription>Use para introduzir o contexto da tela com texto curto e hierarquia clara.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-fg-muted)]">
                A estrutura pode combinar resumo textual, chips de status e indicadores de execução no mesmo container.
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success" dot>
                  Fluxo ativo
                </Badge>
                <Badge variant="secondary" dot>
                  Revisão visual
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--color-fips-yellow-100)] bg-[linear-gradient(135deg,rgba(253,194,78,0.12),rgba(255,255,255,1))]">
            <CardHeader>
              <CardTitle className="text-lg">Card auxiliar</CardTitle>
              <CardDescription>Bom para saúde da tela, checklist ou notas curtas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-[18px] bg-white/90 px-4 py-3 text-sm text-[var(--color-fg-muted)]">
                Verificar contraste e consistência entre os estados do fluxo.
              </div>
              <div className="rounded-[18px] bg-white/90 px-4 py-3 text-sm text-[var(--color-fg-muted)]">
                Confirmar quais cards o Diogo quer manter depois da revisão.
              </div>
            </CardContent>
          </Card>
        </div>
      </DemoSection>

      <DemoSection
        title="Card de ação"
        reference={`<Card>
  <CardHeader>...</CardHeader>
  <CardFooter className="justify-between">...</CardFooter>
</Card>`}
        referenceLabel="Card com CTA"
      >
        <div className="max-w-lg">
          <Card>
            <CardHeader>
              <CardTitle>Próxima ação recomendada</CardTitle>
              <CardDescription>Card com CTA principal, secundário e indicação de urgência.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-fg-muted)]">
                Revisar os componentes individuais antes de fechar padrões completos de dashboard e regras de negócio.
              </div>
              <Badge variant="warning" dot>
                Prioridade alta
              </Badge>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="secondary">Depois</Button>
              <Button>
                Continuar revisão
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DemoSection>

      <DemoSection
        title="Container de tabela"
        reference={`<Card className="overflow-hidden">
  <CardHeader className="border-b border-[var(--color-border)]">...</CardHeader>
  <CardContent className="!p-0">...</CardContent>
</Card>`}
        referenceLabel="Card para data table"
      >
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="text-lg">Carteira de Clientes</CardTitle>
                <CardDescription>Container base para listagens mais densas.</CardDescription>
              </div>
              <Button variant="secondary" size="sm">
                <FileSearch className="h-4 w-4" aria-hidden />
                Configurar colunas
              </Button>
            </div>
          </CardHeader>
          <CardContent className="!p-0">
            <div className="grid gap-px bg-[var(--color-border)] text-sm">
              {['Linha de cabeçalho', 'Linha de dados 1', 'Linha de dados 2'].map((row) => (
                <div key={row} className="bg-[var(--color-surface)] px-6 py-4 text-[var(--color-fg-muted)]">
                  {row}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </DemoSection>
    </DocPage>
  )
}
