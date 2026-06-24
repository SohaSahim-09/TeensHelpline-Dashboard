'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Plus, Search, Bold, Italic, List, Heading2, Quote, Save, Loader2 } from 'lucide-react'
import { formatDate, getMoodEmoji } from '@/lib/utils'
import toast from 'react-hot-toast'

const moods = ['happy', 'calm', 'stressed', 'sad', 'excited', 'confused']

const sampleEntries = [
  { id: 1, title: 'Feeling better about exams', content: 'Today was a good day...', mood: 'calm', tags: ['exams', 'progress'], createdAt: new Date(Date.now() - 2 * 24 * 3600000), wordCount: 247 },
  { id: 2, title: 'Conversation with Dr. Priya', content: 'The session today was really helpful...', mood: 'happy', tags: ['counselling', 'growth'], createdAt: new Date(Date.now() - 5 * 24 * 3600000), wordCount: 189 },
  { id: 3, title: 'Anxious about results', content: 'I keep thinking about what if I fail...', mood: 'anxious', tags: ['anxiety', 'results'], createdAt: new Date(Date.now() - 10 * 24 * 3600000), wordCount: 312 },
]

export default function JournalPage() {
  const [entries, setEntries] = useState(sampleEntries)
  const [search, setSearch] = useState('')
  const [selectedEntry, setSelectedEntry] = useState<any>(null)
  const [isNew, setIsNew] = useState(false)
  const [title, setTitle] = useState('')
  const [mood, setMood] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Write your thoughts freely...' }),
    ],
    editorProps: { attributes: { class: 'tiptap-editor' } },
    content: '',
  })

  const startNew = () => {
    setIsNew(true)
    setSelectedEntry(null)
    setTitle('')
    setMood('')
    editor?.commands.clearContent()
  }

  const save = async () => {
    if (!title.trim()) return toast.error('Please add a title')
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    const entry = { id: Date.now(), title, content: editor?.getText() || '', mood, tags: [], createdAt: new Date(), wordCount: editor?.getText().split(' ').length || 0 }
    setEntries((p) => [entry, ...p])
    setIsNew(false)
    toast.success('Journal entry saved! 📖')
    setIsSaving(false)
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Sidebar */}
      <div className="w-72 flex-shrink-0 border-r border-brand-border flex flex-col bg-white">
        <div className="p-4 border-b border-brand-border space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-brand-text">My Journal</h2>
            <button onClick={startNew} className="w-8 h-8 rounded-xl bg-brand-primary text-white flex items-center justify-center hover:bg-brand-dark transition-all">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-muted" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search entries..." className="input-premium pl-9 h-9 text-xs" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {entries.filter((e) => e.title.toLowerCase().includes(search.toLowerCase())).map((entry) => (
            <button key={entry.id} onClick={() => { setSelectedEntry(entry); setIsNew(false) }}
              className={`w-full text-left p-4 border-b border-brand-border/50 hover:bg-brand-bg transition-all ${selectedEntry?.id === entry.id ? 'bg-brand-sage/20 border-l-2 border-l-brand-primary' : ''}`}>
              <div className="flex items-start gap-2.5">
                <span className="text-lg flex-shrink-0">{getMoodEmoji(entry.mood)}</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-brand-text truncate">{entry.title}</p>
                  <p className="text-[10px] text-brand-muted mt-0.5">{formatDate(entry.createdAt)} · {entry.wordCount} words</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor / viewer */}
      <div className="flex-1 flex flex-col min-w-0 bg-brand-bg/30">
        {(isNew || selectedEntry) ? (
          <>
            {/* Toolbar */}
            <div className="h-14 border-b border-brand-border flex items-center px-6 gap-2 bg-white flex-shrink-0">
              {isNew && (
                <>
                  {[
                    { icon: Bold, action: () => editor?.chain().focus().toggleBold().run() },
                    { icon: Italic, action: () => editor?.chain().focus().toggleItalic().run() },
                    { icon: Heading2, action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run() },
                    { icon: List, action: () => editor?.chain().focus().toggleBulletList().run() },
                    { icon: Quote, action: () => editor?.chain().focus().toggleBlockquote().run() },
                  ].map(({ icon: Icon, action }, i) => (
                    <button key={i} onClick={action} className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-muted hover:bg-brand-sage/40 hover:text-brand-primary transition-all">
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                  <div className="h-5 w-px bg-brand-border mx-1" />
                </>
              )}
              <div className="ml-auto flex gap-2">
                {isNew && (
                  <button onClick={save} disabled={isSaving} className="btn-brand flex items-center gap-2 py-2 px-4 text-sm">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isSaving ? 'Saving...' : 'Save Entry'}
                  </button>
                )}
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-2xl mx-auto">
                {isNew ? (
                  <div className="space-y-4">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Entry title..." className="text-2xl font-display font-bold bg-transparent outline-none w-full text-brand-text placeholder:text-brand-border" />
                    <div className="flex gap-2 flex-wrap">
                      {moods.map((m) => (
                        <button key={m} onClick={() => setMood(m)}
                          className={`text-xs px-3 py-1.5 rounded-full border transition-all ${mood === m ? 'bg-brand-primary text-white border-brand-primary' : 'border-brand-border text-brand-muted'}`}>
                          {getMoodEmoji(m)} {m}
                        </button>
                      ))}
                    </div>
                    <div className="bg-white rounded-2xl border border-brand-border p-6 min-h-[300px] shadow-sm">
                      <EditorContent editor={editor} />
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-brand-border p-8 shadow-sm space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{getMoodEmoji(selectedEntry.mood)}</span>
                      <div>
                        <h2 className="font-display font-bold text-2xl text-brand-text">{selectedEntry.title}</h2>
                        <p className="text-xs text-brand-muted">{formatDate(selectedEntry.createdAt)} · {selectedEntry.wordCount} words</p>
                      </div>
                    </div>
                    <p className="text-brand-text leading-relaxed">{selectedEntry.content} This is a private journal entry. Your thoughts are safe here.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col gap-4 text-center p-8">
            <div className="text-6xl">📖</div>
            <h2 className="font-display font-semibold text-brand-text">Your Private Journal</h2>
            <p className="text-brand-muted text-sm max-w-sm">Select an entry to read, or start a new one. Everything here is completely private and secure.</p>
            <button onClick={startNew} className="btn-brand flex items-center gap-2 mt-2">
              <Plus className="w-4 h-4" /> New Entry
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
