import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db'
import { jobs } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import JobsFilterList from '@/features/jobs/JobsFilterList'

export const metadata: Metadata = {
  title: '求職專區',
  description: '目前媒合中的中高階職位，歡迎主動聯絡或登記履歷。',
}

async function getJobs() {
  try {
    return await db.select().from(jobs).where(eq(jobs.isActive, true)).orderBy(desc(jobs.createdAt))
  } catch {
    return []
  }
}

export default async function JobsPage() {
  const list = await getJobs()

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 300 }}>
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1440&h=480&q=80&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,30,70,0.55)' }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 md:py-28">
          <p className="text-xs tracking-[.12em] uppercase text-[#FF6B00] font-medium mb-3">Current Openings</p>
          <h1 className="text-4xl font-bold text-white mb-4">求職專區</h1>
          <p className="text-white/70 text-[15px] max-w-lg">所有職缺均由顧問親自評估後才公開，每個機會都值得您認真考慮。</p>
        </div>
      </section>

      {/* ── Filter + list ── */}
      <section className="bg-[#F5F7FA] min-h-[300px]">
        <JobsFilterList jobs={list} lang="zh" />
      </section>

      {/* ── Proactive CTA ── */}
      <div className="bg-[#F5F7FA]">
      <div className="max-w-[1200px] mx-auto px-6 pb-14">
        <p className="text-[11px] text-[#6B7A8D] uppercase tracking-[.06em] mb-3">沒有看到合適的職位？</p>
        <div className="bg-white border-l-4 border-[#FF6B00] border border-[#E0E4EA] rounded-xl p-7 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="text-[17px] font-bold text-[#333F4F] mb-1.5">歡迎主動登記履歷</div>
            <p className="text-[13px] text-[#6B7A8D] leading-relaxed max-w-lg">
              目前公開的職缺不一定涵蓋所有進行中的機會。如果您是 VP 級以上主管且正在考慮異動，歡迎上傳履歷，顧問會在有合適機會時主動聯繫，資料完全保密。
            </p>
          </div>
          <Link
            href="/contact#resume"
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-medium text-white text-[13px] transition-colors"
            style={{ background: '#0052A5' }}
          >
            上傳履歷
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
      </div>
    </>
  )
}
