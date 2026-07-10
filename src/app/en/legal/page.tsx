import type { Metadata } from 'next'
import { existsSync } from 'fs'
import path from 'path'
import { asc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { awards } from '@/db/schema'
import AwardsMarquee from '@/components/frontend/AwardsMarquee'
import SafetyHotline from '@/components/frontend/SafetyHotline'
import { govLinks, companyDocs } from '@/lib/legal-links'

export const metadata: Metadata = {
  title: 'Compliance & Job Seeker Info',
  description: 'Licenses, fee schedules, contract templates, and job seeker rights published by Ju Jiang Human Resources Consultant Co., Ltd. under the Employment Service Act.',
}

/* Reflect newly added PDFs / awards without a rebuild */
export const dynamic = 'force-dynamic'

async function getAwards() {
  try {
    return await db.select().from(awards).where(eq(awards.isActive, true)).orderBy(asc(awards.sortOrder), asc(awards.createdAt))
  } catch {
    return []
  }
}

const docExists = (href: string) => existsSync(path.join(process.cwd(), 'public', href))

export default async function LegalPage() {
  const awardList = await getAwards()

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-light border-b border-border-c">
        <div className="max-w-[1200px] mx-auto px-6 py-14">
          <p className="text-xs tracking-[.12em] uppercase text-accent font-medium mb-3">Compliance & Job Seeker Info</p>
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-3">Compliance & Job Seeker Information</h1>
          <p className="text-[15px] text-muted max-w-2xl">
            We are a licensed private employment agency (License No.: 北市就服字第0229號) and publish our licenses, fees, and job seeker rights information as required by the Employment Service Act.
          </p>
        </div>
      </section>

      {/* ── Company documents ── drop PDFs into public/documents/ to activate links */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-dark mb-6">Company Documents</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {companyDocs.map(d => {
              const ready = docExists(d.href)
              return (
                <div key={d.href} className="border border-border-c rounded-xl p-5 flex flex-col gap-2 hover:shadow-card transition-shadow">
                  <div className="w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div className="text-[15px] font-bold text-dark flex-1">{d.en}</div>
                  {ready ? (
                    <a href={d.href} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-brand hover:text-brand-hover inline-flex items-center gap-1">
                      View document (PDF)
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  ) : (
                    <span className="text-[12px] text-muted/70">Coming soon</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Government resources & job seeker rights ── all open in a new tab */}
      <section className="bg-dark-light border-t border-border-c">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-dark mb-6">Government Resources & Job Seeker Rights</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {govLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-border-c rounded-xl p-5 flex flex-col gap-2 hover:shadow-card hover:border-brand/40 transition-all"
              >
                <span className="w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </span>
                <span className="text-[15px] font-bold text-dark flex-1">{l.en}</span>
                <span className="text-[13px] font-medium text-brand">Open link</span>
              </a>
            ))}

            {/* Job search safety hotline — popup */}
            <div className="bg-white rounded-xl">
              <SafetyHotline lang="en" variant="card" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Awards ── managed in admin, marquee carousel with lightbox */}
      <section className="bg-white border-t border-border-c">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-dark mb-2">Evaluations & Awards</h2>
          <p className="text-[13px] text-muted mb-6">Results and awards from official agency evaluations over the years. Click any award to enlarge.</p>
          {awardList.length > 0 ? (
            <AwardsMarquee awards={awardList} lang="en" />
          ) : (
            <p className="text-[13px] text-muted/70 border border-dashed border-border-strong rounded-xl py-10 text-center">Award scans coming soon</p>
          )}
        </div>
      </section>
    </>
  )
}
