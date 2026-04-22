// DS-FIPS — Field + FieldLabel + FieldHint — Copy-paste ready
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
  focusRing: "rgba(147,189,228,0.35)",
};

const Fn = {
  title: "'Saira Expanded', sans-serif",
  body: "'Open Sans', sans-serif",
  mono: "'Fira Code', monospace",
};

/* FieldLabel — label padrao do DS-FIPS */
export function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label style={{
      fontSize: 12, fontWeight: 600, color: C.fg,
      fontFamily: Fn.body, marginBottom: 1, marginLeft: 7,
      display: "flex", alignItems: "center", gap: 3,
    }}>
      {children}
      {required && <span style={{ color: C.danger, fontWeight: 700, fontSize: 14 }}>*</span>}
    </label>
  );
}

/* FieldHint — helper ou mensagem de erro */
export function FieldHint({ children, error }: { children: React.ReactNode; error?: boolean }) {
  return (
    <span style={{
      fontSize: 11, color: error ? C.danger : C.fgMuted,
      marginTop: 3, marginLeft: 7, fontFamily: Fn.body, lineHeight: 1.3,
    }}>
      {children}
    </span>
  );
}

/* Field — composicao label + input + hint */
interface FieldProps {
  label?: string;
  required?: boolean;
  error?: boolean;
  errorMsg?: string;
  helper?: string;
  children: React.ReactNode;
}

export function Field({ label, required, error, errorMsg, helper, children }: FieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      {children}
      {(helper || (error && errorMsg)) && (
        <FieldHint error={error}>{error ? errorMsg : helper}</FieldHint>
      )}
    </div>
  );
}

/* FieldInput — input padrao com icone e estados */
interface FieldInputProps {
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  required?: boolean;
  error?: boolean;
  errorMsg?: string;
  disabled?: boolean;
  readOnly?: boolean;
  helper?: string;
  compact?: boolean;
  value?: string;
  onChange?: (v: string) => void;
}

export function FieldInput({ label, placeholder, icon, required, error, errorMsg, disabled, readOnly, helper, compact, value: cv, onChange }: FieldInputProps) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState(cv || "");
  const ref = useRef<HTMLInputElement>(null);
  const h = compact ? 30 : 35;
  const fs = compact ? 12 : 13;
  const dv = cv !== undefined ? cv : val;
  const bc = error ? C.danger : focused ? C.azulProfundo : C.border;
  const bg = disabled ? C.surfaceMuted : C.surface;
  const sh = focused && !error ? `0 0 0 3px ${C.focusRing}` : error && focused ? `0 0 0 3px ${C.dangerBg}` : "none";

  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 8, height: h, padding: "0 12px",
          background: bg, border: `1.5px solid ${bc}`, borderRadius: 8,
          transition: "all .18s", boxShadow: sh,
          cursor: disabled ? "not-allowed" : "text", fontFamily: Fn.body, fontSize: fs,
        }}
        onClick={() => !disabled && ref.current?.focus()}
      >
        {icon && <span style={{ display: "flex", flexShrink: 0, opacity: disabled ? .4 : .55 }}>{icon}</span>}
        <input
          ref={ref} type="text" placeholder={placeholder} value={dv}
          onChange={e => { setVal(e.target.value); onChange?.(e.target.value); }}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          disabled={disabled} readOnly={readOnly}
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            fontFamily: Fn.body, fontSize: fs, color: disabled ? C.fgMuted : C.fg,
            cursor: disabled ? "not-allowed" : "text", minWidth: 0,
          }}
        />
      </div>
      {(helper || (error && errorMsg)) && (
        <FieldHint error={error}>{error ? errorMsg : helper}</FieldHint>
      )}
    </div>
  );
}

// Usage:
// <Field label="Nome" required helper="Campo obrigatorio.">
//   <input style={{...}} />
// </Field>
//
// <FieldInput label="Email" placeholder="email@fips.app.br" icon={<EmailIcon />} required />
// <FieldInput label="Protocolo" value="FIPS-2026-00482" readOnly />
// <FieldInput label="CNPJ" error errorMsg="CNPJ invalido." value="123" />
