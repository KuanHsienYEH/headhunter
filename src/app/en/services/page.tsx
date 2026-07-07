import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Local Taiwan search, enterprise talent solutions, and confidential candidate matching.',
}

const steps = [
  { num: '01', title: 'Clarify Requirements', desc: 'Deep dive into company needs, culture, and role specifications' },
  { num: '02', title: 'Talent Search', desc: 'Multi-channel proactive sourcing for the right candidates' },
  { num: '03', title: 'Evaluate & Screen', desc: 'Rigorous assessment of competencies, experience, and fit' },
  { num: '04', title: 'Confirm & Place', desc: 'Comprehensive talent reports and interview process support' },
]

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 320 }}>
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1440&h=520&q=80&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,30,70,0.58)' }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 md:py-28">
          <p className="text-xs tracking-[.12em] uppercase text-[#FF6B00] font-medium mb-3">Our Services</p>
          <h1 className="text-4xl font-bold text-white mb-4">What we do</h1>
          <p className="text-white/70 text-[15px] max-w-lg">Comprehensive talent solutions to help you find the right people in Taiwan&apos;s competitive market.</p>
        </div>
      </section>

      {/* ── Service 1 ── */}
      <section id="local" className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_300px] gap-12 items-center">
            <div>
              <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Service 01</p>
              <h2 className="text-2xl font-bold text-[#333F4F] mb-4">Local Taiwan Search</h2>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-4">
                Helping Taiwan companies find mid-to-senior management and key professional talent. With deep industry knowledge and an extensive talent network, we identify and attract the best passive candidates.
              </p>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-6">
                From scoping the brief to onboarding, the consultant handles every step personally — ensuring every recommended candidate fits both culture and role requirements.
              </p>
              <ul className="space-y-2 mb-6">
                {['Senior executive search', 'Cross-industry talent referrals', 'Confidential recruitment', 'Compensation benchmarking'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-[#6B7A8D]">
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/en/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-white text-[13px]" style={{ background: '#0052A5' }}>
                Discuss this service
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="bg-[#F5F7FA] rounded-xl p-6 border-l-4 border-[#0052A5]">
              <h3 className="text-[15px] font-bold text-[#333F4F] mb-4">Service Features</h3>
              <div className="space-y-4">
                {[
                  { title: 'Deep Industry Knowledge', desc: 'Thorough understanding of talent ecosystems across sectors' },
                  { title: 'End-to-End Management', desc: 'Consultant personally runs the full process from search to onboarding' },
                  { title: 'Confidentiality Commitment', desc: 'Strict protection of company and candidate information' },
                ].map(f => (
                  <div key={f.title} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#FF6B00' }} />
                    <div>
                      <div className="text-[13px] font-bold text-[#333F4F]">{f.title}</div>
                      <div className="text-[12px] text-[#6B7A8D] mt-0.5">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#E0E4EA]" />

      {/* ── Service 2 ── */}
      <section id="solutions" style={{ background: '#F5F7FA' }} className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-[300px_1fr] gap-12 items-center">
            <div className="relative rounded-xl overflow-hidden" style={{ minHeight: 260 }}>
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&q=80&fit=crop"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>
            <div>
              <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Service 02</p>
              <h2 className="text-2xl font-bold text-[#333F4F] mb-4">Enterprise Talent Solutions</h2>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-4">
                Comprehensive consulting for enterprise talent strategy — including organizational analysis, talent mapping, compensation design, and recruitment process optimization.
              </p>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-6">
                We are not just recruitment executors — we are your talent strategy partner, helping build robust talent management systems that elevate organizational performance.
              </p>
              <ul className="space-y-2 mb-6">
                {['Organizational structure optimization', 'Compensation market benchmarking', 'Talent mapping & planning', 'Recruitment process design'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-[#6B7A8D]">
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/en/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-white text-[13px]" style={{ background: '#FF6B00' }}>
                Learn more
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#E0E4EA]" />

      {/* ── Service 3 ── */}
      <section id="jobseeker" className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_300px] gap-12 items-center">
            <div>
              <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Service 03</p>
              <h2 className="text-2xl font-bold text-[#333F4F] mb-4">Confidential Candidate Matching</h2>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-4">
                Confidential career matching for senior leaders currently employed. We understand the sensitivity of job-seeking while in a role, and strictly protect your personal information and career plans.
              </p>
              <p className="text-[14px] text-[#6B7A8D] leading-relaxed mb-6">
                Through our extensive corporate network, we proactively match you with opportunities aligned to your career goals — letting you explore better possibilities in a safe, confidential environment.
              </p>
              <ul className="space-y-2 mb-6">
                {['Strict data confidentiality', 'Passive candidate matching', 'Offer negotiation support', 'Career development consulting'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-[#6B7A8D]">
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/en/contact#resume" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-white text-[13px]" style={{ background: '#0052A5' }}>
                Submit resume
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="bg-[#E8F0FB] rounded-xl p-6 text-center">
              <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="#0052A5" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <h3 className="text-[15px] font-bold text-[#333F4F] mb-2">Confidentiality Commitment</h3>
              <p className="text-[13px] text-[#6B7A8D] leading-relaxed mb-4">Your resume and personal information are viewed only by the consultant — never published or shared without authorization</p>
              <div className="text-xs px-3 py-1.5 rounded-full inline-block font-medium" style={{ background: '#EAF7F0', color: '#27AE60' }}>
                ✓ PDPA Compliant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process steps ── */}
      <section style={{ background: '#0052A5' }} className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Our Process</p>
            <h2 className="text-2xl font-bold text-white">How we work together</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+20px)] right-[-calc(50%-20px)] h-px" style={{ background: 'rgba(255,255,255,0.2)' }} />
                )}
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-[15px] font-bold" style={{ background: '#FF6B00', color: 'white' }}>
                  {s.num}
                </div>
                <div className="text-[14px] font-bold text-white mb-1">{s.title}</div>
                <div className="text-[12px] text-white/60 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fee note + CTA ── */}
      <section className="py-14 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-[#F5F7FA] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 border-l-4 border-[#FF6B00]">
            <div>
              <h3 className="text-[16px] font-bold text-[#333F4F] mb-2">Fee Structure</h3>
              <p className="text-[13px] text-[#6B7A8D] leading-relaxed max-w-lg">
                Corporate fees are assessed by seniority and role complexity, typically as a percentage of first-year compensation upon successful placement. Services are completely free for candidates. Contact us for a detailed quote.
              </p>
            </div>
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-[14px] flex-shrink-0 transition-colors"
              style={{ background: '#FF6B00' }}
            >
              Book a consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
