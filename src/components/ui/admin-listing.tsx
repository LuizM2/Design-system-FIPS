import * as React from 'react'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  GripVertical,
  Settings2,
} from 'lucide-react'
import { cn } from '../../lib/cn'
import { Button } from './button'
import { Select } from './select'

export type AdminTableSortDirection = 'asc' | 'desc'
export type AdminTableStatusTone = 'success' | 'warning' | 'danger' | 'muted'

export interface AdminTableColumnItem {
  id: string
  label: string
}

export interface AdminTableSortHeaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  active?: boolean
  direction?: AdminTableSortDirection
}

function AdminTableSortHeader({
  className,
  label,
  active = false,
  direction = 'asc',
  type = 'button',
  ...props
}: AdminTableSortHeaderProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center gap-1 whitespace-nowrap rounded-md text-left transition-colors hover:text-[var(--color-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20',
        active ? 'text-[var(--color-fg)]' : 'text-[var(--color-fg-muted)]',
        className,
      )}
      {...props}
    >
      <span>{label}</span>
      {active ? (
        direction === 'asc' ? (
          <ArrowUp className="h-3.5 w-3.5 text-[var(--color-secondary)]" aria-hidden />
        ) : (
          <ArrowDown className="h-3.5 w-3.5 text-[var(--color-secondary)]" aria-hidden />
        )
      ) : (
        <ArrowUpDown className="h-3.5 w-3.5 text-[var(--color-border-strong)]" aria-hidden />
      )}
    </button>
  )
}

export interface AdminTableCompanyCellProps extends React.HTMLAttributes<HTMLDivElement> {
  initials: string
  name: string
}

function AdminTableCompanyCell({ className, initials, name, ...props }: AdminTableCompanyCellProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)} {...props}>
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-fips-blue-100)] text-[11px] font-semibold text-[var(--color-secondary)]">
        {initials}
      </div>
      <span className="max-w-[220px] truncate font-medium text-[var(--color-fg)]">{name}</span>
    </div>
  )
}

const statusToneClasses: Record<AdminTableStatusTone, string> = {
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  danger: 'bg-[var(--color-danger)]',
  muted: 'bg-[var(--color-border-strong)]',
}

export interface AdminTableStatusDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  statuses: AdminTableStatusTone[]
}

function AdminTableStatusDots({ className, statuses, ...props }: AdminTableStatusDotsProps) {
  return (
    <div className={cn('flex items-center gap-1', className)} {...props}>
      {statuses.map((status, index) => (
        <span
          key={`${status}-${index}`}
          className={cn('h-2.5 w-2.5 rounded-full', statusToneClasses[status])}
          aria-hidden
        />
      ))}
      <span className="sr-only">{statuses.join(', ')}</span>
    </div>
  )
}

export interface AdminTableColumnMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: AdminTableColumnItem[]
  visibleColumns: Record<string, boolean>
  onToggleColumn: (columnId: string) => void
  onReorderColumn: (sourceId: string, targetId: string) => void
  buttonLabel?: string
}

function AdminTableColumnMenu({
  className,
  columns,
  visibleColumns,
  onToggleColumn,
  onReorderColumn,
  buttonLabel = 'Colunas',
  ...props
}: AdminTableColumnMenuProps) {
  const [open, setOpen] = React.useState(false)
  const [draggedId, setDraggedId] = React.useState<string | null>(null)
  const [dropTargetId, setDropTargetId] = React.useState<string | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div ref={containerRef} className={cn('relative', className)} {...props}>
      <Button type="button" variant="secondary" size="sm" onClick={() => setOpen((value) => !value)}>
        <Settings2 className="h-4 w-4" aria-hidden />
        {buttonLabel}
      </Button>

      {open ? (
        <div className="absolute top-full right-0 z-20 mt-2 w-[270px] rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-[var(--shadow-float)]">
          <p className="flex items-center gap-2 text-sm font-semibold text-[var(--color-fg)]">
            <GripVertical className="h-4 w-4 text-[var(--color-fg-muted)]" aria-hidden />
            Arraste para ordenar
          </p>
          <div className="mt-3 space-y-1.5">
            {columns.map((column) => {
              const checked = visibleColumns[column.id] ?? true
              const isDropTarget = dropTargetId === column.id

              return (
                <div
                  key={column.id}
                  draggable
                  onDragStart={() => setDraggedId(column.id)}
                  onDragEnd={() => {
                    setDraggedId(null)
                    setDropTargetId(null)
                  }}
                  onDragOver={(event) => {
                    event.preventDefault()
                    setDropTargetId(column.id)
                  }}
                  onDrop={(event) => {
                    event.preventDefault()
                    if (draggedId && draggedId !== column.id) {
                      onReorderColumn(draggedId, column.id)
                    }
                    setDraggedId(null)
                    setDropTargetId(null)
                  }}
                  className={cn(
                    'flex items-center gap-2 rounded-xl border px-2.5 py-2 text-sm transition-colors',
                    isDropTarget
                      ? 'border-[var(--color-secondary)]/40 bg-[var(--color-fips-blue-100)]/45'
                      : 'border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-surface-soft)]',
                  )}
                >
                  <span className="cursor-grab text-[var(--color-fg-muted)] active:cursor-grabbing">
                    <GripVertical className="h-4 w-4" aria-hidden />
                  </span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleColumn(column.id)}
                    className="h-4 w-4 rounded accent-[var(--color-secondary)]"
                    aria-label={`Alternar coluna ${column.label}`}
                  />
                  <span className="flex-1 truncate text-[var(--color-fg)]">{column.label}</span>
                  {checked ? <Check className="h-3.5 w-3.5 text-[var(--color-success)]" aria-hidden /> : null}
                </div>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export interface AdminTablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  page: number
  pageCount: number
  itemsPerPage: number
  itemsPerPageOptions?: number[]
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

function AdminTablePagination({
  className,
  page,
  pageCount,
  itemsPerPage,
  itemsPerPageOptions = [10, 20, 50, 100],
  onPageChange,
  onItemsPerPageChange,
  ...props
}: AdminTablePaginationProps) {
  const totalPages = Math.max(pageCount, 1)

  return (
    <div
      className={cn(
        'flex flex-col gap-3 border-t border-[var(--color-border)] px-6 py-4 lg:flex-row lg:items-center lg:justify-between',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 text-sm text-[var(--color-fg-muted)]">
        <span>Itens por página:</span>
        <div className="w-[84px]">
          <Select
            density="compact"
            aria-label="Itens por página"
            value={String(itemsPerPage)}
            onChange={(event) => onItemsPerPageChange(Number(event.target.value))}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-fg-muted)]">
        <span>Página {page} de {totalPages}</span>
        <div className="flex items-center gap-1">
          <Button type="button" variant="secondary" size="iconSm" onClick={() => onPageChange(1)} disabled={page <= 1}>
            <ChevronsLeft className="h-4 w-4" aria-hidden />
          </Button>
          <Button type="button" variant="secondary" size="iconSm" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </Button>
          <Button type="button" variant="secondary" size="iconSm" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button type="button" variant="secondary" size="iconSm" onClick={() => onPageChange(totalPages)} disabled={page >= totalPages}>
            <ChevronsRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  )
}

export {
  AdminTableColumnMenu,
  AdminTableCompanyCell,
  AdminTablePagination,
  AdminTableSortHeader,
  AdminTableStatusDots,
}
