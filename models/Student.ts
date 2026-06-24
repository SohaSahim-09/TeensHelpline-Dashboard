import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IStudent extends Document {
  userId: mongoose.Types.ObjectId
  rollNumber?: string
  class?: string
  school?: string
  age?: number
  dateOfBirth?: Date
  gender?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  parentName?: string
  parentPhone?: string
  parentEmail?: string
  emergencyContact?: string
  interests: string[]
  careerGoal?: string
  currentMood?: string
  wellnessScore?: number
  totalSessions: number
  completedSessions: number
  streakDays: number
  joinedAt: Date
  bio?: string
  languages: string[]
  achievements: string[]
  createdAt: Date
  updatedAt: Date
}

const StudentSchema = new Schema<IStudent>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    rollNumber: String,
    class: String,
    school: String,
    age: { type: Number, min: 13, max: 19 },
    dateOfBirth: Date,
    gender: { type: String, enum: ['male', 'female', 'non-binary', 'prefer-not-to-say'] },
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    parentName: String,
    parentPhone: String,
    parentEmail: String,
    emergencyContact: String,
    interests: [String],
    careerGoal: String,
    currentMood: String,
    wellnessScore: { type: Number, min: 0, max: 100, default: 75 },
    totalSessions: { type: Number, default: 0 },
    completedSessions: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 },
    joinedAt: { type: Date, default: Date.now },
    bio: String,
    languages: { type: [String], default: ['English'] },
    achievements: [String],
  },
  { timestamps: true }
)

StudentSchema.index({ userId: 1 })

export const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema)
