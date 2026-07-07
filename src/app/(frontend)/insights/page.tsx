import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq, desc, and } from 'drizzle-orm'

export const metadata: Metadata = {
  title: '產業觀察',
  description: '人才市場觀察、招募趨勢與職涯建議。',
}

async function getPosts() {
  try {
    const rows = await db
      .select()
      .from(posts)
      .where(and(eq(posts.status, 'published')))
      .orderBy(desc(posts.publishedAt))
    return rows.filter((p) => p.lang === 'zh' || p.lang === 'both')
  } catch {
    return []
  }
}

function formatDate(d: Date | string | null) {
  if (!d) return ''
  const date = new Date(d)
  return date.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
}

const COVER_IMAGES = [
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=640&h=360&q=80&fit=crop',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=640&h=360&q=80&fit=crop',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=640&h=360&q=80&fit=crop',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=640&h=360&q=80&fit=crop',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=640&h=360&q=80&fit=crop',
  'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=640&h=360&q=80&fit=crop',
]

const CATEGORY_COLORS = [
  { bg: '#E8F0FB', text: '#0052A5' },
  { bg: '#FFF0E6', text: '#FF6B00' },
  { bg: '#EAF7F0', text: '#27AE60' },
  { bg: '#F5F7FA', text: '#333F4F' },
]

export default async function InsightsPage() {
  const list = await getPosts()
  const [featured, ...rest] = list

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 300 }}>
        <img
          src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1440&h=480&q=80&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,30,70,0.60)' }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 md:py-28">
          <p className="text-xs tracking-[.12em] uppercase text-[#FF6B00] font-medium mb-3">Insights</p>
          <h1 className="text-4xl font-bold text-white mb-4">產業觀察</h1>
          <p className="text-white/70 text-[15px] max-w-lg">人才市場趨勢、招募策略與職涯發展的深度分析。</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">

          {list.length === 0 ? (
            <div className="bg-[#F5F7FA] rounded-xl p-12 text-center">
              <svg className="w-10 h-10 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="#6B7A8D" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <p className="text-[#6B7A8D] text-[14px]">目前暫無文章，敬請期待</p>
            </div>
          ) : (
            <>
              {/* ── Featured post ── */}
              {featured && (
                <Link
                  href={`/insights/${featured.slug}`}
                  className="group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[#E0E4EA] hover:shadow-lg transition-shadow mb-14"
                >
                  <div className="relative overflow-hidden" style={{ minHeight: 280 }}>
                    <img
                      src={COVER_IMAGES[0]}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0" style={{ background: 'rgba(0,30,70,0.25)' }} />
                    <span className="absolute top-4 left-4 text-[11px] px-3 py-1 rounded-full font-bold" style={{ background: '#FF6B00', color: 'white' }}>精選文章</span>
                  </div>
                  <div className="p-8 flex flex-col justify-center bg-white">
                    <p className="text-[11px] font-bold uppercase tracking-[.08em] text-[#6B7A8D] mb-3">{formatDate(featured.publishedAt)}</p>
                    <h2 className="text-xl font-bold text-[#333F4F] mb-3 leading-snug group-hover:text-[#0052A5] transition-colors">{featured.titleZh}</h2>
                    {featured.bodyZh && (
                      <p className="text-[13px] text-[#6B7A8D] leading-relaxed line-clamp-4 mb-6">{featured.bodyZh}</p>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-medium" style={{ color: '#0052A5' }}>
                      閱讀全文
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </Link>
              )}

              {/* ── Post grid ── */}
              {rest.length > 0 && (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[12px] font-bold uppercase tracking-[.08em] text-[#6B7A8D]">所有文章</span>
                    <span className="flex-1 h-px bg-[#E0E4EA]" />
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((post, i) => {
                      const catColor = CATEGORY_COLORS[i % CATEGORY_COLORS.length]
                      const coverImg = COVER_IMAGES[(i + 1) % COVER_IMAGES.length]
                      return (
                        <Link
                          key={post.id}
                          href={`/insights/${post.slug}`}
                          className="group bg-white border border-[#E0E4EA] rounded-xl overflow-hidden hover:border-[#0052A5]/40 hover:shadow-card transition-all flex flex-col"
                        >
                          <div className="relative overflow-hidden" style={{ height: 180 }}>
                            <img
                              src={coverImg}
                              alt=""
                              aria-hidden="true"
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold" style={{ background: catColor.bg, color: catColor.text }}>
                                產業觀察
                              </span>
                              <span className="text-[11px] text-[#6B7A8D]">{formatDate(post.publishedAt)}</span>
                            </div>
                            <h3 className="text-[14px] font-bold text-[#333F4F] mb-2 leading-snug group-hover:text-[#0052A5] transition-colors line-clamp-2">{post.titleZh}</h3>
                            {post.bodyZh && (
                              <p className="text-[12px] text-[#6B7A8D] leading-relaxed line-clamp-3 mb-4">{post.bodyZh}</p>
                            )}
                            <span className="mt-auto text-[12px] font-medium inline-flex items-center gap-1" style={{ color: '#0052A5' }}>
                              閱讀全文
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Subscribe CTA ── */}
      <section style={{ background: '#0052A5' }} className="py-14">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-xs tracking-[.1em] uppercase font-medium mb-3" style={{ color: '#FF6B00' }}>Stay Updated</p>
          <h2 className="text-2xl font-bold text-white mb-3">掌握最新人才市場動態</h2>
          <p className="text-white/65 text-[14px] max-w-md mx-auto mb-8">
            歡迎聯繫我們，定期獲取產業洞察、薪酬趨勢與招募策略分析。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white text-[14px] transition-colors"
            style={{ background: '#FF6B00' }}
          >
            與我們聯絡
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>
    </>
  )
}
