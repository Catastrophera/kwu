import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const updated = await prisma.transaction.update({
      where: { id: params.id },
      data: { payment_status: 'Selesai' }
    })

    return NextResponse.json({ updated }, { status: 200 })
  } catch (error) {
    console.error('Update transaction error:', error)
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
