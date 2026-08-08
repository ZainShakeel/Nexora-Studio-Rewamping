// Single source of truth for all six services.
// Powers: Home services grid, Services page, and each internal service page template.

import {
  Wrench,
  Zap,
  Hammer,
  PaintBucket,
  Sparkles,
  Droplets,
  Gauge,
  Cog,
  Disc3,
  Car,
  BatteryCharging,
  Lightbulb,
  Cpu,
  CircuitBoard,
  Shield,
  Layers,
  SprayCan,
  Palette,
  Brush,
  Sun,
  Wind,
  Waves,
} from 'lucide-react'

// Photography (replace with licensed originals for production).
const img = {
  mechanical:
    'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1200',
  electrical:
    'https://images.pexels.com/photos/13065696/pexels-photo-13065696.jpeg?auto=compress&cs=tinysrgb&w=1200',
  denting:
    'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=1200',
  painting:
    'https://images.pexels.com/photos/3822843/pexels-photo-3822843.jpeg?auto=compress&cs=tinysrgb&w=1200',
  detailing:
    'https://images.pexels.com/photos/6873126/pexels-photo-6873126.jpeg?auto=compress&cs=tinysrgb&w=1200',
  carwash:
    'https://images.pexels.com/photos/6873084/pexels-photo-6873084.jpeg?auto=compress&cs=tinysrgb&w=1200',
  engine:
    'https://images.pexels.com/photos/190537/pexels-photo-190537.jpeg?auto=compress&cs=tinysrgb&w=1200',
}

