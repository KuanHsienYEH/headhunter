import type { Metadata } from 'next'
import { Inter, Playfair_Display, Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })
const notoSans = Noto_Sans_TC({ subsets: ['chinese-traditional'], weight: ['400','500','700'], variable: '--font-noto-sans', display: 'swap' })
const notoSerif = Noto_Serif_TC({ subsets: ['chinese-traditional'], weight: ['400','500','700'], variable: '--font-noto-serif', display: 'swap' })

export const metadata: Metadata = {
  title: { default: '獵才顧問 | 台灣精品獵頭', template: '%s | 獵才顧問' },
  description: '深耕台灣人才市場超過十五年，提供中高階職位媒合與跨台美人才服務。顧問親自全程跟案。',
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={`${inter.variable} ${playfair.variable} ${notoSans.variable} ${notoSerif.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
