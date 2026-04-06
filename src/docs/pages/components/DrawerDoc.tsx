import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════ TOKENS ═══════════════════════════════════════════ */
const C = {
  azulProfundo:"#004B9B",azulEscuro:"#002A68",azulClaro:"#658EC9",
  cinzaChumbo:"#7B8C96",cinzaEscuro:"#333B41",cinzaClaro:"#C0CCD2",
  azulCeu:"#93BDE4",azulCeuClaro:"#D3E3F4",
  amareloOuro:"#FDC24E",amareloEscuro:"#F6921E",
  verdeFloresta:"#00C64C",verdeEscuro:"#00904C",
  danger:"#DC3545",
  neutro:"#E8EBFF",branco:"#FFFFFF",
  bg:"#F2F4F8",cardBg:"#FFFFFF",cardBorder:"#E2E8F0",
  textMuted:"#64748B",textLight:"#94A3B8",
  inputBorder:"#CBD5E1",
};
const F={title:"'Saira Expanded',sans-serif",body:"'Open Sans',sans-serif",mono:"'Fira Code',monospace"};

/* ═══════════════════════════════════════════ ICONS (mini) ═══════════════════════════════════════════ */
const Ic={
  grid:(s=14,c=C.amareloOuro)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="11" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="2" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="11" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/></svg>,
  x:(s=16,c=C.cinzaEscuro)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  filter:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M2 4h16M5 10h10M8 16h4" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>,
  search:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="5.5" stroke={c} strokeWidth="1.5"/><path d="M13.5 13.5L17 17" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  building:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke={c} strokeWidth="1.5"/><path d="M7 6h2M11 6h2M7 10h2M11 10h2M7 14h6" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
  shield:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M10 2L3 5.5v5c0 4 3 6.5 7 7.5 4-1 7-3.5 7-7.5v-5L10 2z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M7 10l2 2 4-4" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  user:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6" r="3.5" stroke={c} strokeWidth="1.5"/><path d="M3 17.5c0-3.5 3-5.5 7-5.5s7 2 7 5.5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  calendar:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="2.5" y="3.5" width="15" height="14" rx="2" stroke={c} strokeWidth="1.5"/><path d="M2.5 8h15M7 2v3M13 2v3" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  doc:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M6 2h6l5 5v10a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M12 2v5h5M8 11h4M8 14h6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  save:(s=14,c="#fff")=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M13 1H3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V4l-2-3z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M5 1v4h6V1" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><rect x="4" y="9" width="8" height="4" rx=".5" stroke={c} strokeWidth="1.5"/></svg>,
  check:(s=12,c="#fff")=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  alert:(s=16,c=C.amareloEscuro)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M10 2L1.5 17h17L10 2z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M10 8v4M10 14v.5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  panelRight:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="14" rx="2" stroke={c} strokeWidth="1.5"/><path d="M13 3v14" stroke={c} strokeWidth="1.5"/></svg>,
  dropdown:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M6 8l4 4 4-4" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  hardhat:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M4 14h12M3 14a7 7 0 0114 0" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><path d="M7 14V9M13 14V9" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
};

