import type { Award } from '@/db/schema'
import type { AwardUpdateInput } from '@/lib/validations'

async function apiFetch(url: string, init?: RequestInit) {
  const res = await fetch(url, init)
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? 'API error')
  return json.data
}

export const getAwards = (): Promise<Award[]> =>
  apiFetch('/api/awards')

export const getAllAwards = (): Promise<Award[]> =>
  apiFetch('/api/awards?all=true')

/* 圖片上傳 — multipart form data */
export const createAward = (data: { title: string; sortOrder: number; file: File }): Promise<Award> => {
  const form = new FormData()
  form.append('title', data.title)
  form.append('sortOrder', String(data.sortOrder))
  form.append('file', data.file)
  return apiFetch('/api/awards', { method: 'POST', body: form })
}

export const updateAward = (id: string, data: AwardUpdateInput): Promise<Award> =>
  apiFetch(`/api/awards/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

export const deleteAward = (id: string): Promise<{ id: string }> =>
  apiFetch(`/api/awards/${id}`, { method: 'DELETE' })
