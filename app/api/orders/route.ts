// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { generateOrderNumber } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      customerName, customerEmail, customerPhone, shippingAddress,
      notes, paymentMethod, items, subtotal, shippingCost, total,
    } = body

    // Validate
    if (!customerName || !customerPhone || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const orderNumber = generateOrderNumber()

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail: customerEmail || '',
        customerPhone,
        shippingAddress,
        notes: notes || '',
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Pending',
        orderStatus: 'Processing',
        subtotal,
        shippingCost,
        total,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size || null,
            color: item.color || null,
            price: item.price,
          })),
        },
      },
    })

    // SSLCommerz Demo flow
    if (paymentMethod === 'SSLCommerz') {
      // In production, init SSLCommerz API here
      // For demo, we redirect to a mock success with the order
      const demoPayUrl = `/checkout/success?order=${orderNumber}&payment=ssl`
      return NextResponse.json({ orderNumber, paymentUrl: demoPayUrl })
    }

    // COD: return success directly
    return NextResponse.json({ orderNumber, success: true })
  } catch (err: any) {
    console.error('[POST /api/orders]', err)
    return NextResponse.json({ error: err.message || 'Order creation failed' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const orderNumber = searchParams.get('orderNumber')

    if (orderNumber) {
      const order = await prisma.order.findUnique({
        where: { orderNumber },
        include: { items: { include: { product: true } } },
      })
      return NextResponse.json(order)
    }

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    return NextResponse.json(orders)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
