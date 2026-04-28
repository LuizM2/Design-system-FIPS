import { useState, type ReactNode } from 'react'

/* ═══════════════════════════════════════════
   CodeExport — Botão de copiar código + painel colapsável
   Padrão DS-FIPS para todas as DocPages
   ═══════════════════════════════════════════ */

function BracesIcon({ size = 20, color = '#93BDE4' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        d="M7 3C5 3 4 4.5 4 6v2c0 1-1 2-2 2 1 0 2 1 2 2v2c0 1.5 1 3 3 3M13 3c2 0 3 1.5 3 3v2c0 1 1 2 2 2-1 0-2 1-2 2v2c0 1.5-1 3-3 3"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ── Shared button (same pattern as playground Btn) ── */
function ExportBtn({
  label,
  color,
  onClick,
}: {
  label: string
  color: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        padding: '8px 20px',
        fontSize: 12,
        fontWeight: 600,
        background: color,
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        fontFamily: "'Open Sans', sans-serif",
        transition: 'all .15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '.85'
        e.currentTarget.style.boxShadow = `0 2px 8px ${color}40`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {label}
    </button>
  )
}

/* ── Main export ── */

export interface CodeExportItem {
  label: string
  description: string
  code: string
  preview?: ReactNode
}

export function CodeExportSection({ items }: { items: CodeExportItem[] }) {
  return (
    <section style={{ marginBottom: 44 }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--color-gov-azul-claro)',
          fontFamily: "'Saira Expanded', sans-serif",
          marginBottom: 6,
        }}
      >
        EXPORTAR
      </div>
      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: 'var(--color-fg)',
          margin: '0 0 4px',
          fontFamily: "'Saira Expanded', sans-serif",
          letterSpacing: '0.5px',
        }}
      >
        Exportar Código
      </h2>
      <p
        style={{
          fontSize: 14,
          color: 'var(--color-fg-muted)',
          margin: '0 0 20px',
          lineHeight: 1.55,
          fontFamily: "'Open Sans', sans-serif",
        }}
      >
        Código copy-paste ready de cada componente. Inclui tokens, ícones, helpers e exemplo de uso. Cole direto no
        seu projeto.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map((item) => (
          <CodeExportCard key={item.label} {...item} />
        ))}
      </div>
    </section>
  )
}

function CodeExportCard({ label, description, code, preview }: CodeExportItem) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)

  const doCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      style={{
        borderRadius: '10px 10px 10px 18px',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        background: 'var(--color-surface)',
        transition: 'all .2s',
      }}
    >
      {/* Header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: '#004B9B12',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid #004B9B25',
          }}
        >
          <BracesIcon />
        </div>
        <div style={{ flex: 1, minWidth: 150 }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--color-fg)',
              fontFamily: "'Saira Expanded', sans-serif",
              display: 'block',
            }}
          >
            {label}
          </span>
          <span style={{ fontSize: 11, color: 'var(--color-fg-muted)', lineHeight: 1.4 }}>{description}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <ExportBtn
            label={expanded ? '{ } Ocultar' : '{ } Ver código'}
            color="#546E7A"
            onClick={() => setExpanded((e) => !e)}
          />
          <ExportBtn
            label={copied ? '✓ Copiado!' : '📋 Copiar código'}
            color={copied ? '#00C64C' : '#004B9B'}
            onClick={doCopy}
          />
        </div>
      </div>

      {/* Expandable code panel */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--color-border)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 20px',
              background: 'var(--color-surface-muted)',
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'var(--color-fg-muted)',
                fontFamily: "'Saira Expanded', sans-serif",
              }}
            >
              {code.split('\n').length} linhas · TSX · Copy-paste ready
            </span>
            <ExportBtn
              label={copied ? '✓ Copiado' : '📋 Copiar'}
              color={copied ? '#00C64C' : '#004B9B'}
              onClick={doCopy}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {/* Code panel */}
            <pre
              style={{
                margin: 0,
                padding: '18px 20px',
                background: '#0F172A',
                color: '#E2E8F0',
                fontFamily: "'Fira Code', monospace",
                fontSize: 11.5,
                lineHeight: 1.7,
                overflowX: 'auto',
                maxHeight: 420,
                overflowY: 'auto',
                whiteSpace: 'pre',
                tabSize: 2,
                flex: preview ? '1 1 400px' : '1 1 100%',
                minWidth: 0,
              }}
            >
              <code>{code}</code>
            </pre>

            {/* Preview panel */}
            {preview && (
              <div
                style={{
                  flex: '1 1 400px',
                  minWidth: 0,
                  maxHeight: 420,
                  overflowY: 'auto',
                  borderLeft: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--color-surface-muted)',
                }}
              >
                {!previewVisible ? (
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 14,
                      padding: 24,
                      margin: 16,
                      borderRadius: 10,
                      border: '2px dashed var(--color-border)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: 'var(--color-fg-muted)',
                        fontFamily: "'Open Sans', sans-serif",
                        textAlign: 'center',
                      }}
                    >
                      Clique em Rodar para visualizar o componente
                    </span>
                    <ExportBtn label="▶ Rodar" color="#00904C" onClick={() => setPreviewVisible(true)} />
                  </div>
                ) : (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 16px',
                        borderBottom: '1px solid var(--color-border)',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          color: 'var(--color-fg-muted)',
                          fontFamily: "'Saira Expanded', sans-serif",
                        }}
                      >
                        Preview
                      </span>
                      <ExportBtn label="✕ Limpar" color="#546E7A" onClick={() => setPreviewVisible(false)} />
                    </div>
                    <div style={{ padding: 16, flex: 1, overflow: 'auto' }}>{preview}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════
   InlineCodeCopy — Botão compacto que fica ao lado/abaixo de cada variante
   Uso: <InlineCodeCopy label="Tabs Underline" code={CODE_STRING} />
   ═══════════════════════════════════════════ */

export function InlineCodeCopy({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const doCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <ExportBtn
          label={expanded ? '{ } Ocultar' : `{ } ${label}`}
          color="#546E7A"
          onClick={() => setExpanded((e) => !e)}
        />
        <ExportBtn
          label={copied ? '✓ Copiado!' : '📋 Copiar'}
          color={copied ? '#00C64C' : '#004B9B'}
          onClick={doCopy}
        />
      </div>
      {expanded && (
        <pre
          style={{
            margin: '10px 0 0',
            padding: '14px 16px',
            background: '#0F172A',
            color: '#E2E8F0',
            fontFamily: "'Fira Code', monospace",
            fontSize: 11,
            lineHeight: 1.6,
            overflowX: 'auto',
            maxHeight: 350,
            overflowY: 'auto',
            whiteSpace: 'pre',
            tabSize: 2,
            borderRadius: '8px 8px 8px 14px',
            border: '1px solid rgba(147,189,228,0.15)',
          }}
        >
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
