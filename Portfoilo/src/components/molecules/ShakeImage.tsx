import { useState } from 'react'

interface ShakeImageProps {
  children: React.ReactNode
  className?: string
}

export default function ShakeImage({ children, className = '' }: ShakeImageProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <style>{`
        @keyframes shake {
          0%   { transform: rotate(0deg); }
          25%  { transform: rotate(-2.5deg); }
          75%  { transform: rotate(2.5deg); }
          100% { transform: rotate(0deg); }
        }
        .shake-animation {
          animation: shake 1.6s ease-in-out infinite;
          animation-play-state: paused;
          transform-origin: top center;
        }
        .shake-animation.playing {
          animation-play-state: running;
        }
      `}</style>
      <div
        className={`w-full h-full shake-animation ${hovered ? 'playing' : ''} ${className}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </div>
    </>
  )
}
