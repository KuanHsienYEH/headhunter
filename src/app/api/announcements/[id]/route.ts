import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { announcements } from '@/db/schema'
import { deleteMedia, extractImageFromForm, resolveMediaUrl } from '@/lib/media-storage'
import { ok, badRequest, notFound, serverError, requireAdmin } from '@/lib/api'

type Context = { params: { id: string } }

export async function PUT(req: NextRequest, { params }: Context) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const [existing] = await db
      .select()
      .from(announcements)
      .where(eq(announcements.id, params.id))
      .limit(1)
    if (!existing) return notFound('找不到此公開聲明')

    const form = await req.formData()
    const text = String(form.get('text') ?? '').trim()
    const popupTitle = String(form.get('popupTitle') ?? '').trim()
    const popupBody = String(form.get('popupBody') ?? '').trim()

    if (!text) return badRequest('跑馬燈文字為必填')
    if (!popupTitle) return badRequest('Popup 標題為必填')
    if (!popupBody) return badRequest('Popup 內容為必填')

    let imageRef = existing.imageUrl
    const file = form.get('file')
    const newUrl = String(form.get('imageUrl') ?? '').trim()
    if ((file instanceof File && file.size > 0) || (newUrl && newUrl !== existing.imageUrl)) {
      const extracted = await extractImageFromForm(form, 'announcements')
      if (typeof extracted !== 'string') return badRequest(extracted.error)
      imageRef = extracted
      if (existing.imageUrl && imageRef !== existing.imageUrl) await deleteMedia(existing.imageUrl)
    }

    if (!imageRef) return badRequest('請上傳 Popup 圖片或填寫圖片網址')

    const [updated] = await db
      .update(announcements)
      .set({
        text,
        popupTitle,
        popupBody,
        imageUrl: imageRef,
        sortOrder: Number(form.get('sortOrder') ?? 0) || 0,
        isActive: String(form.get('isActive')) !== 'false',
        updatedAt: new Date(),
      })
      .where(eq(announcements.id, params.id))
      .returning()

    return ok({ ...updated, imageUrl: await resolveMediaUrl(imageRef) })
  } catch (error) {
    return serverError(error)
  }
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const [deleted] = await db
      .delete(announcements)
      .where(eq(announcements.id, params.id))
      .returning()
    if (!deleted) return notFound('找不到此公開聲明')

    if (deleted.imageUrl) await deleteMedia(deleted.imageUrl)
    return ok({ id: params.id })
  } catch (error) {
    return serverError(error)
  }
}
