import type { Metadata } from 'next'
import ContactTabs from '@/features/contact/ContactTabs'

export const metadata: Metadata = {
  title: 'Contact us',
  description: 'Whether you\'re hiring or looking for your next role, we\'d love to hear from you.',
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy py-16 md:py-20 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
          <circle cx="80%" cy="30%" r="240" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <p className="text-xs tracking-[.12em] uppercase text-gold-muted mb-3">Get in touch</p>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-warm-white mb-3">Contact us</h1>
          <p className="text-warm-white/60 text-sm max-w-md">Whether you&apos;re hiring or looking for your next role, we&apos;d love to hear from you.</p>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-6">
        <ContactTabs lang="en" />
      </section>
    </>
  )
}
