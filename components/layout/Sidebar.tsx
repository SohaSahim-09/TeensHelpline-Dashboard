'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { BRAND } from '@/lib/brand'
import { useAuth } from '@/contexts/AuthContext'
import { generateInitials } from '@/lib/utils'
import {
  LayoutDashboard, CalendarDays, HeartPulse, BookOpen, Users2, MessageSquare,
  Bell, CreditCard, Award, User, Settings, LogOut, ChevronLeft,
  Bot, Briefcase, GraduationCap, BookMarked, FileText, Globe,
  Stethoscope, ExternalLink, ChevronRight, Sparkles, Home, AlertCircle,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Logo } from '@/components/ui/Logo'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: number
  section?: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, section: 'Main' },
  { label: 'Book Counselling', href: '/dashboard/book-counselling', icon: Stethoscope, section: 'Main' },
  { label: 'Career Guidance', href: '/dashboard/career-guidance', icon: Briefcase, section: 'Main' },
  { label: 'Subject Tutors', href: '/dashboard/subject-tutors', icon: GraduationCap, section: 'Main' },
  { label: 'My Sessions', href: '/dashboard/my-sessions', icon: CalendarDays, section: 'Growth' },
  { label: 'Mood Tracker', href: '/dashboard/mood-tracker', icon: HeartPulse, section: 'Wellness' },
  { label: 'Journal', href: '/dashboard/journal', icon: FileText, section: 'Wellness' },
  { label: 'Emergency Help', href: '/dashboard/emergency', icon: AlertCircle, section: 'Wellness' },
  { label: 'Blogs', href: '/dashboard/blogs', icon: BookOpen, section: 'Learn' },
  { label: 'Resources', href: '/dashboard/resources', icon: BookMarked, section: 'Learn' },
  { label: 'Community', href: '/dashboard/community', icon: Users2, section: 'Connect' },
  { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare, section: 'Connect' },
  { label: 'Notifications', href: '/dashboard/notifications', icon: Bell, section: 'Connect' },
  { label: 'Payments', href: '/dashboard/payments', icon: CreditCard, section: 'Account' },
  { label: 'Profile', href: '/dashboard/profile', icon: User, section: 'Account' },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings, section: 'Account' },
]

const sections = ['Main', 'Growth', 'Wellness', 'Learn', 'Connect', 'Account']

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  notifCount?: number
}

