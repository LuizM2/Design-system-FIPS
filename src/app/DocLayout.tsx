import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Bell, Menu, PanelLeft, Settings } from 'lucide-react'
import { cn } from '../lib/cn'
import { bottomNavItems, navGroups } from '../routes/nav'
import { DocsNeuSidebar } from '../components/layout/DocsNeuSidebar'
import { SearchPill } from '../components/layout/SearchPill'
import { UserChip } from '../components/layout/UserChip'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Toaster } from 'sonner'
import {
  docHeaderArtDepth,
  docHeaderArtWash,
  docHeaderBarTabs,
  docHeaderBarTop,
  docHeaderShellBorder,
} from '../lib/docHeaderChrome'
import { SHELL_HERO_ART_SRC } from '../lib/shellHeroArt'

const DOC_VERSION = 'v0.3.0'

const shellHeaderIconBtnClass =
  'flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-xl border-[1.5px] border-white/[0.16] bg-white/[0.08] text-white/[0.85] backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25'

export function DocLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
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

  return (
    <div className="flex min-h-svh bg-[var(--color-surface-muted)]">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex h-svh flex-col bg-[#002a68] shadow-[4px_0_32px_rgba(0,26,64,0.36)] transition-[width,transform] duration-300 ease-in-out lg:static lg:h-auto lg:min-h-svh',
          collapsed ? 'w-[68px]' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
        aria-label="Menu lateral"
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <DocsNeuSidebar
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            onNavigate={() => setMobileOpen(false)}
            docVersion={DOC_VERSION}
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
        <header className={cn('sticky top-0 z-20 overflow-hidden', docHeaderShellBorder)}>
          <div className="pointer-events-none absolute inset-0">
            <img
              src={SHELL_HERO_ART_SRC}
              alt=""
              className="h-full w-full object-cover object-[center_65%] opacity-[0.20]"
              draggable={false}
            />
            <div className={cn('absolute inset-0', docHeaderArtWash)} />
            <div className={cn('absolute inset-0', docHeaderArtDepth)} />
          </div>

          <div className={cn('relative z-10', docHeaderBarTop)}>
            <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="border border-white/[0.16] bg-white/[0.08] text-white/90 backdrop-blur-sm hover:bg-white/[0.12] lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <PanelLeft className="hidden h-5 w-5 text-white/[0.55] sm:block" aria-hidden />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-xs font-medium uppercase tracking-[0.14em] text-white/[0.75]">
                      {currentGroupLabel}
                    </p>
                    <Badge
                      variant="outline"
                      className="hidden h-[35px] items-center gap-1.5 border-[1.5px] border-white/[0.16] bg-white/[0.08] px-3 py-0 text-[13px] font-semibold leading-none text-white/[0.92] sm:inline-flex"
                    >
                      Biblioteca + padrões
                    </Badge>
                  </div>
                  <h2 className="font-heading truncate text-lg font-semibold text-[#fafafa]">{title}</h2>
                </div>
              </div>
              <div className="hidden w-full max-w-xs md:block">
                <SearchPill variant="docHeader" aria-label="Buscar na documentação" />
              </div>
              <div className="hidden shrink-0 items-center gap-2 sm:flex">
                <button type="button" className={shellHeaderIconBtnClass} aria-label="Notificações">
                  <Bell className="h-[18px] w-[18px]" aria-hidden strokeWidth={2} />
                </button>
                <button type="button" className={shellHeaderIconBtnClass} aria-label="Configurações">
                  <Settings className="h-[18px] w-[18px]" aria-hidden strokeWidth={2} />
                </button>
                <UserChip variant="docHeader" />
              </div>
            </div>
          </div>
          <div className={cn('relative z-10 hidden px-4 sm:px-6 lg:block', docHeaderBarTabs)}>
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
                      isActive ? 'text-[#fafafa]' : 'text-white/[0.72] hover:text-white/[0.92]',
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
