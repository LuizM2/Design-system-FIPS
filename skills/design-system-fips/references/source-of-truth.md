# Source Of Truth

## Ordem de prioridade

1. `docs/Brandbook PPT.pdf`
2. `public/guias/guia-design-system-fips.md`
3. Tokens e CSS globais do projeto
4. Componentes reutilizáveis de `src/components/ui/`
5. Padrões documentados em `src/docs/pages/`

Se houver conflito:

- Identidade de marca: o Brandbook vence.
- Implementação de produto: o código reutilizável do repositório vence.
- Material promocional/documental: usar o guia e as páginas de documentação como referência visual complementar.

## Mapa do repositório

### Marca e identidade

- `docs/Brandbook PPT.pdf`
- `public/brand/`
- `src/components/brand/FipsLogo.tsx`

### Tokens e CSS globais

- `src/styles/globals.css`
- `src/tokens/colors.ts`
- `src/tokens/spacing.ts`
- `src/tokens/typography.ts`

### Componentes reutilizáveis

- `src/components/ui/index.ts`
- `src/components/ui/button.tsx`
- `src/components/ui/button-variants.ts`
- `src/components/ui/badge.tsx`
- `src/components/ui/badge-variants.ts`
- `src/components/ui/card.tsx`
- `src/components/ui/field.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/table.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/drawer.tsx`
- `src/components/ui/progress.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/tooltip.tsx`

### Composites e padrões

- `src/composites/PageHero.tsx`
- `src/docs/pages/patterns/ApplicationShellDemo.tsx`
- `src/docs/pages/patterns/DashboardDemo.tsx`
- `src/docs/pages/patterns/DataListingDemo.tsx`
- `src/docs/pages/patterns/FormWorkspaceDemo.tsx`
- `src/docs/pages/patterns/ModalWorkflowDemo.tsx`
- `src/docs/pages/patterns/HeroHeaderDoc.tsx` (página **Hero** em `/docs/patterns/hero`)
- `src/docs/pages/GovernancePage.tsx`

## Regras portáteis

- Nome oficial: `Design System FIPS`. Evite abreviar isso em documentação externa.
- Se existir componente no design system, use o componente. Não replique a UI com CSS local.
- Se faltar uma variante, evolua o design system primeiro.
- `PageHero` é o header padrão de módulo.
- Formulários seguem `Field` mais controle (`Input`, `Select`, `Textarea`).
- Botões, badges, cards e tabelas herdam tokens globais. Não troque a paleta por conveniência.

## Buscas rápidas

- `rg -n "azulProfundo|amareloOuro|verdeFloresta" src public`
- `rg -n "Field density|density =" src/components/ui`
- `rg -n "Padrão:" src/docs/pages/patterns`
- `rg -n "Governança|regra de ouro|Não" src/docs/pages/GovernancePage.tsx`
