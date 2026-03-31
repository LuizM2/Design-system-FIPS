import { useState } from 'react'
import { Building2, CalendarDays, Check, Filter, Search, X } from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import { Select } from '../../../components/ui/select'

const dialogPageSource = `import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'ds-fips'

export function ConfirmationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Abrir modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar ação</DialogTitle>
          <DialogDescription>Deseja continuar?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary">Cancelar</Button>
          <Button>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block space-y-2 text-sm font-semibold text-[var(--color-fg)]">{children}</label>
}

export default function DialogDoc() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <DocPage
      title="Modal (Dialog)"
      description="Sobreposição modal para confirmação, filtros avançados e tarefas contextuais. A documentação cobre um modal enxuto de confirmação e um modal operacional de filtros."
      pageSource={dialogPageSource}
      pageDownloadName="DialogExamples.tsx"
    >
      <DemoSection
        title="Confirmação"
        reference={`<DialogContent>
  <DialogHeader>...</DialogHeader>
  <DialogFooter>...</DialogFooter>
</DialogContent>`}
        referenceLabel="Modal de confirmação"
      >
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogTrigger asChild>
            <Button>Excluir certificado</Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader className="border-b border-[var(--color-border)] pb-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-fips-red-100)] text-[var(--color-danger)]">
                  <X className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <DialogTitle>Excluir certificado</DialogTitle>
                  <DialogDescription>
                    Esta ação remove os dados do certificado da empresa selecionada. Use este padrão para confirmações críticas e irreversíveis.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="button" variant="danger">
                Confirmar exclusão
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DemoSection>

      <DemoSection
        title="Filtro avançado em modal"
        reference={`<DialogContent className="max-w-4xl">
  {/* cabeçalho */}
  {/* grid de filtros */}
  <DialogFooter>...</DialogFooter>
</DialogContent>`}
        referenceLabel="Modal de filtro avançado"
      >
        <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary">
              <Filter className="h-4 w-4" aria-hidden />
              Abrir filtros avançados
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
            <DialogHeader className="border-b border-[var(--color-border)] pb-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-fips-blue-200)]/55 text-[var(--color-secondary)]">
                  <Filter className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <DialogTitle>Filtros avançados</DialogTitle>
                  <DialogDescription>
                    Referência de `popup/modal` inspirada no `CompanyList` do CONTPIX para cenários em que o filtro detalhado não precisa ocupar a lateral da tela.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="grid gap-4 py-1 md:grid-cols-2">
              <FieldLabel>
                Razão social
                <Input placeholder="Nome da empresa" leftIcon={<Search className="h-4 w-4" aria-hidden />} />
              </FieldLabel>
              <FieldLabel>
                Nome fantasia
                <Input placeholder="Nome fantasia" leftIcon={<Building2 className="h-4 w-4" aria-hidden />} />
              </FieldLabel>
              <FieldLabel>
                CNPJ
                <Input placeholder="00.000.000/0000-00" />
              </FieldLabel>
              <FieldLabel>
                ID do cliente
                <Input placeholder="Ex: 1234" />
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
                Regime atual
                <Select aria-label="Regime atual">
                  <option value="">Selecione</option>
                  <option value="sn">SN</option>
                  <option value="lr">LR</option>
                </Select>
              </FieldLabel>
              <FieldLabel>
                Responsável fiscal
                <Select aria-label="Responsável fiscal">
                  <option value="">Selecione o colaborador</option>
                  <option value="fabio">Fábio</option>
                  <option value="bruno">Bruno</option>
                </Select>
              </FieldLabel>
              <FieldLabel>
                Vencimento até
                <Input type="date" defaultValue="2026-03-30" leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />} />
              </FieldLabel>
            </div>

            <DialogFooter className="sm:justify-between">
              <Button type="button" variant="secondary">
                Limpar filtros
              </Button>
              <div className="flex flex-wrap gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="button">
                  <Check className="h-4 w-4" aria-hidden />
                  Aplicar filtros
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DemoSection>
    </DocPage>
  )
}
