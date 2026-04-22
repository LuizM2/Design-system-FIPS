// ═══════════════════════════════════════════
// DS-FIPS — TutorialModal — Copy-paste ready
// Requer: React 18+, fonts Saira Expanded + Open Sans + Fira Code
// ═══════════════════════════════════════════
import { useState, useEffect, useRef } from "react";

const C = {
  azulProfundo: "var(--color-gov-azul-profundo)",
  azulEscuro: "var(--color-gov-azul-escuro)",
  azulClaro: "var(--color-gov-azul-claro)",
  cinzaChumbo: "var(--color-fg-muted)",
  cinzaEscuro: "var(--color-fg)",
  cinzaClaro: "#C0CCD2",
  azulCeu: "#93BDE4",
  azulCeuClaro: "#D3E3F4",
  verdeFloresta: "#00C64C",
  branco: "#FFFFFF",
  bg: "var(--color-surface-muted)",
  cardBg: "var(--color-surface)",
  cardBorder: "var(--color-border)",
  textMuted: "var(--color-fg-muted)",
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
  helpCircle: (s = 28, c = C.azulProfundo) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" stroke={c} strokeWidth="2.5" />
      <path d="M18 18a6 6 0 0111.13 3.15c0 4-6 5.5-6 9.85M24 36v1" stroke={c} strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  target: (s = 14, c = C.azulProfundo) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke={c} strokeWidth="1.5" />
      <circle cx="10" cy="10" r="3" stroke={c} strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1" fill={c} />
    </svg>
  ),
};

function Btn({ label, color, outline, onClick }) {
  const bg = color || C.azulProfundo;
  return (
    <button onClick={onClick} style={{
      padding: "8px 20px", fontSize: 12, fontWeight: 600,
      background: outline ? "transparent" : bg, color: outline ? C.cinzaChumbo : "#fff",
      border: outline ? `1.5px solid ${C.cinzaClaro}` : "none",
      borderRadius: 8, cursor: "pointer", fontFamily: Fn.body, transition: "all .15s",
    }}>{label}</button>
  );
}

function Kbd({ children }) {
  return <kbd style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 26, height: 24, padding: "0 7px", background: C.branco, border: `1px solid ${C.cardBorder}`, borderBottom: `2px solid ${C.cinzaClaro}`, borderRadius: 5, fontSize: 11, fontWeight: 600, fontFamily: Fn.mono, color: C.cinzaEscuro }}>{children}</kbd>;
}

/**
 * TutorialModal — Walkthrough step-by-step contextual
 * Props:
 *   open: boolean
 *   onClose: () => void
 *   title: string
 *   subtitle?: string
 *   steps: Array<{ title, ref?, description, tips?: string[], visual?: ReactNode }>
 */
