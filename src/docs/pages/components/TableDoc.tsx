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
  check:(s=12,c="#fff")=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  x:(s=10,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  clock:(s=12,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke={c} strokeWidth="1.5"/><path d="M8 4.5V8l2.5 1.5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  eye:(s=14,c=C.azulProfundo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M2 10s3.5-5 8-5 8 5 8 5-3.5 5-8 5-8-5-8-5z" stroke={c} strokeWidth="1.5"/><circle cx="10" cy="10" r="2.5" stroke={c} strokeWidth="1.5"/></svg>,
  edit:(s=14,c=C.azulProfundo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  trash:(s=14,c=C.danger)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5 4V2.5A.5.5 0 015.5 2h5a.5.5 0 01.5.5V4M6.5 7v4M9.5 7v4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><path d="M3 4l1 10a1 1 0 001 1h6a1 1 0 001-1l1-10" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  inbox:(s=40,c=C.cinzaClaro)=><svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect x="8" y="14" width="32" height="24" rx="3" stroke={c} strokeWidth="2.5"/><path d="M8 30h10l2 4h8l2-4h10" stroke={c} strokeWidth="2.5" strokeLinejoin="round"/></svg>,
  alert:(s=12,c=C.amareloEscuro)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M8 1.5L1 14h14L8 1.5z" stroke={c} strokeWidth="1.3" strokeLinejoin="round"/><path d="M8 6v3.5M8 11.5v.5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  info:(s=12,c=C.azulProfundo)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke={c} strokeWidth="1.5"/><path d="M8 7v4M8 5v.5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
};

/* ═══════════════════════════════════════════ JUNCTION LINES ═══════════════════════════════════════════ */
function JunctionLines({style}:{style?:React.CSSProperties}){return <svg viewBox="0 0 320 200" fill="none" style={{opacity:.12,...style}}><path d="M0 60H100C120 60 120 60 140 40L200 40H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 60H100C120 60 120 60 140 80L200 80H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 120H60C80 120 80 120 100 100L160 100H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 120H60C80 120 80 120 100 140L160 140H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 170H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/><path d="M0 20H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/></svg>}

/* ═══════════════════════════════════════════ BADGE (inline) ═══════════════════════════════════════════ */
const VARIANTS:Record<string,{bg:string;color:string;border:string}> = {
  default:   { bg:C.azulProfundo, color:C.branco, border:"transparent" },
  secondary: { bg:C.bg, color:C.cinzaEscuro, border:C.cardBorder },
  sucesso:   { bg:"#ECFDF5", color:C.verdeEscuro, border:"#A7F3D0" },
  atencao:   { bg:"#FFF7ED", color:"#C2410C", border:"#FDBA74" },
  critico:   { bg:"#FEF2F2", color:"#B91C1C", border:"#FECACA" },
  info:      { bg:C.azulCeuClaro, color:C.azulEscuro, border:C.azulCeu },
  ouro:      { bg:"#FEF9E7", color:"#92400E", border:C.amareloOuro },
};

function Badge({variant="default",children,dot,dotColor,icon}:{variant?:string;children:React.ReactNode;dot?:boolean;dotColor?:string;icon?:React.ReactNode}){
  const v=VARIANTS[variant]||VARIANTS.default;
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"2px 8px",fontSize:11,fontWeight:600,fontFamily:F.body,color:v.color,background:v.bg,border:`1px solid ${v.border}`,borderRadius:4,lineHeight:1.3,whiteSpace:"nowrap"}}>
      {dot&&<span style={{width:6,height:6,borderRadius:"50%",background:dotColor||v.color,flexShrink:0,opacity:.85}}/>}
      {icon&&<span style={{display:"flex",flexShrink:0}}>{icon}</span>}
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════ LAYOUT ═══════════════════════════════════════════ */
function Section({n,title,desc,children}:{n:string;title:string;desc:string;children:React.ReactNode}){return(
  <section style={{marginBottom:44}}><div style={{fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:C.azulClaro,fontFamily:F.title,marginBottom:6}}>{n}</div><h2 style={{fontSize:20,fontWeight:700,color:C.azulEscuro,margin:"0 0 4px",fontFamily:F.title,letterSpacing:".5px"}}>{title}</h2><p style={{fontSize:14,color:C.cinzaChumbo,margin:"0 0 20px",lineHeight:1.55,fontFamily:F.body}}>{desc}</p>{children}</section>
);}
function Card({children,s,mob}:{children:React.ReactNode;s?:React.CSSProperties;mob?:boolean}){return(
  <div style={{background:C.cardBg,borderRadius:"12px 12px 12px 24px",border:`1px solid ${C.cardBorder}`,padding:mob?16:28,boxShadow:"0 1px 3px rgba(0,75,155,.04),0 4px 14px rgba(0,75,155,.03)",...s}}>{children}</div>
);}

function TokenRow({label,value,color}:{label:string;value:string;color?:string}){return(
  <div style={{display:"flex",alignItems:"center",gap:10,fontSize:12,fontFamily:F.body}}>{color&&<div style={{width:16,height:16,borderRadius:4,background:color,border:`1px solid ${C.cardBorder}`,flexShrink:0}}/>}<span style={{color:C.cinzaChumbo,minWidth:120}}>{label}</span><code style={{background:C.neutro,padding:"2px 8px",borderRadius:4,fontSize:11,fontFamily:F.mono,color:C.cinzaEscuro}}>{value}</code></div>
);}

/* ═══════════════════════════════════════════ TABLE COMPONENTS (inline) ═══════════════════════════════════════════ */
const tableStyle:React.CSSProperties={width:"100%",borderCollapse:"collapse",fontFamily:F.body,fontSize:13};
const thStyle:React.CSSProperties={textAlign:"left",padding:"10px 16px",fontSize:11,fontWeight:700,letterSpacing:".5px",textTransform:"uppercase",color:C.cinzaChumbo,fontFamily:F.title,background:C.bg,borderBottom:`2px solid ${C.cardBorder}`};
const tdStyle:React.CSSProperties={padding:"12px 16px",borderBottom:`1px solid ${C.cardBorder}`,color:C.cinzaEscuro,fontSize:13,fontFamily:F.body};
const trHover=(e:React.MouseEvent)=>{(e.currentTarget as HTMLElement).style.background=`${C.azulCeuClaro}30`};
const trLeave=(e:React.MouseEvent)=>{(e.currentTarget as HTMLElement).style.background="transparent"};

function ActionBtn({icon,label,onClick}:{icon:React.ReactNode;label:string;onClick?:()=>void}){
  const [hov,setHov]=useState(false);
  return(
    <button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} title={label} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:30,height:30,border:`1px solid ${hov?C.azulCeu:C.cardBorder}`,borderRadius:6,background:hov?C.azulCeuClaro:C.cardBg,cursor:"pointer",transition:"all .15s"}}>
      {icon}
    </button>
  );
}

