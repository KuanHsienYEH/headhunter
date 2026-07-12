import type { LegalResource } from '@/db/schema'

export type LegalResourceInput = {
  category: 'gov' | 'doc'
  titleZh: string
  titleEn?: string
  /* 外部連結(gov)或留空;doc 可改上傳 file */
  url?: string
  file?: File | null
  sortOrder: number
  isActive?: boolean
}

async function apiFetch(url: string, init?: RequestInit) {
  const res = await fetch(url, init)
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? 'API error')
  return json.data
}

function toFormData(data: LegalResourceInput): FormData {
  const form = new FormData()
  form.set('category', data.category)
  form.set('titleZh', data.titleZh)
  if (data.titleEn) form.set('titleEn', data.titleEn)
  if (data.url) form.set('url', data.url)
  if (data.file) form.set('file', data.file)
  form.set('sortOrder', String(data.sortOrder))
  form.set('isActive', String(data.isActive ?? true))
  return form
}

export const getLegalResources = (): Promise<LegalResource[]> =>
  apiFetch('/api/legal-resources')

export const getAllLegalResources = (): Promise<LegalResource[]> =>
  apiFetch('/api/legal-resources?all=true')

export const createLegalResource = (data: LegalResourceInput): Promise<LegalResource> =>
  apiFetch('/api/legal-resources', { method: 'POST', body: toFormData(data) })

export const updateLegalResource = (id: string, data: LegalResourceInput): Promise<LegalResource> =>
  apiFetch(`/api/legal-resources/${id}`, { method: 'PUT', body: toFormData(data) })

export const deleteLegalResource = (id: string): Promise<{ id: string }> =>
  apiFetch(`/api/legal-resources/${id}`, { method: 'DELETE' })
