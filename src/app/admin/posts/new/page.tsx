'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from '@/api/posts'
import PostForm from '@/features/admin/PostForm'

export default function NewPostPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] })
      router.push('/admin/posts')
    },
  })

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-navy mb-6">新增文章</h1>
      <PostForm
        onSubmit={(input) => mutation.mutate(input)}
        pending={mutation.isPending}
        error={mutation.error}
        submitLabel="建立文章"
      />
    </div>
  )
}
