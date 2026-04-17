import { useState, useEffect, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'
import { fipsPalette, semanticColors } from '../../../tokens/colors'

const C = { azulProfundo: 'var(--color-gov-azul-profundo)', azulEscuro: 'var(--color-gov-azul-escuro)', azulCeuClaro: '#D3E3F4', amareloOuro: '#FDC24E', cinzaChumbo: 'var(--color-fg-muted)', cinzaEscuro: 'var(--color-fg)', branco: '#FFFFFF', bg: 'var(--color-surface-muted)', cardBg: 'var(--color-surface)', cardBorder: 'var(--color-border)', textLight: 'var(--color-fg-muted)' }
const Fn = { title: "'Saira Expanded', sans-serif", body: "'Open Sans', sans-serif" }

function JunctionLines({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 320 200" fill="none" style={{ opacity: 0.12, ...style }}>
      <path d="M0 60H100C120 60 120 60 140 40L200 40H320" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      <path d="M0 60H100C120 60 120 60 140 80L200 80H320" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      <path d="M0 120H60C80 120 80 120 100 100L160 100H320" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      <path d="M0 120H60C80 120 80 120 100 140L160 140H320" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

const Ic = {
  grid: (s = 14, c = C.amareloOuro) => <svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4" /><rect x="11" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4" /><rect x="2" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4" /><rect x="11" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4" /></svg>,
}

function Section({ n, title, desc, children }: { n: string; title: string; desc: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 44 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-gov-azul-claro)', fontFamily: Fn.title, marginBottom: 6 }}>{n}</div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: C.cinzaEscuro, margin: '0 0 4px', fontFamily: Fn.title, letterSpacing: '0.5px' }}>{title}</h2>
      <p style={{ fontSize: 14, color: C.cinzaChumbo, margin: '0 0 20px', lineHeight: 1.55, fontFamily: Fn.body }}>{desc}</p>
      {children}
    </section>
  )
}

function CopyHex({ hex }: { hex: string }) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(() => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [hex])
  return (
    <button
      onClick={copy}
      title={copied ? 'Copiado!' : `Copiar ${hex}`}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 24, height: 24, borderRadius: 6, border: 'none',
        background: copied ? '#00C64C18' : 'transparent',
        cursor: 'pointer', padding: 0, flexShrink: 0,
        transition: 'all 0.15s ease',
      }}
    >
      {copied
        ? <Check size={13} color="#00C64C" strokeWidth={2.5} />
        : <Copy size={13} color="#7B8C96" strokeWidth={1.8} />
      }
    </button>
  )
}

const swatches = Object.entries(fipsPalette) as [string, string][]
const semantic = Object.entries(semanticColors) as [string, string][]

export default function ColorsPage() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h) }, [])
  const mob = w < 640

  return (
    <div style={{ minHeight: '100vh', background: "var(--color-surface-muted)", fontFamily: Fn.body, color: C.cinzaEscuro }}>

      <header style={{ background: `linear-gradient(135deg, var(--color-gov-gradient-from) 0%, var(--color-gov-gradient-to) 100%)`, padding: mob ? '32px 20px' : '48px 40px 44px', position: 'relative', overflow: 'hidden' }}>
        <JunctionLines style={{ position: 'absolute', top: -10, right: -20, width: mob ? 250 : 400, height: 250 }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${C.branco}10`, border: `1px solid ${C.branco}18`, borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.amareloOuro, fontFamily: Fn.title, marginBottom: 16 }}>{Ic.grid(14, C.amareloOuro)} Design System FIPS</div>
          <h1 style={{ fontSize: mob ? 30 : 44, fontWeight: 700, color: C.branco, margin: '0 0 10px', fontFamily: Fn.title }}>Cores</h1>
          <p style={{ fontSize: 16, color: `${C.branco}B0`, lineHeight: 1.6, maxWidth: 700, margin: 0, fontFamily: Fn.body }}>Paleta oficial extraída do Brandbook FIPS: azul profundo, cinza chumbo, secundárias (céu, ouro, floresta) e neutros. Ajuste sempre com a equipe de marca antes de alterar valores.</p>
        </div>
      </header>

      <div style={{ padding: mob ? '24px 16px 40px' : '36px 40px 60px', maxWidth: 1100, margin: '0 auto' }}>

        <Section n="01" title="Paleta principal" desc="Cores primárias e secundárias do Brandbook FIPS.">
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
            {swatches.map(([name, hex]) => (
              <div key={name} style={{ background: C.cardBg, borderRadius: '10px 10px 10px 18px', border: `1px solid ${C.cardBorder}`, overflow: 'hidden' }}>
                <div style={{ height: 96, width: '100%', background: hex }} />
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: C.cinzaEscuro, margin: '0 0 4px', fontFamily: Fn.title, textTransform: 'capitalize' }}>
                      {name.replace(/([a-z])([A-Z])/g, '$1 $2')}
                    </p>
                    <p style={{ fontSize: 12, fontFamily: "'Fira Code', monospace", color: C.cinzaChumbo, margin: 0, textTransform: 'uppercase' }}>{hex}</p>
                  </div>
                  <CopyHex hex={hex} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section n="02" title="Tokens semânticos (UI)" desc="Cores mapeadas para estados e elementos de interface.">
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 12 }}>
            {semantic.map(([name, hex]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 10, border: `1px solid ${C.cardBorder}`, background: C.cardBg }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: hex, border: '1px solid rgba(0,0,0,0.05)', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: C.cinzaEscuro, margin: '0 0 2px', fontFamily: Fn.title, textTransform: 'capitalize' }}>
                    {String(name).replace(/([a-z])([A-Z])/g, '$1 $2')}
                  </p>
                  <p style={{ fontSize: 11, fontFamily: "'Fira Code', monospace", color: C.cinzaChumbo, margin: 0 }}>{hex}</p>
                </div>
                <CopyHex hex={hex} />
              </div>
            ))}
          </div>
        </Section>

        <div style={{ textAlign: 'center', padding: '20px 0 0', borderTop: `1px solid ${C.cardBorder}`, marginTop: 20 }}>
          <span style={{ fontSize: 12, color: C.cinzaChumbo, letterSpacing: '0.5px', fontFamily: Fn.title, fontWeight: 400 }}>DS-FIPS v0.4.0 · Ferrovia Interna do Porto de Santos · Excelência sobre trilhos · {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  )
}
