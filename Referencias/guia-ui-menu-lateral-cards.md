# Guia detalhado para criar menus laterais, cards e paginas no frontend

## Objetivo

Este documento descreve, em detalhe, como o frontend deste projeto organiza:

- menu lateral principal;
- cabecalhos desktop e mobile;
- navegacao por abas;
- cards de KPI, lista, acao rapida e paineis laterais;
- estrutura de pagina com responsividade;
- fluxo para adicionar uma nova tela sem quebrar o padrao visual.

O foco aqui nao e explicar UI de forma generica, e sim documentar como fazer isso dentro da arquitetura real do projeto `fips-suprimentos`.

---

## 1. Arquivos que formam a base da interface

Os arquivos mais importantes para esse assunto sao:

- `client/src/App.tsx`
  Responsavel pelo shell principal da aplicacao autenticada: sidebar, header, tabs e area de rotas.

- `client/src/components/layout/Sidebar.tsx`
  Implementa o menu lateral principal, com suporte a grupos, permissao, colapso e mobile overlay.

- `client/src/components/layout/AppHeader.tsx`
  Cabecalho visual da marca no desktop.

- `client/src/components/layout/Header.tsx`
  Area de notificacoes e menu do usuario.

- `client/src/components/layout/TabNavigation.tsx`
  Navegacao horizontal secundaria exibida no desktop.

- `client/src/components/layout/PageHeader.tsx`
  Header simples para paginas internas.

- `client/src/components/layout/ModuleHeader.tsx`
  Header de modulo com icone, titulo e subtitulo.

- `client/src/components/ui/Card.tsx`
  Componente base para cards, com `Card`, `CardHeader`, `CardBody` e `CardFooter`.

- `client/src/pages/Home.tsx`
  Melhor referencia para cards de dashboard, cards clicaveis e composicao de secoes.

- `client/src/pages/EscopoNovo.tsx`
  Boa referencia para grid assimetrico e bloco principal com painel lateral.

- `client/src/pages/EscopoEditar.tsx`
  Boa referencia para lateral direita sticky com cards de navegacao e checklist.

---

## 2. Stack e convencoes tecnicas da UI

O frontend usa:

- React 18;
- React Router;
- Tailwind CSS 4;
- `lucide-react` para icones;
- `framer-motion` para animacao leve nos cards;
- utilitario `cn()` em `client/src/utils/helpers.ts` para combinar classes.

### Paleta principal usada hoje

- Azul institucional principal: `#002a68`
- Laranja de destaque: `#f6921e`
- Azul de apoio/gradiente: `#0090d0`
- Fundo claro de aplicacao: `#F7FAFC`, `#f3f6fb`
- Bordas claras: `border-slate-200/70`, `border-gray-200`

### Linguagem visual recorrente

- cantos arredondados com `rounded-lg`, `rounded-xl` e `rounded-2xl`;
- sombras suaves, sem contraste pesado;
- cards brancos com borda clara;
- destaques ativos em azul e laranja;
- fundo da pagina neutro, com uso pontual de gradiente em areas hero e blocos especiais.

---

## 3. Como o layout global da aplicacao funciona

O shell principal da aplicacao autenticada mora em `client/src/App.tsx`.

Estrutura simplificada:

```tsx
<div className="flex h-screen min-h-0 bg-[#F7FAFC] overflow-hidden">
  <Sidebar />

  <div className="flex-1 flex min-h-0 flex-col overflow-hidden w-full">
    <header className="md:hidden">...</header>
    <header className="hidden md:flex">...</header>

    <div className="hidden md:block">
      <TabNavigation />
    </div>

    <main className="min-h-0 flex-1 overflow-auto overscroll-contain">
      <Routes />
    </main>
  </div>
</div>
```

### Por que essa estrutura e importante

- `h-screen` faz a aplicacao ocupar a altura total da viewport.
- `overflow-hidden` no container raiz impede barras de rolagem duplas.
- `min-h-0` nos containers intermediarios e essencial para que o `main` consiga rolar corretamente.
- O scroll principal acontece no `main`, nao no `body`.
- O menu lateral fica separado do conteudo, o que facilita responsividade e persistencia da navegacao.

### Comportamento de navegação

No desktop:

- sidebar fixa na esquerda;
- header superior completo;
- barra de tabs logo abaixo do header;
- conteudo rola dentro de `main`.

No mobile:

