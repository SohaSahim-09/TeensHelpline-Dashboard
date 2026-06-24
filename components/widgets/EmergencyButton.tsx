'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, X, AlertCircle } from 'lucide-react'
import { BRAND } from '@/lib/brand'

export function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            className="absolute bottom-full mb-3 right-0 w-72 bg-white rounded-2xl shadow-card-hover border border-brand-border overflow-hidden"
          >
            {/* Header */}
            <div className="bg-red-50 border-b border-red-100 px-4 py-3 flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-sm font-semibold text-red-700">Emergency Support</p>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto text-red-400 hover:text-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-xs text-brand-muted leading-relaxed">
                If you or someone you know is in immediate danger, please reach out to emergency services or our support team.
              </p>

              {/* Call */}
              <a
                href={`tel:${BRAND.emergency.phone}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100 hover:bg-red-100 transition-all group"
              >
                <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-700">Call Helpline</p>
                  <p className="text-xs text-red-500">{BRAND.emergency.phone} · Free & 24/7</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${BRAND.emergency.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-100 hover:bg-green-100 transition-all"
              >
                <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-700">WhatsApp Support</p>
                  <p className="text-xs text-green-500">Chat with us now</p>
                </div>
              </a>

              <p className="text-[10px] text-brand-muted text-center pt-1">
                All conversations are private and confidential
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 rounded-full bg-red-500 text-white shadow-lg flex items-center justify-center relative group"
        title="Emergency Help"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-red-400 opacity-40"
        />
        <Phone className="w-4 h-4 relative z-10" />
        <div className="absolute right-full mr-2 bg-red-500 text-white text-xs rounded-xl px-3 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Emergency Help
        </div>
      </motion.button>
    </div>
  )
}
