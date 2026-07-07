'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { adminSignIn } from '@/api/auth'
import Field, { fieldInputClass } from '@/components/ui/Field'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/jobs'

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => adminSignIn(email, password),
    onSuccess: () => router.push(callbackUrl),
  })

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    mutation.mutate({ email: String(form.get('email')), password: String(form.get('password')) })
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full max-w-sm">
      <Field label="帳號" required>
        <input name="email" type="text" required autoComplete="username" className={fieldInputClass} />
      </Field>
      <Field label="密碼" required>
        <input name="password" type="password" required autoComplete="current-password" className={fieldInputClass} />
      </Field>
      {mutation.isError && (
        <p className="text-sm text-red-600">
          {mutation.error instanceof Error ? mutation.error.message : '登入失敗'}
        </p>
      )}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-medium hover:bg-gold-hover transition-colors text-sm disabled:opacity-50"
      >
        {mutation.isPending ? '登入中…' : '登入'}
      </button>
    </form>
  )
}
