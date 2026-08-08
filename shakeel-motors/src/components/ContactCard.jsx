/**
 * Contact information tile: icon + label + one or more lines (which may be links).
 */
export default function ContactCard({ icon: Icon, label, lines = [] }) {
  return (
    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
        <Icon size={22} />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-bold uppercase tracking-wide text-navy">{label}</h3>
        <div className="mt-1 space-y-0.5 text-sm text-slate-600">
          {lines.map((line, i) =>
            line.href ? (
              <a
                key={i}
                href={line.href}
                {...(line.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="block break-words hover:text-brand"
              >
                {line.text}
              </a>
            ) : (
              <p key={i} className="break-words">
                {line.text}
              </p>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
