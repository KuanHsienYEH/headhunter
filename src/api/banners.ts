import type { Banner } from '@/db/schema'

export type BannerFormInput = {
  title: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  /* 二擇一:上傳檔案(優先)或外部圖片網址;編輯時兩者皆空 = 沿用原圖 */
  file?: File | null
  imageUrl?: string
  sortOrder: number
  isActive: boolean
}

async function apiFetch(url: string, init?: RequestInit) {
  const res = await fetch(url, init)
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? 'API error')
  return json.data
}

function toFormData(data: BannerFormInput): FormData {
  const form = new FormData()
  form.set('title', data.title)
  if (data.subtitle) form.set('subtitle', data.subtitle)
  if (data.buttonText) form.set('buttonText', data.buttonText)
  if (data.buttonLink) form.set('buttonLink', data.buttonLink)
  if (data.file) form.set('file', data.file)
  if (data.imageUrl) form.set('imageUrl', data.imageUrl)
  form.set('sortOrder', String(data.sortOrder))
  form.set('isActive', String(data.isActive))
  return form
}

export const getBanners = (): Promise<Banner[]> =>
  apiFetch('/api/banners')

export const getAllBanners = (): Promise<Banner[]> =>
  apiFetch('/api/banners?all=true')

export const createBanner = (data: BannerFormInput): Promise<Banner> =>
  apiFetch('/api/banners', { method: 'POST', body: toFormData(data) })

export const updateBanner = (id: string, data: BannerFormInput): Promise<Banner> =>
  apiFetch(`/api/banners/${id}`, { method: 'PUT', body: toFormData(data) })

export const deleteBanner = (id: string): Promise<{ id: string }> =>
  apiFetch(`/api/banners/${id}`, { method: 'DELETE' })
