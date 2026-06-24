'use client'

import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { generateInitials, formatDate } from '@/lib/utils'
import { useState } from 'react'
import { Camera, Save, User, Phone, MapPin, Target, GraduationCap, Heart, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const interests = ['Technology', 'Science', 'Arts', 'Sports', 'Music', 'Writing', 'Gaming', 'Photography', 'Cooking', 'Travel', 'Fitness', 'Nature', 'Drama', 'Dance']
const careerGoals = ['Engineering', 'Medicine', 'Law', 'Business', 'Design', 'Arts', 'Education', 'Government Services', 'Research', 'Sports', 'Media', 'Entrepreneurship']

export default function ProfilePage() {
  const { user } = useAuth()
  const [selectedInterests, setSelectedInterests] = useState(['Technology', 'Science', 'Music'])
  const [selectedGoal, setSelectedGoal] = useState('Engineering')
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || 'Student',
    email: user?.email || '',
    phone: '',
    school: '',
    class: '',
    city: '',
    bio: '',
    parentName: '',
    parentPhone: '',
  })

  const handleChange = (field: string, value: string) => setFormData((p) => ({ ...p, [field]: value }))

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 1200))
    toast.success('Profile updated successfully! ✨')
    setIsSaving(false)
  }

  const Field = ({ label, id, children }: any) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-brand-text">{label}</label>
      {children}
    </div>
  )

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-brand-text">My Profile</h1>
        <p className="text-brand-muted text-sm mt-1">Manage your personal information and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Avatar & Quick Info */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-5">
          <div className="card-premium text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-3xl bg-brand-primary text-white text-3xl font-bold flex items-center justify-center mx-auto">
                {user ? generateInitials(user.name) : 'S'}
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-brand-lime text-brand-primary flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h2 className="font-display font-bold text-brand-text">{user?.name}</h2>
              <p className="text-xs text-brand-muted">{user?.email}</p>
              <div className="inline-flex items-center gap-1.5 bg-brand-sage text-brand-primary text-xs font-semibold px-3 py-1 rounded-full mt-2">
                <GraduationCap className="w-3 h-3" />
                Student
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-brand-border">
              {[{ label: 'Sessions', value: 12 }, { label: 'Streak', value: '8d' }, { label: 'Score', value: '82%' }].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-bold text-brand-text text-lg">{s.value}</div>
                  <div className="text-[10px] text-brand-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Goal */}
          <div className="card-premium">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-brand-primary" />
              <h3 className="font-semibold text-brand-text text-sm">Career Goal</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {careerGoals.slice(0, 6).map((goal) => (
                <button
                  key={goal}
                  onClick={() => setSelectedGoal(goal)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${selectedGoal === goal ? 'bg-brand-primary text-white border-brand-primary' : 'border-brand-border text-brand-muted hover:border-brand-primary'}`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="card-premium">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-brand-primary" />
              <h3 className="font-semibold text-brand-text text-sm">Interests</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => setSelectedInterests((p) => p.includes(interest) ? p.filter((x) => x !== interest) : [...p, interest])}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${selectedInterests.includes(interest) ? 'bg-brand-lime text-brand-primary border-brand-lime' : 'border-brand-border text-brand-muted hover:border-brand-primary'}`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-2 space-y-5">
          {/* Personal Info */}
          <div className="card-premium space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-brand-primary" />
              <h3 className="font-display font-semibold text-brand-text">Personal Information</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" id="name">
                <input id="name" className="input-premium" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
              </Field>
              <Field label="Email Address" id="email">
                <input id="email" type="email" className="input-premium" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
              </Field>
              <Field label="Phone Number" id="phone">
                <input id="phone" className="input-premium" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
              </Field>
              <Field label="School / College" id="school">
                <input id="school" className="input-premium" placeholder="Enter your school name" value={formData.school} onChange={(e) => handleChange('school', e.target.value)} />
              </Field>
              <Field label="Current Class" id="class">
                <select id="class" className="input-premium" value={formData.class} onChange={(e) => handleChange('class', e.target.value)}>
                  <option value="">Select class</option>
                  {['Class 9', 'Class 10', 'Class 11', 'Class 12', 'Undergraduate'].map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="City" id="city">
                <input id="city" className="input-premium" placeholder="Your city" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} />
              </Field>
            </div>
            <Field label="Bio" id="bio">
              <textarea id="bio" rows={3} className="input-premium resize-none" placeholder="Tell us a little about yourself..." value={formData.bio} onChange={(e) => handleChange('bio', e.target.value)} />
            </Field>
          </div>

          {/* Parent / Guardian */}
          <div className="card-premium space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-brand-primary" />
              <h3 className="font-display font-semibold text-brand-text">Parent / Guardian</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Parent Name" id="parentName">
                <input id="parentName" className="input-premium" placeholder="Parent/Guardian name" value={formData.parentName} onChange={(e) => handleChange('parentName', e.target.value)} />
              </Field>
              <Field label="Parent Phone" id="parentPhone">
                <input id="parentPhone" className="input-premium" placeholder="+91 XXXXX XXXXX" value={formData.parentPhone} onChange={(e) => handleChange('parentPhone', e.target.value)} />
              </Field>
            </div>
          </div>

          {/* Save */}
          <button onClick={handleSave} disabled={isSaving} className="btn-brand flex items-center gap-2 w-full sm:w-auto justify-center">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
