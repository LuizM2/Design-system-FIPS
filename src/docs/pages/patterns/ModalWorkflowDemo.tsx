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
  Upload,
  UserRound,
  Users,
  Video,
  Wrench,
  X,
  Zap,
  ShieldCheck,
  AlertTriangle,
  ArrowUpFromLine,
} from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { RuleCards } from '../../components/RuleCards'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../components/ui/dialog'

/* ═══════════════════════════════════════════════════════
   CONTPIX DESIGN-SYSTEM SPEC — FAITHFUL REPRODUCTION
   Source: design-system.md (Replit extraction)
   ═══════════════════════════════════════════════════════ */

/* --- Priority config (spec §10) --- */
const priorityConfig = {
  low:    { label: 'Baixa',   color: 'border-slate-300 bg-slate-50 text-slate-600',   dotColor: 'bg-slate-400' },
  medium: { label: 'Média',   color: 'border-blue-400 bg-blue-50 text-blue-600',      dotColor: 'bg-blue-500' },
  high:   { label: 'Alta',    color: 'border-amber-400 bg-amber-50 text-amber-600',   dotColor: 'bg-amber-500' },
  urgent: { label: 'Urgente', color: 'border-red-400 bg-red-50 text-red-600',         dotColor: 'bg-red-500' },
} as const

type PriorityKey = keyof typeof priorityConfig

/* --- Tab config (spec §12) --- */
const taskTypeIcons: Record<string, React.ReactNode> = {
  service: <Headphones className="h-3.5 w-3.5" />,
  internal_task: <Wrench className="h-3.5 w-3.5" />,
  meeting: <Video className="h-3.5 w-3.5" />,
}
const taskTypes = [
  { id: 'service', label: 'Atendimento' },
  { id: 'internal_task', label: 'Tarefa' },
  { id: 'meeting', label: 'Reunião' },
]

