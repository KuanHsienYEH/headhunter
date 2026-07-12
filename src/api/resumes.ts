import type { Resume } from '@/db/schema'

export type CreateResumeInput = {
  name: string
  email: string
  currentTitle?: string
  direction?: string
  /* 應徵的職缺 id(從職缺詳情頁投遞時帶入) */
  jobId?: string
  /* 蜜罐欄位 — 僅供機器人偵測 */
  website?: string
  file: File
}

export type ResumeStatusInput = {
  status?: 'unread' | 'in_progress' | 'closed'
  note?: string
}

async function unwrap<T>(res: Response): Promise<T> {
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? '操作失敗')
  return json.data as T
}

export async function createResume(input: CreateResumeInput) {
  const form = new FormData()
  form.set('name', input.name)
  form.set('email', input.email)
  if (input.currentTitle) form.set('currentTitle', input.currentTitle)
  if (input.direction) form.set('direction', input.direction)
  if (input.jobId) form.set('jobId', input.jobId)
  if (input.website) form.set('website', input.website)
  form.set('consent', 'true')
  form.set('file', input.file)

  const res = await fetch('/api/resumes', { method: 'POST', body: form })
  return unwrap<{ id: string }>(res)
}

export type ResumeRow = Resume & { jobTitle: string | null }

export async function listResumes(): Promise<ResumeRow[]> {
  const res = await fetch('/api/resumes')
  return unwrap<ResumeRow[]>(res)
}

export async function updateResumeStatus(id: string, input: ResumeStatusInput): Promise<Resume> {
  const res = await fetch(`/api/resumes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return unwrap<Resume>(res)
}

export async function deleteResume(id: string): Promise<{ id: string; deleted: boolean }> {
  const res = await fetch(`/api/resumes/${id}`, { method: 'DELETE' })
  return unwrap<{ id: string; deleted: boolean }>(res)
}

export async function getResumeDownloadUrl(id: string): Promise<{ url: string; originalName: string; expiresIn: number }> {
  const res = await fetch(`/api/resumes/${id}/download`)
  return unwrap<{ url: string; originalName: string; expiresIn: number }>(res)
}
