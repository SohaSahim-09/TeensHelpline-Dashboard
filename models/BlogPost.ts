import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IBlogPost extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  authorAvatar?: string
  coverImage?: string
  readTime: number // minutes
  likes: number
  views: number
  isPublished: boolean
  isFeatured: boolean
  bookmarkedBy: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Mental Health',
        'Career Guidance',
        'Study Tips',
        'Exam Preparation',
        'Stress Management',
        'Bullying',
        'Relationships',
        'Motivation',
        'Time Management',
        'Wellness',
      ],
    },
    tags: [String],
    author: { type: String, required: true },
    authorAvatar: String,
    coverImage: String,
    readTime: { type: Number, default: 5 },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    bookmarkedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

BlogPostSchema.index({ category: 1, isPublished: 1 })
BlogPostSchema.index({ slug: 1 })
BlogPostSchema.index({ isFeatured: 1 })

export const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema)
