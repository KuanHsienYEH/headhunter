'use client'

import { useState, useEffect } from 'react'

const copy = {
  zh: {
    trigger: '求職安全諮詢專線',
    title: '求職安全諮詢專線',
    heading: '求職廣告請多加留意，避免落入求職陷阱',
    intro: '近期求職詐騙手法層出不窮，提醒求職者在應徵工作時務必提高警覺。',
    warnTitle: '若發現徵才廣告有以下情況，請特別小心：',
    warn1: '徵才廣告連續刊登數月、內容資訊不清楚，僅留下聯絡人手機號碼，未提供完整公司名稱、地址或正式聯絡方式；要求求職者先繳交宣傳照、訓練費、保證金、材料費等不合理費用；或標榜明顯不合常理的高薪待遇、輕鬆工作、高額獎金等，都可能涉及不實徵才或詐騙風險。',
    warn2: '求職過程中，合法公司不應要求求職者先付款，也不應以任何理由要求提供過多個人資料、銀行帳戶、身分證件影本或金融帳戶資訊。若對職缺內容、公司身份或面試流程有疑慮，建議先查證公司資訊，並避免私下轉帳或交付任何費用。',
    hotlineTitle: '如遇疑似不實徵才廣告、求職陷阱或詐騙情形，可撥打以下專線諮詢或檢舉：',
    hotlines: [
      '165 反詐騙諮詢專線',
      '臺北市勞動局：0800-085151',
      '臺北市民服務專線：1999 轉 7038',
      '不實徵才廣告或求職防騙諮詢可洽各地勞工局協助',
    ],
    closing: '求職應該是找到更好的機會，而不是承擔不必要的風險。請大家在應徵前多查證、多確認，保護自己的權益與個人資料安全。',
    close: '關閉',
  },
  en: {
    trigger: 'Job Search Safety Hotline',
    title: 'Job Search Safety Hotline',
    heading: 'Read job ads carefully and avoid employment scams',
    intro: 'Job scams are on the rise. Please stay alert when applying for any position.',
    warnTitle: 'Be especially careful when a job ad shows any of the following:',
    warn1: 'Ads that run for months with vague content, list only a mobile number without a full company name, address, or official contact; ask applicants to pay unreasonable fees (photos, training fees, deposits, materials); or promise unusually high pay, easy work, or large bonuses — all of these may involve false advertising or fraud.',
    warn2: 'A legitimate employer never asks job seekers to pay first, nor to hand over excessive personal data, bank accounts, ID copies, or financial account details. If anything about the role, the company, or the interview process feels off, verify the company first and never transfer money or pay any fee.',
    hotlineTitle: 'If you encounter a suspicious job ad, employment trap, or scam, call:',
    hotlines: [
      '165 Anti-Fraud Hotline',
      'Taipei City Labor Bureau: 0800-085151',
      'Taipei Citizen Hotline: 1999 ext. 7038',
      'Or contact your local labor bureau for assistance',
    ],
    closing: 'A job search should lead to better opportunities, not unnecessary risks. Verify before you apply, and protect your rights and personal data.',
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
              <p className="text-[13px] text-muted leading-relaxed">{t.intro}</p>
              <p className="text-[13px] font-semibold text-dark">{t.warnTitle}</p>
              <p className="text-[13px] text-muted leading-relaxed">{t.warn1}</p>
              <p className="text-[13px] text-muted leading-relaxed">{t.warn2}</p>
              <div className="bg-brand-light rounded-xl p-4 space-y-2">
                <p className="text-[13px] font-semibold text-dark">{t.hotlineTitle}</p>
                <ul className="space-y-1.5">
                  {t.hotlines.map(h => (
                    <li key={h} className="flex items-start gap-2 text-[13px] text-dark">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand mt-0.5 flex-shrink-0" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-[13px] text-muted leading-relaxed">{t.closing}</p>
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
