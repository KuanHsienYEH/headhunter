import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '法規與求職者資訊',
  description: '巨將人力資源顧問有限公司依就業服務法公開之許可證照、收費明細、契約範本與求職者權益資訊。',
}

/* 文件類項目 — 使用者提供檔案後,將 file 換成 /documents/ 下的實際路徑 */
const documents = [
  { title: '就業服務機構許可證', desc: '臺北市政府勞動局核發,許可字號:北市就服字第0229號。', file: null },
  { title: '收費項目金額明細表', desc: '依就業服務法規定公開各項服務收費項目與金額。', file: null },
  { title: '就業服務專業證書', desc: '本公司就業服務專業人員均領有合格專業證書。', file: null },
  { title: '職業介紹服務及定型化契約', desc: '職業介紹服務定型化契約範本,供求職者與雇主參閱。', file: null },
  { title: '性騷擾防治措施、申訴及懲戒辦法', desc: '依性別平等工作法訂定之防治措施、申訴管道及懲戒規定。', file: null },
]

const infoItems = [
  {
    title: '求職安全諮詢',
    body: '求職過程中如對職缺內容、面試安排或勞動條件有任何疑慮，歡迎來電 (02) 2356-9977 洽詢，顧問將提供專業建議與協助。',
  },
  {
    title: '就業歧視防治',
    body: '依就業服務法第 5 條規定，雇主不得以種族、階級、語言、思想、宗教、黨派、籍貫、出生地、性別、性傾向、年齡、婚姻、容貌、五官、身心障礙、星座、血型或以往工會會員身分為由予以歧視。本公司於媒合過程中嚴格遵守相關規定。',
  },
  {
    title: '申訴處理機制',
    body: '如對本公司服務有任何申訴，請洽申訴專線 (02) 2356-9977（聯絡人：張小姐），或來信 service@jujianghr.com.tw，我們將儘速回覆並妥善處理。',
  },
  {
    title: '求職防詐騙',
    body: '求職時請謹記「七不原則」：不繳錢、不購買、不辦卡、不簽約、證件不離身、不飲用不明飲品、不從事非法工作。如遇可疑職缺，請立即向本公司或勞動主管機關反映。',
  },
]

export default function LegalPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-light border-b border-border-c">
        <div className="max-w-[1200px] mx-auto px-6 py-14">
          <p className="text-xs tracking-[.12em] uppercase text-accent font-medium mb-3">Compliance & Job Seeker Info</p>
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-3">法規與求職者資訊</h1>
          <p className="text-[15px] text-muted max-w-2xl">
            本公司為合法立案之私立就業服務機構（許可字號：北市就服字第0229號），依就業服務法相關規定公開證照、收費與求職者權益資訊。
          </p>
        </div>
      </section>

      {/* ── 證照與文件 ── */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-dark mb-6">證照與文件</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map(d => (
              <div key={d.title} className="border border-border-c rounded-xl p-5 flex flex-col gap-2 hover:shadow-card transition-shadow">
                <div className="w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div className="text-[15px] font-bold text-dark">{d.title}</div>
                <p className="text-[13px] text-muted leading-relaxed flex-1">{d.desc}</p>
                {d.file ? (
                  <a href={d.file} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-brand hover:text-brand-hover inline-flex items-center gap-1">
                    查看文件
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                ) : (
                  <span className="text-[12px] text-muted/70">文件掃描檔整理中</span>
                )}
              </div>
            ))}

            {/* 外部連結:雇主違反公告 */}
            <a
              href="https://announcement.mol.gov.tw/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border-c rounded-xl p-5 flex flex-col gap-2 hover:shadow-card hover:border-brand/40 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
              <div className="text-[15px] font-bold text-dark">雇主違反公告連結</div>
              <p className="text-[13px] text-muted leading-relaxed flex-1">勞動部「違反勞動法令事業單位（雇主）查詢系統」，供求職者查詢企業違規紀錄。</p>
              <span className="text-[13px] font-medium text-brand inline-flex items-center gap-1">前往查詢</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 求職者權益 ── */}
      <section className="bg-dark-light border-t border-border-c">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-dark mb-6">求職者權益</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {infoItems.map(item => (
              <div key={item.title} className="bg-white border border-border-c rounded-xl p-6">
                <div className="text-[15px] font-bold text-dark mb-2">{item.title}</div>
                <p className="text-[13px] text-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 評鑑與獎項 ── 獎狀圖檔提供後放入 public/images/awards/ 並填入下方陣列 */}
      <section className="bg-white border-t border-border-c">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-dark mb-2">評鑑與獎項</h2>
          <p className="text-[13px] text-muted mb-6">本公司歷年參加主管機關評鑑之成績與獲獎紀錄。</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-[3/4] rounded-xl border border-dashed border-border-strong bg-dark-light flex flex-col items-center justify-center gap-2 text-muted/60">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                </svg>
                <span className="text-[12px]">獎狀圖檔準備中</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