export const services = [
  {
    slug: 'mechanical',
    route: '/services/mechanical',
    title: 'Mechanical Work',
    heroTitle: 'MECHANICAL WORK',
    icon: Wrench,
    image: img.mechanical,
    heroImage: img.mechanical,
    introImage: img.engine,
    short: 'Complete mechanical repair and maintenance to keep your car running smoothly.',
    features: ['Engine Diagnostics', 'Engine Repair', 'Brake Repair', 'Suspension & Steering'],
    heroText:
      'Reliable mechanical repairs for better performance, safety and peace of mind.',
    introHeading: 'COMPLETE MECHANICAL SOLUTIONS',
    introSubheading: 'Reliable Repairs. Smooth Performance.',
    introText:
      'Our mechanical repair services cover everything from routine maintenance and engine diagnostics to brake, suspension, clutch and transmission repairs. We use modern tools and quality parts to keep your car performing at its best.',
    detail: [
      { icon: Gauge, title: 'Engine Diagnostics & Repair', text: 'Accurate computer diagnostics and expert repairs for reliable engine performance.' },
      { icon: Cog, title: 'Clutch & Transmission', text: 'Smooth gear shifting through professional clutch and transmission servicing.' },
      { icon: Disc3, title: 'Brake System Repair', text: 'Complete brake inspection, pad replacement and safe stopping performance.' },
      { icon: Car, title: 'Suspension & Steering', text: 'Comfortable, stable rides with expert suspension and steering repairs.' },
      { icon: Gauge, title: 'Engine Tune-Up', text: 'Optimized fuel efficiency and power with a full engine tune-up.' },
      { icon: Wrench, title: 'General Mechanical Repair', text: 'From minor fixes to major overhauls, we handle all mechanical work.' },
    ],
    seo: {
      title: 'Mechanical Car Repair in Lahore | Shakeel Motors',
      description:
        'Expert mechanical car repair in Johar Town, Lahore — engine diagnostics, brakes, suspension, clutch and transmission repairs at Shakeel Motors.',
    },
  },
  {
    slug: 'electrical',
    route: '/services/electrical',
    title: 'Electrical',
    heroTitle: 'ELECTRICAL WORK',
    icon: Zap,
    image: img.electrical,
    heroImage: img.electrical,
    introImage: img.electrical,
    short: 'Professional electrical diagnostics and repair for safe, reliable performance.',
    features: ['Battery Services', 'Wiring Repair', 'Lighting Systems', 'ECU Diagnostics'],
    heroText:
      'Precise electrical diagnostics and repairs for dependable, trouble-free driving.',
    introHeading: 'COMPLETE ELECTRICAL SOLUTIONS',
    introSubheading: 'Accurate Diagnostics. Reliable Power.',
    introText:
      'From dead batteries and faulty wiring to advanced ECU diagnostics, our technicians resolve every electrical issue using modern equipment — so your vehicle starts, runs and performs reliably.',
    detail: [
      { icon: BatteryCharging, title: 'Battery Diagnostics', text: 'Testing, charging and replacement for a battery you can rely on.' },
      { icon: Zap, title: 'Alternator Repair', text: 'Charging system repairs that keep your electrics powered on the road.' },
      { icon: Cog, title: 'Starter Motor', text: 'Fast, reliable starter motor diagnostics and replacement.' },
      { icon: CircuitBoard, title: 'Wiring Repair', text: 'Safe repair of damaged or faulty vehicle wiring and connections.' },
      { icon: Lightbulb, title: 'Lighting Systems', text: 'Headlights, indicators and interior lighting repaired or upgraded.' },
      { icon: Cpu, title: 'ECU Diagnostics', text: 'Advanced electronic control unit scanning and fault clearing.' },
      { icon: Zap, title: 'Electrical Fault Finding', text: 'Systematic tracing and fixing of intermittent electrical faults.' },
    ],
    seo: {
      title: 'Car Electrical Repair in Lahore | Shakeel Motors',
      description:
        'Auto electrical diagnostics and repair in Johar Town, Lahore — battery, alternator, wiring, lighting and ECU services at Shakeel Motors.',
    },
  },
  {
    slug: 'denting',
    route: '/services/denting',
    title: 'Denting',
    heroTitle: 'DENTING & BODY REPAIR',
    icon: Hammer,
    image: img.denting,
    heroImage: img.denting,
    introImage: img.denting,
    short: "Expert dent removal and body repair to restore your car's original look.",
    features: ['Dent Removal', 'Panel Repair', 'Body Reshaping', 'Accident Repair'],
    heroText:
      "Expert dent and body repair that restores your car's original shape and finish.",
    introHeading: 'COMPLETE BODY REPAIR',
    introSubheading: 'Flawless Panels. Factory Finish.',
    introText:
      "From minor dents to full accident repair, our body specialists carefully restore panels to their original shape — bringing your vehicle back to a smooth, factory-quality finish.",
    detail: [
      { icon: Hammer, title: 'Dent Removal', text: 'Precise removal of dents and dings without damaging the finish.' },
      { icon: Layers, title: 'Panel Beating', text: 'Skilled panel beating to reshape damaged body panels perfectly.' },
      { icon: Car, title: 'Body Reshaping', text: 'Restoring the original contours and lines of your vehicle body.' },
      { icon: Shield, title: 'Accident Repair', text: 'Complete post-accident body restoration and structural repair.' },
      { icon: Brush, title: 'Scratch Repair', text: 'Careful repair of surface scratches for a seamless look.' },
      { icon: Layers, title: 'Panel Replacement', text: 'Replacement of severely damaged panels with a precise fit.' },
    ],
    seo: {
      title: 'Car Denting & Body Repair in Lahore | Shakeel Motors',
      description:
        'Professional car denting and body repair in Johar Town, Lahore — dent removal, panel beating, reshaping and accident repair at Shakeel Motors.',
    },
  },
  {
    slug: 'painting',
    route: '/services/painting',
    title: 'Painting',
    heroTitle: 'AUTOMOTIVE PAINTING',
    icon: PaintBucket,
    image: img.painting,
    heroImage: img.painting,
    introImage: img.painting,
    short: 'High-quality painting with accurate colour matching and a flawless finish.',
    features: ['Full Car Painting', 'Panel Painting', 'Spot Painting', 'Scratch Removal'],
    heroText:
      'Premium automotive painting with precise colour matching and a flawless finish.',
    introHeading: 'PROFESSIONAL PAINT FINISH',
    introSubheading: 'Perfect Colour. Premium Shine.',
    introText:
      'In our professional paint booth we deliver full-body and panel painting with accurate colour matching, smooth application and a durable clear-coat finish that looks factory-fresh.',
    detail: [
      { icon: PaintBucket, title: 'Full Car Painting', text: 'Complete respray with even coverage and a showroom shine.' },
      { icon: Palette, title: 'Panel Painting', text: 'Single-panel painting blended perfectly with your existing colour.' },
      { icon: SprayCan, title: 'Spot Painting', text: 'Targeted spot repairs for chips, scuffs and small damage.' },
      { icon: Sparkles, title: 'Color Matching', text: 'Computerised colour matching for an invisible, seamless finish.' },
      { icon: Brush, title: 'Scratch Removal', text: 'Professional removal and repainting of deep scratches.' },
      { icon: Shield, title: 'Clear Coat Finishing', text: 'Protective clear-coat for lasting gloss and UV protection.' },
    ],
    seo: {
      title: 'Car Painting Services in Lahore | Shakeel Motors',
      description:
        'Professional car painting in Johar Town, Lahore — full car painting, panel and spot painting, colour matching and clear-coat finishing at Shakeel Motors.',
    },
  },
  {
    slug: 'detailing',
    route: '/services/detailing',
    title: 'Detailing',
    heroTitle: 'CAR DETAILING',
    icon: Sparkles,
    image: img.detailing,
    heroImage: img.detailing,
    introImage: img.detailing,
    short:
      'Premium interior and exterior detailing to make your vehicle look and feel like new.',
    features: ['Interior Detailing', 'Exterior Polishing', 'Ceramic Coating', 'Steam Cleaning'],
    heroText:
      'Premium interior and exterior detailing that makes your car look and feel brand new.',
    introHeading: 'PREMIUM CAR DETAILING',
    introSubheading: 'Deep Clean. Lasting Shine.',
    introText:
      'Our detailing service restores your vehicle inside and out — deep interior cleaning, paint correction, polishing and protective ceramic coating for a showroom-quality result.',
    detail: [
      { icon: Sparkles, title: 'Interior Detailing', text: 'Thorough deep cleaning of every interior surface and trim.' },
      { icon: Sun, title: 'Exterior Detailing', text: 'Full exterior decontamination, polish and protection.' },
      { icon: Disc3, title: 'Polishing', text: 'Machine polishing that removes swirls and restores gloss.' },
      { icon: Shield, title: 'Waxing', text: 'Premium wax application for depth of shine and protection.' },
      { icon: Layers, title: 'Ceramic Coating', text: 'Long-lasting ceramic protection against dirt and UV damage.' },
      { icon: Wind, title: 'Steam Cleaning', text: 'Hygienic steam cleaning for a fresh, sanitised cabin.' },
    ],
    seo: {
      title: 'Car Detailing Services in Lahore | Shakeel Motors',
      description:
        'Premium car detailing in Johar Town, Lahore — interior and exterior detailing, polishing, ceramic coating and steam cleaning at Shakeel Motors.',
    },
  },
  {
    slug: 'car-wash',
    route: '/services/car-wash',
    title: 'Car Wash',
    heroTitle: 'PROFESSIONAL CAR WASH',
    icon: Droplets,
    image: img.carwash,
    heroImage: img.carwash,
    introImage: img.carwash,
    short:
      'Professional car washing and cleaning for a spotless exterior and fresh interior.',
    features: ['Exterior Wash', 'Interior Cleaning', 'Foam Wash', 'Wax & Polish'],
    heroText:
      'A professional wash that leaves your car spotless outside and fresh inside.',
    introHeading: 'PROFESSIONAL CAR WASH',
    introSubheading: 'Spotless Finish. Fresh Feel.',
    introText:
      'Our professional car wash combines gentle foam washing, careful interior cleaning and a protective wax finish — leaving your vehicle spotless, shining and fresh.',
    detail: [
      { icon: Droplets, title: 'Exterior Wash', text: 'Careful hand wash that safely removes dirt and grime.' },
      { icon: Waves, title: 'Foam Wash', text: 'Thick foam pre-wash that lifts dirt without scratching.' },
      { icon: Sparkles, title: 'Interior Cleaning', text: 'Wipe-down and cleaning of all interior surfaces.' },
      { icon: Wind, title: 'Vacuum Cleaning', text: 'Deep vacuuming of seats, carpets and boot space.' },
      { icon: Shield, title: 'Wax & Polish', text: 'Protective wax and polish for a lasting glossy finish.' },
      { icon: Disc3, title: 'Tyre Cleaning', text: 'Tyre and rim cleaning with a clean, dark dressing.' },
    ],
    seo: {
      title: 'Professional Car Wash in Lahore | Shakeel Motors',
      description:
        'Professional car wash in Johar Town, Lahore — exterior and foam wash, interior cleaning, vacuuming and wax & polish at Shakeel Motors.',
    },
  },
]

export const serviceOptions = services.map((s) => s.title)

export function getService(slug) {
  return services.find((s) => s.slug === slug)
}
