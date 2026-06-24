'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { AIBuddy } from '@/components/ai-buddy/AIBuddy'
import { EmergencyButton } from '@/components/widgets/EmergencyButton'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-brand-bg">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block h-full flex-shrink-0">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: mobileSidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 h-full z-30 lg:hidden w-64"
      >
        <Sidebar
          collapsed={false}
          onToggle={() => setMobileSidebarOpen(false)}
        />
      </motion.div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <Topbar onMenuToggle={() => setMobileSidebarOpen(true)} />

        {/* Page content with shared mint canvas, organic blobs, dotted patterns, and leaf animations */}
        <main className="flex-1 overflow-y-auto relative bg-[#F7F9F3] overflow-x-hidden">
          {/* Dotted grid background */}
          <div className="absolute inset-0 bg-dot-pattern opacity-[0.06] pointer-events-none z-0" />
          
          {/* Abstract green blobs */}
          <div className="absolute top-12 left-[-100px] w-[350px] h-[350px] bg-[#dde8c8]/35 rounded-full filter blur-[60px] animate-float-slow pointer-events-none z-0" />
          <div className="absolute bottom-24 right-[-100px] w-[400px] h-[400px] bg-[#cfe78a]/25 rounded-full filter blur-[70px] animate-float-reverse pointer-events-none z-0" />
          
          {/* Floating leaves */}
          <div className="absolute top-[20%] right-[15%] w-8 h-8 text-[#203a2a]/10 animate-float-slow pointer-events-none z-0">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17,8C8,20 2,21 2,21C2,21 9,15 15,10C17,8 19,6 22,2C20,5 19,7 17,8Z" /></svg>
          </div>
          <div className="absolute bottom-[30%] left-[8%] w-10 h-10 text-[#cfe78a]/20 animate-float-reverse pointer-events-none z-0">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17,8C8,20 2,21 2,21C2,21 9,15 15,10C17,8 19,6 22,2C20,5 19,7 17,8Z" /></svg>
          </div>

          <motion.div
            key={typeof window !== 'undefined' ? window.location.pathname : 'page'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-full relative z-10"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Floating AI Buddy */}
      <AIBuddy />

      {/* Emergency Button */}
      <EmergencyButton />
    </div>
  )
}
