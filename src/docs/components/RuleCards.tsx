import { type ReactNode, isValidElement, cloneElement } from 'react'
import { useFipsTheme } from '../../hooks/useFipsTheme'

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

/* ─── Dark mode: remapeia azuis escuros para tons visíveis ─── */
const darkColorMap: Record<string, string> = {
  '#004B9B': '#93BDE4',
  '#004b9b': '#93BDE4',
  '#002A68': '#658EC9',
  '#002a68': '#658EC9',
}

function remapColor(color: string, dark: boolean): string {
  if (!dark) return color
  return darkColorMap[color] ?? color
}

function remapBg(color: string, dark: boolean): string {
  if (!dark) return color
  const mapped = darkColorMap[color.replace(/[0-9a-f]{2}$/i, '')]
  if (mapped) return `${mapped}15`
  return color
}

export function RuleCards({ cards, mob = false }: { cards: RuleCard[]; mob?: boolean }) {
  const { dark } = useFipsTheme()

  return (
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : `repeat(${Math.min(cards.length, 3)}, 1fr)`, gap: 16 }}>
      {cards.map((p, i) => {
        const mappedColor = remapColor(p.color, dark)
        const mappedBg = remapBg(p.bg, dark)

        // Clone icon with remapped color
        const icon = dark && isValidElement<{ color?: string }>(p.icon)
          ? cloneElement(p.icon, { color: mappedColor })
          : p.icon

        return (
          <div
            key={i}
            style={{
              background: C.cardBg,
              borderRadius: '10px 10px 10px 18px',
              border: `1px solid ${C.cardBorder}`,
              overflow: 'hidden',
              boxShadow: dark ? '0 2px 12px rgba(0,0,0,.25)' : '0 2px 8px rgba(0,75,155,.05)',
            }}
          >
            <div style={{ background: mappedBg, padding: mob ? '16px 16px 14px' : '20px 22px 16px', borderBottom: `1px solid ${C.cardBorder}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: dark ? `${mappedColor}12` : C.cardBg,
                  border: `1px solid ${dark ? `${mappedColor}25` : C.cardBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: dark ? `0 0 12px ${mappedColor}10` : '0 2px 6px rgba(0,75,155,.06)',
                }}>
                  {icon}
                </div>
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', fontFamily: Fn.title,
                  color: mappedColor,
                  background: dark ? `${mappedColor}10` : C.cardBg,
                  padding: '3px 8px', borderRadius: 4,
                  border: `1px solid ${mappedColor}${dark ? '30' : '20'}`,
                }}>
                  {p.tag}
                </span>
              </div>
              <h3 style={{ fontSize: mob ? 14 : 16, fontWeight: 700, color: C.azulEscuro, margin: 0, fontFamily: Fn.title, lineHeight: 1.3 }}>{p.title}</h3>
            </div>
            <div style={{ padding: mob ? '14px 16px' : '16px 22px 20px' }}>
              <p style={{ fontSize: 13, color: C.cinzaChumbo, lineHeight: 1.6, margin: 0, fontFamily: Fn.body }}>{p.desc}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