export function TutorialModal({ open, onClose, title, subtitle, steps = [] }) {
  const [vis, setVis] = useState(false);
  const [animIn, setAnimIn] = useState(false);
  const [step, setStep] = useState(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open) { setStep(0); setVis(true); requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true))); }
    else { setAnimIn(false); const t = setTimeout(() => setVis(false), 280); return () => clearTimeout(t); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const h = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && step < steps.length - 1) setStep((s) => s + 1);
      if (e.key === "ArrowLeft" && step > 0) setStep((s) => s - 1);
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose, step, steps.length]);

  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);

  if (!vis || !steps.length) return null;
  const cur = steps[step];
  const total = steps.length;
  const pct = ((step + 1) / total) * 100;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,42,104,.50)", backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)", opacity: animIn ? 1 : 0, transition: "opacity .28s", cursor: "pointer" }} />
      <div role="dialog" aria-modal="true" style={{
        position: "relative", zIndex: 1, width: 540, maxWidth: "95vw", maxHeight: "90vh",
        background: C.cardBg, borderRadius: "12px 12px 12px 24px",
        boxShadow: "0 12px 48px rgba(0,42,104,.22), 0 2px 8px rgba(0,42,104,.08)",
        display: "flex", flexDirection: "column",
        transform: animIn ? "scale(1) translateY(0)" : "scale(.96) translateY(10px)",
        opacity: animIn ? 1 : 0, transition: "all .28s cubic-bezier(.32,.72,.37,1.1)", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", paddingRight: 50, borderBottom: `1px solid ${C.cardBorder}`, display: "flex", alignItems: "center", gap: 16, flexShrink: 0, background: `linear-gradient(135deg,${C.azulProfundo}08 0%,${C.azulCeuClaro}20 100%)` }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: `${C.azulProfundo}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${C.azulCeu}30` }}>{Ic.helpCircle(28, C.azulProfundo)}</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: C.azulEscuro, margin: 0, fontFamily: Fn.title, lineHeight: 1.3 }}>{title}</h2>
            {subtitle && <p style={{ fontSize: 12, color: C.cinzaChumbo, margin: "3px 0 0", lineHeight: 1.4, fontFamily: Fn.body }}>{subtitle}</p>}
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.azulProfundo, fontFamily: Fn.mono }}>{step + 1}/{total}</span>
        </div>
        {/* Close */}
        <div onClick={onClose} tabIndex={0} role="button" aria-label="Fechar tutorial" style={{ position: "absolute", top: 10, right: 10, zIndex: 2, width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .15s", background: "transparent" }}>
          {Ic.x(16, C.cinzaChumbo)}
        </div>
        {/* Progress */}
        <div style={{ height: 3, background: C.bg, flexShrink: 0 }}>
          <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${C.azulProfundo},${C.azulCeu})`, borderRadius: 2, transition: "width .35s cubic-bezier(.4,0,.2,1)" }} />
        </div>
        {/* Body */}
        <div ref={bodyRef} style={{ flex: 1, overflowY: "auto", padding: "24px 28px", background: "#fafafa" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${C.azulProfundo},${C.azulCeu})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: Fn.mono }}>{step + 1}</span>
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.azulEscuro, margin: 0, fontFamily: Fn.title }}>{cur.title}</h3>
              {cur.ref && <span style={{ fontSize: 11, color: C.azulClaro, fontFamily: Fn.mono, display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>{Ic.target(12, C.azulClaro)} {cur.ref}</span>}
            </div>
          </div>
          <p style={{ fontSize: 13, color: C.cinzaEscuro, lineHeight: 1.7, margin: "0 0 16px", fontFamily: Fn.body }}>{cur.description}</p>
          {cur.visual && <div style={{ background: C.cardBg, borderRadius: 10, border: `1px solid ${C.cardBorder}`, padding: 16, marginBottom: 16 }}>{cur.visual}</div>}
          {cur.tips?.length > 0 && (
            <div style={{ background: `${C.azulCeuClaro}30`, border: `1px solid ${C.azulCeuClaro}`, borderRadius: 10, padding: "14px 18px" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: C.azulProfundo, fontFamily: Fn.title, display: "block", marginBottom: 8 }}>Dica</span>
              {cur.tips.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: i < cur.tips.length - 1 ? 6 : 0 }}>
                  <span style={{ color: C.azulProfundo, fontSize: 12, marginTop: 1, flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: 12, color: C.cinzaEscuro, lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Footer */}
        <div style={{ padding: "14px 24px", borderTop: `1px solid ${C.cardBorder}`, background: C.bg, display: "flex", gap: 10, justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {steps.map((_, i) => (
              <div key={i} onClick={() => setStep(i)} style={{ width: i === step ? 20 : 8, height: 8, borderRadius: 4, background: i === step ? C.azulProfundo : i < step ? C.azulCeu : C.cinzaClaro, cursor: "pointer", transition: "all .25s" }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 4, marginRight: 8 }}><Kbd>←</Kbd><Kbd>→</Kbd></div>
            {step > 0 && <Btn label="Anterior" outline onClick={() => setStep((s) => s - 1)} />}
            {step < total - 1 ? <Btn label="Próximo" color={C.azulProfundo} onClick={() => setStep((s) => s + 1)} /> : <Btn label="Concluir" color={C.verdeFloresta} onClick={onClose} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// USO:
// const steps = [
//   { title: "Passo 1", ref: "Seção 01", description: "Descrição...", tips: ["Dica 1"], visual: <div>Preview</div> },
//   { title: "Passo 2", description: "Descrição do passo 2..." },
// ];
// <TutorialModal open={open} onClose={() => setOpen(false)} title="Tutorial" subtitle="Guia da página" steps={steps} />
// ═══════════════════════════════════════════