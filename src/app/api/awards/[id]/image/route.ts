import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { awards } from '@/db/schema'
import { readMedia } from '@/lib/media-storage'

type Ctx = { params: { id: string } }

const BROWSER_CACHE_CONTROL = 'public, max-age=31536000, immutable'
const CDN_CACHE_CONTROL = 'public, s-maxage=31536000, stale-while-revalidate=86400'

export async function GET(req: NextRequest, { params }: Ctx) {
  try {
    const [award] = await db
      .select({ imageUrl: awards.imageUrl })
      .from(awards)
      .where(eq(awards.id, params.id))
      .limit(1)

    if (!award) return new Response('Not found', { status: 404 })

    // 相容舊有外部網址與本機上傳路徑；S3 object key 則由本站代理。
    if (award.imageUrl.startsWith('http://') || award.imageUrl.startsWith('https://') || award.imageUrl.startsWith('/')) {
      const response = NextResponse.redirect(new URL(award.imageUrl, req.nextUrl.origin), 307)
      response.headers.set('Cache-Control', BROWSER_CACHE_CONTROL)
      response.headers.set('CDN-Cache-Control', CDN_CACHE_CONTROL)
      return response
    }

    const media = await readMedia(award.imageUrl)
    return new Response(media.body, {
      headers: {
        'Cache-Control': BROWSER_CACHE_CONTROL,
        'CDN-Cache-Control': CDN_CACHE_CONTROL,
        'Content-Type': media.contentType,
        'X-Content-Type-Options': 'nosniff',
        ...(media.etag ? { ETag: media.etag } : {}),
      },
    })
  } catch (error) {
    console.error('[award image]', error)
    return new Response('Unable to load image', { status: 500 })
  }
}
