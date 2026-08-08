import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { CalendarClock, Menu, X, Phone, MapPin, ChevronDown } from 'lucide-react'
import { navLinks, site, whatsappLink } from '../data/site'
import { services } from '../data/services'
import { useAppointment } from '../context/AppointmentContext'
import TopBar from './TopBar'
import Logo from './Logo'
import Button from './Button'
import SocialIcons from './SocialIcons'

const linkBase =
  'relative py-2 text-sm font-semibold transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const { openAppointment } = useAppointment()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-40">
      <TopBar />
      <div
        className={`border-b bg-white transition-shadow ${
          scrolled ? 'border-slate-200 shadow-soft' : 'border-transparent'
        }`}
      >
        <nav className="container-x flex h-24 items-center justify-between lg:h-28" aria-label="Main">
          <Logo />

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              if (link.to === '/services') {
                return (
                  <li key={link.to} className="group relative">
                    <div className="flex items-center gap-1">
                      <NavLink
                        to="/services"
                        className={({ isActive }) =>
                          `${linkBase} ${
                            isActive
                              ? 'text-brand after:scale-x-100'
                              : 'text-navy hover:text-brand hover:after:scale-x-100'
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                      <ChevronDown
                        size={15}
                        className="text-navy transition-transform duration-200 group-hover:rotate-180"
                      />
                    </div>

                    {/* Dropdown */}
                    <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="w-64 rounded-xl border border-slate-100 bg-white p-2 shadow-card">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            to={s.route}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-surface hover:text-brand"
                          >
                            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand/10 text-brand">
                              <s.icon size={16} />
                            </span>
                            {s.title}
                          </Link>
                        ))}
                        <Link
                          to="/services"
                          className="mt-1 block rounded-lg border-t border-slate-100 px-3 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-brand hover:bg-surface"
                        >
                          View All Services
                        </Link>
                      </div>
                    </div>
                  </li>
                )
              }
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `${linkBase} ${
                        isActive
                          ? 'text-brand after:scale-x-100'
                          : 'text-navy hover:text-brand hover:after:scale-x-100'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>

          <div className="hidden lg:block">
            <Button onClick={() => openAppointment()} size="md">
              <CalendarClock size={18} />
              BOOK APPOINTMENT
            </Button>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={26} />
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${mobileOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-navy/60 transition-opacity ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy"
            >
              <X size={24} />
            </button>
          </div>

          <ul className="flex flex-col gap-1 px-4 py-5">
            {navLinks.map((link) => {
              if (link.to === '/services') {
                return (
                  <li key={link.to}>
                    <div className="flex items-center">
                      <NavLink
                        to="/services"
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `flex-1 rounded-md px-4 py-3 text-base font-semibold transition-colors ${
                            isActive ? 'bg-surface text-brand' : 'text-navy hover:bg-surface'
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                      <button
                        type="button"
                        aria-label="Toggle services submenu"
                        aria-expanded={mobileServicesOpen}
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className="flex h-11 w-11 items-center justify-center rounded-md text-navy hover:bg-surface"
                      >
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-200 ${
                            mobileServicesOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>
                    {mobileServicesOpen && (
                      <ul className="ml-4 mt-1 space-y-1 border-l border-slate-200 pl-3">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <NavLink
                              to={s.route}
                              onClick={() => setMobileOpen(false)}
                              className={({ isActive }) =>
                                `flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                                  isActive ? 'bg-surface text-brand' : 'text-navy hover:bg-surface'
                                }`
                              }
                            >
                              <s.icon size={16} className="text-brand" />
                              {s.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              }
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-md px-4 py-3 text-base font-semibold transition-colors ${
                        isActive ? 'bg-surface text-brand' : 'text-navy hover:bg-surface'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>

          <div className="mt-auto space-y-4 border-t border-slate-100 px-5 py-5">
            <Button
              onClick={() => {
                setMobileOpen(false)
                openAppointment()
              }}
              className="w-full"
              size="lg"
            >
              <CalendarClock size={18} />
              BOOK APPOINTMENT
            </Button>
            <div className="space-y-2 text-sm text-slate-600">
              <a href={site.phoneTel} className="flex items-center gap-2 hover:text-brand">
                <Phone size={16} className="text-brand" /> {site.phoneDisplay}
              </a>
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-brand" /> {site.addressShort}
              </p>
            </div>
            <SocialIcons variant="onWhite" />
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-semibold text-brand"
            >
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
