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

export const metadata: Metadata = {
  title: { default: '巨將人力資源 | 台灣專業人力資源顧問', template: '%s | 巨將人力資源' },
  description: '深耕台灣人才市場超過十五年，提供中高階職位媒合與跨台美人才服務。顧問親自全程跟案。',
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={geist.variable}>
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
