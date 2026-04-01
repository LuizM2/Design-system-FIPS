import { useState, useRef, useEffect } from 'react'
import { Bell, ChevronDown, Sparkles } from 'lucide-react'
import { DocPage, DemoSection } from '../../components/DocPage'
import { PatternGuidelines } from '../../components/PatternGuidelines'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { FipsLogo } from '../../../components/brand/FipsLogo'
import { PageHero, PAGE_HERO_DEFAULT_DECORATION } from '../../../composites/PageHero'
import { cn } from '../../../lib/cn'

const HOME_BACKGROUND = '/backgrounds/app-shell-home-trains.png'

// ─── Mini demo interativa ────────────────────────────────────────────────────

function HeroHeaderDemo() {
  const [scrolled, setScrolled] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => setScrolled(el.scrollTop > 60)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const glass = !scrolled

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)]">
      {/* Frame do app */}
      <div className="relative h-[420px]">
        {/* Scrollable content */}
        <div ref={scrollRef} className="h-full overflow-y-auto overscroll-contain">

          {/* Hero com fundo */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={HOME_BACKGROUND}
                alt=""
                className="h-full w-full object-cover object-center"
                draggable={false}
              />
              <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(0,19,56,0.94)_0%,rgba(0,63,138,0.84)_44%,rgba(0,144,208,0.60)_100%)]" />
            </div>

            {/* Espaço do header (pt-14) + conteúdo hero */}
            <div className="relative z-10 px-6 pt-20 pb-14 text-center">
              <Badge className="mb-4 border-0 bg-[rgba(246,146,30,0.95)] text-white shadow-[0_8px_20px_rgba(246,146,30,0.28)]">
                Sistema de Exemplo
              </Badge>
              <h2 className="text-2xl font-bold text-white">
                Hero com <span className="text-[#fdc24e]">Header Adaptativo</span>
              </h2>
              <p className="mt-3 text-sm text-white/75 max-w-xs mx-auto">
                Role a página para ver o cabeçalho transicionar de vidro para branco.
              </p>
              <div className="mt-6 flex gap-3 justify-center">
                <Button variant="accent" size="sm">Ação Primária</Button>
                <Button variant="inverseOutline" size="sm">
                  Secundária
                </Button>
              </div>
            </div>
          </div>

          {/* Conteúdo branco abaixo do hero */}
          <div className="space-y-4 bg-[#f3f6fb] p-6 min-h-[300px]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="h-3 w-1/3 rounded bg-gray-200 mb-2" />
                <div className="h-2 w-2/3 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Header sobreposto (absolute) */}
        <header
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 z-20 h-14 flex items-center justify-between px-4',
            'transition-all duration-300',
            glass
              ? 'bg-white/[0.07] backdrop-blur-md border-b border-white/[0.14]'
              : 'bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm',
          )}
        >
          <div className="flex items-center gap-2">
            <FipsLogo />
            <span className={cn('text-lg font-light transition-colors duration-300', glass ? 'text-white/40' : 'text-gray-300')}>|</span>
            <span className={cn('text-base font-semibold transition-colors duration-300', glass ? 'text-white' : 'text-[#002a68]')}>
              Aplicativo FIPS
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300', glass ? 'text-white/80' : 'text-gray-500')}>
              <Bell className="h-5 w-5" />
            </div>
            <div className={cn('flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors duration-300', glass ? 'border border-white/20 bg-white/10' : 'border border-gray-200 bg-gray-50')}>
              <div className="h-6 w-6 rounded-full bg-[#002a68] flex items-center justify-center text-xs font-semibold text-white">
                AF
              </div>
              <span className={cn('text-xs font-medium hidden sm:block transition-colors duration-300', glass ? 'text-white/90' : 'text-gray-700')}>
                Usuário
              </span>
              <ChevronDown className={cn('h-3.5 w-3.5 transition-colors duration-300', glass ? 'text-white/60' : 'text-gray-400')} />
            </div>
          </div>
        </header>

        {/* Badge de estado */}
        <div className="pointer-events-none absolute bottom-4 right-4 z-30">
          <span className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg transition-all duration-300',
            glass
              ? 'bg-[#002a68] text-white'
              : 'bg-white text-[#002a68] border border-gray-200',
          )}>
            <span className={cn('h-2 w-2 rounded-full', glass ? 'bg-[#fdc24e]' : 'bg-[#00c64c]')} />
            {glass ? 'Glass (topo)' : 'Branco (rolado)'}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Diagrama de estados ─────────────────────────────────────────────────────

function StateCard({
  label,
  sublabel,
  glass,
}: {
  label: string
  sublabel: string
  glass: boolean
}) {
  return (
    <div className="flex-1 overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-sm">
      <div className={cn('h-24 relative', glass ? 'bg-[#002a68]' : 'bg-white border-b border-gray-100')}>
        {glass && (
          <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(0,19,56,0.94),rgba(0,144,208,0.60))]" />
        )}
        <div className={cn(
          'relative z-10 h-10 flex items-center justify-between px-3 border-b transition-all',
          glass
            ? 'bg-white/[0.07] backdrop-blur-md border-white/[0.14]'
            : 'bg-white border-gray-200 shadow-sm',
        )}>
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded bg-white/90 flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-[#002a68]" />
            </div>
            <span className={cn('text-xs font-semibold', glass ? 'text-white' : 'text-[#002a68]')}>FIPS</span>
          </div>
          <Bell className={cn('h-4 w-4', glass ? 'text-white/70' : 'text-gray-400')} />
        </div>
      </div>
      <div className="bg-[var(--color-surface)] p-3">
        <p className="text-sm font-semibold text-[var(--color-fg)]">{label}</p>
        <p className="mt-0.5 text-xs text-[var(--color-fg-muted)]">{sublabel}</p>
      </div>
    </div>
  )
}

