import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '服務項目',
  description: '提供企業獵才、人才解決方案與求職保密媒合三大核心服務。',
}

const steps = [
  { num: '01', title: '需求釐清', desc: '深入了解企業需求、文化與職位要求' },
  { num: '02', title: '人才搜尋', desc: '啟動多元管道積極搜尋合適候選人' },
  { num: '03', title: '評估篩選', desc: '嚴謹評估候選人能力、經歷與適配性' },
  { num: '04', title: '推薦確認', desc: '提供完整人才報告並陪同面試流程' },
]

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 320 }}>
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1440&h=520&q=80&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,30,70,0.58)' }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 md:py-28">
          <p className="text-xs tracking-[.12em] uppercase text-[#FF6B00] font-medium mb-3">Our Services</p>
          <h1 className="text-4xl font-bold text-white mb-4">服務項目</h1>
          <p className="text-white/70 text-[15px] max-w-lg">提供全方位人才解決方案，協助企業在競爭激烈的市場中找到最關鍵的人才。</p>
        </div>
      </section>

      {/* ── Service 1: 台灣本地獵才 ── */}
      <section id="local" className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_300px] gap-12 items-center">
            <div>
              <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Service 01</p>
              <h2 className="text-2xl font-bold text-[#333F4F] mb-4">台灣本地獵才</h2>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-4">
                協助台灣企業尋找中高階主管及關鍵職位人才。我們擁有深厚的產業知識與廣泛的人才網絡，能夠精準識別並吸引市場上最優秀的被動求職者。
              </p>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-6">
                從需求釐清到人選到位，全程顧問親自執行，確保每一個推薦人選都符合企業文化與職位需求，提供最高品質的人才媒合服務。
              </p>
              <ul className="space-y-2 mb-6">
                {['中高階主管職位獵才', '跨產業人才轉介', '保密招募服務', '薪酬市場調查諮詢'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-[#6B7A8D]">
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-white text-[13px]" style={{ background: '#0052A5' }}>
                諮詢此服務
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="bg-[#F5F7FA] rounded-xl p-6 border-l-4 border-[#0052A5]">
              <h3 className="text-[15px] font-bold text-[#333F4F] mb-4">服務特色</h3>
              <div className="space-y-4">
                {[
                  { title: '產業深耕', desc: '深入了解各產業人才生態，精準定位候選人' },
                  { title: '全程跟進', desc: '顧問親自負責，從搜尋到入職全程陪伴' },
                  { title: '保密承諾', desc: '嚴格保護企業與候選人的機密資訊' },
                ].map(f => (
                  <div key={f.title} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#FF6B00' }} />
                    <div>
                      <div className="text-[13px] font-bold text-[#333F4F]">{f.title}</div>
                      <div className="text-[12px] text-[#6B7A8D] mt-0.5">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#E0E4EA]" />

      {/* ── Service 2: 企業人才解決方案 ── */}
      <section id="crossborder" style={{ background: '#F5F7FA' }} className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-[300px_1fr] gap-12 items-center">
            <div className="relative rounded-xl overflow-hidden" style={{ minHeight: 260 }}>
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&q=80&fit=crop"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>
            <div>
              <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Service 02</p>
              <h2 className="text-2xl font-bold text-[#333F4F] mb-4">企業人才解決方案</h2>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-4">
                針對企業整體人才策略提供全方位的顧問服務，包括組織架構分析、人才盤點、薪酬設計及招募流程優化。
              </p>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-6">
                我們不只是招募執行者，更是您的人才策略夥伴，協助企業建立完善的人才管理體系，提升整體組織效能。
              </p>
              <ul className="space-y-2 mb-6">
                {['組織架構優化建議', '薪酬市場基準調查', '人才盤點與規劃', '招募流程設計'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-[#6B7A8D]">
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-white text-[13px]" style={{ background: '#FF6B00' }}>
                了解方案
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#E0E4EA]" />

      {/* ── Service 3: 求職保密媒合 ── */}
      <section id="jobseeker" className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_300px] gap-12 items-center">
            <div>
              <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Service 03</p>
              <h2 className="text-2xl font-bold text-[#333F4F] mb-4">求職保密媒合</h2>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-4">
                專為在職高階主管與專業人才提供保密的職涯媒合服務。我們深知在職期間求職的敏感性，嚴格保護您的個人資訊與職涯規劃。
              </p>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-6">
                透過我們廣泛的企業網絡，主動為您媒合符合職涯目標的機會，讓您在保密安全的環境下探索更好的發展可能。
              </p>
              <ul className="space-y-2 mb-6">
                {['資料嚴格保密處理', '被動求職輔助媒合', '薪酬談判支援', '職涯發展諮詢'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-[#6B7A8D]">
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact#resume" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-white text-[13px]" style={{ background: '#0052A5' }}>
                上傳履歷登記
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="bg-[#E8F0FB] rounded-xl p-6 text-center">
              <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="#0052A5" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <h3 className="text-[15px] font-bold text-[#333F4F] mb-2">保密承諾</h3>
              <p className="text-[13px] text-[#6B7A8D] leading-relaxed mb-4">您的履歷與個人資訊僅由顧問本人閱覽，絕不對外公開或未經授權轉介</p>
              <div className="text-xs px-3 py-1.5 rounded-full inline-block font-medium" style={{ background: '#EAF7F0', color: '#27AE60' }}>
                ✓ 符合個人資料保護法
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process steps ── */}
      <section style={{ background: '#0052A5' }} className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Our Process</p>
            <h2 className="text-2xl font-bold text-white">合作流程</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+20px)] right-[-calc(50%-20px)] h-px" style={{ background: 'rgba(255,255,255,0.2)' }} />
                )}
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-[15px] font-bold" style={{ background: '#FF6B00', color: 'white' }}>
                  {s.num}
                </div>
                <div className="text-[14px] font-bold text-white mb-1">{s.title}</div>
                <div className="text-[12px] text-white/60 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fee note + CTA ── */}
      <section className="py-14 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-[#F5F7FA] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 border-l-4 border-[#FF6B00]">
            <div>
              <h3 className="text-[16px] font-bold text-[#333F4F] mb-2">費用說明</h3>
              <p className="text-[13px] text-[#6B7A8D] leading-relaxed max-w-lg">
                企業端服務費用依職位層級與複雜度評估，通常為成功到職年薪之一定比例。求職者使用服務完全免費。歡迎來電或來信詢問詳細報價。
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-[14px] flex-shrink-0 transition-colors"
              style={{ background: '#FF6B00' }}
            >
              立即諮詢
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
