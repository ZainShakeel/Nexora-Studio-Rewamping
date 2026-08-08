import { useEffect, useState } from 'react'
import { X, CalendarClock, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { serviceOptions } from '../data/services'
import { site } from '../data/site'
import { useAppointment } from '../context/AppointmentContext'
import { submitForm } from '../lib/submitForm'
import Button from './Button'

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  vehicle: '',
  service: '',
  date: '',
  time: '',
  message: '',
}

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-light/40'
const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy'

/**
 * Global, reusable appointment modal with front-end validation and a success state.
 */
export default function AppointmentModal() {
  const { isOpen, presetService, closeAppointment } = useAppointment()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [sendError, setSendError] = useState('')

  // Reset and apply preset when opened.
  useEffect(() => {
    if (isOpen) {
      setForm({ ...EMPTY, service: presetService || '' })
      setErrors({})
      setSubmitted(false)
      setSubmitting(false)
      setSendError('')
    }
  }, [isOpen, presetService])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => e.key === 'Escape' && closeAppointment()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeAppointment])

  if (!isOpen) return null

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.phone.trim()) next.phone = 'Please enter your phone number.'
    else if (!/^[0-9+\-\s()]{7,}$/.test(form.phone.trim())) next.phone = 'Enter a valid phone number.'
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = 'Enter a valid email address.'
    if (!form.service) next.service = 'Please select a service.'
    if (!form.date) next.date = 'Please choose a preferred date.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setSendError('')
    const res = await submitForm({
      subject: `New Appointment Request — ${form.service} — Shakeel Motors`,
      _subject: `New Appointment Request — ${form.service} — Shakeel Motors`,
      _template: 'table',
      form_type: 'Appointment Request',
      name: form.name,
      from_name: form.name,
      phone: form.phone,
      email: form.email || 'Not provided',
      vehicle: form.vehicle || 'Not provided',
      service: form.service,
      preferred_date: form.date,
      preferred_time: form.time || 'Not specified',
      message: form.message || 'None',
    })
    setSubmitting(false)
    if (res.ok) setSubmitted(true)
    else
      setSendError(
        `Sorry, we couldn't send your request. Please call us at ${site.phoneDisplay} or try again.`,
      )
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-navy/70 p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-title"
      onClick={closeAppointment}
    >
      <div
        className="my-8 w-full max-w-lg rounded-2xl bg-white shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between rounded-t-2xl bg-navy px-6 py-4">
          <h2 id="appointment-title" className="flex items-center gap-2 text-lg font-bold text-white">
            <CalendarClock size={20} className="text-brand-light" />
            Book an Appointment
          </h2>
          <button
            type="button"
            onClick={closeAppointment}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center px-6 py-12 text-center">
            <CheckCircle2 size={56} className="text-brand" />
            <h3 className="mt-4 text-xl font-bold text-navy">Thank You!</h3>
            <p className="mt-2 max-w-sm text-sm text-slate-600">
              Your appointment request has been received. Our team will contact you shortly to
              confirm your booking.
            </p>
            <Button onClick={closeAppointment} className="mt-6" size="md">
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-6 py-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name} required>
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </Field>
              <Field label="Phone" error={errors.phone} required>
                <input
                  className={inputClass}
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="03XX-XXXXXXX"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  className={inputClass}
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@example.com"
                  inputMode="email"
                  autoComplete="email"
                />
              </Field>
              <Field label="Vehicle">
                <input
                  className={inputClass}
                  value={form.vehicle}
                  onChange={update('vehicle')}
                  placeholder="e.g. Honda Civic 2019"
                />
              </Field>
              <Field label="Service" error={errors.service} required>
                <select className={inputClass} value={form.service} onChange={update('service')}>
                  <option value="">Select a service</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Preferred Date" error={errors.date} required>
                <input type="date" className={inputClass} value={form.date} onChange={update('date')} />
              </Field>
              <Field label="Preferred Time">
                <input type="time" className={inputClass} value={form.time} onChange={update('time')} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Message">
                  <textarea
                    rows={3}
                    className={inputClass}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell us about the issue (optional)"
                  />
                </Field>
              </div>
            </div>
            {sendError && (
              <p className="mt-4 flex items-start gap-2 rounded-md bg-red-50 px-3 py-2.5 text-sm text-red-700">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                {sendError}
              </p>
            )}
            <Button type="submit" className="mt-6 w-full" size="lg" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  SENDING...
                </>
              ) : (
                'BOOK APPOINTMENT'
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
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
