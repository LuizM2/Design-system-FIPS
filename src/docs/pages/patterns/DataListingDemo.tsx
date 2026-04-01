import { useState } from 'react'
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Download,
  FileSpreadsheet,
  Filter,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { PatternGuidelines } from '../../components/PatternGuidelines'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '../../../components/ui/drawer'
import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { Progress } from '../../../components/ui/progress'
import { Select } from '../../../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'

const kpis = [
  {
    label: 'Total de Empresas',
    value: '341',
    helper: 'Cadastradas no sistema',
    borderClass: 'border-l-[#2f7df6]',
    iconClass: 'bg-[#e8f1ff] text-[#2f7df6]',
    icon: ShieldCheck,
  },
  {
    label: 'Ativas',
    value: '296',
    helper: '87% do total',
    borderClass: 'border-l-[#00c64c]',
    iconClass: 'bg-[#e8fbef] text-[#00a843]',
    icon: CheckCircle2,
  },
  {
    label: 'Novas',
    value: '45',
    helper: 'Adicionadas recentemente',
    borderClass: 'border-l-[#00b8ff]',
    iconClass: 'bg-[#ebf7ff] text-[#00a4ea]',
    icon: Building2,
  },
  {
    label: 'Inativas',
    value: '38',
    helper: 'Sem movimentação',
    borderClass: 'border-l-[#c0ccd2]',
    iconClass: 'bg-[#f4f7f9] text-[#8a99a6]',
    icon: UserRound,
  },
]

const rows = [
  {
    id: '#508',
    initials: 'BC',
    company: 'Black Ice Confecções e Comércio',
    cnpj: '65.728.689/0001-10',
    owner: 'Ronaldo',
    fiscal: 'Fábio',
    status: 'Novo',
    statusVariant: 'secondary' as const,
    progress: 42,
  },
  {
    id: '#507',
    initials: 'HR',
    company: 'HRB Gestão Integrada LTDA',
    cnpj: '65.597.871/0001-88',
    owner: 'Heloísa',
    fiscal: 'Fábio',
    status: 'Ativo',
    statusVariant: 'success' as const,
    progress: 82,
  },
  {
    id: '#506',
    initials: 'EC',
    company: 'Erivan Cx & C5 Consultoria',
    cnpj: '65.519.974/0001-21',
    owner: 'Erivan',
    fiscal: 'Fábio',
    status: 'Ativo',
    statusVariant: 'success' as const,
    progress: 71,
  },
]

function AdvancedFiltersFields({ compact = false }: { compact?: boolean }) {
  const density = compact ? 'compact' : 'default'

  return (
    <div className={`grid gap-4 ${compact ? '' : 'md:grid-cols-2'}`}>
      <Field density={density} inset="icon">
        <FieldLabel>Razão social</FieldLabel>
        <Input density={density} placeholder="Nome da empresa" leftIcon={<Search className="h-4 w-4" aria-hidden />} />
      </Field>
      <Field density={density} inset="icon">
        <FieldLabel>Nome fantasia</FieldLabel>
        <Input density={density} placeholder="Nome fantasia" leftIcon={<Building2 className="h-4 w-4" aria-hidden />} />
      </Field>
      <Field density={density} inset="control">
        <FieldLabel>CNPJ</FieldLabel>
        <Input density={density} placeholder="00.000.000/0000-00" />
      </Field>
      <Field density={density} inset="control">
        <FieldLabel>ID do cliente</FieldLabel>
        <Input density={density} placeholder="Ex: 1234" />
      </Field>
      <Field density={density} inset="control">
        <FieldLabel>Status</FieldLabel>
        <Select density={density} aria-label="Status">
          <option value="">Selecione</option>
          <option value="ativo">Ativo</option>
          <option value="novo">Novo</option>
          <option value="inativo">Inativo</option>
        </Select>
      </Field>
      <Field density={density} inset="control">
        <FieldLabel>Segmento</FieldLabel>
        <Select density={density} aria-label="Segmento">
          <option value="">Selecione</option>
          <option value="comercio">Comércio</option>
          <option value="servico">Serviço</option>
        </Select>
      </Field>
      <Field density={density} inset="control">
        <FieldLabel>Responsável fiscal</FieldLabel>
        <Select density={density} aria-label="Responsável fiscal">
          <option value="">Selecione o colaborador</option>
          <option value="fabio">Fábio</option>
          <option value="bruno">Bruno</option>
        </Select>
      </Field>
      <Field density={density} inset="icon">
        <FieldLabel>Vencimento até</FieldLabel>
        <Input density={density} type="date" defaultValue="2026-03-30" leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />} />
      </Field>
    </div>
  )
}

