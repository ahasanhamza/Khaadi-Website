'use client'
// app/dashboard/DashboardClient.tsx
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { User, ShoppingBag, Heart, Settings, LogOut, Package, ChevronRight } from 'lucide-react'

type Props = { user: any }

const STATUS_COLORS: Record<string, string> = {
  Processing: 'bg-amber-100 text-amber-800',
  Shipped: 'bg-blue-100 text-blue-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
}

export default function DashboardClient({ user }: Props) {
  const [tab, setTab] = useState<'orders' | 'wishlist' | 'profile' | 'settings'>('orders')
  const [profile, setProfile] = useState({ name: user.name || '', phone: user.phone || '', address: user.address || '' })
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [profileMsg, setProfileMsg] = useState('')
  const [passwordMsg, setPasswordMsg] = useState('')

  const saveProfile = async () => {
    const res = await fetch('/api/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    })
    setProfileMsg(res.ok ? 'Profile updated successfully.' : 'Failed to update profile.')
    setTimeout(() => setProfileMsg(''), 3000)
  }

  const changePassword = async () => {
    if (passwords.next !== passwords.confirm) {
      setPasswordMsg('New passwords do not match.')
      return
    }
    const res = await fetch('/api/user/password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ current: passwords.current, next: passwords.next }),
    })
    const data = await res.json()
    setPasswordMsg(res.ok ? 'Password changed successfully.' : (data.error || 'Failed to change password.'))
    if (res.ok) setPasswords({ current: '', next: '', confirm: '' })
    setTimeout(() => setPasswordMsg(''), 4000)
  }

  const TABS = [
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'profile', label: 'Edit Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="border-b border-[#E8E0D8] bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-['Playfair_Display'] text-2xl tracking-widest">AURA</Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[#888]">Welcome, {user.name?.split(' ')[0]}</span>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="text-[#C9A96E] hover:underline flex items-center gap-1">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-white border border-[#E8E0D8] p-6 mb-4">
              <div className="w-16 h-16 bg-[#F5F0EB] rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="font-['Playfair_Display'] text-2xl text-[#C9A96E]">
                  {user.name?.[0]?.toUpperCase() || 'A'}
                </span>
              </div>
              <p className="text-center font-medium text-[#0A0A0A]">{user.name}</p>
              <p className="text-center text-xs text-[#888] mt-1">{user.email}</p>
            </div>

            <nav className="bg-white border border-[#E8E0D8]">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id as any)}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-sm transition-colors border-b border-[#F0EBE6] last:border-0 ${
                    tab === id ? 'bg-[#0A0A0A] text-white' : 'text-[#444] hover:bg-[#F5F0EB]'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                  {tab !== id && <ChevronRight size={14} className="ml-auto opacity-40" />}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Panel */}
          <div className="md:col-span-3">
            {/* Orders */}
            {tab === 'orders' && (
              <div className="bg-white border border-[#E8E0D8] p-6">
                <h2 className="font-['Playfair_Display'] text-xl mb-6">Order History</h2>
                {user.orders.length === 0 ? (
                  <div className="text-center py-16">
                    <Package size={40} className="mx-auto text-[#DDD] mb-4" />
                    <p className="text-[#888]">No orders yet.</p>
                    <Link href="/products" className="mt-4 inline-block text-xs tracking-widest uppercase text-[#C9A96E] hover:underline">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.orders.map((order: any) => (
                      <div key={order.id} className="border border-[#E8E0D8] p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div>
                            <span className="text-xs tracking-widest uppercase text-[#888]">Order </span>
                            <span className="font-medium text-sm">#{order.orderNumber}</span>
                          </div>
                          <span className={`text-xs px-3 py-1 ${STATUS_COLORS[order.orderStatus] || 'bg-gray-100 text-gray-700'}`}>
                            {order.orderStatus}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {order.orderItems.slice(0, 3).map((item: any) => (
                            <div key={item.id} className="flex items-center gap-2 text-xs text-[#555]">
                              <Image src={item.imageUrl} alt={item.name} width={40} height={40} className="object-cover" />
                              {item.name} × {item.quantity}
                            </div>
                          ))}
                          {order.orderItems.length > 3 && (
                            <span className="text-xs text-[#AAA]">+{order.orderItems.length - 3} more</span>
                          )}
                        </div>
                        <div className="flex justify-between text-xs text-[#888]">
                          <span>{new Date(order.createdAt).toLocaleDateString('en-BD')}</span>
                          <span className="font-medium text-[#0A0A0A]">৳{order.total.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wishlist */}
            {tab === 'wishlist' && (
              <div className="bg-white border border-[#E8E0D8] p-6">
                <h2 className="font-['Playfair_Display'] text-xl mb-6">My Wishlist</h2>
                {user.wishlists.length === 0 ? (
                  <div className="text-center py-16">
                    <Heart size={40} className="mx-auto text-[#DDD] mb-4" />
                    <p className="text-[#888]">Your wishlist is empty.</p>
                    <Link href="/products" className="mt-4 inline-block text-xs tracking-widest uppercase text-[#C9A96E] hover:underline">
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {user.wishlists.map(({ product }: any) => (
                      <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                        <div className="aspect-[3/4] bg-[#F5F0EB] overflow-hidden mb-2">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={300}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <p className="text-xs font-medium text-[#0A0A0A] truncate">{product.name}</p>
                        <p className="text-xs text-[#C9A96E]">৳{product.price.toLocaleString()}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile */}
            {tab === 'profile' && (
              <div className="bg-white border border-[#E8E0D8] p-6">
                <h2 className="font-['Playfair_Display'] text-xl mb-6">Edit Profile</h2>
                <div className="space-y-5 max-w-md">
                  {[
                    { key: 'name', label: 'Full Name', type: 'text' },
                    { key: 'phone', label: 'Phone Number', type: 'tel' },
                    { key: 'address', label: 'Delivery Address', type: 'text' },
                  ].map(({ key, label, type }) => (
                    <div key={key}>
                      <label className="block text-xs tracking-widest uppercase text-[#555] mb-2">{label}</label>
                      <input
                        type={type}
                        value={(profile as any)[key]}
                        onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                        className="w-full border border-[#DDD] px-4 py-3 text-sm outline-none focus:border-[#C9A96E] transition-colors"
                      />
                    </div>
                  ))}
                  {profileMsg && <p className="text-sm text-green-600">{profileMsg}</p>}
                  <button onClick={saveProfile} className="bg-[#0A0A0A] text-white text-xs tracking-widest uppercase px-8 py-3 hover:bg-[#C9A96E] transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Settings / Change Password */}
            {tab === 'settings' && (
              <div className="bg-white border border-[#E8E0D8] p-6">
                <h2 className="font-['Playfair_Display'] text-xl mb-6">Change Password</h2>
                <div className="space-y-5 max-w-md">
                  {[
                    { key: 'current', label: 'Current Password' },
                    { key: 'next', label: 'New Password' },
                    { key: 'confirm', label: 'Confirm New Password' },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-xs tracking-widest uppercase text-[#555] mb-2">{label}</label>
                      <input
                        type="password"
                        value={(passwords as any)[key]}
                        onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                        className="w-full border border-[#DDD] px-4 py-3 text-sm outline-none focus:border-[#C9A96E] transition-colors"
                      />
                    </div>
                  ))}
                  {passwordMsg && (
                    <p className={`text-sm ${passwordMsg.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                      {passwordMsg}
                    </p>
                  )}
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
