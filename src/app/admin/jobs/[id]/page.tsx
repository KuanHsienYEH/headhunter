'use client'

import { useParams, useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getJob, updateJob } from '@/api/jobs'
import JobForm from '@/features/admin/JobForm'

export default function EditJobPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: job, isLoading, error: loadError } = useQuery({
    queryKey: ['admin-job', params.id],
    queryFn: () => getJob(params.id),
  })

  const mutation = useMutation({
    mutationFn: (input: Parameters<typeof updateJob>[1]) => updateJob(params.id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] })
      router.push('/admin/jobs')
    },
  })

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-navy mb-6">編輯職缺</h1>
      {isLoading && <p className="text-sm text-slate">載入中…</p>}
      {Boolean(loadError) && <p className="text-sm text-red-600">{loadError instanceof Error ? loadError.message : '載入失敗'}</p>}
      {job && (
        <JobForm
          defaultValues={job}
          onSubmit={(input) => mutation.mutate(input)}
          pending={mutation.isPending}
          error={mutation.error}
          submitLabel="儲存變更"
        />
      )}
    </div>
  )
}