- sidebar vira um painel sobreposto;
- existe um header simplificado com botao hamburguer;
- a navegacao por tabs nao aparece;
- a prioridade e liberar espaco para o conteudo.

---

## 4. Como o menu lateral foi construido

O menu lateral esta em `client/src/components/layout/Sidebar.tsx`.

### 4.1. Modelo de dados

O componente nao desenha itens "na mao". Ele parte de tipos e listas bem definidas:

```tsx
export type Screen =
  | 'home'
  | 'dashboard-suprimentos'
  | 'novo-escopo'
  | 'escopos'
  | 'aprovacao-area'
  | 'aprovacao-suprimentos'
  | 'gerenciar-usuarios'
  | 'configuracao-agente'
  | 'configuracoes'
  | 'hierarquia-admin';
```

Cada item do menu tem:

- `screen`: identificador interno da tela;
- `path`: rota do React Router;
- `label`: texto exibido;
- `icon`: icone React;
- `permission`: permissao opcional;
- `roles`: papeis opcionais;
- `featureFlag`: flag opcional.

Existem tres blocos de navegacao:

- `standaloneItems`
  Itens soltos no topo, como `Home` e `Escopos`.

- `menuGroups`
  Grupos expansivos, como `Suprimentos` e `Admin`.

- `bottomItems`
  Itens no rodape do menu, como `Configuracoes`.

### 4.2. Estados internos da sidebar

A sidebar trabalha com alguns estados importantes:

- `collapsed`
  Vem de `App.tsx` e controla se o menu fica estreito (`w-16`) ou aberto (`w-64`).

- `mobileOpen`
  Vem de `App.tsx` e controla a exibicao da sidebar como overlay no mobile.

- `expandedGroups`
  Estado local do componente para lembrar quais grupos estao abertos.

### 4.3. Como a tela ativa e detectada

O menu precisa saber qual item esta ativo para:

- aplicar destaque visual;
- abrir grupo correto;
- evitar perda de contexto visual para o usuario.

Isso e feito pelo `getActiveScreen()`, que mapeia `location.pathname` para um `Screen`.

Exemplo de regra:

```tsx
if (path === '/escopos-dashboard') return 'dashboard-suprimentos';
if (path === '/escopos/novo' || path === '/nova-solicitacao') return 'novo-escopo';
if (path === '/escopos' || path === '/minhas-solicitacoes') return 'escopos';
```

### Ponto de atencao

Hoje esse mapeamento aparece em dois lugares:

- `client/src/components/layout/Sidebar.tsx`
- `client/src/App.tsx`

Ou seja: ao criar nova tela, nao basta mexer em um ponto. E preciso atualizar os dois para manter menu e tabs sincronizados.

### 4.4. Controle de acesso

Antes de renderizar um item, a sidebar chama `canAccessItem()`.

A regra atual e:

- se `featureFlag === false`, nao renderiza;
- se usuario nao autenticado, so libera `home`;
- se item nao exige permissao nem role, renderiza;
- se o usuario possui a permissao, renderiza;
- se o usuario possui uma das roles, renderiza.

Isso e importante porque o menu ja nasce filtrado. O usuario nao ve opcoes que nao pode acessar.

### 4.5. Estrutura visual da sidebar

O menu e montado com tres blocos:

1. topo com logo e nome do modulo;
2. navegacao principal com scroll vertical;
3. rodape com botao de colapsar e item de versao/changelog.

Trecho conceitual:

```tsx
<aside className="bg-[#002a68] text-white flex flex-col h-full">
  <div>Logo e titulo</div>
  <nav className="flex-1 py-3 px-2 overflow-y-auto">Itens</nav>
  <div>Rodape do menu</div>
</aside>
```

### 4.6. Comportamento colapsado

Quando `collapsed` e `true`:

- a largura vai para `w-16`;
- o label some;
- o icone fica centralizado;
- o `title` do botao recebe o texto do item para ajudar no hover.

Isso reduz a ocupacao horizontal sem remover a navegacao.

### 4.7. Comportamento expandido

Quando `collapsed` e `false`:

- a largura vai para `w-64`;
- os labels aparecem;
- grupos ganham cabeçalhos com `ChevronDown`;
- itens internos podem usar recuo (`pl-10`) para indicar hierarquia.

### 4.8. Grupos expansivos

Os grupos sao renderizados por `renderGroup()`.

No desktop expandido:

