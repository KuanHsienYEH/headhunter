import type { Metadata } from 'next'
import ContactTabs from '@/features/contact/ContactTabs'

export const metadata: Metadata = {
  title: '與我聯絡',
  description: '無論您是企業招募窗口，還是正在尋找下一個職涯機會的人選，都歡迎留下訊息。',
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
          <h1 className="font-display text-3xl md:text-4xl font-medium text-warm-white mb-3">與我聯絡</h1>
          <p className="text-warm-white/60 text-sm max-w-md">無論您是企業招募窗口，還是正在尋找下一個職涯機會的人選，都歡迎留下訊息。</p>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-6">
        <ContactTabs lang="zh" />
      </section>
    </>
  )
}
