import { NextRequest } from 'next/server'
import { asc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { announcements } from '@/db/schema'
import { extractImageFromForm, resolveMediaUrl } from '@/lib/media-storage'
import { ok, created, badRequest, serverError, requireAdmin } from '@/lib/api'

export const dynamic = 'force-dynamic'

async function withResolvedImage<T extends { imageUrl: string | null }>(rows: T[]): Promise<T[]> {
  return Promise.all(rows.map(async row => ({
    ...row,
    imageUrl: row.imageUrl ? await resolveMediaUrl(row.imageUrl) : null,
  })))
}

export async function GET(req: NextRequest) {
  try {
    const all = req.nextUrl.searchParams.get('all') === 'true'
    const guard = all ? await requireAdmin() : null
    if (guard) return guard

    const rows = await db
      .select()
      .from(announcements)
      .where(all ? undefined : eq(announcements.isActive, true))
      .orderBy(asc(announcements.sortOrder), asc(announcements.createdAt))

    return ok(await withResolvedImage(rows))
  } catch (error) {
    return serverError(error)
  }
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const form = await req.formData()
    const text = String(form.get('text') ?? '').trim()
    const popupTitle = String(form.get('popupTitle') ?? '').trim()
    const popupBody = String(form.get('popupBody') ?? '').trim()

    if (!text) return badRequest('跑馬燈文字為必填')
    if (!popupTitle) return badRequest('Popup 標題為必填')
    if (!popupBody) return badRequest('Popup 內容為必填')

    const imageRef = await extractImageFromForm(form, 'announcements')
    if (typeof imageRef !== 'string') return badRequest(imageRef.error)

    const [announcement] = await db
      .insert(announcements)
      .values({
        text,
        popupTitle,
        popupBody,
        imageUrl: imageRef,
        sortOrder: Number(form.get('sortOrder') ?? 0) || 0,
        isActive: String(form.get('isActive')) !== 'false',
      })
      .returning()

    return created({
      ...announcement,
      imageUrl: announcement.imageUrl ? await resolveMediaUrl(announcement.imageUrl) : null,
    })
  } catch (error) {
    return serverError(error)
  }
}
