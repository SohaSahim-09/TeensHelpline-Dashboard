import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IPayment extends Document {
  studentId: mongoose.Types.ObjectId
  appointmentId?: mongoose.Types.ObjectId
  amount: number
  currency: string
  status: 'pending' | 'success' | 'failed' | 'refunded'
  method: 'stripe' | 'razorpay' | 'upi' | 'bank'
  transactionId?: string
  receiptUrl?: string
  description: string
  refundStatus?: 'none' | 'partial' | 'full'
  refundAmount?: number
  createdAt: Date
  updatedAt: Date
}

const PaymentSchema = new Schema<IPayment>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed', 'refunded'],
      default: 'pending',
    },
    method: { type: String, enum: ['stripe', 'razorpay', 'upi', 'bank'] },
    transactionId: String,
    receiptUrl: String,
    description: { type: String, required: true },
    refundStatus: { type: String, enum: ['none', 'partial', 'full'], default: 'none' },
    refundAmount: Number,
  },
  { timestamps: true }
)

PaymentSchema.index({ studentId: 1, createdAt: -1 })
PaymentSchema.index({ status: 1 })

export const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema)
