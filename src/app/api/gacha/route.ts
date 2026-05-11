import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized. Please login to pull gacha.' }, { status: 401 })
    }

    // Get all gacha eligible products
    const eligibleProducts = await prisma.product.findMany({
      where: {
        is_gacha_eligible: true
      }
    })

    if (eligibleProducts.length === 0) {
      return NextResponse.json({ message: 'No gacha products available.' }, { status: 400 })
    }

    // Random selection logic
    const randomIndex = Math.floor(Math.random() * eligibleProducts.length)
    const selectedProduct = eligibleProducts[randomIndex]

    // Create Gacha Log
    const log = await prisma.gachaLog.create({
      data: {
        user_id: parseInt(session.user.id),
        product_id_received: selectedProduct.id,
      }
    })

    // Auto create a transaction for the gacha pull (mocking payment deduction since it's a school project without a wallet system)
    await prisma.transaction.create({
      data: {
        user_id: parseInt(session.user.id),
        total_amount: 10000, // Fixed gacha price
        payment_status: "Success", // Auto success for mock
        shipping_type: "Pickup A10", // Default pickup
      }
    })

    return NextResponse.json({ 
      message: 'Gacha pull successful!', 
      product: selectedProduct 
    }, { status: 200 })

  } catch (error) {
    console.error('Gacha error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
