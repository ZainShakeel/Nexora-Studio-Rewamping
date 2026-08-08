import { Star, Quote } from 'lucide-react'

/**
 * Customer testimonial card with star rating.
 */
export default function TestimonialCard({ name, role, rating = 5, text }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-card">
      <Quote size={30} className="text-brand/20" />
      <div className="mt-3 flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">“{text}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
          {name.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-bold text-navy">{name}</div>
          <div className="text-xs text-slate-500">{role}</div>
        </div>
      </figcaption>
    </figure>
  )
}
