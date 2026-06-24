import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

// Protected route prefixes
const PROTECTED = ['/dashboard', '/book-counselling', '/career-guidance', '/book-tutor',
  '/my-sessions', '/calendar', '/mood-tracker', '/journal', '/blogs', '/resources',
  '/community', '/messages', '/notifications', '/payments', '/certificates',
  '/profile', '/settings']

const ADMIN_ONLY = ['/admin']
const COUNSELLOR_ONLY = ['/counsellor']
const AUTH_ROUTES = ['/login', '/register', '/verify-email', '/forgot-password', '/reset-password']

const DISABLE_AUTH_FOR_DEV = true

export function middleware(request: NextRequest) {
  if (DISABLE_AUTH_FOR_DEV) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value

  // Redirect authenticated users away from auth pages
  if (AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    if (token) {
      const payload = verifyToken(token)
      if (payload) {
        if (payload.role === 'admin') return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        if (payload.role === 'counsellor') return NextResponse.redirect(new URL('/counsellor/dashboard', request.url))
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
    return NextResponse.next()
  }

  // Check protected routes
  const isProtected =
    PROTECTED.some((r) => pathname.startsWith(r)) ||
    ADMIN_ONLY.some((r) => pathname.startsWith(r)) ||
    COUNSELLOR_ONLY.some((r) => pathname.startsWith(r))

  if (!isProtected) return NextResponse.next()

  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const payload = verifyToken(token)
  if (!payload) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    const response = NextResponse.redirect(loginUrl)
    response.cookies.delete('auth-token')
    return response
  }

  // Role-based guards
  if (ADMIN_ONLY.some((r) => pathname.startsWith(r)) && payload.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  if (COUNSELLOR_ONLY.some((r) => pathname.startsWith(r)) && payload.role !== 'counsellor') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*', '/admin/:path*', '/counsellor/:path*',
    '/book-counselling/:path*', '/career-guidance/:path*', '/book-tutor/:path*',
    '/my-sessions/:path*', '/calendar/:path*', '/mood-tracker/:path*',
    '/journal/:path*', '/blogs/:path*', '/resources/:path*', '/community/:path*',
    '/messages/:path*', '/notifications/:path*', '/payments/:path*',
    '/certificates/:path*', '/profile/:path*', '/settings/:path*',
    '/login', '/register', '/verify-email', '/forgot-password', '/reset-password',
  ],
}
