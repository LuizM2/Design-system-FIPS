import {
  Bell,
  Home,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  TrainFront,
  Truck,
} from 'lucide-react'
import { DocPage, DemoSection } from '../../components/DocPage'

const set = [
  { icon: Home, label: 'Home' },
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: TrainFront, label: 'Ferrovia' },
  { icon: Truck, label: 'Carga' },
  { icon: Bell, label: 'Alertas' },
  { icon: Settings, label: 'Configurações' },
  { icon: LifeBuoy, label: 'Suporte' },
]

export default function IconsPage() {
  return (
    <DocPage
      title="Iconografia"
      description="Utilize ícones em estilo outline consistente. Neste MVP adotamos Lucide (SVG) por acessibilidade e aderência a interfaces administrativas."
    >
      <DemoSection
        title="Conjunto sugerido"
        reference={`npm install lucide-react

import { Home, LayoutDashboard } from 'lucide-react'

<Home className="h-5 w-5 text-[var(--color-primary)]" aria-hidden />`}
        referenceLabel="Lucide React"
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {set.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4 text-center"
            >
              <Icon className="h-6 w-6 text-[var(--color-primary)]" aria-hidden />
              <span className="text-xs font-medium text-[var(--color-fg-muted)]">{label}</span>
            </div>
          ))}
        </div>
      </DemoSection>
    </DocPage>
  )
}
