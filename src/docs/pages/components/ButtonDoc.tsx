import { Check, Plus, Save, Trash2 } from 'lucide-react'
import { DocPage, DemoSection } from '../../components/DocPage'
import { Button } from '../../../components/ui/button'

export default function ButtonDoc() {
  return (
    <DocPage
      title="Button"
      description="Catálogo visual de ações, estados e composições reais do DS-FIPS. A variante verde `success` é o padrão oficial para salvar e gravar."
    >
      <DemoSection title="Variantes do sistema">
        <div className="flex flex-wrap gap-3">
          <Button>Primário</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="outline">Outline</Button>
          <div className="rounded-2xl bg-[var(--color-primary)] p-2">
            <Button variant="inverseOutline">Inverse outline</Button>
          </div>
          <Button variant="ghost">Ghost</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="success">Salvar</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="link">Link</Button>
        </div>
      </DemoSection>

      <DemoSection title="Estados e composições">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Salvar">
            <Check />
          </Button>
          <Button disabled>Disabled</Button>
          <Button variant="success">
            <Save className="h-4 w-4" aria-hidden />
            Gravar
          </Button>
          <Button variant="secondary">
            <Plus className="h-4 w-4" aria-hidden />
            Novo registro
          </Button>
          <Button variant="danger">
            <Trash2 className="h-4 w-4" aria-hidden />
            Excluir
          </Button>
          <Button loading>Carregando</Button>
        </div>
      </DemoSection>

      <DemoSection title="Cenários de negócio">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-5">
            <p className="text-sm font-semibold text-[var(--color-fg)]">Barra de ação</p>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
              Combinações usadas em listagens e formulários operacionais.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="secondary">Salvar rascunho</Button>
              <Button variant="success">
                <Check className="h-4 w-4" aria-hidden />
                Salvar alterações
              </Button>
              <Button variant="accent">Enviar para aprovação</Button>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-5">
            <p className="text-sm font-semibold text-[var(--color-fg)]">Rodapé de modal</p>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
              Cancelar continua neutro; persistência fica verde para reforçar a ação.
            </p>
            <div className="mt-4 flex flex-wrap justify-end gap-3">
              <Button variant="secondary">Cancelar</Button>
              <Button variant="success">
                <Save className="h-4 w-4" aria-hidden />
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </DemoSection>
    </DocPage>
  )
}
