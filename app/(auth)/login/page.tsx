'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/contexts/AuthContext'
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
})
type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      await login(data.email, data.password, data.remember)
      toast.success('Welcome back to your safe space! 👋')
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  // Animation variants for stagger entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-7"
    >
      {/* Title & Slogan */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-3xl font-display font-extrabold text-[#203a2a] tracking-tight leading-tight">
          Continue Your Growth Journey
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Sign in to access your sessions, connect with expert mentors, and check in with your AI Buddy.
        </p>
      </motion.div>

      {/* Auth Card wrapper */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-3xl border border-[#E5EADF] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email input group */}
          <div className="space-y-1.5 relative group">
            <div className="flex justify-between items-center">
              <label htmlFor="email" className="text-xs font-bold text-[#203a2a] tracking-wide uppercase">
                Email Address
              </label>
            </div>
            <div className="relative">
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="name@domain.com"
                className={`w-full h-12 px-4 rounded-xl border bg-[#F9FBF7] text-sm outline-none transition-all duration-200 
                  focus:bg-white focus:border-[#203a2a] focus:ring-2 focus:ring-[#203a2a]/10
                  ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10' : 'border-[#E5EADF]'}`}
                {...register('email')}
              />
            </div>
            {errors.email && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 font-medium">
                {errors.email.message}
              </motion.p>
            )}
          </div>

          {/* Password input group */}
          <div className="space-y-1.5 relative group">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-xs font-bold text-[#203a2a] tracking-wide uppercase">
                Password
              </label>
              <Link 
                href="/forgot-password" 
                className="text-xs text-[#203a2a] hover:text-[#3E5C47] hover:bg-[#203A2A]/5 px-2 py-0.5 rounded-md font-semibold transition-all duration-200"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••••••"
                className={`w-full h-12 pl-4 pr-12 rounded-xl border bg-[#F9FBF7] text-sm outline-none transition-all duration-200 
                  focus:bg-white focus:border-[#203a2a] focus:ring-2 focus:ring-[#203a2a]/10
                  ${errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10' : 'border-[#E5EADF]'}`}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#203a2a] transition-colors"
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 font-medium">
                {errors.password.message}
              </motion.p>
            )}
          </div>

          {/* Remember me & Helper */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input 
                id="remember" 
                type="checkbox" 
                className="w-4.5 h-4.5 rounded border-[#E5EADF] text-[#203a2a] focus:ring-[#203a2a] accent-[#203a2a] cursor-pointer" 
                {...register('remember')} 
              />
              <span className="text-xs text-gray-500 group-hover:text-[#203a2a] transition-colors select-none font-medium">
                Keep me signed in
              </span>
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#203a2a] text-white rounded-xl text-sm font-semibold tracking-wide shadow-sm hover:bg-[#1C3224] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Sign In to Portal 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-gray-150" />
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Or continue with</span>
          <div className="flex-1 h-px bg-gray-150" />
        </div>

        {/* Social logins */}
        <button
          type="button"
          onClick={() => toast.success('Google integration is ready! Add OAuth credentials in next-auth configure.')}
          className="w-full h-12 bg-white hover:bg-[#F9FBF7] border border-[#E5EADF] rounded-xl text-sm font-bold text-[#203A2A] flex items-center justify-center gap-3 transition-colors active:scale-[0.98]"
        >
          {/* Custom Google Icon */}
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.67 0 3.2.58 4.38 1.69l3.27-3.27C17.67 1.48 14.98 1 12 1 7.35 1 3.37 3.68 1.41 7.59l3.87 3C6.2 7.74 8.89 5.04 12 5.04z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.81-.07-1.59-.2-2.27H12v4.51h6.45c-.29 1.48-1.14 2.73-2.4 3.58l3.72 2.88c2.18-2 3.72-5 3.72-8.7z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.71a7.17 7.17 0 0 1 0-4.42l-3.87-3a11.96 11.96 0 0 0 0 10.42l3.87-3z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.72-2.88c-1.05.7-2.39 1.13-3.9 1.13-3.11 0-5.8-2.7-6.72-6.55l-3.87 3A11.96 11.96 0 0 0 12 23z"
            />
          </svg>
          Google
        </button>

        {/* Demo Quick Logins */}
        <div className="bg-[#EEF5E8] border border-[#DDE8C8] rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-[#203a2a] uppercase tracking-wider">🎯 Rapid Testing Accounts</p>
            <span className="text-[9px] bg-[#203a2a] text-white px-1.5 py-0.5 rounded font-bold">SEED DATA</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Student Access', email: 'student@demo.com' },
              { label: 'Admin Terminal', email: 'admin@demo.com' },
            ].map((d) => (
              <button
                key={d.label}
                type="button"
                onClick={() => {
                  setIsLoading(true)
                  login(d.email, 'demo1234')
                    .then(() => {
                      toast.success(`Logged in as ${d.label} (Demo) ⚡`)
                      router.push('/dashboard')
                    })
                    .catch(() => {
                      toast.error('Demo login offline — Please seed database first')
                    })
                    .finally(() => setIsLoading(false))
                }}
                className="text-xs text-[#203a2a] bg-white border border-[#E5EADF] hover:bg-[#EEF5E8]/40 rounded-xl py-2 px-1 transition-all font-semibold shadow-sm"
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Link to Register */}
      <motion.p variants={itemVariants} className="text-center text-sm text-gray-500">
        New to Teens Helpline?{' '}
        <Link href="/register" className="text-[#203a2a] font-bold hover:underline">
          Create an account free
        </Link>
      </motion.p>
    </motion.div>
  )
}