- aparece uma divisoria;
- aparece o nome do grupo em uppercase;
- o clique alterna `expandedGroups`;
- os itens internos aparecem em uma area com `max-h` animada.

No modo colapsado:

- o grupo nao mostra o cabecalho;
- os itens aparecem direto, separados por divisoria.

### 4.9. Navegacao no mobile

No mobile a sidebar nao fica fixa.

Ela aparece assim:

```tsx
{mobileOpen && (
  <div className="md:hidden fixed inset-0 z-50 flex">
    <div className="fixed inset-0 bg-black/50" onClick={onMobileClose} />
    <div className="relative z-50 flex">{sidebarContent}</div>
  </div>
)}
```

Isso cria:

- backdrop escuro;
- fechamento ao clicar fora;
- menu sobreposto acima do conteudo;
- reaproveitamento do mesmo `sidebarContent`.

Essa abordagem e melhor do que manter duas sidebars diferentes porque:

- reduz duplicacao;
- preserva o mesmo conjunto de itens;
- facilita manutencao.

---

## 5. Passo a passo para adicionar uma nova entrada no menu lateral

Se quisermos criar uma nova tela, por exemplo `Relatorios`, o fluxo correto e:

### 5.1. Criar a pagina

Criar um arquivo em `client/src/pages/Relatorios.tsx`.

Exemplo base:

```tsx
import { Card, CardBody, CardHeader } from "../components/ui";

export default function Relatorios() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader title="Relatorios" subtitle="Visao consolidada do modulo" />
        <CardBody>
          <p className="text-sm text-slate-600">Conteudo da pagina.</p>
        </CardBody>
      </Card>
    </div>
  );
}
```

### 5.2. Registrar a rota em `App.tsx`

Adicionar import lazy:

```tsx
const RelatoriosPage = lazy(() => import('./pages/Relatorios'));
```

Adicionar a rota:

```tsx
<Route path="/relatorios" element={<RelatoriosPage />} />
```

### 5.3. Adicionar o novo `Screen`

Em `Sidebar.tsx`, incluir:

```tsx
| 'relatorios'
```

### 5.4. Mapear a rota para tela ativa

Em `Sidebar.tsx`:

```tsx
if (path === '/relatorios') return 'relatorios';
```

Em `App.tsx`, no `getCurrentScreen()`:

```tsx
if (path === '/relatorios') return 'relatorios';
```

### 5.5. Inserir o item no menu

Escolha onde ele entra:

- em `standaloneItems`, se for item principal;
- em `menuGroups`, se fizer parte de um bloco;
- em `bottomItems`, se for configuracao/apoio.

Exemplo:

```tsx
{
  screen: 'relatorios',
  path: '/relatorios',
  label: 'Relatorios',
  icon: <BarChart3 size={20} />,
  roles: ['admin'],
}
```

### 5.6. Se a tela tambem precisa aparecer nas tabs desktop

Em `App.tsx`:

- incluir o item em `mainTabs`;
- incluir o mapeamento em `handleTabChange()`.

Exemplo:

```tsx
{ id: 'relatorios', label: 'Relatorios', icon: <BarChart3 size={16} /> }
```

E no `routes` map:

```tsx
'relatorios': '/relatorios',
```

### 5.7. Testes manuais minimos

Depois de adicionar o item, validar:

- se ele aparece apenas para o perfil correto;
- se fica ativo ao entrar na rota;
- se abre corretamente no mobile;
- se continua visivel com sidebar colapsada;
- se a navegacao por tabs nao ficou inconsistente.

---

## 6. Como os cards foram construidos

O sistema de cards esta em `client/src/components/ui/Card.tsx`.

### 6.1. Estrutura base

O projeto trabalha com quatro pecas:

- `Card`
- `CardHeader`
- `CardBody`
- `CardFooter`

### 6.2. O componente `Card`

O `Card` e o container principal.

Responsabilidades:

- fundo branco;
- cantos arredondados;
- borda clara;
- sombra padrao;
- hover com sombra mais forte;
- animacao de entrada opcional.

Trecho resumido:

```tsx
<Component
  className={cn(
    'bg-white rounded-2xl border border-slate-200/70',
    'shadow-[...]',
    'transition-all duration-200 hover:shadow-[...]',
    className
  )}
>
  {children}
</Component>
```

### 6.3. Animacao

Por padrao, `Card` usa `framer-motion` com:

