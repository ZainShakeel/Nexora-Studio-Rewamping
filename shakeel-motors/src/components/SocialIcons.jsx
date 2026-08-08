import { Facebook, Instagram, Youtube } from 'lucide-react'
import { site, whatsappLink } from '../data/site'

// Simple inline WhatsApp glyph (lucide has no brand WhatsApp icon).
function WhatsAppIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.06 8.06 0 0 1 2.37 5.73c0 4.47-3.63 8.1-8.1 8.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.2-.31a8.05 8.05 0 0 1-1.24-4.28c0-4.47 3.63-8.1 8.1-8.1Zm4.68 11.44c-.06-.1-.24-.16-.5-.28-.26-.13-1.51-.75-1.75-.83-.24-.09-.4-.13-.58.13-.17.26-.66.83-.81 1-.15.17-.3.19-.55.06-.26-.13-1.08-.4-2.06-1.27-.76-.68-1.28-1.52-1.43-1.78-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.8-1.92-.21-.5-.42-.43-.58-.44l-.5-.01c-.17 0-.45.06-.68.32-.24.26-.9.88-.9 2.15 0 1.27.92 2.5 1.05 2.66.13.17 1.82 2.78 4.4 3.9.62.26 1.1.42 1.47.54.62.2 1.18.17 1.63.1.5-.07 1.51-.62 1.72-1.21.21-.6.21-1.1.15-1.21Z" />
    </svg>
  )
}

/**
 * Row of social + WhatsApp icons. `variant` controls colour treatment.
 */
export default function SocialIcons({ variant = 'light', size = 16, className = '' }) {
  const items = [
    { label: 'Facebook', href: site.social.facebook, Icon: Facebook, external: true },
    { label: 'Instagram', href: site.social.instagram, Icon: Instagram, external: true },
    { label: 'YouTube', href: site.social.youtube, Icon: Youtube, external: true },
    { label: 'WhatsApp', href: whatsappLink, Icon: WhatsAppIcon, external: true },
  ]

  const styles =
    variant === 'onWhite'
      ? 'text-slate-500 hover:bg-brand hover:text-white'
      : 'text-white/80 hover:bg-brand hover:text-white'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {items.map(({ label, href, Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${styles}`}
        >
          <Icon size={size} width={size} height={size} className="h-4 w-4" />
        </a>
      ))}
    </div>
  )
}
