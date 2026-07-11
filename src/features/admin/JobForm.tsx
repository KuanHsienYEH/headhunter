'use client'

import type { Job } from '@/db/schema'
import type { JobFormInput } from '@/api/jobs'
import Field, { fieldInputClass } from '@/components/ui/Field'

export default function JobForm({
  defaultValues,
  onSubmit,
  pending,
  error,
  submitLabel,
}: {
  defaultValues?: Partial<Job>
  onSubmit: (input: JobFormInput) => void
  pending: boolean
  error: unknown
  submitLabel: string
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    onSubmit({
      titleZh:    String(form.get('titleZh')),
      titleEn:    (form.get('titleEn') as string) || undefined,
      descZh:     String(form.get('descZh')),
      descEn:     (form.get('descEn') as string) || undefined,
      industryZh: String(form.get('industryZh')),
      industryEn: (form.get('industryEn') as string) || undefined,
      location:   (form.get('location') as string) || undefined,
      employmentType: String(form.get('employmentType') || '全職'),
      salary:         String(form.get('salary') || '面議'),
      education:      (form.get('education') as string) || undefined,
      experience:     (form.get('experience') as string) || undefined,
      requirements:   (form.get('requirements') as string) || undefined,
      lang:       form.get('lang') as JobFormInput['lang'],
      isActive:   form.get('isActive') === 'on',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="職位名稱（中文）" required>
          <input name="titleZh" required defaultValue={defaultValues?.titleZh} className={fieldInputClass} />
        </Field>
        <Field label="職位名稱（英文）">
          <input name="titleEn" defaultValue={defaultValues?.titleEn ?? ''} className={fieldInputClass} />
        </Field>
        <Field label="產業別（中文）" required>
          <input name="industryZh" required defaultValue={defaultValues?.industryZh} className={fieldInputClass} />
        </Field>
        <Field label="產業別（英文）">
          <input name="industryEn" defaultValue={defaultValues?.industryEn ?? ''} className={fieldInputClass} />
        </Field>
        <Field label="工作地點">
          <input name="location" defaultValue={defaultValues?.location ?? ''} className={fieldInputClass} placeholder="例：台北內湖" />
        </Field>
        <Field label="顯示語言" required>
          <select name="lang" defaultValue={defaultValues?.lang ?? 'zh'} className={fieldInputClass}>
            <option value="zh">中文</option>
            <option value="en">英文</option>
            <option value="both">中英皆顯示</option>
          </select>
        </Field>
        <Field label="工作性質" required>
          <select name="employmentType" defaultValue={defaultValues?.employmentType ?? '全職'} className={fieldInputClass}>
            <option value="全職">全職</option>
            <option value="兼職">兼職</option>
            <option value="約聘">約聘</option>
          </select>
        </Field>
        <Field label="薪資待遇" required>
          <input name="salary" required defaultValue={defaultValues?.salary ?? '面議'} className={fieldInputClass} placeholder="例：面議 / 年薪 150-200 萬" />
        </Field>
        <Field label="學歷科系">
          <input name="education" defaultValue={defaultValues?.education ?? ''} className={fieldInputClass} placeholder="例：大學以上/生物相關佳" />
        </Field>
        <Field label="工作年資">
          <input name="experience" defaultValue={defaultValues?.experience ?? ''} className={fieldInputClass} placeholder="例：5年以上" />
        </Field>
      </div>
      <Field label="工作內容（中文）" required>
        <textarea name="descZh" required rows={8} defaultValue={defaultValues?.descZh} className={fieldInputClass} placeholder={'1. 負責…\n2. 規劃…（每行一項）'} />
      </Field>
      <Field label="其他條件">
        <textarea name="requirements" rows={8} defaultValue={defaultValues?.requirements ?? ''} className={fieldInputClass} placeholder={'1. 具…經驗佳\n2. 熟悉…（每行一項）'} />
      </Field>
      <Field label="工作內容（英文）">
        <textarea name="descEn" rows={5} defaultValue={defaultValues?.descEn ?? ''} className={fieldInputClass} />
      </Field>
      <label className="flex items-center gap-2 text-sm text-slate">
        <input type="checkbox" name="isActive" defaultChecked={defaultValues?.isActive ?? true} />
        上架（顯示於前台職缺列表）
      </label>
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
