import type { Metadata } from 'next'
import CorporateServices from '@/features/services/CorporateServices'

export const metadata: Metadata = {
  title: '企業專區',
  description: '提供企業獵才委託與人才顧問服務，協助尋找中高階主管與關鍵職位人選。',
}

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 320 }}>
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1440&h=520&q=80&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,30,70,0.58)' }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 md:py-28">
          <p className="text-xs tracking-[.12em] uppercase text-[#FF6B00] font-medium mb-3">Our Services</p>
          <h1 className="text-4xl font-bold text-white mb-4">企業專區</h1>
          <p className="text-white/70 text-[15px] max-w-lg">協助企業在競爭激烈的市場中找到最關鍵的人才。</p>
        </div>
      </section>

      <CorporateServices />

    </>
  )
}
