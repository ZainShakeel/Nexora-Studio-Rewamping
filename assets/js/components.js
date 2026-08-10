/* =========================================================
   Nexora Studio — Shared header & footer (injected)
   Edit nav / footer / contact details HERE once for all pages.
   ========================================================= */

const SERVICES = [
  { name: 'Web Development', href: 'service-web-development.html' },
  { name: 'UI/UX Designing', href: 'service-uiux-design.html' },
  { name: 'Paid Media',      href: 'service-paid-media.html' },
  { name: 'Content Creation',href: 'service-content-creation.html' },
  { name: 'SEO',             href: 'service-seo.html' },
  { name: 'Lead Generation', href: 'service-lead-generation.html' },
];

const NAV = [
  { key: 'home',      name: 'Home',       href: 'index.html' },
  { key: 'about',     name: 'About Us',   href: 'about.html' },
  { key: 'services',  name: 'Services',   href: 'services.html', drop: SERVICES },
  { key: 'portfolio', name: 'Portfolio',  href: 'portfolio.html' },
  { key: 'process',   name: 'Process',    href: 'process.html' },
  { key: 'blog',      name: 'Blog',       href: 'blog.html' },
  { key: 'contact',   name: 'Contact Us', href: 'contact.html' },
];

/* --- editable business details --- */
const BIZ = {
  email:  'zain.abideen@nexorastudio.us',
  phone:  '+92 339 0765431',
  addr:   '123 Innovation Drive, Suite 400, Buffalo, Wyoming 82001, USA',
  cityShort: 'Buffalo, Wyoming, USA',
};

const svg = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.8c0-.5.3-.8.8-.8z"/></svg>',
  in: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 8.5H4V20h2.9V8.5zM5.4 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zM20 20h-2.9v-6c0-1.5-.5-2.4-1.8-2.4-1 0-1.5.7-1.8 1.3-.1.2-.1.5-.1.8V20H10.5s.1-9.5 0-11.5h2.9v1.6c.4-.6 1.1-1.5 2.6-1.5 1.9 0 3.3 1.2 3.3 3.9V20z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3l-6.6 7.5L21.8 21h-5.9l-4.3-5.6L6.5 21H3.5l7-8L2.6 3h6l3.9 5.2L17.5 3zm-1 16h1.6L7.6 4.6H5.9L16.5 19z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
};

function currentPage() {
  return document.body.getAttribute('data-page') || '';
}

function buildHeader() {
  const active = currentPage();
  // Contact Us is intentionally hidden from the top nav — the "Let's Talk" CTA covers it.
  const items = NAV.filter(item => item.key !== 'contact').map(item => {
    const isActive = item.key === active ? ' active' : '';
    if (item.drop) {
      const drops = item.drop.map(d => `<a href="${d.href}"><i></i>${d.name}</a>`).join('');
      return `<li class="nav-item has-drop">
        <a href="${item.href}" class="nav-link${isActive}">${item.name}<span class="caret"></span></a>
        <div class="dropdown">${drops}</div>
      </li>`;
    }
    return `<li class="nav-item"><a href="${item.href}" class="nav-link${isActive}">${item.name}</a></li>`;
  }).join('');

  return `<div class="container">
    <nav class="nav">
      <a href="index.html" class="logo"><img src="assets/nexorastudio-logo.png" alt="Nexora Studio" class="logo-img" onerror="this.outerHTML='<b>NE<span>X</span>ORA</b><small>STUDIO</small>'"></a>
      <ul class="nav-menu" id="navMenu">${items}</ul>
      <div class="nav-actions">
        <a href="contact.html" class="btn btn--primary">Let's Talk ${svg.arrow}</a>
        <button class="nav-toggle" id="navToggle" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </nav>
  </div>`;
}

function buildFooter() {
  const quick = NAV.map(n => `<a href="${n.href}">${n.name}</a>`).join('');
  const servs = SERVICES.map(s => `<a href="${s.href}">${s.name}</a>`).join('');
  return `<div class="container">
    <div class="footer-top">
      <div class="footer-about">
        <a href="index.html" class="logo"><img src="assets/nexorastudio-logo.png" alt="Nexora Studio" class="logo-img" onerror="this.outerHTML='<b>NE<span>X</span>ORA</b><small>STUDIO</small>'"></a>
        <p>We design, develop, and market digital experiences that help brands grow and succeed online.</p>
        <div class="footer-social">
          <a href="#" aria-label="Facebook">${svg.fb}</a>
          <a href="#" aria-label="LinkedIn">${svg.in}</a>
          <a href="#" aria-label="X">${svg.x}</a>
          <a href="#" aria-label="Instagram">${svg.ig}</a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Quick Links</h5>
        <div class="footer-links">${quick}</div>
      </div>
      <div class="footer-col">
        <h5>Services</h5>
        <div class="footer-links">${servs}</div>
      </div>
      <div class="footer-col">
        <h5>Contact Us</h5>
        <ul class="footer-contact">
          <li>${svg.mail}<a href="mailto:${BIZ.email}">${BIZ.email}</a></li>
          <li>${svg.phone}<a href="tel:+923390765431">${BIZ.phone}</a></li>
          <li>${svg.pin}<span>${BIZ.addr}</span></li>
        </ul>
      </div>
      <div class="footer-col footer-news">
        <h5>Newsletter</h5>
        <p>Subscribe to get latest updates and insights.</p>
        <form class="inline-form" onsubmit="return false;">
          <input type="email" placeholder="Your email address" aria-label="Email"/>
          <button aria-label="Subscribe">${svg.arrow}</button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 Nexora Studio. All Rights Reserved.</p>
      <div class="links"><a href="privacy-policy.html">Privacy Policy</a><a href="terms-of-service.html">Terms of Service</a></div>
    </div>
  </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  // Favicon (injected once for every page)
  if (!document.querySelector('link[rel="icon"]')) {
    const fav = document.createElement('link');
    fav.rel = 'icon'; fav.type = 'image/png'; fav.href = 'assets/nexorastudio-favicon.png';
    document.head.appendChild(fav);
  }

  const h = document.getElementById('site-header');
  const f = document.getElementById('site-footer');
  if (h) h.innerHTML = buildHeader();
  if (f) f.innerHTML = buildFooter();

  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
    });
  }
});