- `opacity` de `0` para `1`;
- `y` de `10` para `0`;
- `duration` de `0.3`.

Isso e bom para dashboards, listas e telas de leitura.

Quando nao queremos animacao, usamos:

```tsx
<Card animate={false}>...</Card>
```

Esse padrao aparece bastante em formularios densos e em laterais sticky, onde animacao pode atrapalhar.

### 6.4. `CardHeader`

O `CardHeader` serve para:

- titulo;
- subtitulo;
- acao no canto direito;
- separar o topo com borda inferior.

Props principais:

- `title`
- `subtitle`
- `action`

Exemplo:

```tsx
<CardHeader
  title="Fila de Trabalho"
  subtitle="Proximos 5 escopos pendentes"
  action={<Button size="sm">Atualizar</Button>}
/>
```

Se nao passarmos `title`/`subtitle`/`action`, ele aceita `children` customizados.

### 6.5. `CardBody`

O `CardBody` e a area de conteudo, com padding padrao `px-6 py-4`.

Ele pode receber `className` para:

- virar grid;
- aumentar ou reduzir padding;
- virar lista com `space-y-*`;
- alinhar conteudo.

Exemplo:

```tsx
<CardBody className="space-y-4">
  ...
</CardBody>
```

### 6.6. `CardFooter`

O `CardFooter` fecha o card com:

- borda superior;
- fundo levemente acinzentado;
- cantos inferiores arredondados.

Use quando houver:

- acoes finais;
- resumo final;
- rodape padrao do bloco.

---

## 7. Tipos de card usados no projeto

### 7.1. Card de KPI

Usado em `Home.tsx` para indicadores numericos.

Padrao:

- icone em bloco arredondado;
- titulo pequeno;
- numero grande;
- subtitulo auxiliar.

Exemplo estrutural:

```tsx
<Card className="shadow-lg border-0">
  <CardBody className="flex items-center gap-3">
    <div className="p-3 rounded-xl bg-gray-100">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <div>
      <p className="text-xs text-gray-500">Pendentes</p>
      <p className="text-2xl font-bold text-[#002a68]">12</p>
      <p className="text-xs text-gray-500">Minha alcada</p>
    </div>
  </CardBody>
</Card>
```

### 7.2. Card clicavel de acesso rapido

Tambem usado em `Home.tsx`.

Padrao:

- card inteiro clicavel;
- hover com `-translate-y-1`;
- icone colorido;
- titulo curto;
- subtitulo explicativo.

Exemplo:

```tsx
<Card
  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
  onClick={() => navigate("/escopos")}
>
  <CardBody className="text-center">
    ...
  </CardBody>
</Card>
```

### 7.3. Card de lista simples

Usado para fila de trabalho, alertas e blocos informativos.

Padrao:

- `CardHeader` com titulo;
- `CardBody` com `space-y-*`;
- itens internos com borda leve e `rounded-lg`.

### 7.4. Card hero ou CTA

Usado na parte final da `Home`.

Padrao:

- fundo gradiente;
- texto branco;
- `overflow-hidden`;
- botoes de acao no corpo.

Exemplo:

```tsx
<Card className="bg-gradient-to-r from-[#002a68] to-[#0090d0] text-white overflow-hidden">
  <CardBody className="py-8 md:py-10 px-6 md:px-10">
    ...
  </CardBody>
</Card>
```

### 7.5. Card lateral de contexto

Usado em `EscopoEditar.tsx` na coluna direita sticky.

Padrao:

- `animate={false}`;
- fundo branco levemente translucido;
- borda sutil;
- conteudo operacional: navegacao, checklist, saude do formulario.

Exemplo:

```tsx
<Card animate={false} className="overflow-hidden border-slate-200/80 bg-white/95">
  <CardHeader title="Navegacao rapida" subtitle="Va direto ao bloco que precisa revisar." />
  <CardBody className="space-y-2">
    ...
  </CardBody>
</Card>
```

---

## 8. Como fazer paineis laterais dentro das paginas

Quando a pagina precisa de uma area principal e uma lateral de apoio, o projeto nao cria um segundo menu igual ao principal. Em vez disso, usa grid com uma coluna complementar.

### 8.1. Padrao recomendado

Exemplo inspirado em `EscopoNovo.tsx`:

```tsx
<div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] xl:items-start">
  <SectionPrincipal />
  <PainelLateral />
</div>
```

Esse padrao e bom porque:

