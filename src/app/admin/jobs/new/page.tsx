'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createJob } from '@/api/jobs'
import JobForm from '@/features/admin/JobForm'

export default function NewJobPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] })
      router.push('/admin/jobs')
    },
  })

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-navy mb-6">新增職缺</h1>
      <JobForm
        onSubmit={(input) => mutation.mutate(input)}
        pending={mutation.isPending}
        error={mutation.error}
        submitLabel="建立職缺"
      />
    </div>
  )
}
