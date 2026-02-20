// components/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-aura-black text-white mt-20">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl mb-1">Join the Aura Circle</h3>
            <p className="text-white/60 font-body text-sm">Exclusive offers, new arrivals and style inspirations.</p>
          </div>
          <form className="flex w-full md:w-auto gap-0" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="input-luxury flex-1 md:w-72 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-aura-gold"
            />
            <button type="submit" className="btn-gold px-6 py-3 whitespace-nowrap text-xs tracking-widest">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-screen-xl mx-auto px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-serif text-lg mb-5 tracking-wide">Aura</h4>
          <p className="text-white/50 font-body text-xs leading-relaxed">
            Premium South Asian fashion crafted with heritage and delivered across Bangladesh.
          </p>
          <div className="mt-4 flex gap-3">
            {['Facebook', 'Instagram', 'Pinterest'].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[10px] font-body tracking-widest text-white/40 hover:text-aura-gold transition-colors uppercase"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] tracking-[0.3em] uppercase font-body text-aura-gold mb-5">Shop</h4>
          <ul className="space-y-3">
            {['New Arrivals', 'Unstitched', 'Ready-to-Wear', 'Accessories', 'Sale'].map((item) => (
              <li key={item}>
                <Link href="/products" className="text-white/60 hover:text-white font-body text-xs transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] tracking-[0.3em] uppercase font-body text-aura-gold mb-5">Help</h4>
          <ul className="space-y-3">
            {['Size Guide', 'Delivery Info', 'Returns & Exchange', 'Track Order', 'Contact Us'].map((item) => (
              <li key={item}>
                <Link href="#" className="text-white/60 hover:text-white font-body text-xs transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] tracking-[0.3em] uppercase font-body text-aura-gold mb-5">Bangladesh</h4>
          <ul className="space-y-3 text-white/60 font-body text-xs">
            <li>📍 Dhaka, Bangladesh</li>
            <li>📞 +880 1700-000000</li>
            <li>✉️ hello@aura.com.bd</li>
            <li className="pt-2">
              <span className="text-aura-gold">Payment:</span> COD · SSLCommerz · bKash
            </li>
            <li>
              <span className="text-aura-gold">Delivery:</span> 3–5 working days
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 px-8 py-5">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-white/30 font-body text-[11px] tracking-widest uppercase">
            © 2025 Aura Fashion Ltd. Bangladesh
          </p>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Sitemap'].map((l) => (
              <Link key={l} href="#" className="text-white/30 hover:text-white/70 font-body text-[11px] tracking-wider transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
