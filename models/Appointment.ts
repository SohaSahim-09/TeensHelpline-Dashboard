import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IAppointment extends Document {
  studentId: mongoose.Types.ObjectId
  providerId: mongoose.Types.ObjectId
  providerType: 'counsellor' | 'tutor' | 'career-mentor'
  providerName: string
  studentName: string
  date: Date
  time: string
  duration: number
  type: 'video' | 'audio' | 'chat'
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled' | 'no-show'
  subject?: string
  notes?: string
  meetingLink?: string
  price: number
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed'
  paymentId?: string
  reminderSent: boolean
  feedback?: string
  rating?: number
  homework?: string
  sessionSummary?: string
  cancelReason?: string
  rescheduledFrom?: Date
  createdAt: Date
  updatedAt: Date
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    providerId: { type: Schema.Types.ObjectId, required: true },
    providerType: { type: String, enum: ['counsellor', 'tutor', 'career-mentor'], required: true },
    providerName: { type: String, required: true },
    studentName: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    duration: { type: Number, default: 50 },
    type: { type: String, enum: ['video', 'audio', 'chat'], default: 'video' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled', 'no-show'],
      default: 'pending',
    },
    subject: String,
    notes: String,
    meetingLink: String,
    price: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded', 'failed'],
      default: 'pending',
    },
    paymentId: String,
    reminderSent: { type: Boolean, default: false },
    feedback: String,
    rating: { type: Number, min: 1, max: 5 },
    homework: String,
    sessionSummary: String,
    cancelReason: String,
    rescheduledFrom: Date,
  },
  { timestamps: true }
)

AppointmentSchema.index({ studentId: 1, status: 1 })
AppointmentSchema.index({ providerId: 1, date: 1 })
AppointmentSchema.index({ date: 1, status: 1 })

export const Appointment: Model<IAppointment> =
  mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema)
