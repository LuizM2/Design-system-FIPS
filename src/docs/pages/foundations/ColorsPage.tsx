import { DocPage, DemoSection } from '../../components/DocPage'
import { fipsPalette, semanticColors } from '../../../tokens/colors'

const swatches = Object.entries(fipsPalette) as [keyof typeof fipsPalette, string][]

const semantic = Object.entries(semanticColors) as [keyof typeof semanticColors, string][]

const paletteJson = JSON.stringify(fipsPalette, null, 2)
const semanticJson = JSON.stringify(semanticColors, null, 2)

export default function ColorsPage() {
  return (
    <DocPage
      title="Cores"
      description="Paleta oficial extraída do Brandbook FIPS: azul profundo, cinza chumbo, secundárias (céu, ouro, floresta) e neutros. Ajuste sempre com a equipe de marca antes de alterar valores."
    >
      <DemoSection
        title="Paleta principal"
        reference={paletteJson}
        referenceLabel="JSON — fipsPalette (TypeScript)"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {swatches.map(([name, hex]) => (
            <div
              key={name}
              className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <div className="h-24 w-full" style={{ backgroundColor: hex }} />
              <div className="space-y-1 p-3">
                <p className="text-sm font-semibold capitalize">
                  {name.replace(/([a-z])([A-Z])/g, '$1 $2')}
                </p>
                <p className="font-mono text-xs text-[var(--color-fg-muted)] uppercase">{hex}</p>
              </div>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoSection
        title="Tokens semânticos (UI)"
        reference={`${semanticJson}

/* Variáveis globais (globals.css :root) */
--color-primary: ${semanticColors.primary};
--color-primary-hover: ${semanticColors.primaryHover};
--color-secondary: ${semanticColors.secondary};
--color-accent: ${semanticColors.accent};
--color-accent-strong: ${semanticColors.accentStrong};
--color-success: ${semanticColors.success};
--color-fg: ${semanticColors.foreground};
--color-border: ${semanticColors.border};`}
        referenceLabel="JSON + trecho CSS"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {semantic.map(([name, hex]) => (
            <div
              key={name}
              className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] p-3"
            >
              <div
                className="h-10 w-10 shrink-0 rounded-md border border-black/5 shadow-inner"
                style={{ backgroundColor: hex }}
              />
              <div>
                <p className="text-sm font-medium capitalize">
                  {String(name).replace(/([a-z])([A-Z])/g, '$1 $2')}
                </p>
                <p className="font-mono text-xs text-[var(--color-fg-muted)]">{hex}</p>
              </div>
            </div>
          ))}
        </div>
      </DemoSection>
    </DocPage>
  )
}
