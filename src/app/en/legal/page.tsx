import type { Metadata } from 'next'
import { asc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { awards } from '@/db/schema'
import AwardsMarquee from '@/components/frontend/AwardsMarquee'

export const metadata: Metadata = {
  title: 'Compliance & Job Seeker Info',
  description: 'Licenses, fee schedules, contract templates, and job seeker rights published by Ju Jiang Human Resources Consultant Co., Ltd. under the Employment Service Act.',
}

/* Document items — swap file with the real path under /documents/ once provided */
const documents = [
  { title: 'Private Employment Agency License', desc: 'Issued by the Taipei City Labor Bureau. License No.: 北市就服字第0229號.', file: null },
  { title: 'Fee Schedule', desc: 'Service fee items and amounts published in accordance with the Employment Service Act.', file: null },
  { title: 'Employment Service Professional Certificates', desc: 'All our employment service professionals hold valid certificates.', file: null },
  { title: 'Standard Placement Service Contract', desc: 'Standard-form contract template for job seekers and employers.', file: null },
  { title: 'Sexual Harassment Prevention, Complaint & Disciplinary Measures', desc: 'Measures established under the Act of Gender Equality in Employment.', file: null },
]

const infoItems = [
  {
    title: 'Job Search Safety Consultation',
    body: 'If you have any concerns about a job listing, interview arrangement, or working conditions, call (02) 2356-9977 — our consultants are ready to help.',
  },
  {
    title: 'Employment Discrimination Prevention',
    body: 'Under Article 5 of the Employment Service Act, employers may not discriminate based on race, class, language, thought, religion, political affiliation, place of origin, birthplace, gender, sexual orientation, age, marital status, appearance, disability, horoscope, blood type, or past union membership. We strictly observe these rules throughout the placement process.',
  },
  {
    title: 'Complaint Handling',
    body: 'For any complaint about our services, call (02) 2356-9977 (contact: Ms. Chang) or email service@jujianghr.com.tw. We will respond and handle your case promptly.',
  },
  {
    title: 'Job Scam Prevention',
    body: 'Remember the "Seven No’s" when job hunting: no payments, no purchases, no card applications, no signing on the spot, never hand over original IDs, no unknown drinks, and no illegal work. Report suspicious listings to us or to the labor authority immediately.',
  },
]

async function getAwards() {
  try {
    return await db.select().from(awards).where(eq(awards.isActive, true)).orderBy(asc(awards.sortOrder), asc(awards.createdAt))
  } catch {
    return []
  }
}

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

      {/* ── Licenses & documents ── */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-dark mb-6">Licenses & Documents</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map(d => (
              <div key={d.title} className="border border-border-c rounded-xl p-5 flex flex-col gap-2 hover:shadow-card transition-shadow">
                <div className="w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div className="text-[15px] font-bold text-dark">{d.title}</div>
                <p className="text-[13px] text-muted leading-relaxed flex-1">{d.desc}</p>
                {d.file ? (
                  <a href={d.file} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-brand hover:text-brand-hover inline-flex items-center gap-1">
                    View document
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                ) : (
                  <span className="text-[12px] text-muted/70">Scanned copy coming soon</span>
                )}
              </div>
            ))}

            {/* External link: employer violation registry */}
            <a
              href="https://announcement.mol.gov.tw/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border-c rounded-xl p-5 flex flex-col gap-2 hover:shadow-card hover:border-brand/40 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
              <div className="text-[15px] font-bold text-dark">Employer Violation Registry</div>
              <p className="text-[13px] text-muted leading-relaxed flex-1">Ministry of Labor registry of employers penalized for labor law violations.</p>
              <span className="text-[13px] font-medium text-brand inline-flex items-center gap-1">Open registry</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Job seeker rights ── */}
      <section className="bg-dark-light border-t border-border-c">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-dark mb-6">Job Seeker Rights</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {infoItems.map(item => (
              <div key={item.title} className="bg-white border border-border-c rounded-xl p-6">
                <div className="text-[15px] font-bold text-dark mb-2">{item.title}</div>
                <p className="text-[13px] text-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards ── drop award scans into public/images/awards/ and fill the array */}
      <section className="bg-white border-t border-border-c">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-dark mb-2">Evaluations & Awards</h2>
          <p className="text-[13px] text-muted mb-6">Results and awards from official agency evaluations over the years. Click any award to enlarge.</p>
          {awardList.length > 0 ? (
            <AwardsMarquee awards={awardList} lang="en" />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-[3/4] rounded-xl border border-dashed border-border-strong bg-dark-light flex flex-col items-center justify-center gap-2 text-muted/60">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                  </svg>
                  <span className="text-[12px]">Award scan coming soon</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
