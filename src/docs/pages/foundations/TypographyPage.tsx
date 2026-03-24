import { DocPage, DemoSection } from '../../components/DocPage'
import { fontFamilies, typeScale } from '../../../tokens/typography'

export default function TypographyPage() {
  return (
    <DocPage
      title="Tipografia"
      description="Títulos e destaques em Saira Expanded; corpo e textos longos em Open Sans, conforme Brandbook. Mantenha hierarquia clara: título > subtítulo > corpo."
    >
      <DemoSection
        title="Famílias"
        reference={`/* Google Fonts (index.html) */
Saira Expanded — títulos / destaques
Open Sans — corpo / UI

/* CSS */
--font-heading: 'Saira Expanded', 'Open Sans', ui-sans-serif, system-ui, sans-serif;
--font-sans: 'Open Sans', ui-sans-serif, system-ui, sans-serif;

/* Tailwind */
class="font-heading"  /* títulos */
/* corpo: herdado de html/body */`}
        referenceLabel="Fontes + variáveis"
      >
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold tracking-wide text-[var(--color-fg-muted)] uppercase">
              Heading
            </dt>
            <dd className="mt-1 font-mono text-sm">{fontFamilies.heading}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-wide text-[var(--color-fg-muted)] uppercase">
              Corpo
            </dt>
            <dd className="mt-1 font-mono text-sm">{fontFamilies.body}</dd>
          </div>
        </dl>
      </DemoSection>

      <DemoSection
        title="Escala sugerida"
        reference={`display:  ${typeScale.display}
h1:       ${typeScale.h1}
h2:       ${typeScale.h2}
h3:       ${typeScale.h3}
lead:     ${typeScale.lead}
body:     ${typeScale.body}
small:    ${typeScale.small}
caption:  ${typeScale.caption}`}
        referenceLabel="Classes Tailwind da escala (src/tokens/typography.ts)"
      >
        <div className="space-y-6">
          <p className={typeScale.display}>Display — Ferrovia Interna do Porto de Santos</p>
          <p className={typeScale.h1}>Heading 1 — Excelência sobre trilhos</p>
          <p className={typeScale.h2}>Heading 2 — Operação e conectividade</p>
          <p className={typeScale.h3}>Heading 3 — Indicadores e painéis</p>
          <p className={typeScale.lead}>
            Lead — Texto de apoio com ênfase secundária para introduzir seções.
          </p>
          <p className={typeScale.body}>
            Corpo — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Preferencialmente com
            entrelinha confortável para leitura prolongada em interfaces administrativas.
          </p>
          <p className={typeScale.small}>Small — Metadados, labels auxiliares e notas de rodapé.</p>
          <p className={typeScale.caption}>Caption — Timestamps, versões e hints discretos.</p>
        </div>
      </DemoSection>
    </DocPage>
  )
}
