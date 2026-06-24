import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICounsellor extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  specializations: string[]
  experience: number
  languages: string[]
  rating: number
  totalReviews: number
  totalSessions: number
  bio: string
  education: string[]
  certifications: string[]
  pricePerSession: number
  sessionDuration: number // minutes
  availability: {
    day: string
    slots: string[]
  }[]
  gender: string
  location: string
  isApproved: boolean
  isAvailable: boolean
  photo: string
  videoIntroUrl?: string
  approaches: string[]
  ageGroups: string[]
  createdAt: Date
  updatedAt: Date
}

const CounsellorSchema = new Schema<ICounsellor>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    title: { type: String, default: 'Counsellor' },
    specializations: { type: [String], required: true },
    experience: { type: Number, required: true, min: 0 },
    languages: { type: [String], default: ['English'] },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    totalSessions: { type: Number, default: 0 },
    bio: { type: String, required: true },
    education: [String],
    certifications: [String],
    pricePerSession: { type: Number, required: true, default: 500 },
    sessionDuration: { type: Number, default: 50 },
    availability: [
      {
        day: String,
        slots: [String],
      },
    ],
    gender: { type: String, enum: ['male', 'female', 'non-binary'] },
    location: String,
    isApproved: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    photo: { type: String, default: '' },
    videoIntroUrl: String,
    approaches: [String],
    ageGroups: { type: [String], default: ['13-19'] },
  },
  { timestamps: true }
)

CounsellorSchema.index({ rating: -1, isApproved: 1 })
CounsellorSchema.index({ specializations: 1 })

export const Counsellor: Model<ICounsellor> =
  mongoose.models.Counsellor || mongoose.model<ICounsellor>('Counsellor', CounsellorSchema)
