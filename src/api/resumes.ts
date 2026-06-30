export type CreateResumeInput = {
  name: string
  email: string
  currentTitle?: string
  direction?: string
  file: File
}

export async function createResume(input: CreateResumeInput) {
  const form = new FormData()
  form.set('name', input.name)
  form.set('email', input.email)
  if (input.currentTitle) form.set('currentTitle', input.currentTitle)
  if (input.direction) form.set('direction', input.direction)
  form.set('consent', 'true')
  form.set('file', input.file)

  const res = await fetch('/api/resumes', { method: 'POST', body: form })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? 'Submission failed')
  return json.data as { id: string }
}