function JunctionLines({style}:any){return <svg viewBox="0 0 320 200" fill="none" style={{opacity:.12,...style}}><path d="M0 60H100C120 60 120 60 140 40L200 40H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 60H100C120 60 120 60 140 80L200 80H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 120H60C80 120 80 120 100 100L160 100H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 120H60C80 120 80 120 100 140L160 140H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/></svg>}

/* ═══════════════════════════════════════════ LAYOUT HELPERS ═══════════════════════════════════════════ */
function Section({n,title,desc,children}:{n:string,title:string,desc:string,children:React.ReactNode}){return(
  <section style={{marginBottom:44}}><div style={{fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,marginBottom:6}}>{n}</div><h2 style={{fontSize:20,fontWeight:700,color:C.azulEscuro,margin:"0 0 4px",fontFamily:F.title,letterSpacing:".5px"}}>{title}</h2><p style={{fontSize:14,color:C.cinzaChumbo,margin:"0 0 20px",lineHeight:1.55,fontFamily:F.body}}>{desc}</p>{children}</section>
);}
function Card({children,s}:{children:React.ReactNode,s?:React.CSSProperties}){return(
  <div style={{background:C.cardBg,borderRadius:"12px 12px 12px 24px",border:`1px solid ${C.cardBorder}`,padding:28,boxShadow:"0 1px 3px rgba(0,75,155,.04),0 4px 14px rgba(0,75,155,.03)",...s}}>{children}</div>
);}
function TokenRow({label,value,color}:{label:string,value:string,color?:string}){return(
  <div style={{display:"flex",alignItems:"center",gap:10,fontSize:12,fontFamily:F.body}}>{color&&<div style={{width:16,height:16,borderRadius:4,background:color,border:`1px solid ${C.cardBorder}`,flexShrink:0}}/>}<span style={{color:C.cinzaChumbo,minWidth:120}}>{label}</span><code style={{background:C.neutro,padding:"2px 8px",borderRadius:4,fontSize:11,fontFamily:F.mono,color:C.cinzaEscuro}}>{value}</code></div>
);}

/* ═══════════════════════════════════════════ DRAWER COMPONENT ═══════════════════════════════════════════ */
const overlayStyle:React.CSSProperties={position:"fixed",inset:0,background:"rgba(0,42,104,.45)",backdropFilter:"blur(4px)",zIndex:9998,transition:"opacity .25s"};
const panelBase:React.CSSProperties={position:"fixed",top:0,right:0,height:"100%",background:C.cardBg,boxShadow:"-8px 0 32px rgba(0,42,104,.12)",zIndex:9999,display:"flex",flexDirection:"column",transition:"transform .3s cubic-bezier(.32,.72,0,1)",overflowY:"auto"};

function DemoDrawer({open,onClose,width=440,title,subtitle,children,footer}:{open:boolean,onClose:()=>void,width?:number,title:string,subtitle?:string,children:React.ReactNode,footer?:React.ReactNode}){
  if(!open)return null;
  return(
    <>
      <div style={overlayStyle} onClick={onClose}/>
      <div style={{...panelBase,width,transform:open?"translateX(0)":"translateX(100%)"}}>
        <div style={{padding:"20px 24px 16px",borderBottom:`1px solid ${C.cardBorder}`,display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexShrink:0}}>
          <div>
            <h3 style={{fontSize:17,fontWeight:700,color:C.azulEscuro,margin:0,fontFamily:F.title}}>{title}</h3>
            {subtitle&&<p style={{fontSize:13,color:C.cinzaChumbo,margin:"4px 0 0",fontFamily:F.body,lineHeight:1.45}}>{subtitle}</p>}
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",padding:4,borderRadius:6,display:"flex",opacity:.5,transition:"opacity .15s"}} onMouseEnter={e=>(e.currentTarget.style.opacity="1")} onMouseLeave={e=>(e.currentTarget.style.opacity=".5")}>{Ic.x(18)}</button>
        </div>
        <div style={{flex:1,padding:"20px 24px",overflowY:"auto"}}>{children}</div>
        {footer&&<div style={{padding:"16px 24px",borderTop:`1px solid ${C.cardBorder}`,flexShrink:0}}>{footer}</div>}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════ MINI UI ═══════════════════════════════════════════ */
function Btn({children,variant="primary",onClick,full,s}:{children:React.ReactNode,variant?:"primary"|"secondary"|"danger"|"ghost",onClick?:()=>void,full?:boolean,s?:React.CSSProperties}){
  const styles:{[k:string]:React.CSSProperties}={
    primary:{background:C.azulProfundo,color:C.branco,border:"none"},
    secondary:{background:"transparent",color:C.cinzaEscuro,border:`1.5px solid ${C.inputBorder}`},
    danger:{background:C.danger,color:C.branco,border:"none"},
    ghost:{background:"transparent",color:C.azulProfundo,border:"none"},
  };
  return <button onClick={onClick} style={{padding:"8px 18px",fontSize:13,fontWeight:600,borderRadius:8,cursor:"pointer",fontFamily:F.body,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,transition:"all .15s",width:full?"100%":undefined,...styles[variant],...s}}>{children}</button>;
}

function MiniInput({label,placeholder,icon,value,readOnly,compact}:{label?:string,placeholder?:string,icon?:React.ReactNode,value?:string,readOnly?:boolean,compact?:boolean}){
  const h=compact?30:35;
  return(
    <div style={{display:"flex",flexDirection:"column",minWidth:0}}>
      {label&&<label style={{fontSize:compact?11:12,fontWeight:600,color:C.cinzaEscuro,fontFamily:F.body,marginBottom:1,marginLeft:7}}>{label}</label>}
      <div style={{display:"flex",alignItems:"center",gap:8,height:h,padding:"0 12px",background:readOnly?"#F8FAFC":C.branco,border:`1.5px solid ${C.inputBorder}`,borderRadius:8,fontFamily:F.body,fontSize:compact?12:13,color:C.cinzaEscuro}}>
        {icon&&<span style={{display:"flex",flexShrink:0,opacity:.55}}>{icon}</span>}
        <input readOnly style={{flex:1,border:"none",outline:"none",background:"transparent",fontFamily:F.body,fontSize:compact?12:13,color:C.cinzaEscuro,minWidth:0}} placeholder={placeholder} defaultValue={value}/>
      </div>
    </div>
  );
}

function MiniSelect({label,options,compact,icon}:{label?:string,options:string[],compact?:boolean,icon?:React.ReactNode}){
  const h=compact?30:35;
  return(
    <div style={{display:"flex",flexDirection:"column",minWidth:0}}>
      {label&&<label style={{fontSize:compact?11:12,fontWeight:600,color:C.cinzaEscuro,fontFamily:F.body,marginBottom:1,marginLeft:7}}>{label}</label>}
      <div style={{display:"flex",alignItems:"center",gap:8,height:h,padding:"0 12px",borderRadius:8,border:`1.5px solid ${C.inputBorder}`,background:C.branco,fontFamily:F.body,fontSize:compact?12:13}}>
        {icon&&<span style={{display:"flex",flexShrink:0,opacity:.55}}>{icon}</span>}
        <select style={{flex:1,border:"none",outline:"none",background:"transparent",fontFamily:F.body,fontSize:compact?12:13,color:C.cinzaEscuro,cursor:"pointer",WebkitAppearance:"none",MozAppearance:"none",appearance:"none" as any,minWidth:0}}>{options.map(o=><option key={o}>{o}</option>)}</select>
        <span style={{display:"flex",flexShrink:0,opacity:.5}}>{Ic.dropdown(16)}</span>
      </div>
    </div>
  );
}

function MiniTextarea({label,placeholder,rows=3}:{label?:string,placeholder?:string,rows?:number}){
  return(
    <div style={{display:"flex",flexDirection:"column",minWidth:0}}>
      {label&&<label style={{fontSize:12,fontWeight:600,color:C.cinzaEscuro,fontFamily:F.body,marginBottom:1,marginLeft:7}}>{label}</label>}
      <textarea placeholder={placeholder} rows={rows} style={{padding:"8px 12px",borderRadius:8,border:`1.5px solid ${C.inputBorder}`,background:C.branco,fontFamily:F.body,fontSize:13,color:C.cinzaEscuro,outline:"none",resize:"vertical"}}/>
    </div>
  );
}

function MiniBadge({children,variant="default"}:{children:React.ReactNode,variant?:"default"|"success"|"warning"|"danger"|"info"|"secondary"}){
  const m:{[k:string]:{bg:string,color:string,border:string}}={
    default:{bg:C.azulProfundo,color:C.branco,border:"transparent"},
    success:{bg:"#ECFDF5",color:C.verdeEscuro,border:"#A7F3D0"},
    warning:{bg:"#FFF7ED",color:"#C2410C",border:"#FDBA74"},
    danger:{bg:"#FEF2F2",color:"#B91C1C",border:"#FECACA"},
    info:{bg:C.azulCeuClaro,color:C.azulEscuro,border:C.azulCeu},
    secondary:{bg:C.bg,color:C.cinzaEscuro,border:C.cardBorder},
  };
  const v=m[variant]||m.default;
  return <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"2px 8px",fontSize:11,fontWeight:600,fontFamily:F.body,color:v.color,background:v.bg,border:`1px solid ${v.border}`,borderRadius:4,lineHeight:1.3,whiteSpace:"nowrap"}}>{children}</span>;
}

/* ═══════════════════════════════════════════ DETAIL ROW ═══════════════════════════════════════════ */
function DetailRow({icon,label,value}:{icon:React.ReactNode,label:string,value:string}){
  return(
    <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:14}}>
      <span style={{display:"flex",flexShrink:0,marginTop:2,opacity:.6}}>{icon}</span>
      <div><p style={{fontSize:11,color:C.cinzaChumbo,margin:0,fontFamily:F.body}}>{label}</p><p style={{fontSize:13,fontWeight:600,color:C.cinzaEscuro,margin:"1px 0 0",fontFamily:F.body}}>{value}</p></div>
    </div>
  );
}

