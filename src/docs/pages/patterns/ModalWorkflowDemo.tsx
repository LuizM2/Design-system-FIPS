import { useState } from 'react'
import {
  Building2,
  CalendarDays,
  Check,
  Paperclip,
  Presentation,
  Users,
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
import { Select } from '../../../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Textarea } from '../../../components/ui/textarea'

const tabs = [
  { value: 'atendimento', label: 'Atendimento', icon: Zap },
  { value: 'tarefa', label: 'Tarefa', icon: Wrench },
  { value: 'projeto', label: 'Projeto', icon: Presentation },
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
      description="Modal operacional largo com abas superiores, grid em duas colunas, campos com ícone, prioridade segmentada e área de anexos. Inspirado diretamente no print aprovado."
    >
      <DemoSection
        title="Interativo"
        reference={`<DialogContent className="max-w-5xl rounded-[32px]">
  <DialogHeader>{/* título + descrição + ícone */}</DialogHeader>
  <Tabs defaultValue="atendimento">
    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4" />
    <TabsContent value="atendimento">
      <div className="grid gap-5 lg:grid-cols-2">...</div>
    </TabsContent>
  </Tabs>
  <DialogFooter>{/* cancelar + salvar */}</DialogFooter>
</DialogContent>`}
        referenceLabel="Estrutura do modal workflow"
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-[var(--shadow-card)]">Abrir padrão “Novo item”</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto">
            <DialogHeader className="border-b border-[var(--color-border)] pb-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-fips-blue-200)]/55 text-[var(--color-secondary)]">
                  <Zap className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <DialogTitle>Novo Item</DialogTitle>
                  <DialogDescription>
                    Crie uma nova tarefa ou agende uma reunião com responsáveis e contexto completo.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <Tabs defaultValue="atendimento" className="w-full">
              <TabsList className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
                {tabs.map((tab) => {
                  const Icon = tab.icon

                  return (
                    <TabsTrigger key={tab.value} value={tab.value} className="justify-start sm:justify-center">
                      <Icon className="h-4 w-4" aria-hidden />
                      {tab.label}
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              <TabsContent value="atendimento" className="border-0 bg-transparent p-0 pt-5 shadow-none">
                <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
                  <div className="space-y-4">
                    <FieldLabel>
                      Título
                      <Input placeholder="Ex.: Consultoria Fiscal" leftIcon={<Zap className="h-4 w-4" aria-hidden />} />
                    </FieldLabel>

                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_140px]">
                      <FieldLabel>
                        Cliente
                        <Input placeholder="Buscar empresa..." leftIcon={<Users className="h-4 w-4" aria-hidden />} />
                      </FieldLabel>
                      <FieldLabel>
                        Tipo
                        <Select aria-label="Tipo" defaultValue="interno">
                          <option value="interno">Interno</option>
                          <option value="externo">Externo</option>
                        </Select>
                      </FieldLabel>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <FieldLabel>
                        Departamento
                        <Select aria-label="Departamento" defaultValue="tecnologia">
                          <option value="tecnologia">Tecnologia</option>
                          <option value="operacoes">Operações</option>
                        </Select>
                      </FieldLabel>
                      <FieldLabel>
                        Responsável
                        <Select
                          aria-label="Responsável"
                          defaultValue="diogo"
                          leftIcon={<Building2 className="h-4 w-4" aria-hidden />}
                        >
                          <option value="diogo">Diogo Henrique Paiva</option>
                          <option value="luiz">Luiz Claudio</option>
                        </Select>
                      </FieldLabel>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <FieldLabel>
                        Data início
                        <Input type="date" leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />} defaultValue="2026-03-24" />
                      </FieldLabel>
                      <FieldLabel>
                        Fim do prazo
                        <Input type="date" leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />} />
                      </FieldLabel>
                    </div>

                    <FieldLabel>
                      Status
                      <Select aria-label="Status" defaultValue="backlog">
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
                            className={priority === value ? 'border-[var(--color-secondary)] text-[var(--color-secondary)]' : ''}
                            onClick={() => setPriority(value)}
                          >
                            {label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-[var(--color-fg)]">Progresso</span>
                        <span className="text-[var(--color-fg-muted)]">0%</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-[var(--color-surface-muted)]">
                        <div className="h-full w-[8%] rounded-full bg-[var(--color-secondary)]" />
                      </div>
                    </div>

                    <FieldLabel>
                      Descrição
                      <Textarea placeholder="Detalhes, contexto, links e orientações para execução..." />
                    </FieldLabel>

                    <div className="rounded-[26px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm text-[var(--color-fg)]">
                          <Paperclip className="h-4 w-4 text-[var(--color-fg-muted)]" aria-hidden />
                          Documentos
                        </div>
                        <Button type="button" size="sm" variant="secondary">
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
                    <div className="rounded-[26px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-5 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                      Conteúdo de apoio para a aba <strong className="text-[var(--color-fg)]">{tab.label}</strong>. O padrão permite trocar o conteúdo interno sem mudar header, tabs, rodapé e hierarquia do modal.
                    </div>
                  </TabsContent>
                ))}
            </Tabs>

            <DialogFooter className="sm:justify-between">
              <p className="text-xs text-[var(--color-fg-muted)]">⌘ + Enter para salvar</p>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="button" loading={false}>
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
          'O modal deve ser largo, com forte hierarquia logo no topo e abas visíveis.',
          'Grid em duas colunas para campos principais, descrição e anexos.',
          'Rodapé separado por borda com ação secundária e primária claras.',
          'Aba ativa deve parecer uma superfície branca dentro de um trilho suave.',
        ]}
        required={[
          'Cabeçalho com ícone circular, título e descrição curta.',
          'Segmentação por tipo de item via tabs no topo do corpo.',
          'Campo de prioridade como grupo de botões/toggles, não select.',
          'Área de anexos visível mesmo quando vazia.',
        ]}
        optional={[
          'Atalho de teclado exibido no rodapé.',
          'Barra de progresso contextual.',
          'Conteúdo específico por aba mantendo o mesmo contêiner.',
        ]}
        avoid={[
          'Modal estreito demais para formulários densos.',
          'Esconder anexos e prioridade em colapsos ou accordions.',
          'Usar tabs sem contraste entre trilho e aba ativa.',
        ]}
      />
    </DocPage>
  )
}
