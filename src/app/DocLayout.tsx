import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Bell, BookOpen, Menu, PanelLeft, Settings } from 'lucide-react'
import { cn } from '../lib/cn'
import { bottomNavItems, navGroups } from '../routes/nav'
import { DocHeaderPageTrail } from '../components/layout/DocHeaderPageTrail'
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
  docHeaderTabsNavSeparatorClass,
  docHeaderTabsUnderlineMd,
} from '../lib/docHeaderChrome'
import { SHELL_HERO_ART_SRC } from '../lib/shellHeroArt'

const DOC_VERSION = 'v0.3.0'

const shellHeaderIconBtnClass =
  'flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-xl border-[1.5px] border-white/[0.16] bg-white/[0.08] text-white/[0.85] backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25'

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

  const activeTabIndex = Math.max(
    0,
    topTabs.findIndex((t) => t.id === currentGroupId),
  )

  const sectionNavRef = useRef<HTMLElement>(null)
  const sectionTabRefs = useRef<(HTMLDivElement | null)[]>([])
  const [sectionUnderline, setSectionUnderline] = useState({ left: 0, width: 0 })

  const updateSectionUnderline = useCallback(() => {
    const nav = sectionNavRef.current
    const el = sectionTabRefs.current[activeTabIndex]
    if (!nav || !el) return
    const navRect = nav.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    setSectionUnderline({
      left: elRect.left - navRect.left + nav.scrollLeft,
      width: elRect.width,
    })
  }, [activeTabIndex])

  useLayoutEffect(() => {
    updateSectionUnderline()
    const nav = sectionNavRef.current
    window.addEventListener('resize', updateSectionUnderline)
    nav?.addEventListener('scroll', updateSectionUnderline, { passive: true })
    return () => {
      window.removeEventListener('resize', updateSectionUnderline)
      nav?.removeEventListener('scroll', updateSectionUnderline)
    }
  }, [updateSectionUnderline, location.pathname, collapsed])

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
            <nav
              ref={sectionNavRef}
              className={cn(
                'no-scrollbar relative flex items-stretch gap-0 overflow-x-auto',
                docHeaderTabsNavSeparatorClass,
              )}
              aria-label="Seções principais"
            >
              {topTabs.map((tab, i) => {
                const isActive = tab.id === currentGroupId
                const Icon = tab.icon

                return (
                  <div
                    key={tab.id}
                    ref={(el) => {
                      sectionTabRefs.current[i] = el
                    }}
                    className="inline-flex shrink-0"
                  >
                    <NavLink
                      to={tab.to}
                      end={tab.end}
                      style={{
                        fontSize: docHeaderTabsUnderlineMd.fontSizePx,
                        padding: `${docHeaderTabsUnderlineMd.paddingYPx}px ${docHeaderTabsUnderlineMd.paddingXPx}px`,
                        gap: docHeaderTabsUnderlineMd.iconGapPx,
                      }}
                      className={cn(
                        'inline-flex items-center font-sans whitespace-nowrap transition-all duration-200',
                        isActive
                          ? 'font-semibold text-white'
                          : 'font-normal text-white/[0.72] hover:bg-white/[0.06] hover:text-white/[0.92]',
                      )}
                    >
                      <Icon
                        className={cn(
                          'shrink-0 transition-colors duration-200',
                          isActive ? 'text-[var(--color-fips-yellow-600)]' : 'text-white/[0.55]',
                        )}
                        style={{
                          width: docHeaderTabsUnderlineMd.iconSizePx,
                          height: docHeaderTabsUnderlineMd.iconSizePx,
                        }}
                        aria-hidden
                        strokeWidth={1.5}
                      />
                      {tab.label}
                    </NavLink>
                  </div>
                )
              })}
              <span
                className="pointer-events-none absolute -bottom-0.5 rounded-t-[3px] bg-[var(--color-fips-yellow-600)]"
                style={{
                  left: sectionUnderline.left,
                  width: sectionUnderline.width,
                  height: docHeaderTabsUnderlineMd.indicatorHeightPx,
                  transition: docHeaderTabsUnderlineMd.indicatorTransition,
                }}
                aria-hidden
              />
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
