import { CalendarDays, Mail, Search, ShieldCheck, UserRound } from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { Field, FieldHint, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'

export default function InputDoc() {
  return (
    <DocPage
      title="Input"
      description="Primitiva de campo de texto com ícone opcional. O uso oficial é sempre via `Field`, mantendo o alinhamento entre label, placeholder e densidade de forma reutilizável."
    >
      <DemoSection
        title="Formulário padrão"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field inset="icon">
            <FieldLabel required>Nome do cliente</FieldLabel>
            <Input placeholder="Nome completo" leftIcon={<UserRound className="h-4 w-4" aria-hidden />} />
            <FieldHint>Padrão oficial para formulários completos e cadastros.</FieldHint>
          </Field>
          <Field inset="icon">
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="email@fips.app.br" leftIcon={<Mail className="h-4 w-4" aria-hidden />} />
          </Field>
          <Field inset="icon">
            <FieldLabel>Busca global</FieldLabel>
            <Input placeholder="Buscar empresa, CNPJ ou responsável..." leftIcon={<Search className="h-4 w-4" aria-hidden />} />
          </Field>
          <Field inset="icon">
            <FieldLabel>Data de vencimento</FieldLabel>
            <Input type="date" leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />} defaultValue="2026-03-30" />
          </Field>
        </div>
      </DemoSection>

      <DemoSection
        title="Modo compacto de modal"
      >
        <div className="max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field density="compact" inset="icon">
              <FieldLabel required>Senha</FieldLabel>
              <Input
                density="compact"
                placeholder="Senha do certificado"
                leftIcon={<ShieldCheck className="h-4 w-4" aria-hidden />}
              />
            </Field>
            <Field density="compact" inset="icon">
              <FieldLabel>Buscar empresa</FieldLabel>
              <Input
                density="compact"
                placeholder="Buscar empresa..."
                leftIcon={<Search className="h-4 w-4" aria-hidden />}
              />
            </Field>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Obrigatório e estados">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-fg-muted)]">Obrigatório</p>
            <Field density="compact" inset="icon">
              <FieldLabel required>Título</FieldLabel>
              <Input
                density="compact"
                defaultValue="Ex: Consultoria Fiscal"
                leftIcon={<ShieldCheck className="h-4 w-4" aria-hidden />}
              />
              <FieldHint>Asterisco vermelho identifica campo obrigatório.</FieldHint>
            </Field>
          </div>

          <div className="space-y-3 rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-primary)]">Selecionado / em foco</p>
            <Field density="compact" inset="icon">
              <FieldLabel>Título</FieldLabel>
              <Input
                density="compact"
                data-state-preview="focused"
                defaultValue="Ex: Consultoria Fiscal"
                leftIcon={<ShieldCheck className="h-4 w-4" aria-hidden />}
              />
              <FieldHint>Preview visual do estado ativo do controle.</FieldHint>
            </Field>
          </div>

          <div className="space-y-3 rounded-2xl border border-[var(--color-danger)]/20 bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-danger)]">Erro</p>
            <Field density="compact" inset="icon">
              <FieldLabel required>Email</FieldLabel>
              <Input
                density="compact"
                aria-invalid="true"
                data-state-preview="focused"
                defaultValue="consultoriafiscal"
                leftIcon={<Mail className="h-4 w-4" aria-hidden />}
              />
              <FieldHint>Validação visual em vermelho para campo inválido.</FieldHint>
            </Field>
          </div>

          <div className="space-y-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-fg-muted)]">Bloqueado</p>
            <Field density="compact" inset="icon">
              <FieldLabel>Busca</FieldLabel>
              <Input
                density="compact"
                disabled
                defaultValue="Campo indisponível"
                leftIcon={<Search className="h-4 w-4" aria-hidden />}
              />
              <FieldHint>Use quando o fluxo não permitir edição.</FieldHint>
            </Field>
          </div>
        </div>
      </DemoSection>
    </DocPage>
  )
}
