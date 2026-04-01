import { useState } from 'react'
import {
  AlignLeft,
  BarChart3,
  Building2,
  CalendarDays,
  Check,
  ChevronsUpDown,
  Columns3,
  Headphones,
  Paperclip,
  Search,
  Upload,
  UserRound,
  Users,
  Video,
  Wrench,
  X,
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
import { Field, FieldLabel } from '../../../components/ui/field'
import { FieldTrigger } from '../../../components/ui/field-trigger'
import { Input } from '../../../components/ui/input'
import { Select } from '../../../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Textarea } from '../../../components/ui/textarea'

/* ─── Tab config ─── */
const tabs = [
  { value: 'atendimento', label: 'Atendimento', icon: Headphones },
  { value: 'tarefa', label: 'Tarefa', icon: Wrench },
  { value: 'reuniao', label: 'Reunião', icon: Video },
] as const

/* ─── Priority config (padrão CONTPIX — dots coloridos) ─── */
const priorityConfig = {
  baixa: {
    label: 'Baixa',
    active: 'border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] text-[var(--color-fg-muted)]',
    dot: 'bg-[var(--color-fg-muted)]/60',
  },
  media: {
    label: 'Média',
    active: 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/8 text-[var(--color-secondary)]',
    dot: 'bg-[var(--color-secondary)]',
  },
  alta: {
    label: 'Alta',
    active: 'border-[var(--color-accent-strong)] bg-[var(--color-accent-strong)]/8 text-[var(--color-accent-strong)]',
    dot: 'bg-[var(--color-accent-strong)]',
  },
  urgente: {
    label: 'Urgente',
    active: 'border-[var(--color-danger)] bg-[var(--color-danger)]/8 text-[var(--color-danger)]',
    dot: 'bg-[var(--color-danger)]',
  },
} as const

type PriorityKey = keyof typeof priorityConfig

/* ─── Chip de responsável ─── */
function OwnerChip({ name, onRemove }: { name: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-secondary)]/10 px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-secondary)]">
      {name}
      <button type="button" onClick={onRemove} className="transition-colors hover:text-[var(--color-danger)]">
        <X className="h-3 w-3" />
      </button>
    </span>
  )
}

/* ─── Main ─── */
export default function ModalWorkflowDemo() {
  const [open, setOpen] = useState(false)
  const [priority, setPriority] = useState<PriorityKey>('media')
  const [progress, setProgress] = useState(0)
  const [owners, setOwners] = useState<string[]>(['Diogo'])

  return (
    <DocPage
      title="Padrão: Modal Workflow"
      description="Modal operacional baseado no padrão CONTPIX: tabs no topo, grid de campos compacto com ícones, seletor de prioridade com dots coloridos, slider de progresso, chips de responsável e área de anexos. Composto apenas com primitivas oficiais do DS-FIPS."
    >
      <DemoSection title="Interativo">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Zap className="h-4 w-4" aria-hidden />
              Nova Tarefa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto border-[var(--color-border)]/90 p-0">
            {/* ═══ Header ═══ */}
            <DialogHeader className="border-b border-[var(--color-border)] px-5 pt-4 pb-4 sm:px-6">
              <div className="flex items-start gap-4 pr-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-fips-blue-200)]/55 text-[var(--color-secondary)]">
                  <Zap className="h-4 w-4" aria-hidden />
                </div>
                <div>
                  <DialogTitle>Novo Item</DialogTitle>
                  <DialogDescription>Crie uma nova tarefa ou agende uma reunião.</DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* ═══ Body ═══ */}
            <div className="space-y-5 px-5 py-4 sm:px-6">
              <Tabs defaultValue="atendimento" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <TabsTrigger key={tab.value} value={tab.value} className="gap-2">
                        <Icon className="h-4 w-4" aria-hidden />
                        {tab.label}
                      </TabsTrigger>
                    )
                  })}
                </TabsList>

                <TabsContent value="atendimento" className="border-0 bg-transparent p-0 pt-5 shadow-none">
                  <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
                    {/* ─── LEFT COLUMN ─── */}
                    <div className="space-y-3.5">
                      {/* Título */}
                      <Field density="compact" inset="icon">
                        <FieldLabel required>Título</FieldLabel>
                        <Input
                          density="compact"
                          placeholder="Ex: Consultoria Fiscal"
                          leftIcon={<Zap className="h-4 w-4" aria-hidden />}
                        />
                      </Field>

                      {/* Cliente + Tipo */}
                      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_116px]">
                        <Field density="compact" inset="icon">
                          <FieldLabel>Cliente</FieldLabel>
                          <FieldTrigger
                            density="compact"
                            placeholder="Buscar empresa..."
                            leftIcon={<UserRound className="h-4 w-4" aria-hidden />}
                            rightIcon={<ChevronsUpDown className="h-4 w-4 opacity-50" aria-hidden />}
                          />
                        </Field>
                        <Field density="compact" inset="control">
                          <FieldLabel>Tipo</FieldLabel>
                          <Select density="compact" aria-label="Tipo" defaultValue="interno">
                            <option value="interno">Interno</option>
                            <option value="externo">Externo</option>
                          </Select>
                        </Field>
                      </div>

                      {/* Departamento + Responsável */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Field density="compact" inset="icon">
                          <FieldLabel>Departamento</FieldLabel>
                          <Select
                            density="compact"
                            aria-label="Departamento"
                            leftIcon={<Building2 className="h-4 w-4" aria-hidden />}
                            defaultValue="tecnologia"
                          >
                            <option value="tecnologia">Tecnologia</option>
                            <option value="fiscal">Fiscal</option>
                            <option value="contabil">Contábil</option>
                            <option value="dp">Dep. Pessoal</option>
                          </Select>
                        </Field>
                        <div className="space-y-1">
                          <Field density="compact" inset="icon">
                            <FieldLabel>Responsável(is)</FieldLabel>
                            <FieldTrigger
                              density="compact"
                              leftIcon={<Users className="h-4 w-4" aria-hidden />}
                              rightIcon={<ChevronsUpDown className="h-4 w-4 opacity-50" aria-hidden />}
                              value={owners.length > 0 ? `${owners.length} selecionado(s)` : undefined}
                              placeholder="Selecione..."
                            />
                          </Field>
                          {owners.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-0.5">
                              {owners.map((name, idx) => (
                                <OwnerChip
                                  key={idx}
                                  name={name}
                                  onRemove={() => setOwners(owners.filter((_, i) => i !== idx))}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Datas */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Field density="compact" inset="icon">
                          <FieldLabel>Data Início</FieldLabel>
                          <Input
                            density="compact"
                            type="date"
                            defaultValue="2026-04-01"
                            leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />}
                          />
                        </Field>
                        <Field density="compact" inset="icon">
                          <FieldLabel>Fim do Prazo</FieldLabel>
                          <Input
                            density="compact"
                            type="date"
                            placeholder="dd/mm/aaaa"
                            leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />}
                          />
                        </Field>
                      </div>

                      {/* Status */}
                      <Field density="compact" inset="icon">
                        <FieldLabel>Status</FieldLabel>
                        <Select
                          density="compact"
                          aria-label="Status"
                          leftIcon={<Columns3 className="h-4 w-4" aria-hidden />}
                          defaultValue="backlog"
                        >
                          <option value="backlog">Backlog</option>
                          <option value="afazer">A Fazer</option>
                          <option value="em-progresso">Em Progresso</option>
                          <option value="revisao">Em Revisão</option>
                          <option value="concluido">Concluído</option>
                        </Select>
                      </Field>
                    </div>

                    {/* ─── RIGHT COLUMN ─── */}
                    <div className="space-y-4">
                      {/* Prioridade — dots coloridos (padrão CONTPIX) */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-[var(--color-fg)]">Prioridade</p>
                        <div className="grid grid-cols-4 gap-1.5">
                          {(Object.keys(priorityConfig) as PriorityKey[]).map((key) => {
                            const cfg = priorityConfig[key]
                            const isActive = priority === key
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => setPriority(key)}
                                className={`flex items-center justify-center gap-1.5 rounded-lg border-2 px-2 py-1.5 text-xs font-medium transition-all duration-200 ${
                                  isActive
                                    ? cfg.active
                                    : 'border-[var(--color-border)]/60 bg-[var(--color-surface)] text-[var(--color-fg-muted)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface-muted)]'
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${isActive ? cfg.dot : 'bg-[var(--color-fg-muted)]/40'}`}
                                />
                                {cfg.label}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Progresso — slider (padrão CONTPIX) */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-[var(--color-fg)]">Progresso</p>
                        <div className="flex items-center gap-3">
                          <BarChart3 className="h-3.5 w-3.5 shrink-0 text-[var(--color-fg-muted)]" aria-hidden />
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={progress}
                            onChange={(e) => setProgress(parseInt(e.target.value))}
                            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-[var(--color-surface-muted)] [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-[var(--color-secondary)] [&::-moz-range-thumb]:shadow-lg [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-secondary)] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-[var(--color-secondary)]/30"
                          />
                          <span className="min-w-[32px] text-right text-xs font-semibold text-[var(--color-fg-muted)]">
                            {progress}%
                          </span>
                        </div>
                      </div>

                      {/* Descrição */}
                      <div className="space-y-1.5">
                        <p className="text-sm font-semibold text-[var(--color-fg)]">Descrição</p>
                        <div className="relative">
                          <AlignLeft className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--color-fg-muted)]" aria-hidden />
                          <Textarea
                            density="compact"
                            placeholder="Detalhes, contexto, links..."
                            className="min-h-[60px] resize-none pl-9"
                          />
                        </div>
                      </div>

                      {/* Documentos */}
                      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-fg)]">
                            <Paperclip className="h-4 w-4 text-[var(--color-fg-muted)]" aria-hidden />
                            Documentos
                          </div>
                          <Button type="button" size="sm" variant="secondary" className="h-7 gap-1.5 rounded-xl px-2.5 text-xs">
                            <Upload className="h-3 w-3" aria-hidden />
                            Anexar
                          </Button>
                        </div>
                        <p className="mt-4 text-center text-sm text-[var(--color-fg-muted)]">
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
                      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-5 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                        Conteúdo de apoio para a aba <strong className="text-[var(--color-fg)]">{tab.label}</strong>. O padrão preserva header, tabs, rodapé e densidade visual do formulário.
                      </div>
                    </TabsContent>
                  ))}
              </Tabs>
            </div>

            {/* ═══ Footer ═══ */}
            <DialogFooter className="border-t border-[var(--color-border)] px-5 py-3 sm:justify-between sm:px-6">
              <p className="text-xs text-[var(--color-fg-muted)]">⌘ + Enter para salvar</p>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="button" variant="success">
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
          'Prioridade aparece como grupo segmentado com dots coloridos por nível, não como select.',
          'Progresso usa slider nativo com thumb circular na cor primária do sistema.',
          'Responsáveis selecionados aparecem como chips removíveis abaixo do campo.',
        ]}
        required={[
          'Cabeçalho com ícone circular, título e descrição curta.',
          'Tabs visíveis desde a abertura do modal.',
          'Grid equilibrado entre dados principais (esquerda) e contexto complementar (direita).',
          'Ícones de contexto nos campos (Zap, User, Building, Calendar, Columns).',
          'Rodapé fixo visualmente separado com ação primária (verde) e secundária.',
        ]}
        optional={[
          'Campo de busca de cliente com FieldTrigger e ícone de chevron.',
          'Área de anexos simplificada com empty state e botão de upload.',
          'Atalho visual de teclado no rodapé.',
          'Checkbox "Acompanhar esta tarefa" para tarefas delegadas.',
        ]}
        avoid={[
          'Reproduzir um formulário de tela inteira dentro do modal.',
          'Misturar regras de negócio do fluxo com a documentação visual.',
          'Criar tabs demais para o primeiro nível do modal.',
          'Usar select para prioridade — sempre usar botões segmentados com dots.',
        ]}
      />
    </DocPage>
  )
}
