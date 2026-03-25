import { useState, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  AppWindow,
  Bell,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
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
  Wrench,
} from 'lucide-react'
import { DemoSection, DocPage } from '../../components/DocPage'
import { PatternGuidelines } from '../../components/PatternGuidelines'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { FipsLogo } from '../../../components/brand/FipsLogo'
import { cn } from '../../../lib/cn'

type ViewportMode = 'desktop' | 'tablet' | 'mobile'

type ShellItem = {
  icon: LucideIcon
  label: string
  active?: boolean
}

type ShellGroup = {
  id: string
  label: string
  icon: LucideIcon
  items: ShellItem[]
}

type MetricCard = {
  label: string
  value: string
  icon: LucideIcon
  border: string
  iconBg: string
  iconColor: string
}

const HOME_BACKGROUND = '/backgrounds/app-shell-home-trains.png'

const primaryItems: ShellItem[] = [
  { icon: Home, label: 'Home', active: true },
  { icon: FilePlus, label: 'Menu 1' },
  { icon: FileText, label: 'Menu 2' },
  { icon: FolderOpen, label: 'Menu 3' },
]

const groupedItems: ShellGroup[] = [
  {
    id: 'categoria-a',
    label: 'Categoria A',
    icon: Shield,
    items: [
      { icon: LayoutDashboard, label: 'Submenu 1' },
      { icon: AppWindow, label: 'Submenu 2' },
      { icon: Wrench, label: 'Submenu 3' },
    ],
  },
  {
    id: 'categoria-b',
    label: 'Categoria B',
    icon: LayoutDashboard,
    items: [
      { icon: FileText, label: 'Submenu 4' },
      { icon: FolderOpen, label: 'Submenu 5' },
      { icon: Sparkles, label: 'Submenu 6' },
    ],
  },
  {
    id: 'categoria-c',
    label: 'Categoria C',
    icon: Briefcase,
    items: [
      { icon: AppWindow, label: 'Submenu 7' },
      { icon: Settings, label: 'Submenu 8' },
    ],
  },
]

const footerItems: ShellItem[] = [{ icon: Settings, label: 'Ajustes' }]

const headerTabs = ['Home', 'Menu 1', 'Menu 2', 'Menu 3', 'Menu 4']

const heroCards: MetricCard[] = [
  {
    label: 'Indicador 1',
    value: '08',
    icon: LayoutDashboard,
    border: 'border-l-[#2c74ff]',
    iconBg: 'bg-[#eaf1ff]',
    iconColor: 'text-[#2c74ff]',
  },
  {
    label: 'Indicador 2',
    value: '12',
    icon: Sparkles,
    border: 'border-l-[#00c64c]',
    iconBg: 'bg-[#e8fbef]',
    iconColor: 'text-[#00a843]',
  },
  {
    label: 'Indicador 3',
    value: '04',
    icon: FileText,
    border: 'border-l-[#a855f7]',
    iconBg: 'bg-[#f4eafe]',
    iconColor: 'text-[#9333ea]',
  },
  {
    label: 'Indicador 4',
    value: '19',
    icon: Menu,
    border: 'border-l-[var(--color-accent-strong)]',
    iconBg: 'bg-[#fff2df]',
    iconColor: 'text-[var(--color-accent-strong)]',
  },
]

const contentHighlights = ['Bloco visual 1', 'Bloco visual 2', 'Bloco visual 3']

const secondaryNotes = [
  'Hierarquia forte entre menu, hero e conteúdo.',
  'Texto claro sobre o fundo azul com imagem visível.',
  'Mockups específicos para desktop, tablet e celular.',
]

