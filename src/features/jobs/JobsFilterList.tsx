'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Job } from '@/db/schema'

const copy = {
  zh: {
    all: '全部',
    location: '地點',
    postedPrefix: '',
    postedSuffix: '上架',
    viewDetails: '查看詳情',
    noResults: '此分類目前暫無職缺',
    posted: '上架中',
  },
  en: {
    all: 'All',
    location: 'Location',
    postedPrefix: 'Posted ',
    postedSuffix: '',
    viewDetails: 'View details',
    noResults: 'No openings in this category right now',
    posted: 'Active',
  },
} as const

function formatDate(d: Date | string, lang: 'zh' | 'en') {
  const date = new Date(d)
  return lang === 'zh'
    ? `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`
    : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

export default function JobsFilterList({ jobs, lang }: { jobs: Job[]; lang: 'zh' | 'en' }) {
  const t = copy[lang]
  const base = lang === 'en' ? '/en' : ''

  const industries = useMemo(() => {
    const set = new Set(jobs.map((j) => (lang === 'en' ? j.industryEn ?? j.industryZh : j.industryZh)))
    return Array.from(set)
  }, [jobs, lang])

  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all'
    ? jobs
    : jobs.filter((j) => (lang === 'en' ? j.industryEn ?? j.industryZh : j.industryZh) === filter)

  return (
    <>
      <div className="bg-white border-b border-border-c px-6 md:px-8 h-[52px] flex items-center gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`text-[13px] px-4 py-1.5 rounded-full whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-navy text-white' : 'text-slate hover:text-navy'}`}
        >
          {t.all} ({jobs.length})
        </button>
        {industries.map((ind) => (
          <button
            key={ind}
            type="button"
            onClick={() => setFilter(ind)}
            className={`text-[13px] px-4 py-1.5 rounded-full whitespace-nowrap transition-colors ${filter === ind ? 'bg-navy text-white' : 'text-slate hover:text-navy'}`}
          >
            {ind}
          </button>
        ))}
      </div>

      <div className="px-6 md:px-8 py-8">
        <div className="flex flex-col gap-3">
          {filtered.length === 0 && (
            <div className="bg-white border border-border-c rounded-xl p-8 text-center text-sm text-slate">{t.noResults}</div>
          )}
          {filtered.map((job) => {
            const title = lang === 'en' ? job.titleEn ?? job.titleZh : job.titleZh
            const industry = lang === 'en' ? job.industryEn ?? job.industryZh : job.industryZh
            const excerpt = lang === 'en' ? job.descEn ?? job.descZh : job.descZh
            return (
              <Link
                key={job.id}
                href={`${base}/jobs/${job.id}`}
                className="bg-white border border-border-c rounded-xl px-6 py-5 flex items-center justify-between gap-6 hover:border-gold transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex gap-1.5 mb-2 flex-wrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-50 text-navy text-[11px] font-medium">{industry}</span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-medium">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                      {t.posted}
                    </span>
                  </div>
                  <div className="font-display text-[17px] font-medium text-navy mb-1.5">{title}</div>
                  <div className="text-xs text-slate flex gap-3.5 flex-wrap">
                    {job.location && (
                      <span className="inline-flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 21s-7-7.2-7-12a7 7 0 0114 0c0 4.8-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
                        {job.location}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                      {t.postedPrefix}{formatDate(job.createdAt, lang)}{t.postedSuffix}
                    </span>
                  </div>
                  {excerpt && <p className="text-[13px] text-slate leading-relaxed mt-2 max-w-xl line-clamp-2">{excerpt}</p>}
                </div>
                <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-[18px] py-[9px] rounded-lg border border-border-c text-[13px] text-navy hover:border-gold hover:text-gold transition-colors">
                  {t.viewDetails}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
