'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createInquiry } from '@/api/inquiries'
import Field, { fieldInputClass } from '@/components/ui/Field'
import PrivacyModal from '@/components/ui/PrivacyModal'

const copy = {
  zh: {
    company: '公司名稱', contactName: '聯絡人姓名', email: 'Email', phone: '聯絡電話',
    position: '招募職位', industry: '產業別', budget: '預算範圍', budgetPlaceholder: '例：年薪 150-200 萬',
    message: '需求說明', messagePlaceholder: '請描述職位需求、團隊狀況與期望人選條件',
    submit: '送出委託', submitting: '送出中…',
    successTitle: '已收到您的委託', successBody: '我們通常在 1 個工作日內回覆，感謝您的耐心等候。',
    fallbackError: '送出失敗，請稍後再試',
  },
  en: {
    company: 'Company name', contactName: 'Contact name', email: 'Email', phone: 'Phone',
    position: 'Role to fill', industry: 'Industry', budget: 'Budget range', budgetPlaceholder: 'e.g. $150k-200k annual',
    message: 'Tell us about the role', messagePlaceholder: 'Describe the role, team, and ideal candidate profile',
    submit: 'Submit request', submitting: 'Submitting…',
    successTitle: 'Request received', successBody: 'We typically respond within 1 business day. Thank you for your patience.',
    fallbackError: 'Submission failed, please try again later',
  },
} as const

export default function InquiryForm({ lang }: { lang: 'zh' | 'en' }) {
  const t = copy[lang]
  const mutation = useMutation({ mutationFn: createInquiry })
  const [pendingData, setPendingData] = useState<Parameters<typeof createInquiry>[0] | null>(null)
  const [showPrivacy, setShowPrivacy] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formEl = e.currentTarget
    const form = new FormData(formEl)
    const data = {
      company:     String(form.get('company')),
      contactName: String(form.get('contactName')),
      email:       String(form.get('email')),
      phone:       (form.get('phone') as string) || undefined,
      position:    String(form.get('position')),
      industry:    (form.get('industry') as string) || undefined,
      budget:      (form.get('budget') as string) || undefined,
      message:     String(form.get('message')),
      website:     (form.get('website') as string) || undefined,
    }
    setPendingData(data)
    setShowPrivacy(true)
  }

  function handlePrivacyConfirm() {
    if (!pendingData) return
    setShowPrivacy(false)
    mutation.mutate(pendingData, {
      onSuccess: () => setPendingData(null),
    })
  }

  function handlePrivacyCancel() {
    setShowPrivacy(false)
    setPendingData(null)
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
      {showPrivacy && (
        <PrivacyModal lang={lang} onConfirm={handlePrivacyConfirm} onCancel={handlePrivacyCancel} />
      )}
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {/* 蜜罐欄位 — 視覺隱藏,一般使用者不會填;機器人填了後端會靜默丟棄 */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <label>
            請勿填寫此欄位
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label={t.company} required>
            <input name="company" required className={fieldInputClass} />
          </Field>
          <Field label={t.contactName} required>
            <input name="contactName" required className={fieldInputClass} />
          </Field>
          <Field label={t.email} required>
            <input name="email" type="email" required className={fieldInputClass} />
          </Field>
          <Field label={t.phone}>
            <input name="phone" className={fieldInputClass} />
          </Field>
          <Field label={t.position} required>
            <input name="position" required className={fieldInputClass} />
          </Field>
          <Field label={t.industry}>
            <input name="industry" className={fieldInputClass} />
          </Field>
          <Field label={t.budget}>
            <input name="budget" placeholder={t.budgetPlaceholder} className={fieldInputClass} />
          </Field>
        </div>
        <Field label={t.message} required>
          <textarea name="message" required minLength={10} rows={5} className={fieldInputClass} placeholder={t.messagePlaceholder} />
        </Field>
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
