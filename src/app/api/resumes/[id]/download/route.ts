import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { resumes } from '@/db/schema'
import { resolveResumeUrl } from '@/lib/resume-storage'
import { ok, notFound, serverError, requireAdmin } from '@/lib/api'

type Params = { params: { id: string } }

// Generates a fresh 15-minute signed URL each time — never cached, never static
export async function GET(_req: NextRequest, { params }: Params) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const [resume] = await db
      .select({ fileKey: resumes.fileKey, originalName: resumes.originalName })
      .from(resumes)
      .where(eq(resumes.id, params.id))
      .limit(1)

    if (!resume) return notFound('找不到此履歷')

    const url = await resolveResumeUrl(resume.fileKey)

    return ok({ url, originalName: resume.originalName, expiresIn: 900 })
  } catch (err) {
    return serverError(err)
  }
}
