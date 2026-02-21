'use client'
import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function WishlistButton({ productId, className = '' }: { productId: string; className?: string }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [wishlisted, setWishlisted] = useState(false)

  useEffect(() => {
    if (!session) return
    fetch('/api/wishlist').then(r => r.json()).then(({ ids }) => setWishlisted(ids.includes(productId)))
  }, [session, productId])

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!session) { router.push('/auth/login'); return }
    const res = await fetch('/api/wishlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId }) })
    if (res.ok) { const d = await res.json(); setWishlisted(d.wishlisted) }
  }

  return (
    <button onClick={toggle} aria-label="Toggle wishlist" className={`transition-all ${className}`}>
      <Heart size={18} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-[#0A0A0A] hover:text-red-400 transition-colors'} />
    </button>
  )
}
