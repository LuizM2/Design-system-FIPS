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

  useEffect(() => {
    setMounted(true)
    const t = setInterval(() => setSignalStep(s => (s + 1) % 4), 1200)
    return () => clearInterval(t)
  }, [])

  return (
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
          width:50%;
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
          width:50%;
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
          inset:-40%;
          background:url('${BG}') center center / 180% auto no-repeat;
        }
        .login-right::after {
          content:'';
          position:absolute;
          inset:0;
          background: linear-gradient(135deg, rgba(0,20,48,0.92) 0%, rgba(0,42,104,0.88) 50%, rgba(0,20,48,0.94) 100%);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
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
        .rail-input {
          position:relative;
          display:flex;
          align-items:center;
          gap:12px;
          height:42px;
          padding:0 14px;
          border-radius:10px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.08);
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .rail-input:focus-within {
          background: rgba(255,255,255,0.07);
          border-color: rgba(253,194,78,0.40);
          box-shadow:
            0 0 0 4px rgba(253,194,78,0.06),
            0 0 24px rgba(253,194,78,0.05),
            inset 0 0 20px rgba(253,194,78,0.02);
        }
        .rail-input .icon {
          color: rgba(255,255,255,0.20);
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
        }
        .rail-input input::placeholder {
          color: rgba(255,255,255,0.22);
          font-weight:300;
        }

        /* Linha dourada animada abaixo do input focado */
        .rail-input::after {
          content:'';
          position:absolute;
          bottom:-1.5px;
          left:50%;
          height:2px;
          width:0;
          background: linear-gradient(90deg, transparent, #FDC24E, #F6921E, #FDC24E, transparent);
          border-radius:2px;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          transform:translateX(-50%);
        }
        .rail-input:focus-within::after {
          width:80%;
        }

        /* Label flutuante */
        .rail-label {
          font-family:'Saira Expanded',sans-serif;
          font-size:10px;
          font-weight:600;
          letter-spacing:2px;
          text-transform:uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom:6px;
          display:block;
          transition: color 0.3s;
        }
        .rail-label.active {
          color: rgba(253,194,78,0.70);
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
          <img
            src="/appfips-logo.png"
            alt="App FIPS"
            style={{ height: 56, objectFit: 'contain', marginBottom: 32 }}
          />

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

          {/* 5 Princípios FIPS */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 12,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 24,
          }}>
            <span style={{
              fontFamily: "'Saira Expanded', sans-serif",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '2px',
              color: 'rgba(255,255,255,0.22)',
              textTransform: 'uppercase',
              marginBottom: 4,
            }}>
              Nossos princípios
            </span>
            {[
              { icon: '🔗', title: 'Consistência', desc: 'Mesma experiência em todos os aplicativos' },
              { icon: '♿', title: 'Acessibilidade', desc: 'WCAG AA, foco visível, toque mínimo 42px' },
              { icon: '⚡', title: 'Eficiência', desc: 'Componentes prontos, menos tempo projetando' },
              { icon: '🛤️', title: 'Identidade Ferroviária', desc: 'Cada tela carrega a identidade da FIPS' },
              { icon: '🔒', title: 'Segurança', desc: 'Proteção de dados e controle de acesso' },
            ].map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '8px 12px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                animation: mounted ? `fadeIn 0.4s ease-out ${0.4 + i * 0.1}s both` : 'none',
              }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{p.icon}</span>
                <div>
                  <div style={{
                    fontFamily: "'Saira Expanded', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.70)',
                    lineHeight: 1.2,
                  }}>
                    {p.title}
                  </div>
                  <div style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.28)',
                    lineHeight: 1.3,
                    marginTop: 1,
                  }}>
                    {p.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ RIGHT — Login ══════ */}
      <div className="login-right">
        <div className="relative z-10" style={{
          animation: mounted ? 'slideInRight 0.7s ease-out 0.2s both' : 'none',
        }}>
          {/* Segurança badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 20,
            background: 'rgba(0,198,76,0.08)',
            border: '1px solid rgba(0,198,76,0.15)',
            marginBottom: 32,
          }}>
            <Shield size={13} color="#00C64C" />
            <span style={{
              fontFamily: "'Saira Expanded', sans-serif",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '1.5px',
              color: '#00C64C',
              textTransform: 'uppercase',
            }}>
              Conexão segura
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Saira Expanded', sans-serif",
            fontSize: 24,
            fontWeight: 700,
            color: '#fff',
            margin: '0 0 6px',
            letterSpacing: '0.02em',
          }}>
            Acessar sistema
          </h2>
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 13,
            color: 'rgba(255,255,255,0.32)',
            margin: '0 0 28px',
          }}>
            Identifique-se para continuar
          </p>

          {/* ── Tabs Interno / Externo ── */}
          <div className="login-tabs">
            <button
              type="button"
              className={`login-tab ${tab === 'interno' ? 'active' : ''}`}
              onClick={() => setTab('interno')}
            >
              <User size={15} className="tab-icon" />
              Interno
            </button>
            <button
              type="button"
              className={`login-tab ${tab === 'externo' ? 'active' : ''}`}
              onClick={() => setTab('externo')}
            >
              <Globe size={15} className="tab-icon" />
              Externo
            </button>
          </div>

          {/* Hint contextual */}
          <div className="tab-hint">
            <Shield size={13} color="rgba(253,194,78,0.5)" style={{ flexShrink: 0 }} />
            <span>
              {tab === 'interno'
                ? 'Use seu Código de Servidor (CS) ou E-mail'
                : 'Use seu CPF para acessar como colaborador externo'}
            </span>
          </div>

          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Campo dinâmico por tab */}
            <div>
              <label className={`rail-label ${focused === 'user' ? 'active' : ''}`}>
                {tab === 'interno' ? 'CS ou E-mail' : 'CPF'}
              </label>
              <div className="rail-input">
                {tab === 'interno' ? (
                  <User size={18} strokeWidth={1.6} className="icon" />
                ) : (
                  <Fingerprint size={18} strokeWidth={1.6} className="icon" />
                )}
                <input
                  type="text"
                  placeholder={tab === 'interno' ? 'Digite CS ou Email' : '000.000.000-00'}
                  onFocus={() => setFocused('user')}
                  onBlur={() => setFocused(null)}
                  autoComplete="username"
                  key={tab}
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
            <button type="submit" className="rail-cta">
              Entrar no sistema
              <ArrowRight size={18} strokeWidth={2.4} />
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
  )
}
