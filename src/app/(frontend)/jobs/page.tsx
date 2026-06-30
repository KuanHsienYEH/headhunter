import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db'
import { jobs } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

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
      <section className="bg-navy py-16 md:py-20 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
          <circle cx="80%" cy="30%" r="240" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <p className="text-xs tracking-[.12em] uppercase text-gold-muted mb-3">Current openings</p>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-warm-white mb-3">目前媒合中的職位</h1>
          <p className="text-warm-white/60 text-sm max-w-md">找不到合適的職缺嗎？歡迎主動聯絡或登記履歷，顧問會依您的方向主動引薦。</p>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-6">
        {list.length > 0 ? (
          <div className="flex flex-col gap-3">
            {list.map((job) => (
              <div key={job.id} className="bg-white border border-border-c rounded-xl p-5 flex items-center justify-between hover:border-gold/50 transition-colors">
                <div>
                  <div className="flex gap-2 mb-2 flex-wrap">
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
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-border-c rounded-xl p-8 text-center">
            <p className="text-slate text-sm">目前暫無公開職缺，歡迎主動聯絡</p>
            <Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-sm text-gold hover:text-gold-hover">
              與我聯絡
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        )}
      </section>
    </>
  )
}
