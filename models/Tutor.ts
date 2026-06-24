import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ITutor extends Document {
  userId: mongoose.Types.ObjectId
  subjects: string[]
  experience: number
  rating: number
  totalReviews: number
  totalSessions: number
  bio: string
  education: string[]
  pricePerSession: number
  sessionDuration: number
  availability: { day: string; slots: string[] }[]
  gender: string
  languages: string[]
  teachingStyle: string
  isApproved: boolean
  isAvailable: boolean
  photo: string
  boardsSupported: string[]
  classLevels: string[]
  createdAt: Date
  updatedAt: Date
}

const TutorSchema = new Schema<ITutor>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    subjects: { type: [String], required: true },
    experience: { type: Number, min: 0, default: 1 },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    totalSessions: { type: Number, default: 0 },
    bio: { type: String, required: true },
    education: [String],
    pricePerSession: { type: Number, default: 300 },
    sessionDuration: { type: Number, default: 60 },
    availability: [{ day: String, slots: [String] }],
    gender: String,
    languages: { type: [String], default: ['English'] },
    teachingStyle: String,
    isApproved: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    photo: { type: String, default: '' },
    boardsSupported: { type: [String], default: ['CBSE', 'ICSE'] },
    classLevels: { type: [String], default: ['Class 9', 'Class 10', 'Class 11', 'Class 12'] },
  },
  { timestamps: true }
)

export const Tutor: Model<ITutor> =
  mongoose.models.Tutor || mongoose.model<ITutor>('Tutor', TutorSchema)
