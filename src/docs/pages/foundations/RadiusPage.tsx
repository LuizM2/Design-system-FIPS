import { DocPage, DemoSection } from '../../components/DocPage'

const radii = [
  { name: 'sm — 4px', className: 'rounded-sm' },
  { name: 'md — 6px', className: 'rounded-md' },
  { name: 'lg — 8px', className: 'rounded-lg' },
  { name: 'xl — 12px', className: 'rounded-xl' },
  { name: '2xl — 16px', className: 'rounded-2xl' },
]

export default function RadiusPage() {
  return (
    <DocPage
      title="Raios de borda"
      description="Escala alinhada ao padrão Tailwind usado como referência no CONTPIX. Campos e botões compactos usam `xl`; cards e painéis usam `2xl`."
    >
      <DemoSection
        title="Amostras"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {radii.map((r) => (
            <div
              key={r.name}
              className={`flex h-28 items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-sm font-medium ${r.className}`}
            >
              {r.name}
            </div>
          ))}
        </div>
      </DemoSection>
    </DocPage>
  )
}
