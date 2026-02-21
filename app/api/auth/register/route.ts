import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password) return NextResponse.json({ error: 'All fields required.' }, { status: 400 })
    if (password.length < 8) return NextResponse.json({ error: 'Password must be 8+ characters.' }, { status: 400 })

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) return NextResponse.json({ error: 'Email already registered.' }, { status: 409 })

    const user = await prisma.user.create({
      data: { name, email, password: await bcrypt.hash(password, 12), role: 'USER' },
      select: { id: true, email: true, name: true },
    })
    return NextResponse.json({ user }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
