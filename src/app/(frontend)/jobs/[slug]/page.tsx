import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { jobs } from '@/db/schema'
import { eq } from 'drizzle-orm'

type Props = { params: { slug: string } }

async function getJob(id: string) {
  try {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1)
    return job ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getJob(params.slug)
  if (!job) return { title: '職缺' }
  return { title: job.titleZh, description: job.descZh.slice(0, 100) }
}

export default async function JobDetailPage({ params }: Props) {
  const job = await getJob(params.slug)
  if (!job || !job.isActive) notFound()

  return (
    <>
      <section className="bg-navy py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Link href="/jobs" className="text-xs text-warm-white/50 hover:text-warm-white/80 inline-flex items-center gap-1 mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            返回職缺列表
          </Link>
          <div className="flex gap-2 mb-3">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-muted font-medium">{job.industryZh}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-warm-white mb-2">{job.titleZh}</h1>
          {job.location && <p className="text-warm-white/60 text-sm">{job.location}</p>}
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-6">
        <h2 className="font-display text-lg font-medium text-navy mb-4">職位說明</h2>
        <p className="text-sm text-slate leading-relaxed whitespace-pre-line mb-12">{job.descZh}</p>

        <div className="bg-warm-alt rounded-xl p-8 text-center">
          <p className="text-sm text-slate mb-4">對此職位有興趣，或想了解更多細節？</p>
          <Link href="/contact#resume" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-medium hover:bg-gold-hover transition-colors text-sm">
            登記履歷應徵
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </>
  )
}
