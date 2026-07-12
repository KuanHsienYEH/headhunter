import { redirect } from 'next/navigation'

/* /admin 入口 — 導向職缺管理(未登入時由 middleware 轉登入頁) */
export default function AdminIndexPage() {
  redirect('/admin/jobs')
}
