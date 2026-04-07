import { useState, useEffect } from "react";

const C={azulProfundo:"#004B9B",azulEscuro:"#002A68",azulClaro:"#658EC9",cinzaChumbo:"#7B8C96",cinzaEscuro:"#333B41",cinzaClaro:"#C0CCD2",azulCeu:"#93BDE4",azulCeuClaro:"#D3E3F4",amareloOuro:"#FDC24E",amareloEscuro:"#F6921E",verdeFloresta:"#00C64C",verdeEscuro:"#00904C",danger:"#DC3545",neutro:"#E8EBFF",branco:"#FFFFFF",bg:"#F2F4F8",cardBg:"#FFFFFF",cardBorder:"#E2E8F0",textMuted:"#64748B",textLight:"#94A3B8"};
const Fn={title:"'Saira Expanded',sans-serif",body:"'Open Sans',sans-serif",mono:"'Fira Code',monospace"};
const Ic={
  home:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M3 10l7-7 7 7" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 8.5V16a1 1 0 001 1h3v-4h2v4h3a1 1 0 001-1V8.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  grid:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="11" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="2" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="11" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/></svg>,
  list:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M6 4h12M6 10h12M6 16h12" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><circle cx="2.5" cy="4" r="1" fill={c}/><circle cx="2.5" cy="10" r="1" fill={c}/><circle cx="2.5" cy="16" r="1" fill={c}/></svg>,
  chart:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="3" y="10" width="3" height="7" rx="1" stroke={c} strokeWidth="1.3"/><rect x="8.5" y="6" width="3" height="11" rx="1" stroke={c} strokeWidth="1.3"/><rect x="14" y="3" width="3" height="14" rx="1" stroke={c} strokeWidth="1.3"/></svg>,
  filter:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M2 4h16M5 10h10M8 16h4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  settings:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke={c} strokeWidth="1.5"/><path d="M10 1v3M10 16v3M1 10h3M16 10h3M3.9 3.9l2.1 2.1M14 14l2.1 2.1M16.1 3.9l-2.1 2.1M6 14l-2.1 2.1" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
  x:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  check:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  edit:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M12 3l5 5-10 10H2v-5L12 3z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  trash:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M4 6h12M7 6V4.5A1.5 1.5 0 018.5 3h3A1.5 1.5 0 0113 4.5V6M5.5 6v10a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V6" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  eye:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke={c} strokeWidth="1.5"/><circle cx="10" cy="10" r="2.5" stroke={c} strokeWidth="1.5"/></svg>,
  clip:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M14.5 10.5l-5 5a3.5 3.5 0 01-5-5l6.5-6.5a2.5 2.5 0 013.5 3.5l-6.5 6.5a1.5 1.5 0 01-2-2l5-5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  alert:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M10 2L1.5 17h17L10 2z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M10 8v4M10 14v.5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  shield:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M10 2L3 5.5v5c0 4 3.5 6.5 7 7.5 3.5-1 7-3.5 7-7.5v-5L10 2z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  lock:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="4" y="9" width="12" height="9" rx="2" stroke={c} strokeWidth="1.5"/><path d="M7 9V6a3 3 0 016 0v3" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  doc:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M6 2h6l5 5v10a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M12 2v5h5" stroke={c} strokeWidth="1.5"/></svg>,
  folder:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M2 6V4a1 1 0 011-1h5l2 2h7a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V6z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  bell:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M10 2a5 5 0 00-5 5v3l-1.5 2.5h13L15 10V7a5 5 0 00-5-5z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 16a2 2 0 004 0" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  tag:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M2 4a2 2 0 012-2h5.17a2 2 0 011.42.59l7.24 7.24a2 2 0 010 2.83l-5.17 5.17a2 2 0 01-2.83 0L2.59 10.6A2 2 0 012 9.17V4z" stroke={c} strokeWidth="1.5"/><circle cx="6.5" cy="6.5" r="1" fill={c}/></svg>,
  clock:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke={c} strokeWidth="1.5"/><path d="M10 5.5V10l3 2" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  calendar:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="14" rx="2" stroke={c} strokeWidth="1.5"/><path d="M2 8h16M6 2v4M14 2v4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  pessoa:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6" r="3.5" stroke={c} strokeWidth="1.5"/><path d="M3 17.5c0-3.5 3-5.5 7-5.5s7 2 7 5.5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  building:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="1.5" stroke={c} strokeWidth="1.5"/><path d="M7 6h2M11 6h2M7 10h2M11 10h2M8 14h4v4H8z" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
  email:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke={c} strokeWidth="1.5"/><path d="M2 6l8 5 8-5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  busca:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="5.5" stroke={c} strokeWidth="1.5"/><path d="M13.5 13.5L17 17" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  info:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke={c} strokeWidth="1.5"/><path d="M10 9v5M10 6.5v.5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  status:(s:number,c:string)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke={c} strokeWidth="1.5"/><path d="M7 10l2 2 4-4" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};
