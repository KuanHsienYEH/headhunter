import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '關於我們',
  description: '深耕台灣人才市場超過十五年，保持精品規模，每一個委託顧問親自全程跟案。',
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy py-16 md:py-20 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
          <circle cx="20%" cy="40%" r="240" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="85%" cy="70%" r="180" stroke="#B8923A" strokeWidth="0.5" fill="none" />
        </svg>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <p className="text-xs tracking-[.12em] uppercase text-gold-muted mb-3">About us</p>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-warm-white">關於我們</h1>
        </div>
      </section>

      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[220px_1fr] gap-12 items-start">
          <div className="w-48 h-48 rounded-full bg-navy-hover flex items-center justify-center mx-auto md:mx-0">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-warm-white/20" aria-hidden="true"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
          </div>
          <div>
            <h2 className="font-display text-2xl font-medium text-navy mb-1">顧問姓名</h2>
            <p className="text-sm text-gold mb-5">資深獵頭顧問 · 私立就業服務機構許可</p>
            <blockquote className="border-l-2 border-gold pl-4 font-display text-lg text-navy italic mb-6 leading-relaxed">
              「我不推薦任何一個我自己不敢掛名的人選。」
            </blockquote>
            <div className="text-sm text-slate leading-relaxed space-y-4 max-w-2xl">
              <p>
                深耕台灣人才市場超過十五年，從早期的電子代工產業到如今的科技與新創生態圈，累積了上千場面談與媒合經驗。我相信獵才不是把履歷丟進職缺欄位，而是真正理解企業的文化與人選的職涯規劃，找到雙方都能長期共贏的位置。
              </p>
              <p>
                保持精品規模，不是因為接不到大案子，而是因為只有這樣才能對每一個委託負責到底 — 從需求釐清、人選搜尋、面談安排到入職追蹤，全程由我本人親自執行，不假手他人，也不外包給初階顧問。
              </p>
              <p>
                近年也持續協助美國公司在台灣建立技術與管理團隊，橋接跨國文化與薪酬落差，讓人選與企業都能在第一次接觸就建立信任。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-alt py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-2xl font-medium text-navy mb-8 text-center">我們的原則</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: '顧問親自跟案', desc: '從第一次接觸到入職追蹤，全程由顧問本人執行，不假手他人。' },
              { title: '只做負責得起的案子', desc: '寧可推薦數量少，也要確保每一個媒合都經得起時間考驗。' },
              { title: '資料保密為先', desc: '人選與企業資料僅顧問本人閱覽，未經同意絕不轉交第三方。' },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-xl border border-border-c p-6">
                <h3 className="font-medium text-navy mb-2">{v.title}</h3>
                <p className="text-sm text-slate leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-2xl font-medium text-warm-white mb-3">想進一步了解我們如何合作？</h2>
          <p className="text-warm-white/55 text-sm mb-8">無論您是在尋找關鍵人才，還是考慮下一步職涯，都歡迎與我聯絡。</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-medium hover:bg-gold-hover transition-colors text-sm">
            與我聯絡
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </>
  )
}
