/**
 * Small icon + title + text block. Used for "why choose us", detail cards and
 * feature strips. `variant`: 'light' (on white) or 'dark' (on navy).
 */
export default function ServiceFeature({ icon: Icon, title, text, variant = 'light', className = '' }) {
  const dark = variant === 'dark'
  return (
    <div
      className={`group flex h-full items-start gap-4 rounded-xl border p-5 transition-all duration-300 ${
        dark
          ? 'border-white/10 bg-white/5 hover:border-brand-light/40 hover:bg-white/10'
          : 'border-slate-200 bg-white shadow-soft hover:-translate-y-1 hover:border-brand/30 hover:shadow-card'
      } ${className}`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors ${
          dark ? 'bg-brand text-white' : 'bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white'
        }`}
      >
        <Icon size={22} />
      </div>
      <div>
        <h3 className={`text-base font-bold ${dark ? 'text-white' : 'text-navy'}`}>{title}</h3>
        {text && (
          <p className={`mt-1 text-sm leading-relaxed ${dark ? 'text-white/65' : 'text-slate-600'}`}>
            {text}
          </p>
        )}
      </div>
    </div>
  )
}