function MockupFrame({
  viewport,
  label,
  hint,
  className,
  children,
}: {
  viewport: ViewportMode
  label: string
  hint: string
  className?: string
  children: ReactNode
}) {
  const shellClasses =
    viewport === 'desktop'
      ? 'rounded-[38px] border border-[#16345f] bg-[#081426] p-3'
      : viewport === 'tablet'
        ? 'mx-auto w-full max-w-[860px] rounded-[44px] border border-[#16345f] bg-[#081426] p-3.5'
        : 'mx-auto w-full max-w-[360px] rounded-[42px] border border-[#16345f] bg-[#081426] p-2.5'

  const screenClasses =
    viewport === 'desktop'
      ? 'rounded-[28px]'
      : viewport === 'tablet'
        ? 'rounded-[34px]'
        : 'rounded-[30px]'

  const topLabel = viewport === 'desktop' ? label : `${label} Mockup`

  return (
    <div className={cn('space-y-3', className)}>
      <div className={cn('relative overflow-hidden shadow-[0_30px_80px_rgba(3,15,40,0.35)]', shellClasses)}>
        {viewport === 'desktop' ? (
          <div className="mb-3 flex items-center justify-between px-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.18]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.1]" />
            </div>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-white/[0.45] uppercase">
              {topLabel}
            </span>
          </div>
        ) : null}

        {viewport === 'tablet' ? (
          <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-center">
            <span className="h-1.5 w-16 rounded-full bg-white/[0.15]" />
          </div>
        ) : null}

        {viewport === 'mobile' ? (
          <div className="pointer-events-none absolute inset-x-0 top-2.5 flex justify-center">
            <span className="h-5 w-28 rounded-full bg-[#06101d]" />
          </div>
        ) : null}

        <div className={cn('overflow-hidden bg-[#eef4fb]', screenClasses, viewport !== 'desktop' && 'mt-4')}>
          {children}
        </div>
      </div>

      <div className="space-y-1 px-1">
        <p className="text-sm font-semibold text-[var(--color-fg)]">{label}</p>
        <p className="text-sm text-[var(--color-fg-muted)]">{hint}</p>
      </div>
    </div>
  )
}

function ShellNavItem({
  item,
  collapsed,
  indented = false,
}: {
  item: ShellItem
  collapsed: boolean
  indented?: boolean
}) {
  const Icon = item.icon

  return (
    <button
      type="button"
      className={cn(
        'relative flex w-full items-center gap-3 rounded-xl transition-all duration-200 hover:bg-white/[0.1] active:bg-white/[0.15]',
        collapsed ? 'justify-center px-3 py-2.5' : 'py-2.5',
        indented && !collapsed ? 'pl-10 pr-3' : !collapsed ? 'px-3' : '',
        item.active ? 'bg-white/[0.15] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]' : 'text-white/[0.7] hover:text-white',
        item.active && !collapsed && 'after:absolute after:top-2 after:bottom-2 after:left-0 after:w-0.5 after:rounded-full after:bg-[var(--color-accent-strong)]',
      )}
      title={collapsed ? item.label : undefined}
    >
      <span className={cn('flex shrink-0', item.active ? 'text-[var(--color-accent-strong)]' : '')}>
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      {!collapsed ? <span className="truncate text-sm font-medium">{item.label}</span> : null}
    </button>
  )
}

