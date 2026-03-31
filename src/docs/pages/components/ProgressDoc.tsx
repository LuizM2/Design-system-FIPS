import { DemoSection, DocPage } from '../../components/DocPage'
import { Progress } from '../../../components/ui/progress'

const progressPageSource = `import { Progress } from 'ds-fips'

export function DeliveryProgress() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-[var(--color-fg)]">Progresso</span>
        <span className="text-[var(--color-fg-muted)]">68%</span>
      </div>
      <Progress value={68} />
    </div>
  )
}`

export default function ProgressDoc() {
  return (
    <DocPage
      title="Progress"
      description="Barra de progresso para workflows, checklists e indicadores de preenchimento. Mantém hierarquia visual leve, com trilho suave e preenchimento institucional."
      pageSource={progressPageSource}
      pageDownloadName="ProgressExample.tsx"
    >
      <DemoSection
        title="Estados"
        reference={`import { Progress } from 'ds-fips'

<Progress value={22} />
<Progress value={68} />
<Progress value={100} />`}
        referenceLabel="Progress"
      >
        <div className="grid max-w-2xl gap-5">
          {[
            ['Preparação', 22, 'Campos essenciais ainda pendentes.'],
            ['Conferência', 68, 'Maior parte do fluxo já preenchida.'],
            ['Finalizado', 100, 'Entregável pronto para revisão final.'],
          ].map(([label, value, helper]) => (
            <div key={label} className="space-y-2.5">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-[var(--color-fg)]">{label}</span>
                <span className="text-[var(--color-fg-muted)]">{value}%</span>
              </div>
              <Progress value={Number(value)} />
              <p className="text-sm text-[var(--color-fg-muted)]">{helper}</p>
            </div>
          ))}
        </div>
      </DemoSection>
    </DocPage>
  )
}
