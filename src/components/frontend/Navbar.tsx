'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import BrandLogo from './BrandLogo'

interface NavbarProps {
  lang: 'zh' | 'en'
}

export default function Navbar({ lang }: NavbarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isEn  = lang === 'en'
  const base  = isEn ? '/en' : ''
  const altLang = isEn ? pathname.replace(/^\/en/, '') || '/' : `/en${pathname}`

  const links = [
    { href: `${base}/about`,    label: isEn ? 'About Us'  : '關於我們' },
    { href: `${base}/jobs`,     label: isEn ? 'Openings'  : '求職專區' },
    { href: `${base}/services`, label: isEn ? 'Employers' : '企業專區' },
    { href: `${base}/insights`, label: isEn ? 'Insights'  : '產業觀察' },
    { href: `${base}/contact`,  label: isEn ? 'Contact'   : '聯絡我們' },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E0E4EA] shadow-sm" style={{ height: 64 }}>
      <nav className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between" aria-label="Main navigation">

        {/* Logo */}
        <Link href={base || '/'} className="flex-shrink-0">
          <BrandLogo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 text-[13px] font-medium rounded transition-colors ${
                isActive(l.href)
                  ? 'text-[#0052A5]'
                  : 'text-[#333F4F] hover:text-[#0052A5]'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={altLang}
            className="text-xs px-2.5 py-1 border border-[#C5CCD6] rounded text-[#6B7A8D] hover:border-[#0052A5] hover:text-[#0052A5] transition-colors"
          >
            {isEn ? '中文' : 'EN'}
          </Link>
          <Link
            href={`${base}/contact`}
            className="text-[13px] font-medium px-4 py-2 rounded-full bg-[#FF6B00] text-white hover:bg-[#e05f00] transition-colors flex items-center gap-1.5"
          >
            {isEn ? 'Contact Us' : '人才媒合諮詢'}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#333F4F] hover:text-[#0052A5]"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8h16M4 16h16"/></svg>
          }
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#E0E4EA] px-6 py-4 flex flex-col gap-1 shadow-lg">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium text-[#333F4F] hover:text-[#0052A5] py-2.5 border-b border-[#E0E4EA] last:border-0"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-3 gap-3">
            <Link href={altLang} className="text-xs text-[#6B7A8D]" onClick={() => setOpen(false)}>
              {isEn ? '切換中文' : 'Switch to EN'}
            </Link>
            <Link
              href={`${base}/contact`}
              className="text-[13px] font-medium px-4 py-2 rounded-full bg-[#FF6B00] text-white"
              onClick={() => setOpen(false)}
            >
              {isEn ? 'Contact Us' : '人才媒合諮詢'}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
