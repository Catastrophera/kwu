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

    const { gachaLogId, shippingType } = await req.json()

    if (!gachaLogId || !shippingType) {
      return NextResponse.json({ message: 'Invalid data' }, { status: 400 })
    }

    const log = await prisma.gachaLog.findUnique({
      where: { id: parseInt(gachaLogId) }
    })

    if (!log || log.user_id !== parseInt(session.user.id)) {
      return NextResponse.json({ message: 'Not found or forbidden' }, { status: 404 })
    }

    if (log.status !== 'Unclaimed') {
      return NextResponse.json({ message: 'Already claimed' }, { status: 400 })
    }

    const updatedLog = await prisma.gachaLog.update({
      where: { id: log.id },
      data: {
        status: 'Proses',
        shipping_type: shippingType
      }
    })

    return NextResponse.json({ message: 'Gacha claimed successfully', log: updatedLog }, { status: 200 })
  } catch (error) {
    console.error('Claim gacha error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
