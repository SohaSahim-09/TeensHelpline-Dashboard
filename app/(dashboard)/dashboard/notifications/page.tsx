'use client'

import { motion } from 'framer-motion'
import { Bell, CheckCheck } from 'lucide-react'
import { getRelativeTime } from '@/lib/utils'
import { useState } from 'react'

const notifications = [
  { id: 1, title: 'Session Confirmed ✅', message: 'Your session with Dr. Priya Sharma is confirmed for today at 4:00 PM', type: 'booking', isRead: false, createdAt: new Date(Date.now() - 30 * 60000) },
  { id: 2, title: 'New Message 💬', message: 'Mr. Rajan Mehta sent you a message about your career assessment results', type: 'message', isRead: false, createdAt: new Date(Date.now() - 2 * 3600000) },
  { id: 3, title: 'Payment Successful 💳', message: 'Your payment of ₹599 for the counselling session was processed successfully', type: 'payment', isRead: true, createdAt: new Date(Date.now() - 24 * 3600000) },
  { id: 4, title: 'Session Reminder ⏰', message: 'You have a tutoring session with Mr. Amit Verma tomorrow at 11:00 AM', type: 'reminder', isRead: true, createdAt: new Date(Date.now() - 36 * 3600000) },
  { id: 5, title: 'New Blog: Exam Stress Tips 📖', message: 'A new article on managing board exam stress has been published — recommended for you!', type: 'blog', isRead: true, createdAt: new Date(Date.now() - 2 * 24 * 3600000) },
]

const typeIcons: Record<string, string> = { booking: '📅', message: '💬', payment: '💳', reminder: '⏰', blog: '📖', system: '🔔', assignment: '📋' }

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifications)

  const markAllRead = () => setNotifs((p) => p.map((n) => ({ ...n, isRead: true })))
  const markRead = (id: number) => setNotifs((p) => p.map((n) => n.id === id ? { ...n, isRead: true } : n))
  const unreadCount = notifs.filter((n) => !n.isRead).length

  return (
    <div className="page-container max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-text">Notifications 🔔</h1>
          <p className="text-brand-muted text-sm mt-1">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="flex items-center gap-1.5 text-xs text-brand-primary font-semibold hover:text-brand-dark">
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        )}
      </motion.div>

      <div className="space-y-3">
        {notifs.map((notif, i) => (
          <motion.div key={notif.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => markRead(notif.id)}
            className={`card-premium cursor-pointer transition-all ${!notif.isRead ? 'border-brand-primary/30 bg-brand-sage/10' : ''}`}>
            <div className="flex items-start gap-4">
              <div className="text-2xl flex-shrink-0">{typeIcons[notif.type] || '🔔'}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-semibold ${!notif.isRead ? 'text-brand-primary' : 'text-brand-text'}`}>{notif.title}</p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] text-brand-muted">{getRelativeTime(notif.createdAt)}</span>
                    {!notif.isRead && <div className="w-2 h-2 rounded-full bg-brand-primary flex-shrink-0" />}
                  </div>
                </div>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">{notif.message}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
