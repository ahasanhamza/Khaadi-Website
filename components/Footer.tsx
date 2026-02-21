import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white/70">
      {/* Newsletter */}
      <div className="border-b border-white/10 py-10 px-4 text-center">
        <p className="font-['Playfair_Display'] text-2xl text-white mb-2">Join the Aura Circle</p>
        <p className="text-sm mb-6">New arrivals, exclusive offers, style inspiration.</p>
        <div className="flex max-w-md mx-auto gap-0">
          <input type="email" placeholder="your@email.com"
            className="flex-1 bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#C9A96E]" />
          <button className="bg-[#C9A96E] text-[#0A0A0A] text-xs tracking-widest uppercase px-6 py-3 hover:bg-white transition-colors font-medium">
            Subscribe
          </button>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <p className="font-['Playfair_Display'] text-xl text-white mb-4">AURA</p>
          <p className="text-xs leading-relaxed">Premium South Asian fashion, crafted for the modern woman. Delivered across Bangladesh.</p>
        </div>

        {[
          { title: 'Shop', links: [{ l: 'Unstitched', h: '/products?category=Unstitched' }, { l: 'Ready-to-Wear', h: '/products?category=Ready-to-Wear' }, { l: 'Lawn', h: '/products?category=Lawn' }, { l: 'Khaddar', h: '/products?category=Khaddar' }, { l: 'Accessories', h: '/products?category=Accessories' }, { l: 'Sale', h: '/products?filter=sale' }] },
          { title: 'Help', links: [{ l: 'Help Centre', h: '/help' }, { l: 'Size Guide', h: '/size-guide' }, { l: 'Delivery Info', h: '/delivery-info' }, { l: 'Returns & Exchange', h: '/returns-and-exchange' }, { l: 'Track Order', h: '/track-order' }, { l: 'Contact Us', h: '/contact-us' }] },
          { title: 'Company', links: [{ l: 'Privacy Policy', h: '/privacy-policy' }, { l: 'Terms & Conditions', h: '/terms' }, { l: 'Sitemap', h: '/sitemap.xml' }] },
        ].map(({ title, links }) => (
          <div key={title}>
            <p className="text-xs tracking-widest uppercase text-white mb-4">{title}</p>
            <ul className="space-y-2">
              {links.map(({ l, h }) => (
                <li key={l}>
                  <Link href={h} className="text-xs hover:text-[#C9A96E] transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 py-5 px-4 text-center text-xs">
        © {new Date().getFullYear()} Aura Fashion House, Dhaka, Bangladesh. All rights reserved.
      </div>
    </footer>
  )
}
