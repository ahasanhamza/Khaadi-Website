import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/auth/login')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      orders: { include: { orderItems: true }, orderBy: { createdAt: 'desc' }, take: 10 },
      wishlists: { include: { product: true }, orderBy: { createdAt: 'desc' } },
    },
  })

  if (!user) redirect('/auth/login')
  return <DashboardClient user={JSON.parse(JSON.stringify(user))} />
}
