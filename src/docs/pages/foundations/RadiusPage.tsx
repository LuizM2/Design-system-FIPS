import { DocPage, DemoSection } from '../../components/DocPage'

const radii = [
  { name: 'sm — 6px', className: 'rounded-sm' },
  { name: 'md — 8px', className: 'rounded-md' },
  { name: 'lg — 12px', className: 'rounded-lg' },
  { name: 'xl — 16px', className: 'rounded-xl' },
  { name: '2xl — 20px', className: 'rounded-2xl' },
]

export default function RadiusPage() {
  return (
    <DocPage
      title="Raios de borda"
      description="Cantos arredondados moderados para cards, campos e painéis. Modais e superfícies elevadas tendem a usar raios maiores (xl/2xl)."
    >
      <DemoSection
        title="Amostras"
        reference={`rounded-sm   /* 6px  — @theme --radius-sm */
rounded-md   /* 8px */
rounded-lg   /* 12px — botões, inputs */
rounded-xl   /* 16px — cards */
rounded-2xl  /* 20px — modais */`}
        referenceLabel="Raios (Tailwind v4 / @theme)"
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
