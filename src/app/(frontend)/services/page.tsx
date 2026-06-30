import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '服務項目',
  description: '台灣本地獵才、跨台美人才媒合、求職者保密媒合 — 三種服務，共同的承諾：顧問親自全程執行。',
}

const services = [
  {
    id: 'local',
    icon: '🏢',
    color: 'bg-blue-50',
    title: '台灣本地獵才',
    tagline: 'Local executive search',
    desc: '協助台灣企業尋找中高階主管，從職位需求釐清、人才市場盤點、人選搜尋與面談安排，到最終入職追蹤，全程由顧問親自執行。',
    points: [
      '深入了解企業文化與團隊組成，確保人選適配度',
      '中高階管理職、技術主管、業務主管為主要服務範圍',
      '提供市場薪資與職位定位諮詢',
    ],
  },
  {
    id: 'crossborder',
    icon: '🌏',
    color: 'bg-amber-50',
    title: '跨台美人才媒合',
    tagline: 'US–Taiwan cross-border hiring',
    featured: true,
    desc: '協助美國公司在台灣建立技術與管理團隊，橋接文化差異與薪酬落差，讓雙方在第一次接觸就建立互信基礎。',
    points: [
      '熟悉台美兩地薪酬結構與勞動法規差異',
      '協助遠端團隊與在地團隊的溝通與文化適應',
      '可全程以中英雙語進行面談與文件溝通',
    ],
  },
  {
    id: 'jobseeker',
    icon: '🔒',
    color: 'bg-emerald-50',
    title: '求職者保密媒合',
    tagline: 'Confidential candidate matching',
    desc: '為在職的高階求職者提供保密的職涯媒合服務，資料僅顧問本人閱覽，未經同意絕不轉交第三方或現職公司。',
    points: [
      '一對一職涯諮詢，協助釐清下一步方向',
      '資料加密儲存，嚴格保密流程',
      '不主動曝光履歷，僅在雙方同意後才進行引薦',
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy py-16 md:py-20 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
          <circle cx="80%" cy="30%" r="240" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="15%" cy="80%" r="180" stroke="#B8923A" strokeWidth="0.5" fill="none" />
        </svg>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <p className="text-xs tracking-[.12em] uppercase text-gold-muted mb-3">Our services</p>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-warm-white mb-3">服務項目</h1>
          <p className="text-warm-white/60 text-sm max-w-md">三種服務，共同的承諾：顧問親自全程執行，不假手他人。</p>
        </div>
      </section>

      <section className="py-20 max-w-6xl mx-auto px-6 flex flex-col gap-6">
        {services.map((s) => (
          <div
            key={s.id}
            id={s.id}
            className={`bg-white rounded-xl border p-8 scroll-mt-24 grid md:grid-cols-[80px_1fr] gap-6 ${s.featured ? 'border-gold' : 'border-border-c'}`}
          >
            <div className={`w-16 h-16 rounded-lg ${s.color} flex items-center justify-center text-3xl`}>
              {s.icon}
            </div>
            <div>
              {s.featured && (
                <span className="inline-block text-[10px] font-medium bg-gold-light text-amber-800 px-2 py-0.5 rounded mb-2">跨國</span>
              )}
              <p className="text-xs tracking-[.08em] uppercase text-gold mb-1">{s.tagline}</p>
              <h2 className="font-display text-xl font-medium text-navy mb-3">{s.title}</h2>
              <p className="text-sm text-slate leading-relaxed mb-4 max-w-2xl">{s.desc}</p>
              <ul className="flex flex-col gap-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-slate">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gold/8 -translate-y-1/2 translate-x-1/4" />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-3xl font-medium text-warm-white mb-3">準備好了嗎？</h2>
          <p className="text-warm-white/55 text-sm mb-9">無論您是在尋找關鍵人才，還是考慮下一步職涯，都歡迎與我聯絡。</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-medium hover:bg-gold-hover transition-colors text-sm">
              委託獵才
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/contact#resume" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-warm-white/35 text-warm-white hover:border-warm-white/70 transition-colors text-sm">
              上傳履歷
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
