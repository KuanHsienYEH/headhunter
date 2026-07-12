'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapLink from '@tiptap/extension-link'

/**
 * 簡易富文字編輯器(TipTap)— 後台文章內文用。
 * 輸出 HTML 字串,前台以 rich-content 樣式渲染。
 */
export default function RichTextEditor({
  value,
  onChange,
  placeholder = '',
}: {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      TiptapLink.configure({ openOnClick: false, autolink: true }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'rich-content min-h-[220px] px-4 py-3 focus:outline-none text-sm text-navy',
        'data-placeholder': placeholder,
      },
    },
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? '' : editor.getHTML()),
  })

  if (!editor) {
    return <div className="border border-border-c rounded-lg min-h-[260px] bg-white" />
  }

  const btn = (active: boolean) =>
    `px-2.5 py-1 rounded text-xs font-medium transition-colors ${
      active ? 'bg-navy text-white' : 'text-slate hover:bg-warm-alt'
    }`

  function setLink() {
    const prev = editor?.getAttributes('link').href as string | undefined
    const url = window.prompt('連結網址(留空移除連結)', prev ?? 'https://')
    if (url === null) return
    if (url === '' || url === 'https://') {
      editor?.chain().focus().unsetLink().run()
      return
    }
    editor?.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className="border border-border-c rounded-lg bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-border-c bg-warm-alt/50">
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive('heading', { level: 2 }))}>標題</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive('heading', { level: 3 }))}>小標</button>
        <span className="w-px h-4 bg-border-c mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive('bold'))}><b>B</b></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive('italic'))}><i>I</i></button>
        <span className="w-px h-4 bg-border-c mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive('bulletList'))}>• 清單</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive('orderedList'))}>1. 編號</button>
        <span className="w-px h-4 bg-border-c mx-1" />
        <button type="button" onClick={setLink} className={btn(editor.isActive('link'))}>連結</button>
        <span className="flex-1" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btn(false)}>復原</button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btn(false)}>重做</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
