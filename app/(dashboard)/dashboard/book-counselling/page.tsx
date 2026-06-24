'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, Filter, Star, Clock, Globe, DollarSign, ChevronRight, Heart, Video } from 'lucide-react'

const counsellors = [
  { id: 1, name: 'Dr. Priya Sharma', title: 'Child & Teen Psychologist', specializations: ['Anxiety', 'Stress', 'Academic Pressure', 'Depression'], experience: 8, rating: 4.9, reviews: 230, price: 599, duration: 50, languages: ['English', 'Hindi'], gender: 'female', availability: ['Mon', 'Wed', 'Fri'], avatar: 'PS', isAvailable: true, approaches: ['CBT', 'Mindfulness'] },
  { id: 2, name: 'Mr. Rajan Mehta', title: 'Career Counsellor', specializations: ['Career Guidance', 'Stream Selection', 'College Admissions'], experience: 12, rating: 4.8, reviews: 185, price: 499, duration: 60, languages: ['English', 'Hindi', 'Gujarati'], gender: 'male', availability: ['Tue', 'Thu', 'Sat'], avatar: 'RM', isAvailable: true, approaches: ['Strength-based', 'Goal-oriented'] },
  { id: 3, name: 'Ms. Ananya Roy', title: 'Academic Counsellor', specializations: ['Study Skills', 'Exam Anxiety', 'Time Management'], experience: 6, rating: 4.7, reviews: 152, price: 449, duration: 50, languages: ['English', 'Bengali', 'Hindi'], gender: 'female', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], avatar: 'AR', isAvailable: true, approaches: ['Solution-focused', 'Motivational'] },
  { id: 4, name: 'Dr. Arjun Nair', title: 'Mental Health Therapist', specializations: ['Bullying', 'Relationships', 'Self-esteem', 'Grief'], experience: 10, rating: 4.9, reviews: 312, price: 699, duration: 60, languages: ['English', 'Malayalam', 'Tamil'], gender: 'male', availability: ['Mon', 'Wed', 'Sat'], avatar: 'AN', isAvailable: false, approaches: ['EMDR', 'Person-centered'] },
  { id: 5, name: 'Ms. Zara Khan', title: 'Youth Counsellor', specializations: ['Identity', 'Loneliness', 'Social Skills', 'Family Issues'], experience: 5, rating: 4.6, reviews: 98, price: 399, duration: 45, languages: ['English', 'Urdu'], gender: 'female', availability: ['Tue', 'Thu', 'Sun'], avatar: 'ZK', isAvailable: true, approaches: ['Narrative', 'Art Therapy'] },
  { id: 6, name: 'Mr. Vikram Singh', title: 'Performance Coach', specializations: ['Sports Psychology', 'Leadership', 'Motivation'], experience: 9, rating: 4.8, reviews: 201, price: 549, duration: 50, languages: ['English', 'Hindi', 'Punjabi'], gender: 'male', availability: ['Mon', 'Fri', 'Sat', 'Sun'], avatar: 'VS', isAvailable: true, approaches: ['Coaching', 'Positive Psychology'] },
]

const specializations = ['All', 'Anxiety', 'Career Guidance', 'Academic Pressure', 'Depression', 'Stress', 'Bullying', 'Relationships', 'Identity', 'Motivation']

export default function BookCounsellingPage() {
  const [search, setSearch] = useState('')
  const [selectedSpec, setSelectedSpec] = useState('All')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const filtered = counsellors.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    const matchSpec = selectedSpec === 'All' || c.specializations.includes(selectedSpec)
    const matchPrice = c.price >= priceRange[0] && c.price <= priceRange[1]
    return matchSearch && matchSpec && matchPrice
  })

  return (
    <div className="page-container">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <h1 className="text-2xl font-display font-bold text-brand-text">Find Your Counsellor</h1>
        <p className="text-brand-muted text-sm">Browse verified experts and book a session that fits your needs</p>
      </motion.div>

      {/* Search & Filter */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-premium pl-11"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-5 h-11 rounded-xl border text-sm font-medium transition-all ${showFilters ? 'bg-brand-primary text-white border-brand-primary' : 'border-brand-border text-brand-muted hover:border-brand-primary hover:text-brand-primary'}`}
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </motion.div>

      {/* Specialization pills */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex gap-2 flex-wrap">
        {specializations.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSpec(s)}
            className={`text-xs px-4 py-2 rounded-full font-medium border transition-all ${selectedSpec === s ? 'bg-brand-primary text-white border-brand-primary' : 'border-brand-border text-brand-muted hover:border-brand-primary hover:text-brand-primary bg-white'}`}
          >
            {s}
          </button>
        ))}
      </motion.div>

      {/* Results count */}
      <p className="text-sm text-brand-muted">
        Showing <span className="font-semibold text-brand-text">{filtered.length}</span> counsellors
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="card-premium relative"
          >
            {/* Availability dot */}
            <div className={`absolute top-4 right-4 flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${c.isAvailable ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${c.isAvailable ? 'bg-green-500' : 'bg-gray-400'}`} />
              {c.isAvailable ? 'Available' : 'Busy'}
            </div>

            {/* Favorite */}
            <button
              onClick={() => setFavorites((f) => f.includes(c.id) ? f.filter((x) => x !== c.id) : [...f, c.id])}
              className="absolute top-4 right-24 text-brand-muted hover:text-red-400 transition-colors"
            >
              <Heart className={`w-4 h-4 ${favorites.includes(c.id) ? 'fill-red-400 text-red-400' : ''}`} />
            </button>

            {/* Avatar & Info */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-sage text-brand-primary text-lg font-bold flex items-center justify-center flex-shrink-0">
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-brand-text text-sm">{c.name}</h3>
                <p className="text-xs text-brand-muted">{c.title}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-brand-text">{c.rating}</span>
                  <span className="text-xs text-brand-muted">({c.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {c.specializations.slice(0, 3).map((s) => (
                <span key={s} className="badge-brand text-[10px]">{s}</span>
              ))}
              {c.specializations.length > 3 && (
                <span className="text-[10px] text-brand-muted">+{c.specializations.length - 3}</span>
              )}
            </div>

            {/* Meta */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 rounded-xl bg-brand-bg border border-brand-border">
                <p className="text-xs font-bold text-brand-text">{c.experience}y</p>
                <p className="text-[10px] text-brand-muted">Experience</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-brand-bg border border-brand-border">
                <p className="text-xs font-bold text-brand-text">{c.duration}m</p>
                <p className="text-[10px] text-brand-muted">Duration</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-brand-bg border border-brand-border">
                <p className="text-xs font-bold text-brand-primary">₹{c.price}</p>
                <p className="text-[10px] text-brand-muted">Session</p>
              </div>
            </div>

            {/* Languages */}
            <div className="flex items-center gap-1.5 mb-4">
              <Globe className="w-3.5 h-3.5 text-brand-muted" />
              <span className="text-xs text-brand-muted">{c.languages.join(' · ')}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link href={`/book-counselling/${c.id}`} className="flex-1">
                <button className="btn-brand w-full flex items-center justify-center gap-1.5 py-2.5">
                  <Video className="w-4 h-4" />
                  Book Session
                </button>
              </Link>
              <Link href={`/book-counselling/${c.id}/profile`}>
                <button className="btn-outline px-4 py-2.5">View</button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 space-y-3">
          <div className="text-5xl">🔍</div>
          <p className="text-brand-muted text-sm">No counsellors found for your search. Try different filters.</p>
        </div>
      )}
    </div>
  )
}
