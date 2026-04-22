# Card

> Componente · DS-FIPS · Copy-paste ready

Container card com border-radius FIPS (12 12 12 24), sombra sutil, composição flexível.

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
import { Card } from './Card'

<Card><p>Conteúdo</p></Card>
```

## Props

- `children`
- `style`

## Arquivo

- `Card.tsx` — 118 linhas, self-contained, sem dependências externas
- Origem: `CardDoc.tsx` no Design System FIPS
