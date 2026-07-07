'use client'

import { useState, useRef, useEffect } from 'react'

interface PrivacyModalProps {
  lang: 'zh' | 'en'
  onConfirm: () => void
  onCancel: () => void
}

const copy = {
  zh: {
    title: '個人資料使用同意書',
    intro: '依個人資料保護法規定，本公司在取得您的個人資料前，需告知以下事項：',
    items: [
      { heading: '蒐集目的', body: '用於人才媒合、職缺推薦及相關人力資源服務。' },
      { heading: '資料類別', body: '包括姓名、Email、聯絡電話、職務經歷及履歷內容等。' },
      { heading: '利用期間與對象', body: '資料將保存至媒合服務結束後 3 年，僅供本公司顧問使用，不對外提供第三方。' },
      { heading: '資料安全', body: '您的資料以加密方式儲存於安全雲端環境，嚴格限制存取。' },
      { heading: '您的權利', body: '您得隨時行使查詢、閱覽、補充、更正、刪除及停止利用等權利，請來信至 service@jujianghr.com.tw。' },
    ],
    checkbox: '本人已詳閱上述說明，並同意提供個人資料供本公司媒合服務使用。',
    confirm: '同意並繼續',
    cancel: '取消',
    checkRequired: '請勾選同意以繼續',
  },
  en: {
    title: 'Personal Data Consent',
    intro: 'In accordance with personal data protection regulations, please review the following before proceeding:',
    items: [
      { heading: 'Purpose', body: 'Your data will be used for talent matching, job referrals, and related HR services.' },
      { heading: 'Data types', body: 'Name, email, phone, work history, and resume content.' },
      { heading: 'Retention & recipients', body: 'Data is retained for 3 years after service completion and shared only with our consultants.' },
      { heading: 'Security', body: 'All data is encrypted at rest in a secure cloud environment with strict access controls.' },
      { heading: 'Your rights', body: 'You may query, correct, delete, or stop use of your data at any time. Contact us at service@jujianghr.com.tw.' },
    ],
    checkbox: 'I have read the above and consent to my personal data being used for placement services.',
    confirm: 'Agree & continue',
    cancel: 'Cancel',
    checkRequired: 'Please check the box to continue',
  },
} as const

export default function PrivacyModal({ lang, onConfirm, onCancel }: PrivacyModalProps) {
  const t = copy[lang]
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  function handleConfirm() {
    if (!checked) { setError(true); return }
    onConfirm()
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') onCancel()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(3px)' }}
      onKeyDown={handleKey}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden"
        style={{ animation: 'slideUp .25s ease both' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E0E4EA]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#E8F0FB' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0052A5" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h2 id="privacy-title" className="text-[15px] font-bold text-[#333F4F]">{t.title}</h2>
          </div>
          <button type="button" onClick={onCancel} aria-label="關閉" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F7FA] transition-colors text-[#6B7A8D]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <p className="text-[13px] text-[#6B7A8D] leading-relaxed">{t.intro}</p>
          {t.items.map(item => (
            <div key={item.heading} className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#0052A5' }} />
              <div>
                <span className="text-[13px] font-semibold text-[#333F4F]">{item.heading}：</span>
                <span className="text-[13px] text-[#6B7A8D]">{item.body}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-[#E0E4EA] space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={e => { setChecked(e.target.checked); if (e.target.checked) setError(false) }}
              className="mt-0.5 w-4 h-4 rounded accent-[#0052A5]"
            />
            <span className="text-[13px] text-[#333F4F] leading-snug">{t.checkbox}</span>
          </label>
          {error && <p className="text-[12px] text-red-500">{t.checkRequired}</p>}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 py-2.5 rounded-full font-bold text-white text-sm transition-opacity hover:opacity-90"
              style={{ background: '#0052A5' }}
            >
              {t.confirm}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-full border border-[#E0E4EA] text-[#6B7A8D] text-sm hover:bg-[#F5F7FA] transition-colors"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
