import { MessageSquareText } from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { Textarea } from '../../../components/ui/textarea'

const textareaPageSource = `import { Textarea } from 'ds-fips'

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block space-y-2 text-sm font-semibold text-[var(--color-fg)]">{children}</label>
}

export function ExampleTextarea() {
  return (
    <FieldLabel>
      Observação
      <Textarea placeholder="Detalhe contexto, premissas e orientações..." />
    </FieldLabel>
  )
}`

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block space-y-2 text-sm font-semibold text-[var(--color-fg)]">{children}</label>
}

export default function TextareaDoc() {
  return (
    <DocPage
      title="Textarea"
      description="Área de texto para contexto operacional, observações e descrições longas. O padrão oficial usa label acima e mantém a mesma geometria dos demais campos."
      pageSource={textareaPageSource}
      pageDownloadName="TextareaFieldExample.tsx"
    >
      <DemoSection
        title="Formulário padrão"
        reference={`<label className="block space-y-2">
  <span>Observação</span>
  <Textarea placeholder="Descreva o contexto..." />
</label>`}
        referenceLabel="Label + Textarea"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <FieldLabel>
            Observação
            <Textarea placeholder="Descreva o contexto da solicitação, premissas e pontos de atenção..." />
          </FieldLabel>
          <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
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
        reference={`<Textarea
  className="min-h-[92px] rounded-xl border-[var(--color-border)]/60 text-sm shadow-none"
  placeholder="Anotações sobre o certificado..."
/>`}
        referenceLabel="Textarea compacto"
      >
        <div className="max-w-2xl rounded-[26px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
          <FieldLabel>
            Descrição
            <Textarea
              placeholder="Detalhes, contexto, links e orientações para execução..."
              className="min-h-[92px] rounded-xl border-[var(--color-border)]/60 text-sm shadow-none"
            />
          </FieldLabel>
        </div>
      </DemoSection>
    </DocPage>
  )
}
