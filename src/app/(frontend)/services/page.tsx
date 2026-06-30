import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '服務項目',
  description: '台灣本地獵才、跨台美人才媒合、求職者保密媒合 — 三種服務，共同的承諾：顧問親自全程執行。',
}

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy px-6 md:px-8 py-[52px] text-center">
        <p className="text-xs tracking-[.1em] uppercase text-gold-muted mb-2.5">Services</p>
        <h1 className="font-display text-[32px] font-medium text-warm-white mb-2.5">我們提供什麼</h1>
        <p className="text-sm text-warm-white/60 max-w-lg mx-auto">三種服務，共同的承諾：顧問親自全程執行，不假手他人。</p>
      </section>

      {/* Service 01 — Local */}
      <section className="py-16 px-6 md:px-8">
        <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">Service 01</p>
        <div className="grid md:grid-cols-[1fr_320px] gap-12 items-start">
          <div>
            <h2 className="font-display text-[26px] font-medium text-navy mb-1.5">台灣本地獵才</h2>
            <p className="text-sm text-slate leading-relaxed mb-4">協助台灣企業尋找中高階主管。從需求釐清、市場搜尋、人選評估，到最終的 offer 談判，全程由我親自執行。</p>
            <p className="text-sm text-slate leading-relaxed">適合對象：台灣本地企業或外商在台子公司，需要填補 VP 級以上或關鍵總監職缺。</p>
            <div className="flex gap-3 flex-wrap mt-7">
              <Link href="/contact" className="inline-flex items-center gap-1.5 px-[22px] py-[11px] rounded-full bg-gold text-white text-sm font-medium hover:bg-gold-hover transition-colors">
                立即委託
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <a href="#process" className="inline-flex items-center gap-1.5 px-[21px] py-2.5 rounded-full border-[1.5px] border-navy text-navy text-sm">了解流程</a>
            </div>
          </div>
          <div className="bg-white border border-border-c rounded-xl p-6">
            <div className="flex items-center gap-2 text-[13px] font-medium text-navy mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
              服務包含
            </div>
            {[
              ['target', '需求深度訪談，釐清職位真正的要求'],
              ['search', '主動搜尋，不限於求職者資料庫'],
              ['user-check', '人選背景調查與評估報告'],
              ['messages', '面試安排與雙向溝通橋接'],
              ['file-dollar', 'Offer 談判與到職後 90 天追蹤'],
            ].map(([, label]) => (
              <div key={label} className="flex gap-2.5 text-[13px] text-slate leading-relaxed py-2.5 border-b border-warm-alt last:border-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-border-c mx-6 md:mx-8" />

      {/* Service 02 — Cross-border */}
      <section className="py-16 px-6 md:px-8">
        <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">Service 02</p>
        <div className="grid md:grid-cols-[1fr_320px] gap-12 items-start">
          <div>
            <h2 className="font-display text-[26px] font-medium text-navy mb-1.5">跨台美人才媒合</h2>
            <p className="text-sm text-slate leading-relaxed mb-4">協助美國公司在台灣找到合適的技術與管理人才。我們橋接兩地之間的薪酬落差、文化差異與雇用法規，讓整個流程更順暢。</p>
            <p className="text-sm text-slate leading-relaxed">適合對象：在台設有子公司或遠端雇用台灣人才的美國公司。</p>
            <div className="grid sm:grid-cols-2 gap-3 my-5">
              {[
                '不了解台灣薪酬水準，開出的 offer 沒有吸引力',
                'JD 寫法不符合台灣求職者的期望與語境',
                '跨時區面試流程，協調費時且候選人流失率高',
                '不熟悉台灣勞動法規，雇用合約有潛在風險',
              ].map((p) => (
                <div key={p} className="bg-white border border-border-c rounded-lg p-3.5 flex gap-2.5">
                  <span className="text-gold text-lg flex-shrink-0">!</span>
                  <div className="text-[13px] text-slate leading-relaxed">{p}</div>
                </div>
              ))}
            </div>
            <Link href="/contact" className="inline-flex items-center gap-1.5 px-[22px] py-[11px] rounded-full bg-gold text-white text-sm font-medium hover:bg-gold-hover transition-colors">
              與我討論需求
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="bg-white border border-border-c rounded-xl p-6">
            <div className="flex items-center gap-2 text-[13px] font-medium text-navy mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
              我們幫您解決
            </div>
            {[
              '提供台灣同職級薪酬市場數據',
              '協助修改 JD，使其對台灣人才有吸引力',
              '代為安排跨時區面試，降低候選人流失',
              '勞動法規合規建議（非法律服務）',
              '全程英文溝通，中英文雙語候選人報告',
            ].map((label) => (
              <div key={label} className="flex gap-2.5 text-[13px] text-slate leading-relaxed py-2.5 border-b border-warm-alt last:border-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-border-c mx-6 md:mx-8" />

      {/* Service 03 — Jobseeker */}
      <section className="py-16 px-6 md:px-8">
        <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">Service 03</p>
        <div className="grid md:grid-cols-[1fr_320px] gap-12 items-start">
          <div>
            <h2 className="font-display text-[26px] font-medium text-navy mb-1.5">求職者媒合</h2>
            <p className="text-sm text-slate leading-relaxed mb-4">為中高階主管提供保密的職涯媒合服務。您不需要主動投遞職缺，只需讓我了解您的方向，我會在有合適機會時主動聯繫。</p>
            <p className="text-sm text-slate leading-relaxed">適合對象：VP 級以上主管，正在考慮職涯下一步，但不方便在市場上公開求職。</p>
            <div className="bg-[#F0FDF4] border border-[#86EFAC] rounded-[10px] p-[18px] flex gap-3.5 items-start my-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600 flex-shrink-0" aria-hidden="true"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-12V7a4 4 0 00-8 0v4h8z" /></svg>
              <div className="text-[13px] text-emerald-900 leading-relaxed">
                <strong className="text-emerald-950">資料保密承諾</strong>：您的履歷以加密方式儲存，僅供顧問本人閱覽，不對外公開、不轉介、不販售。任何時候皆可要求刪除全部資料，個人資料依個資法處理。
              </div>
            </div>
            <Link href="/contact#resume" className="inline-flex items-center gap-1.5 px-[22px] py-[11px] rounded-full bg-gold text-white text-sm font-medium hover:bg-gold-hover transition-colors">
              上傳履歷
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="bg-white border border-border-c rounded-xl p-6">
            <div className="flex items-center gap-2 text-[13px] font-medium text-navy mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 16v-4m0-4h.01" /></svg>
              如何運作
            </div>
            {[
              '上傳履歷，填寫基本方向與期望',
              '顧問在 2 個工作日內聯繫，了解您的背景',
              '有合適機會時，顧問主動通知您',
              '由您決定是否進一步接觸，無任何義務',
            ].map((label) => (
              <div key={label} className="flex gap-2.5 text-[13px] text-slate leading-relaxed py-2.5 border-b border-warm-alt last:border-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span>{label}</span>
              </div>
            ))}
            <div className="mt-3.5 pt-3.5 border-t border-border-c text-xs text-slate/70">求職者服務完全免費。<br />服務費由委託企業支付。</div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-navy py-16 px-6 md:px-8 scroll-mt-16">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs tracking-[.1em] uppercase text-gold-muted mb-2">Process</p>
          <h2 className="font-display text-[26px] font-medium text-warm-white mb-2">合作流程</h2>
          <p className="text-sm text-warm-white/65">企業委託從第一通電話到人選到位，通常需要 6–10 週。</p>
        </div>
        <div className="max-w-lg mx-auto mt-8 flex flex-col">
          {[
            { num: '01', title: '初步諮詢', desc: '30 分鐘電話或視訊，了解職位背景與期望。此階段免費，無任何義務。', note: '免費 · 約 30 分鐘' },
            { num: '02', title: '需求確認與合約簽署', desc: '確認職位規格、薪酬預算、時程期望，雙方簽署服務合約後正式開案。' },
            { num: '03', title: '主動搜尋與人選評估', desc: '顧問主動搜尋候選人，進行初步訪談與評估，提交 2–4 位入圍名單與報告。', note: '約 3–5 週' },
            { num: '04', title: '面試安排與 Offer 談判', desc: '安排雙方面試，協助談判 offer，到職後 90 天追蹤期，確保雙方滿意。' },
          ].map((s, i, arr) => (
            <div key={s.num} className={`flex gap-5 py-5 ${i < arr.length - 1 ? 'border-b border-warm-white/10' : ''}`}>
              <div className="w-9 h-9 rounded-full border-[1.5px] border-gold-muted/50 flex items-center justify-center font-display text-sm text-gold-muted flex-shrink-0">{s.num}</div>
              <div>
                <div className="text-[15px] font-medium text-warm-white mb-1">{s.title}</div>
                <div className="text-[13px] text-warm-white/60 leading-relaxed">{s.desc}</div>
                {s.note && <div className="text-[11px] text-gold-muted mt-1">{s.note}</div>}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-lg mx-auto bg-warm-white/[0.06] border border-warm-white/15 rounded-[10px] p-[18px] mt-7">
          <div className="text-xs text-warm-white/50 uppercase tracking-[.06em] mb-2">費用說明</div>
          <div className="text-[13px] text-warm-white/75 leading-relaxed">服務費於人選正式到職後收取，依職位年薪的一定比例計算。初步諮詢完全免費，正式開案前會提供清楚的費用說明。</div>
        </div>
        <div className="text-center mt-10">
          <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gold text-white text-sm font-medium hover:bg-gold-hover transition-colors">
            預約初步諮詢
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </>
  )
}
