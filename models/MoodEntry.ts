import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IMoodEntry extends Document {
  studentId: mongoose.Types.ObjectId
  mood: 'happy' | 'excited' | 'calm' | 'confused' | 'stressed' | 'anxious' | 'sad' | 'angry' | 'lonely'
  intensity: number // 1-10
  note?: string
  triggers: string[]
  activities: string[]
  date: Date
  createdAt: Date
}

const MoodEntrySchema = new Schema<IMoodEntry>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mood: {
      type: String,
      enum: ['happy', 'excited', 'calm', 'confused', 'stressed', 'anxious', 'sad', 'angry', 'lonely'],
      required: true,
    },
    intensity: { type: Number, min: 1, max: 10, default: 5 },
    note: String,
    triggers: [String],
    activities: [String],
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

MoodEntrySchema.index({ studentId: 1, date: -1 })

export const MoodEntry: Model<IMoodEntry> =
  mongoose.models.MoodEntry || mongoose.model<IMoodEntry>('MoodEntry', MoodEntrySchema)
