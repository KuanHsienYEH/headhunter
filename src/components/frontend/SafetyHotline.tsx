'use client'

import { useState, useEffect } from 'react'

const copy = {
  zh: {
    trigger: '求職安全諮詢專線',
    title: '求職安全諮詢專線',
    heading: '求職廣告請多加留意，避免落入求職陷阱',
    p1: '近期求職詐騙手法層出不窮，提醒求職者在應徵工作時務必提高警覺。',
    p2: '求職安全與防詐騙可撥打 165 反詐騙諮詢專線，或臺北市勞動局：0800-085151。若遇求職陷阱或勞資爭議，亦可撥打勞動局求職防騙專線 1999 轉 7038（以臺北市為例）或各地勞工局協助。',
    close: '關閉',
  },
  en: {
    trigger: 'Job Search Safety Hotline',
    title: 'Job Search Safety Hotline',
    heading: 'Watch out for suspicious job ads',
    p1: 'Be especially careful with job ads that run for months, list only a mobile number, ask for unreasonable fees (photos, training fees, deposits), or promise unusually high pay. To report false job advertisements, call the Taipei City Labor Bureau hotline at 1999 ext. 7038.',
    p2: 'For job search safety and anti-fraud advice, call the 165 Anti-Fraud Hotline or the Taipei City Labor Bureau at 0800-085151. If you encounter a job scam or a labor dispute, call 1999 ext. 7038 (Taipei) or contact your local labor bureau.',
    close: 'Close',
  },
} as const

/**
 * 求職安全諮詢專線 — 點擊跳出說明 popup。
 * variant: footer(頁尾連結樣式)/ card(法規頁卡片樣式)
 */
export default function SafetyHotline({ lang, variant = 'footer' }: { lang: 'zh' | 'en'; variant?: 'footer' | 'card' }) {
  const t = copy[lang]
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open])

  return (
    <>
      {variant === 'footer' ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block text-[13px] text-white/55 hover:text-white transition-colors text-left"
        >
          {t.trigger}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="border border-border-c rounded-xl p-5 flex flex-col gap-2 text-left hover:shadow-card hover:border-brand/40 transition-all w-full"
        >
          <span className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </span>
          <span className="text-[15px] font-bold text-dark">{t.trigger}</span>
          <span className="text-[13px] text-muted leading-relaxed">{lang === 'en' ? 'How to spot suspicious job ads and who to call — click for details.' : '如何辨識可疑徵才廣告、遇到求職陷阱該打哪些電話,點擊查看說明。'}</span>
          <span className="text-[13px] font-medium text-brand">{lang === 'en' ? 'View details' : '查看說明'}</span>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="safety-hotline-title"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border-c">
              <h2 id="safety-hotline-title" className="text-[15px] font-bold text-dark">{t.title}</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label={t.close} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-dark-light transition-colors text-muted">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <p className="text-[14px] font-bold text-accent">{t.heading}</p>
              <p className="text-[13px] text-muted leading-relaxed">{t.p1}</p>
              <p className="text-[13px] text-muted leading-relaxed">{t.p2}</p>
            </div>
            <div className="px-6 py-4 border-t border-border-c">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full py-2.5 rounded-full font-bold text-white text-sm bg-brand hover:bg-brand-hover transition-colors"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
