import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════
   FIPS DESIGN SYSTEM — OFFICIAL BRAND TOKENS
   Source: FIPS Brandbook
   ═══════════════════════════════════════════ */
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
const F = { title:"'Saira Expanded',sans-serif", body:"'Open Sans',sans-serif", mono:"'Fira Code',monospace" };

/* ═══════════════════════════════════════════ ICONS (inline SVG) ═══════════════════════════════════════════ */
const Ic = {
  grid:(s=14,c=C.amareloOuro)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="11" y="2" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="2" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/><rect x="11" y="11" width="7" height="7" rx="1.5" stroke={c} strokeWidth="1.4"/></svg>,
  headset:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M4 12V9a6 6 0 0112 0v3" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><rect x="2" y="11" width="3" height="5" rx="1" stroke={c} strokeWidth="1.4"/><rect x="15" y="11" width="3" height="5" rx="1" stroke={c} strokeWidth="1.4"/></svg>,
  gear:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke={c} strokeWidth="1.4"/><path d="M10 1.5v2M10 16.5v2M18.5 10h-2M3.5 10h-2M15.6 4.4l-1.4 1.4M5.8 14.2l-1.4 1.4M15.6 15.6l-1.4-1.4M5.8 5.8L4.4 4.4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>,
  wrench:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M14.5 2.5a4.5 4.5 0 00-5.2 7.3L3.5 15.5a1.5 1.5 0 002.1 2.1l5.7-5.8a4.5 4.5 0 007.3-5.2L15.5 9.5 13 10l.5-2.5 3-3z" stroke={c} strokeWidth="1.4" strokeLinejoin="round"/></svg>,
  chart:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="10" width="3" height="7" rx="1" stroke={c} strokeWidth="1.3"/><rect x="8.5" y="6" width="3" height="11" rx="1" stroke={c} strokeWidth="1.3"/><rect x="15" y="3" width="3" height="14" rx="1" stroke={c} strokeWidth="1.3"/></svg>,
  truck:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="1" y="4" width="11" height="9" rx="1.5" stroke={c} strokeWidth="1.4"/><path d="M12 7h3.5l2.5 4v2H12V7z" stroke={c} strokeWidth="1.4" strokeLinejoin="round"/><circle cx="5" cy="15" r="1.5" stroke={c} strokeWidth="1.3"/><circle cx="15" cy="15" r="1.5" stroke={c} strokeWidth="1.3"/></svg>,
  shield:(s=16,c=C.cinzaChumbo)=><svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M10 1.5L3 5v5c0 4.4 3 7.5 7 9 4-1.5 7-4.6 7-9V5l-7-3.5z" stroke={c} strokeWidth="1.4" strokeLinejoin="round"/><path d="M7.5 10l2 2 3.5-4" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  check:(s=12,c="#fff")=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  x:(s=12,c=C.danger)=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
};

