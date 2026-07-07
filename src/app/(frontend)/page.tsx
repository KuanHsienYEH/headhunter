import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db'
import { jobs, banners } from '@/db/schema'
import { eq, desc, asc } from 'drizzle-orm'
import HeroCarousel, { type HeroSlide } from '@/components/frontend/HeroCarousel'

export const metadata: Metadata = {
  title: '巨將人力資源 | 台灣專業人力資源顧問',
  description: '提供企業人力資源顧問服務，深耕傳統製造、電子科技、醫療美容、3C服務業，協助企業找到關鍵人才。',
}

async function getActiveJobs() {
  try {
    return await db.select().from(jobs).where(eq(jobs.isActive, true)).orderBy(desc(jobs.createdAt)).limit(3)
  } catch {
    return []
  }
}

async function getActiveBanners() {
  try {
    return await db.select().from(banners).where(eq(banners.isActive, true)).orderBy(asc(banners.sortOrder), asc(banners.createdAt))
  } catch {
    return []
  }
}

const stats = [
  { icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0', num: '20+', unit: '年', label: '專業團隊' },
  { icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z', num: '5,000+', unit: '人次', label: '成功媒合' },
  { icon: 'M2.25 21l.75-3.75L15 5.25l3.75 3.75-12 12zM15 5.25L18.75 9', num: '1,000+', unit: '家', label: '服務企業' },
  { icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z', num: '98%', unit: '', label: '滿意度' },
]

const quickNav = [
  { href: '/about',    icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z', title: '關於巨將', desc: '深入了解我們的專業團隊與服務理念', color: '#E8F0FB', stroke: '#0052A5' },
  { href: '/jobs',     icon: 'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z', title: '求職專區', desc: '豐富職缺機會，協助您找到理想職涯', color: '#FFF0E6', stroke: '#FF6B00' },
  { href: '/services', icon: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21', title: '企業專區', desc: '量身打造人才解決方案，提升企業競爭力', color: '#E8F0FB', stroke: '#0052A5' },
  { href: '/contact',  icon: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155', title: '聯絡我們', desc: '專人為您服務，歡迎與我們聯繫', color: '#E8F0FB', stroke: '#0052A5' },
]

export default async function HomePage() {
  const [activeJobs, slides] = await Promise.all([getActiveJobs(), getActiveBanners()])

  /* 設計提案主視覺:第一張淺色(左文右圖)、第二張深色企業版 */
  const designSlides: HeroSlide[] = [
    {
      id: 'main',
      theme: 'light',
      title: '關鍵人才　盡在巨將',
      tagline: '企業掌握關鍵人才的最佳合作夥伴',
      subtitle: '提供企業界人力資源顧問相關服務\n在人才服務方面遍及傳統製造、電子科技、醫療美容、3C服務業\n並獲得企業服務業滿意肯定。',
      imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&h=700&q=80&fit=crop',
      primary:   { text: '尋找人才', href: '/contact' },
      secondary: { text: '了解我們', href: '/about' },
    },
    {
      id: 'employers',
      theme: 'dark',
      eyebrow: 'Executive Search · Taiwan',
      title: '打造高效的人才策略',
      subtitle: '從需求釐清到人選到位，顧問全程親自執行，協助企業快速補齊關鍵戰力。',
      imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&h=700&q=80&fit=crop',
      primary:   { text: '委託獵才', href: '/services' },
      secondary: { text: '聯絡顧問', href: '/contact' },
    },
  ]

  const heroSlides: HeroSlide[] = slides.length > 0
    ? slides.map((b) => ({
        id: b.id,
        theme: 'dark',
        title: b.title,
        subtitle: b.subtitle,
        imageUrl: b.imageUrl,
        primary: b.buttonText && b.buttonLink ? { text: b.buttonText, href: b.buttonLink } : null,
      }))
    : designSlides

  return (
    <>
      {/* ── Hero Carousel ── */}
      <HeroCarousel slides={heroSlides} />

      {/* ── Quick nav 4-card ── */}
      <section className="bg-white border-b border-[#E0E4EA]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E0E4EA]">
            {quickNav.map((item) => (
              <Link key={item.href} href={item.href} className="group p-6 hover:bg-[#F5F7FA] transition-colors">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ background: item.color }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.stroke} strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <div className="text-[15px] font-bold text-[#333F4F] mb-1.5">{item.title}</div>
                <p className="text-[13px] text-[#6B7A8D] leading-relaxed mb-3">{item.desc}</p>
                <span className="text-[13px] font-medium text-[#0052A5] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  了解更多
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ background: '#0052A5' }}>
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white leading-none">
                    {s.num}<span className="text-base font-medium text-white/70 ml-0.5">{s.unit}</span>
                  </div>
                  <div className="text-[12px] text-white/60 mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About split ── */}
      <section className="py-0">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2">
            <div className="relative overflow-hidden" style={{ minHeight: 360 }}>
              <img
                src="https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=720&h=480&q=80&fit=crop"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="bg-[#F5F7FA] px-10 py-14 flex flex-col justify-center">
              <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">About Us</p>
              <h2 className="text-2xl font-bold text-[#333F4F] mb-4">深耕台灣，專注人才</h2>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-4">
                我們是一家深耕台灣人才市場的專業獵頭顧問公司，服務涵蓋傳統製造、電子科技、醫療美容及3C服務業，擁有豐富的產業知識與廣泛的人才網絡。
              </p>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-8">
                憑藉多年來累積的深厚經驗，我們協助企業精準找到符合需求的關鍵人才，同時為求職者開創更好的職涯發展機會。
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-white text-[13px] self-start transition-colors"
                style={{ background: '#0052A5' }}
              >
                認識我們
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services 3-card ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Our Services</p>
            <h2 className="text-2xl font-bold text-[#333F4F]">我們提供的服務</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { href: '/services#local',       title: '台灣本地獵才',   desc: '協助台灣企業尋找中高階主管，從需求釐清到人選到位，全程顧問親自執行。', icon: 'M2.25 21l.75-3.75L15 5.25l3.75 3.75-12 12zM15 5.25L18.75 9' },
              { href: '/services#crossborder', title: '企業人才解決方案', desc: '量身打造企業所需的人才策略，全面提升企業在人才市場的競爭優勢。',       icon: 'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18A48.194 48.194 0 0112 21a48.19 48.19 0 01-6.378-.42 2.19 2.19 0 01-1.872-2.18V14.15m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75a23.978 23.978 0 01-7.577-1.22 2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z', featured: true },
              { href: '/services#jobseeker',   title: '求職保密媒合',   desc: '為高階求職者提供保密的職涯媒合服務，資料僅顧問本人閱覽，符合個資規範。', icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z' },
            ].map((s) => (
              <div
                key={s.title}
                className={`bg-white rounded-xl border-t-[3px] border border-[#E0E4EA] p-6 hover:shadow-card-hover transition-shadow`}
                style={{ borderTopColor: s.featured ? '#FF6B00' : '#0052A5' }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: s.featured ? '#FFF0E6' : '#E8F0FB' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={s.featured ? '#FF6B00' : '#0052A5'} strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-[#333F4F] mb-2">{s.title}</h3>
                <p className="text-[13px] text-[#6B7A8D] leading-relaxed mb-4">{s.desc}</p>
                <Link href={s.href} className="text-[13px] font-medium text-[#0052A5] inline-flex items-center gap-1 hover:gap-2 transition-all">
                  了解更多
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Jobs preview ── */}
      <section className="py-16" style={{ background: '#F5F7FA' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Current Openings</p>
              <h2 className="text-2xl font-bold text-[#333F4F]">目前媒合中的職位</h2>
            </div>
            <Link href="/jobs" className="text-[13px] font-medium text-[#0052A5] inline-flex items-center gap-1 hover:gap-2 transition-all">
              查看全部
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {activeJobs.length > 0 ? (
            <div className="flex flex-col gap-3">
              {activeJobs.map((job) => (
                <div key={job.id} className="bg-white border border-[#E0E4EA] rounded-xl p-5 flex items-center justify-between gap-6 hover:border-[#0052A5]/40 hover:shadow-card transition-all">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#E8F0FB' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0052A5" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18A48.194 48.194 0 0112 21a48.19 48.19 0 01-6.378-.42 2.19 2.19 0 01-1.872-2.18V14.15m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75a23.978 23.978 0 01-7.577-1.22 2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="flex gap-2 mb-1.5 flex-wrap">
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full font-medium" style={{ background: '#E8F0FB', color: '#0052A5' }}>{job.industryZh}</span>
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full font-medium" style={{ background: '#EAF7F0', color: '#27AE60' }}>上架中</span>
                      </div>
                      <div className="text-[15px] font-bold text-[#333F4F] truncate">{job.titleZh}</div>
                      <div className="text-[12px] text-[#6B7A8D] mt-0.5">{job.location}</div>
                    </div>
                  </div>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="text-[13px] font-medium px-4 py-2 rounded-full border border-[#0052A5] text-[#0052A5] hover:bg-[#0052A5] hover:text-white transition-colors flex-shrink-0 flex items-center gap-1.5"
                  >
                    查看詳情
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#E0E4EA] rounded-xl p-10 text-center">
              <p className="text-[#6B7A8D] text-[14px] mb-4">目前暫無公開職缺，歡迎主動聯絡登記</p>
              <Link href="/contact" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#0052A5]">
                聯絡顧問
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA band ── */}
      <section style={{ background: '#0052A5' }} className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">準備好了嗎？</h2>
            <p className="text-white/65 text-[14px]">無論您是在尋找關鍵人才，還是考慮下一步職涯，都歡迎與我們聯絡。</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-[14px] transition-colors"
              style={{ background: '#FF6B00' }}
            >
              尋找人才
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium text-white border border-white/35 hover:border-white/70 transition-colors"
            >
              瀏覽職缺
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
