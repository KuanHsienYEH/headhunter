import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: '15+ years in Taiwan\'s talent market. Boutique scale, every search handled personally.',
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy py-16 md:py-20 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
          <circle cx="20%" cy="40%" r="240" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="85%" cy="70%" r="180" stroke="#B8923A" strokeWidth="0.5" fill="none" />
        </svg>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <p className="text-xs tracking-[.12em] uppercase text-gold-muted mb-3">About us</p>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-warm-white">About</h1>
        </div>
      </section>

      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[220px_1fr] gap-12 items-start">
          <div className="w-48 h-48 rounded-full bg-navy-hover flex items-center justify-center mx-auto md:mx-0">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-warm-white/20" aria-hidden="true"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
          </div>
          <div>
            <h2 className="font-display text-2xl font-medium text-navy mb-1">Consultant Name</h2>
            <p className="text-sm text-gold mb-5">Senior Executive Search Consultant · Licensed Private Employment Agency</p>
            <blockquote className="border-l-2 border-gold pl-4 font-display text-lg text-navy italic mb-6 leading-relaxed">
              &ldquo;I never recommend a candidate I wouldn&apos;t put my own name behind.&rdquo;
            </blockquote>
            <div className="text-sm text-slate leading-relaxed space-y-4 max-w-2xl">
              <p>
                Over 15 years in Taiwan&apos;s talent market — from the early electronics manufacturing era to today&apos;s tech and startup ecosystem — across thousands of interviews and placements. Search isn&apos;t about dropping resumes into job slots; it&apos;s about truly understanding a company&apos;s culture and a candidate&apos;s career path to find a position where both sides can win for the long term.
              </p>
              <p>
                We stay boutique on purpose — not for lack of bigger opportunities, but because it&apos;s the only way to see every search through to the end: from defining the brief, sourcing, and interviews, to onboarding, handled personally by me, never handed off to junior staff.
              </p>
              <p>
                In recent years I&apos;ve also helped US companies build technical and management teams in Taiwan, bridging cross-border culture and compensation gaps so both sides build trust from the first conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-alt py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-2xl font-medium text-navy mb-8 text-center">Our principles</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Personally handled', desc: 'From first contact to onboarding follow-up, every search is run by the consultant — never outsourced.' },
              { title: 'Only what we can see through', desc: 'We\'d rather make fewer placements than recommend something that won\'t hold up.' },
              { title: 'Confidentiality first', desc: 'Candidate and client data is seen only by the consultant, never shared without consent.' },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-xl border border-border-c p-6">
                <h3 className="font-medium text-navy mb-2">{v.title}</h3>
                <p className="text-sm text-slate leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-2xl font-medium text-warm-white mb-3">Want to learn how we work together?</h2>
          <p className="text-warm-white/55 text-sm mb-8">Whether you&apos;re hiring or considering your next move, we&apos;d love to hear from you.</p>
          <Link href="/en/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-medium hover:bg-gold-hover transition-colors text-sm">
            Contact us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </>
  )
}
