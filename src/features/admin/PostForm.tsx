'use client'

import { useState } from 'react'
import type { Post } from '@/db/schema'
import type { PostFormInput } from '@/api/posts'
import Field, { fieldInputClass } from '@/components/ui/Field'
import RichTextEditor from '@/components/ui/RichTextEditor'

export default function PostForm({
  defaultValues,
  onSubmit,
  pending,
  error,
  submitLabel,
}: {
  defaultValues?: Partial<Post>
  onSubmit: (input: PostFormInput) => void
  pending: boolean
  error: unknown
  submitLabel: string
}) {
  /* 內文用富文字編輯器(輸出 HTML),其餘欄位維持 FormData */
  const [bodyZh, setBodyZh] = useState(defaultValues?.bodyZh ?? '')
  const [bodyEn, setBodyEn] = useState(defaultValues?.bodyEn ?? '')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    onSubmit({
      titleZh:    String(form.get('titleZh')),
      titleEn:    (form.get('titleEn') as string) || undefined,
      slug:       String(form.get('slug')),
      bodyZh:     bodyZh || undefined,
      bodyEn:     bodyEn || undefined,
      coverImage: (form.get('coverImage') as string) || undefined,
      lang:       form.get('lang') as PostFormInput['lang'],
      status:     form.get('status') as PostFormInput['status'],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="標題（中文）" required>
          <input name="titleZh" required defaultValue={defaultValues?.titleZh} className={fieldInputClass} />
        </Field>
        <Field label="標題（英文）">
          <input name="titleEn" defaultValue={defaultValues?.titleEn ?? ''} className={fieldInputClass} />
        </Field>
        <Field label="Slug（網址代稱）" required>
          <input name="slug" required pattern="[a-z0-9-]+" placeholder="例：taiwan-hiring-trends-2026" defaultValue={defaultValues?.slug} className={fieldInputClass} />
        </Field>
        <Field label="封面圖網址">
          <input name="coverImage" type="url" defaultValue={defaultValues?.coverImage ?? ''} className={fieldInputClass} />
        </Field>
        <Field label="顯示語言" required>
          <select name="lang" defaultValue={defaultValues?.lang ?? 'zh'} className={fieldInputClass}>
            <option value="zh">中文</option>
            <option value="en">英文</option>
            <option value="both">中英皆顯示</option>
          </select>
        </Field>
        <Field label="狀態" required>
          <select name="status" defaultValue={defaultValues?.status ?? 'draft'} className={fieldInputClass}>
            <option value="draft">草稿</option>
            <option value="published">發布</option>
          </select>
        </Field>
      </div>
      <Field label="內文（中文）">
        <RichTextEditor value={bodyZh} onChange={setBodyZh} />
      </Field>
      <Field label="內文（英文）">
        <RichTextEditor value={bodyEn} onChange={setBodyEn} />
      </Field>
      {Boolean(error) && (
        <p className="text-sm text-red-600">{error instanceof Error ? error.message : '操作失敗'}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-medium hover:bg-gold-hover transition-colors text-sm disabled:opacity-50"
      >
        {pending ? '儲存中…' : submitLabel}
      </button>
    </form>
  )
}
