import { NextRequest, NextResponse } from 'next/server'

/**
 * 簡易頻率限制(記憶體滑動視窗,依 IP 計數)。
 * 註:serverless 環境(Vercel)每個實例各自計數,屬「盡力而為」的防護 —
 * 足以擋住單點灌爆與暴力嘗試;若需跨實例精確限流,再導入 Upstash Redis。
 */
const buckets = new Map<string, number[]>()

export function clientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const hits = (buckets.get(key) ?? []).filter(t => now - t < windowMs)
  if (hits.length >= limit) {
    buckets.set(key, hits)
    return true
  }
  hits.push(now)
  buckets.set(key, hits)

  // 簡易清理,避免 Map 無限成長
  if (buckets.size > 5000) {
    buckets.forEach((v, k) => {
      if (v.every(t => now - t >= windowMs)) buckets.delete(k)
    })
  }
  return false
}

export function tooManyRequests(message = '操作過於頻繁，請稍後再試') {
  return NextResponse.json({ error: 'TOO_MANY_REQUESTS', message }, { status: 429 })
}
