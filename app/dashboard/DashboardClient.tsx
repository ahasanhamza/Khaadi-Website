'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { ShoppingBag, Heart, User, Settings, LogOut, Package, ChevronRight } from 'lucide-react'

const STATUS_COLORS: Record<string, string> = {
  Processing: 'bg-amber-100 text-amber-800',
  Shipped: 'bg-blue-100 text-blue-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
}

export default function DashboardClient({ user }: { user: any }) {
  const [tab, setTab] = useState<'orders' | 'wishlist' | 'profile' | 'settings'>('orders')
  const [profile, setProfile] = useState({ name: user.name || '', phone: user.phone || '', address: user.address || '' })
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [msg, setMsg] = useState('')

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  const saveProfile = async () => {
    const res = await fetch('/api/user/profile', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile) })
    flash(res.ok ? 'Profile updated.' : 'Failed to update.')
  }

  const changePassword = async () => {
    if (passwords.next !== passwords.confirm) { flash('Passwords do not match.'); return }
    const res = await fetch('/api/user/password', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ current: passwords.current, next: passwords.next }) })
    const data = await res.json()
    flash(res.ok ? 'Password changed.' : (data.error || 'Failed.'))
    if (res.ok) setPasswords({ current: '', next: '', confirm: '' })
  }

  const TABS = [
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'profile', label: 'Edit Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <div className="border-b border-[#E8E0D8] bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-['Playfair_Display'] text-2xl tracking-widest">AURA</Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[#888]">Hi, {user.name?.split(' ')[0]}</span>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="text-[#C9A96E] hover:underline flex items-center gap-1 text-xs">
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1 space-y-4">
            <div className="bg-white border border-[#E8E0D8] p-6 text-center">
              <div className="w-14 h-14 bg-[#F5F0EB] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="font-['Playfair_Display'] text-2xl text-[#C9A96E]">{user.name?.[0]?.toUpperCase() || 'A'}</span>
              </div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-[#888] mt-1">{user.email}</p>
            </div>
            <nav className="bg-white border border-[#E8E0D8]">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setTab(id as any)}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-sm transition-colors border-b border-[#F0EBE6] last:border-0 ${tab === id ? 'bg-[#0A0A0A] text-white' : 'text-[#444] hover:bg-[#F5F0EB]'}`}>
                  <Icon size={15} />{label}
                  {tab !== id && <ChevronRight size={13} className="ml-auto opacity-40" />}
                </button>
              ))}
            </nav>
          </aside>

          <div className="md:col-span-3">
            {msg && <div className="bg-[#0A0A0A] text-white text-sm px-5 py-3 mb-4">{msg}</div>}

            {tab === 'orders' && (
              <div className="bg-white border border-[#E8E0D8] p-6">
                <h2 className="font-['Playfair_Display'] text-xl mb-6">Order History</h2>
                {user.orders.length === 0 ? (
                  <div className="text-center py-12"><Package size={36} className="mx-auto text-[#DDD] mb-3" /><p className="text-[#888]">No orders yet.</p></div>
                ) : (
                  <div className="space-y-4">
                    {user.orders.map((order: any) => (
                      <div key={order.id} className="border border-[#E8E0D8] p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">#{order.orderNumber}</span>
                          <span className={`text-xs px-2 py-0.5 ${STATUS_COLORS[order.orderStatus] || 'bg-gray-100'}`}>{order.orderStatus}</span>
                        </div>
                        <div className="flex gap-2 mb-2 flex-wrap">
                          {order.orderItems.slice(0, 3).map((item: any) => (
                            <div key={item.id} className="flex items-center gap-1 text-xs text-[#555]">
                              <Image src={item.imageUrl} alt={item.name} width={32} height={32} className="object-cover" />
                              {item.name} ×{item.quantity}
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-[#888]">
                          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                          <span className="text-[#0A0A0A] font-medium">৳{order.total.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'wishlist' && (
              <div className="bg-white border border-[#E8E0D8] p-6">
                <h2 className="font-['Playfair_Display'] text-xl mb-6">My Wishlist</h2>
                {user.wishlists.length === 0 ? (
                  <div className="text-center py-12"><Heart size={36} className="mx-auto text-[#DDD] mb-3" /><p className="text-[#888]">Your wishlist is empty.</p></div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {user.wishlists.map(({ product }: any) => (
                      <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                        <div className="aspect-[3/4] bg-[#F5F0EB] overflow-hidden mb-2">
                          <Image src={product.imageUrl} alt={product.name} width={300} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <p className="text-xs font-medium truncate">{product.name}</p>
                        <p className="text-xs text-[#C9A96E]">৳{product.price.toLocaleString()}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'profile' && (
              <div className="bg-white border border-[#E8E0D8] p-6">
                <h2 className="font-['Playfair_Display'] text-xl mb-6">Edit Profile</h2>
                <div className="space-y-4 max-w-md">
                  {[{ key: 'name', label: 'Full Name' }, { key: 'phone', label: 'Phone' }, { key: 'address', label: 'Address' }].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-xs tracking-widest uppercase text-[#555] mb-1">{label}</label>
                      <input type="text" value={(profile as any)[key]} onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                        className="w-full border border-[#DDD] px-4 py-3 text-sm outline-none focus:border-[#C9A96E]" />
                    </div>
                  ))}
                  <button onClick={saveProfile} className="bg-[#0A0A0A] text-white text-xs tracking-widest uppercase px-8 py-3 hover:bg-[#C9A96E] transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {tab === 'settings' && (
              <div className="bg-white border border-[#E8E0D8] p-6">
                <h2 className="font-['Playfair_Display'] text-xl mb-6">Change Password</h2>
                <div className="space-y-4 max-w-md">
                  {[{ key: 'current', label: 'Current Password' }, { key: 'next', label: 'New Password' }, { key: 'confirm', label: 'Confirm New Password' }].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-xs tracking-widest uppercase text-[#555] mb-1">{label}</label>
                      <input type="password" value={(passwords as any)[key]} onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                        className="w-full border border-[#DDD] px-4 py-3 text-sm outline-none focus:border-[#C9A96E]" />
                    </div>
                  ))}
                  <button onClick={changePassword} className="bg-[#0A0A0A] text-white text-xs tracking-widest uppercase px-8 py-3 hover:bg-[#C9A96E] transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
