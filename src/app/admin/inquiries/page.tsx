'use client'

import { Fragment, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listInquiries, updateInquiryStatus } from '@/api/inquiries'
import type { InquiryStatusInput } from '@/api/inquiries'

type Status = NonNullable<InquiryStatusInput['status']>

const statusLabel: Record<string, string> = {
  new: '新進',
  in_progress: '處理中',
  closed: '已結案',
  rejected: '已婉拒',
}

const statusClass: Record<string, string> = {
  new: 'bg-amber-50 text-amber-800',
  in_progress: 'bg-blue-50 text-navy',
  closed: 'bg-emerald-50 text-emerald-800',
  rejected: 'bg-warm-alt text-slate',
}

/* 展開列的欄位:未填值顯示破折號 */
function DetailField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs text-slate/70 mb-1">{label}</div>
      <div className="text-sm text-navy">{children}</div>
    </div>
  )
}

export default function AdminInquiriesPage() {
  const [filter, setFilter] = useState<'all' | Status>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const { data: inquiries, isLoading, error } = useQuery({ queryKey: ['admin-inquiries'], queryFn: listInquiries })

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Status }) => updateInquiryStatus(id, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] }),
  })

  const filtered = inquiries?.filter((i) => filter === 'all' || i.status === filter) ?? []

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-medium text-navy">企業委託管理</h1>
        <div className="flex gap-1 bg-white border border-border-c rounded-full p-1 flex-wrap">
          {(['all', 'new', 'in_progress', 'closed', 'rejected'] as const).map((f) => (
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

      {inquiries && (
        <div className="bg-white border border-border-c rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-c text-left text-xs text-slate uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">公司</th>
                <th className="px-5 py-3 font-medium">聯絡人</th>
                <th className="px-5 py-3 font-medium">職位</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">狀態</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-slate">尚無符合條件的委託</td></tr>
              )}
              {filtered.map((i) => {
                const open = expandedId === i.id
                return (
                  <Fragment key={i.id}>
                    <tr
                      onClick={() => setExpandedId(open ? null : i.id)}
                      className={`border-b border-border-c align-top cursor-pointer transition-colors hover:bg-warm-white ${open ? 'bg-warm-white' : ''}`}
                    >
                      <td className="px-5 py-3 font-medium text-navy">
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={`inquiry-${i.id}`}
                          onClick={(e) => { e.stopPropagation(); setExpandedId(open ? null : i.id) }}
                          className="flex items-center gap-2 text-left hover:text-gold transition-colors"
                        >
                          <svg
                            width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                            className={`flex-shrink-0 text-slate/60 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
                            aria-hidden="true"
                          >
                            <path d="M9 5l7 7-7 7" />
                          </svg>
                          {i.company}
                        </button>
                      </td>
                      <td className="px-5 py-3 text-slate">{i.contactName}</td>
                      <td className="px-5 py-3 text-slate">{i.position}</td>
                      <td className="px-5 py-3 text-slate">{i.email}</td>
                      <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={i.status}
                          onChange={(e) => statusMutation.mutate({ id: i.id, status: e.target.value as Status })}
                          className={`text-xs px-2 py-1 rounded-full font-medium border-0 ${statusClass[i.status]}`}
                        >
                          {Object.entries(statusLabel).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                      </td>
                    </tr>

                    {open && (
                      <tr id={`inquiry-${i.id}`} className="border-b border-border-c bg-warm-white">
                        <td colSpan={5} className="px-5 pt-1 pb-5">
                          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4 max-w-3xl">
                            <DetailField label="電話">
                              {i.phone
                                ? <a href={`tel:${i.phone}`} className="text-gold hover:text-gold-hover" onClick={(e) => e.stopPropagation()}>{i.phone}</a>
                                : <span className="text-slate/50">—</span>}
                            </DetailField>
                            <DetailField label="預算">
                              {i.budget || <span className="text-slate/50">—</span>}
                            </DetailField>
                            <div className="sm:col-span-2">
                              <DetailField label="需求說明">
                                <p className="whitespace-pre-wrap leading-relaxed">{i.message}</p>
                              </DetailField>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
