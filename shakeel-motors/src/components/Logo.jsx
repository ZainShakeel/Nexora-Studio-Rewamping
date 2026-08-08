import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Brand logo.
 * - On light backgrounds (header, mobile menu) it uses the real logo image at
 *   `/logo.png` (place your file in the `public/` folder). If that image is
 *   missing it gracefully falls back to the SVG wordmark below.
 * - On dark backgrounds (footer) it always uses the white SVG wordmark so it
 *   stays legible on navy.
 */
export default function Logo({ light = false, className = '' }) {
  const [imgFailed, setImgFailed] = useState(false)

  // Real logo image on light backgrounds.
  if (!light && !imgFailed) {
    return (
      <Link
        to="/"
        className={`inline-flex items-center ${className}`}
        aria-label="Shakeel Motors — home"
      >
        <img
          src="/logo.png"
          alt="Shakeel Motors"
          onError={() => setImgFailed(true)}
          className="h-[4.5rem] w-auto sm:h-20 lg:h-[5.5rem]"
        />
      </Link>
    )
  }

  // SVG wordmark (footer + fallback).
  const stroke = light ? '#FFFFFF' : '#0057D9'
  const primary = light ? 'text-white' : 'text-navy'
  const accent = light ? 'text-brand-light' : 'text-brand'

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="Shakeel Motors — home"
    >
      <svg width="46" height="30" viewBox="0 0 46 30" fill="none" aria-hidden="true">
        <path
          d="M4 22l3.2-9.5C8 10 10 8.5 12.4 8.5h21.2c2.4 0 4.4 1.5 5.2 4L42 22"
          stroke={stroke}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path d="M2 22h42" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="14" cy="24" r="3.4" fill="none" stroke={stroke} strokeWidth="2.4" />
        <circle cx="32" cy="24" r="3.4" fill="none" stroke={stroke} strokeWidth="2.4" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`text-lg font-extrabold tracking-[0.14em] ${primary}`}>SHAKEEL</span>
        <span className={`text-[0.7rem] font-bold tracking-[0.42em] ${accent}`}>MOTORS</span>
      </span>
    </Link>
  )
}
