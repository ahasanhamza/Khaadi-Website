// app/products/page.tsx
import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import ProductsFilter from './ProductsFilter'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: {
    category?: string
    filter?: string
    search?: string
    page?: string
    fabric?: string
    sort?: string
  }
}

const PAGE_SIZE = 20

async function getProducts(searchParams: PageProps['searchParams']) {
  const page = parseInt(searchParams.page || '1')
  const skip = (page - 1) * PAGE_SIZE

  const where: any = {}

  if (searchParams.category) {
    where.category = searchParams.category
  }

  if (searchParams.fabric) {
    where.fabric = { contains: searchParams.fabric }
  }

  if (searchParams.filter === 'new') where.isNew = true
  if (searchParams.filter === 'sale') where.isSale = true
  if (searchParams.filter === 'featured') where.isFeatured = true

  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search, mode: 'insensitive' } },
      { description: { contains: searchParams.search, mode: 'insensitive' } },
    ]
  }

  let orderBy: any = { createdAt: 'desc' }
  if (searchParams.sort === 'price-asc') orderBy = { price: 'asc' }
  if (searchParams.sort === 'price-desc') orderBy = { price: 'desc' }
  if (searchParams.sort === 'name') orderBy = { name: 'asc' }

  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, orderBy, skip, take: PAGE_SIZE }),
    prisma.product.count({ where }),
  ])

  return { products, total, page, totalPages: Math.ceil(total / PAGE_SIZE) }
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { products, total, page, totalPages } = await getProducts(searchParams)

  const title = searchParams.category
    ? searchParams.category
    : searchParams.filter === 'sale'
    ? 'Sale'
    : searchParams.filter === 'new'
    ? 'New Arrivals'
    : searchParams.search
    ? `Search: "${searchParams.search}"`
    : 'All Products'

  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-10">
        {/* Breadcrumb */}
        <div className="text-[11px] font-body text-aura-muted tracking-wider mb-6">
          <span>Home</span> / <span className="text-aura-black">{title}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filter */}
          <aside className="md:w-52 flex-shrink-0">
            <Suspense fallback={null}>
              <ProductsFilter />
            </Suspense>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-serif text-2xl md:text-3xl">{title}</h1>
                <p className="text-xs font-body text-aura-muted mt-0.5">{total} products</p>
              </div>
              <SortDropdown />
            </div>

            {products.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-serif text-xl mb-2">No products found</p>
                <p className="text-sm font-body text-aura-muted">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <a
                        key={p}
                        href={`?${new URLSearchParams({ ...searchParams, page: String(p) })}`}
                        className={`w-9 h-9 flex items-center justify-center text-xs font-body border transition-colors ${
                          p === page
                            ? 'bg-aura-black text-white border-aura-black'
                            : 'border-aura-border text-aura-charcoal hover:border-aura-black'
                        }`}
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function SortDropdown() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-body text-aura-muted uppercase tracking-wider hidden md:block">Sort:</span>
      <select className="select-luxury text-xs py-2 px-3 w-auto">
        <option value="">Latest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name">Name</option>
      </select>
    </div>
  )
}