/* ═══ Component ═══ */
export default function ModalWorkflowDemo() {
  const [open, setOpen] = useState(false)
  const [activeType, setActiveType] = useState('service')
  const [priority, setPriority] = useState<PriorityKey>('medium')
  const [progress, setProgress] = useState(0)
  const [owners, setOwners] = useState<string[]>(['Diogo'])

  return (
    <DocPage
      title="Padrão: Modal Workflow"
      description="Modal operacional extraído do TaskModal.tsx (CONTPIX). Reprodução fiel do design-system.md — tabs segmentadas, grid de campos com ícones, prioridade com dots, slider de progresso, chips de responsável e área de anexos."
    >
      <DemoSection title="Interativo">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Zap className="h-4 w-4" aria-hidden />
              Nova Tarefa
            </Button>
          </DialogTrigger>

          {/* §1 — Dialog Container */}
          <DialogContent
            className="w-[95vw] max-w-[900px] max-h-[90vh] overflow-hidden p-0 gap-0 rounded-xl sm:rounded-2xl"
          >
            {/* §2 — Header */}
            <div className="flex items-start gap-3 px-4 sm:px-6 pt-3 sm:pt-4 pb-3 sm:pb-4 border-b border-[var(--color-border)]/50">
              {/* §2 Icon Circle */}
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <Zap className="h-4 w-4" aria-hidden />
              </div>
              <div>
                {/* §2 Title */}
                <h2 className="text-base sm:text-lg font-bold text-[var(--color-fg)] tracking-tight">
                  Novo Item
                </h2>
                {/* §2 Subtitle */}
                <p className="text-xs text-[var(--color-fg-muted)] line-clamp-1">
                  Crie uma nova tarefa ou agende uma reunião.
                </p>
              </div>
            </div>

            {/* §3 — Body */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 space-y-3 max-h-[calc(90vh-140px)] overflow-y-auto">

              {/* §12 — Type Selector (Segmented Tabs) */}
              <div className="flex gap-1 p-1 bg-[var(--color-surface-muted)]/50 rounded-xl overflow-x-auto">
                {taskTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveType(type.id)}
                    className={`flex-1 min-w-0 flex items-center justify-center gap-1.5 px-2 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      activeType === type.id
                        ? 'bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm'
                        : 'text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]'
                    }`}
                  >
                    {taskTypeIcons[type.id] || <Zap className="h-3.5 w-3.5" />}
                    <span className="hidden sm:inline truncate">{type.label}</span>
                  </button>
                ))}
              </div>

              {/* §15 — Two-column layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-x-5 sm:gap-y-3">

                {/* ═══ LEFT COLUMN ═══ */}
                <div className="space-y-3">

                  {/* §4+§5 — Título (required, with icon) */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold ml-1.5">
                      Título <span className="text-[var(--color-danger)]">*</span>
                    </label>
                    <div className="relative">
                      <Zap className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-fg-muted)]" />
                      <input
                        placeholder="Ex: Consultoria Fiscal"
                        className="flex w-full pl-9 h-9 text-sm rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)] text-[var(--color-fg)] placeholder:text-[var(--color-fg-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* §5+§7 — Cliente + Tipo */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold ml-1.5">Cliente</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-fg-muted)] z-10" />
                        <button
                          type="button"
                          className="w-full flex items-center justify-between pl-9 h-9 text-sm rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)] font-normal text-[var(--color-fg-muted)] hover:border-[var(--color-border)]/80 transition-all"
                        >
                          <span className="truncate">Buscar empresa...</span>
                          <ChevronsUpDown className="ml-2 h-3.5 w-3.5 shrink-0 opacity-50" />
                        </button>
                      </div>
                      {/* §6 — Select Tipo */}
                      <div className="relative w-[100px]">
                        <select
                          defaultValue="internal"
                          className="w-full appearance-none h-9 px-3 text-xs rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)] text-[var(--color-fg)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all"
                        >
                          <option value="internal">Interno</option>
                          <option value="external">Externo</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* §6 — Departamento + §7/§9 Responsável */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold ml-1.5">Departamento</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-fg-muted)] z-10" />
                        <select
                          defaultValue="tecnologia"
                          className="w-full appearance-none pl-9 h-9 text-sm rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)] text-[var(--color-fg)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all"
                        >
                          <option value="tecnologia">Tecnologia</option>
                          <option value="fiscal">Fiscal</option>
                          <option value="contabil">Contábil</option>
                          <option value="dp">Dep. Pessoal</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold ml-1.5">Responsável(is)</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-fg-muted)]" />
                        <button
                          type="button"
                          className="w-full flex items-center justify-between pl-9 min-h-[36px] h-auto text-sm rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)] font-normal text-[var(--color-fg)] hover:border-[var(--color-border)]/80 transition-all pr-3"
                        >
                          <span className="truncate">
                            {owners.length > 0 ? `${owners.length} selecionado(s)` : 'Selecione...'}
                          </span>
                          <ChevronsUpDown className="ml-2 h-3.5 w-3.5 shrink-0 opacity-50" />
                        </button>
                      </div>
                      {/* §9 — Chips */}
                      {owners.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {owners.map((name, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20"
                            >
                              {name}
                              <button
                                type="button"
                                onClick={() => setOwners(owners.filter((_, i) => i !== idx))}
                                className="hover:text-[var(--color-danger)] transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* §5 — Data Início + Fim do Prazo */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold ml-1.5">Data Início</label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-fg-muted)]" />
                        <input
                          type="date"
                          defaultValue="2026-04-01"
                          className="flex w-full pl-9 h-9 text-sm rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)] text-[var(--color-fg)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold ml-1.5">Fim do Prazo</label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-fg-muted)]" />
                        <input
                          type="date"
                          placeholder="dd/mm/aaaa"
                          className="flex w-full pl-9 h-9 text-sm rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)] text-[var(--color-fg)] placeholder:text-[var(--color-fg-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* §6 — Status */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold ml-1.5">Status</label>
                    <div className="relative">
                      <Columns3 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-fg-muted)] z-10" />
                      <select
                        defaultValue="backlog"
                        className="w-full appearance-none pl-9 h-9 text-sm rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)] text-[var(--color-fg)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all"
                      >
                        <option value="backlog">Backlog</option>
                        <option value="afazer">A Fazer</option>
                        <option value="em-progresso">Em Progresso</option>
                        <option value="revisao">Em Revisão</option>
                        <option value="concluido">Concluído</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* ═══ RIGHT COLUMN ═══ */}
                <div className="space-y-3">

                  {/* §10 — Priority Buttons */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold ml-1.5">Prioridade</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(Object.keys(priorityConfig) as PriorityKey[]).map((key) => {
                        const cfg = priorityConfig[key]
                        const isActive = priority === key
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setPriority(key)}
                            className={`flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg border-2 text-xs font-medium transition-all duration-200 ${
                              isActive
                                ? cfg.color
                                : 'border-[var(--color-border)]/60 bg-[var(--color-surface)] text-[var(--color-fg-muted)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface-muted)]/30'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${isActive ? cfg.dotColor : 'bg-[var(--color-fg-muted)]/40'}`}
                            />
                            {cfg.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* §11 — Progress Slider */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold ml-1.5">Progresso</label>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-3.5 w-3.5 text-[var(--color-fg-muted)] flex-shrink-0" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={progress}
                        onChange={(e) => setProgress(parseInt(e.target.value))}
                        className="flex-1 h-1.5 bg-[var(--color-surface-muted)] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-primary)] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-[var(--color-primary)]/30 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--color-primary)] [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-pointer"
                      />
                      <span className="min-w-[32px] text-right text-xs font-semibold text-[var(--color-fg-muted)]">
                        {progress}%
                      </span>
                    </div>
                  </div>

                  {/* §8 — Descrição (Textarea with icon) */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold ml-1.5">Descrição</label>
                    <div className="relative">
                      <AlignLeft className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--color-fg-muted)]" />
                      <textarea
                        placeholder="Detalhes, contexto, links..."
                        rows={3}
                        className="flex w-full pl-9 min-h-[80px] text-sm rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)] text-[var(--color-fg)] placeholder:text-[var(--color-fg-muted)] resize-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all px-3 py-2"
                      />
                    </div>
                  </div>

                  {/* Documents area */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold ml-1.5 flex items-center gap-1.5">
                        <Paperclip className="h-3.5 w-3.5" />
                        Documentos
                      </label>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 rounded-xl text-xs h-7 px-2 border border-[var(--color-border)]/60 bg-[var(--color-surface)] text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-muted)] transition-all"
                      >
                        <Upload className="h-3 w-3" />
                        Anexar
                      </button>
                    </div>
                    <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-muted)]/30 px-4 py-3">
                      <p className="text-center text-xs text-[var(--color-fg-muted)]">
                        Nenhum documento anexado
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* §14 — Footer */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-[var(--color-border)]/50 bg-[var(--color-surface-muted)]/20">
              <div className="text-[11px] text-[var(--color-fg-muted)] flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[var(--color-surface-muted)] rounded text-[10px] font-mono font-semibold">⌘</kbd>
                +
                <kbd className="px-1.5 py-0.5 bg-[var(--color-surface-muted)] rounded text-[10px] font-mono font-semibold">Enter</kbd>
                <span className="ml-1">para salvar</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-9 px-4 text-sm font-semibold rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)] text-[var(--color-fg)] hover:bg-[var(--color-surface-muted)] transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="h-9 px-4 text-sm font-semibold rounded-xl gap-2 inline-flex items-center bg-[var(--color-success)] text-white shadow-[var(--shadow-card)] hover:bg-[var(--color-success-strong)] transition-all"
                >
                  <Check className="h-4 w-4" aria-hidden />
                  Salvar
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DemoSection>

      <RuleCards cards={[
        { icon: <ShieldCheck size={20} color="var(--color-gov-azul-profundo)" />, color: 'var(--color-gov-azul-profundo)', bg: 'color-mix(in srgb, var(--color-gov-azul-profundo) 3%, transparent)', tag: 'REGRA 1', title: 'Modal estruturado com abas', desc: 'O Modal Workflow é um diálogo modal com abas segmentadas que organiza formulários de criação e edição em etapas claras. As abas permitem dividir campos relacionados sem sobrecarregar a tela.' },
        { icon: <AlertTriangle size={20} color="#F6921E" />, color: '#F6921E', bg: '#F6921E08', tag: 'REGRA 2', title: 'Três blocos obrigatórios', desc: 'Todo modal workflow tem header (ícone + título + subtítulo), corpo com abas e campos em grid de duas colunas, e footer com ações (cancelar + salvar). Nenhum desses blocos pode ser omitido.' },
        { icon: <ArrowUpFromLine size={20} color="var(--color-gov-azul-escuro)" />, color: 'var(--color-gov-azul-escuro)', bg: 'color-mix(in srgb, var(--color-gov-azul-escuro) 3%, transparent)', tag: 'REGRA 3', title: 'Quando usar este padrão', desc: 'Use o Modal Workflow para criar novos registros, editar formulários complexos ou coletar dados em múltiplas seções sem sair da página atual. Se o formulário for extenso demais para um modal, use o Form Workspace.' },
      ]} />
    </DocPage>
  )
}
