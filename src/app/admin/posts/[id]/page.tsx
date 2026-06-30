'use client'

import { useParams, useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPost, updatePost } from '@/api/posts'
import PostForm from '@/features/admin/PostForm'

export default function EditPostPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: post, isLoading, error: loadError } = useQuery({
    queryKey: ['admin-post', params.id],
    queryFn: () => getPost(params.id),
  })

  const mutation = useMutation({
    mutationFn: (input: Parameters<typeof updatePost>[1]) => updatePost(params.id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] })
      router.push('/admin/posts')
    },
  })

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-navy mb-6">編輯文章</h1>
      {isLoading && <p className="text-sm text-slate">載入中…</p>}
      {Boolean(loadError) && <p className="text-sm text-red-600">{loadError instanceof Error ? loadError.message : '載入失敗'}</p>}
      {post && (
        <PostForm
          defaultValues={post}
          onSubmit={(input) => mutation.mutate(input)}
          pending={mutation.isPending}
          error={mutation.error}
          submitLabel="儲存變更"
        />
      )}
    </div>
  )
}
