'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Job } from '@/db/schema'

const copy = {
  zh: { all: '全部', viewDetails: '查看詳情', noResults: '此分類目前暫無職缺', posted: '上架中', postedPrefix: '', postedSuffix: '上架' },
  en: { all: 'All', viewDetails: 'View details', noResults: 'No openings in this category', posted: 'Active', postedPrefix: 'Posted ', postedSuffix: '' },
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
      {/* Filter tabs */}
      <div className="bg-white border-b border-[#E0E4EA]">
        <div className="max-w-[1200px] mx-auto px-6 h-[52px] flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className="text-[13px] px-4 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium border border-[#E0E4EA]"
            style={filter === 'all' ? { background: '#0052A5', color: 'white', borderColor: '#0052A5' } : { color: '#6B7A8D' }}
          >
            {t.all} ({jobs.length})
          </button>
          {industries.map((ind) => (
            <button
              key={ind}
              type="button"
              onClick={() => setFilter(ind)}
              className="text-[13px] px-4 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium border border-[#E0E4EA]"
              style={filter === ind ? { background: '#0052A5', color: 'white', borderColor: '#0052A5' } : { color: '#6B7A8D' }}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Job cards */}
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="flex flex-col gap-3">
          {filtered.length === 0 && (
            <div className="bg-white border border-[#E0E4EA] rounded-xl p-8 text-center text-[14px] text-[#6B7A8D]">
              {t.noResults}
            </div>
          )}
          {filtered.map((job) => {
            const title    = lang === 'en' ? job.titleEn ?? job.titleZh : job.titleZh
            const industry = lang === 'en' ? job.industryEn ?? job.industryZh : job.industryZh
            const excerpt  = lang === 'en' ? job.descEn ?? job.descZh : job.descZh
            return (
              <div key={job.id} className="bg-white border border-[#E0E4EA] rounded-xl px-6 py-5 flex items-center gap-6 hover:border-[#0052A5]/40 hover:shadow-card transition-all">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#E8F0FB' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0052A5" strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18A48.194 48.194 0 0112 21a48.19 48.19 0 01-6.378-.42 2.19 2.19 0 01-1.872-2.18V14.15m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75a23.978 23.978 0 01-7.577-1.22 2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex gap-1.5 mb-2 flex-wrap">
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full font-medium" style={{ background: '#E8F0FB', color: '#0052A5' }}>{industry}</span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full font-medium" style={{ background: '#EAF7F0', color: '#27AE60' }}>
                      ✓ {t.posted}
                    </span>
                  </div>
                  <div className="text-[16px] font-bold text-[#333F4F] mb-1.5">{title}</div>
                  <div className="text-xs text-[#6B7A8D] flex gap-4 flex-wrap mb-2">
                    {job.location && (
                      <span className="inline-flex items-center gap-1">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 21s-7-7.2-7-12a7 7 0 0114 0c0 4.8-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
                        {job.location}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                      {t.postedPrefix}{formatDate(job.createdAt, lang)}{t.postedSuffix}
                    </span>
                  </div>
                  {excerpt && <p className="text-[13px] text-[#6B7A8D] leading-relaxed max-w-xl line-clamp-2">{excerpt}</p>}
                </div>

                {/* CTA */}
                <Link
                  href={`${base}/jobs/${job.id}`}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-[13px] font-medium transition-colors"
                  style={{ borderColor: '#0052A5', color: '#0052A5' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#0052A5'; e.currentTarget.style.color = 'white' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0052A5' }}
                >
                  {t.viewDetails}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
