'use client'

import { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllAwards, createAward, updateAward, deleteAward } from '@/api/awards'
import type { Award } from '@/db/schema'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-border-strong bg-white text-navy text-sm placeholder:text-slate/40 focus:outline-none focus:ring-1 focus:ring-gold/40'
const labelCls = 'block text-xs text-slate mb-1'

function UploadForm({ onDone }: { onDone: () => void }) {
  const qc = useQueryClient()
  const [title, setTitle] = useState('')
  const [sortOrder, setSortOrder] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const mut = useMutation({
    mutationFn: createAward,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-awards'] }); onDone() },
  })

  function pick(f: File | null) {
    setFile(f)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(f ? URL.createObjectURL(f) : null)
  }

  return (
    <form
      onSubmit={e => { e.preventDefault(); if (file) mut.mutate({ title, sortOrder, file }) }}
      className="flex flex-col gap-4 bg-white border border-border-strong rounded-xl p-5"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>獎項名稱 *</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required className={inputCls} placeholder="例：113年度台北市評鑑優等" />
        </div>
        <div>
          <label className={labelCls}>排序（小的優先）</label>
          <input type="number" value={sortOrder} onChange={e => setSortOrder(Number(e.target.value))} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>獎狀圖片 *（JPG / PNG / WebP，5MB 以內）</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
            onChange={e => pick(e.target.files?.[0] ?? null)}
            className="block text-sm text-slate file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-gold file:text-navy file:text-sm file:font-medium file:cursor-pointer"
          />
        </div>
      </div>
      {preview && <img src={preview} alt="預覽" className="h-40 w-auto object-contain rounded-lg bg-warm-alt self-start" />}
      {mut.isError && <p className="text-sm text-red-400">{mut.error instanceof Error ? mut.error.message : '上傳失敗'}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={mut.isPending || !file} className="px-5 py-2 rounded-lg bg-gold text-navy text-sm font-medium hover:bg-gold-hover transition-colors disabled:opacity-50">
          {mut.isPending ? '上傳中…' : '上傳'}
        </button>
        <button type="button" onClick={onDone} className="px-5 py-2 rounded-lg border border-border-strong text-slate text-sm hover:text-navy transition-colors">
          取消
        </button>
      </div>
    </form>
  )
}

export default function AdminAwardsPage() {
  const qc = useQueryClient()
  const { data: awards = [], isLoading } = useQuery({ queryKey: ['admin-awards'], queryFn: getAllAwards })
  const [adding, setAdding] = useState(false)

  /* 拖拉排序狀態 */
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)

  const toggleMut = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => updateAward(id, { isActive }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-awards'] }),
  })
  const deleteMut = useMutation({
    mutationFn: deleteAward,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-awards'] }),
  })

  /* 依新順序把 sortOrder 正規化為 0..n-1,只更新有變動的 */
  const reorderMut = useMutation({
    mutationFn: async (list: Award[]) => {
      await Promise.all(
        list
          .map((a, i) => (a.sortOrder !== i ? updateAward(a.id, { sortOrder: i }) : null))
          .filter(Boolean),
      )
    },
    onMutate: (list: Award[]) => {
      // 樂觀更新,放開滑鼠立即看到新順序
      qc.setQueryData(['admin-awards'], list.map((a, i) => ({ ...a, sortOrder: i })))
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['admin-awards'] }),
  })

  function handleDrop(target: number) {
    if (dragIndex !== null && dragIndex !== target) {
      const list = [...awards]
      const [moved] = list.splice(dragIndex, 1)
      list.splice(target, 0, moved)
      reorderMut.mutate(list)
    }
    setDragIndex(null)
    setOverIndex(null)
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-navy">獎項管理</h1>
          <p className="text-xs text-slate/70 mt-1">拖拉卡片即可調整前台輪播順序，放開後自動儲存</p>
        </div>
        {!adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="px-4 py-2 rounded-lg bg-gold text-navy text-sm font-medium hover:bg-gold-hover transition-colors"
          >
            + 上傳獎狀
          </button>
        )}
      </div>

      {adding && <div className="mb-6"><UploadForm onDone={() => setAdding(false)} /></div>}

      {isLoading && <p className="text-slate text-sm">載入中…</p>}

      <div className="flex flex-col gap-3">
        {awards.map((a, i) => (
          <div
            key={a.id}
            draggable
            onDragStart={() => setDragIndex(i)}
            onDragOver={e => { e.preventDefault(); setOverIndex(i) }}
            onDragLeave={() => setOverIndex(cur => (cur === i ? null : cur))}
            onDrop={() => handleDrop(i)}
            onDragEnd={() => { setDragIndex(null); setOverIndex(null) }}
            className={`flex items-center gap-4 bg-white border rounded-xl p-4 cursor-grab active:cursor-grabbing transition-all ${
              dragIndex === i ? 'opacity-40 border-border-strong' : overIndex === i && dragIndex !== null ? 'border-gold ring-1 ring-gold/40' : 'border-border-strong'
            }`}
          >
            {/* 拖拉把手 */}
            <svg width="14" height="18" viewBox="0 0 10 16" fill="none" className="flex-shrink-0 text-slate/40" aria-hidden="true">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" /><circle cx="8" cy="2" r="1.5" fill="currentColor" />
              <circle cx="2" cy="8" r="1.5" fill="currentColor" /><circle cx="8" cy="8" r="1.5" fill="currentColor" />
              <circle cx="2" cy="14" r="1.5" fill="currentColor" /><circle cx="8" cy="14" r="1.5" fill="currentColor" />
            </svg>
            <img src={a.imageUrl} alt={a.title} className="w-16 h-20 object-cover rounded-lg flex-shrink-0 bg-warm-alt" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-medium text-navy">{a.title}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${a.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-warm-alt text-slate'}`}>
                  {a.isActive ? '顯示中' : '隱藏'}
                </span>
              </div>
              <p className="text-xs text-slate/70">排序 {a.sortOrder}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => toggleMut.mutate({ id: a.id, isActive: !a.isActive })}
                disabled={toggleMut.isPending}
                className="text-xs px-3 py-1.5 rounded-lg border border-border-strong text-slate hover:text-navy transition-colors disabled:opacity-50"
              >
                {a.isActive ? '隱藏' : '顯示'}
              </button>
              <button
                type="button"
                onClick={() => { if (window.confirm('確定刪除此獎狀？圖片檔案將一併刪除。')) deleteMut.mutate(a.id) }}
                disabled={deleteMut.isPending}
                className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
              >
                刪除
              </button>
            </div>
          </div>
        ))}
        {!isLoading && awards.length === 0 && !adding && (
          <div className="text-center py-12 text-slate/60 text-sm border border-dashed border-border-strong rounded-xl">
            尚無獎狀，點擊右上角上傳第一張
          </div>
        )}
      </div>
    </div>
  )
}
