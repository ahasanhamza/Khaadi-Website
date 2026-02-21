import ContentLayout from '@/components/ContentLayout'

export const metadata = { title: 'Delivery Information – Aura' }

export default function DeliveryPage() {
  return (
    <ContentLayout title="Delivery Information" subtitle="Premium delivery across Bangladesh">
      <div className="space-y-6 text-sm text-[#555] leading-relaxed">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Dhaka City', time: '1–2 Business Days', fee: '৳80' },
            { title: 'Outside Dhaka', time: '3–5 Business Days', fee: '৳130' },
            { title: 'Express (Dhaka)', time: 'Same Day', fee: '৳200' },
          ].map(({ title, time, fee }) => (
            <div key={title} className="border border-[#E8E0D8] bg-white p-5 text-center">
              <h3 className="font-['Playfair_Display'] text-lg mb-2">{title}</h3>
              <p className="text-[#0A0A0A] font-medium">{time}</p>
              <p className="text-[#C9A96E] mt-1">{fee}</p>
            </div>
          ))}
        </div>
        {[
          { title: 'Free Delivery', body: 'Enjoy complimentary delivery on all orders over ৳5,000. The discount is applied automatically at checkout — no code needed.' },
          { title: 'Order Processing', body: 'Orders placed before 2:00 PM BST (Saturday–Thursday) are dispatched the same day. Orders placed on Friday or after 2:00 PM are processed the next working day.' },
          { title: 'Our Packaging', body: 'Every Aura order is wrapped in signature tissue paper, sealed with a gold wax stamp, and placed in a luxury kraft box. The unboxing experience is part of the pleasure.' },
          { title: 'Tracking Your Order', body: 'Once dispatched, you will receive a confirmation email with your order details. Use our Track Order page at any time to check your order status.' },
        ].map(({ title, body }) => (
          <div key={title} className="border border-[#E8E0D8] bg-white p-6">
            <h3 className="font-['Playfair_Display'] text-xl mb-3">{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </ContentLayout>
  )
}
