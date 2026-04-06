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
};
const F={title:"'Saira Expanded',sans-serif",body:"'Open Sans',sans-serif",mono:"'Fira Code',monospace"};

/* ═══════════════════════════════════════════ ICONS ═══════════════════════════════════════════ */
const Ic={
  grid:(s=14,c=C.amareloOuro)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="11" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="2" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="11" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/></svg>,
  info:(s=16,c=C.azulProfundo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke={c} strokeWidth="1.5"/><path d="M8 7v4M8 5v.5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  check:(s=16,c=C.verdeFloresta)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  alert:(s=16,c=C.amareloEscuro)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M8 1.5L1 14h14L8 1.5z" stroke={c} strokeWidth="1.3" strokeLinejoin="round"/><path d="M8 6v3.5M8 11.5v.5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  keyboard:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="1.5" y="4.5" width="17" height="11" rx="2" stroke={c} strokeWidth="1.4"/><path d="M5 8h1M9.5 8h1M14 8h1M5 11h1M14 11h1M8 11h4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>,
  cursor:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M3 2l3 12 2-4 4-2L3 2z" stroke={c} strokeWidth="1.4" strokeLinejoin="round"/></svg>,
  help:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke={c} strokeWidth="1.5"/><path d="M6 6a2 2 0 013.5 1.5c0 1-1.5 1.5-1.5 2.5M8 12.5v.5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  star:(s=16,c=C.amareloOuro)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M8 1l2.2 4.5L15 6.3l-3.5 3.4.8 4.8L8 12.2 3.7 14.5l.8-4.8L1 6.3l4.8-.8L8 1z" fill={c}/></svg>,
  shield:(s=16,c=C.verdeFloresta)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M8 1.5L2.5 4v4c0 3.5 2.5 5.5 5.5 6.5 3-1 5.5-3 5.5-6.5V4L8 1.5z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  train:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><rect x="3" y="1.5" width="10" height="10" rx="2" stroke={c} strokeWidth="1.3"/><path d="M3 7h10M5 14l1.5-2.5h3L11 14M6 9.5h.5M9.5 9.5H10" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
};

/* ═══════════════════════════════════════════ SVG OVERLAY ═══════════════════════════════════════════ */
function JunctionLines({style}:{style?:React.CSSProperties}){return <svg viewBox="0 0 320 200" fill="none" style={{opacity:.12,...style}}><path d="M0 60H100C120 60 120 60 140 40L200 40H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 60H100C120 60 120 60 140 80L200 80H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 120H60C80 120 80 120 100 100L160 100H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 120H60C80 120 80 120 100 140L160 140H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/></svg>}

/* ═══════════════════════════════════════════ LAYOUT HELPERS ═══════════════════════════════════════════ */
function Section({n,title,desc,children}:{n:string;title:string;desc:string;children:React.ReactNode}){return(<section style={{marginBottom:44}}><div style={{fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,marginBottom:6}}>{n}</div><h2 style={{fontSize:20,fontWeight:700,color:C.azulEscuro,margin:"0 0 4px",fontFamily:F.title,letterSpacing:".5px"}}>{title}</h2><p style={{fontSize:14,color:C.cinzaChumbo,margin:"0 0 20px",lineHeight:1.55,fontFamily:F.body}}>{desc}</p>{children}</section>)}
function Card({children,s,mob}:{children:React.ReactNode;s?:React.CSSProperties;mob?:boolean}){return(<div style={{background:C.cardBg,borderRadius:"12px 12px 12px 24px",border:`1px solid ${C.cardBorder}`,padding:mob?16:28,boxShadow:"0 1px 3px rgba(0,75,155,.04),0 4px 14px rgba(0,75,155,.03)",...s}}>{children}</div>)}
function TokenRow({label,value,color}:{label:string;value:string;color?:string}){return(<div style={{display:"flex",alignItems:"center",gap:10,fontSize:12,fontFamily:F.body}}>{color&&<div style={{width:16,height:16,borderRadius:4,background:color,border:`1px solid ${C.cardBorder}`,flexShrink:0}}/>}<span style={{color:C.cinzaChumbo,minWidth:120}}>{label}</span><code style={{background:C.neutro,padding:"2px 8px",borderRadius:4,fontSize:11,fontFamily:F.mono,color:C.cinzaEscuro}}>{value}</code></div>)}

/* ═══════════════════════════════════════════
   STATIC TOOLTIP PREVIEW
   ═══════════════════════════════════════════ */
type TooltipSide = "top"|"bottom"|"left"|"right";

function StaticTooltip({
  label,side="top",triggerLabel,triggerIcon,richContent,variant="default",
}:{
  label?:string;side?:TooltipSide;triggerLabel?:string;triggerIcon?:React.ReactNode;richContent?:React.ReactNode;variant?:"default"|"info"|"success"|"warning";
}){
  const variantColors = {
    default:{bg:C.cinzaEscuro,color:C.branco},
    info:{bg:C.azulProfundo,color:C.branco},
    success:{bg:C.verdeEscuro,color:C.branco},
    warning:{bg:"#92400E",color:C.branco},
  };
  const vc = variantColors[variant]||variantColors.default;

  const arrowSize=6;
  const tooltipStyle:React.CSSProperties={
    background:vc.bg,color:vc.color,
    fontSize:12,fontFamily:F.body,fontWeight:500,
    padding:"6px 12px",borderRadius:6,
    whiteSpace:richContent?"normal":"nowrap",
    maxWidth:richContent?220:undefined,
    lineHeight:1.45,
    boxShadow:"0 4px 12px rgba(0,0,0,.18)",
    position:"relative",
    zIndex:2,
  };

  const arrowBase:React.CSSProperties={
    position:"absolute",width:0,height:0,
  };

  const arrowMap:Record<TooltipSide,React.CSSProperties>={
    top:{...arrowBase,bottom:-arrowSize,left:"50%",transform:"translateX(-50%)",borderLeft:`${arrowSize}px solid transparent`,borderRight:`${arrowSize}px solid transparent`,borderTop:`${arrowSize}px solid ${vc.bg}`},
    bottom:{...arrowBase,top:-arrowSize,left:"50%",transform:"translateX(-50%)",borderLeft:`${arrowSize}px solid transparent`,borderRight:`${arrowSize}px solid transparent`,borderBottom:`${arrowSize}px solid ${vc.bg}`},
    left:{...arrowBase,right:-arrowSize,top:"50%",transform:"translateY(-50%)",borderTop:`${arrowSize}px solid transparent`,borderBottom:`${arrowSize}px solid transparent`,borderLeft:`${arrowSize}px solid ${vc.bg}`},
    right:{...arrowBase,left:-arrowSize,top:"50%",transform:"translateY(-50%)",borderTop:`${arrowSize}px solid transparent`,borderBottom:`${arrowSize}px solid transparent`,borderRight:`${arrowSize}px solid ${vc.bg}`},
  };

  const wrapperFlexDir:Record<TooltipSide,React.CSSProperties["flexDirection"]>={
    top:"column",bottom:"column-reverse",left:"row",right:"row-reverse",
  };

  const triggerStyle:React.CSSProperties={
    display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,
    padding:"8px 18px",fontSize:13,fontWeight:600,fontFamily:F.body,
    background:C.azulProfundo,color:C.branco,border:"none",borderRadius:8,
    cursor:"default",
  };
  const triggerTextStyle:React.CSSProperties={
    ...triggerStyle,
    background:"transparent",color:C.azulProfundo,border:`1.5px dashed ${C.azulClaro}`,padding:"6px 14px",
    fontSize:12,
  };

  return(
    <div style={{display:"inline-flex",flexDirection:wrapperFlexDir[side],alignItems:"center",gap:8}}>
      <div style={{position:"relative",display:"inline-block"}}>
        <div style={tooltipStyle}>
          {richContent||label}
          <div style={arrowMap[side]}/>
        </div>
      </div>
      {triggerIcon?(
        <div style={{...triggerStyle,padding:"8px 10px",borderRadius:"50%"}}>{triggerIcon}</div>
      ):(
        <div style={triggerLabel?.startsWith("_text_")?triggerTextStyle:triggerStyle}>{triggerLabel||"Trigger"}</div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   GUIDELINE CARD
   ═══════════════════════════════════════════ */
function GuidelineCard({type,title,items}:{type:"do"|"dont"|"caution";title:string;items:string[]}){
  const map={
    do:{border:C.verdeFloresta,bg:"#ECFDF5",icon:Ic.check(14,C.verdeFloresta),label:"Faça"},
    dont:{border:C.danger,bg:"#FEF2F2",icon:<svg width={14} height={14} viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke={C.danger} strokeWidth="2" strokeLinecap="round"/></svg>,label:"Evite"},
    caution:{border:C.amareloEscuro,bg:"#FFF7ED",icon:Ic.alert(14,C.amareloEscuro),label:"Cuidado"},
  };
  const m=map[type];
  return(
    <div style={{border:`1.5px solid ${m.border}`,borderRadius:10,overflow:"hidden",flex:1,minWidth:220}}>
      <div style={{background:m.bg,padding:"10px 16px",display:"flex",alignItems:"center",gap:8,borderBottom:`1px solid ${m.border}22`}}>
        {m.icon}
        <span style={{fontSize:12,fontWeight:700,fontFamily:F.title,letterSpacing:".5px",color:C.cinzaEscuro}}>{title}</span>
      </div>
      <div style={{padding:"12px 16px"}}>
        {items.map((item,i)=><p key={i} style={{fontSize:13,color:C.cinzaChumbo,margin:i===0?"0":"8px 0 0",lineHeight:1.5,fontFamily:F.body}}>{item}</p>)}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ MAIN ═══════════════════════════════════════════ */
export default function TooltipDoc(){
  const [w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h)},[]);
  const mob=w<640;

  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.bg} 0%,${C.azulCeuClaro}44 50%,${C.bg} 100%)`,fontFamily:F.body,color:C.cinzaEscuro}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Saira+Expanded:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&family=Fira+Code:wght@400;500&display=swap');`}</style>

      {/* ════════════════════════ HEADER ════════════════════════ */}
      <header style={{background:`linear-gradient(135deg,${C.azulProfundo} 0%,${C.azulEscuro} 100%)`,padding:mob?"32px 20px 28px":"48px 40px 40px",position:"relative",overflow:"hidden"}}>
        <JunctionLines style={{position:"absolute",top:-10,right:-20,width:mob?250:400,height:250}}/>
        <div style={{position:"relative"}}>
          {/* DS badge */}
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${C.branco}10`,border:`1px solid ${C.branco}18`,borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",color:C.amareloOuro,fontFamily:F.title,marginBottom:16}}>
            {Ic.grid(14,C.amareloOuro)} Design System FIPS
          </div>

          {/* Title */}
          <h1 style={{fontSize:mob?30:44,fontWeight:700,color:C.branco,margin:"0 0 10px",fontFamily:F.title}}>Tooltip</h1>

          {/* Description */}
          <p style={{fontSize:16,color:`${C.branco}B0`,lineHeight:1.6,maxWidth:700,margin:"0 0 24px",fontFamily:F.body}}>
            Dicas contextuais exibidas ao passar o mouse ou focar em um elemento.
            Ideais para atalhos de teclado, status de certificados, ajuda contextual e complementos visuais
            que nao devem poluir a interface.
          </p>

          {/* Anatomy badges */}
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {["TooltipProvider","TooltipTrigger","TooltipContent","TooltipArrow"].map(part=>(
              <span key={part} style={{
                display:"inline-flex",alignItems:"center",gap:5,
                background:`${C.branco}12`,border:`1px solid ${C.branco}20`,borderRadius:6,
                padding:"4px 12px",fontSize:11,fontWeight:600,fontFamily:F.mono,
                color:C.azulCeuClaro,letterSpacing:".3px",
              }}>
                <span style={{width:6,height:6,borderRadius:"50%",background:C.amareloOuro,flexShrink:0}}/>
                {part}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ════════════════════════ BODY ════════════════════════ */}
      <div style={{padding:mob?"24px 16px 40px":"36px 40px 60px",maxWidth:1100}}>

        {/* ─── 01 POSICOES ─── */}
        <Section n="01" title="Posicionamento" desc="Tooltips podem aparecer em quatro direcoes relativas ao elemento gatilho. A seta sempre aponta para o trigger.">
          <Card mob={mob}>
            <div style={{display:"flex",flexWrap:"wrap",gap:mob?32:48,justifyContent:"center",alignItems:"center",padding:mob?"16px 0":"32px 0"}}>
              {/* Top */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <StaticTooltip label="Atalho: Ctrl + K" side="top" triggerLabel="Busca global"/>
                <span style={{fontSize:10,color:C.textLight,fontFamily:F.mono,marginTop:6}}>side="top"</span>
              </div>

              {/* Bottom */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <StaticTooltip label="Exportar relatorio CSV" side="bottom" triggerLabel="Exportar"/>
                <span style={{fontSize:10,color:C.textLight,fontFamily:F.mono,marginTop:6}}>side="bottom"</span>
              </div>

              {/* Left */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <StaticTooltip label="Editar vagao" side="left" triggerLabel="Editar"/>
                <span style={{fontSize:10,color:C.textLight,fontFamily:F.mono,marginTop:6}}>side="left"</span>
              </div>

              {/* Right */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <StaticTooltip label="Remover item" side="right" triggerLabel="Remover"/>
                <span style={{fontSize:10,color:C.textLight,fontFamily:F.mono,marginTop:6}}>side="right"</span>
              </div>
            </div>

            {/* code hint */}
            <div style={{marginTop:20,padding:"14px 18px",background:C.bg,borderRadius:8,border:`1px solid ${C.cardBorder}`}}>
              <code style={{fontSize:12,fontFamily:F.mono,color:C.cinzaEscuro,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{
`<Tooltip>
  <TooltipTrigger>Elemento gatilho</TooltipTrigger>
  <TooltipContent side="top|bottom|left|right">
    Texto da dica
  </TooltipContent>
</Tooltip>`
              }</code>
            </div>
          </Card>
        </Section>

        {/* ─── 02 CONTEUDO RICO ─── */}
        <Section n="02" title="Conteudo rico e variantes" desc="Tooltips podem conter icones, texto formatado e informacoes contextuais. Use variantes de cor para diferentes niveis de importancia.">
          <Card mob={mob}>
            <div style={{display:"flex",flexWrap:"wrap",gap:mob?28:40,justifyContent:"center",alignItems:"flex-start",padding:mob?"16px 0":"24px 0"}}>

              {/* Info variant */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <StaticTooltip
                  side="top"
                  variant="info"
                  triggerLabel="Status"
                  richContent={
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      {Ic.shield(14,C.branco)}
                      <span>Certificado FIPS valido ate 12/2026</span>
                    </div>
                  }
                />
                <span style={{fontSize:10,color:C.textLight,fontFamily:F.mono,marginTop:6}}>variant="info"</span>
              </div>

              {/* Success variant */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <StaticTooltip
                  side="top"
                  variant="success"
                  triggerLabel="Inspecao"
                  richContent={
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      {Ic.check(14,C.branco)}
                      <span>Inspecao aprovada em 03/04/2026</span>
                    </div>
                  }
                />
                <span style={{fontSize:10,color:C.textLight,fontFamily:F.mono,marginTop:6}}>variant="success"</span>
              </div>

              {/* Warning variant */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <StaticTooltip
                  side="top"
                  variant="warning"
                  triggerLabel="Alerta"
                  richContent={
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      {Ic.alert(14,C.branco)}
                      <span>Manutencao preventiva vencida ha 15 dias</span>
                    </div>
                  }
                />
                <span style={{fontSize:10,color:C.textLight,fontFamily:F.mono,marginTop:6}}>variant="warning"</span>
              </div>

              {/* Keyboard shortcut rich */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <StaticTooltip
                  side="top"
                  triggerLabel="Salvar"
                  richContent={
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      {Ic.keyboard(14,C.branco)}
                      <div>
                        <div style={{fontWeight:600}}>Salvar registro</div>
                        <div style={{opacity:.75,fontSize:11,marginTop:2}}>
                          <span style={{background:"rgba(255,255,255,.18)",padding:"1px 5px",borderRadius:3,fontSize:10,fontFamily:F.mono}}>Ctrl</span>
                          {" + "}
                          <span style={{background:"rgba(255,255,255,.18)",padding:"1px 5px",borderRadius:3,fontSize:10,fontFamily:F.mono}}>S</span>
                        </div>
                      </div>
                    </div>
                  }
                />
                <span style={{fontSize:10,color:C.textLight,fontFamily:F.mono,marginTop:6}}>shortcut</span>
              </div>
            </div>
          </Card>
        </Section>

        {/* ─── 03 TIPOS DE TRIGGER ─── */}
        <Section n="03" title="Tipos de gatilho" desc="Tooltips podem ser acionados por botoes, icones standalone ou trechos de texto com marcacao visual.">
          <Card mob={mob}>
            <div style={{display:"flex",flexWrap:"wrap",gap:mob?28:48,justifyContent:"center",alignItems:"center",padding:mob?"16px 0":"24px 0"}}>

              {/* Button trigger */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <StaticTooltip label="Iniciar operacao de carga" side="top" triggerLabel="Iniciar carga"/>
                <span style={{fontSize:10,color:C.textLight,fontFamily:F.mono,marginTop:6}}>Botao</span>
              </div>

              {/* Icon trigger */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <StaticTooltip label="Ajuda contextual" side="top" triggerIcon={Ic.help(18,C.branco)}/>
                <span style={{fontSize:10,color:C.textLight,fontFamily:F.mono,marginTop:6}}>Icone</span>
              </div>

              {/* Icon trigger 2 */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <StaticTooltip label="Informacoes do vagao" side="top" triggerIcon={Ic.info(18,C.branco)}/>
                <span style={{fontSize:10,color:C.textLight,fontFamily:F.mono,marginTop:6}}>Icone info</span>
              </div>

              {/* Text trigger */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <StaticTooltip label="Clique para ver detalhes do lote" side="top" triggerLabel="_text_Lote #4892"/>
                <span style={{fontSize:10,color:C.textLight,fontFamily:F.mono,marginTop:6}}>Texto</span>
              </div>

              {/* Train icon trigger */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <StaticTooltip label="Vagao GDT-45021 — Em transito" side="top" triggerIcon={Ic.train(18,C.branco)}/>
                <span style={{fontSize:10,color:C.textLight,fontFamily:F.mono,marginTop:6}}>Contexto FIPS</span>
              </div>
            </div>

            {/* usage note */}
            <div style={{marginTop:16,padding:"12px 16px",background:`${C.azulCeuClaro}40`,borderRadius:8,borderLeft:`3px solid ${C.azulProfundo}`,display:"flex",gap:10,alignItems:"flex-start"}}>
              {Ic.info(16,C.azulProfundo)}
              <p style={{fontSize:13,color:C.cinzaEscuro,margin:0,lineHeight:1.5,fontFamily:F.body}}>
                Use <code style={{fontFamily:F.mono,fontSize:11,background:C.neutro,padding:"1px 6px",borderRadius:3}}>asChild</code> no TooltipTrigger para herdar o elemento filho como gatilho, mantendo sua semantica HTML original.
              </p>
            </div>
          </Card>
        </Section>

        {/* ─── 04 DIRETRIZES DE USO ─── */}
        <Section n="04" title="Diretrizes de uso" desc="Quando usar Tooltip vs Popover vs Toast. Cada componente tem seu contexto ideal para manter a experiencia consistente.">
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            <GuidelineCard
              type="do"
              title="Use Tooltip para"
              items={[
                "Atalhos de teclado (Ctrl+K, Ctrl+S)",
                "Status curtos: 'Certificado valido', 'Em manutencao'",
                "Descricoes de icones sem label visivel",
                "Dicas de preenchimento em campos de formulario",
                "Informacoes complementares que cabem em 1-2 linhas",
              ]}
            />
            <GuidelineCard
              type="dont"
              title="Nao use Tooltip para"
              items={[
                "Conteudo interativo (botoes, links dentro do tooltip)",
                "Formularios ou campos de entrada",
                "Mensagens de erro — use inline validation",
                "Informacao essencial que o usuario PRECISA ver",
                "Conteudo longo que exige rolagem",
              ]}
            />
            <GuidelineCard
              type="caution"
              title="Considere alternativas"
              items={[
                "Popover: para conteudo interativo ou detalhes expandidos",
                "Toast: para feedback de acoes (salvo, erro, sucesso)",
                "Dialog: para confirmacoes e decisoes do usuario",
                "Inline hint: para orientacoes permanentes em formularios",
              ]}
            />
          </div>

          {/* Comparison table */}
          <Card mob={mob} s={{marginTop:20}}>
            <span style={{fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,display:"block",marginBottom:12}}>Comparativo rapido</span>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,fontFamily:F.body}}>
                <thead>
                  <tr style={{borderBottom:`2px solid ${C.cardBorder}`}}>
                    {["Caracteristica","Tooltip","Popover","Toast"].map(h=>(
                      <th key={h} style={{textAlign:"left",padding:"8px 12px",fontSize:11,fontWeight:700,letterSpacing:".5px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Ativacao","Hover / Focus","Click","Automatico"],
                    ["Interativo","Nao","Sim","Nao"],
                    ["Duracao","Enquanto hover","Ate fechar","Auto-dismiss"],
                    ["Conteudo","Texto curto","Qualquer","Feedback"],
                    ["Posicao","Junto ao trigger","Junto ao trigger","Canto da tela"],
                  ].map((row,i)=>(
                    <tr key={i} style={{borderBottom:`1px solid ${C.cardBorder}`}}>
                      {row.map((cell,j)=>(
                        <td key={j} style={{padding:"8px 12px",color:j===0?C.cinzaEscuro:C.cinzaChumbo,fontWeight:j===0?600:400}}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Section>

        {/* ─── 05 TOKEN REFERENCE ─── */}
        <Section n="05" title="Referencia de tokens" desc="Tokens visuais e espacamentos utilizados no componente Tooltip do DS-FIPS.">
          <Card mob={mob} s={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr 1fr",gap:24}}>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Cores</span>
              <TokenRow label="Background" value={C.cinzaEscuro} color={C.cinzaEscuro}/>
              <TokenRow label="Texto" value={C.branco} color={C.branco}/>
              <TokenRow label="Info bg" value={C.azulProfundo} color={C.azulProfundo}/>
              <TokenRow label="Success bg" value={C.verdeEscuro} color={C.verdeEscuro}/>
              <TokenRow label="Warning bg" value="#92400E" color="#92400E"/>
              <TokenRow label="Sombra" value="0 4px 12px rgba(0,0,0,.18)"/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Espacamento</span>
              <TokenRow label="Padding" value="6px 12px"/>
              <TokenRow label="Border radius" value="6px"/>
              <TokenRow label="Arrow size" value="6px"/>
              <TokenRow label="Gap trigger" value="8px"/>
              <TokenRow label="Max width (rich)" value="220px"/>
              <TokenRow label="Delay abertura" value="200ms (recomendado)"/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Tipografia</span>
              <TokenRow label="Font family" value="Open Sans 500"/>
              <TokenRow label="Font size" value="12px"/>
              <TokenRow label="Line height" value="1.45"/>
              <TokenRow label="White space" value="nowrap (simples)"/>
              <TokenRow label="Shortcut keys" value="Fira Code 10px"/>
              <TokenRow label="Label bold" value="600"/>
            </div>
          </Card>
        </Section>

        {/* ════════════════════════ FOOTER ════════════════════════ */}
        <div style={{textAlign:"center",padding:"20px 0 0",borderTop:`1px solid ${C.cardBorder}`,marginTop:20}}>
          <span style={{fontSize:12,color:C.cinzaChumbo,letterSpacing:".5px",fontFamily:F.title,fontWeight:400}}>
            DS-FIPS v2.0 · Ferrovia Interna do Porto de Santos · Excelencia sobre trilhos · {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
}
