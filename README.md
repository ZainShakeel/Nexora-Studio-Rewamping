# Nexora Studio — Website

A modern, fully responsive multi-page website for **Nexora Studio**, a digital agency.
Built with plain **HTML, CSS & JavaScript** (no build step) — host it anywhere
(Netlify, Vercel, GitHub Pages, cPanel, etc.).

## Pages
- `index.html` — Home
- `about.html` — About Us
- `services.html` — Services
- `portfolio.html` — Portfolio (live project screenshots + filters)
- `process.html` — Process
- `blog.html` — Blog (searchable + category filters)
- `contact.html` — Contact (working form via FormSubmit)
- `privacy-policy.html`, `terms-of-service.html`
- Service detail pages: Web Development, UI/UX Designing, Paid Media,
  Content Creation, SEO, Lead Generation

## Structure
```
assets/
  css/style.css      → all styling + theme (accent color in :root)
  js/components.js    → shared header, footer, favicon (edit nav/contact once)
  js/main.js          → interactions (menu, filters, FAQ, search, hero mockup)
  favicon.svg
```

## Editing tips
- **Brand accent color:** change the `--green*` variables in `assets/css/style.css`.
- **Nav / contact details:** edit the `NAV`, `SERVICES`, and `BIZ` objects at the top of `assets/js/components.js` — updates every page.
- **Contact form:** submissions are delivered by [FormSubmit](https://formsubmit.co).
  The first submission triggers a one-time confirmation email that must be approved
  to activate delivery.

© 2024 Nexora Studio. All rights reserved.
