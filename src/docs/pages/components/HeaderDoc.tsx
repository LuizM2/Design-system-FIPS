// @ts-nocheck
import { useEffect, useState } from 'react'
import { Bell, BookOpen, Component, Home, LayoutDashboard, Menu, PanelLeft, Settings } from 'lucide-react'
import { DocHeaderPageTrail } from '../../../components/layout/DocHeaderPageTrail'
import { DocHeaderSectionNavDemo } from '../../../components/layout/DocHeaderSectionNav'
import { SearchPill } from '../../../components/layout/SearchPill'
import { UserChip } from '../../../components/layout/UserChip'
import { Button } from '../../../components/ui/button'
import {
  docHeaderArtDepth,
  docHeaderArtWash,
  docHeaderBarTabs,
  docHeaderBarTop,
  docHeaderShellBorder,
} from '../../../lib/docHeaderChrome'
import { cn } from '../../../lib/cn'
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

const shellHeaderIconBtnClass =
  'flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-xl border-[1.5px] border-white/[0.16] bg-white/[0.08] text-white/[0.85] backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25'

/** Réplica estática do header da documentação (abas secção — TabsUnderline padrão do TabsDoc / DocLayout). */
function DocHeaderReferenceDemo() {
  const tabs = [
    { id: 'start', label: 'Início', active: false, icon: Home },
    { id: 'patterns', label: 'Padrões', active: false, icon: LayoutDashboard },
    { id: 'components', label: 'Componentes', active: true, icon: Component },
    { id: 'meta', label: 'Projeto', active: false, icon: BookOpen },
  ]

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] shadow-sm">
      <header className={cn('relative overflow-hidden', docHeaderShellBorder)}>
        <div className="pointer-events-none absolute inset-0">
          <img
            src={SHELL_HERO_ART_SRC}
            alt=""
            className="h-full w-full object-cover object-[center_65%] opacity-[0.20]"
            draggable={false}
          />
          <div className={cn('absolute inset-0', docHeaderArtWash)} />
          <div className={cn('absolute inset-0', docHeaderArtDepth)} />
        </div>
        <div className={cn('relative z-10', docHeaderBarTop)}>
          <div className="pointer-events-none flex items-center gap-3 px-4 py-3 sm:px-6" aria-hidden tabIndex={-1}>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="border border-white/[0.16] bg-white/[0.08] text-white/90 backdrop-blur-sm lg:hidden"
              tabIndex={-1}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <PanelLeft className="hidden h-5 w-5 text-white/55 sm:block" aria-hidden />
              <DocHeaderPageTrail groupLabel="Componentes" pageTitle="Header" />
            </div>
            <div className="hidden w-full max-w-xs md:block">
              <SearchPill variant="docHeader" aria-label="Buscar (demo)" />
            </div>
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <span className={shellHeaderIconBtnClass} aria-hidden>
                <Bell className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <span className={shellHeaderIconBtnClass} aria-hidden>
                <Settings className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <UserChip variant="docHeader" />
            </div>
          </div>
        </div>
        <div className={cn('relative z-10 px-4 sm:px-6', docHeaderBarTabs)}>
          <DocHeaderSectionNavDemo tabs={tabs} />
        </div>
      </header>
      <div className="px-4 py-3 text-xs text-[var(--color-fg-muted)] sm:px-6">Área de conteúdo (exemplo)</div>
    </div>
  )
}

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
          desc="Da esquerda para a direita: controle de menu (mobile), ícone de painel, coluna de título (eyebrow + badge opcional + H2), busca (md+), ações em vidro (notificações, configurações) e chip de conta (sm+). Abaixo, trilho de tabs alinhado ao grupo ativo."
        >
          <DSCard mob={mob}>
            <div style={gl}>Referência viva</div>
            <p style={{ ...gt, marginBottom: 16 }}>Bloco abaixo replica classes e componentes do header atual da documentação.</p>
            <DocHeaderReferenceDemo />
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
          desc="O código-fonte do header documentado está em DocLayout; evite divergências de espaçamento (px-4 py-3 / sm:px-6) e de hierarquia de título."
        >
          <DSCard mob={mob}>
            <p style={gt}>
              Arquivo: <code style={gk}>src/app/DocLayout.tsx</code>. Ao padronizar produtos internos, extraia este bloco para um componente compartilhado apenas quando a API de rotas e tabs estiver estável.
            </p>
          </DSCard>
        </Section>
      </div>
    </div>
  )
}
