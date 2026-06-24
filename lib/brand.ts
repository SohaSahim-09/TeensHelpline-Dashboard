// Teens Helpline Brand Tokens
// Shared across dashboard and any embedded widgets

export const BRAND = {
  name: 'Teens Helpline',
  tagline: 'Your Safe Space for Growth & Guidance',
  websiteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://teens-helpline-rho.vercel.app/',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  colors: {
    primary: '#203A2A',
    dark: '#182A1F',
    sage: '#DDE8C8',
    lime: '#CFE78A',
    bg: '#F7F7F3',
    border: '#E8E8E3',
    text: '#2D2D2D',
    muted: '#6B6B6B',
    white: '#FFFFFF',
  },

  fonts: {
    sans: 'Inter, system-ui, sans-serif',
    display: 'Outfit, system-ui, sans-serif',
  },

  // Logo paths (local + remote fallback)
  logo: {
    full: '/logo-full.svg',
    icon: '/logo-icon.svg',
    alt: 'Teens Helpline',
  },

  // Social links (update to real URLs)
  social: {
    instagram: 'https://instagram.com/teenshelpline',
    twitter: 'https://twitter.com/teenshelpline',
    youtube: 'https://youtube.com/@teenshelpline',
    linkedin: 'https://linkedin.com/company/teenshelpline',
  },

  // Emergency
  emergency: {
    phone: '1800-XXX-XXXX',
    whatsapp: '+91-XXXXXXXXXX',
    email: 'help@teenshelpline.com',
  },
} as const

export type BrandColors = typeof BRAND.colors
