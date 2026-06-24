'use client'

import { motion } from 'framer-motion'
import { Briefcase, Target, Map, BookOpen, ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const streams = [
  { id: 'engineering', emoji: '⚙️', label: 'Engineering & Technology', desc: 'JEE, B.Tech, Computer Science, Mechanical, Civil', color: 'bg-blue-50 border-blue-100 text-blue-700' },
  { id: 'medical', emoji: '🩺', label: 'Medical & Healthcare', desc: 'NEET, MBBS, Nursing, Pharmacy, Dentistry', color: 'bg-red-50 border-red-100 text-red-700' },
  { id: 'commerce', emoji: '💼', label: 'Commerce & Business', desc: 'CA, MBA, BBA, Finance, Marketing', color: 'bg-amber-50 border-amber-100 text-amber-700' },
  { id: 'arts', emoji: '🎨', label: 'Arts & Humanities', desc: 'Literature, History, Psychology, Philosophy', color: 'bg-purple-50 border-purple-100 text-purple-700' },
  { id: 'design', emoji: '✏️', label: 'Design & Architecture', desc: 'NID, NIFT, B.Arch, Graphic Design, UX', color: 'bg-pink-50 border-pink-100 text-pink-700' },
  { id: 'law', emoji: '⚖️', label: 'Law & Legal Studies', desc: 'CLAT, LLB, Judiciary, Legal Research', color: 'bg-indigo-50 border-indigo-100 text-indigo-700' },
  { id: 'government', emoji: '🏛️', label: 'Government & Civil Services', desc: 'UPSC, SSC, Banking, Defence', color: 'bg-green-50 border-green-100 text-green-700' },
  { id: 'abroad', emoji: '🌍', label: 'Study Abroad', desc: 'SAT, GRE, IELTS, US/UK/Canada/Australia', color: 'bg-teal-50 border-teal-100 text-teal-700' },
]

export default function CareerGuidancePage() {
  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-brand-text">Career Guidance 🎯</h1>
        <p className="text-brand-muted text-sm mt-1">Discover your strengths, explore streams, and plan your future</p>
      </motion.div>

      {/* Career Assessment CTA */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="welcome-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-brand-lime/20 text-brand-lime text-xs font-semibold px-3 py-1 rounded-full border border-brand-lime/30">Free Assessment</span>
            <h2 className="text-2xl font-display font-bold text-white">Discover Your Ideal Career Path</h2>
            <p className="text-white/60 text-sm max-w-md">Take our 15-minute personality and aptitude assessment to get a personalized career roadmap with top college recommendations.</p>
          </div>
          <button className="bg-brand-lime text-brand-primary font-bold px-8 py-3 rounded-2xl hover:bg-white transition-all flex items-center gap-2 flex-shrink-0">
            Start Assessment <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        {[{ label: 'Career Score', value: '65%', icon: Target }, { label: 'Tests Taken', value: 2, icon: BookOpen }, { label: 'Roadmap Progress', value: '40%', icon: Map }].map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }} className="card-premium text-center">
              <div className="w-10 h-10 rounded-xl bg-brand-sage flex items-center justify-center mx-auto mb-2"><Icon className="w-5 h-5 text-brand-primary" /></div>
              <div className="text-xl font-bold text-brand-text">{s.value}</div>
              <div className="text-xs text-brand-muted mt-0.5">{s.label}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Choose your stream */}
      <div>
        <h2 className="font-display font-semibold text-brand-text mb-4">Explore Career Streams</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {streams.map((stream, i) => (
            <motion.div key={stream.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }} whileHover={{ y: -4 }}
              className="card-premium cursor-pointer group">
              <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border mb-3 ${stream.color}`}>
                <span>{stream.emoji}</span>
              </div>
              <h3 className="font-semibold text-brand-text text-sm mb-1 group-hover:text-brand-primary transition-colors">{stream.label}</h3>
              <p className="text-xs text-brand-muted leading-relaxed">{stream.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-brand-primary font-semibold group-hover:gap-2 transition-all">
                Explore <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Book a career counsellor */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="card-premium flex flex-col sm:flex-row items-center gap-5 bg-brand-sage/30 border-brand-sage">
        <div className="text-5xl">👨‍💼</div>
        <div className="flex-1">
          <h3 className="font-display font-semibold text-brand-text">Book a 1-on-1 Career Counsellor</h3>
          <p className="text-sm text-brand-muted mt-1">Get personalized guidance from our expert career counsellors. They'll review your strengths and create a custom roadmap just for you.</p>
        </div>
        <Link href="/dashboard/book-counselling?type=career">
          <button className="btn-brand flex-shrink-0">Book Now</button>
        </Link>
      </motion.div>
    </div>
  )
}
