// app/checkout/success/page.tsx
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import prisma from '@/lib/prisma'
import { formatBDT } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: { order?: string }
}

export default async function SuccessPage({ searchParams }: Props) {
  const order = searchParams.order
    ? await prisma.order.findUnique({
        where: { orderNumber: searchParams.order },
        include: { items: { include: { product: true } } },
      })
    : null

  return (
    <>
      <Header />
      <main className="max-w-screen-md mx-auto px-4 md:px-8 py-16 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-50 border-2 border-green-600 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M6 14l6 6L22 8" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="square" />
          </svg>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl mb-3">Order Confirmed!</h1>
        <p className="font-body text-aura-muted mb-2">
          Thank you for shopping with Aura.
        </p>

        {order && (
          <>
            <p className="font-body text-sm mb-8">
              Order <span className="font-bold text-aura-black">#{order.orderNumber}</span> has been placed.
              We&apos;ll contact you at <span className="font-bold">{order.customerPhone}</span>.
            </p>

            {/* Order Summary */}
            <div className="border border-aura-border text-left p-6 mb-8">
              <h3 className="font-serif text-lg mb-4">Order Details</h3>
              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm font-body">
                    <span>{item.product.name} × {item.quantity}{item.size ? ` (${item.size})` : ''}</span>
                    <span>{formatBDT(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-aura-border pt-3 space-y-1">
                <div className="flex justify-between text-sm font-body text-aura-muted">
                  <span>Shipping</span>
                  <span>{order.shippingCost === 0 ? 'FREE' : formatBDT(order.shippingCost)}</span>
                </div>
                <div className="flex justify-between font-body font-bold">
                  <span>Total</span>
                  <span>{formatBDT(order.total)}</span>
                </div>
              </div>
              <div className="border-t border-aura-border pt-3 mt-3 text-xs font-body text-aura-muted space-y-1">
                <p>Payment: <span className="text-aura-black">{order.paymentMethod}</span></p>
                <p>Status: <span className="text-green-600">{order.orderStatus}</span></p>
                <p>Estimated Delivery: <span className="text-aura-black">3–5 business days</span></p>
              </div>
            </div>
          </>
        )}

        {!order && (
          <p className="text-sm font-body text-aura-muted mb-8">
            Your order has been placed. You will receive a confirmation shortly.
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products" className="btn-primary">Continue Shopping</Link>
          <Link href="/" className="btn-outline">Back to Home</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
