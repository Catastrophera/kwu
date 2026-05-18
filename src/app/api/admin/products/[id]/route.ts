import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    await prisma.product.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({ message: 'Product deleted' }, { status: 200 })
  } catch (error) {
    console.error('Admin DELETE product error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
