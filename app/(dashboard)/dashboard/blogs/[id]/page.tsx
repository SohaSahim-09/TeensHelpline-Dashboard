'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Heart, Share2, Bookmark } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const blogArticles = [
  {
    id: 1,
    title: '5 Proven Ways to Manage Exam Stress Without Burning Out',
    category: 'Stress Management',
    readTime: 5,
    author: 'Dr. Priya Sharma',
    date: 'June 20, 2026',
    emoji: '😤',
    likes: 234,
    content: `Exam season can feel like a mountain of pressure, but you don't have to navigate it alone. Let's break down five scientifically-proven strategies to manage your stress, keep your mind clear, and perform at your best without sacrificing your mental health.

1. **The Pomodoro Technique (with a twist)**: Work for 25 minutes, then take a 5-minute break. Every four cycles, take a longer 20-minute break. During your breaks, get away from your screens! Step outside, stretch, or grab a glass of water.
2. **Prioritize Quality Sleep**: Your brain consolidates memory and processes what you learned during deep sleep. Sacrificing sleep for late-night cramming actually decreases your cognitive performance the next day. Target 8 hours.
3. **Box Breathing**: When you feel a wave of anxiety, use the 4-4-4-4 method. Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold empty for 4 seconds. Repeat three times to calm your nervous system.
4. **Hydrate & Fuel Wisely**: Avoid excessive sugar and caffeine crashes. Nourish your brain with water, fresh fruits, and nuts.
5. **Ditch the Post-Exam Post-Mortems**: Once an exam is over, let it go. Discussing answers with peers will only fuel anxiety about things you can no longer change. Focus your energy on your well-being.`,
  },
  {
    id: 2,
    title: 'Choosing the Right Career Stream After Class 10: A Complete Guide',
    category: 'Career Guidance',
    readTime: 8,
    author: 'Mr. Rajan Mehta',
    date: 'June 18, 2026',
    emoji: '🎯',
    likes: 189,
    content: `Deciding whether to take Science, Commerce, or Arts can feel like one of the biggest choices you've faced. This guide will help you look beyond peer pressure and make an authentic decision suited for your long-term success.

1. **Assess Your Innate Strengths**: Are you naturally drawn to solving abstract problems, analyzing financial statements, or exploring creative expressions? Aptitude assessments (like the free one on our Career Guidance page) are excellent starting points.
2. **Research Careers of the Future**: Fields like Artificial Intelligence, Sustainable Energy, Behavioral Economics, and Digital Design are growing rapidly. Understand what skills these roles need.
3. **Separate Interests from Talents**: You might love listening to music, but that doesn't mean you must become a sound engineer. Distinguish between hobbies you enjoy and career fields where you want to work daily.
4. **Speak with Mentors**: Connect with alumni, seniors, or book a session with our career counselors to clarify doubts.
5. **Remember, Career Paths are Fluid**: Your choice of stream in class 11 is an entry point, not a life sentence. Many successful professionals switch domains later in life.`,
  },
  {
    id: 3,
    title: 'How Journaling Changed My Mental Health',
    category: 'Mental Health',
    readTime: 6,
    author: 'Ms. Ananya Roy',
    date: 'June 15, 2026',
    emoji: '📖',
    likes: 156,
    content: `Journaling is more than just writing down what happened today. It is a powerful mental health tool that helps you externalize thoughts, track patterns, and speak kindly to yourself.

1. **The Brain Dump**: When your mind is cluttered with worries, write them down without structure or editing. Seeing them on paper reduces their emotional weight.
2. **Gratitude Logging**: Jotting down three small things that brought a smile to your face today trains your brain to seek positive aspects of life.
3. **Identifying Triggers**: Regular writing helps you spot patterns. You might notice you feel more stressed on certain days of the week, helping you prepare.
4. **Self-Compassion practice**: Write to yourself as if you were talking to your best friend. Offer reassurance and forgive your mistakes.`,
  },
]

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  const article = blogArticles.find((art) => art.id === id) || blogArticles[0]

  return (
    <div className="page-container max-w-3xl mx-auto space-y-6">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-brand-primary font-bold hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
        <Link href="/dashboard/blogs" className="text-xs text-brand-muted hover:text-brand-primary transition-colors">
          Browse Library
        </Link>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[28px] border border-brand-border p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6"
      >
        <div className="space-y-4">
          <span className="text-xs font-semibold text-brand-primary bg-brand-sage/60 px-3 py-1.5 rounded-full border border-brand-border/40">
            {article.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-display font-extrabold text-brand-primary leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-brand-border/60 py-4 text-xs text-brand-muted">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-sage flex items-center justify-center font-bold text-brand-primary">
                {article.author.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-brand-text">{article.author}</p>
                <p className="text-[10px] mt-0.5">{article.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime} min read</span>
              <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {article.likes + (liked ? 1 : 0)} likes</span>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="text-sm text-brand-text leading-relaxed space-y-4 whitespace-pre-line font-medium">
          {article.content}
        </div>

        {/* Article actions */}
        <div className="flex items-center justify-between pt-6 border-t border-brand-border/60">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border transition-all ${liked ? 'bg-red-50 border-red-200 text-red-600' : 'border-brand-border text-brand-muted hover:border-brand-primary hover:text-brand-primary bg-white'}`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-600 text-red-600' : ''}`} />
              <span>{liked ? 'Liked' : 'Like'}</span>
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border transition-all ${saved ? 'bg-brand-sage border-brand-primary/20 text-brand-primary' : 'border-brand-border text-brand-muted hover:border-brand-primary hover:text-brand-primary bg-white'}`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-brand-primary text-brand-primary' : ''}`} />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
          <button className="p-2 border border-brand-border rounded-xl text-brand-muted hover:border-brand-primary hover:text-brand-primary bg-white transition-all">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
