// DS-FIPS — Tabs (Underline) — Copy-paste ready
import { useState, useEffect, useRef } from "react";

const C = {
  azulProfundo: "var(--color-gov-azul-profundo)",
  azulEscuro: "var(--color-gov-azul-escuro)",
  cinzaChumbo: "var(--color-fg-muted)",
  cinzaEscuro: "var(--color-fg)",
  amareloEscuro: "#F6921E",
  branco: "#FFFFFF",
  cardBorder: "var(--color-border)",
  textLight: "var(--color-fg-muted)",
};

const Fn = {
  body: "'Open Sans', sans-serif",
  mono: "'Fira Code', monospace",
};

interface Tab {
  label: string;
  icon?: (color: string) => React.ReactNode;
  count?: number;
  disabled?: boolean;
}

export function TabsUnderline({
  tabs = [], active = 0, onChange, size = "md",
}: {
  tabs: Tab[]; active?: number;
  onChange?: (i: number) => void; size?: "sm" | "md" | "lg";
}) {
  const sz = { sm: { fs: 12, py: 8, px: 16 }, md: { fs: 13, py: 10, px: 20 }, lg: { fs: 14, py: 12, px: 24 } };
  const s = sz[size] || sz.md;
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [line, setLine] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = refs.current[active];
    if (el) setLine({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active, tabs.length]);

  return (
    <div style={{ position: "relative", display: "flex", borderBottom: `2px solid ${C.cardBorder}`, overflow: "hidden" }}>
      {tabs.map((t, i) => {
        const isA = active === i;
        const dis = t.disabled;
        const ic = isA ? C.amareloEscuro : C.cinzaChumbo;
        return (
          <div key={i} ref={(el) => (refs.current[i] = el)}
            onClick={() => !dis && onChange?.(i)}
            style={{
              padding: `${s.py}px ${s.px}px`, fontSize: s.fs,
              fontWeight: isA ? 600 : 400, fontFamily: Fn.body,
              color: dis ? C.textLight : isA ? C.azulEscuro : C.cinzaChumbo,
              cursor: dis ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", gap: 7,
              whiteSpace: "nowrap", transition: "all .2s",
              opacity: dis ? 0.45 : 1,
            }}
          >
            {t.icon && <span style={{ display: "flex" }}>{t.icon(ic)}</span>}
            {t.label}
            {t.count !== undefined && (
              <span style={{
                minWidth: 18, height: 18, borderRadius: 999,
                background: isA ? C.azulProfundo : "#C0CCD2",
                color: isA ? C.branco : C.cinzaChumbo,
                fontSize: 10, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "0 5px", fontFamily: Fn.mono,
              }}>{t.count}</span>
            )}
          </div>
        );
      })}
      <div style={{
        position: "absolute", bottom: -2, left: line.left, width: line.width,
        height: 3, background: C.amareloEscuro, borderRadius: "3px 3px 0 0",
        transition: "left .3s cubic-bezier(.4,0,.2,1), width .3s cubic-bezier(.4,0,.2,1)",
      }} />
    </div>
  );
}

// Usage:
// const [active, setActive] = useState(0);
// <TabsUnderline tabs={[{label:"Home"},{label:"Docs"},{label:"Off",disabled:true}]} active={active} onChange={setActive} />
