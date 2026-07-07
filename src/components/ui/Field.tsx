export const fieldInputClass =
  'border border-border-c rounded-lg px-3.5 py-2.5 text-sm text-dark placeholder:text-muted/50 focus:outline-none focus:border-brand transition-colors'

export default function Field({
  label,
  children,
  required,
}: {
  label: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-dark">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </span>
      {children}
    </label>
  )
}
