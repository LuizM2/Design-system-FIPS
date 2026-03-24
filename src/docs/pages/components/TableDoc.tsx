import { DocPage, DemoSection } from '../../components/DocPage'
import { Badge } from '../../../components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'

const rows = [
  { id: 'REQ-2048', area: 'Operações', owner: 'Ana Costa', status: 'Em andamento' as const },
  { id: 'REQ-2049', area: 'TI', owner: 'Bruno Lima', status: 'Concluído' as const },
]

export default function TableDoc() {
  return (
    <DocPage
      title="Table"
      description="Tabela responsiva com cabeçalho fixo visual e hover nas linhas."
    >
      <DemoSection
        title="Exemplo"
        reference={`import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from 'ds-fips'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Coluna</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Célula</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        referenceLabel="Tabela"
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
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">{r.id}</TableCell>
                <TableCell>{r.area}</TableCell>
                <TableCell>{r.owner}</TableCell>
                <TableCell>
                  <Badge variant={r.status === 'Concluído' ? 'success' : 'secondary'}>
                    {r.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DemoSection>
    </DocPage>
  )
}
