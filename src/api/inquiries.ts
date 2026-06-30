import type { Inquiry } from '@/db/schema'

export type CreateInquiryInput = {
  company: string
  contactName: string
  email: string
  phone?: string
  position: string
  industry?: string
  budget?: string
  message: string
}

export type InquiryStatusInput = {
  status?: 'new' | 'in_progress' | 'closed' | 'rejected'
  note?: string
}

async function unwrap<T>(res: Response): Promise<T> {
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? '操作失敗')
  return json.data as T
}

export async function createInquiry(input: CreateInquiryInput) {
  const res = await fetch('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return unwrap<{ id: string }>(res)
}

export async function listInquiries(): Promise<Inquiry[]> {
  const res = await fetch('/api/inquiries')
  return unwrap<Inquiry[]>(res)
}

export async function updateInquiryStatus(id: string, input: InquiryStatusInput): Promise<Inquiry> {
  const res = await fetch(`/api/inquiries/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return unwrap<Inquiry>(res)
}
