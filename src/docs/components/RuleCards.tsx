import type { ReactNode } from 'react'

export type RuleCard = {
  icon: ReactNode
  color: string
  bg: string
  tag: string
  title: string
  desc: string
}

const C = {
  cardBg: 'var(--color-surface)',
  cardBorder: 'var(--color-border)',
  azulEscuro: 'var(--color-fg)',
  cinzaChumbo: 'var(--color-fg-muted)',
}

const Fn = {
  title: "'Saira Expanded', sans-serif",
  body: "'Open Sans', sans-serif",
}

export function RuleCards({ cards, mob = false }: { cards: RuleCard[]; mob?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : `repeat(${Math.min(cards.length, 3)}, 1fr)`, gap: 16 }}>
      {cards.map((p, i) => (
        <div
          key={i}
          style={{
            background: C.cardBg,
            borderRadius: '10px 10px 10px 18px',
            border: `1px solid ${C.cardBorder}`,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,75,155,.05)',
          }}
        >
          <div style={{ background: p.bg, padding: mob ? '16px 16px 14px' : '20px 22px 16px', borderBottom: `1px solid ${C.cardBorder}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: C.cardBg, border: `1px solid ${C.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,75,155,.06)' }}>
                {p.icon}
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', fontFamily: Fn.title, color: p.color, background: C.cardBg, padding: '3px 8px', borderRadius: 4, border: `1px solid ${p.color}20` }}>
                {p.tag}
              </span>
            </div>
            <h3 style={{ fontSize: mob ? 14 : 16, fontWeight: 700, color: C.azulEscuro, margin: 0, fontFamily: Fn.title, lineHeight: 1.3 }}>{p.title}</h3>
          </div>
          <div style={{ padding: mob ? '14px 16px' : '16px 22px 20px' }}>
            <p style={{ fontSize: 13, color: C.cinzaChumbo, lineHeight: 1.6, margin: 0, fontFamily: Fn.body }}>{p.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
