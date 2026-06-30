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

export async function createInquiry(input: CreateInquiryInput) {
  const res = await fetch('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? 'Submission failed')
  return json.data as { id: string }
}
