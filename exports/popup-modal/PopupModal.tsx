// ═══════════════════════════════════════════
// DS-FIPS — PopupModal (redimensionável) — Copy-paste ready
// Requer: React 18+, fonts Saira Expanded + Open Sans + Fira Code
// ═══════════════════════════════════════════
import { useState, useEffect } from "react";

const C = {
  azulProfundo: "var(--color-gov-azul-profundo)",
  azulEscuro: "var(--color-gov-azul-escuro)",
  cinzaChumbo: "var(--color-fg-muted)",
  cinzaEscuro: "var(--color-fg)",
  cinzaClaro: "#C0CCD2",
  azulCeu: "#93BDE4",
  branco: "#FFFFFF",
  bg: "var(--color-surface-muted)",
  cardBg: "var(--color-surface)",
  cardBorder: "var(--color-border)",
};

const Fn = {
  title: "'Saira Expanded', sans-serif",
  body: "'Open Sans', sans-serif",
  mono: "'Fira Code', monospace",
};

const Ic = {
  x: (s = 18, c = C.cinzaChumbo) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none">
      <path d="M5 5l10 10M15 5L5 15" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  maximize: (s = 16, c = C.cinzaChumbo) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none">
      <path d="M3 7V4a1 1 0 011-1h3M13 3h3a1 1 0 011 1v3M17 13v3a1 1 0 01-1 1h-3M7 17H4a1 1 0 01-1-1v-3" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  minimize: (s = 16, c = C.cinzaChumbo) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none">
      <path d="M7 3v3a1 1 0 01-1 1H3M13 3v3a1 1 0 001 1h3M17 13h-3a1 1 0 00-1 1v3M3 13h3a1 1 0 011 1v3" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const POPUP_SIZES = {
  normal: { width: 480, maxH: "85vh", label: "Normal" },
  grande: { width: 720, maxH: "90vh", label: "Grande" },
  "tela-cheia": { width: "92vw", maxH: "95vh", label: "Tela cheia" },
};
const POPUP_ORDER = ["normal", "grande", "tela-cheia"];

/**
 * PopupModal — Modal redimensionável Normal / Grande / Tela Cheia
 * Props:
 *   open, onClose, title, subtitle, icon, iconBg, footer
 *   children: ReactNode | (({ size, isWide, isFullscreen }) => ReactNode)
 */
export function PopupModal({ open, onClose, title, subtitle, children, footer, icon, iconBg }) {
  const [vis, setVis] = useState(false);
  const [animIn, setAnimIn] = useState(false);
  const [size, setSize] = useState("normal");

  useEffect(() => {
    if (open) { setSize("normal"); setVis(true); requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true))); }
    else { setAnimIn(false); const t = setTimeout(() => setVis(false), 280); return () => clearTimeout(t); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  const cycleSize = () => { const i = POPUP_ORDER.indexOf(size); setSize(POPUP_ORDER[(i + 1) % POPUP_ORDER.length]); };
  const sz = POPUP_SIZES[size];
  const isFullscreen = size === "tela-cheia";

  if (!vis) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: isFullscreen ? 8 : 16 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,42,104,.45)", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)", opacity: animIn ? 1 : 0, transition: "opacity .28s", cursor: "pointer" }} />
      <div role="dialog" aria-modal="true" style={{
        position: "relative", zIndex: 1,
        width: typeof sz.width === "number" ? sz.width : undefined,
        maxWidth: typeof sz.width === "string" ? sz.width : "95vw",
        minWidth: typeof sz.width === "string" ? sz.width : undefined,
        maxHeight: sz.maxH, background: C.cardBg,
        borderRadius: isFullscreen ? "8px" : "12px 12px 12px 24px",
        boxShadow: "0 12px 48px rgba(0,42,104,.2), 0 2px 8px rgba(0,42,104,.08)",
        display: "flex", flexDirection: "column",
        transform: animIn ? "scale(1) translateY(0)" : "scale(.96) translateY(10px)",
        opacity: animIn ? 1 : 0,
        transition: "all .28s cubic-bezier(.32,.72,.37,1.1), width .25s ease, max-width .25s ease",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", paddingRight: 100, borderBottom: `1px solid ${C.cardBorder}`, display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
          {icon && <div style={{ width: 48, height: 48, borderRadius: 14, background: iconBg || C.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${C.cardBorder}` }}>{icon}</div>}
          <div style={{ minWidth: 0 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: C.azulEscuro, margin: 0, fontFamily: Fn.title, lineHeight: 1.3 }}>{title}</h2>
            {subtitle && <p style={{ fontSize: 12, color: C.cinzaChumbo, margin: "3px 0 0", fontFamily: Fn.body }}>{subtitle}</p>}
          </div>
          <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 6, zIndex: 2 }}>
            <button onClick={cycleSize} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 8, border: `1px solid ${C.cardBorder}`, background: "transparent", cursor: "pointer", fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: C.cinzaChumbo, fontFamily: Fn.title, transition: "all .15s" }}>
              {isFullscreen ? Ic.minimize(13, C.cinzaChumbo) : Ic.maximize(13, C.cinzaChumbo)}
              {sz.label}
            </button>
            <div onClick={onClose} tabIndex={0} role="button" aria-label="Fechar" style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .15s", background: "transparent" }}>
              {Ic.x(16, C.cinzaChumbo)}
            </div>
          </div>
        </div>
        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", background: "#fafafa" }}>
          {typeof children === "function" ? children({ size, isWide: size !== "normal", isFullscreen }) : children}
        </div>
        {/* Footer */}
        {footer && <div style={{ padding: "14px 24px", borderTop: `1px solid ${C.cardBorder}`, background: C.bg, display: "flex", gap: 10, justifyContent: "flex-end", alignItems: "center", flexShrink: 0 }}>{footer}</div>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// USO:
// <PopupModal open={open} onClose={() => setOpen(false)}
//   title="Formulário" subtitle="Descrição"
//   icon={<span>📋</span>}
//   footer={<><button onClick={() => setOpen(false)}>Cancelar</button><button>Salvar</button></>}
// >
//   {({ size, isWide, isFullscreen }) => (
//     <div style={{ display: "grid", gridTemplateColumns: isWide ? "1fr 1fr" : "1fr", gap: 14 }}>
//       <input placeholder="Campo 1" />
//       <input placeholder="Campo 2" />
//       {isWide && <input placeholder="Campo extra (grande)" />}
//       {isFullscreen && <input placeholder="Campo extra (tela cheia)" />}
//     </div>
//   )}
// </PopupModal>
// ═══════════════════════════════════════════