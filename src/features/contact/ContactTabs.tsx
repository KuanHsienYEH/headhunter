'use client'

import { useState } from 'react'
import InquiryForm from './InquiryForm'
import ResumeForm from './ResumeForm'

type Tab = 'company' | 'resume'

const copy = {
  zh: { company: '企業委託獵才', resume: '求職者登記履歷' },
  en: { company: 'Hire in Taiwan', resume: 'Submit your resume' },
} as const

export default function ContactTabs({ lang }: { lang: 'zh' | 'en' }) {
  const [tab, setTab] = useState<Tab>('company')
  const t = copy[lang]

  return (
    <>
      <div className="flex gap-2 mb-8 border-b border-border-c" id="resume">
        <button
          type="button"
          onClick={() => setTab('company')}
          className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === 'company' ? 'border-gold text-navy' : 'border-transparent text-slate hover:text-navy'}`}
        >
          {t.company}
        </button>
        <button
          type="button"
          onClick={() => setTab('resume')}
          className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === 'resume' ? 'border-gold text-navy' : 'border-transparent text-slate hover:text-navy'}`}
        >
          {t.resume}
        </button>
      </div>

      {tab === 'company' ? <InquiryForm lang={lang} /> : <ResumeForm lang={lang} />}
    </>
  )
}
