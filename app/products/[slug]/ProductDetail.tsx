'use client'
// app/products/[slug]/ProductDetail.tsx
import { useState } from 'react'
import Image from 'next/image'
import { ShoppingBag, Heart, Share2, ChevronDown } from 'lucide-react'
import { formatBDT, parseJsonArray } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@prisma/client'

interface Props {
  product: Product
  related: Product[]
}

export default function ProductDetail({ product, related }: Props) {
  const sizes = parseJsonArray(product.sizes)
  const colors = parseJsonArray(product.colors)
  const images = parseJsonArray(product.images)
  const allImages = images.length ? images : [product.imageUrl]

  const [selectedSize, setSelectedSize] = useState(sizes[0] || null)
  const [selectedColor, setSelectedColor] = useState(colors[0] || null)
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [detailsOpen, setDetailsOpen] = useState(true)
  const [addedMsg, setAddedMsg] = useState(false)

  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice ?? product.price,
      imageUrl: product.imageUrl,
      quantity: qty,
      size: selectedSize,
      color: selectedColor,
    })
    setAddedMsg(true)
    setTimeout(() => setAddedMsg(false), 2500)
  }

  const displayPrice = product.salePrice ?? product.price

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <div className="flex gap-3">
          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex flex-col gap-2 w-16 flex-shrink-0">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative aspect-square overflow-hidden border transition-colors ${
                    activeImg === i ? 'border-aura-black' : 'border-aura-border'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}

          {/* Main Image */}
          <div className="relative flex-1 aspect-[3/4] overflow-hidden bg-aura-cream">
            <Image
              src={allImages[activeImg]}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.isSale && (
              <span className="absolute top-4 left-4 bg-aura-accent text-white text-[10px] tracking-[0.15em] uppercase font-body px-3 py-1">
                Sale
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="py-2">
          <p className="text-[10px] tracking-[0.3em] uppercase font-body text-aura-gold mb-2">
            {product.category}
            {product.fabric ? ` · ${product.fabric}` : ''}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-aura-black mb-4 leading-tight">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            {product.salePrice ? (
              <>
                <span className="font-body text-2xl text-aura-accent font-bold">
                  {formatBDT(product.salePrice)}
                </span>
                <span className="font-body text-lg text-aura-muted line-through">
                  {formatBDT(product.price)}
                </span>
                <span className="text-[11px] bg-aura-accent text-white px-2 py-0.5 font-body tracking-wider">
                  {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                </span>
              </>
            ) : (
              <span className="font-body text-2xl text-aura-black">{formatBDT(product.price)}</span>
            )}
          </div>

          {/* Color Selection */}
          {colors.length > 0 && (
            <div className="mb-5">
              <p className="text-[11px] tracking-[0.2em] uppercase font-body text-aura-muted mb-2">
                Colour: <span className="text-aura-black">{selectedColor || 'Select'}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 text-[11px] font-body border transition-all duration-150 ${
                      selectedColor === color
                        ? 'border-aura-black bg-aura-black text-white'
                        : 'border-aura-border text-aura-muted hover:border-aura-black'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] tracking-[0.2em] uppercase font-body text-aura-muted">
                  Size: <span className="text-aura-black">{selectedSize || 'Select'}</span>
                </p>
                <button className="text-[11px] font-body text-aura-gold underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 text-xs font-body border transition-all duration-150 ${
                      selectedSize === size
                        ? 'border-aura-black bg-aura-black text-white'
                        : 'border-aura-border text-aura-muted hover:border-aura-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add to Cart */}
          <div className="flex gap-3 mb-4">
            <div className="flex items-center border border-aura-border">
              <button
                className="w-10 h-12 flex items-center justify-center hover:bg-aura-cream transition-colors text-lg"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-body">{qty}</span>
              <button
                className="w-10 h-12 flex items-center justify-center hover:bg-aura-cream transition-colors text-lg"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase font-body transition-all duration-300 ${
                addedMsg
                  ? 'bg-green-600 text-white'
                  : 'bg-aura-black text-white hover:bg-aura-charcoal'
              }`}
            >
              <ShoppingBag size={14} />
              {addedMsg ? 'Added to Bag ✓' : 'Add to Bag'}
            </button>
            <button className="w-12 h-12 border border-aura-border flex items-center justify-center hover:bg-aura-cream transition-colors">
              <Heart size={16} />
            </button>
          </div>

          {/* COD badge */}
          <div className="flex gap-2 mb-6">
            <span className="text-[11px] font-body bg-aura-cream text-aura-charcoal px-3 py-1.5">
              💳 Cash on Delivery Available
            </span>
            <span className="text-[11px] font-body bg-aura-cream text-aura-charcoal px-3 py-1.5">
              🚚 Free Shipping Over ৳2,000
            </span>
          </div>

          {/* Description Accordion */}
          <div className="border-t border-aura-border">
            <button
              className="w-full flex items-center justify-between py-4 text-[11px] tracking-[0.25em] uppercase font-body"
              onClick={() => setDetailsOpen(!detailsOpen)}
            >
              Product Details
              <ChevronDown size={14} className={`transition-transform ${detailsOpen ? 'rotate-180' : ''}`} />
            </button>
            {detailsOpen && (
              <div className="pb-4 text-sm font-body text-aura-muted leading-relaxed">
                {product.description}
                {product.fabric && (
                  <p className="mt-3">
                    <span className="text-aura-black font-medium">Fabric:</span> {product.fabric}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-aura-border py-4">
            <div className="flex items-center gap-4 text-[11px] font-body text-aura-muted">
              <span>SKU: {product.id.slice(-8).toUpperCase()}</span>
              <button className="flex items-center gap-1 hover:text-aura-black transition-colors">
                <Share2 size={11} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="section-header">
            <span className="section-label">You May Also Like</span>
            <h2 className="section-title">Related Pieces</h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
