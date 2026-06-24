'use client'

import { motion } from 'framer-motion'
import { CreditCard, Download, ArrowUpRight, CheckCircle } from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/utils'

const payments = [
  { id: 1, description: 'Counselling Session — Dr. Priya Sharma', date: new Date(Date.now() - 86400000), amount: 599, status: 'success', method: 'UPI', transactionId: 'TXN2024001' },
  { id: 2, description: 'Math Tutoring — Mr. Amit Verma', date: new Date(Date.now() - 7 * 86400000), amount: 349, status: 'success', method: 'Card', transactionId: 'TXN2024002' },
  { id: 3, description: 'Career Counselling — Mr. Rajan Mehta', date: new Date(Date.now() - 14 * 86400000), amount: 499, status: 'success', method: 'UPI', transactionId: 'TXN2024003' },
  { id: 4, description: 'Organic Chemistry Tutoring', date: new Date(Date.now() - 21 * 86400000), amount: 349, status: 'refunded', method: 'Card', transactionId: 'TXN2024004' },
]

const statusColors = { success: 'bg-green-50 text-green-700', failed: 'bg-red-50 text-red-700', refunded: 'bg-amber-50 text-amber-700', pending: 'bg-blue-50 text-blue-700' }

export default function PaymentsPage() {
  const total = payments.filter((p) => p.status === 'success').reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="page-container max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-brand-text">Payments</h1>
        <p className="text-brand-muted text-sm mt-1">Your transaction history and invoices</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Spent', value: formatCurrency(total), icon: CreditCard, color: 'bg-brand-sage' },
          { label: 'Sessions Paid', value: payments.filter((p) => p.status === 'success').length, icon: CheckCircle, color: 'bg-green-50' },
          { label: 'Refunds', value: payments.filter((p) => p.status === 'refunded').length, icon: ArrowUpRight, color: 'bg-amber-50' },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="card-premium">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}><Icon className="w-5 h-5 text-brand-primary" /></div>
              <div className="text-2xl font-display font-bold text-brand-text">{s.value}</div>
              <div className="text-xs text-brand-muted mt-0.5">{s.label}</div>
            </div>
          )
        })}
      </div>

      <div className="card-premium">
        <h2 className="font-display font-semibold text-brand-text mb-5">Transaction History</h2>
        <div className="space-y-3">
          {payments.map((payment, i) => (
            <motion.div key={payment.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-2xl border border-brand-border hover:border-brand-primary/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-sage flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-brand-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-brand-text truncate">{payment.description}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-brand-muted">
                  <span>{formatDate(payment.date)}</span>
                  <span>·</span>
                  <span>{payment.method}</span>
                  <span>·</span>
                  <span>{payment.transactionId}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold text-brand-text">{formatCurrency(payment.amount)}</div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[payment.status as keyof typeof statusColors]}`}>{payment.status}</span>
              </div>
              <button className="text-brand-muted hover:text-brand-primary transition-colors"><Download className="w-4 h-4" /></button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
