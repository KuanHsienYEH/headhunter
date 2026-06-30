import type { Metadata } from 'next'
import { Suspense } from 'react'
import LoginForm from '@/features/admin/LoginForm'

export const metadata: Metadata = {
  title: '登入',
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center">
        <span className="font-display text-xl font-medium text-warm-white mb-1">獵才顧問後台</span>
        <p className="text-sm text-warm-white/50 mb-8">請使用管理員帳號登入</p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
