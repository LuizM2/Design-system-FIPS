import { Building2, FolderTree, UserRound } from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { Select } from '../../../components/ui/select'

const selectPageSource = `import { Building2 } from 'lucide-react'
import { Select } from 'ds-fips'

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block space-y-2 text-sm font-semibold text-[var(--color-fg)]">{children}</label>
}

export function ExampleSelects() {
  return (
    <FieldLabel>
      Departamento
      <Select aria-label="Departamento" leftIcon={<Building2 className="h-4 w-4" aria-hidden />}>
        <option value="">Selecione</option>
        <option value="tecnologia">Tecnologia</option>
      </Select>
    </FieldLabel>
  )
}`

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block space-y-2 text-sm font-semibold text-[var(--color-fg)]">{children}</label>
}

export default function SelectDoc() {
  return (
    <DocPage
      title="Select"
      description="Lista nativa estilizada, documentada como composição com label acima. O padrão cobre uso padrão de formulário e uso compacto em modal."
      pageSource={selectPageSource}
      pageDownloadName="SelectFieldExample.tsx"
    >
      <DemoSection
        title="Formulário padrão"
        reference={`<Select aria-label="Departamento" leftIcon={<Building2 className="h-4 w-4" aria-hidden />}>
  <option value="">Selecione</option>
</Select>`}
        referenceLabel="Select com label"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FieldLabel>
            Departamento
            <Select aria-label="Departamento" leftIcon={<Building2 className="h-4 w-4" aria-hidden />}>
              <option value="">Selecione o departamento</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="operacoes">Operações</option>
              <option value="comercial">Comercial</option>
            </Select>
          </FieldLabel>
          <FieldLabel>
            Responsável
            <Select aria-label="Responsável" leftIcon={<UserRound className="h-4 w-4" aria-hidden />}>
              <option value="">Selecione o colaborador</option>
              <option value="diogo">Diogo Henrique Paiva</option>
              <option value="luiz">Luiz Claudio</option>
            </Select>
          </FieldLabel>
          <FieldLabel>
            Segmento
            <Select aria-label="Segmento" leftIcon={<FolderTree className="h-4 w-4" aria-hidden />}>
              <option value="">Selecione o segmento</option>
              <option value="comercio">Comércio</option>
              <option value="servico">Serviço</option>
              <option value="industria">Indústria</option>
            </Select>
          </FieldLabel>
          <FieldLabel>
            Status
            <Select aria-label="Status" defaultValue="ativo">
              <option value="ativo">Ativo</option>
              <option value="novo">Novo</option>
              <option value="inativo">Inativo</option>
            </Select>
          </FieldLabel>
        </div>
      </DemoSection>

      <DemoSection
        title="Modo compacto de modal"
        reference={`<Select
  aria-label="Responsável"
  className="h-9 rounded-xl border-[var(--color-border)]/60 text-sm shadow-none"
>
  <option>Diogo Henrique Paiva</option>
</Select>`}
        referenceLabel="Select compacto"
      >
        <div className="max-w-2xl rounded-[26px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <FieldLabel>
              Responsável
              <Select
                aria-label="Responsável"
                leftIcon={<UserRound className="h-4 w-4" aria-hidden />}
                className="h-9 rounded-xl border-[var(--color-border)]/60 pl-9 text-sm shadow-none"
                defaultValue="diogo"
              >
                <option value="diogo">Diogo Henrique Paiva</option>
                <option value="luiz">Luiz Claudio</option>
              </Select>
            </FieldLabel>
            <FieldLabel>
              Tipo
              <Select aria-label="Tipo" className="h-9 rounded-xl border-[var(--color-border)]/60 text-sm shadow-none" defaultValue="interno">
                <option value="interno">Interno</option>
                <option value="externo">Externo</option>
              </Select>
            </FieldLabel>
          </div>
        </div>
      </DemoSection>
    </DocPage>
  )
}
