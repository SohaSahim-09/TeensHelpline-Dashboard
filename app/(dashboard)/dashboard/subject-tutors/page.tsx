'use client'

import { motion } from 'framer-motion'
import { Search, Star, GraduationCap } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science', 'Accounts', 'Economics', 'History', 'Geography', 'Political Science', 'Programming']

const tutors = [
  { id: 1, name: 'Mr. Amit Verma', subjects: ['Mathematics', 'Physics'], experience: 7, rating: 4.9, sessions: 310, price: 349, languages: ['English', 'Hindi'], avatar: 'AV', available: true },
  { id: 2, name: 'Ms. Sneha Patel', subjects: ['Chemistry', 'Biology'], experience: 5, rating: 4.8, sessions: 220, price: 299, languages: ['English', 'Gujarati'], avatar: 'SP', available: true },
  { id: 3, name: 'Mr. Rahul Das', subjects: ['Computer Science', 'Programming'], experience: 8, rating: 4.9, sessions: 415, price: 399, languages: ['English', 'Bengali'], avatar: 'RD', available: false },
  { id: 4, name: 'Ms. Kavita Sharma', subjects: ['Accounts', 'Economics'], experience: 6, rating: 4.7, sessions: 180, price: 279, languages: ['English', 'Hindi'], avatar: 'KS', available: true },
  { id: 5, name: 'Mr. Aryan Singh', subjects: ['History', 'Geography', 'Political Science'], experience: 4, rating: 4.6, sessions: 120, price: 249, languages: ['English', 'Hindi'], avatar: 'AS', available: true },
  { id: 6, name: 'Ms. Priya Nair', subjects: ['English', 'Literature'], experience: 9, rating: 4.8, sessions: 280, price: 329, languages: ['English', 'Malayalam'], avatar: 'PN', available: true },
]

export default function BookTutorPage() {
  const [search, setSearch] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')

  const filtered = tutors.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase())
    const matchSubject = !selectedSubject || t.subjects.includes(selectedSubject)
    return matchSearch && matchSubject
  })

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-brand-text">Find a Tutor 📚</h1>
        <p className="text-brand-muted text-sm mt-1">Expert tutors for every subject — book 1-on-1 sessions</p>
      </motion.div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tutors..." className="input-premium pl-11" />
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setSelectedSubject('')} className={`text-xs px-4 py-2 rounded-full font-medium border transition-all ${!selectedSubject ? 'bg-brand-primary text-white border-brand-primary' : 'border-brand-border text-brand-muted bg-white'}`}>All Subjects</button>
        {subjects.map((s) => (
          <button key={s} onClick={() => setSelectedSubject(s)} className={`text-xs px-4 py-2 rounded-full font-medium border transition-all ${selectedSubject === s ? 'bg-brand-primary text-white border-brand-primary' : 'border-brand-border text-brand-muted hover:border-brand-primary bg-white'}`}>{s}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((tutor, i) => (
          <motion.div key={tutor.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} className="card-premium relative">
            <div className={`absolute top-4 right-4 text-[10px] font-semibold px-2.5 py-1 rounded-full ${tutor.available ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              {tutor.available ? '● Available' : '● Busy'}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-sage text-brand-primary text-sm font-bold flex items-center justify-center">{tutor.avatar}</div>
              <div>
                <h3 className="font-semibold text-brand-text text-sm">{tutor.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold">{tutor.rating}</span>
                  <span className="text-xs text-brand-muted">({tutor.sessions} sessions)</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tutor.subjects.map((s) => <span key={s} className="badge-brand text-[10px]">{s}</span>)}
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              {[{ label: 'Exp', value: `${tutor.experience}y` }, { label: 'Rate', value: `₹${tutor.price}` }, { label: 'Lang', value: tutor.languages.length }].map((m) => (
                <div key={m.label} className="p-2 rounded-xl bg-brand-bg border border-brand-border">
                  <div className="text-xs font-bold text-brand-primary">{m.value}</div>
                  <div className="text-[10px] text-brand-muted">{m.label}</div>
                </div>
              ))}
            </div>
            <button className="btn-brand w-full py-2.5 flex items-center justify-center gap-2"><GraduationCap className="w-4 h-4" />Book Session</button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
