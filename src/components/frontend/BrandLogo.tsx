/* 巨將人力資源 brand mark — 多彩圓弧環繞標誌,對應設計提案 */

export function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <g strokeWidth="5" strokeLinecap="round">
        <circle cx="18" cy="18" r="14" stroke="#FF6B00" strokeDasharray="16 72" transform="rotate(-80 18 18)" />
        <circle cx="18" cy="18" r="14" stroke="#0052A5" strokeDasharray="16 72" transform="rotate(10 18 18)" />
        <circle cx="18" cy="18" r="14" stroke="#27AE60" strokeDasharray="16 72" transform="rotate(100 18 18)" />
        <circle cx="18" cy="18" r="14" stroke="#F4B400" strokeDasharray="16 72" transform="rotate(190 18 18)" />
      </g>
    </svg>
  )
}

export default function BrandLogo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const main = variant === 'light' ? 'text-white' : 'text-[#333F4F]'
  const sub  = variant === 'light' ? 'text-white/50' : 'text-[#6B7A8D]'
  const en   = variant === 'light' ? 'text-white/35' : 'text-[#9AA6B5]'

  return (
    <span className="flex items-center gap-2.5">
      <BrandMark />
      <span className="flex flex-col">
        <span className="flex items-baseline gap-1 leading-none whitespace-nowrap">
          <span className={`text-xl font-bold tracking-wide ${main}`}>巨將</span>
          <span className={`text-[17px] font-bold ${main}`}>人力資源</span>
          <span className={`text-[10px] font-medium ${sub}`}>顧問有限公司</span>
        </span>
        <span className={`text-[8px] tracking-wide mt-1 ${en}`}>Ju Jiang Human Resources Consultant Co., Ltd.</span>
      </span>
    </span>
  )
}
