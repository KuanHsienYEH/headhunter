import { getPublicMediaCdnUrl } from './media-url'

/**
 * 有設定 CloudFront 時直接回傳 CDN URL；否則使用站內版本化快取代理。
 */
export function getAwardImageUrl(id: string, imageRef: string, updatedAt: Date | string): string {
  const publicMediaUrl = getPublicMediaCdnUrl(imageRef)
  if (publicMediaUrl) return publicMediaUrl

  // 相容已部署的舊環境變數，後續統一使用 MEDIA_CDN_URL。
  const cdnUrl = process.env.AWARDS_CDN_URL?.trim().replace(/\/+$/, '')
  const isS3ObjectKey = !imageRef.startsWith('http://') && !imageRef.startsWith('https://') && !imageRef.startsWith('/')
  if (cdnUrl && isS3ObjectKey) {
    const encodedKey = imageRef.split('/').map(encodeURIComponent).join('/')
    return `${cdnUrl}/${encodedKey}`
  }

  const version = new Date(updatedAt).getTime()
  return `/api/awards/${encodeURIComponent(id)}/image?v=${version}`
}
