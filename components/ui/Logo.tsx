'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  iconSize?: number // e.g. 32, 36, 40, 44, 48, 56, 64
  iconClassName?: string
  textClassName?: string
  showText?: boolean
  light?: boolean // if true, text is white, but icon remains same or adjusted
}

export function Logo({
  className = '',
  iconSize = 36,
  iconClassName = '',
  textClassName = '',
  showText = true,
  light = false,
}: LogoProps) {
  // Brand color definitions from attached image
  // Icon bg: #1c3224 (dark green)
  // Screen: #cfe78a (lime green)
  // Heart/Teens Text: #1c3224 (dark green) or #ffffff for light mode text
  // Helpline Text: #4a7c59 (sage green) or #cfe78a for light mode text
  
  const darkGreen = '#1c3224'
  const limeGreen = '#cfe78a'
  const textHelplineColor = '#4a7c59'

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Official Teens Helpline SVG Logo Icon */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("flex-shrink-0", iconClassName)}
      >
        {/* Dark Green Rounded Container */}
        <rect width="32" height="32" rx="9" fill={darkGreen} />
        
        {/* Monitor Neck/Stand */}
        <rect x="14" y="21" width="4" height="3" fill="#a0b5a0" />
        <path d="M11 24 H21 L20 26 H12 Z" fill="#a0b5a0" />
        
        {/* Lime Monitor Screen (with talk bubble tail) */}
        <rect x="5" y="5" width="22" height="15" rx="3" fill={limeGreen} />
        {/* Chat bubble tail */}
        <path d="M12 19 L10 23 L15 19 Z" fill={limeGreen} />
        
        {/* Forest Green Heart inside Monitor */}
        <path
          d="M16 16.2 C16 16.2 12.5 13.7 12.5 11.5 C12.5 9.8 13.8 8.5 15.2 8.5 C15.8 8.5 16 9.0 16 9.0 C16 9.0 16.2 8.5 16.8 8.5 C18.2 8.5 19.5 9.8 19.5 11.5 C19.5 13.7 16 16.2 16 16.2 Z"
          fill={darkGreen}
        />
      </svg>

      {showText && (
        <div className={cn("font-display flex items-baseline tracking-tight", textClassName)}>
          <span 
            className="font-extrabold text-[17px] md:text-[19px] leading-none"
            style={{ color: light ? '#ffffff' : darkGreen }}
          >
            Teens
          </span>
          <span 
            className="font-bold text-[17px] md:text-[19px] leading-none"
            style={{ color: light ? limeGreen : textHelplineColor }}
          >
            Helpline
          </span>
        </div>
      )}
    </div>
  )
}
