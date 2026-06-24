'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AIBuddyProvider } from '@/components/ai-buddy/AIBuddyProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AIBuddyProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#FFFFFF',
                color: '#2D2D2D',
                border: '1px solid #E8E8E3',
                borderRadius: '14px',
                boxShadow: '0 8px 32px rgba(32,58,42,0.12)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
              },
              success: {
                iconTheme: { primary: '#203A2A', secondary: '#CFE78A' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#fee2e2' },
              },
            }}
          />
        </AIBuddyProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
