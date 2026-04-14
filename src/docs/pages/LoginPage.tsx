// @ts-nocheck
import { useState, useEffect } from 'react'
import { Eye, EyeOff, ArrowRight, User, CheckCircle2 } from 'lucide-react'

const BG = '/backgrounds/app-shell-home-trains.png'

/* ═══════════════════════════════════════════ TOKENS ═══════════════════════════════════════════ */
const C={azulProfundo:"#004B9B",azulEscuro:"#002A68",azulClaro:"#658EC9",cinzaChumbo:"#7B8C96",cinzaEscuro:"#333B41",cinzaClaro:"#C0CCD2",azulCeu:"#93BDE4",azulCeuClaro:"#D3E3F4",amareloOuro:"#FDC24E",amareloEscuro:"#F6921E",verdeFloresta:"#00C64C",verdeEscuro:"#00904C",danger:"#DC3545",neutro:"#E8EBFF",branco:"#FFFFFF",bg:"#F2F4F8",cardBg:"#FFFFFF",cardBorder:"#E2E8F0",textMuted:"#64748B",textLight:"#94A3B8"};
const Fn={title:"'Saira Expanded',sans-serif",body:"'Open Sans',sans-serif",mono:"'Fira Code',monospace"};

/* ═══════════════════════════════════════════ ICONS ═══════════════════════════════════════════ */
const Ic={
  grid:(s=14,c=C.amareloOuro)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="11" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="2" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="11" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/></svg>,
};

