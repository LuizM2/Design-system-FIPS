import { CalendarDays, Mail, Search, ShieldCheck, UserRound } from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { Input } from '../../../components/ui/input'

const inputPageSource = `import { Mail, Search } from 'lucide-react'
import { Input } from 'ds-fips'

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block space-y-2 text-sm font-semibold text-[var(--color-fg)]">{children}</label>
}

export function ExampleForm() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FieldLabel>
        Nome do cliente
        <Input placeholder="Nome completo" leftIcon={<Search className="h-4 w-4" aria-hidden />} />
      </FieldLabel>
      <FieldLabel>
        Email
        <Input type="email" placeholder="email@fips.app.br" leftIcon={<Mail className="h-4 w-4" aria-hidden />} />
      </FieldLabel>
    </div>
  )
}`

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block space-y-2 text-sm font-semibold text-[var(--color-fg)]">{children}</label>
}

export default function InputDoc() {
  return (
    <DocPage
      title="Input"
      description="Primitiva de campo de texto com ícone opcional. O padrão oficial do DS-FIPS documenta a composição `Label + Input`, como nos formulários do CONTPIX."
      pageSource={inputPageSource}
      pageDownloadName="InputFormExample.tsx"
    >
      <DemoSection
        title="Formulário padrão"
        reference={`import { Input } from 'ds-fips'

<label className="block space-y-2">
  <span>Nome do cliente</span>
  <Input placeholder="Nome completo" />
</label>`}
        referenceLabel="Label + Input"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FieldLabel>
            Nome do cliente
            <Input placeholder="Nome completo" leftIcon={<UserRound className="h-4 w-4" aria-hidden />} />
          </FieldLabel>
          <FieldLabel>
            Email
            <Input type="email" placeholder="email@fips.app.br" leftIcon={<Mail className="h-4 w-4" aria-hidden />} />
          </FieldLabel>
          <FieldLabel>
            Busca global
            <Input placeholder="Buscar empresa, CNPJ ou responsável..." leftIcon={<Search className="h-4 w-4" aria-hidden />} />
          </FieldLabel>
          <FieldLabel>
            Data de vencimento
            <Input type="date" leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />} defaultValue="2026-03-30" />
          </FieldLabel>
        </div>
      </DemoSection>

      <DemoSection
        title="Modo compacto de modal"
        reference={`<Input
  placeholder="Senha do certificado"
  className="h-9 rounded-xl border-[var(--color-border)]/60 pl-9 pr-10 text-sm"
/>`}
        referenceLabel="Input compacto"
      >
        <div className="max-w-2xl rounded-[26px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <FieldLabel>
              Senha
              <Input
                placeholder="Senha do certificado"
                leftIcon={<ShieldCheck className="h-4 w-4" aria-hidden />}
                className="h-9 rounded-xl border-[var(--color-border)]/60 pl-9 pr-10 text-sm shadow-none"
              />
            </FieldLabel>
            <FieldLabel>
              Buscar empresa
              <Input
                placeholder="Buscar empresa..."
                leftIcon={<Search className="h-4 w-4" aria-hidden />}
                className="h-9 rounded-xl border-[var(--color-border)]/60 pl-9 text-sm shadow-none"
              />
            </FieldLabel>
          </div>
        </div>
      </DemoSection>
    </DocPage>
  )
}
