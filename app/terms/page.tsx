import ContentLayout from '@/components/ContentLayout'

export const metadata = { title: 'Terms & Conditions – Aura' }

const SECTIONS = [
  { title: '1. Acceptance of Terms', body: 'By accessing and using the Aura website, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use immediately.' },
  { title: '2. Products & Pricing', body: 'All prices are displayed in Bangladeshi Taka (৳) inclusive of applicable taxes. We reserve the right to modify prices at any time. The price in your confirmed order is fixed at the time of placement.' },
  { title: '3. Orders & Payment', body: 'An order confirmation email does not constitute acceptance of your order. We reserve the right to cancel orders due to pricing errors, stock unavailability, or suspected fraud. Full payment (or a COD commitment) is required to fulfil an order.' },
  { title: '4. Intellectual Property', body: 'All content on this website — including images, logos, text, and product designs — is the exclusive property of Aura Fashion House and is protected by copyright law. Unauthorised use, reproduction, or distribution is strictly prohibited.' },
  { title: '5. Limitation of Liability', body: 'To the fullest extent permitted by Bangladeshi law, Aura shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website, products, or services.' },
  { title: '6. Governing Law', body: 'These Terms are governed by and construed in accordance with the laws of the People\'s Republic of Bangladesh. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dhaka.' },
  { title: '7. Changes to Terms', body: 'We reserve the right to update these Terms at any time. Changes take effect upon posting to this page. Your continued use of the website after any changes constitutes your acceptance of the revised Terms.' },
]

export default function TermsPage() {
  return (
    <ContentLayout title="Terms & Conditions" subtitle="Please read carefully before using our services">
      <div className="space-y-6">
        {SECTIONS.map(({ title, body }) => (
          <div key={title} className="border-b border-[#F0EBE6] pb-6">
            <h3 className="font-['Playfair_Display'] text-lg text-[#0A0A0A] mb-3">{title}</h3>
            <p className="text-sm text-[#555] leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </ContentLayout>
  )
}
