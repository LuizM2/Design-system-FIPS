import { Building2 } from 'lucide-react'
import { DocPage, DemoSection } from '../../components/DocPage'
import { Select } from '../../../components/ui/select'

export default function SelectDoc() {
  return (
    <DocPage
      title="Select"
      description="Lista nativa estilizada. Para busca/async, evolua para um combobox headless em versões futuras."
    >
      <DemoSection
        title="Exemplos"
        reference={`import { Select } from 'ds-fips'

<Select aria-label="Departamento" leftIcon={...}>
  <option value="">Selecione</option>
  <option value="ti">TI</option>
</Select>`}
        referenceLabel="Select nativo estilizado"
      >
        <div className="grid max-w-xl gap-4">
          <Select aria-label="Departamento">
            <option value="">Selecione o departamento</option>
            <option>Operações</option>
            <option>TI</option>
            <option>Comercial</option>
          </Select>
          <Select
            aria-label="Unidade com ícone"
            leftIcon={<Building2 className="h-4 w-4" aria-hidden />}
            defaultValue="santos"
          >
            <option value="santos">Porto de Santos</option>
            <option value="sp">São Paulo</option>
          </Select>
        </div>
      </DemoSection>
    </DocPage>
  )
}
