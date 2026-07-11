import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { resumes } from '@/db/schema'
import { readLocalResume } from '@/lib/resume-storage'
import { notFound, serverError, requireAdmin } from '@/lib/api'

type Params = { params: { id: string } }

/** 本機開發模式的履歷串流(fileKey 為 local/ 時使用)— 僅限管理員 */
export async function GET(_req: NextRequest, { params }: Params) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const [resume] = await db
      .select({ fileKey: resumes.fileKey, originalName: resumes.originalName })
      .from(resumes)
      .where(eq(resumes.id, params.id))
      .limit(1)

    if (!resume || !resume.fileKey.startsWith('local/')) return notFound('找不到此履歷檔案')

    const buffer = await readLocalResume(resume.fileKey)
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(resume.originalName)}`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    return serverError(err)
  }
}