/* ═══════════════════════════════════════════ PROGRESS BAR ═══════════════════════════════════════════ */
function MiniProgress({value,color=C.azulProfundo}:{value:number,color?:string}){
  return(
    <div style={{height:6,borderRadius:3,background:C.bg,overflow:"hidden"}}>
      <div style={{height:"100%",width:`${value}%`,borderRadius:3,background:color,transition:"width .4s"}}/>
    </div>
  );
}

/* ═══════════════════════════════════════════ GUIDELINE ROW ═══════════════════════════════════════════ */
function GuideRow({icon,title,desc,positive}:{icon:React.ReactNode,title:string,desc:string,positive:boolean}){
  return(
    <div style={{display:"flex",gap:12,alignItems:"flex-start",padding:"12px 16px",background:positive?"#F0FDF4":"#FEF2F2",borderRadius:10,border:`1px solid ${positive?"#BBF7D0":"#FECACA"}`}}>
      <span style={{flexShrink:0,marginTop:2}}>{icon}</span>
      <div>
        <p style={{fontSize:13,fontWeight:600,color:positive?C.verdeEscuro:"#B91C1C",margin:0,fontFamily:F.body}}>{title}</p>
        <p style={{fontSize:12,color:C.cinzaChumbo,margin:"3px 0 0",lineHeight:1.45,fontFamily:F.body}}>{desc}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ MAIN ═══════════════════════════════════════════ */
export default function DrawerDoc(){
  const [w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h)},[]);
  const mob=w<640;

  const [filterOpen,setFilterOpen]=useState(false);
  const [detailOpen,setDetailOpen]=useState(false);
  const [formOpen,setFormOpen]=useState(false);

  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.bg} 0%,${C.azulCeuClaro}44 50%,${C.bg} 100%)`,fontFamily:F.body,color:C.cinzaEscuro}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Saira+Expanded:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&family=Fira+Code:wght@400;500&display=swap');
input::placeholder{color:${C.textLight};}
select{-webkit-appearance:none;-moz-appearance:none;appearance:none;}
`}</style>

      {/* ══════ HEADER ══════ */}
      <header style={{background:`linear-gradient(135deg,${C.azulProfundo} 0%,${C.azulEscuro} 100%)`,padding:mob?"32px 20px":"48px 40px 44px",position:"relative",overflow:"hidden"}}>
        <JunctionLines style={{position:"absolute",top:-10,right:-20,width:mob?250:400,height:250}}/>
        <JunctionLines style={{position:"absolute",bottom:-30,left:"30%",width:500,height:200,transform:"scaleX(-1)"}}/>
        <div style={{position:"relative"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${C.branco}10`,border:`1px solid ${C.branco}18`,borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",color:C.amareloOuro,fontFamily:F.title,marginBottom:16}}>
            {Ic.grid(14,C.amareloOuro)} Design System FIPS
          </div>
          <h1 style={{fontSize:mob?30:44,fontWeight:700,color:C.branco,margin:"0 0 10px",fontFamily:F.title}}>Drawer</h1>
          <p style={{fontSize:16,color:`${C.branco}B0`,lineHeight:1.6,maxWidth:700,margin:0,fontFamily:F.body}}>
            Painéis laterais deslizantes para <strong style={{color:`${C.branco}DD`}}>filtros avançados, detalhes de registro e formulários auxiliares</strong>. Mantêm a tabela ou listagem parcialmente visível enquanto o operador interage com controles secundários.
          </p>
          {/* Anatomy badges */}
          <div style={{display:"flex",gap:14,marginTop:24,flexWrap:"wrap"}}>
            {[
              {l:"DrawerTrigger",c:C.azulClaro},
              {l:"DrawerContent",c:C.cinzaEscuro},
              {l:"DrawerHeader",c:C.amareloOuro},
              {l:"DrawerTitle",c:C.branco},
              {l:"DrawerOverlay",c:C.cinzaChumbo},
              {l:"DrawerFooter",c:C.inputBorder},
            ].map(t=>(
              <div key={t.l} style={{display:"flex",alignItems:"center",gap:8,background:`${C.branco}08`,border:`1px solid ${C.branco}15`,borderRadius:6,padding:"6px 12px",fontSize:12,color:`${C.branco}90`,fontFamily:F.mono}}>
                <div style={{width:12,height:12,borderRadius:3,background:t.c,border:`1px solid ${C.branco}20`,flexShrink:0}}/>{t.l}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ══════ BODY ══════ */}
      <div style={{padding:mob?"24px 16px 40px":"36px 40px 60px",maxWidth:1100}}>

        {/* 01 — FILTER DRAWER */}
        <Section n="01" title="Filtro avançado lateral" desc="Drawer de filtros mantém a listagem parcialmente visivel. Ideal para cenários com muitos critérios de busca — certificados, empresas, SSMA.">
          <Card>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <h3 style={{fontSize:18,fontWeight:700,color:C.azulEscuro,fontFamily:F.title,margin:0}}>Painel de Filtros</h3>
              <Btn variant="secondary" onClick={()=>setFilterOpen(true)}>{Ic.filter(15,C.cinzaEscuro)} Abrir filtro lateral</Btn>
            </div>

            {/* Inline preview */}
            <div style={{background:C.bg,borderRadius:12,border:`1px solid ${C.cardBorder}`,padding:20}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                {Ic.panelRight(18,C.azulClaro)}
                <span style={{fontSize:12,fontWeight:600,color:C.azulClaro,fontFamily:F.title,letterSpacing:".5px",textTransform:"uppercase"}}>Preview do drawer de filtros</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:12}}>
                <MiniInput label="Busca rápida" placeholder="Empresa, CNPJ ou responsável..." icon={Ic.search(14)} compact/>
                <MiniSelect label="Status" options={["Selecione","Ativo","Pendente","Inativo"]} compact icon={Ic.dropdown(14,C.cinzaChumbo)}/>
                <MiniSelect label="Segmento" options={["Selecione","Grãos","Contêiner","Granel líquido","Carga geral"]} compact/>
                <MiniInput label="Vencimento até" placeholder="dd/mm/aaaa" icon={Ic.calendar(14)} compact/>
                <MiniSelect label="Responsável fiscal" options={["Selecione o colaborador","Fábio","Ronaldo","Marcela"]} compact icon={Ic.user(14)}/>
                <MiniSelect label="Tipo certificado" options={["Selecione","A1","A3","NF-e","CT-e"]} compact icon={Ic.doc(14)}/>
              </div>
              <div style={{display:"flex",gap:10,marginTop:16}}>
                <Btn variant="secondary" s={{flex:1}}>Limpar</Btn>
                <Btn variant="primary" s={{flex:1}}>Aplicar filtros</Btn>
              </div>
            </div>

            <p style={{fontSize:12,color:C.cinzaChumbo,lineHeight:1.5,margin:"16px 0 0",fontFamily:F.body,fontStyle:"italic",paddingLeft:10,borderLeft:`2px solid ${C.azulCeuClaro}`}}>
              Clique em "Abrir filtro lateral" para ver o drawer real sobrepondo a tela. A densidade compacta dos campos otimiza o uso vertical do painel.
            </p>
          </Card>
        </Section>

        {/* 02 — DETAIL DRAWER */}
        <Section n="02" title="Detalhe de registro" desc="Leitura rápida de informações sem sair da listagem principal. Certificados, empresas e ocorrências SSMA podem ser inspecionados no painel lateral.">
          <Card>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <h3 style={{fontSize:18,fontWeight:700,color:C.azulEscuro,fontFamily:F.title,margin:0}}>Detalhe lateral</h3>
              <Btn onClick={()=>setDetailOpen(true)}>{Ic.shield(15,C.branco)} Abrir detalhe lateral</Btn>
            </div>

            {/* Inline preview */}
            <div style={{background:C.bg,borderRadius:12,border:`1px solid ${C.cardBorder}`,padding:20}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                {Ic.panelRight(18,C.azulClaro)}
                <span style={{fontSize:12,fontWeight:600,color:C.azulClaro,fontFamily:F.title,letterSpacing:".5px",textTransform:"uppercase"}}>Preview do drawer de detalhe</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                <div style={{width:44,height:44,borderRadius:"50%",background:`${C.azulCeuClaro}88`,display:"flex",alignItems:"center",justifyContent:"center"}}>{Ic.shield(22,C.azulProfundo)}</div>
                <div>
                  <p style={{fontSize:16,fontWeight:700,color:C.azulEscuro,margin:0,fontFamily:F.title}}>Certificado #508</p>
                  <p style={{fontSize:12,color:C.cinzaChumbo,margin:0,fontFamily:F.body}}>Leitura rápida sem sair da listagem.</p>
                </div>
              </div>
              <div style={{display:"flex",gap:6,marginBottom:16}}>
                <MiniBadge variant="warning">Vencendo</MiniBadge>
                <MiniBadge variant="secondary">A1</MiniBadge>
              </div>
              <div style={{background:C.cardBg,borderRadius:10,border:`1px solid ${C.cardBorder}`,padding:14,marginBottom:16}}>
                <p style={{fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,margin:"0 0 8px"}}>Progresso de renovacao</p>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontFamily:F.body,marginBottom:6}}>
                  <span style={{fontWeight:600,color:C.cinzaEscuro}}>Em andamento</span>
                  <span style={{color:C.cinzaChumbo}}>64%</span>
                </div>
                <MiniProgress value={64}/>
              </div>
              <DetailRow icon={Ic.building(16)} label="Empresa" value="Black Ice Confecções e Comércio"/>
              <DetailRow icon={Ic.user(16)} label="Responsável" value="Ronaldo"/>
              <DetailRow icon={Ic.calendar(16)} label="Vencimento" value="30/04/2026"/>
              <DetailRow icon={Ic.check(14,C.verdeEscuro)} label="Observação" value="Renovação já sinalizada para o time fiscal."/>
            </div>
          </Card>
        </Section>

        {/* 03 — FORM DRAWER */}
        <Section n="03" title="Formulário auxiliar" desc="Drawer para cadastros rápidos e edições inline — como registro de nova ocorrência SSMA ou inclusão de empresa sem sair da tela principal.">
          <Card>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <h3 style={{fontSize:18,fontWeight:700,color:C.azulEscuro,fontFamily:F.title,margin:0}}>Formulário lateral</h3>
              <Btn onClick={()=>setFormOpen(true)}>{Ic.hardhat(15,C.branco)} Registrar ocorrência SSMA</Btn>
            </div>

            {/* Inline preview */}
            <div style={{background:C.bg,borderRadius:12,border:`1px solid ${C.cardBorder}`,padding:20}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                {Ic.panelRight(18,C.azulClaro)}
                <span style={{fontSize:12,fontWeight:600,color:C.azulClaro,fontFamily:F.title,letterSpacing:".5px",textTransform:"uppercase"}}>Preview do drawer de formulario</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr",gap:12}}>
                <MiniSelect label="Tipo de ocorrência" options={["Selecione","Incidente","Quase-acidente","Desvio","Melhoria"]} icon={Ic.alert(14)}/>
                <MiniInput label="Local" placeholder="Berço, armazém ou pátio..." icon={Ic.building(14)}/>
                <MiniInput label="Data da ocorrência" placeholder="dd/mm/aaaa" icon={Ic.calendar(14)}/>
                <MiniSelect label="Severidade" options={["Selecione","Baixa","Média","Alta","Crítica"]}/>
                <MiniInput label="Responsável pela ação" placeholder="Nome do colaborador" icon={Ic.user(14)}/>
                <MiniTextarea label="Descrição da ocorrência" placeholder="Descreva o ocorrido, condições e ações imediatas tomadas..." rows={3}/>
              </div>
              <div style={{display:"flex",gap:10,marginTop:16}}>
                <Btn variant="secondary" s={{flex:1}}>Cancelar</Btn>
                <Btn variant="primary" s={{flex:1}}>{Ic.save(13)} Registrar</Btn>
              </div>
            </div>

            <p style={{fontSize:12,color:C.cinzaChumbo,lineHeight:1.5,margin:"16px 0 0",fontFamily:F.body,fontStyle:"italic",paddingLeft:10,borderLeft:`2px solid ${C.azulCeuClaro}`}}>
              Formulários auxiliares no drawer evitam perda de contexto. O operador mantém a listagem visível e retorna ao fluxo sem navegação adicional.
            </p>
          </Card>
        </Section>

        {/* 04 — USAGE GUIDELINES */}
        <Section n="04" title="Diretrizes de uso" desc="Quando usar Drawer e quando preferir Modal ou navegação completa.">
          <Card>
            <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:14}}>
              <GuideRow positive icon={Ic.check(14,C.verdeEscuro)} title="Use Drawer quando..." desc="O operador precisa manter a listagem ou tabela parcialmente visível enquanto interage com filtros, detalhes ou formulários rápidos."/>
              <GuideRow positive icon={Ic.check(14,C.verdeEscuro)} title="Filtros avançados com muitos campos" desc="Drawers laterais comportam formulários longos com scroll, sem bloquear toda a interface como um modal faria."/>
              <GuideRow positive={false} icon={Ic.x(14,"#B91C1C")} title="Evite para ações destrutivas" desc="Confirmações de exclusão, cancelamentos irreversíveis ou qualquer ação crítica devem usar Dialog/Modal com foco total."/>
              <GuideRow positive={false} icon={Ic.x(14,"#B91C1C")} title="Evite para cadastros complexos" desc="Formulários com mais de 8 campos ou com múltiplas etapas pedem uma página dedicada, não um drawer."/>
              <GuideRow positive icon={Ic.check(14,C.verdeEscuro)} title="Inspeção rápida de registros" desc="Ver detalhes de um certificado, empresa ou ocorrência SSMA sem sair da listagem principal."/>
              <GuideRow positive={false} icon={Ic.x(14,"#B91C1C")} title="Evite drawers empilhados" desc="Nunca abra um drawer dentro de outro. Se a interação requer profundidade, navegue para uma página ou use um modal dentro do drawer."/>
            </div>

            <div style={{marginTop:20,padding:16,background:C.bg,borderRadius:10,border:`1px solid ${C.cardBorder}`}}>
              <p style={{fontSize:10,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,margin:"0 0 8px"}}>Drawer vs Modal — regra prática</p>
              <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:12}}>
                <div style={{padding:12,background:C.cardBg,borderRadius:8,border:`1px solid ${C.cardBorder}`}}>
                  <p style={{fontSize:13,fontWeight:700,color:C.azulEscuro,margin:"0 0 4px",fontFamily:F.title}}>{Ic.panelRight(14,C.azulProfundo)} Drawer</p>
                  <p style={{fontSize:12,color:C.cinzaChumbo,margin:0,lineHeight:1.5,fontFamily:F.body}}>Contexto parcial necessário. Filtros, detalhes, edição rápida. O conteúdo principal permanece visível.</p>
                </div>
                <div style={{padding:12,background:C.cardBg,borderRadius:8,border:`1px solid ${C.cardBorder}`}}>
                  <p style={{fontSize:13,fontWeight:700,color:C.azulEscuro,margin:"0 0 4px",fontFamily:F.title}}>Modal / Dialog</p>
                  <p style={{fontSize:12,color:C.cinzaChumbo,margin:0,lineHeight:1.5,fontFamily:F.body}}>Foco total necessário. Confirmações, alertas, ações destrutivas. Bloqueia interação com o fundo.</p>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* 05 — TOKEN REFERENCE */}
        <Section n="05" title="Referência de tokens" desc="Valores de design padronizados do Drawer no Design System FIPS.">
          <Card s={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr 1fr",gap:28}}>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Dimensões</span>
              <TokenRow label="Largura padrão" value="440px"/>
              <TokenRow label="Largura compacta" value="360px"/>
              <TokenRow label="Largura larga" value="560px"/>
              <TokenRow label="Altura" value="100vh"/>
              <TokenRow label="Header padding" value="20px 24px"/>
              <TokenRow label="Body padding" value="20px 24px"/>
              <TokenRow label="Footer padding" value="16px 24px"/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Cores & Efeitos</span>
              <TokenRow label="Overlay bg" value="rgba(0,42,104,.45)" color="rgba(0,42,104,.45)"/>
              <TokenRow label="Panel bg" value="#FFFFFF" color={C.branco}/>
              <TokenRow label="Border" value="#E2E8F0" color={C.cardBorder}/>
              <TokenRow label="Shadow" value="−8px 0 32px"/>
              <TokenRow label="Backdrop blur" value="4px"/>
              <TokenRow label="Transition" value="300ms cubic-bezier"/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Tipografia</span>
              <TokenRow label="Título" value="Saira Expanded 700"/>
              <TokenRow label="Título size" value="17px"/>
              <TokenRow label="Subtítulo" value="Open Sans 400"/>
              <TokenRow label="Subtítulo size" value="13px"/>
              <TokenRow label="Body font" value="Open Sans"/>
              <TokenRow label="Close btn" value="18px icon"/>
            </div>
          </Card>
        </Section>

        {/* ══════ FOOTER ══════ */}
        <div style={{textAlign:"center",padding:"20px 0 0",borderTop:`1px solid ${C.cardBorder}`,marginTop:20}}>
          <span style={{fontSize:12,color:C.cinzaChumbo,letterSpacing:".5px",fontFamily:F.title,fontWeight:400}}>DS-FIPS v2.0 · Ferrovia Interna do Porto de Santos · Excelência sobre trilhos · {new Date().getFullYear()}</span>
        </div>
      </div>

      {/* ══════ LIVE DRAWERS ══════ */}

      {/* Filter Drawer */}
      <DemoDrawer open={filterOpen} onClose={()=>setFilterOpen(false)} width={440} title="Filtros avançados" subtitle="Refine a listagem de certificados sem perder o contexto da tabela.">
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <MiniInput label="Busca rápida" placeholder="Empresa, CNPJ ou responsável..." icon={Ic.search(14)} compact/>
          <MiniSelect label="Status" options={["Selecione","Ativo","Pendente","Novo","Inativo"]} compact icon={Ic.dropdown(14,C.cinzaChumbo)}/>
          <MiniSelect label="Segmento" options={["Selecione","Grãos","Contêiner","Granel líquido","Carga geral"]} compact/>
          <MiniSelect label="Responsável fiscal" options={["Selecione o colaborador","Fábio","Ronaldo","Marcela"]} compact icon={Ic.user(14)}/>
          <MiniInput label="Vencimento até" placeholder="dd/mm/aaaa" value="30/04/2026" icon={Ic.calendar(14)} compact/>
          <MiniSelect label="Tipo certificado" options={["Selecione","A1","A3","NF-e","CT-e"]} compact icon={Ic.doc(14)}/>
        </div>
        <div style={{display:"flex",gap:10,marginTop:24}}>
          <Btn variant="secondary" s={{flex:1}}>Limpar</Btn>
          <Btn variant="primary" s={{flex:1}} onClick={()=>setFilterOpen(false)}>Aplicar filtros</Btn>
        </div>
      </DemoDrawer>

      {/* Detail Drawer */}
      <DemoDrawer open={detailOpen} onClose={()=>setDetailOpen(false)} width={460} title="Certificado #508" subtitle="Leitura rápida sem sair da listagem." footer={
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <Btn full>Editar certificado</Btn>
          <Btn variant="secondary" full>Visualizar na aba acessos</Btn>
        </div>
      }>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <div style={{width:44,height:44,borderRadius:"50%",background:`${C.azulCeuClaro}88`,display:"flex",alignItems:"center",justifyContent:"center"}}>{Ic.shield(22,C.azulProfundo)}</div>
          <div style={{display:"flex",gap:6}}>
            <MiniBadge variant="warning">Vencendo</MiniBadge>
            <MiniBadge variant="secondary">A1</MiniBadge>
          </div>
        </div>

        <div style={{background:C.bg,borderRadius:10,border:`1px solid ${C.cardBorder}`,padding:14,marginBottom:20}}>
          <p style={{fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,margin:"0 0 10px"}}>Progresso de renovação</p>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontFamily:F.body,marginBottom:6}}>
            <span style={{fontWeight:600,color:C.cinzaEscuro}}>Em andamento</span>
            <span style={{color:C.cinzaChumbo}}>64%</span>
          </div>
          <MiniProgress value={64}/>
        </div>

        <DetailRow icon={Ic.building(16)} label="Empresa" value="Black Ice Confecções e Comércio"/>
        <DetailRow icon={Ic.user(16)} label="Responsável" value="Ronaldo"/>
        <DetailRow icon={Ic.calendar(16)} label="Vencimento" value="30/04/2026"/>
        <DetailRow icon={Ic.check(14,C.verdeEscuro)} label="Observação" value="Renovação já sinalizada para o time fiscal."/>
      </DemoDrawer>

      {/* Form Drawer */}
      <DemoDrawer open={formOpen} onClose={()=>setFormOpen(false)} width={480} title="Registrar ocorrência SSMA" subtitle="Registro rápido de incidente, quase-acidente ou desvio operacional." footer={
        <div style={{display:"flex",gap:10}}>
          <Btn variant="secondary" s={{flex:1}} onClick={()=>setFormOpen(false)}>Cancelar</Btn>
          <Btn s={{flex:1}} onClick={()=>setFormOpen(false)}>{Ic.save(13)} Registrar</Btn>
        </div>
      }>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <MiniSelect label="Tipo de ocorrência" options={["Selecione","Incidente","Quase-acidente","Desvio","Melhoria"]} icon={Ic.alert(14)}/>
          <MiniInput label="Local" placeholder="Berço, armazém ou pátio..." icon={Ic.building(14)}/>
          <MiniInput label="Data da ocorrência" placeholder="dd/mm/aaaa" icon={Ic.calendar(14)}/>
          <MiniSelect label="Severidade" options={["Selecione","Baixa","Média","Alta","Crítica"]}/>
          <MiniInput label="Empresa envolvida" placeholder="Nome ou CNPJ" icon={Ic.building(14)}/>
          <MiniInput label="Responsável pela ação" placeholder="Nome do colaborador" icon={Ic.user(14)}/>
          <MiniTextarea label="Descrição da ocorrência" placeholder="Descreva o ocorrido, condições e ações imediatas tomadas..." rows={4}/>
        </div>
      </DemoDrawer>
    </div>
  );
}
