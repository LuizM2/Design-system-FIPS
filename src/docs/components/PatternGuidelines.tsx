import { CheckCircle2, Circle, Sparkles, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

type PatternGuidelinesProps = {
  rules: string[]
  required: string[]
  optional?: string[]
  avoid?: string[]
}

function PatternList({
  title,
  icon: Icon,
  items,
  tone,
}: {
  title: string
  icon: typeof CheckCircle2
  items: string[]
  tone: 'primary' | 'success' | 'danger' | 'muted'
}) {
  const tones = {
    primary: 'text-[var(--color-primary)] bg-[var(--color-fips-blue-200)]/55',
    success: 'text-[var(--color-success-strong)] bg-[var(--color-success)]/12',
    danger: 'text-[var(--color-danger)] bg-[var(--color-badge-danger-bg)]',
    muted: 'text-[var(--color-fg-muted)] bg-[var(--color-surface-muted)]',
  } as const

  return (
    <Card className="h-full">
      <CardHeader>
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tones[tone]}`}>
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-current opacity-70" aria-hidden />
            <span>{item}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function PatternGuidelines({
  rules,
  required,
  optional = [],
  avoid = [],
}: PatternGuidelinesProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-3">
        <PatternList title="Regras de uso" icon={Sparkles} items={rules} tone="primary" />
        <PatternList title="Obrigatório" icon={CheckCircle2} items={required} tone="success" />
        <PatternList
          title="Opcional"
          icon={Circle}
          items={optional.length > 0 ? optional : ['Sem extensões opcionais definidas para este padrão.']}
          tone="muted"
        />
      </div>
      {avoid.length > 0 ? (
        <PatternList title="Evitar" icon={XCircle} items={avoid} tone="danger" />
      ) : null}
    </div>
  )
}
