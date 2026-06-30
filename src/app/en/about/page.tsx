import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: '15+ years in Taiwan\'s talent market. Boutique scale, every search handled personally.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-6 md:px-8 pt-14 pb-12 grid md:grid-cols-[1fr_240px] gap-12 items-end">
        <div>
          <p className="text-xs tracking-[.1em] uppercase text-gold-muted mb-2.5">About</p>
          <h1 className="font-display text-4xl font-medium text-warm-white leading-[1.2] mb-3">
            15 years in Taiwan.<br />Still boutique by choice.
          </h1>
          <p className="text-sm text-warm-white/60 leading-relaxed max-w-md">
            We&apos;ve never chased scale. Staying small is the only way to see every search through to the end.
          </p>
        </div>
        <div className="aspect-[4/5] bg-navy-hover rounded-xl flex items-center justify-center">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-warm-white/20" aria-hidden="true">
            <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
      </section>

      {/* My story */}
      <section className="py-16 px-6 md:px-8">
        <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">My story</p>
        <h2 className="font-display text-[26px] font-medium text-navy mb-5 leading-snug">The consultant&apos;s story</h2>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="text-sm text-slate leading-[1.85] flex flex-col gap-4">
            <p>Before search, I was an engineer in tech and held management roles in finance. I know what it feels like to be &ldquo;recommended&rdquo; — to have your resume handed to a company that doesn&apos;t fit, by someone who never understood you in the first place.</p>
            <p>So when I started my own practice, I gave myself one rule: I never recommend a candidate I wouldn&apos;t put my own name behind.</p>
            <p>Fifteen years later, it&apos;s still just me. Not for lack of opportunities to grow — I&apos;ve refused to let revenue pressure compromise that rule. Every search, from the first call to onboarding, is handled by me personally.</p>
            <p>That limits how many cases I can take on — but it also means every one of them can be trusted.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-border-c rounded-xl p-5">
              <div className="text-xs text-gold font-medium mb-1.5">Experience</div>
              <div className="font-display text-[28px] font-medium text-navy">15+ years</div>
              <div className="text-xs text-slate mt-1">Focused on Taiwan&apos;s senior talent market</div>
            </div>
            <div className="bg-white border border-border-c rounded-xl p-5">
              <div className="text-xs text-gold font-medium mb-2">Industry focus</div>
              <div className="flex flex-wrap gap-1.5">
                {['Technology', 'Finance', 'Consumer goods', 'Manufacturing'].map((t) => (
                  <span key={t} className="inline-flex px-2.5 py-1 rounded-full bg-blue-50 text-navy text-xs">{t}</span>
                ))}
              </div>
            </div>
            <div className="bg-white border border-border-c rounded-xl p-5">
              <div className="text-xs text-gold font-medium mb-2">Seniority focus</div>
              <div className="flex flex-wrap gap-1.5">
                {['C-level', 'VP', 'Director', 'Technical lead'].map((t) => (
                  <span key={t} className="inline-flex px-2.5 py-1 rounded-full bg-blue-50 text-navy text-xs">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-warm-alt py-16 px-6 md:px-8">
        <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">Philosophy</p>
        <h2 className="font-display text-[26px] font-medium text-navy mb-5 leading-snug">Three principles I work by</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { num: '01', title: 'Only what I can deliver', body: 'For every search I ask myself honestly: can I actually find the right person for this role? If not, I say so up front instead of taking the case anyway.' },
            { num: '02', title: 'Personally handled, start to finish', body: 'From scoping the brief to interviews to offer negotiation, I handle every step myself. You&apos;ll never get a call from an assistant who doesn&apos;t know your search.' },
            { num: '03', title: 'Deep expertise in the Taiwan market', body: 'Fifteen years working in Taiwan means I understand the compensation structures, company culture, and what kind of talent actually succeeds here.' },
          ].map((p) => (
            <div key={p.num} className="bg-white border border-border-c rounded-xl p-6">
              <div className="font-display text-[28px] font-medium text-border-strong mb-3">{p.num}</div>
              <div className="text-[15px] font-medium text-navy mb-2">{p.title}</div>
              <div className="text-[13px] text-slate leading-relaxed">{p.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Legal */}
      <section className="py-16 px-6 md:px-8">
        <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">Legal</p>
        <h2 className="font-display text-[26px] font-medium text-navy mb-5 leading-snug">Licensed to operate</h2>
        <div className="bg-[#F0F4FF] border border-[#B5C4E8] rounded-xl p-6 flex gap-5 items-start">
          <div className="w-11 h-11 rounded-lg bg-navy flex items-center justify-center text-gold-muted flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <div>
            <div className="text-[15px] font-medium text-navy mb-1.5">Licensed Private Employment Agency, Taiwan</div>
            <p className="text-[13px] text-slate leading-relaxed">
              We hold a Private Employment Agency license under Taiwan&apos;s Employment Service Act, regulated by the Ministry of Labor, covering both local and cross-border placement services in full compliance with applicable regulations.
            </p>
            <span className="inline-block mt-2 text-xs text-navy bg-[#E8ECF8] px-2.5 py-1 rounded-md font-mono">License No.: XXXXXXXX</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-warm-alt py-16 px-6 md:px-8">
        <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">Testimonials</p>
        <h2 className="font-display text-[26px] font-medium text-navy mb-5 leading-snug">What clients say</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { text: 'The biggest difference from other recruiters is that they actually understand what we&apos;re looking for. The candidates aren&apos;t a shotgun blast — every one made sense.', attr: 'HR Director, public tech company' },
            { text: 'Confidentiality mattered a lot to me, and they were one of the few people I trusted enough to send my resume to. It led to a great fit.', attr: 'Senior engineering leader, now CTO at a startup' },
          ].map((q) => (
            <div key={q.attr} className="bg-white border border-border-c rounded-xl p-6">
              <div className="font-display text-4xl text-border-c leading-none mb-3">&ldquo;</div>
              <p className="text-sm text-slate leading-relaxed italic mb-4">{q.text}</p>
              <div className="text-xs text-gold font-medium">{q.attr}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact bar */}
      <div className="bg-navy px-6 md:px-8 py-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-sm text-warm-white/70">Questions? Reach out directly.</div>
          <div className="font-display text-lg text-warm-white mt-1">contact@example.com</div>
        </div>
        <Link href="/en/contact" className="inline-flex items-center gap-1.5 px-[22px] py-[11px] rounded-full bg-gold text-white text-sm font-medium hover:bg-gold-hover transition-colors">
          Hire in Taiwan
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </>
  )
}
