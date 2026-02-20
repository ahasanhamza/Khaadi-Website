'use client'
// components/ProductCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Heart } from 'lucide-react'
import { formatBDT, parseJsonArray } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@prisma/client'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const colors = parseJsonArray(product.colors)
  const sizes = parseJsonArray(product.sizes)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice ?? product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      size: sizes[0] || null,
      color: colors[0] || null,
    })
  }

  return (
    <Link href={`/products/${product.slug}`} className="product-card block group">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-aura-cream">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="product-card-image object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNew && !product.isSale && (
            <span className="product-badge badge-new">New</span>
          )}
          {product.isSale && (
            <span className="product-badge badge-sale">Sale</span>
          )}
          {product.isFeatured && !product.isNew && !product.isSale && (
            <span className="product-badge bg-aura-gold text-white">Featured</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={14} className="text-aura-black" />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-aura-black text-white text-center py-3 text-[11px] tracking-[0.2em] uppercase font-body translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 flex items-center justify-center gap-2">
          <ShoppingBag size={12} />
          <button onClick={handleQuickAdd} className="w-full h-full">
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="pt-3 pb-4 px-1">
        <p className="text-[10px] tracking-[0.2em] uppercase font-body text-aura-muted mb-1">
          {product.category}
        </p>
        <h3 className="font-body text-sm text-aura-black leading-snug mb-1 group-hover:text-aura-gold transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          {product.salePrice ? (
            <>
              <span className="price-sale text-sm">{formatBDT(product.salePrice)}</span>
              <span className="price-original text-xs">{formatBDT(product.price)}</span>
            </>
          ) : (
            <span className="price-display text-sm">{formatBDT(product.price)}</span>
          )}
        </div>

        {/* Color Swatches */}
        {colors.length > 0 && (
          <div className="flex gap-1 mt-2">
            {colors.slice(0, 4).map((color) => (
              <span
                key={color}
                className="text-[9px] font-body text-aura-muted bg-aura-cream px-1.5 py-0.5"
              >
                {color.split(' ')[0]}
              </span>
            ))}
            {colors.length > 4 && (
              <span className="text-[9px] font-body text-aura-muted">+{colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
