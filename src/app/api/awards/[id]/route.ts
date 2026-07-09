import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { unlink } from 'fs/promises'
import path from 'path'
import { db } from '@/db'
import { awards } from '@/db/schema'
import { awardUpdateSchema } from '@/lib/validations'
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
    return ok(updated)
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

    // 同步刪除上傳的實體檔案(僅限本站 uploads 路徑)
    if (deleted.imageUrl.startsWith('/uploads/awards/')) {
      const filePath = path.join(process.cwd(), 'public', deleted.imageUrl)
      await unlink(filePath).catch(() => {})
    }
    return ok({ id: params.id })
  } catch (err) {
    return serverError(err)
  }
}
