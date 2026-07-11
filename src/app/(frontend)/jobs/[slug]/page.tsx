import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { jobs } from '@/db/schema'
import { eq, and, ne, desc } from 'drizzle-orm'
import ResumeForm from '@/features/contact/ResumeForm'

type Props = { params: { slug: string } }

async function getJob(id: string) {
  try {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1)
    return job ?? null
  } catch { return null }
}

async function getRelatedJobs(industryZh: string, excludeId: string) {
  try {
    return await db
      .select()
      .from(jobs)
      .where(and(eq(jobs.industryZh, industryZh), eq(jobs.isActive, true), ne(jobs.id, excludeId)))
      .orderBy(desc(jobs.createdAt))
      .limit(2)
  } catch { return [] }
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
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-[#E0E4EA] px-6 h-10 flex items-center gap-2 text-[13px] text-[#6B7A8D]">
        <Link href="/" className="hover:text-[#0052A5]">首頁</Link>
        <span>/</span>
        <Link href="/jobs" className="hover:text-[#0052A5]">求職專區</Link>
        <span>/</span>
        <span className="text-[#333F4F] font-medium">{job.titleZh}</span>
      </div>

      {/* ── Job hero ── */}
      <section style={{ background: '#0052A5' }} className="px-6 py-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex gap-2 mb-4 flex-wrap">
            <span className="text-[11px] px-2.5 py-0.5 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }}>{job.industryZh}</span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full font-medium" style={{ background: '#EAF7F0', color: '#27AE60' }}>✓ 上架中</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{job.titleZh}</h1>
          <div className="flex gap-5 flex-wrap text-[13px] text-white/65">
            {job.location && (
              <span className="inline-flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 21s-7-7.2-7-12a7 7 0 0114 0c0 4.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
                {job.location}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              {formatDate(job.createdAt)} 上架
            </span>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="grid md:grid-cols-[1fr_300px] gap-10 items-start">

          {/* Main content */}
          <div>
            {/* 職務說明 — 固定欄位 */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-[12px] font-bold text-[#FF6B00] uppercase tracking-[.06em] mb-4">
                <span>職務說明 / Job Descriptions</span>
                <span className="flex-1 h-px bg-[#E0E4EA]" />
              </div>
              <div className="bg-white border border-[#E0E4EA] rounded-xl divide-y divide-[#F5F7FA]">
                {([
                  ['職務名稱', job.titleZh],
                  ['工作地點', job.location || '—'],
                  ['工作性質', job.employmentType],
                  ['薪資待遇', job.salary],
                  ['學歷科系', job.education || '—'],
                  ['工作年資', job.experience || '—'],
                ] as const).map(([label, val]) => (
                  <div key={label} className="grid grid-cols-[96px_1fr] gap-4 px-5 py-3 text-[14px]">
                    <span className="text-[#6B7A8D]">{label}</span>
                    <span className="text-[#333F4F] font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 工作內容 */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-[12px] font-bold text-[#FF6B00] uppercase tracking-[.06em] mb-4">
                <span>工作內容</span>
                <span className="flex-1 h-px bg-[#E0E4EA]" />
              </div>
              <div className="text-[14px] text-[#6B7A8D] leading-[1.9] whitespace-pre-line">{job.descZh}</div>
            </div>

            {/* 其他條件 */}
            {job.requirements && (
              <div className="mb-8">
                <div className="flex items-center gap-2 text-[12px] font-bold text-[#FF6B00] uppercase tracking-[.06em] mb-4">
                  <span>其他條件</span>
                  <span className="flex-1 h-px bg-[#E0E4EA]" />
                </div>
                <div className="text-[14px] text-[#6B7A8D] leading-[1.9] whitespace-pre-line">{job.requirements}</div>
              </div>
            )}

            {/* 應徵表單 — 記錄應徵者資料與應徵職缺 */}
            <div id="apply" className="scroll-mt-20">
              <div className="flex items-center gap-2 text-[12px] font-bold text-[#FF6B00] uppercase tracking-[.06em] mb-4">
                <span>應徵此職缺</span>
                <span className="flex-1 h-px bg-[#E0E4EA]" />
              </div>
              <div className="bg-white border border-[#E0E4EA] rounded-xl p-6">
                <ResumeForm lang="zh" jobId={job.id} jobTitle={job.titleZh} />
              </div>
            </div>
          </div>

          {/* Aside */}
          <div className="flex flex-col gap-4">
            {/* Summary card */}
            <div className="bg-white border border-[#E0E4EA] rounded-xl p-5">
              <div className="text-xs font-bold text-[#FF6B00] uppercase tracking-[.06em] mb-4">職位摘要</div>
              {[
                ['工作地點', job.location || '—'],
                ['工作性質', job.employmentType],
                ['薪資待遇', job.salary],
                ['產業別', job.industryZh],
                ['上架日期', formatDate(job.createdAt)],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between items-start text-[13px] py-2 border-b border-[#F5F7FA] last:border-0">
                  <span className="text-[#6B7A8D]">{label}</span>
                  <span className="text-[#333F4F] font-medium text-right max-w-[160px]">{val}</span>
                </div>
              ))}
            </div>

            {/* CTA card */}
            <div className="rounded-xl p-6" style={{ background: '#0052A5' }}>
              <div className="text-[16px] font-bold text-white mb-2">對這個職位有興趣？</div>
              <p className="text-[13px] text-white/65 leading-relaxed mb-5">填寫下方應徵表單，顧問將在 2 個工作日內與您聯繫。</p>
              <a
                href="#apply"
                className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-full text-white text-sm font-bold mb-2.5 transition-colors"
                style={{ background: '#FF6B00' }}
              >
                立即應徵
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full border border-white/25 text-white text-[13px] w-full"
              >
                先詢問顧問
              </Link>
            </div>

            {/* Consultant card */}
            <div className="bg-white border border-[#E0E4EA] rounded-xl p-4 flex gap-3 items-center">
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#E8F0FB' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0052A5" strokeWidth="1.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
              </div>
              <div>
                <div className="text-[14px] font-bold text-[#333F4F]">顧問姓名</div>
                <div className="text-[12px] text-[#6B7A8D] mt-0.5">資深獵頭顧問 · 私立就業服務機構</div>
                <div className="text-[12px] mt-1.5 font-medium" style={{ color: '#0052A5' }}>此職缺由顧問親自負責</div>
              </div>
            </div>

            {/* Privacy note */}
            <div className="rounded-xl p-4 text-[12px] leading-relaxed" style={{ background: '#FFF0E6', color: '#8B4513' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block mr-1 -translate-y-px" aria-hidden="true"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-12V7a4 4 0 00-8 0v4h8z"/></svg>
              上傳的履歷僅供顧問本人閱覽，不對外公開或轉介，符合個人資料保護法規定。
            </div>
          </div>
        </div>
      </div>

      {/* ── Related jobs ── */}
      {related.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-6 pb-14 border-t border-[#E0E4EA] pt-10">
          <h2 className="text-[18px] font-bold text-[#333F4F] mb-5">其他職缺</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/jobs/${r.id}`}
                className="bg-white border border-[#E0E4EA] rounded-xl p-5 hover:border-[#0052A5]/40 hover:shadow-card transition-all"
              >
                <div className="flex gap-1.5 mb-3">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full font-medium" style={{ background: '#E8F0FB', color: '#0052A5' }}>{r.industryZh}</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full font-medium" style={{ background: '#EAF7F0', color: '#27AE60' }}>✓ 上架中</span>
                </div>
                <div className="text-[14px] font-bold text-[#333F4F] mb-1">{r.titleZh}</div>
                <div className="text-[12px] text-[#6B7A8D]">{r.location}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
