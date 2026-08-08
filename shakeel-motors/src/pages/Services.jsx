import { Users, Wrench, ShieldCheck, BadgeDollarSign, Headphones } from 'lucide-react'
import { services } from '../data/services'
import useReveal from '../hooks/useReveal'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import WhyChoose from '../components/WhyChoose'
import CTASection from '../components/CTASection'

const HERO_IMG =
  'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=1600'

const WHY_ITEMS = [
  { icon: Users, title: 'Experienced Team', text: 'Certified professionals with real-world expertise.' },
  { icon: Wrench, title: 'Modern Tools', text: 'Advanced equipment for accurate, efficient work.' },
  { icon: ShieldCheck, title: 'Quality Parts', text: 'Genuine parts for reliable, long-term performance.' },
  { icon: BadgeDollarSign, title: 'Transparent Pricing', text: 'Fair, upfront quotes with no hidden charges.' },
  { icon: Headphones, title: 'Customer Support', text: 'Friendly guidance before, during and after service.' },
]

export default function Services() {
  useReveal()
  return (
    <>
      <SEO
        title="Car Repair Services in Lahore | Shakeel Motors"
        description="Complete car repair and maintenance services in Johar Town, Lahore — mechanical, electrical, denting, painting, detailing and car wash at Shakeel Motors."
        image={HERO_IMG}
      />

      <PageHero
        title="Our"
        titleAccent="Services"
        subtitle="Complete automotive repair and maintenance solutions under one roof."
        image={HERO_IMG}
        imageAlt="Car on a lift inside the Shakeel Motors garage"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services' },
        ]}
      />

      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="What We Do"
            title="Car Repair & Maintenance Services"
            description="From minor fixes to major repairs, our experienced technicians and advanced equipment ensure the best care for your car."
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

      <section className="section bg-navy">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Why Choose Our Services?"
            description="We combine skilled people, modern tools and honest pricing to deliver dependable results every time."
            light
          />
          <div className="mt-14">
            <WhyChoose items={WHY_ITEMS} variant="dark" columns="lg:grid-cols-5" />
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Ready To Get Started?"
        title="READY TO GET YOUR CAR SERVICED?"
        text="Book an appointment today and let our experts take care of your car."
      />
    </>
  )
}
