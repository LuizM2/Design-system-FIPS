import { useState, useEffect } from 'react'

/* Login Desktop — DS-FIPS
   Layout: Branding esquerda (25%) + Form direita (75%)
   Card: Liquid Glass + borda conic-gradient rotativa dourada
   Filtro Background Padrao 1 sobre imagem de trens */

const BG = '/backgrounds/app-shell-home-trains.png'

export default function LoginDesktop() {
  const [showPw, setShowPw] = useState(false)
  const [csEmail, setCsEmail] = useState('')
  const [mounted, setMounted] = useState(false)
  const [signalStep, setSignalStep] = useState(0)
  const csEmailValid = csEmail.length === 6 || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(csEmail)

  useEffect(() => {
    setMounted(true)
    const t = setInterval(() => setSignalStep(s => (s + 1) % 4), 1200)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Saira+Expanded:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');
        @keyframes slideInLeft { 0%{opacity:0;transform:translateX(-40px)} 100%{opacity:1;transform:translateX(0)} }
        @keyframes slideInRight { 0%{opacity:0;transform:translateX(30px)} 100%{opacity:1;transform:translateX(0)} }
        @keyframes stationPulse { 0%,100%{box-shadow:0 0 6px rgba(253,194,78,0.4),0 0 12px rgba(253,194,78,0.15)} 50%{box-shadow:0 0 10px rgba(253,194,78,0.7),0 0 20px rgba(253,194,78,0.3)} }
        @keyframes stationReveal { 0%{opacity:0;transform:translateX(-12px)} 100%{opacity:1;transform:translateX(0)} }
        @keyframes railShimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes borderRotate { 0%{--border-angle:0deg} 100%{--border-angle:360deg} }
        @property --border-angle { syntax:"<angle>"; initial-value:0deg; inherits:false; }
        .liquid-card { position:relative; }
        .liquid-card::before {
          content:''; position:absolute; inset:-1px; border-radius:29px; padding:1px;
          background:conic-gradient(from var(--border-angle),transparent 0%,transparent 25%,rgba(253,194,78,0.45) 35%,rgba(255,255,255,0.25) 40%,rgba(253,194,78,0.50) 45%,transparent 55%,transparent 100%);
          -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
          -webkit-mask-composite:xor; mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
          mask-composite:exclude; animation:borderRotate 6s linear infinite; pointer-events:none; z-index:1;
        }
        .liquid-card::after {
          content:''; position:absolute; inset:0; border-radius:28px;
          box-shadow:0 0 18px rgba(253,194,78,0.06),0 0 40px rgba(253,194,78,0.03),inset 0 0.5px 0 rgba(255,255,255,0.08);
          pointer-events:none; z-index:1;
        }
        .login-left { width:25%; flex-shrink:0; position:relative; display:flex; flex-direction:column; justify-content:center; align-items:center; background:linear-gradient(145deg,#001430 0%,#002A68 40%,#00396B 100%); overflow:hidden; padding:60px 48px; }
        .login-right { width:75%; flex-shrink:0; position:relative; display:flex; flex-direction:column; justify-content:center; padding:60px 56px; overflow:hidden; }
        .login-right::before { content:''; position:absolute; inset:0; background:url('${BG}') center 40%/cover no-repeat; opacity:0.8; }
        .login-right::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(10,27,53,0.95) 0%,rgba(10,27,53,0.85) 50%,rgba(21,101,192,0.70) 100%); }
        .rail-input { position:relative; display:flex; align-items:center; gap:12px; height:42px; padding:0 14px; border-radius:10px; background:rgba(255,255,255,0.07); border:1.5px solid rgba(253,194,78,0.30); box-shadow:0 0 0 3px rgba(253,194,78,0.04),inset 0 0 12px rgba(253,194,78,0.01); transition:all 0.35s cubic-bezier(0.22,1,0.36,1); overflow:hidden; }
        .rail-input:focus-within { background:rgba(255,255,255,0.09); border-color:rgba(253,194,78,0.50); box-shadow:0 0 0 4px rgba(253,194,78,0.08),0 0 24px rgba(253,194,78,0.06),inset 0 0 20px rgba(253,194,78,0.02); }
        .rail-input::before { content:''; position:absolute; top:0;left:0; width:40%; height:100%; background:linear-gradient(105deg,transparent 30%,rgba(253,194,78,0.08) 45%,rgba(253,194,78,0.14) 50%,rgba(253,194,78,0.08) 55%,transparent 70%); transform:translateX(-100%); pointer-events:none; z-index:1; }
        .rail-input:focus-within::before { animation:railShimmer 1.2s ease-out forwards; }
        .rail-input .icon { color:#FDC24E; transition:all 0.35s; flex-shrink:0; }
        .rail-input:focus-within .icon { filter:drop-shadow(0 0 4px rgba(253,194,78,0.4)); }
        .rail-input input { flex:1; background:transparent; border:none; outline:none!important; color:#FFFFFF; font-size:13px; font-family:'Open Sans',sans-serif; font-weight:400; min-width:0; position:relative; z-index:2; }
        .rail-input input::placeholder { color:rgba(255,255,255,0.45)!important; -webkit-text-fill-color:rgba(255,255,255,0.45)!important; }
        .rail-input input:-webkit-autofill { -webkit-box-shadow:0 0 0 50px rgba(0,15,40,0.95) inset!important; -webkit-text-fill-color:#FFFFFF!important; }
        .rail-input::after { content:''; position:absolute; bottom:-1.5px; left:50%; height:2px; width:60%; background:linear-gradient(90deg,transparent,rgba(253,194,78,0.20),transparent); border-radius:2px; transition:all 0.4s cubic-bezier(0.22,1,0.36,1); transform:translateX(-50%); }
        .rail-input:focus-within::after { width:80%; background:linear-gradient(90deg,transparent,#FDC24E,#F6921E,#FDC24E,transparent); }
        .rail-label { font-family:'Saira Expanded',sans-serif; font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#FFFFFF; margin-bottom:6px; margin-left:14px; display:block; }
        .outline-btn { position:relative; display:flex; align-items:center; justify-content:center; gap:10px; width:100%; height:44px; background:transparent; border:1.5px solid #FDC24E; border-radius:6px; color:#FDC24E; font-size:13px; font-weight:700; font-family:'Saira Expanded',sans-serif; letter-spacing:1.5px; text-transform:uppercase; cursor:pointer; overflow:hidden; transition:all 0.4s cubic-bezier(0.22,1,0.36,1); }
        .outline-btn::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,#FDC24E,#F6921E); transform:scaleX(0); transform-origin:left; transition:transform 0.4s cubic-bezier(0.22,1,0.36,1); z-index:0; }
        .outline-btn:hover::before { transform:scaleX(1); }
        .outline-btn:hover { color:#001430; border-color:#F6921E; }
        .outline-btn span,.outline-btn svg { position:relative; z-index:1; }
        .rail-link { color:#FFFFFF; font-size:12px; font-weight:700; text-decoration:none; font-family:'Saira Expanded',sans-serif; }
        .rail-check { appearance:none; -webkit-appearance:none; width:16px; height:16px; border-radius:4px; border:1.5px solid rgba(255,255,255,0.40); background:rgba(255,255,255,0.06); cursor:pointer; flex-shrink:0; position:relative; }
        .rail-check:checked { background:rgba(253,194,78,0.20); border-color:#FDC24E; }
        .rail-check:checked::after { content:'\\2713'; position:absolute; top:-1px; left:2px; font-size:11px; color:#FDC24E; font-weight:700; }
        .train-runner { position:absolute; bottom:32px; left:0; right:0; height:40px; overflow:hidden; opacity:0.04; }
        @keyframes trainSlide { 0%{transform:translateX(100%)} 100%{transform:translateX(-120%)} }
        .train-runner img { height:100%; animation:trainSlide 25s linear infinite; position:absolute; }
        @media (max-width:768px) {
          .login-v1-container { flex-direction:column!important; min-height:100svh!important; }
          .login-left { width:100%!important; padding:32px 24px!important; align-items:flex-start!important; }
          .login-right { width:100%!important; padding:32px 24px!important; }
          .login-right .liquid-card { max-width:100%!important; padding:28px 20px!important; border-radius:20px!important; }
        }
      `}</style>
      <div className="login-v1-container" style={{display:'flex',minHeight:'100vh',overflow:'hidden'}}>
        {/* LEFT — Branding */}
        <div className="login-left">
          <div className="train-runner"><img src="/brand/hero-train-silhouette.svg" alt="" /></div>
          <div style={{position:'relative',zIndex:10,maxWidth:380,animation:mounted?'slideInLeft 0.8s ease-out forwards':'none',opacity:mounted?1:0}}>
            <h1 style={{fontFamily:"'Saira Expanded',sans-serif",fontSize:28,fontWeight:800,color:'#FFFFFF',lineHeight:1.15,margin:'0 0 14px'}}>
              Excelencia<br/><span style={{color:'#FDC24E'}}>sobre trilhos</span>
            </h1>
            <p style={{fontFamily:"'Open Sans',sans-serif",fontSize:15,color:'rgba(255,255,255,0.45)',lineHeight:1.7,margin:'12px 0 16px',maxWidth:320}}>
              Sistema integrado da Ferrovia Interna do Porto de Santos.
            </p>
            <div style={{height:440,overflow:'hidden',borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:16,position:'relative'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14,paddingLeft:4,paddingRight:4}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div style={{width:14,height:2.5,borderRadius:2,background:'linear-gradient(90deg,#FDC24E,#F6921E)'}}/>
                  <span style={{fontFamily:"'Saira Expanded',sans-serif",fontSize:7,fontWeight:700,letterSpacing:'2px',color:'rgba(255,255,255,0.25)',textTransform:'uppercase'}}>Rota dos principios</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:4}}>
                  {[{c:'#FF4D4D',s:1},{c:'#FDC24E',s:2},{c:'#00C64C',s:3}].map((d,i)=>(
                    <div key={i} style={{width:8,height:8,borderRadius:'50%',background:signalStep>=d.s?d.c:'rgba(255,255,255,0.08)',boxShadow:signalStep>=d.s?`0 0 12px ${d.c}80,0 0 4px ${d.c}`:'none',transition:'all 0.6s ease',transitionDelay:`${i*100}ms`}}/>
                  ))}
                  <span style={{fontFamily:"'Saira Expanded',sans-serif",fontSize:6,fontWeight:600,letterSpacing:'1px',color:'rgba(255,255,255,0.22)',marginLeft:2,textTransform:'uppercase'}}>Ativo</span>
                </div>
              </div>
              <div style={{position:'relative',paddingLeft:32}}>
                <div style={{position:'absolute',left:9,top:0,bottom:0,width:2,background:'repeating-linear-gradient(180deg,#FDC24E 0px,#FDC24E 8px,transparent 8px,transparent 14px)',opacity:0.5}}/>
                {[
                  {name:'Eficiencia',desc:'A busca pela eficiencia com responsabilidade.',color:'#00C64C'},
                  {name:'Pessoas',desc:'Pessoas engajadas sao o alicerce para bons resultados.',color:'#FDC24E'},
                  {name:'Integridade',desc:'Respeitar as pessoas e cumprir compromissos.',color:'#F6921E'},
                  {name:'Colaboracao',desc:'Trabalho em conjunto com empatia.',color:'#00C64C'},
                  {name:'Seguranca',desc:'Seguranca das pessoas e prioridade.',color:'#FF4D4D'},
                ].map((station,i)=>(
                  <div key={station.name} style={{position:'relative',marginBottom:i<4?28:0,animation:mounted?`stationReveal 0.4s ease-out ${0.3+i*0.12}s both`:'none'}}>
                    <div style={{position:'absolute',left:-28,top:2,width:12,height:12,borderRadius:'50%',background:`radial-gradient(circle at 40% 35%,${station.color},${station.color}88 60%,transparent 100%)`,boxShadow:`0 0 8px ${station.color}80,0 0 16px ${station.color}30`,animation:`stationPulse 2.5s ease-in-out ${i*0.5}s infinite`}}/>
                    <div style={{fontFamily:"'Saira Expanded',sans-serif",fontSize:11,fontWeight:700,color:station.color,letterSpacing:'0.3px',lineHeight:1.2}}>{station.name}</div>
                    <div style={{fontFamily:"'Open Sans',sans-serif",fontSize:9,color:'rgba(255,255,255,0.25)',lineHeight:1.45,marginTop:3,maxWidth:220}}>{station.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT — Form */}
        <div className="login-right">
          <div className="liquid-card" style={{position:'relative',zIndex:10,animation:mounted?'slideInRight 0.7s ease-out 0.2s both':'none',display:'flex',flexDirection:'column',alignItems:'center',width:'100%',maxWidth:380,margin:'0 auto',padding:'36px 32px',borderRadius:28,background:'linear-gradient(160deg,rgba(255,255,255,0.008) 0%,rgba(255,255,255,0.002) 100%)',backdropFilter:'blur(2px) saturate(20%) brightness(1.04)',WebkitBackdropFilter:'blur(2px) saturate(20%) brightness(1.04)',border:'0.5px solid rgba(255,255,255,0.04)',gap:10}}>
            <img src="/fips-logo-azul.svg" alt="FIPS" style={{height:86,objectFit:'contain',marginBottom:2}}/>
            <form onSubmit={e=>e.preventDefault()} style={{display:'flex',flexDirection:'column',gap:16,width:'100%'}}>
              <div>
                <label className="rail-label">CS ou E-mail</label>
                <div className="rail-input">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="icon"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6"/><path d="M5 20c0-3.3 2.7-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  <input type="text" placeholder="nome.sobrenome@agfips.com.br" value={csEmail} onChange={e=>setCsEmail(e.target.value)} autoComplete="username"/>
                  {csEmailValid && csEmail.length>0 && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{color:'#00C64C',flexShrink:0,filter:'drop-shadow(0 0 4px rgba(0,198,76,0.4))'}}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
              </div>
              <div>
                <label className="rail-label">Senha</label>
                <div className="rail-input">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="icon"><rect x="3" y="11" width="18" height="11" rx="3" stroke="currentColor" strokeWidth="1.6"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="16.5" r="1.5" fill="currentColor"/></svg>
                  <input type={showPw?'text':'password'} placeholder="--------" autoComplete="current-password"/>
                  <button type="button" onClick={()=>setShowPw(v=>!v)} style={{background:'none',border:'none',color:'#FDC24E',cursor:'pointer',padding:2,display:'flex',opacity:0.6}}>
                    {showPw ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                  </button>
                </div>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
                  <input type="checkbox" className="rail-check"/>
                  <span className="rail-link" style={{fontSize:12}}>Lembrar acesso</span>
                </label>
                <a href="#" onClick={e=>e.preventDefault()} className="rail-link">Esqueceu a senha?</a>
              </div>
              <button type="submit" className="outline-btn">
                <span>Entrar</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
