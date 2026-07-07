import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '關於我們',
  description: '深入了解獵才顧問的專業團隊、服務理念與合法執業資格。',
}

const stats = [
  { num: '20+', unit: '年', label: '專業經驗', color: '#0052A5' },
  { num: '5,000+', unit: '人次', label: '成功媒合', color: '#FF6B00' },
  { num: '98%', unit: '', label: '客戶滿意度', color: '#27AE60' },
]

const industries = [
  { label: '傳統製造', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&q=80&fit=crop' },
  { label: '電子科技', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&q=80&fit=crop' },
  { label: '醫療美容', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&q=80&fit=crop' },
  { label: '3C服務',   img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&q=80&fit=crop' },
  { label: '金融保險', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&q=80&fit=crop' },
  { label: '零售通路', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&q=80&fit=crop' },
]

const philosophy = [
  { num: '01', title: '以人為本', desc: '我們相信每一位人才都有其獨特價值，透過深入了解個人特質與職涯目標，協助媒合最適合的機會。' },
  { num: '02', title: '專業信賴', desc: '憑藉豐富的產業知識與廣泛的人才網絡，我們以高度專業性與誠信，贏得企業與求職者的長期信任。' },
  { num: '03', title: '高效媒合', desc: '運用系統化的評估流程與精準的配對技術，確保每次媒合都能快速且精準地滿足雙方需求。' },
]

const team = [
  { name: '資深顧問 A', title: '人力資源總監', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&q=80&fit=crop' },
  { name: '資深顧問 B', title: '獵才顧問', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&q=80&fit=crop' },
  { name: '資深顧問 C', title: '人才發展專員', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=300&q=80&fit=crop' },
]

const testimonials = [
  { name: '陳總經理', company: '科技製造業', quote: '獵才顧問團隊非常專業，在短時間內為我們找到了符合需求的高階主管，大幅縮短了招募時間。' },
  { name: '李副總', company: '醫療集團', quote: '感謝獵才顧問的用心服務，不僅幫助我找到理想職位，更在職涯規劃上給予寶貴建議。' },
]

export default function AboutPage() {
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
                <div className="grid grid-cols-3 gap-3">
                  {industries.map(ind => (
                    <div
                      key={ind.label}
                      className="group relative overflow-hidden rounded-xl aspect-video cursor-default"
                      style={{ boxShadow: '0 2px 8px rgba(0,0,0,.12)' }}
                    >
                      <img
                        src={ind.img}
                        alt={ind.label}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[#0052A5]/50 transition-opacity duration-300 group-hover:opacity-0" />
                      <div className="absolute inset-0 flex items-end p-3 transition-all duration-300 group-hover:items-center group-hover:justify-center" style={{ background: 'linear-gradient(to top, rgba(0,30,70,.7) 0%, transparent 60%)' }}>
                        <span className="text-white text-[13px] font-bold drop-shadow transition-all duration-300 group-hover:text-[15px]">{ind.label}</span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(0,82,165,.75)' }}>
                        <span className="text-white text-[15px] font-bold tracking-wide">{ind.label}</span>
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

      {/* ── Team portraits ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Our Team</p>
            <h2 className="text-2xl font-bold text-[#333F4F]">專業顧問團隊</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((m) => (
              <div key={m.name} className="text-center">
                <div className="w-full aspect-video rounded-xl overflow-hidden mb-4">
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-[15px] font-bold text-[#333F4F] mb-1">{m.name}</div>
                <div className="text-[12px] text-[#6B7A8D]">{m.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16" style={{ background: '#F5F7FA' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Testimonials</p>
            <h2 className="text-2xl font-bold text-[#333F4F]">客戶見證</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-xl border border-[#E0E4EA] p-7">
                <svg className="w-8 h-8 mb-4" viewBox="0 0 24 24" fill="#FF6B00" aria-hidden="true" style={{ opacity: 0.2 }}>
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: '#0052A5' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#333F4F]">{t.name}</div>
                    <div className="text-[12px] text-[#6B7A8D]">{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
