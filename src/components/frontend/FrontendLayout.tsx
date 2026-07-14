import Navbar from '@/components/frontend/Navbar'
import Footer from '@/components/frontend/Footer'
import AnnouncementTicker from '@/components/frontend/AnnouncementTicker'

interface FrontendLayoutProps {
  children: React.ReactNode
  lang: 'zh' | 'en'
}

export default function FrontendLayout({ children, lang }: FrontendLayoutProps) {
  return (
    <>
      <Navbar lang={lang} />
      <main className="pt-[64px]">{children}</main>
      <Footer lang={lang} licenseNumber="北市就服字第0229號" />
      <AnnouncementTicker />
    </>
  )
}
