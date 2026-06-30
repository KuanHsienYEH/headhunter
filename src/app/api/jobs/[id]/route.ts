import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { jobs } from '@/db/schema'
import { jobSchema } from '@/lib/validations'
import { ok, badRequest, notFound, serverError, requireAdmin } from '@/lib/api'

type Params = { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, params.id)).limit(1)
    if (!job) return notFound('找不到此職缺')
    return ok(job)
  } catch (err) {
    return serverError(err)
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const body   = await req.json()
    const parsed = jobSchema.partial().safeParse(body)
    if (!parsed.success) return badRequest(parsed.error.issues[0].message)

    const [updated] = await db
      .update(jobs)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(jobs.id, params.id))
      .returning()

    if (!updated) return notFound('找不到此職缺')
    return ok(updated)
  } catch (err) {
    return serverError(err)
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const [deleted] = await db
      .delete(jobs)
      .where(eq(jobs.id, params.id))
      .returning()

    if (!deleted) return notFound('找不到此職缺')
    return ok({ id: params.id })
  } catch (err) {
    return serverError(err)
  }
}
