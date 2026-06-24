import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Appointment } from '@/models/Appointment'
import { getAuthUser } from '@/lib/auth'
import { z } from 'zod'

const createSchema = z.object({
  providerId: z.string(),
  providerType: z.enum(['counsellor', 'tutor', 'career-mentor']),
  providerName: z.string(),
  date: z.string(),
  time: z.string(),
  duration: z.number().optional(),
  type: z.enum(['video', 'audio', 'chat']).optional(),
  subject: z.string().optional(),
  price: z.number(),
})

export async function GET(request: NextRequest) {
  try {
    const payload = await getAuthUser()
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const query: any = { studentId: payload.userId }
    if (status) query.status = status

    const appointments = await Appointment.find(query).sort({ date: -1 }).limit(50)
    return NextResponse.json({ appointments })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getAuthUser()
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const body = await request.json()
    const data = createSchema.parse(body)

    const appointment = await Appointment.create({
      studentId: payload.userId,
      studentName: payload.email,
      ...data,
      date: new Date(data.date),
      paymentStatus: 'pending',
      status: 'pending',
    })

    return NextResponse.json({ appointment }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
