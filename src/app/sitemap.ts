import type { MetadataRoute } from 'next'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { jobs, posts } from '@/db/schema'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.jujianghr.com.tw'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ['', '/about', '/services', '/jobs', '/insights', '/legal', '/contact']

  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap(p => [
    { url: `${siteUrl}${p || '/'}`, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.7 },
    { url: `${siteUrl}/en${p || ''}`, changeFrequency: 'weekly' as const, priority: 0.5 },
  ])

  try {
    const [jobRows, postRows] = await Promise.all([
      db.select({ id: jobs.id, updatedAt: jobs.updatedAt }).from(jobs).where(eq(jobs.isActive, true)),
      db.select({ slug: posts.slug, updatedAt: posts.updatedAt }).from(posts).where(eq(posts.status, 'published')),
    ])

    return [
      ...staticEntries,
      ...jobRows.map(j => ({ url: `${siteUrl}/jobs/${j.id}`, lastModified: j.updatedAt, changeFrequency: 'weekly' as const, priority: 0.8 })),
      ...postRows.map(p => ({ url: `${siteUrl}/insights/${p.slug}`, lastModified: p.updatedAt, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ]
  } catch {
    return staticEntries
  }
}
