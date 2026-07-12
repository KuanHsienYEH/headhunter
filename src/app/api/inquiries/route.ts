import { NextRequest } from 'next/server'
import { desc } from 'drizzle-orm'
import { db } from '@/db'
import { inquiries } from '@/db/schema'
import { inquirySchema } from '@/lib/validations'
import { notifyNewInquiry, confirmInquiry } from '@/lib/mail'
import { ok, created, badRequest, serverError, requireAdmin } from '@/lib/api'
import { clientIp, isRateLimited, tooManyRequests } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    // 頻率限制:每 IP 10 分鐘最多 5 次
    if (isRateLimited(`inquiry:${clientIp(req)}`, 5, 10 * 60_000)) {
      return tooManyRequests('送出過於頻繁，請 10 分鐘後再試')
    }

    const body   = await req.json()

    // 蜜罐欄位:機器人填了就假裝成功,不落資料
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return created({ id: 'ok' })
    }

    const parsed = inquirySchema.safeParse(body)
    if (!parsed.success) return badRequest(parsed.error.issues[0].message)

    const [inquiry] = await db
      .insert(inquiries)
      .values(parsed.data)
      .returning()

    void notifyNewInquiry({
      id:          inquiry.id,
      company:     inquiry.company,
      contactName: inquiry.contactName,
      position:    inquiry.position,
      email:       inquiry.email,
    })
    void confirmInquiry(inquiry.email, inquiry.company)

    return created({ id: inquiry.id })
  } catch (err) {
    return serverError(err)
  }
}

export async function GET() {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const rows = await db
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt))
    return ok(rows)
  } catch (err) {
    return serverError(err)
  }
}
