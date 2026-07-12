import { NextRequest, NextResponse } from 'next/server'
import { eq, and } from 'drizzle-orm'
import { db } from '@/db'
import { legalResources } from '@/db/schema'
import { resolveMediaUrl } from '@/lib/media-storage'
import { notFound, serverError } from '@/lib/api'

type Ctx = { params: { id: string } }

/** 公開下載入口 — 302 導向實際檔案(S3 簽名網址 / 本機路徑 / 外部連結) */
export async function GET(_req: NextRequest, { params }: Ctx) {
  try {
    const [row] = await db
      .select()
      .from(legalResources)
      .where(and(eq(legalResources.id, params.id), eq(legalResources.isActive, true)))
      .limit(1)

    if (!row?.url) return notFound('文件尚未上架')

    const target = await resolveMediaUrl(row.url)
    // 本機相對路徑需轉為同站絕對網址
    const location = target.startsWith('/') ? new URL(target, _req.nextUrl.origin).toString() : target
    return NextResponse.redirect(location, 302)
  } catch (err) {
    return serverError(err)
  }
}
