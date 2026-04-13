// @ts-nocheck
import { useEffect, useState } from 'react'
import { BookOpen, Component, Home, LayoutDashboard, Palette } from 'lucide-react'
import { DocHeaderSectionNavDemo } from '../../../components/layout/DocHeaderSectionNav'
import { DocHeaderStandardPreview } from '../../../components/layout/DocHeaderStandard'
import { SHELL_HERO_ART_SRC } from '../../../lib/shellHeroArt'

/* ═══════════════════════════════════════════ TOKENS ═══════════════════════════════════════════ */
const C = {
  azulProfundo: '#004B9B',
  azulEscuro: '#002A68',
  azulClaro: '#658EC9',
  cinzaChumbo: '#7B8C96',
  cinzaEscuro: '#333B41',
  cinzaClaro: '#C0CCD2',
  azulCeu: '#93BDE4',
  azulCeuClaro: '#D3E3F4',
  amareloOuro: '#FDC24E',
  amareloEscuro: '#F6921E',
  verdeFloresta: '#00C64C',
  verdeEscuro: '#00904C',
  danger: '#DC3545',
  neutro: '#E8EBFF',
  branco: '#FFFFFF',
  bg: '#F2F4F8',
  cardBg: '#FFFFFF',
  cardBorder: '#E2E8F0',
  textMuted: '#64748B',
  textLight: '#94A3B8',
}
const Fn = { title: "'Saira Expanded', sans-serif", body: "'Open Sans', sans-serif", mono: "'Fira Code', monospace" }

const Ic = {
  grid: (s = 14, c = C.amareloOuro) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4" />
    </svg>
  ),
}

function JunctionLines({ style }) {
  return (
    <svg viewBox="0 0 320 200" fill="none" style={{ opacity: 0.12, ...style }}>
      <path d="M0 60H100C120 60 120 60 140 40L200 40H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round" />
      <path d="M0 60H100C120 60 120 60 140 80L200 80H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round" />
      <path d="M0 120H60C80 120 80 120 100 100L160 100H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round" />
      <path d="M0 120H60C80 120 80 120 100 140L160 140H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

function Section({ n, title, desc, children }) {
  return (
    <section style={{ marginBottom: 44 }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: C.azulClaro,
          fontFamily: Fn.title,
          marginBottom: 6,
        }}
      >
        {n}
      </div>
      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: C.azulEscuro,
          margin: '0 0 4px',
          fontFamily: Fn.title,
          letterSpacing: '.5px',
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: 14, color: C.cinzaChumbo, margin: '0 0 20px', lineHeight: 1.55, fontFamily: Fn.body }}>{desc}</p>
      {children}
    </section>
  )
}

function DSCard({ children, mob: m }) {
  return (
    <div
      style={{
        background: C.cardBg,
        borderRadius: '12px 12px 12px 24px',
        border: `1px solid ${C.cardBorder}`,
        padding: m ? 16 : 28,
        boxShadow: '0 1px 3px rgba(0,75,155,.04),0 4px 14px rgba(0,75,155,.03)',
      }}
    >
      {children}
    </div>
  )
}

const gl = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '1.2px',
  textTransform: 'uppercase',
  color: C.azulClaro,
  fontFamily: Fn.title,
  marginBottom: 4,
  marginTop: 12,
}
const gt = { fontSize: 13, color: C.cinzaEscuro, lineHeight: 1.55, margin: 0, fontFamily: Fn.body }
const gk = {
  fontSize: 11,
  fontFamily: Fn.mono,
  color: C.cinzaChumbo,
  background: C.cardBg,
  padding: '2px 8px',
  borderRadius: 4,
  border: `1px solid ${C.cardBorder}`,
}

const HEADER_DOC_DEMO_TABS = [
  { id: 'start', label: 'Início', active: false, icon: Home },
  { id: 'patterns', label: 'Padrões', active: false, icon: LayoutDashboard },
  { id: 'foundations', label: 'Fundamentos', active: false, icon: Palette },
  { id: 'components', label: 'Componentes', active: true, icon: Component },
  { id: 'meta', label: 'Projeto', active: false, icon: BookOpen },
]

