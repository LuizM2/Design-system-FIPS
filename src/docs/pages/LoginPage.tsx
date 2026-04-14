import { useState, useEffect } from 'react'
import { Eye, EyeOff, ArrowRight, Fingerprint, Shield, Globe, User } from 'lucide-react'

const BG = '/backgrounds/app-shell-home-trains.png'

/* ─── Linhas de junção ferroviária animadas ─── */
function RailJunction({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" className={className} style={{ opacity: 0.07 }}>
      <path d="M0 60H120C140 60 140 60 160 40L240 40H400" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M0 60H120C140 60 140 60 160 80L240 80H400" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M0 140H80C100 140 100 140 120 120L200 120H400" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M0 140H80C100 140 100 140 120 160L200 160H400" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

/* ─── Indicador de sinal ferroviário ─── */
function SignalDot({ color, active, delay }: { color: string; active: boolean; delay: number }) {
  return (
    <div style={{
      width: 8, height: 8, borderRadius: '50%',
      background: active ? color : 'rgba(255,255,255,0.08)',
      boxShadow: active ? `0 0 12px ${color}80, 0 0 4px ${color}` : 'none',
      transition: 'all 0.6s ease',
      transitionDelay: `${delay}ms`,
    }} />
  )
}

type LoginTab = 'interno' | 'externo'

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [signalStep, setSignalStep] = useState(0)
  const [tab, setTab] = useState<LoginTab>('interno')

  const [v2ShowPw, setV2ShowPw] = useState(false)
  const [v2Tab, setV2Tab] = useState<LoginTab>('interno')
  const [v3ShowPw, setV3ShowPw] = useState(false)
  const [v3Focused, setV3Focused] = useState<string | null>(null)
  const [v4ShowPw, setV4ShowPw] = useState(false)
  const [v4Focused, setV4Focused] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    const t = setInterval(() => setSignalStep(s => (s + 1) % 4), 1200)
    return () => clearInterval(t)
  }, [])

  return (<>
    {/* ╔══════════════════════════════════════════════════════════════╗
        ║  Documentação — Glassmorphism nos padrões de Login          ║
        ╚══════════════════════════════════════════════════════════════╝ */}
    <div style={{
      padding: '48px 48px 40px',
      background: 'var(--color-surface-muted)',
      fontFamily: "'Open Sans', sans-serif",
    }}>
      <h1 style={{
        fontFamily: "'Saira Expanded', sans-serif",
        fontSize: 28,
        fontWeight: 800,
        color: 'var(--color-fg)',
        margin: '0 0 8px',
      }}>
        Padrão Login — <span style={{ color: '#F6921E' }}>Glassmorphism</span>
      </h1>
      <p style={{
        fontSize: 14,
        color: 'var(--color-fg-muted)',
        lineHeight: 1.7,
        maxWidth: 720,
        margin: '0 0 16px',
      }}>
        <strong style={{ color: 'var(--color-fg)' }}>Os três modelos abaixo (V1, V2 e V3) são vidro fosco (glassmorphism).</strong>{' '}
        Todos usam a mesma técnica: <code style={{ fontSize: 12, padding: '2px 6px', borderRadius: 4, background: 'rgba(0,0,0,0.06)' }}>backdrop-filter: blur()</code> +{' '}
        fundo semi-transparente via <code style={{ fontSize: 12, padding: '2px 6px', borderRadius: 4, background: 'rgba(0,0,0,0.06)' }}>rgba()</code> +{' '}
        bordas que simulam reflexo de luz no vidro.
      </p>
      <p style={{
        fontSize: 14,
        color: 'var(--color-fg-muted)',
        lineHeight: 1.7,
        maxWidth: 720,
        margin: '0 0 28px',
      }}>
        A diferença visual entre eles não é a técnica — <strong style={{ color: 'var(--color-fg)' }}>é o grau de transparência</strong>.
        Um vidro fosco pode ser quase opaco (V1) ou quase invisível (V2/V3), mas todos são glassmorphism.
        O que controla essa variação é a opacidade do <code style={{ fontSize: 12, padding: '2px 6px', borderRadius: 4, background: 'rgba(0,0,0,0.06)' }}>rgba()</code> e
        os filtros <code style={{ fontSize: 12, padding: '2px 6px', borderRadius: 4, background: 'rgba(0,0,0,0.06)' }}>blur</code>, <code style={{ fontSize: 12, padding: '2px 6px', borderRadius: 4, background: 'rgba(0,0,0,0.06)' }}>brightness</code> e <code style={{ fontSize: 12, padding: '2px 6px', borderRadius: 4, background: 'rgba(0,0,0,0.06)' }}>saturate</code>.
      </p>

      {/* Tabela comparativa */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
        maxWidth: 900,
      }}>
        {/* V1 */}
        <div style={{
          padding: '20px 18px',
          borderRadius: 14,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}>
          <span style={{
            fontFamily: "'Saira Expanded', sans-serif",
            fontSize: 10, fontWeight: 700, letterSpacing: '2px',
            color: '#F6921E', textTransform: 'uppercase',
            display: 'block', marginBottom: 10,
          }}>V1 — Split 50/50</span>
          <div style={{ fontSize: 12, color: 'var(--color-fg-muted)', lineHeight: 1.8 }}>
            <div><strong>Fundo:</strong> <code style={{ fontSize: 11 }}>rgba(0,20,48,0.92)</code></div>
            <div><strong>Blur:</strong> <code style={{ fontSize: 11 }}>blur(2px)</code></div>
            <div><strong>Estilo:</strong> Overlay escuro sobre imagem</div>
            <div><strong>Card:</strong> Painel direito inteiro</div>
            <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-fg-muted)', opacity: 0.7 }}>
              <strong>É glassmorphism</strong> — mais opaco, pouca transparência. Ideal para foco total no formulário.
            </div>
          </div>
        </div>

        {/* V2 */}
        <div style={{
          padding: '20px 18px',
          borderRadius: 14,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}>
          <span style={{
            fontFamily: "'Saira Expanded', sans-serif",
            fontSize: 10, fontWeight: 700, letterSpacing: '2px',
            color: '#F6921E', textTransform: 'uppercase',
            display: 'block', marginBottom: 10,
          }}>V2 — Card centralizado</span>
          <div style={{ fontSize: 12, color: 'var(--color-fg-muted)', lineHeight: 1.8 }}>
            <div><strong>Fundo:</strong> <code style={{ fontSize: 11 }}>rgba(255,255,255,0.06–0.14)</code></div>
            <div><strong>Blur:</strong> <code style={{ fontSize: 11 }}>blur(12px) brightness(1.15)</code></div>
            <div><strong>Estilo:</strong> Vidro fosco com reflexo de luz</div>
            <div><strong>Card:</strong> Flutuante sobre a divisa</div>
            <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-fg-muted)', opacity: 0.7 }}>
              <strong>É glassmorphism</strong> — mais transparente, vê-se o fundo. <code style={{ fontSize: 10 }}>saturate(0.4)</code> neutraliza o azul, <code style={{ fontSize: 10 }}>brightness</code> clareia.
            </div>
          </div>
        </div>

        {/* V3 */}
        <div style={{
          padding: '20px 18px',
          borderRadius: 14,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}>
          <span style={{
            fontFamily: "'Saira Expanded', sans-serif",
            fontSize: 10, fontWeight: 700, letterSpacing: '2px',
            color: '#F6921E', textTransform: 'uppercase',
            display: 'block', marginBottom: 10,
          }}>V3 — Split editorial</span>
          <div style={{ fontSize: 12, color: 'var(--color-fg-muted)', lineHeight: 1.8 }}>
            <div><strong>Fundo:</strong> <code style={{ fontSize: 11 }}>rgba(255,255,255,0.03–0.10)</code></div>
            <div><strong>Blur:</strong> <code style={{ fontSize: 11 }}>blur(14px) brightness(1.12)</code></div>
            <div><strong>Estilo:</strong> Vidro fosco + split card</div>
            <div><strong>Card:</strong> Dois painéis (branding + form)</div>
            <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-fg-muted)', opacity: 0.7 }}>
              <strong>É glassmorphism</strong> — similar ao V2 com layout split. <code style={{ fontSize: 10 }}>saturate(0.45)</code> dessatura o azul. Inputs underline-only.
            </div>
          </div>
        </div>
      </div>

      {/* Nota técnica */}
      <div style={{
        marginTop: 24,
        padding: '14px 18px',
        borderRadius: 10,
        background: 'rgba(246,146,30,0.05)',
        border: '1px solid rgba(246,146,30,0.12)',
        maxWidth: 900,
      }}>
        <p style={{ fontSize: 12, color: 'var(--color-fg-muted)', lineHeight: 1.7, margin: 0 }}>
          <strong style={{ color: '#F6921E' }}>O que muda entre eles?</strong> A diferença principal é o valor <code style={{ fontSize: 11 }}>rgba()</code> do background do card.
          Quanto menor a opacidade (ex: <code style={{ fontSize: 11 }}>0.06</code>), mais transparente e mais do fundo aparece.
          O <code style={{ fontSize: 11 }}>backdrop-filter</code> com <code style={{ fontSize: 11 }}>blur</code>, <code style={{ fontSize: 11 }}>brightness</code> e <code style={{ fontSize: 11 }}>saturate</code> controlam
          o quão fosco, claro e neutro o vidro fica — essencial quando o fundo é azul escuro e o card precisa parecer cinza/branco.
        </p>
      </div>
    </div>

    <div className="relative flex min-h-[calc(100svh-120px)] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Saira+Expanded:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes slideInLeft {
          0% { opacity:0; transform:translateX(-40px); }
          100% { opacity:1; transform:translateX(0); }
        }
        @keyframes slideInRight {
          0% { opacity:0; transform:translateX(30px); }
          100% { opacity:1; transform:translateX(0); }
        }
        @keyframes fadeIn {
          0% { opacity:0; transform:translateY(8px); }
          100% { opacity:1; transform:translateY(0); }
        }
        @keyframes trainSlide {
          0% { transform:translateX(100%); }
          100% { transform:translateX(-120%); }
        }
        @keyframes pulse {
          0%,100% { opacity:0.6; }
          50% { opacity:1; }
        }
        @keyframes lineGrow {
          0% { width:0; }
          100% { width:100%; }
        }
        @keyframes glowBorder {
          0%,100% { border-color: rgba(253,194,78,0.25); }
          50% { border-color: rgba(253,194,78,0.50); }
        }

        /* ─── LEFT PANEL ─── */
        .login-left {
          width:25%;
          flex-shrink:0;
          position:relative;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          background: linear-gradient(145deg, #001430 0%, #002A68 40%, #00396B 100%);
          overflow:hidden;
          padding:60px 48px;
        }

        /* ─── RIGHT PANEL ─── */
        .login-right {
          width:75%;
          flex-shrink:0;
          position:relative;
          display:flex;
          flex-direction:column;
          justify-content:center;
          padding:60px 56px;
          overflow:hidden;
        }
        .login-right::before {
          content:'';
          position:absolute;
          inset:0;
          background:url('${BG}') center center / cover no-repeat;
          opacity:0.8;
        }
        .login-right::after {
          content:'';
          position:absolute;
          inset:0;
          background: linear-gradient(135deg, rgba(0,20,48,0.55) 0%, rgba(0,42,104,0.45) 50%, rgba(0,20,48,0.55) 100%);
        }

        /* ─── TABS Interno/Externo ─── */
        .login-tabs {
          display:flex;
          background: rgba(255,255,255,0.04);
          border-radius:12px;
          border: 1px solid rgba(255,255,255,0.06);
          padding:4px;
          margin-bottom:28px;
        }
        .login-tab {
          flex:1;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:8px;
          padding:8px 14px;
          border-radius:9px;
          border:none;
          background:transparent;
          color: rgba(255,255,255,0.35);
          font-family:'Saira Expanded',sans-serif;
          font-size:12px;
          font-weight:600;
          letter-spacing:0.5px;
          cursor:pointer;
          transition:all 0.3s ease;
        }
        .login-tab:hover {
          color: rgba(255,255,255,0.55);
        }
        .login-tab.active {
          background: rgba(253,194,78,0.12);
          color: #FDC24E;
          box-shadow: 0 2px 8px rgba(253,194,78,0.08);
        }
        .login-tab .tab-icon {
          transition: all 0.3s;
        }
        .login-tab.active .tab-icon {
          filter: drop-shadow(0 0 4px rgba(253,194,78,0.3));
        }

        /* ─── Tab hint message ─── */
        .tab-hint {
          display:flex;
          align-items:center;
          gap:8px;
          padding:10px 14px;
          border-radius:10px;
          background: rgba(253,194,78,0.04);
          border: 1px solid rgba(253,194,78,0.08);
          margin-bottom:24px;
        }
        .tab-hint span {
          font-family:'Open Sans',sans-serif;
          font-size:11px;
          color: rgba(255,255,255,0.35);
          line-height:1.4;
        }

        /* ─── FORM ELEMENTS ─── */
        @keyframes railShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .rail-input {
          position:relative;
          display:flex;
          align-items:center;
          gap:12px;
          height:42px;
          padding:0 14px;
          border-radius:10px;
          background: rgba(255,255,255,0.07);
          border: 1.5px solid rgba(253,194,78,0.30);
          box-shadow: 0 0 0 3px rgba(253,194,78,0.04), inset 0 0 12px rgba(253,194,78,0.01);
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
          overflow:hidden;
        }
        .rail-input:focus-within {
          background: rgba(255,255,255,0.09);
          border-color: rgba(253,194,78,0.50);
          box-shadow:
            0 0 0 4px rgba(253,194,78,0.08),
            0 0 24px rgba(253,194,78,0.06),
            inset 0 0 20px rgba(253,194,78,0.02);
        }
        /* Shimmer no focus */
        .rail-input::before {
          content:'';
          position:absolute;
          top:0; left:0;
          width:40%;
          height:100%;
          background: linear-gradient(105deg, transparent 30%, rgba(253,194,78,0.08) 45%, rgba(253,194,78,0.14) 50%, rgba(253,194,78,0.08) 55%, transparent 70%);
          transform: translateX(-100%);
          pointer-events:none;
          z-index:1;
        }
        .rail-input:focus-within::before {
          animation: railShimmer 1.2s ease-out forwards;
        }
        .rail-input .icon {
          color: rgba(253,194,78,0.50);
          transition: all 0.35s;
          flex-shrink:0;
        }
        .rail-input:focus-within .icon {
          color: #FDC24E;
          filter: drop-shadow(0 0 6px rgba(253,194,78,0.30));
        }
        .rail-input input {
          flex:1;
          background:transparent;
          border:none;
          outline:none;
          color: rgba(255,255,255,0.90);
          font-size:13px;
          font-family:'Open Sans',sans-serif;
          font-weight:400;
          letter-spacing:0.01em;
          min-width:0;
          position:relative;
          z-index:2;
        }
        .rail-input input::placeholder {
          color: rgba(255,255,255,0.30);
          font-weight:300;
        }
        .rail-input input:-webkit-autofill,
        .rail-input input:-webkit-autofill:hover,
        .rail-input input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 50px rgba(0,15,40,0.95) inset !important;
          -webkit-text-fill-color: rgba(255,255,255,0.90) !important;
          caret-color: #fff;
          transition: background-color 5000s ease-in-out 0s;
        }

        /* Linha dourada animada abaixo do input focado */
        .rail-input::after {
          content:'';
          position:absolute;
          bottom:-1.5px;
          left:50%;
          height:2px;
          width:60%;
          background: linear-gradient(90deg, transparent, rgba(253,194,78,0.20), transparent);
          border-radius:2px;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          transform:translateX(-50%);
        }
        .rail-input:focus-within::after {
          width:80%;
          background: linear-gradient(90deg, transparent, #FDC24E, #F6921E, #FDC24E, transparent);
        }

        /* Label flutuante */
        .rail-label {
          font-family:'Saira Expanded',sans-serif;
          font-size:10px;
          font-weight:600;
          letter-spacing:2px;
          text-transform:uppercase;
          color: rgba(253,194,78,0.55);
          margin-bottom:6px;
          display:block;
          transition: color 0.3s;
        }
        .rail-label.active {
          color: rgba(253,194,78,0.85);
        }

        /* ─── CTA Button ─── */
        .rail-cta {
          position:relative;
          width:100%;
          height:44px;
          border:none;
          border-radius:12px;
          background: linear-gradient(135deg, #FDC24E 0%, #F6921E 100%);
          color: #002A68;
          font-family:'Saira Expanded',sans-serif;
          font-size:13px;
          font-weight:700;
          letter-spacing:0.8px;
          cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:10px;
          overflow:hidden;
          transition: all 0.3s ease;
          box-shadow:
            0 4px 16px rgba(246,146,30,0.30),
            0 1px 3px rgba(0,0,0,0.10),
            inset 0 1px 0 rgba(255,255,255,0.25);
        }
        .rail-cta:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 28px rgba(246,146,30,0.40),
            0 2px 6px rgba(0,0,0,0.12),
            inset 0 1px 0 rgba(255,255,255,0.30);
        }
        .rail-cta:active {
          transform: translateY(0);
        }
        .rail-cta::before {
          content:'';
          position:absolute;
          top:0; left:0; right:0;
          height:50%;
          background: linear-gradient(180deg, rgba(255,255,255,0.20), transparent);
          border-radius:14px 14px 50% 50%;
          pointer-events:none;
        }

        /* ─── Misc ─── */
        .rail-link {
          color:rgba(255,255,255,0.30);
          font-size:12px;
          text-decoration:none;
          font-family:'Open Sans',sans-serif;
          transition:color 0.2s;
        }
        .rail-link:hover { color:#FDC24E; }

        .rail-check {
          appearance:none; -webkit-appearance:none;
          width:16px; height:16px;
          border-radius:4px;
          border:1.5px solid rgba(255,255,255,0.15);
          background:rgba(255,255,255,0.03);
          cursor:pointer; flex-shrink:0;
          position:relative; transition:all 0.2s;
        }
        .rail-check:checked {
          background: rgba(253,194,78,0.20);
          border-color: rgba(253,194,78,0.50);
        }
        .rail-check:checked::after {
          content:'✓'; position:absolute;
          top:-1px; left:2px;
          font-size:11px; color:#FDC24E; font-weight:700;
        }

        .divider-line {
          display:flex; align-items:center; gap:16px;
        }
        .divider-line::before,.divider-line::after {
          content:''; flex:1; height:1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
        }

        /* Train silhouette sliding */
        .train-runner {
          position:absolute;
          bottom:32px; left:0; right:0;
          height:40px;
          overflow:hidden;
          opacity:0.04;
        }
        .train-runner img {
          height:100%;
          animation: trainSlide 25s linear infinite;
          position:absolute;
        }

        /* Status bar */
        .status-bar {
          display:flex;
          align-items:center;
          gap:6px;
          padding:6px 12px;
          border-radius:20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
        }
      `}</style>

      {/* ══════ LEFT — Branding ══════ */}
      <div className="login-left">
        {/* Junction lines decorativas */}
        <RailJunction className="absolute top-0 right-0 w-[500px]" />
        <RailJunction className="absolute bottom-0 left-0 w-[400px] rotate-180" />

        {/* Train runner */}
        <div className="train-runner">
          <img src="/brand/hero-train-silhouette.svg" alt="" draggable={false} />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10" style={{
          maxWidth: 380,
          animation: mounted ? 'slideInLeft 0.8s ease-out forwards' : 'none',
          opacity: mounted ? 1 : 0,
        }}>
          <h1 style={{
            fontFamily: "'Saira Expanded', sans-serif",
            fontSize: 36,
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.1,
            margin: '0 0 16px',
            letterSpacing: '-0.5px',
          }}>
            Excelência<br />
            <span style={{ color: '#FDC24E' }}>sobre trilhos</span>
          </h1>

          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 15,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.7,
            margin: '0 0 32px',
            maxWidth: 320,
          }}>
            Sistema integrado da Ferrovia Interna do Porto de Santos.
            Gestão ferroviária com precisão e segurança.
          </p>

          {/* Sinais ferroviários */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 32 }}>
            <div className="status-bar">
              <SignalDot color="#00C64C" active={signalStep >= 1} delay={0} />
              <SignalDot color="#FDC24E" active={signalStep >= 2} delay={100} />
              <SignalDot color="#F6921E" active={signalStep >= 3} delay={200} />
              <span style={{
                fontFamily: "'Saira Expanded', sans-serif",
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '1.5px',
                color: 'rgba(255,255,255,0.30)',
                marginLeft: 4,
                textTransform: 'uppercase',
              }}>
                Sistema ativo
              </span>
            </div>
          </div>

          {/* ── Linha de trem: Princípios FIPS ── */}
          <div style={{
            height: 400,
            overflow: 'hidden',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 24,
            position: 'relative',
          }}>
            <style>{`
              @keyframes stationPulse {
                0%, 100% { box-shadow: 0 0 6px rgba(253,194,78,0.4), 0 0 12px rgba(253,194,78,0.15); }
                50% { box-shadow: 0 0 10px rgba(253,194,78,0.7), 0 0 20px rgba(253,194,78,0.3); }
              }
              @keyframes stationReveal {
                0% { opacity: 0; transform: translateX(-12px); }
                100% { opacity: 1; transform: translateX(0); }
              }
            `}</style>

            {/* Cabeçalho da rota */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginBottom: 20, paddingLeft: 4,
            }}>
              <div style={{
                width: 18, height: 3, borderRadius: 2,
                background: 'linear-gradient(90deg, #FDC24E, #F6921E)',
              }} />
              <span style={{
                fontFamily: "'Saira Expanded', sans-serif",
                fontSize: 8, fontWeight: 700, letterSpacing: '2.5px',
                color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase',
              }}>
                Rota dos princípios
              </span>
            </div>

            {/* Trilho + estações */}
            <div style={{ position: 'relative', paddingLeft: 32 }}>
              {/* Trilho vertical — linha principal */}
              <div style={{
                position: 'absolute', left: 9, top: 0, bottom: 0, width: 2,
                background: 'repeating-linear-gradient(180deg, #FDC24E 0px, #FDC24E 8px, transparent 8px, transparent 14px)',
                opacity: 0.5,
              }} />

              {/* Dormentes horizontais */}
              {[28, 62, 96, 130, 164, 198, 232, 266, 300].map((y, i) => (
                <div key={i} style={{
                  position: 'absolute', left: 2, top: y, width: 16, height: 2,
                  background: '#FDC24E', opacity: 0.12, borderRadius: 1,
                }} />
              ))}

              {/* Estações — faróis de partida */}
              {[
                { name: 'Eficiência', desc: 'A busca pela eficiência, com responsabilidade, deve estar presente em nosso dia a dia.', color: '#00C64C' },
                { name: 'Pessoas', desc: 'Pessoas engajadas e um ambiente de trabalho saudável são o alicerce para bons resultados duradouros.', color: '#FDC24E' },
                { name: 'Integridade', desc: 'Respeitar as pessoas e cumprir os compromissos assumidos é essencial para relacionamentos duradouros.', color: '#F6921E' },
                { name: 'Colaboração', desc: 'Trabalho em conjunto, com empatia, para alcançar o melhor resultado para todos.', color: '#00C64C' },
                { name: 'Segurança', desc: 'A segurança das pessoas é prioridade sobre qualquer outro tema.', color: '#FF4D4D' },
              ].map((station, i) => (
                <div
                  key={station.name}
                  style={{
                    position: 'relative',
                    marginBottom: i < 4 ? 28 : 0,
                    animation: mounted ? `stationReveal 0.4s ease-out ${0.3 + i * 0.12}s both` : 'none',
                  }}
                >
                  {/* Farol de partida */}
                  <div style={{
                    position: 'absolute',
                    left: -28,
                    top: 2,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: `radial-gradient(circle at 40% 35%, ${station.color}, ${station.color}88 60%, transparent 100%)`,
                    boxShadow: `0 0 8px ${station.color}80, 0 0 16px ${station.color}30`,
                    animation: `stationPulse 2.5s ease-in-out ${i * 0.5}s infinite`,
                  }} />
                  {/* Aro externo do farol */}
                  <div style={{
                    position: 'absolute',
                    left: -30,
                    top: 0,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    border: `1.5px solid ${station.color}40`,
                    pointerEvents: 'none',
                  }} />

                  {/* Conector horizontal */}
                  <div style={{
                    position: 'absolute',
                    left: -12,
                    top: 8,
                    width: 8,
                    height: 1,
                    background: `${station.color}50`,
                  }} />

                  {/* Nome da estação */}
                  <div style={{
                    fontFamily: "'Saira Expanded', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: station.color,
                    letterSpacing: '0.3px',
                    lineHeight: 1.2,
                  }}>
                    {station.name}
                  </div>

                  {/* Descrição */}
                  <div style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: 9,
                    color: 'rgba(255,255,255,0.25)',
                    lineHeight: 1.45,
                    marginTop: 3,
                    maxWidth: 220,
                  }}>
                    {station.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════ RIGHT — Login ══════ */}
      <div className="login-right">
        <div className="relative z-10" style={{
          animation: mounted ? 'slideInRight 0.7s ease-out 0.2s both' : 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 380,
          margin: '0 auto',
          padding: '36px 32px',
          borderRadius: 28,
          background: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(10px) saturate(50%) brightness(1.1)',
          WebkitBackdropFilter: 'blur(10px) saturate(50%) brightness(1.1)',
          border: '0.5px solid rgba(255,255,255,0.08)',
          boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.10)',
          position: 'relative',
          gap: 18,
        }}>

          <img src="/appfips-logo-full.png" alt="App FIPS" style={{ height: 48, objectFit: 'contain', marginBottom: 20 }} />
          <h2 style={{
            fontFamily: "'Saira Expanded', sans-serif",
            fontSize: 24,
            fontWeight: 700,
            color: '#fff',
            margin: '0 0 6px',
            letterSpacing: '0.02em',
            textAlign: 'center',
          }}>
            Acessar sistema
          </h2>
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 13,
            color: 'rgba(255,255,255,0.32)',
            margin: '0 0 28px',
            textAlign: 'center',
          }}>
            Identifique-se para continuar
          </p>

          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* CS ou E-mail */}
            <div>
              <label className={`rail-label ${focused === 'user' ? 'active' : ''}`}>
                CS ou E-mail
              </label>
              <div className="rail-input">
                <User size={18} strokeWidth={1.6} className="icon" />
                <input
                  type="text"
                  placeholder="Digite CS ou Email"
                  onFocus={() => setFocused('user')}
                  onBlur={() => setFocused(null)}
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className={`rail-label ${focused === 'pw' ? 'active' : ''}`}>
                Senha
              </label>
              <div className="rail-input">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="icon" style={{ flexShrink: 0 }}>
                  <rect x="3" y="11" width="18" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="12" cy="16.5" r="1.5" fill="currentColor" />
                </svg>
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  onFocus={() => setFocused('pw')}
                  onBlur={() => setFocused(null)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  style={{
                    background: 'none', border: 'none',
                    color: 'rgba(255,255,255,0.18)',
                    cursor: 'pointer', padding: 2,
                    display: 'flex', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.18)' }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember + forgot */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" className="rail-check" />
                <span className="rail-link" style={{ fontSize: 12 }}>Lembrar acesso</span>
              </label>
              <a href="#" onClick={e => e.preventDefault()} className="rail-link">
                Esqueceu a senha?
              </a>
            </div>

            {/* CTA */}
            <button type="submit" className="v3-outline-btn">
              <span>Entrar</span>
              <ArrowRight size={15} strokeWidth={2.4} />
            </button>
          </form>

          {/* Footer */}
          <div style={{ marginTop: 32 }}>
            <div className="divider-line" style={{ marginBottom: 16 }}>
              <span style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: 10,
                color: 'rgba(255,255,255,0.15)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.5px',
              }}>
                FIPS © {new Date().getFullYear()}
              </span>
            </div>
            <p style={{
              textAlign: 'center',
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 11,
              color: 'rgba(255,255,255,0.18)',
              margin: 0,
            }}>
              Ferrovia Interna do Porto de Santos
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* ╔══════════════════════════════════════════════════════════════╗
        ║  SEPARADOR v1 → v2                                         ║
        ╚══════════════════════════════════════════════════════════════╝ */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: 24,
      padding: '64px 48px',
      background: 'var(--color-surface-muted)',
    }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,75,155,0.18), transparent)' }} />
      <span style={{
        fontFamily: "'Saira Expanded', sans-serif",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '3px',
        color: 'rgba(0,75,155,0.35)',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}>
        Login v2 — Card centralizado
      </span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,75,155,0.18), transparent)' }} />
    </div>

    {/* ╔══════════════════════════════════════════════════════════════╗
        ║  LOGIN v2 — Viewport único, sem scroll                     ║
        ╚══════════════════════════════════════════════════════════════╝ */}
    <div style={{
      position: 'relative',
      height: 'calc(100svh - 120px)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Imagem Nossa Essência — escalada pra caber inteira no topo */}
      <div style={{
        flex: '0 0 85%',
        position: 'relative',
        background: '#002A68',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <img
          src="/backgrounds/nossa-essencia.png"
          alt=""
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center center',
          }}
        />
      </div>

      {/* Azul escuro preenchendo o resto */}
      <div style={{
        flex: 1,
        background: '#002A68',
      }} />

      {/* Card glassmorphism com form */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -35%)',
        zIndex: 10,
        width: 340,
        padding: '36px 32px',
        borderRadius: 22,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 100%)',
        border: 'none',
        borderImage: 'initial',
        outline: '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(12px) brightness(1.15) saturate(0.4)',
        WebkitBackdropFilter: 'blur(12px) brightness(1.15) saturate(0.4)',
        boxShadow: `
          0 20px 40px rgba(0,0,0,0.18),
          0 0 0 0.5px rgba(255,255,255,0.15),
          inset 0 1px 1px rgba(255,255,255,0.25),
          inset 0 -1px 1px rgba(0,0,0,0.08),
          inset 40px -40px 80px rgba(255,255,255,0.02)
        `,
        overflow: 'hidden' as const,
      }}>
        <style>{`
          .v2-field-wrap {
            position:relative;
            display:flex;
            align-items:center;
            gap:12px;
            height:40px;
            padding:0 14px;
            border-radius:12px;
            background:rgba(255,255,255,0.04);
            border:1.5px solid rgba(255,255,255,0.08);
            transition:all 0.3s cubic-bezier(0.22,1,0.36,1);
          }
          .v2-field-wrap:focus-within {
            background:rgba(255,255,255,0.07);
            border-color:rgba(253,194,78,0.40);
            box-shadow:0 0 0 3px rgba(253,194,78,0.06);
          }
          .v2-field-wrap .v2-icon {
            color:rgba(255,255,255,0.20);
            transition:all 0.3s;
            flex-shrink:0;
          }
          .v2-field-wrap:focus-within .v2-icon {
            color:#FDC24E;
            filter:drop-shadow(0 0 6px rgba(253,194,78,0.30));
          }
          .v2-field-wrap input {
            flex:1; background:transparent; border:none; outline:none;
            color:rgba(255,255,255,0.90);
            font-size:14px; font-family:'Open Sans',sans-serif;
            font-weight:400; min-width:0;
          }
          .v2-field-wrap input::placeholder { color:rgba(255,255,255,0.22); font-weight:300; }
          .v2-field-wrap input:-webkit-autofill,
          .v2-field-wrap input:-webkit-autofill:hover,
          .v2-field-wrap input:-webkit-autofill:focus {
            -webkit-box-shadow:0 0 0 50px transparent inset !important;
            -webkit-text-fill-color:rgba(255,255,255,0.90) !important;
            caret-color:#fff; transition:background-color 5000s ease-in-out 0s;
          }
          .v2-field-wrap::after {
            content:''; position:absolute; bottom:-1.5px; left:50%;
            height:2px; width:0;
            background:linear-gradient(90deg, transparent, #FDC24E, #F6921E, #FDC24E, transparent);
            border-radius:2px; transition:all 0.4s cubic-bezier(0.22,1,0.36,1);
            transform:translateX(-50%);
          }
          .v2-field-wrap:focus-within::after { width:80%; }
          .v2-btn {
            display:flex; align-items:center; justify-content:center; gap:10px;
            width:100%; height:48px; padding:0 24px;
            background:linear-gradient(135deg, #FDC24E 0%, #F6921E 100%);
            border:none; border-radius:12px;
            color:#001430; font-size:15px; font-weight:700;
            font-family:'Saira Expanded',sans-serif;
            letter-spacing:0.5px; cursor:pointer;
            position:relative; overflow:hidden;
            transition:all 0.3s ease;
            box-shadow:0 4px 16px rgba(246,146,30,0.25);
          }
          .v2-btn:hover {
            transform:translateY(-2px);
            box-shadow:0 8px 28px rgba(246,146,30,0.35);
          }
          .v2-btn:active { transform:translateY(0); }
          .v2-btn::before {
            content:''; position:absolute; inset:0;
            background:linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%);
            transform:translateX(-100%);
            animation: v2shimmer 2.5s ease-in-out infinite;
          }
          @keyframes v2shimmer {
            0% { transform:translateX(-100%); }
            60% { transform:translateX(100%); }
            100% { transform:translateX(100%); }
          }
          .v2-lbl {
            display:flex; align-items:center; gap:7px;
            font-family:'Open Sans',sans-serif; font-size:12px; font-weight:500;
            color:rgba(255,255,255,0.45); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;
          }
          .v2-forgot { color:rgba(253,194,78,0.65); font-size:12px; text-decoration:none; font-family:'Open Sans',sans-serif; transition:color 0.2s; }
          .v2-forgot:hover { color:#FDC24E; text-decoration:underline; }
        `}</style>

        {/* Brilho de vidro no topo */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '50%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
          borderRadius: '22px 22px 0 0',
          pointerEvents: 'none',
        }} />
        {/* Linha de luz no topo */}
        <div style={{
          position: 'absolute',
          top: 0, left: '10%', right: '10%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Título */}
        <h2 style={{
          fontFamily: "'Saira Expanded', sans-serif",
          fontSize: 20, fontWeight: 700, color: '#fff',
          margin: '0 0 4px', textAlign: 'center',
        }}>Acessar sistema</h2>
        <p style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 13, color: 'rgba(255,255,255,0.3)',
          margin: '0 0 28px', textAlign: 'center',
        }}>Identifique-se para continuar</p>

        <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* CS/Email */}
          <div>
            <label className="v2-lbl">CS ou E-mail</label>
            <div className="v2-field-wrap">
              <User size={18} strokeWidth={1.6} className="v2-icon" />
              <input type="text" placeholder="Digite CS ou Email" autoComplete="off" />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="v2-lbl">Senha</label>
            <div className="v2-field-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="v2-icon" style={{ flexShrink: 0 }}>
                <rect x="3" y="11" width="18" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="12" cy="16.5" r="1.5" fill="currentColor" />
              </svg>
              <input
                type={v2ShowPw ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setV2ShowPw(v => !v)}
                style={{
                  background: 'none', border: 'none',
                  color: 'rgba(255,255,255,0.18)', cursor: 'pointer',
                  display: 'flex', padding: 2, transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.18)' }}
              >
                {v2ShowPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Lembrar + Esqueceu */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" className="rail-check" />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.30)', fontFamily: "'Open Sans',sans-serif" }}>Lembrar acesso</span>
            </label>
            <a href="#" onClick={e => e.preventDefault()} className="v2-forgot">Esqueceu a senha?</a>
          </div>

          {/* Botão com shimmer */}
          <button type="submit" className="v2-btn">
            Entrar no sistema
            <ArrowRight size={17} strokeWidth={2.4} />
          </button>
        </form>

        {/* Footer */}
        <div style={{ marginTop: 24 }}>
          <div className="divider-line" style={{ marginBottom: 12 }}>
            <span style={{ fontFamily: "'Open Sans',sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.15)', whiteSpace: 'nowrap', letterSpacing: '0.5px' }}>
              FIPS © {new Date().getFullYear()}
            </span>
          </div>
          <p style={{ textAlign: 'center', fontFamily: "'Open Sans',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.18)', margin: 0 }}>
            Ferrovia Interna do Porto de Santos
          </p>
        </div>
      </div>
    </div>

    {/* ╔══════════════════════════════════════════════════════════════╗
        ║  SEPARADOR v2 → v3                                         ║
        ╚══════════════════════════════════════════════════════════════╝ */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: 24,
      padding: '64px 48px',
      background: 'var(--color-surface-muted)',
    }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,75,155,0.18), transparent)' }} />
      <span style={{
        fontFamily: "'Saira Expanded', sans-serif",
        fontSize: 11, fontWeight: 700, letterSpacing: '3px',
        color: 'rgba(0,75,155,0.35)', textTransform: 'uppercase', whiteSpace: 'nowrap',
      }}>
        Login v3 — Split editorial
      </span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,75,155,0.18), transparent)' }} />
    </div>

    {/* ╔══════════════════════════════════════════════════════════════╗
        ║  LOGIN v3 — Split card, editorial, Dieter Rams              ║
        ╚══════════════════════════════════════════════════════════════╝ */}
    <div style={{
      position: 'relative',
      height: 'calc(100svh - 120px)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <style>{`
        /* ─── V3 Underline inputs ─── */
        .v3-input-group { position:relative; margin-bottom:4px; }
        .v3-input-label {
          position:absolute; top:0; left:0;
          font-family:'Saira Expanded',sans-serif;
          font-size:9px; font-weight:600; letter-spacing:3px;
          text-transform:uppercase;
          color:rgba(255,255,255,0.28);
          transition:all 0.3s cubic-bezier(0.22,1,0.36,1);
          pointer-events:none;
        }
        .v3-input-label.active { color:#FDC24E; }
        .v3-underline-input {
          width:100%; padding:20px 0 8px 0;
          background:transparent; border:none; outline:none;
          border-bottom:1px solid rgba(255,255,255,0.10);
          color:#fff; font-size:15px; font-family:'Open Sans',sans-serif;
          font-weight:400; letter-spacing:0.02em;
          transition:border-color 0.3s;
        }
        .v3-underline-input::placeholder { color:rgba(255,255,255,0.18); font-weight:300; }
        .v3-underline-input:focus { border-bottom-color:transparent; }
        .v3-underline-input:-webkit-autofill,
        .v3-underline-input:-webkit-autofill:hover,
        .v3-underline-input:-webkit-autofill:focus {
          -webkit-box-shadow:0 0 0 50px transparent inset !important;
          -webkit-text-fill-color:#fff !important;
          transition:background-color 5000s ease-in-out 0s;
        }
        /* Animated gold fill line */
        .v3-line-fill {
          position:absolute; bottom:0; left:0; right:0; height:2px;
          overflow:hidden;
        }
        .v3-line-fill::after {
          content:''; display:block; height:100%; width:100%;
          background:linear-gradient(90deg, #F6921E, #FDC24E, #F6921E);
          transform:scaleX(0); transform-origin:center;
          transition:transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .v3-input-group:focus-within .v3-line-fill::after { transform:scaleX(1); }

        /* ─── V3 Outline button ─── */
        .v3-outline-btn {
          position:relative; display:flex; align-items:center; justify-content:center; gap:10px;
          width:100%; height:44px; padding:0 24px;
          background:transparent;
          border:1.5px solid #FDC24E;
          border-radius:6px;
          color:#FDC24E; font-size:13px; font-weight:700;
          font-family:'Saira Expanded',sans-serif;
          letter-spacing:1.5px; text-transform:uppercase;
          cursor:pointer; overflow:hidden;
          transition:all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .v3-outline-btn::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg, #FDC24E, #F6921E);
          transform:scaleX(0); transform-origin:left;
          transition:transform 0.4s cubic-bezier(0.22,1,0.36,1);
          z-index:0;
        }
        .v3-outline-btn:hover::before { transform:scaleX(1); }
        .v3-outline-btn:hover { color:#001430; border-color:#F6921E; }
        .v3-outline-btn span, .v3-outline-btn svg { position:relative; z-index:1; }
        .v3-outline-btn:hover svg { transform:translateX(4px); }
        .v3-outline-btn svg { transition:transform 0.3s ease; }

        /* ─── V3 Track decoration ─── */
        @keyframes v3trainPulse {
          0%,100% { opacity:0.15; }
          50% { opacity:0.35; }
        }
        @keyframes v3slideIn {
          0% { opacity:0; transform:translateX(-20px); }
          100% { opacity:1; transform:translateX(0); }
        }
        @keyframes v3fadeUp {
          0% { opacity:0; transform:translateY(16px); }
          100% { opacity:1; transform:translateY(0); }
        }
      `}</style>

      {/* Imagem Nossa Essência */}
      <div style={{
        flex: '0 0 85%',
        position: 'relative',
        background: '#002A68',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <img
          src="/backgrounds/nossa-essencia.png"
          alt=""
          draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center center' }}
        />
      </div>

      {/* Azul escuro */}
      <div style={{ flex: 1, background: '#002A68' }} />

      {/* ══════ SPLIT CARD ══════ */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -38%)',
        zIndex: 10,
        display: 'flex',
        width: 620,
        minHeight: 360,
        borderRadius: 16,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)',
        outline: '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(14px) brightness(1.12) saturate(0.45)',
        WebkitBackdropFilter: 'blur(14px) brightness(1.12) saturate(0.45)',
        boxShadow: '0 24px 48px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)',
        overflow: 'hidden',
      }}>

        {/* ── LEFT: Branding panel ── */}
        <div style={{
          width: 200,
          flexShrink: 0,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '32px 24px',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}>
          {/* Track line decoration */}
          <svg width="3" height="100%" style={{
            position: 'absolute', left: 12, top: 0,
            animation: 'v3trainPulse 3s ease-in-out infinite',
          }}>
            <line x1="1.5" y1="0" x2="1.5" y2="100%" stroke="#FDC24E" strokeWidth="1.5" strokeDasharray="8 6" />
          </svg>

          {/* Horizontal ties */}
          {[60, 120, 180, 240, 300].map((y) => (
            <svg key={y} width="20" height="3" style={{
              position: 'absolute', left: 4, top: y,
              opacity: 0.12,
            }}>
              <line x1="0" y1="1.5" x2="20" y2="1.5" stroke="#FDC24E" strokeWidth="2" />
            </svg>
          ))}

          <div style={{ position: 'relative', zIndex: 1, animation: mounted ? 'v3slideIn 0.6s ease-out 0.1s both' : 'none' }}>
            <h3 style={{
              fontFamily: "'Saira Expanded', sans-serif",
              fontSize: 22, fontWeight: 800, color: '#fff',
              lineHeight: 1.1, margin: '0 0 12px',
              letterSpacing: '-0.3px',
            }}>
              Gestão<br />
              <span style={{ color: '#FDC24E' }}>ferroviária</span>
            </h3>
            <p style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 11, color: 'rgba(255,255,255,0.30)',
              lineHeight: 1.6, margin: 0,
            }}>
              Porto de Santos<br />
              Sistema integrado
            </p>
          </div>

          {/* Bottom departure-board style info */}
          <div style={{
            position: 'relative', zIndex: 1,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 16,
            animation: mounted ? 'v3fadeUp 0.5s ease-out 0.3s both' : 'none',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              marginBottom: 8,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00C64C', boxShadow: '0 0 8px rgba(0,198,76,0.4)' }} />
              <span style={{
                fontFamily: "'Saira Expanded', sans-serif",
                fontSize: 8, fontWeight: 600, letterSpacing: '1.5px',
                color: 'rgba(255,255,255,0.30)', textTransform: 'uppercase',
              }}>
                Online
              </span>
            </div>
            <span style={{
              fontFamily: "'Saira Expanded', sans-serif",
              fontSize: 9, fontWeight: 500, letterSpacing: '2px',
              color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase',
            }}>
              v0.4.0
            </span>
          </div>
        </div>

        {/* ── RIGHT: Form panel ── */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '36px 36px 28px',
          animation: mounted ? 'v3fadeUp 0.6s ease-out 0.15s both' : 'none',
        }}>
          <h2 style={{
            fontFamily: "'Saira Expanded', sans-serif",
            fontSize: 16, fontWeight: 700, color: '#fff',
            margin: '0 0 2px', letterSpacing: '0.5px',
          }}>
            Acessar sistema
          </h2>
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 12, color: 'rgba(255,255,255,0.25)',
            margin: '0 0 32px',
          }}>
            Identifique-se para continuar
          </p>

          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* CS / Email */}
            <div className="v3-input-group">
              <label className={`v3-input-label ${v3Focused === 'user' ? 'active' : ''}`}>
                CS ou E-mail
              </label>
              <input
                type="text"
                className="v3-underline-input"
                placeholder="servidor@fips.app.br"
                autoComplete="off"
                onFocus={() => setV3Focused('user')}
                onBlur={() => setV3Focused(null)}
              />
              <div className="v3-line-fill" />
            </div>

            {/* Senha */}
            <div className="v3-input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <label className={`v3-input-label ${v3Focused === 'pw' ? 'active' : ''}`}>
                  Senha
                </label>
                <a href="#" onClick={e => e.preventDefault()} style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: 10, color: 'rgba(253,194,78,0.45)',
                  textDecoration: 'none', letterSpacing: '0.3px',
                  transition: 'color 0.2s',
                  position: 'relative', zIndex: 2,
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#FDC24E' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(253,194,78,0.45)' }}
                >
                  Esqueceu?
                </a>
              </div>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={v3ShowPw ? 'text' : 'password'}
                  className="v3-underline-input"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  onFocus={() => setV3Focused('pw')}
                  onBlur={() => setV3Focused(null)}
                  style={{ paddingRight: 36 }}
                />
                <button
                  type="button"
                  onClick={() => setV3ShowPw(v => !v)}
                  style={{
                    position: 'absolute', right: 0, bottom: 8,
                    background: 'none', border: 'none',
                    color: 'rgba(255,255,255,0.15)', cursor: 'pointer',
                    display: 'flex', padding: 2, transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.15)' }}
                >
                  {v3ShowPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <div className="v3-line-fill" />
            </div>

            {/* CTA */}
            <button type="submit" className="v3-outline-btn">
              <span>Entrar</span>
              <ArrowRight size={15} strokeWidth={2.4} />
            </button>
          </form>

          {/* Footer */}
          <p style={{
            fontFamily: "'Saira Expanded', sans-serif",
            fontSize: 8, fontWeight: 500, letterSpacing: '2.5px',
            color: 'rgba(255,255,255,0.12)', textTransform: 'uppercase',
            textAlign: 'center', marginTop: 24, marginBottom: 0,
          }}>
            FIPS © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>

    {/* ╔══════════════════════════════════════════════════════════════╗
        ║  SEPARADOR v3 → v4                                         ║
        ╚══════════════════════════════════════════════════════════════╝ */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: 24,
      padding: '64px 48px',
      background: 'var(--color-surface-muted)',
    }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,75,155,0.18), transparent)' }} />
      <span style={{
        fontFamily: "'Saira Expanded', sans-serif",
        fontSize: 11, fontWeight: 700, letterSpacing: '3px',
        color: 'rgba(0,75,155,0.35)', textTransform: 'uppercase', whiteSpace: 'nowrap',
      }}>
        Login v4 — Split 50/50
      </span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,75,155,0.18), transparent)' }} />
    </div>

    {/* ╔══════════════════════════════════════════════════════════════╗
        ║  LOGIN v4 — Card split v3 sobre background v1               ║
        ╚══════════════════════════════════════════════════════════════╝ */}
    <div className="relative flex min-h-[calc(100svh-120px)] overflow-hidden">
      {/* Fundo: mesma estrutura da v1 */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(145deg, #001430 0%, #002A68 40%, #00396B 100%)',
      }}>
        <img
          src={BG}
          alt=""
          draggable={false}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.8,
          }}
        />
        {/* Overlay escuro */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(0,20,48,0.55) 0%, rgba(0,42,104,0.45) 50%, rgba(0,20,48,0.55) 100%)',
        }} />
      </div>

      {/* Card split v3 — canto direito */}
      <div style={{
        position: 'relative', zIndex: 10,
        margin: 'auto',
        display: 'flex',
        width: 620,
        minHeight: 360,
        borderRadius: 16,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)',
        outline: '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(14px) brightness(1.12) saturate(0.45)',
        WebkitBackdropFilter: 'blur(14px) brightness(1.12) saturate(0.45)',
        boxShadow: '0 24px 48px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)',
        overflow: 'hidden',
      }}>

        {/* ── LEFT: Branding panel ── */}
        <div style={{
          width: 200, flexShrink: 0, position: 'relative',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '32px 24px',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}>
          <svg width="3" height="100%" style={{
            position: 'absolute', left: 12, top: 0,
            animation: 'v3trainPulse 3s ease-in-out infinite',
          }}>
            <line x1="1.5" y1="0" x2="1.5" y2="100%" stroke="#FDC24E" strokeWidth="1.5" strokeDasharray="8 6" />
          </svg>
          {[60, 120, 180, 240, 300].map((y) => (
            <svg key={y} width="20" height="3" style={{ position: 'absolute', left: 4, top: y, opacity: 0.12 }}>
              <line x1="0" y1="1.5" x2="20" y2="1.5" stroke="#FDC24E" strokeWidth="2" />
            </svg>
          ))}

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{
              fontFamily: "'Saira Expanded', sans-serif",
              fontSize: 22, fontWeight: 800, color: '#fff',
              lineHeight: 1.1, margin: '0 0 12px', letterSpacing: '-0.3px',
            }}>
              Gestão<br />
              <span style={{ color: '#FDC24E' }}>ferroviária</span>
            </h3>
            <p style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 11, color: 'rgba(255,255,255,0.30)',
              lineHeight: 1.6, margin: 0,
            }}>
              Porto de Santos<br />
              Sistema integrado
            </p>
          </div>

          <div style={{
            position: 'relative', zIndex: 1,
            borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00C64C', boxShadow: '0 0 8px rgba(0,198,76,0.4)' }} />
              <span style={{
                fontFamily: "'Saira Expanded', sans-serif",
                fontSize: 8, fontWeight: 600, letterSpacing: '1.5px',
                color: 'rgba(255,255,255,0.30)', textTransform: 'uppercase',
              }}>Online</span>
            </div>
            <span style={{
              fontFamily: "'Saira Expanded', sans-serif",
              fontSize: 9, fontWeight: 500, letterSpacing: '2px',
              color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase',
            }}>v0.4.0</span>
          </div>
        </div>

        {/* ── RIGHT: Form panel ── */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '36px 36px 28px',
        }}>
          <h2 style={{
            fontFamily: "'Saira Expanded', sans-serif",
            fontSize: 16, fontWeight: 700, color: '#fff',
            margin: '0 0 2px', letterSpacing: '0.5px',
          }}>Acessar sistema</h2>
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 12, color: 'rgba(255,255,255,0.25)',
            margin: '0 0 32px',
          }}>Identifique-se para continuar</p>

          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="v3-input-group">
              <label className={`v3-input-label ${v4Focused === 'user' ? 'active' : ''}`}>CS ou E-mail</label>
              <input type="text" className="v3-underline-input" placeholder="servidor@fips.app.br" autoComplete="off"
                onFocus={() => setV4Focused('user')} onBlur={() => setV4Focused(null)} />
              <div className="v3-line-fill" />
            </div>

            <div className="v3-input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <label className={`v3-input-label ${v4Focused === 'pw' ? 'active' : ''}`}>Senha</label>
                <a href="#" onClick={e => e.preventDefault()} style={{
                  fontFamily: "'Open Sans', sans-serif", fontSize: 10, color: 'rgba(253,194,78,0.45)',
                  textDecoration: 'none', transition: 'color 0.2s', position: 'relative', zIndex: 2,
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#FDC24E' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(253,194,78,0.45)' }}
                >Esqueceu?</a>
              </div>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input type={v4ShowPw ? 'text' : 'password'} className="v3-underline-input" placeholder="••••••••"
                  autoComplete="new-password" style={{ paddingRight: 36 }}
                  onFocus={() => setV4Focused('pw')} onBlur={() => setV4Focused(null)} />
                <button type="button" onClick={() => setV4ShowPw(v => !v)}
                  style={{ position: 'absolute', right: 0, bottom: 8, background: 'none', border: 'none',
                    color: 'rgba(255,255,255,0.15)', cursor: 'pointer', display: 'flex', padding: 2, transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.15)' }}
                >
                  {v4ShowPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <div className="v3-line-fill" />
            </div>

            <button type="submit" className="v3-outline-btn">
              <span>Entrar</span>
              <ArrowRight size={15} strokeWidth={2.4} />
            </button>
          </form>

          <p style={{
            fontFamily: "'Saira Expanded', sans-serif",
            fontSize: 8, fontWeight: 500, letterSpacing: '2.5px',
            color: 'rgba(255,255,255,0.12)', textTransform: 'uppercase',
            marginTop: 24, marginBottom: 0,
          }}>
            FIPS © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  </>
  )
}
