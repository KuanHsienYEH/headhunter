import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

// ── Standard response helpers ─────────────────────────────────────────────────

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ data, message: 'ok' }, { status })
}

export function created<T>(data: T) {
  return NextResponse.json({ data, message: 'ok' }, { status: 201 })
}

export function badRequest(message: string) {
  return NextResponse.json({ error: 'BAD_REQUEST', message }, { status: 400 })
}

export function unauthorized() {
  return NextResponse.json({ error: 'UNAUTHORIZED', message: '請先登入' }, { status: 401 })
}

export function notFound(message = '找不到資源') {
  return NextResponse.json({ error: 'NOT_FOUND', message }, { status: 404 })
}

export function serverError(err: unknown) {
  console.error('[API error]', err)
  return NextResponse.json(
    { error: 'SERVER_ERROR', message: '伺服器錯誤，請稍後再試' },
    { status: 500 },
  )
}

// ── Auth guard for admin API routes ───────────────────────────────────────────

export async function requireAdmin() {
  const session = await auth()
  if (!session?.user) return unauthorized()
  return null // null = pass
}
