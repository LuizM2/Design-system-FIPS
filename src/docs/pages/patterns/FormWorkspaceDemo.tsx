import { useState } from 'react'
import {
  BadgeDollarSign,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  FolderKanban,
  Layers,
  ListTree,
  MapPin,
  MessageSquareText,
  Phone,
  Save,
  Send,
  Eye,
  Tag,
  UserRound,
  AlertTriangle,
  FileCheck,
  Zap,
} from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { PatternGuidelines } from '../../components/PatternGuidelines'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Field, FieldLabel, type FieldInset } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { Progress } from '../../../components/ui/progress'
import { Select } from '../../../components/ui/select'
import { Textarea } from '../../../components/ui/textarea'

/* ═══════════════════════════════════════════ STYLES ═══════════════════════════════════════════ */
const workspaceStyles = `
  @keyframes wsFadeUp {
    0% { opacity: 0; transform: translateY(16px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes wsSlideIn {
    0% { opacity: 0; transform: translateX(-12px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  @keyframes wsProgressFill {
    0% { width: 0; }
    100% { width: var(--progress-target); }
  }
  @keyframes wsPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(253,194,78,0.3); }
    50% { box-shadow: 0 0 0 6px rgba(253,194,78,0); }
  }
  @keyframes wsTrackSlide {
    0% { background-position: 0 0; }
    100% { background-position: 40px 0; }
  }

  .ws-card {
    transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .ws-card:hover {
    box-shadow: 0 8px 28px rgba(0,75,155,0.08), 0 2px 8px rgba(0,0,0,0.04);
    border-color: var(--color-fips-blue-200);
  }

  .ws-metric-card {
    transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    position: relative;
    overflow: hidden;
  }
  .ws-metric-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--color-fips-yellow-400), var(--color-fips-yellow-600));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .ws-metric-card:hover::after {
    transform: scaleX(1);
  }
  .ws-metric-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0,75,155,0.10), 0 2px 6px rgba(0,0,0,0.04);
  }

  .ws-nav-btn {
    transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    position: relative;
  }
  .ws-nav-btn::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 0;
    background: linear-gradient(180deg, var(--color-fips-yellow-400), var(--color-fips-yellow-600));
    border-radius: 0 4px 4px 0;
    transition: height 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .ws-nav-btn:hover::before {
    height: 60%;
  }
  .ws-nav-btn:hover {
    background: white;
    border-color: var(--color-fips-blue-200);
    box-shadow: 0 4px 16px rgba(0,75,155,0.06);
    transform: translateX(2px);
  }

  .ws-footer {
    background: linear-gradient(135deg, #002a68 0%, #004b9b 50%, #0090d0 100%);
    position: relative;
    overflow: hidden;
  }
  .ws-footer::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(90deg, transparent 0px, transparent 38px, rgba(255,255,255,0.03) 38px, rgba(255,255,255,0.03) 40px);
    animation: wsTrackSlide 3s linear infinite;
    pointer-events: none;
  }

  .ws-section-card {
    animation: wsFadeUp 0.5s ease-out both;
  }
  .ws-section-card:nth-child(1) { animation-delay: 0.05s; }
  .ws-section-card:nth-child(2) { animation-delay: 0.12s; }
  .ws-section-card:nth-child(3) { animation-delay: 0.19s; }

  .ws-checklist-warn {
    position: relative;
    overflow: hidden;
  }
  .ws-checklist-warn::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, var(--color-fips-yellow-400), var(--color-fips-yellow-600));
    border-radius: 0 2px 2px 0;
  }
  .ws-checklist-done {
    position: relative;
    overflow: hidden;
  }
  .ws-checklist-done::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 3px;
    background: var(--color-border);
    border-radius: 0 2px 2px 0;
  }
`

