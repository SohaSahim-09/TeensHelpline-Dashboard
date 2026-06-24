'use client'

import { CalendarDays } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { formatDate } from '@/lib/utils'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const events = [
  { date: new Date().toDateString(), title: 'Dr. Priya Sharma', time: '4:00 PM', type: 'counselling' },
  { date: new Date(Date.now() + 86400000).toDateString(), title: 'Math Tutoring', time: '11:00 AM', type: 'tutor' },
  { date: new Date(Date.now() + 3 * 86400000).toDateString(), title: 'Career Counselling', time: '3:00 PM', type: 'career' },
]

export default function CalendarPage() {
  const now = new Date()
  const [currentMonth, setCurrentMonth] = useState(now.getMonth())
  const [currentYear, setCurrentYear] = useState(now.getFullYear())

  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const eventMap: Record<string, any[]> = {}
  events.forEach((e) => {
    if (!eventMap[e.date]) eventMap[e.date] = []
    eventMap[e.date].push(e)
  })

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-brand-text">Calendar 📅</h1>
        <p className="text-brand-muted text-sm mt-1">All your upcoming sessions and appointments</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-premium">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-brand-text">{months[currentMonth]} {currentYear}</h2>
            <div className="flex gap-2">
              <button onClick={() => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) } else setCurrentMonth(m => m - 1) }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-muted hover:bg-brand-sage/40 hover:text-brand-primary transition-all">‹</button>
              <button onClick={() => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) } else setCurrentMonth(m => m + 1) }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-muted hover:bg-brand-sage/40 hover:text-brand-primary transition-all">›</button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map((d) => <div key={d} className="text-center text-xs font-semibold text-brand-muted py-2">{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const dateStr = new Date(currentYear, currentMonth, day).toDateString()
              const isToday = dateStr === now.toDateString()
              const hasEvent = eventMap[dateStr]
              return (
                <div key={day} className={`aspect-square flex flex-col items-center justify-center rounded-xl text-sm cursor-pointer transition-all
                  ${isToday ? 'bg-brand-primary text-white font-bold' : 'hover:bg-brand-sage/30 text-brand-text'}`}>
                  <span>{day}</span>
                  {hasEvent && <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isToday ? 'bg-brand-lime' : 'bg-brand-primary'}`} />}
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-display font-semibold text-brand-text">Upcoming Events</h3>
          {events.map((event, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="card-premium">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${event.type === 'counselling' ? 'bg-brand-sage' : event.type === 'tutor' ? 'bg-blue-50' : 'bg-amber-50'}`}>
                  {event.type === 'counselling' ? '🧠' : event.type === 'tutor' ? '📚' : '🎯'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-text">{event.title}</p>
                  <p className="text-xs text-brand-muted">{event.date === now.toDateString() ? 'Today' : event.date} · {event.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
