import { Check, Loader2 } from 'lucide-react'
import { DocPage, DemoSection } from '../../components/DocPage'
import { Button } from '../../../components/ui/button'

export default function ButtonDoc() {
  return (
    <DocPage
      title="Button"
      description="Ações primárias e secundárias. Variantes mapeiam para a paleta FIPS (primary, accent/amarelo ouro, estados de perigo)."
    >
      <DemoSection
        title="Variantes"
        reference={`import { Button } from 'ds-fips'

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="accent">Accent</Button>
<Button variant="danger">Danger</Button>
<Button variant="link">Link</Button>`}
        referenceLabel="Import (package ds-fips) + JSX"
      >
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="link">Link</Button>
        </div>
      </DemoSection>
      <DemoSection
        title="Tamanhos e estado"
        reference={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Salvar"><Icon /></Button>
<Button disabled>Disabled</Button>`}
        referenceLabel="Tamanhos"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Salvar">
            <Check />
          </Button>
          <Button disabled>Disabled</Button>
          <Button>
            <Loader2 className="animate-spin" aria-hidden />
            Carregando
          </Button>
        </div>
      </DemoSection>
    </DocPage>
  )
}
