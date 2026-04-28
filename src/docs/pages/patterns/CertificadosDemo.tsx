import { Download, FileSpreadsheet, Search } from 'lucide-react'
import { DocPage, DemoSection } from '../../components/DocPage'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'

const kpis = [
  { label: 'Total de empresas', value: '128', border: 'border-l-[var(--color-fips-blue-900)]' },
  { label: 'Válidos', value: '96', border: 'border-l-[var(--color-fips-green-500)]' },
  { label: 'Vencendo', value: '12', border: 'border-l-[var(--color-accent-strong)]' },
  { label: 'Vencidos', value: '14', border: 'border-l-red-600' },
  { label: 'Pendentes', value: '6', border: 'border-l-[var(--color-fips-gray-400)]' },
]

const rows = [
  {
    id: 'C-1021',
    company: 'Doceria Central',
    initials: 'DC',
    avatarBg: 'bg-[var(--color-fips-blue-200)] text-[var(--color-fips-blue-900)]',
    client: 'Maria Souza',
    type: 'A1',
    days: '-12',
    status: 'Vencido',
    statusVariant: 'danger' as const,
  },
  {
    id: 'C-1022',
    company: 'Armazém Santos',
    initials: 'AS',
    avatarBg: 'bg-[var(--color-fips-yellow-100)] text-[var(--color-fips-gray-900)]',
    client: 'João Prado',
    type: 'A3',
    days: '34',
    status: 'Válido',
    statusVariant: 'success' as const,
  },
]

export default function CertificadosDemo() {
  return (
    <DocPage
      title="Padrão: Tabela de certificados"
      description="Lista densa com KPIs, busca, filtros por segmento e linhas com realce semântico — alinhado a gestão documental."
    >
      <DemoSection
        title="Preview"
        className="!p-0 overflow-hidden"
      >
        <div className="space-y-6 bg-[var(--color-surface-muted)] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-semibold">Gestão de certificados</h2>
              <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                Controle de validade, alertas e exportação.
              </p>
            </div>
            <Button className="gap-2">
              + Novo certificado
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {kpis.map((k) => (
              <Card
                key={k.label}
                className={`border-[#E2E8F0] border-l-4 ${k.border} shadow-[var(--shadow-card)]`}
              >
                <CardContent className="space-y-1 pt-5">
                  <p className="text-xs font-medium text-[var(--color-fg-muted)]">{k.label}</p>
                  <p className="font-heading text-2xl font-semibold">{k.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-[var(--color-border)]">
            <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center">
              <div className="flex-1">
                <Input
                  placeholder="Buscar por empresa ou cliente…"
                  leftIcon={<Search className="h-4 w-4" aria-hidden />}
                  aria-label="Buscar certificados"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {['Todos', 'Válidos', 'Vencendo', 'Vencidos'].map((f, i) => (
                  <Button
                    key={f}
                    type="button"
                    size="sm"
                    variant={i === 0 ? 'secondary' : 'ghost'}
                  >
                    {f}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button type="button" size="icon" variant="secondary" aria-label="Exportar PDF">
                  <Download className="h-4 w-4 text-red-600" />
                </Button>
                <Button type="button" size="icon" variant="secondary" aria-label="Exportar Excel">
                  <FileSpreadsheet className="h-4 w-4 text-green-600" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--color-border)]">
            <CardHeader>
              <CardTitle>Carteira de certificados</CardTitle>
              <p className="text-sm text-[var(--color-fg-muted)]">Exibindo 1–2 de 345</p>
            </CardHeader>
            <CardContent className="px-0 pb-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Dias</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow
                      key={r.id}
                      className={r.status === 'Vencido' ? 'bg-red-50/80' : undefined}
                    >
                      <TableCell className="font-mono text-xs">{r.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${r.avatarBg}`}
                          >
                            {r.initials}
                          </span>
                          <span className="text-sm font-medium">{r.company}</span>
                        </div>
                      </TableCell>
                      <TableCell>{r.client}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{r.type}</Badge>
                      </TableCell>
                      <TableCell className={r.days.startsWith('-') ? 'font-medium text-red-600' : ''}>
                        {r.days}
                      </TableCell>
                      <TableCell>
                        <Badge variant={r.statusVariant}>{r.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DemoSection>
    </DocPage>
  )
}
