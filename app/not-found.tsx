// app/not-found.tsx
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center text-center px-8">
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase font-body text-aura-gold mb-4">404</p>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Page Not Found</h1>
          <p className="text-sm font-body text-aura-muted mb-8 max-w-sm mx-auto">
            The page you&apos;re looking for has moved, or doesn&apos;t exist.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="btn-primary">Go Home</Link>
            <Link href="/products" className="btn-outline">Shop All</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
