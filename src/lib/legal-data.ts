/* 法規資訊讀取 — 前台法規頁與 footer 共用;DB 無資料時回退 legal-links 靜態清單 */
import { existsSync } from 'fs'
import path from 'path'
import { asc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { legalResources } from '@/db/schema'
import { govLinks as staticGov, companyDocs as staticDocs } from './legal-links'

export interface LegalItem {
  zh: string
  en: string
  /* null = 文件整理中 */
  href: string | null
}

const fileExists = (href: string) => existsSync(path.join(process.cwd(), 'public', href))

function fallback(): { gov: LegalItem[]; docs: LegalItem[] } {
  return {
    gov:  staticGov.map(l => ({ zh: l.zh, en: l.en, href: l.href })),
    docs: staticDocs.map(d => ({ zh: d.zh, en: d.en, href: fileExists(d.href) ? d.href : null })),
  }
}

export async function getLegalItems(): Promise<{ gov: LegalItem[]; docs: LegalItem[] }> {
  try {
    const rows = await db
      .select()
      .from(legalResources)
      .where(eq(legalResources.isActive, true))
      .orderBy(asc(legalResources.sortOrder), asc(legalResources.createdAt))

    if (rows.length === 0) return fallback()

    return {
      gov: rows
        .filter(r => r.category === 'gov')
        .map(r => ({ zh: r.titleZh, en: r.titleEn ?? r.titleZh, href: r.url })),
      docs: rows
        .filter(r => r.category === 'doc')
        .map(r => ({ zh: r.titleZh, en: r.titleEn ?? r.titleZh, href: r.url ? `/api/legal-resources/${r.id}/file` : null })),
    }
  } catch {
    return fallback()
  }
}
