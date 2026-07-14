'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listAdmins, createAdmin, updateAdmin, deleteAdmin, type AdminUser } from '@/api/admins'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-border-strong bg-white text-navy text-sm placeholder:text-slate/40 focus:outline-none focus:ring-1 focus:ring-gold/40'
const labelCls = 'block text-xs text-slate mb-1'

function CreateForm({ onDone }: { onDone: () => void }) {
  const qc = useQueryClient()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const mut = useMutation({
    mutationFn: createAdmin,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-users'] }); onDone() },
  })

  return (
    <form
      onSubmit={e => { e.preventDefault(); mut.mutate({ account, password }) }}
      className="flex flex-col gap-4 bg-white border border-border-strong rounded-xl p-5"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>帳號 *(至少 3 個字元)</label>
          <input value={account} onChange={e => setAccount(e.target.value)} required minLength={3} className={inputCls} placeholder="例：hr-editor" />
        </div>
        <div>
          <label className={labelCls}>密碼 *(至少 4 個字元)</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={4} className={inputCls} autoComplete="new-password" />
        </div>
      </div>
      {mut.isError && <p className="text-sm text-red-500">{mut.error instanceof Error ? mut.error.message : '建立失敗'}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={mut.isPending} className="px-5 py-2 rounded-lg bg-gold text-navy text-sm font-medium hover:bg-gold-hover transition-colors disabled:opacity-50">
          {mut.isPending ? '建立中…' : '建立使用者'}
        </button>
        <button type="button" onClick={onDone} className="px-5 py-2 rounded-lg border border-border-strong text-slate text-sm hover:text-navy transition-colors">
          取消
        </button>
      </div>
    </form>
  )
}

function EditForm({ user, onDone }: { user: AdminUser; onDone: () => void }) {
  const qc = useQueryClient()
  const [account, setAccount] = useState(user.email)
  const [password, setPassword] = useState('')

  const mut = useMutation({
    mutationFn: () => updateAdmin(user.id, { account, password: password || undefined }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-users'] }); onDone() },
  })

  return (
    <form
      onSubmit={e => { e.preventDefault(); mut.mutate() }}
      className="flex flex-col gap-4 bg-white border border-border-strong rounded-xl p-5"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>帳號 *</label>
          <input value={account} onChange={e => setAccount(e.target.value)} required minLength={3} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>新密碼(留空 = 不變更)</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={4} className={inputCls} autoComplete="new-password" placeholder="••••" />
        </div>
      </div>
      {mut.isError && <p className="text-sm text-red-500">{mut.error instanceof Error ? mut.error.message : '更新失敗'}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={mut.isPending} className="px-5 py-2 rounded-lg bg-gold text-navy text-sm font-medium hover:bg-gold-hover transition-colors disabled:opacity-50">
          {mut.isPending ? '儲存中…' : '儲存'}
        </button>
        <button type="button" onClick={onDone} className="px-5 py-2 rounded-lg border border-border-strong text-slate text-sm hover:text-navy transition-colors">
          取消
        </button>
      </div>
    </form>
  )
}

export default function AdminUsersPage() {
  const qc = useQueryClient()
  const { data: users = [], isLoading } = useQuery({ queryKey: ['admin-users'], queryFn: listAdmins })
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const deleteMut = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
  })

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-navy">使用者管理</h1>
          <p className="text-xs text-slate/70 mt-1">管理可登入後台的帳號;無法刪除目前登入中的帳號與最後一位管理員</p>
        </div>
        {!adding && (
          <button
            type="button"
            onClick={() => { setAdding(true); setEditingId(null) }}
            className="px-4 py-2 rounded-lg bg-gold text-navy text-sm font-medium hover:bg-gold-hover transition-colors"
          >
            + 新增使用者
          </button>
        )}
      </div>

      {adding && <div className="mb-6"><CreateForm onDone={() => setAdding(false)} /></div>}

      {isLoading && <p className="text-slate text-sm">載入中…</p>}
      {deleteMut.isError && (
        <p className="text-sm text-red-500 mb-3">{deleteMut.error instanceof Error ? deleteMut.error.message : '刪除失敗'}</p>
      )}

      <div className="flex flex-col gap-3">
        {users.map(u => (
          <div key={u.id}>
            {editingId === u.id ? (
              <EditForm user={u} onDone={() => setEditingId(null)} />
            ) : (
              <div className="flex items-center gap-4 bg-white border border-border-strong rounded-xl p-4">
                <div className="w-9 h-9 rounded-full bg-warm-alt flex items-center justify-center flex-shrink-0">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-navy">{u.email}</div>
                  <p className="text-xs text-slate/70 mt-0.5">建立於 {new Date(u.createdAt).toLocaleDateString('zh-TW')}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => { setEditingId(u.id); setAdding(false) }}
                    className="text-xs px-3 py-1.5 rounded-lg border border-border-strong text-slate hover:text-navy transition-colors"
                  >
                    修改帳號/密碼
                  </button>
                  <button
                    type="button"
                    onClick={() => { if (window.confirm(`確定刪除使用者「${u.email}」?`)) deleteMut.mutate(u.id) }}
                    disabled={deleteMut.isPending}
                    className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                  >
                    刪除
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
