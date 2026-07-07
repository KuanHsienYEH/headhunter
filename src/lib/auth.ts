import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { admins } from '@/db/schema'
import { authConfig } from './auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email:    { label: '帳號', type: 'text' },
        password: { label: '密碼', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const account  = credentials.email as string
        const password = credentials.password as string

        // 環境變數預設管理員 — 資料庫尚未設定時也能登入後台
        // 雜湊以 base64 存放,避免 bcrypt 的 "$" 被 dotenv 變數展開吃掉
        const envUser    = process.env.ADMIN_USERNAME
        const envHashB64 = process.env.ADMIN_PASSWORD_HASH_B64
        if (envUser && envHashB64 && account === envUser) {
          const envHash = Buffer.from(envHashB64, 'base64').toString('utf8')
          const valid = await bcrypt.compare(password, envHash)
          return valid ? { id: 'env-admin', email: envUser } : null
        }

        let admin
        try {
          ;[admin] = await db
            .select()
            .from(admins)
            .where(eq(admins.email, account))
            .limit(1)
        } catch {
          return null
        }

        if (!admin) return null

        const valid = await bcrypt.compare(password, admin.passwordHash)
        if (!valid) return null

        return { id: admin.id, email: admin.email }
      },
    }),
  ],
})
