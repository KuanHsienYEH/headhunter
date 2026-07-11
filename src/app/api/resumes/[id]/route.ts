import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { resumes } from '@/db/schema'
import { deleteResumeFile } from '@/lib/resume-storage'
import { resumeStatusSchema } from '@/lib/validations'
import { ok, badRequest, notFound, serverError, requireAdmin } from '@/lib/api'

type Params = { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const [resume] = await db
      .select()
      .from(resumes)
      .where(eq(resumes.id, params.id))
      .limit(1)

    if (!resume) return notFound('找不到此履歷')
    return ok(resume)
  } catch (err) {
    return serverError(err)
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const body   = await req.json()
    const parsed = resumeStatusSchema.safeParse(body)
    if (!parsed.success) return badRequest(parsed.error.issues[0].message)

    const [updated] = await db
      .update(resumes)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(resumes.id, params.id))
      .returning()

    if (!updated) return notFound('找不到此履歷')
    return ok(updated)
  } catch (err) {
    return serverError(err)
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const [resume] = await db
      .select()
      .from(resumes)
      .where(eq(resumes.id, params.id))
      .limit(1)

    if (!resume) return notFound('找不到此履歷')

    // Delete S3 file first, then DB record
    await deleteResumeFile(resume.fileKey)
    await db.delete(resumes).where(eq(resumes.id, params.id))

    return ok({ id: params.id, deleted: true })
  } catch (err) {
    return serverError(err)
  }
}
