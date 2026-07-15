const PUBLIC_MEDIA_FOLDERS = ['awards', 'banners', 'announcements'] as const

/** 將允許公開的 S3 object key 轉成 CloudFront URL；私密或外部路徑回傳 null。 */
export function getPublicMediaCdnUrl(ref: string): string | null {
  const cdnUrl = process.env.MEDIA_CDN_URL?.trim().replace(/\/+$/, '')
  const prefix = process.env.S3_PREFIX?.trim().replace(/^\/+|\/+$/g, '')
  if (!cdnUrl || !prefix) return null

  const isPublicMedia = PUBLIC_MEDIA_FOLDERS.some(folder => ref.startsWith(`${prefix}/${folder}/`))
  if (!isPublicMedia) return null

  const encodedKey = ref.split('/').map(encodeURIComponent).join('/')
  return `${cdnUrl}/${encodedKey}`
}
