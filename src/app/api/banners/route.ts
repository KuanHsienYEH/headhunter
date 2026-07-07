import { NextRequest } from 'next/server'
import { asc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { banners } from '@/db/schema'
import { bannerSchema } from '@/lib/validations'
import { ok, created, badRequest, serverError, requireAdmin } from '@/lib/api'

export async function GET(req: NextRequest) {
  try {
    const all = req.nextUrl.searchParams.get('all') === 'true'
    const guard = all ? await requireAdmin() : null
    if (guard) return guard

    const rows = await db
      .select()
      .from(banners)
      .where(all ? undefined : eq(banners.isActive, true))
      .orderBy(asc(banners.sortOrder), asc(banners.createdAt))
    return ok(rows)
  } catch (err) {
    return serverError(err)
  }
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const body = await req.json()
    const parsed = bannerSchema.safeParse(body)
    if (!parsed.success) return badRequest(parsed.error.issues[0].message)

    const [banner] = await db.insert(banners).values(parsed.data).returning()
    return created(banner)
  } catch (err) {
    return serverError(err)
  }
}
