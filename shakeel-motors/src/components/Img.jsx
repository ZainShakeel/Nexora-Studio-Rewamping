import { useState } from 'react'

/**
 * Responsive image with lazy loading and a graceful branded fallback if the
 * remote source fails to load. Keeps layout intact even offline.
 */
export default function Img({ src, alt = '', className = '', imgClassName = '', ...rest }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-navy ${className}`}>
      {failed ? (
        <div
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy via-navy-800 to-brand-dark"
          role="img"
          aria-label={alt}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
            Shakeel Motors
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
          {...rest}
        />
      )}
    </div>
  )
}
