import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq, asc, desc, and } from 'drizzle-orm'
import { stripHtml } from '@/lib/text'

export const metadata: Metadata = {
  title: '產業觀察',
  description: '人才市場觀察、招募趨勢與職涯建議。',
}

/* 後台發布文章後即時生效,不需重新 build */
export const dynamic = 'force-dynamic'

/* 清單分頁:每頁 10 筆 */
const PER_PAGE = 10
/* 置頂精選 1 篇 + 卡片 3 篇,其餘進清單 */
const FEATURED_COUNT = 1
const GRID_COUNT = 3

async function getPosts() {
  try {
    const rows = await db
      .select()
      .from(posts)
      .where(and(eq(posts.status, 'published')))
      // 後台可調整 sortOrder 決定順序,相同時依發布時間新到舊
      .orderBy(asc(posts.sortOrder), desc(posts.publishedAt))
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

function PageLink({ page, disabled, label }: { page: number; disabled: boolean; label: string }) {
  const base = 'h-[34px] px-3 inline-flex items-center rounded-lg text-[13px] font-medium border transition-colors'
  if (disabled) {
    return <span className={`${base} border-[#E0E4EA] text-[#C5CCD6] cursor-default`}>{label}</span>
  }
  return (
    <Link
      href={page === 1 ? '/insights#list' : `/insights?page=${page}#list`}
      className={`${base} border-[#E0E4EA] text-[#6B7A8D] hover:border-[#0052A5] hover:text-[#0052A5]`}
    >
      {label}
    </Link>
  )
}

type Props = { searchParams?: { page?: string } }

export default async function InsightsPage({ searchParams }: Props) {
  const list = await getPosts()

  const pageParam = Number(searchParams?.page)
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1
  const isFirstPage = page === 1

  const featured = list[0]
  const gridPosts = list.slice(FEATURED_COUNT, FEATURED_COUNT + GRID_COUNT)
  const listPosts = list.slice(FEATURED_COUNT + GRID_COUNT)

  const totalPages = Math.max(1, Math.ceil(listPosts.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const pagedPosts = listPosts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

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
              {/* ── Featured post ── 僅第一頁顯示 */}
              {isFirstPage && featured && (
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
                      <p className="text-[13px] text-[#6B7A8D] leading-relaxed line-clamp-4 mb-6">{stripHtml(featured.bodyZh)}</p>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-medium" style={{ color: '#0052A5' }}>
                      閱讀全文
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </Link>
              )}

              {/* ── Post grid ── 僅第一頁顯示 */}
              {isFirstPage && gridPosts.length > 0 && (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[12px] font-bold uppercase tracking-[.08em] text-[#6B7A8D]">最新文章</span>
                    <span className="flex-1 h-px bg-[#E0E4EA]" />
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gridPosts.map((post, i) => {
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
                              <p className="text-[12px] text-[#6B7A8D] leading-relaxed line-clamp-3 mb-4">{stripHtml(post.bodyZh)}</p>
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

              {/* ── 所有文章清單 ── 每頁 10 筆 */}
              {listPosts.length > 0 && (
                <div id="list" className={isFirstPage ? 'mt-16 scroll-mt-24' : 'scroll-mt-24'}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[12px] font-bold uppercase tracking-[.08em] text-[#6B7A8D]">所有文章</span>
                    <span className="flex-1 h-px bg-[#E0E4EA]" />
                    <span className="text-[12px] text-[#6B7A8D]">共 {listPosts.length} 篇</span>
                  </div>

                  <ul className="border-t-2 border-[#333F4F]">
                    {pagedPosts.map((post) => (
                      <li key={post.id}>
                        <Link
                          href={`/insights/${post.slug}`}
                          className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-5 border-b border-[#E0E4EA] transition-colors hover:bg-[#F5F7FA]"
                        >
                          <span className="text-[12px] text-[#6B7A8D] tabular-nums sm:w-[110px] flex-shrink-0 sm:pl-2">
                            {formatDate(post.publishedAt)}
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-[15px] font-bold text-[#333F4F] group-hover:text-[#0052A5] transition-colors mb-1">
                              {post.titleZh}
                            </span>
                            {post.bodyZh && (
                              <span className="block text-[13px] text-[#6B7A8D] leading-relaxed line-clamp-1">
                                {stripHtml(post.bodyZh)}
                              </span>
                            )}
                          </span>
                          <svg
                            className="hidden sm:block w-3.5 h-3.5 flex-shrink-0 text-[#C5CCD6] group-hover:text-[#FF6B00] transition-colors"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {totalPages > 1 && (
                    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="文章分頁">
                      <PageLink page={currentPage - 1} disabled={currentPage === 1} label="上一頁" />
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <Link
                          key={n}
                          href={n === 1 ? '/insights#list' : `/insights?page=${n}#list`}
                          aria-current={n === currentPage ? 'page' : undefined}
                          className={
                            n === currentPage
                              ? 'min-w-[34px] h-[34px] px-2 inline-flex items-center justify-center rounded-lg text-[13px] font-bold text-white bg-[#0052A5]'
                              : 'min-w-[34px] h-[34px] px-2 inline-flex items-center justify-center rounded-lg text-[13px] font-medium text-[#6B7A8D] border border-[#E0E4EA] hover:border-[#0052A5] hover:text-[#0052A5] transition-colors'
                          }
                        >
                          {n}
                        </Link>
                      ))}
                      <PageLink page={currentPage + 1} disabled={currentPage === totalPages} label="下一頁" />
                    </nav>
                  )}
                </div>
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
