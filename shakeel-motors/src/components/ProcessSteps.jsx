/**
 * Numbered process steps with a connecting line on desktop.
 * steps: [{ title, text? }]
 */
export default function ProcessSteps({ steps = [], light = false }) {
  return (
    <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {/* Connecting line (desktop) */}
      <div
        className={`absolute left-0 right-0 top-8 hidden h-px lg:block ${
          light ? 'bg-white/15' : 'bg-brand/20'
        }`}
        aria-hidden="true"
      />
      {steps.map((step, i) => (
        <div key={step.title} className="relative flex flex-col items-center text-center">
          <div
            className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-lg font-extrabold ring-8 ${
              light ? 'bg-brand text-white ring-navy' : 'bg-brand text-white ring-surface'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
          </div>
          <h3 className={`mt-5 text-base font-bold uppercase tracking-wide ${light ? 'text-white' : 'text-navy'}`}>
            {step.title}
          </h3>
          {step.text && (
            <p className={`mt-2 max-w-[15rem] text-sm leading-relaxed ${light ? 'text-white/65' : 'text-slate-600'}`}>
              {step.text}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
