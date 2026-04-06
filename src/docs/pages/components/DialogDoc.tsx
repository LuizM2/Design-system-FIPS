import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════
   FIPS DESIGN SYSTEM — OFFICIAL BRAND TOKENS
   ═══════════════════════════════════════════ */
const C = {
  azulProfundo:"#004B9B",azulEscuro:"#002A68",azulClaro:"#658EC9",
  cinzaChumbo:"#7B8C96",cinzaEscuro:"#333B41",cinzaClaro:"#C0CCD2",
  azulCeu:"#93BDE4",azulCeuClaro:"#D3E3F4",
  amareloOuro:"#FDC24E",amareloEscuro:"#F6921E",
  verdeFloresta:"#00C64C",verdeEscuro:"#00904C",
  danger:"#DC3545",dangerDark:"#C82333",
  neutro:"#E8EBFF",branco:"#FFFFFF",
  bg:"#F2F4F8",cardBg:"#FFFFFF",cardBorder:"#E2E8F0",
  textMuted:"#64748B",textLight:"#94A3B8",
  inputBorder:"#CBD5E1",
};
const F={title:"'Saira Expanded',sans-serif",body:"'Open Sans',sans-serif",mono:"'Fira Code',monospace"};

/* ═══════════════════════════════════════════ ICONS ═══════════════════════════════════════════ */
const Ic={
  grid:(s=14,c=C.amareloOuro)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="11" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="2" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="11" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/></svg>,
  x:(s=14,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  trash:(s=14,c="#fff")=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5.33 4V2.67a1.33 1.33 0 011.34-1.34h2.66a1.33 1.33 0 011.34 1.34V4m2 0v9.33a1.33 1.33 0 01-1.34 1.34H4.67a1.33 1.33 0 01-1.34-1.34V4h9.34z" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  filter:(s=14,c=C.azulProfundo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M1.5 2h13L9 8.5V13l-2 1V8.5L1.5 2z" stroke={c} strokeWidth="1.3" strokeLinejoin="round"/></svg>,
  info:(s=14,c=C.azulProfundo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke={c} strokeWidth="1.5"/><path d="M8 7v4M8 5v.5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  check:(s=14,c="#fff")=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  alert:(s=14,c=C.amareloEscuro)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M8 1.5L1 14h14L8 1.5z" stroke={c} strokeWidth="1.3" strokeLinejoin="round"/><path d="M8 6v3.5M8 11.5v.5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  search:(s=14,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke={c} strokeWidth="1.5"/><path d="M10.5 10.5L14 14" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  shield:(s=14,c=C.verdeFloresta)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M8 1L2 4v4c0 3.5 2.5 5.5 6 7 3.5-1.5 6-3.5 6-7V4L8 1z" stroke={c} strokeWidth="1.3" strokeLinejoin="round"/></svg>,
  doc:(s=14,c=C.azulClaro)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M4 1h6l4 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z" stroke={c} strokeWidth="1.3" strokeLinejoin="round"/><path d="M10 1v4h4M6 8h4M6 11h4" stroke={c} strokeWidth="1.2" strokeLinecap="round"/></svg>,
  building:(s=14,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M2 14V3a1 1 0 011-1h5a1 1 0 011 1v11M9 14V8h4a1 1 0 011 1v5M5 5h1M5 8h1M5 11h1M11 10h1" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  maximize:(s=14,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

/* ═══════════════════════════════════════════ SVG OVERLAY ═══════════════════════════════════════════ */
function JunctionLines({style}:{style?:React.CSSProperties}){
  return <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:.12,...style}}>
    <path d="M0 60H100C120 60 120 60 140 40L200 40H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/>
    <path d="M0 60H100C120 60 120 60 140 80L200 80H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/>
    <path d="M0 120H60C80 120 80 120 100 100L160 100H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/>
    <path d="M0 120H60C80 120 80 120 100 140L160 140H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/>
    <path d="M0 170H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/>
    <path d="M0 20H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/>
  </svg>;
}

/* ═══════════════════════════════════════════ LAYOUT HELPERS ═══════════════════════════════════════════ */
function Section({n,title,desc,children}:{n:string;title:string;desc:string;children:React.ReactNode}){
  return(
    <section style={{marginBottom:44}}>
      <div style={{fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,marginBottom:6}}>{n}</div>
      <h2 style={{fontSize:20,fontWeight:700,color:C.azulEscuro,margin:"0 0 4px",fontFamily:F.title,letterSpacing:".5px"}}>{title}</h2>
      <p style={{fontSize:14,color:C.cinzaChumbo,margin:"0 0 20px",lineHeight:1.55,fontFamily:F.body}}>{desc}</p>
      {children}
    </section>
  );
}

function Card({children,style:s}:{children:React.ReactNode;style?:React.CSSProperties}){
  return(
    <div style={{background:C.cardBg,borderRadius:"12px 12px 12px 24px",border:`1px solid ${C.cardBorder}`,padding:28,boxShadow:"0 1px 3px rgba(0,75,155,0.04),0 4px 14px rgba(0,75,155,0.03)",...s}}>
      {children}
    </div>
  );
}

function TokenRow({label,value,color}:{label:string;value:string;color?:string}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:10,fontSize:12,fontFamily:F.body}}>
      {color&&<div style={{width:16,height:16,borderRadius:4,background:color,border:`1px solid ${C.cardBorder}`,flexShrink:0}}/>}
      <span style={{color:C.cinzaChumbo,minWidth:120}}>{label}</span>
      <code style={{background:C.neutro,padding:"2px 8px",borderRadius:4,fontSize:11,fontFamily:F.mono,color:C.cinzaEscuro}}>{value}</code>
    </div>
  );
}

