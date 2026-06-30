import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { jobs } from '@/db/schema'
import { eq, and, ne, desc } from 'drizzle-orm'

type Props = { params: { slug: string } }

async function getJob(id: string) {
  try {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1)
    return job ?? null
  } catch {
    return null
  }
}

async function getRelatedJobs(industryZh: string, excludeId: string) {
  try {
    return await db
      .select()
      .from(jobs)
      .where(and(eq(jobs.industryZh, industryZh), eq(jobs.isActive, true), ne(jobs.id, excludeId)))
      .orderBy(desc(jobs.createdAt))
      .limit(2)
  } catch {
    return []
  }
}

function formatDate(d: Date | string) {
  const date = new Date(d)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getJob(params.slug)
  if (!job) return { title: '職缺' }
  return { title: job.titleZh, description: job.descZh.slice(0, 100) }
}

export default async function JobDetailPage({ params }: Props) {
  const job = await getJob(params.slug)
  if (!job || !job.isActive) notFound()

  const related = await getRelatedJobs(job.industryZh, job.id)

  return (
    <>
      <div className="bg-white border-b border-border-c px-6 md:px-8 h-11 flex items-center gap-2 text-[13px] text-slate/70">
        <Link href="/" className="hover:text-navy">首頁</Link>
        <span className="text-border-strong">/</span>
        <Link href="/jobs" className="hover:text-navy">職缺列表</Link>
        <span className="text-border-strong">/</span>
        <span className="text-navy">{job.titleZh}</span>
      </div>

      <section className="bg-navy px-6 md:px-8 pt-12 pb-10">
        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/10 text-warm-white/80 text-xs">{job.industryZh}</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EAF3DE] text-[#27500A] text-xs font-medium">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
            上架中
          </span>
        </div>
        <h1 className="font-display text-[32px] font-medium text-warm-white mb-4 leading-[1.2]">{job.titleZh}</h1>
        <div className="flex gap-5 flex-wrap text-[13px] text-warm-white/65">
          {job.location && (
            <span className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 21s-7-7.2-7-12a7 7 0 0114 0c0 4.8-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
              {job.location}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            {formatDate(job.createdAt)} 上架
          </span>
        </div>
      </section>

      <div className="px-6 md:px-8 py-10 grid md:grid-cols-[1fr_300px] gap-10 items-start">
        <div>
          <div className="mb-9">
            <div className="flex items-center gap-2 text-[13px] font-medium text-gold uppercase tracking-[.06em] mb-3.5">
              <span>職位說明</span>
              <span className="flex-1 h-px bg-border-c" />
            </div>
            <div className="text-sm text-slate leading-[1.8] whitespace-pre-line">{job.descZh}</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white border border-border-c rounded-xl p-5">
            <div className="text-xs text-gold font-medium uppercase tracking-[.06em] mb-3.5">職位摘要</div>
            {[
              ['工作地點', job.location || '—'],
              ['產業', job.industryZh],
              ['上架日期', formatDate(job.createdAt)],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between items-start text-[13px] py-2 border-b border-warm-alt last:border-0">
                <span className="text-slate/60">{label}</span>
                <span className="text-navy font-medium text-right max-w-[160px]">{val}</span>
              </div>
            ))}
          </div>

          <div className="bg-navy rounded-xl p-6">
            <div className="font-display text-[17px] font-medium text-warm-white mb-2">對這個職位有興趣？</div>
            <p className="text-[13px] text-warm-white/65 leading-relaxed mb-5">請上傳您的履歷，顧問會在 2 個工作日內與您聯繫，說明詳細資訊。</p>
            <Link href="/contact#resume" className="flex items-center justify-center gap-1.5 px-3 py-[11px] rounded-full bg-gold text-white text-sm font-medium hover:bg-gold-hover transition-colors w-full mb-2.5">
              上傳履歷應徵
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/contact" className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full border-[1.5px] border-warm-white/25 text-warm-white text-[13px] w-full">
              先詢問顧問
            </Link>
          </div>

          <div className="bg-white border border-border-c rounded-xl p-[18px] flex gap-3.5 items-center">
            <div className="w-11 h-11 rounded-full bg-navy-hover flex items-center justify-center flex-shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-warm-white/40" aria-hidden="true"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
            </div>
            <div>
              <div className="text-sm font-medium text-navy">顧問姓名</div>
              <div className="text-xs text-slate/60 mt-0.5">資深獵頭顧問 · 私立就業服務機構</div>
              <div className="text-xs text-gold mt-1.5">此職缺由顧問親自負責</div>
            </div>
          </div>

          <div className="bg-gold-light rounded-[10px] p-4 text-xs text-amber-900 leading-relaxed">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block mr-1 -translate-y-px" aria-hidden="true"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-12V7a4 4 0 00-8 0v4h8z" /></svg>
            上傳的履歷僅供顧問本人閱覽，不對外公開或轉介，符合個資法規定。
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="px-6 md:px-8 py-10 border-t border-border-c">
          <h2 className="font-display text-[22px] font-medium text-navy mb-5">其他職缺</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {related.map((r) => (
              <Link key={r.id} href={`/jobs/${r.id}`} className="bg-white border border-border-c rounded-[10px] p-4 hover:border-gold transition-colors">
                <div className="flex gap-1.5 mb-2">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-navy">{r.industryZh}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 inline-flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    上架中
                  </span>
                </div>
                <div className="text-sm font-medium text-navy mb-1">{r.titleZh}</div>
                <div className="text-xs text-slate/60">{r.location}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
