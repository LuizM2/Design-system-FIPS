import { useMemo, useState } from 'react'

type PreviewOption = {
  id: string
  label: string
  path: string
  notes: string
}

const OPTIONS: PreviewOption[] = [
  {
    id: 'claude-login',
    label: 'Login Padrão Docs (/docs/login)',
    path: '/docs/login',
    notes: 'Versão atual do projeto com todas as alterações aplicadas no fluxo principal.',
  },
  {
    id: 'login-desktop-test',
    label: 'Login Desktop Avulso (/login-desktop-test)',
    path: '/login-desktop-test',
    notes: 'Preview isolado do código que você enviou para validar visual e comportamento.',
  },
]

function px(v: number) {
  return `${Math.round(v)}px`
}

export default function LoginClaudeLab() {
  const [selectedId, setSelectedId] = useState(OPTIONS[1].id)
  const [viewportWidth, setViewportWidth] = useState(1366)
  const [refreshKey, setRefreshKey] = useState(0)

  const selected = useMemo(() => OPTIONS.find((o) => o.id === selectedId) ?? OPTIONS[0], [selectedId])

  return (
    <div style={{ minHeight: '100vh', background: '#0B1220', color: '#E2E8F0', fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 20 }}>
        <header style={{ marginBottom: 16 }}>
          <h1 style={{ margin: 0, fontSize: 22, fontFamily: "'Saira Expanded', sans-serif", color: '#F8FAFC' }}>
            Artefato Interativo — Login Claude
          </h1>
          <p style={{ margin: '8px 0 0', fontSize: 13, color: '#94A3B8', maxWidth: 980 }}>
            Ambiente avulso para você comparar o login padrão com o login de teste que o Claude gerou hoje.
          </p>
        </header>

        <section
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            alignItems: 'center',
            padding: 12,
            border: '1px solid #243145',
            borderRadius: 12,
            background: '#111A2B',
            marginBottom: 14,
          }}
        >
          <label style={{ fontSize: 12, color: '#A5B4CC', fontWeight: 600 }}>Variante:</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            style={{
              border: '1px solid #334155',
              background: '#0F172A',
              color: '#E2E8F0',
              borderRadius: 8,
              height: 34,
              padding: '0 10px',
              minWidth: 280,
            }}
          >
            {OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>

          <label style={{ fontSize: 12, color: '#A5B4CC', fontWeight: 600, marginLeft: 6 }}>Viewport:</label>
          <input
            type="range"
            min={320}
            max={1600}
            step={1}
            value={viewportWidth}
            onChange={(e) => setViewportWidth(Number(e.target.value))}
            style={{ width: 220 }}
          />
          <code style={{ fontSize: 12, color: '#FCD34D', background: '#1E293B', borderRadius: 6, padding: '3px 8px' }}>
            {px(viewportWidth)}
          </code>

          <button
            type="button"
            onClick={() => setViewportWidth(1366)}
            style={{
              border: '1px solid #334155',
              background: '#0F172A',
              color: '#E2E8F0',
              borderRadius: 8,
              height: 34,
              padding: '0 10px',
              cursor: 'pointer',
            }}
          >
            Reset viewport
          </button>

          <button
            type="button"
            onClick={() => setRefreshKey((k) => k + 1)}
            style={{
              border: '1px solid #14532D',
              background: '#052E16',
              color: '#86EFAC',
              borderRadius: 8,
              height: 34,
              padding: '0 10px',
              cursor: 'pointer',
            }}
          >
            Recarregar preview
          </button>
        </section>

        <div style={{ fontSize: 12, color: '#93C5FD', marginBottom: 10 }}>
          <strong>Rota:</strong> <code>{selected.path}</code> — {selected.notes}
        </div>

        <section
          style={{
            border: '1px solid #334155',
            borderRadius: 14,
            overflow: 'hidden',
            background: '#0F172A',
          }}
        >
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #243145', fontSize: 11, color: '#94A3B8' }}>
            Preview interno (iframe)
          </div>
          <div style={{ padding: 14, overflowX: 'auto' }}>
            <div
              style={{
                width: viewportWidth,
                minHeight: 720,
                border: '1px solid #334155',
                borderRadius: 10,
                overflow: 'hidden',
                background: '#020617',
              }}
            >
              <iframe
                key={`${selected.path}:${refreshKey}`}
                src={selected.path}
                title="Preview Login Claude"
                style={{ display: 'block', width: '100%', height: 760, border: 'none', background: '#020617' }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
