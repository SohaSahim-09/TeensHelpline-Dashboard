'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { getGreeting, getMoodEmoji, formatDate, cn } from '@/lib/utils'
import { BRAND } from '@/lib/brand'
import Link from 'next/link'
import axios from 'axios'
import {
  CalendarDays, HeartPulse, Sparkles, TrendingUp, BookOpen,
  ArrowRight, Star, Clock, Stethoscope, Briefcase, GraduationCap,
  ChevronRight, Zap, Target, BarChart3, Users, Flame, CheckCircle,
  MessageSquare, Send, RefreshCw, Smile, Compass, BookMarked
} from 'lucide-react'
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid
} from 'recharts'
import toast from 'react-hot-toast'
import { 
  TeenStudyIllustration, 
  CounsellingIllustration, 
  CareerIllustration, 
  WellnessIllustration, 
  BookIllustration, 
  GraduationIllustration 
} from '@/components/ui/Illustrations'

// ─── Mock Data ───────────────────────────────
const moodData = [
  { day: 'Mon', score: 7 }, { day: 'Tue', score: 6 }, { day: 'Wed', score: 8 },
  { day: 'Thu', score: 5 }, { day: 'Fri', score: 9 }, { day: 'Sat', score: 8 },
  { day: 'Sun', score: 7 },
]

const upcomingSessions = [
  {
    id: 1, type: 'counselling', title: 'Session with Dr. Priya Sharma',
    date: 'Today', time: '4:00 PM', avatar: '👩‍⚕️', status: 'confirmed',
    subject: 'Anxiety Management',
  },
  {
    id: 2, type: 'tutor', title: 'Math Tutoring — Calculus',
    date: 'Tomorrow', time: '11:00 AM', avatar: '👨‍🏫', status: 'confirmed',
    subject: 'Integration & Derivatives',
  },
]

