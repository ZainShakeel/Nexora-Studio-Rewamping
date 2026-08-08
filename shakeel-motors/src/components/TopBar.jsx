import { MapPin, Phone } from 'lucide-react'
import { site, whatsappLink } from '../data/site'
import SocialIcons from './SocialIcons'

/**
 * Thin dark-navy information bar above the header.
 */
export default function TopBar() {
  return (
    <div className="hidden bg-navy text-white lg:block">
      <div className="container-x flex h-10 items-center justify-between text-xs">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <MapPin size={14} className="text-brand-light" />
            {site.addressShort}
          </span>
          <a href={site.phoneTel} className="flex items-center gap-2 hover:text-brand-light">
            <Phone size={14} className="text-brand-light" />
            {site.phoneDisplay}
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-light"
          >
            WhatsApp: {site.phoneDisplay}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/60">Follow Us:</span>
          <SocialIcons variant="light" />
        </div>
      </div>
    </div>
  )
}
