import Link from 'next/link'

const scope = [
  {
    no: '01',
    title: '中高階主管與關鍵職位獵才',
    desc: '鎖定具備管理能力與產業經驗的關鍵人才，滿足企業核心職務需求。',
  },
  {
    no: '02',
    title: '跨產業專業人才搜尋與轉介',
    desc: '運用人才資料庫與專業人脈網絡，快速接觸市場上合適的潛在人選。',
  },
  {
    no: '03',
    title: '專業評估與人才把關',
    desc: '從專業能力、管理風格、職涯經歷到企業文化適配度，多面向評估候選人。',
  },
  {
    no: '04',
    title: '保密招募與機密職缺委託',
    desc: '針對敏感或未公開職缺，以嚴謹流程保障企業與候選人的資訊安全。',
  },
  {
    no: '05',
    title: '薪酬市場資訊與招募諮詢',
    desc: '提供市場薪資趨勢、人才供需與招募策略建議，協助企業提升招募競爭力。',
  },
  {
    no: '06',
    title: '到職追蹤與長期服務',
    desc: '錄用不是終點。我們持續追蹤到職與適應狀況，協助企業與人才穩定發展。',
  },
]

const process = [
  {
    no: '01',
    title: '需求訪談與合作確認',
    desc: '深入了解企業組織、職務條件、人才輪廓與招募目標，制定搜尋策略並確認合作方式。',
  },
  {
    no: '02',
    title: '人才搜尋與專業評估',
    desc: '主動搜尋市場潛在人選，透過顧問訪談與資格評估，確認專業能力與職務適配度。',
  },
  {
    no: '03',
    title: '推薦人選與面談安排',
    desc: '提供精選候選人名單與評估資訊，協助安排面談、溝通回饋並加速招募決策。',
  },
  {
    no: '04',
    title: '錄用協調與到職追蹤',
    desc: '協助薪酬溝通、錄用流程與到職安排，並持續追蹤雙方適應狀況，確保人才穩定發展。',
  },
]

const consulting = ['組織架構優化建議', '薪酬市場基準調查', '人才盤點與規劃', '招募流程設計']

function SectionLabel({ en, zh }: { en?: string; zh: string }) {
  return (
    <h3 className="flex items-baseline gap-4 mb-8">
      {en && <span className="text-[13px] font-bold text-dark tracking-[.16em] uppercase">{en}</span>}
      <span className={en ? 'text-[13px] text-muted' : 'text-[13px] font-bold text-dark tracking-[.06em]'}>{zh}</span>
    </h3>
  )
}

