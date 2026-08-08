import { CalendarClock, Phone } from 'lucide-react'
import { site } from '../data/site'
import { useAppointment } from '../context/AppointmentContext'
import Button from './Button'

/**
 * Strong blue call-to-action band. Shows a Book Appointment button and,
 * optionally, a Call Us button.
 */
export default function CTASection({
  eyebrow,
  title = 'NEED CAR REPAIR SERVICE?',
  text = 'Let our experts take care of your car. Book your appointment today.',
  showCall = true,
}) {
  const { openAppointment } = useAppointment()

  return (
    <section className="relative overflow-hidden bg-brand">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,.4) 0, transparent 45%), radial-gradient(circle at 85% 80%, rgba(3,26,58,.5) 0, transparent 40%)',
        }}
      />
      <div className="container-x relative flex flex-col items-center gap-8 py-14 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          {eyebrow && (
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => openAppointment()} variant="white" size="lg">
            <CalendarClock size={18} />
            BOOK APPOINTMENT
          </Button>
          {showCall && (
            <Button href={site.phoneTel} variant="ghostWhite" size="lg">
              <Phone size={18} />
              CALL US
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
