import { NextRequest } from 'next/server'
import { eq, ne } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { db } from '@/db'
import { admins } from '@/db/schema'
import { auth } from '@/lib/auth'
import { ok, badRequest, notFound, serverError, requireAdmin } from '@/lib/api'

type Ctx = { params: { id: string } }

/* JSON body: { account?, password? } — 改帳號、改密碼,或同時改 */
export async function PATCH(req: NextRequest, { params }: Ctx) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const [target] = await db.select().from(admins).where(eq(admins.id, params.id)).limit(1)
    if (!target) return notFound('找不到此使用者')

    const body = await req.json()
    const updates: { email?: string; passwordHash?: string } = {}

    if (body.account !== undefined) {
      const account = String(body.account).trim()
      if (account.length < 3) return badRequest('帳號至少 3 個字元')
      if (/\s/.test(account)) return badRequest('帳號不可包含空白')
      if (account !== target.email) {
        const [dup] = await db.select({ id: admins.id }).from(admins).where(eq(admins.email, account)).limit(1)
        if (dup) return badRequest('此帳號已存在')
        updates.email = account
      }
    }

    if (body.password !== undefined && body.password !== '') {
      const password = String(body.password)
      if (password.length < 4) return badRequest('密碼至少 4 個字元')
      updates.passwordHash = await bcrypt.hash(password, 12)
    }

    if (Object.keys(updates).length === 0) return badRequest('沒有要更新的內容')

    const [updated] = await db
      .update(admins)
      .set(updates)
      .where(eq(admins.id, params.id))
      .returning()
    const safe = { id: updated.id, email: updated.email, createdAt: updated.createdAt }
    return ok(safe)
  } catch (err) {
    return serverError(err)
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    // 不可刪除自己(避免把自己鎖在門外)
    const session = await auth()
    if (session?.user?.id === params.id) return badRequest('無法刪除目前登入中的帳號')

    // 不可刪到一個管理員都不剩
    const others = await db.select({ id: admins.id }).from(admins).where(ne(admins.id, params.id))
    if (others.length === 0) return badRequest('至少需保留一個管理員帳號')

    const [deleted] = await db.delete(admins).where(eq(admins.id, params.id)).returning()
    if (!deleted) return notFound('找不到此使用者')
    return ok({ id: params.id })
  } catch (err) {
    return serverError(err)
  }
}
