import { ArrowUp, ArrowUpDown, Download, FileSpreadsheet, Search, Settings2 } from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from '../../../components/ui/table'

const rows = [
  {
    id: '#508',
    initials: 'BC',
    company: 'Black Ice Confecções e Comércio',
    cnpj: '65.728.689/0001-10',
    owner: 'Ronaldo',
    fiscal: 'Fábio',
    status: 'Novo',
  },
  {
    id: '#507',
    initials: 'HR',
    company: 'HRB Gestão Integrada LTDA',
    cnpj: '65.597.871/0001-88',
    owner: 'Heloísa',
    fiscal: 'Fábio',
    status: 'Ativo',
  },
  {
    id: '#506',
    initials: 'EC',
    company: 'Erivan Cx & C5 Consultoria',
    cnpj: '65.519.974/0001-21',
    owner: 'Erivan',
    fiscal: 'Fábio',
    status: 'Ativo',
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

export default function TableDoc() {
  return (
    <DocPage
      title="Table"
      description="Estrutura base para data tables e listagens operacionais. O componente continua simples, e a riqueza visual fica na composição com cards, filtros e paginação."
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
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <CardTitle className="text-lg">Carteira de Clientes</CardTitle>
                  <CardDescription>Listagem mais densa inspirada no `CompanyList` do CONTPIX.</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="icon" variant="secondary" aria-label="Exportar Excel">
                    <FileSpreadsheet className="h-4 w-4 text-[var(--color-success)]" aria-hidden />
                  </Button>
                  <Button size="icon" variant="secondary" aria-label="Baixar relatório">
                    <Download className="h-4 w-4" aria-hidden />
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Settings2 className="h-4 w-4" aria-hidden />
                    Colunas
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                <div className="min-w-0 flex-1">
                  <Input
                    type="search"
                    placeholder="Buscar por ID Cliente, Razão Social, CNPJ ou Responsável..."
                    leftIcon={<Search className="h-4 w-4" aria-hidden />}
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--color-fg-muted)]">
                  <Badge variant="secondary">Ativas</Badge>
                  <Badge variant="secondary">Lixeira</Badge>
                  <Badge variant="secondary">Arquivo morto</Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="!p-0">
            <Table framed={false} className="min-w-[980px]">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead><SortLabel label="ID" /></TableHead>
                  <TableHead><SortLabel label="Razão Social" active /></TableHead>
                  <TableHead><SortLabel label="CNPJ" /></TableHead>
                  <TableHead><SortLabel label="Responsável" /></TableHead>
                  <TableHead><SortLabel label="Resp. Fiscal" /></TableHead>
                  <TableHead><SortLabel label="Status" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} className="cursor-pointer">
                    <TableCell className="text-xs font-medium text-[var(--color-fg-muted)]">{row.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-fips-neutral-100)] text-xs font-semibold text-[var(--color-secondary)]">
                          {row.initials}
                        </div>
                        <span className="truncate font-medium">{row.company}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-[var(--color-fg-muted)]">{row.cnpj}</TableCell>
                    <TableCell>{row.owner}</TableCell>
                    <TableCell>{row.fiscal}</TableCell>
                    <TableCell>
                      <Badge variant={row.status === 'Novo' ? 'secondary' : 'success'}>{row.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex flex-col gap-3 border-t border-[var(--color-border)] px-6 py-4 text-sm text-[var(--color-fg-muted)] lg:flex-row lg:items-center lg:justify-between">
              <p>Mostrando 1-20 de 379 empresas</p>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary">Anterior</Button>
                <Badge variant="secondary">1 / 19</Badge>
                <Button size="sm" variant="secondary">Próxima</Button>
              </div>
            </div>
          </CardContent>
        </Card>
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
