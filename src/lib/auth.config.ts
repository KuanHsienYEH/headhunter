import type { NextAuthConfig } from 'next-auth'

// Edge-safe 共用設定 — middleware 會載入這裡,不能 import 資料庫(pg 需要 Node runtime)
export const authConfig = {
  providers: [],
  pages: {
    signIn: '/admin/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      if (session.user) session.user.id = token.id as string
      return session
    },
  },
} satisfies NextAuthConfig
