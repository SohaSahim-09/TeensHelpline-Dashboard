'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Users2, Plus, Heart, MessageCircle, Share2, MoreHorizontal, TrendingUp } from 'lucide-react'
import { getRelativeTime, generateInitials } from '@/lib/utils'

const topics = ['All', 'Mental Health', 'Career', 'Study Tips', 'Motivation', 'Exam Prep', 'Friendships', 'Sports']

const posts = [
  { id: 1, authorName: 'Anonymous', isAnonymous: true, topic: 'Mental Health', title: 'How I overcame my board exam anxiety', content: 'I used to wake up at 3am in a panic about exams. What helped me was breaking my study schedule into tiny chunks and practicing gratitude every morning. Here\'s what worked for me...', likes: 47, comments: 12, shares: 5, createdAt: new Date(Date.now() - 2 * 3600000), tags: ['anxiety', 'exams', 'tips'] },
  { id: 2, authorName: 'Priya K.', isAnonymous: false, topic: 'Career', title: 'Confused between Engineering and Design — need advice!', content: 'I scored well in PCM but my heart is in graphic design. My parents want me to do engineering. Has anyone been in this situation? What did you choose?', likes: 34, comments: 28, shares: 3, createdAt: new Date(Date.now() - 5 * 3600000), tags: ['career', 'dilemma', 'design'] },
  { id: 3, authorName: 'Rahul M.', isAnonymous: false, topic: 'Study Tips', title: 'How I improved my grades from 60% to 89% in 3 months', content: 'The Pomodoro technique + active recall completely transformed how I study. I\'ll share my exact schedule and the resources I used...', likes: 89, comments: 45, shares: 22, createdAt: new Date(Date.now() - 24 * 3600000), tags: ['study', 'grades', 'pomodoro'] },
  { id: 4, authorName: 'Anonymous', isAnonymous: true, topic: 'Motivation', title: 'Feeling like giving up — is this normal?', content: 'I\'ve been studying for 10 hours a day and I feel like nothing is sticking. I\'m exhausted and demotivated. Just needed to vent to people who might understand...', likes: 62, comments: 38, shares: 0, createdAt: new Date(Date.now() - 3 * 24 * 3600000), tags: ['motivation', 'burnout', 'support'] },
]

export default function CommunityPage() {
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [liked, setLiked] = useState<number[]>([])
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', content: '', isAnonymous: false })

  const filtered = posts.filter((p) => selectedTopic === 'All' || p.topic === selectedTopic)

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-text">Community 🌱</h1>
          <p className="text-brand-muted text-sm mt-1">Connect, share, and grow together</p>
        </div>
        <button onClick={() => setShowNewPost(true)} className="btn-brand flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[{ label: 'Active Members', value: '2.4K' }, { label: 'Posts This Week', value: 38 }, { label: 'Trending Topics', value: 12 }].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="card-premium text-center">
            <div className="font-bold text-brand-text text-xl">{s.value}</div>
            <div className="text-xs text-brand-muted mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Topics */}
      <div className="flex gap-2 flex-wrap">
        {topics.map((t) => (
          <button key={t} onClick={() => setSelectedTopic(t)}
            className={`text-xs px-4 py-2 rounded-full font-medium border transition-all ${selectedTopic === t ? 'bg-brand-primary text-white border-brand-primary' : 'border-brand-border text-brand-muted bg-white'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* New post form */}
      {showNewPost && (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="card-premium border-brand-primary/30">
          <h3 className="font-semibold text-brand-text mb-4">Share with the Community</h3>
          <input value={newPost.title} onChange={(e) => setNewPost((p) => ({ ...p, title: e.target.value }))} placeholder="Post title..." className="input-premium mb-3" />
          <textarea value={newPost.content} onChange={(e) => setNewPost((p) => ({ ...p, content: e.target.value }))} placeholder="Share your thoughts, questions, or experiences..." rows={4} className="input-premium resize-none mb-3" />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs text-brand-muted cursor-pointer">
              <input type="checkbox" checked={newPost.isAnonymous} onChange={(e) => setNewPost((p) => ({ ...p, isAnonymous: e.target.checked }))} className="w-3.5 h-3.5 accent-brand-primary" />
              Post anonymously
            </label>
            <div className="flex gap-2">
              <button onClick={() => setShowNewPost(false)} className="btn-outline py-2 px-4 text-sm">Cancel</button>
              <button className="btn-brand py-2 px-4 text-sm">Post</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {filtered.map((post, i) => (
          <motion.div key={post.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card-premium">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-brand-sage text-brand-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                {post.isAnonymous ? '?' : generateInitials(post.authorName)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold text-brand-text">{post.isAnonymous ? 'Anonymous' : post.authorName}</span>
                    <span className="text-xs text-brand-muted ml-2">{getRelativeTime(post.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-brand-sage text-brand-primary font-semibold px-2.5 py-1 rounded-full">{post.topic}</span>
                    <button className="text-brand-muted hover:text-brand-primary"><MoreHorizontal className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-brand-text mb-2">{post.title}</h3>
            <p className="text-sm text-brand-muted leading-relaxed line-clamp-3">{post.content}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {post.tags.map((tag) => <span key={tag} className="text-[10px] text-brand-primary bg-brand-sage/50 px-2 py-1 rounded-full">#{tag}</span>)}
            </div>
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-brand-border">
              <button onClick={() => setLiked((p) => p.includes(post.id) ? p.filter((x) => x !== post.id) : [...p, post.id])}
                className={`flex items-center gap-1.5 text-xs transition-colors ${liked.includes(post.id) ? 'text-red-500' : 'text-brand-muted hover:text-red-400'}`}>
                <Heart className={`w-4 h-4 ${liked.includes(post.id) ? 'fill-red-500' : ''}`} />
                {post.likes + (liked.includes(post.id) ? 1 : 0)}
              </button>
              <button className="flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-primary">
                <MessageCircle className="w-4 h-4" /> {post.comments}
              </button>
              <button className="flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-primary ml-auto">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