/* ═══════════════════════════════════════════ JUNCTION LINES ═══════════════════════════════════════════ */
function JunctionLines({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 320 200" fill="none" style={{ opacity: 0.12, ...style }}>
      <path d="M0 60H100C120 60 120 60 140 40L200 40H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/>
      <path d="M0 60H100C120 60 120 60 140 80L200 80H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/>
      <path d="M0 120H60C80 120 80 120 100 100L160 100H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/>
      <path d="M0 120H60C80 120 80 120 100 140L160 140H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/>
      <path d="M0 170H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/>
      <path d="M0 20H320" stroke={C.branco} strokeWidth="6" strokeLinecap="round"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   TABS COMPONENT (inline, self-contained)
   ═══════════════════════════════════════════ */
function DSTabs({ defaultValue, children, size = "md", variant = "underline" }: {
  defaultValue: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "underline" | "pill" | "boxed";
}) {
  const [active, setActive] = useState(defaultValue);
  const ctx = { active, setActive, size, variant };

  return (
    <div>
      {Array.isArray(children)
        ? children.map((child: any) =>
            child?.type === DSTabsList
              ? { ...child, props: { ...child.props, ctx } }
              : child?.type === DSTabsContent
                ? active === child.props.value ? child : null
                : child
          )
        : children}
    </div>
  );
}

function DSTabsList({ children, ctx, style: extraStyle }: {
  children: React.ReactNode;
  ctx?: any;
  style?: React.CSSProperties;
}) {
  const v = ctx?.variant || "underline";
  const base: React.CSSProperties = {
    display: "flex",
    gap: v === "pill" ? 6 : 0,
    fontFamily: F.body,
    ...(v === "underline" ? { borderBottom: `2px solid ${C.cardBorder}` } : {}),
    ...(v === "boxed" ? { background: C.bg, borderRadius: 8, padding: 4, border: `1px solid ${C.cardBorder}` } : {}),
    ...(v === "pill" ? { background: "transparent" } : {}),
    ...extraStyle,
  };

  return (
    <div style={base}>
      {Array.isArray(children)
        ? children.map((child: any) =>
            child?.type === DSTabsTrigger
              ? { ...child, props: { ...child.props, ctx } }
              : child
          )
        : children}
    </div>
  );
}

function DSTabsTrigger({ value, children, ctx, icon, disabled }: {
  value: string;
  children: React.ReactNode;
  ctx?: any;
  icon?: React.ReactNode;
  disabled?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const active = ctx?.active === value;
  const v = ctx?.variant || "underline";
  const sz = ctx?.size || "md";

  const sizeMap = {
    sm: { fontSize: 12, padding: "6px 12px", gap: 5 },
    md: { fontSize: 13, padding: "9px 18px", gap: 6 },
    lg: { fontSize: 14, padding: "11px 22px", gap: 7 },
  };
  const s = sizeMap[sz] || sizeMap.md;

  const getStyle = (): React.CSSProperties => {
    const shared: React.CSSProperties = {
      display: "inline-flex", alignItems: "center", gap: s.gap,
      padding: s.padding, fontSize: s.fontSize, fontWeight: active ? 700 : 500,
      fontFamily: F.body, cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.18s ease", border: "none", outline: "none",
      opacity: disabled ? 0.45 : 1, whiteSpace: "nowrap",
    };

    if (v === "underline") {
      return {
        ...shared,
        background: "transparent",
        color: active ? C.azulProfundo : C.cinzaChumbo,
        borderBottom: `2px solid ${active ? C.azulProfundo : "transparent"}`,
        marginBottom: -2,
        ...(hovered && !active && !disabled ? { color: C.azulEscuro, borderBottomColor: C.azulCeuClaro } : {}),
      };
    }
    if (v === "pill") {
      return {
        ...shared,
        background: active ? C.azulProfundo : (hovered && !disabled ? `${C.azulCeuClaro}88` : "transparent"),
        color: active ? C.branco : C.cinzaChumbo,
        borderRadius: 20,
      };
    }
    // boxed
    return {
      ...shared,
      background: active ? C.branco : "transparent",
      color: active ? C.azulProfundo : C.cinzaChumbo,
      borderRadius: 6,
      boxShadow: active ? "0 1px 3px rgba(0,75,155,.1)" : "none",
      ...(hovered && !active && !disabled ? { background: `${C.branco}88` } : {}),
    };
  };

  return (
    <button
      style={getStyle()}
      onClick={() => !disabled && ctx?.setActive(value)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
    >
      {icon && <span style={{ display: "flex", flexShrink: 0 }}>{icon}</span>}
      {children}
    </button>
  );
}

function DSTabsContent({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "16px 0", fontFamily: F.body, fontSize: 13, color: C.cinzaEscuro, lineHeight: 1.6 }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════ LAYOUT ═══════════════════════════════════════════ */
function Section({ n, title, desc, children }: { n: string; title: string; desc: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 44 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: C.azulClaro, fontFamily: F.title, marginBottom: 6 }}>{n}</div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: C.azulEscuro, margin: "0 0 4px", fontFamily: F.title, letterSpacing: ".5px" }}>{title}</h2>
      <p style={{ fontSize: 14, color: C.cinzaChumbo, margin: "0 0 20px", lineHeight: 1.55, fontFamily: F.body }}>{desc}</p>
      {children}
    </section>
  );
}

function Card({ children, s, mob }: { children: React.ReactNode; s?: React.CSSProperties; mob?: boolean }) {
  return (
    <div style={{ background: C.cardBg, borderRadius: "12px 12px 12px 24px", border: `1px solid ${C.cardBorder}`, padding: mob ? 16 : 28, boxShadow: "0 1px 3px rgba(0,75,155,.04),0 4px 14px rgba(0,75,155,.03)", ...s }}>{children}</div>
  );
}

const gc: React.CSSProperties = { background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: "10px 10px 10px 18px", overflow: "hidden" };
const gh: React.CSSProperties = { padding: "16px 20px", background: C.bg, borderBottom: `1px solid ${C.cardBorder}`, display: "flex", alignItems: "center", gap: 12 };
const gb: React.CSSProperties = { padding: "16px 20px 20px" };
const gl: React.CSSProperties = { fontSize: 10, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: C.azulClaro, fontFamily: F.title, marginBottom: 4, marginTop: 12 };
const gt: React.CSSProperties = { fontSize: 13, color: C.cinzaEscuro, lineHeight: 1.55, margin: 0, fontFamily: F.body };
const gk: React.CSSProperties = { fontSize: 11, fontFamily: F.mono, color: C.cinzaChumbo, background: C.cardBg, padding: "2px 8px", borderRadius: 4, border: `1px solid ${C.cardBorder}` };

function TokenRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, fontFamily: F.body }}>
      {color && <div style={{ width: 16, height: 16, borderRadius: 4, background: color, border: `1px solid ${C.cardBorder}`, flexShrink: 0 }} />}
      <span style={{ color: C.cinzaChumbo, minWidth: 120 }}>{label}</span>
      <code style={{ background: C.neutro, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontFamily: F.mono, color: C.cinzaEscuro }}>{value}</code>
    </div>
  );
}

