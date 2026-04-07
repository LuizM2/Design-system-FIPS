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
const F = {title:"'Saira Expanded',sans-serif",body:"'Open Sans',sans-serif",mono:"'Fira Code',monospace"};

/* ═══════════════════════════════════════════ SVG ═══════════════════════════════════════════ */
function JunctionLines({style}:{style?:React.CSSProperties}){
  return(
    <svg viewBox="0 0 320 200" fill="none" style={{opacity:.12,...style}}>
      <path d="M0 60H100C120 60 120 60 140 40L200 40H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/>
      <path d="M0 60H100C120 60 120 60 140 80L200 80H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/>
      <path d="M0 120H60C80 120 80 120 100 100L160 100H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/>
      <path d="M0 120H60C80 120 80 120 100 140L160 140H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════ ICONS ═══════════════════════════════════════════ */
const Ic = {
  check:(s:number=14,c:string="#fff")=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  x:(s:number=12,c:string=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  alert:(s:number=14,c:string=C.amareloEscuro)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M8 1.5L1 14h14L8 1.5z" stroke={c} strokeWidth="1.3" strokeLinejoin="round"/><path d="M8 6v3.5M8 11.5v.5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  info:(s:number=14,c:string=C.azulProfundo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke={c} strokeWidth="1.5"/><path d="M8 7v4M8 5v.5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  error:(s:number=14,c:string=C.danger)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke={c} strokeWidth="1.5"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  bell:(s:number=14,c:string=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M4 6a4 4 0 018 0c0 4 2 5 2 5H2s2-1 2-5zM6.5 13a1.5 1.5 0 003 0" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  undo:(s:number=14,c:string=C.azulProfundo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M3 7h7a3 3 0 010 6H7" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.5 4.5L3 7l2.5 2.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  grid:(s:number=14,c:string=C.amareloOuro)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill={c}/><rect x="9" y="1" width="6" height="6" rx="1.5" fill={c} opacity="0.5"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill={c} opacity="0.5"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill={c} opacity="0.3"/></svg>,
};

/* ═══════════════════════════════════════════ TOAST VISUAL ═══════════════════════════════════════════ */
interface ToastPreviewProps {
  variant: "sucesso" | "erro" | "alerta" | "info" | "neutro";
  title: string;
  description?: string;
  actions?: {label:string; primary?:boolean}[];
  style?: React.CSSProperties;
}

const TOAST_VARIANTS: Record<string, {bg:string; border:string; accent:string; icon:(s?:number)=>React.ReactNode; iconBg:string}> = {
  sucesso: {bg:"#F0FDF4",border:"#BBF7D0",accent:C.verdeFloresta,icon:(s=16)=>Ic.check(s,C.verdeFloresta),iconBg:"#DCFCE7"},
  erro:    {bg:"#FEF2F2",border:"#FECACA",accent:C.danger,icon:(s=16)=>Ic.error(s,C.danger),iconBg:"#FEE2E2"},
  alerta:  {bg:"#FFFBEB",border:"#FDE68A",accent:C.amareloEscuro,icon:(s=16)=>Ic.alert(s,C.amareloEscuro),iconBg:"#FEF3C7"},
  info:    {bg:C.azulCeuClaro,border:C.azulCeu,accent:C.azulProfundo,icon:(s=16)=>Ic.info(s,C.azulProfundo),iconBg:"#DBEAFE"},
  neutro:  {bg:C.branco,border:C.cardBorder,accent:C.cinzaEscuro,icon:(s=16)=>Ic.bell(s,C.cinzaChumbo),iconBg:C.bg},
};

function ToastPreview({variant,title,description,actions,style}:ToastPreviewProps){
  const v = TOAST_VARIANTS[variant];
  return(
    <div style={{
      display:"flex",alignItems:"flex-start",gap:12,
      padding:"14px 16px",borderRadius:10,
      background:v.bg,border:`1px solid ${v.border}`,
      boxShadow:"0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
      minWidth:300,maxWidth:420,fontFamily:F.body,
      position:"relative",
      ...style,
    }}>
      {/* accent bar */}
      <div style={{position:"absolute",left:0,top:8,bottom:8,width:3,borderRadius:3,background:v.accent}}/>

      {/* icon */}
      <div style={{width:28,height:28,borderRadius:7,background:v.iconBg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginLeft:4}}>
        {v.icon(15)}
      </div>

      {/* content */}
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:600,color:C.cinzaEscuro,lineHeight:1.3,marginBottom:description?3:0}}>{title}</div>
        {description&&<div style={{fontSize:12,color:C.cinzaChumbo,lineHeight:1.4}}>{description}</div>}
        {actions&&actions.length>0&&(
          <div style={{display:"flex",gap:8,marginTop:8}}>
            {actions.map((a,i)=>(
              <span key={i} style={{
                fontSize:11,fontWeight:600,
                color:a.primary?v.accent:C.cinzaChumbo,
                cursor:"pointer",
                padding:"3px 10px",borderRadius:5,
                background:a.primary?`${v.accent}12`:"transparent",
                border:a.primary?`1px solid ${v.accent}30`:`1px solid ${C.cardBorder}`,
              }}>{a.label}</span>
            ))}
          </div>
        )}
      </div>

      {/* close */}
      <div style={{flexShrink:0,cursor:"pointer",opacity:.4,marginTop:2}}>
        {Ic.x(10,C.cinzaChumbo)}
      </div>
    </div>
  );
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

function Card({children,mob,s}:{children:React.ReactNode;mob?:boolean;s?:React.CSSProperties}){
  return(
    <div style={{
      background:C.cardBg,borderRadius:"12px 12px 12px 24px",
      border:`1px solid ${C.cardBorder}`,padding:mob?16:28,
      boxShadow:"0 1px 3px rgba(0,75,155,.04),0 4px 14px rgba(0,75,155,.03)",...s,
    }}>{children}</div>
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

/* ═══════════════════════════════════════════ POSITION DIAGRAM ═══════════════════════════════════════════ */
function PositionDiagram({mob}:{mob:boolean}){
  const positions = [
    {label:"top-left",top:8,left:8},
    {label:"top-center",top:8,left:"50%",transform:"translateX(-50%)"},
    {label:"top-right",top:8,right:8},
    {label:"bottom-left",bottom:8,left:8},
    {label:"bottom-center",bottom:8,left:"50%",transform:"translateX(-50%)"},
    {label:"bottom-right",bottom:8,right:8},
  ] as const;

  return(
    <div style={{position:"relative",width:"100%",height:mob?200:260,background:`linear-gradient(135deg,${C.bg},${C.azulCeuClaro}33)`,border:`1px solid ${C.cardBorder}`,borderRadius:10,overflow:"hidden"}}>
      {/* Browser chrome */}
      <div style={{height:28,background:C.branco,borderBottom:`1px solid ${C.cardBorder}`,display:"flex",alignItems:"center",padding:"0 10px",gap:6}}>
        <div style={{width:8,height:8,borderRadius:4,background:"#FF5F57"}}/>
        <div style={{width:8,height:8,borderRadius:4,background:"#FFBD2E"}}/>
        <div style={{width:8,height:8,borderRadius:4,background:"#28C840"}}/>
        <div style={{flex:1,height:14,background:C.bg,borderRadius:7,marginLeft:12,maxWidth:200}}/>
      </div>
      {/* Position markers */}
      {positions.map((p)=>{
        const posStyle:React.CSSProperties = {position:"absolute",fontSize:mob?8:9,fontFamily:F.mono,color:C.branco,background:C.azulProfundo,padding:mob?"3px 6px":"4px 10px",borderRadius:5,whiteSpace:"nowrap",fontWeight:500};
        if("top" in p) (posStyle as any).top=typeof p.top==="number"?p.top+28:p.top;
        if("bottom" in p) (posStyle as any).bottom=p.bottom;
        if("left" in p) (posStyle as any).left=p.left;
        if("right" in p) (posStyle as any).right=p.right;
        if("transform" in p) posStyle.transform=p.transform;
        return <div key={p.label} style={posStyle}>{p.label}</div>;
      })}
      {/* Highlight default */}
      <div style={{position:"absolute",bottom:40,right:mob?8:12,fontSize:mob?8:10,fontFamily:F.body,color:C.amareloEscuro,fontWeight:600,background:"#FFF7ED",padding:"3px 8px",borderRadius:4,border:`1px solid ${C.amareloEscuro}40`}}>
        padrao FIPS
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ COMPARISON TABLE ═══════════════════════════════════════════ */
function ComparisonTable({mob: _mob}:{mob:boolean}){
  const rows = [
    {feature:"Bloqueante?",toast:"Nao",modal:"Sim",inline:"Nao"},
    {feature:"Requer acao?",toast:"Opcional",modal:"Sim",inline:"Nao"},
    {feature:"Auto-dismiss?",toast:"Sim (4s)",modal:"Nao",inline:"Nao"},
    {feature:"Posicao fixa?",toast:"Sim (canto)",modal:"Centro",inline:"In-flow"},
    {feature:"Interrompe fluxo?",toast:"Nao",modal:"Sim",inline:"Nao"},
  ];

  const th:React.CSSProperties = {fontSize:11,fontWeight:700,color:C.azulEscuro,fontFamily:F.title,padding:"10px 14px",textAlign:"left",letterSpacing:".3px",textTransform:"uppercase",borderBottom:`2px solid ${C.azulProfundo}20`};
  const td:React.CSSProperties = {fontSize:12,color:C.cinzaEscuro,fontFamily:F.body,padding:"10px 14px",borderBottom:`1px solid ${C.cardBorder}`};

  return(
    <div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",minWidth:400}}>
        <thead>
          <tr>
            <th style={th}>Criterio</th>
            <th style={{...th,color:C.azulProfundo}}>Toast</th>
            <th style={th}>Modal</th>
            <th style={th}>Inline</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i}>
              <td style={{...td,fontWeight:600}}>{r.feature}</td>
              <td style={{...td,color:C.azulProfundo,fontWeight:600}}>{r.toast}</td>
              <td style={td}>{r.modal}</td>
              <td style={td}>{r.inline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════ MAIN ═══════════════════════════════════════════ */
export default function ToastDoc(){
  const [w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h)},[]);
  const mob=w<640;

  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.bg} 0%,${C.azulCeuClaro}44 50%,${C.bg} 100%)`,fontFamily:F.body,color:C.cinzaEscuro}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Saira+Expanded:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&family=Fira+Code:wght@400;500&display=swap');`}</style>

      {/* ═══════════ HEADER ═══════════ */}
      <header style={{background:`linear-gradient(135deg,${C.azulProfundo} 0%,${C.azulEscuro} 100%)`,padding:mob?"32px 20px":"48px 40px 44px",position:"relative",overflow:"hidden"}}>
        <JunctionLines style={{position:"absolute",top:-10,right:-20,width:mob?250:400,height:250}}/>
        <JunctionLines style={{position:"absolute",bottom:-30,left:"30%",width:500,height:200,transform:"scaleX(-1)"}}/>

        <div style={{position:"relative"}}>
          {/* DS badge */}
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${C.branco}10`,border:`1px solid ${C.branco}18`,borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",color:C.amareloOuro,fontFamily:F.title,marginBottom:16}}>
            {Ic.grid(14,C.amareloOuro)} Design System FIPS
          </div>

          {/* Title */}
          <h1 style={{fontSize:mob?30:44,fontWeight:700,color:C.branco,margin:"0 0 10px",fontFamily:F.title,letterSpacing:"1px"}}>Toast</h1>

          {/* Description */}
          <p style={{fontSize:16,color:`${C.branco}B0`,lineHeight:1.6,maxWidth:700,margin:0,fontFamily:F.body}}>
            Notificacoes nao-modais de feedback que informam o usuario sobre o resultado de uma acao sem interromper o fluxo.
            Aparecem temporariamente e sao descartadas automaticamente ou pelo usuario.
          </p>

          {/* Anatomy badges */}
          <div style={{display:"flex",gap:14,marginTop:24,flexWrap:"wrap"}}>
            {[
              {color:C.verdeFloresta,label:"sucesso",hex:"#00C64C"},
              {color:C.danger,label:"erro",hex:"#DC3545"},
              {color:C.amareloEscuro,label:"alerta",hex:"#F6921E"},
              {color:C.azulProfundo,label:"info",hex:"#004B9B"},
              {color:C.cinzaChumbo,label:"neutro",hex:"#7B8C96"},
            ].map((t)=>(
              <div key={t.label} style={{display:"flex",alignItems:"center",gap:8,background:`${C.branco}08`,border:`1px solid ${C.branco}15`,borderRadius:6,padding:"6px 12px",fontSize:12,color:`${C.branco}90`,fontFamily:F.mono}}>
                <div style={{width:12,height:12,borderRadius:3,background:t.color,border:`1px solid ${C.branco}20`,flexShrink:0}}/>
                {t.label}
                <span style={{opacity:0.5}}>{t.hex}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ═══════════ BODY ═══════════ */}
      <div style={{padding:mob?"24px 16px 40px":"36px 40px 60px",maxWidth:1100}}>

        {/* ─── 01 VARIANTES ─── */}
        <Section n="01" title="Variantes de toast" desc="Cada variante comunica um tipo diferente de feedback. O acento lateral e o icone reforçam a semantica visual.">
          <Card mob={mob}>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {/* Sucesso */}
              <div>
                <span style={{fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,display:"block",marginBottom:8}}>Sucesso</span>
                <ToastPreview variant="sucesso" title="Dados salvos com sucesso" description="Os registros de movimentacao foram gravados no sistema."/>
              </div>

              {/* Erro */}
              <div>
                <span style={{fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,display:"block",marginBottom:8}}>Erro</span>
                <ToastPreview variant="erro" title="Erro ao sincronizar" description="Falha na conexao com o servidor. Tente novamente em alguns instantes."/>
              </div>

              {/* Alerta */}
              <div>
                <span style={{fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,display:"block",marginBottom:8}}>Alerta</span>
                <ToastPreview variant="alerta" title="Atencao: prazo proximo" description="A requisicao #REQ-4021 vence em 2 dias uteis."/>
              </div>

              {/* Info */}
              <div>
                <span style={{fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,display:"block",marginBottom:8}}>Informativo</span>
                <ToastPreview variant="info" title="Requisicao aprovada" description="A requisicao de material eletrico foi aprovada pelo supervisor."/>
              </div>

              {/* Neutro */}
              <div>
                <span style={{fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,display:"block",marginBottom:8}}>Neutro</span>
                <ToastPreview variant="neutro" title="Operacao registrada" description="O evento foi registrado no log do sistema."/>
              </div>
            </div>
          </Card>

          {/* Compact row */}
          <div style={{marginTop:16}}>
            <Card mob={mob}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,display:"block",marginBottom:12}}>Compacto (sem descricao)</span>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <ToastPreview variant="sucesso" title="Vagao liberado para carregamento"/>
                <ToastPreview variant="erro" title="Falha ao gerar relatorio"/>
                <ToastPreview variant="info" title="3 novas notificacoes"/>
              </div>
            </Card>
          </div>
        </Section>

        {/* ─── 02 TOAST COM ACOES ─── */}
        <Section n="02" title="Toast com acoes" desc="Toasts podem conter botoes de acao para permitir que o usuario reverta ou responda a uma operacao sem sair do contexto atual.">
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:16}}>
            {/* Undo */}
            <div style={{background:C.bg,border:`1px solid ${C.cardBorder}`,borderRadius:"10px 10px 10px 20px",padding:mob?16:24}}>
              <h3 style={{fontSize:14,fontWeight:700,color:C.azulEscuro,margin:"0 0 4px",fontFamily:F.title}}>Desfazer acao</h3>
              <p style={{fontSize:12,color:C.cinzaChumbo,margin:"0 0 16px",lineHeight:1.4}}>Permite reverter uma exclusao ou movimentacao antes que se torne permanente.</p>
              <ToastPreview
                variant="neutro"
                title="Registro removido"
                description="O item #4023 foi excluido da lista de suprimentos."
                actions={[{label:"Desfazer",primary:true},{label:"Dispensar"}]}
              />
            </div>

            {/* Retry */}
            <div style={{background:C.bg,border:`1px solid ${C.cardBorder}`,borderRadius:"10px 10px 10px 20px",padding:mob?16:24}}>
              <h3 style={{fontSize:14,fontWeight:700,color:C.azulEscuro,margin:"0 0 4px",fontFamily:F.title}}>Tentar novamente</h3>
              <p style={{fontSize:12,color:C.cinzaChumbo,margin:"0 0 16px",lineHeight:1.4}}>Em caso de falha, o usuario pode tentar a operacao novamente diretamente pelo toast.</p>
              <ToastPreview
                variant="erro"
                title="Falha ao exportar PDF"
                description="Nao foi possivel gerar o relatorio de movimentacao."
                actions={[{label:"Tentar novamente",primary:true},{label:"Fechar"}]}
              />
            </div>

            {/* Navigate */}
            <div style={{background:C.bg,border:`1px solid ${C.cardBorder}`,borderRadius:"10px 10px 10px 20px",padding:mob?16:24}}>
              <h3 style={{fontSize:14,fontWeight:700,color:C.azulEscuro,margin:"0 0 4px",fontFamily:F.title}}>Navegar</h3>
              <p style={{fontSize:12,color:C.cinzaChumbo,margin:"0 0 16px",lineHeight:1.4}}>Direciona o usuario a uma pagina relacionada apos a conclusao de uma acao.</p>
              <ToastPreview
                variant="sucesso"
                title="Requisicao #REQ-4025 criada"
                description="Aprovacao pendente pelo supervisor de area."
                actions={[{label:"Ver requisicao",primary:true}]}
              />
            </div>

            {/* Confirm */}
            <div style={{background:C.bg,border:`1px solid ${C.cardBorder}`,borderRadius:"10px 10px 10px 20px",padding:mob?16:24}}>
              <h3 style={{fontSize:14,fontWeight:700,color:C.azulEscuro,margin:"0 0 4px",fontFamily:F.title}}>Confirmacao rapida</h3>
              <p style={{fontSize:12,color:C.cinzaChumbo,margin:"0 0 16px",lineHeight:1.4}}>Solicita confirmacao leve para acoes com impacto moderado.</p>
              <ToastPreview
                variant="alerta"
                title="Deseja atualizar o status?"
                description="O vagao #VG-1042 sera marcado como em manutencao."
                actions={[{label:"Confirmar",primary:true},{label:"Cancelar"}]}
              />
            </div>
          </div>
        </Section>

        {/* ─── 03 POSICIONAMENTO ─── */}
        <Section n="03" title="Posicionamento" desc="O padrao FIPS posiciona toasts no canto inferior-direito (bottom-right). Outras posicoes sao suportadas conforme o contexto da aplicacao.">
          <Card mob={mob}>
            <PositionDiagram mob={mob}/>
            <div style={{marginTop:16,display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr 1fr",gap:12}}>
              {[
                {pos:"bottom-right",desc:"Padrao FIPS. Nao conflita com sidebar nem header.",rec:true},
                {pos:"top-right",desc:"Alternativa para telas com footer fixo ou chat.",rec:false},
                {pos:"top-center",desc:"Toasts criticos ou globais que precisam de atencao imediata.",rec:false},
              ].map((p)=>(
                <div key={p.pos} style={{background:C.bg,border:`1px solid ${p.rec?`${C.verdeFloresta}40`:C.cardBorder}`,borderRadius:8,padding:"12px 16px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                    <code style={{fontSize:11,fontFamily:F.mono,color:p.rec?C.verdeFloresta:C.cinzaEscuro,fontWeight:600}}>{p.pos}</code>
                    {p.rec&&<span style={{fontSize:9,fontWeight:700,color:C.verdeFloresta,background:"#ECFDF5",padding:"1px 6px",borderRadius:3,textTransform:"uppercase",letterSpacing:".5px"}}>padrao</span>}
                  </div>
                  <p style={{fontSize:12,color:C.cinzaChumbo,margin:0,lineHeight:1.4}}>{p.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* ─── 04 QUANDO USAR ─── */}
        <Section n="04" title="Diretrizes de uso" desc="Orientacoes sobre quando usar toast em vez de modal ou mensagem inline.">
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:16,marginBottom:20}}>
            {/* When to use */}
            <div style={{background:C.cardBg,border:`1px solid ${C.cardBorder}`,borderRadius:"10px 10px 10px 18px",overflow:"hidden"}}>
              <div style={{padding:"14px 20px",background:"#F0FDF4",borderBottom:`1px solid #BBF7D0`,display:"flex",alignItems:"center",gap:8}}>
                {Ic.check(14,C.verdeFloresta)}
                <span style={{fontSize:13,fontWeight:700,color:C.verdeEscuro,fontFamily:F.title}}>Quando usar Toast</span>
              </div>
              <div style={{padding:"16px 20px"}}>
                <ul style={{margin:0,paddingLeft:18,fontSize:13,color:C.cinzaEscuro,lineHeight:1.7,fontFamily:F.body}}>
                  <li>Confirmacao de salvar, criar, atualizar registros</li>
                  <li>Feedback de operacoes asincronas (exportar, sincronizar)</li>
                  <li>Notificacoes de sistema nao-criticas</li>
                  <li>Confirmacao de copy-to-clipboard</li>
                  <li>Status de upload ou download concluido</li>
                  <li>Informacoes transitorias que nao exigem acao</li>
                </ul>
              </div>
            </div>

            {/* When NOT to use */}
            <div style={{background:C.cardBg,border:`1px solid ${C.cardBorder}`,borderRadius:"10px 10px 10px 18px",overflow:"hidden"}}>
              <div style={{padding:"14px 20px",background:"#FEF2F2",borderBottom:`1px solid #FECACA`,display:"flex",alignItems:"center",gap:8}}>
                {Ic.x(14,C.danger)}
                <span style={{fontSize:13,fontWeight:700,color:"#B91C1C",fontFamily:F.title}}>Quando NAO usar Toast</span>
              </div>
              <div style={{padding:"16px 20px"}}>
                <ul style={{margin:0,paddingLeft:18,fontSize:13,color:C.cinzaEscuro,lineHeight:1.7,fontFamily:F.body}}>
                  <li>Erros de validacao de formulario (use inline)</li>
                  <li>Confirmacao de exclusao irreversivel (use modal)</li>
                  <li>Mensagens que exigem leitura completa (use modal)</li>
                  <li>Feedback em tempo real continuo (use indicador inline)</li>
                  <li>Permissoes ou autenticacao (use pagina dedicada)</li>
                  <li>Informacao persistente de status (use badge ou banner)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Comparison table */}
          <Card mob={mob}>
            <span style={{fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,display:"block",marginBottom:12}}>Comparativo: Toast vs Modal vs Inline</span>
            <ComparisonTable mob={mob}/>
          </Card>

          {/* Best practices */}
          <div style={{marginTop:16}}>
            <Card mob={mob}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,display:"block",marginBottom:12}}>Boas praticas</span>
              <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:16}}>
                {[
                  {title:"Mensagens curtas",desc:"Maximo 2 linhas. O usuario deve entender o feedback em 2-3 segundos."},
                  {title:"Auto-dismiss de 4 segundos",desc:"Tempo padrao para toasts sem acao. Toasts com acao devem durar 8s ou mais."},
                  {title:"Maximo 3 toasts visiveis",desc:"Empilhe no maximo 3 toasts. Novos substituem os mais antigos."},
                  {title:"Acessibilidade",desc:'Use role="status" para sucesso/info e role="alert" para erro/alerta.'},
                ].map((bp,i)=>(
                  <div key={i} style={{background:C.bg,borderRadius:8,padding:"14px 16px",border:`1px solid ${C.cardBorder}`}}>
                    <div style={{fontSize:13,fontWeight:700,color:C.azulEscuro,fontFamily:F.title,marginBottom:4}}>{bp.title}</div>
                    <p style={{fontSize:12,color:C.cinzaChumbo,margin:0,lineHeight:1.45,fontFamily:F.body}}>{bp.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Section>

        {/* ─── 05 TOKENS ─── */}
        <Section n="05" title="Tokens de referencia" desc="Valores de design utilizados neste componente — direto do Brandbook FIPS.">
          <Card mob={mob} s={{display:"flex",gap:mob?24:48,flexWrap:"wrap"}}>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Cores de fundo</span>
              <TokenRow label="Sucesso" value="#F0FDF4" color="#F0FDF4"/>
              <TokenRow label="Erro" value="#FEF2F2" color="#FEF2F2"/>
              <TokenRow label="Alerta" value="#FFFBEB" color="#FFFBEB"/>
              <TokenRow label="Info" value="#D3E3F4" color={C.azulCeuClaro}/>
              <TokenRow label="Neutro" value="#FFFFFF" color={C.branco}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Acentos</span>
              <TokenRow label="Sucesso" value="#00C64C" color={C.verdeFloresta}/>
              <TokenRow label="Erro" value="#DC3545" color={C.danger}/>
              <TokenRow label="Alerta" value="#F6921E" color={C.amareloEscuro}/>
              <TokenRow label="Info" value="#004B9B" color={C.azulProfundo}/>
              <TokenRow label="Neutro" value="#333B41" color={C.cinzaEscuro}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Dimensoes</span>
              <TokenRow label="Min width" value="300px"/>
              <TokenRow label="Max width" value="420px"/>
              <TokenRow label="Padding" value="14px 16px"/>
              <TokenRow label="Border radius" value="10px"/>
              <TokenRow label="Icon size" value="28px (container)"/>
              <TokenRow label="Accent bar" value="3px width"/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Tipografia</span>
              <TokenRow label="Titulo" value="Open Sans 600, 13px"/>
              <TokenRow label="Descricao" value="Open Sans 400, 12px"/>
              <TokenRow label="Acao" value="Open Sans 600, 11px"/>
              <TokenRow label="Auto-dismiss" value="4000ms (padrao)"/>
              <TokenRow label="Shadow" value="0 4px 16px rgba(...)"/>
              <TokenRow label="Position" value="bottom-right"/>
            </div>
          </Card>
        </Section>

        {/* ═══════════ FOOTER ═══════════ */}
        <div style={{textAlign:"center",padding:"20px 0 0",borderTop:`1px solid ${C.cardBorder}`,marginTop:20}}>
          <span style={{fontSize:12,color:C.cinzaChumbo,letterSpacing:".5px",fontFamily:F.title,fontWeight:400}}>DS-FIPS v2.0 · Ferrovia Interna do Porto de Santos · Excelencia sobre trilhos · {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}
