'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createResume } from '@/api/resumes'
import Field, { fieldInputClass } from '@/components/ui/Field'
import FileDropzone from '@/components/ui/FileDropzone'
import ResumeConsentModal from './ResumeConsentModal'

const copy = {
  zh: {
    name: '姓名', email: 'Email', currentTitle: '目前職銜', direction: '期望方向',
    directionPlaceholder: '例：產品管理、後端工程',
    file: '履歷檔案',
    submit: '送出履歷', submitting: '上傳中…',
    successTitle: '已收到您的履歷', successBody: '顧問將在 2 個工作日內與您聯繫。您的資料以加密方式儲存，僅顧問本人閱覽。',
    fallbackError: '送出失敗，請稍後再試',
    fileRequired: '請上傳履歷檔案',
    consentPrefix: '本人已詳閱並同意',
    consentLink: '「個資使用同意聲明」',
    consentSuffix: '之內容',
    consentRequired: '請先詳閱並勾選同意「個資使用同意聲明」',
  },
  en: {
    name: 'Name', email: 'Email', currentTitle: 'Current title', direction: 'Desired direction',
    directionPlaceholder: 'e.g. Product Management, Backend Engineering',
    file: 'Resume file',
    submit: 'Submit resume', submitting: 'Uploading…',
    successTitle: 'Resume received', successBody: 'The consultant will reach out within 2 business days. Your data is encrypted and visible only to the consultant.',
    fallbackError: 'Submission failed, please try again later',
    fileRequired: 'Please upload your resume',
    consentPrefix: 'I have read and agree to the',
    consentLink: 'Personal Data Use Consent',
    consentSuffix: '',
    consentRequired: 'Please read and agree to the Personal Data Use Consent before uploading',
  },
} as const

export default function ResumeForm({ lang }: { lang: 'zh' | 'en' }) {
  const t = copy[lang]
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState('')
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const [showConsent, setShowConsent] = useState(false)
  const mutation = useMutation({ mutationFn: createResume })

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!file) { setFileError(t.fileRequired); return }
    setFileError('')
    // 每次上傳都必須勾選個資使用同意,未勾選一律擋下
    if (!consent) { setConsentError(true); return }
    const form = new FormData(e.currentTarget)
    mutation.mutate(
      {
        name:         String(form.get('name')),
        email:        String(form.get('email')),
        currentTitle: (form.get('currentTitle') as string) || undefined,
        direction:    (form.get('direction') as string) || undefined,
        file,
      },
      { onSuccess: () => { setFile(null); setConsent(false) } },
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
    <>
      {showConsent && (
        <ResumeConsentModal
          lang={lang}
          onAgree={() => { setConsent(true); setConsentError(false); setShowConsent(false) }}
          onClose={() => setShowConsent(false)}
        />
      )}
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
          <FileDropzone name="file" lang={lang} onChange={f => { setFile(f); if (f) setFileError('') }} />
          {fileError && <p className="text-[12px] text-red-500 mt-1">{fileError}</p>}
        </Field>

        {/* 個資使用同意 — 必勾才能上傳 */}
        <div>
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={consent}
              onChange={e => { setConsent(e.target.checked); if (e.target.checked) setConsentError(false) }}
              className="mt-0.5 w-4 h-4 rounded accent-brand flex-shrink-0"
            />
            <span className="text-[13px] text-dark leading-snug">
              {t.consentPrefix}
              <button
                type="button"
                onClick={() => setShowConsent(true)}
                className="text-brand underline underline-offset-2 hover:text-brand-hover mx-0.5 font-medium"
              >
                {t.consentLink}
              </button>
              {t.consentSuffix}
            </span>
          </label>
          {consentError && <p className="text-[12px] text-red-500 mt-1.5">{t.consentRequired}</p>}
        </div>

        {mutation.isError && (
          <p className="text-sm text-red-600">
            {mutation.error instanceof Error ? mutation.error.message : t.fallbackError}
          </p>
        )}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-hover transition-colors text-sm disabled:opacity-50"
        >
          {mutation.isPending ? t.submitting : t.submit}
        </button>
      </form>
    </>
  )
}