- no mobile tudo empilha em uma coluna;
- no desktop a lateral ganha largura controlada;
- o conteudo principal continua prioritario;
- nao dependemos de breakpoints improvisados.

### 8.2. Quando a lateral precisa acompanhar o scroll

Exemplo de `EscopoEditar.tsx`:

```tsx
<aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</aside>
```

O que isso faz:

- `xl:sticky` fixa a lateral no viewport em telas grandes;
- `top-6` deixa um respiro superior;
- `self-start` evita comportamento estranho em grids altos.

### 8.3. Tipos de informacao ideais para lateral direita

Boas candidatas:

- navegacao rapida por secao;
- checklist;
- resumo de validacao;
- status de salvamento;
- contexto operacional curto;
- acoes secundarias.

Nao e ideal colocar na lateral:

- formularios longos;
- tabelas largas;
- conteudo que exige leitura extensa;
- controles criticos que somem no mobile sem alternativa.

---

## 9. Como montar uma pagina padrao com cards

### 9.1. Estrutura externa recomendada

Para paginas de dashboard ou consulta:

```tsx
<div className="min-h-screen bg-[#f3f6fb]">
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    ...
  </section>
</div>
```

Para formularios internos:

```tsx
<div className="px-4 py-6 md:px-6">
  <form className="mx-auto max-w-[1480px] space-y-6">
    ...
  </form>
</div>
```

### 9.2. Larguras e espacamentos recorrentes

Padroes encontrados no projeto:

- `max-w-7xl`
  Bom para dashboard e paginas institucionais.

- `max-w-[1480px]`
  Bom para formularios grandes com muita informacao.

- `px-4 sm:px-6 lg:px-8`
  Padrao responsivo de container.

- `space-y-4`, `space-y-6`
  Distancia vertical entre blocos.

- `gap-4`, `gap-6`
  Distancia horizontal/vertical entre cards em grid.

### 9.3. Grids mais usados

- KPIs:

```tsx
grid grid-cols-2 lg:grid-cols-4 gap-4
```

- Cards de fluxo:

```tsx
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4
```

- Conteudo + lateral:

```tsx
grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]
```

### 9.4. Headers de pagina

Quando a pagina so precisa de um topo simples:

- `PageHeader`

Quando a pagina representa um modulo mais institucional:

- `ModuleHeader`

Quando o topo faz parte do proprio card:

- `CardHeader`

### Regra pratica

- se o topo pertence ao layout da pagina inteira, use `PageHeader` ou `ModuleHeader`;
- se o topo pertence a um bloco especifico, use `CardHeader`.

---

## 10. Receita completa para criar uma nova pagina com menu lateral e cards

Exemplo de fluxo completo para uma nova tela administrativa.

### 10.1. Criar a tela

```tsx
import { BarChart3 } from "lucide-react";
import { ModuleHeader } from "../components/layout";
import { Card, CardBody, CardHeader } from "../components/ui";

export default function Relatorios() {
  return (
    <div className="bg-[#f3f6fb] min-h-screen">
      <ModuleHeader
        icon={BarChart3}
        title="Relatorios"
        subtitle="Analise consolidada das demandas"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card><CardBody>KPIs</CardBody></Card>
          <Card><CardBody>KPIs</CardBody></Card>
          <Card><CardBody>KPIs</CardBody></Card>
          <Card><CardBody>KPIs</CardBody></Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Card>
            <CardHeader title="Tabela principal" subtitle="Dados consolidados" />
            <CardBody>Conteudo principal</CardBody>
          </Card>

          <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
            <Card animate={false}>
              <CardHeader title="Filtros" subtitle="Refine a consulta" />
              <CardBody>Filtros e resumo</CardBody>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
```

### 10.2. Registrar a rota

Atualizar `App.tsx`.

### 10.3. Registrar o item da sidebar

Atualizar `Sidebar.tsx`.

### 10.4. Registrar a tab, se fizer sentido

Atualizar `mainTabs` e `handleTabChange()` em `App.tsx`.

### 10.5. Revisar responsividade

Validar:

- mobile em 1 coluna;
- tablet com cards sem esmagar conteudo;
- desktop com lateral proporcional;
- menu mobile abrindo e fechando corretamente.

---

## 11. Regras de UX e consistencia que vale preservar

### 11.1. Nao recriar card "na unha" sem necessidade