function ShellSidebar({
  collapsed,
  drawer = false,
  expandedGroups,
  onToggleGroup,
  onToggleSidebar,
}: {
  collapsed: boolean
  drawer?: boolean
  expandedGroups: Set<string>
  onToggleGroup: (groupId: string) => void
  onToggleSidebar?: () => void
}) {
  return (
    <aside
      className={cn(
        'flex h-full flex-col bg-[#002a68] text-white shadow-[4px_0_24px_rgba(0,26,64,0.28)]',
        drawer ? 'w-[252px]' : collapsed ? 'w-[76px]' : 'w-64',
      )}
    >
      <div
        className={cn(
          'flex h-16 items-center border-b border-white/[0.1]',
          collapsed ? 'justify-center px-3' : 'px-4',
        )}
      >
        {collapsed ? (
          <FipsLogo />
        ) : (
          <div className="flex flex-1 items-center gap-2 overflow-hidden">
            <FipsLogo />
            <span className="text-lg text-white/50">|</span>
            <span className="truncate font-semibold text-lg text-white">Aplicativo FIPS</span>
          </div>
        )}
      </div>

      <nav className="sidebar-scroll flex-1 overflow-y-auto px-2 py-3">
        <div className="space-y-0.5">
          {primaryItems.map((item) => (
            <ShellNavItem key={item.label} item={item} collapsed={collapsed} />
          ))}
        </div>

        {groupedItems.map((group) => {
          const GroupIcon = group.icon
          const isExpanded = expandedGroups.has(group.id)

          if (collapsed) {
            return (
              <div key={group.id}>
                <div className="mx-3 my-2 border-t border-white/[0.1]" />
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <ShellNavItem key={item.label} item={item} collapsed />
                  ))}
                </div>
              </div>
            )
          }

          return (
            <div key={group.id} className="mt-2">
              <div className="mx-3 mb-1 border-t border-white/[0.1]" />
              <button
                type="button"
                onClick={() => onToggleGroup(group.id)}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-white/[0.4] transition-all duration-200 hover:bg-white/[0.05] hover:text-white/[0.6]"
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
                  {group.items.map((item) => (
                    <ShellNavItem key={item.label} item={item} collapsed={false} indented />
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </nav>

      <div className="border-t border-white/[0.1] px-2 pb-1 pt-2">
        <div className="space-y-0.5">
          {footerItems.map((item) => (
            <ShellNavItem key={item.label} item={item} collapsed={collapsed} />
          ))}
        </div>
      </div>

      {!drawer && onToggleSidebar ? (
        <div className="border-t border-white/[0.1] p-2">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-white/[0.7] transition-all duration-200 hover:bg-white/[0.1] hover:text-white"
          >
            {collapsed ? (
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

      <div className="border-t border-white/[0.1] p-2">
        <div className={cn('flex items-center gap-2 px-3 py-2 text-white/[0.5]', collapsed ? 'justify-center' : 'justify-start')}>
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          {!collapsed ? <span className="text-xs">UI v1.2</span> : null}
        </div>
      </div>
    </aside>
  )
}

function SearchPill({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        'hidden items-center gap-2 rounded-2xl border border-white/[0.16] bg-white/[0.1] text-white/[0.72] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm',
        compact ? 'sm:flex w-[210px] px-3 py-2.5' : 'md:flex w-[270px] px-4 py-3',
      )}
    >
      <Search className="h-4 w-4 text-white/[0.65]" aria-hidden />
      <span className="truncate text-sm">Buscar...</span>
    </div>
  )
}

function UserChip({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.09] px-2 py-1.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-semibold text-[var(--color-primary)]">
        AF
      </span>
      {!compact ? <span className="text-sm text-white/[0.82]">Usuário</span> : null}
      <ChevronDown className="h-4 w-4 text-white/[0.65]" aria-hidden />
    </div>
  )
}

function HeroMetricCard({ metric }: { metric: MetricCard }) {
  const Icon = metric.icon

  return (
    <Card className={cn('border-l-4 bg-white/[0.96] shadow-[0_16px_40px_rgba(6,37,74,0.14)] backdrop-blur-sm', metric.border)}>
      <CardContent className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-[var(--color-fg-muted)]">{metric.label}</p>
          <p className="mt-1 text-3xl font-semibold text-[var(--color-primary)]">{metric.value}</p>
        </div>
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-2xl', metric.iconBg, metric.iconColor)}>
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      </CardContent>
    </Card>
  )
}

function ShellCanvas({
  viewport,
  desktopCollapsed,
  mobileDrawerOpen,
  expandedGroups,
  onToggleGroup,
  onToggleDesktopSidebar,
  onToggleMobileDrawer,
}: {
  viewport: ViewportMode
  desktopCollapsed: boolean
  mobileDrawerOpen: boolean
  expandedGroups: Set<string>
  onToggleGroup: (groupId: string) => void
  onToggleDesktopSidebar: () => void
  onToggleMobileDrawer: () => void
}) {
  const isDesktop = viewport === 'desktop'
  const isTablet = viewport === 'tablet'
  const isMobile = viewport === 'mobile'
  const showPersistentSidebar = !isMobile
  const sidebarCollapsed = isTablet || desktopCollapsed

  return (
    <div className="relative flex h-full overflow-hidden bg-[#eef4fb]">
      {showPersistentSidebar ? (
        <ShellSidebar
          collapsed={sidebarCollapsed}
          expandedGroups={expandedGroups}
          onToggleGroup={onToggleGroup}
          onToggleSidebar={isDesktop ? onToggleDesktopSidebar : undefined}
        />
      ) : null}

      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={HOME_BACKGROUND}
              alt=""
              className="h-full w-full object-cover object-center"
              draggable={false}
            />
            <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(0,19,56,0.92)_0%,rgba(0,63,138,0.82)_44%,rgba(0,144,208,0.58)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,42,104,0.52),transparent_30%)]" />
          </div>

          <div className="relative z-10 border-b border-white/[0.12] bg-[linear-gradient(180deg,rgba(3,19,55,0.52),rgba(3,19,55,0.2))] backdrop-blur-md">
            <div className={cn('flex items-center gap-3', isDesktop ? 'px-5 py-4' : isTablet ? 'px-4 py-3.5' : 'px-4 py-4')}>
              {isMobile ? (
                <button
                  type="button"
                  onClick={onToggleMobileDrawer}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.08] text-white/[0.85] backdrop-blur-sm"
                  aria-label="Abrir menu"
                >
                  <Menu className="h-[18px] w-[18px]" aria-hidden />
                </button>
              ) : null}

              <div className="flex min-w-0 flex-1 items-center gap-3">
                <FipsLogo className="h-10 w-10 rounded-xl shadow-[0_12px_24px_rgba(0,0,0,0.1)]" />
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-white/[0.55] uppercase">
                    Padrão Home
                  </p>
                  <p className="truncate font-heading text-lg font-semibold text-white sm:text-xl">
                    Aplicativo FIPS
                  </p>
                </div>
              </div>

              {!isMobile ? <SearchPill compact={isTablet} /> : null}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.08] text-white/[0.82] backdrop-blur-sm"
                  aria-label="Notificações"
                >
                  <Bell className="h-[18px] w-[18px]" aria-hidden />
                </button>
                <UserChip compact={!isDesktop} />
              </div>
            </div>
          </div>

          <div className={cn('relative z-10 border-t border-white/[0.1] border-b border-white/[0.1] bg-white/[0.06] backdrop-blur-sm', isMobile ? 'px-4 py-2.5' : 'px-5')}>
            <div className="no-scrollbar overflow-x-auto">
              <div className="flex min-w-max items-center gap-1">
                {headerTabs.map((tab, index) => (
                  <button
                    key={tab}
                    type="button"
                    className={cn(
                      'relative text-sm font-medium whitespace-nowrap transition-colors',
                      isMobile ? 'rounded-full px-3 py-2' : 'min-h-11 px-3 py-2',
                      index === 0
                        ? isMobile
                          ? 'bg-white/[0.14] text-white'
                          : 'text-white'
                        : 'text-white/[0.72] hover:text-white',
                    )}
                  >
                    {tab}
                    {index === 0 && !isMobile ? (
                      <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[var(--color-accent-strong)]" />
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <section
            className={cn(
              'relative z-10',
              isDesktop ? 'px-8 pb-16 pt-16' : isTablet ? 'px-6 pb-14 pt-14' : 'px-4 pb-10 pt-10',
            )}
          >
            <div className={cn('mx-auto max-w-4xl', isMobile ? 'text-left' : 'text-center')}>
              <Badge className="border-0 bg-[rgba(246,146,30,0.95)] px-4 py-1.5 text-white shadow-[0_12px_28px_rgba(246,146,30,0.28)]">
                Padrão Home
              </Badge>

              <h2
                className={cn(
                  'mt-6 font-heading font-semibold text-white',
                  isDesktop ? 'text-4xl' : isTablet ? 'text-3xl' : 'text-2xl leading-snug',
                )}
              >
                Home do <span className="text-[var(--color-accent)]">Aplicativo FIPS</span>
              </h2>

              <p
                className={cn(
                  'mt-4 max-w-2xl text-white/[0.8]',
                  isMobile ? 'text-sm leading-6' : 'mx-auto text-base leading-7',
                )}
              >
                Uma estrutura base para menus, ações e áreas de conteúdo com arte institucional,
                degradê azul e leitura clara mesmo com imagem forte no fundo.
              </p>

              <div className={cn('mt-7 flex gap-3', isMobile ? 'flex-col' : 'justify-center')}>
                <Button
                  variant="accent"
                  className="h-12 rounded-2xl px-6 shadow-[0_18px_40px_rgba(246,146,30,0.24)]"
                >
                  Ação Primária
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-2xl border-white/[0.7] bg-white/[0.06] px-6 text-white hover:bg-white/[0.12]"
                >
                  Ação Secundária
                </Button>
              </div>
            </div>
          </section>
        </div>

        <div className={cn('relative z-20', isDesktop ? '-mt-7 px-6 pb-4' : isTablet ? '-mt-6 px-5 pb-4' : '-mt-3 px-4 pb-4')}>
          <div className={cn('grid gap-3', isDesktop ? 'grid-cols-4' : isTablet ? 'grid-cols-2' : 'grid-cols-1')}>
            {heroCards.map((metric) => (
              <HeroMetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </div>

        <div className={cn('no-scrollbar flex-1 overflow-auto', isDesktop ? 'px-6 pb-6 pt-2' : isTablet ? 'px-5 pb-5 pt-2' : 'px-4 pb-5 pt-2')}>
          <div className={cn('grid gap-4', isDesktop ? 'lg:grid-cols-[minmax(0,1.45fr)_0.92fr]' : 'grid-cols-1')}>
            <Card className="border-white/[0.8] shadow-[0_24px_60px_rgba(6,37,74,0.08)]">
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-fg)]">Área principal</p>
                  <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                    Depois do hero, o conteúdo volta para superfícies claras e respira melhor em qualquer largura.
                  </p>
                </div>

                <div className={cn('grid gap-3', isMobile ? 'grid-cols-1' : 'sm:grid-cols-3')}>
                  {contentHighlights.map((item) => (
                    <div
                      key={item}
                      className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4 text-sm font-medium text-[var(--color-fg)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className={cn('grid gap-3', isMobile ? 'grid-cols-1' : 'sm:grid-cols-2')}>
                  <div className="rounded-[24px] bg-[linear-gradient(135deg,rgba(0,75,155,0.92),rgba(0,144,208,0.82))] p-5 text-white shadow-[0_18px_36px_rgba(0,75,155,0.22)]">
                    <p className="text-xs font-semibold tracking-[0.14em] text-white/[0.66] uppercase">
                      Destaque
                    </p>
                    <p className="mt-3 text-lg font-semibold">Bloco principal com ênfase visual</p>
                    <p className="mt-2 text-sm leading-6 text-white/[0.78]">
                      Ideal para introdução, CTA ou resumo do estado da tela.
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                    <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-fg-muted)] uppercase">
                      Complemento
                    </p>
                    <div className="mt-3 space-y-2.5">
                      {['Linha visual 1', 'Linha visual 2', 'Linha visual 3'].map((item) => (
                        <div key={item} className="rounded-2xl bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-fg-muted)]">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/[0.8] shadow-[0_24px_60px_rgba(6,37,74,0.08)]">
              <CardContent className="space-y-3">
                <p className="text-sm font-semibold text-[var(--color-fg)]">Notas visuais</p>
                {secondaryNotes.map((item) => (
                  <div
                    key={item}
                    className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm leading-6 text-[var(--color-fg-muted)]"
                  >
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {isMobile && mobileDrawerOpen ? (
        <>
          <button
            type="button"
            className="absolute inset-0 z-30 bg-[#041327]/48 backdrop-blur-[1px]"
            aria-label="Fechar menu"
            onClick={onToggleMobileDrawer}
          />
          <div className="absolute inset-y-0 left-0 z-40">
            <ShellSidebar
              collapsed={false}
              drawer
              expandedGroups={expandedGroups}
              onToggleGroup={onToggleGroup}
            />
          </div>
        </>
      ) : null}
    </div>
  )
}

export default function ApplicationShellDemo() {
  const [desktopCollapsed, setDesktopCollapsed] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState(() => new Set(groupedItems.map((group) => group.id)))

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((previous) => {
      const next = new Set(previous)
      if (next.has(groupId)) next.delete(groupId)
      else next.add(groupId)
      return next
    })
  }

  return (
    <DocPage
      title="Padrão: Application Shell"
      description="Shell base para produtos FIPS com foco em impacto visual: fundo institucional contínuo atrás do cabeçalho, textos genéricos, sidebar aprovada e família completa de mockups responsivos."
    >
      <DemoSection
        title="Preview interativo"
        className="!p-0 overflow-hidden"
        reference={`<div className="relative overflow-hidden">
  <img src="/backgrounds/app-shell-home-trains.png" alt="" />
  <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(0,19,56,0.92),rgba(0,63,138,0.82),rgba(0,144,208,0.58))]" />
  <header className="relative z-10 bg-white/[0.10] backdrop-blur-md text-white" />
  <nav className="relative z-10 bg-white/[0.06] backdrop-blur-sm text-white/[0.72]" />
  <section className="relative z-10 text-white">
    {/* Home do Aplicativo FIPS + CTAs + indicadores */}
  </section>
</div>`}
        referenceLabel="Estrutura do topo com arte no fundo"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--color-border)] px-5 py-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[var(--color-fg)]">Família responsiva com mockups</p>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
              A demo agora usa textos neutros, fundo institucional contínuo atrás do cabeçalho e visualizações separadas para desktop, tablet e celular.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={desktopCollapsed ? 'secondary' : 'primary'}
              size="sm"
              onClick={() => setDesktopCollapsed((value) => !value)}
            >
              {desktopCollapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
            </Button>
            <Button
              variant={mobileDrawerOpen ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setMobileDrawerOpen((value) => !value)}
            >
              {mobileDrawerOpen ? 'Fechar drawer mobile' : 'Abrir drawer mobile'}
            </Button>
          </div>
        </div>

        <div className="space-y-8 p-5">
          <MockupFrame
            viewport="desktop"
            label="Desktop"
            hint="Versão principal com sidebar persistente, hero contínuo e quatro indicadores logo abaixo da dobra."
          >
            <div className="h-[860px]">
              <ShellCanvas
                viewport="desktop"
                desktopCollapsed={desktopCollapsed}
                mobileDrawerOpen={mobileDrawerOpen}
                expandedGroups={expandedGroups}
                onToggleGroup={toggleGroup}
                onToggleDesktopSidebar={() => setDesktopCollapsed((value) => !value)}
                onToggleMobileDrawer={() => setMobileDrawerOpen((value) => !value)}
              />
            </div>
          </MockupFrame>

          <MockupFrame
            viewport="tablet"
            label="Tablet"
            hint="Mockup mais largo, com proporção de tablet real, rail compacta e conteúdo distribuído sem parecer um telefone."
          >
            <div className="h-[620px]">
              <ShellCanvas
                viewport="tablet"
                desktopCollapsed={desktopCollapsed}
                mobileDrawerOpen={mobileDrawerOpen}
                expandedGroups={expandedGroups}
                onToggleGroup={toggleGroup}
                onToggleDesktopSidebar={() => setDesktopCollapsed((value) => !value)}
                onToggleMobileDrawer={() => setMobileDrawerOpen((value) => !value)}
              />
            </div>
          </MockupFrame>

          <MockupFrame
            viewport="mobile"
            label="Celular"
            hint="Layout isolado para celular, com espaçamento mais seguro entre hero, indicadores e conteúdo."
          >
            <div className="h-[760px]">
              <ShellCanvas
                viewport="mobile"
                desktopCollapsed={desktopCollapsed}
                mobileDrawerOpen={mobileDrawerOpen}
                expandedGroups={expandedGroups}
                onToggleGroup={toggleGroup}
                onToggleDesktopSidebar={() => setDesktopCollapsed((value) => !value)}
                onToggleMobileDrawer={() => setMobileDrawerOpen((value) => !value)}
              />
            </div>
          </MockupFrame>
        </div>
      </DemoSection>

      <PatternGuidelines
        rules={[
          'No padrão Home, a arte institucional continua visível atrás do cabeçalho e das abas.',
          'A documentação usa nomenclatura neutra: Aplicativo FIPS, Home, Menu 1, Menu 2 e assim por diante.',
          'Desktop, tablet e celular devem aparecer em mockups dedicados, não apenas em um toggle abstrato.',
          'Todo texto sobre o topo azul usa contraste claro; evitar preto ou cinza escuro sobre a imagem.',
        ]}
        required={[
          'Overlay azul com transparência suficiente para deixar a foto perceptível.',
          'Sidebar coerente com o shell aprovado, inclusive no modo recolhido.',
          'Indicadores logo abaixo do hero, com boa separação do fundo.',
          'Reorganização clara do conteúdo entre desktop, tablet e celular.',
        ]}
        optional={[
          'Drawer aberto no celular para revisão do menu.',
          'Rail compacta no tablet para manter navegação sempre visível.',
          'Blocos secundários de conteúdo para demonstrar profundidade visual.',
        ]}
        avoid={[
          'Usar nomes de produtos ou fluxos reais nos exemplos da documentação.',
          'Deixar o hero terminar antes do cabeçalho, quebrando a continuidade visual.',
          'Aplicar textos escuros diretamente sobre o degradê azul.',
        ]}
      />
    </DocPage>
  )
}
