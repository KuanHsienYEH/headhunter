import { NextRequest } from 'next/server'
import { desc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { resumes, jobs } from '@/db/schema'
import { resumeMetaSchema } from '@/lib/validations'
import { saveResumeFile } from '@/lib/resume-storage'
import { notifyNewResume, confirmResume } from '@/lib/mail'
import { ok, created, badRequest, serverError, requireAdmin } from '@/lib/api'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = ['application/pdf']

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    // Validate file
    const file = formData.get('file') as File | null
    if (!file) return badRequest('請上傳履歷檔案')
    if (!ALLOWED_TYPES.includes(file.type)) return badRequest('只接受 PDF 格式')
    if (file.size > MAX_FILE_SIZE) return badRequest('檔案大小不得超過 5MB')

    // Validate metadata fields
    const meta = {
      name:         formData.get('name'),
      email:        formData.get('email'),
      currentTitle: formData.get('currentTitle') || undefined,
      direction:    formData.get('direction')    || undefined,
      jobId:        formData.get('jobId')        || undefined,
      consent:      formData.get('consent') === 'true' ? true : formData.get('consent'),
    }

    const parsed = resumeMetaSchema.safeParse(meta)
    if (!parsed.success) return badRequest(parsed.error.issues[0].message)

    // 上傳檔案(S3 或本機私有目錄)
    const buffer   = Buffer.from(await file.arrayBuffer())
    const fileKey  = await saveResumeFile(buffer, file.name)

    // Save to DB
    const [resume] = await db
      .insert(resumes)
      .values({
        name:         parsed.data.name,
        email:        parsed.data.email,
        currentTitle: parsed.data.currentTitle,
        direction:    parsed.data.direction,
        jobId:        parsed.data.jobId,
        fileKey,
        originalName: file.name,
        fileSize:     file.size,
      })
      .returning()

    // Non-blocking notifications
    void notifyNewResume({
      id:           resume.id,
      name:         resume.name,
      email:        resume.email,
      currentTitle: resume.currentTitle,
    })
    void confirmResume(resume.email, resume.name)

    return created({ id: resume.id })
  } catch (err) {
    return serverError(err)
  }
}

export async function GET(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const { searchParams } = req.nextUrl
    const status = searchParams.get('status')

    // left join 帶出應徵職缺名稱
    const base = db
      .select({ resume: resumes, jobTitle: jobs.titleZh })
      .from(resumes)
      .leftJoin(jobs, eq(resumes.jobId, jobs.id))

    const rows = status
      ? await base.where(eq(resumes.status, status)).orderBy(desc(resumes.createdAt))
      : await base.orderBy(desc(resumes.createdAt))

    return ok(rows.map(r => ({ ...r.resume, jobTitle: r.jobTitle })))
  } catch (err) {
    return serverError(err)
  }
}
