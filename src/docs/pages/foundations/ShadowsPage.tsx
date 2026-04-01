import { DocPage, DemoSection } from '../../components/DocPage'

export default function ShadowsPage() {
  return (
    <DocPage
      title="Sombras"
      description="Sombras discretas para hierarquia sem poluir o layout administrativo. Tokens definidos no tema Tailwind v4."
    >
      <DemoSection
        title="Tokens"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
            <p className="font-medium">shadow-card</p>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
              Cards, tabelas e blocos de conteúdo.
            </p>
          </div>
          <div className="rounded-xl bg-[var(--color-surface)] p-6 shadow-[var(--shadow-elevated)]">
            <p className="font-medium">shadow-elevated</p>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
              Modais, drawers e elementos flutuantes.
            </p>
          </div>
        </div>
      </DemoSection>
    </DocPage>
  )
}
