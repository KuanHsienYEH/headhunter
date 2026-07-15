import { getAwardImageUrl } from '../award-image-url'
import { getPublicMediaCdnUrl } from '../media-url'

describe('getAwardImageUrl', () => {
  const originalCdnUrl = process.env.AWARDS_CDN_URL
  const originalMediaCdnUrl = process.env.MEDIA_CDN_URL
  const originalS3Prefix = process.env.S3_PREFIX

  beforeEach(() => {
    delete process.env.AWARDS_CDN_URL
    delete process.env.MEDIA_CDN_URL
    process.env.S3_PREFIX = 'prod'
  })

  afterEach(() => {
    if (originalCdnUrl === undefined) delete process.env.AWARDS_CDN_URL
    else process.env.AWARDS_CDN_URL = originalCdnUrl
    if (originalMediaCdnUrl === undefined) delete process.env.MEDIA_CDN_URL
    else process.env.MEDIA_CDN_URL = originalMediaCdnUrl
    if (originalS3Prefix === undefined) delete process.env.S3_PREFIX
    else process.env.S3_PREFIX = originalS3Prefix
  })

  it('未設定 CDN 時使用版本化站內代理', () => {
    expect(getAwardImageUrl('award-id', 'prod/awards/image.webp', '2026-07-14T00:00:00.000Z'))
      .toBe('/api/awards/award-id/image?v=1783987200000')
  })

  it('設定 CDN 時保留完整 S3 key 並編碼路徑', () => {
    process.env.AWARDS_CDN_URL = 'https://cdn.example.com/'

    expect(getAwardImageUrl('award-id', 'prod/awards/my award.webp', '2026-07-14T00:00:00.000Z'))
      .toBe('https://cdn.example.com/prod/awards/my%20award.webp')
  })

  it.each(['awards', 'banners', 'announcements'])('共用 CDN 支援 %s 公開圖片', folder => {
    process.env.MEDIA_CDN_URL = 'https://media.example.com/'

    expect(getPublicMediaCdnUrl(`prod/${folder}/image.webp`))
      .toBe(`https://media.example.com/prod/${folder}/image.webp`)
  })

  it('共用 CDN 不會公開其他 S3 路徑', () => {
    process.env.MEDIA_CDN_URL = 'https://media.example.com'

    expect(getPublicMediaCdnUrl('prod/resumes/private.pdf')).toBeNull()
  })
})
