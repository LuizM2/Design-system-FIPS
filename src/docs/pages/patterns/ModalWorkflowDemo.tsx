import { useState } from 'react'
import {
  CalendarDays,
  Check,
  Paperclip,
  Search,
  UserRound,
  Video,
  Wrench,
  Zap,
} from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { PatternGuidelines } from '../../components/PatternGuidelines'
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
import { Progress } from '../../../components/ui/progress'
import { Select } from '../../../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Textarea } from '../../../components/ui/textarea'

const pageSource = `import { useState } from 'react'
import { Check, Video, Wrench, Zap } from 'lucide-react'
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Progress, Select, Tabs, TabsContent, TabsList, TabsTrigger, Textarea } from 'ds-fips'

export function WorkflowModal() {
  const [priority, setPriority] = useState<'baixa' | 'media' | 'alta' | 'urgente'>('media')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Abrir modal</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">{/* layout completo */}</DialogContent>
    </Dialog>
  )
}`

const tabs = [
  { value: 'atendimento', label: 'Atendimento', icon: Zap },
  { value: 'tarefa', label: 'Tarefa', icon: Wrench },
  { value: 'reuniao', label: 'Reunião', icon: Video },
] as const

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block space-y-2 text-sm font-semibold text-[var(--color-fg)]">{children}</label>
}

