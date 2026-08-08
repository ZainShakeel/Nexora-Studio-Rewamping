import { Home } from 'lucide-react'
import SEO from '../components/SEO'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found | Shakeel Motors" description="The page you are looking for could not be found." />
      <section className="flex min-h-[60vh] items-center bg-surface">
        <div className="container-x text-center">
          <p className="text-7xl font-black text-brand">404</p>
          <h1 className="mt-4 text-2xl font-extrabold text-navy sm:text-3xl">Page Not Found</h1>
          <p className="mx-auto mt-3 max-w-md text-slate-600">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Button to="/" className="mt-8">
            <Home size={18} />
            Back to Home
          </Button>
        </div>
      </section>
    </>
  )
}
