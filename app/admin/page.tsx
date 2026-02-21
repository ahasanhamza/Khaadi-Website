// app/admin/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import AdminClient from './AdminClient'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  const [products, orders, users] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.order.findMany({
      include: { orderItems: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, role: true, createdAt: true, _count: { select: { orders: true } } },
    }),
  ])

  const stats = {
    totalRevenue: orders.filter(o => o.orderStatus !== 'Cancelled').reduce((sum, o) => sum + o.total, 0),
    totalOrders: orders.length,
    totalProducts: products.length,
    totalUsers: users.filter(u => u.role === 'USER').length,
  }

  return (
    <AdminClient
      products={JSON.parse(JSON.stringify(products))}
      orders={JSON.parse(JSON.stringify(orders))}
      users={JSON.parse(JSON.stringify(users))}
      stats={stats}
      adminName={session?.user?.name || 'Admin'}
    />
  )
}
