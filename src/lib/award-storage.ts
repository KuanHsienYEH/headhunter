/** 獎狀圖片儲存 — 委派給通用 media-storage(S3/本機自動切換) */
import { saveMedia, resolveMediaUrl, deleteMedia } from './media-storage'

export const saveAwardImage = (buffer: Buffer, ext: string, contentType: string) =>
  saveMedia(buffer, { ext, contentType, folder: 'awards' })

export const resolveAwardImageUrl = resolveMediaUrl
export const deleteAwardImage = deleteMedia
