'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const INTERVAL = 5000

export interface HeroSlide {
  id: string
  /* light: 淺色背景、深色文字(設計提案主視覺);dark: 深色遮罩、白色文字 */
  theme: 'light' | 'dark'
  eyebrow?: string | null
  title: string
  /* 橘色副標語 */
  tagline?: string | null
  subtitle?: string | null
  imageUrl: string
  primary?: { text: string; href: string } | null
  secondary?: { text: string; href: string } | null
}

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const count = slides.length
  const prev = useCallback(() => setCurrent(c => (c - 1 + count) % count), [count])
  const next = useCallback(() => setCurrent(c => (c + 1) % count), [count])

  useEffect(() => {
    if (paused || count <= 1) return
    const id = setInterval(next, INTERVAL)
    return () => clearInterval(id)
  }, [paused, count, next])

  if (!slides.length) return null

  const slide = slides[current]
  const isLight = slide.theme === 'light'

  return (
    <section
      className="relative overflow-hidden select-none"
      style={{ minHeight: 520 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img
            src={s.imageUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: s.theme === 'light'
                ? 'linear-gradient(to right, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 34%, rgba(255,255,255,0.35) 68%, rgba(255,255,255,0) 100%)'
                : 'linear-gradient(to right, rgba(0,20,60,0.72) 40%, rgba(0,20,60,0.35) 100%)',
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 py-24 md:py-28 flex flex-col gap-5">
        {slide.eyebrow && (
          <p className="text-xs tracking-[.14em] uppercase font-semibold text-[#FF6B00]">{slide.eyebrow}</p>
        )}
        <h1
          key={current}
          className={`text-4xl md:text-5xl font-bold leading-tight max-w-xl animate-fadein ${isLight ? 'text-[#1F2D40]' : 'text-white'}`}
          style={isLight ? undefined : { textShadow: '0 2px 20px rgba(0,0,0,.4)' }}
        >
          {slide.title}
        </h1>
        {slide.tagline && (
          <p key={`tag-${current}`} className="text-xl md:text-2xl font-bold text-[#FF6B00] animate-fadein -mt-1">
            {slide.tagline}
          </p>
        )}
        {slide.subtitle && (
          <p
            key={`sub-${current}`}
            className={`text-[15px] max-w-lg leading-relaxed whitespace-pre-line animate-fadein ${isLight ? 'text-[#556274]' : 'text-white/75'}`}
          >
            {slide.subtitle}
          </p>
        )}
        {(slide.primary || slide.secondary) && (
          <div className="flex flex-wrap gap-3 mt-2">
            {slide.primary && (
              <Link
                href={slide.primary.href}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-bold text-white text-[15px] transition-opacity hover:opacity-90"
                style={{ background: '#FF6B00' }}
              >
                {slide.primary.text}
              </Link>
            )}
            {slide.secondary && (
              <Link
                href={slide.secondary.href}
                className={`inline-flex items-center gap-2 px-7 py-3 rounded-lg font-bold text-[15px] transition-colors ${
                  isLight
                    ? 'bg-white text-[#333F4F] border border-[#C5CCD6] hover:border-[#0052A5] hover:text-[#0052A5]'
                    : 'text-white border border-white/60 hover:bg-white/10'
                }`}
              >
                {slide.secondary.text}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Prev / Next */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="上一張"
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
              isLight ? 'bg-[#333F4F]/10 hover:bg-[#333F4F]/25' : 'bg-white/15 hover:bg-white/30'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isLight ? '#333F4F' : 'white'} strokeWidth="2.5" aria-hidden="true"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="下一張"
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
              isLight ? 'bg-[#333F4F]/10 hover:bg-[#333F4F]/25' : 'bg-white/15 hover:bg-white/30'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isLight ? '#333F4F' : 'white'} strokeWidth="2.5" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </>
      )}

      {/* Dots */}
      {count > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`切換到第 ${i + 1} 張`}
              className={`transition-all rounded-full ${
                i === current
                  ? `w-6 h-2 ${isLight ? 'bg-[#0052A5]' : 'bg-white'}`
                  : `w-2 h-2 ${isLight ? 'bg-[#333F4F]/25 hover:bg-[#333F4F]/40' : 'bg-white/40 hover:bg-white/60'}`
              }`}
            />
          ))}
        </div>
      )}

    </section>
  )
}