function JunctionLines({style}:{style?:React.CSSProperties}){return <svg viewBox="0 0 320 200" fill="none" style={{opacity:.12,...style}}><path d="M0 60H100C120 60 120 60 140 40L200 40H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 60H100C120 60 120 60 140 80L200 80H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 120H60C80 120 80 120 100 100L160 100H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 120H60C80 120 80 120 100 140L160 140H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/></svg>}
function Section({n,title,desc,children}:{n:string,title:string,desc:string,children:React.ReactNode}){return(<section style={{marginBottom:48}}><div style={{fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:C.azulClaro,fontFamily:Fn.title,marginBottom:6}}>{n}</div><h2 style={{fontSize:22,fontWeight:700,color:C.azulEscuro,margin:"0 0 4px",fontFamily:Fn.title,letterSpacing:".5px"}}>{title}</h2><p style={{fontSize:14,color:C.cinzaChumbo,margin:"0 0 22px",lineHeight:1.55,fontFamily:Fn.body}}>{desc}</p>{children}</section>)}
function DSCard({children,s,mob:m}:{children:React.ReactNode,s?:React.CSSProperties,mob?:boolean}){return(<div style={{background:C.cardBg,borderRadius:"12px 12px 12px 24px",border:`1px solid ${C.cardBorder}`,padding:m?16:28,boxShadow:"0 1px 3px rgba(0,75,155,.04),0 4px 14px rgba(0,75,155,.03)",...s}}>{children}</div>)}
function TokenRow({label,value}:{label:string,value:string}){return(<div style={{display:"flex",alignItems:"center",gap:10,fontSize:12,fontFamily:Fn.body}}><span style={{color:C.cinzaChumbo,minWidth:140}}>{label}</span><code style={{background:C.neutro,padding:"2px 8px",borderRadius:4,fontSize:11,fontFamily:Fn.mono,color:C.cinzaEscuro}}>{value}</code></div>)}

const categories=[
  {name:"Navegação",icons:[{id:"home",label:"Home"},{id:"grid",label:"Grid"},{id:"list",label:"Lista"},{id:"chart",label:"Gráfico"},{id:"filter",label:"Filtro"},{id:"settings",label:"Configuração"},{id:"busca",label:"Busca"}]},
  {name:"Ações",icons:[{id:"x",label:"Fechar"},{id:"check",label:"Confirmar"},{id:"edit",label:"Editar"},{id:"trash",label:"Excluir"},{id:"eye",label:"Visualizar"},{id:"clip",label:"Anexar"}]},
  {name:"Status",icons:[{id:"alert",label:"Alerta"},{id:"shield",label:"Segurança"},{id:"lock",label:"Bloqueado"},{id:"status",label:"Concluído"},{id:"info",label:"Informação"}]},
  {name:"Objetos",icons:[{id:"doc",label:"Documento"},{id:"folder",label:"Pasta"},{id:"bell",label:"Notificação"},{id:"tag",label:"Tag"},{id:"clock",label:"Relógio"},{id:"calendar",label:"Calendário"}]},
  {name:"Entidades",icons:[{id:"pessoa",label:"Pessoa"},{id:"building",label:"Empresa"},{id:"email",label:"E-mail"}]},
];
const sizes=[
  {px:12,use:"Dentro de tabs sm, badges, elementos compactos"},
  {px:14,use:"Inputs, selects, labels, tabs padrão"},
  {px:16,use:"Botões, drawers, formulários, ações de tabela"},
  {px:20,use:"Headers de seção, destaque visual, modal icons"},
  {px:24,use:"Hero, empty states, ícones isolados grandes"},
];
const colorRules=[
  {color:C.azulProfundo,name:"Azul Profundo",use:"Ações primárias, links, sort ativo"},
  {color:C.azulEscuro,name:"Azul Escuro",use:"Headers, títulos com ícone"},
  {color:C.cinzaChumbo,name:"Cinza Chumbo",use:"Ícones neutros, inputs, labels"},
  {color:C.amareloEscuro,name:"Amarelo Escuro",use:"Tab ativa, atenção, destaque"},
  {color:C.verdeFloresta,name:"Verde Floresta",use:"Sucesso, confirmação, ativo"},
  {color:C.danger,name:"Vermelho",use:"Erro, exclusão, destrutivo"},
  {color:C.azulCeu,name:"Azul Céu",use:"Info, backgrounds, seleção sutil"},
  {color:C.textMuted,name:"Cinza Muted",use:"Disabled, placeholder, dica"},
];

export default function DSFIPSIconography(){
  const [w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h)},[]);
  const mob=w<640;
  const [hovIcon,setHovIcon]=useState<any>(null);
  const [selSize,setSelSize]=useState(20);

  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.bg} 0%,${C.azulCeuClaro}44 50%,${C.bg} 100%)`,fontFamily:Fn.body,color:C.cinzaEscuro}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Saira+Expanded:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&family=Fira+Code:wght@400;500&display=swap');@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <header style={{background:`linear-gradient(135deg,${C.azulProfundo} 0%,${C.azulEscuro} 100%)`,padding:mob?"32px 20px":"48px 40px 44px",position:"relative",overflow:"hidden"}}>
        <JunctionLines style={{position:"absolute",top:-10,right:-20,width:mob?250:400,height:250}}/>
        <div style={{position:"relative"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${C.branco}10`,border:`1px solid ${C.branco}18`,borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",color:C.amareloOuro,fontFamily:Fn.title,marginBottom:16}}>{Ic.grid(14,C.amareloOuro)} Design System FIPS</div>
          <h1 style={{fontSize:mob?30:44,fontWeight:700,color:C.branco,margin:"0 0 10px",fontFamily:Fn.title}}>Iconografia</h1>
          <p style={{fontSize:16,color:`${C.branco}B0`,lineHeight:1.6,maxWidth:700,margin:0,fontFamily:Fn.body}}>Biblioteca baseada no <strong style={{color:C.amareloOuro}}>Phosphor Icons</strong> — peso <strong style={{color:`${C.branco}D0`}}>Regular (stroke)</strong> como padrão, alinhado às linhas de junção do Brandbook.</p>
        </div>
      </header>

      <div style={{padding:mob?"24px 16px 40px":"36px 40px 60px",maxWidth:1100}}>
        <Section n="01" title="Biblioteca de ícones" desc={`Seleção de ${categories.reduce((a,c)=>a+c.icons.length,0)} ícones do Phosphor Icons aplicados no DS-FIPS. Troque o tamanho no seletor.`}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20,flexWrap:"wrap"}}>
            <span style={{fontSize:12,fontWeight:600,color:C.cinzaChumbo,fontFamily:Fn.body}}>Tamanho:</span>
            {[14,16,20,24].map(s=>(
              <button key={s} onClick={()=>setSelSize(s)} style={{padding:"4px 10px",fontSize:11,fontWeight:selSize===s?700:400,fontFamily:Fn.mono,background:selSize===s?C.azulProfundo:"transparent",color:selSize===s?C.branco:C.cinzaChumbo,border:`1px solid ${selSize===s?C.azulProfundo:C.cardBorder}`,borderRadius:6,cursor:"pointer",transition:"all .15s"}}>{s}px</button>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            {categories.map(cat=>(
              <div key={cat.name}>
                <span style={{fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:C.textLight,fontFamily:Fn.title,display:"block",marginBottom:10}}>{cat.name}</span>
                <div style={{display:"grid",gridTemplateColumns:mob?"repeat(3,1fr)":"repeat(6,1fr)",gap:8}}>
                  {cat.icons.map(ic=>{const isHov=hovIcon===ic.id;const renderFn=(Ic as Record<string,(s:number,c:string)=>React.ReactNode>)[ic.id];return(
                    <div key={ic.id} onMouseEnter={()=>setHovIcon(ic.id)} onMouseLeave={()=>setHovIcon(null)} style={{background:C.cardBg,border:`1px solid ${isHov?C.azulProfundo:C.cardBorder}`,borderRadius:10,padding:"16px 8px 10px",display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"default",transition:"all .15s",boxShadow:isHov?"0 4px 12px rgba(0,75,155,.08)":"none"}}>
                      <div style={{width:selSize+16,height:selSize+16,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:8,background:isHov?`${C.azulProfundo}08`:C.bg,transition:"background .15s"}}>
                        {renderFn?renderFn(selSize,isHov?C.azulProfundo:C.cinzaEscuro):null}
                      </div>
                      <span style={{fontSize:10,fontWeight:600,color:isHov?C.azulProfundo:C.cinzaChumbo,fontFamily:Fn.body,textAlign:"center",transition:"color .15s"}}>{ic.label}</span>
                    </div>
                  )})}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section n="02" title="Escala de tamanhos" desc="5 tamanhos padrão. Cada contexto tem seu tamanho recomendado.">
          <DSCard mob={mob}>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {sizes.map(s=>(
                <div key={s.px} style={{display:"flex",alignItems:"center",gap:mob?12:24,padding:"10px 0",borderBottom:`1px solid ${C.cardBorder}`}}>
                  <div style={{width:48,height:48,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{Ic.settings(s.px,C.azulProfundo)}</div>
                  <div style={{minWidth:60,flexShrink:0}}><code style={{fontSize:14,fontWeight:700,fontFamily:Fn.mono,color:C.azulEscuro}}>{s.px}px</code></div>
                  <span style={{fontSize:13,color:C.cinzaChumbo,fontFamily:Fn.body,lineHeight:1.4}}>{s.use}</span>
                </div>
              ))}
            </div>
          </DSCard>
        </Section>

        <Section n="03" title="Cores de ícone" desc="Ícones herdam cor do contexto. Cada cor semântica tem uso definido.">
          <DSCard mob={mob}>
            <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:12}}>
              {colorRules.map(cr=>(
                <div key={cr.name} style={{display:"flex",alignItems:"center",gap:14,padding:"10px 14px",borderRadius:8,border:`1px solid ${C.cardBorder}`,background:C.bg}}>
                  <div style={{width:40,height:40,borderRadius:10,background:C.cardBg,border:`1px solid ${C.cardBorder}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{Ic.shield(20,cr.color)}</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
                      <span style={{fontSize:12,fontWeight:700,color:C.azulEscuro,fontFamily:Fn.title}}>{cr.name}</span>
                      <code style={{fontSize:10,fontFamily:Fn.mono,color:cr.color}}>{cr.color}</code>
                    </div>
                    <span style={{fontSize:11,color:C.cinzaChumbo,fontFamily:Fn.body}}>{cr.use}</span>
                  </div>
                </div>
              ))}
            </div>
          </DSCard>
        </Section>

        <Section n="04" title="Uso em contexto" desc="Ícones aplicados dentro de componentes reais do DS-FIPS.">
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:16}}>
            <div style={{background:C.cardBg,border:`1px solid ${C.cardBorder}`,borderRadius:"10px 10px 10px 18px",padding:mob?16:20}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:C.textLight,fontFamily:Fn.title,display:"block",marginBottom:12}}>Botão</span>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <button style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",fontSize:13,fontWeight:600,fontFamily:Fn.body,color:C.branco,background:C.azulProfundo,border:"none",borderRadius:8,cursor:"pointer"}}>{Ic.check(14,C.branco)} Confirmar</button>
                <button style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",fontSize:13,fontWeight:600,fontFamily:Fn.body,color:C.danger,background:"transparent",border:`1px solid ${C.danger}`,borderRadius:8,cursor:"pointer"}}>{Ic.trash(14,C.danger)} Excluir</button>
              </div>
            </div>
            <div style={{background:C.cardBg,border:`1px solid ${C.cardBorder}`,borderRadius:"10px 10px 10px 18px",padding:mob?16:20}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:C.textLight,fontFamily:Fn.title,display:"block",marginBottom:12}}>Badge</span>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 8px",fontSize:11,fontWeight:600,color:C.verdeEscuro,background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:4}}>{Ic.status(12,C.verdeEscuro)} Ativo</span>
                <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 8px",fontSize:11,fontWeight:600,color:"#C2410C",background:"#FFF7ED",border:"1px solid #FDBA74",borderRadius:4}}>{Ic.clock(12,"#C2410C")} Pendente</span>
                <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 8px",fontSize:11,fontWeight:600,color:"#B91C1C",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:4}}>{Ic.lock(12,"#B91C1C")} Bloqueado</span>
              </div>
            </div>
            <div style={{background:C.cardBg,border:`1px solid ${C.cardBorder}`,borderRadius:"10px 10px 10px 18px",padding:mob?16:20}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:C.textLight,fontFamily:Fn.title,display:"block",marginBottom:12}}>Header de modal</span>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:48,height:48,borderRadius:14,background:`${C.azulProfundo}0A`,display:"flex",alignItems:"center",justifyContent:"center"}}>{Ic.doc(24,C.azulProfundo)}</div>
                <div><span style={{fontSize:15,fontWeight:700,color:C.azulEscuro,fontFamily:Fn.title,display:"block"}}>Nova Requisição</span><span style={{fontSize:12,color:C.cinzaChumbo}}>Preencha os dados abaixo</span></div>
              </div>
            </div>
            <div style={{background:C.cardBg,border:`1px solid ${C.cardBorder}`,borderRadius:"10px 10px 10px 18px",padding:mob?16:20}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:C.textLight,fontFamily:Fn.title,display:"block",marginBottom:12}}>Containers com fundo</span>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                {[{bg:`${C.azulProfundo}0A`,ic:C.azulProfundo,l:"Info"},{bg:`${C.verdeFloresta}0A`,ic:C.verdeFloresta,l:"Sucesso"},{bg:`${C.amareloEscuro}0A`,ic:C.amareloEscuro,l:"Atenção"},{bg:`${C.danger}0A`,ic:C.danger,l:"Destrutivo"}].map(c=>(
                  <div key={c.l} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                    <div style={{width:48,height:48,borderRadius:14,background:c.bg,display:"flex",alignItems:"center",justifyContent:"center"}}>{Ic.bell(22,c.ic)}</div>
                    <span style={{fontSize:10,color:C.cinzaChumbo,fontFamily:Fn.body}}>{c.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section n="05" title="Regras de uso" desc="Diretrizes para manter consistência visual na biblioteca de ícones.">
          <DSCard mob={mob}>
            <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:mob?16:24}}>
              {[
                {title:"Stroke-only (Regular)",desc:"Peso Regular do Phosphor (stroke, sem fill). O Brandbook define 3 níveis de complexidade.",icon:"edit"},
                {title:"Sempre com label",desc:"Ícones sozinhos só em ações de tabela e botões icon-only. Em todos os outros, acompanhar texto.",icon:"tag"},
                {title:"Espaçamento",desc:"Gap mínimo de 6px entre ícone e texto. Em badges 4px, em inputs 8px.",icon:"grid"},
                {title:"Alinhamento",desc:"Sempre centralizado verticalmente com o texto (alignItems center). ViewBox padrão 20×20.",icon:"check"},
                {title:"Cor herdada",desc:"Ícones usam a cor do contexto. Tab ativa = laranja, botão primário = branco, input = cinza.",icon:"eye"},
                {title:"Phosphor Icons",desc:"Biblioteca padrão do DS-FIPS. Peso Regular. Instalar via @phosphor-icons/react.",icon:"shield"},
              ].map(r=>(
                <div key={r.title} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{width:36,height:36,borderRadius:10,background:C.bg,border:`1px solid ${C.cardBorder}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{(Ic as Record<string,(s:number,c:string)=>React.ReactNode>)[r.icon](16,C.azulProfundo)}</div>
                  <div><span style={{fontSize:13,fontWeight:700,color:C.azulEscuro,fontFamily:Fn.title,display:"block",marginBottom:2}}>{r.title}</span><span style={{fontSize:12,color:C.cinzaChumbo,fontFamily:Fn.body,lineHeight:1.5}}>{r.desc}</span></div>
                </div>
              ))}
            </div>
          </DSCard>
        </Section>

        <Section n="06" title="Tokens de referência" desc="Valores técnicos da biblioteca de ícones.">
          <DSCard mob={mob} s={{display:"flex",gap:mob?24:48,flexWrap:"wrap"}}>
            <div style={{display:"flex",flexDirection:"column",gap:10,minWidth:200}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:Fn.title,marginBottom:4}}>Tamanhos</span>
              <TokenRow label="Compacto (badge)" value="12px"/>
              <TokenRow label="Padrão (input)" value="14px"/>
              <TokenRow label="Médio (botão)" value="16px"/>
              <TokenRow label="Grande (header)" value="20px"/>
              <TokenRow label="Hero (empty)" value="24px"/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10,minWidth:200}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:Fn.title,marginBottom:4}}>Stroke</span>
              <TokenRow label="12–14px icons" value="strokeWidth 1.3"/>
              <TokenRow label="16–20px icons" value="strokeWidth 1.5"/>
              <TokenRow label="24px+ icons" value="strokeWidth 1.8"/>
              <TokenRow label="Stroke cap" value="round"/>
              <TokenRow label="Stroke join" value="round"/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10,minWidth:200}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:Fn.title,marginBottom:4}}>Grid</span>
              <TokenRow label="Biblioteca" value="Phosphor Icons"/>
              <TokenRow label="Peso padrão" value="Regular (stroke)"/>
              <TokenRow label="ViewBox" value="0 0 256 256"/>
              <TokenRow label="Gap ícone–texto" value="4–8px"/>
              <TokenRow label="Container modal" value="48×48 r14"/>
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
