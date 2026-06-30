export const fieldInputClass =
  'border border-border-c rounded-lg px-3.5 py-2.5 text-sm text-navy placeholder:text-slate/50 focus:outline-none focus:border-gold transition-colors'

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
      <span className="text-sm font-medium text-navy">
        {label}
        {required && <span className="text-gold ml-0.5">*</span>}
      </span>
      {children}
    </label>
  )
}
