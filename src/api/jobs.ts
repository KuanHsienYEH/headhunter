import type { Job } from '@/db/schema'

export type JobFormInput = {
  titleZh: string
  titleEn?: string
  descZh: string
  descEn?: string
  industryZh: string
  industryEn?: string
  location?: string
  lang: 'zh' | 'en' | 'both'
  isActive: boolean
}

async function unwrap<T>(res: Response): Promise<T> {
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? '操作失敗')
  return json.data as T
}

export async function listJobs(): Promise<Job[]> {
  const res = await fetch('/api/jobs')
  return unwrap<Job[]>(res)
}

export async function getJob(id: string): Promise<Job> {
  const res = await fetch(`/api/jobs/${id}`)
  return unwrap<Job>(res)
}

export async function createJob(input: JobFormInput): Promise<Job> {
  const res = await fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return unwrap<Job>(res)
}

export async function updateJob(id: string, input: Partial<JobFormInput>): Promise<Job> {
  const res = await fetch(`/api/jobs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return unwrap<Job>(res)
}

export async function deleteJob(id: string): Promise<{ id: string }> {
  const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' })
  return unwrap<{ id: string }>(res)
}
