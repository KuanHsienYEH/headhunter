'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllBanners, createBanner, updateBanner, deleteBanner } from '@/api/banners'
import type { Banner } from '@/db/schema'
import type { BannerInput } from '@/lib/validations'

const empty: BannerInput = { title: '', subtitle: '', buttonText: '', buttonLink: '', imageUrl: '', sortOrder: 0, isActive: true }

function BannerForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: BannerInput
  onSave: (data: BannerInput) => void
  onCancel: () => void
  saving: boolean
}) {
  const [form, setForm] = useState<BannerInput>(initial)
  const set = (k: keyof BannerInput, v: string | number | boolean) => setForm(f => ({ ...f, [k]: v }))

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-border-strong bg-white text-navy text-sm placeholder:text-slate/40 focus:outline-none focus:ring-1 focus:ring-gold/40'
  const labelCls = 'block text-xs text-slate mb-1'

  return (
    <form
      onSubmit={e => { e.preventDefault(); onSave(form) }}
      className="flex flex-col gap-4 bg-white border border-border-strong rounded-xl p-5"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>標題 *</label>
          <input value={form.title} onChange={e => set('title', e.target.value)} required className={inputCls} placeholder="主標題文字" />
        </div>
        <div>
          <label className={labelCls}>副標題</label>
          <input value={form.subtitle ?? ''} onChange={e => set('subtitle', e.target.value)} className={inputCls} placeholder="副標題文字（可留空）" />
        </div>
        <div>
          <label className={labelCls}>按鈕文字</label>
          <input value={form.buttonText ?? ''} onChange={e => set('buttonText', e.target.value)} className={inputCls} placeholder="例：了解更多" />
        </div>
        <div>
          <label className={labelCls}>按鈕連結</label>
          <input value={form.buttonLink ?? ''} onChange={e => set('buttonLink', e.target.value)} className={inputCls} placeholder="/contact" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>圖片網址 *</label>
          <input value={form.imageUrl} onChange={e => set('imageUrl', e.target.value)} required className={inputCls} placeholder="https://…" />
        </div>
        <div>
          <label className={labelCls}>排序（小的優先）</label>
          <input type="number" value={form.sortOrder} onChange={e => set('sortOrder', Number(e.target.value))} className={inputCls} />
        </div>
        <div className="flex items-center gap-2 mt-5">
          <input type="checkbox" id="isActive" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} className="w-4 h-4 rounded accent-gold" />
          <label htmlFor="isActive" className="text-sm text-slate">啟用</label>
        </div>
      </div>
      {form.imageUrl && (
        <img src={form.imageUrl} alt="" className="w-full h-32 object-cover rounded-lg opacity-80" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
      )}
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg bg-gold text-navy text-sm font-medium hover:bg-gold-hover transition-colors disabled:opacity-50">
          {saving ? '儲存中…' : '儲存'}
        </button>
        <button type="button" onClick={onCancel} className="px-5 py-2 rounded-lg border border-border-strong text-slate text-sm hover:text-navy transition-colors">
          取消
        </button>
      </div>
    </form>
  )
}

export default function AdminBannersPage() {
  const qc = useQueryClient()
  const { data: banners = [], isLoading } = useQuery({ queryKey: ['admin-banners'], queryFn: getAllBanners })

  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<Banner | null>(null)

  const createMut = useMutation({
    mutationFn: createBanner,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-banners'] }); setAdding(false) },
  })
  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BannerInput> }) => updateBanner(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-banners'] }); setEditing(null) },
  })
  const deleteMut = useMutation({
    mutationFn: deleteBanner,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-banners'] }),
  })

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-navy">輪播管理</h1>
        {!adding && (
          <button
            type="button"
            onClick={() => { setAdding(true); setEditing(null) }}
            className="px-4 py-2 rounded-lg bg-gold text-navy text-sm font-medium hover:bg-gold-hover transition-colors"
          >
            + 新增輪播
          </button>
        )}
      </div>

      {adding && (
        <div className="mb-6">
          <BannerForm
            initial={empty}
            onSave={data => createMut.mutate(data)}
            onCancel={() => setAdding(false)}
            saving={createMut.isPending}
          />
        </div>
      )}

      {isLoading && <p className="text-slate text-sm">載入中…</p>}

      <div className="flex flex-col gap-3">
        {banners.map(b => (
          <div key={b.id}>
            {editing?.id === b.id ? (
              <BannerForm
                initial={{ title: b.title, subtitle: b.subtitle ?? '', buttonText: b.buttonText ?? '', buttonLink: b.buttonLink ?? '', imageUrl: b.imageUrl, sortOrder: b.sortOrder, isActive: b.isActive }}
                onSave={data => updateMut.mutate({ id: b.id, data })}
                onCancel={() => setEditing(null)}
                saving={updateMut.isPending}
              />
            ) : (
              <div className="flex items-center gap-4 bg-white border border-border-strong rounded-xl p-4">
                <img src={b.imageUrl} alt="" className="w-24 h-14 object-cover rounded-lg flex-shrink-0" onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden' }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-navy">{b.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${b.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-warm-alt text-slate'}`}>
                      {b.isActive ? '啟用' : '停用'}
                    </span>
                  </div>
                  {b.subtitle && <p className="text-xs text-slate truncate">{b.subtitle}</p>}
                  {b.buttonText && (
                    <p className="text-xs text-slate/70 mt-0.5">按鈕：{b.buttonText} → {b.buttonLink || '（無連結）'}</p>
                  )}
                  <p className="text-xs text-slate/70 mt-0.5">排序 {b.sortOrder}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => { setEditing(b); setAdding(false) }}
                    className="text-xs px-3 py-1.5 rounded-lg border border-border-strong text-slate hover:text-navy transition-colors"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    onClick={() => { if (window.confirm('確定刪除此輪播？')) deleteMut.mutate(b.id) }}
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
        {!isLoading && banners.length === 0 && !adding && (
          <div className="text-center py-12 text-slate/60 text-sm border border-dashed border-border-strong rounded-xl">
            尚無輪播，點擊右上角新增第一張
          </div>
        )}
      </div>
    </div>
  )
}
