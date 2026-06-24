'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Clock, Video, CheckCircle2, XCircle, RotateCcw, Download, ChevronRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const sessions = [
  { id: 1, type: 'counselling', title: 'Anxiety Management', provider: 'Dr. Priya Sharma', date: new Date(Date.now() + 86400000), time: '4:00 PM', duration: 50, status: 'confirmed', meetingLink: 'https://meet.google.com/xyz', price: 599 },
  { id: 2, type: 'tutor', title: 'Calculus — Integration', provider: 'Mr. Amit Verma', date: new Date(Date.now() + 2 * 86400000), time: '11:00 AM', duration: 60, status: 'confirmed', meetingLink: '', price: 349 },
  { id: 3, type: 'counselling', title: 'Career Exploration', provider: 'Mr. Rajan Mehta', date: new Date(Date.now() - 7 * 86400000), time: '3:00 PM', duration: 60, status: 'completed', sessionSummary: 'Discussed engineering vs medicine paths. Student shows strong aptitude for tech. Recommended competitive coding and JEE preparation.', homework: 'Research 3 engineering colleges and their admission criteria.', rating: 5, price: 499 },
  { id: 4, type: 'tutor', title: 'Organic Chemistry', provider: 'Ms. Sneha Patel', date: new Date(Date.now() - 14 * 86400000), time: '5:00 PM', duration: 60, status: 'completed', sessionSummary: 'Covered reaction mechanisms and functional groups.', price: 349 },
  { id: 5, type: 'counselling', title: 'Stress Management', provider: 'Ms. Ananya Roy', date: new Date(Date.now() - 3 * 86400000), time: '2:00 PM', duration: 50, status: 'cancelled', cancelReason: 'Student cancelled — rescheduled for next week', price: 449 },
]

type Tab = 'upcoming' | 'completed' | 'cancelled'

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-50 text-green-700',
  completed: 'bg-blue-50 text-blue-700',
  cancelled: 'bg-red-50 text-red-700',
  pending: 'bg-amber-50 text-amber-700',
}

export default function MySessionsPage() {
  const [tab, setTab] = useState<Tab>('upcoming')

  const filtered = sessions.filter((s) => {
    if (tab === 'upcoming') return ['confirmed', 'pending'].includes(s.status)
    if (tab === 'completed') return s.status === 'completed'
    if (tab === 'cancelled') return s.status === 'cancelled'
    return true
  })

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-brand-text">My Sessions</h1>
        <p className="text-brand-muted text-sm mt-1">Manage your counselling, tutoring, and career sessions</p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Sessions', value: sessions.length, icon: CalendarDays, color: 'bg-brand-sage' },
          { label: 'Completed', value: sessions.filter((s) => s.status === 'completed').length, icon: CheckCircle2, color: 'bg-blue-50' },
          { label: 'Upcoming', value: sessions.filter((s) => s.status === 'confirmed').length, icon: Clock, color: 'bg-amber-50' },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="card-premium">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-brand-primary" />
              </div>
              <div className="text-2xl font-display font-bold text-brand-text">{s.value}</div>
              <div className="text-xs text-brand-muted mt-0.5">{s.label}</div>
            </div>
          )
        })}
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-brand-bg border border-brand-border rounded-xl p-1 w-fit">
        {(['upcoming', 'completed', 'cancelled'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === t ? 'bg-white text-brand-primary shadow-sm' : 'text-brand-muted hover:text-brand-text'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Sessions list */}
      <div className="space-y-4">
        {filtered.map((session, i) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card-premium"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Type badge */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${session.type === 'counselling' ? 'bg-brand-sage' : 'bg-blue-50'}`}>
                <span className="text-xl">{session.type === 'counselling' ? '🧠' : '📚'}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-brand-text">{session.title}</h3>
                    <p className="text-xs text-brand-muted mt-0.5">with {session.provider}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColors[session.status]}`}>
                    {session.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-brand-muted">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {formatDate(session.date)} · {session.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {session.duration} minutes
                  </span>
                  <span className="font-semibold text-brand-primary">₹{session.price}</span>
                </div>

                {/* Session summary for completed */}
                {session.sessionSummary && (
                  <div className="mt-3 p-3 bg-brand-bg rounded-xl border border-brand-border">
                    <p className="text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">Session Notes</p>
                    <p className="text-xs text-brand-text leading-relaxed">{session.sessionSummary}</p>
                    {session.homework && (
                      <div className="mt-2 pt-2 border-t border-brand-border">
                        <p className="text-[10px] font-semibold text-brand-primary">📋 Homework: </p>
                        <p className="text-xs text-brand-muted">{session.homework}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Cancel reason */}
                {session.cancelReason && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" /> {session.cancelReason}
                  </p>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {session.status === 'confirmed' && session.meetingLink && (
                    <a href={session.meetingLink} target="_blank" rel="noopener noreferrer">
                      <button className="btn-brand flex items-center gap-1.5 py-2 px-4 text-xs">
                        <Video className="w-3.5 h-3.5" /> Join Session
                      </button>
                    </a>
                  )}
                  {session.status === 'confirmed' && (
                    <button className="btn-outline py-2 px-4 text-xs flex items-center gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5" /> Reschedule
                    </button>
                  )}
                  {session.status === 'completed' && (
                    <button className="btn-outline py-2 px-4 text-xs flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5" /> Download Receipt
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="card-premium text-center py-16 space-y-3">
            <div className="text-5xl">{tab === 'upcoming' ? '📅' : tab === 'completed' ? '✅' : '❌'}</div>
            <p className="text-brand-muted text-sm">No {tab} sessions yet.</p>
            {tab === 'upcoming' && (
              <button className="btn-brand mt-2">Book a Session</button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
