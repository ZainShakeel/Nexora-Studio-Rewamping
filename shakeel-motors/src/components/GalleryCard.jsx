import { Plus } from 'lucide-react'
import Img from './Img'

/**
 * Single gallery tile with hover overlay. Opens the lightbox on click.
 */
export default function GalleryCard({ image, index, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className="group relative block w-full overflow-hidden rounded-xl border border-slate-200 bg-navy focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2"
      aria-label={`View image: ${image.alt}`}
    >
      <Img
        src={image.src}
        alt={image.alt}
        className="aspect-[4/3] w-full"
        imgClassName="transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/80 via-navy/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex w-full items-center justify-between p-4">
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            {image.category}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white">
            <Plus size={18} />
          </span>
        </div>
      </div>
    </button>
  )
}
