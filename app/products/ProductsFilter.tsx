'use client'
// app/products/ProductsFilter.tsx
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const CATEGORIES = ['Unstitched', 'Ready-to-Wear', 'Accessories', 'Lawn', 'Khaddar', 'Linen']
const PRICE_RANGES = [
  { label: 'Under ৳1,000', min: 0, max: 1000 },
  { label: '৳1,000 – ৳2,000', min: 1000, max: 2000 },
  { label: '৳2,000 – ৳4,000', min: 2000, max: 4000 },
  { label: 'Over ৳4,000', min: 4000, max: 99999 },
]

export default function ProductsFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [catOpen, setCatOpen] = useState(true)

  const currentCategory = searchParams.get('category') || ''

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (cat) params.set('category', cat)
    else params.delete('category')
    params.delete('page')
    router.push(`/products?${params.toString()}`)
  }

  const setFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (filter) params.set('filter', filter)
    else params.delete('filter')
    params.delete('page')
    router.push(`/products?${params.toString()}`)
  }

  const clearAll = () => router.push('/products')

  return (
    <div className="space-y-6">
      {/* Clear */}
      {searchParams.toString() && (
        <button
          onClick={clearAll}
          className="text-[11px] font-body tracking-widest uppercase text-aura-muted hover:text-aura-black transition-colors"
        >
          Clear All Filters
        </button>
      )}

      {/* Category */}
      <div>
        <button
          className="flex items-center justify-between w-full text-[11px] font-body tracking-[0.25em] uppercase text-aura-black mb-3"
          onClick={() => setCatOpen(!catOpen)}
        >
          Category
          <ChevronDown size={12} className={`transition-transform ${catOpen ? 'rotate-180' : ''}`} />
        </button>
        {catOpen && (
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setCategory('')}
                className={`text-sm font-body transition-colors w-full text-left ${
                  !currentCategory ? 'text-aura-black font-bold' : 'text-aura-muted hover:text-aura-black'
                }`}
              >
                All
              </button>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setCategory(cat)}
                  className={`text-sm font-body transition-colors w-full text-left flex items-center justify-between ${
                    currentCategory === cat
                      ? 'text-aura-black font-bold'
                      : 'text-aura-muted hover:text-aura-black'
                  }`}
                >
                  {cat}
                  {currentCategory === cat && <span className="w-1.5 h-1.5 bg-aura-gold" />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="h-px bg-aura-border" />

      {/* Availability */}
      <div>
        <p className="text-[11px] font-body tracking-[0.25em] uppercase text-aura-black mb-3">Availability</p>
        <ul className="space-y-2">
          {[
            { label: 'New Arrivals', filter: 'new' },
            { label: 'Sale Items', filter: 'sale' },
            { label: 'Featured', filter: 'featured' },
          ].map(({ label, filter }) => (
            <li key={filter}>
              <button
                onClick={() => setFilter(filter)}
                className={`text-sm font-body transition-colors ${
                  searchParams.get('filter') === filter
                    ? 'text-aura-black font-bold'
                    : 'text-aura-muted hover:text-aura-black'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
