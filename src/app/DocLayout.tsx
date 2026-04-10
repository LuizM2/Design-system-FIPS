import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Bell, BookOpen, GraduationCap, Menu, PanelLeft } from 'lucide-react'
import { cn } from '../lib/cn'
import { bottomNavItems, navGroups } from '../routes/nav'
import { DocHeaderPageTrail } from '../components/layout/DocHeaderPageTrail'
import { DocHeaderSectionNav } from '../components/layout/DocHeaderSectionNav'
import { DocsNeuSidebar } from '../components/layout/DocsNeuSidebar'
import { SearchPill } from '../components/layout/SearchPill'
import { UserChip } from '../components/layout/UserChip'
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

const NEU = {
  borderIdle: 'rgba(255,255,255,0.16)',
  borderHover: 'rgba(246,146,30,0.58)',
  bgIdle: 'linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.08) 56%, rgba(0,24,58,0.18) 100%)',
  bgHover: 'linear-gradient(145deg, #FFD37B 0%, #f7ad45 34%, #F6921E 64%, #cf730d 100%)',
  shadowIdle: '0 1px 2px rgba(0,42,104,0.3)',
  shadowHover:
    '0 10px 20px -10px rgba(246,146,30,0.55), 0 2px 3px rgba(0,42,104,0.34), inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -2px 4px rgba(140,72,0,0.28)',
  iconIdle: 'rgba(255,255,255,0.75)',
  iconHover: '#002A68',
} as const

function HeaderNeuIconBtn({ children, ariaLabel }: { children: ReactNode; ariaLabel: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="relative flex shrink-0 items-center justify-center overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        border: `1px solid ${hovered ? NEU.borderHover : NEU.borderIdle}`,
        background: hovered ? NEU.bgHover : NEU.bgIdle,
        boxShadow: hovered ? NEU.shadowHover : NEU.shadowIdle,
        transform: hovered ? 'translateY(-1px)' : 'none',
        transition: 'all 0.25s ease',
        color: hovered ? NEU.iconHover : NEU.iconIdle,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: 'absolute',
          top: 1,
          left: 2,
          right: 2,
          height: '44%',
          borderRadius: 8,
          background: hovered
            ? 'linear-gradient(180deg, rgba(255,255,255,0.42), rgba(255,255,255,0.02))'
            : 'none',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
          transform: hovered ? 'translateX(0)' : 'translateX(-100%)',
          animation: hovered ? 'docsSidebarNeuShimmer 0.5s ease forwards' : 'none',
          pointerEvents: 'none',
        }}
      />
      <div className="relative z-[1] flex items-center justify-center">{children}</div>
    </button>
  )
}

export function DocLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarAutoMenu, setSidebarAutoMenu] = useState(false)
  const [isLg, setIsLg] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : false,
  )
  const location = useLocation()

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setIsLg(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const activeItem = [
    ...navGroups.flatMap((group) =>
      group.items.map((item) => ({ groupId: group.id, groupLabel: group.label, item })),
    ),
    ...bottomNavItems.map((item) => ({ groupId: 'meta', groupLabel: 'Projeto', item })),
  ].find((entry) => entry.item.to === location.pathname)

  const title = activeItem?.item.label ?? 'Documentação'
  const currentGroupId = activeItem?.groupId ?? 'start'
  const currentGroupLabel = activeItem?.groupLabel ?? 'Início'
  const topTabs = useMemo(
    () => [
      ...navGroups.map((group) => ({
        id: group.id,
        label: group.label,
        to: group.items[0]?.to ?? '/docs',
        end: (group.items[0]?.to ?? '/docs') === '/docs',
        icon: group.icon ?? BookOpen,
      })),
      {
        id: 'meta',
        label: 'Projeto',
        to: '/docs/changelog',
        end: false,
        icon: BookOpen,
      },
    ],
    [],
  )

  const handleSidebarAutoCollapseChange = useCallback((enabled: boolean) => {
    setSidebarAutoMenu(enabled)
  }, [])

  return (
    <div className="flex min-h-svh bg-[var(--color-surface-muted)]">
      <aside
        id="docs-app-sidebar"
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
            onAutoCollapseChange={handleSidebarAutoCollapseChange}
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
                {sidebarAutoMenu ? (
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="hidden border border-white/[0.16] bg-white/[0.08] text-white/90 backdrop-blur-sm hover:bg-white/[0.12] sm:inline-flex"
                    aria-controls="docs-app-sidebar"
                    aria-expanded={isLg ? !collapsed : mobileOpen}
                    aria-label={
                      isLg
                        ? collapsed
                          ? 'Expandir painel lateral'
                          : 'Recolher painel lateral'
                        : mobileOpen
                          ? 'Fechar menu'
                          : 'Abrir menu'
                    }
                    onClick={() => {
                      if (isLg) setCollapsed((c) => !c)
                      else setMobileOpen((o) => !o)
                    }}
                  >
                    <PanelLeft
                      className={cn('h-5 w-5 text-white/[0.92] transition-transform duration-200', isLg && collapsed && 'rotate-180')}
                      aria-hidden
                    />
                  </Button>
                ) : null}
                <DocHeaderPageTrail groupLabel={currentGroupLabel} pageTitle={title} />
              </div>
              <div className="hidden w-full max-w-xs md:block">
                <SearchPill variant="docHeader" aria-label="Buscar na documentação" />
              </div>
              <div className="hidden shrink-0 items-center gap-2 sm:flex">
                <HeaderNeuIconBtn ariaLabel="Notificações">
                  <Bell className="h-[17px] w-[17px]" aria-hidden strokeWidth={1.9} />
                </HeaderNeuIconBtn>
                <HeaderNeuIconBtn ariaLabel="Tutorial">
                  <GraduationCap className="h-[17px] w-[17px]" aria-hidden strokeWidth={1.9} />
                </HeaderNeuIconBtn>
                <UserChip variant="docHeader" />
              </div>
            </div>
          </div>
          <div className={cn('relative z-10 hidden px-4 sm:px-6 lg:block', docHeaderBarTabs)}>
            <DocHeaderSectionNav
              tabs={topTabs}
              currentGroupId={currentGroupId}
              remeasureKey={collapsed}
            />
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
