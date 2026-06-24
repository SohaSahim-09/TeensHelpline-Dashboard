import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IJournalEntry extends Document {
  studentId: mongoose.Types.ObjectId
  title: string
  content: string // Rich text HTML
  mood?: string
  tags: string[]
  isPrivate: boolean
  wordCount: number
  createdAt: Date
  updatedAt: Date
}

const JournalEntrySchema = new Schema<IJournalEntry>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    mood: String,
    tags: [String],
    isPrivate: { type: Boolean, default: true },
    wordCount: { type: Number, default: 0 },
  },
  { timestamps: true }
)

JournalEntrySchema.index({ studentId: 1, createdAt: -1 })
JournalEntrySchema.index({ studentId: 1, tags: 1 })

export const JournalEntry: Model<IJournalEntry> =
  mongoose.models.JournalEntry || mongoose.model<IJournalEntry>('JournalEntry', JournalEntrySchema)
