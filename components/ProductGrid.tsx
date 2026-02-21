// components/ProductGrid.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Server Component — fetches products directly from SQLite via Prisma.
// Usage:
//   <ProductGrid />                     ← featured products (homepage)
//   <ProductGrid category="Lawn" />     ← filtered by category
//   <ProductGrid showAll />             ← all active products
// ─────────────────────────────────────────────────────────────────────────────

import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

// ── Types ────────────────────────────────────────────────────────────────────

type Product = {
  id: string
  name: string
  slug: string
  price: number
  salePrice: number | null
  category: string
  imageUrl: string
  images: string
  isFeatured: boolean
  isNew: boolean
  isSale: boolean
  colors: string
  sizes: string
}

type ProductGridProps = {
  category?: string
  showAll?: boolean
  limit?: number
  title?: string
  subtitle?: string
}

// ── Data Fetching (Server Action) ─────────────────────────────────────────────

async function getProducts(props: ProductGridProps): Promise<Product[]> {
  const { category, showAll, limit } = props

  const where: Prisma.ProductWhereInput = {
    active: true,
    ...(category ? { category } : {}),
    ...(!category && !showAll ? { isFeatured: true } : {}),
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: [
      { isFeatured: 'desc' },
      { isNew: 'desc' },
      { createdAt: 'desc' },
    ],
    take: limit ?? (showAll ? undefined : 12),
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      salePrice: true,
      category: true,
      imageUrl: true,
      images: true,
      isFeatured: true,
      isNew: true,
      isSale: true,
      colors: true,
      sizes: true,
    },
  })

  return products as Product[]
}

