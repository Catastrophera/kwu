import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { productId, totalAmount, shippingType, address } = await req.json()

    // Update user address if provided
    if (address && address.trim() !== '') {
      await prisma.user.update({
        where: { id: parseInt(session.user.id) },
        data: { address: address.trim() }
      })
    }

    // Create a transaction directly mocking a successful payment
    const transaction = await prisma.transaction.create({
      data: {
        user_id: parseInt(session.user.id),
        total_amount: totalAmount,
        payment_status: 'Proses',
        shipping_type: shippingType,
        snap_token: `mock-snap-${Date.now()}`
      }
    })

    return NextResponse.json({ message: 'Checkout successful', transaction }, { status: 200 })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

