'use client'

import { motion } from 'framer-motion'
import { Phone, MessageCircle, Heart, Shield, LifeBuoy, AlertCircle, Info, ExternalLink } from 'lucide-react'
import { BRAND } from '@/lib/brand'

const emergencyContacts = [
  {
    title: 'Teens Helpline Call',
    desc: 'Speak directly with a compassionate counselor. Free, confidential, and available 24/7.',
    actionText: 'Call Now',
    href: `tel:${BRAND.emergency.phone}`,
    icon: Phone,
    color: 'bg-red-50 border-red-100 text-red-700 hover:bg-red-100/70',
    iconBg: 'bg-red-500 text-white',
  },
  {
    title: 'Teens Helpline WhatsApp',
    desc: 'Prefer chatting? Message us on WhatsApp anytime to connect with our support agents.',
    actionText: 'Chat on WhatsApp',
    href: `https://wa.me/${BRAND.emergency.whatsapp.replace(/\D/g, '')}`,
    icon: MessageCircle,
    color: 'bg-green-50 border-green-100 text-green-700 hover:bg-green-100/70',
    iconBg: 'bg-green-500 text-white',
  },
]

const externalCrisisHelplines = [
  { name: 'Kiran Mental Health Helpline', number: '1800-599-0019', hours: '24/7', type: 'Govt. Helpline' },
  { name: 'AASRA Crisis Center', number: '91-9820466726', hours: '24/7', type: 'Suicide Prevention' },
  { name: 'Vandrevala Foundation', number: '9999 666 555', hours: '24/7', type: 'Mental Health Support' },
  { name: 'Sneha India', number: '044-24640050', hours: '24/7', type: 'Crisis Support' },
]

export default function EmergencyPage() {
  return (
    <div className="page-container max-w-5xl mx-auto space-y-8">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-xl mx-auto space-y-2"
      >
        <span className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Immediate Support Available</span>
        </span>
        <h1 className="text-3xl font-display font-extrabold text-brand-primary">Emergency Support</h1>
        <p className="text-brand-muted text-sm leading-relaxed">
          If you are in distress, feeling overwhelmed, or in immediate danger, please reach out. We are here to listen and help you through this.
        </p>
      </motion.div>

      {/* Main Hotline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {emergencyContacts.map((contact, idx) => {
          const Icon = contact.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-[24px] border bg-white shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between h-[220px] transition-all duration-200 group hover:border-[#203a2a]/20`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${contact.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-brand-primary leading-tight">{contact.title}</h3>
                  <p className="text-xs text-brand-muted leading-relaxed">{contact.desc}</p>
                </div>
              </div>

              <a
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`w-full py-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 ${contact.color}`}
              >
                <span>{contact.actionText}</span>
              </a>
            </motion.div>
          )
        })}
      </div>

      {/* Reassurance Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-[#EEF5E8] to-[#DDE8C8] rounded-[24px] p-6 border border-brand-border shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col md:flex-row items-center gap-5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#CFE78A]/10 rounded-full pointer-events-none" />
        <div className="w-12 h-12 rounded-2xl bg-white border border-brand-border flex items-center justify-center text-brand-primary flex-shrink-0 shadow-inner">
          <Heart className="w-5 h-5 fill-brand-primary text-brand-primary" />
        </div>
        <div className="flex-1 text-center md:text-left space-y-1">
          <h4 className="font-display font-bold text-brand-primary text-sm">Everything is Private and Safe</h4>
          <p className="text-xs text-brand-muted leading-relaxed">
            All calls and chats are confidential. Our trained student support specialists and licensed advisors provide a safe space without judgement.
          </p>
        </div>
      </motion.div>

      {/* External Resources */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-[24px] border border-brand-border p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-sage/40 border border-brand-border flex items-center justify-center">
            <LifeBuoy className="w-4 h-4 text-brand-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-brand-primary text-sm">Additional National Hotlines</h3>
            <p className="text-[10px] text-brand-muted">Government and charity helpline services across India</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {externalCrisisHelplines.map((helpline, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-2xl border border-brand-border bg-brand-bg/50 hover:bg-brand-bg transition-colors flex flex-col justify-between gap-2"
            >
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted bg-white border border-brand-border rounded-full px-2 py-0.5">
                  {helpline.type}
                </span>
                <h4 className="text-xs font-bold text-brand-primary mt-2">{helpline.name}</h4>
              </div>
              <div className="flex items-center justify-between border-t border-brand-border/60 pt-2.5 mt-1">
                <a 
                  href={`tel:${helpline.number.replace(/\s+/g, '')}`}
                  className="text-xs font-extrabold text-[#203a2a] hover:underline flex items-center gap-1.5"
                >
                  <Phone className="w-3 h-3" />
                  {helpline.number}
                </a>
                <span className="text-[10px] font-semibold text-brand-muted uppercase tracking-wider">
                  {helpline.hours}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
