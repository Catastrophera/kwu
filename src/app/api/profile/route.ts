import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.user.id) },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        address: true,
        phone: true,
        createdAt: true
      }
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error('Profile error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { address, phone } = await req.json()

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(session.user.id) },
      data: {
        address,
        phone
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        address: true,
        phone: true
      }
    })

    return NextResponse.json({ message: 'Profile updated successfully', user: updatedUser }, { status: 200 })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
