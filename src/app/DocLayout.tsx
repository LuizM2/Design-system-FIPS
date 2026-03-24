import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  BadgeCheck,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  PanelLeft,
  Search,
  Sparkles,
} from 'lucide-react'
import { cn } from '../lib/cn'
import { bottomNavItems, navGroups, type NavGroup, type NavItem } from '../routes/nav'
import { FipsLogo } from '../components/brand/FipsLogo'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Toaster } from 'sonner'

const DOC_VERSION = 'v0.3.0'

function SidebarLink({
  item,
  collapsed,
  indented = false,
  onNavigate,
}: {
  item: NavItem
  collapsed: boolean
  indented?: boolean
  onNavigate?: () => void
}) {
  const ItemIcon = item.icon ?? BookOpen

  return (
    <li key={item.to}>
      <NavLink
        to={item.to}
        end={item.to === '/docs'}
        onClick={onNavigate}
        title={collapsed ? item.label : undefined}
        className={({ isActive }) =>
          cn(
            'flex w-full items-center gap-3 rounded-lg transition-all duration-200',
            'hover:bg-white/10 active:bg-white/15',
            collapsed ? 'justify-center px-3 py-2.5' : 'py-2.5',
            indented && !collapsed ? 'pl-10 pr-3' : !collapsed ? 'px-3' : '',
            isActive
              ? 'bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
              : 'text-white/70 hover:text-white',
          )
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={cn(
                'flex shrink-0 transition-colors duration-200',
                isActive ? 'text-[var(--color-accent-strong)]' : '',
              )}
            >
              <ItemIcon className="h-5 w-5" aria-hidden />
            </span>
            {!collapsed ? <span className="truncate text-sm font-medium">{item.label}</span> : null}
          </>
        )}
      </NavLink>
    </li>
  )
}

