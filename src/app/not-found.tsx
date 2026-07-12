import Link from 'next/link'
import FrontendLayout from '@/components/frontend/FrontendLayout'

/* 全站 404 — 帶入完整導覽與所有主要 call-to-action */

const quickLinks = [
  { href: '/jobs',     title: '求職專區', desc: '瀏覽目前媒合中的中高階職缺' },
  { href: '/services', title: '企業專區', desc: '委託獵才與人才解決方案' },
  { href: '/about',    title: '關於巨將', desc: '認識我們的團隊與服務理念' },
  { href: '/insights', title: '產業觀察', desc: '人才市場趨勢與職涯洞察' },
  { href: '/legal',    title: '法規資訊', desc: '證照、收費與求職者權益' },
  { href: '/contact',  title: '聯絡我們', desc: '專人服務,歡迎與我們聯繫' },
]

export default function NotFound() {
  return (
    <FrontendLayout lang="zh">
      <section className="bg-brand-light border-b border-border-c">
        <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
          <p className="text-[64px] md:text-[88px] font-bold text-brand/20 leading-none mb-2">404</p>
          <h1 className="text-2xl md:text-3xl font-bold text-dark mb-3">找不到這個頁面</h1>
          <p className="text-[15px] text-muted max-w-md mx-auto mb-8">
            您要找的頁面可能已移除、更名,或暫時無法使用。以下入口或許能帶您到想去的地方。
          </p>
          {/* 主要 CTA */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm bg-brand hover:bg-brand-hover transition-colors"
            >
              回到首頁
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm bg-accent hover:bg-accent-hover transition-colors"
            >
              瀏覽職缺
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border border-border-strong text-dark hover:border-brand hover:text-brand transition-colors bg-white"
            >
              尋找人才(企業委託)
            </Link>
          </div>
        </div>
      </section>

      {/* 全站入口 */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="border border-border-c rounded-xl p-5 hover:border-brand/40 hover:shadow-card transition-all group"
              >
                <div className="text-[15px] font-bold text-dark mb-1">{l.title}</div>
                <p className="text-[13px] text-muted mb-3">{l.desc}</p>
                <span className="text-[13px] font-medium text-brand inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  前往
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </Link>
            ))}
          </div>

          {/* 聯絡資訊 */}
          <div className="mt-8 bg-dark-light rounded-xl p-6 text-center">
            <p className="text-[13px] text-muted">
              找不到您需要的資訊?歡迎來電 <span className="font-bold text-dark">(02) 2356-9977</span> 或來信
              <a href="mailto:service@jujianghr.com.tw" className="font-bold text-brand ml-1 hover:underline">service@jujianghr.com.tw</a>
            </p>
          </div>
        </div>
      </section>
    </FrontendLayout>
  )
}
