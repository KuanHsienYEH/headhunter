'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listResumes, updateResumeStatus, deleteResume, getResumeDownloadUrl } from '@/api/resumes'
import type { ResumeStatusInput } from '@/api/resumes'

type Status = NonNullable<ResumeStatusInput['status']>

const statusLabel: Record<string, string> = {
  unread: '未讀',
  in_progress: '處理中',
  closed: '已結案',
}

const statusClass: Record<string, string> = {
  unread: 'bg-amber-50 text-amber-800',
  in_progress: 'bg-blue-50 text-navy',
  closed: 'bg-warm-alt text-slate',
}

export default function AdminResumesPage() {
  const [filter, setFilter] = useState<'all' | Status>('all')
  const queryClient = useQueryClient()

  const { data: resumes, isLoading, error } = useQuery({ queryKey: ['admin-resumes'], queryFn: listResumes })

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Status }) => updateResumeStatus(id, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-resumes'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteResume,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-resumes'] }),
  })

  const downloadMutation = useMutation({
    mutationFn: getResumeDownloadUrl,
    onSuccess: (data) => window.open(data.url, '_blank', 'noopener,noreferrer'),
  })

  const filtered = resumes?.filter((r) => filter === 'all' || r.status === filter) ?? []

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-medium text-navy">履歷管理</h1>
        <div className="flex gap-1 bg-white border border-border-c rounded-full p-1">
          {(['all', 'unread', 'in_progress', 'closed'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${filter === f ? 'bg-navy text-white' : 'text-slate hover:text-navy'}`}
            >
              {f === 'all' ? '全部' : statusLabel[f]}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <p className="text-sm text-slate">載入中…</p>}
      {Boolean(error) && <p className="text-sm text-red-600">{error instanceof Error ? error.message : '載入失敗'}</p>}

      {resumes && (
        <div className="bg-white border border-border-c rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-c text-left text-xs text-slate uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">姓名</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">應徵職缺</th>
                <th className="px-5 py-3 font-medium">目前職銜</th>
                <th className="px-5 py-3 font-medium">狀態</th>
                <th className="px-5 py-3 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-8 text-center text-slate">尚無符合條件的履歷</td></tr>
              )}
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-border-c last:border-0">
                  <td className="px-5 py-3 font-medium text-navy">{r.name}</td>
                  <td className="px-5 py-3 text-slate">{r.email}</td>
                  <td className="px-5 py-3">
                    {r.jobTitle
                      ? <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-50 text-navy">{r.jobTitle}</span>
                      : <span className="text-xs text-slate/50">主動登記</span>}
                  </td>
                  <td className="px-5 py-3 text-slate">{r.currentTitle}</td>
                  <td className="px-5 py-3">
                    <select
                      value={r.status}
                      onChange={(e) => statusMutation.mutate({ id: r.id, status: e.target.value as Status })}
                      className={`text-xs px-2 py-1 rounded-full font-medium border-0 ${statusClass[r.status]}`}
                    >
                      {Object.entries(statusLabel).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => downloadMutation.mutate(r.id)}
                        disabled={downloadMutation.isPending}
                        className="text-gold hover:text-gold-hover disabled:opacity-50"
                      >
                        下載
                      </button>
                      <button
                        type="button"
                        onClick={() => { if (confirm('確定要刪除此履歷及檔案嗎？此操作無法復原。')) deleteMutation.mutate(r.id) }}
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
