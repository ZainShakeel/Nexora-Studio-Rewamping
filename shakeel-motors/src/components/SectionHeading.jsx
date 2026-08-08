/**
 * Consistent section header: small eyebrow label, main heading, optional description.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
  as: Heading = 'h2',
  className = '',
}) {
  const isCenter = align === 'center'
  return (
    <div
      className={`${isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left'} ${className}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading
        className={`mt-3 text-3xl font-extrabold leading-tight sm:text-4xl ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </Heading>
      <span
        className={`mt-4 block h-1 w-16 rounded-full bg-brand ${isCenter ? 'mx-auto' : ''}`}
      />
      {description && (
        <p className={`mt-5 text-base leading-relaxed ${light ? 'text-white/70' : 'text-slate-600'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
