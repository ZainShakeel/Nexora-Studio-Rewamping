import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react'
import { navLinks, site, whatsappLink } from '../data/site'
import { services } from '../data/services'
import Logo from './Logo'
import SocialIcons from './SocialIcons'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-x grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Logo light />
          <p className="mt-5 text-sm leading-relaxed text-white/70">
            Your trusted car repair and maintenance partner. We ensure quality service, reliable
            repairs and complete customer satisfaction.
          </p>
          <SocialIcons variant="light" className="mt-6" />
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">Quick Links</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-brand-light"
                >
                  <ChevronRight size={14} className="text-brand-light" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">Our Services</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={s.route}
                  className="inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-brand-light"
                >
                  <ChevronRight size={14} className="text-brand-light" />
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">Contact Info</h3>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brand-light" />
              <span>
                {site.addressLines[0]}
                <br />
                {site.addressLines[1]}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-brand-light" />
              <a href={site.phoneTel} className="hover:text-brand-light">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-brand-light" />
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-brand-light">
                WhatsApp: {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-brand-light" />
              <a href={`mailto:${site.email}`} className="hover:text-brand-light">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-brand-light" />
              <span>
                {site.hours.weekdays}
                <br />
                {site.hours.sunday}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row">
          <p>© 2026 Shakeel Motors. All Rights Reserved.</p>
          <p>208 F2, Chnandin Road, Johar Town, Lahore, Pakistan</p>
        </div>
      </div>
    </footer>
  )
}
