import { NextRequest } from 'next/server'
import { eq, desc, and } from 'drizzle-orm'
import { db } from '@/db'
import { jobs } from '@/db/schema'
import { jobSchema } from '@/lib/validations'
import { ok, created, badRequest, serverError, requireAdmin } from '@/lib/api'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const lang     = searchParams.get('lang')
    const activeOnly = searchParams.get('active') === 'true'

    const conditions = []
    if (activeOnly) conditions.push(eq(jobs.isActive, true))

    const rows = await db
      .select()
      .from(jobs)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(jobs.createdAt))

    const filtered = lang && lang !== 'all'
      ? rows.filter(j => j.lang === lang || j.lang === 'both')
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
    const parsed = jobSchema.safeParse(body)
    if (!parsed.success) return badRequest(parsed.error.issues[0].message)

    const [job] = await db.insert(jobs).values(parsed.data).returning()
    return created(job)
  } catch (err) {
    return serverError(err)
  }
}
