import { MessageSquareText } from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { Field, FieldHint, FieldLabel } from '../../../components/ui/field'
import { Textarea } from '../../../components/ui/textarea'

export default function TextareaDoc() {
  return (
    <DocPage
      title="Textarea"
      description="Área de texto para contexto operacional, observações e descrições longas. O uso oficial também acontece via `Field`, preservando a mesma lógica de composição dos demais controles."
    >
      <DemoSection
        title="Formulário padrão"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Field inset="control">
            <FieldLabel required>Observação</FieldLabel>
            <Textarea placeholder="Descreva o contexto da solicitação, premissas e pontos de atenção..." />
            <FieldHint>Use para detalhes que não cabem nos campos estruturados.</FieldHint>
          </Field>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-fg)]">
              <MessageSquareText className="h-4 w-4 text-[var(--color-fg-muted)]" aria-hidden />
              Contexto de uso
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--color-fg-muted)]">
              Use este campo para registrar orientações, justificativas e detalhes que não cabem nos demais inputs estruturados.
            </p>
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="Modo compacto de modal"
      >
        <div className="max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
          <Field density="compact" inset="control">
            <FieldLabel required>Descrição</FieldLabel>
            <Textarea
              density="compact"
              placeholder="Detalhes, contexto, links e orientações para execução..."
            />
          </Field>
        </div>
      </DemoSection>

      <DemoSection title="Obrigatório e estados">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-fg-muted)]">Obrigatório</p>
            <Field density="compact" inset="control">
              <FieldLabel required>Descrição</FieldLabel>
              <Textarea density="compact" defaultValue="Detalhes principais do atendimento e pontos de atenção." />
            </Field>
          </div>

          <div className="space-y-3 rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-primary)]">Selecionado / em foco</p>
            <Field density="compact" inset="control">
              <FieldLabel>Descrição</FieldLabel>
              <Textarea
                density="compact"
                data-state-preview="focused"
                defaultValue="Campo ativo para edição de contexto e observações."
              />
            </Field>
          </div>

          <div className="space-y-3 rounded-2xl border border-[var(--color-danger)]/20 bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-danger)]">Erro</p>
            <Field density="compact" inset="control">
              <FieldLabel required>Descrição</FieldLabel>
              <Textarea
                density="compact"
                aria-invalid="true"
                data-state-preview="focused"
                defaultValue="Texto sem informação mínima necessária."
              />
            </Field>
          </div>

          <div className="space-y-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-fg-muted)]">Bloqueado</p>
            <Field density="compact" inset="control">
              <FieldLabel>Descrição</FieldLabel>
              <Textarea
                density="compact"
                disabled
                defaultValue="Conteúdo indisponível para edição neste estágio."
              />
            </Field>
          </div>
        </div>
      </DemoSection>
    </DocPage>
  )
}
