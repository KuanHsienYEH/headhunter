import { signIn, signOut } from 'next-auth/react'

export async function adminSignIn(email: string, password: string) {
  const res = await signIn('credentials', { email, password, redirect: false })
  if (!res || res.error) throw new Error('帳號或密碼錯誤')
  return res
}

export async function adminSignOut() {
  await signOut({ callbackUrl: '/admin/login' })
}
