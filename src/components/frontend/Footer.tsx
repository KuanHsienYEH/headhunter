import Link from 'next/link'
import zhMsg from '../../../messages/zh.json'
import enMsg from '../../../messages/en.json'

interface FooterProps {
  lang: 'zh' | 'en'
  licenseNumber?: string
}

export default function Footer({ lang, licenseNumber = 'XXXXXXXX' }: FooterProps) {
  const t    = lang === 'en' ? enMsg : zhMsg
  const base = lang === 'en' ? '/en' : ''

  const navLinks = [
    { href: `${base}/about`,    label: t.nav.about    },
    { href: `${base}/services`, label: t.nav.services },
    { href: `${base}/jobs`,     label: t.nav.jobs     },
    { href: `${base}/insights`, label: t.nav.insights },
    { href: `${base}/contact`,  label: t.nav.contact  },
  ]

  const serviceLinks = [
    { href: `${base}/services#local`,       label: t.services.local_title       },
    { href: `${base}/services#crossborder`, label: t.services.crossborder_title },
    { href: `${base}/services#jobseeker`,   label: t.services.jobseeker_title   },
    { href: `${base}/about#credentials`,    label: lang === 'en' ? 'Credentials & Awards' : '執照與獎項' },
  ]

  return (
    <footer className="bg-gray-900">
      {/* Main grid */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-display text-lg font-medium text-warm-white mb-3">
              獵才顧問
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-5 max-w-[220px]">
              {t.footer.tagline}
            </p>
            {/* License badge */}
            <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-lg p-3">
              <svg className="w-4 h-4 text-gold-muted mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <div>
                <div className="text-xs text-white/50 leading-relaxed">
                  {t.footer.trust_license ?? t.home.trust_license}
                </div>
                <div className="text-xs text-gold-muted font-medium mt-0.5">
                  {lang === 'en' ? `License No.: ${licenseNumber}` : `許可字號：${licenseNumber}`}
                </div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div>
            <div className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4">
              {t.footer.nav}
            </div>
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} className="block text-sm text-white/55 hover:text-white mb-2.5 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <div className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4">
              {t.footer.services_col}
            </div>
            {serviceLinks.map(l => (
              <Link key={l.href} href={l.href} className="block text-sm text-white/55 hover:text-white mb-2.5 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Legal links */}
          <div>
            <div className="text-xs font-medium text-white/40 uppercase tracking-widest mb-3">
              {t.footer.legal}
            </div>
            <p className="text-xs text-white/35 leading-relaxed mb-4">
              {t.footer.legal_note}
            </p>
            {t.footer.legal_links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-white/50 hover:text-white mb-3 group"
              >
                <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-white/25 group-hover:text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <div>
                  <div className="text-xs font-medium text-white/60 group-hover:text-white leading-tight">
                    {l.name}
                  </div>
                  <div className="text-xs text-white/30 mt-0.5">{l.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Appeal notice */}
        <div className="py-4 border-b border-white/10 flex items-start gap-2.5">
          <svg className="w-4 h-4 text-white/25 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-xs text-white/30 leading-relaxed">{t.footer.appeal}</p>
        </div>

        {/* Bottom bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-xs text-white/30">
            © {new Date().getFullYear()} 獵才顧問事務所 · {lang === 'en' ? `License No.: ${licenseNumber}` : `許可字號 ${licenseNumber}`}
          </span>
          <div className="flex gap-5">
            <Link href={`${base}/privacy`} className="text-xs text-white/30 hover:text-white/60 transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href={`${base}/terms`} className="text-xs text-white/30 hover:text-white/60 transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
