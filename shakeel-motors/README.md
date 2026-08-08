# Shakeel Motors

A modern, premium and production-ready website for **Shakeel Motors** — a car repair &
maintenance garage in Johar Town, Lahore.

Built with **React + Vite + Tailwind CSS + React Router + Lucide Icons**.

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Business details

- **Address:** 208 F2, Chnandin Road, Johar Town, Lahore, Pakistan
- **Phone / WhatsApp:** 0333-4033270
- **Email:** info@shakeelmotors.com
- **Hours:** Mon–Sat 9:00 AM – 7:00 PM · Sunday Closed

## Pages / routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About Us |
| `/services` | Services |
| `/services/mechanical` | Mechanical Work |
| `/services/electrical` | Electrical |
| `/services/denting` | Denting |
| `/services/painting` | Painting |
| `/services/detailing` | Detailing |
| `/services/car-wash` | Car Wash |
| `/gallery` | Gallery (filter + lightbox) |
| `/contact` | Contact Us |

There is **no Pricing page** anywhere in the site by design.

## Project structure

```
src/
  components/   Reusable UI (Header, Footer, Button, ServiceCard, AppointmentModal, ...)
  context/      AppointmentContext (global booking modal)
  data/         site.js, services.js, gallery.js — single source of truth
  hooks/        useReveal (scroll animations)
  pages/        One file per route; the six service pages share ServiceDetail.jsx
```

## Notes

- All six service pages are rendered by the single data-driven `ServiceDetail` template.
- Phone links use `tel:+923334033270`; WhatsApp uses `https://wa.me/923334033270`.
- Images are sourced from Pexels for the demo. Replace with licensed originals for production.
- Deploy note: as a single-page app, configure your host to rewrite all routes to `index.html`.
