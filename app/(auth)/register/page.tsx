'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { Eye, EyeOff, Loader2, ArrowRight, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  age: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  terms: z.literal(true, { errorMap: () => ({ message: 'You must accept the terms & privacy policy' }) }),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})
type FormData = z.infer<typeof schema>

const passwordStrength = (p: string) => {
  let score = 0
  if (p.length >= 8) score++
  if (/[A-Z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++
  return score
}

const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500']
const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong']

export default function RegisterPage() {
  const router = useRouter()
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const pwd = watch('password', '')
  const strength = passwordStrength(pwd)

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      await axios.post('/api/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
        age: data.age ? parseInt(data.age) : undefined,
      })
      toast.success('Your secure account has been created! Welcome 🎉')
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Animation variants
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
      className="space-y-6"
    >
      {/* Title */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-3xl font-display font-extrabold text-[#203a2a] tracking-tight leading-tight">
          Create Your Safe Account
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Join Teens Helpline today. It takes less than a minute and is completely free & confidential.
        </p>
      </motion.div>

      {/* Card wrapper */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-3xl border border-[#E5EADF] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Two column grid for Name & Age */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-1.5">
              <label htmlFor="name" className="text-xs font-bold text-[#203a2a] tracking-wide uppercase">
                Full Name
              </label>
              <input
                id="name"
                placeholder="Priya Sharma"
                className={`w-full h-11 px-4 rounded-xl border bg-[#F9FBF7] text-sm outline-none transition-all duration-200 
                  focus:bg-white focus:border-[#203a2a] focus:ring-2 focus:ring-[#203a2a]/10
                  ${errors.name ? 'border-red-400 focus:border-red-400' : 'border-[#E5EADF]'}`}
                {...register('name')}
              />
              {errors.name && (
                <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="age" className="text-xs font-bold text-[#203a2a] tracking-wide uppercase">
                Age
              </label>
              <input
                id="age"
                type="number"
                placeholder="16"
                min="13"
                max="19"
                className="w-full h-11 px-3 rounded-xl border bg-[#F9FBF7] text-sm outline-none transition-all duration-200 focus:bg-white focus:border-[#203a2a] focus:ring-2 focus:ring-[#203a2a]/10 border-[#E5EADF]"
                {...register('age')}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-bold text-[#203a2a] tracking-wide uppercase">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@domain.com"
              className={`w-full h-11 px-4 rounded-xl border bg-[#F9FBF7] text-sm outline-none transition-all duration-200 
                focus:bg-white focus:border-[#203a2a] focus:ring-2 focus:ring-[#203a2a]/10
                ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-[#E5EADF]'}`}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-bold text-[#203a2a] tracking-wide uppercase">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                className={`w-full h-11 pl-4 pr-11 rounded-xl border bg-[#F9FBF7] text-sm outline-none transition-all duration-200 
                  focus:bg-white focus:border-[#203a2a] focus:ring-2 focus:ring-[#203a2a]/10
                  ${errors.password ? 'border-red-400 focus:border-red-400' : 'border-[#E5EADF]'}`}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#203a2a]"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Dynamic Password Strength Indicator */}
            {pwd && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5 mt-2">
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${i < strength ? strengthColors[strength - 1] : 'bg-gray-100'}`} 
                    />
                  ))}
                </div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  Strength: <span className="text-[#203A2A]">{strengthLabels[strength - 1] || 'Weak'}</span>
                </p>
              </motion.div>
            )}
            
            {errors.password && (
              <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className="text-xs font-bold text-[#203a2a] tracking-wide uppercase">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              className={`w-full h-11 px-4 rounded-xl border bg-[#F9FBF7] text-sm outline-none transition-all duration-200 
                focus:bg-white focus:border-[#203a2a] focus:ring-2 focus:ring-[#203a2a]/10
                ${errors.confirmPassword ? 'border-red-400 focus:border-red-400' : 'border-[#E5EADF]'}`}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 font-medium">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Terms checkbox */}
          <div className="space-y-1 pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer group">
              <input
                id="terms"
                type="checkbox"
                className="w-4.5 h-4.5 mt-0.5 rounded border-[#E5EADF] text-[#203a2a] focus:ring-[#203a2a] accent-[#203a2a] cursor-pointer"
                {...register('terms')}
              />
              <span className="text-xs text-gray-500 leading-normal select-none">
                I agree to the <a href="#" className="text-[#203a2a] font-bold hover:text-[#3E5C47] transition-all">Terms of Service</a> and <a href="#" className="text-[#203a2a] font-bold hover:text-[#3E5C47] transition-all">Privacy Policy</a>. I confirm that I am at least 13 years of age.
              </span>
            </label>
            {errors.terms && (
              <p className="text-xs text-red-500 font-medium mt-1">{errors.terms.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#203a2a] text-white rounded-xl text-sm font-semibold tracking-wide shadow-sm hover:bg-[#1C3224] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Create Account 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-gray-150" />
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Or signup with</span>
          <div className="flex-1 h-px bg-gray-150" />
        </div>

        {/* Social signup */}
        <button
          type="button"
          onClick={() => toast.success('Google authentication active in next-auth. Connect client key in .env.local.')}
          className="w-full h-12 bg-white hover:bg-[#F9FBF7] border border-[#E5EADF] rounded-xl text-sm font-bold text-[#203A2A] flex items-center justify-center gap-3 transition-colors active:scale-[0.98]"
        >
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

        {/* Benefits section */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
          {[
            'Free Counselling',
            'AI Buddy 24/7',
            'Confidential & Secure',
            'Expert Mentor Team',
          ].map((b) => (
            <div key={b} className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-[#203A2A] flex-shrink-0" />
              {b}
            </div>
          ))}
        </div>

      </motion.div>

      {/* Link to Login */}
      <motion.p variants={itemVariants} className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link href="/login" className="text-[#203a2a] font-bold hover:underline">
          Sign in
        </Link>
      </motion.p>
    </motion.div>
  )
}
