import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db'
import { jobs } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import JobsFilterList from '@/features/jobs/JobsFilterList'

export const metadata: Metadata = {
  title: '職缺',
  description: '目前媒合中的中高階職位，歡迎主動聯絡或登記履歷。',
}

async function getJobs() {
  try {
    return await db
      .select()
      .from(jobs)
      .where(eq(jobs.isActive, true))
      .orderBy(desc(jobs.createdAt))
  } catch {
    return []
  }
}

export default async function JobsPage() {
  const list = await getJobs()

  return (
    <>
      <section className="bg-navy px-6 md:px-8 pt-12 pb-10">
        <p className="text-xs tracking-[.1em] uppercase text-gold-muted mb-2">Current openings</p>
        <h1 className="font-display text-[30px] font-medium text-warm-white mb-2">目前媒合中的職位</h1>
        <p className="text-sm text-warm-white/60 max-w-md">所有職缺均由顧問親自評估後才公開。不適合公開的職缺也在進行中，歡迎主動登記。</p>
      </section>

      <JobsFilterList jobs={list} lang="zh" />

      <div className="px-6 md:px-8 pb-12">
        <p className="text-[11px] text-slate/60 uppercase tracking-[.06em] mb-3">沒有看到合適的職位？</p>
        <div className="bg-white border-[1.5px] border-border-c rounded-xl p-7 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="font-display text-lg font-medium text-navy mb-1.5">歡迎主動登記</div>
            <p className="text-[13px] text-slate leading-relaxed max-w-md">
              目前公開的職缺不一定涵蓋所有進行中的機會。如果您是 VP 級以上主管且正在考慮異動，歡迎上傳履歷，顧問會在有合適機會時主動聯繫，資料完全保密。
            </p>
          </div>
          <Link href="/contact#resume" className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-navy text-white text-[13px] font-medium hover:bg-navy-hover transition-colors">
            上傳履歷
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </>
  )
}
