import { CalendarDays, ChevronsUpDown, Mail, Search, ShieldCheck, UserRound } from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { Field, FieldHint, FieldLabel } from '../../../components/ui/field'
import { FieldTrigger } from '../../../components/ui/field-trigger'
import { Input } from '../../../components/ui/input'
import { Select } from '../../../components/ui/select'

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
            <Input
              inputMode="numeric"
              placeholder="dd/mm/aaaa"
              leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />}
              defaultValue="30/03/2026"
            />
          </Field>
        </div>
      </DemoSection>

      <DemoSection
        title="Modo compacto de modal"
      >
        <div className="max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_100px]">
            <Field density="compact" inset="icon">
              <FieldLabel required>Senha</FieldLabel>
              <Input
                density="compact"
                placeholder="Senha do certificado"
                leftIcon={<ShieldCheck className="h-4 w-4" aria-hidden />}
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
          <div className="mt-3">
            <Field density="compact" inset="icon">
              <FieldLabel>Cliente</FieldLabel>
              <FieldTrigger
                density="compact"
                placeholder="Buscar empresa..."
                leftIcon={<Search className="h-4 w-4" aria-hidden />}
                rightIcon={<ChevronsUpDown className="h-4 w-4 opacity-50" aria-hidden />}
                aria-label="Buscar empresa"
              />
            </Field>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Obrigatório e estados">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-fg-muted)]">Obrigatório</p>
            <Field inset="icon">
              <FieldLabel required>Título</FieldLabel>
              <Input
                defaultValue="Ex: Consultoria Fiscal"
                leftIcon={<ShieldCheck className="h-4 w-4" aria-hidden />}
              />
              <FieldHint>Asterisco vermelho identifica campo obrigatório.</FieldHint>
            </Field>
          </div>

          <div className="space-y-3 rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-primary)]">Selecionado / em foco</p>
            <Field inset="icon">
              <FieldLabel>Título</FieldLabel>
              <Input
                data-state-preview="focused"
                defaultValue="Ex: Consultoria Fiscal"
                leftIcon={<ShieldCheck className="h-4 w-4" aria-hidden />}
              />
              <FieldHint>Preview visual do estado ativo do controle.</FieldHint>
            </Field>
          </div>

          <div className="space-y-3 rounded-2xl border border-[var(--color-danger)]/20 bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-danger)]">Erro</p>
            <Field inset="icon">
              <FieldLabel required>Email</FieldLabel>
              <Input
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
            <Field inset="icon">
              <FieldLabel>Busca</FieldLabel>
              <Input
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
