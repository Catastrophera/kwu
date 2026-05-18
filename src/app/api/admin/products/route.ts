import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.user.id) }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden: Admin only' }, { status: 403 })
    }

    const products = await prisma.product.findMany({
      orderBy: { id: 'desc' }
    })

    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    console.error('Admin GET products error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.user.id) }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden: Admin only' }, { status: 403 })
    }

    const { product_name, price, stock, image_path, is_gacha_eligible } = await req.json()

    const newProduct = await prisma.product.create({
      data: {
        product_name,
        price: parseFloat(price),
        stock: parseInt(stock),
        image_path,
        is_gacha_eligible: Boolean(is_gacha_eligible)
      }
    })

    return NextResponse.json({ message: 'Product created', product: newProduct }, { status: 201 })
  } catch (error) {
    console.error('Admin POST product error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
