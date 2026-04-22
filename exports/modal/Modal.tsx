// ═══════════════════════════════════════════
// DS-FIPS — Modal — Copy-paste ready
// Requer: React 18+, fonts Saira Expanded + Open Sans + Fira Code
// CSS vars: --color-surface, --color-fg, --color-border, --color-fg-muted,
//           --color-surface-muted, --color-surface-soft,
//           --color-gov-azul-profundo, --color-gov-azul-escuro, --color-gov-azul-claro
// ═══════════════════════════════════════════
import { useState, useEffect } from "react";

const C = {
  azulProfundo: "var(--color-gov-azul-profundo)",
  azulEscuro: "var(--color-gov-azul-escuro)",
  cinzaChumbo: "var(--color-fg-muted)",
  cinzaEscuro: "var(--color-fg)",
  cinzaClaro: "#C0CCD2",
  azulCeu: "#93BDE4",
  verdeFloresta: "#00C64C",
  verdeEscuro: "#00904C",
  danger: "#DC3545",
  branco: "#FFFFFF",
  bg: "var(--color-surface-muted)",
  cardBg: "var(--color-surface)",
  cardBorder: "var(--color-border)",
  textMuted: "var(--color-fg-muted)",
  inputBorder: "var(--color-border)",
  focusRing: "rgba(147,189,228,0.35)",
};

const Fn = {
  title: "'Saira Expanded', sans-serif",
  body: "'Open Sans', sans-serif",
  mono: "'Fira Code', monospace",
};

/* Ícones inline */
const Ic = {
  x: (s = 18, c = C.cinzaChumbo) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none">
      <path d="M5 5l10 10M15 5L5 15" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

/* Botão reutilizável */
function Btn({ label, color, outline, onClick, danger }) {
  const bg = danger ? C.danger : color || C.azulProfundo;
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 20px", fontSize: 12, fontWeight: 600,
        background: outline ? "transparent" : bg,
        color: outline ? (danger ? C.danger : color || C.cinzaChumbo) : C.branco,
        border: outline ? `1.5px solid ${danger ? C.danger : color || C.cinzaClaro}` : "none",
        borderRadius: 8, cursor: "pointer", fontFamily: Fn.body,
        transition: "all .15s",
      }}
    >
      {label}
    </button>
  );
}

/* ═══════════════════════════════════════════
   MODAL — DS-FIPS
   Overlay blur, animação spring, ESC fecha, border-radius FIPS, aria-modal
   ═══════════════════════════════════════════ */
export function Modal({ open, onClose, title, subtitle, children, footer, footerBg, width = 480, icon, iconBg, bodyBg, noPadBody }) {
  const [vis, setVis] = useState(false);
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    if (open) {
      setVis(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true)));
    } else {
      setAnimIn(false);
      const t = setTimeout(() => setVis(false), 280);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!vis) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,42,104,.45)", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)", opacity: animIn ? 1 : 0, transition: "opacity .28s", cursor: "pointer" }} />
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title" style={{
        position: "relative", zIndex: 1, width, maxWidth: "95vw", maxHeight: "90vh",
        background: C.cardBg, borderRadius: "12px 12px 12px 24px",
        boxShadow: "0 12px 48px rgba(0,42,104,.2), 0 2px 8px rgba(0,42,104,.08)",
        display: "flex", flexDirection: "column",
        transform: animIn ? "scale(1) translateY(0)" : "scale(.96) translateY(10px)",
        opacity: animIn ? 1 : 0,
        transition: "all .28s cubic-bezier(.32,.72,.37,1.1)",
        overflow: "hidden",
      }}>
        <div onClick={onClose} tabIndex={0} role="button" aria-label="Fechar modal" style={{ position: "absolute", top: 10, right: 10, zIndex: 2, width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .15s", background: "transparent" }}>
          {Ic.x(16, C.cinzaChumbo)}
        </div>
        <div style={{ padding: "20px 24px", paddingRight: 50, borderBottom: `1px solid ${C.cardBorder}`, display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
          {icon && <div style={{ width: 48, height: 48, borderRadius: 14, background: iconBg || C.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${C.cardBorder}` }}>{icon}</div>}
          <div style={{ minWidth: 0 }}>
            <h2 id="modal-title" style={{ fontSize: 17, fontWeight: 700, color: C.azulEscuro, margin: 0, fontFamily: Fn.title, lineHeight: 1.3 }}>{title}</h2>
            {subtitle && <p style={{ fontSize: 12, color: C.cinzaChumbo, margin: "3px 0 0", lineHeight: 1.4, fontFamily: Fn.body }}>{subtitle}</p>}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: noPadBody ? 0 : "20px 24px", background: bodyBg || "transparent" }}>{children}</div>
        {footer && <div style={{ padding: "14px 24px", borderTop: `1px solid ${C.cardBorder}`, background: footerBg || C.bg, display: "flex", gap: 10, justifyContent: "flex-end", alignItems: "center", flexShrink: 0 }}>{footer}</div>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// USO:
// const [open, setOpen] = useState(false);
// <Modal open={open} onClose={() => setOpen(false)}
//   title="Título do modal" subtitle="Subtítulo descritivo"
//   icon={<span>📋</span>} width={480}
//   footer={<><Btn label="Cancelar" outline onClick={() => setOpen(false)} /><Btn label="Confirmar" color="#00C64C" onClick={() => setOpen(false)} /></>}
// >
//   <p>Conteúdo do modal aqui.</p>
// </Modal>
// ═══════════════════════════════════════════