import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { name, phone, address } = await req.json()
  const user = await prisma.user.update({ where: { email: session.user.email }, data: { name, phone, address } })
  return NextResponse.json({ user })
}
