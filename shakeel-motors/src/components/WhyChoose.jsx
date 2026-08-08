import { Users, Cog, ShieldCheck, BadgeDollarSign, HeartHandshake } from 'lucide-react'

// Default benefits — can be overridden by passing `items`.
export const defaultBenefits = [
  {
    icon: Users,
    title: 'Experienced Technicians',
    text: 'Skilled, certified professionals with years of hands-on experience.',
  },
  {
    icon: Cog,
    title: 'Modern Equipment',
    text: 'Advanced tools and diagnostics for accurate, efficient service.',
  },
  {
    icon: ShieldCheck,
    title: 'Genuine Parts',
    text: 'Quality parts for dependable, long-lasting performance.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Transparent Pricing',
    text: 'Honest quotes with no hidden charges — what we quote is what you pay.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer Satisfaction',
    text: 'Your satisfaction and safety are always our top priority.',
  },
]

/**
 * "Why Choose Us" benefits — premium centred "pillar" cards with a numbered
 * badge, circular icon and accent underline. Works on light and dark (navy)
 * backgrounds via the `variant` prop.
 */
export default function WhyChoose({
  items = defaultBenefits,
  variant = 'light',
  columns = 'lg:grid-cols-3',
}) {
  const dark = variant === 'dark'

  return (
    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${columns}`}>
      {items.map((b, i) => (
        <div
          key={b.title}
          className={`group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border p-7 text-center transition-all duration-300 hover:-translate-y-2 ${
            dark
              ? 'border-white/10 bg-white/[0.04] hover:border-brand-light/50 hover:bg-white/[0.08]'
              : 'border-slate-200 bg-white shadow-soft hover:border-brand/40 hover:shadow-card'
          }`}
        >
          {/* Top accent bar (reveals on hover) */}
          <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />

          {/* Faint index number */}
          <span
            className={`pointer-events-none absolute right-4 top-3 text-4xl font-black leading-none ${
              dark ? 'text-white/[0.06]' : 'text-brand/[0.08]'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
          </span>

          {/* Icon */}
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-300 ${
              dark
                ? 'bg-brand text-white group-hover:bg-brand-light'
                : 'bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white'
            }`}
          >
            <b.icon size={28} />
          </div>

          <span className="mt-4 h-0.5 w-10 rounded-full bg-brand" />

          <h3 className={`mt-4 text-base font-bold ${dark ? 'text-white' : 'text-navy'}`}>
            {b.title}
          </h3>
          <p className={`mt-2 text-sm leading-relaxed ${dark ? 'text-white/70' : 'text-slate-600'}`}>
            {b.text}
          </p>
        </div>
      ))}
    </div>
  )
}
