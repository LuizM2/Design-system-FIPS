// DS-FIPS — Drawer (Slide Panel) — Copy-paste ready
import { useState, useEffect } from "react";

const C = {
  cinzaChumbo: "var(--color-fg-muted)",
  cinzaEscuro: "var(--color-fg)",
  branco: "#FFFFFF",
  bg: "var(--color-surface-muted)",
  cardBg: "var(--color-surface)",
  cardBorder: "var(--color-border)",
};

const Fn = {
  title: "'Saira Expanded', sans-serif",
  body: "'Open Sans', sans-serif",
};

export function Drawer({
  open, onClose, title, subtitle, children, footer,
  side = "right", width = 420,
}: {
  open: boolean; onClose: () => void;
  title: string; subtitle?: string;
  children: React.ReactNode; footer?: React.ReactNode;
  side?: "left" | "right" | "bottom" | "top"; width?: number;
}) {
  const [visible, setVisible] = useState(false);
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    if (open) { setVisible(true); requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true))); }
    else { setAnimIn(false); const t = setTimeout(() => setVisible(false), 300); return () => clearTimeout(t); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!visible) return null;

  const isH = side === "left" || side === "right";
  const panelStyle: React.CSSProperties = isH
    ? { position: "fixed", top: 0, [side]: 0, width, maxWidth: "90vw", height: "100vh", zIndex: 1001, background: C.cardBg, boxShadow: "-4px 0 24px rgba(0,0,0,.12)", display: "flex", flexDirection: "column", transform: animIn ? "translateX(0)" : `translateX(${side === "right" ? "100%" : "-100%"})`, transition: "transform .3s cubic-bezier(.4,0,.2,1)" }
    : { position: "fixed", [side]: 0, left: 0, right: 0, height: width, maxHeight: "80vh", zIndex: 1001, background: C.cardBg, boxShadow: "0 -4px 24px rgba(0,0,0,.12)", display: "flex", flexDirection: "column", transform: animIn ? "translateY(0)" : `translateY(${side === "bottom" ? "100%" : "-100%"})`, transition: "transform .3s cubic-bezier(.4,0,.2,1)", borderRadius: side === "bottom" ? "12px 12px 0 0" : "0 0 12px 12px" };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,42,104,.35)", opacity: animIn ? 1 : 0, transition: "opacity .3s", cursor: "pointer" }} />
      <div style={panelStyle}>
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: C.cinzaEscuro, margin: 0, fontFamily: Fn.title }}>{title}</h2>
            {subtitle && <p style={{ fontSize: 12, color: C.cinzaChumbo, margin: "2px 0 0", fontFamily: Fn.body }}>{subtitle}</p>}
          </div>
          <span onClick={onClose} style={{ display: "flex", cursor: "pointer", opacity: 0.5, padding: 4, borderRadius: 4 }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke={C.cinzaChumbo} strokeWidth="1.8" strokeLinecap="round"/></svg>
          </span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>{children}</div>
        {footer && <div style={{ padding: "14px 24px", borderTop: `1px solid ${C.cardBorder}`, background: C.bg, display: "flex", gap: 10, justifyContent: "flex-end", flexShrink: 0 }}>{footer}</div>}
      </div>
    </div>
  );
}

// Usage:
// const [open, setOpen] = useState(false);
// <button onClick={() => setOpen(true)}>Abrir Drawer</button>
// <Drawer open={open} onClose={() => setOpen(false)} title="Detalhe" subtitle="REQ-4025"
//   footer={<><button onClick={() => setOpen(false)}>Cancelar</button><button onClick={() => setOpen(false)}>Salvar</button></>}>
//   <p>Conteudo do drawer aqui.</p>
// </Drawer>
