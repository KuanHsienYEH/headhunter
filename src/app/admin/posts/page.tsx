'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listPosts, deletePost, updatePost } from '@/api/posts'
import type { Post } from '@/db/schema'

export default function AdminPostsPage() {
  const queryClient = useQueryClient()
  const { data: posts = [], isLoading, error } = useQuery({ queryKey: ['admin-posts'], queryFn: listPosts })

  /* 拖拉排序狀態 */
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-posts'] }),
  })

  /* 依新順序把 sortOrder 正規化為 0..n-1,只更新有變動的 */
  const reorderMut = useMutation({
    mutationFn: async (list: Post[]) => {
      await Promise.all(
        list
          .map((p, i) => (p.sortOrder !== i ? updatePost(p.id, { sortOrder: i }) : null))
          .filter(Boolean),
      )
    },
    onMutate: (list: Post[]) => {
      // 樂觀更新,放開滑鼠立即看到新順序
      queryClient.setQueryData(['admin-posts'], list.map((p, i) => ({ ...p, sortOrder: i })))
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['admin-posts'] }),
  })

  function handleDrop(target: number) {
    if (dragIndex !== null && dragIndex !== target) {
      const list = [...posts]
      const [moved] = list.splice(dragIndex, 1)
      list.splice(target, 0, moved)
      reorderMut.mutate(list)
    }
    setDragIndex(null)
    setOverIndex(null)
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir
    if (target < 0 || target >= posts.length) return
    const list = [...posts]
    const [moved] = list.splice(index, 1)
    list.splice(target, 0, moved)
    reorderMut.mutate(list)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-2xl font-medium text-navy">文章管理</h1>
        <Link href="/admin/posts/new" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold text-white text-sm font-medium hover:bg-gold-hover transition-colors">
          + 新增文章
        </Link>
      </div>
      <p className="text-xs text-slate/70 mb-6">拖曳列或使用 ↑ ↓ 調整順序，由上而下即為前台「產業觀察」的顯示順序。</p>

      {isLoading && <p className="text-sm text-slate">載入中…</p>}
      {Boolean(error) && <p className="text-sm text-red-600">{error instanceof Error ? error.message : '載入失敗'}</p>}

      {posts && (
        <div className="bg-white border border-border-c rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-c text-left text-xs text-slate uppercase tracking-wide">
                <th className="px-3 py-3 font-medium w-[90px]">順序</th>
                <th className="px-5 py-3 font-medium">標題</th>
                <th className="px-5 py-3 font-medium">Slug</th>
                <th className="px-5 py-3 font-medium">狀態</th>
                <th className="px-5 py-3 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-slate">尚無文章</td></tr>
              )}
              {posts.map((post, i) => (
                <tr
                  key={post.id}
                  draggable
                  onDragStart={() => setDragIndex(i)}
                  onDragOver={(e) => { e.preventDefault(); setOverIndex(i) }}
                  onDragLeave={() => setOverIndex(null)}
                  onDrop={() => handleDrop(i)}
                  onDragEnd={() => { setDragIndex(null); setOverIndex(null) }}
                  className={`border-b border-border-c last:border-0 cursor-move ${overIndex === i ? 'bg-gold-light' : ''} ${dragIndex === i ? 'opacity-50' : ''}`}
                >
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <span className="text-slate/50 select-none" aria-hidden="true">⠿</span>
                      <button
                        type="button"
                        onClick={() => move(i, -1)}
                        disabled={i === 0}
                        aria-label="上移"
                        className="w-6 h-6 rounded border border-border-c text-slate hover:text-navy hover:border-navy disabled:opacity-30 disabled:hover:text-slate disabled:hover:border-border-c transition-colors"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => move(i, 1)}
                        disabled={i === posts.length - 1}
                        aria-label="下移"
                        className="w-6 h-6 rounded border border-border-c text-slate hover:text-navy hover:border-navy disabled:opacity-30 disabled:hover:text-slate disabled:hover:border-border-c transition-colors"
                      >
                        ↓
                      </button>
                    </div>
                  </td>
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
