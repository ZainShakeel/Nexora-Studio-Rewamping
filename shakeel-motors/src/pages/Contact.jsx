import { useState } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Send,
  MessageCircle,
  CalendarClock,
} from 'lucide-react'
import { Loader2, AlertCircle } from 'lucide-react'
import { site, whatsappLink } from '../data/site'
import { serviceOptions } from '../data/services'
import { useAppointment } from '../context/AppointmentContext'
import { submitForm } from '../lib/submitForm'
import useReveal from '../hooks/useReveal'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import ContactCard from '../components/ContactCard'
import Button from '../components/Button'

const HERO_IMG =
  'https://images.pexels.com/photos/4489734/pexels-photo-4489734.jpeg?auto=compress&cs=tinysrgb&w=1600'

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-light/40'
const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy'

const EMPTY = { name: '', email: '', phone: '', service: '', date: '', message: '' }

export default function Contact() {
  useReveal()
  const { openAppointment } = useAppointment()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [sendError, setSendError] = useState('')

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email.'
    if (!form.phone.trim()) next.phone = 'Please enter your phone number.'
    else if (!/^[0-9+\-\s()]{7,}$/.test(form.phone.trim())) next.phone = 'Enter a valid phone number.'
    if (!form.message.trim()) next.message = 'Please enter a message.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setSendError('')
    const res = await submitForm({
      subject: `New Contact Message — Shakeel Motors`,
      _subject: `New Contact Message — Shakeel Motors`,
      _template: 'table',
      form_type: 'Contact Message',
      name: form.name,
      from_name: form.name,
      email: form.email,
      phone: form.phone,
      service: form.service || 'Not selected',
      preferred_date: form.date || 'Not specified',
      message: form.message,
    })
    setSubmitting(false)
    if (res.ok) {
      setSent(true)
      setForm(EMPTY)
    } else {
      setSendError(
        `Sorry, we couldn't send your message. Please call us at ${site.phoneDisplay} or try again.`,
      )
    }
  }

  return (
    <>
      <SEO
        title="Contact Shakeel Motors | Johar Town Lahore"
        description="Contact Shakeel Motors in Johar Town, Lahore. Call 0333-4033270, message us on WhatsApp, or book a car service appointment online."
        image={HERO_IMG}
      />

      <PageHero
        title="Contact"
        titleAccent="Us"
        subtitle="We're here to help. Get in touch with us, book an appointment, or visit our garage."
        image={HERO_IMG}
        imageAlt="Shakeel Motors garage exterior"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Contact Us' },
        ]}
      >
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/85">
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-brand-light" /> Mon - Sat: 9:00 AM - 7:00 PM
          </span>
          <a href={site.phoneTel} className="flex items-center gap-2 hover:text-brand-light">
            <Phone size={16} className="text-brand-light" /> Call: {site.phoneDisplay}
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-brand-light"
          >
            <MessageCircle size={16} className="text-brand-light" /> WhatsApp: {site.phoneDisplay}
          </a>
        </div>
      </PageHero>

      {/* CONTACT SECTION */}
      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* LEFT — form */}
          <div className="reveal">
            <SectionHeading
              eyebrow="Get In Touch"
              title="We'd Love to Hear From You"
              align="left"
            />
            <p className="mt-4 text-sm text-slate-600">
              Fill out the form and our team will get back to you as soon as possible.
            </p>

            {sent ? (
              <div className="mt-8 flex flex-col items-center rounded-xl border border-brand/20 bg-surface p-8 text-center">
                <CheckCircle2 size={48} className="text-brand" />
                <h3 className="mt-3 text-lg font-bold text-navy">Message Sent!</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Thank you for reaching out. We'll contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-5 text-sm font-semibold text-brand hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Full Name" error={errors.name} required>
                    <input
                      className={inputClass}
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Your full name"
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Email" error={errors.email} required>
                    <input
                      className={inputClass}
                      value={form.email}
                      onChange={update('email')}
                      placeholder="you@example.com"
                      inputMode="email"
                      autoComplete="email"
                    />
                  </Field>
                  <Field label="Phone Number" error={errors.phone} required>
                    <input
                      className={inputClass}
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="03XX-XXXXXXX"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </Field>
                  <Field label="Select Service">
                    <select className={inputClass} value={form.service} onChange={update('service')}>
                      <option value="">Select a service</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Preferred Date">
                  <input type="date" className={inputClass} value={form.date} onChange={update('date')} />
                </Field>
                <Field label="Message" error={errors.message} required>
                  <textarea
                    rows={4}
                    className={inputClass}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="How can we help you?"
                  />
                </Field>
                {sendError && (
                  <p className="flex items-start gap-2 rounded-md bg-red-50 px-3 py-2.5 text-sm text-red-700">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    {sendError}
                  </p>
                )}
                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      SENDING...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      SEND MESSAGE
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* RIGHT — info */}
          <div className="reveal">
            <SectionHeading
              eyebrow="Our Contact Information"
              title="Visit Us or Reach Out Anytime"
              align="left"
            />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ContactCard
                icon={MapPin}
                label="Our Location"
                lines={[{ text: site.addressLines[0] }, { text: site.addressLines[1] }]}
              />
              <ContactCard
                icon={Phone}
                label="Phone Number"
                lines={[{ text: site.phoneDisplay, href: site.phoneTel }]}
              />
              <ContactCard
                icon={MessageCircle}
                label="WhatsApp"
                lines={[{ text: site.phoneDisplay, href: whatsappLink, external: true }]}
              />
              <ContactCard
                icon={Mail}
                label="Email"
                lines={[{ text: site.email, href: `mailto:${site.email}` }]}
              />
              <div className="sm:col-span-2">
                <ContactCard
                  icon={Clock}
                  label="Working Hours"
                  lines={[{ text: 'Mon - Sat: 9:00 AM - 7:00 PM' }, { text: 'Sunday: Closed' }]}
                />
              </div>
            </div>

            {/* Map */}
            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 shadow-soft">
              <iframe
                title="Shakeel Motors location — Johar Town, Lahore"
                src="https://www.openstreetmap.org/export/embed.html?bbox=74.245%2C31.455%2C74.295%2C31.485&layer=mapnik&marker=31.470%2C74.270"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex items-center gap-2 bg-white px-4 py-3 text-sm text-slate-600">
                <MapPin size={16} className="text-brand" />
                {site.addressShort}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-surface">
        <div className="container-x">
          <div className="reveal -mt-2 flex flex-col items-center gap-6 rounded-2xl bg-navy px-6 py-12 text-center shadow-card sm:flex-row sm:justify-between sm:text-left lg:px-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-light">
                Ready To Get Started?
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                Book an Appointment Today!
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Schedule your visit and let our experts take the best care of your car.
              </p>
            </div>
            <Button onClick={() => openAppointment()} size="lg" className="shrink-0">
              <CalendarClock size={18} />
              BOOK APPOINTMENT
            </Button>
          </div>
        </div>
      </section>

      <div className="h-16 bg-surface" />
    </>
  )
}

function Field({ label, error, required, children }) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label}
        {required && <span className="text-brand"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  )
}
