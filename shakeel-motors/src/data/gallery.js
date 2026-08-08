// Gallery images with category tags for filtering + lightbox.

export const galleryCategories = [
  'All',
  'Mechanical',
  'Electrical',
  'Denting',
  'Painting',
  'Detailing',
  'Car Wash',
]

const p = (id, w = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

export const galleryImages = [
  { id: 1, category: 'Mechanical', src: p(3806288), alt: 'Technician performing engine repair' },
  { id: 2, category: 'Mechanical', src: p(190537), alt: 'Close-up of a car engine bay' },
  { id: 3, category: 'Electrical', src: p(13065696), alt: 'Auto electrician using diagnostic tools' },
  { id: 4, category: 'Electrical', src: p(4489732), alt: 'Vehicle electrical wiring inspection' },
  { id: 5, category: 'Denting', src: p(3807386), alt: 'Body panel denting and repair work' },
  { id: 6, category: 'Denting', src: p(3822843), alt: 'Bodywork preparation in the workshop' },
  { id: 7, category: 'Painting', src: p(5835359), alt: 'Car in a professional paint booth' },
  { id: 8, category: 'Painting', src: p(3752194), alt: 'Freshly painted glossy car body' },
  { id: 9, category: 'Detailing', src: p(6873126), alt: 'Interior car detailing in progress' },
  { id: 10, category: 'Detailing', src: p(3354648), alt: 'Exterior polishing and detailing' },
  { id: 11, category: 'Car Wash', src: p(6873084), alt: 'Professional foam car wash' },
  { id: 12, category: 'Car Wash', src: p(4489761), alt: 'Car being washed and rinsed' },
  { id: 13, category: 'Mechanical', src: p(4489794), alt: 'Mechanic working under a lifted car' },
  { id: 14, category: 'Detailing', src: p(3862632), alt: 'Detailed clean car interior dashboard' },
  { id: 15, category: 'Painting', src: p(1082655), alt: 'Blue sports car after paintwork' },
]
