# Button

> Componente · DS-FIPS · Copy-paste ready

Botão com 10 variantes (primary, secondary, outline, ghost, danger, save, accent, ouro, link, inverse), 3 tamanhos, loading e disabled.

## Requisitos

- React 18+
- Fonts: Saira Expanded, Open Sans, Fira Code (Google Fonts)
- CSS Variables do DS-FIPS (ver abaixo)

## CSS Variables necessárias

```css
:root {
  --color-surface: #FFFFFF;
  --color-surface-muted: #F2F4F8;
  --color-surface-soft: #E8EBFF;
  --color-fg: #333B41;
  --color-fg-muted: #7B8C96;
  --color-border: #E2E8F0;
  --color-gov-azul-profundo: #004B9B;
  --color-gov-azul-escuro: #002A68;
  --color-gov-azul-claro: #658EC9;
}

/* Dark mode */
.dark {
  --color-surface: #1A2332;
  --color-surface-muted: #141C27;
  --color-surface-soft: #1E293B;
  --color-fg: #E2E8F0;
  --color-fg-muted: #94A3B8;
  --color-border: #2A3A4A;
  --color-gov-azul-profundo: #93BDE4;
  --color-gov-azul-escuro: #658EC9;
  --color-gov-azul-claro: #93BDE4;
}
```

## Uso

```tsx
import { Button } from './Button'

<Button variant="primary">Salvar</Button>
```

## Props

- `variant`
- `size`
- `disabled`
- `loading`
- `icon`
- `children`
- `onClick`

## Arquivo

- `Button.tsx` — 119 linhas, self-contained, sem dependências externas
- Origem: `ButtonDoc.tsx` no Design System FIPS
