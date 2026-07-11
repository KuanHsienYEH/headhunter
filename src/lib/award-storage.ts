/**
 * 獎狀圖片儲存 — 環境自動切換:
 *   - 有設定 S3(雲端/Vercel):上傳到 S3,DB 存 object key,顯示用簽名網址
 *   - 未設定 S3(本機開發):存到 public/uploads/awards/,DB 存本機路徑,直接顯示
 * 判斷方式:DB 存的 ref 以 '/' 開頭 → 本機檔案;否則 → S3 key。
 */
import { mkdir, writeFile, unlink } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const hasS3 = !!(
  process.env.S3_BUCKET_NAME &&
  process.env.S3_ACCESS_KEY_ID &&
  process.env.S3_SECRET_ACCESS_KEY
)

let _s3: S3Client | null = null
function s3(): S3Client {
  if (!_s3) {
    _s3 = new S3Client({
      region: process.env.S3_REGION!,
      credentials: {
        accessKeyId:     process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    })
  }
  return _s3
}

const LOCAL_DIR = path.join(process.cwd(), 'public', 'uploads', 'awards')
const isLocalRef = (ref: string) => ref.startsWith('/')

/** 儲存圖片,回傳要寫進 DB 的 ref(S3 key 或本機路徑) */
export async function saveAwardImage(buffer: Buffer, ext: string, contentType: string): Promise<string> {
  const filename = `${randomUUID()}.${ext}`
  if (hasS3) {
    const key = `awards/${filename}`
    await s3().send(new PutObjectCommand({
      Bucket:      process.env.S3_BUCKET_NAME!,
      Key:         key,
      Body:        buffer,
      ContentType: contentType,
    }))
    return key
  }
  await mkdir(LOCAL_DIR, { recursive: true })
  await writeFile(path.join(LOCAL_DIR, filename), buffer)
  return `/uploads/awards/${filename}`
}

/** 把 DB 的 ref 轉成可直接放進 <img src> 的網址(S3 → 簽名網址;本機 → 原路徑) */
export async function resolveAwardImageUrl(ref: string): Promise<string> {
  if (isLocalRef(ref)) return ref
  return getSignedUrl(
    s3(),
    new GetObjectCommand({ Bucket: process.env.S3_BUCKET_NAME!, Key: ref }),
    { expiresIn: 3600 }, // 1 小時,頁面每次 render 重新簽發
  )
}

/** 刪除實體檔案(S3 物件或本機檔) */
export async function deleteAwardImage(ref: string): Promise<void> {
  if (isLocalRef(ref)) {
    await unlink(path.join(process.cwd(), 'public', ref)).catch(() => {})
    return
  }
  await s3().send(new DeleteObjectCommand({ Bucket: process.env.S3_BUCKET_NAME!, Key: ref })).catch(() => {})
}
