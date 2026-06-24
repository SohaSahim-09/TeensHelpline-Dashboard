import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Counsellor } from '@/models/Counsellor'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const specialization = searchParams.get('specialization')
    const gender = searchParams.get('gender')
    const limit = parseInt(searchParams.get('limit') || '20')

    const query: any = { isApproved: true }
    if (specialization) query.specializations = { $in: [specialization] }
    if (gender) query.gender = gender

    const counsellors = await Counsellor.find(query)
      .sort({ rating: -1 })
      .limit(limit)
      .populate('userId', 'name email avatar')

    return NextResponse.json({ counsellors })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
