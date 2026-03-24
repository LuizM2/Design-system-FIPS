import { DocPage, DemoSection } from '../../components/DocPage'
import { Badge } from '../../../components/ui/badge'

export default function BadgeDoc() {
  return (
    <DocPage
      title="Badge"
      description="Etiquetas compactas para status, categorias e contadores."
    >
      <DemoSection
        title="Variantes"
        reference={`import { Badge } from 'ds-fips'

<Badge variant="default">Default</Badge>
<Badge variant="success">Sucesso</Badge>
<Badge variant="warning">Atenção</Badge>
<Badge variant="danger">Crítico</Badge>`}
        referenceLabel="Badge"
      >
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Sucesso</Badge>
          <Badge variant="warning">Atenção</Badge>
          <Badge variant="danger">Crítico</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </DemoSection>
    </DocPage>
  )
}
