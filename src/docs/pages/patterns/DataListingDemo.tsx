import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Download,
  FileSpreadsheet,
  Search,
  ShieldCheck,
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
    label: 'Total de certificados',
    value: '345',
    helper: 'Ativas e novas',
    icon: ShieldCheck,
    borderClass: 'border-l-[var(--color-fips-blue-900)]',
    iconClass: 'bg-[var(--color-fips-blue-200)]/55 text-[var(--color-fips-blue-900)]',
  },
  {
    label: 'Válidos',
    value: '127',
    helper: 'Dentro da validade',
    icon: CheckCircle2,
    borderClass: 'border-l-[var(--color-success)]',
    iconClass: 'bg-[var(--color-success)]/12 text-[var(--color-success-strong)]',
  },
  {
    label: 'Vencendo',
    value: '19',
    helper: 'Próximos 60 dias',
    icon: AlertTriangle,
    borderClass: 'border-l-[var(--color-accent-strong)]',
    iconClass: 'bg-[var(--color-fips-orange-100)] text-[var(--color-accent-strong)]',
  },
  {
    label: 'Vencidos',
    value: '29',
    helper: 'Fora da validade',
    icon: Clock3,
    borderClass: 'border-l-[var(--color-danger)]',
    iconClass: 'bg-[var(--color-fips-red-100)] text-[var(--color-danger)]',
  },
]

const rows = [
  {
    id: '#270',
    company: 'Dolabel Villela Comércio',
    initials: 'DC',
    avatar: 'bg-[var(--color-fips-blue-200)] text-[var(--color-fips-blue-900)]',
    contact: 'Eliane',
    phone: '11-987640432',
    type: 'A1',
    days: 'Vencido há 830 dias',
    status: 'Vencido',
    variant: 'danger' as const,
    alert: true,
  },
  {
    id: '#284',
    company: 'ALE87 Comércio e Serviços',
    initials: 'AS',
    avatar: 'bg-[var(--color-fips-yellow-100)] text-[var(--color-fips-gray-900)]',
    contact: 'Deodato',
    phone: '11-967411953',
    type: 'A1',
    days: 'Vencido há 684 dias',
    status: 'Vencido',
    variant: 'danger' as const,
    alert: true,
  },
  {
    id: '#301',
    company: 'Operadora Porto Sul',
    initials: 'PS',
    avatar: 'bg-[var(--color-success)]/12 text-[var(--color-success-strong)]',
    contact: 'Camila',
    phone: '11-994110004',
    type: 'A3',
    days: 'Renovar em 17 dias',
    status: 'Vencendo',
    variant: 'warning' as const,
    alert: false,
  },
]

