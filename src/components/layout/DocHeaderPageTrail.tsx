/**
 * Trilho “grupo da sidebar / página atual” no header da documentação.
 * Tipografia: Open Sans (corpo) + Saira Expanded (título), alinhado a `globals.css` e ao rail lateral.
 */
export function DocHeaderPageTrail({ groupLabel, pageTitle }: { groupLabel: string; pageTitle: string }) {
  return (
    <nav aria-label="Trilho da documentação" className="min-w-0">
      <ol className="m-0 flex min-w-0 list-none items-baseline gap-2 p-0 sm:gap-2.5">
        <li className="min-w-0 max-w-[min(11rem,42vw)] shrink truncate font-sans text-[13px] font-medium leading-snug text-white/[0.68] sm:max-w-[13rem] sm:text-sm">
          {groupLabel}
        </li>
        <li
          aria-hidden
          className="shrink-0 select-none font-sans text-[13px] font-light leading-none text-white/30 sm:text-sm"
        >
          /
        </li>
        <li className="min-w-0 flex-1 truncate font-heading text-base font-semibold leading-snug tracking-tight text-[#fafafa] sm:text-lg">
          {pageTitle}
        </li>
      </ol>
    </nav>
  )
}
