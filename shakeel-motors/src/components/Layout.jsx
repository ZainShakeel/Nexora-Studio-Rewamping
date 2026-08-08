import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import FloatingWhatsApp from './FloatingWhatsApp'
import AppointmentModal from './AppointmentModal'

/**
 * Shared site chrome: header, page content, footer, floating WhatsApp and the
 * global appointment modal.
 */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <AppointmentModal />
    </div>
  )
}
