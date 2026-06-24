'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { getMoodEmoji, getMoodColor } from '@/lib/utils'
import Link from 'next/link'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from 'recharts'
import { Calendar, Wind, Brain, BookOpen, ChevronRight, Plus } from 'lucide-react'

const moods = [
  { id: 'happy', label: 'Happy', emoji: '😊', desc: 'Joyful & content' },
  { id: 'excited', label: 'Excited', emoji: '🤩', desc: 'Full of energy' },
  { id: 'calm', label: 'Calm', emoji: '😌', desc: 'Peaceful & relaxed' },
  { id: 'confused', label: 'Confused', emoji: '😕', desc: 'Uncertain & puzzled' },
  { id: 'stressed', label: 'Stressed', emoji: '😰', desc: 'Overwhelmed & tense' },
  { id: 'anxious', label: 'Anxious', emoji: '😟', desc: 'Worried & nervous' },
  { id: 'sad', label: 'Sad', emoji: '😢', desc: 'Down & blue' },
  { id: 'angry', label: 'Angry', emoji: '😠', desc: 'Frustrated & upset' },
  { id: 'lonely', label: 'Lonely', emoji: '😔', desc: 'Isolated & alone' },
]

const weekData = [
  { day: 'Mon', score: 7, mood: 'calm' }, { day: 'Tue', score: 6, mood: 'confused' },
  { day: 'Wed', score: 8, mood: 'happy' }, { day: 'Thu', score: 5, mood: 'stressed' },
  { day: 'Fri', score: 9, mood: 'excited' }, { day: 'Sat', score: 8, mood: 'happy' }, { day: 'Sun', score: 7, mood: 'calm' },
]

const suggestions = {
  happy: { articles: ['Maintaining Your Positive Momentum', 'Spreading Joy Around You'], exercises: ['Gratitude journaling', 'Share your happiness with community'] },
  excited: { articles: ['Channeling Energy Productively', 'Setting Goals When You Feel Inspired'], exercises: ['Create a vision board', 'Plan your next big goal'] },
  calm: { articles: ['Deepening Your Peace of Mind', 'Mindful Productivity'], exercises: ['Meditation session', 'Nature walk'] },
  stressed: { articles: ['5 Proven Stress-Busters for Teens', 'The Science of Stress'], exercises: ['Box breathing', '5-minute body scan', 'Book a counsellor'] },
  anxious: { articles: ['Understanding and Managing Teen Anxiety', 'When to Seek Help'], exercises: ['4-7-8 breathing', 'Grounding technique', 'Talk to AI Buddy'] },
  sad: { articles: ['It\'s Okay Not to Be Okay', 'Finding Light in Dark Times'], exercises: ['Reach out to a friend', 'Write in your journal', 'Book counsellor'] },
  default: { articles: ['Daily Wellness Habits', 'Understanding Your Emotions'], exercises: ['Log your mood', 'Breathe mindfully'] },
}

