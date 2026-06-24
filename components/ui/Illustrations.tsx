'use client'

import React from 'react'

// Common flat styling constants
const colors = {
  skin1: '#F4C8C2',
  skin2: '#E8A598',
  hair: '#1B2C24',
  primary: '#203A2A',
  sage: '#DDE8C8',
  lime: '#CFE78A',
  mint: '#E2F0D9',
  cream: '#FCFCF9',
  white: '#FFFFFF',
}

// 1. Welcome Banner: Two teenagers studying/interacting
export function TeenStudyIllustration({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 200 150" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Background soft circle */}
      <circle cx="100" cy="75" r="55" fill={colors.sage} opacity="0.4" />
      
      {/* Character 1 (Left, green top, looking right) */}
      {/* Body */}
      <path d="M45 130 C45 105 75 105 75 130 Z" fill={colors.primary} />
      {/* Neck */}
      <rect x="57" y="93" width="6" height="10" fill={colors.skin1} rx="2" />
      {/* Head */}
      <circle cx="60" cy="85" r="13" fill={colors.skin1} />
      {/* Hair */}
      <path d="M47 80 C47 70 73 70 73 80 C73 74 65 72 60 75 C55 72 47 74 47 80 Z" fill={colors.hair} />
      {/* Face details (eyes, smile) */}
      <circle cx="56" cy="85" r="1.5" fill={colors.hair} />
      <circle cx="64" cy="85" r="1.5" fill={colors.hair} />
      <path d="M57 90 Q60 93 63 90" stroke={colors.hair} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      
      {/* Character 2 (Right, sage top, looking left) */}
      {/* Body */}
      <path d="M125 130 C125 108 155 108 155 130 Z" fill="#608266" />
      {/* Neck */}
      <rect x="137" y="93" width="6" height="10" fill={colors.skin2} rx="2" />
      {/* Head */}
      <circle cx="140" cy="85" r="13" fill={colors.skin2} />
      {/* Hair */}
      <path d="M127 82 C127 72 153 72 153 82 C153 75 145 74 140 76 C135 74 127 75 127 82 Z" fill={colors.hair} />
      {/* Face details */}
      <circle cx="136" cy="85" r="1.5" fill={colors.hair} />
      <circle cx="144" cy="85" r="1.5" fill={colors.hair} />
      <path d="M137 90 Q140 93 143 90" stroke={colors.hair} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      
      {/* Laptop between them */}
      <rect x="85" y="112" width="30" height="16" rx="2" fill={colors.hair} />
      <rect x="88" y="115" width="24" height="11" rx="1" fill={colors.lime} />
      <path d="M80 128 H120 V131 H80 Z" fill={colors.primary} />
      
      {/* Floating leaves/sparkles */}
      <path d="M30 50 Q35 40 45 45 Q40 55 30 50 Z" fill={colors.lime} />
      <path d="M170 50 Q165 40 155 45 Q160 55 170 50 Z" fill={colors.sage} />
      <circle cx="100" cy="25" r="2.5" fill={colors.lime} />
      <circle cx="95" cy="27" r="1.5" fill={colors.sage} />
    </svg>
  )
}

// 2. Counselling / Help: Friend supporting friend / shield
export function CounsellingIllustration({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <circle cx="50" cy="50" r="38" fill={colors.sage} opacity="0.3" />
      {/* Shield outline */}
      <path d="M50 20 C62 20 68 28 68 45 C68 62 50 78 50 78 C50 78 32 62 32 45 C32 28 38 20 50 20 Z" fill={colors.lime} opacity="0.5" />
      {/* Heart */}
      <path d="M50 48 C50 48 44 43 44 39.5 C44 37 46 35 48.5 35 C49.5 35 50 36 50 36 C50 36 50.5 35 51.5 35 C54 35 56 37 56 39.5 C56 43 50 48 50 48 Z" fill={colors.primary} />
      {/* Two simplified mini heads standing */}
      <circle cx="38" cy="62" r="7" fill={colors.skin1} />
      <circle cx="62" cy="62" r="7" fill={colors.skin2} />
      <path d="M35 60 Q38 62 41 60" stroke={colors.hair} strokeWidth="1" fill="none" />
      <path d="M59 60 Q62 62 65 60" stroke={colors.hair} strokeWidth="1" fill="none" />
    </svg>
  )
}

