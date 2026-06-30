import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Local Taiwan search, US–Taiwan cross-border hiring, and confidential candidate matching.',
}

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy px-6 md:px-8 py-[52px] text-center">
        <p className="text-xs tracking-[.1em] uppercase text-gold-muted mb-2.5">Services</p>
        <h1 className="font-display text-[32px] font-medium text-warm-white mb-2.5">What we do</h1>
        <p className="text-sm text-warm-white/60 max-w-lg mx-auto">Three services, one promise: every search is run personally, never outsourced.</p>
      </section>

      {/* Service 01 — Local */}
      <section className="py-16 px-6 md:px-8">
        <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">Service 01</p>
        <div className="grid md:grid-cols-[1fr_320px] gap-12 items-start">
          <div>
            <h2 className="font-display text-[26px] font-medium text-navy mb-1.5">Local Taiwan search</h2>
            <p className="text-sm text-slate leading-relaxed mb-4">Helping Taiwan companies find mid-to-senior management. From defining the brief, market mapping, and candidate evaluation, through to final offer negotiation — all handled personally.</p>
            <p className="text-sm text-slate leading-relaxed">Best for: Taiwan-based companies or foreign subsidiaries filling VP-level or key director roles.</p>
            <div className="flex gap-3 flex-wrap mt-7">
              <Link href="/en/contact" className="inline-flex items-center gap-1.5 px-[22px] py-[11px] rounded-full bg-gold text-white text-sm font-medium hover:bg-gold-hover transition-colors">
                Start a search
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <a href="#process" className="inline-flex items-center gap-1.5 px-[21px] py-2.5 rounded-full border-[1.5px] border-navy text-navy text-sm">See the process</a>
            </div>
          </div>
          <div className="bg-white border border-border-c rounded-xl p-6">
            <div className="flex items-center gap-2 text-[13px] font-medium text-navy mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
              What&apos;s included
            </div>
            {[
              'In-depth briefing to clarify what the role really needs',
              'Proactive sourcing, not limited to a candidate database',
              'Background checks and a written evaluation report',
              'Interview scheduling and two-way communication',
              'Offer negotiation and 90-day onboarding follow-up',
            ].map((label) => (
              <div key={label} className="flex gap-2.5 text-[13px] text-slate leading-relaxed py-2.5 border-b border-warm-alt last:border-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-border-c mx-6 md:mx-8" />

      {/* Service 02 — Cross-border */}
      <section className="py-16 px-6 md:px-8">
        <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">Service 02</p>
        <div className="grid md:grid-cols-[1fr_320px] gap-12 items-start">
          <div>
            <h2 className="font-display text-[26px] font-medium text-navy mb-1.5">US–Taiwan cross-border hiring</h2>
            <p className="text-sm text-slate leading-relaxed mb-4">Helping US companies find the right technical and management talent in Taiwan. We bridge compensation gaps, cultural differences, and local employment regulations so the whole process runs smoothly.</p>
            <p className="text-sm text-slate leading-relaxed">Best for: US companies with a Taiwan subsidiary, or hiring Taiwan-based talent remotely.</p>
            <div className="grid sm:grid-cols-2 gap-3 my-5">
              {[
                'Not knowing local pay bands, so offers don\'t land',
                'Job descriptions that don\'t resonate with Taiwan candidates',
                'Cross-timezone interview scheduling causing drop-off',
                'Unfamiliarity with Taiwan labor law creating contract risk',
              ].map((p) => (
                <div key={p} className="bg-white border border-border-c rounded-lg p-3.5 flex gap-2.5">
                  <span className="text-gold text-lg flex-shrink-0">!</span>
                  <div className="text-[13px] text-slate leading-relaxed">{p}</div>
                </div>
              ))}
            </div>
            <Link href="/en/contact" className="inline-flex items-center gap-1.5 px-[22px] py-[11px] rounded-full bg-gold text-white text-sm font-medium hover:bg-gold-hover transition-colors">
              Talk to us about your needs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="bg-white border border-border-c rounded-xl p-6">
            <div className="flex items-center gap-2 text-[13px] font-medium text-navy mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
              How we help
            </div>
            {[
              'Market compensation data for equivalent Taiwan roles',
              'JD rewrites to better resonate with Taiwan candidates',
              'Cross-timezone interview coordination to reduce drop-off',
              'Labor law compliance guidance (not legal advice)',
              'Fully bilingual communication and candidate reports',
            ].map((label) => (
              <div key={label} className="flex gap-2.5 text-[13px] text-slate leading-relaxed py-2.5 border-b border-warm-alt last:border-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-border-c mx-6 md:mx-8" />

      {/* Service 03 — Jobseeker */}
      <section className="py-16 px-6 md:px-8">
        <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">Service 03</p>
        <div className="grid md:grid-cols-[1fr_320px] gap-12 items-start">
          <div>
            <h2 className="font-display text-[26px] font-medium text-navy mb-1.5">Confidential candidate matching</h2>
            <p className="text-sm text-slate leading-relaxed mb-4">Confidential career matching for senior leaders. You don&apos;t need to apply anywhere — just let us know your direction, and we&apos;ll reach out when the right opportunity comes up.</p>
            <p className="text-sm text-slate leading-relaxed">Best for: VP-level and above, considering a next step but not comfortable being openly on the market.</p>
            <div className="bg-[#F0FDF4] border border-[#86EFAC] rounded-[10px] p-[18px] flex gap-3.5 items-start my-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600 flex-shrink-0" aria-hidden="true"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-12V7a4 4 0 00-8 0v4h8z" /></svg>
              <div className="text-[13px] text-emerald-900 leading-relaxed">
                <strong className="text-emerald-950">Confidentiality promise</strong>: your resume is stored encrypted, viewed only by the consultant — never published, shopped around, or sold. You can request full deletion at any time; data is handled per applicable privacy law.
              </div>
            </div>
            <Link href="/en/contact#resume" className="inline-flex items-center gap-1.5 px-[22px] py-[11px] rounded-full bg-gold text-white text-sm font-medium hover:bg-gold-hover transition-colors">
              Submit resume
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="bg-white border border-border-c rounded-xl p-6">
            <div className="flex items-center gap-2 text-[13px] font-medium text-navy mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 16v-4m0-4h.01" /></svg>
              How it works
            </div>
            {[
              'Submit your resume with your direction and preferences',
              'The consultant reaches out within 2 business days',
              'You\'re notified proactively when a fit comes up',
              'You decide whether to take it further — no obligation',
            ].map((label) => (
              <div key={label} className="flex gap-2.5 text-[13px] text-slate leading-relaxed py-2.5 border-b border-warm-alt last:border-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span>{label}</span>
              </div>
            ))}
            <div className="mt-3.5 pt-3.5 border-t border-border-c text-xs text-slate/70">Free for candidates.<br />Fees are paid by the hiring company.</div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-navy py-16 px-6 md:px-8 scroll-mt-16">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs tracking-[.1em] uppercase text-gold-muted mb-2">Process</p>
          <h2 className="font-display text-[26px] font-medium text-warm-white mb-2">How we work together</h2>
          <p className="text-sm text-warm-white/65">From the first call to onboarding, a typical search takes 6–10 weeks.</p>
        </div>
        <div className="max-w-lg mx-auto mt-8 flex flex-col">
          {[
            { num: '01', title: 'Initial consultation', desc: 'A 30-minute call or video chat to understand the role and expectations. Free, no obligation.', note: 'Free · ~30 min' },
            { num: '02', title: 'Scoping and agreement', desc: 'We confirm role specs, budget, and timeline, then sign a service agreement to kick off the search.' },
            { num: '03', title: 'Sourcing and evaluation', desc: 'We proactively source candidates, run initial interviews, and deliver a shortlist of 2–4 with a written report.', note: '~3–5 weeks' },
            { num: '04', title: 'Interviews and offer negotiation', desc: 'We coordinate interviews, help negotiate the offer, and follow up for 90 days after onboarding.' },
          ].map((s, i, arr) => (
            <div key={s.num} className={`flex gap-5 py-5 ${i < arr.length - 1 ? 'border-b border-warm-white/10' : ''}`}>
              <div className="w-9 h-9 rounded-full border-[1.5px] border-gold-muted/50 flex items-center justify-center font-display text-sm text-gold-muted flex-shrink-0">{s.num}</div>
              <div>
                <div className="text-[15px] font-medium text-warm-white mb-1">{s.title}</div>
                <div className="text-[13px] text-warm-white/60 leading-relaxed">{s.desc}</div>
                {s.note && <div className="text-[11px] text-gold-muted mt-1">{s.note}</div>}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-lg mx-auto bg-warm-white/[0.06] border border-warm-white/15 rounded-[10px] p-[18px] mt-7">
          <div className="text-xs text-warm-white/50 uppercase tracking-[.06em] mb-2">Fees</div>
          <div className="text-[13px] text-warm-white/75 leading-relaxed">Fees are due once a candidate starts, calculated as a percentage of annual salary. The initial consultation is free, and we&apos;ll walk you through clear pricing before any search begins.</div>
        </div>
        <div className="text-center mt-10">
          <Link href="/en/contact" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gold text-white text-sm font-medium hover:bg-gold-hover transition-colors">
            Book a consultation
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </>
  )
}
