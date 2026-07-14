import { NextRequest } from 'next/server'
import { asc, eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { db } from '@/db'
import { admins } from '@/db/schema'
import { ok, created, badRequest, serverError, requireAdmin } from '@/lib/api'

export async function GET() {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const rows = await db
      .select({ id: admins.id, email: admins.email, createdAt: admins.createdAt })
      .from(admins)
      .orderBy(asc(admins.createdAt))
    return ok(rows)
  } catch (err) {
    return serverError(err)
  }
}

/* JSON body: { account, password } */
export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const body = await req.json()
    const account  = String(body.account ?? '').trim()
    const password = String(body.password ?? '')

    if (account.length < 3) return badRequest('帳號至少 3 個字元')
    if (/\s/.test(account)) return badRequest('帳號不可包含空白')
    if (password.length < 4) return badRequest('密碼至少 4 個字元')

    const [existing] = await db.select({ id: admins.id }).from(admins).where(eq(admins.email, account)).limit(1)
    if (existing) return badRequest('此帳號已存在')

    const passwordHash = await bcrypt.hash(password, 12)
    const [row] = await db
      .insert(admins)
      .values({ email: account, passwordHash })
      .returning()
    const safe = { id: row.id, email: row.email, createdAt: row.createdAt }
    return created(safe)
  } catch (err) {
    return serverError(err)
  }
}
