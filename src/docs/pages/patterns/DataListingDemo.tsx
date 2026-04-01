import { useState } from 'react'
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Filter,
  Plus,
  Search,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { CompanyListingFiltersBar, CompanyListingTableCard } from '../../components/CompanyListingShowcase'
import { companyListingRows, type CompanyListingRow, type CompanyViewMode } from '../../components/companyListingData'
import { DemoSection, DocPage } from '../../components/DocPage'
import { PatternGuidelines } from '../../components/PatternGuidelines'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
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
        <Input
          density={density}
          inputMode="numeric"
          placeholder="dd/mm/aaaa"
          defaultValue="30/03/2026"
          leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />}
        />
      </Field>
    </div>
  )
}

export default function DataListingDemo() {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<CompanyViewMode>('active')
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<CompanyListingRow>(companyListingRows[0])

  function openDetails(row: CompanyListingRow) {
    setSelectedRow(row)
    setDetailsOpen(true)
  }

  return (
    <DocPage
      title="Padrão: Data Listing"
      description="Listagem operacional alinhada ao `CompanyList` do CONTPIX: cards KPI, toolbar de busca, tabela administrativa densa, menu de colunas, paginação de admin table e dois caminhos oficiais para filtro avançado."
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
                Gerencie sua carteira de clientes, status e pendências com a mesma hierarquia operacional aprovada no CONTPIX.
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

          <CompanyListingFiltersBar
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onOpenFilterModal={() => setFilterModalOpen(true)}
            onOpenFilterDrawer={() => setFilterDrawerOpen(true)}
            onClearFilters={() => {
              setSearchTerm('')
              setViewMode('active')
            }}
          />

          <CompanyListingTableCard
            searchTerm={searchTerm}
            viewMode={viewMode}
            onRowOpen={openDetails}
          />
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
                  ['Responsável', selectedRow.responsible],
                  ['Resp. Fiscal', selectedRow.respFiscal],
                  ['Resp. DP', selectedRow.respDp],
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
          'A listagem deve combinar cards KPI, toolbar de busca e tabela densa na mesma hierarquia visual do CONTPIX.',
          'Menu de colunas, ordenação e paginação fazem parte do padrão, não são enfeites opcionais.',
          'Filtro avançado pode existir em modal ou drawer; os dois padrões são oficiais.',
          'Clique na linha ou na ação compacta pode abrir detalhe lateral sem tirar a pessoa do contexto.',
        ]}
        required={[
          'Header com título, subtítulo e CTA principal.',
          'Toolbar com busca simples, recortes de visão, filtros e exportações.',
          'Tabela densa com avatar/iniciais, status por departamentos e badge final.',
          'Menu de colunas ancorado no botão e paginação estilo admin table.',
        ]}
        optional={[
          'Drawer de detalhe com progresso e ações contextuais.',
          'Variação documentada para filtro avançado em modal e em drawer.',
          'Badges rápidos para reforçar o estado da listagem.',
        ]}
        avoid={[
          'Usar uma tabela genérica e espaçada demais para cenários administrativos.',
          'Esconder busca simples ou paginação atrás do filtro avançado.',
          'Resolver a riqueza visual da listagem com classes soltas em página em vez de composições reutilizáveis.',
        ]}
      />
    </DocPage>
  )
}
