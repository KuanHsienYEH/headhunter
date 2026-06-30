import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { inquiries } from '@/db/schema'
import { inquiryStatusSchema } from '@/lib/validations'
import { ok, badRequest, notFound, serverError, requireAdmin } from '@/lib/api'

type Params = { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const [inquiry] = await db
      .select()
      .from(inquiries)
      .where(eq(inquiries.id, params.id))
      .limit(1)

    if (!inquiry) return notFound('找不到此委託')
    return ok(inquiry)
  } catch (err) {
    return serverError(err)
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const body   = await req.json()
    const parsed = inquiryStatusSchema.safeParse(body)
    if (!parsed.success) return badRequest(parsed.error.issues[0].message)

    const [updated] = await db
      .update(inquiries)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(inquiries.id, params.id))
      .returning()

    if (!updated) return notFound('找不到此委託')
    return ok(updated)
  } catch (err) {
    return serverError(err)
  }
}