export default function ModalWorkflowDemo() {
  const [open, setOpen] = useState(false)
  const [priority, setPriority] = useState<'baixa' | 'media' | 'alta' | 'urgente'>('media')

  return (
    <DocPage
      title="Padrão: Modal Workflow"
      description="Modal operacional inspirado no print aprovado: tabs no topo, grid de campos compacto, prioridade segmentada, progresso contextual e área de anexos."
      pageSource={pageSource}
      pageDownloadName="ModalWorkflowPattern.tsx"
    >
      <DemoSection
        title="Interativo"
        reference={`<DialogContent className="max-w-4xl rounded-[30px]">
  <DialogHeader>{/* ícone + título + descrição */}</DialogHeader>
  <Tabs defaultValue="atendimento">
    <TabsList className="grid w-full grid-cols-3 gap-2" />
    <TabsContent value="atendimento">{/* formulário */}</TabsContent>
  </Tabs>
  <DialogFooter>{/* cancelar + salvar */}</DialogFooter>
</DialogContent>`}
        referenceLabel="Estrutura do modal"
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-[var(--shadow-card)]">Abrir padrão “Novo Item”</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto rounded-[30px] border-[var(--color-border)]/90 p-0">
            <DialogHeader className="border-b border-[var(--color-border)] px-5 pt-4 pb-4 sm:px-6">
              <div className="flex items-start gap-4 pr-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-fips-blue-200)]/55 text-[var(--color-secondary)]">
                  <Zap className="h-4 w-4" aria-hidden />
                </div>
                <div>
                  <DialogTitle>Novo Item</DialogTitle>
                  <DialogDescription>
                    Crie uma nova tarefa ou agende uma reunião.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-5 px-5 py-4 sm:px-6">
              <Tabs defaultValue="atendimento" className="w-full">
                <TabsList className="grid w-full grid-cols-3 gap-2 rounded-[18px] border-[var(--color-border)]/80 bg-[var(--color-surface-soft)] p-1.5 shadow-none">
                  {tabs.map((tab) => {
                    const Icon = tab.icon

                    return (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="justify-center rounded-[14px] px-3 py-2 text-sm data-[state=active]:shadow-none"
                      >
                        <Icon className="h-4 w-4" aria-hidden />
                        {tab.label}
                      </TabsTrigger>
                    )
                  })}
                </TabsList>

                <TabsContent value="atendimento" className="border-0 bg-transparent p-0 pt-5 shadow-none">
                  <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
                    <div className="space-y-3.5">
                      <FieldLabel>
                        Título
                        <Input
                          placeholder="Ex: Consultoria Fiscal"
                          leftIcon={<Zap className="h-4 w-4" aria-hidden />}
                          className="h-9 rounded-xl border-[var(--color-border)]/60 pl-9 text-sm shadow-none"
                        />
                      </FieldLabel>

                      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_116px]">
                        <FieldLabel>
                          Cliente
                          <Input
                            placeholder="Buscar empresa..."
                            leftIcon={<Search className="h-4 w-4" aria-hidden />}
                            className="h-9 rounded-xl border-[var(--color-border)]/60 pl-9 text-sm shadow-none"
                          />
                        </FieldLabel>
                        <FieldLabel>
                          Tipo
                          <Select aria-label="Tipo" defaultValue="interno" className="h-9 rounded-xl border-[var(--color-border)]/60 text-sm shadow-none">
                            <option value="interno">Interno</option>
                            <option value="externo">Externo</option>
                          </Select>
                        </FieldLabel>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <FieldLabel>
                          Departamento
                          <Select aria-label="Departamento" defaultValue="tecnologia" className="h-9 rounded-xl border-[var(--color-border)]/60 text-sm shadow-none">
                            <option value="tecnologia">Tecnologia</option>
                            <option value="operacoes">Operações</option>
                          </Select>
                        </FieldLabel>
                        <FieldLabel>
                          Responsável
                          <Select
                            aria-label="Responsável"
                            defaultValue="diogo"
                            leftIcon={<UserRound className="h-4 w-4" aria-hidden />}
                            className="h-9 rounded-xl border-[var(--color-border)]/60 pl-9 text-sm shadow-none"
                          >
                            <option value="diogo">Diogo Henrique Paiva</option>
                            <option value="luiz">Luiz Claudio</option>
                          </Select>
                        </FieldLabel>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <FieldLabel>
                          Data início
                          <Input
                            type="date"
                            defaultValue="2026-03-30"
                            leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />}
                            className="h-9 rounded-xl border-[var(--color-border)]/60 pl-9 text-sm shadow-none"
                          />
                        </FieldLabel>
                        <FieldLabel>
                          Fim do prazo
                          <Input
                            type="date"
                            leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />}
                            className="h-9 rounded-xl border-[var(--color-border)]/60 pl-9 text-sm shadow-none"
                          />
                        </FieldLabel>
                      </div>

                      <FieldLabel>
                        Status
                        <Select aria-label="Status" defaultValue="backlog" className="h-9 rounded-xl border-[var(--color-border)]/60 text-sm shadow-none">
                          <option value="backlog">Backlog</option>
                          <option value="triagem">Em triagem</option>
                          <option value="execucao">Em execução</option>
                        </Select>
                      </FieldLabel>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-[var(--color-fg)]">Prioridade</p>
                        <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
                          {(
                            [
                              ['baixa', 'Baixa'],
                              ['media', 'Média'],
                              ['alta', 'Alta'],
                              ['urgente', 'Urgente'],
                            ] as const
                          ).map(([value, label]) => (
                            <Button
                              key={value}
                              type="button"
                              variant={priority === value ? 'outline' : 'secondary'}
                              className={`h-8 rounded-xl text-xs ${priority === value ? 'border-[var(--color-secondary)] text-[var(--color-secondary)]' : 'shadow-none'}`}
                              onClick={() => setPriority(value)}
                            >
                              {label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-[var(--color-fg)]">Progresso</span>
                          <span className="text-[var(--color-fg-muted)]">0%</span>
                        </div>
                        <Progress value={0} />
                      </div>

                      <FieldLabel>
                        Descrição
                        <Textarea
                          placeholder="Detalhes, contexto, links..."
                          className="min-h-[88px] rounded-xl border-[var(--color-border)]/60 text-sm shadow-none"
                        />
                      </FieldLabel>

                      <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-fg)]">
                            <Paperclip className="h-4 w-4 text-[var(--color-fg-muted)]" aria-hidden />
                            Documentos
                          </div>
                          <Button type="button" size="sm" variant="secondary" className="h-8 rounded-xl px-3 shadow-none">
                            Anexar
                          </Button>
                        </div>
                        <p className="mt-5 text-center text-sm text-[var(--color-fg-muted)]">
                          Nenhum documento anexado
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {tabs
                  .filter((tab) => tab.value !== 'atendimento')
                  .map((tab) => (
                    <TabsContent
                      key={tab.value}
                      value={tab.value}
                      className="border-0 bg-transparent p-0 pt-5 shadow-none"
                    >
                      <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-5 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                        Conteúdo de apoio para a aba <strong className="text-[var(--color-fg)]">{tab.label}</strong>. O padrão preserva header, tabs, rodapé e densidade visual do formulário.
                      </div>
                    </TabsContent>
                  ))}
              </Tabs>
            </div>

            <DialogFooter className="border-t border-[var(--color-border)] px-5 py-3 sm:justify-between sm:px-6">
              <p className="text-xs text-[var(--color-fg-muted)]">⌘ + Enter para salvar</p>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="button">
                  <Check className="h-4 w-4" aria-hidden />
                  Salvar
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DemoSection>

      <PatternGuidelines
        rules={[
          'O modal usa tabs no topo, mas mantém o mesmo ritmo visual dos campos abaixo.',
          'Campos do modal ficam mais compactos que no formulário de página inteira.',
          'Prioridade aparece como grupo segmentado de botões, não como select.',
          'Progresso e anexos entram como apoio lateral, não como bloco dominante.',
        ]}
        required={[
          'Cabeçalho com ícone circular, título e descrição curta.',
          'Tabs visíveis desde a abertura do modal.',
          'Grid equilibrado entre dados principais e contexto complementar.',
          'Rodapé fixo visualmente separado com ação primária e secundária.',
        ]}
        optional={[
          'Campo de busca de cliente com ícone.',
          'Área de anexos simplificada com empty state.',
          'Atalho visual de teclado no rodapé.',
        ]}
        avoid={[
          'Reproduzir um formulário de tela inteira dentro do modal.',
          'Misturar regras de negócio do fluxo com a documentação visual.',
          'Criar tabs demais para o primeiro nível do modal.',
        ]}
      />
    </DocPage>
  )
}
