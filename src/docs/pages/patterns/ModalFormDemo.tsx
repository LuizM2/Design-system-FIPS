import { Building2, CalendarDays, Check, Paperclip, UserRound, Zap } from 'lucide-react'
import { useState } from 'react'
import { DocPage, DemoSection } from '../../components/DocPage'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import { Select } from '../../../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Textarea } from '../../../components/ui/textarea'

export default function ModalFormDemo() {
  const [open, setOpen] = useState(false)
  const [priority, setPriority] = useState<'baixa' | 'media' | 'alta' | 'urgente'>('media')

  return (
    <DocPage
      title="Padrão: Modal de formulário"
      description="Formulário em duas colunas com abas superiores, campos com ícones e ações primárias — referência para fluxos de criação."
    >
      <DemoSection
        title="Interativo"
        reference={`/* Modal largo */
<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">

/* Abas + grid formulário */
<Tabs defaultValue="...">
  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4" />
</Tabs>
<div className="grid gap-4 md:grid-cols-2">...</div>

/* Prioridade = grupo de Button variant outline/secondary */
/* Área de anexo */
className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4"`}
        referenceLabel="Modal formulário — estrutura"
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Abrir exemplo de “Novo item”</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-fips-blue-200)]">
                  <Zap className="h-5 w-5 text-[var(--color-secondary)]" aria-hidden />
                </div>
                <div>
                  <DialogTitle>Novo item</DialogTitle>
                  <DialogDescription>
                    Crie uma nova tarefa ou agende uma reunião com responsáveis definidos.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <Tabs defaultValue="atendimento" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                <TabsTrigger value="atendimento">Atendimento</TabsTrigger>
                <TabsTrigger value="tarefa">Tarefa</TabsTrigger>
                <TabsTrigger value="projeto">Projeto</TabsTrigger>
                <TabsTrigger value="reuniao">Reunião</TabsTrigger>
              </TabsList>
              <TabsContent value="atendimento" className="space-y-4 border-0 p-0 pt-4 shadow-none">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <label className="block space-y-1.5 text-sm font-medium">
                      Título <span className="text-red-600">*</span>
                      <Input
                        placeholder="Ex.: Ajuste de integração EDI"
                        leftIcon={<Zap className="h-4 w-4" aria-hidden />}
                      />
                    </label>
                    <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                      <label className="block space-y-1.5 text-sm font-medium">
                        Cliente
                        <Input
                          placeholder="Buscar cliente…"
                          leftIcon={<UserRound className="h-4 w-4" aria-hidden />}
                        />
                      </label>
                      <label className="block space-y-1.5 text-sm font-medium">
                        Tipo
                        <Select aria-label="Tipo de cliente" defaultValue="interno">
                          <option value="interno">Interno</option>
                          <option value="externo">Externo</option>
                        </Select>
                      </label>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="block space-y-1.5 text-sm font-medium">
                        Departamento
                        <Select
                          aria-label="Departamento"
                          leftIcon={<Building2 className="h-4 w-4" aria-hidden />}
                          defaultValue="ti"
                        >
                          <option value="ti">TI</option>
                          <option value="ops">Operações</option>
                        </Select>
                      </label>
                      <label className="block space-y-1.5 text-sm font-medium">
                        Responsável
                        <Select aria-label="Responsável" defaultValue="ana">
                          <option value="ana">Ana Costa</option>
                          <option value="bruno">Bruno Lima</option>
                        </Select>
                      </label>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="block space-y-1.5 text-sm font-medium">
                        Início
                        <Input
                          type="date"
                          leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />}
                        />
                      </label>
                      <label className="block space-y-1.5 text-sm font-medium">
                        Prazo
                        <Input
                          type="date"
                          leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />}
                        />
                      </label>
                    </div>
                    <label className="block space-y-1.5 text-sm font-medium">
                      Status
                      <Select aria-label="Status" defaultValue="aberto">
                        <option value="aberto">Aberto</option>
                        <option value="triagem">Em triagem</option>
                      </Select>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Prioridade</p>
                      <div className="flex flex-wrap gap-2">
                        {(
                          [
                            ['baixa', 'Baixa'],
                            ['media', 'Média'],
                            ['alta', 'Alta'],
                            ['urgente', 'Urgente'],
                          ] as const
                        ).map(([key, label]) => (
                          <Button
                            key={key}
                            type="button"
                            size="sm"
                            variant={priority === key ? 'outline' : 'secondary'}
                            className={
                              priority === key
                                ? 'border-[var(--color-secondary)] text-[var(--color-secondary)]'
                                : ''
                            }
                            onClick={() => setPriority(key)}
                          >
                            {label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <label className="block space-y-1.5 text-sm font-medium">
                      Descrição
                      <Textarea placeholder="Detalhe o escopo e critérios de aceite…" />
                    </label>
                    <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm text-[var(--color-fg-muted)]">
                          <Paperclip className="h-4 w-4" aria-hidden />
                          Nenhum documento anexado
                        </div>
                        <Button type="button" size="sm" variant="secondary">
                          Anexar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tarefa" className="pt-4 text-sm text-[var(--color-fg-muted)]">
                Conteúdo exemplo da aba Tarefa.
              </TabsContent>
              <TabsContent value="projeto" className="pt-4 text-sm text-[var(--color-fg-muted)]">
                Conteúdo exemplo da aba Projeto.
              </TabsContent>
              <TabsContent value="reuniao" className="pt-4 text-sm text-[var(--color-fg-muted)]">
                Conteúdo exemplo da aba Reunião.
              </TabsContent>
            </Tabs>

            <DialogFooter className="gap-2 sm:justify-between">
              <p className="text-xs text-[var(--color-fg-muted)]">⌘ + Enter para salvar (exemplo)</p>
              <div className="flex gap-2">
                <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="button" className="gap-2 bg-[var(--color-secondary)] hover:opacity-95">
                  <Check className="h-4 w-4" aria-hidden />
                  Salvar
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DemoSection>
    </DocPage>
  )
}
