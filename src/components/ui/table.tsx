import * as React from 'react'
import { cn } from '../../lib/cn'

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  framed?: boolean
  density?: 'default' | 'dense'
}

const TableDensityContext = React.createContext<'default' | 'dense'>('default')

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, framed = true, density = 'default', ...props }, ref) => {
    const table = (
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm', className)}
        data-density={density}
        {...props}
      />
    )

    if (!framed) {
      return (
        <TableDensityContext.Provider value={density}>
          <div className="relative w-full overflow-auto">{table}</div>
        </TableDensityContext.Provider>
      )
    }

    return (
      <TableDensityContext.Provider value={density}>
        <div className="relative w-full overflow-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
          {table}
        </div>
      </TableDensityContext.Provider>
    )
  },
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('border-b border-[var(--color-border)] bg-[var(--color-surface)]', className)}
    {...props}
  />
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
))
TableBody.displayName = 'TableBody'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-surface-soft)] data-[state=selected]:bg-[var(--color-surface-muted)]',
        className,
      )}
      {...props}
    />
  ),
)
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const density = React.useContext(TableDensityContext)

  return (
    <th
      ref={ref}
      className={cn(
        density === 'dense'
          ? 'h-10 px-2 text-left align-middle text-[13px] font-medium text-[var(--color-fg-muted)]'
          : 'h-14 px-4 text-left align-middle text-sm font-semibold text-[var(--color-fg-muted)]',
        className,
      )}
      {...props}
    />
  )
})
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const density = React.useContext(TableDensityContext)

  return (
    <td
      ref={ref}
      className={cn(
        density === 'dense'
          ? 'px-2 py-2.5 align-middle text-[13.5px] text-[var(--color-fg)]'
          : 'px-4 py-5 align-middle text-[15px] text-[var(--color-fg)]',
        className,
      )}
      {...props}
    />
  )
})
TableCell.displayName = 'TableCell'

interface TableEmptyProps extends React.HTMLAttributes<HTMLTableRowElement> {
  colSpan: number
  title?: string
  description?: string
}

const TableEmpty = React.forwardRef<HTMLTableRowElement, TableEmptyProps>(
  ({ className, colSpan, title = 'Nenhum registro encontrado', description, ...props }, ref) => (
    <tr ref={ref} className={className} {...props}>
      <td colSpan={colSpan} className="px-6 py-14 text-center">
        <div className="mx-auto max-w-sm space-y-2">
          <p className="font-medium text-[var(--color-fg)]">{title}</p>
          {description ? (
            <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">{description}</p>
          ) : null}
        </div>
      </td>
    </tr>
  ),
)
TableEmpty.displayName = 'TableEmpty'

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableEmpty }
