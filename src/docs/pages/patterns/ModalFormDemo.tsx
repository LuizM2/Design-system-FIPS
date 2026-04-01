import {
  AlignLeft,
  BarChart3,
  Building2,
  CalendarDays,
  Check,
  ChevronsUpDown,
  Headphones,
  Paperclip,
  Upload,
  UserRound,
  Users,
  Video,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
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

/* ─── helpers ─── */

type ModalFieldProps = {
  label: React.ReactNode
  required?: boolean
  inset?: FieldInset
  children: React.ReactNode
}

function ModalField({ label, required = false, inset = 'control', children }: ModalFieldProps) {
  return (
    <Field density="compact" inset={inset}>
      <FieldLabel required={required}>{label}</FieldLabel>
      {children}
    </Field>
  )
}

/* ─── Priority config (padrão CONTPIX) ─── */
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

/* ─── Component ─── */
export default function ModalFormDemo() {
  const [open, setOpen] = useState(false)
  const [priority, setPriority] = useState<PriorityKey>('media')
  const [progress, setProgress] = useState(0)
  const [owners, setOwners] = useState<string[]>(['Diogo'])

  return (
    <DocPage
      title="Padrão: Modal de formulário"
      description="Formulário em duas colunas com abas superiores, seletor de prioridade com dots, barra de progresso, chips de responsável e upload de documentos — referência oficial baseada no padrão CONTPIX, composta apenas com primitivas do DS-FIPS."
    >
      <DemoSection title="Interativo — Novo Item">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Zap className="h-4 w-4" aria-hidden />
              Nova Tarefa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto p-0">
            {/* Header */}
            <DialogHeader className="border-b border-[var(--color-border)] px-6 pb-4 pt-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-fips-blue-200)]">
                  <Zap className="h-5 w-5 text-[var(--color-secondary)]" aria-hidden />
                </div>
                <div>
                  <DialogTitle>Novo Item</DialogTitle>
                  <DialogDescription>Crie uma nova tarefa ou agende uma reunião.</DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* Body */}
            <div className="space-y-4 px-6 py-4">
              {/* Tabs tipo (padrão CONTPIX) */}
              <Tabs defaultValue="atendimento" className="w-full">
                <TabsList className="grid w-full grid-cols-3 rounded-xl bg-[var(--color-surface-muted)] p-1">
                  <TabsTrigger value="atendimento" className="gap-1.5 rounded-lg text-xs font-semibold">
                    <Headphones className="h-3.5 w-3.5" aria-hidden />
                    Atendimento
                  </TabsTrigger>
                  <TabsTrigger value="tarefa" className="gap-1.5 rounded-lg text-xs font-semibold">
                    <Wrench className="h-3.5 w-3.5" aria-hidden />
                    Tarefa
                  </TabsTrigger>
                  <TabsTrigger value="reuniao" className="gap-1.5 rounded-lg text-xs font-semibold">
                    <Video className="h-3.5 w-3.5" aria-hidden />
                    Reunião
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="atendimento" className="space-y-0 border-0 p-0 pt-4 shadow-none">
                  <div className="grid gap-x-5 gap-y-3 md:grid-cols-2">
                    {/* ═══ LEFT COLUMN ═══ */}
                    <div className="space-y-3">
                      {/* Título */}
                      <ModalField label="Título" required inset="icon">
                        <Input
                          density="compact"
                          placeholder="Ex: Consultoria Fiscal"
                          leftIcon={<Zap className="h-4 w-4" aria-hidden />}
                        />
                      </ModalField>

                      {/* Cliente + Tipo */}
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <ModalField label="Cliente" inset="icon">
                            <Input
                              density="compact"
                              placeholder="Buscar empresa..."
                              leftIcon={<UserRound className="h-4 w-4" aria-hidden />}
                            />
                          </ModalField>
                        </div>
                        <div className="w-[100px]">
                          <ModalField label={<span className="invisible">Tipo</span>}>
                            <Select density="compact" aria-label="Tipo" defaultValue="interno">
                              <option value="interno">Interno</option>
                              <option value="externo">Externo</option>
                            </Select>
                          </ModalField>
                        </div>
                      </div>

                      {/* Departamento + Responsável */}
                      <div className="grid grid-cols-2 gap-2">
                        <ModalField label="Departamento" inset="icon">
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
                        </ModalField>
                        <div className="space-y-1">
                          <ModalField label="Responsável(is)" inset="icon">
                            <button
                              type="button"
                              className="flex h-9 w-full items-center justify-between rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)] px-3 text-left text-sm text-[var(--color-fg)] shadow-sm transition-all duration-200 hover:border-[var(--color-border)]/80"
                            >
                              <span className="flex items-center gap-2 truncate">
                                <Users className="h-3.5 w-3.5 text-[var(--color-fg-muted)]" aria-hidden />
                                {owners.length > 0 ? `${owners.length} selecionado(s)` : 'Selecione...'}
                              </span>
                              <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
                            </button>
                          </ModalField>
                          {owners.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
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

                      {/* Data Início + Fim do Prazo */}
                      <div className="grid grid-cols-2 gap-2">
                        <ModalField label="Data Início" inset="icon">
                          <Input
                            density="compact"
                            type="date"
                            defaultValue="2026-04-01"
                            leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />}
                          />
                        </ModalField>
                        <ModalField label="Fim do Prazo" inset="icon">
                          <Input
                            density="compact"
                            type="date"
                            placeholder="dd/mm/aaaa"
                            leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />}
                          />
                        </ModalField>
                      </div>

                      {/* Status */}
                      <ModalField label="Status" inset="icon">
                        <Select
                          density="compact"
                          aria-label="Status"
                          leftIcon={<Building2 className="h-4 w-4" aria-hidden />}
                          defaultValue="backlog"
                        >
                          <option value="backlog">Backlog</option>
                          <option value="afazer">A Fazer</option>
                          <option value="em-progresso">Em Progresso</option>
                          <option value="revisao">Em Revisão</option>
                          <option value="concluido">Concluído</option>
                        </Select>
                      </ModalField>
                    </div>

                    {/* ═══ RIGHT COLUMN ═══ */}
                    <div className="space-y-3">
                      {/* Prioridade — seletor com dots (padrão CONTPIX) */}
                      <div className="space-y-1">
                        <p className="ml-1.5 text-xs font-semibold uppercase tracking-[0.02em] text-[var(--color-fg-muted)]">
                          Prioridade
                        </p>
                        <div className="grid grid-cols-4 gap-1.5">
                          {(Object.keys(priorityConfig) as PriorityKey[]).map((key) => {
                            const cfg = priorityConfig[key]
                            const isActive = priority === key
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => setPriority(key)}
                                className={`flex items-center justify-center gap-1 rounded-lg border-2 px-2 py-1.5 text-xs font-medium transition-all duration-200 ${
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
                      <div className="space-y-1">
                        <p className="ml-1.5 text-xs font-semibold uppercase tracking-[0.02em] text-[var(--color-fg-muted)]">
                          Progresso
                        </p>
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
                      <div className="space-y-1">
                        <p className="ml-1.5 text-xs font-semibold uppercase tracking-[0.02em] text-[var(--color-fg-muted)]">
                          Descrição
                        </p>
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
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <p className="ml-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.02em] text-[var(--color-fg-muted)]">
                            <Paperclip className="h-3.5 w-3.5" aria-hidden />
                            Documentos
                          </p>
                          <Button type="button" size="sm" variant="secondary" className="h-7 gap-1.5 rounded-xl px-2.5 text-xs">
                            <Upload className="h-3 w-3" aria-hidden />
                            Anexar
                          </Button>
                        </div>
                        <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3">
                          <p className="text-center text-xs text-[var(--color-fg-muted)]">Nenhum documento anexado</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tarefa" className="pt-4 text-sm text-[var(--color-fg-muted)]">
                  Conteúdo exemplo da aba Tarefa — mesma estrutura, tipo diferente.
                </TabsContent>
                <TabsContent value="reuniao" className="pt-4 text-sm text-[var(--color-fg-muted)]">
                  Conteúdo exemplo da aba Reunião — inclui campos de horário e plataforma.
                </TabsContent>
              </Tabs>
            </div>

            {/* Footer */}
            <DialogFooter className="border-t border-[var(--color-border)] px-6 py-3">
              <div className="flex w-full items-center justify-between">
                <p className="text-xs text-[var(--color-fg-muted)]">⌘ + Enter para salvar</p>
                <div className="flex gap-2">
                  <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="button" variant="success" className="gap-2">
                    <Check className="h-4 w-4" aria-hidden />
                    Salvar
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DemoSection>
    </DocPage>
  )
}
