import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ ids: [] })
  const w = await prisma.wishlist.findMany({ where: { userId: session.user.id }, select: { productId: true } })
  return NextResponse.json({ ids: w.map(x => x.productId) })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { productId } = await req.json()
  const existing = await prisma.wishlist.findUnique({ where: { userId_productId: { userId: session.user.id, productId } } })

  if (existing) {
    await prisma.wishlist.delete({ where: { id: existing.id } })
    return NextResponse.json({ wishlisted: false })
  } else {
    await prisma.wishlist.create({ data: { userId: session.user.id, productId } })
    return NextResponse.json({ wishlisted: true })
  }
}