export default function CorporateServices() {
  return (
    <>
      {/* ── 定位：非對稱雙欄 ── */}
      <section id="local" className="pt-20 pb-16 bg-white scroll-mt-20">
        <div className="max-w-content mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-[38px] leading-[1.25] font-bold text-dark mb-4">獵才服務</h2>
              <p className="text-[19px] leading-[1.6] font-bold text-brand mb-6">
                精準找到關鍵人才，為企業成長找到最佳夥伴
              </p>
              <p className="text-[15px] text-muted leading-[1.95] mb-4">
                從中高階主管、專業人才到關鍵職能，我們結合產業洞察、人才網絡與專業評估，深入理解企業文化、職務需求與組織發展方向，精準鎖定真正適合的人選。
              </p>
              <p className="text-[15px] text-muted leading-[1.95] mb-8">
                由專業獵才顧問全程協助，從需求釐清、人才搜尋、面談評估到錄用與到職追蹤，提供高效率、專業且保密的一站式獵才服務。
              </p>
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                <div>
                  <div className="text-[26px] font-bold text-dark leading-none">6<span className="text-[15px] text-muted font-medium ml-1">項</span></div>
                  <div className="text-[12px] text-muted mt-1.5">核心獵才服務</div>
                </div>
                <span className="w-px h-9 bg-border-c" />
                <div>
                  <div className="text-[26px] font-bold text-dark leading-none">4<span className="text-[15px] text-muted font-medium ml-1">階段</span></div>
                  <div className="text-[12px] text-muted mt-1.5">標準服務流程</div>
                </div>
                <span className="w-px h-9 bg-border-c" />
                <div>
                  <div className="text-[26px] font-bold text-dark leading-none">全程保密</div>
                  <div className="text-[12px] text-muted mt-1.5">一站式顧問服務</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -bottom-4 -left-4 w-28 h-28 rounded-xl bg-accent-light hidden lg:block" aria-hidden="true" />
              <div className="relative rounded-xl overflow-hidden h-[300px] shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=840&h=600&q=80&fit=crop"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 核心獵才服務：編號索引列 ── */}
      <section className="pb-20 bg-white">
        <div className="max-w-content mx-auto px-6">
          <SectionLabel en="Scope" zh="核心獵才服務" />
          <ul className="grid md:grid-cols-2 gap-x-16">
            {scope.map(({ no, title, desc }) => (
              <li key={no} className="group relative py-7 border-b border-border-c">
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-[width] duration-300 ease-out group-hover:w-full"
                  aria-hidden="true"
                />
                <span className="block text-[13px] font-bold text-border-strong tabular-nums tracking-[.1em] mb-3 transition-colors duration-200 group-hover:text-accent">
                  {no}
                </span>
                <h4 className="text-[17px] font-bold text-dark mb-2 transition-colors duration-200 group-hover:text-brand">
                  {title}
                </h4>
                <p className="text-[14px] text-muted leading-[1.85] max-w-[380px]">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 服務流程：卡片 + 箭頭 ── */}
      <section className="py-20 bg-dark-light">
        <div className="max-w-content mx-auto px-6">
          <SectionLabel en="Process" zh="我們的獵才服務流程" />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {process.map(({ no, title, desc }, i) => (
              <li key={no} className="relative">
                {i < process.length - 1 && (
                  <span
                    className="hidden lg:flex absolute top-1/2 -right-[18px] w-[18px] -translate-y-1/2 items-center justify-center text-accent z-10"
                    aria-hidden="true"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
                <div className="group h-full rounded-xl bg-white ring-1 ring-border-c shadow-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:ring-accent">
                  <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-border-c">
                    <span className="w-9 h-9 rounded-lg bg-dark text-white text-[13px] font-bold tabular-nums flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-accent">
                      {no}
                    </span>
                    <span className="text-[11px] font-bold text-muted tracking-[.12em] uppercase">Step</span>
                  </div>
                  <h4 className="text-[16px] font-bold text-dark mb-2.5">{title}</h4>
                  <p className="text-[13.5px] text-muted leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 顧問項目：深色帶 ── */}
      <section id="solutions" className="py-16 bg-dark scroll-mt-20">
        <div className="max-w-content mx-auto px-6">
          <div className="lg:flex lg:items-start lg:gap-16">
            <div className="lg:w-[340px] flex-shrink-0 mb-8 lg:mb-0">
              <h3 className="text-[24px] font-bold text-white mb-4">企業人才解決方案</h3>
              <p className="text-[14px] text-white/60 leading-[1.9]">
                問題不只是缺人時，以下項目可獨立於獵才案件單獨委託。
              </p>
            </div>
            <ul className="flex-1 grid sm:grid-cols-2 gap-x-12">
              {consulting.map((item, i) => (
                <li key={item} className="flex items-center gap-4 py-4 border-b border-white/10">
                  <span className="text-[12px] font-bold text-accent tabular-nums">0{i + 1}</span>
                  <span className="text-[15px] text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 立即委託獵才 ── */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-6">
          <div className="rounded-2xl bg-dark-light px-8 py-10 md:px-12 md:flex md:items-center md:justify-between gap-12">
            <div className="mb-7 md:mb-0">
              <SectionLabel en="Get Started" zh="立即委託獵才" />
              <h3 className="text-[24px] font-bold text-dark mb-3">正在尋找關鍵人才？</h3>
              <p className="text-[14.5px] text-muted leading-[1.9] max-w-xl">
                告訴我們您的招募需求，由專業獵才顧問為您啟動人才搜尋，精準找到最適合企業發展的關鍵夥伴。
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-[15px] bg-brand flex-shrink-0 transition-colors duration-200 hover:bg-brand-hover"
            >
              立即委託獵才
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
