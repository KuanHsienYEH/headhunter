'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

interface NavbarProps {
  lang: 'zh' | 'en'
}

export default function Navbar({ lang }: NavbarProps) {
  const pathname  = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  const isEn  = lang === 'en'
  const base  = isEn ? '/en' : ''
  const altLang = isEn ? pathname.replace(/^\/en/, '') || '/' : `/en${pathname}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: `${base}/about`,    label: isEn ? 'About'    : '關於我們' },
    { href: `${base}/services`, label: isEn ? 'Services' : '服務項目' },
    { href: `${base}/jobs`,     label: isEn ? 'Openings' : '職缺'     },
    { href: `${base}/insights`, label: isEn ? 'Insights' : '洞察'     },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy/98 shadow-md' : 'bg-navy'
      }`}
      style={{ height: 60 }}
    >
      <nav
        className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href={base || '/'}
          className="font-display text-lg font-medium text-warm-white tracking-tight"
        >
          獵才顧問
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-warm-white/60 hover:text-warm-white transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform" />
            </Link>
          ))}

          {/* Language toggle */}
          <Link
            href={altLang}
            className="text-xs px-3 py-1 border border-warm-white/25 rounded text-warm-white/60 hover:text-warm-white hover:border-warm-white/50 transition-colors"
          >
            {isEn ? '中' : 'EN'}
          </Link>

          {/* Primary CTA */}
          <Link
            href={`${base}/contact`}
            className="text-sm font-medium px-4 py-2 rounded-full bg-gold text-white hover:bg-gold-hover transition-colors flex items-center gap-1.5"
          >
            {isEn ? 'Hire in Taiwan' : '委託獵才'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-warm-white/70 hover:text-warm-white p-1"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
            : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>
          }
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-navy border-t border-warm-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-warm-white/70 hover:text-warm-white py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={altLang}
            className="text-sm text-warm-white/50 py-1"
            onClick={() => setOpen(false)}
          >
            {isEn ? '切換中文' : 'Switch to EN'}
          </Link>
          <Link
            href={`${base}/contact`}
            className="text-sm font-medium px-4 py-2 rounded-full bg-gold text-white text-center mt-2"
            onClick={() => setOpen(false)}
          >
            {isEn ? 'Hire in Taiwan' : '委託獵才'}
          </Link>
        </div>
      )}
    </header>
  )
}
