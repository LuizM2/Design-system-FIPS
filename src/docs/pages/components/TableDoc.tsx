import { useState } from 'react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { CompanyListingFiltersBar, CompanyListingTableCard } from '../../components/CompanyListingShowcase'
import type { CompanyViewMode } from '../../components/companyListingData'
import { Badge } from '../../../components/ui/badge'
import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from '../../../components/ui/table'

export default function TableDoc() {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<CompanyViewMode>('active')

  return (
    <DocPage
      title="Table"
      description="Estrutura base para data tables e listagens operacionais. A primitiva continua simples, e a demo rica abaixo espelha a linguagem do `CompanyList` do CONTPIX usando composições oficiais reutilizáveis."
    >
      <DemoSection
        title="Estrutura básica"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Área</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-xs">REQ-2048</TableCell>
              <TableCell>Operações</TableCell>
              <TableCell>Ana Costa</TableCell>
              <TableCell>
                <Badge variant="secondary">Em andamento</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-xs">REQ-2049</TableCell>
              <TableCell>TI</TableCell>
              <TableCell>Bruno Lima</TableCell>
              <TableCell>
                <Badge variant="success">Concluído</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DemoSection>

      <DemoSection
        title="Listagem operacional"
      >
        <div className="space-y-4 bg-[linear-gradient(180deg,#f8fbff_0%,#f4f8fd_100%)] p-4 sm:p-5">
          <CompanyListingFiltersBar
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onClearFilters={() => {
              setSearchTerm('')
              setViewMode('active')
            }}
          />
          <CompanyListingTableCard searchTerm={searchTerm} viewMode={viewMode} />
        </div>
      </DemoSection>

      <DemoSection
        title="Estado vazio"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Observação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableEmpty
              colSpan={4}
              title="Nenhum registro encontrado"
              description="Use este estado quando filtros ou busca retornarem zero resultados."
            />
          </TableBody>
        </Table>
      </DemoSection>
    </DocPage>
  )
}
