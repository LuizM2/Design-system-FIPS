import { cn } from '../../lib/cn'

export function FipsLogo({ className }: { className?: string }) {
  return (
    <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white p-0.5', className)}>
      <img src="/fips-logo.png" alt="FIPS" className="h-full w-full object-contain" />
    </div>
  )
}
