'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, BookOpen, Clock, Heart, ChevronRight, Filter } from 'lucide-react'
import Link from 'next/link'

const categories = ['All', 'Mental Health', 'Career Guidance', 'Study Tips', 'Exam Preparation', 'Stress Management', 'Bullying', 'Relationships', 'Motivation', 'Time Management']

const blogs = [
  { id: 1, title: '5 Proven Ways to Manage Exam Stress Without Burning Out', excerpt: 'Exam season can feel overwhelming, but with the right techniques, you can stay calm, focused, and perform at your best.', category: 'Stress Management', readTime: 5, author: 'Dr. Priya Sharma', emoji: '😤', isFeatured: true, likes: 234 },
  { id: 2, title: 'Choosing the Right Career Stream After Class 10: A Complete Guide', excerpt: 'Science, Commerce, or Arts? This comprehensive guide helps you make an informed decision based on your strengths and interests.', category: 'Career Guidance', readTime: 8, author: 'Mr. Rajan Mehta', emoji: '🎯', isFeatured: true, likes: 189 },
  { id: 3, title: 'How to Build Unshakeable Study Habits That Last', excerpt: 'Consistency beats intensity. Discover the science-backed study habits that top students swear by.', category: 'Study Tips', readTime: 6, author: 'Ms. Ananya Roy', emoji: '📚', isFeatured: false, likes: 156 },
  { id: 4, title: 'Understanding Teen Anxiety: You\'re Not Alone', excerpt: 'Anxiety affects millions of teenagers. Learning to recognize and manage it is the first step to feeling better.', category: 'Mental Health', readTime: 7, author: 'Dr. Arjun Nair', emoji: '💙', isFeatured: true, likes: 312 },
  { id: 5, title: 'The Power of Morning Routines for Academic Success', excerpt: 'How you start your morning sets the tone for your entire day. Here are 7 simple habits that change everything.', category: 'Time Management', readTime: 4, author: 'Ms. Zara Khan', emoji: '🌅', isFeatured: false, likes: 98 },
  { id: 6, title: 'Dealing with Bullying: What to Do and Who to Tell', excerpt: 'No one deserves to be bullied. Here\'s a practical guide for recognizing, handling, and reporting bullying.', category: 'Bullying', readTime: 6, author: 'Mr. Vikram Singh', emoji: '🛡️', isFeatured: false, likes: 445 },
  { id: 7, title: 'JEE vs NEET: Which is the Right Path for You?', excerpt: 'Engineering or medicine — both are prestigious but very different journeys. Let\'s break down what each path demands.', category: 'Exam Preparation', readTime: 9, author: 'Mr. Rajan Mehta', emoji: '⚗️', isFeatured: false, likes: 267 },
  { id: 8, title: 'How to Talk to Parents About Mental Health', excerpt: 'Starting the conversation about your mental health with parents can be daunting. Here\'s how to approach it.', category: 'Mental Health', readTime: 5, author: 'Dr. Priya Sharma', emoji: '💬', isFeatured: false, likes: 198 },
  { id: 9, title: '10-Minute Mindfulness Practices for Busy Teens', excerpt: 'You don\'t need an hour to meditate. These quick mindfulness exercises fit into any schedule.', category: 'Motivation', readTime: 4, author: 'Ms. Ananya Roy', emoji: '🧘', isFeatured: false, likes: 143 },
]

export default function BlogsPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [bookmarked, setBookmarked] = useState<number[]>([])

  const filtered = blogs.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchCat = selectedCategory === 'All' || b.category === selectedCategory
    return matchSearch && matchCat
  })

  const featured = filtered.filter((b) => b.isFeatured)
  const regular = filtered.filter((b) => !b.isFeatured)

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-brand-text">Blogs & Articles 📖</h1>
        <p className="text-brand-muted text-sm mt-1">Expert-written content to support your journey</p>
      </motion.div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-premium pl-11"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-4 py-2 rounded-full font-medium border transition-all ${selectedCategory === cat ? 'bg-brand-primary text-white border-brand-primary' : 'border-brand-border text-brand-muted hover:border-brand-primary bg-white'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div>
          <h2 className="font-display font-semibold text-brand-text mb-4">✨ Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="card-premium relative cursor-pointer"
              >
                <div className="absolute top-4 right-4">
                  <span className="bg-brand-lime text-brand-primary text-[10px] font-bold px-2.5 py-1 rounded-full">Featured</span>
                </div>
                <div className="text-4xl mb-4">{blog.emoji}</div>
                <span className="text-[10px] font-semibold text-brand-primary bg-brand-sage/60 px-2.5 py-1 rounded-full">{blog.category}</span>
                <h3 className="font-display font-semibold text-brand-text mt-2 mb-2 leading-snug">{blog.title}</h3>
                <p className="text-xs text-brand-muted leading-relaxed mb-4">{blog.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-brand-muted">
                    <span>{blog.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blog.readTime} min</span>
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {blog.likes}</span>
                  </div>
                  <button
                    onClick={() => setBookmarked((b) => b.includes(blog.id) ? b.filter((x) => x !== blog.id) : [...b, blog.id])}
                    className={`text-xs ${bookmarked.includes(blog.id) ? 'text-brand-primary' : 'text-brand-muted'} hover:text-brand-primary`}
                  >
                    {bookmarked.includes(blog.id) ? '🔖 Saved' : 'Save'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Regular */}
      {regular.length > 0 && (
        <div>
          <h2 className="font-display font-semibold text-brand-text mb-4">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {regular.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -3 }}
                className="card-premium cursor-pointer"
              >
                <div className="text-3xl mb-3">{blog.emoji}</div>
                <span className="text-[10px] font-semibold text-brand-primary bg-brand-sage/60 px-2.5 py-1 rounded-full">{blog.category}</span>
                <h3 className="font-semibold text-brand-text mt-2 mb-1.5 text-sm leading-snug line-clamp-2">{blog.title}</h3>
                <p className="text-xs text-brand-muted line-clamp-2 mb-3">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-brand-muted pt-3 border-t border-brand-border">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {blog.readTime} min read
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {blog.likes}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 space-y-3">
          <div className="text-5xl">🔍</div>
          <p className="text-brand-muted text-sm">No articles found. Try a different search.</p>
        </div>
      )}
    </div>
  )
}
