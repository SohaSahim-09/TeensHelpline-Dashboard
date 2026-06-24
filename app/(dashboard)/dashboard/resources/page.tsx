'use client'

import { motion } from 'framer-motion'
import { BookMarked, Download, ExternalLink, Star } from 'lucide-react'

const resources = [
  { id: 1, title: 'NCERT Class 12 Physics — Complete Notes', type: 'PDF', subject: 'Physics', downloads: 1240, emoji: '⚛️', isFree: true },
  { id: 2, title: 'JEE Main Previous Year Papers (2019–2024)', type: 'PDF', subject: 'Exam Prep', downloads: 3890, emoji: '📋', isFree: true },
  { id: 3, title: 'Career Assessment Workbook', type: 'PDF', subject: 'Career', downloads: 876, emoji: '🎯', isFree: true },
  { id: 4, title: 'Mental Health First Aid Guide for Teens', type: 'PDF', subject: 'Mental Health', downloads: 2130, emoji: '💙', isFree: true },
  { id: 5, title: 'Mindfulness Meditation — 21 Day Program', type: 'Video', subject: 'Wellness', downloads: 1567, emoji: '🧘', isFree: true },
  { id: 6, title: 'Study Planner Template (Printable)', type: 'Template', subject: 'Study Tips', downloads: 4210, emoji: '📅', isFree: true },
]

const subjects = ['All', 'Physics', 'Chemistry', 'Maths', 'Career', 'Mental Health', 'Wellness', 'Study Tips', 'Exam Prep']

export default function ResourcesPage() {
  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-brand-text">Learning Resources 📚</h1>
        <p className="text-brand-muted text-sm mt-1">Free PDFs, videos, templates, and guides curated for you</p>
      </motion.div>

      <div className="flex gap-2 flex-wrap">
        {subjects.map((s) => (
          <button key={s} className="text-xs px-4 py-2 rounded-full font-medium border border-brand-border text-brand-muted hover:border-brand-primary hover:text-brand-primary bg-white transition-all">{s}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {resources.map((res, i) => (
          <motion.div key={res.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} className="card-premium">
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{res.emoji}</div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-[10px] bg-brand-sage text-brand-primary font-semibold px-2.5 py-1 rounded-full">{res.type}</span>
                {res.isFree && <span className="text-[10px] bg-green-50 text-green-700 font-semibold px-2.5 py-1 rounded-full">Free</span>}
              </div>
            </div>
            <h3 className="font-semibold text-brand-text text-sm mb-1 leading-snug">{res.title}</h3>
            <p className="text-xs text-brand-muted mb-4">{res.subject} · {res.downloads.toLocaleString()} downloads</p>
            <div className="flex gap-2">
              <button className="btn-brand flex-1 py-2.5 flex items-center justify-center gap-1.5 text-sm">
                <Download className="w-4 h-4" /> Download
              </button>
              <button className="btn-outline px-3 py-2.5">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
