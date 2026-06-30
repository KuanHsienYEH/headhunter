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
  if (!job) return { title: 'Job opening' }
  const title = job.titleEn ?? job.titleZh
  return { title, description: (job.descEn ?? job.descZh).slice(0, 100) }
}

export default async function JobDetailPage({ params }: Props) {
  const job = await getJob(params.slug)
  if (!job || !job.isActive) notFound()

  return (
    <>
      <section className="bg-navy py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Link href="/en/jobs" className="text-xs text-warm-white/50 hover:text-warm-white/80 inline-flex items-center gap-1 mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to openings
          </Link>
          <div className="flex gap-2 mb-3">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-muted font-medium">{job.industryEn ?? job.industryZh}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-warm-white mb-2">{job.titleEn ?? job.titleZh}</h1>
          {job.location && <p className="text-warm-white/60 text-sm">{job.location}</p>}
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-6">
        <h2 className="font-display text-lg font-medium text-navy mb-4">Role description</h2>
        <p className="text-sm text-slate leading-relaxed whitespace-pre-line mb-12">{job.descEn ?? job.descZh}</p>

        <div className="bg-warm-alt rounded-xl p-8 text-center">
          <p className="text-sm text-slate mb-4">Interested, or want more details?</p>
          <Link href="/en/contact#resume" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-medium hover:bg-gold-hover transition-colors text-sm">
            Apply with your resume
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </>
  )
}