// ── Product Card ──────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  let images: string[] = []
  try {
    const parsed = JSON.parse(product.images)
    images = Array.isArray(parsed) ? parsed : [product.imageUrl]
  } catch {
    images = [product.imageUrl]
  }

  let colors: string[] = []
  try {
    colors = JSON.parse(product.colors)
  } catch {
    colors = []
  }

  const mainImage = images[0] ?? product.imageUrl
  const hoverImage = images[1] ?? mainImage
  const displayPrice = product.salePrice ?? product.price
  const hasSale = !!product.salePrice && product.salePrice < product.price
  const saving = hasSale
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0

  return (
    <article className="group relative">
      <Link href={`/products/${product.slug}`} className="block" tabIndex={0}>
        {/* ── Image ── */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f0ea]">
          {/* Main image */}
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
            priority={index < 4}
          />
          {/* Hover image */}
          <Image
            src={hoverImage}
            alt={`${product.name} — alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {hasSale && (
              <span className="bg-[#c4704a] text-white text-[9px] tracking-widest uppercase px-2 py-0.5 font-medium">
                -{saving}%
              </span>
            )}
            {product.isNew && !hasSale && (
              <span className="bg-[#1a1a1a] text-white text-[9px] tracking-widest uppercase px-2 py-0.5">
                New
              </span>
            )}
            {product.isFeatured && !product.isNew && !hasSale && (
              <span className="bg-[#8a7a6a] text-white text-[9px] tracking-widest uppercase px-2 py-0.5">
                Featured
              </span>
            )}
          </div>

          {/* Quick Add overlay — text only, no icon */}
          <div
            className="
              absolute bottom-0 inset-x-0 bg-[#1a1a1a]/90 
              py-3 translate-y-full group-hover:translate-y-0 
              transition-transform duration-300 ease-out z-10
            "
          >
            <p className="text-white text-[10px] tracking-[0.25em] uppercase text-center font-medium">
              Quick Add
            </p>
          </div>
        </div>

        {/* ── Info ── */}
        <div className="mt-3 px-0.5">
          {/* Category */}
          <p className="text-[10px] tracking-widest uppercase text-[#8a7a6a] mb-1">
            {product.category}
          </p>

          {/* Name */}
          <h3 className="text-sm text-[#1a1a1a] leading-snug line-clamp-2 group-hover:text-[#5a5a5a] transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={`text-sm font-medium ${hasSale ? 'text-[#c4704a]' : 'text-[#1a1a1a]'}`}
            >
              PKR {displayPrice.toLocaleString()}
            </span>
            {hasSale && (
              <span className="text-xs text-[#aaa] line-through">
                PKR {product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Color swatches */}
          {colors.length > 0 && (
            <div className="mt-2 flex items-center gap-1.5 flex-wrap">
              {colors.slice(0, 4).map((color) => (
                <div
                  key={color}
                  title={color}
                  className="w-3.5 h-3.5 rounded-full border border-[#d5cdc3] shrink-0"
                  style={{ backgroundColor: COLOR_MAP[color] ?? '#d5cdc3' }}
                />
              ))}
              {colors.length > 4 && (
                <span className="text-[10px] text-[#8a7a6a]">+{colors.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}

// Approximate CSS colour values for swatch dots
const COLOR_MAP: Record<string, string> = {
  'Ivory White':   '#f5f0e8',
  'Midnight Black':'#1a1a1a',
  'Dusty Rose':    '#d4a0a0',
  'Forest Green':  '#3a5e3a',
  'Navy Blue':     '#1e3a5f',
  'Terracotta':    '#c4704a',
  'Sage Green':    '#8aaa80',
  'Burgundy':      '#7c2535',
  'Powder Blue':   '#b0c8d8',
  'Mustard':       '#d4a830',
  'Crimson Red':   '#c41e3a',
  'Teal':          '#2a8a8a',
  'Lavender':      '#c0a8d0',
  'Saffron':       '#e8a020',
  'Emerald':       '#2a7a4a',
  'Coral':         '#e87060',
  'Champagne':     '#e8d8b0',
  'Plum':          '#6a2a5a',
  'Peacock Blue':  '#1a6a8a',
  'Marigold':      '#e89020',
}

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ category }: { category?: string }) {
  return (
    <div className="col-span-full py-20 text-center">
      <p className="text-4xl mb-4">🪡</p>
      <p className="text-lg font-serif text-[#1a1a1a] mb-2">
        {category ? `No products in ${category} yet` : 'No products found'}
      </p>
      <p className="text-sm text-[#8a7a6a] mb-6">
        Run <code className="bg-[#f5f0ea] px-1.5 py-0.5 rounded text-xs">npx tsx prisma/seed.ts</code> to populate the store.
      </p>
      <Link
        href="/"
        className="inline-block text-xs tracking-widest uppercase border border-[#1a1a1a] text-[#1a1a1a] px-6 py-2.5 hover:bg-[#1a1a1a] hover:text-white transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}

// ── Skeleton Loader ───────────────────────────────────────────────────────────

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] bg-[#f0ebe4] rounded" />
          <div className="mt-3 space-y-2">
            <div className="h-3 bg-[#f0ebe4] rounded w-1/3" />
            <div className="h-4 bg-[#f0ebe4] rounded w-3/4" />
            <div className="h-4 bg-[#f0ebe4] rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Main ProductGrid Export ───────────────────────────────────────────────────

export default async function ProductGrid({
  category,
  showAll = false,
  limit,
  title,
  subtitle,
}: ProductGridProps) {
  const products = await getProducts({ category, showAll, limit })

  // Default section titles
  const sectionTitle = title ?? (
    category
      ? category
      : showAll
        ? 'All Products'
        : 'Featured Collection'
  )
  const sectionSubtitle = subtitle ?? (
    category
      ? `Explore our ${category.toLowerCase()} range`
      : showAll
        ? 'Our complete collection'
        : 'Hand-picked pieces for you'
  )

  return (
    <section aria-label={sectionTitle} className="w-full">
      {/* Section header */}
      {(sectionTitle || sectionSubtitle) && (
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1a1a1a] mb-3">
            {sectionTitle}
          </h2>
          <p className="text-sm text-[#8a7a6a] tracking-wide max-w-md mx-auto">
            {sectionSubtitle}
          </p>
          <div className="mt-4 flex justify-center">
            <span className="block w-16 h-px bg-[#c4a882]" />
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.length === 0 ? (
          <EmptyState category={category} />
        ) : (
          products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        )}
      </div>

      {/* View All CTA */}
      {!showAll && products.length >= (limit ?? 12) && (
        <div className="mt-12 text-center">
          <Link
            href={category ? `/category/${category.toLowerCase().replace(/\s+/g, '-')}` : '/products'}
            className="
              inline-block text-xs tracking-[0.2em] uppercase
              border border-[#1a1a1a] text-[#1a1a1a] px-10 py-3.5
              hover:bg-[#1a1a1a] hover:text-white
              transition-colors duration-200
            "
          >
            View All {category ?? 'Products'}
          </Link>
        </div>
      )}
    </section>
  )
}