function JunctionLines({style}:{style?:React.CSSProperties}){return <svg viewBox="0 0 320 200" fill="none" style={{opacity:.12,...style}}><path d="M0 60H100C120 60 120 60 140 40L200 40H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 60H100C120 60 120 60 140 80L200 80H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 120H60C80 120 80 120 100 100L160 100H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 120H60C80 120 80 120 100 140L160 140H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/></svg>}

/* ═══════════════════════════════════════════ LAYOUT ═══════════════════════════════════════════ */
function Section({n,title,desc,children}:{n:string;title:string;desc:string;children:React.ReactNode}){return(<section style={{marginBottom:44}}><div style={{fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:C.azulClaro,fontFamily:Fn.title,marginBottom:6}}>{n}</div><h2 style={{fontSize:20,fontWeight:700,color:C.azulEscuro,margin:"0 0 4px",fontFamily:Fn.title,letterSpacing:".5px"}}>{title}</h2><p style={{fontSize:14,color:C.cinzaChumbo,margin:"0 0 20px",lineHeight:1.55,fontFamily:Fn.body}}>{desc}</p>{children}</section>)}
function DSCard({children,s,mob:m}:{children:React.ReactNode;s?:React.CSSProperties;mob?:boolean}){return(<div style={{background:C.cardBg,borderRadius:"12px 12px 12px 24px",border:`1px solid ${C.cardBorder}`,padding:m?16:28,boxShadow:"0 1px 3px rgba(0,75,155,.04),0 4px 14px rgba(0,75,155,.03)",...s}}>{children}</div>)}
function TokenRow({label,value,color}:{label:string;value:string;color?:string}){return(<div style={{display:"flex",alignItems:"center",gap:10,fontSize:12,fontFamily:Fn.body}}>{color&&<div style={{width:16,height:16,borderRadius:4,background:color,border:`1px solid ${C.cardBorder}`,flexShrink:0}}/>}<span style={{color:C.cinzaChumbo,minWidth:130}}>{label}</span><code style={{background:C.neutro,padding:"2px 8px",borderRadius:4,fontSize:11,fontFamily:Fn.mono,color:C.cinzaEscuro}}>{value}</code></div>)}

const gc={background:C.cardBg,border:`1px solid ${C.cardBorder}`,borderRadius:"10px 10px 10px 18px",overflow:"hidden"};
const gh={padding:"16px 20px",background:C.bg,borderBottom:`1px solid ${C.cardBorder}`,display:"flex",alignItems:"center",gap:12};
const gb={padding:"16px 20px 20px"};
const gl={fontSize:10,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase" as const,color:C.azulClaro,fontFamily:Fn.title,marginBottom:4,marginTop:12};
const gt={fontSize:13,color:C.cinzaEscuro,lineHeight:1.55,margin:0,fontFamily:Fn.body};

/* ═══════════════════════════════════════════ SIGNAL DOT ═══════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════ MAIN ═══════════════════════════════════════════ */
export default function LoginPage(){
  const [w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h)},[]);
  const mob=w<640;

  /* ── Login v1 state ── */
  const [showPw, setShowPw] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [csEmail, setCsEmail] = useState('')
  const csEmailValid = csEmail.length === 6 || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(csEmail)
  const [mounted, setMounted] = useState(false)
  const [signalStep, setSignalStep] = useState(0)

  useEffect(() => {
    setMounted(true)
    const t = setInterval(() => setSignalStep(s => (s + 1) % 4), 1200)
    return () => clearInterval(t)
  }, [])

  /* ── Shared login CSS (used in both playground + mobile) ── */
  const loginStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Saira+Expanded:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

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
    @keyframes stationPulse {
      0%, 100% { box-shadow: 0 0 6px rgba(253,194,78,0.4), 0 0 12px rgba(253,194,78,0.15); }
      50% { box-shadow: 0 0 10px rgba(253,194,78,0.7), 0 0 20px rgba(253,194,78,0.3); }
    }
    @keyframes stationReveal {
      0% { opacity: 0; transform: translateX(-12px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes railShimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }

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
    @media (max-width: 768px) {
      .login-v1-container {
        flex-direction: column !important;
        min-height: 100svh !important;
      }
      .login-left {
        width: 100% !important;
        padding: 32px 24px !important;
        align-items: flex-start !important;
      }
      .login-right {
        width: 100% !important;
        padding: 32px 24px !important;
        min-height: 0 !important;
      }
      .login-right .liquid-card {
        max-width: 100% !important;
        padding: 28px 20px !important;
        border-radius: 20px !important;
      }
    }
    @media (max-width: 480px) {
      .login-left {
        padding: 24px 18px !important;
      }
      .login-right {
        padding: 24px 18px !important;
      }
    }
    .login-right::before {
      content:'';
      position:absolute;
      inset:0;
      background:url('${BG}') center 40% / cover no-repeat;
      opacity:0.8;
    }
    .login-right::after {
      content:'';
      position:absolute;
      inset:0;
      background: linear-gradient(135deg, rgba(0,20,48,0.55) 0%, rgba(0,42,104,0.45) 50%, rgba(0,20,48,0.55) 100%);
    }
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
      outline:none !important;
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
    .rail-label {
      font-family:'Saira Expanded',sans-serif;
      font-size:10px;
      font-weight:600;
      letter-spacing:2px;
      text-transform:uppercase;
      color: rgba(255,255,255,0.75);
      margin-bottom:6px;
      display:block;
      transition: color 0.3s;
    }
    .rail-label.active {
      color: #FDC24E;
    }
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
    .rail-link {
      color:rgba(255,255,255,0.65);
      font-size:12px;
      text-decoration:none;
      font-family:'Saira Expanded',sans-serif;
      transition:color 0.2s;
    }
    .rail-link:hover { color:#FDC24E; }
    .rail-check {
      appearance:none; -webkit-appearance:none;
      width:16px; height:16px;
      border-radius:4px;
      border:1.5px solid rgba(255,255,255,0.35);
      background:rgba(255,255,255,0.06);
      cursor:pointer; flex-shrink:0;
      position:relative; transition:all 0.2s;
    }
    .rail-check:checked {
      background: rgba(253,194,78,0.20);
      border-color: rgba(253,194,78,0.50);
    }
    .rail-check:checked::after {
      content:'\\2713'; position:absolute;
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
    .status-bar {
      display:flex;
      align-items:center;
      gap:6px;
      padding:6px 12px;
      border-radius:20px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.06);
    }
  `;

  /* ── Reusable login V1 renderer ── */
  const renderLoginV1 = () => (
    <div className="login-v1-container relative flex" style={{minHeight:'calc(100svh - 120px)',overflow:'hidden'}}>
      {/* LEFT -- Branding */}
      <div className="login-left">
        <svg viewBox="0 0 400 200" fill="none" style={{opacity:0.07,position:'absolute',top:0,right:0,width:500}}>
          <path d="M0 60H120C140 60 140 60 160 40L240 40H400" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          <path d="M0 60H120C140 60 140 60 160 80L240 80H400" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          <path d="M0 140H80C100 140 100 140 120 120L200 120H400" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          <path d="M0 140H80C100 140 100 140 120 160L200 160H400" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 400 200" fill="none" style={{opacity:0.07,position:'absolute',bottom:0,left:0,width:400,transform:'rotate(180deg)'}}>
          <path d="M0 60H120C140 60 140 60 160 40L240 40H400" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          <path d="M0 60H120C140 60 140 60 160 80L240 80H400" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          <path d="M0 140H80C100 140 100 140 120 120L200 120H400" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          <path d="M0 140H80C100 140 100 140 120 160L200 160H400" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        </svg>

        <div className="train-runner">
          <img src="/brand/hero-train-silhouette.svg" alt="" draggable={false} />
        </div>

        <div style={{
          position:'relative',zIndex:10,
          maxWidth: 380,
          animation: mounted ? 'slideInLeft 0.8s ease-out forwards' : 'none',
          opacity: mounted ? 1 : 0,
        }}>
          <h1 style={{
            fontFamily: "'Saira Expanded', sans-serif",
            fontSize: 36, fontWeight: 800, color: '#fff',
            lineHeight: 1.1, margin: '0 0 16px', letterSpacing: '-0.5px',
          }}>
            Excelencia<br />
            <span style={{ color: '#FDC24E' }}>sobre trilhos</span>
          </h1>

          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 15, color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.7, margin: '0 0 16px', maxWidth: 320,
          }}>
            Sistema integrado da Ferrovia Interna do Porto de Santos.
            Gestao ferroviaria com precisao e seguranca.
          </p>

          {/* Train route - Principios FIPS */}
          <div style={{
            height: 440, overflow: 'hidden',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 16, position: 'relative',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 14, paddingLeft: 4, paddingRight: 4,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 14, height: 2.5, borderRadius: 2,
                  background: 'linear-gradient(90deg, #FDC24E, #F6921E)',
                }} />
                <span style={{
                  fontFamily: "'Saira Expanded', sans-serif",
                  fontSize: 7, fontWeight: 700, letterSpacing: '2px',
                  color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase',
                }}>
                  Rota dos principios
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <SignalDot color="#FF4D4D" active={signalStep >= 1} delay={0} />
                <SignalDot color="#FDC24E" active={signalStep >= 2} delay={100} />
                <SignalDot color="#00C64C" active={signalStep >= 3} delay={200} />
                <span style={{
                  fontFamily: "'Saira Expanded', sans-serif",
                  fontSize: 6, fontWeight: 600, letterSpacing: '1px',
                  color: 'rgba(255,255,255,0.22)', marginLeft: 2, textTransform: 'uppercase',
                }}>Ativo</span>
              </div>
            </div>

            <div style={{ position: 'relative', paddingLeft: 32 }}>
              <div style={{
                position: 'absolute', left: 9, top: 0, bottom: 0, width: 2,
                background: 'repeating-linear-gradient(180deg, #FDC24E 0px, #FDC24E 8px, transparent 8px, transparent 14px)',
                opacity: 0.5,
              }} />
              {[28, 62, 96, 130, 164, 198, 232, 266, 300].map((y, i) => (
                <div key={i} style={{
                  position: 'absolute', left: 2, top: y, width: 16, height: 2,
                  background: '#FDC24E', opacity: 0.12, borderRadius: 1,
                }} />
              ))}
              {[
                { name: 'Eficiencia', desc: 'A busca pela eficiencia, com responsabilidade, deve estar presente em nosso dia a dia.', color: '#00C64C' },
                { name: 'Pessoas', desc: 'Pessoas engajadas e um ambiente de trabalho saudavel sao o alicerce para bons resultados duradouros.', color: '#FDC24E' },
                { name: 'Integridade', desc: 'Respeitar as pessoas e cumprir os compromissos assumidos e essencial para relacionamentos duradouros.', color: '#F6921E' },
                { name: 'Colaboracao', desc: 'Trabalho em conjunto, com empatia, para alcancar o melhor resultado para todos.', color: '#00C64C' },
                { name: 'Seguranca', desc: 'A seguranca das pessoas e prioridade sobre qualquer outro tema.', color: '#FF4D4D' },
              ].map((station, i) => (
                <div key={station.name} style={{
                  position: 'relative',
                  marginBottom: i < 4 ? 28 : 0,
                  animation: mounted ? `stationReveal 0.4s ease-out ${0.3 + i * 0.12}s both` : 'none',
                }}>
                  <div style={{
                    position: 'absolute', left: -28, top: 2, width: 12, height: 12, borderRadius: '50%',
                    background: `radial-gradient(circle at 40% 35%, ${station.color}, ${station.color}88 60%, transparent 100%)`,
                    boxShadow: `0 0 8px ${station.color}80, 0 0 16px ${station.color}30`,
                    animation: `stationPulse 2.5s ease-in-out ${i * 0.5}s infinite`,
                  }} />
                  <div style={{
                    position: 'absolute', left: -30, top: 0, width: 16, height: 16, borderRadius: '50%',
                    border: `1.5px solid ${station.color}40`, pointerEvents: 'none',
                  }} />
                  <div style={{
                    position: 'absolute', left: -12, top: 8, width: 8, height: 1,
                    background: `${station.color}50`,
                  }} />
                  <div style={{
                    fontFamily: "'Saira Expanded', sans-serif",
                    fontSize: 11, fontWeight: 700, color: station.color,
                    letterSpacing: '0.3px', lineHeight: 1.2,
                  }}>
                    {station.name}
                  </div>
                  <div style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: 9, color: 'rgba(255,255,255,0.25)',
                    lineHeight: 1.45, marginTop: 3, maxWidth: 220,
                  }}>
                    {station.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT -- Login form */}
      <div className="login-right">
        <div className="liquid-card" style={{
          position:'relative',zIndex:10,
          animation: mounted ? 'slideInRight 0.7s ease-out 0.2s both' : 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          width: '100%', maxWidth: 380, margin: '0 auto',
          padding: '36px 32px', borderRadius: 28,
          background: 'linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          backdropFilter: 'blur(4px) saturate(35%) brightness(1.18)',
          WebkitBackdropFilter: 'blur(4px) saturate(35%) brightness(1.18)',
          border: '0.5px solid rgba(255,255,255,0.10)',
          borderTop: '0.5px solid rgba(255,255,255,0.22)',
          boxShadow: 'inset 0 0.5px 0 0 rgba(255,255,255,0.20), 0 12px 32px rgba(0,0,0,0.12)',
          gap: 10,
        }}>
          <img src="/appfips-logo.png" alt="App FIPS" style={{ height: 64, objectFit: 'contain', marginBottom: 2 }} />
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className={`rail-label ${focused === 'user' ? 'active' : ''}`}>
                CS ou E-mail
              </label>
              <div className="rail-input">
                <User size={18} strokeWidth={1.6} className="icon" />
                <input
                  type="text"
                  placeholder="Digite CS ou Email"
                  value={csEmail}
                  onChange={e => setCsEmail(e.target.value)}
                  onFocus={() => setFocused('user')}
                  onBlur={() => setFocused(null)}
                  autoComplete="username"
                />
                {csEmailValid && csEmail.length > 0 && (
                  <CheckCircle2
                    size={18} strokeWidth={2}
                    style={{
                      color: '#00C64C', flexShrink: 0,
                      filter: 'drop-shadow(0 0 4px rgba(0,198,76,0.40))',
                      transition: 'all 0.3s ease',
                    }}
                  />
                )}
              </div>
            </div>
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
                  placeholder="--------"
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" className="rail-check" />
                <span className="rail-link" style={{ fontSize: 12 }}>Lembrar acesso</span>
              </label>
              <a href="#" onClick={e => e.preventDefault()} className="rail-link">
                Esqueceu a senha?
              </a>
            </div>
            <button type="submit" className="rail-cta">
              <span>Entrar</span>
              <ArrowRight size={15} strokeWidth={2.4} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.bg} 0%,${C.azulCeuClaro}44 50%,${C.bg} 100%)`,fontFamily:Fn.body,color:C.cinzaEscuro}}>
      <style>{loginStyles}</style>

      {/* HEADER */}
      <header style={{background:`linear-gradient(135deg,${C.azulProfundo} 0%,${C.azulEscuro} 100%)`,padding:mob?"32px 20px":"48px 40px 44px",position:"relative",overflow:"hidden"}}>
        <JunctionLines style={{position:"absolute",top:-10,right:-20,width:mob?250:400,height:250}}/>
        <div style={{position:"relative"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${C.branco}10`,border:`1px solid ${C.branco}18`,borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",color:C.amareloOuro,fontFamily:Fn.title,marginBottom:16}}>{Ic.grid(14,C.amareloOuro)} Design System FIPS</div>
          <h1 style={{fontSize:mob?30:44,fontWeight:700,color:C.branco,margin:"0 0 10px",fontFamily:Fn.title}}>Login</h1>
          <p style={{fontSize:16,color:`${C.branco}B0`,lineHeight:1.6,maxWidth:700,margin:0,fontFamily:Fn.body}}>Tela de autenticacao do sistema FIPS. Glassmorphism com liquid glass, validacao CS/Email, inputs ferroviarios e principios FIPS.</p>
        </div>
      </header>

      <div style={{padding:mob?"24px 16px 40px":"36px 40px 60px",maxWidth:1100}}>

        {/* 01 -- PLAYGROUND INTERATIVO */}
        <Section n="01" title="Playground interativo" desc="Login V1 completo com painel de branding a esquerda e formulario liquid glass a direita. Interaja com os inputs, toggle de senha e validacao CS/Email.">
          <DSCard mob={mob} s={{padding:0,overflow:"hidden"}}>
            {renderLoginV1()}
          </DSCard>
        </Section>

        {/* 02 -- VARIANTE MOBILE */}
        <Section n="02" title="Variante Mobile" desc="Visualizacao do login em viewport de 375px. O layout empilha verticalmente com branding compacto acima do formulario.">
          <DSCard mob={mob} s={{display:"flex",justifyContent:"center",background:C.bg}}>
            <div style={{
              width:375,
              maxWidth:"100%",
              borderRadius:16,
              overflow:"hidden",
              border:`1px solid ${C.cardBorder}`,
              boxShadow:"0 4px 24px rgba(0,0,0,.08)",
              background:"#001430",
            }}>
              <div style={{
                display:"flex",flexDirection:"column",minHeight:667,
              }}>
                {/* Mobile left (top) */}
                <div style={{
                  position:"relative",
                  display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",
                  background:"linear-gradient(145deg, #001430 0%, #002A68 40%, #00396B 100%)",
                  overflow:"hidden",padding:"24px 20px",
                }}>
                  <h1 style={{
                    fontFamily:"'Saira Expanded',sans-serif",
                    fontSize:22,fontWeight:800,color:"#fff",lineHeight:1.1,margin:"0 0 8px",
                  }}>
                    Excelencia <span style={{color:"#FDC24E"}}>sobre trilhos</span>
                  </h1>
                  <p style={{
                    fontFamily:"'Open Sans',sans-serif",
                    fontSize:12,color:"rgba(255,255,255,0.40)",lineHeight:1.5,margin:0,maxWidth:300,
                  }}>
                    Sistema integrado da Ferrovia Interna do Porto de Santos.
                  </p>
                </div>

                {/* Mobile right (bottom) */}
                <div style={{
                  flex:1,position:"relative",
                  display:"flex",flexDirection:"column",justifyContent:"center",
                  padding:"24px 20px",overflow:"hidden",
                }}>
                  <div style={{
                    position:"absolute",inset:0,
                    background:`url('${BG}') center 40% / cover no-repeat`,
                    opacity:0.8,
                  }}/>
                  <div style={{
                    position:"absolute",inset:0,
                    background:"linear-gradient(135deg, rgba(0,20,48,0.55) 0%, rgba(0,42,104,0.45) 50%, rgba(0,20,48,0.55) 100%)",
                  }}/>
                  <div style={{
                    position:"relative",zIndex:10,
                    display:"flex",flexDirection:"column",alignItems:"center",
                    width:"100%",maxWidth:340,margin:"0 auto",
                    padding:"28px 20px",borderRadius:20,
                    background:"linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                    backdropFilter:"blur(4px) saturate(35%) brightness(1.18)",
                    WebkitBackdropFilter:"blur(4px) saturate(35%) brightness(1.18)",
                    border:"0.5px solid rgba(255,255,255,0.10)",
                    borderTop:"0.5px solid rgba(255,255,255,0.22)",
                    boxShadow:"inset 0 0.5px 0 0 rgba(255,255,255,0.20), 0 12px 32px rgba(0,0,0,0.12)",
                    gap:8,
                  }}>
                    <img src="/appfips-logo.png" alt="App FIPS" style={{height:48,objectFit:"contain",marginBottom:2}} />
                    <div style={{display:"flex",flexDirection:"column",gap:14,width:"100%"}}>
                      <div>
                        <label style={{fontFamily:"'Saira Expanded',sans-serif",fontSize:9,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.75)",marginBottom:4,display:"block"}}>CS ou E-mail</label>
                        <div style={{display:"flex",alignItems:"center",gap:10,height:38,padding:"0 12px",borderRadius:8,background:"rgba(255,255,255,0.07)",border:"1.5px solid rgba(253,194,78,0.30)"}}>
                          <User size={15} strokeWidth={1.6} style={{color:"rgba(253,194,78,0.50)",flexShrink:0}} />
                          <span style={{fontSize:12,color:"rgba(255,255,255,0.30)",fontFamily:"'Open Sans',sans-serif"}}>Digite CS ou Email</span>
                        </div>
                      </div>
                      <div>
                        <label style={{fontFamily:"'Saira Expanded',sans-serif",fontSize:9,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.75)",marginBottom:4,display:"block"}}>Senha</label>
                        <div style={{display:"flex",alignItems:"center",gap:10,height:38,padding:"0 12px",borderRadius:8,background:"rgba(255,255,255,0.07)",border:"1.5px solid rgba(253,194,78,0.30)"}}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{color:"rgba(253,194,78,0.50)",flexShrink:0}}>
                            <rect x="3" y="11" width="18" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
                            <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            <circle cx="12" cy="16.5" r="1.5" fill="currentColor" />
                          </svg>
                          <span style={{fontSize:12,color:"rgba(255,255,255,0.30)",fontFamily:"'Open Sans',sans-serif"}}>--------</span>
                          <Eye size={14} style={{color:"rgba(255,255,255,0.18)",marginLeft:"auto"}} />
                        </div>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <span style={{fontSize:10,color:"rgba(255,255,255,0.50)",fontFamily:"'Saira Expanded',sans-serif"}}>Lembrar acesso</span>
                        <span style={{fontSize:10,color:"rgba(255,255,255,0.50)",fontFamily:"'Saira Expanded',sans-serif"}}>Esqueceu?</span>
                      </div>
                      <div style={{
                        width:"100%",height:40,borderRadius:10,
                        background:"linear-gradient(135deg, #FDC24E 0%, #F6921E 100%)",
                        display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                        fontFamily:"'Saira Expanded',sans-serif",fontSize:12,fontWeight:700,color:"#002A68",
                      }}>
                        <span>Entrar</span>
                        <ArrowRight size={13} strokeWidth={2.4} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DSCard>
        </Section>

        {/* 03 -- GLASSMORPHISM */}
        <Section n="03" title="Glassmorphism" desc="Os tres modelos (V1, V2, V3) usam vidro fosco. Todos aplicam backdrop-filter: blur() + fundo semi-transparente via rgba() + bordas que simulam reflexo de luz. A diferenca e o grau de transparencia.">
          <DSCard mob={mob}>
            <p style={{fontSize:13,color:C.cinzaEscuro,lineHeight:1.65,margin:"0 0 20px",fontFamily:Fn.body}}>
              Um vidro fosco pode ser quase opaco (V1) ou quase invisivel (V2/V3), mas todos sao glassmorphism.
              O que controla essa variacao e a opacidade do <code style={{fontSize:11,padding:"2px 6px",borderRadius:4,background:C.neutro,fontFamily:Fn.mono}}>rgba()</code> e
              os filtros <code style={{fontSize:11,padding:"2px 6px",borderRadius:4,background:C.neutro,fontFamily:Fn.mono}}>blur</code>, <code style={{fontSize:11,padding:"2px 6px",borderRadius:4,background:C.neutro,fontFamily:Fn.mono}}>brightness</code> e <code style={{fontSize:11,padding:"2px 6px",borderRadius:4,background:C.neutro,fontFamily:Fn.mono}}>saturate</code>.
            </p>

            {/* Comparison grid */}
            <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr 1fr",gap:16,marginBottom:20}}>
              {[
                {tag:"V1 -- Split 50/50",bg:"rgba(0,20,48,0.92)",blur:"blur(2px)",style:"Overlay escuro sobre imagem",card:"Painel direito inteiro",note:"Mais opaco, pouca transparencia. Ideal para foco total no formulario."},
                {tag:"V2 -- Card centralizado",bg:"rgba(255,255,255,0.06-0.14)",blur:"blur(12px) brightness(1.15)",style:"Vidro fosco com reflexo de luz",card:"Flutuante sobre a divisa",note:"Mais transparente, ve-se o fundo. saturate(0.4) neutraliza o azul, brightness clareia."},
                {tag:"V3 -- Split editorial",bg:"rgba(255,255,255,0.03-0.10)",blur:"blur(14px) brightness(1.12)",style:"Vidro fosco + split card",card:"Dois paineis (branding + form)",note:"Similar ao V2 com layout split. saturate(0.45) dessatura o azul. Inputs underline-only."},
              ].map(v=>(
                <div key={v.tag} style={{...gc,borderLeft:`4px solid ${C.amareloEscuro}`}}>
                  <div style={gh}>
                    <span style={{fontSize:10,fontWeight:700,letterSpacing:"2px",color:C.amareloEscuro,fontFamily:Fn.title,textTransform:"uppercase"}}>{v.tag}</span>
                  </div>
                  <div style={gb}>
                    <div style={{fontSize:12,color:C.cinzaEscuro,lineHeight:1.8,fontFamily:Fn.body}}>
                      <div><strong>Fundo:</strong> <code style={{fontSize:11,fontFamily:Fn.mono}}>{v.bg}</code></div>
                      <div><strong>Blur:</strong> <code style={{fontSize:11,fontFamily:Fn.mono}}>{v.blur}</code></div>
                      <div><strong>Estilo:</strong> {v.style}</div>
                      <div><strong>Card:</strong> {v.card}</div>
                      <div style={{marginTop:8,fontSize:11,color:C.cinzaChumbo,fontStyle:"italic"}}>{v.note}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical note */}
            <div style={{
              padding:"12px 16px",borderRadius:8,
              background:`${C.amareloOuro}12`,border:`1px solid ${C.amareloOuro}30`,
              display:"flex",gap:10,alignItems:"center",
            }}>
              <div style={{width:18,height:18,borderRadius:"50%",background:C.amareloEscuro,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{color:C.branco,fontSize:11,fontWeight:700}}>!</span>
              </div>
              <span style={{fontSize:12,color:C.cinzaChumbo,fontFamily:Fn.body}}>
                A diferenca principal e o valor <code style={{fontSize:11,fontFamily:Fn.mono}}>rgba()</code> do background do card.
                Quanto menor a opacidade, mais transparente e mais do fundo aparece.
                O <code style={{fontSize:11,fontFamily:Fn.mono}}>backdrop-filter</code> controla o quao fosco, claro e neutro o vidro fica.
              </span>
            </div>
          </DSCard>
        </Section>

        {/* 04 -- ANATOMIA E COMPORTAMENTO */}
        <Section n="04" title="Anatomia e comportamento" desc="Estrutura visual e regras de comportamento da tela de login.">
          <DSCard mob={mob}>
            <div style={{display:"flex",gap:40,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:280}}>
                <span style={{fontSize:13,fontWeight:700,color:C.azulEscuro,fontFamily:Fn.title,display:"block",marginBottom:12}}>Estrutura</span>
                {[
                  {l:"Card glass",v:"Liquid glass com backdrop-filter + rgba"},
                  {l:"Logo",v:"appfips-logo.png, 64px height, centered"},
                  {l:"Labels",v:"Saira Expanded 600 10px, uppercase, 2px tracking"},
                  {l:"Inputs rail-style",v:"42px height, gold border, shimmer on focus"},
                  {l:"Validation check",v:"CheckCircle2 verde, CS 6 chars ou email regex"},
                  {l:"Toggle password",v:"Eye/EyeOff 16px, hover opacity change"},
                  {l:"Checkbox",v:"16px custom, gold check on checked"},
                  {l:"CTA button",v:"Gold gradient, 44px, Saira 700 13px"},
                  {l:"Principios route",v:"Train route vertical com 5 estacoes animadas"},
                ].map(s=>(
                  <div key={s.l} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:C.azulProfundo,flexShrink:0}}/>
                    <span style={{fontSize:12,fontWeight:600,color:C.cinzaEscuro,fontFamily:Fn.body,minWidth:120}}>{s.l}</span>
                    <span style={{fontSize:11,color:C.cinzaChumbo,fontFamily:Fn.body}}>{s.v}</span>
                  </div>
                ))}
              </div>
              <div style={{flex:1,minWidth:250}}>
                <span style={{fontSize:13,fontWeight:700,color:C.azulEscuro,fontFamily:Fn.title,display:"block",marginBottom:12}}>Comportamento</span>
                {[
                  {l:"backdrop-filter",v:"blur(4px) saturate(35%) brightness(1.18)"},
                  {l:"CS validation",v:"6 caracteres exatos = valido"},
                  {l:"Email validation",v:"Regex /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/"},
                  {l:"Signal dots",v:"3 cores, ciclo 1.2s, step animation"},
                  {l:"Station pulse",v:"box-shadow pulse 2.5s infinite per station"},
                  {l:"Rail shimmer",v:"translateX shimmer 1.2s on input focus"},
                  {l:"Gold line",v:"Gradient line grows to 80% on focus"},
                  {l:"Mount animation",v:"slideInLeft 0.8s + slideInRight 0.7s"},
                ].map(s=>(
                  <div key={s.l} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:6}}>
                    <code style={{background:`${C.amareloOuro}30`,color:C.amareloEscuro,padding:"2px 8px",borderRadius:4,fontSize:10,fontFamily:Fn.mono,fontWeight:600,minWidth:100,textAlign:"center",flexShrink:0}}>{s.l}</code>
                    <span style={{fontSize:12,color:C.cinzaEscuro,fontFamily:Fn.body}}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </DSCard>
        </Section>

        {/* 05 -- TOKENS DE REFERENCIA */}
        <Section n="05" title="Tokens de referencia" desc="Valores de design da tela de Login FIPS.">
          <DSCard mob={mob} s={{display:"flex",gap:mob?24:48,flexWrap:"wrap"}}>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:Fn.title,marginBottom:4}}>Cores</span>
              <TokenRow label="Card bg" value="rgba(255,255,255,0.04)" color="rgba(255,255,255,0.04)"/>
              <TokenRow label="Card border" value="rgba(255,255,255,0.10)" color="rgba(255,255,255,0.10)"/>
              <TokenRow label="Card border-top" value="rgba(255,255,255,0.22)" color="rgba(255,255,255,0.22)"/>
              <TokenRow label="Gold (ouro)" value="#FDC24E" color={C.amareloOuro}/>
              <TokenRow label="Gold dark" value="#F6921E" color={C.amareloEscuro}/>
              <TokenRow label="Green valid" value="#00C64C" color={C.verdeFloresta}/>
              <TokenRow label="Left panel" value="#001430 -> #002A68" color={C.azulEscuro}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:Fn.title,marginBottom:4}}>Blur / Filters</span>
              <TokenRow label="Card blur" value="blur(4px)"/>
              <TokenRow label="Saturate" value="saturate(35%)"/>
              <TokenRow label="Brightness" value="brightness(1.18)"/>
              <TokenRow label="Input border" value="rgba(253,194,78,0.30)"/>
              <TokenRow label="Input focus border" value="rgba(253,194,78,0.50)"/>
              <TokenRow label="Input bg" value="rgba(255,255,255,0.07)"/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:Fn.title,marginBottom:4}}>Tipografia</span>
              <TokenRow label="Headings" value="Saira Expanded 700-800"/>
              <TokenRow label="Body" value="Open Sans 400-600"/>
              <TokenRow label="Labels" value="Saira Expanded 600 10px"/>
              <TokenRow label="Input text" value="Open Sans 400 13px"/>
              <TokenRow label="CTA" value="Saira Expanded 700 13px"/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:Fn.title,marginBottom:4}}>Dimensoes</span>
              <TokenRow label="Card maxWidth" value="380px"/>
              <TokenRow label="Card borderRadius" value="28px"/>
              <TokenRow label="Card padding" value="36px 32px"/>
              <TokenRow label="Input height" value="42px"/>
              <TokenRow label="Input borderRadius" value="10px"/>
              <TokenRow label="CTA height" value="44px"/>
              <TokenRow label="CTA borderRadius" value="12px"/>
              <TokenRow label="Left panel" value="25% width"/>
            </div>
          </DSCard>
        </Section>

        <div style={{textAlign:"center",padding:"20px 0 0",borderTop:`1px solid ${C.cardBorder}`,marginTop:20}}>
          <span style={{fontSize:12,color:C.cinzaChumbo,letterSpacing:".5px",fontFamily:Fn.title,fontWeight:400}}>DS-FIPS v2.0 -- Ferrovia Interna do Porto de Santos -- Excelencia sobre trilhos -- {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}
