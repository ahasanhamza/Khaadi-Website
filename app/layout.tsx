import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartSidebar from '@/components/CartSidebar'

export const metadata: Metadata = {
  title: 'Aura — Premium South Asian Fashion',
  description: 'Luxury South Asian fashion. Kurtis, lawn suits, khaddar, and more — delivered across Bangladesh.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  )
}
