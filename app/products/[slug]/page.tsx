'use client'
// app/products/[slug]/page.tsx — wrapped as a server component pattern
// We use this client boundary for the add-to-cart interactivity

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductDetail from './ProductDetail'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

export default async function ProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  })

  if (!product) notFound()

  const related = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
    },
    take: 4,
  })

  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-10">
        {/* Breadcrumb */}
        <div className="text-[11px] font-body text-aura-muted tracking-wider mb-8 flex gap-1">
          <Link href="/" className="hover:text-aura-black">Home</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-aura-black">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-aura-black">{product.name}</span>
        </div>

        <ProductDetail product={product} related={related} />
      </main>
      <Footer />
    </>
  )
}
