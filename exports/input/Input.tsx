// DS-FIPS — Input — Copy-paste ready
import { useState, useRef } from "react";

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
  dangerBg: "#FEF2F2",
  azulCeuClaro: "#D3E3F4",
  cinzaChumbo: "#7B8C96",
};

const Fn = {
  title: "'Saira Expanded', sans-serif",
  body: "'Open Sans', sans-serif",
  mono: "'Fira Code', monospace",
};

interface InputProps {
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  type?: string;
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "email" | "search" | "url" | "none";
  maxLength?: number;
  required?: boolean;
  error?: boolean;
  errorMsg?: string;
  disabled?: boolean;
  readOnly?: boolean;
  helper?: string;
  compact?: boolean;
  value?: string;
  onChange?: (val: string) => void;
  onClear?: () => void;
  showToggle?: boolean;
  size?: "desktop" | "mobile" | "compact";
}

export function Input({
  label, placeholder, icon, iconRight, type = "text", inputMode,
  maxLength, required, error, errorMsg, disabled, readOnly,
  helper, compact, value: controlledVal, onChange, onClear, showToggle, size = "desktop",
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState(controlledVal || "");
  const [showPw, setShowPw] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const sizeMap = { desktop: { h: 35, fs: 13 }, mobile: { h: 42, fs: 14 }, compact: { h: 30, fs: 12 } };
  const resolvedSize = compact ? "compact" : size;
  const { h, fs } = sizeMap[resolvedSize] || sizeMap.desktop;

  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const borderColor = error ? C.danger : focused ? (isDark ? "#93BDE4" : C.azulProfundo) : C.border;
  const bgColor = disabled ? C.surfaceMuted : C.surface;
  const shadowColor = focused && !error
    ? `0 0 0 3px ${isDark ? "rgba(147,189,228,0.2)" : C.azulCeuClaro}`
    : error && focused
      ? `0 0 0 3px ${isDark ? "rgba(248,113,113,0.15)" : C.dangerBg}`
      : "none";

  const displayVal = controlledVal !== undefined ? controlledVal : val;

  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
      {label && (
        <label style={{
          fontSize: compact ? 11 : 12, fontWeight: 600, color: C.fg,
          fontFamily: Fn.body, marginBottom: 1, marginLeft: 7,
          display: "flex", alignItems: "center", gap: 3,
        }}>
          {label}
          {required && <span style={{ color: C.danger, fontWeight: 700, fontSize: 14 }}>*</span>}
        </label>
      )}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 8,
          height: h, padding: "0 12px",
          background: bgColor, border: `1.5px solid ${borderColor}`,
          borderRadius: 8, transition: "all 0.18s ease",
          boxShadow: shadowColor,
          cursor: disabled ? "not-allowed" : "text",
          fontFamily: Fn.body, fontSize: fs,
        }}
        onClick={() => !disabled && ref.current?.focus()}
      >
        {icon && <span style={{ display: "flex", flexShrink: 0, opacity: disabled ? 0.4 : 0.7 }}>{icon}</span>}
        <input
          ref={ref}
          type={showToggle ? (showPw ? "text" : "password") : type}
          inputMode={inputMode}
          maxLength={maxLength}
          placeholder={placeholder}
          value={displayVal}
          onChange={e => { setVal(e.target.value); onChange?.(e.target.value); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          readOnly={readOnly}
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            fontFamily: Fn.body, fontSize: fs, color: disabled ? C.fgMuted : C.fg,
            cursor: disabled ? "not-allowed" : "text", minWidth: 0,
          }}
        />
        {onClear && displayVal && !disabled && (
          <span style={{ display: "flex", cursor: "pointer", opacity: 0.5, flexShrink: 0 }}
            onClick={e => { e.stopPropagation(); setVal(""); onClear?.(); }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M6 6l8 8M14 6l-8 8" stroke={C.fgMuted} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </span>
        )}
        {showToggle && (
          <span style={{ display: "flex", cursor: "pointer", opacity: 0.6, flexShrink: 0 }}
            onClick={e => { e.stopPropagation(); setShowPw(!showPw); }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M2 10s3.5-5 8-5 8 5 8 5-3.5 5-8 5-8-5-8-5z" stroke={C.fgMuted} strokeWidth="1.5"/>
              {!showPw && <circle cx="10" cy="10" r="2.5" stroke={C.fgMuted} strokeWidth="1.5"/>}
              {showPw && <path d="M4 4l12 12" stroke={C.fgMuted} strokeWidth="1.5" strokeLinecap="round"/>}
            </svg>
          </span>
        )}
        {iconRight && !showToggle && !onClear && (
          <span style={{ display: "flex", flexShrink: 0, opacity: disabled ? 0.4 : 0.7 }}>{iconRight}</span>
        )}
      </div>
      {(helper || (error && errorMsg)) && (
        <span style={{ fontSize: 11, color: error ? C.danger : C.fgMuted, marginTop: 3, fontFamily: Fn.body, lineHeight: 1.3 }}>
          {error ? errorMsg : helper}
        </span>
      )}
    </div>
  );
}

// Usage:
// <Input label="Nome" placeholder="Nome completo" icon={<PersonIcon />} required />
// <Input label="Busca" placeholder="Buscar..." icon={<SearchIcon />} onClear={() => {}} />
// <Input label="Senha" placeholder="Senha" icon={<LockIcon />} showToggle required />
// <Input label="Email" error errorMsg="Email invalido." value="abc" icon={<MailIcon />} />
// <Input label="Protocolo" readOnly value="FIPS-2026-00482" icon={<DocIcon />} />