export function Sidebar({ collapsed, onToggle, notifCount = 0 }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      router.push('/login')
    } catch {
      toast.error('Logout failed')
    }
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative flex flex-col h-full bg-[#EEF5E8] overflow-hidden z-30 border-r border-[#E5EADF] shadow-[0_8px_30px_rgb(0,0,0,0.015)]"
    >
      {/* Ambient soft green light orbs in sidebar */}
      <div className="absolute top-[-50px] left-[-50px] w-[150px] h-[150px] bg-[#cfe78a]/20 rounded-full filter blur-[40px] pointer-events-none" />
      <div className="absolute bottom-[-50px] right-[-50px] w-[150px] h-[150px] bg-[#dde8c8]/30 rounded-full filter blur-[40px] pointer-events-none" />

      {/* Header */}
      <div className={cn(
        'flex items-center h-16 px-4 border-b border-[#E5EADF] flex-shrink-0 relative z-10',
        collapsed ? 'justify-center' : 'justify-between'
      )}>
        {/* Logo → links to public website */}
        <a
          href={BRAND.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 min-w-0 group"
          title="Visit Teens Helpline Website"
        >
          <Logo 
            showText={!collapsed} 
            iconClassName="w-8 h-8 group-hover:rotate-12 transition-transform duration-300"
            light={false}
          />
        </a>

        {/* Collapse toggle */}
        {!collapsed && (
          <button
            onClick={onToggle}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6B756A] hover:text-[#203A2A] hover:bg-white/60 transition-all border border-[#E5EADF] backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Collapsed expand button */}
      {collapsed && (
        <button
          onClick={onToggle}
          className="absolute -right-3 top-[72px] z-50 w-6 h-6 rounded-full bg-[#CFE78A] text-[#203A2A] flex items-center justify-center shadow-md hover:scale-110 hover:bg-[#b8d66c] transition-transform border border-[#E5EADF]"
        >
          <ChevronRight className="w-3.5 h-3.5 font-bold" />
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5 scrollbar-thin relative z-10">
        {sections.map((section) => {
          const items = navItems.filter((i) => i.section === section)
          return (
            <div key={section} className="mb-3">
              <AnimatePresence>
                {!collapsed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[#6b756a]/80 text-[10px] font-bold uppercase tracking-wider px-3.5 mb-1.5 mt-2"
                  >
                    {section}
                  </motion.p>
                )}
              </AnimatePresence>
              {items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-200 cursor-pointer relative group',
                        collapsed ? 'justify-center' : '',
                        isActive
                          ? 'bg-[#CFE78A] text-[#203A2A] font-semibold shadow-sm border-l-2 border-[#203A2A]'
                          : 'text-[#6B756A] hover:text-[#203A2A] hover:bg-[#DDE8C8]/40'
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <div className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all",
                        isActive ? "bg-[#203A2A] text-[#CFE78A]" : "bg-white/60 text-[#6B756A] group-hover:bg-[#DDE8C8]/60 group-hover:text-[#203A2A]"
                      )}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {/* Notification badge */}
                      {!collapsed && item.label === 'Notifications' && notifCount > 0 && (
                        <span className={cn(
                          "text-[10px] font-extrabold rounded-full w-4.5 h-4.5 flex items-center justify-center",
                          isActive ? "bg-[#203A2A] text-white" : "bg-[#CFE78A] text-[#203A2A]"
                        )}>
                          {notifCount > 9 ? '9+' : notifCount}
                        </span>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="flex-shrink-0 border-t border-[#E5EADF] p-3 space-y-1 relative z-10">
        {/* Visit Website */}
        <a
          href={BRAND.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[#6B756A] hover:text-[#203A2A] hover:bg-[#DDE8C8]/40 transition-all cursor-pointer group',
            collapsed ? 'justify-center' : ''
          )}
          title={collapsed ? 'Visit Website' : undefined}
        >
          <Globe className={cn('flex-shrink-0 transition-transform group-hover:rotate-12', collapsed ? 'w-5 h-5' : 'w-4 h-4')} />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex items-center gap-1"
              >
                Visit Website
                <ExternalLink className="w-3 h-3 opacity-60" />
              </motion.span>
            )}
          </AnimatePresence>
        </a>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={cn(
            'w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[#6B756A] hover:text-red-600 hover:bg-red-500/10 transition-all group',
            collapsed ? 'justify-center' : ''
          )}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className={cn('flex-shrink-0 transition-transform group-hover:-translate-x-1', collapsed ? 'w-5 h-5' : 'w-4 h-4')} />
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* User avatar card */}
        <div
          className={cn(
            'flex items-center gap-3 rounded-xl px-3 py-2.5 mt-1 border border-[#E5EADF] bg-white shadow-sm',
            collapsed ? 'justify-center' : ''
          )}
        >
          <Link href="/dashboard/profile">
            <div className="w-8 h-8 rounded-full bg-[#CFE78A] text-[#203A2A] flex items-center justify-center text-xs font-extrabold flex-shrink-0 hover:scale-110 hover:rotate-6 transition-all cursor-pointer shadow-inner">
              {user ? generateInitials(user.name) : 'U'}
            </div>
          </Link>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-w-0"
              >
                <p className="text-[#203A2A] text-xs font-bold truncate leading-none">{user?.name || 'Student'}</p>
                <p className="text-[#6B756A] text-[9px] truncate mt-1 leading-none">{user?.email || ''}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  )
}