export default function HeaderDoc() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  const mob = w < 640

  return (
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(160deg,${C.bg} 0%,${C.azulCeuClaro}44 50%,${C.bg} 100%)`,
        fontFamily: Fn.body,
        color: C.cinzaEscuro,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Saira+Expanded:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&family=Fira+Code:wght@400;500&display=swap');
      `}</style>

      <header
        style={{
          background: `linear-gradient(135deg,${C.azulProfundo} 0%,${C.azulEscuro} 100%)`,
          padding: mob ? '32px 20px' : '48px 40px 44px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <JunctionLines style={{ position: 'absolute', top: -10, right: -20, width: mob ? 250 : 400, height: 250 }} />
        <div style={{ position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: `${C.branco}10`,
              border: `1px solid ${C.branco}18`,
              borderRadius: 20,
              padding: '5px 14px',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: C.amareloOuro,
              fontFamily: Fn.title,
              marginBottom: 16,
            }}
          >
            {Ic.grid(14, C.amareloOuro)} Design System FIPS
          </div>
          <h1 style={{ fontSize: mob ? 30 : 44, fontWeight: 700, color: C.branco, margin: '0 0 10px', fontFamily: Fn.title }}>Header</h1>
          <p style={{ fontSize: 16, color: `${C.branco}B0`, lineHeight: 1.6, maxWidth: 720, margin: 0, fontFamily: Fn.body }}>
            Barra superior do shell de documentação: contexto da seção, título da página, busca e ações. Fundo com imagem + gradientes (mesmo padrão do Application Shell), faixas em vidro e tipografia clara sobre o hero.
          </p>
        </div>
      </header>

      <div style={{ padding: mob ? '24px 16px 40px' : '36px 40px 60px', maxWidth: 1100 }}>
        <Section
          n="01"
          title="Finalidade"
          desc="O header ancora o usuário na hierarquia (grupo → página), oferece atalho de busca quando houver e mantém navegação rápida entre grandes áreas do DS. O conteúdo do header permanece legível sobre imagem e overlays; em viewport estreita o menu mobile substitui parte da linha de utilitários."
        >
          <DSCard mob={mob}>
            <p style={gt}>
              Use este padrão em todas as áreas internas do produto que sigam o shell da documentação, para consistência com <code style={gk}>DocLayout</code>. O corpo da página segue em <code style={gk}>--color-surface-muted</code>; o header empilha imagem, gradientes e camadas semitransparentes com blur.
            </p>
          </DSCard>
        </Section>

        <Section
          n="02"
          title="Anatomia"
          desc="Da esquerda para a direita: controle de menu (mobile), ícone de painel, coluna de título (eyebrow + badge opcional + H2), busca (md+), botões neumórficos (notificações, tutorial) e chip de conta (sm+). Abaixo, trilho de tabs alinhado ao grupo ativo (lg+)."
        >
          <DSCard mob={mob}>
            <div style={gl}>Referência viva</div>
            <p style={{ ...gt, marginBottom: 16 }}>
              Bloco abaixo usa <code style={gk}>DocHeaderStandardPreview</code> — mesmas peças e classes que{' '}
              <code style={gk}>DocLayout</code>.
            </p>
            <DocHeaderStandardPreview
              groupLabel="Componentes"
              pageTitle="Header"
              sectionNav={<DocHeaderSectionNavDemo tabs={HEADER_DOC_DEMO_TABS} />}
              withCardChrome={false}
            />
          </DSCard>
        </Section>

        <Section
          n="03"
          title="Tokens e comportamento"
          desc="Sticky com blur; faixas do header com bordas claras sobre o hero; tabs ativas em branco com traço âmbar (accent)."
        >
          <DSCard mob={mob}>
            <ul style={{ margin: 0, paddingLeft: 20, fontFamily: Fn.body, fontSize: 13, color: C.cinzaEscuro, lineHeight: 1.65 }}>
              <li>
                <code style={gk}>sticky top-0 z-20</code> — permanece visível ao rolar o conteúdo.
              </li>
              <li>
                Arte <code style={gk}>{SHELL_HERO_ART_SRC}</code> + lavagem em <code style={gk}>#002A68</code> / <code style={gk}>#004B9B</code> (tokens em <code style={gk}>docHeaderChrome.ts</code>, alinhados ao sidebar).
              </li>
              <li>
                Faixas com blur; bordas <code style={gk}>white/6–8%</code> e vidro <code style={gk}>white/8–16%</code> como no <code style={gk}>DocsNeuSidebar</code>.
              </li>
              <li>
                Título: <code style={gk}>font-heading</code> + <code style={gk}>text-lg font-semibold</code>.
              </li>
            </ul>
          </DSCard>
        </Section>

        <Section
          n="04"
          title="Implementação de referência"
          desc="Implementação canônica em layout + shell; evite divergências de espaçamento (px-4 py-3 / sm:px-6) e de hierarquia de título."
        >
          <DSCard mob={mob}>
            <p style={gt}>
              Shell: <code style={gk}>src/app/DocLayout.tsx</code>. Pré-visualização e fundo hero:{' '}
              <code style={gk}>src/components/layout/DocHeaderStandard.tsx</code>; botão de ícone neumórfico:{' '}
              <code style={gk}>DocHeaderNeuIconButton.tsx</code>.
            </p>
          </DSCard>
        </Section>
      </div>
    </div>
  )
}
