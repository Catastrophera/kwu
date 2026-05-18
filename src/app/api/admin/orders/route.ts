import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const transactions = await prisma.transaction.findMany({
      where: { payment_status: { in: ['Proses', 'Selesai'] } },
      include: { user: true },
      orderBy: { createdAt: 'desc' }
    })

    const gachaLogs = await prisma.gachaLog.findMany({
      where: { status: { in: ['Proses', 'Selesai'] } },
      include: { user: true, product: true },
      orderBy: { created_at: 'desc' }
    })

    const orders = [
      ...transactions.map(t => ({
        id: t.id,
        type: 'Transaction',
        user_name: t.user.username,
        address: t.user.address,
        items: 'Reguler Order',
        total_amount: t.total_amount,
        shipping_type: t.shipping_type,
        status: t.payment_status,
        created_at: t.createdAt
      })),
      ...gachaLogs.map(g => ({
        id: g.id,
        type: 'Gacha',
        user_name: g.user.username,
        address: g.user.address,
        items: g.product.product_name,
        total_amount: 'Rp 500 (Gacha)',
        shipping_type: g.shipping_type || '-',
        status: g.status,
        created_at: g.created_at
      }))
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return NextResponse.json({ orders }, { status: 200 })
  } catch (error) {
    console.error('Fetch orders error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
