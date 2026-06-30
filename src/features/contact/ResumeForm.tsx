'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createResume } from '@/api/resumes'
import Field, { fieldInputClass } from '@/components/ui/Field'

const copy = {
  zh: {
    name: '姓名', email: 'Email', currentTitle: '目前職銜', direction: '期望方向',
    directionPlaceholder: '例：產品管理、後端工程',
    file: '履歷檔案（PDF，5MB 以內）',
    consent: '我同意提供之個人資料供本服務媒合使用，並了解資料將以加密方式儲存，僅顧問本人閱覽。',
    consentRequired: '請同意隱私聲明',
    submit: '送出履歷', submitting: '上傳中…',
    successTitle: '已收到您的履歷', successBody: '顧問將在 2 個工作日內與您聯繫。您的資料以加密方式儲存，僅顧問本人閱覽。',
    fallbackError: '送出失敗，請稍後再試',
  },
  en: {
    name: 'Name', email: 'Email', currentTitle: 'Current title', direction: 'Desired direction',
    directionPlaceholder: 'e.g. Product Management, Backend Engineering',
    file: 'Resume (PDF, max 5MB)',
    consent: 'I consent to my personal data being used for placement purposes, stored encrypted, and viewed only by the consultant.',
    consentRequired: 'Please accept the privacy notice',
    submit: 'Submit resume', submitting: 'Uploading…',
    successTitle: 'Resume received', successBody: 'The consultant will reach out within 2 business days. Your data is encrypted and visible only to the consultant.',
    fallbackError: 'Submission failed, please try again later',
  },
} as const

export default function ResumeForm({ lang }: { lang: 'zh' | 'en' }) {
  const t = copy[lang]
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState('')
  const mutation = useMutation({ mutationFn: createResume })

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!consent) {
      setConsentError(t.consentRequired)
      return
    }
    setConsentError('')
    const formEl = e.currentTarget
    const form = new FormData(formEl)
    const file = form.get('file') as File
    mutation.mutate(
      {
        name:         String(form.get('name')),
        email:        String(form.get('email')),
        currentTitle: (form.get('currentTitle') as string) || undefined,
        direction:    (form.get('direction') as string) || undefined,
        file,
      },
      {
        onSuccess: () => {
          formEl.reset()
          setConsent(false)
        },
      },
    )
  }

  if (mutation.isSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
        <p className="text-emerald-800 font-medium mb-1">{t.successTitle}</p>
        <p className="text-sm text-emerald-700">{t.successBody}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={t.name} required>
          <input name="name" required className={fieldInputClass} />
        </Field>
        <Field label={t.email} required>
          <input name="email" type="email" required className={fieldInputClass} />
        </Field>
        <Field label={t.currentTitle}>
          <input name="currentTitle" className={fieldInputClass} />
        </Field>
        <Field label={t.direction}>
          <input name="direction" placeholder={t.directionPlaceholder} className={fieldInputClass} />
        </Field>
      </div>
      <Field label={t.file} required>
        <input
          name="file"
          type="file"
          accept="application/pdf"
          required
          className={`${fieldInputClass} file:mr-3 file:border-0 file:bg-gold-light file:text-amber-800 file:rounded file:px-3 file:py-1.5 file:text-sm`}
        />
      </Field>
      <label className="flex items-start gap-2 text-sm text-slate">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
        {t.consent}
      </label>
      {(consentError || mutation.isError) && (
        <p className="text-sm text-red-600">
          {consentError || (mutation.error instanceof Error ? mutation.error.message : t.fallbackError)}
        </p>
      )}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-medium hover:bg-gold-hover transition-colors text-sm disabled:opacity-50"
      >
        {mutation.isPending ? t.submitting : t.submit}
      </button>
    </form>
  )
}
