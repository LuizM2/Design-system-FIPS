import { Check, Copy, Download } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { Button } from '../../components/ui/button'
import { CodeReference } from './CodeReference'

type DocPageProps = {
  title: string
  description?: string
  children: ReactNode
  pageSource?: string
  pageDownloadName?: string
}

export function DocPage({
  title,
  description,
  children,
  pageSource,
  pageDownloadName = 'page-example.tsx',
}: DocPageProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopyPage() {
    if (!pageSource) return

    try {
      await navigator.clipboard.writeText(pageSource)
      setCopied(true)
      toast.success('Código da página copiado')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Não foi possível copiar o código da página')
    }
  }

  function handleDownloadPage() {
    if (!pageSource) return

    const blob = new Blob([pageSource], { type: 'text/plain;charset=utf-8' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = href
    link.download = pageDownloadName
    link.click()
    URL.revokeObjectURL(href)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-8 lg:px-10 lg:py-10">
      <header className="space-y-5 border-b border-[var(--color-border)] pb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
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
          </div>

          {pageSource ? (
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <Button type="button" size="sm" variant="secondary" onClick={handleCopyPage}>
                {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                {copied ? 'Copiado' : 'Copiar página'}
              </Button>
              <Button type="button" size="sm" onClick={handleDownloadPage}>
                <Download className="h-4 w-4" aria-hidden />
                Baixar código
              </Button>
            </div>
          ) : null}
        </div>

        {pageSource ? (
          <div className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-fg-muted)]">
            Esta página oferece o exemplo completo para download, além dos blocos de referência individuais logo abaixo.
          </div>
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
