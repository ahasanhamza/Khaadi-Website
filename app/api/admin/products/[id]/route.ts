import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function adminOnly(session: any) { return !session || session.user.role !== 'ADMIN' }

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (adminOnly(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const data = await req.json()
  const product = await prisma.product.update({ where: { id: params.id }, data })
  return NextResponse.json({ product })
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (adminOnly(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  await prisma.product.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
