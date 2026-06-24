'use client'

import { motion } from 'framer-motion'
import { Award, Download, Star } from 'lucide-react'

const certificates = [
  { id: 1, title: 'Mindfulness & Stress Management', issuer: 'Teens Helpline', date: '15 Jan 2024', type: 'Completion', emoji: '🧘' },
  { id: 2, title: 'Career Readiness Program', issuer: 'Teens Helpline', date: '10 Feb 2024', type: 'Achievement', emoji: '🎯' },
  { id: 3, title: '30-Day Wellness Challenge', issuer: 'Teens Helpline', date: '1 Mar 2024', type: 'Challenge', emoji: '🏆' },
]

export default function CertificatesPage() {
  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-brand-text">Certificates 🏅</h1>
        <p className="text-brand-muted text-sm mt-1">Your achievements and completion certificates</p>
      </motion.div>

      {certificates.length === 0 ? (
        <div className="card-premium text-center py-20 space-y-4">
          <div className="text-6xl">🏅</div>
          <h2 className="font-display font-semibold text-brand-text">No Certificates Yet</h2>
          <p className="text-brand-muted text-sm max-w-sm mx-auto">Complete programmes and challenges to earn certificates showcasing your growth journey.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {certificates.map((cert, i) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} className="card-premium">
              <div className="aspect-[4/3] rounded-2xl bg-brand-gradient flex flex-col items-center justify-center mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-lime/10" />
                <div className="text-5xl mb-3 relative z-10">{cert.emoji}</div>
                <div className="text-brand-lime text-xs font-semibold uppercase tracking-widest relative z-10">{cert.type}</div>
                <h3 className="text-white font-display font-bold text-center text-sm mt-1 px-4 relative z-10">{cert.title}</h3>
                <p className="text-white/60 text-xs mt-1 relative z-10">{cert.issuer}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-brand-text">{cert.title}</p>
                  <p className="text-xs text-brand-muted mt-0.5">Issued {cert.date}</p>
                </div>
                <button className="w-9 h-9 rounded-xl bg-brand-sage flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all text-brand-primary">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
