import type { LucideIcon } from 'lucide-react'
import {
  AppWindow,
  Blocks,
  BookOpen,
  Component,
  FormInput,
  Home,
  Layers3,
  LayoutDashboard,
  LayoutTemplate,
  MousePointer2,
  Palette,
  PanelLeft,
  Ruler,
  ScanText,
  SearchCheck,
  Sparkles,
  SwatchBook,
  TableProperties,
  Type,
} from 'lucide-react'

export type NavItem = {
  label: string
  to: string
  icon?: LucideIcon
}

export type NavGroup = {
  id: string
  label: string
  icon?: LucideIcon
  collapsible?: boolean
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    id: 'start',
    label: 'Início',
    icon: Home,
    collapsible: false,
    items: [{ label: 'Visão geral', to: '/docs', icon: Sparkles }],
  },
  {
    id: 'patterns',
    label: 'Padrões',
    icon: LayoutDashboard,
    items: [
      { label: 'Application Shell', to: '/docs/patterns/application-shell', icon: PanelLeft },
      { label: 'Dashboard', to: '/docs/patterns/dashboard', icon: LayoutDashboard },
      { label: 'Data Listing', to: '/docs/patterns/data-listing', icon: TableProperties },
      { label: 'Form Workspace', to: '/docs/patterns/form-workspace', icon: FormInput },
      { label: 'Modal Workflow', to: '/docs/patterns/modal-workflow', icon: ScanText },
    ],
  },
  {
    id: 'foundations',
    label: 'Fundamentos',
    icon: Palette,
    items: [
      { label: 'Cores', to: '/docs/foundations/colors', icon: Palette },
      { label: 'Tipografia', to: '/docs/foundations/typography', icon: Type },
      { label: 'Espaçamento', to: '/docs/foundations/spacing', icon: Ruler },
      { label: 'Raios', to: '/docs/foundations/radius', icon: SwatchBook },
      { label: 'Sombras', to: '/docs/foundations/shadows', icon: Layers3 },
      { label: 'Iconografia', to: '/docs/foundations/icons', icon: MousePointer2 },
    ],
  },
  {
    id: 'components',
    label: 'Componentes',
    icon: Component,
    items: [
      { label: 'Button', to: '/docs/components/button', icon: Component },
      { label: 'Input', to: '/docs/components/input', icon: FormInput },
      { label: 'Select', to: '/docs/components/select', icon: SearchCheck },
      { label: 'Textarea', to: '/docs/components/textarea', icon: AppWindow },
      { label: 'Badge', to: '/docs/components/badge', icon: Blocks },
      { label: 'Card', to: '/docs/components/card', icon: LayoutTemplate },
      { label: 'Tabs', to: '/docs/components/tabs', icon: BookOpen },
      { label: 'Table', to: '/docs/components/table', icon: TableProperties },
      { label: 'Modal (Dialog)', to: '/docs/components/dialog', icon: ScanText },
      { label: 'Drawer', to: '/docs/components/drawer', icon: PanelLeft },
      { label: 'Toast', to: '/docs/components/toast', icon: Sparkles },
      { label: 'Tooltip', to: '/docs/components/tooltip', icon: MousePointer2 },
    ],
  },
]

export const bottomNavItems: NavItem[] = [{ label: 'Changelog', to: '/docs/changelog', icon: BookOpen }]
