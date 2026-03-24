import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../../components/ui/button'
import { cn } from '../../lib/cn'

type CodeReferenceProps = {
  /** Rótulo exibido acima do bloco (ex.: Token, JSX, CSS) */
  label?: string
  code: string
  className?: string
}

export function CodeReference({ label = 'Referência para copiar', code, className }: CodeReferenceProps) {
  const [done, setDone] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setDone(true)
      toast.success('Copiado para a área de transferência')
      setTimeout(() => setDone(false), 2000)
    } catch {
      toast.error('Não foi possível copiar')
    }
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-fips-gray-900)] text-[var(--color-surface)]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
        <span className="text-xs font-medium text-white/60">{label}</span>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-8 shrink-0 gap-1.5 text-white hover:bg-white/10"
          onClick={handleCopy}
        >
          {done ? (
            <>
              <Check className="h-3.5 w-3.5" aria-hidden />
              Copiado
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden />
              Copiar
            </>
          )}
        </Button>
      </div>
      <pre className="max-h-72 overflow-x-auto p-3 text-xs leading-relaxed font-mono text-white/90 whitespace-pre">
        {code}
      </pre>
    </div>
  )
}
