// DS-FIPS — Textarea — Copy-paste ready
import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  azulProfundo: "var(--color-gov-azul-profundo)",
  cinzaChumbo: "var(--color-fg-muted)",
  cinzaEscuro: "var(--color-fg)",
  cinzaClaro: "#C0CCD2",
  amareloEscuro: "#F6921E",
  danger: "#DC3545",
  dangerBg: "#FEF2F2",
  textMuted: "var(--color-fg-muted)",
  textLight: "var(--color-fg-muted)",
  inputBorder: "var(--color-border)",
  inputBg: "var(--color-surface)",
  inputBgDisabled: "var(--color-surface-muted)",
  focusRing: "rgba(147,189,228,0.35)",
};

const Fn = {
  body: "'Open Sans', sans-serif",
  mono: "'Fira Code', monospace",
};

export function DSTextarea({
  label, placeholder, rows = 3, required, error, errorMsg,
  disabled, readOnly, helper, compact, maxLength, autoResize,
  value: valueProp, defaultValue, onChange,
}: {
  label?: string; placeholder?: string; rows?: number;
  required?: boolean; error?: boolean; errorMsg?: string;
  disabled?: boolean; readOnly?: boolean; helper?: string;
  compact?: boolean; maxLength?: number; autoResize?: boolean;
  value?: string; defaultValue?: string; onChange?: (v: string) => void;
}) {
  const [internal, setInternal] = useState(() => valueProp ?? defaultValue ?? "");
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const fs = compact ? 12 : 13;
  const controlled = valueProp !== undefined;
  const dv = controlled ? valueProp : internal;
  const bc = error ? C.danger : focused ? C.azulProfundo : C.inputBorder;
  const bg = disabled ? C.inputBgDisabled : C.inputBg;
  const sh = focused && !error ? `0 0 0 3px ${C.focusRing}` : error && focused ? `0 0 0 3px ${C.dangerBg}` : "none";
  const charCount = dv.length;
  const overLimit = maxLength !== undefined && charCount > maxLength;

  useEffect(() => { if (valueProp !== undefined) setInternal(valueProp); }, [valueProp]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    if (!controlled) setInternal(v);
    onChange?.(v);
    if (autoResize && ref.current) { ref.current.style.height = "auto"; ref.current.style.height = `${ref.current.scrollHeight}px`; }
  }, [autoResize, onChange, controlled]);

  useEffect(() => {
    if (!autoResize || !ref.current) return;
    const el = ref.current;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [autoResize, dv]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
      {label && (
        <label style={{ fontSize: compact ? 11 : 12, fontWeight: 600, color: C.cinzaEscuro, fontFamily: Fn.body, marginBottom: 1, marginLeft: 7, display: "flex", alignItems: "center", gap: 3 }}>
          {label}{required && <span style={{ color: C.danger, fontWeight: 700, fontSize: 14 }}>*</span>}
        </label>
      )}
      <textarea ref={ref} placeholder={placeholder} value={dv} onChange={handleChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        disabled={disabled} readOnly={readOnly} rows={rows}
        style={{ padding: compact ? "6px 12px" : "10px 14px", borderRadius: 8, border: `1.5px solid ${bc}`, background: bg, fontFamily: Fn.body, fontSize: fs, color: disabled ? C.cinzaChumbo : C.cinzaEscuro, outline: "none", resize: autoResize ? "none" : disabled || readOnly ? "none" : "vertical", transition: "all .18s", boxShadow: sh, cursor: disabled ? "not-allowed" : readOnly ? "default" : "text", opacity: disabled ? 0.6 : 1, minHeight: autoResize ? (compact ? 30 : 40) : undefined, lineHeight: 1.5, overflow: autoResize ? "hidden" : "auto", width: "100%", boxSizing: "border-box" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 3, marginLeft: 7, marginRight: 7 }}>
        {(helper || (error && errorMsg)) && (
          <span style={{ fontSize: 11, color: error ? C.danger : C.textMuted, fontFamily: Fn.body, lineHeight: 1.3, flex: 1 }}>
            {error ? errorMsg : helper}
          </span>
        )}
        {maxLength !== undefined && (
          <span style={{ fontSize: 10, fontFamily: Fn.mono, color: overLimit ? C.danger : charCount > maxLength * 0.9 ? C.amareloEscuro : C.textLight, flexShrink: 0, marginLeft: 8 }}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}

// Usage:
// <DSTextarea label="Observacao" placeholder="Descreva..." rows={4} required />
// <DSTextarea label="Justificativa" maxLength={200} helper="Min 20 caracteres." />
// <DSTextarea label="Descricao" autoResize />
