import { useState, useEffect, type ReactNode } from 'react'
import { LayoutGrid, FileDown, Send, Plus, ShieldCheck, AlertTriangle, ArrowUpFromLine } from 'lucide-react'
import { RuleCards } from '../../components/RuleCards'

const C = { azulProfundo: '#004B9B', azulEscuro: '#002A68', azulClaro: '#658EC9', cinzaChumbo: 'var(--color-fg-muted)', cinzaEscuro: 'var(--color-fg)', amareloOuro: '#FDC24E', amareloEscuro: '#F6921E', verdeFloresta: '#00C64C', verdeEscuro: '#00904C', danger: '#DC3545', branco: 'var(--color-surface)', bg: 'var(--color-surface-muted)', cardBg: 'var(--color-surface)', cardBorder: 'var(--color-border)', azulCeuClaro: '#D3E3F4', textLight: 'var(--color-fg-muted)', neutro: '#E8EBFF' }
const Fn = { title: "'Saira Expanded', sans-serif", body: "'Open Sans', sans-serif", mono: "'Fira Code', monospace" }

/* ─── Junction Lines SVG ─── */
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

function Section({ n, title, desc, children }: { n: string; title: string; desc: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 44 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.azulClaro, fontFamily: Fn.title, marginBottom: 6 }}>{n}</div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: C.azulEscuro, margin: '0 0 4px', fontFamily: Fn.title, letterSpacing: '0.5px' }}>{title}</h2>
      <p style={{ fontSize: 14, color: C.cinzaChumbo, margin: '0 0 20px', lineHeight: 1.55, fontFamily: Fn.body }}>{desc}</p>
      {children}
    </section>
  )
}

function DSCard({ children, s, mob: m }: { children: ReactNode; s?: React.CSSProperties; mob?: boolean }) {
  return (
    <div style={{ background: C.cardBg, borderRadius: '12px 12px 12px 24px', border: `1px solid ${C.cardBorder}`, padding: m ? 16 : 28, boxShadow: '0 1px 3px rgba(0,75,155,.04),0 4px 14px rgba(0,75,155,.03)', ...s }}>
      {children}
    </div>
  )
}

