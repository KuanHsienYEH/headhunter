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

  return (
    <>
      <section className="bg-navy py-16 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <Link href="/en/insights" className="text-xs text-warm-white/50 hover:text-warm-white/80 inline-flex items-center gap-1 mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to insights
          </Link>
          <div className="text-xs text-warm-white/50 mb-3">{formatDate(post.publishedAt)}</div>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-warm-white">{post.titleEn ?? post.titleZh}</h1>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-6">
        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverImage} alt={post.titleEn ?? post.titleZh} className="w-full rounded-xl mb-10 object-cover" />
        )}
        <div className="text-sm text-slate leading-loose whitespace-pre-line">{post.bodyEn ?? post.bodyZh}</div>

        <div className="mt-16 bg-warm-alt rounded-xl p-8 text-center">
          <p className="text-sm text-slate mb-4">Want to discuss your hiring or career needs?</p>
          <Link href="/en/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-medium hover:bg-gold-hover transition-colors text-sm">
            Contact us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </>
  )
}