/* ═══════════════════════════════════════════ MINI PROGRESS ═══════════════════════════════════════════ */
function WorkspaceProgress({ value }: { value: number }) {
  const segments = [
    { label: 'Cabeçalho', threshold: 30 },
    { label: 'Classificação', threshold: 60 },
    { label: 'Complementar', threshold: 90 },
    { label: 'Envio', threshold: 100 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary)]/8">
            <Zap className="h-4.5 w-4.5 text-[var(--color-primary)]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-fg)]">Progresso do formulário</p>
            <p className="text-xs text-[var(--color-fg-muted)]">
              {value < 100 ? 'Preencha todos os campos obrigatórios' : 'Formulário completo'}
            </p>
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-2xl font-semibold text-[var(--color-primary)]">{value}</span>
          <span className="text-sm font-medium text-[var(--color-fg-muted)]">%</span>
        </div>
      </div>

      <div className="relative">
        <Progress value={value} />
        <div className="mt-3 flex justify-between">
          {segments.map((seg) => (
            <div key={seg.label} className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  value >= seg.threshold
                    ? 'border-[var(--color-success)] bg-[var(--color-success)]/10'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)]'
                }`}
              >
                {value >= seg.threshold ? (
                  <CheckCircle2 className="h-3 w-3 text-[var(--color-success)]" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-border)]" />
                )}
              </div>
              <span className={`text-[10px] font-semibold tracking-wide ${
                value >= seg.threshold ? 'text-[var(--color-success-strong)]' : 'text-[var(--color-fg-muted)]'
              }`}>
                {seg.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════ FIELD WRAPPER ═══════════════════════════════════════════ */
type WorkspaceFieldProps = {
  label: string
  inset?: FieldInset
  required?: boolean
  children: React.ReactNode
}

function WorkspaceField({ label, inset = 'control', required, children }: WorkspaceFieldProps) {
  return (
    <Field inset={inset}>
      <FieldLabel required={required}>{label}</FieldLabel>
      {children}
    </Field>
  )
}

/* ═══════════════════════════════════════════ MAIN ═══════════════════════════════════════════ */
export default function FormWorkspaceDemo() {
  const [progress] = useState(82)

  return (
    <DocPage
      title="Padrão: Form Workspace"
      description="Workspace de formulário para fluxos densos: resumo no topo, seções claras, grid principal + painel contextual lateral. Todos os campos seguem a composição oficial Field + controle base, sem styling local de componente."
    >
      <style>{workspaceStyles}</style>

      <DemoSection title="Preview" className="!p-0 overflow-hidden">
        <div className="space-y-6 bg-[var(--color-surface-muted)] p-6">

          {/* ═══════ HERO HEADER ═══════ */}
          <Card className="overflow-hidden">
            <div
              className="relative overflow-hidden border-b border-[var(--color-border)] px-7 py-8"
              style={{
                background: 'linear-gradient(135deg, #004B9B 0%, #002A68 60%, #001A4A 100%)',
              }}
            >
              {/* Junction lines SVG */}
              <svg viewBox="0 0 320 200" fill="none" className="pointer-events-none absolute -right-6 -top-3" style={{ width: 400, height: 250, opacity: 0.07 }}>
                <path d="M0 60H100C120 60 120 60 140 40L200 40H320" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
                <path d="M0 60H100C120 60 120 60 140 80L200 80H320" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
                <path d="M0 120H60C80 120 80 120 100 100L160 100H320" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
                <path d="M0 120H60C80 120 80 120 100 140L160 140H320" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
              </svg>

              <div className="relative flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-3xl">
                  <Badge variant="default">Abertura de demanda</Badge>
                  <h2 className="mt-3 font-heading text-3xl font-semibold text-white">
                    Workspace de Solicitação
                  </h2>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60">
                    Organize cabeçalho, classificação, contexto operacional e detalhes financeiros em um único fluxo de preenchimento com forte apoio visual.
                  </p>
                </div>

                {/* Metric cards — glass cards */}
                <div className="xl:min-w-[340px]">
                  <div className="relative grid gap-2 sm:grid-cols-2">
                    {([
                      { label: 'Obrigatórios', value: '8/10', helper: 'campos essenciais', icon: FileCheck, color: '#93BDE4' },
                      { label: 'Locais', value: '3 pares', helper: 'local e sublocal', icon: MapPin, color: '#658EC9' },
                      { label: 'Cadeia', value: 'Pronta', helper: 'aprovador definido', icon: CheckCircle2, color: '#00C64C' },
                      { label: 'RC SAP', value: 'Depois', helper: 'informado após criação', icon: Clock, color: '#FDC24E' },
                    ] as const).map(({ label, value, helper, icon: Icon, color }) => (
                      <div
                        key={label}
                        className="rounded-lg border border-white/10 bg-white/[0.07] px-2.5 py-1.5 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-1.5">
                          <Icon className="h-3 w-3 shrink-0" style={{ color }} />
                          <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-white/50">
                            {label}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm font-bold text-white">{value}</p>
                        <p className="text-[10px] leading-tight text-white/40">{helper}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress + Direction */}
            <CardContent className="space-y-5">
              <WorkspaceProgress value={progress} />

              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)]/12">
                    <ChevronRight className="h-4 w-4 text-[var(--color-accent-strong)]" />
                  </div>
                  <p className="text-sm font-semibold text-[var(--color-fg)]">Direção de preenchimento</p>
                </div>
                <div className="mt-3 grid gap-2.5 text-sm text-[var(--color-fg-muted)] md:grid-cols-2">
                  {[
                    '1. Identifique o solicitante e o escopo.',
                    '2. Classifique a demanda e o contexto.',
                    '3. Complete dados complementares.',
                    '4. Revise o fluxo e as pendências finais.',
                  ].map((step) => (
                    <div key={step} className="flex items-start gap-2">
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent-strong)]" />
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ═══════ MAIN GRID ═══════ */}
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.22fr)_360px]">

            {/* LEFT — Form sections */}
            <div className="space-y-6">
              {/* Section 1: Cabeçalho */}
              <Card className="ws-card ws-section-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--color-primary)]/8">
                      <span className="font-heading text-sm font-bold text-[var(--color-primary)]">01</span>
                    </div>
                    <div>
                      <CardTitle>Cabeçalho da solicitação</CardTitle>
                      <CardDescription>Quem está abrindo a demanda e qual escopo será tratado.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <WorkspaceField label="Data de emissão" inset="control" required>
                    <Input
                      inputMode="numeric"
                      placeholder="dd/mm/aaaa"
                      leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />}
                    />
                  </WorkspaceField>
                  <WorkspaceField label="Nome do solicitante" inset="control" required>
                    <Input placeholder="Nome completo" leftIcon={<UserRound className="h-4 w-4" aria-hidden />} />
                  </WorkspaceField>
                  <WorkspaceField label="Nome do escopo" inset="control" required>
                    <Input placeholder="Ex.: Contratação de manutenção" leftIcon={<FolderKanban className="h-4 w-4" aria-hidden />} />
                  </WorkspaceField>
                </CardContent>
              </Card>

              {/* Section 2: Classificação */}
              <Card className="ws-card ws-section-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--color-secondary)]/8">
                      <span className="font-heading text-sm font-bold text-[var(--color-secondary)]">02</span>
                    </div>
                    <div>
                      <CardTitle>Classificação e contexto</CardTitle>
                      <CardDescription>Área responsável, localização e contexto organizacional.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <WorkspaceField label="Área processo" inset="control" required>
                    <Select aria-label="Área processo" defaultValue="tecnologia" leftIcon={<Layers className="h-4 w-4" aria-hidden />}>
                      <option value="tecnologia">Tecnologia</option>
                      <option value="operacoes">Operações</option>
                    </Select>
                  </WorkspaceField>
                  <WorkspaceField label="Subprocesso" inset="control" required>
                    <Select aria-label="Subprocesso" defaultValue="suporte" leftIcon={<ListTree className="h-4 w-4" aria-hidden />}>
                      <option value="suporte">Suporte</option>
                      <option value="infra">Infraestrutura</option>
                    </Select>
                  </WorkspaceField>
                  <WorkspaceField label="Local de execução" inset="control" required>
                    <Input placeholder="Ex.: Terminal 1" leftIcon={<MapPin className="h-4 w-4" aria-hidden />} />
                  </WorkspaceField>
                  <WorkspaceField label="Sublocal" inset="control">
                    <Input placeholder="Ex.: Casa de força" leftIcon={<MapPin className="h-4 w-4" aria-hidden />} />
                  </WorkspaceField>
                </CardContent>
              </Card>

              {/* Section 3: Complementares */}
              <Card className="ws-card ws-section-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--color-accent-strong)]/10">
                      <span className="font-heading text-sm font-bold text-[var(--color-accent-strong)]">03</span>
                    </div>
                    <div>
                      <CardTitle>Dados complementares</CardTitle>
                      <CardDescription>Informações auxiliares para triagem e Suprimentos.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <WorkspaceField label="Centro de custo" inset="control" required>
                      <Input placeholder="CC 3010" leftIcon={<BadgeDollarSign className="h-4 w-4" aria-hidden />} />
                    </WorkspaceField>
                    <WorkspaceField label="Contato rápido" inset="control">
                      <Input placeholder="(11) 99999-9999" leftIcon={<Phone className="h-4 w-4" aria-hidden />} />
                    </WorkspaceField>
                    <WorkspaceField label="Categoria" inset="control" required>
                      <Select aria-label="Categoria" defaultValue="servico" leftIcon={<Tag className="h-4 w-4" aria-hidden />}>
                        <option value="servico">Serviço</option>
                        <option value="material">Material</option>
                      </Select>
                    </WorkspaceField>
                  </div>
                  <WorkspaceField label="Observação" inset="control">
                    <Textarea placeholder="Detalhe contexto, premissas, restrições e informações úteis para análise..." />
                  </WorkspaceField>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT — Sidebar */}
            <aside className="space-y-4">
              {/* Navegação rápida */}
              <Card className="ws-card">
                <CardHeader>
                  <CardTitle className="text-lg">Navegação rápida</CardTitle>
                  <CardDescription>Links internos para acelerar revisão.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {([
                    { idx: '01', title: 'Cabeçalho da solicitação', helper: 'Solicitante, título e data', color: 'var(--color-primary)' },
                    { idx: '02', title: 'Classificação e contexto', helper: 'Área, subprocesso e local', color: 'var(--color-secondary)' },
                    { idx: '03', title: 'Dados complementares', helper: 'Financeiro, contato e observação', color: 'var(--color-accent-strong)' },
                  ] as const).map(({ idx, title, helper, color }) => (
                    <button
                      key={title}
                      type="button"
                      className="ws-nav-btn w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-3.5 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl font-heading text-xs font-bold text-white"
                          style={{ background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 75%, black))` }}
                        >
                          {idx}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[var(--color-fg)]">{title}</p>
                          <p className="mt-0.5 text-xs text-[var(--color-fg-muted)]">{helper}</p>
                        </div>
                        <ChevronRight className="ml-auto h-4 w-4 flex-shrink-0 text-[var(--color-fg-muted)] opacity-40" />
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Checklist */}
              <Card className="ws-card">
                <CardHeader>
                  <CardTitle className="text-lg">Checklist de envio</CardTitle>
                  <CardDescription>O que ainda bloqueia o fluxo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  <div className="ws-checklist-warn rounded-xl border border-[var(--color-fips-orange-100)] bg-[var(--color-fips-orange-100)]/55 px-4 py-3.5">
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-accent-strong)]" />
                      <p className="text-sm text-[var(--color-accent-strong)]">
                        Confirmar centro de custo antes de enviar para aprovação.
                      </p>
                    </div>
                  </div>
                  <div className="ws-checklist-done rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-3.5">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-fg-muted)]" />
                      <p className="text-sm text-[var(--color-fg-muted)]">
                        Revisar observação final e anexos.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Saúde do formulário */}
              <Card className="ws-card">
                <CardHeader>
                  <CardTitle className="text-lg">Saúde do formulário</CardTitle>
                  <CardDescription>Status operacional do workspace.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">
                      Cadeia de aprovação
                    </p>
                    <div className="mt-2.5 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-[var(--color-fg)]">Fluxo calculado</p>
                      <Badge variant="success" dot>
                        Pronto
                      </Badge>
                    </div>
                    <p className="mt-1.5 text-xs text-[var(--color-fg-muted)]">
                      Aprovador da área identificado com base no valor informado.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">
                      Salvamento
                    </p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[var(--color-success)]" style={{ animation: 'wsPulse 2s ease-in-out infinite' }} />
                      <p className="text-sm font-semibold text-[var(--color-fg)]">Rascunho salvo há 2 min</p>
                    </div>
                    <p className="mt-1.5 text-xs text-[var(--color-fg-muted)]">
                      Última atualização automática às 18:43.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>

          {/* ═══════ FOOTER ACTIONS ═══════ */}
          <div className="ws-footer rounded-2xl p-6 shadow-[var(--shadow-card)]">
            <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-heading text-sm font-semibold text-white">Ações do workspace</p>
                <p className="mt-1 text-sm text-white/55">
                  Rodapé persistente para ações principais e secundárias.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="inverseOutline" size="md">
                  <Eye className="h-4 w-4" />
                  Gerar prévia
                </Button>
                <Button variant="inverseOutline" size="md">
                  <Save className="h-4 w-4" />
                  Salvar rascunho
                </Button>
                <Button variant="ouro" size="md">
                  <Send className="h-4 w-4" />
                  Enviar para aprovação
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DemoSection>

      <PatternGuidelines
        rules={[
          'Use um card-resumo no topo com métricas curtas e progresso visível.',
          'Separe o conteúdo principal em seções numeradas com título + descrição.',
          'Mantenha um painel lateral para navegação, checklist e saúde do formulário.',
          'As ações principais devem morar em rodapé persistente com destaque visual.',
        ]}
        required={[
          'Grid principal com formulário à esquerda e contexto à direita em telas largas.',
          'Campos agrupados por semântica, não apenas por largura visual.',
          'Checklist e status operacionais em cards independentes do formulário.',
          'Resumo inicial deve explicar o fluxo antes do usuário entrar nos campos.',
        ]}
        optional={[
          'Mini cards de métricas com ícones e indicadores coloridos no topo.',
          'Barra de progresso com checkpoints por seção.',
          'Botões rápidos de seção no painel lateral com indicador de hover.',
        ]}
        avoid={[
          'Formulários inteiros sem divisão por seções.',
          'Misturar checklist dentro do corpo dos campos.',
          'Ocultar ações primárias apenas no topo da página.',
        ]}
      />
    </DocPage>
  )
}
