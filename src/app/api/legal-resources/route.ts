import { NextRequest } from 'next/server'
import { asc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { legalResources } from '@/db/schema'
import { saveMedia } from '@/lib/media-storage'
import { ok, created, badRequest, serverError, requireAdmin } from '@/lib/api'

const MAX_PDF_SIZE = 10 * 1024 * 1024 // 10MB

export async function GET(req: NextRequest) {
  try {
    const all = req.nextUrl.searchParams.get('all') === 'true'
    const guard = all ? await requireAdmin() : null
    if (guard) return guard

    const rows = await db
      .select()
      .from(legalResources)
      .where(all ? undefined : eq(legalResources.isActive, true))
      .orderBy(asc(legalResources.sortOrder), asc(legalResources.createdAt))
    return ok(rows)
  } catch (err) {
    return serverError(err)
  }
}

/* multipart form: category(gov|doc)、titleZh(必填)、titleEn、url(外部連結)或 file(PDF) */
export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const form = await req.formData()
    const category = String(form.get('category') ?? 'doc')
    if (!['gov', 'doc'].includes(category)) return badRequest('類別不正確')

    const titleZh = String(form.get('titleZh') ?? '').trim()
    if (!titleZh) return badRequest('名稱為必填')

    let url: string | null = String(form.get('url') ?? '').trim() || null

    const file = form.get('file')
    if (file instanceof File && file.size > 0) {
      if (file.type !== 'application/pdf') return badRequest('文件僅支援 PDF')
      if (file.size > MAX_PDF_SIZE) return badRequest('PDF 大小不可超過 10MB')
      const buffer = Buffer.from(await file.arrayBuffer())
      url = await saveMedia(buffer, { ext: 'pdf', contentType: 'application/pdf', folder: 'legal' })
    }

    if (category === 'gov' && !url) return badRequest('政府資訊請填寫連結網址')

    const [row] = await db
      .insert(legalResources)
      .values({
        category,
        titleZh,
        titleEn:   String(form.get('titleEn') ?? '').trim() || null,
        url,
        sortOrder: Number(form.get('sortOrder') ?? 0) || 0,
      })
      .returning()
    return created(row)
  } catch (err) {
    return serverError(err)
  }
}
