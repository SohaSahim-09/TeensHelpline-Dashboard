'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'

interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'counsellor' | 'tutor' | 'admin'
  avatar?: string
  isVerified: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string, remember?: boolean) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

const DISABLE_AUTH_FOR_DEV = true

const mockUser: User = {
  id: 'dev-demo-student-id',
  name: 'Dev Student',
  email: 'student@demo.com',
  role: 'student',
  isVerified: true
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(DISABLE_AUTH_FOR_DEV ? mockUser : null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    if (DISABLE_AUTH_FOR_DEV) {
      setUser(mockUser)
      setIsLoading(false)
      return
    }
    try {
      const res = await axios.get('/api/auth/me')
      setUser(res.data.user)
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const login = async (email: string, password: string, remember = false) => {
    if (DISABLE_AUTH_FOR_DEV) {
      setUser(mockUser)
      return
    }
    const res = await axios.post('/api/auth/login', { email, password, remember })
    setUser(res.data.user)
  }

  const logout = async () => {
    if (DISABLE_AUTH_FOR_DEV) {
      setUser(null)
      return
    }
    await axios.post('/api/auth/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
