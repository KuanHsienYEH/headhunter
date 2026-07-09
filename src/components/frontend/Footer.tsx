import Link from 'next/link'
import BrandLogo from './BrandLogo'

interface FooterProps {
  lang: 'zh' | 'en'
  licenseNumber?: string
}

export default function Footer({ lang, licenseNumber = '北市就服字第0229號' }: FooterProps) {
  const isEn = lang === 'en'
  const base = isEn ? '/en' : ''

  const navLinks = [
    { href: `${base}/about`,    label: isEn ? 'About Us'      : '關於我們' },
    { href: `${base}/jobs`,     label: isEn ? 'Openings'       : '求職專區' },
    { href: `${base}/services`, label: isEn ? 'Employer Zone'  : '企業專區' },
    { href: `${base}/insights`, label: isEn ? 'Insights'       : '產業觀察' },
    { href: `${base}/contact`,  label: isEn ? 'Contact Us'     : '聯絡我們' },
  ]

  const serviceLinks = [
    { href: `${base}/services#local`,       label: isEn ? 'Executive Search'        : '台灣本地獵才' },
    { href: `${base}/services#crossborder`, label: isEn ? 'Cross-border Placement'  : '跨台美人才媒合' },
    { href: `${base}/services#jobseeker`,   label: isEn ? 'Confidential Job Search' : '求職者保密媒合' },
  ]

  return (
    <footer style={{ background: '#333F4F' }}>
      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-10 border-b border-white/10">

          {/* Brand col */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <BrandLogo variant="light" />
            </div>
            <p className="text-[13px] text-white/55 leading-relaxed mb-5">
              {isEn
                ? 'Trusted partner for mid-to-senior talent search in Taiwan and cross-border placements.'
                : '深耕台灣人才市場，提供中高階職位媒合與企業人才解決方案。'}
            </p>
            <div className="flex items-start gap-2 bg-white/8 border border-white/10 rounded-lg p-3">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#27AE60" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <div>
                <div className="text-xs text-white/50">{isEn ? 'Licensed Private Employment Agency' : '私立就業服務機構許可'}</div>
                <div className="text-xs text-[#27AE60] font-medium mt-0.5">{isEn ? `License: ${licenseNumber}` : `許可字號：${licenseNumber}`}</div>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">{isEn ? 'Navigation' : '快速連結'}</div>
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} className="block text-[13px] text-white/55 hover:text-white mb-2.5 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">{isEn ? 'Services' : '服務項目'}</div>
            {serviceLinks.map(l => (
              <Link key={l.href} href={l.href} className="block text-[13px] text-white/55 hover:text-white mb-2.5 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">{isEn ? 'Legal' : '法令專區'}</div>
            <div className="space-y-2.5">
              <Link href={`${base}/legal`} className="block text-[13px] text-white/55 hover:text-white transition-colors">
                {isEn ? 'Compliance & Job Seeker Info' : '法規與求職者資訊'}
              </Link>
              <Link href={`${base}/contact`} className="block text-[13px] text-white/55 hover:text-white transition-colors">
                {isEn ? 'Privacy Policy' : '隱私權政策'}
              </Link>
              <Link href={`${base}/contact`} className="block text-[13px] text-white/55 hover:text-white transition-colors">
                {isEn ? 'Terms of Service' : '服務條款'}
              </Link>
              <Link href={`${base}/contact`} className="block text-[13px] text-white/55 hover:text-white transition-colors">
                {isEn ? 'Personal Data Notice' : '個資使用說明'}
              </Link>
              <Link href={`${base}/contact`} className="block text-[13px] text-white/55 hover:text-white transition-colors">
                {isEn ? 'Cookie Policy' : 'Cookie 政策'}
              </Link>
              <div className="pt-2 border-t border-white/10">
                <p className="text-[11px] text-white/30 leading-relaxed">
                  {isEn
                    ? 'Licensed by Ministry of Labor, R.O.C.'
                    : '本公司依就業服務法第35條規定，持有私立就業服務機構許可證。'}
                </p>
              </div>
            </div>
          </div>

          {/* Contact info */}
          {/* <div>
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">{isEn ? 'Contact' : '聯絡資訊'}</div>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="text-[13px] text-white/55">(02) 2356-9977</span>
              </div>
              <div className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="text-[13px] text-white/55">service@jujianghr.com.tw</span>
              </div>
              <div className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-[13px] text-white/55">
                  {isEn
                    ? "4F., No. 28, Sec. 2, Xinyi Rd., Da'an Dist., Taipei City 106001"
                    : '106001 台北市大安區信義路二段28號4樓（捷運東門站3號出口）'}
                </span>
              </div>
            </div>
          </div> */}
        </div>

        {/* Bottom bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="text-xs text-white/30">
            © {new Date().getFullYear()} 巨將人力資源顧問有限公司 · {isEn ? `License: ${licenseNumber}` : `許可字號 ${licenseNumber}`}
          </span>
          <div className="text-xs text-white/30">
            {isEn ? 'All rights reserved.' : '版權所有 · 禁止轉載'}
          </div>
        </div>
      </div>
    </footer>
  )
}
