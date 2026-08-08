import { Navigate, useParams } from 'react-router-dom'
import {
  CalendarClock,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Cog,
  Package,
  BadgeDollarSign,
  Wrench,
} from 'lucide-react'
import { getService } from '../data/services'
import { site } from '../data/site'
import { useAppointment } from '../context/AppointmentContext'
import useReveal from '../hooks/useReveal'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import ServiceFeature from '../components/ServiceFeature'
import WhyChoose from '../components/WhyChoose'
import ProcessSteps from '../components/ProcessSteps'
import Img from '../components/Img'
import Button from '../components/Button'

const PROCESS = [
  { title: 'Inspection', text: 'We thoroughly inspect your vehicle.' },
  { title: 'Diagnosis', text: 'We identify the exact problem using professional tools.' },
  { title: 'Repair', text: 'Our technicians perform the required repair.' },
  { title: 'Quality Check', text: 'We test the vehicle before handing it back.' },
]

const TRUST = [
  { icon: ShieldCheck, title: 'Certified Technicians', text: 'A highly trained, experienced team you can rely on.' },
  { icon: Cog, title: 'Modern Diagnostic Equipment', text: 'Advanced tools for accurate, efficient work.' },
  { icon: Package, title: 'Quality Parts', text: 'Genuine parts for dependable, lasting results.' },
  { icon: BadgeDollarSign, title: 'Transparent Pricing', text: 'No hidden charges — what we quote is what you pay.' },
  { icon: Wrench, title: 'Professional Workmanship', text: 'Careful, high-quality work on every vehicle.' },
]

/**
 * Reusable internal service page template. Content is fully data-driven by the
 * `:slug` route param, so all six service pages share one component.
 */
export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  useReveal([slug])

  const { openAppointment } = useAppointment()

  if (!service) return <Navigate to="/services" replace />

  const Icon = service.icon

  return (
    <>
      <SEO title={service.seo.title} description={service.seo.description} image={service.heroImage} />

      {/* HERO */}
      <PageHero
        title={service.heroTitle}
        subtitle={service.heroText}
        image={service.heroImage}
        imageAlt={`${service.title} service at Shakeel Motors`}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.title },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => openAppointment(service.title)} size="lg">
            <CalendarClock size={18} />
            BOOK APPOINTMENT
          </Button>
          <Button href={site.phoneTel} variant="ghostWhite" size="lg">
            <Phone size={18} />
            CALL US
          </Button>
        </div>
      </PageHero>

      {/* INTRO */}
      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <SectionHeading
              eyebrow={service.introHeading}
              title={service.introSubheading}
              align="left"
            />
            <p className="mt-5 text-base leading-relaxed text-slate-600">{service.introText}</p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {service.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm font-medium text-navy">
                  <CheckCircle2 size={18} className="shrink-0 text-brand" />
                  {f}
                </li>
              ))}
            </ul>
            <Button onClick={() => openAppointment(service.title)} className="mt-8">
              <CalendarClock size={18} />
              BOOK APPOINTMENT
            </Button>
          </div>
          <div className="reveal relative">
            <Img
              src={service.introImage}
              alt={`${service.title} in progress at Shakeel Motors`}
              className="aspect-[4/3] w-full rounded-2xl shadow-card"
            />
            <div className="absolute -left-4 -top-4 hidden h-16 w-16 items-center justify-center rounded-xl bg-brand text-white shadow-card-hover sm:flex">
              <Icon size={30} />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE DETAIL CARDS */}
      <section className="section bg-surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="What's Included"
            title={`${service.title} Services`}
            description="Everything we cover to keep your vehicle safe, reliable and performing at its best."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.detail.map((d) => (
              <div key={d.title} className="reveal">
                <ServiceFeature icon={d.icon} title={d.title} text={d.text} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section bg-navy">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Process"
            title={`Our ${service.title} Process`}
            description="A clear, professional process from first inspection to final quality check."
            light
          />
          <div className="mt-16">
            <ProcessSteps steps={PROCESS} light />
          </div>
        </div>
      </section>

      {/* WHY TRUST US */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Trust Us"
            title={
              <>
                Why Customers Trust
                <br />
                <span className="text-brand">Shakeel Motors</span>
              </>
            }
          />
          <div className="reveal mt-14">
            <WhyChoose items={TRUST} variant="light" columns="lg:grid-cols-5" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand">
        <div className="container-x flex flex-col items-center gap-6 py-14 text-center">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Need {service.title}?
          </h2>
          <p className="max-w-xl text-sm text-white/85 sm:text-base">Book your appointment today.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => openAppointment(service.title)} variant="white" size="lg">
              <CalendarClock size={18} />
              BOOK APPOINTMENT
            </Button>
            <Button href={site.phoneTel} variant="ghostWhite" size="lg">
              <Phone size={18} />
              CALL US
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
