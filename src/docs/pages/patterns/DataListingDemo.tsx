import {
  AlertTriangle,
  ArrowUp,
  ArrowUpDown,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  Plus,
  Search,
  Shield,
  ShieldCheck,
  XCircle,
} from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { PatternGuidelines } from '../../components/PatternGuidelines'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'

const kpis = [
  {
    label: 'Total de Empresas',
    value: '345',
    helper: 'Ativas e novas',
    icon: ShieldCheck,
    borderClass: 'border-l-[#2f7df6]',
    iconClass: 'bg-[#e8f1ff] text-[#2f7df6]',
  },
  {
    label: 'Válidos',
    value: '127',
    helper: 'Dentro da validade',
    icon: CheckCircle2,
    borderClass: 'border-l-[#00c853]',
    iconClass: 'bg-[#e6fbef] text-[#00a94f]',
  },
  {
    label: 'Vencendo',
    value: '19',
    helper: 'Próximos 60 dias',
    icon: AlertTriangle,
    borderClass: 'border-l-[#ffb100]',
    iconClass: 'bg-[#fff6dc] text-[#f39a00]',
  },
  {
    label: 'Vencidos',
    value: '29',
    helper: 'Fora da validade',
    icon: XCircle,
    borderClass: 'border-l-[#ff4343]',
    iconClass: 'bg-[#ffe8e8] text-[#ff2f2f]',
  },
  {
    label: 'Pendentes',
    value: '170',
    helper: 'Sem certificado',
    icon: Shield,
    borderClass: 'border-l-[#aab4c3]',
    iconClass: 'bg-[#f2f4f7] text-[#7f8b99]',
  },
]

const rows = [
  {
    id: '#270',
    company: 'Dolabel Villela Comércio',
    initials: 'DC',
    avatar: 'bg-[#cff6ff] text-[#0b83b7]',
    client: 'Eliane',
    contact: '11-987640432',
    type: 'A1',
    days: 'Vencido há 830 dias',
    daysClass: 'text-[#ff3a3a]',
    status: 'Vencido',
    variant: 'danger' as const,
    observation: '-',
    highlightClass: 'bg-[#fff8f8] hover:!bg-[#fff1f1]',
  },
  {
    id: '#284',
    company: 'ALE87 Comércio e Serviços',
    initials: 'AS',
    avatar: 'bg-[#d9fbff] text-[#138bb8]',
    client: 'Deodato',
    contact: '11-967411953',
    type: 'A1',
    days: 'Vencido há 684 dias',
    daysClass: 'text-[#ff3a3a]',
    status: 'Vencido',
    variant: 'danger' as const,
    observation: '-',
    highlightClass: 'bg-[#fff8f8] hover:!bg-[#fff1f1]',
  },
  {
    id: '#301',
    company: 'Operadora Porto Sul',
    initials: 'PS',
    avatar: 'bg-[#e6fbef] text-[#00a94f]',
    client: 'Camila',
    contact: '11-994110004',
    type: 'A3',
    days: 'Renovar em 17 dias',
    daysClass: 'text-[#f39a00]',
    status: 'Vencendo',
    variant: 'warning' as const,
    observation: 'Renovação agendada',
  },
  {
    id: '#318',
    company: 'Centro Atlas Digital',
    initials: 'CA',
    avatar: 'bg-[#edf3ff] text-[#2f7df6]',
    client: 'Rafael',
    contact: '11-998001210',
    type: 'A1',
    days: 'Validade em 120 dias',
    daysClass: 'text-[#6b7784]',
    status: 'Válido',
    variant: 'success' as const,
    observation: 'Em conformidade',
  },
]

function SortLabel({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span className={active ? 'text-[var(--color-secondary)]' : undefined}>{label}</span>
      {active ? (
        <ArrowUp className="h-3.5 w-3.5 text-[var(--color-secondary)]" aria-hidden />
      ) : (
        <ArrowUpDown className="h-3.5 w-3.5 text-[var(--color-border-strong)]" aria-hidden />
      )}
    </span>
  )
}

