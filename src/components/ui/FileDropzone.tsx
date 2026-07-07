'use client'

import { useState, useRef, useCallback } from 'react'

interface FileDropzoneProps {
  name: string
  accept?: string
  maxMB?: number
  lang?: 'zh' | 'en'
  onChange?: (file: File | null) => void
}

const copy = {
  zh: {
    drag: '拖曳 PDF 至此，或',
    browse: '點擊選擇檔案',
    hint: 'PDF，最大 5MB',
    tooLarge: (mb: number) => `檔案超過 ${mb}MB 限制`,
    wrongType: '請選擇 PDF 檔案',
    remove: '移除',
  },
  en: {
    drag: 'Drag PDF here, or',
    browse: 'browse files',
    hint: 'PDF, max 5 MB',
    tooLarge: (mb: number) => `File exceeds ${mb} MB limit`,
    wrongType: 'Please select a PDF file',
    remove: 'Remove',
  },
} as const

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

export default function FileDropzone({
  name,
  accept = 'application/pdf',
  maxMB = 5,
  lang = 'zh',
  onChange,
}: FileDropzoneProps) {
  const t = copy[lang]
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validate = useCallback((f: File): string | null => {
    if (!f.type.includes('pdf')) return t.wrongType
    if (f.size > maxMB * 1024 * 1024) return t.tooLarge(maxMB)
    return null
  }, [maxMB, t])

  const pick = useCallback((f: File | null) => {
    if (!f) { setFile(null); setError(null); onChange?.(null); return }
    const err = validate(f)
    if (err) { setError(err); return }
    setError(null)
    setFile(f)
    onChange?.(f)
  }, [validate, onChange])

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    pick(e.dataTransfer.files[0] ?? null)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    pick(e.target.files?.[0] ?? null)
  }

  function remove() {
    setFile(null)
    setError(null)
    onChange?.(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Hidden native input for form submission */}
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        required={!file}
        onChange={handleChange}
        className="sr-only"
        aria-hidden="true"
      />

      {file ? (
        <div
          className="flex items-center gap-4 px-5 py-4 rounded-xl border border-[#27AE60]/40 bg-[#EAF7F0] transition-all"
          style={{ animation: 'slideIn .2s ease both' }}
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#D1F0E0' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-[#1A6640] truncate">{file.name}</p>
            <p className="text-[11px] text-[#27AE60]">{formatSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={remove}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#27AE60] hover:bg-[#27AE60]/15 transition-colors flex-shrink-0"
            aria-label={t.remove}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`w-full rounded-xl border-2 border-dashed px-6 py-8 flex flex-col items-center gap-3 transition-all cursor-pointer ${
            dragOver
              ? 'border-[#0052A5] bg-[#E8F0FB]'
              : 'border-[#E0E4EA] bg-[#F5F7FA] hover:border-[#0052A5]/50 hover:bg-[#EEF3FA]'
          }`}
          style={{ animation: 'fadeIn .2s ease' }}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform ${dragOver ? 'scale-110' : ''}`}
            style={{ background: dragOver ? '#E8F0FB' : 'white', border: `2px solid ${dragOver ? '#0052A5' : '#E0E4EA'}` }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={dragOver ? '#0052A5' : '#6B7A8D'} strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-[13px] text-[#6B7A8D]">
              {t.drag}{' '}
              <span className="text-[#0052A5] font-medium underline underline-offset-2">{t.browse}</span>
            </p>
            <p className="text-[11px] text-[#6B7A8D]/60 mt-1">{t.hint}</p>
          </div>
        </button>
      )}

      {error && <p className="text-[12px] text-red-500">{error}</p>}

    </div>
  )
}
