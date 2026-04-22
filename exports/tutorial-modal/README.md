# TutorialModal

> Componente · DS-FIPS · Copy-paste ready

Modal walkthrough step-by-step com barra de progresso, navegação por teclado (← →), dots clicáveis, scroll automático.

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
import { TutorialModal } from './TutorialModal'

<TutorialModal open={open} onClose={close} title="Tutorial" steps={[{title:"Passo 1",description:"..."}]} />
```

## Props

- `open`
- `onClose`
- `title`
- `subtitle`
- `steps`

## Arquivo

- `TutorialModal.tsx` — 183 linhas, self-contained, sem dependências externas
- Origem: `DialogDoc.tsx` no Design System FIPS
