import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICommunityPost extends Document {
  authorId: mongoose.Types.ObjectId
  authorName: string
  authorAvatar?: string
  isAnonymous: boolean
  title: string
  content: string
  topic: string
  tags: string[]
  likes: mongoose.Types.ObjectId[]
  comments: {
    authorId: mongoose.Types.ObjectId
    authorName: string
    isAnonymous: boolean
    content: string
    createdAt: Date
  }[]
  shares: number
  isApproved: boolean
  isReported: boolean
  reportCount: number
  isPinned: boolean
  createdAt: Date
  updatedAt: Date
}

const CommunityPostSchema = new Schema<ICommunityPost>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    authorAvatar: String,
    isAnonymous: { type: Boolean, default: false },
    title: { type: String, required: true },
    content: { type: String, required: true },
    topic: String,
    tags: [String],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [
      {
        authorId: { type: Schema.Types.ObjectId, ref: 'User' },
        authorName: String,
        isAnonymous: { type: Boolean, default: false },
        content: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    shares: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: true },
    isReported: { type: Boolean, default: false },
    reportCount: { type: Number, default: 0 },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
)

CommunityPostSchema.index({ topic: 1, createdAt: -1 })
CommunityPostSchema.index({ isApproved: 1, isPinned: -1 })

export const CommunityPost: Model<ICommunityPost> =
  mongoose.models.CommunityPost ||
  mongoose.model<ICommunityPost>('CommunityPost', CommunityPostSchema)
