/* 巨將人力資源 brand mark — 三色人形環抱標誌(人才濟濟),使用正式 logo 圖檔 */

export function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <img
      src="/images/logo.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className="object-contain flex-shrink-0"
    />
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
