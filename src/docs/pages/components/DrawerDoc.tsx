import { useState } from 'react'
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Filter,
  FolderKanban,
  Search,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../../../components/ui/drawer'
import { Input } from '../../../components/ui/input'
import { Progress } from '../../../components/ui/progress'
import { Select } from '../../../components/ui/select'

const drawerPageSource = `import { Button, Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from 'ds-fips'

export function FilterDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Abrir drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filtros avançados</DrawerTitle>
          <DrawerDescription>Refine a listagem.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}`

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block space-y-2 text-sm font-semibold text-[var(--color-fg)]">{children}</label>
}

export default function DrawerDoc() {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false)

  return (
    <DocPage
      title="Drawer"
      description="Painel lateral para filtros, detalhes rápidos ou formulários auxiliares. A documentação cobre os dois usos aprovados: filtro avançado e detalhe de registro."
      pageSource={drawerPageSource}
      pageDownloadName="DrawerExamples.tsx"
    >
      <DemoSection
        title="Filtro avançado em drawer"
        reference={`<DrawerContent>
  <DrawerHeader>...</DrawerHeader>
  {/* filtros em pilha */}
</DrawerContent>`}
        referenceLabel="Drawer de filtro"
      >
        <Drawer open={filterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="secondary">
              <Filter className="h-4 w-4" aria-hidden />
              Abrir filtro lateral
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-w-[440px]">
            <DrawerHeader>
              <DrawerTitle>Filtros avançados</DrawerTitle>
              <DrawerDescription>
                Variante lateral para cenários em que a pessoa precisa manter a tabela parcialmente visível enquanto refina os critérios.
              </DrawerDescription>
            </DrawerHeader>

            <div className="space-y-4">
              <FieldLabel>
                Busca rápida
                <Input placeholder="Empresa, CNPJ ou responsável..." leftIcon={<Search className="h-4 w-4" aria-hidden />} />
              </FieldLabel>
              <FieldLabel>
                Status
                <Select aria-label="Status">
                  <option value="">Selecione</option>
                  <option value="ativo">Ativo</option>
                  <option value="novo">Novo</option>
                </Select>
              </FieldLabel>
              <FieldLabel>
                Segmento
                <Select aria-label="Segmento">
                  <option value="">Selecione</option>
                  <option value="comercio">Comércio</option>
                  <option value="servico">Serviço</option>
                </Select>
              </FieldLabel>
              <FieldLabel>
                Responsável fiscal
                <Select aria-label="Responsável fiscal">
                  <option value="">Selecione o colaborador</option>
                  <option value="fabio">Fábio</option>
                </Select>
              </FieldLabel>
              <FieldLabel>
                Vencimento até
                <Input type="date" defaultValue="2026-03-30" leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />} />
              </FieldLabel>
            </div>

            <div className="mt-auto flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-4">
              <Button type="button" variant="secondary" className="flex-1">
                Limpar
              </Button>
              <Button type="button" className="flex-1">
                Aplicar filtros
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </DemoSection>

      <DemoSection
        title="Detalhe de registro"
        reference={`<DrawerContent>
  <DrawerHeader>...</DrawerHeader>
  {/* blocos de detalhe + ações */}
</DrawerContent>`}
        referenceLabel="Drawer de detalhe"
      >
        <Drawer open={detailsDrawerOpen} onOpenChange={setDetailsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button>
              <FolderKanban className="h-4 w-4" aria-hidden />
              Abrir detalhe lateral
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-fips-blue-200)]/55 text-[var(--color-secondary)]">
                  <ShieldCheck className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <DrawerTitle>Certificado #508</DrawerTitle>
                  <DrawerDescription>Use este padrão para leitura rápida sem sair da listagem.</DrawerDescription>
                </div>
              </div>
            </DrawerHeader>

            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Badge variant="warning" dot>
                  Vencendo
                </Badge>
                <Badge variant="secondary">A1</Badge>
              </div>

              <div className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Progresso de renovação</p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-[var(--color-fg)]">Em andamento</span>
                    <span className="text-[var(--color-fg-muted)]">64%</span>
                  </div>
                  <Progress value={64} />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Building2, label: 'Empresa', value: 'Black Ice Confecções e Comércio' },
                  { icon: UserRound, label: 'Responsável', value: 'Ronaldo' },
                  { icon: CalendarDays, label: 'Vencimento', value: '30/04/2026' },
                  { icon: CheckCircle2, label: 'Observação', value: 'Renovação já sinalizada para o time fiscal.' },
                ].map(({ icon: ItemIcon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <ItemIcon className="mt-0.5 h-4 w-4 text-[var(--color-fg-muted)]" aria-hidden />
                    <div>
                      <p className="text-xs text-[var(--color-fg-muted)]">{label}</p>
                      <p className="text-sm font-medium text-[var(--color-fg)]">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-2 border-t border-[var(--color-border)] pt-4">
              <Button type="button">Editar certificado</Button>
              <Button type="button" variant="secondary">
                Visualizar na aba acessos
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </DemoSection>
    </DocPage>
  )
}
