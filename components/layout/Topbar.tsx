'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { BRAND } from '@/lib/brand'
import { useAuth } from '@/contexts/AuthContext'
import { generateInitials } from '@/lib/utils'
import {
  Search, Bell, ChevronDown, Menu, ExternalLink,
  User, Settings, LogOut, Sparkles, Home,
} from 'lucide-react'
import toast from 'react-hot-toast'

interface TopbarProps {
  onMenuToggle: () => void
  notifCount?: number
  breadcrumb?: { label: string; href?: string }[]
}

export function Topbar({ onMenuToggle, notifCount = 0, breadcrumb }: TopbarProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('See you soon! 👋')
      router.push('/login')
    } catch {
      toast.error('Logout failed')
    }
  }

  // Auto-generate breadcrumb from pathname
  const autoBreadcrumb = breadcrumb || (() => {
    const parts = pathname.split('/').filter(Boolean)
    return parts.map((part, i) => ({
      label: part.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      href: '/' + parts.slice(0, i + 1).join('/'),
    }))
  })()

  return (
    <header className="h-16 bg-white/90 backdrop-blur-xl border-b border-brand-border flex items-center px-6 gap-4 sticky top-0 z-20">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-brand-sage/40 hover:text-brand-primary transition-all"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumb */}
      <nav className="hidden md:flex items-center gap-1.5 text-sm flex-1">
        <Link href="/dashboard" className="text-brand-muted hover:text-brand-primary transition-colors">
          <Home className="w-3.5 h-3.5" />
        </Link>
        {autoBreadcrumb.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="text-brand-border">/</span>
            {i === autoBreadcrumb.length - 1 ? (
              <span className="text-brand-primary font-semibold">{crumb.label}</span>
            ) : (
              <Link href={crumb.href || '#'} className="text-brand-muted hover:text-brand-primary transition-colors">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      {/* Search */}
      <div className={cn(
        'hidden md:flex items-center gap-2 rounded-xl border bg-brand-bg px-3.5 h-9 transition-all duration-200',
        searchFocused ? 'border-brand-primary w-72 shadow-sm' : 'border-brand-border w-52'
      )}>
        <Search className="w-4 h-4 text-brand-muted flex-shrink-0" />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent text-sm outline-none text-brand-text placeholder:text-brand-muted w-full"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Back to Website */}
        <a
          href={BRAND.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-brand-primary hover:text-brand-dark border border-brand-border rounded-xl px-3.5 h-9 hover:border-brand-primary hover:bg-brand-sage/30 transition-all duration-200"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Back to Website</span>
        </a>


        {/* Notifications */}
        <Link href="/dashboard/notifications">
          <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-brand-muted hover:bg-brand-sage/40 hover:text-brand-primary transition-all">
            <Bell className="w-4 h-4" />
            {notifCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-brand-lime text-brand-primary text-[10px] font-bold rounded-full flex items-center justify-center px-1"
              >
                {notifCount > 9 ? '9+' : notifCount}
              </motion.span>
            )}
          </button>
        </Link>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 hover:bg-brand-sage/40 transition-all duration-200"
          >
            <div className="w-7 h-7 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center">
              {user ? generateInitials(user.name) : 'U'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-brand-text leading-none">{user?.name?.split(' ')[0] || 'Student'}</p>
              <p className="text-[10px] text-brand-muted mt-0.5 leading-none capitalize">{user?.role || 'student'}</p>
            </div>
            <ChevronDown className={cn('w-3.5 h-3.5 text-brand-muted transition-transform', profileOpen && 'rotate-180')} />
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-card-hover border border-brand-border p-1.5 z-50"
            >
              {/* User info header */}
              <div className="px-3 py-2.5 border-b border-brand-border mb-1">
                <p className="text-sm font-semibold text-brand-text">{user?.name}</p>
                <p className="text-xs text-brand-muted truncate">{user?.email}</p>
              </div>

              {[
                { label: 'My Profile', href: '/dashboard/profile', icon: User },
                { label: 'Settings', href: '/dashboard/settings', icon: Settings },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href} onClick={() => setProfileOpen(false)}>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-brand-muted hover:text-brand-primary hover:bg-brand-sage/30 transition-all cursor-pointer">
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </div>
                  </Link>
                )
              })}

              <a
                href={BRAND.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-brand-muted hover:text-brand-primary hover:bg-brand-sage/30 transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Website
              </a>

              <div className="border-t border-brand-border mt-1 pt-1">
                <button
                  onClick={() => { setProfileOpen(false); handleLogout() }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {profileOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
      )}
    </header>
  )
}
