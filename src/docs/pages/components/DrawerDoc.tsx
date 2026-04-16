// @ts-nocheck
import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════ TOKENS ═══════════════════════════════════════════ */
const C={azulProfundo:"#004B9B",azulEscuro:"#002A68",azulClaro:"#658EC9",cinzaChumbo:"#7B8C96",cinzaEscuro:"#333B41",cinzaClaro:"#C0CCD2",azulCeu:"#93BDE4",azulCeuClaro:"#D3E3F4",amareloOuro:"#FDC24E",amareloEscuro:"#F6921E",verdeFloresta:"#00C64C",verdeEscuro:"#00904C",danger:"#DC3545",neutro:"#E8EBFF",branco:"#FFFFFF",bg:"#F2F4F8",cardBg:"#FFFFFF",cardBorder:"#E2E8F0",textMuted:"#64748B",textLight:"#94A3B8",inputBorder:"#CBD5E1"};
const Fn={title:"'Saira Expanded',sans-serif",body:"'Open Sans',sans-serif",mono:"'Fira Code',monospace"};

/* ═══════════════════════════════════════════ ICONS ═══════════════════════════════════════════ */
const Ic={
  x:(s=18,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  grid:(s=14,c=C.amareloOuro)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="11" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="2" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="11" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/></svg>,
  check:(s=16,c=C.verdeFloresta)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke={c} strokeWidth="1.5"/><path d="M7 10l2 2 4-4" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  alert:(s=16,c=C.amareloEscuro)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M10 2L1.5 17h17L10 2z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M10 8v4M10 14v.5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  fire:(s=16,c=C.danger)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M10 2C7.5 6 5 8 5 11.5a5 5 0 0010 0C15 8 12.5 6 10 2z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  pessoa:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6" r="3.5" stroke={c} strokeWidth="1.5"/><path d="M3 17.5c0-3.5 3-5.5 7-5.5s7 2 7 5.5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  doc:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M6 2h6l5 5v10a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M12 2v5h5M8 11h4M8 14h6" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
  filter:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M2 4h16M5 10h10M8 16h4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  email:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke={c} strokeWidth="1.5"/><path d="M2 6l8 5 8-5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  phone:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M3 5.5C3 4.7 3.7 4 4.5 4H7l1.5 3.5-2 1.5a10 10 0 004.5 4.5l1.5-2L16 13v2.5c0 .8-.7 1.5-1.5 1.5C8 17 3 12 3 5.5z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  calendar:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="14" rx="2" stroke={c} strokeWidth="1.5"/><path d="M2 8h16M6 2v4M14 2v4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  tag:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M2 4a2 2 0 012-2h5.17a2 2 0 011.42.59l7.24 7.24a2 2 0 010 2.83l-5.17 5.17a2 2 0 01-2.83 0L2.59 10.6A2 2 0 012 9.17V4z" stroke={c} strokeWidth="1.5"/><circle cx="6.5" cy="6.5" r="1" fill={c}/></svg>,
  building:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="1.5" stroke={c} strokeWidth="1.5"/><path d="M7 6h2M11 6h2M7 10h2M11 10h2M8 14h4v4H8z" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
  cnpj:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="14" rx="2" stroke={c} strokeWidth="1.5"/><path d="M6 7h8M6 10h5M6 13h3" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
  map:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M10 2C6.7 2 4 4.7 4 8c0 4.5 6 10 6 10s6-5.5 6-10c0-3.3-2.7-6-6-6z" stroke={c} strokeWidth="1.5"/><circle cx="10" cy="8" r="2" stroke={c} strokeWidth="1.3"/></svg>,
  status:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke={c} strokeWidth="1.5"/><path d="M7 10l2 2 4-4" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  prioridade:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M4 18V3l12 5-12 5" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
};

function JunctionLines({style}){return <svg viewBox="0 0 320 200" fill="none" style={{opacity:.12,...style}}><path d="M0 60H100C120 60 120 60 140 40L200 40H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 60H100C120 60 120 60 140 80L200 80H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 120H60C80 120 80 120 100 100L160 100H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 120H60C80 120 80 120 100 140L160 140H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/></svg>}

/* ═══════════════════════════════════════════ BADGE mini ═══════════════════════════════════════════ */
const BV={sucesso:{bg:"#ECFDF5",color:C.verdeEscuro,border:"#A7F3D0"},atencao:{bg:"#FFF7ED",color:"#C2410C",border:"#FDBA74"},critico:{bg:"#FEF2F2",color:"#B91C1C",border:"#FECACA"},info:{bg:C.azulCeuClaro,color:C.azulEscuro,border:C.azulCeu},default:{bg:C.azulProfundo,color:C.branco,border:"transparent"},secondary:{bg:C.bg,color:C.cinzaEscuro,border:C.cardBorder}};
function Badge({variant="default",children,dot,size="md"}){const v=BV[variant]||BV.default;return(<span style={{display:"inline-flex",alignItems:"center",gap:5,padding:`2px ${size==="sm"?6:8}px`,fontSize:size==="sm"?10:11,fontWeight:600,fontFamily:Fn.body,color:v.color,background:v.bg,border:`1px solid ${v.border}`,borderRadius:4,whiteSpace:"nowrap"}}>{dot&&<span style={{width:6,height:6,borderRadius:"50%",background:v.color,opacity:.85}}/>}{children}</span>)}

/* ═══════════════════════════════════════════
   DRAWER COMPONENT
   ═══════════════════════════════════════════ */
function Drawer({open,onClose,title,subtitle,children,footer,side="right",width=420}){
  const [visible,setVisible]=useState(false);
  const [animIn,setAnimIn]=useState(false);

  useEffect(()=>{
    if(open){setVisible(true);requestAnimationFrame(()=>requestAnimationFrame(()=>setAnimIn(true)))}
    else{setAnimIn(false);const t=setTimeout(()=>setVisible(false),300);return()=>clearTimeout(t)}
  },[open]);

  useEffect(()=>{
    if(!open)return;
    const h=(e)=>{if(e.key==="Escape")onClose()};
    document.addEventListener("keydown",h);
    return()=>document.removeEventListener("keydown",h);
  },[open,onClose]);

  if(!visible)return null;

  const isH=side==="left"||side==="right";
  const panelStyle=isH?{
    position:"fixed",top:0,[side]:0,width,maxWidth:"90vw",height:"100vh",zIndex:1001,
    background:C.cardBg,boxShadow:"-4px 0 24px rgba(0,0,0,.12)",
    display:"flex",flexDirection:"column",
    transform:animIn?"translateX(0)":`translateX(${side==="right"?"100%":"-100%"})`,
    transition:"transform .3s cubic-bezier(.4,0,.2,1)",
  }:{
    position:"fixed",[side]:0,left:0,right:0,height:width,maxHeight:"80vh",zIndex:1001,
    background:C.cardBg,boxShadow:"0 -4px 24px rgba(0,0,0,.12)",
    display:"flex",flexDirection:"column",
    transform:animIn?"translateY(0)":`translateY(${side==="bottom"?"100%":"-100%"})`,
    transition:"transform .3s cubic-bezier(.4,0,.2,1)",
    borderRadius:side==="bottom"?"12px 12px 0 0":"0 0 12px 12px",
  };

  return(
    <div style={{position:"fixed",inset:0,zIndex:1000}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,42,104,.35)",opacity:animIn?1:0,transition:"opacity .3s",cursor:"pointer"}}/>
      <div style={panelStyle}>
        {/* Header */}
        <div style={{padding:"18px 24px",borderBottom:`1px solid ${C.cardBorder}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div>
            <h2 style={{fontSize:16,fontWeight:700,color:C.azulEscuro,margin:0,fontFamily:Fn.title}}>{title}</h2>
            {subtitle&&<p style={{fontSize:12,color:C.cinzaChumbo,margin:"2px 0 0",fontFamily:Fn.body}}>{subtitle}</p>}
          </div>
          <span onClick={onClose} style={{display:"flex",cursor:"pointer",opacity:.5,padding:4,borderRadius:4,transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.background=C.bg}} onMouseLeave={e=>{e.currentTarget.style.opacity=".5";e.currentTarget.style.background="transparent"}}>{Ic.x(18,C.cinzaChumbo)}</span>
        </div>
        {/* Body */}
        <div style={{flex:1,overflowY:"auto",padding:"20px 24px"}}>{children}</div>
        {/* Footer */}
        {footer&&<div style={{padding:"14px 24px",borderTop:`1px solid ${C.cardBorder}`,background:C.bg,display:"flex",gap:10,justifyContent:"flex-end",flexShrink:0}}>{footer}</div>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ MINI COMPONENTS ═══════════════════════════════════════════ */
function FInput({label,placeholder,value,required,compact,icon}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:1}}>
      {label&&<label style={{fontSize:compact?11:12,fontWeight:600,color:C.cinzaEscuro,fontFamily:Fn.body,marginLeft:7,display:"flex",gap:3}}>{label}{required&&<span style={{color:C.danger}}>*</span>}</label>}
      <div style={{display:"flex",alignItems:"center",gap:8,height:compact?30:35,padding:"0 12px",border:`1.5px solid ${C.inputBorder}`,borderRadius:8,background:C.branco,transition:"all .18s"}} onClick={e=>{const inp=e.currentTarget.querySelector("input");if(inp)inp.focus()}}>
        {icon&&<span style={{display:"flex",flexShrink:0,opacity:.5}}>{icon}</span>}
        <input placeholder={placeholder} defaultValue={value} style={{flex:1,height:"100%",border:"none",outline:"none",background:"transparent",fontFamily:Fn.body,fontSize:compact?12:13,color:C.cinzaEscuro,minWidth:0}} onFocus={e=>e.target.parentElement.style.borderColor=C.azulProfundo} onBlur={e=>e.target.parentElement.style.borderColor=C.inputBorder}/>
      </div>
    </div>
  );
}
function FSelect({label,options=[],value,compact,icon}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:1}}>
      {label&&<label style={{fontSize:compact?11:12,fontWeight:600,color:C.cinzaEscuro,fontFamily:Fn.body,marginLeft:7}}>{label}</label>}
      <div style={{display:"flex",alignItems:"center",gap:8,height:compact?30:35,padding:"0 12px",border:`1.5px solid ${C.inputBorder}`,borderRadius:8,background:C.branco}}>
        {icon&&<span style={{display:"flex",flexShrink:0,opacity:.5}}>{icon}</span>}
        <select defaultValue={value} style={{flex:1,height:"100%",border:"none",outline:"none",background:"transparent",fontFamily:Fn.body,fontSize:compact?12:13,color:C.cinzaEscuro,appearance:"none",WebkitAppearance:"none",cursor:"pointer"}}>
          {options.map(o=><option key={o} value={o}>{o}</option>)}
        </select>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{opacity:.4,flexShrink:0}}><path d="M6 8l4 4 4-4" stroke={C.cinzaChumbo} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </div>
  );
}
function Btn({label,color,outline,onClick,full}){
  return <button onClick={onClick} style={{padding:"7px 18px",fontSize:12,fontWeight:600,background:outline?"transparent":color||C.azulProfundo,color:outline?color||C.cinzaChumbo:C.branco,border:outline?`1.5px solid ${color||C.cinzaClaro}`:"none",borderRadius:6,cursor:"pointer",fontFamily:Fn.body,width:full?"100%":"auto"}}>{label}</button>;
}

/* ═══════════════════════════════════════════ LAYOUT ═══════════════════════════════════════════ */
function Section({n,title,desc,children}){return(<section style={{marginBottom:44}}><div style={{fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:C.azulClaro,fontFamily:Fn.title,marginBottom:6}}>{n}</div><h2 style={{fontSize:20,fontWeight:700,color:C.azulEscuro,margin:"0 0 4px",fontFamily:Fn.title,letterSpacing:".5px"}}>{title}</h2><p style={{fontSize:14,color:C.cinzaChumbo,margin:"0 0 20px",lineHeight:1.55,fontFamily:Fn.body}}>{desc}</p>{children}</section>)}
function DSCard({children,s,mob:m}){return(<div style={{background:C.cardBg,borderRadius:"12px 12px 12px 24px",border:`1px solid ${C.cardBorder}`,padding:m?16:28,boxShadow:"0 1px 3px rgba(0,75,155,.04),0 4px 14px rgba(0,75,155,.03)",...s}}>{children}</div>)}

const gc={background:C.cardBg,border:`1px solid ${C.cardBorder}`,borderRadius:"10px 10px 10px 18px",overflow:"hidden"};
const gh={padding:"16px 20px",background:C.bg,borderBottom:`1px solid ${C.cardBorder}`,display:"flex",alignItems:"center",gap:12};
const gb={padding:"16px 20px 20px"};
const gl={fontSize:10,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:C.azulClaro,fontFamily:Fn.title,marginBottom:4,marginTop:12};
const gt={fontSize:13,color:C.cinzaEscuro,lineHeight:1.55,margin:0,fontFamily:Fn.body};
const ge={fontSize:12,color:C.cinzaChumbo,lineHeight:1.5,margin:0,fontFamily:Fn.body,fontStyle:"italic",paddingLeft:10,borderLeft:`2px solid ${C.azulCeuClaro}`};
const gk={fontSize:11,fontFamily:Fn.mono,color:C.cinzaChumbo,background:C.cardBg,padding:"2px 8px",borderRadius:4,border:`1px solid ${C.cardBorder}`};
function TokenRow({label,value,color}){return(<div style={{display:"flex",alignItems:"center",gap:10,fontSize:12,fontFamily:Fn.body}}>{color&&<div style={{width:16,height:16,borderRadius:4,background:color,border:`1px solid ${C.cardBorder}`,flexShrink:0}}/>}<span style={{color:C.cinzaChumbo,minWidth:130}}>{label}</span><code style={{background:C.neutro,padding:"2px 8px",borderRadius:4,fontSize:11,fontFamily:Fn.mono,color:C.cinzaEscuro}}>{value}</code></div>)}

/* ═══════════════════════════════════════════ MAIN ═══════════════════════════════════════════ */
export default function DrawerDoc(){
  const [w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h)},[]);
  const mob=w<640;

  const [d,setD]=useState({open:false,id:null});
  const open=(id)=>setD({open:true,id});
  const close=()=>setD({open:false,id:null});

  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.bg} 0%,${C.azulCeuClaro}44 50%,${C.bg} 100%)`,fontFamily:Fn.body,color:C.cinzaEscuro}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Saira+Expanded:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&family=Fira+Code:wght@400;500&display=swap');`}</style>

      {/* ══════ LIVE DRAWERS ══════ */}

      {/* Right - Detalhe */}
      <Drawer open={d.open&&d.id==="right"} onClose={close} title="Detalhe da requisição" subtitle="REQ-4025 · Equipamento SSMA" side="right" width={420}
        footer={<><Btn label="Rejeitar" outline color={C.danger} onClick={close}/><Btn label="Aprovar" color={C.verdeFloresta} onClick={close}/></>}>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:C.cinzaChumbo}}>Solicitante</span><span style={{fontSize:13,fontWeight:600,color:C.cinzaEscuro}}>Carlos Santos</span></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:C.cinzaChumbo}}>Departamento</span><span style={{fontSize:13,fontWeight:600,color:C.cinzaEscuro}}>SSMA</span></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:C.cinzaChumbo}}>Valor total</span><span style={{fontSize:13,fontWeight:700,color:C.azulProfundo}}>R$ 2.450,00</span></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:C.cinzaChumbo}}>Status</span><Badge variant="atencao" dot size="sm">Pendente</Badge></div>
          <div style={{height:1,background:C.cardBorder}}/>
          <span style={{fontSize:12,fontWeight:700,color:C.cinzaChumbo,fontFamily:Fn.title,textTransform:"uppercase",letterSpacing:"1px"}}>Itens</span>
          {[{item:"Extintor PQS 6kg",qty:3,val:"R$ 450"},{item:"Cone sinalização 75cm",qty:10,val:"R$ 1.200"},{item:"Fita zebrada 200m",qty:5,val:"R$ 800"}].map(i=>(
            <div key={i.item} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:C.bg,borderRadius:6}}>
              <div><span style={{fontSize:13,color:C.cinzaEscuro,display:"block"}}>{i.item}</span><span style={{fontSize:11,color:C.textMuted}}>Qtd: {i.qty}</span></div>
              <span style={{fontSize:12,fontWeight:600,color:C.azulEscuro,fontFamily:Fn.mono}}>{i.val}</span>
            </div>
          ))}
          <div style={{height:1,background:C.cardBorder}}/>
          <span style={{fontSize:12,fontWeight:700,color:C.cinzaChumbo,fontFamily:Fn.title,textTransform:"uppercase",letterSpacing:"1px"}}>Observação</span>
          <p style={{fontSize:12,color:C.cinzaChumbo,lineHeight:1.5,margin:0}}>Material para reposição do estoque de segurança do pátio ferroviário. Urgência: média. Prazo desejado: 15 dias úteis.</p>
        </div>
      </Drawer>

      {/* Left - Filtros */}
      <Drawer open={d.open&&d.id==="left"} onClose={close} title="Filtros avançados" subtitle="Refine a listagem de resultados" side="left" width={360}
        footer={<><Btn label="Limpar filtros" outline onClick={close}/><Btn label="Aplicar" color={C.azulProfundo} onClick={close}/></>}>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <FSelect icon={Ic.status(14)} label="Status" options={["Todos","Ativo","Pendente","Inativo","Vencido"]} value="Todos" compact/>
          <FSelect icon={Ic.building(14)} label="Departamento" options={["Todos","Operações","Logística","TI","SSMA","RH"]} value="Todos" compact/>
          <FSelect icon={Ic.tag(14)} label="Segmento" options={["Todos","Grãos","Contêiner","Granel","Carga geral"]} value="Todos" compact/>
          <FInput icon={Ic.calendar(14)} label="Período de" placeholder="01/01/2026" compact/>
          <FInput icon={Ic.calendar(14)} label="Período até" placeholder="31/03/2026" compact/>
          <FSelect icon={Ic.prioridade(14)} label="Prioridade" options={["Todas","Baixa","Média","Alta","Urgente"]} value="Todas" compact/>
          <div style={{marginTop:8,padding:"10px 12px",background:`${C.amareloOuro}15`,borderRadius:6,border:`1px solid ${C.amareloOuro}30`}}>
            <span style={{fontSize:11,color:C.amareloEscuro,fontFamily:Fn.body}}>6 filtros disponíveis. Combine para refinar a busca.</span>
          </div>
        </div>
      </Drawer>

      {/* Bottom - Ação rápida */}
      <Drawer open={d.open&&d.id==="bottom"} onClose={close} title="Ação rápida" subtitle="Atribuir responsável" side="bottom" width={280}
        footer={<><Btn label="Cancelar" outline onClick={close}/><Btn label="Salvar" color={C.verdeFloresta} onClick={close}/></>}>
        <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:200}}><FInput icon={Ic.pessoa(14)} label="Responsável" placeholder="Selecione o colaborador" required compact/></div>
          <div style={{flex:1,minWidth:200}}><FSelect icon={Ic.tag(14)} label="Tipo" options={["Interno","Externo","Terceiro"]} value="Interno" compact/></div>
        </div>
      </Drawer>

      {/* Right wide - Edição */}
      <Drawer open={d.open&&d.id==="wide"} onClose={close} title="Editar fornecedor" subtitle="MRS Logística S.A." side="right" width={560}
        footer={<><Btn label="Cancelar" outline onClick={close}/><Btn label="Salvar alterações" color={C.azulProfundo} onClick={close}/></>}>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <FInput icon={Ic.building(14)} label="Razão social" value="MRS Logística S.A." required/>
            <FInput icon={Ic.cnpj(14)} label="CNPJ" value="01.417.222/0001-77" required/>
            <FInput icon={Ic.email(14)} label="Email" value="contato@mrs.com.br"/>
            <FInput icon={Ic.phone(14)} label="Telefone" value="(11) 3138-6000"/>
            <FInput icon={Ic.map(14)} label="Cidade" value="Juiz de Fora"/>
            <FSelect icon={Ic.map(14)} label="UF" options={["MG","SP","RJ","ES","PR"]} value="MG"/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:1}}>
            <label style={{fontSize:12,fontWeight:600,color:C.cinzaEscuro,fontFamily:Fn.body,marginLeft:7}}>Observações</label>
            <textarea placeholder="Notas internas sobre o fornecedor..." rows={3} style={{padding:"10px 14px",border:`1.5px solid ${C.inputBorder}`,borderRadius:8,fontFamily:Fn.body,fontSize:13,color:C.cinzaEscuro,outline:"none",resize:"vertical"}}/>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <Badge variant="sucesso" dot size="sm">Ativo</Badge>
            <Badge variant="info" size="sm">Segmento: Ferroviário</Badge>
            <Badge variant="secondary" size="sm">Desde 2019</Badge>
          </div>
        </div>
      </Drawer>

      {/* Right narrow - Ocorrência */}
      <Drawer open={d.open&&d.id==="narrow"} onClose={close} title="Ocorrência #OC-2041" subtitle="Vazamento pátio 47-B" side="right" width={340}
        footer={<Btn label="Fechar" outline onClick={close} full/>}>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <Badge variant="critico" dot>Crítica</Badge>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:C.cinzaChumbo}}>Registrado por</span><span style={{fontSize:13,fontWeight:600}}>Ana Costa</span></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:C.cinzaChumbo}}>Data</span><span style={{fontSize:13,fontWeight:600}}>02/04/2026 14:30</span></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:C.cinzaChumbo}}>Local</span><span style={{fontSize:13,fontWeight:600}}>Pátio 47-B, Junção</span></div>
          <div style={{height:1,background:C.cardBorder}}/>
          <span style={{fontSize:12,fontWeight:700,color:C.cinzaChumbo,fontFamily:Fn.title,textTransform:"uppercase",letterSpacing:"1px"}}>Descrição</span>
          <p style={{fontSize:12,color:C.cinzaChumbo,lineHeight:1.5,margin:0}}>Identificado vazamento de óleo na junção 47-B durante inspeção de rotina. Área isolada conforme protocolo SSMA. Equipe de manutenção acionada.</p>
          <div style={{height:1,background:C.cardBorder}}/>
          <span style={{fontSize:12,fontWeight:700,color:C.cinzaChumbo,fontFamily:Fn.title,textTransform:"uppercase",letterSpacing:"1px"}}>Histórico</span>
          {[{t:"14:30",a:"Registro criado por Ana Costa"},{t:"14:35",a:"Equipe SSMA notificada"},{t:"14:42",a:"Área isolada — perímetro 50m"}].map(h=>(
            <div key={h.t} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
              <span style={{fontSize:10,fontWeight:700,color:C.azulProfundo,fontFamily:Fn.mono,minWidth:36,marginTop:2}}>{h.t}</span>
              <span style={{fontSize:12,color:C.cinzaEscuro,lineHeight:1.4}}>{h.a}</span>
            </div>
          ))}
        </div>
      </Drawer>

      {/* HEADER */}
      <header style={{background:`linear-gradient(135deg,${C.azulProfundo} 0%,${C.azulEscuro} 100%)`,padding:mob?"32px 20px":"48px 40px 44px",position:"relative",overflow:"hidden"}}>
        <JunctionLines style={{position:"absolute",top:-10,right:-20,width:mob?250:400,height:250}}/>
        <div style={{position:"relative"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${C.branco}10`,border:`1px solid ${C.branco}18`,borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",color:C.amareloOuro,fontFamily:Fn.title,marginBottom:16}}>{Ic.grid(14,C.amareloOuro)} Design System FIPS</div>
          <h1 style={{fontSize:mob?30:44,fontWeight:700,color:C.branco,margin:"0 0 10px",fontFamily:Fn.title}}>Drawer</h1>
          <p style={{fontSize:16,color:`${C.branco}B0`,lineHeight:1.6,maxWidth:700,margin:0,fontFamily:Fn.body}}>Painel lateral deslizante para detalhes, formulários e filtros sem sair da tela atual. Overlay escuro, header fixo, body scrollável e footer com ações.</p>
        </div>
      </header>

      <div style={{padding:mob?"24px 16px 40px":"36px 40px 60px",maxWidth:1100,margin:"0 auto"}}>

        {/* 01 — PLAYGROUND */}
        <Section n="01" title="Playground interativo" desc="Clique nos botões para abrir drawers reais em diferentes direções e tamanhos. ESC ou clique no overlay para fechar.">
          <DSCard mob={mob}>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <Btn label="→ Detalhe (right 420px)" color={C.azulProfundo} onClick={()=>open("right")}/>
              <Btn label="← Filtros (left 360px)" color={C.azulCeu} onClick={()=>open("left")}/>
              <Btn label="↑ Ação rápida (bottom 280px)" color={C.amareloEscuro} onClick={()=>open("bottom")}/>
              <Btn label="→ Edição larga (right 560px)" color={C.verdeFloresta} onClick={()=>open("wide")}/>
              <Btn label="→ Ocorrência (right 340px)" color={C.danger} onClick={()=>open("narrow")}/>
            </div>
            <p style={{fontSize:11,color:C.textMuted,marginTop:12}}>Drawers abrem com slide animation .3s. Overlay clica para fechar. ESC também fecha. Body com scroll interno.</p>
          </DSCard>
        </Section>

        {/* 02 — TAMANHOS */}
        <Section n="02" title="Tamanhos" desc="Quatro larguras padrão para diferentes contextos de uso.">
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:16}}>
            {[
              {name:"Estreito",w:"320–340px",c:C.cinzaChumbo,badge:"detalhe rápido",desc:"Para visualização de informação compacta. Histórico, status, detalhes de registro sem edição.",ex:"Detalhe de ocorrência; histórico de aprovação; perfil de visitante."},
              {name:"Padrão",w:"420px",c:C.azulProfundo,badge:"★ padrão",desc:"Tamanho default. Detalhes com itens, formulário compacto, resumo com ações.",ex:"Detalhe de requisição no Suprimentos; resumo de ideia no App Ideias."},
              {name:"Largo",w:"520–560px",c:C.verdeFloresta,badge:"formulário",desc:"Para formulários de edição com 2 colunas. Grid de inputs lado a lado.",ex:"Edição de fornecedor no App Cadastros; cadastro de colaborador; configuração avançada."},
              {name:"Full",w:"100%",c:C.amareloEscuro,badge:"mobile",desc:"Drawer ocupa toda a largura. Usado exclusivamente em mobile ou ações críticas.",ex:"Qualquer drawer em mobile; formulário multi-step; onboarding."},
            ].map(s=>(
              <div key={s.name} style={{...gc,borderLeft:`4px solid ${s.c}`}}>
                <div style={gh}><span style={{fontSize:13,fontWeight:700,color:C.azulEscuro,fontFamily:Fn.title}}>{s.name}</span><code style={gk}>{s.w}</code><code style={gk}>{s.badge}</code></div>
                <div style={gb}>
                  <p style={gt}>{s.desc}</p>
                  <div style={gl}>Exemplo FIPS</div><p style={ge}>{s.ex}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 03 — ANATOMIA */}
        <Section n="03" title="Anatomia e comportamento" desc="Estrutura do drawer: overlay, header fixo, body scrollável, footer fixo.">
          <DSCard mob={mob}>
            <div style={{display:"flex",gap:40,flexWrap:"wrap"}}>
              {/* Diagrama */}
              <div style={{flex:1,minWidth:260}}>
                <div style={{background:C.bg,borderRadius:10,border:`2px dashed ${C.azulCeu}`,overflow:"hidden",position:"relative",height:300}}>
                  {/* Overlay */}
                  <div style={{position:"absolute",inset:0,background:"rgba(0,42,104,.15)"}}/>
                  {/* Panel */}
                  <div style={{position:"absolute",top:0,right:0,width:"55%",height:"100%",background:C.cardBg,borderLeft:`1px solid ${C.cardBorder}`,display:"flex",flexDirection:"column"}}>
                    <div style={{padding:"10px 14px",borderBottom:`1px dashed ${C.azulCeu}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:10,fontWeight:700,color:C.azulProfundo,fontFamily:Fn.title}}>HEADER (fixo)</span>
                      <span style={{fontSize:8,color:C.azulCeu,fontFamily:Fn.mono}}>18px 24px</span>
                    </div>
                    <div style={{flex:1,padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"center",borderBottom:`1px dashed ${C.azulCeu}`}}>
                      <div style={{textAlign:"center"}}>
                        <span style={{fontSize:10,fontWeight:700,color:C.azulProfundo,fontFamily:Fn.title,display:"block"}}>BODY (scrollável)</span>
                        <span style={{fontSize:8,color:C.azulCeu,fontFamily:Fn.mono}}>20px 24px · overflow-y auto</span>
                      </div>
                    </div>
                    <div style={{padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:10,fontWeight:700,color:C.azulProfundo,fontFamily:Fn.title}}>FOOTER (fixo)</span>
                      <span style={{fontSize:8,color:C.azulCeu,fontFamily:Fn.mono}}>14px 24px</span>
                    </div>
                  </div>
                  <div style={{position:"absolute",top:"50%",left:"12%",transform:"translateY(-50%)",textAlign:"center"}}>
                    <span style={{fontSize:10,fontWeight:700,color:C.azulProfundo,fontFamily:Fn.title,display:"block"}}>OVERLAY</span>
                    <span style={{fontSize:8,color:C.azulCeu,fontFamily:Fn.mono}}>rgba(0,42,104,.35)</span>
                  </div>
                </div>
              </div>

              {/* Specs */}
              <div style={{flex:1,minWidth:250}}>
                <span style={{fontSize:13,fontWeight:700,color:C.azulEscuro,fontFamily:Fn.title,display:"block",marginBottom:12}}>Comportamentos</span>
                {[
                  {l:"Posição",v:"Fixed. Right ★, Left, Bottom, Top."},
                  {l:"Animação",v:"Slide .3s cubic-bezier(.4,0,.2,1)"},
                  {l:"Overlay",v:"rgba(0,42,104,.35) — click fecha"},
                  {l:"ESC",v:"Fecha o drawer (keydown listener)"},
                  {l:"Max width",v:"90vw (não ultrapassa a tela)"},
                  {l:"Body scroll",v:"overflow-y: auto (scroll interno)"},
                  {l:"Header",v:"Fixo no topo. Título + X."},
                  {l:"Footer",v:"Fixo embaixo. Botões CTA."},
                  {l:"z-index",v:"1000 (overlay) / 1001 (panel)"},
                  {l:"Sombra",v:"-4px 0 24px rgba(0,0,0,.12)"},
                ].map(s=>(
                  <div key={s.l} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:6}}>
                    <code style={{background:`${C.amareloOuro}30`,color:C.amareloEscuro,padding:"2px 8px",borderRadius:4,fontSize:10,fontFamily:Fn.mono,fontWeight:600,minWidth:75,textAlign:"center",flexShrink:0}}>{s.l}</code>
                    <span style={{fontSize:12,color:C.cinzaEscuro,fontFamily:Fn.body}}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </DSCard>
        </Section>

        {/* 04 — GUIA */}
        <Section n="04" title="Guia de uso por tipo" desc="Quando usar drawer vs modal vs nova tela.">
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:16}}>
            {[
              {name:"Detalhe de registro",c:C.azulProfundo,badge:"mais comum",desc:"Visualizar informações de um item sem sair da listagem. Itens, status, histórico.",when:"Clique em linha de tabela para ver detalhes. Visualização rápida sem navegação.",not:"Edição complexa com muitos campos — usar drawer largo ou nova tela.",ex:"Detalhe de requisição; resumo de ocorrência; perfil de visitante."},
              {name:"Filtros avançados",c:C.azulCeu,badge:"left side",desc:"Painel lateral esquerdo com campos de filtro. Complementa filtros inline da toolbar.",when:"Mais de 3 filtros. Filtros complexos com datas, ranges e combos.",not:"1–3 filtros simples — usar filtros inline na toolbar.",ex:"Filtros do App Suprimentos; filtros do Power BI embed; busca avançada do App Cadastros."},
              {name:"Edição rápida",c:C.verdeFloresta,badge:"formulário",desc:"Formulário de edição no drawer largo. Campos em grid 2 colunas. Salvar sem sair da tela.",when:"Edição de entidade com 6–12 campos. Quando a tela de edição full seria pesada demais.",not:"Cadastro novo com muitos campos e validação — usar tela dedicada.",ex:"Editar fornecedor; atualizar dados de colaborador; configurar alerta SSMA."},
              {name:"Ação rápida",c:C.amareloEscuro,badge:"bottom sheet",desc:"Drawer de baixo para ações rápidas com 2–3 campos. Mobile-friendly.",when:"Atribuir responsável, mudar status, confirmar ação simples com 1–2 inputs.",not:"Formulários grandes — usar drawer lateral. Confirmação simples — usar modal.",ex:"Atribuir responsável; reclassificar ocorrência; adicionar nota rápida."},
            ].map(t=>(
              <div key={t.name} style={{...gc,borderLeft:`4px solid ${t.c}`}}>
                <div style={gh}><span style={{fontSize:13,fontWeight:700,color:C.azulEscuro,fontFamily:Fn.title}}>{t.name}</span><code style={gk}>{t.badge}</code></div>
                <div style={gb}>
                  <p style={gt}>{t.desc}</p>
                  <div style={gl}>Quando usar</div><p style={gt}>{t.when}</p>
                  <div style={{...gl,color:C.danger}}>Quando NÃO usar</div><p style={{...gt,color:C.cinzaChumbo}}>{t.not}</p>
                  <div style={gl}>Exemplo FIPS</div><p style={ge}>{t.ex}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Drawer vs Modal vs Tela */}
          <div style={{marginTop:16,background:`${C.azulCeuClaro}40`,border:`1px solid ${C.azulCeuClaro}`,borderRadius:12,padding:20,display:"flex",gap:14,alignItems:"flex-start"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:C.azulProfundo,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><span style={{color:C.branco,fontSize:12,fontWeight:700}}>i</span></div>
            <div>
              <p style={{fontSize:14,fontWeight:700,color:C.cinzaEscuro,margin:"0 0 6px",fontFamily:Fn.body}}>Drawer vs Modal vs Tela</p>
              <div style={{display:"flex",flexDirection:"column",gap:4}}>
                {[
                  {r:"Visualizar/editar sem sair da listagem",v:"→ Drawer",c:C.azulProfundo},
                  {r:"Confirmação ou decisão rápida (sim/não)",v:"→ Modal",c:C.amareloEscuro},
                  {r:"Cadastro complexo ou fluxo multi-step",v:"→ Tela dedicada",c:C.cinzaChumbo},
                ].map(i=>(
                  <div key={i.r} style={{display:"flex",alignItems:"center",gap:8,fontSize:13,fontFamily:Fn.body}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:i.c,flexShrink:0}}/>
                    <span style={{color:C.cinzaChumbo,flex:1}}>{i.r}</span>
                    <span style={{fontWeight:700,color:i.c,whiteSpace:"nowrap"}}>{i.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 05 — TOKENS */}
        <Section n="05" title="Tokens de referência" desc="Valores de design do componente Drawer.">
          <DSCard mob={mob} s={{display:"flex",gap:mob?24:48,flexWrap:"wrap"}}>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:Fn.title,marginBottom:4}}>Estrutura</span>
              <TokenRow label="Background" value="#FFFFFF" color={C.cardBg}/>
              <TokenRow label="Overlay" value="rgba(0,42,104,.35)" color="rgba(0,42,104,.35)"/>
              <TokenRow label="Sombra" value="-4px 0 24px"/>
              <TokenRow label="z-index panel" value="1001"/>
              <TokenRow label="z-index overlay" value="1000"/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:Fn.title,marginBottom:4}}>Larguras</span>
              <TokenRow label="Estreito" value="320–340px"/>
              <TokenRow label="Padrão ★" value="420px"/>
              <TokenRow label="Largo" value="520–560px"/>
              <TokenRow label="Full" value="100%"/>
              <TokenRow label="Max width" value="90vw"/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:Fn.title,marginBottom:4}}>Padding</span>
              <TokenRow label="Header" value="18px 24px"/>
              <TokenRow label="Body" value="20px 24px"/>
              <TokenRow label="Footer" value="14px 24px"/>
              <TokenRow label="Footer bg" value="#F2F4F8" color={C.bg}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:Fn.title,marginBottom:4}}>Tipografia</span>
              <TokenRow label="Título" value="Saira 700 16px"/>
              <TokenRow label="Subtítulo" value="Open Sans 400 12px"/>
              <TokenRow label="Animação" value=".3s cubic-bezier"/>
              <TokenRow label="Direção ★" value="Right"/>
            </div>
          </DSCard>
        </Section>

        <div style={{textAlign:"center",padding:"20px 0 0",borderTop:`1px solid ${C.cardBorder}`,marginTop:20}}>
          <span style={{fontSize:12,color:C.cinzaChumbo,letterSpacing:".5px",fontFamily:Fn.title,fontWeight:400}}>DS-FIPS v2.0 · Ferrovia Interna do Porto de Santos · Excelência sobre trilhos · {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}
