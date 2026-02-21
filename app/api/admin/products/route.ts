import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function adminOnly(session: any) {
  return !session || session.user.role !== 'ADMIN'
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (adminOnly(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const data = await req.json()
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now()

  const product = await prisma.product.create({
    data: { ...data, slug, colors: JSON.stringify(['Ivory', 'Sage Green']), sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL']) },
  })
  return NextResponse.json({ product }, { status: 201 })
}