export default function MoodTrackerPage() {
  const [selectedMood, setSelectedMood] = useState('')
  const [intensity, setIntensity] = useState(5)
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const currentSuggestions = suggestions[selectedMood as keyof typeof suggestions] || suggestions.default

  const handleSubmit = () => {
    if (!selectedMood) return
    // TODO: POST to /api/mood
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-brand-text">Mood Tracker 💚</h1>
        <p className="text-brand-muted text-sm mt-1">Track your daily emotions and discover patterns in your wellbeing</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Log mood */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-premium">
            <h2 className="font-display font-semibold text-brand-text mb-1">How are you feeling today?</h2>
            <p className="text-xs text-brand-muted mb-5">Select the emoji that best describes your current state</p>

            <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 mb-6">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all duration-200 ${selectedMood === mood.id ? 'border-brand-primary bg-brand-sage/30 scale-105' : 'border-brand-border hover:border-brand-primary/40 bg-brand-bg'}`}
                >
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="text-[10px] font-medium text-brand-text hidden sm:block">{mood.label}</span>
                </button>
              ))}
            </div>

            {selectedMood && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-brand-bg border border-brand-border">
                  <span className="text-3xl">{moods.find((m) => m.id === selectedMood)?.emoji}</span>
                  <div>
                    <p className="font-semibold text-brand-text">{moods.find((m) => m.id === selectedMood)?.label}</p>
                    <p className="text-xs text-brand-muted">{moods.find((m) => m.id === selectedMood)?.desc}</p>
                  </div>
                </div>

                {/* Intensity */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-brand-text">Intensity</span>
                    <span className="font-bold text-brand-primary">{intensity}/10</span>
                  </div>
                  <input
                    type="range" min="1" max="10" value={intensity}
                    onChange={(e) => setIntensity(Number(e.target.value))}
                    className="w-full accent-brand-primary"
                  />
                  <div className="flex justify-between text-[10px] text-brand-muted">
                    <span>Mild</span><span>Moderate</span><span>Intense</span>
                  </div>
                </div>

                {/* Note */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-brand-text">Add a note (optional)</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="What's on your mind? You can be as detailed as you like..."
                    rows={3}
                    className="input-premium resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="btn-brand flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {submitted ? '✅ Logged!' : 'Log My Mood'}
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Weekly chart */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-premium">
            <div className="section-header">
              <div>
                <h2 className="font-display font-semibold text-brand-text">This Week</h2>
                <p className="text-xs text-brand-muted mt-0.5">Your mood score by day</p>
              </div>
              <button className="text-xs text-brand-primary font-semibold flex items-center gap-1">
                View Monthly <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={weekData}>
                <defs>
                  <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#203A2A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#203A2A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B6B6B' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#6B6B6B' }} axisLine={false} tickLine={false} width={25} />
                <Tooltip
                  contentStyle={{ background: '#fff', border: '1px solid #E8E8E3', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val: any) => [`${val}/10`, 'Mood Score']}
                />
                <Area type="monotone" dataKey="score" stroke="#203A2A" strokeWidth={2.5} fill="url(#wGrad)"
                  dot={{ fill: '#203A2A', strokeWidth: 0, r: 5 }}
                  activeDot={{ r: 7, fill: '#CFE78A', stroke: '#203A2A', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Right panel */}
        <div className="space-y-5">
          {/* Streak */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card-premium bg-brand-gradient text-white">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-4xl font-display font-bold text-brand-lime">8 days</div>
            <p className="text-white/70 text-sm mt-1">Mood tracking streak</p>
            <p className="text-white/50 text-xs mt-2">Keep it going — consistency is key!</p>
          </motion.div>

          {/* Personalized suggestions */}
          {selectedMood && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-premium space-y-4">
              <h3 className="font-display font-semibold text-brand-text text-sm">✨ Personalized for You</h3>

              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-brand-muted uppercase tracking-widest">Recommended Reads</p>
                {currentSuggestions.articles.map((a) => (
                  <Link key={a} href="/blogs">
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-brand-sage/30 transition-all cursor-pointer group">
                      <BookOpen className="w-4 h-4 text-brand-primary flex-shrink-0" />
                      <span className="text-xs text-brand-text group-hover:text-brand-primary transition-colors">{a}</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-brand-muted uppercase tracking-widest">Try This</p>
                {currentSuggestions.exercises.map((e) => (
                  <div key={e} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-brand-bg border border-brand-border">
                    <Wind className="w-4 h-4 text-brand-primary flex-shrink-0" />
                    <span className="text-xs text-brand-text">{e}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Breathing exercise card */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-premium border-2 border-dashed border-brand-sage">
            <div className="flex items-center gap-2.5 mb-3">
              <Wind className="w-5 h-5 text-brand-primary" />
              <p className="font-semibold text-brand-text text-sm">Breathing Exercise</p>
            </div>
            <p className="text-xs text-brand-muted mb-3">The 4-7-8 technique helps calm anxiety and reduce stress in minutes.</p>
            <button className="btn-outline w-full py-2.5 text-sm">Start Exercise</button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
