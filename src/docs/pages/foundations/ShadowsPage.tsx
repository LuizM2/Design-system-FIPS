import { DocPage, DemoSection } from '../../components/DocPage'

export default function ShadowsPage() {
  return (
    <DocPage
      title="Sombras"
      description="Sombras discretas para hierarquia sem poluir o layout administrativo. Tokens definidos no tema Tailwind v4."
    >
      <DemoSection
        title="Tokens"
        reference={`/* globals.css @theme */
--shadow-card: 0 2px 10px rgb(0 0 0 / 0.06);
--shadow-elevated: 0 10px 40px rgb(0 75 155 / 0.12);

/* Uso */
class="shadow-[var(--shadow-card)]"
class="shadow-[var(--shadow-elevated)]"`}
        referenceLabel="Sombras (CSS)"
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
