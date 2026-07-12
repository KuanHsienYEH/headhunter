import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq } from 'drizzle-orm'

type Props = { params: { slug: string } }

async function getPost(slug: string) {
  try {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1)
    return post ?? null
  } catch {
    return null
  }
}

function formatDate(d: Date | string | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Insights' }
  const title = post.titleEn ?? post.titleZh
  return { title, description: (post.bodyEn ?? post.bodyZh)?.slice(0, 100) }
}

export default async function InsightDetailPage({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post || post.status !== 'published') notFound()

  const title = post.titleEn ?? post.titleZh
  const body = post.bodyEn ?? post.bodyZh

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: '#0052A5' }} className="px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/en/insights"
            className="inline-flex items-center gap-1.5 text-[12px] text-white/55 hover:text-white/80 mb-6 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Insights
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold" style={{ background: '#FF6B00', color: 'white' }}>Insights</span>
            <span className="text-[12px] text-white/55">{formatDate(post.publishedAt)}</span>
          </div>
          <h1 className="text-3xl font-bold text-white leading-snug">{title}</h1>
        </div>
      </section>

      {/* ── Cover image ── */}
      <div className="max-w-3xl mx-auto px-6">
        <img
          src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&h=400&q=80&fit=crop"
          alt=""
          aria-hidden="true"
          className="w-full rounded-xl object-cover mt-8"
          style={{ height: 320 }}
        />
      </div>

      {/* ── Body ── */}
      <section className="py-12 max-w-3xl mx-auto px-6">
        <div
          className="rich-content text-[15px] text-[#6B7A8D] leading-[1.9]"
          dangerouslySetInnerHTML={{ __html: body ?? '' }}
        />

        <div className="mt-14 rounded-2xl p-8 text-center" style={{ background: '#E8F0FB' }}>
          <p className="text-[14px] font-bold text-[#333F4F] mb-2">Want to discuss your hiring or career needs?</p>
          <p className="text-[13px] text-[#6B7A8D] mb-6">Our consultants are always happy to connect.</p>
          <Link
            href="/en/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-[14px] transition-colors"
            style={{ background: '#FF6B00' }}
          >
            Contact us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>
    </>
  )
}
