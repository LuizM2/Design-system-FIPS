import { DocPage, DemoSection } from '../../components/DocPage'
import { spacingScale } from '../../../tokens/spacing'

export default function SpacingPage() {
  return (
    <DocPage
      title="Espaçamento"
      description="Escala baseada em múltiplos de 4px (0,25rem). Use consistentemente entre componentes e layouts para ritmo vertical e horizontal uniforme."
    >
      <DemoSection
        title="Escala (Tailwind: espaço = n × 4px)"
      >
        <div className="space-y-3">
          {spacingScale.map((n) => (
            <div key={n} className="flex items-center gap-4">
              <span className="w-10 text-right font-mono text-xs text-[var(--color-fg-muted)]">
                {n}
              </span>
              <div
                className="h-3 rounded bg-[var(--color-primary)]/80"
                style={{ width: `${n * 4}px` }}
              />
              <span className="text-xs text-[var(--color-fg-muted)]">{n * 4}px</span>
            </div>
          ))}
        </div>
      </DemoSection>
    </DocPage>
  )
}
