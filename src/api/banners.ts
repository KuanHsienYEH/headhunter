import type { Banner } from '@/db/schema'
import type { BannerInput } from '@/lib/validations'

async function apiFetch(url: string, init?: RequestInit) {
  const res = await fetch(url, init)
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? 'API error')
  return json.data
}

export const getBanners = (): Promise<Banner[]> =>
  apiFetch('/api/banners')

export const getAllBanners = (): Promise<Banner[]> =>
  apiFetch('/api/banners?all=true')

export const createBanner = (data: BannerInput): Promise<Banner> =>
  apiFetch('/api/banners', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

export const updateBanner = (id: string, data: Partial<BannerInput>): Promise<Banner> =>
  apiFetch(`/api/banners/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

export const deleteBanner = (id: string): Promise<{ id: string }> =>
  apiFetch(`/api/banners/${id}`, { method: 'DELETE' })
