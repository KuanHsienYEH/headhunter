import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq, desc, and } from 'drizzle-orm'

export const metadata: Metadata = {
  title: '洞察',
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

export default async function InsightsPage() {
  const list = await getPosts()

  return (
    <>
      <section className="bg-navy py-16 md:py-20 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
          <circle cx="80%" cy="30%" r="240" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <p className="text-xs tracking-[.12em] uppercase text-gold-muted mb-3">Insights</p>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-warm-white mb-3">洞察</h1>
          <p className="text-warm-white/60 text-sm max-w-md">人才市場觀察、招募趨勢與職涯建議。</p>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-6">
        {list.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {list.map((post) => (
              <Link
                key={post.id}
                href={`/insights/${post.slug}`}
                className="bg-white border border-border-c rounded-xl overflow-hidden hover:border-gold/50 hover:shadow-card-hover transition-all flex flex-col"
              >
                <div className="h-36 bg-warm-alt flex items-center justify-center text-3xl">📝</div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-xs text-slate mb-2">{formatDate(post.publishedAt)}</div>
                  <h2 className="font-display font-medium text-navy mb-2 leading-snug">{post.titleZh}</h2>
                  {post.bodyZh && (
                    <p className="text-sm text-slate leading-relaxed line-clamp-3 mb-3">{post.bodyZh}</p>
                  )}
                  <span className="mt-auto text-sm text-gold hover:text-gold-hover inline-flex items-center gap-1">
                    閱讀全文
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-border-c rounded-xl p-8 text-center">
            <p className="text-slate text-sm">目前暫無文章，敬請期待</p>
          </div>
        )}
      </section>
    </>
  )
}