function AnatomyBadge({children}:{children:React.ReactNode}){
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 12px",fontSize:11,fontWeight:600,fontFamily:F.mono,color:C.azulCeuClaro,background:`${C.branco}12`,border:`1px solid ${C.branco}18`,borderRadius:6,letterSpacing:".3px"}}>
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════ INLINE BUTTON ═══════════════════════════════════════════ */
function Btn({variant="primary",size="md",children,onClick,icon,disabled=false}:{variant?:string;size?:string;children:React.ReactNode;onClick?:()=>void;icon?:React.ReactNode;disabled?:boolean}){
  const [h,setH]=useState(false);
  const vars:Record<string,{bg:string;bgH:string;color:string;border:string}>={
    primary:{bg:C.azulProfundo,bgH:C.azulEscuro,color:C.branco,border:"transparent"},
    secondary:{bg:"#F1F5F9",bgH:"#E2E8F0",color:C.cinzaEscuro,border:C.inputBorder},
    danger:{bg:C.danger,bgH:C.dangerDark,color:C.branco,border:"transparent"},
    outline:{bg:"transparent",bgH:C.azulCeuClaro,color:C.azulProfundo,border:C.azulProfundo},
    ghost:{bg:"transparent",bgH:`${C.azulCeuClaro}88`,color:C.cinzaChumbo,border:"transparent"},
  };
  const sizes:Record<string,{p:string;fs:number;h:number}>={
    sm:{p:"5px 12px",fs:12,h:28},
    md:{p:"8px 18px",fs:13,h:36},
    lg:{p:"10px 24px",fs:14,h:42},
  };
  const v=vars[variant]||vars.primary;
  const s=sizes[size]||sizes.md;
  return(
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={()=>setH(true)}
      onMouseLeave={()=>setH(false)}
      style={{
        display:"inline-flex",alignItems:"center",justifyContent:"center",gap:7,
        padding:s.p,height:s.h,fontSize:s.fs,fontWeight:600,fontFamily:F.body,
        borderRadius:6,border:`1.5px solid ${v.border}`,
        background:disabled?C.cinzaClaro:(h?v.bgH:v.bg),
        color:disabled?C.cinzaChumbo:v.color,
        cursor:disabled?"not-allowed":"pointer",
        transition:"all .18s ease",opacity:disabled?.55:1,
        outline:"none",whiteSpace:"nowrap",letterSpacing:".01em",
        boxShadow:h&&!disabled?"0 2px 8px rgba(0,75,155,.15)":"none",
      }}
    >
      {icon}{children}
    </button>
  );
}

/* ═══════════════════════════════════════════ INLINE INPUT / SELECT ═══════════════════════════════════════════ */
function InlineInput({label,placeholder,icon}:{label:string;placeholder:string;icon?:React.ReactNode}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:4,flex:1,minWidth:200}}>
      <label style={{fontSize:12,fontWeight:600,color:C.cinzaEscuro,fontFamily:F.body}}>{label}</label>
      <div style={{display:"flex",alignItems:"center",gap:8,border:`1.5px solid ${C.inputBorder}`,borderRadius:6,padding:"7px 12px",background:C.branco,transition:"border .15s"}}>
        {icon&&<span style={{display:"flex",flexShrink:0,opacity:.6}}>{icon}</span>}
        <span style={{fontSize:13,color:C.textLight,fontFamily:F.body}}>{placeholder}</span>
      </div>
    </div>
  );
}

function InlineSelect({label,options}:{label:string;options:string[]}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:4,flex:1,minWidth:200}}>
      <label style={{fontSize:12,fontWeight:600,color:C.cinzaEscuro,fontFamily:F.body}}>{label}</label>
      <div style={{border:`1.5px solid ${C.inputBorder}`,borderRadius:6,padding:"7px 12px",background:C.branco,fontSize:13,color:C.cinzaEscuro,fontFamily:F.body}}>
        {options[0]}
        <span style={{float:"right",color:C.textLight}}>&#9662;</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ MODAL OVERLAY ═══════════════════════════════════════════ */