export default function DataListingDemo() {
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [columnPanelOpen, setColumnPanelOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(rows[0])

  function openDetails(row: (typeof rows)[number]) {
    setSelectedRow(row)
    setDetailsOpen(true)
  }

  return (
    <DocPage
      title="Padrão: Data Listing"
      description="Listagem operacional alinhada às referências do CONTPIX: KPI cards, busca dominante, configuração de colunas, data table densa e dois caminhos oficiais para filtro avançado. Todos os campos reaproveitam a composição pública `Field`."
    >
      <DemoSection
        title="Preview"
        className="!p-0 overflow-hidden"
      >
        <div className="space-y-6 bg-[linear-gradient(180deg,#f8fbff_0%,#f4f8fd_100%)] p-4 sm:p-6 lg:p-7">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h2 className="font-heading text-[2.2rem] leading-[1.02] font-semibold text-[#132446] sm:text-[2.7rem]">
                Gestão de Empresas
              </h2>
              <p className="mt-2 max-w-3xl text-base text-[#72839a] sm:text-[1.05rem]">
                Gerencie sua carteira de clientes, status e pendências com a mesma linguagem de listagem aprovada no CONTPIX.
              </p>
            </div>

            <Button size="lg">
              <Plus className="h-4 w-4" aria-hidden />
              Nova empresa
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {kpis.map((item) => {
              const Icon = item.icon

              return (
                <Card key={item.label} className={`border-l-[4px] ${item.borderClass} rounded-2xl border-[#dce6ef] bg-white`}>
                  <CardContent className="flex items-center justify-between gap-4 !p-5">
                    <div>
                      <p className="text-sm font-semibold text-[#6d7f96]">{item.label}</p>
                      <p className="mt-1 text-[2.2rem] leading-none font-semibold text-[#132446]">{item.value}</p>
                      <p className="mt-2 text-sm text-[#7a8aa0]">{item.helper}</p>
                    </div>
                    <div className={`flex h-11 w-11 items-center justify-center rounded-full ${item.iconClass}`}>
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className="rounded-2xl border-[#dce6ef] bg-white">
            <CardContent className="flex flex-col gap-4 !p-4 md:!p-5">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                <div className="min-w-0 flex-1">
                  <Input
                    type="search"
                    placeholder="Buscar por ID Cliente, Razão Social, CNPJ ou Responsável..."
                    leftIcon={<Search className="h-4 w-4" aria-hidden />}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Ativas</Badge>
                  <Badge variant="secondary">Lixeira</Badge>
                  <Badge variant="secondary">Arquivo morto</Badge>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => setFilterModalOpen(true)}>
                  <Filter className="h-4 w-4" aria-hidden />
                  Filtro modal
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setFilterDrawerOpen(true)}>
                  <Filter className="h-4 w-4" aria-hidden />
                  Filtro drawer
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setColumnPanelOpen((value) => !value)}>
                  <Settings2 className="h-4 w-4" aria-hidden />
                  Colunas
                </Button>
                <Button size="icon" variant="secondary" aria-label="Exportar Excel">
                  <FileSpreadsheet className="h-4 w-4 text-[var(--color-success)]" aria-hidden />
                </Button>
                <Button size="icon" variant="secondary" aria-label="Baixar relatório">
                  <Download className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden rounded-2xl border-[#dce6ef] bg-white">
            <CardHeader className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <CardTitle className="text-lg">Carteira de Clientes</CardTitle>
                  <CardDescription>Lista completa de empresas cadastradas.</CardDescription>
                </div>
                <p className="text-sm text-[var(--color-fg-muted)]">Mostrando 1-20 de 379 empresas</p>
              </div>
            </CardHeader>

            {columnPanelOpen ? (
              <div className="absolute top-[88px] right-6 z-20 w-[250px] rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-float)]">
                <p className="text-sm font-semibold text-[var(--color-fg)]">Arraste para ordenar</p>
                <div className="mt-3 space-y-2 text-sm text-[var(--color-fg-muted)]">
                  {['ID', 'Razão Social', 'CNPJ', 'Responsável', 'Resp. Fiscal', 'Status'].map((column) => (
                    <label key={column} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="accent-[var(--color-secondary)]" />
                      <span>{column}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}

            <CardContent className="!p-0">
              <Table framed={false} className="min-w-[980px]">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>ID</TableHead>
                    <TableHead>Razão Social</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Resp. Fiscal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} className="cursor-pointer" onClick={() => openDetails(row)}>
                      <TableCell className="text-xs font-medium text-[var(--color-fg-muted)]">{row.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-fips-neutral-100)] text-xs font-semibold text-[var(--color-secondary)]">
                            {row.initials}
                          </div>
                          <span className="max-w-[220px] truncate font-medium text-[var(--color-fg)]">{row.company}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-[var(--color-fg-muted)]">{row.cnpj}</TableCell>
                      <TableCell>{row.owner}</TableCell>
                      <TableCell>{row.fiscal}</TableCell>
                      <TableCell>
                        <Badge variant={row.statusVariant}>{row.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button type="button" variant="ghost" size="sm">
                          Ver detalhe
                          <ChevronRight className="h-4 w-4" aria-hidden />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex flex-col gap-3 border-t border-[var(--color-border)] px-6 py-4 text-sm text-[var(--color-fg-muted)] lg:flex-row lg:items-center lg:justify-between">
                <p>Itens por página: 20</p>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary">Anterior</Button>
                  <Badge variant="secondary">1 / 19</Badge>
                  <Button size="sm" variant="secondary">Próxima</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={filterModalOpen} onOpenChange={setFilterModalOpen}>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
            <DialogHeader className="border-b border-[var(--color-border)] pb-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-fips-blue-200)]/55 text-[var(--color-secondary)]">
                  <Filter className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <DialogTitle>Filtros avançados em modal</DialogTitle>
                  <DialogDescription>
                    Variante inspirada no `CompanyList` para cenários em que o filtro detalhado pode ocupar o centro da tela.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <AdvancedFiltersFields />
            <DialogFooter className="sm:justify-between">
              <Button variant="secondary">Limpar filtros</Button>
              <Button>Aplicar filtros</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Drawer open={filterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
          <DrawerContent className="max-w-[440px]">
            <DrawerHeader>
              <DrawerTitle>Filtros avançados em drawer</DrawerTitle>
              <DrawerDescription>
                Variante lateral para quando a pessoa precisa preservar mais contexto da tabela durante a filtragem.
              </DrawerDescription>
            </DrawerHeader>
            <div className="space-y-4">
              <AdvancedFiltersFields compact />
            </div>
            <div className="mt-auto flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-4">
              <Button variant="secondary" className="flex-1">Limpar</Button>
              <Button className="flex-1">Aplicar</Button>
            </div>
          </DrawerContent>
        </Drawer>

        <Drawer open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{selectedRow.company}</DrawerTitle>
              <DrawerDescription>Detalhe rápido de registro inspirado no fluxo lateral do CONTPIX.</DrawerDescription>
            </DrawerHeader>
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Badge variant={selectedRow.statusVariant} dot>
                  {selectedRow.status}
                </Badge>
                <Badge variant="secondary">Em revisão</Badge>
              </div>

              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-semibold text-[var(--color-fg)]">Saúde do cadastro</span>
                  <span className="text-[var(--color-fg-muted)]">{selectedRow.progress}%</span>
                </div>
                <div className="mt-3">
                  <Progress value={selectedRow.progress} />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  ['ID', selectedRow.id],
                  ['CNPJ', selectedRow.cnpj],
                  ['Responsável', selectedRow.owner],
                  ['Resp. Fiscal', selectedRow.fiscal],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-surface-soft)] text-[var(--color-secondary)]">
                      <Building2 className="h-4 w-4" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-fg-muted)]">{label}</p>
                      <p className="text-sm font-medium text-[var(--color-fg)]">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-auto flex flex-col gap-2 border-t border-[var(--color-border)] pt-4">
              <Button>Editar registro</Button>
              <Button variant="secondary">Ir para a página completa</Button>
            </div>
          </DrawerContent>
        </Drawer>
      </DemoSection>

      <PatternGuidelines
        rules={[
          'A listagem deve combinar cards KPI, busca dominante e data table densa na mesma hierarquia.',
          'Filtro avançado pode existir em modal ou drawer; os dois padrões são oficiais.',
          'Configuração de colunas fica como ação secundária perto do título da tabela.',
          'Clique na linha pode abrir detalhe lateral sem tirar a pessoa do contexto.',
        ]}
        required={[
          'Header com título, subtítulo e CTA principal.',
          'Toolbar com busca simples, filtros rápidos e exportações.',
          'Tabela dentro de card próprio, com paginação no rodapé.',
          'Variação documentada para filtro avançado em modal e em drawer.',
        ]}
        optional={[
          'Painel de colunas configuráveis.',
          'Drawer de detalhe com progresso e ações contextuais.',
          'Badges rápidos para status e estados da listagem.',
        ]}
        avoid={[
          'Esconder os filtros avançados sem oferecer busca simples visível.',
          'Misturar regras de negócio com a definição visual da listagem.',
          'Criar uma tabela genérica demais, sem exemplos operacionais reais.',
        ]}
      />
    </DocPage>
  )
}
