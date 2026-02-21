import ContentLayout from '@/components/ContentLayout'

export const metadata = { title: 'Returns & Exchange – Aura' }

export default function ReturnsPage() {
  return (
    <ContentLayout title="Returns & Exchange" subtitle="Hassle-free, within 7 days">
      <div className="space-y-6 text-sm text-[#555] leading-relaxed">
        <div className="bg-[#FFF8F0] border border-[#F0D9B5] p-5 text-[#7A5C2E]">
          <strong>Please note:</strong> Unstitched fabric that has been cut or altered is not eligible for return. All sale items are final sale unless they arrive defective.
        </div>
        {[
          { title: 'Eligibility', body: 'Items must be returned within 7 days of delivery. They must be unworn, unwashed, with all original tags attached, and in their original packaging.' },
          { title: 'How to Initiate a Return', body: 'Email returns@aura.com with your order number, the item(s) you wish to return, and your reason. Our team will respond within 24 hours with a prepaid return label for eligible claims.' },
          { title: 'Exchange Process', body: 'To exchange for a different size or colour, please place a new order and return the original item. Alternatively, request an exchange by email — subject to stock availability.' },
          { title: 'Refund Timeline', body: 'Once we receive and inspect the returned item (2–3 days), refunds are processed within 5–7 business days to your original payment method. COD refunds are issued via bKash or bank transfer.' },
          { title: 'Defective or Incorrect Items', body: 'If you received a damaged or wrong item, please email us with a photo within 48 hours of delivery. We will arrange a free pickup and dispatch a replacement at no charge.' },
        ].map(({ title, body }) => (
          <div key={title} className="border border-[#E8E0D8] bg-white p-6">
            <h3 className="font-['Playfair_Display'] text-lg mb-3">{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </ContentLayout>
  )
}
