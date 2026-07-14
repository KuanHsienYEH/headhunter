import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { banners } from '@/db/schema'
import { extractImageFromForm, resolveMediaUrl, deleteMedia } from '@/lib/media-storage'
import { ok, badRequest, notFound, serverError, requireAdmin } from '@/lib/api'

type Ctx = { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Ctx) {
  try {
    const [row] = await db.select().from(banners).where(eq(banners.id, params.id)).limit(1)
    if (!row) return notFound()
    return ok({ ...row, imageUrl: await resolveMediaUrl(row.imageUrl) })
  } catch (err) {
    return serverError(err)
  }
}

/* multipart form — file/imageUrl 未提供時保留原圖 */
export async function PUT(req: NextRequest, { params }: Ctx) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const [existing] = await db.select().from(banners).where(eq(banners.id, params.id)).limit(1)
    if (!existing) return notFound()

    const form = await req.formData()
    const title = String(form.get('title') ?? '').trim()
    if (!title) return badRequest('標題為必填')

    // 有新檔案或新網址才換圖,否則沿用原圖
    let imageRef = existing.imageUrl
    const file = form.get('file')
    const newUrl = String(form.get('imageUrl') ?? '').trim()
    if ((file instanceof File && file.size > 0) || (newUrl && newUrl !== existing.imageUrl)) {
      const extracted = await extractImageFromForm(form, 'banners')
      if (typeof extracted !== 'string') return badRequest(extracted.error)
      imageRef = extracted
      if (imageRef !== existing.imageUrl) await deleteMedia(existing.imageUrl)
    }

    const [updated] = await db
      .update(banners)
      .set({
        title,
        subtitle:   String(form.get('subtitle') ?? '') || null,
        buttonText: String(form.get('buttonText') ?? '') || null,
        buttonLink: String(form.get('buttonLink') ?? '') || null,
        imageUrl:   imageRef,
        sortOrder:  Number(form.get('sortOrder') ?? 0) || 0,
        isActive:   String(form.get('isActive')) !== 'false',
        updatedAt:  new Date(),
      })
      .where(eq(banners.id, params.id))
      .returning()

    revalidatePath('/')
    return ok({ ...updated, imageUrl: await resolveMediaUrl(updated.imageUrl) })
  } catch (err) {
    return serverError(err)
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const [deleted] = await db.delete(banners).where(eq(banners.id, params.id)).returning()
    if (!deleted) return notFound()
    await deleteMedia(deleted.imageUrl)
    revalidatePath('/')
    return ok({ id: params.id })
  } catch (err) {
    return serverError(err)
  }
}
