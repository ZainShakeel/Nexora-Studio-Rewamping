import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const AppointmentContext = createContext(null)

/**
 * Global provider so any button anywhere (header, hero, CTA, cards) can open the
 * shared Appointment modal. Optionally pre-selects a service.
 */
export function AppointmentProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [presetService, setPresetService] = useState('')

  const openAppointment = useCallback((service = '') => {
    setPresetService(service)
    setIsOpen(true)
  }, [])

  const closeAppointment = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({ isOpen, presetService, openAppointment, closeAppointment }),
    [isOpen, presetService, openAppointment, closeAppointment],
  )

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>
}

export function useAppointment() {
  const ctx = useContext(AppointmentContext)
  if (!ctx) throw new Error('useAppointment must be used within AppointmentProvider')
  return ctx
}
