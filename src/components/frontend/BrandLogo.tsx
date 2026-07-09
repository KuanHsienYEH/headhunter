/* 巨將人力資源 brand mark — 三個人(綠、藍、紅橘)互相擁抱成圈,象徵「人才濟濟」 */

const PEOPLE = [
  { color: '#3FAE49', rotate: 0 },   // 綠
  { color: '#1B6BB5', rotate: 120 }, // 藍
  { color: '#E8511D', rotate: 240 }, // 紅橘
]

export function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {PEOPLE.map(p => (
        <g key={p.color} transform={`rotate(${p.rotate} 24 24)`}>
          {/* 頭 */}
          <circle cx="24" cy="9.6" r="4.4" fill={p.color} />
          {/* 環抱的身體 — 沿圓環順時針擁向下一個人 */}
          <path
            d="M 30.75 12.31 A 13.5 13.5 0 0 1 37.3 26.35"
            stroke={p.color}
            strokeWidth="7.2"
            strokeLinecap="round"
          />
        </g>
      ))}
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
