import Breadcrumbs from './Breadcrumbs'

/**
 * Reusable inner-page hero: a full-bleed background image with a dark navy
 * overlay and the page content (breadcrumb + title + optional actions) layered
 * on top, left-aligned and vertically centered.
 */
export default function PageHero({ title, titleAccent, subtitle, image, imageAlt, breadcrumbs, children }) {
  return (
    <section className="relative min-h-[360px] overflow-hidden bg-navy lg:min-h-[440px]">
      {/* Background image */}
      <img
        src={image}
        alt={imageAlt || title}
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/30" />
      {/* Content over the image */}
      <div className="container-x relative z-10 flex min-h-[360px] flex-col justify-center py-16 sm:py-20 lg:min-h-[440px]">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold uppercase leading-tight text-white sm:text-5xl">
          {title} {titleAccent && <span className="text-brand-light">{titleAccent}</span>}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}
