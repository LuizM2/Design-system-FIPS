import { useCallback, useEffect, useMemo, useRef, useState, createContext, type ReactNode } from 'react'
import { BookOpen, ChevronDown, ChevronRight, LogOut, Sparkles, Timer, type LucideIcon } from 'lucide-react'
import { matchPath, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useFipsTheme } from '../../hooks/useFipsTheme'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { bottomNavItems, navGroups, type NavGroup, type NavItem } from '../../routes/nav'

const C = {
  azulProfundo: '#004B9B',
  azulEscuro: '#002A68',
  azulCeuClaro: '#D3E3F4',
  neutro: '#E8EBFF',
  branco: '#FFFFFF',
  cardBorder: '#E2E8F0',
  textMuted: '#64748B',
  amareloEscuro: '#F6921E',
  /* Dialog tokens (via CSS vars para dark mode) */
  dialogBorder: 'var(--color-border)',
  dialogFg: 'var(--color-fg)',
  dialogFgMuted: 'var(--color-fg-muted)',
}

const F = {
  title: "'Saira Expanded', sans-serif",
  body: "'Open Sans', sans-serif",
}

type SidebarTheme = {
  border: string
  iconBorderIdle: string
  textMuted: string
  textHover: string
  textActive: string
  accentFrom: string
  accentTo: string
  accentBorderStrong: string
  iconActive: string
  chevron: string
  idleShadow: string
  hoverShadow: string
  activeShadow: string
  tooltipBg: string
  tooltipText: string
}

const TN: SidebarTheme = {
  border: 'rgba(255,255,255,0.06)',
  iconBorderIdle: '#1a3d6e',
  textMuted: 'rgba(255,255,255,0.75)',
  textHover: 'rgba(255,255,255,0.92)',
  textActive: '#fafafa',
  accentFrom: C.amareloEscuro,
  accentTo: '#FFD37B',
  accentBorderStrong: 'rgba(246,146,30,0.58)',
  iconActive: C.azulEscuro,
  chevron: 'rgba(255,255,255,0.55)',
  idleShadow: '0 3px 10px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.08) inset, 0 -1px 0 rgba(0,0,0,0.45) inset',
  hoverShadow:
    '0 10px 20px -10px rgba(246,146,30,0.55), 0 2px 3px rgba(0,42,104,0.34), inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -2px 4px rgba(140,72,0,0.28)',
  activeShadow:
    '0 12px 24px -12px rgba(246,146,30,0.62), 0 2px 4px rgba(0,42,104,0.38), inset 0 1px 0 rgba(255,255,255,0.42), inset 0 -3px 6px rgba(120,64,0,0.36)',
  tooltipBg: '#002A68',
  tooltipText: '#fafafa',
}

export const SIDEBAR_WIDTH = 256
export const SIDEBAR_COLLAPSED_WIDTH = 68

type TreeItem = {
  label: string
  href?: string
  icon: LucideIcon
  children?: TreeItem[]
}

function buildMenuTree(groups: NavGroup[]): TreeItem[] {
  const items: TreeItem[] = []
  for (const g of groups) {
    if (g.id === 'start') {
      for (const it of g.items) {
        items.push({ label: it.label, href: it.to, icon: it.icon ?? BookOpen })
      }
    } else {
      items.push({
        label: g.label.toUpperCase(),
        icon: g.icon ?? BookOpen,
        children: g.items.map((it) => ({
          label: it.label,
          href: it.to,
          icon: it.icon ?? BookOpen,
        })),
      })
    }
  }
  return items
}

function pathIsActive(pathname: string, to: string): boolean {
  return !!matchPath({ path: to, end: to === '/docs' }, pathname)
}

