'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { adminSignOut } from '@/api/auth'

const navItems = [
  { href: '/admin/jobs', label: '職缺' },
  { href: '/admin/resumes', label: '履歷' },
  { href: '/admin/inquiries', label: '委託' },
  { href: '/admin/posts', label: '文章' },
  { href: '/admin/banners', label: '輪播管理' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const signOutMutation = useMutation({ mutationFn: adminSignOut })

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex bg-warm-alt">
      <aside className="w-56 bg-navy flex-shrink-0 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-warm-white/10">
          <span className="font-display text-base font-medium text-warm-white">巨將人力資源後台</span>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                  active ? 'bg-gold/15 text-gold-muted font-medium' : 'text-warm-white/60 hover:text-warm-white hover:bg-warm-white/5'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="px-3 py-4 border-t border-warm-white/10">
          <button
            type="button"
            onClick={() => signOutMutation.mutate()}
            disabled={signOutMutation.isPending}
            className="w-full text-sm px-3 py-2 rounded-lg text-warm-white/60 hover:text-warm-white hover:bg-warm-white/5 transition-colors text-left disabled:opacity-50"
          >
            {signOutMutation.isPending ? '登出中…' : '登出'}
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 px-8 py-8">{children}</main>
    </div>
  )
}
