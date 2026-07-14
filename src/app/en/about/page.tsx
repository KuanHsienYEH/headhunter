import type { Metadata } from 'next'
import Link from 'next/link'

const yearsOfExperience = new Date().getFullYear() - 2012
export const metadata: Metadata = {
  title: 'About',
  description: `${yearsOfExperience}+ years in Taiwan\'s talent market. Boutique scale, every search handled personally.`
}

const steps = [
  { num: '01', title: 'Clarify Requirements', desc: 'Deep dive into company needs, culture, and role specifications' },
  { num: '02', title: 'Talent Search', desc: 'Multi-channel proactive sourcing for the right candidates' },
  { num: '03', title: 'Evaluate & Screen', desc: 'Rigorous assessment of competencies, experience, and fit' },
  { num: '04', title: 'Confirm & Place', desc: 'Comprehensive talent reports and interview process support' },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 320 }}>
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1440&h=520&q=80&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,30,70,0.60)' }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <p className="text-xs tracking-[.12em] uppercase text-[#FF6B00] font-medium mb-3">About Us</p>
          <h1 className="text-4xl font-bold text-white mb-4">20 years in Taiwan.<br />Still boutique by choice.</h1>
          <p className="text-white/70 text-[15px] max-w-lg">We&apos;ve never chased scale. Staying small is the only way to see every search through to the end.</p>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_320px] gap-14 items-start">
            <div>
              <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-3">Our Story</p>
              <h2 className="text-2xl font-bold text-[#333F4F] mb-5 leading-snug">Trusted advisors in Taiwan&apos;s talent market</h2>
              <div className="text-[14px] text-[#6B7A8D] leading-relaxed flex flex-col gap-4">
                <p>Founded over 20 years ago, we have built our reputation on the principle that quality always outweighs quantity. We have personally placed over 5,000 senior professionals across Taiwan&apos;s most competitive industries.</p>
                <p>We work only on searches we believe we can deliver on. Our boutique model ensures that every client receives our full attention, and every candidate is treated with respect and discretion.</p>
                <p>As a licensed private employment agency under Taiwan&apos;s Employment Service Act, we operate with full compliance with all applicable regulations — giving you peace of mind throughout the engagement.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { num: '20+', label: 'Years of Experience', color: '#0052A5', bg: '#E8F0FB' },
                { num: '5,000+', label: 'Placements Made', color: '#FF6B00', bg: '#FFF0E6' },
                { num: '1,000+', label: 'Partner Companies', color: '#27AE60', bg: '#EAF7F0' },
              ].map(s => (
                <div key={s.num} className="rounded-xl p-5 flex gap-4 items-center" style={{ background: s.bg }}>
                  <div className="text-3xl font-bold" style={{ color: s.color }}>{s.num}</div>
                  <div className="text-[13px] font-medium text-[#333F4F]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="py-16" style={{ background: '#F5F7FA' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Our Philosophy</p>
            <h2 className="text-2xl font-bold text-[#333F4F]">Three principles we work by</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { num: '01', title: 'Only what we can deliver', body: 'For every search, we honestly ask whether we can find the right person. If not, we say so upfront instead of taking the case anyway.' },
              { num: '02', title: 'Personally handled, start to finish', body: 'From briefing to interviews to offer negotiation, every step is handled personally. You will never get a call from someone who doesn\'t know your search.' },
              { num: '03', title: 'Deep Taiwan market expertise', body: 'Over 20 years in Taiwan means we understand compensation structures, company culture, and what talent actually succeeds here.' },
            ].map((p) => (
              <div key={p.num} className="bg-white rounded-xl p-6 border-t-4" style={{ borderColor: '#0052A5' }}>
                <div className="text-3xl font-bold text-[#E0E4EA] mb-3">{p.num}</div>
                <div className="text-[15px] font-bold text-[#333F4F] mb-2">{p.title}</div>
                <div className="text-[13px] text-[#6B7A8D] leading-relaxed">{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Our Team</p>
            <h2 className="text-2xl font-bold text-[#333F4F]">Meet the consultants</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&q=80&fit=crop&face', name: 'Senior Consultant', title: 'Executive Search · Technology' },
              { img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&q=80&fit=crop&face', name: 'Senior Consultant', title: 'Executive Search · Finance' },
              { img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&q=80&fit=crop&face', name: 'Consultant', title: 'Talent Matching · FMCG' },
            ].map((m, i) => (
              <div key={i} className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-[#E8F0FB]">
                  <img src={m.img} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                </div>
                <div className="text-[15px] font-bold text-[#333F4F] mb-1">{m.name}</div>
                <div className="text-[12px] text-[#6B7A8D]">{m.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16" style={{ background: '#F5F7FA' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[.1em] uppercase text-[#FF6B00] font-medium mb-2">Testimonials</p>
            <h2 className="text-2xl font-bold text-[#333F4F]">What clients say</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { text: 'The biggest difference from other recruiters is they actually understand what we\'re looking for. The candidates aren\'t a shotgun blast — every one made sense.', attr: 'HR Director, public tech company' },
              { text: 'Confidentiality mattered a lot to me, and they were one of the few people I trusted enough to send my resume to. It led to a great fit.', attr: 'Senior engineering leader, now CTO at a startup' },
            ].map((q) => (
              <div key={q.attr} className="bg-white rounded-xl p-7 border border-[#E0E4EA]">
                <div className="text-4xl font-bold mb-3" style={{ color: '#E8F0FB', lineHeight: 1 }}>&ldquo;</div>
                <p className="text-[14px] text-[#6B7A8D] leading-relaxed italic mb-5">{q.text}</p>
                <div className="text-[12px] font-bold" style={{ color: '#FF6B00' }}>{q.attr}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
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

      {/* ── CTA ── */}
      <div className="py-12 bg-white border-t border-[#E0E4EA]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="text-[15px] font-bold text-[#333F4F] mb-1">Have a search to discuss?</div>
            <div className="text-[13px] text-[#6B7A8D]">service@jujianghr.com.tw</div>
          </div>
          <Link
            href="/en/contact"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full font-bold text-white text-[13px] transition-colors"
            style={{ background: '#FF6B00' }}
          >
            Start a search
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </>
  )
}
