import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db'
import { jobs } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export const metadata: Metadata = {
  title: 'Executive Search Taiwan',
  description: 'Boutique executive search in Taiwan for over 15 years. US–Taiwan cross-border hiring specialists. Every search handled personally.',
}

async function getActiveJobs() {
  try {
    return await db
      .select()
      .from(jobs)
      .where(eq(jobs.isActive, true))
      .orderBy(desc(jobs.createdAt))
      .limit(2)
  } catch {
    return []
  }
}

export default async function HomePage() {
  const activeJobs = await getActiveJobs()

  return (
    <>
      <section className="bg-navy relative overflow-hidden py-20 md:py-28">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
          <circle cx="75%" cy="30%" r="300" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="75%" cy="30%" r="200" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="75%" cy="30%" r="100" stroke="white" strokeWidth="1" fill="none" />
          <line x1="55%" y1="0" x2="95%" y2="100%" stroke="white" strokeWidth="0.5" />
          <rect x="60%" y="50%" width="200" height="200" stroke="#B8923A" strokeWidth="0.5" fill="none" opacity="0.5" />
        </svg>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-[1fr_260px] gap-12 items-center">
            <div>
              <p className="text-xs tracking-[.12em] uppercase text-gold-muted mb-4">
                Taiwan Executive Search
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-medium text-warm-white leading-[1.15] tracking-tight mb-5">
                15 years in Taiwan.<br />
                We only take cases<br />
                we can see through.
              </h1>
              <p className="text-warm-white/60 text-base leading-relaxed mb-9 max-w-md">
                Focused on mid-to-senior level placements, locally in Taiwan and across the US–Taiwan corridor. Every search is handled personally, start to finish.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/en/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-medium hover:bg-gold-hover transition-colors text-sm">
                  Hire in Taiwan
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
                <Link href="/en/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-warm-white/35 text-warm-white hover:border-warm-white/70 transition-colors text-sm">
                  Our services
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="aspect-[3/4] bg-navy-hover rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-gold/10" />
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 rounded-full bg-warm-white/10 flex items-center justify-center mx-auto mb-3">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-warm-white/30" aria-hidden="true"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                  </div>
                  <p className="text-xs text-warm-white/25">Consultant photo</p>
                </div>
              </div>
              <div className="bg-gold/15 border border-gold/30 rounded-lg p-3 text-center">
                <div className="font-display text-2xl font-medium text-gold-muted">15+</div>
                <div className="text-xs text-warm-white/50 mt-0.5">years in Taiwan&apos;s talent market</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white border-b border-border-c">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 divide-x divide-border-c">
          {[
            { label: 'Licensed', value: 'Private Employment Agency', sub: 'License No.: XXXXXXXX' },
            { label: 'Experience', value: '15+ years', sub: "Taiwan's talent market" },
            { label: 'Our promise', value: 'Personally handled', sub: 'No outsourcing' },
          ].map((item) => (
            <div key={item.label} className="py-5 px-4 text-center">
              <div className="text-[10px] font-medium uppercase tracking-wider text-gold mb-1">{item.label}</div>
              <div className="font-display text-lg font-medium text-navy">{item.value}</div>
              <div className="text-xs text-slate mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="py-20 max-w-6xl mx-auto px-6">
        <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">Our services</p>
        <h2 className="font-display text-3xl font-medium text-navy mb-3">What we do</h2>
        <p className="text-slate text-sm leading-relaxed mb-10 max-w-lg">Three services, one promise: every search is run personally by the consultant, never outsourced.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: '🏢', title: 'Local Taiwan search', color: 'bg-blue-50', desc: 'Helping Taiwan companies find mid-to-senior management — from defining the brief to onboarding, handled personally end to end.', href: '/en/services#local' },
            { icon: '🌏', title: 'US–Taiwan cross-border hiring', color: 'bg-amber-50', featured: true, desc: 'Helping US companies build technical and management teams in Taiwan, bridging culture and compensation gaps.', href: '/en/services#crossborder' },
            { icon: '🔒', title: 'Confidential candidate matching', color: 'bg-emerald-50', desc: 'Confidential career matching for senior candidates — your data is seen only by the consultant.', href: '/en/services#jobseeker' },
          ].map((s) => (
            <div key={s.title} className={`bg-white rounded-xl overflow-hidden border transition-shadow hover:shadow-card-hover ${s.featured ? 'border-gold' : 'border-border-c'}`}>
              <div className={`h-28 ${s.color} flex items-center justify-center text-4xl`}>{s.icon}</div>
              <div className="p-5">
                {s.featured && <span className="inline-block text-[10px] font-medium bg-gold-light text-amber-800 px-2 py-0.5 rounded mb-2">Cross-border</span>}
                <h3 className="font-medium text-navy mb-2">{s.title}</h3>
                <p className="text-sm text-slate leading-relaxed mb-4">{s.desc}</p>
                <Link href={s.href} className="text-sm text-gold hover:text-gold-hover inline-flex items-center gap-1">
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-warm-alt py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[200px_1fr] gap-10 items-center">
            <div className="w-48 h-48 rounded-full bg-navy-hover flex items-center justify-center mx-auto">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-warm-white/20" aria-hidden="true"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
            </div>
            <div>
              <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">About</p>
              <h2 className="font-display text-2xl font-medium text-navy mb-1">Consultant Name</h2>
              <p className="text-sm text-gold mb-4">Senior Executive Search Consultant · Licensed Private Employment Agency</p>
              <blockquote className="border-l-2 border-gold pl-4 font-display text-base text-navy italic mb-5 leading-relaxed">
                &ldquo;I never recommend a candidate I wouldn&apos;t put my own name behind.&rdquo;
              </blockquote>
              <p className="text-sm text-slate leading-relaxed mb-5">
                15+ years in Taiwan&apos;s talent market. We stay boutique on purpose — it&apos;s the only way to see every search through to the end.
              </p>
              <Link href="/en/about" className="text-sm font-medium text-navy inline-flex items-center gap-1 hover:text-gold transition-colors">
                Meet the consultant
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
          <circle cx="85%" cy="50%" r="300" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="10%" cy="50%" r="220" stroke="#B8923A" strokeWidth="0.5" fill="none" />
        </svg>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-warm-white/10 border border-warm-white/10 rounded-xl overflow-hidden">
            {[
              { num: '15+', label: 'years in\nTaiwan’s talent market' },
              { num: 'VP+', label: 'focused on\nsenior roles' },
              { num: '2', label: 'countries\nTaiwan x US' },
              { num: '1:1', label: 'personally\nhandled searches' },
            ].map((s) => (
              <div key={s.num} className="py-8 px-4 text-center">
                <div className="font-display text-4xl font-medium text-warm-white leading-none mb-2">{s.num}</div>
                <div className="text-xs text-warm-white/50 leading-relaxed whitespace-pre-line">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs tracking-[.1em] uppercase text-gold mb-1">Current openings</p>
            <h2 className="font-display text-2xl font-medium text-navy">Roles we&apos;re hiring for</h2>
          </div>
          <Link href="/en/jobs" className="text-sm text-gold hover:text-gold-hover inline-flex items-center gap-1">
            View all
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>

        {activeJobs.length > 0 ? (
          <div className="flex flex-col gap-3">
            {activeJobs.map((job) => (
              <div key={job.id} className="bg-white border border-border-c rounded-xl p-5 flex items-center justify-between hover:border-gold/50 transition-colors">
                <div>
                  <div className="flex gap-2 mb-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-navy font-medium">{job.industryEn ?? job.industryZh}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-medium">Active</span>
                  </div>
                  <div className="font-display font-medium text-navy mb-1">{job.titleEn ?? job.titleZh}</div>
                  <div className="text-xs text-slate">{job.location}</div>
                </div>
                <Link href={`/en/jobs/${job.id}`} className="text-sm text-navy border border-border-c rounded-lg px-3.5 py-1.5 hover:border-gold/50 hover:text-gold transition-colors flex-shrink-0 flex items-center gap-1">
                  View details
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-border-c rounded-xl p-8 text-center">
            <p className="text-slate text-sm">No public openings right now — reach out directly.</p>
            <Link href="/en/contact" className="mt-4 inline-flex items-center gap-1 text-sm text-gold hover:text-gold-hover">
              Contact us
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        )}
      </section>

      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gold/8 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-warm-white/3 translate-y-1/2 -translate-x-1/4" />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-3xl font-medium text-warm-white mb-3">Ready to talk?</h2>
          <p className="text-warm-white/55 text-sm mb-9">Whether you&apos;re hiring or considering your next move, we&apos;d love to hear from you.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/en/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-medium hover:bg-gold-hover transition-colors text-sm">
              Hire in Taiwan
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/en/contact#resume" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-warm-white/35 text-warm-white hover:border-warm-white/70 transition-colors text-sm">
              Submit resume
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
