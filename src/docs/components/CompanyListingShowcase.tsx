import { useMemo, useState } from 'react'
import {
  Archive,
  Download,
  FileSpreadsheet,
  Filter,
  MoreHorizontal,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import {
  AdminTableColumnMenu,
  AdminTableCompanyCell,
  AdminTablePagination,
  AdminTableSortHeader,
  AdminTableStatusDots,
  type AdminTableColumnItem,
  type AdminTableSortDirection,
} from '../../components/ui/admin-listing'
import { companyListingRows, type CompanyListingRow, type CompanyViewMode } from './companyListingData'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from '../../components/ui/table'

const tableColumns: AdminTableColumnItem[] = [
  { id: 'id', label: 'ID' },
  { id: 'company', label: 'Razão Social' },
  { id: 'cnpj', label: 'CNPJ' },
  { id: 'responsible', label: 'Responsável' },
  { id: 'respFiscal', label: 'Resp. Fiscal' },
  { id: 'respDp', label: 'Resp. DP' },
  { id: 'respContabil', label: 'Resp. Contábil' },
  { id: 'respFinanceiro', label: 'Resp. Financeiro' },
  { id: 'respJucesp', label: 'Resp. JUCESP' },
  { id: 'departments', label: 'Depts.' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Ações' },
]

const defaultVisibleColumns = Object.fromEntries(tableColumns.map((column) => [column.id, true])) as Record<string, boolean>

function reorderColumns(columns: string[], sourceId: string, targetId: string) {
  const sourceIndex = columns.indexOf(sourceId)
  const targetIndex = columns.indexOf(targetId)

  if (sourceIndex === -1 || targetIndex === -1 || sourceIndex === targetIndex) {
    return columns
  }

  const nextColumns = [...columns]
  const [moved] = nextColumns.splice(sourceIndex, 1)
  nextColumns.splice(targetIndex, 0, moved)
  return nextColumns
}

function sortRows(rows: CompanyListingRow[], sortKey: string, direction: AdminTableSortDirection) {
  const normalized = [...rows].sort((left, right) => {
    const leftValue = sortKey === 'id' ? Number(left.id.replace('#', '')) : String(left[sortKey as keyof CompanyListingRow] ?? '')
    const rightValue = sortKey === 'id' ? Number(right.id.replace('#', '')) : String(right[sortKey as keyof CompanyListingRow] ?? '')

    if (leftValue < rightValue) return direction === 'asc' ? -1 : 1
    if (leftValue > rightValue) return direction === 'asc' ? 1 : -1
    return 0
  })

  return normalized
}

export interface CompanyListingFiltersBarProps {
  searchTerm: string
  onSearchTermChange: (value: string) => void
  viewMode: CompanyViewMode
  onViewModeChange: (mode: CompanyViewMode) => void
  onOpenFilterModal?: () => void
  onOpenFilterDrawer?: () => void
  onClearFilters?: () => void
}

export function CompanyListingFiltersBar({
  searchTerm,
  onSearchTermChange,
  viewMode,
  onViewModeChange,
  onOpenFilterModal,
  onOpenFilterDrawer,
  onClearFilters,
}: CompanyListingFiltersBarProps) {
  return (
    <Card className="rounded-2xl border-[#dce6ef] bg-white">
      <CardContent className="flex flex-col gap-4 !p-4 md:!p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="min-w-0 flex-1">
            <Input
              type="search"
              placeholder="Buscar por ID Cliente, Razão Social, CNPJ ou Responsável..."
              leftIcon={<Search className="h-4 w-4" aria-hidden />}
              value={searchTerm}
              onChange={(event) => onSearchTermChange(event.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant={viewMode === 'active' ? 'primary' : 'secondary'} onClick={() => onViewModeChange('active')}>
              Ativas
            </Button>
            <Button size="sm" variant={viewMode === 'deleted' ? 'primary' : 'secondary'} onClick={() => onViewModeChange('deleted')}>
              <Trash2 className="h-4 w-4" aria-hidden />
              Lixeira
            </Button>
            <Button size="sm" variant={viewMode === 'archived' ? 'primary' : 'secondary'} onClick={() => onViewModeChange('archived')}>
              <Archive className="h-4 w-4" aria-hidden />
              Arquivo morto
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="secondary" onClick={onOpenFilterModal}>
            <Filter className="h-4 w-4" aria-hidden />
            Filtros
          </Button>
          {onOpenFilterDrawer ? (
            <Button size="sm" variant="secondary" onClick={onOpenFilterDrawer}>
              <Filter className="h-4 w-4" aria-hidden />
              Drawer
            </Button>
          ) : null}
          <Button size="iconSm" variant="secondary" aria-label="Exportar Excel">
            <FileSpreadsheet className="h-4 w-4 text-[var(--color-success)]" aria-hidden />
          </Button>
          <Button size="iconSm" variant="secondary" aria-label="Baixar relatório">
            <Download className="h-4 w-4" aria-hidden />
          </Button>
          <Button size="iconSm" variant="ghost" aria-label="Limpar filtros" onClick={onClearFilters}>
            <X className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export interface CompanyListingTableCardProps {
  rows?: CompanyListingRow[]
  searchTerm?: string
  viewMode?: CompanyViewMode
  onRowOpen?: (row: CompanyListingRow) => void
}

export function CompanyListingTableCard({
  rows = companyListingRows,
  searchTerm = '',
  viewMode = 'active',
  onRowOpen,
}: CompanyListingTableCardProps) {
  const [columnOrder, setColumnOrder] = useState(tableColumns.map((column) => column.id))
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns)
  const [sortKey, setSortKey] = useState('id')
  const [sortDirection, setSortDirection] = useState<AdminTableSortDirection>('desc')
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    return rows.filter((row) => {
      const matchesView = row.bucket === viewMode
      if (!matchesView) return false

      if (!term) return true

      const haystack = [
        row.id,
        row.company,
        row.cnpj,
        row.responsible,
        row.respFiscal,
        row.respDp,
        row.respContabil,
        row.respFinanceiro,
        row.respJucesp,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(term)
    })
  }, [rows, searchTerm, viewMode])

  const sortedRows = useMemo(() => sortRows(filteredRows, sortKey, sortDirection), [filteredRows, sortKey, sortDirection])
  const pageCount = Math.max(Math.ceil(sortedRows.length / itemsPerPage), 1)
  const currentPage = Math.min(page, pageCount)
  const startIndex = sortedRows.length === 0 ? 0 : (currentPage - 1) * itemsPerPage
  const paginatedRows = sortedRows.slice(startIndex, startIndex + itemsPerPage)
  const orderedVisibleColumns = columnOrder.filter((columnId) => visibleColumns[columnId] ?? true)

  function toggleColumn(columnId: string) {
    setVisibleColumns((current) => ({
      ...current,
      [columnId]: !current[columnId],
    }))
  }

  function handleSort(columnId: string) {
    if (sortKey === columnId) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortKey(columnId)
    setSortDirection(columnId === 'id' ? 'desc' : 'asc')
  }

  function renderHeader(columnId: string) {
    const isActive = sortKey === columnId
    const sortableColumns = new Set(['id', 'company', 'cnpj', 'responsible', 'respFiscal', 'respDp', 'respContabil', 'respFinanceiro', 'respJucesp'])
    const label = tableColumns.find((column) => column.id === columnId)?.label ?? columnId

    if (!sortableColumns.has(columnId)) {
      return <span>{label}</span>
    }

    return (
      <AdminTableSortHeader
        label={label}
        active={isActive}
        direction={sortDirection}
        onClick={() => handleSort(columnId)}
      />
    )
  }

  function renderCell(row: CompanyListingRow, columnId: string) {
    switch (columnId) {
      case 'id':
        return <span className="text-xs font-medium text-[var(--color-fg-muted)]">{row.id}</span>
      case 'company':
        return <AdminTableCompanyCell initials={row.initials} name={row.company} />
      case 'cnpj':
        return <span className="text-[13px] text-[var(--color-fg-muted)]">{row.cnpj}</span>
      case 'responsible':
        return row.responsible
      case 'respFiscal':
        return row.respFiscal
      case 'respDp':
        return row.respDp
      case 'respContabil':
        return row.respContabil
      case 'respFinanceiro':
        return row.respFinanceiro
      case 'respJucesp':
        return row.respJucesp
      case 'departments':
        return <AdminTableStatusDots statuses={row.departmentStatuses} />
      case 'status':
        return <Badge variant={row.statusVariant}>{row.status}</Badge>
      case 'actions':
        return (
          <Button
            type="button"
            variant="secondary"
            size="iconSm"
            aria-label={`Ações de ${row.company}`}
            onClick={(event) => {
              event.stopPropagation()
              onRowOpen?.(row)
            }}
          >
            <MoreHorizontal className="h-4 w-4" aria-hidden />
          </Button>
        )
      default:
        return null
    }
  }

  const startLabel = sortedRows.length === 0 ? 0 : startIndex + 1
  const endLabel = startIndex + paginatedRows.length

  return (
    <Card className="overflow-visible rounded-2xl border-[#dce6ef] bg-white">
      <CardHeader className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-lg">Carteira de Clientes</CardTitle>
            <CardDescription>Lista completa de empresas cadastradas.</CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <AdminTableColumnMenu
              columns={columnOrder.map((columnId) => tableColumns.find((column) => column.id === columnId)).filter(Boolean) as AdminTableColumnItem[]}
              visibleColumns={visibleColumns}
              onToggleColumn={toggleColumn}
              onReorderColumn={(sourceId, targetId) => {
                setColumnOrder((current) => reorderColumns(current, sourceId, targetId))
              }}
            />
            <p className="text-sm text-[var(--color-fg-muted)]">
              Mostrando {startLabel}-{endLabel} de {sortedRows.length} empresas
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="!p-0">
        <Table density="dense" framed={false} className="min-w-[1380px]">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {orderedVisibleColumns.map((columnId) => (
                <TableHead key={columnId}>{renderHeader(columnId)}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRows.length === 0 ? (
              <TableEmpty
                colSpan={Math.max(orderedVisibleColumns.length, 1)}
                title="Nenhuma empresa encontrada"
                description="Use este estado quando os filtros ou a busca não retornarem resultados."
              />
            ) : (
              paginatedRows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  onClick={() => onRowOpen?.(row)}
                >
                  {orderedVisibleColumns.map((columnId) => (
                    <TableCell key={`${row.id}-${columnId}`}>{renderCell(row, columnId)}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <AdminTablePagination
          page={currentPage}
          pageCount={pageCount}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </CardContent>
    </Card>
  )
}
