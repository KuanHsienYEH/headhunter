/** 獎狀圖片儲存 — 委派給通用 media-storage。 */
import { saveMedia, deleteMedia } from './media-storage'

export const saveAwardImage = (buffer: Buffer, ext: string, contentType: string) =>
  saveMedia(buffer, { ext, contentType, folder: 'awards' })

export const deleteAwardImage = deleteMedia
