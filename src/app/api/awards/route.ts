import { NextRequest } from 'next/server'
import { asc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { awards } from '@/db/schema'
import { saveAwardImage, resolveAwardImageUrl } from '@/lib/award-storage'
import { ok, created, badRequest, serverError, requireAdmin } from '@/lib/api'

const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const MIME_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png':  'png',
  'image/webp': 'webp',
}

/** 把 DB 列的 imageUrl(S3 key 或本機路徑)轉成可顯示的網址 */
async function withResolvedUrls<T extends { imageUrl: string }>(rows: T[]): Promise<T[]> {
  return Promise.all(rows.map(async r => ({ ...r, imageUrl: await resolveAwardImageUrl(r.imageUrl) })))
}

export async function GET(req: NextRequest) {
  try {
    const all = req.nextUrl.searchParams.get('all') === 'true'
    const guard = all ? await requireAdmin() : null
    if (guard) return guard

    const rows = await db
      .select()
      .from(awards)
      .where(all ? undefined : eq(awards.isActive, true))
      .orderBy(asc(awards.sortOrder), asc(awards.createdAt))
    return ok(await withResolvedUrls(rows))
  } catch (err) {
    return serverError(err)
  }
}

/* multipart form: file(必填)、title、sortOrder */
export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const form = await req.formData()
    const file = form.get('file')
    if (!(file instanceof File)) return badRequest('請選擇圖片檔案')

    const ext = MIME_EXT[file.type]
    if (!ext) return badRequest('僅支援 JPG / PNG / WebP 圖片')
    if (file.size > MAX_SIZE) return badRequest('圖片大小不可超過 5MB')

    const title = String(form.get('title') ?? '').trim()
    if (!title) return badRequest('請輸入獎項名稱')
    const sortOrder = Number(form.get('sortOrder') ?? 0) || 0

    const buffer = Buffer.from(await file.arrayBuffer())
    const imageRef = await saveAwardImage(buffer, ext, file.type)

    const [award] = await db
      .insert(awards)
      .values({ title, imageUrl: imageRef, sortOrder })
      .returning()

    return created({ ...award, imageUrl: await resolveAwardImageUrl(award.imageUrl) })
  } catch (err) {
    return serverError(err)
  }
}
