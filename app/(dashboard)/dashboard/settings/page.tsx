'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Shield, Lock, Trash2, Save, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'

const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-all duration-200 ${checked ? 'bg-brand-primary' : 'bg-gray-200'}`}
  >
    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${checked ? 'left-6' : 'left-1'}`} />
  </button>
)

export default function SettingsPage() {
  const [notifs, setNotifs] = useState({ sessions: true, messages: true, blogs: false, system: true, marketing: false })
  const [privacy, setPrivacy] = useState({ profileVisible: true, activityVisible: false })
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })

  const handleSave = (section: string) => {
    toast.success(`${section} settings saved! ✨`)
  }

  return (
    <div className="page-container max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-brand-text">Settings</h1>
        <p className="text-brand-muted text-sm mt-1">Manage your preferences and account security</p>
      </motion.div>

      <div className="space-y-5">
        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-premium">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-brand-sage flex items-center justify-center">
              <Bell className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-brand-text">Notifications</h2>
              <p className="text-xs text-brand-muted">Control what you get notified about</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { key: 'sessions', label: 'Session Reminders', desc: 'Get notified 30 min before each session' },
              { key: 'messages', label: 'New Messages', desc: 'Notifications when counsellors message you' },
              { key: 'blogs', label: 'Blog Recommendations', desc: 'Weekly curated article picks' },
              { key: 'system', label: 'System Updates', desc: 'Important account and platform updates' },
              { key: 'marketing', label: 'Promotions & Offers', desc: 'Special offers and new features' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2 border-b border-brand-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-brand-text">{item.label}</p>
                  <p className="text-xs text-brand-muted mt-0.5">{item.desc}</p>
                </div>
                <ToggleSwitch
                  checked={notifs[item.key as keyof typeof notifs]}
                  onChange={() => setNotifs((p) => ({ ...p, [item.key]: !p[item.key as keyof typeof notifs] }))}
                />
              </div>
            ))}
          </div>
          <button onClick={() => handleSave('Notification')} className="btn-brand mt-4 flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Preferences
          </button>
        </motion.div>



        {/* Privacy */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-premium">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-brand-sage flex items-center justify-center">
              <Shield className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-brand-text">Privacy</h2>
              <p className="text-xs text-brand-muted">Control your data and visibility</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { key: 'profileVisible', label: 'Public Profile', desc: 'Allow counsellors to view your profile' },
              { key: 'activityVisible', label: 'Activity Status', desc: 'Show when you\'re online to connected counsellors' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-brand-text">{item.label}</p>
                  <p className="text-xs text-brand-muted">{item.desc}</p>
                </div>
                <ToggleSwitch
                  checked={privacy[item.key as keyof typeof privacy]}
                  onChange={() => setPrivacy((p) => ({ ...p, [item.key]: !p[item.key as keyof typeof privacy] }))}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Change Password */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card-premium">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-brand-sage flex items-center justify-center">
              <Lock className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-brand-text">Change Password</h2>
              <p className="text-xs text-brand-muted">Update your password regularly for security</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { key: 'current', label: 'Current Password', placeholder: '••••••••' },
              { key: 'newPass', label: 'New Password', placeholder: 'Min. 8 characters' },
              { key: 'confirm', label: 'Confirm New Password', placeholder: 'Repeat new password' },
            ].map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-text">{field.label}</label>
                <input type="password" placeholder={field.placeholder} className="input-premium"
                  value={passwords[field.key as keyof typeof passwords]}
                  onChange={(e) => setPasswords((p) => ({ ...p, [field.key]: e.target.value }))} />
              </div>
            ))}
            <button onClick={() => handleSave('Password')} className="btn-brand flex items-center gap-2 mt-2">
              <Lock className="w-4 h-4" /> Update Password
            </button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-premium border-red-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-red-600">Danger Zone</h2>
              <p className="text-xs text-brand-muted">Irreversible and destructive actions</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
            <div>
              <p className="text-sm font-semibold text-red-700">Delete Account</p>
              <p className="text-xs text-red-500 mt-0.5">Permanently delete your account and all data</p>
            </div>
            <button className="text-xs font-semibold text-red-600 border border-red-200 px-4 py-2 rounded-xl hover:bg-red-100 transition-all">
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