/* ═══════════════════════════════════════════ MAIN ═══════════════════════════════════════════ */
export default function TabsDoc() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  const mob = w < 640;

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg,${C.bg} 0%,${C.azulCeuClaro}44 50%,${C.bg} 100%)`, fontFamily: F.body, color: C.cinzaEscuro }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Saira+Expanded:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&family=Fira+Code:wght@400;500&display=swap');`}</style>

      {/* ══════ HEADER ══════ */}
      <header style={{ background: `linear-gradient(135deg,${C.azulProfundo} 0%,${C.azulEscuro} 100%)`, padding: mob ? "32px 20px" : "48px 40px 44px", position: "relative", overflow: "hidden" }}>
        <JunctionLines style={{ position: "absolute", top: -10, right: -20, width: mob ? 250 : 400, height: 250 }} />
        <JunctionLines style={{ position: "absolute", bottom: -30, left: "30%", width: 500, height: 200, transform: "scaleX(-1)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C.branco}10`, border: `1px solid ${C.branco}18`, borderRadius: 20, padding: "5px 14px", fontSize: 11, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: C.amareloOuro, fontFamily: F.title, marginBottom: 16 }}>
            {Ic.grid(14, C.amareloOuro)} Design System FIPS
          </div>
          <h1 style={{ fontSize: mob ? 30 : 44, fontWeight: 700, color: C.branco, margin: "0 0 10px", fontFamily: F.title, letterSpacing: "1px" }}>Tabs</h1>
          <p style={{ fontSize: 16, color: `${C.branco}B0`, lineHeight: 1.6, maxWidth: 700, margin: 0, fontFamily: F.body }}>
            Navegação por abas para alternar contextos sem sair da página. Ideal para organizar
            conteúdo relacionado em seções — <strong style={{ color: `${C.branco}DD` }}>Atendimento, Operações, Manutenção</strong> — mantendo o usuário no mesmo fluxo.
          </p>
          {/* Anatomy badges */}
          <div style={{ display: "flex", gap: 14, marginTop: 24, flexWrap: "wrap" }}>
            {[
              { l: "TabsList", c: C.azulCeu },
              { l: "TabsTrigger", c: C.amareloOuro },
              { l: "TabsContent", c: C.verdeFloresta },
            ].map(t => (
              <div key={t.l} style={{ display: "flex", alignItems: "center", gap: 8, background: `${C.branco}08`, border: `1px solid ${C.branco}15`, borderRadius: 6, padding: "6px 12px", fontSize: 12, color: `${C.branco}90`, fontFamily: F.mono }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: t.c, border: `1px solid ${C.branco}20`, flexShrink: 0 }} />{t.l}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ══════ BODY ══════ */}
      <div style={{ padding: mob ? "24px 16px 40px" : "36px 40px 60px", maxWidth: 1100 }}>

        {/* ═══ 01 — BASIC TABS ═══ */}
        <Section n="01" title="Tabs básicas" desc="Variante underline padrão com conteúdo alternável. Cada aba representa uma área operacional do porto.">
          <Card mob={mob}>
            <div style={gc}>
              <div style={gh}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.azulEscuro, fontFamily: F.title }}>Painel operacional</span>
                <code style={gk}>variant="underline"</code>
              </div>
              <div style={gb}>
                <DSTabs defaultValue="atendimento">
                  <DSTabsList>
                    <DSTabsTrigger value="atendimento">Atendimento</DSTabsTrigger>
                    <DSTabsTrigger value="operacoes">Operações</DSTabsTrigger>
                    <DSTabsTrigger value="manutencao">Manutenção</DSTabsTrigger>
                    <DSTabsTrigger value="relatorios">Relatórios</DSTabsTrigger>
                  </DSTabsList>
                  <DSTabsContent value="atendimento">
                    <div style={{ background: C.bg, borderRadius: 8, padding: 16, border: `1px solid ${C.cardBorder}` }}>
                      <strong style={{ color: C.azulProfundo }}>Central de atendimento</strong>
                      <p style={{ margin: "8px 0 0", fontSize: 13, color: C.cinzaChumbo }}>
                        Chamados abertos por clientes do terminal portuário. Registro de solicitações
                        de agendamento, contestações de pesagem e suporte a motoristas.
                      </p>
                    </div>
                  </DSTabsContent>
                  <DSTabsContent value="operacoes">
                    <div style={{ background: C.bg, borderRadius: 8, padding: 16, border: `1px solid ${C.cardBorder}` }}>
                      <strong style={{ color: C.azulProfundo }}>Painel de operações</strong>
                      <p style={{ margin: "8px 0 0", fontSize: 13, color: C.cinzaChumbo }}>
                        Movimentação de vagões, descarga de granéis, controle de pátio ferroviário
                        e acompanhamento de composições em trânsito.
                      </p>
                    </div>
                  </DSTabsContent>
                  <DSTabsContent value="manutencao">
                    <div style={{ background: C.bg, borderRadius: 8, padding: 16, border: `1px solid ${C.cardBorder}` }}>
                      <strong style={{ color: C.azulProfundo }}>Ordens de manutenção</strong>
                      <p style={{ margin: "8px 0 0", fontSize: 13, color: C.cinzaChumbo }}>
                        Manutenção preventiva e corretiva de locomotivas, guindastes, esteiras
                        e equipamentos de movimentação portuária.
                      </p>
                    </div>
                  </DSTabsContent>
                  <DSTabsContent value="relatorios">
                    <div style={{ background: C.bg, borderRadius: 8, padding: 16, border: `1px solid ${C.cardBorder}` }}>
                      <strong style={{ color: C.azulProfundo }}>Relatórios gerenciais</strong>
                      <p style={{ margin: "8px 0 0", fontSize: 13, color: C.cinzaChumbo }}>
                        Indicadores KPI, volume movimentado por período, tempo médio de operação
                        e relatórios de conformidade regulatória.
                      </p>
                    </div>
                  </DSTabsContent>
                </DSTabs>
              </div>
            </div>

            {/* Disabled tab demo */}
            <div style={{ ...gc, marginTop: 16 }}>
              <div style={gh}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.azulEscuro, fontFamily: F.title }}>Com aba desabilitada</span>
                <code style={gk}>disabled</code>
              </div>
              <div style={gb}>
                <DSTabs defaultValue="ativo">
                  <DSTabsList>
                    <DSTabsTrigger value="ativo">Ativo</DSTabsTrigger>
                    <DSTabsTrigger value="pendente">Pendente</DSTabsTrigger>
                    <DSTabsTrigger value="bloqueado" disabled>Bloqueado</DSTabsTrigger>
                  </DSTabsList>
                  <DSTabsContent value="ativo">
                    <p style={{ margin: 0, fontSize: 13, color: C.cinzaChumbo }}>Conteúdo ativo visível. A aba "Bloqueado" está desabilitada e não pode ser selecionada.</p>
                  </DSTabsContent>
                  <DSTabsContent value="pendente">
                    <p style={{ margin: 0, fontSize: 13, color: C.cinzaChumbo }}>Itens pendentes de aprovação pelo supervisor de turno.</p>
                  </DSTabsContent>
                </DSTabs>
                <div style={gl}>Regra</div>
                <p style={{ ...gt, fontWeight: 600 }}>Abas desabilitadas mantêm visibilidade reduzida (opacity 0.45) e cursor not-allowed.</p>
              </div>
            </div>
          </Card>
        </Section>

        {/* ═══ 02 — TABS COM ÍCONES ═══ */}
        <Section n="02" title="Tabs com ícones" desc="Ícones reforçam a identificação rápida de cada seção. Posicionados à esquerda do label, sempre com 16px.">
          <Card mob={mob}>
            <div style={gc}>
              <div style={gh}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.azulEscuro, fontFamily: F.title }}>Painel com ícones</span>
                <code style={gk}>icon + label</code>
              </div>
              <div style={gb}>
                <DSTabs defaultValue="atendimento">
                  <DSTabsList>
                    <DSTabsTrigger value="atendimento" icon={Ic.headset(15, C.azulProfundo)}>Atendimento</DSTabsTrigger>
                    <DSTabsTrigger value="operacoes" icon={Ic.gear(15, C.cinzaChumbo)}>Operações</DSTabsTrigger>
                    <DSTabsTrigger value="manutencao" icon={Ic.wrench(15, C.cinzaChumbo)}>Manutenção</DSTabsTrigger>
                    <DSTabsTrigger value="logistica" icon={Ic.truck(15, C.cinzaChumbo)}>Logística</DSTabsTrigger>
                  </DSTabsList>
                  <DSTabsContent value="atendimento">
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      {[
                        { titulo: "Chamado #4821", desc: "Agendamento de descarga — Terminal Açúcar", status: "Em andamento", cor: C.amareloEscuro },
                        { titulo: "Chamado #4822", desc: "Contestação de pesagem — Lote 1204", status: "Resolvido", cor: C.verdeFloresta },
                        { titulo: "Chamado #4823", desc: "Suporte ao motorista — Acesso portaria Sul", status: "Aberto", cor: C.azulProfundo },
                      ].map(ch => (
                        <div key={ch.titulo} style={{ flex: 1, minWidth: 200, background: C.bg, borderRadius: 8, padding: 14, border: `1px solid ${C.cardBorder}` }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: C.azulEscuro, fontFamily: F.title }}>{ch.titulo}</span>
                            <span style={{ fontSize: 10, fontWeight: 600, color: ch.cor, background: `${ch.cor}18`, padding: "2px 8px", borderRadius: 10, fontFamily: F.body }}>{ch.status}</span>
                          </div>
                          <p style={{ margin: 0, fontSize: 12, color: C.cinzaChumbo }}>{ch.desc}</p>
                        </div>
                      ))}
                    </div>
                  </DSTabsContent>
                  <DSTabsContent value="operacoes">
                    <p style={{ margin: 0, color: C.cinzaChumbo }}>Movimentação de composições ferroviárias e controle de carga do turno atual.</p>
                  </DSTabsContent>
                  <DSTabsContent value="manutencao">
                    <p style={{ margin: 0, color: C.cinzaChumbo }}>Ordens de serviço preventivas e corretivas para locomotivas e equipamentos portuários.</p>
                  </DSTabsContent>
                  <DSTabsContent value="logistica">
                    <p style={{ margin: 0, color: C.cinzaChumbo }}>Rastreamento de veículos, filas de acesso e controle de janelas de atracação.</p>
                  </DSTabsContent>
                </DSTabs>
              </div>
            </div>

            <div style={{ ...gc, marginTop: 16 }}>
              <div style={gh}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.azulEscuro, fontFamily: F.title }}>Só ícones (compacto)</span>
                <code style={gk}>icon-only</code>
              </div>
              <div style={gb}>
                <DSTabs defaultValue="chart" size="sm">
                  <DSTabsList>
                    <DSTabsTrigger value="chart" icon={Ic.chart(16, C.azulProfundo)}>{""}</DSTabsTrigger>
                    <DSTabsTrigger value="shield" icon={Ic.shield(16, C.cinzaChumbo)}>{""}</DSTabsTrigger>
                    <DSTabsTrigger value="gear" icon={Ic.gear(16, C.cinzaChumbo)}>{""}</DSTabsTrigger>
                  </DSTabsList>
                  <DSTabsContent value="chart">
                    <p style={{ margin: 0, color: C.cinzaChumbo, fontSize: 12 }}>Visualização de gráficos e métricas operacionais.</p>
                  </DSTabsContent>
                  <DSTabsContent value="shield">
                    <p style={{ margin: 0, color: C.cinzaChumbo, fontSize: 12 }}>Segurança e conformidade do terminal.</p>
                  </DSTabsContent>
                  <DSTabsContent value="gear">
                    <p style={{ margin: 0, color: C.cinzaChumbo, fontSize: 12 }}>Configurações gerais do painel.</p>
                  </DSTabsContent>
                </DSTabs>
                <div style={gl}>Regra</div>
                <p style={{ ...gt, fontWeight: 600 }}>Use icon-only apenas em espaços restritos e quando o ícone for universalmente reconhecível. Adicione tooltip para acessibilidade.</p>
              </div>
            </div>
          </Card>
        </Section>

        {/* ═══ 03 — SIZES & VARIANTS ═══ */}
        <Section n="03" title="Tamanhos e variantes" desc="Três tamanhos (sm, md, lg) e três variantes visuais (underline, pill, boxed) para diferentes contextos de interface.">
          <Card mob={mob}>
            {/* Sizes */}
            <div style={{ marginBottom: 28 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: C.azulClaro, fontFamily: F.title, display: "block", marginBottom: 12 }}>Tamanhos</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {(["sm", "md", "lg"] as const).map(sz => (
                  <div key={sz}>
                    <code style={{ ...gk, marginBottom: 8, display: "inline-block" }}>size="{sz}"</code>
                    <DSTabs defaultValue="a" size={sz}>
                      <DSTabsList>
                        <DSTabsTrigger value="a">Pátio</DSTabsTrigger>
                        <DSTabsTrigger value="b">Cais</DSTabsTrigger>
                        <DSTabsTrigger value="c">Armazém</DSTabsTrigger>
                      </DSTabsList>
                    </DSTabs>
                  </div>
                ))}
              </div>
            </div>

            {/* Variants */}
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: C.azulClaro, fontFamily: F.title, display: "block", marginBottom: 12 }}>Variantes</span>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr 1fr", gap: 16 }}>
              {(["underline", "pill", "boxed"] as const).map(v => (
                <div key={v} style={gc}>
                  <div style={gh}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.azulEscuro, fontFamily: F.title }}>{v}</span>
                    <code style={gk}>variant="{v}"</code>
                  </div>
                  <div style={gb}>
                    <DSTabs defaultValue="a" variant={v}>
                      <DSTabsList>
                        <DSTabsTrigger value="a">Turno A</DSTabsTrigger>
                        <DSTabsTrigger value="b">Turno B</DSTabsTrigger>
                        <DSTabsTrigger value="c">Turno C</DSTabsTrigger>
                      </DSTabsList>
                      <DSTabsContent value="a">
                        <p style={{ margin: 0, fontSize: 12, color: C.cinzaChumbo }}>06:00 – 14:00 · Operação diurna principal.</p>
                      </DSTabsContent>
                      <DSTabsContent value="b">
                        <p style={{ margin: 0, fontSize: 12, color: C.cinzaChumbo }}>14:00 – 22:00 · Turno vespertino/noturno.</p>
                      </DSTabsContent>
                      <DSTabsContent value="c">
                        <p style={{ margin: 0, fontSize: 12, color: C.cinzaChumbo }}>22:00 – 06:00 · Turno noturno de manutenção.</p>
                      </DSTabsContent>
                    </DSTabs>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* ═══ 04 — USAGE GUIDELINES ═══ */}
        <Section n="04" title="Diretrizes de uso" desc="Quando usar e quando não usar tabs no ecossistema FIPS.">
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 16 }}>
            {/* DO */}
            <div style={{ background: "#ECFDF5", border: `1.5px solid #A7F3D0`, borderRadius: "10px 10px 10px 20px", padding: mob ? 16 : 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ width: 24, height: 24, borderRadius: 6, background: C.verdeFloresta, display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.check(14, "#fff")}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: C.verdeEscuro, fontFamily: F.title }}>Quando usar</span>
              </div>
              <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 13, color: C.cinzaEscuro, lineHeight: 2, fontFamily: F.body }}>
                <li>Conteúdo relacionado que pode ser agrupado em categorias (Atendimento, Operações, Manutenção)</li>
                <li>Formulários multi-etapa onde cada aba é uma seção lógica</li>
                <li>Painéis de dashboard com diferentes visualizações dos mesmos dados</li>
                <li>Configurações organizadas por categoria</li>
                <li>Alternância entre modos de visualização (lista, grid, mapa)</li>
              </ul>
            </div>

            {/* DON'T */}
            <div style={{ background: "#FEF2F2", border: `1.5px solid #FECACA`, borderRadius: "10px 10px 10px 20px", padding: mob ? 16 : 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ width: 24, height: 24, borderRadius: 6, background: C.danger, display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.x(14, "#fff")}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#B91C1C", fontFamily: F.title }}>Quando NÃO usar</span>
              </div>
              <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 13, color: C.cinzaEscuro, lineHeight: 2, fontFamily: F.body }}>
                <li>Navegação primária do app — use sidebar ou navbar</li>
                <li>Conteúdo sequencial obrigatório — use stepper ou wizard</li>
                <li>Mais de 6 abas — considere dropdown ou navegação lateral</li>
                <li>Conteúdo que precisa ser comparado lado a lado</li>
                <li>Ações destrutivas escondidas em abas secundárias</li>
              </ul>
            </div>
          </div>

          <Card mob={mob} s={{ marginTop: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 20 }}>
              <div>
                <div style={gl}>Acessibilidade</div>
                <ul style={{ margin: 0, padding: "0 0 0 16px", fontSize: 13, color: C.cinzaEscuro, lineHeight: 1.8, fontFamily: F.body }}>
                  <li>Use <code style={gk}>role="tablist"</code> no container e <code style={gk}>role="tab"</code> nos triggers</li>
                  <li>Navegação por setas esquerda/direita entre abas</li>
                  <li>Aba ativa com <code style={gk}>aria-selected="true"</code></li>
                  <li>Conteúdo com <code style={gk}>role="tabpanel"</code></li>
                </ul>
              </div>
              <div>
                <div style={gl}>Boas práticas</div>
                <ul style={{ margin: 0, padding: "0 0 0 16px", fontSize: 13, color: C.cinzaEscuro, lineHeight: 1.8, fontFamily: F.body }}>
                  <li>Labels curtos: máximo 2 palavras por aba</li>
                  <li>Manter entre 2 e 6 abas por grupo</li>
                  <li>Primeira aba sempre pré-selecionada</li>
                  <li>Não misturar abas com e sem ícones no mesmo grupo</li>
                </ul>
              </div>
            </div>
          </Card>
        </Section>

        {/* ═══ 05 — TOKENS ═══ */}
        <Section n="05" title="Tokens de referência" desc="Valores de design utilizados neste componente — direto do Brandbook FIPS.">
          <Card mob={mob} s={{ display: "flex", gap: mob ? 24 : 48, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".5px", color: C.textLight, textTransform: "uppercase", fontFamily: F.title, marginBottom: 4 }}>Cores</span>
              <TokenRow label="Aba ativa" value="#004B9B" color={C.azulProfundo} />
              <TokenRow label="Aba hover" value="#002A68" color={C.azulEscuro} />
              <TokenRow label="Aba inativa" value="#7B8C96" color={C.cinzaChumbo} />
              <TokenRow label="Underline ativa" value="#004B9B" color={C.azulProfundo} />
              <TokenRow label="Underline hover" value="#D3E3F4" color={C.azulCeuClaro} />
              <TokenRow label="Pill ativa bg" value="#004B9B" color={C.azulProfundo} />
              <TokenRow label="Boxed ativa bg" value="#FFFFFF" color={C.branco} />
              <TokenRow label="Borda base" value="#E2E8F0" color={C.cardBorder} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".5px", color: C.textLight, textTransform: "uppercase", fontFamily: F.title, marginBottom: 4 }}>Tamanhos</span>
              <TokenRow label="SM fontSize" value="12px" />
              <TokenRow label="SM padding" value="6px 12px" />
              <TokenRow label="MD fontSize" value="13px" />
              <TokenRow label="MD padding" value="9px 18px" />
              <TokenRow label="LG fontSize" value="14px" />
              <TokenRow label="LG padding" value="11px 22px" />
              <TokenRow label="Pill radius" value="20px" />
              <TokenRow label="Boxed radius" value="6px" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".5px", color: C.textLight, textTransform: "uppercase", fontFamily: F.title, marginBottom: 4 }}>Tipografia</span>
              <TokenRow label="Label" value="Open Sans 500/700" />
              <TokenRow label="Content" value="Open Sans 400" />
              <TokenRow label="Transition" value="0.18s ease" />
              <TokenRow label="Underline" value="2px solid" />
              <TokenRow label="Boxed shadow" value="0 1px 3px" />
              <TokenRow label="Disabled opacity" value="0.45" />
            </div>
          </Card>
        </Section>

        {/* ══════ FOOTER ══════ */}
        <div style={{ textAlign: "center", padding: "20px 0 0", borderTop: `1px solid ${C.cardBorder}`, marginTop: 20 }}>
          <span style={{ fontSize: 12, color: C.cinzaChumbo, letterSpacing: ".5px", fontFamily: F.title, fontWeight: 400 }}>
            DS-FIPS v2.0 · Ferrovia Interna do Porto de Santos · Excelência sobre trilhos · {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
}
