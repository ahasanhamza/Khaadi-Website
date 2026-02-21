'use client'
import { useState } from 'react'
import ContentLayout from '@/components/ContentLayout'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Wire to Resend/Nodemailer/your backend in production
    setSent(true)
  }

  return (
    <ContentLayout title="Contact Us" subtitle="We'd love to hear from you">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-['Playfair_Display'] text-xl mb-6">Send a Message</h2>
          {sent ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-6">
              <p className="font-medium mb-1">Message Sent!</p>
              <p className="text-sm">Thank you for reaching out. Our team will respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { k: 'name', l: 'Full Name', t: 'text' },
                { k: 'email', l: 'Email Address', t: 'email' },
                { k: 'subject', l: 'Subject', t: 'text' },
              ].map(({ k, l, t }) => (
                <div key={k}>
                  <label className="block text-xs tracking-widest uppercase text-[#555] mb-2">{l}</label>
                  <input type={t} required value={(form as any)[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                    className="w-full border border-[#DDD] px-4 py-3 text-sm outline-none focus:border-[#C9A96E]" />
                </div>
              ))}
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#555] mb-2">Message</label>
                <textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-[#DDD] px-4 py-3 text-sm outline-none focus:border-[#C9A96E] resize-none" />
              </div>
              <button type="submit" className="bg-[#0A0A0A] text-white text-xs tracking-widest uppercase px-8 py-4 hover:bg-[#C9A96E] transition-colors">
                Send Message
              </button>
            </form>
          )}
        </div>
        <div>
          <h2 className="font-['Playfair_Display'] text-xl mb-6">Our Details</h2>
          <div className="space-y-5">
            {[
              { l: 'Email', v: 'support@aura.com' },
              { l: 'Phone', v: '+880 1700-000000' },
              { l: 'WhatsApp', v: '+880 1700-000001' },
              { l: 'Address', v: 'Aura Fashion House, Road 17, Banani, Dhaka 1213' },
              { l: 'Hours', v: 'Sat–Thu: 10:00 AM – 7:00 PM BST' },
            ].map(({ l, v }) => (
              <div key={l} className="border-b border-[#F0EBE6] pb-4">
                <p className="text-xs tracking-widest uppercase text-[#888] mb-1">{l}</p>
                <p className="text-sm">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}
