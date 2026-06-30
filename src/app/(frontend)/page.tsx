import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db'
import { jobs } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export const metadata: Metadata = {
  title: '獵才顧問 | 台灣精品獵頭',
  description: '深耕台灣人才市場超過十五年，提供中高階職位媒合與跨台美人才服務。顧問親自全程跟案。',
}

async function getActiveJobs() {
  try {
    return await db
      .select()
      .from(jobs)
      .where(eq(jobs.isActive, true))
      .orderBy(desc(jobs.createdAt))
      .limit(2)
  } catch {
    return []
  }
}

export default async function HomePage() {
  const activeJobs = await getActiveJobs()

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-navy relative overflow-hidden py-20 md:py-28">
        {/* Geometric background */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
          <circle cx="75%" cy="30%" r="300" stroke="white" strokeWidth="1" fill="none"/>
          <circle cx="75%" cy="30%" r="200" stroke="white" strokeWidth="1" fill="none"/>
          <circle cx="75%" cy="30%" r="100" stroke="white" strokeWidth="1" fill="none"/>
          <line x1="55%" y1="0" x2="95%" y2="100%" stroke="white" strokeWidth="0.5"/>
          <rect x="60%" y="50%" width="200" height="200" stroke="#B8923A" strokeWidth="0.5" fill="none" opacity="0.5"/>
        </svg>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-[1fr_260px] gap-12 items-center">
            <div>
              <p className="text-xs tracking-[.12em] uppercase text-gold-muted mb-4">
                Taiwan Executive Search · 台灣獵頭顧問
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-medium text-warm-white leading-[1.15] tracking-tight mb-5">
                深耕台灣<span className="text-gold-muted">十五年</span><br />
                只做我們能<br />
                負責到底的案子
              </h1>
              <p className="text-warm-white/60 text-base leading-relaxed mb-9 max-w-md">
                專注中高階職位媒合，台灣本地與跨台美兩地服務。每一個委託，顧問親自全程跟案。
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-medium hover:bg-gold-hover transition-colors text-sm"
                >
                  委託獵才
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-warm-white/35 text-warm-white hover:border-warm-white/70 transition-colors text-sm"
                >
                  了解服務
                </Link>
              </div>
            </div>

            {/* Photo column */}
            <div className="flex flex-col gap-3">
              <div className="aspect-[3/4] bg-navy-hover rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-gold/10" />
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 rounded-full bg-warm-white/10 flex items-center justify-center mx-auto mb-3">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-warm-white/30" aria-hidden="true"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
                  </div>
                  <p className="text-xs text-warm-white/25">顧問照片</p>
                </div>
              </div>
              <div className="bg-gold/15 border border-gold/30 rounded-lg p-3 text-center">
                <div className="font-display text-2xl font-medium text-gold-muted">15+</div>
                <div className="text-xs text-warm-white/50 mt-0.5">年深耕台灣人才市場</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-border-c">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 divide-x divide-border-c">
          {[
            { label: '合法許可', value: '私立就業服務機構許可', sub: '許可字號：XXXXXXXX' },
            { label: '深耕年資', value: '15+ 年', sub: '台灣人才市場' },
            { label: '服務承諾', value: '顧問親自跟案', sub: '不假手他人' },
          ].map((item) => (
            <div key={item.label} className="py-5 px-4 text-center">
              <div className="text-[10px] font-medium uppercase tracking-wider text-gold mb-1">{item.label}</div>
              <div className="font-display text-lg font-medium text-navy">{item.value}</div>
              <div className="text-xs text-slate mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Services ──────────────────────────────────────────────────── */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">Our services</p>
        <h2 className="font-display text-3xl font-medium text-navy mb-3">我們提供什麼</h2>
        <p className="text-slate text-sm leading-relaxed mb-10 max-w-lg">三種服務，共同的承諾：顧問親自全程執行，不假手他人。</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: '🏢', title: '台灣本地獵才', color: 'bg-blue-50',
              desc: '協助台灣企業尋找中高階主管，從需求釐清到人選到位，全程顧問親自執行。',
              href: '/services#local',
            },
            {
              icon: '🌏', title: '跨台美人才媒合', color: 'bg-amber-50', featured: true,
              desc: '協助美國公司在台灣找到合適的技術與管理人才，橋接文化與薪酬落差。',
              href: '/services#crossborder',
            },
            {
              icon: '🔒', title: '求職者保密媒合', color: 'bg-emerald-50',
              desc: '為高階求職者提供保密的職涯媒合服務，資料僅顧問本人閱覽。',
              href: '/services#jobseeker',
            },
          ].map((s) => (
            <div
              key={s.title}
              className={`bg-white rounded-xl overflow-hidden border transition-shadow hover:shadow-card-hover ${s.featured ? 'border-gold' : 'border-border-c'}`}
            >
              <div className={`h-28 ${s.color} flex items-center justify-center text-4xl`}>
                {s.icon}
              </div>
              <div className="p-5">
                {s.featured && (
                  <span className="inline-block text-[10px] font-medium bg-gold-light text-amber-800 px-2 py-0.5 rounded mb-2">跨國</span>
                )}
                <h3 className="font-medium text-navy mb-2">{s.title}</h3>
                <p className="text-sm text-slate leading-relaxed mb-4">{s.desc}</p>
                <Link href={s.href} className="text-sm text-gold hover:text-gold-hover inline-flex items-center gap-1">
                  了解更多
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About preview ─────────────────────────────────────────────── */}
      <section className="bg-warm-alt py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[200px_1fr] gap-10 items-center">
            <div className="w-48 h-48 rounded-full bg-navy-hover flex items-center justify-center mx-auto">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-warm-white/20" aria-hidden="true"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
            </div>
            <div>
              <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">About</p>
              <h2 className="font-display text-2xl font-medium text-navy mb-1">顧問姓名</h2>
              <p className="text-sm text-gold mb-4">資深獵頭顧問 · 私立就業服務機構許可</p>
              <blockquote className="border-l-2 border-gold pl-4 font-display text-base text-navy italic mb-5 leading-relaxed">
                「我不推薦任何一個我自己不敢掛名的人選。」
              </blockquote>
              <p className="text-sm text-slate leading-relaxed mb-5">
                深耕台灣人才市場超過十五年。保持精品規模，不是因為接不到大案子，而是因為只有這樣才能對每一個委託負責到底。
              </p>
              <Link href="/about" className="text-sm font-medium text-navy inline-flex items-center gap-1 hover:text-gold transition-colors">
                認識顧問
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <section className="bg-navy py-16 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
          <circle cx="85%" cy="50%" r="300" stroke="white" strokeWidth="0.5" fill="none"/>
          <circle cx="10%" cy="50%" r="220" stroke="#B8923A" strokeWidth="0.5" fill="none"/>
        </svg>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-warm-white/10 border border-warm-white/10 rounded-xl overflow-hidden">
            {[
              { num: '15+', label: '年深耕\n台灣人才市場' },
              { num: 'VP+', label: '專注中高階\n管理職缺' },
              { num: '2國', label: '台灣 × 美國\n跨境服務' },
              { num: '1對1', label: '顧問親自\n全程跟案' },
            ].map((s) => (
              <div key={s.num} className="py-8 px-4 text-center">
                <div className="font-display text-4xl font-medium text-warm-white leading-none mb-2">
                  {s.num.includes('+') || s.num.includes('國') || s.num.includes('對')
                    ? <>{s.num.replace(/[+國對1]/g, '')}<span className="text-gold-muted text-2xl">{s.num.match(/[+國對1]+$/)?.[0]}</span></>
                    : s.num
                  }
                </div>
                <div className="text-xs text-warm-white/50 leading-relaxed whitespace-pre-line">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Jobs preview ──────────────────────────────────────────────── */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs tracking-[.1em] uppercase text-gold mb-1">Current openings</p>
            <h2 className="font-display text-2xl font-medium text-navy">目前媒合中的職位</h2>
          </div>
          <Link href="/jobs" className="text-sm text-gold hover:text-gold-hover inline-flex items-center gap-1">
            查看全部
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        {activeJobs.length > 0 ? (
          <div className="flex flex-col gap-3">
            {activeJobs.map((job) => (
              <div key={job.id} className="bg-white border border-border-c rounded-xl p-5 flex items-center justify-between hover:border-gold/50 transition-colors">
                <div>
                  <div className="flex gap-2 mb-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-navy font-medium">{job.industryZh}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-medium">上架中</span>
                  </div>
                  <div className="font-display font-medium text-navy mb-1">{job.titleZh}</div>
                  <div className="text-xs text-slate">{job.location}</div>
                </div>
                <Link
                  href={`/jobs/${job.id}`}
                  className="text-sm text-navy border border-border-c rounded-lg px-3.5 py-1.5 hover:border-gold/50 hover:text-gold transition-colors flex-shrink-0 flex items-center gap-1"
                >
                  查看詳情
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-border-c rounded-xl p-8 text-center">
            <p className="text-slate text-sm">目前暫無公開職缺，歡迎主動聯絡</p>
            <Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-sm text-gold hover:text-gold-hover">
              與我聯絡
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        )}
      </section>

      {/* ── CTA band ──────────────────────────────────────────────────── */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gold/8 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-warm-white/3 translate-y-1/2 -translate-x-1/4" />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-3xl font-medium text-warm-white mb-3">準備好了嗎？</h2>
          <p className="text-warm-white/55 text-sm mb-9">無論您是在尋找關鍵人才，還是考慮下一步職涯，都歡迎與我聯絡。</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-medium hover:bg-gold-hover transition-colors text-sm">
              委託獵才
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
