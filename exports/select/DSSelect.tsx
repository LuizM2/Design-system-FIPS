// DS-FIPS — Select (Custom Dropdown) — Copy-paste ready
import { useState, useEffect, useRef } from "react";

const C = {
  azulProfundo: "var(--color-gov-azul-profundo)",
  azulEscuro: "var(--color-gov-azul-escuro)",
  cinzaChumbo: "var(--color-fg-muted)",
  cinzaEscuro: "var(--color-fg)",
  azulCeuClaro: "#D3E3F4",
  danger: "#DC3545",
  bg: "var(--color-surface-muted)",
  cardBg: "var(--color-surface)",
  textMuted: "var(--color-fg-muted)",
  textLight: "var(--color-fg-muted)",
  inputBorder: "var(--color-border)",
  inputBg: "var(--color-surface)",
  inputBgDisabled: "var(--color-surface-muted)",
  focusRing: "rgba(147,189,228,0.35)",
};

const Fn = {
  title: "'Saira Expanded', sans-serif",
  body: "'Open Sans', sans-serif",
  mono: "'Fira Code', monospace",
};

type SelectOption = string | { value: string; label: string };

export function DSSelect({
  label, icon, options = [], placeholder = "Selecione",
  required, error, errorMsg, disabled, helper, compact,
  value: cv, onChange,
}: {
  label?: string; icon?: React.ReactNode; options?: SelectOption[];
  placeholder?: string; required?: boolean; error?: boolean;
  errorMsg?: string; disabled?: boolean; helper?: string;
  compact?: boolean; value?: string; onChange?: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState(cv ?? "");
  const [hi, setHi] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const sz = compact ? { h: 30, fs: 12 } : { h: 35, fs: 13 };
  const bc = error ? C.danger : open ? C.azulProfundo : C.inputBorder;
  const getL = (v: string) => {
    const o = options.find((x) => (typeof x === "string" ? x === v : x.value === v));
    return o ? (typeof o === "string" ? o : o.label) : "";
  };
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);
  useEffect(() => { if (cv !== undefined) setVal(cv); }, [cv]);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", minWidth: 0, position: "relative", zIndex: open ? 30 : 1 }}>
      {label && (
        <label style={{ fontSize: compact ? 11 : 12, fontWeight: 600, color: C.cinzaEscuro, fontFamily: Fn.body, marginBottom: 1, marginLeft: 7, display: "flex", alignItems: "center", gap: 3 }}>
          {label}{required && <span style={{ color: C.danger, fontWeight: 700, fontSize: 14 }}>*</span>}
        </label>
      )}
      <div role="button" tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => { if (!disabled && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setOpen(!open); } }}
        onClick={() => !disabled && setOpen(!open)}
        style={{ display: "flex", alignItems: "center", gap: 8, height: sz.h, padding: "0 12px", background: disabled ? C.inputBgDisabled : C.inputBg, border: `1.5px solid ${bc}`, borderRadius: open ? "8px 8px 0 0" : 8, transition: "all .18s", boxShadow: open && !error ? `0 0 0 3px ${C.focusRing}` : "none", cursor: disabled ? "not-allowed" : "pointer", fontFamily: Fn.body, fontSize: sz.fs, opacity: disabled ? 0.6 : 1, userSelect: "none" }}>
        {icon && <span style={{ display: "flex", flexShrink: 0, opacity: 0.55 }}>{icon}</span>}
        <span style={{ flex: 1, color: val ? C.cinzaEscuro : C.textLight, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingLeft: 2 }}>
          {val ? getL(val) : placeholder}
        </span>
        <span style={{ display: "flex", flexShrink: 0, opacity: 0.45, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M6 8l4 4 4-4" stroke={C.cinzaChumbo} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
      {open && !disabled && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 20, background: C.inputBg, border: `1.5px solid ${C.azulProfundo}`, borderTop: "none", borderRadius: "0 0 8px 8px", boxShadow: "0 6px 20px rgba(0,75,155,.12)", maxHeight: 200, overflowY: "auto" }}>
          {options.map((o, i) => {
            const oV = typeof o === "string" ? o : o.value;
            const oL = typeof o === "string" ? o : o.label;
            const sel = oV === val;
            return (
              <div key={oV} role="option" aria-selected={sel}
                onClick={() => { setVal(oV); onChange?.(oV); setOpen(false); }}
                onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(-1)}
                style={{ padding: `${compact ? 6 : 8}px 14px`, fontSize: sz.fs, fontFamily: Fn.body, color: sel ? C.azulProfundo : C.cinzaEscuro, fontWeight: sel ? 600 : 400, background: sel ? C.azulCeuClaro : i === hi ? C.bg : "transparent", cursor: "pointer" }}>
                {oL}
              </div>
            );
          })}
        </div>
      )}
      {(helper || (error && errorMsg)) && (
        <span style={{ fontSize: 11, color: error ? C.danger : C.textMuted, marginTop: 3, marginLeft: 7, fontFamily: Fn.body }}>
          {error ? errorMsg : helper}
        </span>
      )}
    </div>
  );
}

// Usage:
// <DSSelect label="Departamento" options={["Operações","Logística","TI"]} required />
// <DSSelect label="Status" options={[{value:"a",label:"Ativo"},{value:"i",label:"Inativo"}]} compact />
