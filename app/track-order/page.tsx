'use client'
import { useState } from 'react'
import ContentLayout from '@/components/ContentLayout'

const STEPS = ['Processing', 'Shipped', 'Delivered']

export default function TrackOrderPage() {
  const [form, setForm] = useState({ orderNumber: '', email: '' })
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setResult(null)
    setLoading(true)
    const res = await fetch(`/api/orders/track?orderNumber=${encodeURIComponent(form.orderNumber)}&email=${encodeURIComponent(form.email)}`)
    const data = await res.json()
    setLoading(false)
    if (!res.ok) setError('No order found with those details. Please check and try again.')
    else setResult(data.order)
  }

  const stepIdx = result ? STEPS.indexOf(result.orderStatus) : -1

  return (
    <ContentLayout title="Track Your Order" subtitle="Enter your order details below">
      <form onSubmit={handleSearch} className="bg-white border border-[#E8E0D8] p-8 mb-8 max-w-lg mx-auto">
        <div className="space-y-4">
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#555] mb-2">Order Number</label>
            <input type="text" placeholder="AURA-XXXXX-XXXX" required value={form.orderNumber}
              onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
              className="w-full border border-[#DDD] px-4 py-3 text-sm outline-none focus:border-[#C9A96E]" />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#555] mb-2">Email Address</label>
            <input type="email" placeholder="you@example.com" required value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-[#DDD] px-4 py-3 text-sm outline-none focus:border-[#C9A96E]" />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-[#0A0A0A] text-white text-xs tracking-widest uppercase py-4 hover:bg-[#C9A96E] transition-colors disabled:opacity-60">
            {loading ? 'Searching...' : 'Track Order'}
          </button>
        </div>
      </form>

      {result && (
        <div className="bg-white border border-[#E8E0D8] p-8 max-w-lg mx-auto">
          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <div><p className="text-xs text-[#888] uppercase tracking-wider mb-1">Order #</p><p className="text-sm font-medium">{result.orderNumber}</p></div>
            <div><p className="text-xs text-[#888] uppercase tracking-wider mb-1">Total</p><p className="text-sm font-medium">৳{result.total.toLocaleString()}</p></div>
            <div><p className="text-xs text-[#888] uppercase tracking-wider mb-1">Placed</p><p className="text-sm">{new Date(result.createdAt).toLocaleDateString()}</p></div>
          </div>

          <div className="flex items-center">
            {STEPS.map((step, i) => (
              <div key={step} className={`flex items-center ${i < STEPS.length - 1 ? 'flex-1' : ''}`}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold ${i <= stepIdx ? 'bg-[#0A0A0A] text-white' : 'bg-[#E8E0D8] text-[#AAA]'}`}>
                    {i <= stepIdx ? '✓' : i + 1}
                  </div>
                  <span className={`text-[10px] mt-1 text-center tracking-wider ${i <= stepIdx ? 'text-[#0A0A0A] font-medium' : 'text-[#AAA]'}`}>{step}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 mx-2 ${i < stepIdx ? 'bg-[#0A0A0A]' : 'bg-[#E8E0D8]'}`} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </ContentLayout>
  )
}
