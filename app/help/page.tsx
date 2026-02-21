import ContentLayout from '@/components/ContentLayout'
import Link from 'next/link'

export const metadata = { title: 'Help Centre – Aura' }

const TOPICS = [
  { q: 'How do I track my order?', a: 'Visit the Track Order page and enter your Order Number (format: AURA-XXXXX-XXXX) along with your email address. You\'ll see real-time updates on your order status.' },
  { q: 'What payment methods do you accept?', a: 'We accept Cash on Delivery (COD) across Bangladesh, and SSLCommerz for secure online payments via debit/credit card and mobile banking.' },
  { q: 'Can I cancel or modify my order?', a: 'Orders can be cancelled within 2 hours of placement. Please contact us immediately at support@aura.com or call +880 1700-000000. After 2 hours, the order may already be in fulfilment.' },
  { q: 'How long does delivery take?', a: 'Dhaka City: 1–2 business days. Outside Dhaka: 3–5 business days. Express same-day delivery is available within Dhaka for orders placed before 12 PM.' },
  { q: 'Are your fabrics authentic and high quality?', a: 'Absolutely. Every Aura garment is crafted from premium, ethically sourced fabrics. We partner directly with trusted mills and artisans across South Asia.' },
  { q: 'How do I return or exchange an item?', a: 'Items in original condition may be returned within 7 days of delivery. Please visit our Returns & Exchange page for the full process.' },
]

export default function HelpPage() {
  return (
    <ContentLayout title="Help Centre" subtitle="How can we assist you today?">
      <div className="space-y-4">
        {TOPICS.map(({ q, a }) => (
          <div key={q} className="bg-white border border-[#E8E0D8] p-6">
            <h3 className="font-['Playfair_Display'] text-lg mb-3">{q}</h3>
            <p className="text-sm text-[#555] leading-relaxed">{a}</p>
          </div>
        ))}
        <div className="bg-[#0A0A0A] text-white p-8 text-center">
          <p className="font-['Playfair_Display'] text-xl mb-2">Still need help?</p>
          <p className="text-sm text-white/70 mb-4">Our team is available Saturday–Thursday, 10am–7pm BST.</p>
          <Link href="/contact-us" className="text-[#C9A96E] text-xs tracking-widest uppercase hover:underline">Contact Us →</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
