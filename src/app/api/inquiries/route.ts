import { NextRequest } from 'next/server'
import { desc } from 'drizzle-orm'
import { db } from '@/db'
import { inquiries } from '@/db/schema'
import { inquirySchema } from '@/lib/validations'
import { notifyNewInquiry, confirmInquiry } from '@/lib/mail'
import { ok, created, badRequest, serverError, requireAdmin } from '@/lib/api'

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json()
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
