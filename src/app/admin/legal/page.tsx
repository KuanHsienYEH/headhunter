'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAllLegalResources, createLegalResource, updateLegalResource, deleteLegalResource,
  type LegalResourceInput,
} from '@/api/legal-resources'
import type { LegalResource } from '@/db/schema'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-border-strong bg-white text-navy text-sm placeholder:text-slate/40 focus:outline-none focus:ring-1 focus:ring-gold/40'
const labelCls = 'block text-xs text-slate mb-1'

const empty: LegalResourceInput = { category: 'doc', titleZh: '', titleEn: '', url: '', file: null, sortOrder: 0, isActive: true }

function ResourceForm({
  initial,
  hasExistingFile,
  onSave,
  onCancel,
  saving,
  error,
}: {
  initial: LegalResourceInput
  hasExistingFile?: boolean
  onSave: (data: LegalResourceInput) => void
  onCancel: () => void
  saving: boolean
  error: unknown
}) {
  const [form, setForm] = useState<LegalResourceInput>(initial)
  const set = (k: keyof LegalResourceInput, v: string | number | boolean | File | null) => setForm(f => ({ ...f, [k]: v }))

  return (
    <form
      onSubmit={e => { e.preventDefault(); onSave(form) }}
      className="flex flex-col gap-4 bg-white border border-border-strong rounded-xl p-5"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>類別 *</label>
          <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
            <option value="doc">公司文件（PDF）</option>
            <option value="gov">政府資訊連結</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>排序（小的優先）</label>
          <input type="number" value={form.sortOrder} onChange={e => set('sortOrder', Number(e.target.value))} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>名稱（中文）*</label>
          <input value={form.titleZh} onChange={e => set('titleZh', e.target.value)} required className={inputCls} placeholder="例：巨將就業服務許可證" />
        </div>
        <div>
          <label className={labelCls}>名稱（英文）</label>
          <input value={form.titleEn ?? ''} onChange={e => set('titleEn', e.target.value)} className={inputCls} placeholder="英文站顯示用（可留空）" />
        </div>
        {form.category === 'gov' ? (
          <div className="sm:col-span-2">
            <label className={labelCls}>連結網址 *</label>
            <input value={form.url ?? ''} onChange={e => set('url', e.target.value)} required className={inputCls} placeholder="https://…" />
          </div>
        ) : (
          <div className="sm:col-span-2">
            <label className={labelCls}>
              PDF 文件{hasExistingFile ? '（不選檔案 = 沿用現有文件）' : '（可先不上傳,前台顯示「文件整理中」）'}
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={e => set('file', e.target.files?.[0] ?? null)}
              className="block text-sm text-slate file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-gold file:text-navy file:text-sm file:font-medium file:cursor-pointer"
            />
          </div>
        )}
      </div>
      {Boolean(error) && <p className="text-sm text-red-500">{error instanceof Error ? error.message : '儲存失敗'}</p>}
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

export default function AdminLegalPage() {
  const qc = useQueryClient()
  const { data: items = [], isLoading } = useQuery({ queryKey: ['admin-legal'], queryFn: getAllLegalResources })

  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<LegalResource | null>(null)

  const createMut = useMutation({
    mutationFn: createLegalResource,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-legal'] }); setAdding(false) },
  })
  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: LegalResourceInput }) => updateLegalResource(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-legal'] }); setEditing(null) },
  })
  const deleteMut = useMutation({
    mutationFn: deleteLegalResource,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-legal'] }),
  })
  const toggleMut = useMutation({
    mutationFn: (r: LegalResource) => updateLegalResource(r.id, {
      category: r.category as 'gov' | 'doc', titleZh: r.titleZh, titleEn: r.titleEn ?? undefined,
      url: r.url ?? undefined, sortOrder: r.sortOrder, isActive: !r.isActive,
    }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-legal'] }),
  })

  const docs = items.filter(i => i.category === 'doc')
  const govs = items.filter(i => i.category === 'gov')

  function renderItem(r: LegalResource) {
    return (
      <div key={r.id}>
        {editing?.id === r.id ? (
          <ResourceForm
            initial={{ category: r.category as 'gov' | 'doc', titleZh: r.titleZh, titleEn: r.titleEn ?? '', url: r.category === 'gov' ? (r.url ?? '') : '', file: null, sortOrder: r.sortOrder, isActive: r.isActive }}
            hasExistingFile={r.category === 'doc' && !!r.url}
            onSave={data => updateMut.mutate({ id: r.id, data })}
            onCancel={() => setEditing(null)}
            saving={updateMut.isPending}
            error={updateMut.error}
          />
        ) : (
          <div className="flex items-center gap-4 bg-white border border-border-strong rounded-xl p-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="text-sm font-medium text-navy">{r.titleZh}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${r.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-warm-alt text-slate'}`}>
                  {r.isActive ? '顯示中' : '隱藏'}
                </span>
                {r.category === 'doc' && !r.url && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-amber-50 text-amber-700">文件未上傳</span>
                )}
              </div>
              <p className="text-xs text-slate/70 truncate">
                {r.category === 'gov' ? r.url : r.url ? '已上傳 PDF' : '—'}　·　排序 {r.sortOrder}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {r.url && (
                <a href={`/api/legal-resources/${r.id}/file`} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-lg border border-border-strong text-slate hover:text-navy transition-colors">
                  查看
                </a>
              )}
              <button type="button" onClick={() => toggleMut.mutate(r)} disabled={toggleMut.isPending} className="text-xs px-3 py-1.5 rounded-lg border border-border-strong text-slate hover:text-navy transition-colors disabled:opacity-50">
                {r.isActive ? '隱藏' : '顯示'}
              </button>
              <button type="button" onClick={() => { setEditing(r); setAdding(false) }} className="text-xs px-3 py-1.5 rounded-lg border border-border-strong text-slate hover:text-navy transition-colors">
                編輯
              </button>
              <button
                type="button"
                onClick={() => { if (window.confirm('確定刪除?已上傳的檔案將一併刪除。')) deleteMut.mutate(r.id) }}
                disabled={deleteMut.isPending}
                className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
              >
                刪除
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-navy">法規管理</h1>
          <p className="text-xs text-slate/70 mt-1">公司文件(PDF)與政府資訊連結,顯示於前台「法規資訊」頁與頁尾法令專區</p>
        </div>
        {!adding && (
          <button
            type="button"
            onClick={() => { setAdding(true); setEditing(null) }}
            className="px-4 py-2 rounded-lg bg-gold text-navy text-sm font-medium hover:bg-gold-hover transition-colors"
          >
            + 新增
          </button>
        )}
      </div>

      {adding && (
        <div className="mb-6">
          <ResourceForm
            initial={empty}
            onSave={data => createMut.mutate(data)}
            onCancel={() => setAdding(false)}
            saving={createMut.isPending}
            error={createMut.error}
          />
        </div>
      )}

      {isLoading && <p className="text-slate text-sm">載入中…</p>}

      {docs.length > 0 && <h2 className="text-sm font-bold text-navy mb-2">公司文件</h2>}
      <div className="flex flex-col gap-3 mb-6">{docs.map(renderItem)}</div>

      {govs.length > 0 && <h2 className="text-sm font-bold text-navy mb-2">政府資訊連結</h2>}
      <div className="flex flex-col gap-3">{govs.map(renderItem)}</div>

      {!isLoading && items.length === 0 && !adding && (
        <div className="text-center py-12 text-slate/60 text-sm border border-dashed border-border-strong rounded-xl">
          尚無資料,點擊右上角新增
        </div>
      )}
    </div>
  )
}
