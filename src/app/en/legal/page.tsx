import type { Metadata } from 'next'
import SafetyHotline from '@/components/frontend/SafetyHotline'
import { getLegalItems } from '@/lib/legal-data'
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Compliance & Job Seeker Info',
  description: 'Licenses, fee schedules, contract templates, and job seeker rights published by Ju Jiang Human Resources Consultant Co., Ltd. under the Employment Service Act.',
}



export default async function LegalPage() {
  const { gov, docs } = await getLegalItems()

  return (
    <>
      {/* ── Hero — full-bleed photo + license badge ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 320 }}>
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=520&q=80&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,30,70,0.62)' }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 md:py-24">
          <p className="text-xs tracking-[.12em] uppercase text-accent font-medium mb-3">Compliance & Job Seeker Info</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Compliance & Job Seeker Information</h1>
          <p className="text-[15px] text-white/75 max-w-2xl mb-6">
            We are a licensed private employment agency and publish our licenses, fees, and job seeker rights information as required by the Employment Service Act.
          </p>
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/25 rounded-full pl-3 pr-5 py-2">
            <span className="w-7 h-7 rounded-full bg-success flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            </span>
            <span className="text-[13px] text-white/85">Licensed Employment Agency</span>
            <span className="text-[14px] font-bold text-white">北市就服字第0229號</span>
          </div>
        </div>
      </section>

      {/* ── Company documents ── drop PDFs into public/documents/ to activate links */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-dark mb-6">Company Documents</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {docs.map(d => {
              const ready = !!d.href
              return (
                <div key={d.zh} className="border border-border-c rounded-xl p-5 flex flex-col gap-2 hover:shadow-card transition-shadow">
                  <div className="w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div className="text-[15px] font-bold text-dark flex-1">{d.en}</div>
                  {ready ? (
                    <a href={d.href!} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-brand hover:text-brand-hover inline-flex items-center gap-1">
                      View document (PDF)
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  ) : (
                    <span className="text-[12px] text-muted/70">Coming soon</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Job search safety intro — photo + text ── */}
      <section className="bg-dark-light border-t border-border-c">
        <div className="max-w-[1200px] mx-auto px-6 pt-12">
          <div className="grid md:grid-cols-2 gap-8 items-center bg-white border border-border-c rounded-2xl overflow-hidden">
            <div className="relative h-56 md:h-full min-h-[220px]">
              <Image
                width={1000}
                height={1000}
                src="/images/legal.png"
                alt="One-on-one consultation"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-7 md:py-10 md:pr-10">
              <p className="text-xs tracking-[.1em] uppercase text-accent font-medium mb-2">Job Search Safety</p>
              <h2 className="text-xl font-bold text-dark mb-3">We help you stay safe while job hunting</h2>
              <p className="text-[14px] text-muted leading-relaxed mb-5">
                Stay alert to vague job ads, upfront fees, or unrealistic pay. Every opening here is personally
                vetted by our consultants — and if anything in your job search feels off, use the hotline below.
              </p>
              <SafetyHotline lang="en" variant="card" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Government resources & job seeker rights ── all open in a new tab */}
      <section className="bg-dark-light">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h2 className="text-xl font-bold text-dark mb-6">Government Resources & Job Seeker Rights</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gov.map(l => (
              <a
                key={l.zh}
                href={l.href ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-border-c rounded-xl p-5 flex flex-col gap-2 hover:shadow-card hover:border-brand/40 transition-all"
              >
                <span className="w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </span>
                <span className="text-[15px] font-bold text-dark flex-1">{l.en}</span>
                <span className="text-[13px] font-medium text-brand">Open link</span>
              </a>
            ))}

          </div>
        </div>
      </section>
    </>
  )
}
