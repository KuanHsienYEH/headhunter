'use client'

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Announcement } from '@/db/schema'
import RichTextEditor from '@/components/ui/RichTextEditor'
import {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
  updateAnnouncement,
  type AnnouncementFormInput,
} from '@/api/announcements'

const statement = '【公開聲明】 不法人士冒用本公司名義進行求職詐騙，請慎防受騙'
const empty: AnnouncementFormInput = {
  text: statement,
  popupTitle: '【公開聲明】',
  popupBody: '不法人士冒用本公司名義進行求職詐騙，請慎防受騙。',
  imageUrl: '',
  file: null,
  sortOrder: 0,
  isActive: true,
}

const inputClass = 'w-full rounded-lg border border-border-strong bg-white px-3 py-2 text-sm text-navy placeholder:text-slate/40 focus:outline-none focus:ring-1 focus:ring-gold/40'
const labelClass = 'mb-1 block text-xs text-slate'

function AnnouncementForm({
  initial,
  currentImage,
  saving,
  error,
  onSave,
  onCancel,
}: {
  initial: AnnouncementFormInput
  currentImage?: string | null
  saving: boolean
  error: unknown
  onSave: (input: AnnouncementFormInput) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState(initial)
  const [preview, setPreview] = useState<string | null>(null)
  const set = <K extends keyof AnnouncementFormInput>(key: K, value: AnnouncementFormInput[K]) => {
    setForm(current => ({ ...current, [key]: value }))
  }

  function pickFile(file: File | null) {
    if (preview) URL.revokeObjectURL(preview)
    set('file', file)
    setPreview(file ? URL.createObjectURL(file) : null)
  }

  const shownImage = preview ?? (form.imageUrl?.startsWith('http') ? form.imageUrl : null) ?? currentImage

  return (
    <form
      onSubmit={event => { event.preventDefault(); onSave(form) }}
      className="flex flex-col gap-4 rounded-xl border border-border-strong bg-white p-5"
    >
      <div>
        <label className={labelClass}>跑馬燈文字 *</label>
        <input
          value={form.text}
          onChange={event => set('text', event.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Popup 標題 *</label>
        <input
          value={form.popupTitle}
          onChange={event => set('popupTitle', event.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Popup 完整內容 *</label>
        <RichTextEditor
          value={form.popupBody}
          onChange={value => set('popupBody', value)}
          placeholder="可輸入完整防詐說明與聯絡方式"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>
            Popup 圖片{currentImage ? '（不選檔案 = 沿用現有圖片）' : ' *'}
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={event => pickFile(event.target.files?.[0] ?? null)}
            className="block text-sm text-slate file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-gold file:px-4 file:py-2 file:text-sm file:font-medium file:text-navy"
          />
        </div>
        <div>
          <label className={labelClass}>或貼外部圖片網址</label>
          <input
            value={form.imageUrl ?? ''}
            onChange={event => set('imageUrl', event.target.value)}
            className={inputClass}
            placeholder="https://…"
          />
        </div>
        <div>
          <label className={labelClass}>排序（小的優先）</label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={event => set('sortOrder', Number(event.target.value))}
            className={inputClass}
          />
        </div>
        <label className="mt-5 flex items-center gap-2 text-sm text-slate">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={event => set('isActive', event.target.checked)}
            className="h-4 w-4 accent-gold"
          />
          啟用並顯示於全站底部
        </label>
      </div>

      {shownImage && (
        <img src={shownImage} alt="Popup 預覽" className="max-h-56 w-full rounded-lg bg-warm-alt object-contain" />
      )}
      {Boolean(error) && (
        <p className="text-sm text-red-500">{error instanceof Error ? error.message : '儲存失敗'}</p>
      )}
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded-lg bg-gold px-5 py-2 text-sm font-medium text-navy hover:bg-gold-hover disabled:opacity-50">
          {saving ? '儲存中…' : '儲存'}
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-border-strong px-5 py-2 text-sm text-slate hover:text-navy">
          取消
        </button>
      </div>
    </form>
  )
}

export default function AdminAnnouncementsPage() {
  const queryClient = useQueryClient()
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['admin-announcements'],
    queryFn: getAllAnnouncements,
  })
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<Announcement | null>(null)

  const createMutation = useMutation({
    mutationFn: createAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] })
      queryClient.invalidateQueries({ queryKey: ['public-announcements'] })
      setAdding(false)
    },
  })
  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: AnnouncementFormInput }) => updateAnnouncement(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] })
      queryClient.invalidateQueries({ queryKey: ['public-announcements'] })
      setEditing(null)
    },
  })
  const deleteMutation = useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] })
      queryClient.invalidateQueries({ queryKey: ['public-announcements'] })
    },
  })

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-navy">公開聲明管理</h1>
          <p className="mt-1 text-xs text-slate/70">顯示於所有前台頁面的 Footer 上方，點擊文字會開啟完整內容。</p>
        </div>
        {!adding && (
          <button
            type="button"
            onClick={() => { setAdding(true); setEditing(null) }}
            className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-navy hover:bg-gold-hover"
          >
            + 新增公開聲明
          </button>
        )}
      </div>

      {adding && (
        <div className="mb-6">
          <AnnouncementForm
            initial={empty}
            saving={createMutation.isPending}
            error={createMutation.error}
            onSave={input => createMutation.mutate(input)}
            onCancel={() => setAdding(false)}
          />
        </div>
      )}

      {isLoading && <p className="text-sm text-slate">載入中…</p>}

      <div className="flex flex-col gap-3">
        {announcements.map(announcement => (
          <div key={announcement.id}>
            {editing?.id === announcement.id ? (
              <AnnouncementForm
                initial={{
                  text: announcement.text,
                  popupTitle: announcement.popupTitle ?? '',
                  popupBody: announcement.popupBody ?? '',
                  imageUrl: '',
                  file: null,
                  sortOrder: announcement.sortOrder,
                  isActive: announcement.isActive,
                }}
                currentImage={announcement.imageUrl}
                saving={updateMutation.isPending}
                error={updateMutation.error}
                onSave={input => updateMutation.mutate({ id: announcement.id, input })}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <div className="flex items-center gap-4 rounded-xl border border-border-strong bg-white p-4">
                {announcement.imageUrl && (
                  <img src={announcement.imageUrl} alt="" className="h-16 w-20 flex-shrink-0 rounded-lg bg-warm-alt object-cover" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="truncate text-sm font-medium text-navy">{announcement.popupTitle}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${announcement.isActive ? 'bg-emerald-500/20 text-emerald-500' : 'bg-warm-alt text-slate'}`}>
                      {announcement.isActive ? '顯示中' : '已停用'}
                    </span>
                  </div>
                  <p className="truncate text-xs text-slate">{announcement.text}</p>
                  <p className="mt-1 text-xs text-slate/60">排序 {announcement.sortOrder}</p>
                </div>
                <div className="flex flex-shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => { setEditing(announcement); setAdding(false) }}
                    className="rounded-lg border border-border-strong px-3 py-1.5 text-xs text-slate hover:text-navy"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    onClick={() => { if (window.confirm('確定刪除此公開聲明？圖片也會一併刪除。')) deleteMutation.mutate(announcement.id) }}
                    disabled={deleteMutation.isPending}
                    className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                  >
                    刪除
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {!isLoading && announcements.length === 0 && !adding && (
          <div className="rounded-xl border border-dashed border-border-strong py-12 text-center text-sm text-slate/60">
            尚無公開聲明，點擊右上角新增第一則。
          </div>
        )}
      </div>
    </div>
  )
}
