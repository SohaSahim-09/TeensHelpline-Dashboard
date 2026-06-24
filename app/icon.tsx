import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  const darkGreen = '#1c3224'
  const limeGreen = '#cfe78a'

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: darkGreen,
          borderRadius: '8px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Monitor Neck/Stand */}
        <div
          style={{
            position: 'absolute',
            bottom: '7px',
            left: '14px',
            width: '4px',
            height: '3px',
            background: '#a0b5a0',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '5px',
            left: '11px',
            width: '10px',
            height: '2px',
            background: '#a0b5a0',
            borderRadius: '1px',
          }}
        />

        {/* Screen */}
        <div
          style={{
            position: 'absolute',
            top: '5px',
            left: '5px',
            width: '22px',
            height: '15px',
            background: limeGreen,
            borderRadius: '3px',
          }}
        />
        
        {/* Tail (Speech Bubble tail using custom shapes) */}
        <div
          style={{
            position: 'absolute',
            top: '19px',
            left: '10px',
            width: '0',
            height: '0',
            borderStyle: 'solid',
            borderWidth: '4px 5px 0 0',
            borderColor: `${limeGreen} transparent transparent transparent`,
          }}
        />

        {/* Heart icon centered on the screen */}
        <div
          style={{
            position: 'absolute',
            top: '8.5px',
            left: '12.5px',
            width: '7px',
            height: '7px',
            display: 'flex',
          }}
        >
          <svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <path
              d="M4 8 C4 8 0.5 5.5 0.5 3.3 C0.5 1.6 1.8 0.3 3.2 0.3 C3.8 0.3 4 0.8 4 0.8 C4 0.8 4.2 0.3 4.8 0.3 C6.2 0.3 7.5 1.6 7.5 3.3 C7.5 5.5 4 8 4 8 Z"
              fill={darkGreen}
            />
          </svg>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
