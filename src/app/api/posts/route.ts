import { NextRequest } from 'next/server'
import { eq, desc, and } from 'drizzle-orm'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { postSchema } from '@/lib/validations'
import { ok, created, badRequest, serverError, requireAdmin } from '@/lib/api'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const lang   = searchParams.get('lang')
    const status = searchParams.get('status')

    const conditions = []
    if (status) conditions.push(eq(posts.status, status))
    if (lang && lang !== 'all') {
      // lang filter: zh shows 'zh'+'both', en shows 'en'+'both'
      // For simplicity we handle this in JS after fetch
    }

    const rows = await db
      .select()
      .from(posts)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(posts.createdAt))

    // Apply lang filter in JS
    const filtered = lang && lang !== 'all'
      ? rows.filter(p => p.lang === lang || p.lang === 'both')
      : rows

    return ok(filtered)
  } catch (err) {
    return serverError(err)
  }
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const body   = await req.json()
    const parsed = postSchema.safeParse(body)
    if (!parsed.success) return badRequest(parsed.error.issues[0].message)

    const { status, ...rest } = parsed.data
    const publishedAt = status === 'published' ? new Date() : null

    const [post] = await db
      .insert(posts)
      .values({ ...rest, status, publishedAt })
      .returning()

    return created(post)
  } catch (err) {
    return serverError(err)
  }
}