Se o bloco e visualmente um card, comece por `Card`, `CardHeader` e `CardBody`.

Isso evita:

- sombras diferentes entre telas;
- paddings inconsistentes;
- bordas e raios fora do padrao.

### 11.2. Nao duplicar navegacao em componentes paralelos

O menu principal ja centraliza:

- permissao;
- destaque da rota ativa;
- grupos;
- versao;
- comportamento mobile.

Se surgir nova area navegavel, primeiro verificar se ela e:

- uma nova entrada da sidebar;
- uma tab secundaria;
- ou apenas um painel lateral contextual.

### 11.3. Priorizar densidade visual controlada

O projeto trabalha bem com bastante informacao, mas faz isso usando:

- grids claros;
- cards como delimitadores;
- secoes com titulos curtos;
- blocos laterais para contexto secundario.

### 11.4. Estados visuais importantes

Todo card ou item navegavel deve considerar:

- hover;
- ativo;
- desabilitado;
- vazio;
- carregando;
- erro.

### 11.5. Acessibilidade minima recomendada

- botao com `aria-label` quando so houver icone;
- texto de apoio para itens colapsados via `title`;
- contraste suficiente entre texto e fundo;
- nao depender apenas de cor para indicar estado.

---

## 12. Erros comuns ao implementar menu e cards

### Menu lateral

- adicionar rota em `Routes` mas esquecer `Screen`;
- atualizar `Sidebar.tsx` e esquecer `App.tsx`;
- aplicar permissao errada e "sumir" com o item;
- inserir item em grupo sem considerar mobile e colapso;
- esquecer de fechar o menu mobile com `onMobileClose`.

### Cards

- usar `div` solta onde deveria existir `Card`;
- exagerar no `hover:-translate-y-*` em telas densas;
- misturar paddings arbitrarios demais;
- colocar conteudo demais no `CardHeader`;
- animar cards sticky ou de formulario sem necessidade.

### Layout

- esquecer `min-h-0` e gerar scroll quebrado;
- usar grids sem fallback mobile;
- criar laterais fixas sem testar em viewport pequena;
- quebrar largura da pagina com containers inconsistentes.

---

## 13. Checklist final para qualquer nova tela

- A rota existe e renderiza a pagina correta.
- A tela ativa fica destacada no menu.
- A permissao/role esta coerente.
- O item aparece corretamente no desktop e no mobile.
- O layout usa `Card` para blocos principais.
- Os grids colapsam bem no mobile.
- A lateral, se existir, empilha antes de ficar sticky.
- O header da pagina segue um dos padroes do projeto.
- Os estados vazio/carregando/erro foram considerados.
- A pagina visualmente conversa com azul `#002a68` e laranja `#f6921e`.

---

## 14. Referencias internas para consulta rapida

Se precisar de exemplos reais, olhar estes arquivos:

- `client/src/App.tsx`
  Shell geral da aplicacao.

- `client/src/components/layout/Sidebar.tsx`
  Menu lateral completo, com grupos, permissao e mobile.

- `client/src/components/layout/TabNavigation.tsx`
  Tabs do desktop.

- `client/src/components/ui/Card.tsx`
  Base de todos os cards.

- `client/src/pages/Home.tsx`
  Exemplos de hero, KPIs, cards clicaveis, listas e CTA.

- `client/src/pages/EscopoNovo.tsx`
  Exemplo de formulario largo com blocos e painel complementar.

- `client/src/pages/EscopoEditar.tsx`
  Exemplo de lateral direita sticky com cards operacionais.

---

## 15. Resumo pratico

Neste projeto, a forma correta de construir "menu lateral, cards e etc." e seguir esta hierarquia:

1. `App.tsx` define o shell geral.
2. `Sidebar.tsx` define a navegacao lateral principal.
3. `TabNavigation.tsx` define a navegacao horizontal secundaria no desktop.
4. `Card.tsx` define a base visual dos blocos.
5. As paginas montam seus conteudos combinando cards, grids responsivos e, quando necessario, paineis laterais contextuais.

Se a nova necessidade for navegacao global, mexemos em `Sidebar.tsx` e `App.tsx`.

Se a nova necessidade for organizacao de conteudo dentro da pagina, usamos `Card`, `CardHeader`, `CardBody` e grids responsivos.

Se a nova necessidade for contexto complementar, usamos uma lateral direita com `aside` e cards sticky, sem transformar isso em um segundo menu principal.
