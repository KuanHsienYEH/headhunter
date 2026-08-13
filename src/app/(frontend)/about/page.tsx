import type { Metadata } from 'next'
import Link from 'next/link'
import AwardsMarquee from '@/components/frontend/AwardsMarquee'
import { asc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { awards } from '@/db/schema'
import { getAwardImageUrl } from '@/lib/award-image-url'


export const metadata: Metadata = {
  title: '關於我們',
  description: '深入了解獵才顧問的專業團隊、服務理念與合法執業資格。',
}

const yearsOfExperience = new Date().getFullYear() - 2012
const stats = [
  { num: `${yearsOfExperience}+`, unit: '年', label: '專業經驗', color: '#0052A5' },
  { num: '5,000+', unit: '人次', label: '成功媒合', color: '#FF6B00' },
  { num: '98%', unit: '', label: '客戶滿意度', color: '#27AE60' },
]

const industries = [
  { label: '製造業',     en: 'Manufacturing', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=450&q=80&fit=crop' },
  { label: '科技電子業', en: 'Tech & Electronics', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=450&q=80&fit=crop' },
  { label: '消費零售業', en: 'Consumer & Retail', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=450&q=80&fit=crop' },
  { label: '服務業',     en: 'Services', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=450&q=80&fit=crop' },
  { label: '餐飲食品業', en: 'Food & Beverage', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=450&q=80&fit=crop' },
  { label: '生技醫療業', en: 'Biotech & Healthcare', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=450&q=80&fit=crop' },
]

const philosophy = [
  { num: '01', title: '以人為本', desc: '我們相信每一位人才都有其獨特價值，透過深入了解個人特質與職涯目標，協助媒合最適合的機會。' },
  { num: '02', title: '專業信賴', desc: '憑藉豐富的產業知識與廣泛的人才網絡，我們以高度專業性與誠信，贏得企業與求職者的長期信任。' },
  { num: '03', title: '高效媒合', desc: '運用系統化的評估流程與精準的配對技術，確保每次媒合都能快速且精準地滿足雙方需求。' },
]


/* PDF 上架、後台獎狀上傳後即時生效,不需重新 build */
export const dynamic = 'force-dynamic'

async function getAwards() {
  try {
    const rows = await db.select().from(awards).where(eq(awards.isActive, true)).orderBy(asc(awards.sortOrder), asc(awards.createdAt))
    return rows.map(a => ({ ...a, imageUrl: getAwardImageUrl(a.id, a.imageUrl, a.updatedAt) }))
  } catch {
    return []
  }
}


export default async function AboutPage() {
  const awardList = await getAwards()
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 340 }}>
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1440&h=560&q=80&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,30,70,0.55)' }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <p className="text-xs tracking-[.12em] uppercase text-[#FF6B00] font-medium mb-3">About Us</p>
          <h1 className="text-4xl font-bold text-white mb-4">關於獵才顧問</h1>
          <p className="text-white/70 text-[15px] max-w-lg">深耕台灣人才市場，以專業、誠信與熱忱，成為企業與人才之間最可靠的橋梁。</p>
        </div>
      </section>

      {/* ── Story + aside stats ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_260px] gap-12 items-start">
            <div>
              <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Our Story</p>
              <h2 className="text-2xl font-bold text-[#333F4F] mb-6">從人才出發，創造雙贏</h2>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-4">
                獵才顧問成立於台灣，以提供企業人力資源顧問服務為核心業務。多年來，我們深耕傳統製造、電子科技、醫療美容及3C服務業等多個產業，建立起豐富的人才資料庫與深厚的產業人脈。
              </p>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-4">
                我們相信，找到對的人才是企業永續成長的關鍵。每一次的媒合，我們都以最嚴謹的態度進行，從需求釐清、人才評估到最終確認，全程提供專業建議與支援。
              </p>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-8">
                同時，我們也重視求職者的職涯發展，提供保密、公正的職涯媒合服務，讓每一位人才都能在最適合的舞台上發光發熱。
              </p>
              <div className="border-t border-[#E0E4EA] pt-6">
                <p className="text-xs font-bold text-[#6B7A8D] uppercase tracking-widest mb-4">服務產業</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {industries.map(ind => (
                    <div
                      key={ind.label}
                      tabIndex={0}
                      className="group relative overflow-hidden rounded-xl aspect-video bg-[#E8EEF6] shadow-sm ring-1 ring-[#E0E4EA] outline-none transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-[#FF6B00] focus-visible:-translate-y-1 focus-visible:shadow-xl focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                    >
                      <img
                        src={ind.img}
                        alt={ind.label}
                        className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.05] transition-transform duration-500 group-hover:scale-110 group-focus-visible:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00224D]/75 via-[#00224D]/10 to-transparent transition-opacity duration-300 group-hover:from-[#0052A5]/80 group-hover:via-[#0052A5]/20" />
                      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[#FF6B00] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                      <div className="absolute inset-0 flex flex-col justify-end p-3">
                        <span className="text-white text-[13px] font-bold drop-shadow-md transition-transform duration-300 group-hover:-translate-y-0.5">
                          {ind.label}
                        </span>
                        <span className="text-white/85 text-[10px] tracking-wide max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:max-h-6 group-hover:opacity-100 group-focus-visible:max-h-6 group-focus-visible:opacity-100">
                          {ind.en}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-[#F5F7FA] rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>
                    {s.num}<span className="text-lg font-medium ml-0.5">{s.unit}</span>
                  </div>
                  <div className="text-[12px] text-[#6B7A8D]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy 3 cards ── */}
      <section className="py-16" style={{ background: '#F5F7FA' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Our Philosophy</p>
            <h2 className="text-2xl font-bold text-[#333F4F]">我們的服務理念</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {philosophy.map((p) => (
              <div key={p.num} className="bg-white rounded-xl border-t-[3px] border border-[#E0E4EA] p-6 hover:shadow-card transition-shadow" style={{ borderTopColor: '#0052A5' }}>
                <div className="text-3xl font-bold mb-4" style={{ color: '#0052A5', opacity: 0.25 }}>{p.num}</div>
                <h3 className="text-[16px] font-bold text-[#333F4F] mb-3">{p.title}</h3>
                <p className="text-[13px] text-[#6B7A8D] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── Award Carousel ──*/}
      <section className="bg-white border-t border-border-c">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-dark mb-2">評鑑與獎項</h2>
          <p className="text-[13px] text-muted mb-6">本公司歷年參加主管機關評鑑之成績與獲獎紀錄，點擊獎狀可放大檢視。</p>
          {awardList.length > 0 ? (
            <AwardsMarquee awards={awardList} lang="zh" />
          ) : (
            <p className="text-[13px] text-muted/70 border border-dashed border-border-strong rounded-xl py-10 text-center">獎狀圖檔準備中</p>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#0052A5' }} className="py-14">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">立即開始合作</h2>
            <p className="text-white/65 text-[14px]">讓我們的專業顧問團隊為您量身打造最佳的人才解決方案。</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-[14px] flex-shrink-0"
            style={{ background: '#FF6B00' }}
          >
            立即聯絡
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>
    </>
  )
}
