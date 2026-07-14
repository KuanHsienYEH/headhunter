export type AdminUser = { id: string; email: string; createdAt: string }

async function apiFetch(url: string, init?: RequestInit) {
  const res = await fetch(url, init)
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? 'API error')
  return json.data
}

const jsonInit = (method: string, body: unknown): RequestInit => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

export const listAdmins = (): Promise<AdminUser[]> =>
  apiFetch('/api/admins')

export const createAdmin = (data: { account: string; password: string }): Promise<AdminUser> =>
  apiFetch('/api/admins', jsonInit('POST', data))

export const updateAdmin = (id: string, data: { account?: string; password?: string }): Promise<AdminUser> =>
  apiFetch(`/api/admins/${id}`, jsonInit('PATCH', data))

export const deleteAdmin = (id: string): Promise<{ id: string }> =>
  apiFetch(`/api/admins/${id}`, { method: 'DELETE' })
