import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '關於我們',
  description: '深耕台灣人才市場超過十五年，保持精品規模，每一個委託顧問親自全程跟案。',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-6 md:px-8 pt-14 pb-12 grid md:grid-cols-[1fr_240px] gap-12 items-end">
        <div>
          <p className="text-xs tracking-[.1em] uppercase text-gold-muted mb-2.5">About</p>
          <h1 className="font-display text-4xl font-medium text-warm-white leading-[1.2] mb-3">
            深耕台灣，<br />選擇精品
          </h1>
          <p className="text-sm text-warm-white/60 leading-relaxed max-w-md">
            十五年來，我從未追求規模。保持小，是因為只有這樣，我才能對每一個委託負責到底。
          </p>
        </div>
        <div className="aspect-[4/5] bg-navy-hover rounded-xl flex items-center justify-center">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-warm-white/20" aria-hidden="true">
            <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
      </section>

      {/* My story */}
      <section className="py-16 px-6 md:px-8">
        <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">My story</p>
        <h2 className="font-display text-[26px] font-medium text-navy mb-5 leading-snug">顧問的故事</h2>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="text-sm text-slate leading-[1.85] flex flex-col gap-4">
            <p>進入獵頭這行之前，我在科技業做過工程師，在金融業做過管理職。我知道「被推薦」是什麼感覺——被一個根本不了解你的人，把你的履歷丟給不適合你的公司。</p>
            <p>所以當我決定自己做獵頭，我只給自己一個規則：我不推薦任何一個我自己不敢掛名的人選。</p>
            <p>十五年過去，公司還是只有我一個人。不是因為接不到案子，而是因為我不願意讓業績壓力改變這個規則。每一個委託，從第一通電話到人選到位，都是我親自執行。</p>
            <p>這讓我能做的案子很有限——但也讓每一個案子都值得信賴。</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-border-c rounded-xl p-5">
              <div className="text-xs text-gold font-medium mb-1.5">深耕年資</div>
              <div className="font-display text-[28px] font-medium text-navy">15+ 年</div>
              <div className="text-xs text-slate mt-1">專注台灣中高階人才市場</div>
            </div>
            <div className="bg-white border border-border-c rounded-xl p-5">
              <div className="text-xs text-gold font-medium mb-2">專長產業</div>
              <div className="flex flex-wrap gap-1.5">
                {['科技業', '金融業', '消費品', '製造業'].map((t) => (
                  <span key={t} className="inline-flex px-2.5 py-1 rounded-full bg-blue-50 text-navy text-xs">{t}</span>
                ))}
              </div>
            </div>
            <div className="bg-white border border-border-c rounded-xl p-5">
              <div className="text-xs text-gold font-medium mb-2">專注職能層級</div>
              <div className="flex flex-wrap gap-1.5">
                {['C-level', 'VP / 副總', '總監級', '技術主管'].map((t) => (
                  <span key={t} className="inline-flex px-2.5 py-1 rounded-full bg-blue-50 text-navy text-xs">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-warm-alt py-16 px-6 md:px-8">
        <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">Philosophy</p>
        <h2 className="font-display text-[26px] font-medium text-navy mb-5 leading-snug">我的三個工作原則</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { num: '01', title: '只接有把握的案子', body: '每個委託我都會先評估：這個職位我有能力找到合適的人嗎？如果沒有，我會直說，而不是接了再說。' },
            { num: '02', title: '顧問親自全程跟案', body: '從需求釐清到人選面試到 offer 談判，全部由我親自執行。您不會接到不知道您案子的助理電話。' },
            { num: '03', title: '台灣市場的深度專業', body: '在台灣工作十五年，我了解這裡的薪酬結構、企業文化、以及什麼樣的人才真的能在這個環境成功。' },
          ].map((p) => (
            <div key={p.num} className="bg-white border border-border-c rounded-xl p-6">
              <div className="font-display text-[28px] font-medium text-border-strong mb-3">{p.num}</div>
              <div className="text-[15px] font-medium text-navy mb-2">{p.title}</div>
              <div className="text-[13px] text-slate leading-relaxed">{p.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Legal */}
      <section className="py-16 px-6 md:px-8">
        <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">Legal</p>
        <h2 className="font-display text-[26px] font-medium text-navy mb-5 leading-snug">合法執業</h2>
        <div className="bg-[#F0F4FF] border border-[#B5C4E8] rounded-xl p-6 flex gap-5 items-start">
          <div className="w-11 h-11 rounded-lg bg-navy flex items-center justify-center text-gold-muted flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <div>
            <div className="text-[15px] font-medium text-navy mb-1.5">台灣私立就業服務機構許可</div>
            <p className="text-[13px] text-slate leading-relaxed">
              本公司依《就業服務法》取得私立就業服務機構設立許可，提供合法的人才仲介與媒合服務，受勞動部監管。跨國人才媒合服務亦在許可範圍內，並符合相關法規要求。
            </p>
            <span className="inline-block mt-2 text-xs text-navy bg-[#E8ECF8] px-2.5 py-1 rounded-md font-mono">許可字號：XXXXXXXX</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-warm-alt py-16 px-6 md:px-8">
        <p className="text-xs tracking-[.1em] uppercase text-gold mb-2">Testimonials</p>
        <h2 className="font-display text-[26px] font-medium text-navy mb-5 leading-snug">客戶怎麼說</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { text: '跟其他獵頭最大的差別是，他真的了解我們公司在找什麼，推薦來的人選不是在撒網，每一個都有他的道理。', attr: '某上市科技公司 HR 總監' },
            { text: '我很在意資料保密，他是少數讓我覺得可以放心把履歷交出去的人。後來也確實媒合到一個很適合的機會。', attr: '資深工程主管，現任某新創 CTO' },
          ].map((q) => (
            <div key={q.attr} className="bg-white border border-border-c rounded-xl p-6">
              <div className="font-display text-4xl text-border-c leading-none mb-3">&ldquo;</div>
              <p className="text-sm text-slate leading-relaxed italic mb-4">{q.text}</p>
              <div className="text-xs text-gold font-medium">{q.attr}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact bar */}
      <div className="bg-navy px-6 md:px-8 py-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-sm text-warm-white/70">有任何問題，歡迎直接聯絡</div>
          <div className="font-display text-lg text-warm-white mt-1">contact@example.com</div>
        </div>
        <Link href="/contact" className="inline-flex items-center gap-1.5 px-[22px] py-[11px] rounded-full bg-gold text-white text-sm font-medium hover:bg-gold-hover transition-colors">
          委託獵才
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </>
  )
}
