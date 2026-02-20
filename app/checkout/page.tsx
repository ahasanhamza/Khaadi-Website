'use client'
// app/checkout/page.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCartStore } from '@/store/cartStore'
import { formatBDT } from '@/lib/utils'

const DHAKA_AREAS = [
  'Dhanmondi', 'Gulshan', 'Banani', 'Uttara', 'Mirpur', 'Mohammadpur',
  'Rayer Bazar', 'Khilgaon', 'Tejgaon', 'Farmgate', 'Motijheel', 'Other',
]

const DIVISIONS = [
  'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh',
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCartStore()
  const shipping = subtotal >= 2000 ? 0 : 80
  const total = subtotal + shipping

  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'SSLCommerz'>('COD')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    area: '',
    division: 'Dhaka',
    notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          shippingAddress: JSON.stringify({
            address: form.address,
            area: form.area,
            division: form.division,
          }),
          notes: form.notes,
          paymentMethod,
          items: items.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
            size: i.size,
            color: i.color,
            price: i.price,
          })),
          subtotal,
          shippingCost: shipping,
          total,
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Order failed')

      if (paymentMethod === 'SSLCommerz' && data.paymentUrl) {
        window.location.href = data.paymentUrl
      } else {
        clearCart()
        router.push(`/checkout/success?order=${data.orderNumber}`)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="max-w-screen-md mx-auto px-8 py-24 text-center">
          <h1 className="font-serif text-3xl mb-4">Your bag is empty</h1>
          <p className="text-sm font-body text-aura-muted mb-8">Add some items before checking out.</p>
          <Link href="/products" className="btn-primary">Continue Shopping</Link>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-10">
        <h1 className="font-serif text-3xl mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact */}
            <section>
              <h2 className="font-serif text-xl mb-4 pb-2 border-b border-aura-border">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-body tracking-[0.2em] uppercase mb-1">Full Name *</label>
                  <input name="name" required value={form.name} onChange={handleChange} className="input-luxury" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-[11px] font-body tracking-[0.2em] uppercase mb-1">Phone *</label>
                  <input name="phone" required value={form.phone} onChange={handleChange} className="input-luxury" placeholder="01XXXXXXXXX" type="tel" pattern="01[3-9][0-9]{8}" title="Enter valid BD phone" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-body tracking-[0.2em] uppercase mb-1">Email Address *</label>
                  <input name="email" required type="email" value={form.email} onChange={handleChange} className="input-luxury" placeholder="you@example.com" />
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section>
              <h2 className="font-serif text-xl mb-4 pb-2 border-b border-aura-border">Delivery Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-body tracking-[0.2em] uppercase mb-1">Street Address *</label>
                  <input name="address" required value={form.address} onChange={handleChange} className="input-luxury" placeholder="House, Road, Block" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-body tracking-[0.2em] uppercase mb-1">Area</label>
                    <select name="area" value={form.area} onChange={handleChange} className="select-luxury">
                      <option value="">Select Area</option>
                      {DHAKA_AREAS.map((a) => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-body tracking-[0.2em] uppercase mb-1">Division *</label>
                    <select name="division" required value={form.division} onChange={handleChange} className="select-luxury">
                      {DIVISIONS.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-body tracking-[0.2em] uppercase mb-1">Order Notes</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} className="input-luxury h-20 resize-none" placeholder="Special instructions (optional)" />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="font-serif text-xl mb-4 pb-2 border-b border-aura-border">Payment Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 border-2 text-left transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-aura-black bg-aura-cream'
                      : 'border-aura-border hover:border-aura-muted'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">💵</span>
                    <span className="font-body text-sm font-bold">Cash on Delivery</span>
                    {paymentMethod === 'COD' && <span className="ml-auto w-4 h-4 bg-aura-black" />}
                  </div>
                  <p className="text-xs font-body text-aura-muted">Pay when your order arrives at your door.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('SSLCommerz')}
                  className={`p-4 border-2 text-left transition-all ${
                    paymentMethod === 'SSLCommerz'
                      ? 'border-aura-black bg-aura-cream'
                      : 'border-aura-border hover:border-aura-muted'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">💳</span>
                    <span className="font-body text-sm font-bold">SSLCommerz</span>
                    {paymentMethod === 'SSLCommerz' && <span className="ml-auto w-4 h-4 bg-aura-black" />}
                  </div>
                  <p className="text-xs font-body text-aura-muted">bKash, Nagad, cards & mobile banking (Demo).</p>
                </button>
              </div>
            </section>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-body">
                {error}
              </div>
            )}
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <div className="border border-aura-border p-6 sticky top-24">
              <h2 className="font-serif text-lg mb-4 pb-2 border-b border-aura-border">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3">
                    <div className="relative w-12 h-14 flex-shrink-0 overflow-hidden bg-aura-cream">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="48px" />
                      <span className="absolute -top-1 -right-1 bg-aura-black text-white text-[9px] w-4 h-4 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-body leading-tight line-clamp-1">{item.name}</p>
                      {item.size && <p className="text-[10px] text-aura-muted font-body">{item.size}</p>}
                      <p className="text-xs font-body">{formatBDT(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-aura-border pt-4 space-y-2">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-aura-muted">Subtotal</span>
                  <span>{formatBDT(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-aura-muted">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : formatBDT(shipping)}</span>
                </div>
                <div className="flex justify-between font-body font-bold border-t border-aura-border pt-2 text-base">
                  <span>Total</span>
                  <span>{formatBDT(total)}</span>
                </div>
                <p className="text-[11px] text-aura-muted font-body">All prices in BDT (Bangladeshi Taka ৳)</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-5 text-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing Order...' : paymentMethod === 'COD' ? 'Place Order (COD)' : 'Pay with SSLCommerz'}
              </button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}
