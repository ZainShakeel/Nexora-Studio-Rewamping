import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

/**
 * Breadcrumb trail. items: [{ label, to? }] — last item is the current page.
 */
export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/70">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.to && !last ? (
                <Link to={item.to} className="transition-colors hover:text-brand-light">
                  {item.label}
                </Link>
              ) : (
                <span className={last ? 'text-brand-light' : ''}>{item.label}</span>
              )}
              {!last && <ChevronRight size={13} className="text-white/40" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
