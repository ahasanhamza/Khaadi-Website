import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const orderNumber = searchParams.get('orderNumber')?.trim()
  const email = searchParams.get('email')?.trim().toLowerCase()

  if (!orderNumber || !email) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

  const order = await prisma.order.findFirst({
    where: { orderNumber, customerEmail: { equals: email, mode: 'insensitive' } },
    include: { orderItems: true },
  })

  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ order })
}
