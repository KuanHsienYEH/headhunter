import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { asc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { banners } from '@/db/schema'
import { extractImageFromForm, resolveMediaUrl } from '@/lib/media-storage'
import { ok, created, badRequest, serverError, requireAdmin } from '@/lib/api'

async function withResolvedUrls<T extends { imageUrl: string }>(rows: T[]): Promise<T[]> {
  return Promise.all(rows.map(async r => ({ ...r, imageUrl: await resolveMediaUrl(r.imageUrl) })))
}

export async function GET(req: NextRequest) {
  try {
    const all = req.nextUrl.searchParams.get('all') === 'true'
    const guard = all ? await requireAdmin() : null
    if (guard) return guard

    const rows = await db
      .select()
      .from(banners)
      .where(all ? undefined : eq(banners.isActive, true))
      .orderBy(asc(banners.sortOrder), asc(banners.createdAt))
    return ok(await withResolvedUrls(rows))
  } catch (err) {
    return serverError(err)
  }
}

/* multipart form: title(必填)、subtitle、buttonText、buttonLink、sortOrder、file 或 imageUrl */
export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const form = await req.formData()
    const title = String(form.get('title') ?? '').trim()
    if (!title) return badRequest('標題為必填')

    const imageRef = await extractImageFromForm(form, 'banners')
    if (typeof imageRef !== 'string') return badRequest(imageRef.error)

    const [banner] = await db
      .insert(banners)
      .values({
        title,
        subtitle:   String(form.get('subtitle') ?? '') || null,
        buttonText: String(form.get('buttonText') ?? '') || null,
        buttonLink: String(form.get('buttonLink') ?? '') || null,
        imageUrl:   imageRef,
        sortOrder:  Number(form.get('sortOrder') ?? 0) || 0,
        isActive:   String(form.get('isActive')) !== 'false',
      })
      .returning()
    revalidatePath('/')
    return created({ ...banner, imageUrl: await resolveMediaUrl(banner.imageUrl) })
  } catch (err) {
    return serverError(err)
  }
}
