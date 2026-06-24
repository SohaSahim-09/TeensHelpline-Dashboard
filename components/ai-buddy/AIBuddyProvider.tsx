'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface Message {
  id: string
  role: 'user' | 'buddy'
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface AIBuddyContextType {
  isOpen: boolean
  messages: Message[]
  isTyping: boolean
  openBuddy: (initialMessage?: string) => void
  closeBuddy: () => void
  toggleBuddy: () => void
  sendMessage: (message: string) => void
}

const AIBuddyContext = createContext<AIBuddyContextType | null>(null)

export function AIBuddyProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'buddy',
      content: "Hi there! 👋 I'm your AI Buddy — your personal mentor at Teens Helpline. I can help you with career guidance, study planning, mood support, and session recommendations. What would you like to explore today?",
      timestamp: new Date(),
      suggestions: ['Career guidance', 'Study planner', 'I need support', 'Book a session'],
    },
  ])

  const openBuddy = useCallback((initialMessage?: string) => {
    setIsOpen(true)
    if (initialMessage) {
      // Pre-populate with a message
      setTimeout(() => sendMessage(initialMessage), 100)
    }
  }, [])

  const closeBuddy = useCallback(() => setIsOpen(false), [])
  const toggleBuddy = useCallback(() => setIsOpen((p) => !p), [])

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    try {
      const res = await fetch('/api/ai-buddy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, history: messages.slice(-6) }),
      })
      const data = await res.json()
      const buddyMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'buddy',
        content: data.response,
        timestamp: new Date(),
        suggestions: data.suggestions,
      }
      setMessages((prev) => [...prev, buddyMsg])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'buddy',
          content: "I'm having a little trouble connecting. Please try again in a moment! 💙",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }, [messages])

  return (
    <AIBuddyContext.Provider value={{ isOpen, messages, isTyping, openBuddy, closeBuddy, toggleBuddy, sendMessage }}>
      {children}
    </AIBuddyContext.Provider>
  )
}

export function useAIBuddy() {
  const ctx = useContext(AIBuddyContext)
  if (!ctx) throw new Error('useAIBuddy must be used within AIBuddyProvider')
  return ctx
}