/* ─── Banner Padrão de Página (modelo da Overview) ─── */
function BannerPadrao() {
  return (
    <div style={{ background: `linear-gradient(135deg, ${C.azulProfundo} 0%, ${C.azulEscuro} 100%)`, padding: '48px 40px 44px', position: 'relative', overflow: 'hidden', borderRadius: 12 }}>
      <JunctionLines style={{ position: 'absolute', top: -10, right: -20, width: 400, height: 250 }} />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.amareloOuro, fontFamily: Fn.title, marginBottom: 16 }}>
          <LayoutGrid size={14} color={C.amareloOuro} /> Visão Geral
        </div>
        <h1 style={{ fontSize: 44, fontWeight: 700, color: '#fff', margin: '0 0 10px', fontFamily: Fn.title, lineHeight: 1.1 }}>
          Design System<br /><span style={{ color: C.amareloOuro }}>FIPS</span>
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.69)', lineHeight: 1.6, maxWidth: 700, margin: '0 0 20px', fontFamily: Fn.body }}>
          Sistema de design unificado da Ferrovia Interna do Porto de Santos. Componentes, tokens e padrões para construir aplicações consistentes, acessíveis e com identidade ferroviária.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', fontSize: 12, fontWeight: 600, color: '#fff', background: 'rgba(0,198,76,0.18)', border: '1px solid rgba(0,198,76,0.30)', borderRadius: 20, fontFamily: Fn.body }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.verdeFloresta }} />v0.4.0
          </span>
          {['14 componentes', 'React + Tailwind'].map(t => (
            <span key={t} style={{ padding: '4px 12px', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, fontFamily: Fn.body }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Banner de Página com Badges ─── */
function BannerPaginaComBadges() {
  return (
    <div style={{ background: `linear-gradient(135deg, ${C.azulProfundo} 0%, ${C.azulEscuro} 100%)`, padding: '48px 40px 44px', position: 'relative', overflow: 'hidden', borderRadius: 12 }}>
      <JunctionLines style={{ position: 'absolute', top: -10, right: -20, width: 400, height: 250 }} />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.amareloOuro, fontFamily: Fn.title, marginBottom: 16 }}>
          <LayoutGrid size={14} color={C.amareloOuro} /> Módulo Suprimentos
        </div>
        <h1 style={{ fontSize: 44, fontWeight: 700, color: '#fff', margin: '0 0 10px', fontFamily: Fn.title, lineHeight: 1.1 }}>
          Painel de <span style={{ color: C.amareloOuro }}>Requisições</span>
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.69)', lineHeight: 1.6, maxWidth: 700, margin: '0 0 20px', fontFamily: Fn.body }}>
          Gestão completa de compras e requisições do módulo Suprimentos FIPS. Acompanhe status, prioridades e prazos em tempo real.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { label: 'primário', hex: '#004B9B', dot: '#004B9B' },
            { label: 'destaque', hex: '#F6921E', dot: '#F6921E' },
            { label: 'sucesso', hex: '#00C64C', dot: '#00C64C' },
            { label: 'perigo', hex: '#DC3545', dot: '#DC3545' },
            { label: 'inverso', hex: '#002A68', dot: '#002A68' },
            { label: 'realce', hex: '#FDC24E', dot: '#FDC24E' },
          ].map(b => (
            <span key={b.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 20, fontFamily: Fn.body }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: b.dot, flexShrink: 0 }} />
              {b.label} <span style={{ fontFamily: Fn.mono, fontSize: 10, color: 'rgba(255,255,255,0.50)' }}>{b.hex}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Banner de Conteúdo — Opção 1 (compacto, CTA à direita) ─── */
function BannerConteudo1() {
  return (
    <div style={{ background: `linear-gradient(135deg, ${C.azulProfundo} 0%, ${C.azulEscuro} 60%, #001A4A 100%)`, borderRadius: '12px 12px 12px 24px', padding: '22px 26px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,42,104,.12)' }}>
      <JunctionLines style={{ position: 'absolute', top: -10, right: -20, width: 360, height: 200, opacity: 0.06 }} />
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ width: 44, height: 44, borderRadius: 11, background: `${C.amareloOuro}18`, border: `1px solid ${C.amareloOuro}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <FileDown size={20} color={C.amareloOuro} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ fontSize: 21, fontWeight: 700, color: '#fff', fontFamily: Fn.title, margin: 0, lineHeight: 1.15, letterSpacing: '-0.2px' }}>Sistema de Requisições</h2>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.67)', fontFamily: Fn.body, margin: '4px 0 0', lineHeight: 1.4 }}>Gestão de compras e requisições do módulo Suprimentos · FIPS</p>
        </div>
        <button style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '6px 14px', height: 30, fontSize: 12, fontWeight: 600, fontFamily: Fn.body, borderRadius: 6, border: '1.5px solid transparent', background: C.amareloEscuro, color: C.branco, cursor: 'pointer', letterSpacing: '0.01em', whiteSpace: 'nowrap', flexShrink: 0 }}>
          <Plus size={13} strokeWidth={2.5} /> Nova Solicitação
        </button>
      </div>
    </div>
  )
}

/* ─── Banner de Conteúdo — Opção 2 (fluxo com status badges) ─── */
function BannerConteudo2() {
  const stats = [
    { label: 'TOTAL', value: '1012', color: C.verdeFloresta },
    { label: 'AGUARDANDO', value: '1004', color: C.amareloEscuro },
    { label: 'APROVADOS', value: '8', color: C.verdeFloresta },
    { label: 'ENTREGUES', value: '2', color: C.danger },
  ]
  return (
    <div style={{ background: `linear-gradient(135deg, ${C.azulProfundo} 0%, ${C.azulEscuro} 60%, #001A4A 100%)`, borderRadius: '12px 12px 12px 24px', padding: '22px 26px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,42,104,.12)' }}>
      <JunctionLines style={{ position: 'absolute', top: -10, right: -20, width: 360, height: 200, opacity: 0.06 }} />
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, background: `${C.amareloOuro}18`, border: `1px solid ${C.amareloOuro}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Send size={20} color={C.amareloOuro} />
            </div>
            <div style={{ minWidth: 0 }}>
              <h2 style={{ fontSize: 21, fontWeight: 700, color: '#fff', fontFamily: Fn.title, margin: 0, lineHeight: 1.15, letterSpacing: '-0.2px' }}>Pedidos</h2>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.67)', fontFamily: Fn.body, margin: '4px 0 0', lineHeight: 1.4 }}>Solicitação → Análise → Aprovação → Execução → Entrega</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingLeft: 58 }}>
            {stats.map(s => (
              <span key={s.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 6, fontFamily: Fn.body }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color }} />
                {s.label} <strong style={{ color: '#fff', fontWeight: 700 }}>{s.value}</strong>
              </span>
            ))}
          </div>
        </div>
        <button style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '6px 14px', height: 30, fontSize: 12, fontWeight: 600, fontFamily: Fn.body, borderRadius: 6, border: '1.5px solid transparent', background: C.amareloEscuro, color: C.branco, cursor: 'pointer', letterSpacing: '0.01em', whiteSpace: 'nowrap', flexShrink: 0 }}>
          <Plus size={13} strokeWidth={2.5} /> Novo pedido
        </button>
      </div>
    </div>
  )
}

/* ─── Página ─── */
export default function HeroBannerDoc() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h) }, [])
  const mob = w < 640

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(160deg, ${C.bg} 0%, ${C.azulCeuClaro}44 50%, ${C.bg} 100%)`, fontFamily: Fn.body, color: C.cinzaEscuro }}>

      {/* HEADER HERO */}
      <header style={{ background: `linear-gradient(135deg, ${C.azulProfundo} 0%, ${C.azulEscuro} 100%)`, padding: mob ? '32px 20px' : '48px 40px 44px', position: 'relative', overflow: 'hidden' }}>
        <JunctionLines style={{ position: 'absolute', top: -10, right: -20, width: mob ? 250 : 400, height: 250 }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${C.branco}10`, border: `1px solid ${C.branco}18`, borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.amareloOuro, fontFamily: Fn.title, marginBottom: 16 }}>
            <LayoutGrid size={14} color={C.amareloOuro} /> Design System FIPS
          </div>
          <h1 style={{ fontSize: mob ? 30 : 44, fontWeight: 700, color: C.branco, margin: '0 0 10px', fontFamily: Fn.title }}>Banner</h1>
          <p style={{ fontSize: 16, color: `${C.branco}B0`, lineHeight: 1.6, maxWidth: 700, margin: 0, fontFamily: Fn.body }}>
            Catálogo de banners padronizados do DS-FIPS. Três variantes para cobrir desde landing pages até módulos operacionais com fluxos e KPIs. Degradê azul institucional como fundo obrigatório.
          </p>
        </div>
      </header>

      <div style={{ padding: mob ? '24px 16px 40px' : '36px 40px 60px', maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ marginBottom: 44 }}>
          <RuleCards mob={mob} cards={[
            { icon: <ShieldCheck size={20} color="#004B9B" />, color: '#004B9B', bg: '#004B9B08', tag: 'REGRA 1', title: 'Banner de Página', desc: 'Hero completo com título grande, descrição, badges e arte decorativa. Usado em landing pages, visões gerais de módulo e páginas de documentação standalone que precisam de impacto visual.' },
            { icon: <AlertTriangle size={20} color="#F6921E" />, color: '#F6921E', bg: '#F6921E08', tag: 'REGRA 2', title: 'Banner de Conteúdo', desc: 'Faixa compacta de uma linha com ícone à esquerda, título + subtítulo e botão de ação à direita. Ideal para cabeçalhos de módulos operacionais como Requisições, Cadastros ou qualquer tela com ação primária.' },
            { icon: <ArrowUpFromLine size={20} color="#002A68" />, color: '#002A68', bg: '#002A6808', tag: 'REGRA 3', title: 'Banner de Fluxo', desc: 'Variante com badges de status e cadeia de etapas visível (ex: Solicitação → Aprovação → Entrega). Usado em módulos com fluxo sequencial e KPIs por etapa, como Pedidos, Produção e Aprovações.' },
          ]} />
        </div>

        {/* 01 — Banner de Página (sem badges) */}
        <Section n="01" title="Banner de Página" desc="Versão limpa do hero principal. Badge de seção no topo, título em Saira Expanded 44px, descrição em Open Sans e junction lines decorativas. Sem badges informativos no rodapé. Usado em páginas internas, documentação de padrões e fundamentos.">
          <DSCard mob={mob} s={{ padding: 0, overflow: 'hidden' }}>
            <BannerPadrao />
          </DSCard>
        </Section>

        {/* 02 — Banner de Página com Badges */}
        <Section n="02" title="Banner de Página com Badges" desc="Variante do hero com badges informativos no rodapé (versão, contagem, stack, cores). Ideal para landing pages, visões gerais de módulo e páginas que precisam exibir metadados resumidos logo no topo — como Overview, catálogos de componentes e painéis de status.">
          <DSCard mob={mob} s={{ padding: 0, overflow: 'hidden' }}>
            <BannerPaginaComBadges />
          </DSCard>
        </Section>

        {/* 03 — Banner de Conteúdo */}
        <Section n="03" title="Banner de Conteúdo" desc="Faixa compacta para cabeçalhos de módulos operacionais. Ícone em container 44×44 com fundo amarelo semitransparente à esquerda, título Saira 21px + subtítulo descritivo ao centro, e botão CTA accent (#F6921E) à direita. Uma linha de altura, ideal para telas como Requisições, Cadastros ou qualquer módulo com ação primária.">
          <DSCard mob={mob} s={{ padding: 0, overflow: 'hidden' }}>
            <BannerConteudo1 />
          </DSCard>
        </Section>

        {/* 04 — Banner de Fluxo */}
        <Section n="04" title="Banner de Fluxo" desc="Variante com cadeia de etapas visível e badges de status. Ícone + título + fluxo sequencial (ex: Solicitação → Análise → Aprovação → Execução → Entrega) na primeira linha, badges com dot colorido e contagem na segunda. Botão CTA à direita. Para módulos com workflow e KPIs por etapa, como Pedidos, Produção e Aprovações.">
          <DSCard mob={mob} s={{ padding: 0, overflow: 'hidden' }}>
            <BannerConteudo2 />
          </DSCard>
        </Section>

        <div style={{ textAlign: 'center', padding: '20px 0 0', borderTop: `1px solid ${C.cardBorder}`, marginTop: 20 }}>
          <span style={{ fontSize: 12, color: C.cinzaChumbo, letterSpacing: '0.5px', fontFamily: Fn.title, fontWeight: 400 }}>DS-FIPS v0.4.0 · Ferrovia Interna do Porto de Santos · Excelência sobre trilhos · {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  )
}
