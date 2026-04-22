// DS-FIPS — Button — Copy-paste ready
import { useState } from "react";

const C = {
  azulProfundo: "var(--color-gov-azul-profundo)",
  azulEscuro: "var(--color-gov-azul-escuro)",
  azulClaro: "var(--color-gov-azul-claro)",
  fg: "var(--color-fg)",
  fgMuted: "var(--color-fg-muted)",
  surface: "var(--color-surface)",
  surfaceMuted: "var(--color-surface-muted)",
  border: "var(--color-border)",
  branco: "#FFFFFF",
  danger: "#DC3545",
  dangerDark: "#C82333",
  verdeFloresta: "#00C64C",
  verdeEscuro: "#00904C",
  amareloOuro: "#FDC24E",
  amareloEscuro: "#F6921E",
  azulCeu: "#93BDE4",
  azulCeuClaro: "#D3E3F4",
  cinzaClaro: "#C0CCD2",
};

const Fn = {
  title: "'Saira Expanded', sans-serif",
  body: "'Open Sans', sans-serif",
  mono: "'Fira Code', monospace",
};

type ButtonVariant = "primary" | "secondary" | "outline" | "inverse" | "ghost" | "accent" | "ouro" | "save" | "danger" | "link";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = "primary", size = "medium", disabled = false, loading = false, icon, children, onClick }: ButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const sizeMap: Record<string, { padding: string; fontSize: string; height: string; iconSize: number }> = {
    small:  { padding: "6px 14px", fontSize: "12px", height: "30px", iconSize: 13 },
    medium: { padding: "8px 20px", fontSize: "13px", height: "36px", iconSize: 14 },
    large:  { padding: "10px 28px", fontSize: "14px", height: "42px", iconSize: 16 },
  };

  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");

  const variantMap: Record<string, { bg: string; bgH: string; color: string; border: string; underline?: boolean }> = {
    primary:   { bg: isDark ? "#0090D0" : "#004B9B",  bgH: isDark ? "#007AB1" : "#002A68", color: "#FFFFFF", border: "transparent" },
    secondary: { bg: C.surfaceMuted, bgH: C.surfaceMuted, color: C.fg, border: C.border },
    outline:   { bg: "transparent",   bgH: isDark ? "rgba(147,189,228,0.15)" : C.azulCeuClaro, color: isDark ? "#93BDE4" : "#004B9B", border: isDark ? "#93BDE4" : "#004B9B" },
    inverse:   { bg: isDark ? "#333B41" : "#002A68", bgH: isDark ? "#444" : "#333B41", color: "#FFFFFF", border: isDark ? "#444" : "#002A68" },
    ghost:     { bg: "transparent",   bgH: isDark ? "rgba(147,189,228,0.12)" : "rgba(211,227,244,0.5)", color: C.fgMuted, border: "transparent" },
    accent:    { bg: C.amareloEscuro, bgH: "#E0820A",        color: C.branco,       border: "transparent" },
    save:      { bg: C.verdeFloresta, bgH: C.verdeEscuro,    color: C.branco,       border: "transparent" },
    danger:    { bg: C.danger,        bgH: C.dangerDark,     color: C.branco,       border: "transparent" },
    link:      { bg: "transparent",   bgH: "transparent",    color: isDark ? "#93BDE4" : "#004B9B", border: "transparent", underline: true },
    ouro:      { bg: C.amareloOuro,   bgH: C.amareloEscuro,  color: C.azulEscuro,   border: "transparent" },
  };

  const v = variantMap[variant] || variantMap.primary;
  const s = sizeMap[size] || sizeMap.medium;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "7px",
        padding: s.padding, height: s.height, fontSize: s.fontSize,
        fontWeight: 600, fontFamily: Fn.body, borderRadius: "6px",
        border: `1.5px solid ${v.border}`,
        background: disabled ? (isDark ? "#3A3A3A" : C.cinzaClaro) : (hovered && !loading ? v.bgH : v.bg),
        color: disabled ? (isDark ? "#6B6B6B" : C.fgMuted) : v.color,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        transition: "all 0.18s ease",
        transform: pressed && !disabled && !loading ? "scale(0.97)" : "scale(1)",
        textDecoration: v.underline && hovered ? "underline" : "none",
        opacity: disabled ? 0.55 : 1,
        letterSpacing: "0.01em", whiteSpace: "nowrap", outline: "none",
        boxShadow: hovered && !disabled && !loading && variant !== "ghost" && variant !== "link"
          ? "0 2px 8px rgba(0,75,155,0.18)" : "none",
      }}
    >
      {loading && <Spinner size={s.iconSize} color={disabled ? C.fgMuted : v.color} />}
      {icon && !loading && icon}
      {children}
    </button>
  );
}

function Spinner({ size = 14, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ animation: "dsSpin 0.8s linear infinite" }}>
      <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

// Usage:
// <Button variant="primary">Confirmar</Button>
// <Button variant="save" icon={<SaveIcon />}>Salvar</Button>
// <Button variant="danger" size="small">Excluir</Button>
// <Button variant="ghost">Cancelar</Button>
// <Button variant="primary" loading>Carregando</Button>
// <Button variant="primary" disabled>Desabilitado</Button>
