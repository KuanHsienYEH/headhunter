import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Local Taiwan search, US–Taiwan cross-border hiring, and confidential candidate matching.',
}

const services = [
  {
    id: 'local',
    icon: '🏢',
    color: 'bg-blue-50',
    title: 'Local Taiwan search',
    tagline: 'Local executive search',
    desc: 'Helping Taiwan companies find mid-to-senior management — from defining the brief and market mapping, through sourcing and interviews, to onboarding follow-up, all handled personally by the consultant.',
    points: [
      'Deep understanding of company culture and team fit',
      'Focused on management, technical, and sales leadership roles',
      'Market compensation and role positioning advisory included',
    ],
  },
  {
    id: 'crossborder',
    icon: '🌏',
    color: 'bg-amber-50',
    title: 'US–Taiwan cross-border hiring',
    tagline: 'US–Taiwan cross-border hiring',
    featured: true,
    desc: 'Helping US companies build technical and management teams in Taiwan, bridging cultural and compensation gaps so both sides build trust from the first conversation.',
    points: [
      'Familiar with compensation structures and labor regulations on both sides',
      'Helps remote and local teams communicate and align culturally',
      'Interviews and documents available in both English and Mandarin',
    ],
  },
  {
    id: 'jobseeker',
    icon: '🔒',
    color: 'bg-emerald-50',
    title: 'Confidential candidate matching',
    tagline: 'Confidential candidate matching',
    desc: 'Confidential career matching for senior, currently-employed candidates — your data is seen only by the consultant and never shared without consent, including with your current employer.',
    points: [
      '1:1 career consultation to clarify your next step',
      'Encrypted storage and strict confidentiality process',
      'Your resume is never shopped around — introductions only happen with mutual consent',
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy py-16 md:py-20 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
          <circle cx="80%" cy="30%" r="240" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="15%" cy="80%" r="180" stroke="#B8923A" strokeWidth="0.5" fill="none" />
        </svg>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <p className="text-xs tracking-[.12em] uppercase text-gold-muted mb-3">Our services</p>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-warm-white mb-3">Services</h1>
          <p className="text-warm-white/60 text-sm max-w-md">Three services, one promise: every search is run personally, never outsourced.</p>
        </div>
      </section>

      <section className="py-20 max-w-6xl mx-auto px-6 flex flex-col gap-6">
        {services.map((s) => (
          <div key={s.id} id={s.id} className={`bg-white rounded-xl border p-8 scroll-mt-24 grid md:grid-cols-[80px_1fr] gap-6 ${s.featured ? 'border-gold' : 'border-border-c'}`}>
            <div className={`w-16 h-16 rounded-lg ${s.color} flex items-center justify-center text-3xl`}>{s.icon}</div>
            <div>
              {s.featured && <span className="inline-block text-[10px] font-medium bg-gold-light text-amber-800 px-2 py-0.5 rounded mb-2">Cross-border</span>}
              <p className="text-xs tracking-[.08em] uppercase text-gold mb-1">{s.tagline}</p>
              <h2 className="font-display text-xl font-medium text-navy mb-3">{s.title}</h2>
              <p className="text-sm text-slate leading-relaxed mb-4 max-w-2xl">{s.desc}</p>
              <ul className="flex flex-col gap-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-slate">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gold/8 -translate-y-1/2 translate-x-1/4" />
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
