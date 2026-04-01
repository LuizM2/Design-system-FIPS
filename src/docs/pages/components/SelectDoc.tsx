import { Building2, FolderTree, UserRound } from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { Field, FieldLabel } from '../../../components/ui/field'
import { Select } from '../../../components/ui/select'

export default function SelectDoc() {
  return (
    <DocPage
      title="Select"
      description="Lista nativa estilizada, documentada via `Field` para manter o mesmo alinhamento e a mesma régua visual dos demais campos. O padrão cobre uso completo e densidade `compact`."
    >
      <DemoSection
        title="Formulário padrão"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field inset="icon">
            <FieldLabel required>Departamento</FieldLabel>
            <Select aria-label="Departamento" leftIcon={<Building2 className="h-4 w-4" aria-hidden />}>
              <option value="">Selecione o departamento</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="operacoes">Operações</option>
              <option value="comercial">Comercial</option>
            </Select>
          </Field>
          <Field inset="icon">
            <FieldLabel>Responsável</FieldLabel>
            <Select aria-label="Responsável" leftIcon={<UserRound className="h-4 w-4" aria-hidden />}>
              <option value="">Selecione o colaborador</option>
              <option value="diogo">Diogo Henrique Paiva</option>
              <option value="luiz">Luiz Claudio</option>
            </Select>
          </Field>
          <Field inset="icon">
            <FieldLabel>Segmento</FieldLabel>
            <Select aria-label="Segmento" leftIcon={<FolderTree className="h-4 w-4" aria-hidden />}>
              <option value="">Selecione o segmento</option>
              <option value="comercio">Comércio</option>
              <option value="servico">Serviço</option>
              <option value="industria">Indústria</option>
            </Select>
          </Field>
          <Field inset="control">
            <FieldLabel>Status</FieldLabel>
            <Select aria-label="Status" defaultValue="ativo">
              <option value="ativo">Ativo</option>
              <option value="novo">Novo</option>
              <option value="inativo">Inativo</option>
            </Select>
          </Field>
        </div>
      </DemoSection>

      <DemoSection
        title="Modo compacto de modal"
      >
        <div className="max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field density="compact" inset="icon">
              <FieldLabel required>Responsável</FieldLabel>
              <Select
                density="compact"
                aria-label="Responsável"
                leftIcon={<UserRound className="h-4 w-4" aria-hidden />}
                defaultValue="diogo"
              >
                <option value="diogo">Diogo Henrique Paiva</option>
                <option value="luiz">Luiz Claudio</option>
              </Select>
            </Field>
            <Field density="compact" inset="control">
              <FieldLabel>Tipo</FieldLabel>
              <Select density="compact" aria-label="Tipo" defaultValue="interno">
                <option value="interno">Interno</option>
                <option value="externo">Externo</option>
              </Select>
            </Field>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Obrigatório e estados">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-fg-muted)]">Obrigatório</p>
            <Field inset="control">
              <FieldLabel required>Status</FieldLabel>
              <Select aria-label="Status obrigatório" defaultValue="ativo">
                <option value="">Selecione</option>
                <option value="ativo">Ativo</option>
                <option value="novo">Novo</option>
                <option value="inativo">Inativo</option>
              </Select>
            </Field>
          </div>

          <div className="space-y-3 rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-primary)]">Selecionado / em foco</p>
            <Field inset="control">
              <FieldLabel>Status</FieldLabel>
              <Select aria-label="Status em foco" data-state-preview="focused" defaultValue="novo">
                <option value="">Selecione</option>
                <option value="ativo">Ativo</option>
                <option value="novo">Novo</option>
                <option value="inativo">Inativo</option>
              </Select>
            </Field>
          </div>

          <div className="space-y-3 rounded-2xl border border-[var(--color-danger)]/20 bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-danger)]">Erro</p>
            <Field inset="control">
              <FieldLabel required>Status</FieldLabel>
              <Select aria-label="Status inválido" aria-invalid="true" data-state-preview="focused" defaultValue="">
                <option value="">Selecione</option>
                <option value="ativo">Ativo</option>
                <option value="novo">Novo</option>
                <option value="inativo">Inativo</option>
              </Select>
            </Field>
          </div>

          <div className="space-y-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-fg-muted)]">Bloqueado</p>
            <Field inset="control">
              <FieldLabel>Status</FieldLabel>
              <Select aria-label="Status bloqueado" disabled defaultValue="ativo">
                <option value="ativo">Ativo</option>
                <option value="novo">Novo</option>
              </Select>
            </Field>
          </div>
        </div>
      </DemoSection>
    </DocPage>
  )
}
