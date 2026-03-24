import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  AppWindow,
  BarChart3,
  Bell,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FilePlus,
  FileText,
  FolderOpen,
  Home,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  Shield,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { PatternGuidelines } from '../../components/PatternGuidelines'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { FipsLogo } from '../../../components/brand/FipsLogo'
import { cn } from '../../../lib/cn'

const standaloneItems = [
  { icon: Home, label: 'Home' },
  { icon: FilePlus, label: 'Nova Solicitação' },
  { icon: FileText, label: 'Minhas Solicitações' },
  { icon: FolderOpen, label: 'Banco de Projetos' },
]

const menuGroups = [
  {
    id: 'governanca',
    label: 'Governança',
    icon: Shield,
    items: [
      { icon: BarChart3, label: 'Painel de Análise' },
      { icon: ClipboardCheck, label: 'Priorização', active: true },
      { icon: Users, label: 'Portal do Comitê' },
      { icon: Wrench, label: 'Produção' },
    ],
  },
  {
    id: 'painel-ti',
    label: 'Painel TI',
    icon: LayoutDashboard,
    items: [
      { icon: LayoutDashboard, label: 'Acompanhamento' },
      { icon: AppWindow, label: 'Aplicações' },
      { icon: AlertTriangle, label: 'Acessos Órfãos' },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: Briefcase,
    items: [
      { icon: Users, label: 'Gerenciar Usuários' },
    ],
  },
]

const bottomItems = [{ icon: Settings, label: 'Configurações' }]

const headerTabs = ['Home', 'Nova Solicitação', 'Minhas Solicitações', 'Banco de Projetos', 'Painel de Análise']

const heroCards = [
  { label: 'Em andamento', value: '08', color: 'border-l-[var(--color-fips-blue-900)]' },
  { label: 'Concluídos', value: '14', color: 'border-l-[var(--color-success)]' },
  { label: 'Em aprovação', value: '03', color: 'border-l-violet-400' },
  { label: 'Aguardando triagem', value: '05', color: 'border-l-[var(--color-accent-strong)]' },
]

export default function ApplicationShellDemo() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState(() => new Set(menuGroups.map((group) => group.id)))

  const previewFrame = useMemo(
    () =>
      mobile
        ? 'mx-auto w-full max-w-[390px] h-[780px]'
        : 'w-full h-[860px]',
    [mobile],
  )

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((previous) => {
      const next = new Set(previous)
      if (next.has(groupId)) next.delete(groupId)
      else next.add(groupId)
      return next
    })
  }

  const renderShellItem = (
    item: { icon: typeof Home; label: string; active?: boolean },
    isSidebarCollapsed: boolean,
    indented = false,
  ) => {
    const Icon = item.icon

    return (
      <button
        key={item.label}
        type="button"
        className={cn(
          'flex w-full items-center gap-3 rounded-lg transition-all duration-200 hover:bg-white/10 active:bg-white/15',
          isSidebarCollapsed ? 'justify-center px-3 py-2.5' : 'py-2.5',
          indented && !isSidebarCollapsed ? 'pl-10 pr-3' : !isSidebarCollapsed ? 'px-3' : '',
          item.active ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white',
        )}
        title={isSidebarCollapsed ? item.label : undefined}
      >
        <span className={cn('flex shrink-0', item.active ? 'text-[var(--color-accent-strong)]' : '')}>
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        {!isSidebarCollapsed ? <span className="truncate text-sm font-medium">{item.label}</span> : null}
      </button>
    )
  }

  const renderShellGroup = (
    group: (typeof menuGroups)[number],
    isSidebarCollapsed: boolean,
  ) => {
    const GroupIcon = group.icon
    const isExpanded = expandedGroups.has(group.id)

    if (isSidebarCollapsed) {
      return (
        <div key={group.id}>
          <div className="mx-3 my-2 border-t border-white/10" />
          <div className="space-y-0.5">
            {group.items.map((item) => renderShellItem(item, true))}
          </div>
        </div>
      )
    }

    return (
      <div key={group.id} className="mt-2">
        <div className="mx-3 mb-1 border-t border-white/10" />
        <button
          type="button"
          onClick={() => toggleGroup(group.id)}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-white/40 transition-all duration-200 hover:bg-white/5 hover:text-white/60"
        >
          <span className="flex shrink-0 opacity-70">
            <GroupIcon className="h-4 w-4" aria-hidden />
          </span>
          <span className="flex-1 text-left text-[11px] font-bold uppercase tracking-widest">
            {group.label}
          </span>
          <ChevronDown
            className={cn(
              'h-3.5 w-3.5 opacity-50 transition-transform duration-200',
              isExpanded ? '' : '-rotate-90',
            )}
            aria-hidden
          />
        </button>
        <div
          className={cn(
            'overflow-hidden transition-all duration-200',
            isExpanded ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className="mt-0.5 space-y-0.5">
            {group.items.map((item) => renderShellItem(item, false, true))}
          </div>
        </div>
      </div>
    )
  }

  const renderShellSidebar = (drawer = false) => {
    const isSidebarCollapsed = drawer ? false : collapsed

    return (
      <aside
        className={cn(
          'flex h-full flex-col bg-[#002a68] text-white shadow-[4px_0_24px_rgba(0,26,64,0.28)] transition-[width] duration-300 ease-in-out',
          drawer ? 'w-[270px]' : isSidebarCollapsed ? 'w-16' : 'w-64',
        )}
      >
        <div
          className={cn(
            'flex h-16 items-center border-b border-white/10',
            isSidebarCollapsed ? 'justify-center px-3' : 'px-4',
          )}
        >
          {isSidebarCollapsed ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white p-0.5">
              <FipsLogo variant="symbol" inverted={false} className="[&_img]:h-6 [&_img]:w-6" />
            </div>
          ) : (
            <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white p-0.5">
                <FipsLogo variant="symbol" inverted={false} className="[&_img]:h-6 [&_img]:w-6" />
              </div>
              <span className="text-lg text-white/50">|</span>
              <span className="truncate text-lg font-semibold text-white">Governança TI</span>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <div className="space-y-0.5">
            {standaloneItems.map((item) => renderShellItem(item, isSidebarCollapsed))}
          </div>
          {menuGroups.map((group) => renderShellGroup(group, isSidebarCollapsed))}
        </nav>

        <div className="border-t border-white/10 px-2 pb-1 pt-2">
          <div className="space-y-0.5">
            {bottomItems.map((item) => renderShellItem(item, isSidebarCollapsed))}
          </div>
        </div>

        {!drawer ? (
          <div className="hidden border-t border-white/10 p-2 md:block">
            <button
              type="button"
              onClick={() => setCollapsed((value) => !value)}
              className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="h-5 w-5" aria-hidden />
              ) : (
                <>
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                  <span className="text-sm">Recolher</span>
                </>
              )}
            </button>
          </div>
        ) : null}

        <div className="border-t border-white/10 p-2">
          <div
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-white/50',
              isSidebarCollapsed ? 'justify-center' : 'justify-start',
            )}
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {!isSidebarCollapsed ? <span className="text-xs">v1.1.1</span> : null}
          </div>
        </div>
      </aside>
    )
  }

  return (
    <DocPage
      title="Padrão: Application Shell"
      description="Shell principal para produtos FIPS: sidebar institucional, header branco, navegação secundária por abas e hero operacional. Baseado no padrão aprovado em aplicações reais."
    >
      <DemoSection
        title="Preview interativo"
        className="!p-0 overflow-hidden"
        reference={`<div className="flex min-h-svh bg-[var(--color-surface-muted)]">
  <aside className="bg-[#002a68]">
    {/* topo com símbolo FIPS em box branco + título do produto */}
  </aside>
  <div className="flex flex-1 flex-col">
    <header className="border-b border-[var(--color-border)] bg-white">
      <Input type="search" leftIcon={<Search />} />
    </header>
    <nav className="border-b border-[var(--color-border)] bg-white">
      {/* abas secundárias com underline laranja */}
    </nav>
    <main className="bg-[var(--color-surface-muted)]">
      {/* hero + KPIs + conteúdo */}
    </main>
  </div>
</div>`}
        referenceLabel="Estrutura-base do shell"
      >
        <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-[var(--color-fg)]">Shell de aplicação</p>
            <p className="text-sm text-[var(--color-fg-muted)]">
              Use os toggles para revisar sidebar expandida/recolhida e comportamento mobile.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant={mobile ? 'secondary' : 'primary'} size="sm" onClick={() => setMobile((value) => !value)}>
              {mobile ? 'Voltar desktop' : 'Simular mobile'}
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setCollapsed((value) => !value)}>
              {collapsed ? 'Expandir menu' : 'Recolher menu'}
            </Button>
            {mobile ? (
              <Button variant="outline" size="sm" onClick={() => setMobileOpen((value) => !value)}>
                {mobileOpen ? 'Fechar drawer' : 'Abrir drawer'}
              </Button>
            ) : null}
          </div>
        </div>

        <div className="p-5">
          <div className={cn('overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-float)]', previewFrame)}>
            <div className="relative flex h-full bg-[var(--color-surface-muted)]">
              {!mobile ? renderShellSidebar() : null}

              {mobile && mobileOpen ? (
                <>
                  <div className="absolute inset-0 z-10 bg-slate-950/40" />
                  <div className="absolute inset-y-0 left-0 z-20">{renderShellSidebar(true)}</div>
                </>
              ) : null}

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                  <div className="flex items-center gap-3 px-4 py-3">
                    {mobile ? (
                      <Button variant="secondary" size="icon" onClick={() => setMobileOpen((value) => !value)}>
                        <Menu className="h-4 w-4" aria-hidden />
                      </Button>
                    ) : null}
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <FipsLogo inverted={false} variant="horizontal" className="hidden md:block" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">Painel Governança TI</p>
                        <p className="truncate font-heading text-lg font-semibold text-[var(--color-fg)]">Governança de Projetos de TI</p>
                      </div>
                    </div>
                    <div className="hidden w-full max-w-xs md:block">
                      <Input
                        type="search"
                        placeholder="Buscar..."
                        leftIcon={<Search className="h-4 w-4" aria-hidden />}
                        readOnly
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" className="rounded-full p-2 text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-soft)]">
                        <Bell className="h-4 w-4" aria-hidden />
                      </button>
                      <div className="flex items-center gap-2 rounded-full bg-[var(--color-surface-soft)] px-2 py-1.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-semibold text-white">
                          LC
                        </span>
                        {!mobile ? (
                          <span className="hidden text-sm text-[var(--color-fg-muted)] xl:block">Luiz Claudio</span>
                        ) : null}
                        <ChevronDown className="h-4 w-4 text-[var(--color-fg-muted)]" aria-hidden />
                      </div>
                    </div>
                  </div>

                  <div className="hidden items-center gap-1 overflow-x-auto border-t border-[var(--color-border)] px-4 md:flex">
                    {headerTabs.map((tab, index) => (
                      <button
                        key={tab}
                        type="button"
                        className={cn(
                          'relative inline-flex min-h-11 items-center gap-2 px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                          index === 0
                            ? 'text-[var(--color-primary)]'
                            : 'text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]',
                        )}
                      >
                        {tab}
                        {index === 0 ? (
                          <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[var(--color-accent-strong)]" />
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-auto bg-[var(--color-surface-muted)]">
                  <section className="relative overflow-hidden bg-gradient-to-r from-[var(--color-sidebar-deep)] via-[var(--color-primary)] to-[var(--color-secondary)] px-5 py-10 text-white md:px-8 md:py-14">
                    <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_62%)] md:block" />
                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                      <Badge variant="warning" className="border-0 bg-white/14 text-white">
                        Sistema de Governança de TI
                      </Badge>
                      <h2 className="mt-4 font-heading text-3xl font-semibold md:text-4xl">
                        Governança de <span className="text-[var(--color-accent)]">Projetos de TI</span>
                      </h2>
                      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
                        Simplifique a gestão de demandas de tecnologia. Da solicitação ao deploy,
                        acompanhe cada etapa com transparência e eficiência.
                      </p>
                      <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Button variant="accent">Nova Solicitação</Button>
                        <Button
                          variant="outline"
                          className="border-white/60 bg-transparent text-white hover:bg-white/10"
                        >
                          Ver meus projetos
                        </Button>
                      </div>
                    </div>
                  </section>

                  <div className="mx-auto max-w-5xl px-4 pb-10">
                    <div className="-mt-6 grid gap-4 md:grid-cols-4">
                      {heroCards.map((card) => (
                        <Card key={card.label} className={cn('border-l-4', card.color)}>
                          <CardContent className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-medium text-[var(--color-fg-muted)]">{card.label}</p>
                              <p className="mt-1 font-heading text-3xl font-semibold text-[var(--color-fg)]">{card.value}</p>
                            </div>
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-surface-muted)] text-[var(--color-primary)]">
                              <Sparkles className="h-5 w-5" aria-hidden />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="mt-8 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
                      <Card>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm font-semibold text-[var(--color-fg)]">Resumo operacional</p>
                            <p className="text-sm text-[var(--color-fg-muted)]">
                              Hero institucional, KPIs logo abaixo da dobra e conteúdo principal com bastante respiro.
                            </p>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-3">
                            {['Backlog priorizado', 'Análises ativas', 'Filas por time'].map((item) => (
                              <div key={item} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4 text-sm font-medium text-[var(--color-fg)]">
                                {item}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="space-y-3">
                          <p className="text-sm font-semibold text-[var(--color-fg)]">Elementos do shell</p>
                          {['Sidebar institucional', 'Header branco com busca', 'Abas secundárias', 'Hero + KPIs'].map((item) => (
                            <div key={item} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-fg-muted)]">
                              {item}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DemoSection>

      <PatternGuidelines
        rules={[
          'Sidebar escura e persistente no desktop; drawer sobreposto no mobile.',
          'Header branco com título contextual, busca e avatar do usuário.',
          'Abas secundárias aparecem abaixo do header para navegação rápida entre módulos.',
          'A primeira dobra deve combinar hero institucional e KPIs com leitura imediata.',
        ]}
        required={[
          'Contraste alto na sidebar e active state claro com underline/acento laranja.',
          'Busca e ações de usuário no topo direito do header.',
          'Transição coerente entre hero, KPIs e conteúdo sem quebra brusca.',
          'Comportamento recolhido e mobile legíveis sem perder acesso às rotas.',
        ]}
        optional={[
          'Badge contextual no hero.',
          'Avatar com iniciais quando não houver foto.',
          'Blocos de resumo rápidos logo após os KPIs.',
        ]}
        avoid={[
          'Misturar muitos fundos diferentes entre header, tabs e conteúdo.',
          'Usar sidebar clara ou neutra, quebrando o padrão institucional aprovado.',
          'Esconder o active state da navegação em hover muito discreto.',
        ]}
      />
    </DocPage>
  )
}
