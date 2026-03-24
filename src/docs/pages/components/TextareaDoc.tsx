import { DocPage, DemoSection } from '../../components/DocPage'
import { Textarea } from '../../../components/ui/textarea'

export default function TextareaDoc() {
  return (
    <DocPage
      title="Textarea"
      description="Área de texto com altura mínima e redimensionamento vertical."
    >
      <DemoSection
        title="Exemplo"
        reference={`import { Textarea } from 'ds-fips'

<Textarea placeholder="Descreva o contexto…" rows={5} />`}
        referenceLabel="Textarea"
      >
        <Textarea placeholder="Descreva o contexto da solicitação…" />
      </DemoSection>
    </DocPage>
  )
}
