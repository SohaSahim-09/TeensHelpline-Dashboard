import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Student Dashboard | Teens Helpline',
    template: '%s | Teens Helpline',
  },
  description:
    'Your personal space for counselling, career guidance, tutoring, mood tracking, and growth. Teens Helpline — Supporting every teenager\'s journey.',
  keywords: [
    'teens helpline',
    'student dashboard',
    'teen counselling',
    'career guidance',
    'mental health',
    'tutoring',
    'mood tracker',
  ],
  authors: [{ name: 'Teens Helpline' }],
  openGraph: {
    title: 'Student Dashboard | Teens Helpline',
    description: 'Your safe space for growth and guidance.',
    type: 'website',
  },
  robots: { index: false, follow: false }, // dashboard is private
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