// ─── Código de referência ────────────────────────────────────────────────────

// ─── Página ──────────────────────────────────────────────────────────────────

export default function HeroHeaderDoc() {
  return (
    <DocPage
      title="Hero Header"
      description="Cabeçalho que se funde ao hero com efeito de vidro (glass) e transiciona para branco ao rolar — usado exclusivamente na página Home. Nas demais rotas (módulos), use o componente PageHero com faixa azul e trem sutil (veja seção abaixo e padrão Dashboard)."
    >
      <PatternGuidelines
        rules={[
          'Aplique somente na página Home. Todas as outras páginas usam header branco estático.',
          'O threshold de 60 px foi calibrado para a transição ocorrer antes do conteúdo branco chegar sob o header.',
          'Mantenha transition-all duration-300 para suavidade; nunca remova a transição.',
          'O header deve ser absolute (não fixed) para ficar contido no flex-container da sidebar.',
          'O conteúdo do hero precisa de pt-28 / md:pt-32 para não ficar oculto atrás do header absolute.',
          'Ícones e textos do header recebem prop inverted={glass} — branco no topo, cinza ao rolar.',
        ]}
        required={[
          'Estado headerScrolled + listener no scroll do <main ref={mainRef}>.',
          'Reset do estado ao trocar de rota (useEffect em [location.pathname]).',
          'Header absolute na home; flex-shrink-0 normal nas outras páginas.',
          'FipsLogo sempre em container branco — funciona em qualquer fundo.',
        ]}
        optional={[
          'Ajustar threshold (padrão 60 px) se o hero for mais alto ou mais curto.',
          'Adicionar sombra extra no estado rolado com shadow-[0_2px_12px_rgba(0,0,0,0.08)].',
        ]}
      />

      <DemoSection
        title="PageHero — faixa de módulo (não é este padrão)"
      >
        <p className="mb-4 text-sm text-[var(--color-fg-muted)]">
          Produção, Governança e demais telas internas usam esta faixa azul padrão — não o header glass da
          Home. O trem/trilhos vêm da mesma arte base ({PAGE_HERO_DEFAULT_DECORATION}).
        </p>
        <div className="max-w-3xl overflow-hidden rounded-xl border border-[var(--color-border)] shadow-sm">
          <PageHero>
            <div className="px-6 py-8">
              <p className="text-xs font-medium uppercase tracking-wide text-white/70">Exemplo</p>
              <h3 className="mt-1 font-heading text-xl font-semibold text-white">Faixa de módulo (PageHero)</h3>
              <p className="mt-2 max-w-md text-sm text-white/80">
                Gradiente institucional + imagem sutil à direita. Detalhes em Padrão: Dashboard.
              </p>
            </div>
          </PageHero>
        </div>
      </DemoSection>

      <DemoSection title="Demo interativa — role o conteúdo">
        <HeroHeaderDemo />
      </DemoSection>

      <DemoSection title="Estados do header">
        <div className="flex gap-4">
          <StateCard
            label="Glass — no topo"
            sublabel="scrollTop ≤ 60 px · bg-white/7 backdrop-blur-md"
            glass
          />
          <StateCard
            label="Branco — após rolar"
            sublabel="scrollTop > 60 px · bg-white/95 backdrop-blur-sm shadow"
            glass={false}
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Implementação"
      >
        <p className="text-sm text-[var(--color-fg-muted)]">
          O padrão está implementado no <strong>fips-suprimentos</strong> (App.tsx + Home.tsx)
          e segue o mesmo layout do <strong>ApplicationShell</strong>.
          Copie o bloco acima como ponto de partida para novos produtos FIPS.
        </p>
      </DemoSection>

      <DemoSection title="Regra de cores por fundo">
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                <th className="px-4 py-3 text-left font-semibold text-[var(--color-fg)]">Contexto</th>
                <th className="px-4 py-3 text-left font-semibold text-[var(--color-fg)]">Background do header</th>
                <th className="px-4 py-3 text-left font-semibold text-[var(--color-fg)]">Texto / ícones</th>
                <th className="px-4 py-3 text-left font-semibold text-[var(--color-fg)]">Logo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {[
                ['Home (topo, hero visível)', 'bg-white/7 + backdrop-blur-md', 'Branco (inverted)', 'Container branco'],
                ['Home (rolado, fundo branco)', 'bg-white/95 + backdrop-blur-sm', 'Cinza / azul normal', 'Container branco'],
                ['Outras páginas', 'bg-white sólido', 'Cinza / azul normal', 'Container branco'],
              ].map(([ctx, bg, text, logo]) => (
                <tr key={ctx} className="bg-[var(--color-surface)]">
                  <td className="px-4 py-3 font-medium text-[var(--color-fg)]">{ctx}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-fg-muted)]">{bg}</td>
                  <td className="px-4 py-3 text-[var(--color-fg-muted)]">{text}</td>
                  <td className="px-4 py-3 text-[var(--color-fg-muted)]">{logo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DemoSection>
    </DocPage>
  )
}
