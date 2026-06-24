'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAIBuddy } from './AIBuddyProvider'
import { cn } from '@/lib/utils'
import { X, Send, Sparkles, ChevronDown, Bot } from 'lucide-react'

export function AIBuddy() {
  const { isOpen, messages, isTyping, toggleBuddy, closeBuddy, sendMessage } = useAIBuddy()
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const handleSend = () => {
    if (!input.trim()) return
    sendMessage(input.trim())
    setInput('')
  }

  return (
    <>
      {/* Floating toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleBuddy}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-primary text-white shadow-glass flex items-center justify-center group"
            title="Open AI Buddy"
          >
            <div className="relative">
              <Bot className="w-6 h-6" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-brand-lime"
              />
            </div>
            {/* Tooltip */}
            <div className="absolute right-full mr-3 bg-brand-primary text-white text-xs rounded-xl px-3 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              AI Buddy
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 w-[340px] flex flex-col rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(32,58,42,0.2)] border border-brand-border bg-white"
            style={{ maxHeight: '520px' }}
          >
            {/* Header */}
            <div className="bg-brand-primary px-5 py-4 flex items-center gap-3 flex-shrink-0">
              <div className="w-9 h-9 rounded-2xl bg-brand-lime flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-brand-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-none">AI Buddy</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" />
                  <p className="text-white/60 text-xs">Your personal mentor</p>
                </div>
              </div>
              <button
                onClick={closeBuddy}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-brand-bg/40">
              {messages.map((msg) => (
                <div key={msg.id} className={cn('flex gap-2.5', msg.role === 'user' && 'flex-row-reverse')}>
                  {/* Avatar */}
                  {msg.role === 'buddy' && (
                    <div className="w-7 h-7 rounded-full bg-brand-primary text-brand-lime flex items-center justify-center flex-shrink-0 mt-1">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={cn('flex flex-col gap-1.5 max-w-[82%]', msg.role === 'user' && 'items-end')}>
                    <div
                      className={cn(
                        'rounded-2xl px-4 py-3 text-sm leading-relaxed',
                        msg.role === 'buddy'
                          ? 'bg-white text-brand-text border border-brand-border rounded-tl-sm shadow-sm'
                          : 'bg-brand-primary text-white rounded-tr-sm'
                      )}
                    >
                      {msg.content}
                    </div>
                    {/* Quick reply suggestions */}
                    {msg.suggestions && msg.role === 'buddy' && (
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => sendMessage(s)}
                            className="text-xs rounded-xl border border-brand-border bg-white text-brand-primary hover:bg-brand-sage/40 hover:border-brand-primary px-3 py-1.5 transition-all"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-brand-primary text-brand-lime flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white border border-brand-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1 shadow-sm">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-brand-primary/40"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-brand-border bg-white flex-shrink-0">
              <div className="flex items-center gap-2 bg-brand-bg rounded-2xl border border-brand-border px-4 py-2.5">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm text-brand-text placeholder:text-brand-muted outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-xl bg-brand-primary text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-dark transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-brand-muted text-center mt-2">
                AI Buddy · For serious issues, contact a counsellor
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
