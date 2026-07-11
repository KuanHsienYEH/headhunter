/**
 * 履歷檔案儲存 — 環境自動切換:
 *   - 有設定 S3(雲端/Vercel):私有 bucket + 15 分鐘簽名網址
 *   - 未設定 S3(本機開發):存到 uploads-private/(非 public,不可被網址直接存取),
 *     由 /api/resumes/[id]/download 以 local 模式回傳串流網址
 * fileKey 以 'local/' 開頭 → 本機檔;否則 → S3 key。
 */
import { mkdir, writeFile, unlink, readFile } from 'fs/promises'
import path from 'path'
import { uploadResume as s3Upload, getResumeSignedUrl, deleteResume as s3Delete } from './s3'

const hasS3 = !!(
  process.env.S3_BUCKET_NAME &&
  process.env.S3_ACCESS_KEY_ID &&
  process.env.S3_SECRET_ACCESS_KEY &&
  !process.env.S3_BUCKET_NAME.includes('your-bucket')
)

const LOCAL_DIR = path.join(process.cwd(), 'uploads-private', 'resumes')
const isLocalKey = (key: string) => key.startsWith('local/')

/** 儲存履歷,回傳 fileKey */
export async function saveResumeFile(buffer: Buffer, originalName: string): Promise<string> {
  if (hasS3) return s3Upload(buffer, originalName)

  const ext = originalName.split('.').pop() ?? 'pdf'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  await mkdir(LOCAL_DIR, { recursive: true })
  await writeFile(path.join(LOCAL_DIR, filename), buffer)
  return `local/resumes/${filename}`
}

/** 取得下載網址:S3 → 簽名網址;本機 → 管理端串流 route */
export async function resolveResumeUrl(fileKey: string, resumeId: string): Promise<string> {
  if (isLocalKey(fileKey)) return `/api/resumes/${resumeId}/file`
  return getResumeSignedUrl(fileKey)
}

/** 讀取本機履歷檔(僅供管理端串流 route 使用) */
export async function readLocalResume(fileKey: string): Promise<Buffer> {
  const filename = path.basename(fileKey) // 防路徑跳脫
  return readFile(path.join(LOCAL_DIR, filename))
}

/** 刪除實體檔案 */
export async function deleteResumeFile(fileKey: string): Promise<void> {
  if (isLocalKey(fileKey)) {
    await unlink(path.join(LOCAL_DIR, path.basename(fileKey))).catch(() => {})
    return
  }
  await s3Delete(fileKey).catch(() => {})
}
