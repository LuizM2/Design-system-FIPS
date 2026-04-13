import { useState } from 'react'
import { Eye, EyeOff, LogIn, Lock, User } from 'lucide-react'

const HOME_BACKGROUND = '/backgrounds/app-shell-home-trains.png'

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false)

  return (
    <div className="relative flex min-h-[calc(100svh-120px)] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HOME_BACKGROUND} alt="" className="h-full w-full object-cover object-center" draggable={false} />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <style>{`
        @keyframes fadeUp {
          0% { opacity:0; transform:translateY(12px); }
          100% { opacity:1; transform:translateY(0); }
        }

        /* Card principal — glass ESCURO */
        .gm-card {
          position:relative;
          width:400px;
          border-radius:20px;
          padding:40px 32px 32px;
          animation: fadeUp 0.6s ease-out forwards;
          z-index:10;

          background: rgba(20,20,30,0.55);
          backdrop-filter: blur(20px) saturate(1.3);
          -webkit-backdrop-filter: blur(20px) saturate(1.3);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 16px 48px rgba(0,0,0,0.35);
        }

        /* Inputs — glass CLARO */
        .gm-input-wrap {
          display:flex;
          align-items:center;
          gap:12px;
          height:48px;
          padding:0 14px;
          border-radius:12px;

          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.10);
          transition: all 0.3s ease;
        }
        .gm-input-wrap:focus-within {
          background: rgba(255,255,255,0.09);
          border-color: rgba(253,194,78,0.45);
          box-shadow: 0 0 0 3px rgba(253,194,78,0.10), 0 0 16px rgba(253,194,78,0.06);
        }
        .gm-input-wrap input {
          flex:1;
          background:transparent;
          border:none;
          outline:none;
          color:#fff;
          font-size:14px;
          font-family:'Open Sans',sans-serif;
          min-width:0;
        }
        .gm-input-wrap input::placeholder {
          color:rgba(255,255,255,0.40);
        }
        .gm-icon { color:rgba(255,255,255,0.30); flex-shrink:0; transition:color 0.3s; }
        .gm-input-wrap:focus-within .gm-icon { color:rgba(253,194,78,0.65); }

        /* Botão — glass claro com destaque */
        .gm-btn {
          width:100%;
          height:48px;
          border-radius:12px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color:#fff;
          font-family:'Saira Expanded',sans-serif;
          font-size:14px;
          font-weight:600;
          cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:8px;
          transition:all 0.25s;
        }
        .gm-btn:hover {
          background: rgba(255,255,255,0.20);
          border-color: rgba(255,255,255,0.25);
          transform:translateY(-1px);
        }

        .gm-btn-alt {
          flex:1;
          height:42px;
          border-radius:10px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.07);
          color:rgba(255,255,255,0.50);
          font-family:'Open Sans',sans-serif;
          font-size:12px;
          cursor:pointer;
          transition:all 0.25s;
        }
        .gm-btn-alt:hover {
          background: rgba(255,255,255,0.14);
          color:rgba(255,255,255,0.75);
        }

        .pw-toggle {
          background:none; border:none;
          color:rgba(255,255,255,0.25);
          cursor:pointer; padding:2px; display:flex;
          transition:color 0.2s;
        }
        .pw-toggle:hover { color:rgba(255,255,255,0.50); }

        .gm-link {
          color:rgba(255,255,255,0.35);
          font-size:11.5px;
          text-decoration:none;
          font-family:'Open Sans',sans-serif;
          transition:color 0.2s;
        }
        .gm-link:hover { color:rgba(255,255,255,0.60); }

        .gm-check {
          appearance:none; -webkit-appearance:none;
          width:14px; height:14px;
          border-radius:3px;
          border:1px solid rgba(255,255,255,0.20);
          background:rgba(255,255,255,0.06);
          cursor:pointer; flex-shrink:0;
          position:relative;
        }
        .gm-check:checked {
          background:rgba(255,255,255,0.20);
          border-color:rgba(255,255,255,0.40);
        }
        .gm-check:checked::after {
          content:'✓'; position:absolute;
          top:-2px; left:1.5px;
          font-size:10px; color:#fff;
        }

        .gm-divider {
          display:flex; align-items:center; gap:12px;
        }
        .gm-divider::before, .gm-divider::after {
          content:''; flex:1; height:1px;
          background:rgba(255,255,255,0.08);
        }
      `}</style>

      <div className="gm-card">
        {/* Logo centralizada maior */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <img
            src="/appfips-logo.png"
            alt="App FIPS"
            style={{ height:64, objectFit:'contain', display:'block', margin:'0 auto 12px' }}
          />
          <p style={{
            fontFamily:"'Open Sans',sans-serif",
            fontSize:12, color:'rgba(255,255,255,0.30)',
            margin:0,
          }}>
            Ferrovia Interna do Porto de Santos
          </p>
        </div>

        {/* Inputs */}
        <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:14 }}>
          <div className="gm-input-wrap">
            <User size={16} strokeWidth={1.8} className="gm-icon" />
            <input type="text" placeholder="CPF ou matrícula" autoComplete="username" />
          </div>
          <div className="gm-input-wrap">
            <Lock size={16} strokeWidth={1.8} className="gm-icon" />
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="Senha"
              autoComplete="current-password"
            />
            <button type="button" className="pw-toggle" onClick={() => setShowPw(v => !v)}>
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Remember + forgot */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
          <label style={{ display:'flex', alignItems:'center', gap:7, cursor:'pointer' }}>
            <input type="checkbox" className="gm-check" />
            <span className="gm-link">Lembrar acesso</span>
          </label>
          <a href="#" onClick={e => e.preventDefault()} className="gm-link">Esqueceu a senha?</a>
        </div>

        {/* Botão */}
        <button type="button" className="gm-btn" style={{ marginBottom:20 }}>
          <LogIn size={16} strokeWidth={2.2} />
          Entrar
        </button>

        {/* Divider */}
        <div className="gm-divider" style={{ marginBottom:14 }}>
          <span style={{ fontFamily:"'Open Sans',sans-serif", fontSize:10.5, color:'rgba(255,255,255,0.18)', whiteSpace:'nowrap' }}>
            ou continue com
          </span>
        </div>

        {/* Alt buttons */}
        <div style={{ display:'flex', gap:10 }}>
          <button type="button" className="gm-btn-alt">Microsoft</button>
          <button type="button" className="gm-btn-alt">SSO</button>
        </div>
      </div>
    </div>
  )
}
