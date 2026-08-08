import { useMemo, useState } from 'react'
import { galleryCategories, galleryImages } from '../data/gallery'
import useReveal from '../hooks/useReveal'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import GalleryCard from '../components/GalleryCard'
import Lightbox from '../components/Lightbox'
import CTASection from '../components/CTASection'

const HERO_IMG =
  'https://images.pexels.com/photos/4488642/pexels-photo-4488642.jpeg?auto=compress&cs=tinysrgb&w=1600'

export default function Gallery() {
  const [category, setCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filtered = useMemo(
    () =>
      category === 'All'
        ? galleryImages
        : galleryImages.filter((img) => img.category === category),
    [category],
  )

  useReveal([category])

  return (
    <>
      <SEO
        title="Shakeel Motors Gallery | Car Repair Lahore"
        description="Take a look inside Shakeel Motors — photos of our workshop, mechanical and electrical work, denting, painting, detailing and car wash in Johar Town, Lahore."
        image={HERO_IMG}
      />

      <PageHero
        title="Our"
        titleAccent="Gallery"
        subtitle="Take a look inside Shakeel Motors."
        image={HERO_IMG}
        imageAlt="Shakeel Motors workshop gallery"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Gallery' },
        ]}
      />

      <section className="section bg-white">
        <div className="container-x">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {galleryCategories.map((cat) => {
              const active = cat === category
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  aria-pressed={active}
                  className={`rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    active
                      ? 'bg-brand text-white shadow-soft'
                      : 'border border-slate-200 bg-white text-navy hover:border-brand hover:text-brand'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((image, i) => (
              <div key={image.id} className="reveal">
                <GalleryCard image={image} index={i} onOpen={setLightboxIndex} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-slate-500">No images in this category yet.</p>
          )}
        </div>
      </section>

      <Lightbox
        images={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />

      <CTASection />
    </>
  )
}
