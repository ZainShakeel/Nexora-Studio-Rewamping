import { useEffect, useRef, useState } from 'react'
import { Car, Users, Award, Cog } from 'lucide-react'

const STATS = [
  { icon: Award, value: 10, suffix: '+', label: 'Years Experience' },
  { icon: Car, value: 2500, suffix: '+', label: 'Cars Serviced' },
  { icon: Users, value: 1500, suffix: '+', label: 'Happy Customers' },
  { icon: Cog, value: 20, suffix: '+', label: 'Expert Technicians' },
]

function useCountUp(target, active, duration = 1500) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }
    let raf
    let start
    const step = (t) => {
      if (start === undefined) start = t
      const progress = Math.min((t - start) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])
  return value
}

function StatItem({ icon: Icon, value, suffix, label, active }) {
  const count = useCountUp(value, active)
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-brand-light">
        <Icon size={26} />
      </div>
      <div className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/60">
        {label}
      </div>
    </div>
  )
}

/**
 * Animated statistics band. Counters start when scrolled into view.
 */
export default function Stats({ className = '' }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`grid grid-cols-2 gap-8 lg:grid-cols-4 ${className}`}>
      {STATS.map((s) => (
        <StatItem key={s.label} {...s} active={active} />
      ))}
    </div>
  )
}
