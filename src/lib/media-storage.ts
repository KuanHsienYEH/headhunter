/**
 * 媒體檔案儲存(圖片/PDF)— 環境自動切換:
 *   - 有設定 S3(雲端/Vercel):上傳 S3,DB 存 object key,顯示用簽名網址
 *   - 未設定 S3(本機開發):存 public/uploads/<folder>/,DB 存本機路徑
 * ref 判斷:http(s):// → 外部網址原樣使用;'/' 開頭 → 本機檔;其他 → S3 key。
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
  process.env.S3_PREFIX &&
  process.env.S3_SECRET_ACCESS_KEY &&
  !process.env.S3_BUCKET_NAME.includes('your-bucket')
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

const isExternal = (ref: string) => ref.startsWith('http://') || ref.startsWith('https://')
const isLocal    = (ref: string) => ref.startsWith('/')

/** 儲存檔案,回傳要寫進 DB 的 ref */
export async function saveMedia(
  buffer: Buffer,
  opts: { ext: string; contentType: string; folder: string },
): Promise<string> {
  const filename = `${randomUUID()}.${opts.ext}`
  if (hasS3) {
    const prefix = process.env.S3_PREFIX
    if (!prefix) {
      throw new Error('S3_PREFIX is not configured')
    }
    const key = `${prefix}/${opts.folder}/${filename}`
    await s3().send(new PutObjectCommand({
      Bucket:      process.env.S3_BUCKET_NAME!,
      Key:         key,
      Body:        buffer,
      ContentType: opts.contentType,
    }))
    return key
  }
  const dir = path.join(process.cwd(), 'public', 'uploads', opts.folder)
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, filename), buffer)
  return `/uploads/${opts.folder}/${filename}`
}

/** 把 DB 的 ref 轉成可直接使用的網址(外部/本機原樣;S3 → 1 小時簽名網址) */
export async function resolveMediaUrl(ref: string): Promise<string> {
  if (isExternal(ref) || isLocal(ref)) return ref
  return getSignedUrl(
    s3(),
    new GetObjectCommand({ Bucket: process.env.S3_BUCKET_NAME!, Key: ref }),
    { expiresIn: 3600 },
  )
}

const IMAGE_MIME_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png':  'png',
  'image/webp': 'webp',
}
const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

/** 從 multipart form 取出圖片 ref:優先上傳檔案,否則用貼的網址(imageUrl 欄位) */
export async function extractImageFromForm(
  form: FormData,
  folder: string,
): Promise<string | { error: string }> {
  const file = form.get('file')
  if (file instanceof File && file.size > 0) {
    const ext = IMAGE_MIME_EXT[file.type]
    if (!ext) return { error: '僅支援 JPG / PNG / WebP 圖片' }
    if (file.size > MAX_IMAGE_SIZE) return { error: '圖片大小不可超過 5MB' }
    const buffer = Buffer.from(await file.arrayBuffer())
    return saveMedia(buffer, { ext, contentType: file.type, folder })
  }
  const url = String(form.get('imageUrl') ?? '').trim()
  if (!url) return { error: '請上傳圖片或填寫圖片網址' }
  return url
}

/** 刪除實體檔案(外部網址不動;本機檔/S3 物件刪除) */
export async function deleteMedia(ref: string): Promise<void> {
  if (isExternal(ref)) return
  if (isLocal(ref)) {
    await unlink(path.join(process.cwd(), 'public', ref)).catch(() => {})
    return
  }
  await s3().send(new DeleteObjectCommand({ Bucket: process.env.S3_BUCKET_NAME!, Key: ref })).catch(() => {})
}
