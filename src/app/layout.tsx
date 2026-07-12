import type { Metadata } from 'next'
import localFont from 'next/font/local'
import QueryProvider from '@/components/ui/QueryProvider'
import './globals.css'

// Use system fonts as local fallbacks — Google Fonts loaded via CSS in globals
const geist = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.jujianghr.com.tw'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: '巨將人力資源 | 台灣專業人力資源顧問', template: '%s | 巨將人力資源' },
  description: '巨將人力資源顧問有限公司深耕台灣人才市場,提供中高階職位媒合、企業獵才委託與跨台美人才服務,深耕傳統製造、電子科技、醫療美容、3C服務業。許可字號:北市就服字第0229號。',
  keywords: ['獵頭', '獵才', '人力資源顧問', '中高階人才', '人才媒合', '台北獵頭公司', 'executive search', 'headhunter Taiwan'],
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/',
    languages: { 'zh-TW': '/', en: '/en' },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: siteUrl,
    siteName: '巨將人力資源顧問有限公司',
    title: '巨將人力資源 | 台灣專業人力資源顧問',
    description: '深耕台灣人才市場,提供中高階職位媒合與企業人才解決方案。',
    images: [{ url: '/images/logo.png', width: 1024, height: 1024, alt: '巨將人力資源顧問有限公司' }],
  },
  twitter: {
    card: 'summary',
    title: '巨將人力資源 | 台灣專業人力資源顧問',
    description: '深耕台灣人才市場,提供中高階職位媒合與企業人才解決方案。',
    images: ['/images/logo.png'],
  },
}

/* Organization 結構化資料 — 搜尋結果顯示公司資訊 */
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EmploymentAgency',
  name: '巨將人力資源顧問有限公司',
  alternateName: 'Ju Jiang Human Resources Consultant Co., Ltd.',
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  telephone: '+886-2-2356-9977',
  email: 'service@jujianghr.com.tw',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '大安區信義路二段28號4樓',
    addressLocality: '台北市',
    postalCode: '106001',
    addressCountry: 'TW',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={geist.variable}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
