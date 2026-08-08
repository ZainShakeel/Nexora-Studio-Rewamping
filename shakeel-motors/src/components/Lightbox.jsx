import { useCallback, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Img from './Img'

/**
 * Accessible image lightbox with prev/next, counter, keyboard + backdrop close.
 */
export default function Lightbox({ images, index, onClose, onIndexChange }) {
  const isOpen = index !== null && index >= 0

  const goPrev = useCallback(
    () => onIndexChange((index - 1 + images.length) % images.length),
    [index, images.length, onIndexChange],
  )
  const goNext = useCallback(
    () => onIndexChange((index + 1) % images.length),
    [index, images.length, onIndexChange],
  )

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, goPrev, goNext])

  if (!isOpen) return null
  const current = images[index]

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/95 p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery viewer"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand"
      >
        <X size={24} />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          goPrev()
        }}
        aria-label="Previous image"
        className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand sm:left-6"
      >
        <ChevronLeft size={26} />
      </button>

      <figure className="max-h-[85vh] max-w-4xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <Img
          src={current.src}
          alt={current.alt}
          className="max-h-[80vh] w-full rounded-lg"
          imgClassName="!h-auto max-h-[80vh] w-auto object-contain"
        />
        <figcaption className="mt-4 flex items-center justify-between text-sm text-white/80">
          <span>{current.alt}</span>
          <span className="font-semibold text-white">
            {index + 1} / {images.length}
          </span>
        </figcaption>
      </figure>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          goNext()
        }}
        aria-label="Next image"
        className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand sm:right-6"
      >
        <ChevronRight size={26} />
      </button>
    </div>
  )
}
