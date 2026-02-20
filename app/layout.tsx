// app/layout.tsx
import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond, Lato } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aura | Premium South Asian Fashion — Bangladesh',
  description:
    'Discover the finest South Asian fashion — Lawn, Khaddar, Linen & Ready-to-Wear. Free delivery across Bangladesh. Pay COD or SSLCommerz.',
  keywords: 'kameez, shalwar, lawn, khaddar, unstitched, pret, Bangladesh, BDT, COD',
  openGraph: {
    title: 'Aura — Premium South Asian Fashion',
    description: 'Luxury fashion from the subcontinent. Delivered across Bangladesh.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${lato.variable}`}>
      <body className="font-body bg-aura-white text-aura-black antialiased">
        {children}
      </body>
    </html>
  )
}
