import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { MoodEntry } from '@/models/MoodEntry'
import { getAuthUser } from '@/lib/auth'
import { z } from 'zod'

const createSchema = z.object({
  mood: z.enum(['happy', 'excited', 'calm', 'confused', 'stressed', 'anxious', 'sad', 'angry', 'lonely']),
  intensity: z.number().min(1).max(10).optional(),
  note: z.string().optional(),
  triggers: z.array(z.string()).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const payload = await getAuthUser()
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')

    const since = new Date()
    since.setDate(since.getDate() - days)

    const entries = await MoodEntry.find({
      studentId: payload.userId,
      date: { $gte: since },
    }).sort({ date: -1 })

    return NextResponse.json({ entries })
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

    const entry = await MoodEntry.create({
      studentId: payload.userId,
      ...data,
      date: new Date(),
    })

    return NextResponse.json({ entry }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
