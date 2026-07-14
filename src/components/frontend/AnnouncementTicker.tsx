'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Announcement } from '@/db/schema'
import { getAnnouncements } from '@/api/announcements'

export default function AnnouncementTicker() {
  const { data: announcements = [] } = useQuery({
    queryKey: ['public-announcements'],
    queryFn: getAnnouncements,
    staleTime: 5 * 60_000,
  })
  const [selected, setSelected] = useState<Announcement | null>(null)

  useEffect(() => {
    if (!selected) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selected])

  if (announcements.length === 0) return null

  const tickerItems = [...announcements, ...announcements]
  const duration = Math.max(announcements.reduce((sum, item) => sum + item.text.length, 0) * 0.22, 18)
  const popupBody = selected?.popupBody || selected?.text || ''
  const hasRichText = /<[a-z][\s\S]*>/i.test(popupBody)

  return (
    <>
      <div className="h-[49px]" aria-hidden="true" />
      <section
        className="fixed inset-x-0 bottom-0 z-50 overflow-hidden border-y border-[#FF6B00]/25 bg-[#FFF4EC] shadow-[0_-4px_16px_rgba(51,63,79,0.08)]"
        aria-label="公開聲明"
      >
        <div
          className="announcement-marquee flex w-max items-center py-3"
          style={{ ['--announcement-duration' as string]: `${duration}s` }}
        >
          {tickerItems.map((announcement, index) => (
            <button
              key={`${announcement.id}-${index}`}
              type="button"
              onClick={() => setSelected(announcement)}
              className="group flex items-center gap-3 px-8 text-left text-[13px] font-medium text-[#333F4F] hover:text-[#0052A5]"
              tabIndex={index < announcements.length ? 0 : -1}
            >
              <span className="inline-flex rounded-full bg-[#FF6B00] px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
                公開聲明
              </span>
              <span className="whitespace-nowrap underline-offset-4 group-hover:underline">{announcement.text}</span>
              <span className="text-[#FF6B00]" aria-hidden="true">●</span>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="announcement-title"
          onClick={() => setSelected(null)}
        >
          <article
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={event => event.stopPropagation()}
          >
            {selected.imageUrl && (
              <img
                src={selected.imageUrl}
                alt=""
                className="max-h-[42vh] w-full bg-[#F5F7FA] object-contain"
              />
            )}
            <div className="p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B00]" />
                <h2 id="announcement-title" className="text-xl font-bold text-[#333F4F]">
                  {selected.popupTitle || '【公開聲明】'}
                </h2>
              </div>
              {hasRichText ? (
                <div
                  className="rich-content text-[14px] leading-7 text-[#6B7A8D]"
                  dangerouslySetInnerHTML={{ __html: popupBody }}
                />
              ) : (
                <p className="whitespace-pre-line text-[14px] leading-7 text-[#6B7A8D]">
                  {popupBody}
                </p>
              )}
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="mt-6 rounded-full bg-[#0052A5] px-6 py-2.5 text-[13px] font-bold text-white hover:bg-[#003D80]"
              >
                我知道了
              </button>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="關閉"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-xl text-white hover:bg-black/75"
            >
              ×
            </button>
          </article>
        </div>
      )}
    </>
  )
}