/* ═══════════════════════════════════════════ MAIN ═══════════════════════════════════════════ */
export default function TableDoc(){
  const [w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h)},[]);
  const mob=w<640;

  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.bg} 0%,${C.azulCeuClaro}44 50%,${C.bg} 100%)`,fontFamily:F.body,color:C.cinzaEscuro}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Saira+Expanded:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&family=Fira+Code:wght@400;500&display=swap');`}</style>

      {/* ══════ HEADER ══════ */}
      <header style={{background:`linear-gradient(135deg,${C.azulProfundo} 0%,${C.azulEscuro} 100%)`,padding:mob?"32px 20px":"48px 40px 44px",position:"relative",overflow:"hidden"}}>
        <JunctionLines style={{position:"absolute",top:-10,right:-20,width:mob?250:400,height:250}}/>
        <JunctionLines style={{position:"absolute",bottom:-30,left:"30%",width:500,height:200,transform:"scaleX(-1)"}}/>
        <div style={{position:"relative"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${C.branco}10`,border:`1px solid ${C.branco}18`,borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",color:C.amareloOuro,fontFamily:F.title,marginBottom:16}}>{Ic.grid(14,C.amareloOuro)} Design System FIPS</div>
          <h1 style={{fontSize:mob?30:44,fontWeight:700,color:C.branco,margin:"0 0 10px",fontFamily:F.title,letterSpacing:"1px"}}>Table</h1>
          <p style={{fontSize:16,color:`${C.branco}B0`,lineHeight:1.6,maxWidth:700,margin:0,fontFamily:F.body}}>
            Estrutura base para <strong style={{color:`${C.branco}DD`}}>data tables e listagens operacionais</strong>. Componente semântico composto por header, rows e cells, com suporte a estados vazios, ações por linha e integração com badges de status.
          </p>
          {/* Anatomy badges */}
          <div style={{display:"flex",gap:14,marginTop:24,flexWrap:"wrap"}}>
            {[
              {l:"TableHeader",c:C.azulProfundo},
              {l:"TableRow",c:C.azulCeu},
              {l:"TableCell",c:C.cinzaEscuro},
              {l:"TableEmpty",c:C.cinzaChumbo},
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

        {/* 01 — ESTRUTURA BASICA */}
        <Section n="01" title="Estrutura basica" desc="Tabela com header, rows e cells. A construcao segue a semantica HTML (thead, tbody, tr, th, td) com tokens visuais do DS-FIPS aplicados via inline styles.">
          <Card mob={mob}>
            <div style={{overflowX:"auto"}}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Empresa</th>
                    <th style={thStyle}>Segmento</th>
                    <th style={thStyle}>CNPJ</th>
                    <th style={thStyle}>Responsavel</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {id:"EMP-001",empresa:"Santos Logistica Ltda",seg:"Graneis",cnpj:"12.345.678/0001-01",resp:"Ana Costa"},
                    {id:"EMP-002",empresa:"Porto Grãos Comercial S/A",seg:"Graos",cnpj:"98.765.432/0001-02",resp:"Bruno Lima"},
                    {id:"EMP-003",empresa:"Ferrovia Sul Terminais",seg:"Conteineres",cnpj:"11.222.333/0001-03",resp:"Carla Mendes"},
                    {id:"EMP-004",empresa:"Transmar Navegacao",seg:"Carga Geral",cnpj:"44.555.666/0001-04",resp:"Diego Torres"},
                  ].map(r=>(
                    <tr key={r.id} style={{transition:"background .12s"}} onMouseEnter={trHover} onMouseLeave={trLeave}>
                      <td style={{...tdStyle,fontFamily:F.mono,fontSize:12,fontWeight:600,color:C.azulProfundo}}>{r.id}</td>
                      <td style={{...tdStyle,fontWeight:600}}>{r.empresa}</td>
                      <td style={tdStyle}>{r.seg}</td>
                      <td style={{...tdStyle,fontFamily:F.mono,fontSize:12,color:C.cinzaChumbo}}>{r.cnpj}</td>
                      <td style={tdStyle}>{r.resp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Section>

        {/* 02 — COM BADGES / STATUS */}
        <Section n="02" title="Tabela com status" desc="Requisicoes operacionais com badges de status. Cada linha reflete um estado do fluxo de aprovacao — padrao recorrente em apps FIPS como Suprimentos e CONTPIX.">
          <Card mob={mob}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <h3 style={{fontSize:15,fontWeight:700,color:C.azulEscuro,fontFamily:F.title,margin:0}}>Requisicoes de Suprimentos</h3>
              <span style={{fontSize:12,color:C.cinzaChumbo,fontFamily:F.body}}>4 registros</span>
            </div>
            <div style={{overflowX:"auto",border:`1px solid ${C.cardBorder}`,borderRadius:8}}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Codigo</th>
                    <th style={thStyle}>Descricao</th>
                    <th style={thStyle}>Solicitante</th>
                    <th style={thStyle}>Prioridade</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {cod:"REQ-4021",desc:"Material eletrico para subestacao B",sol:"Ana Costa",pri:"Alta",priV:"critico",status:"Aprovado",stV:"sucesso"},
                    {cod:"REQ-4022",desc:"Equipamento SSMA - EPI operacional",sol:"Bruno Lima",pri:"Media",priV:"atencao",status:"Pendente",stV:"atencao"},
                    {cod:"REQ-4023",desc:"Pecas de reposicao locomotiva GE",sol:"Carla Mendes",pri:"Critica",priV:"critico",status:"Rejeitado",stV:"critico"},
                    {cod:"REQ-4024",desc:"Ferramentas para manutencao de via",sol:"Diego Torres",pri:"Baixa",priV:"secondary",status:"Em analise",stV:"info"},
                  ].map(r=>(
                    <tr key={r.cod} style={{transition:"background .12s"}} onMouseEnter={trHover} onMouseLeave={trLeave}>
                      <td style={{...tdStyle,fontFamily:F.mono,fontSize:12,fontWeight:600,color:C.azulProfundo}}>{r.cod}</td>
                      <td style={{...tdStyle,fontWeight:500,maxWidth:260}}>{r.desc}</td>
                      <td style={tdStyle}>{r.sol}</td>
                      <td style={tdStyle}><Badge variant={r.priV} icon={r.pri==="Critica"?Ic.alert(10,"#B91C1C"):undefined}>{r.pri}</Badge></td>
                      <td style={tdStyle}><Badge variant={r.stV} dot>{r.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Section>

        {/* 03 — COM ACOES */}
        <Section n="03" title="Tabela com acoes" desc="Certificados de empresas com botoes de acao por linha (visualizar, editar, excluir). Padrao para CRUDs de cadastro no ecossistema FIPS.">
          <Card mob={mob}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <h3 style={{fontSize:15,fontWeight:700,color:C.azulEscuro,fontFamily:F.title,margin:0}}>Certificados Operacionais</h3>
              <button style={{padding:"7px 18px",fontSize:12,fontWeight:600,border:"none",borderRadius:6,background:C.azulProfundo,color:C.branco,cursor:"pointer",fontFamily:F.body}}>+ Novo certificado</button>
            </div>
            <div style={{overflowX:"auto",border:`1px solid ${C.cardBorder}`,borderRadius:8}}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Empresa</th>
                    <th style={thStyle}>Certificado</th>
                    <th style={thStyle}>Emissao</th>
                    <th style={thStyle}>Vencimento</th>
                    <th style={thStyle}>Situacao</th>
                    <th style={{...thStyle,textAlign:"center"}}>Acoes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {emp:"Santos Logistica",cert:"ISO 9001:2015",emi:"15/03/2025",venc:"15/03/2028",sit:"Vigente",sitV:"sucesso"},
                    {emp:"Porto Grãos",cert:"Licenca Ambiental",emi:"01/01/2024",venc:"01/01/2027",sit:"Vigente",sitV:"sucesso"},
                    {emp:"Ferrovia Sul",cert:"ANTAQ - Operador",emi:"20/06/2023",venc:"20/06/2026",sit:"Proximo ao vencimento",sitV:"atencao"},
                    {emp:"Transmar Nav.",cert:"DPC - Seguranca",emi:"10/11/2022",venc:"10/11/2025",sit:"Vencido",sitV:"critico"},
                  ].map(r=>(
                    <tr key={r.emp+r.cert} style={{transition:"background .12s"}} onMouseEnter={trHover} onMouseLeave={trLeave}>
                      <td style={{...tdStyle,fontWeight:600}}>{r.emp}</td>
                      <td style={tdStyle}>{r.cert}</td>
                      <td style={{...tdStyle,fontFamily:F.mono,fontSize:12,color:C.cinzaChumbo}}>{r.emi}</td>
                      <td style={{...tdStyle,fontFamily:F.mono,fontSize:12,color:C.cinzaChumbo}}>{r.venc}</td>
                      <td style={tdStyle}><Badge variant={r.sitV} dot>{r.sit}</Badge></td>
                      <td style={{...tdStyle,textAlign:"center"}}>
                        <div style={{display:"flex",gap:6,justifyContent:"center"}}>
                          <ActionBtn icon={Ic.eye(14,C.azulProfundo)} label="Visualizar"/>
                          <ActionBtn icon={Ic.edit(14,C.azulProfundo)} label="Editar"/>
                          <ActionBtn icon={Ic.trash(14,C.danger)} label="Excluir"/>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Section>

        {/* 04 — ESTADO VAZIO */}
        <Section n="04" title="Estado vazio" desc="Quando filtros ou busca retornam zero resultados, a tabela exibe um estado vazio com icone, titulo e descricao. Mantem o header visivel para contexto.">
          <Card mob={mob}>
            <div style={{overflowX:"auto",border:`1px solid ${C.cardBorder}`,borderRadius:8}}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Empresa</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Observacao</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} style={{padding:"48px 20px",textAlign:"center"}}>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
                        {Ic.inbox(48,C.cinzaClaro)}
                        <span style={{fontSize:16,fontWeight:700,color:C.cinzaEscuro,fontFamily:F.title}}>Nenhum registro encontrado</span>
                        <span style={{fontSize:13,color:C.cinzaChumbo,fontFamily:F.body,maxWidth:360,lineHeight:1.5}}>
                          Nenhuma empresa corresponde aos filtros aplicados. Tente ajustar os criterios de busca ou limpar os filtros ativos.
                        </span>
                        <button style={{marginTop:8,padding:"7px 20px",fontSize:12,fontWeight:600,border:`1.5px solid ${C.azulProfundo}`,borderRadius:6,background:"transparent",color:C.azulProfundo,cursor:"pointer",fontFamily:F.body}}>Limpar filtros</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </Section>

        {/* 05 — DIRETRIZES DE USO */}
        <Section n="05" title="Diretrizes de uso" desc="Orientacoes praticas para aplicar o componente Table de forma consistente nos projetos do ecossistema FIPS.">
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:16}}>
            {/* Quando usar */}
            <div style={{background:C.cardBg,border:`1px solid ${C.cardBorder}`,borderRadius:"10px 10px 10px 20px",padding:mob?16:24}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                <div style={{width:28,height:28,borderRadius:6,background:"#ECFDF5",border:"1px solid #A7F3D0",display:"flex",alignItems:"center",justifyContent:"center"}}>{Ic.check(14,C.verdeEscuro)}</div>
                <h3 style={{fontSize:14,fontWeight:700,color:C.verdeEscuro,margin:0,fontFamily:F.title}}>Quando usar</h3>
              </div>
              <ul style={{margin:0,padding:"0 0 0 18px",fontSize:13,color:C.cinzaEscuro,lineHeight:1.8,fontFamily:F.body}}>
                <li>Listagens de dados tabulares com 3+ colunas (empresas, requisicoes, certificados)</li>
                <li>Registros que precisam de ordenacao visual por colunas</li>
                <li>CRUDs com acoes por linha (ver, editar, excluir)</li>
                <li>Dados com status que se beneficiam de badges inline</li>
                <li>Relatorios com comparacao lado a lado de valores</li>
                <li>Qualquer listagem onde o usuario precisa escanear dados rapidamente</li>
              </ul>
            </div>

            {/* Quando NAO usar */}
            <div style={{background:C.cardBg,border:`1px solid ${C.cardBorder}`,borderRadius:"10px 10px 10px 20px",padding:mob?16:24}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                <div style={{width:28,height:28,borderRadius:6,background:"#FEF2F2",border:"1px solid #FECACA",display:"flex",alignItems:"center",justifyContent:"center"}}>{Ic.x(12,"#B91C1C")}</div>
                <h3 style={{fontSize:14,fontWeight:700,color:"#B91C1C",margin:0,fontFamily:F.title}}>Quando NAO usar</h3>
              </div>
              <ul style={{margin:0,padding:"0 0 0 18px",fontSize:13,color:C.cinzaEscuro,lineHeight:1.8,fontFamily:F.body}}>
                <li>Dados com 1-2 colunas — prefira uma lista simples ou cards</li>
                <li>Conteudo primariamente visual (fotos, graficos) — use grid de cards</li>
                <li>Dados que nao se alinham em colunas uniformes</li>
                <li>Mobile-first com muitas colunas — considere cards responsivos</li>
                <li>Dashboards com metricas agregadas — use cards de KPI</li>
                <li>Formularios de entrada — Table e para exibicao, nao para edicao inline</li>
              </ul>
            </div>
          </div>

          {/* Boas praticas */}
          <div style={{marginTop:16,background:C.cardBg,border:`1px solid ${C.cardBorder}`,borderRadius:"10px 10px 10px 20px",padding:mob?16:24}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
              <div style={{width:28,height:28,borderRadius:6,background:C.azulCeuClaro,border:`1px solid ${C.azulCeu}`,display:"flex",alignItems:"center",justifyContent:"center"}}>{Ic.info(14,C.azulEscuro)}</div>
              <h3 style={{fontSize:14,fontWeight:700,color:C.azulEscuro,margin:0,fontFamily:F.title}}>Boas praticas</h3>
            </div>
            <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:12}}>
              {[
                {t:"Header sempre visivel",d:"Mantenha o thead com fundo diferenciado (bg token) e tipografia uppercase Saira Expanded."},
                {t:"Hover em linhas",d:"Use azulCeuClaro com 30% de opacidade para feedback visual ao passar o mouse."},
                {t:"IDs em mono",d:"Codigos e identificadores devem usar Fira Code para distincao visual."},
                {t:"Acoes agrupadas",d:"Botoes de acao ficam na ultima coluna, com icones de 14px e gap de 6px."},
                {t:"Estado vazio",d:"Sempre forneca um estado vazio com icone, titulo, descricao e acao (ex: limpar filtros)."},
                {t:"Bordas e separadores",d:"Use cardBorder (#E2E8F0) para linhas entre rows e 2px para separar header do body."},
              ].map(p=>(
                <div key={p.t} style={{padding:"10px 14px",background:C.bg,borderRadius:8,border:`1px solid ${C.cardBorder}`}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.azulEscuro,fontFamily:F.title,marginBottom:4}}>{p.t}</div>
                  <div style={{fontSize:12,color:C.cinzaChumbo,lineHeight:1.5,fontFamily:F.body}}>{p.d}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 06 — TOKENS DE REFERENCIA */}
        <Section n="06" title="Tokens de referencia" desc="Valores de design utilizados neste componente — direto do Brandbook FIPS.">
          <Card mob={mob} s={{display:"flex",gap:mob?24:48,flexWrap:"wrap"}}>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Cores de estrutura</span>
              <TokenRow label="Header bg" value="#F2F4F8" color={C.bg}/>
              <TokenRow label="Row border" value="#E2E8F0" color={C.cardBorder}/>
              <TokenRow label="Hover row" value="#D3E3F430" color={`${C.azulCeuClaro}55`}/>
              <TokenRow label="Card bg" value="#FFFFFF" color={C.cardBg}/>
              <TokenRow label="Header border" value="#E2E8F0 (2px)" color={C.cardBorder}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Tipografia</span>
              <TokenRow label="Header" value="Saira Expanded 700"/>
              <TokenRow label="Header size" value="11px uppercase"/>
              <TokenRow label="Cell body" value="Open Sans 400"/>
              <TokenRow label="Cell size" value="13px"/>
              <TokenRow label="Cell mono" value="Fira Code 600"/>
              <TokenRow label="Cell mono size" value="12px"/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Espacamento</span>
              <TokenRow label="Header padding" value="10px 16px"/>
              <TokenRow label="Cell padding" value="12px 16px"/>
              <TokenRow label="Action btn" value="30 x 30px"/>
              <TokenRow label="Action gap" value="6px"/>
              <TokenRow label="Border radius" value="8px (container)"/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".5px",color:C.textLight,textTransform:"uppercase",fontFamily:F.title,marginBottom:4}}>Cores de texto</span>
              <TokenRow label="Header text" value="#7B8C96" color={C.cinzaChumbo}/>
              <TokenRow label="Cell text" value="#333B41" color={C.cinzaEscuro}/>
              <TokenRow label="ID / codigo" value="#004B9B" color={C.azulProfundo}/>
              <TokenRow label="Muted text" value="#64748B" color={C.textMuted}/>
              <TokenRow label="Empty desc" value="#7B8C96" color={C.cinzaChumbo}/>
            </div>
          </Card>
        </Section>

        {/* ══════ FOOTER ══════ */}
        <div style={{textAlign:"center",padding:"20px 0 0",borderTop:`1px solid ${C.cardBorder}`,marginTop:20}}>
          <span style={{fontSize:12,color:C.cinzaChumbo,letterSpacing:".5px",fontFamily:F.title,fontWeight:400}}>DS-FIPS v2.0 · Ferrovia Interna do Porto de Santos · Excelencia sobre trilhos · {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}
