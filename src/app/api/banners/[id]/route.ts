import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { banners } from '@/db/schema'
import { bannerSchema } from '@/lib/validations'
import { ok, badRequest, notFound, serverError, requireAdmin } from '@/lib/api'

type Ctx = { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Ctx) {
  try {
    const [row] = await db.select().from(banners).where(eq(banners.id, params.id)).limit(1)
    if (!row) return notFound()
    return ok(row)
  } catch (err) {
    return serverError(err)
  }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const body = await req.json()
    const parsed = bannerSchema.partial().safeParse(body)
    if (!parsed.success) return badRequest(parsed.error.issues[0].message)

    const [updated] = await db
      .update(banners)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(banners.id, params.id))
      .returning()

    if (!updated) return notFound()
    return ok(updated)
  } catch (err) {
    return serverError(err)
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const [deleted] = await db.delete(banners).where(eq(banners.id, params.id)).returning()
    if (!deleted) return notFound()
    return ok({ id: params.id })
  } catch (err) {
    return serverError(err)
  }
}
