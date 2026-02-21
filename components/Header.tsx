'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Search, ShoppingBag, Menu, X, ChevronDown, User } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import CartSidebar from './CartSidebar'
import SearchModal from './SearchModal'

const NAV_ITEMS = [
  {
    label: 'New Arrivals',
    href: '/products?filter=new',
    mega: null,
  },
  {
    label: 'Unstitched',
    href: '/products?category=Unstitched',
    mega: {
      sections: [
        {
          title: 'By Fabric',
          links: [
            { label: 'Lawn', href: '/products?category=Lawn' },
            { label: 'Khaddar', href: '/products?category=Khaddar' },
            { label: 'Linen', href: '/products?category=Linen' },
            { label: 'Chiffon', href: '/products?category=Unstitched&fabric=Chiffon' },
            { label: 'Silk', href: '/products?category=Unstitched&fabric=Silk' },
          ],
        },
        {
          title: 'By Season',
          links: [
            { label: 'Summer Collection', href: '/products?category=Lawn' },
            { label: 'Winter Collection', href: '/products?category=Khaddar' },
            { label: 'Festive', href: '/products?filter=featured' },
            { label: 'Casual', href: '/products?category=Unstitched' },
          ],
        },
        {
          title: 'Collections',
          links: [
            { label: 'All Unstitched', href: '/products?category=Unstitched' },
            { label: 'Premium 3-Piece', href: '/products?category=Unstitched' },
            { label: 'Embroidered', href: '/products?category=Unstitched' },
            { label: 'Printed', href: '/products?category=Unstitched' },
          ],
        },
      ],
    },
  },
  {
    label: 'Ready-to-Wear',
    href: '/products?category=Ready-to-Wear',
    mega: {
      sections: [
        {
          title: 'Style',
          links: [
            { label: 'Kurtas', href: '/products?category=Ready-to-Wear' },
            { label: 'Shalwar Kameez', href: '/products?category=Ready-to-Wear' },
            { label: 'Anarkali', href: '/products?category=Ready-to-Wear' },
            { label: 'Gharara Sets', href: '/products?category=Ready-to-Wear' },
          ],
        },
        {
          title: 'Occasion',
          links: [
            { label: 'Casual', href: '/products?category=Ready-to-Wear' },
            { label: 'Formal', href: '/products?category=Ready-to-Wear' },
            { label: 'Party Wear', href: '/products?category=Ready-to-Wear' },
            { label: 'Bridal', href: '/products?category=Ready-to-Wear' },
          ],
        },
      ],
    },
  },
  {
    label: 'Accessories',
    href: '/products?category=Accessories',
    mega: {
      sections: [
        {
          title: 'Categories',
          links: [
            { label: 'Dupattas & Stoles', href: '/products?category=Accessories' },
            { label: 'Bags & Clutches', href: '/products?category=Accessories' },
            { label: 'Jewellery', href: '/products?category=Accessories' },
            { label: 'Shawls', href: '/products?category=Accessories' },
          ],
        },
      ],
    },
  },
  {
    label: 'Sale',
    href: '/products?filter=sale',
    mega: null,
  },
]

export default function Header() {
  const { data: session } = useSession()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { itemCount } = useCartStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMenu(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 120)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-aura-black text-aura-gold text-center py-2 text-[11px] tracking-[0.25em] uppercase font-body">
        Free Shipping Across Bangladesh on Orders Over ৳2,000 · Cash on Delivery Available
      </div>

      <header className={`sticky top-0 z-50 bg-aura-white transition-shadow duration-300 ${scrolled ? 'shadow-luxury' : ''}`}>
        <div className="border-b border-aura-border">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
            {/* Mobile Menu */}
            <button className="md:hidden p-2 -ml-2" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={20} />
            </button>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
              <span className="font-serif text-2xl tracking-[0.1em] text-aura-black uppercase">Aura</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 flex-1 justify-center" onMouseLeave={handleMouseLeave}>
              {NAV_ITEMS.map(item => (
                <div key={item.label} className="relative" onMouseEnter={() => item.mega ? handleMouseEnter(item.label) : setActiveMenu(null)}>
                  <Link href={item.href} className={`nav-link flex items-center gap-1 ${item.label === 'Sale' ? 'text-aura-accent' : ''}`}>
                    {item.label} {item.mega && <ChevronDown size={12} />}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-3">
              <button onClick={() => setSearchOpen(true)} className="p-2 hover:text-aura-gold transition-colors" aria-label="Search">
                <Search size={18} />
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setProfileOpen(!profileOpen)} className="p-2 hover:text-aura-gold transition-colors">
                  <User size={18} />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border shadow-lg rounded-md py-2 z-50">
                    {!session ? (
                      <>
                        <Link href="/login" className="block px-4 py-2 text-sm hover:bg-gray-100">Login</Link>
                        <Link href="/signup" className="block px-4 py-2 text-sm hover:bg-gray-100">Sign Up</Link>
                      </>
                    ) : (
                      <>
                        <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">Dashboard</Link>
                        <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <button onClick={() => setCartOpen(true)} className="p-2 hover:text-aura-gold transition-colors relative">
                <ShoppingBag size={18} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-aura-black text-white text-[9px] w-4 h-4 flex items-center justify-center font-body">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        {NAV_ITEMS.filter(i => i.mega).map(item => (
          <div key={item.label} className={`mega-menu ${activeMenu === item.label ? 'mega-menu-open' : ''}`} onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
            <div className="max-w-screen-xl mx-auto px-8 py-10 grid grid-cols-4 gap-8">
              {item.mega?.sections.map(section => (
                <div key={section.title}>
                  <h4 className="text-[10px] tracking-[0.25em] uppercase font-body text-aura-gold mb-4">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map(link => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-sm font-body text-aura-charcoal hover:text-aura-black hover:tracking-wide transition-all duration-200" onClick={() => setActiveMenu(null)}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="relative overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400" alt="Featured" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                  <span className="text-white font-serif text-sm">New Season</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Mega Menu Overlay */}
        {activeMenu && <div className="fixed inset-0 top-[108px] bg-black/20 z-40" onMouseEnter={() => setActiveMenu(null)} />}
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] bg-white">
          <div className="flex items-center justify-between px-4 h-16 border-b border-aura-border">
            <span className="font-serif text-xl tracking-widest">Aura</span>
            <button onClick={() => setMobileOpen(false)}><X size={20} /></button>
          </div>
          <nav className="p-6">
            {NAV_ITEMS.map(item => (
              <Link key={item.label} href={item.href} className={`block py-4 border-b border-aura-border text-sm tracking-[0.15em] uppercase font-body ${item.label === 'Sale' ? 'text-aura-accent' : 'text-aura-charcoal'}`} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <div className={`overlay ${cartOpen || searchOpen ? 'overlay-visible' : ''}`} onClick={() => { setCartOpen(false); setSearchOpen(false) }} />
    </>
  )
}