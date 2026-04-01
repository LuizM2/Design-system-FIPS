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
import { Field, FieldLabel, type FieldInset } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { Select } from '../../../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Textarea } from '../../../components/ui/textarea'

type ModalFieldProps = {
  label: React.ReactNode
  inset?: FieldInset
  children: React.ReactNode
}

function ModalField({ label, inset = 'control', children }: ModalFieldProps) {
  return (
    <Field density="compact" inset={inset}>
      <FieldLabel>{label}</FieldLabel>
      {children}
    </Field>
  )
}

export default function ModalFormDemo() {
  const [open, setOpen] = useState(false)
  const [priority, setPriority] = useState<'baixa' | 'media' | 'alta' | 'urgente'>('media')

  return (
    <DocPage
      title="Padrão: Modal de formulário"
      description="Formulário em duas colunas com abas superiores, campos com ícones e ações primárias — referência para fluxos de criação montados apenas com composições oficiais do DS."
    >
      <DemoSection
        title="Interativo"
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
                    <ModalField label={<>Título <span className="text-red-600">*</span></>} inset="icon">
                      <Input
                        density="compact"
                        placeholder="Ex.: Ajuste de integração EDI"
                        leftIcon={<Zap className="h-4 w-4" aria-hidden />}
                      />
                    </ModalField>
                    <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                      <ModalField label="Cliente" inset="icon">
                        <Input
                          density="compact"
                          placeholder="Buscar cliente…"
                          leftIcon={<UserRound className="h-4 w-4" aria-hidden />}
                        />
                      </ModalField>
                      <ModalField label="Tipo">
                        <Select density="compact" aria-label="Tipo de cliente" defaultValue="interno">
                          <option value="interno">Interno</option>
                          <option value="externo">Externo</option>
                        </Select>
                      </ModalField>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <ModalField label="Departamento" inset="icon">
                        <Select
                          density="compact"
                          aria-label="Departamento"
                          leftIcon={<Building2 className="h-4 w-4" aria-hidden />}
                          defaultValue="ti"
                        >
                          <option value="ti">TI</option>
                          <option value="ops">Operações</option>
                        </Select>
                      </ModalField>
                      <ModalField label="Responsável">
                        <Select density="compact" aria-label="Responsável" defaultValue="ana">
                          <option value="ana">Ana Costa</option>
                          <option value="bruno">Bruno Lima</option>
                        </Select>
                      </ModalField>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <ModalField label="Início" inset="icon">
                        <Input
                          density="compact"
                          type="date"
                          leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />}
                        />
                      </ModalField>
                      <ModalField label="Prazo" inset="icon">
                        <Input
                          density="compact"
                          type="date"
                          leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />}
                        />
                      </ModalField>
                    </div>
                    <ModalField label="Status">
                      <Select density="compact" aria-label="Status" defaultValue="aberto">
                        <option value="aberto">Aberto</option>
                        <option value="triagem">Em triagem</option>
                      </Select>
                    </ModalField>
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
                            variant={priority === key ? 'primary' : 'secondary'}
                            onClick={() => setPriority(key)}
                          >
                            {label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <ModalField label="Descrição">
                      <Textarea density="compact" placeholder="Detalhe o escopo e critérios de aceite…" />
                    </ModalField>
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
                <Button type="button" variant="success" className="gap-2">
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
