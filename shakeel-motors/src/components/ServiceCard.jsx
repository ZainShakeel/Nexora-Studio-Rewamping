import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import Img from './Img'

/**
 * Service card used on Home and Services pages. Image, floating icon, title,
 * description, feature list and a "Learn More" link. Subtle hover lift + zoom.
 */
export default function ServiceCard({ service }) {
  const { title, short, features, image, route, icon: Icon } = service

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-card-hover">
      <div className="relative">
        <Img
          src={image}
          alt={`${title} at Shakeel Motors`}
          className="aspect-[16/11] w-full"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
        <div className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-lg bg-brand text-white shadow-lg ring-4 ring-white transition-transform duration-300 group-hover:scale-110">
          <Icon size={22} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-9">
        <h3 className="text-lg font-bold uppercase tracking-wide text-navy">{title}</h3>
        <p className="mt-2 line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-slate-600">
          {short}
        </p>

        <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
              <Check size={14} className="shrink-0 text-brand" />
              {f}
            </li>
          ))}
        </ul>

        <Link
          to={route}
          className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold uppercase tracking-wide text-brand transition-colors hover:text-brand-dark"
        >
          Learn More
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
