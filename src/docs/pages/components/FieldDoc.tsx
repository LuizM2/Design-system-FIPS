import { AlertCircle, Building2, Mail, Phone, Save, Search, UserRound } from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { Button } from '../../../components/ui/button'
import { Field, FieldHint, FieldLabel, FieldMessage } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { Select } from '../../../components/ui/select'
import { Textarea } from '../../../components/ui/textarea'

export default function FieldDoc() {
  return (
    <DocPage
      title="Field"
      description="Composição oficial de label, hint e mensagem para qualquer controle de formulário. Todos os projetos devem montar campos a partir desta camada, não por combinações soltas."
    >
      <DemoSection title="Cadastro desktop de referência">
        <div className="space-y-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-[2rem] font-semibold tracking-tight text-[var(--color-fg)]">Dados do Cliente</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">Cancelar</Button>
              <Button variant="success">
                <Save className="h-4 w-4" aria-hidden />
                Salvar
              </Button>
            </div>
          </div>

          <div className="grid gap-x-5 gap-y-6 md:grid-cols-12">
            <Field className="md:col-span-2">
              <FieldLabel>ID</FieldLabel>
              <Input defaultValue="20223" />
            </Field>
            <Field className="md:col-span-4">
              <FieldLabel>CNPJ</FieldLabel>
              <Input defaultValue="56481942420" />
            </Field>
            <Field className="md:col-span-6">
              <FieldLabel>Nome do Cliente</FieldLabel>
              <Input defaultValue="Multi Campo QoSJa TestX" />
            </Field>

            <Field className="md:col-span-6">
              <FieldLabel>Razão Social</FieldLabel>
              <Input defaultValue="Cristina Peixoto Bragaa Test" />
            </Field>
            <Field className="md:col-span-6">
              <FieldLabel>Nome Fantasia</FieldLabel>
              <Input defaultValue="CRISTIANA PEIXOTO BRAGA" />
            </Field>

            <Field className="md:col-span-6">
              <FieldLabel>Email do Cliente</FieldLabel>
              <Input defaultValue="multiH6Ew@test.com" />
            </Field>
            <Field className="md:col-span-3">
              <FieldLabel>Segmento</FieldLabel>
              <Select aria-label="Segmento" leftIcon={<Building2 className="h-4 w-4" aria-hidden />}>
                <option value="">Selecione</option>
                <option value="contabil">Contábil</option>
                <option value="juridico">Jurídico</option>
              </Select>
            </Field>
            <Field className="md:col-span-3">
              <FieldLabel>Contato Telefone</FieldLabel>
              <Input defaultValue="11999999999" leftIcon={<Phone className="h-4 w-4" aria-hidden />} />
            </Field>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Composição padrão">
        <div className="grid gap-4 md:grid-cols-2">
          <Field inset="icon">
            <FieldLabel required>Nome do cliente</FieldLabel>
            <Input placeholder="Nome completo" leftIcon={<UserRound className="h-4 w-4" aria-hidden />} />
            <FieldHint>Use o nome jurídico ou comercial principal.</FieldHint>
          </Field>

          <Field inset="icon">
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="email@fips.app.br" leftIcon={<Mail className="h-4 w-4" aria-hidden />} />
            <FieldMessage tone="default">Este campo é obrigatório no cadastro completo.</FieldMessage>
          </Field>
        </div>
      </DemoSection>

      <DemoSection title="Densidade compacta oficial">
        <div className="max-w-3xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <Field density="compact" inset="icon">
              <FieldLabel>Busca rápida</FieldLabel>
              <Input density="compact" placeholder="Empresa ou responsável..." leftIcon={<Search className="h-4 w-4" aria-hidden />} />
            </Field>

            <Field density="compact" inset="control">
              <FieldLabel>Status</FieldLabel>
              <Select density="compact" aria-label="Status" defaultValue="ativo">
                <option value="ativo">Ativo</option>
                <option value="novo">Novo</option>
                <option value="inativo">Inativo</option>
              </Select>
            </Field>

            <Field density="compact" inset="control" className="md:col-span-2">
              <FieldLabel>Observação</FieldLabel>
              <Textarea density="compact" placeholder="Contexto adicional para triagem, filtros e apoio operacional..." />
            </Field>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Regra obrigatória">
        <div className="rounded-2xl border border-[var(--color-fips-red-100)] bg-[var(--color-fips-red-100)]/40 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 text-[var(--color-danger)]" aria-hidden />
            <div className="space-y-2 text-sm text-[var(--color-fg-muted)]">
              <p className="font-semibold text-[var(--color-fg)]">
                Campos montados devem nascer de `Field + componente base`.
              </p>
              <p>
                Ajustes de borda, raio, sombra, altura, padding interno e alinhamento do label não devem ser refeitos na ponta. Quando um contexto exigir outro comportamento, a alteração entra no design system como API oficial.
              </p>
              <p>
                Campos obrigatórios usam asterisco vermelho no `FieldLabel`, e estados como foco, inválido e bloqueado devem ser demonstrados nas páginas de componente para orientar todos os projetos.
              </p>
            </div>
          </div>
        </div>
      </DemoSection>
    </DocPage>
  )
}
