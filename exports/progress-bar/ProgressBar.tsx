// DS-FIPS — Progress — Copy-paste ready
import { useState, useEffect } from "react";

const C = {
  azulProfundo: "var(--color-gov-azul-profundo)",
  azulEscuro: "var(--color-gov-azul-escuro)",
  fg: "var(--color-fg)",
  fgMuted: "var(--color-fg-muted)",
  surface: "var(--color-surface)",
  surfaceMuted: "var(--color-surface-muted)",
  border: "var(--color-border)",
  branco: "#FFFFFF",
  danger: "#DC3545",
  verdeFloresta: "#00C64C",
  verdeEscuro: "#00904C",
  amareloOuro: "#FDC24E",
  amareloEscuro: "#F6921E",
  trilho: "#E2E8F0",
};

const Fn = {
  title: "'Saira Expanded', sans-serif",
  body: "'Open Sans', sans-serif",
  mono: "'Fira Code', monospace",
};

function autoColor(v: number) {
  if (v >= 100) return C.verdeEscuro;
  if (v >= 90)  return C.verdeFloresta;
  if (v >= 60)  return C.amareloOuro;
  if (v >= 30)  return C.amareloEscuro;
  if (v >= 1)   return C.danger;
  return C.trilho;
}

interface ProgressBarProps {
  value?: number;
  label?: string;
  helper?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  showPercent?: boolean;
  indeterminate?: boolean;
  animated?: boolean;
}

export function ProgressBar({
  value = 0, label, helper, size = "md", color,
  showPercent = true, indeterminate = false, animated = true,
}: ProgressBarProps) {
  const [animVal, setAnimVal] = useState(0);
  useEffect(() => {
    if (!indeterminate && animated) {
      const t = setTimeout(() => setAnimVal(value), 100);
      return () => clearTimeout(t);
    } else { setAnimVal(value); }
  }, [value, indeterminate, animated]);

  const sizeMap = { sm: { h: 4, r: 2 }, md: { h: 8, r: 4 }, lg: { h: 12, r: 6 } };
  const s = sizeMap[size] || sizeMap.md;
  const barColor = color || autoColor(animVal);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
      {(label || showPercent) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {label && <span style={{ fontSize: 13, fontWeight: 600, color: C.fg, fontFamily: Fn.body }}>{label}</span>}
          {showPercent && !indeterminate && <span style={{ fontSize: 12, fontWeight: 600, color: C.fgMuted, fontFamily: Fn.mono }}>{Math.round(animVal)}%</span>}
          {indeterminate && <span style={{ fontSize: 11, color: C.fgMuted, fontFamily: Fn.body }}>Processando...</span>}
        </div>
      )}
      <div style={{ width: "100%", height: s.h, borderRadius: s.r, background: C.trilho, overflow: "hidden", position: "relative" }}>
        {indeterminate ? (
          <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "40%", borderRadius: s.r, background: barColor, animation: "dsIndeterminate 1.5s ease-in-out infinite" }} />
        ) : (
          <div style={{ height: "100%", width: `${animVal}%`, borderRadius: s.r, background: barColor, transition: animated ? "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)" : "none" }} />
        )}
      </div>
      {helper && <span style={{ fontSize: 11, color: C.fgMuted, fontFamily: Fn.body }}>{helper}</span>}
    </div>
  );
}

interface ProgressRingProps {
  value?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  animated?: boolean;
}

export function ProgressRing({ value = 0, size = 80, strokeWidth = 6, color, label, animated = true }: ProgressRingProps) {
  const [animVal, setAnimVal] = useState(0);
  useEffect(() => {
    if (animated) {
      const t = setTimeout(() => setAnimVal(value), 100);
      return () => clearTimeout(t);
    } else { setAnimVal(value); }
  }, [value, animated]);

  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (animVal / 100) * circ;
  const barColor = color || autoColor(animVal);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.trilho} strokeWidth={strokeWidth} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={barColor} strokeWidth={strokeWidth}
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
            style={{ transition: animated ? "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)" : "none" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: size * 0.22, fontWeight: 700, color: C.fg, fontFamily: Fn.mono }}>{Math.round(animVal)}%</span>
        </div>
      </div>
      {label && <span style={{ fontSize: 12, fontWeight: 600, color: C.fg, fontFamily: Fn.body, textAlign: "center" }}>{label}</span>}
    </div>
  );
}

// Inject this style for indeterminate animation:
// @keyframes dsIndeterminate { 0% { left: -40%; } 100% { left: 100%; } }

// Usage:
// <ProgressBar value={68} label="Conferencia" helper="Maior parte ja preenchida." />
// <ProgressBar value={100} label="Finalizado" color="#00904C" />
// <ProgressBar indeterminate label="Processando..." />
// <ProgressRing value={92} size={80} label="SLA" />
