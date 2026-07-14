import type { Metadata } from 'next'
import { asc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { awards } from '@/db/schema'
import AwardsMarquee from '@/components/frontend/AwardsMarquee'
import SafetyHotline from '@/components/frontend/SafetyHotline'
import { getLegalItems } from '@/lib/legal-data'
import { resolveAwardImageUrl } from '@/lib/award-storage'
import Image from 'next/image';

export const metadata: Metadata = {
  title: '法規與求職者資訊',
  description: '巨將人力資源顧問有限公司依就業服務法公開之許可證照、收費明細、契約範本與求職者權益資訊。',
}

/* PDF 上架、後台獎狀上傳後即時生效,不需重新 build */
export const dynamic = 'force-dynamic'

async function getAwards() {
  try {
    const rows = await db.select().from(awards).where(eq(awards.isActive, true)).orderBy(asc(awards.sortOrder), asc(awards.createdAt))
    return Promise.all(rows.map(async a => ({ ...a, imageUrl: await resolveAwardImageUrl(a.imageUrl) })))
  } catch {
    return []
  }
}

export default async function LegalPage() {
  const awardList = await getAwards()
  const { gov, docs } = await getLegalItems()

  return (
    <>
      {/* ── Hero — 全幅照片 + 許可徽章 ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 320 }}>
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=520&q=80&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,30,70,0.62)' }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 md:py-24">
          <p className="text-xs tracking-[.12em] uppercase text-accent font-medium mb-3">Compliance & Job Seeker Info</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">法規與求職者資訊</h1>
          <p className="text-[15px] text-white/75 max-w-2xl mb-6">
            本公司為合法立案之私立就業服務機構，依就業服務法相關規定公開證照、收費與求職者權益資訊。
          </p>
          {/* 許可徽章 */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/25 rounded-full pl-3 pr-5 py-2">
            <span className="w-7 h-7 rounded-full bg-success flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            </span>
            <span className="text-[13px] text-white/85">私立就業服務機構許可</span>
            <span className="text-[14px] font-bold text-white">北市就服字第0229號</span>
          </div>
        </div>
      </section>

      {/* ── 巨將文件下載 ── PDF 放 public/documents/ 後自動變成可下載 */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-dark mb-6">巨將文件下載</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {docs.map(d => {
              const ready = !!d.href
              return (
                <div key={d.zh} className="border border-border-c rounded-xl p-5 flex flex-col gap-2 hover:shadow-card transition-shadow">
                  <div className="w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div className="text-[15px] font-bold text-dark flex-1">{d.zh}</div>
                  {ready ? (
                    <a href={d.href!} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-brand hover:text-brand-hover inline-flex items-center gap-1">
                      查看文件（PDF）
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  ) : (
                    <span className="text-[12px] text-muted/70">文件整理中</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 求職安全導言 — 圖+文 ── */}
      <section className="bg-dark-light border-t border-border-c">
        <div className="max-w-[1200px] mx-auto px-6 pt-12">
          <div className="grid md:grid-cols-2 gap-8 items-center bg-white border border-border-c rounded-2xl overflow-hidden">
            <div className="relative h-56 md:h-full min-h-[220px]">
              <Image
                src="/images/legal.png"
                alt="顧問一對一諮詢"
                width={1000} 
                height={1000}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-7 md:py-10 md:pr-10">
              <p className="text-xs tracking-[.1em] uppercase text-accent font-medium mb-2">Job Search Safety</p>
              <h2 className="text-xl font-bold text-dark mb-3">求職安全,我們與您一起把關</h2>
              <p className="text-[14px] text-muted leading-relaxed mb-5">
                應徵工作時,對於資訊不清、要求先繳費用或標榜不合常理高薪的職缺,請務必提高警覺。
                本公司所有職缺均由顧問親自查核;若您在任何求職過程遇到疑慮,歡迎透過下方專線諮詢或檢舉。
              </p>
              <SafetyHotline lang="zh" variant="card" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 政府資訊與求職者權益 ── 外部連結一律另開分頁 */}
      <section className="bg-dark-light">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-dark mb-6">政府資訊與求職者權益</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gov.map(l => (
              <a
                key={l.zh}
                href={l.href ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-border-c rounded-xl p-5 flex flex-col gap-2 hover:shadow-card hover:border-brand/40 transition-all"
              >
                <span className="w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </span>
                <span className="text-[15px] font-bold text-dark flex-1">{l.zh}</span>
                <span className="text-[13px] font-medium text-brand">前往查看</span>
              </a>
            ))}

          </div>
        </div>
      </section>

      {/* ── 評鑑與獎項 ── 後台「獎項管理」上傳,自動跑馬燈輪播、點擊放大 */}
      <section className="bg-white border-t border-border-c">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-dark mb-2">評鑑與獎項</h2>
          <p className="text-[13px] text-muted mb-6">本公司歷年參加主管機關評鑑之成績與獲獎紀錄，點擊獎狀可放大檢視。</p>
          {awardList.length > 0 ? (
            <AwardsMarquee awards={awardList} lang="zh" />
          ) : (
            <p className="text-[13px] text-muted/70 border border-dashed border-border-strong rounded-xl py-10 text-center">獎狀圖檔準備中</p>
          )}
        </div>
      </section>
    </>
  )
}
