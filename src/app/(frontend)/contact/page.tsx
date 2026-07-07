import type { Metadata } from 'next'
import ContactTabs from '@/features/contact/ContactTabs'

export const metadata: Metadata = {
  title: '聯絡我們',
  description: '無論您是企業招募窗口，還是正在尋找下一個職涯機會的人選，都歡迎留下訊息。',
}

const contactInfo = [
  {
    icon: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z',
    label: '電話',
    value: '(02) 2356-9977',
  },
  {
    icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
    label: '電子郵件',
    value: 'service@jujianghr.com.tw',
  },
  {
    icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
    label: '地址',
    value: '106001 台北市大安區信義路二段28號4樓（捷運東門站3號出口）',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 300 }}>
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1440&h=440&q=80&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,30,70,0.55)' }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 md:py-28">
          <p className="text-xs tracking-[.12em] uppercase text-[#FF6B00] font-medium mb-3">Get In Touch</p>
          <h1 className="text-4xl font-bold text-white mb-4">聯絡我們</h1>
          <p className="text-white/70 text-[15px] max-w-lg">無論您是企業招募窗口，還是正在尋找下一個職涯機會的人選，都歡迎留下訊息。</p>
        </div>
      </section>

      {/* ── Form section ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_280px] gap-14">
            {/* Form */}
            <div>
              <ContactTabs lang="zh" />
            </div>

            {/* Contact info sidebar */}
            <div className="flex flex-col gap-4">
              <div className="bg-[#F5F7FA] rounded-xl p-6">
                <h3 className="text-[14px] font-bold text-[#333F4F] mb-4">聯絡資訊</h3>
                <div className="space-y-4">
                  {contactInfo.map(c => (
                    <div key={c.label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FFF0E6' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="1.5" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-[#6B7A8D] uppercase tracking-wide mb-0.5">{c.label}</div>
                        <div className="text-[13px] text-[#333F4F]">{c.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#E8F0FB] rounded-xl p-5">
                <h3 className="text-[14px] font-bold text-[#333F4F] mb-2">服務時間</h3>
                <p className="text-[13px] text-[#6B7A8D] leading-relaxed">週一至週五</p>
                <p className="text-[13px] font-medium text-[#0052A5]">09:00 – 18:00</p>
                <p className="text-[12px] text-[#6B7A8D] mt-2">週六、週日及國定假日休息</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Google Maps ── */}
      <section className="border-t border-[#E0E4EA]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.982252826574!2d121.52274997557203!3d25.034676338263857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a982c2b4f6a1%3A0xf85324de5e7f1a89!2z5beo5bCH5Lq65Yqb6LOH5rqQ6aGn5ZWP5pyJ6ZmQ5YWs5Y-4!5e0!3m2!1szh-TW!2stw!4v1783385579170!5m2!1szh-TW!2stw"
          width="100%"
          height="400"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="辦公室位置地圖"
        />
      </section>
    </>
  )
}
