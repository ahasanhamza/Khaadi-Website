'use client'
// components/CartSidebar.tsx
import Link from 'next/link'
import Image from 'next/image'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatBDT } from '@/lib/utils'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore()
  const shipping = subtotal >= 2000 ? 0 : 80
  const total = subtotal + shipping

  return (
    <div className={`cart-sidebar ${isOpen ? 'cart-sidebar-open' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-aura-border">
        <div className="flex items-center gap-2">
          <ShoppingBag size={18} />
          <span className="font-serif text-lg">Your Bag ({items.length})</span>
        </div>
        <button onClick={onClose} className="p-1 hover:text-aura-muted transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto h-[calc(100vh-280px)] px-6 py-4">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={40} className="mx-auto text-aura-border mb-4" />
            <p className="font-serif text-lg mb-2">Your bag is empty</p>
            <p className="text-sm font-body text-aura-muted mb-6">Add items to get started</p>
            <button onClick={onClose} className="btn-outline text-xs">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                <div className="relative w-20 h-24 flex-shrink-0 bg-aura-cream overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body text-aura-black leading-tight line-clamp-2 mb-1">
                    {item.name}
                  </p>
                  {item.size && (
                    <p className="text-[11px] text-aura-muted font-body">Size: {item.size}</p>
                  )}
                  {item.color && (
                    <p className="text-[11px] text-aura-muted font-body">{item.color}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-aura-border">
                      <button
                        className="w-7 h-7 flex items-center justify-center hover:bg-aura-cream transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={10} />
                      </button>
                      <span className="w-8 text-center text-xs font-body">{item.quantity}</span>
                      <button
                        className="w-7 h-7 flex items-center justify-center hover:bg-aura-cream transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                    <span className="text-sm font-body">{formatBDT(item.price * item.quantity)}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-aura-muted hover:text-aura-black transition-colors self-start"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="border-t border-aura-border px-6 py-4">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm font-body">
              <span className="text-aura-muted">Subtotal</span>
              <span>{formatBDT(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm font-body">
              <span className="text-aura-muted">Shipping</span>
              <span className={shipping === 0 ? 'text-green-600' : ''}>
                {shipping === 0 ? 'FREE' : formatBDT(shipping)}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-[11px] text-aura-muted font-body">
                Add {formatBDT(2000 - subtotal)} more for free shipping
              </p>
            )}
            <div className="flex justify-between font-body font-bold border-t border-aura-border pt-2">
              <span>Total</span>
              <span>{formatBDT(total)}</span>
            </div>
          </div>
          <Link href="/checkout" onClick={onClose} className="btn-primary w-full block text-center">
            Proceed to Checkout
          </Link>
          <button
            onClick={onClose}
            className="w-full text-center mt-3 text-xs font-body text-aura-muted hover:text-aura-black transition-colors tracking-widest uppercase"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  )
}
