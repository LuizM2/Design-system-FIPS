import { Mail, Search } from 'lucide-react'
import { DocPage, DemoSection } from '../../components/DocPage'
import { Input } from '../../../components/ui/input'

export default function InputDoc() {
  return (
    <DocPage
      title="Input"
      description="Campo de texto com suporte a ícone à esquerda. Use labels associados em formulários reais (for/id ou aria-label)."
    >
      <DemoSection
        title="Estados"
        reference={`import { Input } from 'ds-fips'
import { Search } from 'lucide-react'

<Input placeholder="..." />
<Input placeholder="Buscar…" leftIcon={<Search className="h-4 w-4" />} />`}
        referenceLabel="Input + ícone"
      >
        <div className="grid max-w-xl gap-4">
          <Input placeholder="Texto simples" />
          <Input placeholder="Buscar…" leftIcon={<Search className="h-4 w-4" aria-hidden />} />
          <Input
            type="email"
            placeholder="email@fips.com.br"
            leftIcon={<Mail className="h-4 w-4" aria-hidden />}
          />
          <Input disabled placeholder="Desabilitado" />
        </div>
      </DemoSection>
    </DocPage>
  )
}
