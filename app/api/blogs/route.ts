import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { BlogPost } from '@/models/BlogPost'
import { getAuthUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '20')

    const query: any = { isPublished: true }
    if (category) query.category = category
    if (featured === 'true') query.isFeatured = true

    const blogs = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-content')

    return NextResponse.json({ blogs })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
