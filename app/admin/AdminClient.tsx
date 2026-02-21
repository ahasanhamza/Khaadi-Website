'use client'
// app/admin/AdminClient.tsx
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, Package, ShoppingBag, Users, LogOut,
  TrendingUp, Edit2, Trash2, ChevronDown, Plus, X, Check
} from 'lucide-react'

const CATEGORIES = ['Unstitched', 'Ready-to-Wear', 'Lawn', 'Khaddar', 'Linen', 'Accessories']
const ORDER_STATUSES = ['Processing', 'Shipped', 'Delivered', 'Cancelled']
const STATUS_COLORS: Record<string, string> = {
  Processing: 'bg-amber-100 text-amber-800',
  Shipped: 'bg-blue-100 text-blue-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
}

type Props = { products: any[]; orders: any[]; users: any[]; stats: any; adminName: string }

export default function AdminClient({ products: initialProducts, orders: initialOrders, users, stats, adminName }: Props) {
  const [tab, setTab] = useState<'overview' | 'products' | 'orders' | 'users'>('overview')
  const [products, setProducts] = useState(initialProducts)
  const [orders, setOrders] = useState(initialOrders)
  const [showProductForm, setShowProductForm] = useState(false)
  const [editProduct, setEditProduct] = useState<any>(null)
  const [productForm, setProductForm] = useState({
    name: '', category: 'Unstitched', price: '', salePrice: '', imageUrl: '',
    fabric: '', isFeatured: false, isNew: false, isSale: false,
  })
  const [feedback, setFeedback] = useState('')

  const flash = (msg: string) => { setFeedback(msg); setTimeout(() => setFeedback(''), 3000) }

  const openAddProduct = () => {
    setEditProduct(null)
    setProductForm({ name: '', category: 'Unstitched', price: '', salePrice: '', imageUrl: '', fabric: '', isFeatured: false, isNew: false, isSale: false })
    setShowProductForm(true)
  }

  const openEditProduct = (p: any) => {
    setEditProduct(p)
    setProductForm({
      name: p.name, category: p.category, price: String(p.price),
      salePrice: p.salePrice ? String(p.salePrice) : '', imageUrl: p.imageUrl,
      fabric: p.fabric || '', isFeatured: p.isFeatured, isNew: p.isNew, isSale: p.isSale,
    })
    setShowProductForm(true)
  }

  const saveProduct = async () => {
    const payload = {
      ...productForm,
      price: parseFloat(productForm.price),
      salePrice: productForm.salePrice ? parseFloat(productForm.salePrice) : null,
    }
    const url = editProduct ? `/api/admin/products/${editProduct.id}` : '/api/admin/products'
    const method = editProduct ? 'PATCH' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) {
      const data = await res.json()
      if (editProduct) {
        setProducts(products.map(p => p.id === editProduct.id ? data.product : p))
        flash('Product updated.')
      } else {
        setProducts([data.product, ...products])
        flash('Product created.')
      }
      setShowProductForm(false)
    } else {
      flash('Error saving product.')
    }
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product? This cannot be undone.')) return
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    if (res.ok) { setProducts(products.filter(p => p.id !== id)); flash('Product deleted.') }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderStatus: status }),
    })
    if (res.ok) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, orderStatus: status } : o))
      flash('Order status updated.')
    }
  }

  const deleteOrder = async (id: string) => {
    if (!confirm('Delete this order?')) return
    const res = await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' })
    if (res.ok) { setOrders(orders.filter(o => o.id !== id)); flash('Order deleted.') }
  }

  const SIDEBAR_TABS = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: `Products (${products.length})`, icon: Package },
    { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
    { id: 'users', label: `Users (${users.length})`, icon: Users },
  ]

  return (
    <div className="min-h-screen bg-[#F8F6F3] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A0A0A] text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="font-['Playfair_Display'] text-xl tracking-widest">AURA</Link>
          <p className="text-xs text-[#C9A96E] mt-1 tracking-wider">ADMIN PANEL</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {SIDEBAR_TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left ${
                tab === id ? 'bg-[#C9A96E] text-[#0A0A0A] font-medium' : 'text-white/70 hover:bg-white/10'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-white/50 mb-2">Signed in as</p>
          <p className="text-sm text-white">{adminName}</p>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="mt-3 flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 p-8">
        {feedback && (
          <div className="fixed top-4 right-4 bg-[#0A0A0A] text-white text-sm px-5 py-3 z-50 flex items-center gap-2">
            <Check size={14} className="text-[#C9A96E]" /> {feedback}
          </div>
        )}

        {/* Overview */}
        {tab === 'overview' && (
          <div>
            <h1 className="font-['Playfair_Display'] text-2xl mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Revenue', value: `৳${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp },
                { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag },
                { label: 'Products', value: stats.totalProducts, icon: Package },
                { label: 'Customers', value: stats.totalUsers, icon: Users },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-white border border-[#E8E0D8] p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs tracking-widest uppercase text-[#888]">{label}</span>
                    <Icon size={16} className="text-[#C9A96E]" />
                  </div>
                  <p className="font-['Playfair_Display'] text-2xl text-[#0A0A0A]">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white border border-[#E8E0D8] p-6">
              <h2 className="font-['Playfair_Display'] text-lg mb-4">Recent Orders</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#F0EBE6]">
                    {['Order #', 'Customer', 'Total', 'Status', 'Date'].map(h => (
                      <th key={h} className="text-left pb-3 text-xs tracking-widest uppercase text-[#888] font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 8).map((order) => (
                    <tr key={order.id} className="border-b border-[#F8F6F3]">
                      <td className="py-3 font-medium">{order.orderNumber}</td>
                      <td className="py-3 text-[#555]">{order.customerName}</td>
                      <td className="py-3">৳{order.total.toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 ${STATUS_COLORS[order.orderStatus]}`}>{order.orderStatus}</span>
                      </td>
                      <td className="py-3 text-[#888]">{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Products */}
        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-['Playfair_Display'] text-2xl">Products</h1>
              <button
                onClick={openAddProduct}
                className="flex items-center gap-2 bg-[#0A0A0A] text-white text-xs tracking-widest uppercase px-5 py-3 hover:bg-[#C9A96E] transition-colors"
              >
                <Plus size={14} /> Add Product
              </button>
            </div>

            {showProductForm && (
              <div className="bg-white border border-[#E8E0D8] p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-['Playfair_Display'] text-lg">{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
                  <button onClick={() => setShowProductForm(false)}><X size={18} /></button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: 'name', label: 'Product Name', type: 'text' },
                    { key: 'price', label: 'Price (৳)', type: 'number' },
                    { key: 'salePrice', label: 'Sale Price (৳, optional)', type: 'number' },
                    { key: 'imageUrl', label: 'Image URL', type: 'text' },
                    { key: 'fabric', label: 'Fabric', type: 'text' },
                  ].map(({ key, label, type }) => (
                    <div key={key}>
                      <label className="block text-xs tracking-widest uppercase text-[#555] mb-1">{label}</label>
                      <input
                        type={type}
                        value={(productForm as any)[key]}
                        onChange={(e) => setProductForm({ ...productForm, [key]: e.target.value })}
                        className="w-full border border-[#DDD] px-3 py-2 text-sm outline-none focus:border-[#C9A96E]"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#555] mb-1">Category</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full border border-[#DDD] px-3 py-2 text-sm outline-none focus:border-[#C9A96E] bg-white"
                    >
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-6 mt-4">
                  {(['isFeatured', 'isNew', 'isSale'] as const).map((flag) => (
                    <label key={flag} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(productForm as any)[flag]}
                        onChange={(e) => setProductForm({ ...productForm, [flag]: e.target.checked })}
                        className="accent-[#C9A96E]"
                      />
                      {flag.replace('is', '')}
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={saveProduct} className="bg-[#0A0A0A] text-white text-xs tracking-widest uppercase px-6 py-2.5 hover:bg-[#C9A96E] transition-colors">
                    {editProduct ? 'Save Changes' : 'Create Product'}
                  </button>
                  <button onClick={() => setShowProductForm(false)} className="border border-[#DDD] text-xs tracking-widest uppercase px-6 py-2.5 hover:border-[#0A0A0A] transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white border border-[#E8E0D8] overflow-hidden">
              <table className="w-full text-sm">
                <thead className="border-b border-[#F0EBE6]">
                  <tr>
                    {['Product', 'Category', 'Price', 'Flags', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-4 text-xs tracking-widest uppercase text-[#888] font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-[#F8F6F3] hover:bg-[#FDFCFB]">
                      <td className="px-5 py-3 flex items-center gap-3">
                        <Image src={p.imageUrl} alt={p.name} width={40} height={40} className="object-cover flex-shrink-0" />
                        <span className="font-medium truncate max-w-[180px]">{p.name}</span>
                      </td>
                      <td className="px-5 py-3 text-[#555]">{p.category}</td>
                      <td className="px-5 py-3">
                        {p.salePrice ? (
                          <span><span className="text-[#888] line-through mr-1">৳{p.price.toLocaleString()}</span><span className="text-[#C9A96E]">৳{p.salePrice.toLocaleString()}</span></span>
                        ) : <span>৳{p.price.toLocaleString()}</span>}
                      </td>
                      <td className="px-5 py-3 text-xs space-x-1">
                        {p.isFeatured && <span className="bg-purple-100 text-purple-700 px-2 py-0.5">Featured</span>}
                        {p.isNew && <span className="bg-green-100 text-green-700 px-2 py-0.5">New</span>}
                        {p.isSale && <span className="bg-red-100 text-red-700 px-2 py-0.5">Sale</span>}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => openEditProduct(p)} className="text-[#888] hover:text-[#0A0A0A] transition-colors"><Edit2 size={15} /></button>
                          <button onClick={() => deleteProduct(p.id)} className="text-[#888] hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders */}
        {tab === 'orders' && (
          <div>
            <h1 className="font-['Playfair_Display'] text-2xl mb-6">Orders</h1>
            <div className="bg-white border border-[#E8E0D8] overflow-hidden">
              <table className="w-full text-sm">
                <thead className="border-b border-[#F0EBE6]">
                  <tr>
                    {['Order #', 'Customer', 'Total', 'Payment', 'Status', 'Date', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-4 text-xs tracking-widest uppercase text-[#888] font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-[#F8F6F3] hover:bg-[#FDFCFB]">
                      <td className="px-5 py-3 font-medium">{order.orderNumber}</td>
                      <td className="px-5 py-3">
                        <div>{order.customerName}</div>
                        <div className="text-xs text-[#888]">{order.customerEmail}</div>
                      </td>
                      <td className="px-5 py-3">৳{order.total.toLocaleString()}</td>
                      <td className="px-5 py-3 text-xs">
                        <span className={`px-2 py-1 ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="text-xs border border-[#DDD] px-2 py-1 outline-none bg-white cursor-pointer"
                        >
                          {ORDER_STATUSES.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-5 py-3 text-[#888]">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-3">
                        <button onClick={() => deleteOrder(order.id)} className="text-[#888] hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users */}
        {tab === 'users' && (
          <div>
            <h1 className="font-['Playfair_Display'] text-2xl mb-6">Users</h1>
            <div className="bg-white border border-[#E8E0D8] overflow-hidden">
              <table className="w-full text-sm">
                <thead className="border-b border-[#F0EBE6]">
                  <tr>
                    {['Name', 'Email', 'Role', 'Orders', 'Joined'].map(h => (
                      <th key={h} className="text-left px-5 py-4 text-xs tracking-widest uppercase text-[#888] font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: any) => (
                    <tr key={user.id} className="border-b border-[#F8F6F3] hover:bg-[#FDFCFB]">
                      <td className="px-5 py-3 font-medium">{user.name || '—'}</td>
                      <td className="px-5 py-3 text-[#555]">{user.email}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2 py-1 ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-3">{user._count?.orders ?? 0}</td>
                      <td className="px-5 py-3 text-[#888]">{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
