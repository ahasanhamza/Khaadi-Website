// app/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSlider from '@/components/HeroSlider'
import ProductCard from '@/components/ProductCard'
import prisma from '@/lib/prisma'

const CATEGORIES = [
  { label: 'Lawn', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600', href: '/products?category=Lawn' },
  { label: 'Khaddar', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600', href: '/products?category=Khaddar' },
  { label: 'Linen', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', href: '/products?category=Linen' },
  { label: 'Ready-to-Wear', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600', href: '/products?category=Ready-to-Wear' },
  { label: 'Accessories', image: 'https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=600', href: '/products?category=Accessories' },
]

export const revalidate = 60

async function getHomeData() {
  const [featured, newArrivals, saleItems] = await Promise.all([
    prisma.product.findMany({ where: { isFeatured: true }, take: 8, orderBy: { createdAt: 'desc' } }),
    prisma.product.findMany({ where: { isNew: true }, take: 4, orderBy: { createdAt: 'desc' } }),
    prisma.product.findMany({ where: { isSale: true }, take: 4, orderBy: { createdAt: 'desc' } }),
  ])
  return { featured, newArrivals, saleItems }
}

export default async function HomePage() {
  const { featured, newArrivals, saleItems } = await getHomeData()

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <HeroSlider />

        {/* Category Tiles */}
        <section className="max-w-screen-xl mx-auto px-4 md:px-8 py-16">
          <div className="section-header">
            <span className="section-label">Shop by Category</span>
            <h2 className="section-title">Our Collections</h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.label} href={cat.href} className="group relative overflow-hidden aspect-[3/4]">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                  <span className="font-serif text-base md:text-lg block">{cat.label}</span>
                  <span className="text-[10px] font-body tracking-[0.2em] uppercase text-white/70 group-hover:text-aura-gold transition-colors">
                    Shop Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        {featured.length > 0 && (
          <section className="max-w-screen-xl mx-auto px-4 md:px-8 py-8">
            <div className="section-header">
              <span className="section-label">Handpicked for You</span>
              <h2 className="section-title">Featured Pieces</h2>
              <div className="section-divider" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/products?filter=featured" className="btn-outline">
                View All Featured
              </Link>
            </div>
          </section>
        )}

        {/* Brand Story Banner */}
        <section className="relative h-[50vh] overflow-hidden my-16">
          <Image
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600"
            alt="Brand Story"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-aura-black/50" />
          <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
            <div>
              <span className="section-label text-aura-gold-light">Our Heritage</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-4">Where Tradition Meets Modernity</h2>
              <p className="font-body text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
                Each piece in our collection is a testament to the timeless artistry of South Asian craftsmanship,
                reimagined for the contemporary woman.
              </p>
              <Link href="/products" className="btn-outline border-white text-white hover:bg-white hover:text-aura-black">
                Explore All
              </Link>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <section className="max-w-screen-xl mx-auto px-4 md:px-8 py-8">
            <div className="section-header">
              <span className="section-label">Just In</span>
              <h2 className="section-title">New Arrivals</h2>
              <div className="section-divider" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Sale */}
        {saleItems.length > 0 && (
          <section className="bg-aura-cream py-16 my-8">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
              <div className="section-header">
                <span className="section-label text-aura-accent">Limited Time</span>
                <h2 className="section-title">Sale Picks</h2>
                <div className="section-divider bg-aura-accent" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {saleItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center mt-10">
                <Link href="/products?filter=sale" className="btn-primary">
                  Shop All Sale
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* USPs */}
        <section className="border-y border-aura-border py-12">
          <div className="max-w-screen-xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: '🚚', title: 'Free Delivery', desc: 'On orders over ৳2,000 across Bangladesh' },
              { icon: '💳', title: 'Cash on Delivery', desc: 'Pay when you receive your order' },
              { icon: '🔄', title: 'Easy Returns', desc: '7-day hassle-free return policy' },
              { icon: '✨', title: 'Authentic Fabric', desc: 'Premium quality, directly sourced' },
            ].map((usp) => (
              <div key={usp.title}>
                <div className="text-3xl mb-3">{usp.icon}</div>
                <h4 className="font-serif text-base mb-1">{usp.title}</h4>
                <p className="text-xs font-body text-aura-muted">{usp.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