// 3. Career Path: Pathway and chart
export function CareerIllustration({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <circle cx="50" cy="50" r="38" fill={colors.sage} opacity="0.3" />
      {/* Pathway arrow */}
      <path d="M25 75 L45 55 L58 65 L80 40" stroke={colors.primary} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M80 40 H70 M80 40 V50" stroke={colors.primary} strokeWidth="3" strokeLinecap="round" />
      {/* Simplified target */}
      <circle cx="50" cy="30" r="10" fill={colors.lime} opacity="0.6" />
      <circle cx="50" cy="30" r="4" fill={colors.primary} />
      {/* Sparkles */}
      <circle cx="75" cy="25" r="2" fill={colors.primary} />
    </svg>
  )
}

// 4. Wellness: Meditating teenager in glowing bubble
export function WellnessIllustration({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <circle cx="50" cy="50" r="38" fill={colors.sage} opacity="0.3" />
      <circle cx="50" cy="50" r="30" stroke={colors.primary} strokeWidth="1" strokeDasharray="4 4" />
      {/* Meditating body */}
      <path d="M35 72 C35 58 65 58 65 72 Z" fill={colors.primary} />
      {/* Head */}
      <circle cx="50" cy="46" r="8.5" fill={colors.skin1} />
      {/* Hair */}
      <path d="M41 43 C41 36 59 36 59 43 C59 39 50 38 50 40 C50 38 41 39 41 43 Z" fill={colors.hair} />
      {/* Closed eyes, smile */}
      <path d="M47 46 Q48 47 49 46" stroke={colors.hair} strokeWidth="0.8" fill="none" />
      <path d="M51 46 Q52 47 53 46" stroke={colors.hair} strokeWidth="0.8" fill="none" />
      <path d="M48 50 Q50 51.5 52 50" stroke={colors.hair} strokeWidth="0.8" fill="none" />
      {/* Floating leaves */}
      <path d="M22 35 Q26 28 32 30 Q28 37 22 35 Z" fill={colors.lime} />
      <path d="M78 35 Q74 28 68 30 Q72 37 78 35 Z" fill={colors.lime} />
    </svg>
  )
}

// 5. Book: Stack of green/cream books
export function BookIllustration({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Book 1 */}
      <rect x="25" y="55" width="50" height="15" rx="3" fill={colors.primary} />
      <rect x="29" y="58" width="46" height="9" fill={colors.white} rx="1" />
      {/* Book 2 */}
      <rect x="30" y="38" width="44" height="15" rx="3" fill={colors.lime} />
      <rect x="33" y="41" width="40" height="9" fill={colors.primary} rx="1" />
      {/* Bookmark */}
      <path d="M40 38 V50 L43 47 L46 50 V38 Z" fill={colors.sage} />
    </svg>
  )
}

// 6. Graduation: Cap & bag
export function GraduationIllustration({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Cap Diamond */}
      <path d="M50 20 L80 32 L50 44 L20 32 Z" fill={colors.primary} />
      {/* Cap bottom */}
      <path d="M35 38 V48 C35 52 65 52 65 48 V38" fill={colors.primary} />
      {/* Tassel */}
      <path d="M50 32 L26 43 V53" stroke={colors.lime} strokeWidth="2" strokeLinecap="round" />
      <rect x="23" y="53" width="6" height="8" fill={colors.lime} rx="1" />
    </svg>
  )
}

// 7. Empty State: Teen studying
export function EmptyStateIllustration({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <circle cx="60" cy="60" r="45" fill={colors.sage} opacity="0.3" />
      {/* Table desk */}
      <rect x="25" y="85" width="70" height="5" rx="1.5" fill={colors.primary} />
      {/* Simplified teen sitting */}
      <path d="M45 85 C45 68 75 68 75 85 Z" fill={colors.primary} />
      <rect x="57" y="58" width="6" height="8" fill={colors.skin1} />
      <circle cx="60" cy="51" r="10" fill={colors.skin1} />
      <path d="M50 47 C50 39 70 39 70 47 Z" fill={colors.hair} />
      {/* Closed eyes reading */}
      <path d="M56 50 Q57 51 58 50" stroke={colors.hair} strokeWidth="0.8" fill="none" />
      <path d="M62 50 Q63 51 64 50" stroke={colors.hair} strokeWidth="0.8" fill="none" />
      <path d="M58 56 Q60 57.5 62 56" stroke={colors.hair} strokeWidth="0.8" fill="none" />
      
      {/* Book open on table */}
      <path d="M48 83 L58 78 L60 83 M60 83 L62 78 L72 83" stroke={colors.lime} strokeWidth="3" strokeLinecap="round" />
      {/* Floating sparkles */}
      <circle cx="85" cy="40" r="2.5" fill={colors.lime} />
      <circle cx="35" cy="40" r="1.5" fill={colors.primary} />
    </svg>
  )
}
