import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function adminOnly(s: any) { return !s || s.user.role !== 'ADMIN' }

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const s = await getServerSession(authOptions)
  if (adminOnly(s)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const data = await req.json()
  const order = await prisma.order.update({ where: { id: params.id }, data })
  return NextResponse.json({ order })
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const s = await getServerSession(authOptions)
  if (adminOnly(s)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  await prisma.order.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