export default function DataListingDemo() {
  return (
    <DocPage
      title="Padrão: Data Listing"
      description="Página operacional de listagem com KPIs mais refinados, toolbar branca de filtros e uma tabela com acabamento mais próximo das referências aprovadas."
    >
      <DemoSection
        title="Preview"
        className="!p-0 overflow-hidden"
        reference={`<div className="space-y-6 bg-[linear-gradient(180deg,#f9fbff_0%,#f4f8fd_100%)] p-6">
  {/* heading + CTA */}
  {/* cinco KPI cards com borda lateral e ícone em disco suave */}
  {/* toolbar branca com busca dominante, segmentação e exportações */}
  {/* card de tabela com header editorial e fallback mobile em cards */}
</div>`}
        referenceLabel="Estrutura do padrão de listagem"
      >
        <div className="space-y-6 bg-[linear-gradient(180deg,#f9fbff_0%,#f4f8fd_100%)] p-4 sm:p-6 lg:p-7">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h2 className="font-heading text-[2.2rem] leading-[1.02] font-semibold text-[#132446] sm:text-[2.7rem]">
                Gestão de Certificados
              </h2>
              <p className="mt-2 max-w-3xl text-base text-[#72839a] sm:text-[1.05rem]">
                Controle de certificados digitais, vencimentos e renovações.
              </p>
            </div>

            <Button className="h-[54px] rounded-[16px] px-6 text-base shadow-[0_8px_18px_rgba(0,144,208,0.24)]">
              <Plus className="h-5 w-5" aria-hidden />
              Novo Certificado
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-5">
            {kpis.map((item) => {
              const Icon = item.icon

              return (
                <Card
                  key={item.label}
                  className={`border-l-[5px] ${item.borderClass} rounded-[22px] border-[#dce6ef] bg-white`}
                >
                  <CardContent className="flex items-center justify-between gap-4 !p-6">
                    <div className="min-w-0">
                      <p className="text-[1.02rem] font-semibold text-[#6d7f96]">{item.label}</p>
                      <p className="mt-1 text-[3rem] leading-none font-semibold text-[#132446]">{item.value}</p>
                      <p className="mt-2 text-[1.02rem] text-[#7a8aa0]">{item.helper}</p>
                    </div>
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${item.iconClass}`}
                    >
                      <Icon className="h-7 w-7" aria-hidden />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className="rounded-[24px] border-[#dce6ef] bg-white">
            <CardContent className="flex flex-col gap-4 !p-4 md:!p-5 xl:flex-row xl:items-center">
              <div className="min-w-0 flex-1">
                <Input
                  type="search"
                  placeholder="Buscar por ID, Empresa, Nome Cliente, CNPJ ou Responsável..."
                  leftIcon={<Search className="h-5 w-5" aria-hidden />}
                  aria-label="Buscar certificados"
                  className="h-[54px] rounded-[16px] border-[#dce6ef] bg-white pl-12 text-[1.02rem] shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex flex-wrap items-center gap-1.5 rounded-[18px] bg-[var(--color-surface-muted)] p-1.5">
                  {['Todos', 'Válidos', 'Vencendo', 'Vencidos', 'Pendentes'].map((filter, index) => (
                    <button
                      key={filter}
                      type="button"
                      className={[
                        'rounded-[14px] px-4 py-2.5 text-sm font-semibold transition-colors',
                        index === 0
                          ? 'bg-white text-[#132446] shadow-[0_1px_3px_rgba(15,23,42,0.08)]'
                          : 'text-[#6d7f96] hover:bg-white/80',
                      ].join(' ')}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    aria-label="Exportar PDF"
                    className="h-12 w-12 rounded-[18px] border-[#e2e8f0] bg-[var(--color-surface-soft)]"
                  >
                    <FileText className="h-5 w-5 text-[#7d8aa0]" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    aria-label="Exportar Excel"
                    className="h-12 w-12 rounded-[18px] border-[#e2e8f0] bg-[var(--color-surface-soft)]"
                  >
                    <FileSpreadsheet className="h-5 w-5 text-[#00b455]" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    aria-label="Baixar lista"
                    className="h-12 w-12 rounded-[18px] border-[#e2e8f0] bg-[var(--color-surface-soft)]"
                  >
                    <Download className="h-5 w-5 text-[#ff4a4a]" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-[26px] border-[#dce6ef] bg-white">
            <CardHeader className="flex-col gap-3 border-b border-[#e7edf4] pb-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle className="text-[1.9rem] text-[#132446]">Carteira de Certificados</CardTitle>
                <CardDescription className="mt-1 text-base text-[#72839a]">
                  Lista completa de certificados digitais cadastrados.
                </CardDescription>
              </div>
              <p className="pt-1 text-sm font-medium text-[#7a8aa0]">
                Mostrando 1-20 de 345 certificados
              </p>
            </CardHeader>

            <CardContent className="px-0 pb-3 pt-0">
              <div className="hidden md:block">
                <Table framed={false} className="min-w-[980px] lg:min-w-0">
                  <TableHeader className="bg-white">
                    <TableRow className="hover:bg-white">
                      <TableHead className="px-5">
                        <SortLabel label="ID" />
                      </TableHead>
                      <TableHead>
                        <SortLabel label="Empresa" />
                      </TableHead>
                      <TableHead>
                        <SortLabel label="Nome Cliente" />
                      </TableHead>
                      <TableHead>
                        <SortLabel label="Contato" />
                      </TableHead>
                      <TableHead>
                        <SortLabel label="Tipo" />
                      </TableHead>
                      <TableHead>
                        <SortLabel label="Dias a Vencer" active />
                      </TableHead>
                      <TableHead>
                        <SortLabel label="Status" />
                      </TableHead>
                      <TableHead className="pr-5">
                        <SortLabel label="Observação" />
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id} className={row.highlightClass}>
                        <TableCell className="px-5 font-semibold text-[#7a8aa0]">{row.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${row.avatar}`}
                            >
                              {row.initials}
                            </span>
                            <span className="text-[1.05rem] font-semibold text-[#132446]">{row.company}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-[1.02rem] text-[#2c3d57]">{row.client}</TableCell>
                        <TableCell className="text-[1.02rem] text-[#6d7f96]">{row.contact}</TableCell>
                        <TableCell>
                          <Badge variant="info" className="px-3 py-1.5 text-sm">
                            {row.type}
                          </Badge>
                        </TableCell>
                        <TableCell className={`text-[1.05rem] font-semibold ${row.daysClass}`}>
                          {row.days}
                        </TableCell>
                        <TableCell>
                          <Badge variant={row.variant} dot className="px-3 py-1.5 text-sm">
                            {row.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="pr-5 text-[1.02rem] text-[#8a96a7]">{row.observation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-3 px-4 pt-4 md:hidden">
                {rows.map((row) => (
                  <div
                    key={row.id}
                    className="rounded-[20px] border border-[#e2e8f0] bg-[#fbfdff] p-4 shadow-[0_2px_6px_rgba(15,23,42,0.03)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${row.avatar}`}
                        >
                          {row.initials}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[#132446]">{row.company}</p>
                          <p className="mt-1 text-xs text-[#7a8aa0]">{row.id}</p>
                        </div>
                      </div>

                      <Badge variant={row.variant} dot className="px-3 py-1.5">
                        {row.status}
                      </Badge>
                    </div>

                    <div className="mt-4 grid gap-2 text-sm">
                      <p className="text-[#6d7f96]">Cliente: {row.client}</p>
                      <p className="text-[#6d7f96]">Contato: {row.contact}</p>
                      <p className={`font-semibold ${row.daysClass}`}>{row.days}</p>
                      <p className="text-[#8a96a7]">Observação: {row.observation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DemoSection>

      <PatternGuidelines
        rules={[
          'Cards KPI precisam ter volume visual suave, borda lateral evidente e ícone em disco claro.',
          'Toolbar deve parecer uma superfície branca premium, não um agrupamento solto de controles.',
          'Tabela operacional precisa de header respirado, tipografia legível e hierarquia clara entre dado primário e secundário.',
          'Registros críticos podem receber fundo rosado muito sutil para orientar o olhar sem poluir a listagem.',
        ]}
        required={[
          'Cinco KPIs quando a visão superior resumir estado geral da listagem.',
          'Busca dominante antes da segmentação por status e das ações de exportação.',
          'Card principal da tabela com título, descrição e metadado de paginação no cabeçalho.',
          'Fallback mobile em cards empilhados quando a tabela perder legibilidade.',
        ]}
        optional={[
          'Avatares com iniciais por empresa ou cliente.',
          'Ordenação destacada com seta colorida na coluna prioritária.',
          'Ações de exportação em botões ícone neutros na mesma linha da toolbar.',
        ]}
        avoid={[
          'Usar cards excessivamente arredondados ou com sombra pesada demais.',
          'Misturar CTA principal dentro da toolbar e competir com a busca.',
          'Deixar o cabeçalho da tabela em uppercase quando o padrão pede leitura mais editorial.',
        ]}
      />
    </DocPage>
  )
}