export default function DataListingDemo() {
  return (
    <DocPage
      title="Padrão: Data Listing"
      description="Página operacional de listagem com KPIs, toolbar de filtros, CTA principal, tabela desktop e fallback mobile em cards. Inspirado diretamente na referência aprovada de certificados."
    >
      <DemoSection
        title="Preview"
        className="!p-0 overflow-hidden"
        reference={`<div className="space-y-6 bg-[var(--color-surface-muted)] p-6">
  {/* heading + CTA */}
  {/* KPI cards com borda lateral e ícone circular */}
  {/* toolbar branca com busca + pills + botões de exportação */}
  {/* card com header e tabela desktop; no mobile, cards empilhados */}
</div>`}
        referenceLabel="Estrutura do padrão de listagem"
      >
        <div className="space-y-6 bg-[var(--color-surface-muted)] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="font-heading text-3xl font-semibold text-[var(--color-fg)]">
                Gestão de Certificados
              </h2>
              <p className="mt-2 text-base text-[var(--color-fg-muted)]">
                Controle de certificados digitais, vencimentos e renovações.
              </p>
            </div>
            <Button className="gap-2 shadow-[var(--shadow-card)]">
              + Novo Certificado
            </Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {kpis.map((item) => {
              const Icon = item.icon

              return (
                <Card key={item.label} className={`border-l-4 ${item.borderClass}`}>
                  <CardContent className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-[var(--color-fg-muted)]">{item.label}</p>
                      <p className="mt-1 font-heading text-4xl font-semibold text-[var(--color-fg)]">{item.value}</p>
                      <p className="mt-1 text-sm text-[var(--color-fg-muted)]">{item.helper}</p>
                    </div>
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full ${item.iconClass}`}>
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card>
            <CardContent className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Buscar por ID, empresa, nome cliente, CNPJ ou responsável..."
                  leftIcon={<Search className="h-4 w-4" aria-hidden />}
                  aria-label="Buscar certificados"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {['Todos', 'Válidos', 'Vencendo', 'Vencidos', 'Pendentes'].map((filter, index) => (
                  <Button
                    key={filter}
                    size="sm"
                    variant={index === 0 ? 'secondary' : 'ghost'}
                    className={index === 0 ? 'bg-[var(--color-surface-muted)]' : ''}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="secondary" aria-label="Exportar PDF">
                  <Download className="h-4 w-4 text-red-600" />
                </Button>
                <Button size="icon" variant="secondary" aria-label="Exportar Excel">
                  <FileSpreadsheet className="h-4 w-4 text-green-600" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_360px]">
            <Card>
              <CardHeader className="flex-row items-start justify-between gap-4 border-b border-[var(--color-border)] pb-5">
                <div>
                  <CardTitle>Carteira de Certificados</CardTitle>
                  <CardDescription>Lista completa de certificados digitais cadastrados.</CardDescription>
                </div>
                <p className="text-sm text-[var(--color-fg-muted)]">Mostrando 1-20 de 345 certificados</p>
              </CardHeader>
              <CardContent className="px-0 pb-2">
                <div className="hidden md:block">
                  <Table framed={false}>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Nome Cliente</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Dias a Vencer</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.id} className={row.alert ? 'bg-red-50/70 hover:bg-red-50' : undefined}>
                          <TableCell className="font-mono text-xs text-[var(--color-fg-muted)]">{row.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <span className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold ${row.avatar}`}>
                                {row.initials}
                              </span>
                              <span className="text-sm font-semibold text-[var(--color-fg)]">{row.company}</span>
                            </div>
                          </TableCell>
                          <TableCell>{row.contact}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{row.type}</Badge>
                          </TableCell>
                          <TableCell className={row.alert ? 'font-semibold text-[var(--color-danger)]' : 'font-medium text-[var(--color-accent-strong)]'}>
                            {row.days}
                          </TableCell>
                          <TableCell>
                            <Badge variant={row.variant} dot>
                              {row.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-3 px-4 md:hidden">
                  {rows.slice(0, 2).map((row) => (
                    <div key={row.id} className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold ${row.avatar}`}>
                            {row.initials}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-[var(--color-fg)]">{row.company}</p>
                            <p className="text-xs text-[var(--color-fg-muted)]">{row.id}</p>
                          </div>
                        </div>
                        <Badge variant={row.variant} dot>
                          {row.status}
                        </Badge>
                      </div>
                      <div className="mt-4 grid gap-2 text-sm text-[var(--color-fg-muted)]">
                        <p>Cliente: {row.contact}</p>
                        <p>Contato: {row.phone}</p>
                        <p className={row.alert ? 'font-semibold text-[var(--color-danger)]' : undefined}>{row.days}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Fallback mobile</CardTitle>
                  <CardDescription>
                    Use cards empilhados quando a tabela perder legibilidade.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {rows.slice(0, 2).map((row) => (
                    <div key={row.id} className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-[var(--color-fg)]">{row.company}</p>
                          <p className="text-xs text-[var(--color-fg-muted)]">{row.id}</p>
                        </div>
                        <Badge variant={row.variant} dot>
                          {row.status}
                        </Badge>
                      </div>
                      <p className="mt-3 text-sm text-[var(--color-fg-muted)]">{row.days}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Toolbar obrigatória</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-[var(--color-fg-muted)]">
                  <p>Busca ampla, filtros rápidos em pills e ações de exportação à direita.</p>
                  <p>O CTA principal fica fora da toolbar, no topo da página.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DemoSection>

      <PatternGuidelines
        rules={[
          'KPIs no topo com leitura instantânea e sem competir com a tabela.',
          'Toolbar de filtros sempre em card branco separado do card da tabela.',
          'A tabela desktop deve conviver com uma versão mobile em cards empilhados.',
          'Ações de exportação e CTA principal não podem brigar visualmente.',
        ]}
        required={[
          'Busca horizontal dominante antes dos filtros rápidos.',
          'Header do card de listagem com título, descrição e metadado de paginação.',
          'Status usando badges semânticas e alertas de vencimento em cor de apoio.',
          'Linhas críticas podem receber fundo suave, nunca um vermelho agressivo chapado.',
        ]}
        optional={[
          'Avatares com iniciais por empresa/responsável.',
          'KPI cards com ícone circular no canto direito.',
          'Ações de exportação como botões ícone em círculo/superfície branca.',
        ]}
        avoid={[
          'Usar tabela comprimida no mobile sem fallback.',
          'Misturar CTA principal dentro da toolbar.',
          'Criar filtros com alturas diferentes da busca principal.',
        ]}
      />
    </DocPage>
  )
}