function SidebarNeuIcon36({
  theme,
  children,
  isActive = false,
  shimmerLoop = false,
  hovered = false,
}: {
  theme: SidebarTheme
  children: ReactNode
  isActive?: boolean
  shimmerLoop?: boolean
  hovered?: boolean
}) {
  const { dark } = useFipsTheme()
  const lit = isActive
  const shimmerHover = hovered && !isActive && !shimmerLoop
  const idleBg = dark
    ? 'linear-gradient(160deg, #303036 0%, #222226 55%, #1c1c20 100%)'
    : 'linear-gradient(160deg, #0e4d8a 0%, #0a3a6e 55%, #072d58 100%)'
  const idleBorder = dark ? '#3f3f46' : '#1a3d6e'
  return (
    <div
      className="relative flex shrink-0 items-center justify-center overflow-hidden"
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        border: `1px solid ${isActive || shimmerHover ? theme.accentBorderStrong : idleBorder}`,
        background:
          lit || shimmerHover
            ? `linear-gradient(145deg, ${theme.accentTo} 0%, #f7ad45 34%, ${theme.accentFrom} 64%, #cf730d 100%)`
            : idleBg,
        boxShadow: isActive ? theme.activeShadow : shimmerHover ? theme.hoverShadow : theme.idleShadow,
        transform: shimmerHover ? 'translateY(-1px)' : 'none',
        transition: 'all 0.25s ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 1,
          left: 2,
          right: 2,
          height: '44%',
          borderRadius: 8,
          background:
            lit || shimmerHover ? 'linear-gradient(180deg, rgba(255,255,255,0.42), rgba(255,255,255,0.02))' : 'none',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
          transform: lit || shimmerHover ? 'translateX(0)' : 'translateX(-100%)',
          animation: shimmerLoop
            ? 'docsSidebarNeuShimmerLoop 2.8s ease-in-out infinite'
            : lit || shimmerHover
              ? 'docsSidebarNeuShimmer 0.5s ease forwards'
              : 'none',
          pointerEvents: 'none',
        }}
      />
      <div className="relative z-[1] flex items-center justify-center">{children}</div>
    </div>
  )
}

const SidebarCtx = createContext<{ collapsed: boolean }>({ collapsed: false })

