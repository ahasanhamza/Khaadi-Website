'use client'
// app/products/SortDropdown.tsx
// CLIENT COMPONENT — reads and updates URL searchParams on sort change.
// Must be client because it uses useRouter and useSearchParams.
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function SortDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort') || ''

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const params = new URLSearchParams(searchParams.toString())
      if (e.target.value) {
        params.set('sort', e.target.value)
      } else {
        params.delete('sort')
      }
      params.delete('page') // reset to page 1 on sort change
      router.push(`/products?${params.toString()}`)
    },
    [router, searchParams]
  )

  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-body text-aura-muted uppercase tracking-wider hidden md:block">
        Sort:
      </span>
      <select
        value={currentSort}
        onChange={handleChange}
        className="select-luxury text-xs py-2 px-3 w-auto"
      >
        <option value="">Latest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name">Name</option>
      </select>
    </div>
  )
}
