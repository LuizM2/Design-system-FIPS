import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'
import {
  docHeaderTabsNavSeparatorClass,
  docHeaderTabsSurface,
  docHeaderTabsUnderlineMd,
} from '../../lib/docHeaderChrome'

const U = docHeaderTabsUnderlineMd

export type DocHeaderSectionTab = {
  id: string
  label: string
  to: string
  end: boolean
  icon: LucideIcon
}

/** Cores para fundo claro `#EDF2F8`; geometria e animação iguais ao `TabsUnderline` do TabsDoc. */
function tabLinkClass(active: boolean) {
  return cn(
    'inline-flex shrink-0 items-center font-sans whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002a68]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
    active
      ? 'font-semibold text-[#002A68]'
      : 'font-normal text-[#7B8C96] hover:bg-[#002a68]/[0.04] hover:text-[#333B41]',
  )
}

function useSectionTabUnderline(activeIndex: number, remeasureKey?: unknown) {
  const navRef = useRef<HTMLElement>(null)
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])
  const [line, setLine] = useState({ left: 0, width: 0 })

  const update = useCallback(() => {
    const nav = navRef.current
    const el = tabRefs.current[activeIndex]
    if (!nav || !el) return
    const navRect = nav.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    setLine({
      left: elRect.left - navRect.left + nav.scrollLeft,
      width: elRect.width,
    })
  }, [activeIndex])

  useLayoutEffect(() => {
    update()
    const nav = navRef.current
    window.addEventListener('resize', update)
    nav?.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('resize', update)
      nav?.removeEventListener('scroll', update)
    }
  }, [update, remeasureKey])

  return { navRef, tabRefs, line }
}

/**
 * Abas de secção do header — **Underline** como no `TabsDoc`, sobre superfície clara `#EDF2F8`.
 */
export function DocHeaderSectionNav({
  tabs,
  currentGroupId,
  remeasureKey,
}: {
  tabs: DocHeaderSectionTab[]
  currentGroupId: string
  remeasureKey?: unknown
}) {
  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.id === currentGroupId),
  )
  const { navRef, tabRefs, line } = useSectionTabUnderline(activeIndex, remeasureKey)

  return (
    <nav
      ref={navRef}
      className={cn(
        docHeaderTabsSurface,
        'no-scrollbar relative flex w-full min-w-0 items-stretch gap-0 overflow-x-auto',
        docHeaderTabsNavSeparatorClass,
      )}
      aria-label="Seções principais"
    >
        {tabs.map((tab, i) => {
          const active = tab.id === currentGroupId
          const Icon = tab.icon
          return (
            <div
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              className="inline-flex shrink-0"
            >
              <NavLink
                to={tab.to}
                end={tab.end}
                className={tabLinkClass(active)}
                style={{
                  fontSize: U.fontSizePx,
                  padding: `${U.paddingYPx}px ${U.paddingXPx}px`,
                  gap: U.iconGapPx,
                }}
              >
                <Icon
                  className={cn(
                    'shrink-0 transition-colors duration-200',
                    active ? 'text-[#F6921E]' : 'text-[#7B8C96]',
                  )}
                  style={{ width: U.iconSizePx, height: U.iconSizePx }}
                  strokeWidth={1.5}
                  aria-hidden
                />
                {tab.label}
              </NavLink>
            </div>
          )
        })}
        <span
          className="pointer-events-none absolute -bottom-0.5 h-[3px] rounded-t-[3px] bg-[#F6921E]"
          style={{
            left: line.left,
            width: line.width,
            transition: U.indicatorTransition,
          }}
          aria-hidden
        />
    </nav>
  )
}

/** Réplica estática (HeaderDoc), mesmo padrão Underline. */
export function DocHeaderSectionNavDemo({
  tabs,
}: {
  tabs: Array<{ id: string; label: string; active: boolean; icon: LucideIcon }>
}) {
  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.active),
  )
  const { navRef, tabRefs, line } = useSectionTabUnderline(activeIndex)

  return (
    <nav
      ref={navRef}
      className={cn(
        docHeaderTabsSurface,
        'no-scrollbar relative flex w-full min-w-0 items-stretch gap-0 overflow-x-auto',
        docHeaderTabsNavSeparatorClass,
      )}
      aria-label="Demo — seções"
    >
        {tabs.map((tab, i) => {
          const Icon = tab.icon
          return (
            <div
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              className="inline-flex shrink-0"
            >
              <span
                className={cn(tabLinkClass(tab.active), 'cursor-default')}
                style={{
                  fontSize: U.fontSizePx,
                  padding: `${U.paddingYPx}px ${U.paddingXPx}px`,
                  gap: U.iconGapPx,
                }}
              >
                <Icon
                  className={cn(
                    'shrink-0 transition-colors duration-200',
                    tab.active ? 'text-[#F6921E]' : 'text-[#7B8C96]',
                  )}
                  style={{ width: U.iconSizePx, height: U.iconSizePx }}
                  aria-hidden
                  strokeWidth={1.5}
                />
                {tab.label}
              </span>
            </div>
          )
        })}
        <span
          className="pointer-events-none absolute -bottom-0.5 h-[3px] rounded-t-[3px] bg-[#F6921E]"
          style={{
            left: line.left,
            width: line.width,
            transition: U.indicatorTransition,
          }}
          aria-hidden
        />
    </nav>
  )
}
