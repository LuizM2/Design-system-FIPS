import type { ReactNode } from 'react'
import { CodeReference } from './CodeReference'

type DocPageProps = {
  title: string
  description?: string
  children: ReactNode
}

export function DocPage({ title, description, children }: DocPageProps) {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-8 lg:px-10 lg:py-10">
      <header className="space-y-3 border-b border-[var(--color-border)] pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
          Design System FIPS
        </p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-[var(--color-fg)] md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-3xl text-base leading-relaxed text-[var(--color-fg-muted)]">
            {description}
          </p>
        ) : null}
      </header>
      <div className="space-y-10">{children}</div>
    </div>
  )
}

type DemoSectionProps = {
  title: string
  children: ReactNode
  className?: string
  /** Texto copiável (tokens, código, classes Tailwind, etc.) */
  reference?: string
  referenceLabel?: string
}

export function DemoSection({
  title,
  children,
  className,
  reference,
  referenceLabel,
}: DemoSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xs font-semibold tracking-wider text-[var(--color-fg-muted)] uppercase">
        {title}
      </h2>
      <div
        className={`rounded-[30px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] ${className ?? ''}`}
      >
        {children}
      </div>
      {reference ? (
        <CodeReference label={referenceLabel} code={reference} />
      ) : null}
    </section>
  )
}