function DocNavItem({
  item,
  collapsed,
  depth,
  pathname,
  onItemNavigate,
  theme,
}: {
  item: TreeItem
  collapsed: boolean
  depth: number
  pathname: string
  onItemNavigate?: () => void
  theme: SidebarTheme
}) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const hasChildren = !!item.children?.length
  const [open, setOpen] = useState(() => {
    if (!item.children) return false
    return item.children.some((c) => c.href && pathIsActive(pathname, c.href))
  })

  useEffect(() => {
    if (!hasChildren) return
    const next = item.children!.some((c) => c.href && pathIsActive(pathname, c.href))
    // Sincronizar grupo expandido com rota (filho ativo).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intencional: espelhar URL nos accordions
    setOpen((prev) => (prev === next ? prev : next))
  }, [pathname, hasChildren, item.children])

  const isActive = item.href
    ? pathIsActive(pathname, item.href)
    : !!item.children?.some((c) => c.href && pathIsActive(pathname, c.href))

  const Icon = item.icon

  const rowContent = (
    <>
      <SidebarNeuIcon36 theme={theme} isActive={isActive} hovered={hovered}>
        <Icon
          size={17}
          strokeWidth={1.9}
          style={{
            color: isActive || hovered ? theme.iconActive : theme.textMuted,
            transition: 'color 0.2s ease',
          }}
          aria-hidden
        />
      </SidebarNeuIcon36>
      {!collapsed ? (
        <span
          style={{
            fontSize: 13,
            fontWeight: isActive ? 500 : 400,
            letterSpacing: '0.01em',
            flex: 1,
            color: isActive ? theme.textActive : hovered ? theme.textHover : theme.textMuted,
            transition: 'color 0.15s ease',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minWidth: 0,
            fontFamily: F.body,
          }}
        >
          {item.label}
        </span>
      ) : null}
      {hasChildren && !collapsed ? (
        <span style={{ display: 'flex', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>
          {open ? <ChevronDown size={14} color={theme.chevron} aria-hidden /> : <ChevronRight size={14} color={theme.chevron} aria-hidden />}
        </span>
      ) : null}
      {collapsed && hovered ? (
        <div
          style={{
            position: 'absolute',
            left: 'calc(100% + 8px)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: theme.tooltipBg,
            color: theme.tooltipText,
            padding: '4px 10px',
            borderRadius: 6,
            fontSize: 12,
            whiteSpace: 'nowrap',
            zIndex: 50,
            border: `1px solid ${theme.iconBorderIdle}`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            pointerEvents: 'none',
          }}
        >
          {item.label}
        </div>
      ) : null}
    </>
  )

  const rowStyle: React.CSSProperties = {
    padding: collapsed ? '6px 0' : depth > 0 ? '6px 12px 6px 28px' : '6px 12px',
    margin: collapsed ? '1px auto' : '1px 8px',
    borderRadius: 8,
    transition: 'background 0.15s ease',
    justifyContent: collapsed ? 'center' : 'flex-start',
    gap: collapsed ? 0 : 12,
    width: collapsed ? 52 : undefined,
    maxWidth: collapsed ? 52 : '100%',
    minWidth: 0,
  }

  const wrapClass = 'group relative flex cursor-pointer items-center text-left no-underline [color:inherit]'

  const row =
    !hasChildren && item.href ? (
      <NavLink
        to={item.href}
        end={item.href === '/docs'}
        onClick={() => onItemNavigate?.()}
        className={wrapClass}
        style={rowStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {rowContent}
      </NavLink>
    ) : (
      <div
        role="button"
        tabIndex={0}
        className={wrapClass}
        style={rowStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (hasChildren && !collapsed) setOpen((o) => !o)
            else if (collapsed && item.children?.[0]?.href) {
              navigate(item.children[0].href)
              onItemNavigate?.()
            }
          }
        }}
        onClick={() => {
          if (hasChildren) {
            if (!collapsed) setOpen((o) => !o)
            else if (item.children?.[0]?.href) {
              navigate(item.children[0].href)
              onItemNavigate?.()
            }
          }
        }}
      >
        {rowContent}
      </div>
    )

  return (
    <div>
      {row}
      {hasChildren && !collapsed ? (
        <div
          style={{
            maxHeight: open ? 2000 : 0,
            opacity: Math.min(1, open ? 1 : 0),
            overflow: 'hidden',
            transition: 'max-height 0.22s ease, opacity 0.18s ease',
          }}
        >
          {item.children!.map((child) => (
            <DocNavItem
              key={child.href ?? child.label}
              item={child}
              collapsed={false}
              depth={depth + 1}
              pathname={pathname}
              onItemNavigate={onItemNavigate}
              theme={theme}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function BottomNavLink({
  item,
  collapsed,
  pathname,
  onItemNavigate,
  theme,
}: {
  item: NavItem
  collapsed: boolean
  pathname: string
  onItemNavigate?: () => void
  theme: SidebarTheme
}) {
  const [hovered, setHovered] = useState(false)
  const Icon = item.icon ?? BookOpen
  const isActive = pathIsActive(pathname, item.to)
  return (
    <NavLink
      to={item.to}
      end={item.to === '/docs'}
      onClick={() => onItemNavigate?.()}
      className="group relative flex cursor-pointer items-center text-left no-underline [color:inherit]"
      style={{
        padding: collapsed ? '6px 0' : '6px 12px',
        margin: collapsed ? '1px auto' : '1px 8px',
        borderRadius: 8,
        justifyContent: collapsed ? 'center' : 'flex-start',
        gap: collapsed ? 0 : 12,
        width: collapsed ? 52 : undefined,
        maxWidth: collapsed ? 52 : '100%',
        minWidth: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SidebarNeuIcon36 theme={theme} isActive={isActive} hovered={hovered}>
        <Icon
          size={17}
          strokeWidth={1.9}
          style={{ color: isActive || hovered ? theme.iconActive : theme.textMuted, transition: 'color 0.2s ease' }}
          aria-hidden
        />
      </SidebarNeuIcon36>
      {!collapsed ? (
        <span
          style={{
            fontSize: 13,
            fontWeight: isActive ? 500 : 400,
            letterSpacing: '0.01em',
            flex: 1,
            color: isActive ? theme.textActive : hovered ? theme.textHover : theme.textMuted,
            fontFamily: F.body,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minWidth: 0,
          }}
        >
          {item.label}
        </span>
      ) : null}
      {collapsed && hovered ? (
        <div
          style={{
            position: 'absolute',
            left: 'calc(100% + 8px)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: theme.tooltipBg,
            color: theme.tooltipText,
            padding: '4px 10px',
            borderRadius: 6,
            fontSize: 12,
            whiteSpace: 'nowrap',
            zIndex: 50,
            border: `1px solid ${theme.iconBorderIdle}`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            pointerEvents: 'none',
          }}
        >
          {item.label}
        </div>
      ) : null}
    </NavLink>
  )
}

export type DocsNeuSidebarProps = {
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
  onNavigate?: () => void
  docVersion?: string
  /** Quando “Fechar automaticamente” (menu automático) é ligado ou desligado no diálogo do rodapé. */
  onAutoCollapseChange?: (enabled: boolean) => void
}

export function DocsNeuSidebar({
  collapsed,
  onCollapsedChange,
  onNavigate,
  docVersion = 'v0.3.0',
  onAutoCollapseChange,
}: DocsNeuSidebarProps) {
  const theme = TN
  const { pathname } = useLocation()
  const menuTree = useMemo(() => buildMenuTree(navGroups), [])
  const [menuBehaviorOpen, setMenuBehaviorOpen] = useState(false)
  const [autoCollapse, setAutoCollapse] = useState(false)
  const [collapseSeconds, setCollapseSeconds] = useState(3)
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sidebarPointerInsideRef = useRef(false)
  const menuBehaviorOpenRef = useRef(false)
  const skipSettingsEffect = useRef(true)

  const clearTimer = useCallback(() => {
    if (collapseTimer.current) {
      clearTimeout(collapseTimer.current)
      collapseTimer.current = null
    }
  }, [])

  /** Só recolhe após sair do painel se “Fechar automaticamente” estiver ligado (com o atraso em segundos). */
  const scheduleLeaveCollapse = useCallback(() => {
    clearTimer()
    if (!autoCollapse) return
    collapseTimer.current = setTimeout(() => {
      onCollapsedChange(true)
    }, collapseSeconds * 1000)
  }, [autoCollapse, collapseSeconds, clearTimer, onCollapsedChange])

  const onPointerEnter = useCallback(() => {
    sidebarPointerInsideRef.current = true
    clearTimer()
    if (autoCollapse) onCollapsedChange(false)
  }, [autoCollapse, clearTimer, onCollapsedChange])

  const onPointerLeave = useCallback(() => {
    sidebarPointerInsideRef.current = false
    if (menuBehaviorOpenRef.current) return
    scheduleLeaveCollapse()
  }, [scheduleLeaveCollapse])

  const onMenuBehaviorOpenChange = useCallback(
    (open: boolean) => {
      menuBehaviorOpenRef.current = open
      setMenuBehaviorOpen(open)
      if (open) clearTimer()
      else
        queueMicrotask(() => {
          if (!sidebarPointerInsideRef.current) scheduleLeaveCollapse()
        })
    },
    [clearTimer, scheduleLeaveCollapse],
  )

  const rangePct = ((collapseSeconds - 1) / 29) * 100

  useEffect(() => {
    if (skipSettingsEffect.current) {
      skipSettingsEffect.current = false
      return
    }
    if (sidebarPointerInsideRef.current || menuBehaviorOpen) return
    clearTimer()
    scheduleLeaveCollapse()
  }, [collapseSeconds, autoCollapse, menuBehaviorOpen, clearTimer, scheduleLeaveCollapse])

  useEffect(() => () => clearTimer(), [clearTimer])

  useEffect(() => {
    onAutoCollapseChange?.(autoCollapse)
  }, [autoCollapse, onAutoCollapseChange])

  const width = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH

  return (
    <SidebarCtx.Provider value={{ collapsed }}>
      <aside
        className="flex flex-col"
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        style={{
          width,
          flexShrink: 0,
          backgroundColor: 'inherit',
          borderRight: `1px solid ${theme.border}`,
          transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
          minHeight: 0,
          overflowX: 'visible',
          position: 'relative',
          fontFamily: F.body,
          height: '100%',
        }}
        aria-label="Documentação Design System"
      >
        <div
          className="flex items-center justify-center overflow-hidden px-4"
          style={{
            borderBottom: `1px solid ${theme.border}`,
            height: collapsed ? 56 : 59,
            paddingLeft: collapsed ? 12 : 16,
            paddingRight: collapsed ? 12 : 16,
          }}
        >
          <div
            className="flex items-center"
            style={{
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: collapsed ? 0 : 2,
              minWidth: 0,
              width: collapsed ? 'auto' : '100%',
            }}
          >
            <img
              src={collapsed ? '/appfips-mark-collapsed.png' : '/appfips-logo.png'}
              alt="App FIPS"
              style={
                collapsed
                  ? {
                      width: 36,
                      height: 36,
                      objectFit: 'contain',
                      flexShrink: 0,
                      backgroundColor: 'transparent',
                      background: 'none',
                      display: 'block',
                    }
                  : {
                      height: 52,
                      width: 'auto',
                      maxWidth: 100,
                      minWidth: 60,
                      objectFit: 'contain',
                      objectPosition: 'left center',
                      flexShrink: 0,
                      backgroundColor: 'transparent',
                      background: 'none',
                      display: 'block',
                    }
              }
            />
            {!collapsed ? (
              <span
                style={{
                  fontFamily: F.title,
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: 1.2,
                  color: theme.textActive,
                  letterSpacing: '0.03em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Design System
              </span>
            ) : null}
          </div>
        </div>

        <nav className="sidebar-scroll min-h-0 flex-1 space-y-0.5 overflow-x-hidden overflow-y-auto py-3 [overflow-x:clip]" aria-label="Documentação">
          {menuTree.map((item) => (
            <DocNavItem
              key={item.href ?? item.label}
              item={item}
              collapsed={collapsed}
              depth={0}
              pathname={pathname}
              onItemNavigate={onNavigate}
              theme={theme}
            />
          ))}
          <div style={{ borderTop: `1px solid ${theme.border}`, margin: '8px 0 0', padding: '8px 0 0' }}>
            {bottomNavItems.map((item) => (
              <BottomNavLink key={item.to} item={item} collapsed={collapsed} pathname={pathname} onItemNavigate={onNavigate} theme={theme} />
            ))}
            <button
              type="button"
              onClick={() => onMenuBehaviorOpenChange(true)}
              onMouseEnter={(e) => { e.currentTarget.style.color = theme.accentFrom }}
              onMouseLeave={(e) => { e.currentTarget.style.color = theme.chevron }}
              aria-expanded={menuBehaviorOpen}
              aria-haspopup="dialog"
              id="docs-sidebar-menu-behavior-trigger"
              className="flex cursor-pointer items-center rounded-lg transition-colors"
              style={{
                color: theme.chevron,
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: collapsed ? 0 : 12,
                padding: collapsed ? '6px 0' : '6px 12px',
                width: collapsed ? 52 : undefined,
                maxWidth: collapsed ? 52 : '100%',
                margin: collapsed ? '1px auto' : '1px 8px',
                border: 'none',
                background: 'transparent',
              }}
            >
              <span className="flex shrink-0 items-center justify-center" style={{ width: 36, height: 36 }}>
                <Timer size={17} aria-hidden />
              </span>
              {!collapsed ? (
                <span className="text-[13px] font-normal" style={{ fontFamily: F.body }}>
                  Menu automático
                </span>
              ) : null}
            </button>

            <Dialog open={menuBehaviorOpen} onOpenChange={onMenuBehaviorOpenChange}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Comportamento do menu</DialogTitle>
                  <DialogDescription className="sr-only">Ajustes de fechamento automático do menu lateral da documentação.</DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm " style={{ fontFamily: F.body, color: 'var(--color-fg)' }}>
                    Fechar automaticamente
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={autoCollapse}
                    onClick={() => {
                      setAutoCollapse((prev) => {
                        if (prev) clearTimer()
                        return !prev
                      })
                    }}
                    className="shrink-0 cursor-pointer p-0.5"
                    style={{
                      width: 44,
                      height: 24,
                      borderRadius: 12,
                      border: `1px solid ${autoCollapse ? C.azulProfundo : 'var(--color-border)'}`,
                      background: autoCollapse ? C.azulProfundo : 'var(--color-surface-muted)',
                    }}
                  >
                    <span
                      className="block rounded-full bg-white"
                      style={{
                        width: 18,
                        height: 18,
                        transform: autoCollapse ? 'translateX(22px)' : 'translateX(0)',
                        transition: 'transform 0.2s ease',
                        boxShadow: '0 1px 3px rgba(0,42,104,0.2)',
                      }}
                    />
                  </button>
                </div>
                <div style={{ opacity: autoCollapse ? 1 : 0.55 }}>
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="text-[13px]" style={{ fontFamily: F.body, color: 'var(--color-fg-muted)' }}>
                      Tempo para fechar
                    </span>
                    <span className="text-sm font-bold" style={{ fontFamily: F.body, color: 'var(--color-fg)' }}>
                      {collapseSeconds}s
                    </span>
                  </div>
                  <input
                    type="range"
                    className="docs-sidebar-behavior-range block w-full"
                    min={1}
                    max={30}
                    step={1}
                    value={collapseSeconds}
                    disabled={!autoCollapse}
                    onChange={(e) => setCollapseSeconds(Number(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, ${C.azulProfundo} 0%, ${C.azulProfundo} ${rangePct}%, ${C.azulCeuClaro} ${rangePct}%, ${C.azulCeuClaro} 100%)`,
                    }}
                  />
                  <div className="mt-2 flex justify-between text-[11px]" style={{ fontFamily: F.body, color: 'var(--color-fg-muted)' }}>
                    <span>1s</span>
                    <span>30s</span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <a
              href="https://github.com/LuizM2/Design-system-FIPS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center rounded-lg transition-colors no-underline [color:inherit]"
              style={{
                color: theme.chevron,
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: collapsed ? 0 : 12,
                padding: collapsed ? '6px 0' : '6px 12px',
                width: collapsed ? 52 : undefined,
                maxWidth: collapsed ? 52 : '100%',
                margin: collapsed ? '1px auto' : '1px 8px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.accentFrom
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.chevron
              }}
            >
              <span className="flex shrink-0 items-center justify-center" style={{ width: 36, height: 36 }}>
                <LogOut size={17} aria-hidden />
              </span>
              {!collapsed ? (
                <span className="text-[13px] font-normal" style={{ fontFamily: F.body }}>
                  Repositório
                </span>
              ) : null}
            </a>

            <div
              className="flex items-center rounded-lg transition-colors"
              style={{
                color: 'rgba(255,255,255,0.5)',
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: collapsed ? 0 : 12,
                padding: collapsed ? '6px 0' : '6px 12px',
                width: collapsed ? 52 : undefined,
                maxWidth: collapsed ? 52 : '100%',
                margin: collapsed ? '1px auto' : '1px 8px',
              }}
              title="Versão da documentação"
            >
              <span className="flex shrink-0 items-center justify-center" style={{ width: 36, height: 36 }}>
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
              </span>
              {!collapsed ? <span className="text-xs">{docVersion}</span> : null}
            </div>
          </div>
        </nav>
      </aside>
    </SidebarCtx.Provider>
  )
}

/** Re-export para páginas que leem o estado colapsado do demo (opcional). */
export { SidebarCtx }