function SidebarContent({
  collapsed,
  expandedGroups,
  activeGroupId,
  onToggleGroup,
  onToggleSidebar,
  onNavigate,
}: {
  collapsed: boolean
  expandedGroups: Set<string>
  activeGroupId?: string
  onToggleGroup: (groupId: string) => void
  onToggleSidebar: () => void
  onNavigate?: () => void
}) {
  const renderGroup = (group: NavGroup) => {
    const isStart = group.id === 'start'
    const isExpanded = group.collapsible === false || expandedGroups.has(group.id) || group.id === activeGroupId
    const GroupIcon = group.icon

    if (isStart) {
      return (
        <ul key={group.id} className="space-y-0.5">
          {group.items.map((item) => (
            <SidebarLink
              key={item.to}
              item={item}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )
    }

    if (collapsed) {
      return (
        <div key={group.id}>
          <div className="mx-3 my-2 border-t border-white/10" />
          <ul className="space-y-0.5">
            {group.items.map((item) => (
              <SidebarLink
                key={item.to}
                item={item}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      )
    }

    return (
      <div key={group.id} className="mt-2">
        <div className="mx-3 mb-1 border-t border-white/10" />
        <button
          type="button"
          onClick={() => onToggleGroup(group.id)}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-white/40 transition-all duration-200 hover:bg-white/5 hover:text-white/60"
        >
          {GroupIcon ? (
            <span className="flex shrink-0 opacity-70">
              <GroupIcon className="h-4 w-4" aria-hidden />
            </span>
          ) : null}
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
            isExpanded ? 'max-h-[720px] opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <ul className="mt-0.5 space-y-0.5">
            {group.items.map((item) => (
              <SidebarLink
                key={item.to}
                item={item}
                collapsed={collapsed}
                indented
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className={cn(
          'flex h-16 items-center border-b border-white/10 transition-all duration-300',
          collapsed ? 'justify-center px-3' : 'px-4',
        )}
      >
        {collapsed ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white p-0.5">
            <FipsLogo variant="symbol" inverted={false} className="[&_img]:h-6 [&_img]:w-6" />
          </div>
        ) : (
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white p-0.5">
              <FipsLogo variant="symbol" inverted={false} className="[&_img]:h-6 [&_img]:w-6" />
            </div>
            <span className="text-lg text-white/50">|</span>
            <span className="truncate text-lg font-semibold text-white">Design System</span>
          </div>
        )}
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-3" aria-label="Documentação">
        <div className="space-y-0.5">
          {navGroups.map((group) => renderGroup(group))}
        </div>
      </nav>

      <div className="border-t border-white/10 px-2 pb-1 pt-2">
        <ul className="space-y-0.5">
          {bottomNavItems.map((item) => (
            <SidebarLink
              key={item.to}
              item={item}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </div>

      <div className="hidden border-t border-white/10 p-2 lg:block">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white"
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
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

      <div className="border-t border-white/10 p-2">
        <div
          className={cn(
            'flex items-center gap-2 rounded-lg px-3 py-2 text-white/50 transition-colors duration-200 hover:text-white/80',
            collapsed ? 'justify-center' : 'justify-start',
          )}
          title="Versão da documentação"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          {!collapsed ? <span className="text-xs">{DOC_VERSION}</span> : null}
        </div>
      </div>
    </>
  )
}

export function DocLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => new Set(navGroups.filter((group) => group.collapsible !== false).map((group) => group.id)),
  )
  const location = useLocation()

  const activeItem = [
    ...navGroups.flatMap((group) =>
      group.items.map((item) => ({ groupId: group.id, groupLabel: group.label, item })),
    ),
    ...bottomNavItems.map((item) => ({ groupId: 'meta', groupLabel: 'Projeto', item })),
  ].find((entry) => entry.item.to === location.pathname)

  const title = activeItem?.item.label ?? 'Documentação'
  const currentGroupId = activeItem?.groupId ?? 'start'
  const currentGroupLabel = activeItem?.groupLabel ?? 'Início'
  const topTabs = [
    ...navGroups.map((group) => ({
      id: group.id,
      label: group.label,
      to: group.items[0]?.to ?? '/docs',
    })),
    { id: 'meta', label: 'Projeto', to: '/docs/changelog' },
  ]

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((previous) => {
      const next = new Set(previous)
      if (next.has(groupId)) next.delete(groupId)
      else next.add(groupId)
      return next
    })
  }

  return (
    <div className="flex min-h-svh bg-[var(--color-surface-muted)]">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex h-svh flex-col bg-[#002a68] shadow-[4px_0_32px_rgba(0,26,64,0.36)] transition-[width,transform] duration-300 ease-in-out lg:static lg:h-auto lg:min-h-svh',
          collapsed ? 'w-16' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
        aria-label="Menu lateral"
      >
        <div className="flex flex-1 flex-col overflow-hidden">
          <SidebarContent
            collapsed={collapsed}
            expandedGroups={expandedGroups}
            activeGroupId={currentGroupId}
            onToggleGroup={toggleGroup}
            onToggleSidebar={() => setCollapsed((value) => !value)}
            onNavigate={() => setMobileOpen(false)}
          />
        </div>
      </aside>

      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Fechar menu"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <div className="flex min-h-svh flex-1 flex-col lg:min-w-0">
        <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-surface)]/92 backdrop-blur-md">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <PanelLeft className="hidden h-5 w-5 text-[var(--color-fg-muted)] sm:block" aria-hidden />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
                    {currentGroupLabel}
                  </p>
                  <Badge variant="info" className="hidden sm:inline-flex">
                    Biblioteca + padrões
                  </Badge>
                </div>
                <h2 className="font-heading truncate text-lg font-semibold text-[var(--color-fg)]">
                  {title}
                </h2>
              </div>
            </div>
            <div className="hidden w-full max-w-xs md:block">
              <Input
                type="search"
                placeholder="Buscar na documentação…"
                leftIcon={<Search className="h-4 w-4" aria-hidden />}
                aria-label="Buscar na documentação"
                readOnly
              />
            </div>
            <div className="hidden items-center gap-2 lg:flex">
              <Badge variant="outline" className="gap-1.5">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                Pronto para review
              </Badge>
            </div>
          </div>
          <div className="hidden border-t border-[var(--color-border)] px-4 sm:px-6 lg:block">
            <nav className="flex items-center gap-1 overflow-x-auto" aria-label="Seções principais">
              {topTabs.map((tab) => {
                const isActive = tab.id === currentGroupId

                return (
                  <NavLink
                    key={tab.id}
                    to={tab.to}
                    end={tab.to === '/docs'}
                    className={cn(
                      'relative inline-flex min-h-11 items-center px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                      isActive
                        ? 'text-[var(--color-primary)]'
                        : 'text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]',
                    )}
                  >
                    {tab.label}
                    {isActive ? (
                      <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[var(--color-accent-strong)]" />
                    ) : null}
                  </NavLink>
                )
              })}
            </nav>
          </div>
        </header>

        <main className="flex-1 bg-[radial-gradient(circle_at_top,rgba(147,189,228,0.18),transparent_30%),linear-gradient(180deg,var(--color-surface-muted),var(--color-surface-muted))]">
          <Outlet />
        </main>
      </div>

      <Toaster richColors position="top-right" closeButton />
    </div>
  )
}
