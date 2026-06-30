import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { postSchema } from '@/lib/validations'
import { ok, badRequest, notFound, serverError, requireAdmin } from '@/lib/api'

type Params = { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const [post] = await db.select().from(posts).where(eq(posts.id, params.id)).limit(1)
    if (!post) return notFound('找不到此文章')
    return ok(post)
  } catch (err) {
    return serverError(err)
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const body   = await req.json()
    const parsed = postSchema.partial().safeParse(body)
    if (!parsed.success) return badRequest(parsed.error.issues[0].message)

    const updateData: Record<string, unknown> = {
      ...parsed.data,
      updatedAt: new Date(),
    }

    // Auto-set publishedAt when status changes to published
    if (parsed.data.status === 'published') {
      updateData.publishedAt = new Date()
    }

    const [updated] = await db
      .update(posts)
      .set(updateData)
      .where(eq(posts.id, params.id))
      .returning()

    if (!updated) return notFound('找不到此文章')
    return ok(updated)
  } catch (err) {
    return serverError(err)
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const [deleted] = await db
      .delete(posts)
      .where(eq(posts.id, params.id))
      .returning()

    if (!deleted) return notFound('找不到此文章')
    return ok({ id: params.id })
  } catch (err) {
    return serverError(err)
  }
}
