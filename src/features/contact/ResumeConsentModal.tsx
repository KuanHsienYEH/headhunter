'use client'

import { useEffect } from 'react'

interface ResumeConsentModalProps {
  lang: 'zh' | 'en'
  /* 按下「我同意」— 由父層把表單的同意勾選框打勾 */
  onAgree: () => void
  onClose: () => void
}

const copy = {
  zh: {
    title: '個資使用同意聲明',
    lead: '上傳履歷前，請您先詳閱「個資使用同意」告知事項：',
    intro:
      '當您填寫履歷或上傳履歷時，即表示您願意以電子文件之方式行使法律所賦予同意之權利，並具有書面同意之效果。為保障您的權益，請詳細閱讀本同意書所有內容，當您在線上點選「我同意」鍵，表示您已經同意巨將人力資源顧問有限公司（以下簡稱本公司）對個資之利用。',
    items: [
      { heading: '資料蒐集之目的', body: '（包括但不限於建立原始求職者資料檔案、提供推薦報告給徵才企業等），獲取應徵職務之始，所提供各項得以直接或間接識別之個人資料。' },
      { heading: '個人資料類別', body: '包含個人基本資料、技術專業背景、工作經歷、工作期望、自傳、通訊資料等。' },
      { heading: '個資利用期間', body: '自投遞履歷日起一年期間。' },
      { heading: '個資利用對象', body: '委託求才之企業及本公司。' },
      { heading: '個資利用地區', body: '台灣及海外地區。' },
      { heading: '個資利用方法', body: '電子郵件、書面、傳真、電話。' },
    ],
    rights:
      '您可以書面或電子郵件方式通知本公司，並針對您的資料請求查詢、閱覽、複製補充、更正、停止蒐集利用、刪除等權利。',
    voluntary:
      '您得以自由選擇是否提供資料與本公司。若您不提供個人資料與本公司，本公司亦將無法提供您求職相關服務，進而可能影響您的就業機會。',
    contact: '如有任何問題，洽本公司申訴專線：(02)2356-9977，聯絡人：張小姐。',
    agree: '我同意',
    close: '關閉',
  },
  en: {
    title: 'Personal Data Use Consent',
    lead: 'Before uploading your resume, please read the following notice on personal data use:',
    intro:
      'By completing or uploading your resume, you agree to exercise your legal right of consent by electronic means, with the same effect as written consent. To protect your rights, please read this statement carefully. By clicking "I agree", you consent to the use of your personal data by Ju Jiang Human Resources Consultant Co., Ltd. (the "Company").',
    items: [
      { heading: 'Purpose of collection', body: 'Including but not limited to building candidate profiles and providing recommendation reports to hiring companies — covering personal data that can directly or indirectly identify you, provided from the start of your application.' },
      { heading: 'Data categories', body: 'Basic personal information, technical and professional background, work experience, job preferences, autobiography, and contact information.' },
      { heading: 'Period of use', body: 'One year from the date your resume is submitted.' },
      { heading: 'Users of data', body: 'Hiring companies that engage our services, and the Company.' },
      { heading: 'Region of use', body: 'Taiwan and overseas.' },
      { heading: 'Methods of use', body: 'Email, written documents, fax, and telephone.' },
    ],
    rights:
      'You may contact the Company in writing or by email to request access, review, copies, supplementation, correction, suspension of collection and use, or deletion of your data.',
    voluntary:
      'Providing your data is voluntary. However, if you choose not to provide it, the Company will be unable to offer job placement services, which may affect your employment opportunities.',
    contact: 'For any questions, please call our service line: (02) 2356-9977, contact: Ms. Chang.',
    agree: 'I agree',
    close: 'Close',
  },
} as const

export default function ResumeConsentModal({ lang, onAgree, onClose }: ResumeConsentModalProps) {
  const t = copy[lang]

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onKeyDown={handleKey}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-consent-title"
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-c">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-light">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h2 id="resume-consent-title" className="text-[15px] font-bold text-dark">{t.title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label={t.close} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-dark-light transition-colors text-muted">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <p className="text-[13px] font-semibold text-dark leading-relaxed">{t.lead}</p>
          <p className="text-[13px] text-muted leading-relaxed">{t.intro}</p>
          <ul className="space-y-2.5">
            {t.items.map(item => (
              <li key={item.heading} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-brand" />
                <p className="text-[13px] leading-relaxed">
                  <span className="font-semibold text-dark">{item.heading}：</span>
                  <span className="text-muted">{item.body}</span>
                </p>
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-muted leading-relaxed">{t.rights}</p>
          <p className="text-[13px] text-muted leading-relaxed">{t.voluntary}</p>
          <p className="text-[13px] text-dark leading-relaxed font-medium">{t.contact}</p>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-border-c flex gap-3">
          <button
            type="button"
            onClick={onAgree}
            className="flex-1 py-2.5 rounded-full font-bold text-white text-sm bg-brand hover:bg-brand-hover transition-colors"
          >
            {t.agree}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-border-c text-muted text-sm hover:bg-dark-light transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  )
}
