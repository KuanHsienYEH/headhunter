import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { legalResources } from '@/db/schema'
import { saveMedia, deleteMedia } from '@/lib/media-storage'
import { ok, badRequest, notFound, serverError, requireAdmin } from '@/lib/api'

type Ctx = { params: { id: string } }

const MAX_PDF_SIZE = 10 * 1024 * 1024

/* multipart form — file/url 未提供時保留原值 */
export async function PUT(req: NextRequest, { params }: Ctx) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const [existing] = await db.select().from(legalResources).where(eq(legalResources.id, params.id)).limit(1)
    if (!existing) return notFound()

    const form = await req.formData()
    const titleZh = String(form.get('titleZh') ?? '').trim()
    if (!titleZh) return badRequest('名稱為必填')

    let url = existing.url
    const file = form.get('file')
    const newUrl = String(form.get('url') ?? '').trim()
    if (file instanceof File && file.size > 0) {
      if (file.type !== 'application/pdf') return badRequest('文件僅支援 PDF')
      if (file.size > MAX_PDF_SIZE) return badRequest('PDF 大小不可超過 10MB')
      const buffer = Buffer.from(await file.arrayBuffer())
      url = await saveMedia(buffer, { ext: 'pdf', contentType: 'application/pdf', folder: 'legal' })
      if (existing.url && existing.url !== url) await deleteMedia(existing.url)
    } else if (newUrl && newUrl !== existing.url) {
      url = newUrl
    }

    const [updated] = await db
      .update(legalResources)
      .set({
        titleZh,
        titleEn:   String(form.get('titleEn') ?? '').trim() || null,
        url,
        sortOrder: Number(form.get('sortOrder') ?? 0) || 0,
        isActive:  String(form.get('isActive')) !== 'false',
        updatedAt: new Date(),
      })
      .where(eq(legalResources.id, params.id))
      .returning()

    return ok(updated)
  } catch (err) {
    return serverError(err)
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const [deleted] = await db.delete(legalResources).where(eq(legalResources.id, params.id)).returning()
    if (!deleted) return notFound()
    if (deleted.url) await deleteMedia(deleted.url)
    return ok({ id: params.id })
  } catch (err) {
    return serverError(err)
  }
}
