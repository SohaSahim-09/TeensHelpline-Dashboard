'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Search, Phone, Video, MoreHorizontal, Paperclip, Smile } from 'lucide-react'
import { generateInitials, getRelativeTime } from '@/lib/utils'

const contacts = [
  { id: 1, name: 'Dr. Priya Sharma', role: 'Counsellor', lastMessage: 'See you tomorrow at 4 PM!', time: new Date(Date.now() - 30 * 60000), unread: 1, online: true },
  { id: 2, name: 'Mr. Rajan Mehta', role: 'Career Counsellor', lastMessage: 'Great progress on your career roadmap', time: new Date(Date.now() - 3 * 3600000), unread: 0, online: false },
  { id: 3, name: 'Mr. Amit Verma', role: 'Math Tutor', lastMessage: 'Complete exercise 5.3 before tomorrow', time: new Date(Date.now() - 24 * 3600000), unread: 0, online: true },
  { id: 4, name: 'Support Team', role: 'Teens Helpline', lastMessage: 'We\'re here if you need us!', time: new Date(Date.now() - 2 * 24 * 3600000), unread: 0, online: true },
]

const initialMessages: Record<number, any[]> = {
  1: [
    { id: 1, from: 'them', content: 'Hi! How are you feeling today?', time: new Date(Date.now() - 2 * 3600000) },
    { id: 2, from: 'me', content: 'Much better, thank you! The breathing exercises really helped', time: new Date(Date.now() - 1.5 * 3600000) },
    { id: 3, from: 'them', content: 'That\'s wonderful to hear! Remember to also try journaling your feelings.', time: new Date(Date.now() - 1 * 3600000) },
    { id: 4, from: 'them', content: 'See you tomorrow at 4 PM! 😊', time: new Date(Date.now() - 30 * 60000) },
  ],
}

export default function MessagesPage() {
  const [selected, setSelected] = useState(contacts[0])
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, selected])

  const send = () => {
    if (!input.trim()) return
    const msg = { id: Date.now(), from: 'me', content: input.trim(), time: new Date() }
    setMessages((p) => ({ ...p, [selected.id]: [...(p[selected.id] || []), msg] }))
    setInput('')
  }

  const currentMessages = messages[selected.id] || []

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Contact list */}
      <div className="w-72 flex-shrink-0 border-r border-brand-border flex flex-col bg-white">
        <div className="p-4 border-b border-brand-border">
          <h2 className="font-display font-semibold text-brand-text mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
            <input placeholder="Search..." className="input-premium pl-10 h-9 text-xs" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <button key={contact.id} onClick={() => setSelected(contact)}
              className={`w-full flex items-center gap-3 p-4 text-left hover:bg-brand-bg transition-all border-b border-brand-border/50 ${selected.id === contact.id ? 'bg-brand-sage/20 border-l-2 border-l-brand-primary' : ''}`}>
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-2xl bg-brand-sage text-brand-primary text-sm font-bold flex items-center justify-center">
                  {generateInitials(contact.name)}
                </div>
                {contact.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-xs font-semibold text-brand-text truncate">{contact.name}</p>
                  <p className="text-[10px] text-brand-muted flex-shrink-0">{getRelativeTime(contact.time)}</p>
                </div>
                <p className="text-[10px] text-brand-primary">{contact.role}</p>
                <p className="text-xs text-brand-muted truncate mt-0.5">{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && <div className="w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">{contact.unread}</div>}
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="h-16 border-b border-brand-border flex items-center px-6 gap-3 bg-white flex-shrink-0">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-brand-sage text-brand-primary text-sm font-bold flex items-center justify-center">{generateInitials(selected.name)}</div>
            {selected.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-white" />}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-brand-text text-sm">{selected.name}</p>
            <p className="text-xs text-brand-muted">{selected.online ? '● Online' : 'Offline'} · {selected.role}</p>
          </div>
          <div className="flex items-center gap-2">
            {[Phone, Video, MoreHorizontal].map((Icon, i) => (
              <button key={i} className="w-9 h-9 rounded-xl flex items-center justify-center text-brand-muted hover:bg-brand-sage/40 hover:text-brand-primary transition-all">
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-brand-bg/40">
          {currentMessages.length === 0 && (
            <div className="text-center py-16 text-brand-muted text-sm">No messages yet. Say hello! 👋</div>
          )}
          {currentMessages.map((msg) => (
            <div key={msg.id} className={`flex gap-2.5 ${msg.from === 'me' ? 'flex-row-reverse' : ''}`}>
              {msg.from === 'them' && (
                <div className="w-7 h-7 rounded-full bg-brand-sage text-brand-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-1">
                  {generateInitials(selected.name)}
                </div>
              )}
              <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${msg.from === 'me' ? 'bg-brand-primary text-white rounded-tr-sm' : 'bg-white text-brand-text border border-brand-border rounded-tl-sm shadow-sm'}`}>
                <p className="leading-relaxed">{msg.content}</p>
                <p className={`text-[10px] mt-1 ${msg.from === 'me' ? 'text-white/60' : 'text-brand-muted'}`}>
                  {msg.time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-brand-border p-4 bg-white flex-shrink-0">
          <div className="flex items-center gap-3 bg-brand-bg rounded-2xl border border-brand-border px-4 py-2.5">
            <button className="text-brand-muted hover:text-brand-primary transition-colors"><Paperclip className="w-4 h-4" /></button>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder={`Message ${selected.name}...`} className="flex-1 bg-transparent text-sm text-brand-text placeholder:text-brand-muted outline-none" />
            <button className="text-brand-muted hover:text-brand-primary"><Smile className="w-4 h-4" /></button>
            <button onClick={send} disabled={!input.trim()}
              className="w-8 h-8 rounded-xl bg-brand-primary text-white flex items-center justify-center disabled:opacity-40 hover:bg-brand-dark transition-all">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
