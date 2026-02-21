import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { current, next } = await req.json()
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user?.password) return NextResponse.json({ error: 'No password set.' }, { status: 400 })

  const valid = await bcrypt.compare(current, user.password)
  if (!valid) return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 400 })
  if (next.length < 8) return NextResponse.json({ error: 'Password must be 8+ characters.' }, { status: 400 })

  await prisma.user.update({ where: { id: user.id }, data: { password: await bcrypt.hash(next, 12) } })
  return NextResponse.json({ success: true })
}
