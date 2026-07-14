import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db'
import { jobs } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export const metadata: Metadata = {
  title: 'Executive Search Taiwan',
  description: 'Boutique executive search in Taiwan for over 20 years. Every search handled personally.',
}
const yearsOfExperience = new Date().getFullYear() - 2012

async function getActiveJobs() {
  try {
    return await db
      .select()
      .from(jobs)
      .where(eq(jobs.isActive, true))
      .orderBy(desc(jobs.createdAt))
      .limit(3)
  } catch {
    return []
  }
}

export default async function HomePage() {
  const activeJobs = await getActiveJobs()

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 520 }}>
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1440&h=700&q=80&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,30,70,0.65)' }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-28 md:py-36">
          <p className="text-xs tracking-[.12em] uppercase font-medium mb-4" style={{ color: '#FF6B00' }}>Taiwan Executive Search</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.15] mb-5 max-w-2xl">
            20 years in Taiwan.<br />We only take cases<br />we can see through.
          </h1>
          <p className="text-white/65 text-[16px] leading-relaxed mb-10 max-w-lg">
            Focused on mid-to-senior level placements across Taiwan&apos;s most competitive industries. Every search is handled personally, start to finish.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white text-[14px] transition-colors"
              style={{ background: '#FF6B00' }}
            >
              Hire in Taiwan
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link
              href="/en/services"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white text-[14px] border border-white/30 hover:border-white/60 transition-colors"
            >
              Our services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quick nav ── */}
      <div className="bg-white border-b border-[#E0E4EA]">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E0E4EA]">
          {[
            { href: '/en/about', label: 'About Us', sub: 'Our story & philosophy' },
            { href: '/en/jobs', label: 'Openings', sub: 'Current roles' },
            { href: '/en/services', label: 'Services', sub: 'What we do' },
            { href: '/en/contact', label: 'Contact', sub: 'Get in touch' },
          ].map(item => (
            <Link key={item.href} href={item.href} className="py-5 px-4 text-center hover:bg-[#F5F7FA] transition-colors group">
              <div className="text-[14px] font-bold text-[#333F4F] group-hover:text-[#0052A5] transition-colors">{item.label}</div>
              <div className="text-[11px] text-[#6B7A8D] mt-0.5">{item.sub}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="py-10 px-6" style={{ background: '#0052A5' }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: `${yearsOfExperience}`, label: 'Years of Experience' },
            { num: '5,000+', label: 'Placements Made' },
            { num: '1,000+', label: 'Partner Companies' },
            { num: '98%', label: 'Client Satisfaction' },
          ].map(s => (
            <div key={s.num}>
              <div className="text-3xl font-bold text-white mb-1">{s.num}</div>
              <div className="text-[12px] text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── About split ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-xl overflow-hidden" style={{ minHeight: 320 }}>
            <img
              src="https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=700&h=500&q=80&fit=crop"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-3">About</p>
            <h2 className="text-2xl font-bold text-[#333F4F] mb-4 leading-snug">Trusted advisors in Taiwan&apos;s talent market</h2>
            <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-4">
              Founded over 20 years ago, we have built our reputation on one principle: quality always outweighs quantity. Every search is handled personally — never delegated or outsourced.
            </p>
            <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-6">
              We work only on searches we believe we can deliver on. Our boutique model ensures every client receives full attention and every candidate is treated with respect and discretion.
            </p>
            <Link
              href="/en/about"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold transition-colors"
              style={{ color: '#0052A5' }}
            >
              Learn about us
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-16" style={{ background: '#F5F7FA' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Our Services</p>
            <h2 className="text-2xl font-bold text-[#333F4F]">What we do</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: 'Local Taiwan Search', desc: 'Helping Taiwan companies find mid-to-senior management — from defining the brief to onboarding, handled personally end to end.', href: '/en/services#local', color: '#0052A5' },
              { title: 'Enterprise Talent Solutions', desc: 'Comprehensive consulting for talent strategy — org analysis, talent mapping, compensation design, and recruitment optimization.', href: '/en/services#solutions', color: '#FF6B00' },
              { title: 'Confidential Matching', desc: 'Confidential career matching for senior candidates in active roles. Your resume is seen only by the consultant, never shared without consent.', href: '/en/services#jobseeker', color: '#27AE60' },
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-xl p-6 border-t-4 border border-[#E0E4EA]" style={{ borderTopColor: s.color }}>
                <h3 className="text-[15px] font-bold text-[#333F4F] mb-2">{s.title}</h3>
                <p className="text-[13px] text-[#6B7A8D] leading-relaxed mb-4">{s.desc}</p>
                <Link href={s.href} className="text-[13px] font-bold inline-flex items-center gap-1 transition-colors" style={{ color: s.color }}>
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Jobs preview ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-1">Current Openings</p>
              <h2 className="text-2xl font-bold text-[#333F4F]">Roles we&apos;re hiring for</h2>
            </div>
            <Link href="/en/jobs" className="text-[13px] font-bold inline-flex items-center gap-1 transition-colors" style={{ color: '#0052A5' }}>
              View all
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          {activeJobs.length > 0 ? (
            <div className="flex flex-col gap-3">
              {activeJobs.map((job) => (
                <div key={job.id} className="bg-white border border-[#E0E4EA] rounded-xl px-5 py-4 flex items-center justify-between hover:border-[#0052A5]/40 transition-colors">
                  <div>
                    <div className="flex gap-2 mb-1.5">
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full font-medium" style={{ background: '#E8F0FB', color: '#0052A5' }}>{job.industryEn ?? job.industryZh}</span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full font-medium" style={{ background: '#EAF7F0', color: '#27AE60' }}>✓ Active</span>
                    </div>
                    <div className="text-[15px] font-bold text-[#333F4F] mb-0.5">{job.titleEn ?? job.titleZh}</div>
                    <div className="text-[12px] text-[#6B7A8D]">{job.location}</div>
                  </div>
                  <Link
                    href={`/en/jobs/${job.id}`}
                    className="flex-shrink-0 inline-flex items-center gap-1 text-[13px] font-medium border rounded-full px-4 py-2 transition-colors ml-4"
                    style={{ borderColor: '#0052A5', color: '#0052A5' }}
                  >
                    View
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#F5F7FA] rounded-xl p-8 text-center">
              <p className="text-[#6B7A8D] text-[14px] mb-4">No public openings right now — reach out directly.</p>
              <Link href="/en/contact" className="inline-flex items-center gap-1 text-[13px] font-bold" style={{ color: '#0052A5' }}>
                Contact us
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA band ── */}
      <section style={{ background: '#0052A5' }} className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to talk?</h2>
          <p className="text-white/60 text-[15px] mb-10 max-w-md mx-auto">Whether you&apos;re hiring or considering your next move, we&apos;d love to hear from you.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white text-[14px] transition-colors"
              style={{ background: '#FF6B00' }}
            >
              Hire in Taiwan
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link
              href="/en/contact#resume"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white text-[14px] border border-white/30 hover:border-white/60 transition-colors"
            >
              Submit resume
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
