import {
  BadgeDollarSign,
  CalendarDays,
  FolderKanban,
  MapPin,
  Phone,
  UserRound,
} from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { PatternGuidelines } from '../../components/PatternGuidelines'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Select } from '../../../components/ui/select'
import { Textarea } from '../../../components/ui/textarea'

function MiniProgress({ value }: { value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-[var(--color-fg)]">Progresso</span>
        <span className="font-semibold text-[var(--color-fg-muted)]">{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-[var(--color-surface-muted)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block space-y-2 text-sm font-semibold text-[var(--color-fg)]">{children}</label>
}

export default function FormWorkspaceDemo() {
  return (
    <DocPage
      title="Padrão: Form Workspace"
      description="Workspace de formulário para fluxos densos: resumo no topo, seções claras, grid principal + painel contextual lateral. Baseado na estrutura aprovada dos formulários operacionais."
    >
      <DemoSection
        title="Preview"
        className="!p-0 overflow-hidden"
        reference={`<div className="space-y-6 bg-[var(--color-surface-muted)] p-6">
  <Card>{/* header do workspace + resumo + progresso */}</Card>
  <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
    <div className="space-y-6">{/* seções do formulário */}</div>
    <aside className="space-y-4">{/* navegação, checklist e saúde */}</aside>
  </div>
</div>`}
        referenceLabel="Estrutura do workspace"
      >
        <div className="space-y-6 bg-[var(--color-surface-muted)] p-6">
          <Card className="overflow-hidden">
            <div className="border-b border-[var(--color-border)] bg-[linear-gradient(135deg,rgba(0,75,155,0.06),rgba(0,144,208,0.10),rgba(253,194,78,0.10))] px-7 py-7">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-3xl">
                  <Badge variant="default">Abertura de demanda</Badge>
                  <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-fg)]">
                    Workspace de Solicitação
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    Organize cabeçalho, classificação, contexto operacional e detalhes financeiros em um único fluxo de preenchimento com forte apoio visual.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[410px]">
                  {[
                    ['Obrigatórios', '8/10', 'campos essenciais preenchidos'],
                    ['Locais', '3 pares', 'local e sublocal mapeados'],
                    ['Cadeia', 'Pronta', 'aprovador de área definido'],
                    ['RC SAP', 'Depois', 'informado após a criação'],
                  ].map(([label, value, helper]) => (
                    <div key={label} className="rounded-[24px] border border-[var(--color-border)] bg-white/90 p-4 shadow-[var(--shadow-field)]">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">{label}</p>
                      <p className="mt-2 font-heading text-2xl font-semibold text-[var(--color-fg)]">{value}</p>
                      <p className="mt-1 text-sm text-[var(--color-fg-muted)]">{helper}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <CardContent className="space-y-5">
              <MiniProgress value={82} />
              <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                <p className="text-sm font-semibold text-[var(--color-fg)]">Direção de preenchimento</p>
                <div className="mt-3 grid gap-2 text-sm text-[var(--color-fg-muted)] md:grid-cols-2">
                  <p>1. Identifique o solicitante e o escopo.</p>
                  <p>2. Classifique a demanda e o contexto.</p>
                  <p>3. Complete dados complementares.</p>
                  <p>4. Revise o fluxo e as pendências finais.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.22fr)_360px]">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cabeçalho da solicitação</CardTitle>
                  <CardDescription>Quem está abrindo a demanda e qual escopo será tratado.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <FieldLabel>
                    Data de emissão
                    <Input type="date" leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />} />
                  </FieldLabel>
                  <FieldLabel>
                    Nome do solicitante
                    <Input placeholder="Nome completo" leftIcon={<UserRound className="h-4 w-4" aria-hidden />} />
                  </FieldLabel>
                  <FieldLabel>
                    Nome do escopo
                    <Input placeholder="Ex.: Contratação de manutenção" leftIcon={<FolderKanban className="h-4 w-4" aria-hidden />} />
                  </FieldLabel>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Classificação e contexto</CardTitle>
                  <CardDescription>Área responsável, localização e contexto organizacional.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <FieldLabel>
                    Área processo
                    <Select aria-label="Área processo" defaultValue="tecnologia">
                      <option value="tecnologia">Tecnologia</option>
                      <option value="operacoes">Operações</option>
                    </Select>
                  </FieldLabel>
                  <FieldLabel>
                    Subprocesso
                    <Select aria-label="Subprocesso" defaultValue="suporte">
                      <option value="suporte">Suporte</option>
                      <option value="infra">Infraestrutura</option>
                    </Select>
                  </FieldLabel>
                  <FieldLabel>
                    Local de execução
                    <Input placeholder="Ex.: Terminal 1" leftIcon={<MapPin className="h-4 w-4" aria-hidden />} />
                  </FieldLabel>
                  <FieldLabel>
                    Sublocal
                    <Input placeholder="Ex.: Casa de força" leftIcon={<MapPin className="h-4 w-4" aria-hidden />} />
                  </FieldLabel>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dados complementares</CardTitle>
                  <CardDescription>Informações auxiliares para triagem e Suprimentos.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <FieldLabel>
                      Centro de custo
                      <Input placeholder="CC 3010" leftIcon={<BadgeDollarSign className="h-4 w-4" aria-hidden />} />
                    </FieldLabel>
                    <FieldLabel>
                      Contato rápido
                      <Input placeholder="(11) 99999-9999" leftIcon={<Phone className="h-4 w-4" aria-hidden />} />
                    </FieldLabel>
                    <FieldLabel>
                      Categoria
                      <Select aria-label="Categoria" defaultValue="servico">
                        <option value="servico">Serviço</option>
                        <option value="material">Material</option>
                      </Select>
                    </FieldLabel>
                  </div>
                  <FieldLabel>
                    Observação
                    <Textarea placeholder="Detalhe contexto, premissas, restrições e informações úteis para análise..." />
                  </FieldLabel>
                </CardContent>
              </Card>
            </div>

            <aside className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Navegação rápida</CardTitle>
                  <CardDescription>Links internos para acelerar revisão.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    ['1', 'Cabeçalho da solicitação', 'Solicitante, título e data'],
                    ['2', 'Classificação e contexto', 'Área, subprocesso e local'],
                    ['3', 'Dados complementares', 'Financeiro, contato e observação'],
                  ].map(([index, title, helper]) => (
                    <button
                      key={title}
                      type="button"
                      className="w-full rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-3 text-left transition-colors hover:bg-white"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent-strong)] text-xs font-semibold text-white">
                          {index}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[var(--color-fg)]">{title}</p>
                          <p className="mt-1 text-xs text-[var(--color-fg-muted)]">{helper}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Checklist de envio</CardTitle>
                  <CardDescription>O que ainda bloqueia o fluxo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-[22px] border border-[var(--color-fips-orange-100)] bg-[var(--color-fips-orange-100)]/55 px-4 py-3 text-sm text-[var(--color-accent-strong)]">
                    Confirmar centro de custo antes de enviar para aprovação.
                  </div>
                  <div className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-fg-muted)]">
                    Revisar observação final e anexos.
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Saúde do formulário</CardTitle>
                  <CardDescription>Status operacional do workspace.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Cadeia de aprovação</p>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-[var(--color-fg)]">Fluxo calculado</p>
                      <Badge variant="success" dot>
                        Pronto
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-[var(--color-fg-muted)]">Aprovador da área identificado com base no valor informado.</p>
                  </div>
                  <div className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">Salvamento</p>
                    <p className="mt-2 text-sm font-semibold text-[var(--color-fg)]">Rascunho salvo há 2 min</p>
                    <p className="mt-1 text-xs text-[var(--color-fg-muted)]">Última atualização automática às 18:43.</p>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>

          <Card>
            <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--color-fg)]">Ações do workspace</p>
                <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                  Rodapé persistente para ações principais e secundárias do formulário.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary">Salvar rascunho</Button>
                <Button variant="outline">Gerar prévia</Button>
                <Button variant="accent">Enviar para aprovação</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DemoSection>

      <PatternGuidelines
        rules={[
          'Use um card-resumo no topo com métricas curtas e progresso visível.',
          'Separe o conteúdo principal em seções com título + descrição.',
          'Mantenha um painel lateral para navegação, checklist e saúde do formulário.',
          'As ações principais devem morar em rodapé ou barra persistente clara.',
        ]}
        required={[
          'Grid principal com formulário à esquerda e contexto à direita em telas largas.',
          'Campos agrupados por semântica, não apenas por largura visual.',
          'Checklist e status operacionais em cards independentes do formulário.',
          'Resumo inicial deve explicar o fluxo antes do usuário entrar nos campos.',
        ]}
        optional={[
          'Mini cards de métricas no topo.',
          'Barra de progresso com gradiente institucional.',
          'Botões rápidos de seção no painel lateral.',
        ]}
        avoid={[
          'Formulários inteiros sem divisão por seções.',
          'Misturar checklist dentro do corpo dos campos.',
          'Ocultar ações primárias apenas no topo da página.',
        ]}
      />
    </DocPage>
  )
}
