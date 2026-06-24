'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Compass, GraduationCap, Star, Users, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react'
import { BRAND } from '@/lib/brand'
import { Logo } from '@/components/ui/Logo'

// Rotating testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Aisha Khan',
    role: 'Class 12 Student',
    location: 'Mumbai, MH',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120',
    initial: 'A',
    story: 'Teens Helpline helped me manage board exam stress and choose the right career path. The counsellors are so supportive and friendly! I feel heard and safe here.'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Class 11 Student',
    location: 'New Delhi, DL',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
    initial: 'R',
    story: 'The physics and math tutors are amazing! I went from C to A in my final exams. The AI Buddy is also perfect for quick learning sessions at night.'
  },
  {
    id: 3,
    name: 'Sneha Reddy',
    role: 'Class 10 Student',
    location: 'Bangalore, KA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
    initial: 'S',
    story: 'It is a truly judgment-free safe space. The daily mood tracker and journal have helped me understand myself better. Highly recommend to any teen!'
  }
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#F7F9F3] flex flex-col lg:flex-row overflow-x-hidden">
      
      {/* LEFT PANEL — Premium Visual Storytelling */}
      <div className="relative w-full lg:w-[48%] min-h-[500px] lg:min-h-screen bg-[#EEF5E8] p-8 lg:p-12 flex flex-col justify-between overflow-hidden border-r border-[#E5EADF]">
        
        {/* Layered glowing ambient orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-[#cfe78a]/20 rounded-full filter blur-[80px]" />
        <div className="absolute bottom-[20%] left-[-15%] w-[400px] h-[400px] bg-[#dde8c8]/30 rounded-full filter blur-[100px]" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-[#203a2a]/5 rounded-full filter blur-[60px]" />

        {/* Top: Branding Header */}
        <div className="relative z-10 flex items-center justify-between">
          <a 
            href={BRAND.websiteUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 group"
            title="Visit Teens Helpline Website"
          >
            <Logo 
              iconClassName="w-10 h-10 group-hover:scale-105 transition-transform duration-300"
              light={false}
            />
          </a>
          
          <a 
            href={BRAND.websiteUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs text-[#203A2A] font-semibold bg-white/80 hover:bg-white px-3.5 py-2 rounded-xl border border-[#E5EADF] backdrop-blur-sm transition-all duration-200 shadow-sm"
          >
            Visit Website
          </a>
        </div>

        {/* Center: Dynamic floating cards and stats */}
        <div className="relative z-10 my-auto py-12 space-y-10">
          
          {/* Slogan */}
          <div className="space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 bg-[#CFE78A]/20 border border-[#CFE78A]/30 rounded-full px-3.5 py-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#203A2A]" />
              <span className="text-[#203A2A] text-[11px] font-bold uppercase tracking-wider">Your Safe Haven</span>
            </div>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-display font-extrabold text-[#203A2A] tracking-tight leading-[1.15]">
              Empowering your mind,<br />
              guiding your <span className="text-[#3E5C47]">future</span>.
            </h1>
            <p className="text-[#6B756A] leading-relaxed text-sm max-w-md">
              A premium, secure environment designed exclusively for teens. Manage counselling, set academic goals, plan your career, and track your well-being.
            </p>
          </div>

          {/* Floating High-fidelity Illustration Cards (Horizontal Scroll/Stack) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Card 1: Counselling */}
            <motion.div 
              initial={{ y: 0 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white border border-[#E5EADF] rounded-2xl p-4 flex flex-col justify-between h-36 hover:border-[#203A2A]/20 transition-all duration-300 shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-[#EEF5E8] flex items-center justify-center border border-[#E5EADF]">
                <Heart className="w-4 h-4 text-[#203A2A]" />
              </div>
              <div>
                <h3 className="text-[#203A2A] font-semibold text-xs leading-none">Mind Support</h3>
                <p className="text-[#6B756A] text-[10px] mt-1.5">Licensed therapist & mental wellness chats</p>
              </div>
            </motion.div>

            {/* Card 2: Career Roadmap */}
            <motion.div 
              initial={{ y: 0 }}
              animate={{ y: [-4, 2, -4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="bg-white border border-[#E5EADF] rounded-2xl p-4 flex flex-col justify-between h-36 hover:border-[#203A2A]/20 transition-all duration-300 shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                <Compass className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="text-[#203A2A] font-semibold text-xs leading-none">Career Roadmaps</h3>
                <p className="text-[#6B756A] text-[10px] mt-1.5">Interactive pathway mapping & mentoring</p>
              </div>
            </motion.div>

            {/* Card 3: Academic Mentoring */}
            <motion.div 
              initial={{ y: 0 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="bg-white border border-[#E5EADF] rounded-2xl p-4 flex flex-col justify-between h-36 hover:border-[#203A2A]/20 transition-all duration-300 shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-[#203A2A] font-semibold text-xs leading-none">Tutoring</h3>
                <p className="text-[#6B756A] text-[10px] mt-1.5">1-on-1 exam prep and subject help</p>
              </div>
            </motion.div>
          </div>

          {/* Trust statistics grid */}
          <div className="grid grid-cols-2 gap-3 max-w-md pt-2">
            {[
              { label: 'Students Supported', value: '50,000+', icon: Users, color: 'text-emerald-600' },
              { label: 'Student Satisfaction', value: '4.9/5', icon: Star, color: 'text-yellow-500' },
              { label: 'Expert Counsellors', value: '20+', icon: ShieldCheck, color: 'text-[#203A2A]' },
              { label: 'AI Buddy Support', value: '24/7', icon: MessageSquare, color: 'text-blue-600' },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="bg-white border border-[#E5EADF] rounded-xl p-3 flex items-center gap-3 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-[#EEF5E8] flex items-center justify-center flex-shrink-0 border border-[#E5EADF]">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-[#203A2A] font-bold text-sm tracking-tight leading-none">{stat.value}</p>
                  <p className="text-[#6B756A] text-[9px] font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Rotating testimonials with Framer Motion */}
          <div className="relative overflow-hidden bg-white border border-[#E5EADF] rounded-2xl p-5 shadow-sm">
            <div className="absolute top-3 right-3 opacity-10">
              <span className="font-serif text-6xl text-[#203A2A]">“</span>
            </div>
            
            <div className="h-32 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col justify-between h-full"
                >
                  <p className="text-[#243126]/90 text-xs italic leading-relaxed font-medium">
                    "{testimonials[currentTestimonial].story}"
                  </p>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#E5EADF] bg-[#EEF5E8]">
                      {/* We fall back to a styled initial if image isn't available */}
                      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-[#203A2A]">
                        {testimonials[currentTestimonial].initial}
                      </span>
                      <img 
                        src={testimonials[currentTestimonial].avatar} 
                        alt={testimonials[currentTestimonial].name}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-[#203A2A] text-xs font-bold">{testimonials[currentTestimonial].name}</p>
                      <p className="text-[#6B756A] text-[10px] font-medium">{testimonials[currentTestimonial].role} · {testimonials[currentTestimonial].location}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Sliding navigation dots */}
            <div className="flex justify-center gap-1.5 mt-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-[#203A2A] w-3' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="relative z-10 border-t border-[#E5EADF] pt-4 flex items-center justify-between">
          <p className="text-[#6B756A] text-[10px] tracking-wide">© 2026 Teens Helpline. Safe & Encrypted.</p>
          <a href="#" className="text-[#6B756A] hover:text-[#203A2A] text-[10px] tracking-wide underline font-medium">Privacy Shield</a>
        </div>
      </div>

      {/* RIGHT PANEL — Authentication Forms */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto min-h-[500px]">
        <div className="w-full max-w-[440px]">
          {/* Mobile Branding (Visible only on mobile/tablet) */}
          <div className="flex lg:hidden items-center justify-between mb-8 pb-4 border-b border-[#e8e8e3]">
            <a 
              href={BRAND.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2.5"
              title="Visit Teens Helpline Website"
            >
              <Logo 
                iconClassName="w-9 h-9"
                textClassName="text-[#203a2a]"
              />
            </a>
            
            <a 
              href={BRAND.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-[#203a2a] font-semibold bg-[#dde8c8]/40 hover:bg-[#dde8c8]/70 px-3 py-1.5 rounded-full transition-all"
            >
              Website
            </a>
          </div>
          
          {children}
        </div>
      </div>
      
    </div>
  )
}
