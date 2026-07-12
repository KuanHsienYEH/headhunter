import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth.config'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { clientIp, isRateLimited, tooManyRequests } from '@/lib/rate-limit'

// middleware 跑在 Edge runtime — 只用 edge-safe 設定驗 JWT,不載入資料庫(pg 需要 Node runtime)
const { auth } = NextAuth(authConfig)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 登入防暴力嘗試:每 IP 10 分鐘最多 10 次
  if (pathname === '/api/auth/callback/credentials' && request.method === 'POST') {
    if (isRateLimited(`login:${clientIp(request)}`, 10, 10 * 60_000)) {
      return tooManyRequests('登入嘗試過於頻繁，請 10 分鐘後再試')
    }
    return NextResponse.next()
  }

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = await auth()

    if (!session?.user) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/auth/callback/credentials'],
}
