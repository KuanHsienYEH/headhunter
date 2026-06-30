import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db'
import { jobs } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import JobsFilterList from '@/features/jobs/JobsFilterList'

export const metadata: Metadata = {
  title: 'Openings',
  description: 'Current mid-to-senior level openings — reach out directly or submit your resume.',
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
        <h1 className="font-display text-[30px] font-medium text-warm-white mb-2">Roles we&apos;re hiring for</h1>
        <p className="text-sm text-warm-white/60 max-w-md">Every opening is personally vetted before it&apos;s posted. Roles that aren&apos;t public yet are often still in progress — reach out directly.</p>
      </section>

      <JobsFilterList jobs={list} lang="en" />

      <div className="px-6 md:px-8 pb-12">
        <p className="text-[11px] text-slate/60 uppercase tracking-[.06em] mb-3">Don&apos;t see the right fit?</p>
        <div className="bg-white border-[1.5px] border-border-c rounded-xl p-7 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="font-display text-lg font-medium text-navy mb-1.5">Register proactively</div>
            <p className="text-[13px] text-slate leading-relaxed max-w-md">
              Public listings don&apos;t cover every search in progress. If you&apos;re a VP-level leader or above considering a move, submit your resume — we&apos;ll reach out when the right opportunity comes up. Fully confidential.
            </p>
          </div>
          <Link href="/en/contact#resume" className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-navy text-white text-[13px] font-medium hover:bg-navy-hover transition-colors">
            Submit resume
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </>
  )
}
