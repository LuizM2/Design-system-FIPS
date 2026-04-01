import { AlertTriangle, CheckCircle2, Scale, ShieldCheck } from 'lucide-react'
import { DocPage, DemoSection } from '../components/DocPage'
import { PatternGuidelines } from '../components/PatternGuidelines'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'

const pillars = [
  {
    title: 'Componentes antes de padrões',
    description: 'Toda tela montada deve nascer das APIs públicas do design system. Padrão não pode reinventar componente.',
    icon: ShieldCheck,
  },
  {
    title: 'Override visual proibido',
    description: 'Borda, raio, sombra, altura, padding, tipografia e cor não são redefinidos na ponta por className.',
    icon: AlertTriangle,
  },
  {
    title: 'Evolução oficial',
    description: 'Quando um contexto novo surgir, ele vira variante ou composição oficial antes de ser usado em outros projetos.',
    icon: Scale,
  },
]

export default function GovernancePage() {
  return (
    <DocPage
      title="Governança"
      description="Regra central de uso do DS-FIPS para times internos, parceiros e projetos futuros. A coerência visual não é opcional: padrões e telas devem ser montados com as composições oficiais do sistema."
    >
      <DemoSection title="Princípios obrigatórios">
        <div className="grid gap-4 lg:grid-cols-3">
          {pillars.map((item) => {
            const Icon = item.icon

            return (
              <Card key={item.title}>
                <CardHeader>
                  <Icon className="mb-2 h-8 w-8 text-[var(--color-primary)]" aria-hidden />
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </DemoSection>

      <PatternGuidelines
        rules={[
          'Monte formulários com `Field + Input/Select/Textarea`.',
          'Use `density="compact"` para modal, filtro e contexto de alta densidade.',
          'Se um padrão exigir visual novo, evolua o componente base antes de replicar a tela.',
          'Permita `className` apenas para layout externo: grid, largura, margem, flex e posicionamento.',
        ]}
        required={[
          'Todo projeto da empresa deve partir dos componentes públicos do DS-FIPS.',
          'Padrões documentados devem provar consistência do sistema, não criar exceções visuais.',
          'Modal de filtros, drawer de filtros e formulários compactos devem reutilizar exatamente a mesma composição oficial.',
          'A revisão de PR precisa tratar override visual em primitivas como regressão de design system.',
        ]}
        avoid={[
          'Recriar borda, raio, sombra ou altura de componente por `className` na ponta.',
          'Ter “versões especiais” de input, select, textarea, button ou tabs vivendo só dentro de uma tela.',
          'Usar documentação como vitrine bonita sem garantir reutilização real nos projetos.',
        ]}
      />

      <DemoSection title="Aplicação prática">
        <Card className="border-[var(--color-fips-green-100)] bg-[linear-gradient(135deg,rgba(0,198,76,0.08),rgba(255,255,255,1))]">
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--color-success)]" aria-hidden />
              <div className="space-y-2 text-sm text-[var(--color-fg-muted)]">
                <p className="font-semibold text-[var(--color-fg)]">
                  Regra de ouro para todos os projetos
                </p>
                <p>
                  Quando houver diferença entre a tela montada e o componente base, o problema deve ser resolvido no design system. O projeto consumidor não pode compensar a divergência com styling local.
                </p>
                <p>
                  Esta documentação existe para validação visual de gestores, devs e diretoria, mas também funciona como norma técnica de reutilização para todos os produtos da empresa.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </DemoSection>
    </DocPage>
  )
}
