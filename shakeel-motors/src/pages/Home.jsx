import {
  ArrowRight,
  CalendarClock,
  Wrench,
  ShieldCheck,
  Cog,
  ThumbsUp,
  CheckCircle2,
} from 'lucide-react'
import { services } from '../data/services'
import { useAppointment } from '../context/AppointmentContext'
import useReveal from '../hooks/useReveal'
import SEO from '../components/SEO'
import Img from '../components/Img'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import ServiceFeature from '../components/ServiceFeature'
import Stats from '../components/Stats'
import ProcessSteps from '../components/ProcessSteps'
import WhyChoose from '../components/WhyChoose'
import CTASection from '../components/CTASection'
import TestimonialCard from '../components/TestimonialCard'

const HERO_IMG =
  'https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg?auto=compress&cs=tinysrgb&w=1600'
const ABOUT_IMG =
  'https://images.pexels.com/photos/3846205/pexels-photo-3846205.jpeg?auto=compress&cs=tinysrgb&w=1200'

const TRUST = [
  { icon: Wrench, title: 'Expert Technicians', text: 'Skilled & experienced automotive professionals.' },
  { icon: ShieldCheck, title: 'Quality Service', text: 'Professional repairs with attention to detail.' },
  { icon: Cog, title: 'Genuine Parts', text: 'Quality parts for dependable performance.' },
  { icon: ThumbsUp, title: 'Customer Satisfaction', text: 'Your satisfaction is always our priority.' },
]

const PROCESS = [
  { title: 'Book Appointment', text: 'Schedule your visit online or by phone in minutes.' },
  { title: 'Vehicle Inspection', text: 'We thoroughly inspect your car to find the issue.' },
  { title: 'Expert Repair', text: 'Our technicians carry out the required work.' },
  { title: 'Quality Check', text: 'Every car is tested before it is handed back.' },
]

const ABOUT_POINTS = [
  'Experienced & Certified Technicians',
  'Modern Tools & Equipment',
  'Genuine Spare Parts',
  'Transparent, Fair Pricing',
  'Quick Turnaround Time',
]

const TESTIMONIALS = [
  {
    name: 'Ahmed Raza',
    role: 'Toyota Corolla Owner',
    text: 'Excellent service and honest pricing. My car runs better than ever after their mechanical work. Highly recommended in Johar Town.',
  },
  {
    name: 'Sana Malik',
    role: 'Honda City Owner',
    text: 'Got my car detailed and painted here. The finish is flawless and the team was very professional throughout.',
  },
  {
    name: 'Bilal Khan',
    role: 'Suzuki Swift Owner',
    text: 'Quick diagnosis of an electrical fault that two other shops missed. Fair, reliable and trustworthy people.',
  },
]

export default function Home() {
  const { openAppointment } = useAppointment()
  useReveal()

  return (
    <>
      <SEO
        title="Shakeel Motors | Car Repair & Maintenance in Lahore"
        description="Shakeel Motors — trusted car repair and maintenance garage in Johar Town, Lahore. Mechanical, electrical, denting, painting, detailing and car wash services."
        image={HERO_IMG}
      />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[600px] overflow-hidden bg-navy lg:min-h-[86vh]">
        {/* Background image */}
        <img
          src={HERO_IMG}
          alt="Modern car in a professional automotive garage"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />
        {/* Overlays for depth + legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/40" />
        {/* Content — over the image, left aligned, vertically centered */}
        <div className="container-x relative z-10 flex min-h-[600px] items-center py-20 sm:py-24 lg:min-h-[86vh]">
          <div className="max-w-2xl text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-light ring-1 ring-brand/30">
              Car Repair &amp; Maintenance
            </span>
            <h1 className="mt-6 text-5xl font-black uppercase leading-[1.05] text-white sm:text-6xl">
              Expert Care
              <br />
              <span className="text-brand-light">For Your Car</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Professional car repair and maintenance services you can trust. From mechanical
              repairs to detailing, Shakeel Motors keeps your vehicle running at its best.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/services" size="lg">
                OUR SERVICES
                <ArrowRight size={18} />
              </Button>
              <Button onClick={() => openAppointment()} variant="ghostWhite" size="lg">
                <CalendarClock size={18} />
                BOOK APPOINTMENT
              </Button>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm font-medium text-white/70">
              <CheckCircle2 size={16} className="text-brand-light" />
              Trusted Automotive Service in Johar Town, Lahore
            </p>
          </div>
        </div>
      </section>

      {/* ===== TRUST FEATURE STRIP ===== */}
      <section className="border-b border-slate-100 bg-white">
        <div className="container-x -mt-10 grid grid-cols-1 gap-5 pb-12 sm:grid-cols-2 lg:-mt-16 lg:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.title} className="reveal">
              <ServiceFeature {...t} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section bg-surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Services"
            description="From routine maintenance to complete repairs, our experienced team provides everything your vehicle needs under one roof."
          />
          <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.slug} className="reveal">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="reveal relative">
            <Img
              src={ABOUT_IMG}
              alt="Professional mechanic working in the Shakeel Motors garage"
              className="aspect-[4/3] w-full rounded-2xl shadow-card"
            />
            <div className="absolute -bottom-6 -right-4 hidden rounded-xl bg-brand px-6 py-5 text-center text-white shadow-card-hover sm:block">
              <div className="text-3xl font-extrabold leading-none">10+</div>
              <div className="mt-1 text-[0.65rem] font-semibold uppercase tracking-widest text-white/80">
                Years
                <br />
                Experience
              </div>
            </div>
          </div>

          <div className="reveal">
            <SectionHeading
              eyebrow="About Shakeel Motors"
              title={
                <>
                  Your Trusted Partner
                  <br />
                  <span className="text-brand">in Car Care</span>
                </>
              }
              align="left"
            />
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              At Shakeel Motors, we are committed to providing reliable, high-quality and affordable
              automotive repair and maintenance services.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              With experienced technicians and modern equipment, we make sure every vehicle receives
              the care it deserves.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ABOUT_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm font-medium text-navy">
                  <CheckCircle2 size={18} className="shrink-0 text-brand" />
                  {point}
                </li>
              ))}
            </ul>
            <Button to="/about" className="mt-8">
              LEARN MORE ABOUT US
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US (dark) ===== */}
      <section className="section bg-navy">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Why Choose Shakeel Motors?"
            description="Professional Service. Honest Work. Better Results."
            light
          />
          <div className="mt-14">
            <WhyChoose variant="dark" columns="lg:grid-cols-5" />
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative overflow-hidden bg-navy-800 py-16">
        <div className="container-x">
          <Stats />
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="section bg-surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="How We Work"
            title="Simple. Professional. Reliable."
            description="A straightforward process designed to get you back on the road with confidence."
          />
          <div className="mt-16">
            <ProcessSteps steps={PROCESS} />
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Customers Say"
            description="Trusted by hundreds of car owners across Johar Town and greater Lahore."
          />
          <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="reveal">
                <TestimonialCard {...t} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <CTASection />
    </>
  )
}
