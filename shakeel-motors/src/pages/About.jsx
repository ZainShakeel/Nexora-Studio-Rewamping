import { ShieldCheck, Gem, HeartHandshake, Award, CheckCircle2, Target } from 'lucide-react'
import useReveal from '../hooks/useReveal'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Img from '../components/Img'
import Stats from '../components/Stats'
import CTASection from '../components/CTASection'

const HERO_IMG =
  'https://images.pexels.com/photos/4489761/pexels-photo-4489761.jpeg?auto=compress&cs=tinysrgb&w=1600'
const MECHANIC_IMG =
  'https://images.pexels.com/photos/3846205/pexels-photo-3846205.jpeg?auto=compress&cs=tinysrgb&w=1200'
const GARAGE_IMG =
  'https://images.pexels.com/photos/4488641/pexels-photo-4488641.jpeg?auto=compress&cs=tinysrgb&w=1200'

const VALUES = [
  { icon: ShieldCheck, title: 'Integrity', text: 'We believe in honest communication and transparent service.' },
  { icon: Gem, title: 'Quality', text: 'We never compromise on workmanship or service quality.' },
  { icon: HeartHandshake, title: 'Customer First', text: 'Your satisfaction and safety come first.' },
  { icon: Award, title: 'Excellence', text: 'We continuously improve our skills, tools and service standards.' },
]

const TRUST_POINTS = [
  'Experienced Technicians',
  'Modern Equipment',
  'Quality Parts',
  'Transparent Pricing',
  'Reliable Service',
]

export default function About() {
  useReveal()
  return (
    <>
      <SEO
        title="About Shakeel Motors | Professional Auto Repair Lahore"
        description="Learn about Shakeel Motors — a professional car repair and maintenance garage in Johar Town, Lahore, committed to quality, honesty and customer-first service."
        image={HERO_IMG}
      />

      <PageHero
        title="About"
        titleAccent="Us"
        subtitle="Professional automotive care you can trust."
        image={HERO_IMG}
        imageAlt="Inside the Shakeel Motors garage"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About Us' },
        ]}
      />

      {/* WHO WE ARE */}
      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <SectionHeading
              eyebrow="Who We Are"
              title={
                <>
                  Your Trusted Partner
                  <br />
                  <span className="text-brand">in Car Care</span>
                </>
              }
              align="left"
            />
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
              <p>
                Shakeel Motors is a professional car repair and maintenance garage based in Johar
                Town, Lahore.
              </p>
              <p>
                Our goal is simple — provide reliable repairs, quality service and an excellent
                customer experience.
              </p>
              <p>
                From mechanical repairs and electrical diagnostics to denting, painting, detailing
                and car washing, we provide complete automotive care under one roof.
              </p>
            </div>
            <div className="mt-7 inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-surface px-5 py-4">
              <Award size={30} className="text-brand" />
              <div>
                <div className="text-2xl font-extrabold leading-none text-navy">10+ Years</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Experience
                </div>
              </div>
            </div>
          </div>
          <div className="reveal">
            <Img
              src={MECHANIC_IMG}
              alt="Shakeel Motors technician working on a vehicle engine"
              className="aspect-[4/3] w-full rounded-2xl shadow-card"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-navy py-16">
        <div className="container-x">
          <Stats />
        </div>
      </section>

      {/* MISSION */}
      <section className="section bg-surface">
        <div className="container-x">
          <div className="reveal mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-card sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Target size={28} />
            </div>
            <h2 className="mt-5 text-2xl font-extrabold text-navy sm:text-3xl">Our Mission</h2>
            <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-brand" />
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              To deliver dependable automotive services with honesty, quality workmanship and
              customer-first service.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Our Values" title="What Drives Us" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="reveal group rounded-xl border border-slate-200 bg-white p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-card"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <v.icon size={26} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-brand">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SHAKEEL MOTORS */}
      <section className="section bg-surface">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="reveal order-2 lg:order-1">
            <Img
              src={GARAGE_IMG}
              alt="Cars being serviced inside the Shakeel Motors workshop"
              className="aspect-[4/3] w-full rounded-2xl shadow-card"
            />
          </div>
          <div className="reveal order-1 lg:order-2">
            <SectionHeading eyebrow="Why Shakeel Motors" title="Why Customers Trust Us" align="left" />
            <ul className="mt-7 space-y-4">
              {TRUST_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3.5 shadow-soft"
                >
                  <CheckCircle2 size={20} className="shrink-0 text-brand" />
                  <span className="font-semibold text-navy">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        title="LET'S TAKE CARE OF YOUR CAR"
        text="Book your next service with Shakeel Motors."
        showCall={false}
      />
    </>
  )
}
