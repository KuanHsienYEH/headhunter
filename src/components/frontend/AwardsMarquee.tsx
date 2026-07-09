'use client'

import { useState, useEffect } from 'react'

export interface AwardItem {
  id: string
  title: string
  imageUrl: string
}

/**
 * 獎狀跑馬燈 — 自動水平滾動(hover 暫停),點擊放大 lightbox、背景模糊。
 * 清單複製兩份配合 translateX(-50%) 動畫,形成無縫循環。
 */
export default function AwardsMarquee({ awards, lang = 'zh' }: { awards: AwardItem[]; lang?: 'zh' | 'en' }) {
  const [selected, setSelected] = useState<AwardItem | null>(null)

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [selected])

  if (!awards.length) return null

  /* 每張 6 秒,總時長隨數量成長,速度才會穩定 */
  const duration = Math.max(awards.length * 6, 18)

  return (
    <>
      {/* Marquee */}
      <div className="relative overflow-hidden" aria-label={lang === 'en' ? 'Awards carousel' : '獎狀輪播'}>
        {/* 兩側漸層遮罩 */}
        <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, white, transparent)' }} />

        <div
          className="flex w-max gap-5 animate-marquee hover:[animation-play-state:paused]"
          style={{ ['--marquee-duration' as string]: `${duration}s` }}
        >
          {[...awards, ...awards].map((a, i) => (
            <button
              key={`${a.id}-${i}`}
              type="button"
              onClick={() => setSelected(a)}
              className="group flex-shrink-0 w-44 focus:outline-none"
              aria-label={a.title}
              tabIndex={i < awards.length ? 0 : -1}
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden border border-border-c bg-dark-light shadow-card group-hover:shadow-card-hover group-hover:border-brand/40 transition-all cursor-zoom-in">
                <img
                  src={a.imageUrl}
                  alt={a.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="mt-2 text-[12px] text-muted text-center truncate">{a.title}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox — 放大檢視,背景模糊 */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          onClick={() => setSelected(null)}
        >
          <figure className="max-w-3xl max-h-[90vh] flex flex-col items-center gap-3" onClick={e => e.stopPropagation()}>
            <img
              src={selected.imageUrl}
              alt={selected.title}
              className="max-h-[80vh] w-auto rounded-xl shadow-2xl"
            />
            <figcaption className="text-white/90 text-sm font-medium">{selected.title}</figcaption>
          </figure>
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label={lang === 'en' ? 'Close' : '關閉'}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      )}
    </>
  )
}
