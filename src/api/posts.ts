import type { Post } from '@/db/schema'

export type PostFormInput = {
  titleZh: string
  titleEn?: string
  slug: string
  bodyZh?: string
  bodyEn?: string
  coverImage?: string
  lang: 'zh' | 'en' | 'both'
  status: 'draft' | 'published'
}

async function unwrap<T>(res: Response): Promise<T> {
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? '操作失敗')
  return json.data as T
}

export async function listPosts(): Promise<Post[]> {
  const res = await fetch('/api/posts')
  return unwrap<Post[]>(res)
}

export async function getPost(id: string): Promise<Post> {
  const res = await fetch(`/api/posts/${id}`)
  return unwrap<Post>(res)
}

export async function createPost(input: PostFormInput): Promise<Post> {
  const res = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return unwrap<Post>(res)
}

export async function updatePost(id: string, input: Partial<PostFormInput>): Promise<Post> {
  const res = await fetch(`/api/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return unwrap<Post>(res)
}

export async function deletePost(id: string): Promise<{ id: string }> {
  const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
  return unwrap<{ id: string }>(res)
}
