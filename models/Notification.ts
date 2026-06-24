import mongoose, { Schema, Document, Model } from 'mongoose'

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  message: string
  type: 'booking' | 'session' | 'payment' | 'message' | 'blog' | 'assignment' | 'system' | 'reminder'
  isRead: boolean
  actionUrl?: string
  icon?: string
  createdAt: Date
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['booking', 'session', 'payment', 'message', 'blog', 'assignment', 'system', 'reminder'],
      default: 'system',
    },
    isRead: { type: Boolean, default: false },
    actionUrl: String,
    icon: String,
  },
  { timestamps: true }
)

NotificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 })

export const Notification: Model<INotification> =
  mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema)
