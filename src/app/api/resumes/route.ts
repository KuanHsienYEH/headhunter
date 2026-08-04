import { NextRequest } from 'next/server'
import { and, desc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { resumes, jobs } from '@/db/schema'
import { resumeMetaSchema } from '@/lib/validations'
import { deleteResumeFile, saveResumeFile } from '@/lib/resume-storage'
import { notifyNewResume, confirmResume } from '@/lib/mail'
import { ok, created, badRequest, serverError, requireAdmin } from '@/lib/api'
import { clientIp, isRateLimited, tooManyRequests } from '@/lib/rate-limit'
import path from 'path'

// Vercel Functions 的完整 request body 上限為 4.5 MB；multipart 另有封裝開銷。
const MAX_FILE_SIZE = 4 * 1024 * 1024 // 4 MB
const ALLOWED_EXTENSIONS = new Set(['.pdf', '.doc', '.docx'])

export async function POST(req: NextRequest) {
  try {
    // 頻率限制:每 IP 10 分鐘最多 3 次上傳
    if (isRateLimited(`resume:${clientIp(req)}`, 3, 10 * 60_000)) {
      return tooManyRequests('上傳過於頻繁，請 10 分鐘後再試')
    }

    const formData = await req.formData()

    // 蜜罐欄位:人類看不到、機器人會填 — 填了就假裝成功,不落資料
    const trap = formData.get('website')
    if (typeof trap === 'string' && trap.trim() !== '') {
      return created({ id: 'ok' })
    }

    // Validate file
    const file = formData.get('file') as File | null
    if (!file) return badRequest('請上傳履歷檔案')
    if (!ALLOWED_EXTENSIONS.has(path.extname(file.name).toLowerCase())) {
      return badRequest('只接受 PDF、DOC、DOCX 格式')
    }
    if (file.size > MAX_FILE_SIZE) return badRequest('檔案大小不得超過 4MB')

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

    // 避免從已下架或已刪除的舊職缺頁送出，造成 job_id 外鍵錯誤。
    if (parsed.data.jobId) {
      const [targetJob] = await db
        .select({ id: jobs.id })
        .from(jobs)
        .where(and(eq(jobs.id, parsed.data.jobId), eq(jobs.isActive, true)))
        .limit(1)
      if (!targetJob) return badRequest('此職缺已下架，請改由聯絡頁登記履歷')
    }

    // 上傳至 private S3 bucket，DB 儲存完整 object key
    const buffer   = Buffer.from(await file.arrayBuffer())
    const fileKey  = await saveResumeFile(buffer, file.name)

    // DB 寫入失敗時刪除剛上傳的 S3 物件，避免留下無法管理的孤兒檔案。
    const resume = await (async () => {
      try {
        const [row] = await db
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
        return row
      } catch (err) {
        await deleteResumeFile(fileKey).catch(cleanupErr => {
          console.error('[resume] Failed to clean up S3 object after DB error', cleanupErr)
        })
        throw err
      }
    })()

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
