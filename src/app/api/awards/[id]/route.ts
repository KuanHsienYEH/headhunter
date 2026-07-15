import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { awards } from '@/db/schema'
import { awardUpdateSchema } from '@/lib/validations'
import { deleteAwardImage } from '@/lib/award-storage'
import { getAwardImageUrl } from '@/lib/award-image-url'
import { ok, badRequest, notFound, serverError, requireAdmin } from '@/lib/api'

type Ctx = { params: { id: string } }

export async function PUT(req: NextRequest, { params }: Ctx) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const body = await req.json()
    const parsed = awardUpdateSchema.safeParse(body)
    if (!parsed.success) return badRequest(parsed.error.issues[0].message)

    const [updated] = await db
      .update(awards)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(awards.id, params.id))
      .returning()

    if (!updated) return notFound()
    return ok({ ...updated, imageUrl: getAwardImageUrl(updated.id, updated.imageUrl, updated.updatedAt) })
  } catch (err) {
    return serverError(err)
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const [deleted] = await db.delete(awards).where(eq(awards.id, params.id)).returning()
    if (!deleted) return notFound()

    // 同步刪除實體檔案(S3 物件或本機檔)
    await deleteAwardImage(deleted.imageUrl)
    return ok({ id: params.id })
  } catch (err) {
    return serverError(err)
  }
}
