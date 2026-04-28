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
import { CodeExportSection } from '../../components/CodeExport'
import { PlaygroundProvider, Copyable, CodePlayground } from '../../components/CodePlayground'
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

/* ═══ Copyable code helper (hardcoded hex, self-contained) ═══ */
function codeModalWorkflow() {
  return `// DS-FIPS — Modal Workflow com Tabs — Copy-paste ready
import { useState } from "react";

export function TaskModalWorkflow() {
  const [open, setOpen] = useState(false);
  const [activeType, setActiveType] = useState("service");
  const [priority, setPriority] = useState("medium");
  const [progress, setProgress] = useState(0);

  const priorityConfig = {
    low:    { label: 'Baixa',   border: '#CBD5E1', bg: '#F8FAFC', text: '#64748B', dot: '#94A3B8' },
    medium: { label: 'Media',   border: '#60A5FA', bg: '#EFF6FF', text: '#2563EB', dot: '#3B82F6' },
    high:   { label: 'Alta',    border: '#FBBF24', bg: '#FFFBEB', text: '#D97706', dot: '#F59E0B' },
    urgent: { label: 'Urgente', border: '#F87171', bg: '#FEF2F2', text: '#DC2626', dot: '#EF4444' },
  };

  const taskTypes = [
    { id: 'service', label: 'Atendimento' },
    { id: 'internal_task', label: 'Tarefa' },
    { id: 'meeting', label: 'Reuniao' },
  ];

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ background: '#004B9B', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
        Nova Tarefa
      </button>

      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
          <div style={{ position: 'relative', width: '95vw', maxWidth: 900, maxHeight: '90vh', background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '16px 24px', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#E8F0FE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#004B9B" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#333B41', margin: 0 }}>Novo Item</h2>
                <p style={{ fontSize: 12, color: '#7B8C96', margin: '2px 0 0' }}>Crie uma nova tarefa ou agende uma reuniao.</p>
              </div>
            </div>

            <div style={{ padding: '16px 24px', maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
              <div style={{ display: 'flex', gap: 4, padding: 4, background: '#F1F5F9', borderRadius: 12, marginBottom: 16 }}>
                {taskTypes.map(t => (
                  <button key={t.id} onClick={() => setActiveType(t.id)} style={{ flex: 1, padding: '8px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: 'none', background: activeType === t.id ? '#fff' : 'transparent', color: activeType === t.id ? '#004B9B' : '#7B8C96', boxShadow: activeType === t.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none', cursor: 'pointer' }}>
                    {t.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#333B41', display: 'block', marginBottom: 4 }}>Titulo <span style={{ color: '#DC3545' }}>*</span></label>
                    <input placeholder="Ex: Consultoria Fiscal" style={{ width: '100%', height: 36, padding: '0 12px', borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#333B41', display: 'block', marginBottom: 4 }}>Cliente</label>
                    <input placeholder="Buscar empresa..." style={{ width: '100%', height: 36, padding: '0 12px', borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: '#333B41', display: 'block', marginBottom: 4 }}>Data Inicio</label>
                      <input type="date" defaultValue="2026-04-01" style={{ width: '100%', height: 36, padding: '0 12px', borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: '#333B41', display: 'block', marginBottom: 4 }}>Fim do Prazo</label>
                      <input type="date" style={{ width: '100%', height: 36, padding: '0 12px', borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#333B41', display: 'block', marginBottom: 4 }}>Status</label>
                    <select defaultValue="backlog" style={{ width: '100%', height: 36, padding: '0 12px', borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13, outline: 'none', boxSizing: 'border-box', background: '#fff' }}>
                      <option value="backlog">Backlog</option>
                      <option value="afazer">A Fazer</option>
                      <option value="em-progresso">Em Progresso</option>
                      <option value="concluido">Concluido</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#333B41', display: 'block', marginBottom: 4 }}>Prioridade</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                      {Object.entries(priorityConfig).map(([key, cfg]) => (
                        <button key={key} onClick={() => setPriority(key)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '6px 8px', borderRadius: 8, border: \`2px solid \${priority === key ? cfg.border : '#E2E8F0'}\`, background: priority === key ? cfg.bg : '#fff', color: priority === key ? cfg.text : '#7B8C96', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: priority === key ? cfg.dot : '#CBD5E1' }} />
                          {cfg.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#333B41', display: 'block', marginBottom: 4 }}>Progresso</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <input type="range" min="0" max="100" step="5" value={progress} onChange={e => setProgress(parseInt(e.target.value))} style={{ flex: 1 }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#7B8C96', minWidth: 32, textAlign: 'right' }}>{progress}%</span>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#333B41', display: 'block', marginBottom: 4 }}>Descricao</label>
                    <textarea placeholder="Detalhes, contexto, links..." rows={3} style={{ width: '100%', padding: '8px 12px', borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13, outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#333B41', display: 'block', marginBottom: 4 }}>Documentos</label>
                    <div style={{ borderRadius: 10, border: '1px dashed #E2E8F0', background: '#F8FAFC', padding: '12px 16px', textAlign: 'center' }}>
                      <p style={{ fontSize: 12, color: '#7B8C96', margin: 0 }}>Nenhum documento anexado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', borderTop: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: 11, color: '#7B8C96' }}>Cmd+Enter para salvar</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setOpen(false)} style={{ height: 36, padding: '0 16px', fontSize: 14, fontWeight: 600, borderRadius: 12, border: '1px solid #E2E8F0', background: '#fff', color: '#333B41', cursor: 'pointer' }}>Cancelar</button>
                <button style={{ height: 36, padding: '0 16px', fontSize: 14, fontWeight: 600, borderRadius: 12, border: 'none', background: '#00C64C', color: '#fff', cursor: 'pointer' }}>Salvar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}`
}

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
      description="Modal operacional extraído do TaskModal.tsx (CONTPIX). Tabs segmentadas, grid de campos com ícones, prioridade com dots, slider de progresso, chips de responsável e área de anexos. Clique no demo para copiar o código."
    >
      <PlaygroundProvider>
      <DemoSection title="Interativo">
        <Copyable label="Modal Workflow" code={codeModalWorkflow()} preview={
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #E2E8F0', fontFamily: "'Open Sans', sans-serif", fontSize: 13, maxWidth: 300 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#333B41', marginBottom: 8 }}>Novo Item</div>
            <div style={{ fontSize: 12, color: '#7B8C96', marginBottom: 12 }}>Modal Workflow com Tabs + Grid 2 colunas + Priority dots</div>
            <div style={{ display: 'flex', gap: 4, padding: 4, background: '#F1F5F9', borderRadius: 8 }}>
              <span style={{ flex: 1, padding: '4px 8px', borderRadius: 6, background: '#fff', color: '#004B9B', fontSize: 11, fontWeight: 600, textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>Atendimento</span>
              <span style={{ flex: 1, padding: '4px 8px', borderRadius: 6, color: '#7B8C96', fontSize: 11, textAlign: 'center' }}>Tarefa</span>
              <span style={{ flex: 1, padding: '4px 8px', borderRadius: 6, color: '#7B8C96', fontSize: 11, textAlign: 'center' }}>Reuniao</span>
            </div>
          </div>
        }>
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
                        ? 'bg-[#FFFFFF] text-[#004B9B] shadow-sm'
                        : 'text-[#7B8C96] hover:text-[#333B41]'
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
                                : 'border-[#E2E8F0]/60 bg-[#FFFFFF] text-[#7B8C96] hover:border-[#E2E8F0] hover:bg-[#F8FAFC]/30'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${isActive ? cfg.dotColor : 'bg-[#7B8C96]/40'}`}
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
        </Copyable>
      </DemoSection>

      <CodePlayground />

      <RuleCards cards={[
        { icon: <ShieldCheck size={20} color="var(--color-gov-azul-profundo)" />, color: 'var(--color-gov-azul-profundo)', bg: 'color-mix(in srgb, var(--color-gov-azul-profundo) 3%, transparent)', tag: 'REGRA 1', title: 'Modal estruturado com abas', desc: 'O Modal Workflow é um diálogo modal com abas segmentadas que organiza formulários de criação e edição em etapas claras. As abas permitem dividir campos relacionados sem sobrecarregar a tela.' },
        { icon: <AlertTriangle size={20} color="#F6921E" />, color: '#F6921E', bg: '#F6921E08', tag: 'REGRA 2', title: 'Três blocos obrigatórios', desc: 'Todo modal workflow tem header (ícone + título + subtítulo), corpo com abas e campos em grid de duas colunas, e footer com ações (cancelar + salvar). Nenhum desses blocos pode ser omitido.' },
        { icon: <ArrowUpFromLine size={20} color="var(--color-gov-azul-escuro)" />, color: 'var(--color-gov-azul-escuro)', bg: 'color-mix(in srgb, var(--color-gov-azul-escuro) 3%, transparent)', tag: 'REGRA 3', title: 'Quando usar este padrão', desc: 'Use o Modal Workflow para criar novos registros, editar formulários complexos ou coletar dados em múltiplas seções sem sair da página atual. Se o formulário for extenso demais para um modal, use o Form Workspace.' },
      ]} />

      <CodeExportSection items={[
        {
          label: 'Modal Workflow',
          description: 'Modal operacional com tabs segmentadas, grid de campos, prioridade com dots e footer com acoes.',
          code: `/* Modal Workflow — DS-FIPS
   Modal para criacao/edicao com:
   - Header: icone circular + titulo + subtitulo
   - Tabs segmentadas (tipo de tarefa)
   - Grid 2 colunas com campos + icones
   - Seletor de prioridade com dots coloridos
   - Slider de progresso
   - Chips de responsavel
   - Area de anexos
   - Footer: atalho teclado + Cancelar + Salvar

   CSS vars: --color-primary, --color-fg, --color-fg-muted
   --color-border, --color-surface, --color-surface-muted
   --color-success, --color-danger
*/

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const priorityConfig = {
  low:    { label: 'Baixa',   dotColor: 'bg-slate-400' },
  medium: { label: 'Media',   dotColor: 'bg-blue-500' },
  high:   { label: 'Alta',    dotColor: 'bg-amber-500' },
  urgent: { label: 'Urgente', dotColor: 'bg-red-500' },
}

function TaskModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nova Tarefa</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[900px] max-h-[90vh] p-0">
        {/* Header */}
        <div className="flex items-start gap-3 px-6 pt-4 pb-4 border-b">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#004B9B]/10">
            {/* Icon */}
          </div>
          <div>
            <h2 className="text-lg font-bold">Novo Item</h2>
            <p className="text-xs text-[#7B8C96]">Subtitulo</p>
          </div>
        </div>

        {/* Body — tabs + grid 2 colunas */}
        <div className="px-6 py-4 max-h-[calc(90vh-140px)] overflow-y-auto">
          {/* Segmented tabs */}
          {/* Two-column grid: fields left, priority+desc right */}
        </div>

        {/* Footer */}
        <div className="flex justify-between px-6 py-4 border-t">
          <span className="text-xs text-[#7B8C96]">Cmd+Enter para salvar</span>
          <div className="flex gap-2">
            <Button variant="secondary">Cancelar</Button>
            <Button variant="success">Salvar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}`,
        },
      ]} />
      </PlaygroundProvider>
    </DocPage>
  )
}
