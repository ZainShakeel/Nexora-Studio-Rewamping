// Central business information — single source of truth used across the whole site.

export const site = {
  name: 'SHAKEEL MOTORS',
  tagline: 'Your trusted car repair and maintenance partner.',
  addressShort: '208 F2, Chnandin Road, Johar Town, Lahore',
  addressLines: ['208 F2, Chnandin Road,', 'Johar Town, Lahore, Pakistan'],
  phoneDisplay: '0333-4033270',
  phoneTel: 'tel:+923334033270',
  whatsappNumber: '923334033270',
  whatsappMessage: 'Hello Shakeel Motors, I would like to book a car service.',
  email: 'info@shakeelmotors.com',
  // Where contact & appointment form submissions are delivered.
  formEmail: 'shakeelzain04@gmail.com',
  // Optional: paste a free Web3Forms access key (https://web3forms.com) to hide
  // the receiving email from the page source. Leave as-is to use the FormSubmit
  // fallback (works after a one-time activation click on the first submission).
  web3formsAccessKey: 'REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY',
  hours: {
    weekdays: 'Mon - Sat: 9:00 AM - 7:00 PM',
    sunday: 'Sunday: Closed',
  },
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
  },
}

export const whatsappLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact Us', to: '/contact' },
]
