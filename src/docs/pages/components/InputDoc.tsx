import { CalendarDays, ChevronsUpDown, Copy, Eye, Hash, Link2, Mail, Search, ShieldCheck, UserRound } from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { Field, FieldHint, FieldLabel } from '../../../components/ui/field'
import { FieldTrigger } from '../../../components/ui/field-trigger'
import { Input } from '../../../components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '../../../components/ui/input-group'
import { Select } from '../../../components/ui/select'

export default function InputDoc() {
  return (
    <DocPage
      title="Input"
      description="Primitiva de campo de texto com ícone opcional. O uso oficial é sempre via `Field`, mantendo o alinhamento entre label, placeholder e densidade de forma reutilizável. Para composições avançadas com addons, use `InputGroup`."
    >
      <DemoSection
        title="Formulário padrão"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field inset="icon">
            <FieldLabel required>Nome do cliente</FieldLabel>
            <Input placeholder="Nome completo" leftIcon={<UserRound className="h-4 w-4" aria-hidden />} />
            <FieldHint>Padrão oficial para formulários completos e cadastros.</FieldHint>
          </Field>
          <Field inset="icon">
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="email@fips.app.br" leftIcon={<Mail className="h-4 w-4" aria-hidden />} />
          </Field>
          <Field inset="icon">
            <FieldLabel>Busca global</FieldLabel>
            <Input placeholder="Buscar empresa, CNPJ ou responsável..." leftIcon={<Search className="h-4 w-4" aria-hidden />} />
          </Field>
          <Field inset="icon">
            <FieldLabel>Data de vencimento</FieldLabel>
            <Input
              inputMode="numeric"
              placeholder="dd/mm/aaaa"
              leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />}
              defaultValue="30/03/2026"
            />
          </Field>
        </div>
      </DemoSection>

      <DemoSection title="InputGroup — composição agrupada">
        <p className="mb-4 text-sm text-[var(--color-fg-muted)]">
          O <code className="rounded bg-[var(--color-surface-muted)] px-1.5 py-0.5 text-xs font-semibold">InputGroup</code> permite
          compor inputs com ícones, textos auxiliares, botões e addons em qualquer posição — padrão inspirado pelo CONTPIX e adaptado aos tokens FIPS.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Ícone à esquerda */}
          <Field>
            <FieldLabel>Busca com ícone</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <Search className="h-4 w-4" aria-hidden />
              </InputGroupAddon>
              <InputGroupInput placeholder="Buscar empresa, CNPJ..." />
            </InputGroup>
          </Field>

          {/* Ícone + botão à direita */}
          <Field>
            <FieldLabel>Senha</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <ShieldCheck className="h-4 w-4" aria-hidden />
              </InputGroupAddon>
              <InputGroupInput type="password" placeholder="Senha do certificado" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-sm" aria-label="Mostrar senha">
                  <Eye className="h-4 w-4" />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          {/* Prefixo de texto */}
          <Field>
            <FieldLabel>URL do sistema</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="app.fips.com.br" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-sm" aria-label="Copiar link">
                  <Copy className="h-3.5 w-3.5" />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          {/* Sufixo de unidade */}
          <Field>
            <FieldLabel>Valor da nota</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>R$</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput type="text" inputMode="decimal" placeholder="0,00" defaultValue="1.250,00" />
            </InputGroup>
          </Field>
        </div>
      </DemoSection>

      <DemoSection title="InputGroup — label superior (block-start)">
        <div className="max-w-md">
          <InputGroup>
            <InputGroupAddon align="block-start">
              <Link2 className="h-4 w-4" aria-hidden />
              <InputGroupText>Código de rastreio</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="Ex: BR123456789" />
          </InputGroup>
        </div>
      </DemoSection>

      <DemoSection title="InputGroup — textarea">
        <div className="max-w-lg">
          <Field>
            <FieldLabel>Observação</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start" className="self-start pt-3">
                <Hash className="h-4 w-4" aria-hidden />
              </InputGroupAddon>
              <InputGroupTextarea placeholder="Contexto adicional para triagem, filtros e apoio operacional..." rows={3} />
            </InputGroup>
          </Field>
        </div>
      </DemoSection>

      <DemoSection
        title="Modo compacto de modal"
      >
        <div className="max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_100px]">
            <Field density="compact" inset="icon">
              <FieldLabel required>Senha</FieldLabel>
              <Input
                density="compact"
                placeholder="Senha do certificado"
                leftIcon={<ShieldCheck className="h-4 w-4" aria-hidden />}
              />
            </Field>
            <Field density="compact" inset="control">
              <FieldLabel>Tipo</FieldLabel>
              <Select density="compact" aria-label="Tipo" defaultValue="interno">
                <option value="interno">Interno</option>
                <option value="externo">Externo</option>
              </Select>
            </Field>
          </div>
          <div className="mt-3">
            <Field density="compact" inset="icon">
              <FieldLabel>Cliente</FieldLabel>
              <FieldTrigger
                density="compact"
                placeholder="Buscar empresa..."
                leftIcon={<Search className="h-4 w-4" aria-hidden />}
                rightIcon={<ChevronsUpDown className="h-4 w-4 opacity-50" aria-hidden />}
                aria-label="Buscar empresa"
              />
            </Field>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Obrigatório e estados">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-fg-muted)]">Obrigatório</p>
            <Field inset="icon">
              <FieldLabel required>Título</FieldLabel>
              <Input
                defaultValue="Ex: Consultoria Fiscal"
                leftIcon={<ShieldCheck className="h-4 w-4" aria-hidden />}
              />
              <FieldHint>Asterisco vermelho identifica campo obrigatório.</FieldHint>
            </Field>
          </div>

          <div className="space-y-3 rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-primary)]">Selecionado / em foco</p>
            <Field inset="icon">
              <FieldLabel>Título</FieldLabel>
              <Input
                data-state-preview="focused"
                defaultValue="Ex: Consultoria Fiscal"
                leftIcon={<ShieldCheck className="h-4 w-4" aria-hidden />}
              />
              <FieldHint>Preview visual do estado ativo do controle.</FieldHint>
            </Field>
          </div>

          <div className="space-y-3 rounded-2xl border border-[var(--color-danger)]/20 bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-danger)]">Erro</p>
            <Field inset="icon">
              <FieldLabel required>Email</FieldLabel>
              <Input
                aria-invalid="true"
                data-state-preview="focused"
                defaultValue="consultoriafiscal"
                leftIcon={<Mail className="h-4 w-4" aria-hidden />}
              />
              <FieldHint>Validação visual em vermelho para campo inválido.</FieldHint>
            </Field>
          </div>

          <div className="space-y-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-fg-muted)]">Bloqueado</p>
            <Field inset="icon">
              <FieldLabel>Busca</FieldLabel>
              <Input
                disabled
                defaultValue="Campo indisponível"
                leftIcon={<Search className="h-4 w-4" aria-hidden />}
              />
              <FieldHint>Use quando o fluxo não permitir edição.</FieldHint>
            </Field>
          </div>
        </div>
      </DemoSection>
    </DocPage>
  )
}
