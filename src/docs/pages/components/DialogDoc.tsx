import { DocPage, DemoSection } from '../../components/DocPage'
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

export default function DialogDoc() {
  return (
    <DocPage
      title="Modal (Dialog)"
      description="Sobreposição modal com foco preso e fechamento via overlay, tecla Esc ou botão fechar (Radix UI)."
    >
      <DemoSection
        title="Interativo"
        reference={`import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from 'ds-fips'

<Dialog>
  <DialogTrigger asChild><button type="button">Abrir</button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título</DialogTitle>
      <DialogDescription>Descrição</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild><button type="button">Fechar</button></DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        referenceLabel="Dialog (modal)"
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>Abrir modal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar ação</DialogTitle>
              <DialogDescription>
                Esta ação pode ser desfeita nas próximas 24 horas. Deseja continuar?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="button">Confirmar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DemoSection>
    </DocPage>
  )
}
