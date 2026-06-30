'use client'

import Link from 'next/link'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listJobs, deleteJob } from '@/api/jobs'

export default function AdminJobsPage() {
  const queryClient = useQueryClient()
  const { data: jobs, isLoading, error } = useQuery({ queryKey: ['admin-jobs'], queryFn: listJobs })

  const deleteMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-jobs'] }),
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-medium text-navy">職缺管理</h1>
        <Link href="/admin/jobs/new" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold text-white text-sm font-medium hover:bg-gold-hover transition-colors">
          + 新增職缺
        </Link>
      </div>

      {isLoading && <p className="text-sm text-slate">載入中…</p>}
      {Boolean(error) && <p className="text-sm text-red-600">{error instanceof Error ? error.message : '載入失敗'}</p>}

      {jobs && (
        <div className="bg-white border border-border-c rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-c text-left text-xs text-slate uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">職位名稱</th>
                <th className="px-5 py-3 font-medium">產業別</th>
                <th className="px-5 py-3 font-medium">地點</th>
                <th className="px-5 py-3 font-medium">狀態</th>
                <th className="px-5 py-3 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-slate">尚無職缺</td></tr>
              )}
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-border-c last:border-0">
                  <td className="px-5 py-3 font-medium text-navy">{job.titleZh}</td>
                  <td className="px-5 py-3 text-slate">{job.industryZh}</td>
                  <td className="px-5 py-3 text-slate">{job.location}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${job.isActive ? 'bg-emerald-50 text-emerald-800' : 'bg-warm-alt text-slate'}`}>
                      {job.isActive ? '上架中' : '已下架'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <Link href={`/admin/jobs/${job.id}`} className="text-gold hover:text-gold-hover">編輯</Link>
                      <button
                        type="button"
                        onClick={() => { if (confirm('確定要刪除此職缺嗎？')) deleteMutation.mutate(job.id) }}
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
