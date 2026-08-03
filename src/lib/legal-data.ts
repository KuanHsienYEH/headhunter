/* 法規專區讀取 — 前台法規頁與 footer 共用，資料一律來自 DB */
import { asc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { legalResources } from '@/db/schema'

export interface LegalItem {
  zh: string
  en: string
  /* null = 文件整理中 */
  href: string | null
}

export async function getLegalItems(): Promise<{ gov: LegalItem[]; docs: LegalItem[] }> {
  try {
    const rows = await db
      .select()
      .from(legalResources)
      .where(eq(legalResources.isActive, true))
      .orderBy(asc(legalResources.sortOrder), asc(legalResources.createdAt))

    return {
      gov: rows
        .filter(r => r.category === 'gov')
        .map(r => ({ zh: r.titleZh, en: r.titleEn ?? r.titleZh, href: r.url })),
      docs: rows
        .filter(r => r.category === 'doc')
        .map(r => ({ zh: r.titleZh, en: r.titleEn ?? r.titleZh, href: r.url ? `/api/legal-resources/${r.id}/file` : null })),
    }
  } catch (err) {
    console.error('[Legal data error]', err)
    return { gov: [], docs: [] }
  }
}
