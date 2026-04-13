import { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Bell, BookOpen, GraduationCap, Menu, PanelLeft, SunMoon } from 'lucide-react'
import { cn } from '../lib/cn'
import { bottomNavItems, navGroups } from '../routes/nav'
import { DocHeaderHeroBackground, DocHeaderDarkBackground, DocHeaderNeuIconButton } from '../components/layout/DocHeaderStandard'
import { DocHeaderPageTrail } from '../components/layout/DocHeaderPageTrail'
import { DocHeaderSectionNav } from '../components/layout/DocHeaderSectionNav'
import { DocsNeuSidebar } from '../components/layout/DocsNeuSidebar'
import { SearchPill } from '../components/layout/SearchPill'
import { UserChip } from '../components/layout/UserChip'
import { Button } from '../components/ui/button'
import { Toaster } from 'sonner'
import { docHeaderBarTabs, docHeaderBarTop, docHeaderShellBorder } from '../lib/docHeaderChrome'
import { useFipsTheme } from '../hooks/useFipsTheme'

const DOC_VERSION = 'v0.4.0'

export function DocLayout() {
  const { dark, toggle } = useFipsTheme()
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
        to: bottomNavItems[0]?.to ?? '/docs/login',
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
          'fixed inset-y-0 left-0 z-40 overflow-hidden bg-[#002a68] shadow-[4px_0_32px_rgba(0,26,64,0.36)] transition-[width,transform] duration-300 ease-in-out lg:relative lg:inset-auto',
          collapsed ? 'w-[68px]' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
        aria-label="Menu lateral"
      >
        <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
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

      <div className="flex min-h-svh flex-1 flex-col bg-[var(--color-surface-muted)] lg:min-w-0">
        <header
          className={cn(
            'sticky top-0 z-20 isolate overflow-hidden',
            docHeaderShellBorder,
            !dark && 'shadow-[0_1px_0_rgba(0,0,0,0.06)]',
            dark && 'shadow-[0_1px_0_rgba(0,0,0,0.35)]',
          )}
        >
          {!dark ? <DocHeaderHeroBackground /> : <DocHeaderDarkBackground />}

          <div
            className={cn(
              'relative z-10',
              dark
                ? 'border-b border-white/[0.08] bg-[#1A1A1A]'
                : docHeaderBarTop,
            )}
          >
            <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className={cn(
                  'lg:hidden',
                  dark
                    ? 'border border-[#3F3F46] bg-[#27272A] text-[#E2E2E8] hover:bg-[#323236]'
                    : 'border border-black/[0.10] bg-white/90 text-neutral-800 hover:bg-white',
                )}
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <DocHeaderNeuIconButton
                  className="hidden sm:inline-flex"
                  dark={dark}
                  ariaLabel={
                    isLg
                      ? collapsed
                        ? 'Expandir painel lateral'
                        : 'Recolher painel lateral'
                      : mobileOpen
                        ? 'Fechar menu'
                        : 'Abrir menu'
                  }
                  aria-controls="docs-app-sidebar"
                  aria-expanded={isLg ? !collapsed : mobileOpen}
                  onClick={() => {
                    if (isLg) setCollapsed((c) => !c)
                    else setMobileOpen((o) => !o)
                  }}
                >
                  <PanelLeft
                    className={cn('h-[17px] w-[17px] transition-transform duration-200', isLg && collapsed && 'rotate-180')}
                    aria-hidden
                    strokeWidth={1.9}
                  />
                </DocHeaderNeuIconButton>
                <DocHeaderPageTrail groupLabel={currentGroupLabel} pageTitle={title} dark={dark} />
              </div>
              <div className="hidden w-full max-w-xs md:block">
                <SearchPill variant="docHeader" dark={dark} aria-label="Buscar na documentação" />
              </div>
              <div className="hidden shrink-0 items-center gap-2 sm:flex">
                <DocHeaderNeuIconButton ariaLabel="Notificações" dark={dark}>
                  <Bell className="h-[17px] w-[17px]" aria-hidden strokeWidth={1.9} />
                </DocHeaderNeuIconButton>
                <DocHeaderNeuIconButton ariaLabel="Tutorial" dark={dark}>
                  <GraduationCap className="h-[17px] w-[17px]" aria-hidden strokeWidth={1.9} />
                </DocHeaderNeuIconButton>
                <DocHeaderNeuIconButton
                  ariaLabel={dark ? 'Trocar para modo claro' : 'Trocar para modo escuro'}
                  dark={dark}
                  onClick={toggle}
                >
                  <SunMoon className="h-[17px] w-[17px]" aria-hidden strokeWidth={1.85} />
                </DocHeaderNeuIconButton>
                <div
                  className={cn('mx-0.5 hidden h-6 w-px shrink-0 sm:block', dark ? 'bg-[#52525B]' : 'bg-neutral-300')}
                />
                <UserChip variant="docHeader" dark={dark} />
              </div>
            </div>
          </div>
          <div
            className={cn(
              'relative z-10 hidden px-4 sm:px-6 lg:block',
              dark ? '!bg-transparent' : docHeaderBarTabs,
            )}
          >
            <DocHeaderSectionNav
              tabs={topTabs}
              currentGroupId={currentGroupId}
              dark={dark}
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
