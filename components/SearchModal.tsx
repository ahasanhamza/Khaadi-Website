'use client'
// components/SearchModal.tsx
import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { formatBDT } from '@/lib/utils'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!query.trim() || query.length < 2) {
      setResults([])
      return
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=6`)
        const data = await res.json()
        setResults(data.products || [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 350)
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-x-0 top-0 z-[150] bg-white border-b border-aura-border shadow-luxury-lg animate-slide-up">
      <div className="max-w-screen-lg mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <Search size={18} className="text-aura-muted flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for lawn, khaddar, pret..."
            className="flex-1 text-base font-body outline-none bg-transparent text-aura-black placeholder:text-aura-muted"
          />
          <button onClick={onClose} className="p-1">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Results */}
      {(loading || results.length > 0 || query.length >= 2) && (
        <div className="max-w-screen-lg mx-auto px-4 pb-4">
          <div className="border-t border-aura-border pt-4">
            {loading && (
              <p className="text-sm font-body text-aura-muted py-2">Searching...</p>
            )}
            {!loading && results.length === 0 && query.length >= 2 && (
              <p className="text-sm font-body text-aura-muted py-2">
                No results for &quot;{query}&quot;
              </p>
            )}
            {!loading && results.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {results.map((product: any) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="flex gap-3 items-start hover:bg-aura-cream p-2 transition-colors"
                  >
                    <div className="relative w-12 h-14 flex-shrink-0 overflow-hidden bg-aura-cream">
                      <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div>
                      <p className="text-xs font-body text-aura-black leading-tight">{product.name}</p>
                      <p className="text-xs text-aura-muted font-body mt-0.5">{product.category}</p>
                      <p className="text-xs font-body mt-0.5">
                        {formatBDT(product.salePrice ?? product.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {!loading && results.length > 0 && (
              <Link
                href={`/products?search=${encodeURIComponent(query)}`}
                onClick={onClose}
                className="block text-center mt-3 text-xs font-body tracking-widest uppercase text-aura-gold hover:underline"
              >
                View All Results
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