function ModalOverlay({open,onClose,children,width=520}:{open:boolean;onClose:()=>void;children:React.ReactNode;width?:number}){
  if(!open) return null;
  return(
    <div
      onClick={onClose}
      style={{
        position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:9999,
        background:"rgba(0,20,50,.55)",backdropFilter:"blur(4px)",
        display:"flex",alignItems:"center",justifyContent:"center",
        padding:20,animation:"dsFadeIn .2s ease",
      }}
    >
      <div
        onClick={e=>e.stopPropagation()}
        style={{
          background:C.branco,borderRadius:"16px 16px 16px 28px",
          width:"100%",maxWidth:width,maxHeight:"90vh",overflowY:"auto",
          boxShadow:"0 8px 40px rgba(0,20,60,.25),0 2px 8px rgba(0,20,60,.10)",
          animation:"dsSlideUp .25s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({icon,iconBg,title,desc}:{icon:React.ReactNode;iconBg:string;title:string;desc:string}){
  return(
    <div style={{padding:"24px 28px 20px",borderBottom:`1px solid ${C.cardBorder}`}}>
      <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
        <div style={{width:44,height:44,borderRadius:"50%",background:iconBg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          {icon}
        </div>
        <div>
          <h3 style={{fontSize:17,fontWeight:700,color:C.cinzaEscuro,margin:0,fontFamily:F.title}}>{title}</h3>
          <p style={{fontSize:13,color:C.cinzaChumbo,margin:"4px 0 0",lineHeight:1.5,fontFamily:F.body}}>{desc}</p>
        </div>
      </div>
    </div>
  );
}

function ModalFooter({children}:{children:React.ReactNode}){
  return(
    <div style={{padding:"16px 28px 24px",borderTop:`1px solid ${C.cardBorder}`,display:"flex",alignItems:"center",justifyContent:"flex-end",gap:10}}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════ GUIDE CARD ═══════════════════════════════════════════ */
function GuideRow({icon,label,desc,good}:{icon?:React.ReactNode;label:string;desc:string;good:boolean}){
  return(
    <div style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 0",borderBottom:`1px solid ${C.cardBorder}`}}>
      <div style={{width:22,height:22,borderRadius:"50%",background:good?"#ECFDF5":"#FEF2F2",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
        {good?Ic.check(11,C.verdeEscuro):Ic.x(10,C.danger)}
      </div>
      <div>
        <span style={{fontSize:13,fontWeight:600,color:C.cinzaEscuro,fontFamily:F.body}}>{label}</span>
        <p style={{fontSize:12,color:C.cinzaChumbo,margin:"2px 0 0",lineHeight:1.45,fontFamily:F.body}}>{desc}</p>
      </div>
    </div>
  );
}

function SizeCard({label,width,desc}:{label:string;width:string;desc:string}){
  return(
    <div style={{flex:1,minWidth:160,background:C.bg,border:`1px solid ${C.cardBorder}`,borderRadius:10,padding:16,textAlign:"center"}}>
      <div style={{fontSize:22,fontWeight:700,color:C.azulProfundo,fontFamily:F.title,marginBottom:4}}>{width}</div>
      <div style={{fontSize:13,fontWeight:600,color:C.cinzaEscuro,fontFamily:F.body,marginBottom:4}}>{label}</div>
      <div style={{fontSize:11,color:C.cinzaChumbo,fontFamily:F.body,lineHeight:1.4}}>{desc}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function DialogDoc(){
  const [w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
  const mob=w<640;

  const [confirmOpen,setConfirmOpen]=useState(false);
  const [filterOpen,setFilterOpen]=useState(false);
  const [infoOpen,setInfoOpen]=useState(false);

  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.bg} 0%,${C.azulCeuClaro}44 50%,${C.bg} 100%)`,fontFamily:F.body,color:C.cinzaEscuro}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Saira+Expanded:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&family=Fira+Code:wght@400;500&display=swap');
@keyframes dsFadeIn{from{opacity:0}to{opacity:1}}
@keyframes dsSlideUp{from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
`}</style>

      {/* ═══ HEADER ═══ */}
      <header style={{background:`linear-gradient(135deg,${C.azulProfundo} 0%,${C.azulEscuro} 100%)`,padding:mob?"32px 20px":"48px 40px 44px",position:"relative",overflow:"hidden"}}>
        <JunctionLines style={{position:"absolute",top:-10,right:-20,width:mob?250:400,height:250}}/>
        <div style={{position:"relative"}}>
          {/* Badge DS-FIPS */}
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${C.branco}10`,border:`1px solid ${C.branco}18`,borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",color:C.amareloOuro,fontFamily:F.title,marginBottom:16}}>
            {Ic.grid(14,C.amareloOuro)} DESIGN SYSTEM FIPS
          </div>

          {/* Title */}
          <h1 style={{fontSize:mob?28:44,fontWeight:700,color:C.branco,margin:"0 0 10px",fontFamily:F.title}}>Modal (Dialog)</h1>

          {/* Description */}
          <p style={{fontSize:16,color:`${C.branco}B0`,lineHeight:1.6,maxWidth:720,margin:"0 0 24px",fontFamily:F.body}}>
            Sobreposicao modal para confirmacao, filtros avancados e tarefas contextuais.
            Centraliza a atencao do usuario em uma acao especifica sem perder o contexto da pagina.
            Ideal para exclusoes, formularios curtos, detalhes de registros e alertas criticos no FIPS.
          </p>

          {/* Anatomy badges */}
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            <AnatomyBadge>DialogTrigger</AnatomyBadge>
            <AnatomyBadge>DialogOverlay</AnatomyBadge>
            <AnatomyBadge>DialogContent</AnatomyBadge>
            <AnatomyBadge>DialogHeader</AnatomyBadge>
            <AnatomyBadge>DialogBody</AnatomyBadge>
            <AnatomyBadge>DialogFooter</AnatomyBadge>
          </div>
        </div>
      </header>

      {/* ═══ BODY ═══ */}
      <div style={{padding:mob?"24px 16px 40px":"36px 40px 60px",maxWidth:1100}}>

        {/* ═══════ 01 — CONFIRMATION MODAL ═══════ */}
        <Section n="01" title="Modal de confirmacao" desc="Confirmacao de acoes criticas e irreversiveis, como exclusao de certificados, desativacao de empresas ou cancelamento de requisicoes SSMA.">
          <Card>
            <div style={{display:"flex",flexDirection:"column",gap:16,alignItems:"flex-start"}}>
              <p style={{fontSize:13,color:C.cinzaChumbo,margin:0,lineHeight:1.55,fontFamily:F.body}}>
                O modal de confirmacao protege contra acoes acidentais. Sempre inclua descricao clara da consequencia e botoes com rotulos explicitos.
              </p>
              <Btn variant="danger" icon={Ic.trash(14,C.branco)} onClick={()=>setConfirmOpen(true)}>
                Excluir certificado
              </Btn>
            </div>

            {/* Preview area */}
            <div style={{marginTop:24,background:C.bg,border:`1px solid ${C.cardBorder}`,borderRadius:12,padding:24,position:"relative",overflow:"hidden",minHeight:260}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,marginBottom:12}}>Preview do modal</div>
              {/* Static preview */}
              <div style={{background:C.branco,borderRadius:"12px 12px 12px 20px",maxWidth:460,margin:"0 auto",boxShadow:"0 4px 20px rgba(0,20,60,.12)",border:`1px solid ${C.cardBorder}`}}>
                <div style={{padding:"20px 24px 16px",borderBottom:`1px solid ${C.cardBorder}`}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                    <div style={{width:40,height:40,borderRadius:"50%",background:"#FEF2F2",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {Ic.trash(16,C.danger)}
                    </div>
                    <div>
                      <div style={{fontSize:15,fontWeight:700,color:C.cinzaEscuro,fontFamily:F.title}}>Excluir certificado</div>
                      <div style={{fontSize:12,color:C.cinzaChumbo,marginTop:3,lineHeight:1.4,fontFamily:F.body}}>
                        Esta acao remove permanentemente o certificado digital da empresa Porto Sul Logistica.
                        Todos os vinculos e historico serao perdidos.
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{padding:"14px 24px 18px",display:"flex",justifyContent:"flex-end",gap:8}}>
                  <span style={{display:"inline-flex",alignItems:"center",padding:"7px 16px",fontSize:12,fontWeight:600,fontFamily:F.body,borderRadius:6,background:"#F1F5F9",color:C.cinzaEscuro,border:`1.5px solid ${C.inputBorder}`}}>Cancelar</span>
                  <span style={{display:"inline-flex",alignItems:"center",padding:"7px 16px",fontSize:12,fontWeight:600,fontFamily:F.body,borderRadius:6,background:C.danger,color:C.branco,border:"1.5px solid transparent"}}>Confirmar exclusao</span>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* ═══════ 02 — FILTER MODAL ═══════ */}
        <Section n="02" title="Filtro avancado em modal" desc="Para cenarios onde o filtro possui muitos campos e nao cabe na barra lateral. Bastante utilizado nas telas de listagem de empresas, certificados e requisicoes.">
          <Card>
            <div style={{display:"flex",flexDirection:"column",gap:16,alignItems:"flex-start"}}>
              <p style={{fontSize:13,color:C.cinzaChumbo,margin:0,lineHeight:1.55,fontFamily:F.body}}>
                Modal de filtro com campos organizados em grid. Inclui botoes para limpar, cancelar e aplicar filtros.
              </p>
              <Btn variant="secondary" icon={Ic.filter(14,C.cinzaEscuro)} onClick={()=>setFilterOpen(true)}>
                Abrir filtros avancados
              </Btn>
            </div>

            {/* Preview area */}
            <div style={{marginTop:24,background:C.bg,border:`1px solid ${C.cardBorder}`,borderRadius:12,padding:24,minHeight:300}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,marginBottom:12}}>Preview do modal</div>
              <div style={{background:C.branco,borderRadius:"12px 12px 12px 20px",maxWidth:600,margin:"0 auto",boxShadow:"0 4px 20px rgba(0,20,60,.12)",border:`1px solid ${C.cardBorder}`}}>
                <div style={{padding:"20px 24px 16px",borderBottom:`1px solid ${C.cardBorder}`}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                    <div style={{width:40,height:40,borderRadius:"50%",background:C.azulCeuClaro,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {Ic.filter(16,C.azulProfundo)}
                    </div>
                    <div>
                      <div style={{fontSize:15,fontWeight:700,color:C.cinzaEscuro,fontFamily:F.title}}>Filtros avancados</div>
                      <div style={{fontSize:12,color:C.cinzaChumbo,marginTop:3,fontFamily:F.body}}>Refine a busca de empresas e certificados</div>
                    </div>
                  </div>
                </div>
                <div style={{padding:"16px 24px",display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:12}}>
                  <InlineInput label="Razao social" placeholder="Nome da empresa" icon={Ic.search(12,C.textLight)}/>
                  <InlineInput label="CNPJ" placeholder="00.000.000/0000-00"/>
                  <InlineSelect label="Segmento" options={["Selecione","Comercio","Servico","Industria"]}/>
                  <InlineSelect label="Status certificado" options={["Selecione","Ativo","Vencido","Pendente"]}/>
                </div>
                <div style={{padding:"14px 24px 18px",borderTop:`1px solid ${C.cardBorder}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                  <span style={{fontSize:12,fontWeight:600,color:C.azulProfundo,fontFamily:F.body,cursor:"pointer"}}>Limpar filtros</span>
                  <div style={{display:"flex",gap:8}}>
                    <span style={{display:"inline-flex",alignItems:"center",padding:"7px 16px",fontSize:12,fontWeight:600,fontFamily:F.body,borderRadius:6,background:"#F1F5F9",color:C.cinzaEscuro,border:`1.5px solid ${C.inputBorder}`}}>Cancelar</span>
                    <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"7px 16px",fontSize:12,fontWeight:600,fontFamily:F.body,borderRadius:6,background:C.azulProfundo,color:C.branco,border:"1.5px solid transparent"}}>{Ic.check(12,C.branco)} Aplicar filtros</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* ═══════ 03 — INFO / DETAIL MODAL ═══════ */}
        <Section n="03" title="Modal de informacao / detalhe" desc="Exibicao rapida de detalhes sem navegar para outra pagina. Usado para ver dados de certificados, empresas ou requisicoes SSMA.">
          <Card>
            <div style={{display:"flex",flexDirection:"column",gap:16,alignItems:"flex-start"}}>
              <p style={{fontSize:13,color:C.cinzaChumbo,margin:0,lineHeight:1.55,fontFamily:F.body}}>
                Modal somente-leitura para inspecionar detalhes. Util em tabelas densas onde o usuario quer ver mais informacoes sem sair da listagem.
              </p>
              <Btn variant="outline" icon={Ic.info(14,C.azulProfundo)} onClick={()=>setInfoOpen(true)}>
                Ver detalhes da empresa
              </Btn>
            </div>

            {/* Preview area */}
            <div style={{marginTop:24,background:C.bg,border:`1px solid ${C.cardBorder}`,borderRadius:12,padding:24,minHeight:260}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,marginBottom:12}}>Preview do modal</div>
              <div style={{background:C.branco,borderRadius:"12px 12px 12px 20px",maxWidth:500,margin:"0 auto",boxShadow:"0 4px 20px rgba(0,20,60,.12)",border:`1px solid ${C.cardBorder}`}}>
                <div style={{padding:"20px 24px 16px",borderBottom:`1px solid ${C.cardBorder}`}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                    <div style={{width:40,height:40,borderRadius:"50%",background:C.azulCeuClaro,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {Ic.building(16,C.azulProfundo)}
                    </div>
                    <div>
                      <div style={{fontSize:15,fontWeight:700,color:C.cinzaEscuro,fontFamily:F.title}}>Porto Sul Logistica Ltda</div>
                      <div style={{fontSize:12,color:C.cinzaChumbo,marginTop:3,fontFamily:F.body}}>CNPJ: 12.345.678/0001-90</div>
                    </div>
                  </div>
                </div>
                <div style={{padding:"16px 24px"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px 20px"}}>
                    {[
                      ["Segmento","Comercio Exterior"],
                      ["Regime","Lucro Real"],
                      ["Responsavel","Ana Ferreira"],
                      ["Certificado","Valido ate 15/08/2026"],
                      ["Requisicoes SSMA","3 pendentes"],
                      ["Status","Ativo"],
                    ].map(([l,v])=>(
                      <div key={l}>
                        <div style={{fontSize:10,fontWeight:700,letterSpacing:".8px",textTransform:"uppercase",color:C.textLight,fontFamily:F.title}}>{l}</div>
                        <div style={{fontSize:13,color:C.cinzaEscuro,fontFamily:F.body,marginTop:2}}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{padding:"14px 24px 18px",borderTop:`1px solid ${C.cardBorder}`,display:"flex",justifyContent:"flex-end"}}>
                  <span style={{display:"inline-flex",alignItems:"center",padding:"7px 16px",fontSize:12,fontWeight:600,fontFamily:F.body,borderRadius:6,background:"#F1F5F9",color:C.cinzaEscuro,border:`1.5px solid ${C.inputBorder}`}}>Fechar</span>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* ═══════ 04 — SIZES ═══════ */}
        <Section n="04" title="Tamanhos de modal" desc="Guia de larguras recomendadas. Escolha o tamanho baseado na complexidade do conteudo.">
          <Card>
            <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
              <SizeCard label="Pequeno (SM)" width="420px" desc="Confirmacoes simples, alertas, mensagens curtas"/>
              <SizeCard label="Medio (MD)" width="520px" desc="Formularios curtos, detalhes de registros, edicoes rapidas"/>
              <SizeCard label="Grande (LG)" width="680px" desc="Filtros avancados, formularios complexos, tabelas internas"/>
              <SizeCard label="Extra Grande (XL)" width="900px" desc="Dashboards em modal, comparacao lado a lado, paineis densos"/>
            </div>

            <div style={{marginTop:24,background:C.bg,border:`1px solid ${C.cardBorder}`,borderRadius:10,padding:20}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,marginBottom:10}}>Regras de responsividade</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {[
                  ["Mobile (< 640px)","Modal ocupa 100% da largura com padding de 16px"],
                  ["Tablet (640-1024px)","Modal respeita max-width com padding de 20px"],
                  ["Desktop (> 1024px)","Modal centralizado com max-width definido e overlay completo"],
                ].map(([t,d])=>(
                  <div key={t} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                    <code style={{fontSize:11,fontFamily:F.mono,color:C.azulProfundo,background:C.neutro,padding:"2px 8px",borderRadius:4,whiteSpace:"nowrap",flexShrink:0}}>{t}</code>
                    <span style={{fontSize:12,color:C.cinzaChumbo,fontFamily:F.body,lineHeight:1.4}}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Section>

        {/* ═══════ 05 — GUIDELINES ═══════ */}
        <Section n="05" title="Diretrizes de uso" desc="Quando usar modal vs drawer vs pagina dedicada. Regras de acessibilidade e boas praticas.">
          <Card>
            <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:24}}>
              {/* Use Modal */}
              <div>
                <div style={{fontSize:12,fontWeight:700,color:C.verdeEscuro,fontFamily:F.title,letterSpacing:".5px",marginBottom:12,textTransform:"uppercase"}}>Use Modal quando...</div>
                <GuideRow good label="Confirmacao de acao destrutiva" desc="Excluir certificado, cancelar requisicao, desativar empresa"/>
                <GuideRow good label="Formulario curto (ate 6 campos)" desc="Novo cadastro rapido, edicao de dados pontuais"/>
                <GuideRow good label="Detalhe rapido (quick-view)" desc="Inspecionar registro da tabela sem navegar"/>
                <GuideRow good label="Alerta ou aviso importante" desc="Certificado vencido, prazo SSMA expirado"/>
                <GuideRow good label="Filtros avancados" desc="Quando a barra lateral de filtro nao comporta a quantidade de campos"/>
              </div>

              {/* Don't use Modal */}
              <div>
                <div style={{fontSize:12,fontWeight:700,color:C.danger,fontFamily:F.title,letterSpacing:".5px",marginBottom:12,textTransform:"uppercase"}}>Evite Modal quando...</div>
                <GuideRow good={false} label="Formulario longo (> 8 campos)" desc="Prefira pagina dedicada ou stepper. Modal longo causa fadiga"/>
                <GuideRow good={false} label="Fluxo multi-step" desc="Wizards e fluxos de aprovacao devem ter navegacao propria"/>
                <GuideRow good={false} label="Conteudo que precisa de contexto" desc="Se o usuario precisa consultar a pagina atras, use drawer"/>
                <GuideRow good={false} label="Modal sobre modal" desc="Nunca empilhe modais. Reestruture o fluxo se necessario"/>
                <GuideRow good={false} label="Notificacoes de sucesso" desc="Use toast/snackbar para feedback de sucesso, nao modal"/>
              </div>
            </div>

            <div style={{marginTop:24,background:C.neutro,border:`1px solid ${C.azulCeu}44`,borderRadius:10,padding:20}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                {Ic.info(16,C.azulProfundo)}
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:C.azulEscuro,fontFamily:F.body,marginBottom:4}}>Acessibilidade</div>
                  <ul style={{margin:0,paddingLeft:18,fontSize:12,color:C.cinzaChumbo,lineHeight:1.7,fontFamily:F.body}}>
                    <li>Focus trap: o foco deve ficar preso dentro do modal enquanto aberto</li>
                    <li>ESC fecha o modal e retorna o foco ao trigger original</li>
                    <li>Overlay clicavel deve fechar o modal (exceto confirmacoes criticas)</li>
                    <li>Role <code style={{fontFamily:F.mono,fontSize:11}}>dialog</code> e <code style={{fontFamily:F.mono,fontSize:11}}>aria-modal="true"</code> obrigatorios</li>
                    <li>Titulo vinculado via <code style={{fontFamily:F.mono,fontSize:11}}>aria-labelledby</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* ═══════ 06 — TOKEN REFERENCE ═══════ */}
        <Section n="06" title="Referencia de tokens" desc="Todos os tokens visuais utilizados na construcao do componente Dialog/Modal no DS-FIPS.">
          <Card style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr 1fr",gap:28}}>
            {/* Overlay & Surface */}
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Overlay e superficie</span>
              <TokenRow label="Overlay bg" value="rgba(0,20,50,.55)" color="rgba(0,20,50,.55)"/>
              <TokenRow label="Backdrop blur" value="4px"/>
              <TokenRow label="Surface bg" value={C.branco} color={C.branco}/>
              <TokenRow label="Border radius" value="16px 16px 16px 28px"/>
              <TokenRow label="Shadow" value="0 8px 40px …"/>
              <TokenRow label="Max height" value="90vh"/>
            </div>

            {/* Header & Footer */}
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Header e footer</span>
              <TokenRow label="Header padding" value="24px 28px 20px"/>
              <TokenRow label="Footer padding" value="16px 28px 24px"/>
              <TokenRow label="Divider" value={C.cardBorder} color={C.cardBorder}/>
              <TokenRow label="Icon circle" value="44px"/>
              <TokenRow label="Titulo font" value="Saira Expanded 700"/>
              <TokenRow label="Descricao font" value="Open Sans 400"/>
            </div>

            {/* Sizes & Spacing */}
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Tamanhos e espacamento</span>
              <TokenRow label="SM" value="420px"/>
              <TokenRow label="MD (padrao)" value="520px"/>
              <TokenRow label="LG" value="680px"/>
              <TokenRow label="XL" value="900px"/>
              <TokenRow label="Body padding" value="16px 24px"/>
              <TokenRow label="Button gap" value="8–10px"/>
            </div>
          </Card>

          {/* Color tokens sub-section */}
          <Card style={{marginTop:16,display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:28}}>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Cores de icone/contexto</span>
              <TokenRow label="Danger circle" value="#FEF2F2" color="#FEF2F2"/>
              <TokenRow label="Danger icon" value={C.danger} color={C.danger}/>
              <TokenRow label="Info circle" value={C.azulCeuClaro} color={C.azulCeuClaro}/>
              <TokenRow label="Info icon" value={C.azulProfundo} color={C.azulProfundo}/>
              <TokenRow label="Success circle" value="#ECFDF5" color="#ECFDF5"/>
              <TokenRow label="Success icon" value={C.verdeEscuro} color={C.verdeEscuro}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Tipografia e animacao</span>
              <TokenRow label="Titulo" value="17px / Saira 700"/>
              <TokenRow label="Descricao" value="13px / Open Sans"/>
              <TokenRow label="Label campo" value="12px / Open Sans 600"/>
              <TokenRow label="Fade in" value=".2s ease"/>
              <TokenRow label="Slide up" value=".25s ease"/>
              <TokenRow label="Scale from" value="0.97 → 1"/>
            </div>
          </Card>
        </Section>

        {/* ═══ FOOTER ═══ */}
        <div style={{textAlign:"center",padding:"20px 0 0",borderTop:`1px solid ${C.cardBorder}`,marginTop:20}}>
          <span style={{fontSize:12,color:C.cinzaChumbo,letterSpacing:".5px",fontFamily:F.title,fontWeight:400}}>
            DS-FIPS v2.0 · Ferrovia Interna do Porto de Santos · Excelencia sobre trilhos · {new Date().getFullYear()}
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
           LIVE MODALS (functional overlays)
           ═══════════════════════════════════════════ */}

      {/* Confirmation Modal */}
      <ModalOverlay open={confirmOpen} onClose={()=>setConfirmOpen(false)} width={480}>
        <ModalHeader
          icon={Ic.trash(18,C.danger)}
          iconBg="#FEF2F2"
          title="Excluir certificado"
          desc="Esta acao remove permanentemente o certificado digital da empresa Porto Sul Logistica. Todos os vinculos de assinatura e historico de uso serao perdidos. Essa operacao nao pode ser desfeita."
        />
        <div style={{padding:"16px 28px"}}>
          <div style={{background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:8,padding:"12px 16px",display:"flex",alignItems:"flex-start",gap:10}}>
            {Ic.alert(14,C.danger)}
            <span style={{fontSize:12,color:"#B91C1C",fontFamily:F.body,lineHeight:1.5}}>
              Atencao: 3 requisicoes SSMA vinculadas a este certificado serao automaticamente canceladas.
            </span>
          </div>
        </div>
        <ModalFooter>
          <Btn variant="secondary" onClick={()=>setConfirmOpen(false)}>Cancelar</Btn>
          <Btn variant="danger" icon={Ic.trash(13,C.branco)} onClick={()=>setConfirmOpen(false)}>Confirmar exclusao</Btn>
        </ModalFooter>
      </ModalOverlay>

      {/* Filter Modal */}
      <ModalOverlay open={filterOpen} onClose={()=>setFilterOpen(false)} width={680}>
        <ModalHeader
          icon={Ic.filter(18,C.azulProfundo)}
          iconBg={C.azulCeuClaro}
          title="Filtros avancados"
          desc="Refine a busca de empresas e certificados cadastrados no FIPS."
        />
        <div style={{padding:"20px 28px",display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:14}}>
          <InlineInput label="Razao social" placeholder="Nome da empresa" icon={Ic.search(12,C.textLight)}/>
          <InlineInput label="Nome fantasia" placeholder="Nome fantasia" icon={Ic.building(12,C.textLight)}/>
          <InlineInput label="CNPJ" placeholder="00.000.000/0000-00"/>
          <InlineInput label="ID do cliente" placeholder="Ex: 1234"/>
          <InlineSelect label="Segmento" options={["Selecione","Comercio","Servico","Industria","Logistica"]}/>
          <InlineSelect label="Status certificado" options={["Selecione","Ativo","Vencido","Pendente","Revogado"]}/>
          <InlineSelect label="Responsavel" options={["Selecione o colaborador","Ana Ferreira","Carlos Lima","Bruno Santos"]}/>
          <InlineInput label="Vencimento ate" placeholder="dd/mm/aaaa"/>
        </div>
        <ModalFooter>
          <span style={{marginRight:"auto",fontSize:12,fontWeight:600,color:C.azulProfundo,fontFamily:F.body,cursor:"pointer"}}>Limpar filtros</span>
          <Btn variant="secondary" onClick={()=>setFilterOpen(false)}>Cancelar</Btn>
          <Btn variant="primary" icon={Ic.check(13,C.branco)} onClick={()=>setFilterOpen(false)}>Aplicar filtros</Btn>
        </ModalFooter>
      </ModalOverlay>

      {/* Info / Detail Modal */}
      <ModalOverlay open={infoOpen} onClose={()=>setInfoOpen(false)} width={540}>
        <ModalHeader
          icon={Ic.building(18,C.azulProfundo)}
          iconBg={C.azulCeuClaro}
          title="Porto Sul Logistica Ltda"
          desc="CNPJ: 12.345.678/0001-90 · Cadastro ativo desde 2019"
        />
        <div style={{padding:"20px 28px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px 24px"}}>
            {[
              ["Segmento","Comercio Exterior"],
              ["Regime tributario","Lucro Real"],
              ["Responsavel fiscal","Ana Ferreira"],
              ["Certificado A1","Valido ate 15/08/2026"],
              ["Requisicoes SSMA","3 pendentes"],
              ["Ultima atualizacao","02/04/2026"],
            ].map(([label,value])=>(
              <div key={label}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:".8px",textTransform:"uppercase",color:C.textLight,fontFamily:F.title,marginBottom:3}}>{label}</div>
                <div style={{fontSize:13,color:C.cinzaEscuro,fontFamily:F.body}}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{marginTop:20,background:C.bg,borderRadius:8,padding:"14px 16px",border:`1px solid ${C.cardBorder}`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              {Ic.shield(14,C.verdeFloresta)}
              <span style={{fontSize:12,fontWeight:600,color:C.cinzaEscuro,fontFamily:F.body}}>Certificado digital</span>
            </div>
            <div style={{display:"flex",gap:16,fontSize:12,color:C.cinzaChumbo,fontFamily:F.body}}>
              <span>Tipo: <strong style={{color:C.cinzaEscuro}}>A1</strong></span>
              <span>Emitido: <strong style={{color:C.cinzaEscuro}}>15/08/2024</strong></span>
              <span>Validade: <strong style={{color:C.verdeEscuro}}>15/08/2026</strong></span>
            </div>
          </div>
        </div>
        <ModalFooter>
          <Btn variant="ghost" icon={Ic.doc(13,C.cinzaChumbo)}>Historico</Btn>
          <Btn variant="secondary" onClick={()=>setInfoOpen(false)}>Fechar</Btn>
        </ModalFooter>
      </ModalOverlay>
    </div>
  );
}