const recommendedCounsellors = [
  { id: 1, name: 'Dr. Priya Sharma', specialization: 'Anxiety & Stress', rating: 4.9, sessions: 230, availability: 'Today 4 PM', avatar: 'PS', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120' },
  { id: 2, name: 'Mr. Rajan Mehta', specialization: 'Career Counselling', rating: 4.8, sessions: 185, availability: 'Tomorrow 10 AM', avatar: 'RM', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120&h=120' },
  { id: 3, name: 'Ms. Ananya Roy', specialization: 'Academic Pressure', rating: 4.7, sessions: 152, availability: 'Wed 3 PM', avatar: 'AR', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=120&h=120' },
  { id: 4, name: 'Dr. Kabir Sen', specialization: 'Identity & Self', rating: 4.9, sessions: 310, availability: 'Thu 11 AM', avatar: 'KS', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=120&h=120' }
]

const blogs = [
  { id: 1, title: '5 Proven Ways to Manage Exam Stress', category: 'Stress Management', readTime: 5, emoji: '😤', gradient: 'from-[#dde8c8] to-[#cfe78a]' },
  { id: 2, title: 'Choosing the Right Career Stream After Class 10', category: 'Career Guidance', readTime: 8, emoji: '🎯', gradient: 'from-emerald-100 to-emerald-200' },
  { id: 3, title: 'How Journaling Changed My Mental Health', category: 'Mental Health', readTime: 6, emoji: '📖', gradient: 'from-blue-100 to-sky-200' },
]

const quickActions = [
  { label: 'Book Counsellor', href: '/dashboard/book-counselling', icon: Stethoscope, color: 'bg-[#203A2A] text-white hover:bg-[#1C3224]' },
  { label: 'Career Guidance', href: '/dashboard/career-guidance', icon: Briefcase, color: 'bg-[#CFE78A] text-[#203A2A] hover:bg-[#B8D66C]' },
  { label: 'Find Tutor', href: '/dashboard/subject-tutors', icon: GraduationCap, color: 'bg-white hover:bg-[#F9FBF7] text-[#203A2A] border border-[#E5EADF]' },
  { label: 'Log Mood', href: '/dashboard/mood-tracker', icon: HeartPulse, color: 'bg-[#DDE8C8] text-[#203A2A] hover:bg-[#C2D0AB]' },
]

// Quotes database
const motivationalQuotes = [
  "You do not have to see the whole staircase, just take the first step. 🌱",
  "Your mental health is a priority. Your happiness is an essential. Your self-care is a necessity. 💚",
  "The expert in anything was once a beginner. Keep moving forward! 🚀",
  "You are capable of doing hard things. Take deep breaths. 🌟",
  "Progress, not perfection. Every small step counts! 🌿"
]

export default function DashboardPage() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] || 'Student'
  const [quote, setQuote] = useState(motivationalQuotes[0])

  // AI Buddy inline states
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'buddy'; content: string }>>([
    { role: 'buddy', content: "Hey! 😊 I'm your AI Buddy. How's your day going? Let me know if you want to map your career paths, study options, or simply check in about stress." }
  ])
  const [inputVal, setInputVal] = useState('')
  const [isAILoading, setIsAILoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>(['Career guidance', 'Study planner', 'I need support', 'Book counsellor'])
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Pick random quote
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)])
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isAILoading])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return
    const userMsg = { role: 'user' as const, content: text }
    setMessages((prev) => [...prev, userMsg])
    setInputVal('')
    setIsAILoading(true)

    try {
      const res = await axios.post('/api/ai-buddy', {
        message: text,
        history: messages
      })
      setMessages((prev) => [...prev, { role: 'buddy', content: res.data.response }])
      if (res.data.suggestions) {
        setSuggestions(res.data.suggestions)
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'buddy', content: "I had a connection glitch! Please try again. 💙" }])
    } finally {
      setIsAILoading(false)
    }
  }

  // Circular progress math for Wellness Score
  const wellnessScore = 82
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (wellnessScore / 100) * circumference

  return (
    <div className="page-container space-y-8 max-w-7xl mx-auto px-4 md:px-8 py-8 relative">
        
        {/* ─── Header: Premium Welcome Banner ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#EEF5E8] to-[#DDE8C8] text-[#243126] rounded-[28px] p-6 md:p-8 border border-[#E5EADF] shadow-[0_8px_30px_rgb(0,0,0,0.015)]"
        >
          {/* Layered glows and background graphics */}
          <div className="absolute top-[-50%] right-[-10%] w-[350px] h-[350px] bg-[#cfe78a]/20 rounded-full filter blur-[70px] pointer-events-none" />
          <div className="absolute bottom-[-40%] left-[20%] w-[250px] h-[250px] bg-[#dde8c8]/30 rounded-full filter blur-[50px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-[#203A2A]/10 border border-[#203A2A]/20 text-[#203A2A] text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>{formatDate(new Date())}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-[#203A2A]">
                {getGreeting()}, {firstName}! 🌿
              </h1>
              <p className="text-[#6B756A] text-sm leading-relaxed italic">
                "{quote}"
              </p>
              
              {/* Quick Actions overlay grid inside banner */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon
                  return (
                    <Link key={idx} href={action.href} className="flex-1 min-w-[125px]">
                      <button className={`w-full py-2.5 px-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-md ${action.color}`}>
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{action.label}</span>
                      </button>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Flat Teenagers Study Illustration in Welcome Banner */}
            <div className="hidden lg:block w-52 h-44 flex-shrink-0 relative">
              <TeenStudyIllustration className="w-full h-full object-contain filter drop-shadow-sm animate-float-slow" />
            </div>
          </div>
        </motion.div>

        {/* ─── Premium Analytics Gradients Cards ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {[
            { label: 'Sessions Completed', value: '12', trend: '🏆 Keep growing', iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100', icon: CheckCircle },
            { label: 'Streak Days', value: '8 Days', trend: '🔥 Streak is alive!', iconBg: 'bg-amber-50 text-amber-600 border border-amber-100', icon: Flame },
            { label: 'Aptitude Tests', value: '3 Completed', trend: '🎯 High career match', iconBg: 'bg-[#EEF5E8] text-[#203A2A] border border-[#E5EADF]', icon: Compass },
            { label: 'Resource Guides', value: '24 Read', trend: '📖 +4 this week', iconBg: 'bg-blue-50 text-blue-600 border border-blue-100', icon: BookMarked },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(32,58,42,0.04)' }}
                className="bg-white border border-[#E5EADF] rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-200 flex flex-col justify-between h-[130px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6B756A] uppercase tracking-wider">{stat.label}</span>
                  <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shadow-sm", stat.iconBg)}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-display font-extrabold tracking-tight text-[#203A2A]">{stat.value}</p>
                  <p className="text-[10px] font-semibold text-[#6B756A] mt-1 uppercase tracking-wider">{stat.trend}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ─── Main Content Layout Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Left Column (2/3 width) - Charts, roadmaps, carousels */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            
            {/* Radial Wellness widget & Career Pathway Progress side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Widget 1: Circular Wellness Score (with top-right illustration) */}
              <div className="bg-white rounded-[20px] border border-[#E5EADF] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between h-[230px] relative overflow-hidden group hover:border-[#203a2a]/20 transition-all duration-200">
                {/* Micro flat cartoon illustration inside card background */}
                <div className="absolute -right-3 -top-3 w-16 h-16 opacity-30 group-hover:opacity-50 transition-opacity">
                  <WellnessIllustration className="w-full h-full" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-sm text-[#203a2a] uppercase tracking-wider">Wellness Status</h3>
                    <p className="text-xs text-[#6B756A] mt-0.5">Overall mental index</p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-[#EEF5E8] border border-[#E5EADF] flex items-center justify-center">
                    <HeartPulse className="w-4 h-4 text-[#203a2a]" />
                  </div>
                </div>

                <div className="flex items-center gap-6 my-auto">
                  <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r={radius} className="stroke-[#EEF5E8]" strokeWidth="8" fill="transparent" />
                      <circle 
                        cx="48" 
                        cy="48" 
                        r={radius} 
                        className="stroke-[#203a2a]" 
                        strokeWidth="8" 
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-xl font-display font-extrabold text-[#203a2a] leading-none">{wellnessScore}</span>
                      <span className="text-[9px] font-bold text-[#6B756A] uppercase tracking-widest mt-1">Index</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 text-xs text-[#6B756A] font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#cfe78a]" />
                      <span>Sleep: 8.5 Hours (Good)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Mindfulness: 15m Done</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-300" />
                      <span>Anxiety: Reduced</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Widget 2: Career Roadmap Tracker (with top-right illustration) */}
              <div className="bg-white rounded-[20px] border border-[#E5EADF] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between h-[230px] relative overflow-hidden group hover:border-[#203a2a]/20 transition-all duration-200">
                {/* Micro illustration top-right */}
                <div className="absolute -right-3 -top-3 w-16 h-16 opacity-30 group-hover:opacity-50 transition-opacity">
                  <CareerIllustration className="w-full h-full" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-sm text-[#203a2a] uppercase tracking-wider">Career Milestone</h3>
                    <p className="text-xs text-[#6B756A] mt-0.5">Progress to roadmap ready</p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                  </div>
                </div>

                {/* Progress dots timeline */}
                <div className="relative py-1 flex flex-col gap-3.5">
                  {[
                    { title: 'Strengths Test', status: 'completed' },
                    { title: 'Stream Selected', status: 'completed' },
                    { title: 'Mentor Match', status: 'active' },
                    { title: 'Roadmap Generated', status: 'pending' },
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] relative z-10 
                        ${step.status === 'completed' ? 'bg-[#203A2A] text-[#CFE78A]' : 
                          step.status === 'active' ? 'bg-[#CFE78A] text-[#203A2A] ring-4 ring-[#CFE78A]/35 animate-pulse' : 'bg-gray-100 text-gray-400'}`}>
                        {step.status === 'completed' ? '✓' : idx + 1}
                      </div>
                      <span className={`font-semibold ${step.status === 'pending' ? 'text-gray-400' : 'text-[#203a2a]'}`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Upcoming Sessions card (with top-right illustration) */}
            <motion.div 
              whileHover={{ border: '1px solid rgba(32,58,42,0.1)' }} 
              className="bg-white rounded-[20px] border border-[#E5EADF] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative overflow-hidden group transition-all duration-200"
            >
              {/* Micro illustration top-right */}
              <div className="absolute -right-3 -top-3 w-16 h-16 opacity-30 group-hover:opacity-50 transition-opacity">
                <CounsellingIllustration className="w-full h-full" />
              </div>

              <div className="section-header relative z-10">
                <div>
                  <h2 className="text-base font-display font-semibold text-[#203A2A]">Upcoming Sessions</h2>
                  <p className="text-xs text-[#6B756A] mt-0.5">Your next scheduled appointments</p>
                </div>
                <Link href="/dashboard/my-sessions">
                  <button className="flex items-center gap-1 text-xs text-[#203a2a] font-semibold hover:text-brand-dark transition-colors">
                    View All <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>

              <div className="space-y-3 relative z-10">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center gap-4 p-4 rounded-2xl bg-[#F9FBF7] border border-[#E5EADF] hover:border-[#203a2a]/30 hover:bg-[#EEF5E8]/10 transition-all cursor-pointer group/item">
                    <div className="text-2xl">{session.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#203A2A] truncate">{session.title}</p>
                      <p className="text-xs text-[#6B756A] mt-0.5">{session.subject}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1.5 text-xs text-[#203A2A] font-semibold">
                        <Clock className="w-3 h-3" />
                        <span>{session.date} · {session.time}</span>
                      </div>
                      <span className="inline-block mt-1 bg-[#EEF5E8] border border-[#DDE8C8] text-[#203A2A] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {session.status}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#6B756A] group-hover/item:text-[#203A2A] transition-colors" />
                  </div>
                ))}

                <Link href="/dashboard/book-counselling">
                  <button className="w-full py-3 rounded-2xl border-2 border-dashed border-[#E5EADF] text-xs text-[#6B756A] hover:border-[#203a2a] hover:text-[#203a2a] transition-all flex items-center justify-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Book a New Session
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Weekly Mood Trend Chart - Curved Area (with top-right illustration) */}
            <div className="bg-white rounded-[20px] border border-[#E5EADF] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative overflow-hidden group hover:border-[#203a2a]/20 transition-all duration-200">
              <div className="absolute -right-3 -top-3 w-16 h-16 opacity-30 group-hover:opacity-50 transition-opacity">
                <WellnessIllustration className="w-full h-full" />
              </div>

              <div className="flex items-center justify-between mb-6 relative z-10">
                <div>
                  <h3 className="font-display font-extrabold text-sm text-[#203a2a] uppercase tracking-wider">Mood Analytics</h3>
                  <p className="text-xs text-[#6B756A] mt-0.5">Weekly emotional trajectory</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-white border border-[#E5EADF] text-[#6B756A] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Weekly View
                  </span>
                </div>
              </div>

              <div className="w-full h-44 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={moodData} margin={{ top: 10, right: 5, bottom: 0, left: -25 }}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#203a2a" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#203a2a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5EADF" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#6B756A', fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#6B756A' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ 
                        background: 'rgba(255, 255, 255, 0.95)', 
                        backdropFilter: 'blur(4px)',
                        border: '1px solid #E5EADF', 
                        borderRadius: '16px', 
                        fontSize: '12px', 
                        boxShadow: '0 8px 24px rgba(0,0,0,0.02)' 
                      }}
                      labelStyle={{ color: '#203A2A', fontWeight: 700 }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#203a2a" 
                      strokeWidth={3} 
                      fill="url(#areaGrad)" 
                      dot={{ fill: '#203a2a', strokeWidth: 0, r: 4 }} 
                      activeDot={{ r: 6, fill: '#cfe78a', stroke: '#203a2a', strokeWidth: 2 }} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Horizontally scrolling Counsellors Carousel */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-sm text-[#203a2a] uppercase tracking-wider">Top Recommended Counsellors</h3>
                  <p className="text-xs text-[#6B756A] mt-0.5">Licensed professionals online now</p>
                </div>
                <Link href="/dashboard/book-counselling">
                  <button className="flex items-center gap-1.5 text-xs text-[#203a2a] font-bold hover:gap-2 transition-all">
                    Browse All <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>

              {/* Carousel Container */}
              <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar snap-x">
                {recommendedCounsellors.map((c) => (
                  <motion.div
                    key={c.id}
                    whileHover={{ y: -4, border: '1px solid #203a2a' }}
                    className="bg-white rounded-[20px] border border-[#E5EADF] p-4 min-w-[260px] max-w-[260px] snap-start flex flex-col justify-between h-[175px] shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-[#EEF5E8] flex-shrink-0 border border-[#E5EADF]">
                        <span className="absolute inset-0 flex items-center justify-center font-bold text-sm text-[#203a2a]">
                          {c.avatar}
                        </span>
                        <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-800 truncate">{c.name}</p>
                        <p className="text-[10px] text-[#6B756A] mt-0.5 truncate">{c.specialization}</p>
                        <div className="flex items-center gap-1 mt-1.5">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-[10px] font-bold text-gray-700">{c.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E5EADF]">
                      <div>
                        <p className="text-[9px] font-bold text-[#6B756A] uppercase tracking-widest">Available</p>
                        <p className="text-[10px] font-semibold text-[#203a2a] mt-0.5">{c.availability}</p>
                      </div>
                      <Link href={`/dashboard/book-counselling?id=${c.id}`}>
                        <button className="text-[10px] font-bold bg-[#CFE78A] text-[#203A2A] px-3.5 py-2 rounded-xl hover:bg-[#203a2a] hover:text-white transition-colors">
                          Quick Book
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recommended Reads (Blogs) - Upgraded cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-sm text-[#203a2a] uppercase tracking-wider">Recommended Reads</h3>
                  <p className="text-xs text-[#6B756A] mt-0.5">Handpicked wellness content for you</p>
                </div>
                <Link href="/dashboard/blogs">
                  <button className="flex items-center gap-1.5 text-xs text-[#203a2a] font-bold hover:gap-2 transition-all">
                    Read Library <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {blogs.map((blog) => (
                  <Link key={blog.id} href={`/dashboard/blogs/${blog.id}`}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="bg-white rounded-[20px] border border-[#E5EADF] p-4 h-[190px] flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${blog.gradient} flex items-center justify-center text-xl`}>
                        {blog.emoji}
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-[9px] bg-[#EEF5E8] border border-[#DDE8C8] text-[#203a2a] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {blog.category}
                        </span>
                        <h4 className="text-xs font-bold text-gray-800 leading-snug group-hover:text-[#203a2a] line-clamp-2">
                          {blog.title}
                        </h4>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#6B756A] pt-2 border-t border-[#E5EADF]">
                        <span>{blog.readTime} min read</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#6B756A] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (1/3 width) - Permanently visible Chat Panel & Daily Spark */}
          <div className="space-y-6 md:space-y-8">
            
            {/* AI Buddy Full Chat panel */}
            <div className="bg-white rounded-[20px] border border-[#E5EADF] shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col h-[490px] overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-[#E5EADF] flex items-center justify-between bg-[#F9FBF7]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#203a2a] flex items-center justify-center relative">
                    <Sparkles className="w-5 h-5 text-[#cfe78a]" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#203a2a] leading-none">AI Buddy Chat</h4>
                    <p className="text-[10px] text-[#6B756A] font-semibold mt-1">Online · Safe Companion</p>
                  </div>
                </div>
                <button 
                  onClick={() => setMessages([{ role: 'buddy', content: "Let's restart! How are you doing today? Ask me about studying, careers, or stress." }])}
                  className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors text-[#6B756A] hover:text-gray-600"
                  title="Restart chat"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scrollable chat body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/20 scrollbar-thin">
                {messages.map((m, idx) => (
                  <div 
                    key={idx} 
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm
                      ${m.role === 'user' 
                        ? 'bg-[#203a2a] text-white rounded-tr-none' 
                        : 'bg-white border border-[#E5EADF] text-[#243126] rounded-tl-none'}`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                
                {isAILoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-[#E5EADF] rounded-2xl rounded-tl-none p-3 text-xs text-[#6B756A] flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggestion Chips */}
              {suggestions.length > 0 && (
                <div className="px-4 py-2 border-t border-[#E5EADF] flex flex-wrap gap-1.5 bg-white">
                  {suggestions.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip)}
                      className="text-[10px] font-bold bg-white border border-[#E5EADF] hover:bg-[#CFE78A] hover:border-[#203A2A] text-[#6B756A] hover:text-[#203A2A] rounded-full px-2.5 py-1 transition-all"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Input area */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage(inputVal)
                }}
                className="p-3 border-t border-[#E5EADF] flex items-center gap-2 bg-white"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Talk to me about stress, career paths..."
                  className="flex-1 h-10 px-4 rounded-xl border border-[#E5EADF] text-xs outline-none focus:border-[#203a2a] focus:ring-1 focus:ring-[#203a2a]/20 bg-gray-50/20"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isAILoading}
                  className="w-10 h-10 bg-[#203A2A] text-white rounded-xl flex items-center justify-center hover:bg-[#1C3224] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Daily Spark Quote Widget */}
            <div className="bg-gradient-to-br from-[#EEF5E8] to-[#DDE8C8] text-[#243126] rounded-[20px] p-6 border border-[#E5EADF] shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative overflow-hidden flex flex-col justify-between h-[180px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#CFE78A]/10 rounded-full pointer-events-none" />
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#203A2A]" />
                <span className="text-[10px] font-extrabold text-[#203A2A] uppercase tracking-widest">Daily Spark</span>
              </div>
              <p className="text-xs italic leading-relaxed text-[#243126]/90 my-auto">
                "The power of holding on is that you begin to realise what makes you unique. Accept yourself and you will change your world."
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#E5EADF]">
                <span className="text-[9px] text-[#6B756A]">— Teens Helpline Mentor Team</span>
                <Smile className="w-3.5 h-3.5 text-[#203A2A]" />
              </div>
            </div>

          </div>

        </div>

      </div>
  )
}
