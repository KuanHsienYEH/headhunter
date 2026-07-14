import type { Announcement } from '@/db/schema'

export type AnnouncementFormInput = {
  text: string
  popupTitle: string
  popupBody: string
  imageUrl?: string
  file?: File | null
  sortOrder: number
  isActive: boolean
}

async function unwrap<T>(res: Response): Promise<T> {
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? '操作失敗')
  return json.data as T
}

function toFormData(input: AnnouncementFormInput): FormData {
  const form = new FormData()
  form.set('text', input.text)
  form.set('popupTitle', input.popupTitle)
  form.set('popupBody', input.popupBody)
  if (input.imageUrl) form.set('imageUrl', input.imageUrl)
  if (input.file) form.set('file', input.file)
  form.set('sortOrder', String(input.sortOrder))
  form.set('isActive', String(input.isActive))
  return form
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const res = await fetch('/api/announcements', { cache: 'no-store' })
  return unwrap<Announcement[]>(res)
}

export async function getAllAnnouncements(): Promise<Announcement[]> {
  const res = await fetch('/api/announcements?all=true', { cache: 'no-store' })
  return unwrap<Announcement[]>(res)
}

export async function createAnnouncement(input: AnnouncementFormInput): Promise<Announcement> {
  const res = await fetch('/api/announcements', { method: 'POST', body: toFormData(input) })
  return unwrap<Announcement>(res)
}

export async function updateAnnouncement(id: string, input: AnnouncementFormInput): Promise<Announcement> {
  const res = await fetch(`/api/announcements/${id}`, { method: 'PUT', body: toFormData(input) })
  return unwrap<Announcement>(res)
}

export async function deleteAnnouncement(id: string): Promise<{ id: string }> {
  const res = await fetch(`/api/announcements/${id}`, { method: 'DELETE' })
  return unwrap<{ id: string }>(res)
}
