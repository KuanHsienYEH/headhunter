'use client'

import Link from 'next/link'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listPosts, deletePost } from '@/api/posts'

export default function AdminPostsPage() {
  const queryClient = useQueryClient()
  const { data: posts, isLoading, error } = useQuery({ queryKey: ['admin-posts'], queryFn: listPosts })

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-posts'] }),
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-medium text-navy">文章管理</h1>
        <Link href="/admin/posts/new" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold text-white text-sm font-medium hover:bg-gold-hover transition-colors">
          + 新增文章
        </Link>
      </div>

      {isLoading && <p className="text-sm text-slate">載入中…</p>}
      {Boolean(error) && <p className="text-sm text-red-600">{error instanceof Error ? error.message : '載入失敗'}</p>}

      {posts && (
        <div className="bg-white border border-border-c rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-c text-left text-xs text-slate uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">標題</th>
                <th className="px-5 py-3 font-medium">Slug</th>
                <th className="px-5 py-3 font-medium">狀態</th>
                <th className="px-5 py-3 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-slate">尚無文章</td></tr>
              )}
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-border-c last:border-0">
                  <td className="px-5 py-3 font-medium text-navy">{post.titleZh}</td>
                  <td className="px-5 py-3 text-slate">{post.slug}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.status === 'published' ? 'bg-emerald-50 text-emerald-800' : 'bg-warm-alt text-slate'}`}>
                      {post.status === 'published' ? '已發布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <Link href={`/admin/posts/${post.id}`} className="text-gold hover:text-gold-hover">編輯</Link>
                      <button
                        type="button"
                        onClick={() => { if (confirm('確定要刪除此文章嗎？')) deleteMutation.mutate(post.id) }}
                        className="text-red-600 hover:text-red-700"
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
