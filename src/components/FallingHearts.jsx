import { useEffect, useRef } from 'react'

const HEART_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`

const hearts = [
  { left: 8,  delay: 0,    duration: 16, size: 10, opacity: 0.50, drift: 18 },
  { left: 22, delay: 1.5,  duration: 20, size: 12, opacity: 0.55, drift: -14 },
  { left: 38, delay: 0.8,  duration: 18, size: 8,  opacity: 0.45, drift: 16 },
  { left: 55, delay: 2.5,  duration: 22, size: 11, opacity: 0.50, drift: -18 },
  { left: 68, delay: 1.2,  duration: 17, size: 9,  opacity: 0.48, drift: 12 },
  { left: 82, delay: 3.0,  duration: 21, size: 13, opacity: 0.45, drift: -12 },
  { left: 47, delay: 2.0,  duration: 19, size: 7,  opacity: 0.42, drift: 10 },
]

export default function FallingHearts() {
  const styleRef = useRef(null)

  useEffect(() => {
    if (styleRef.current) return
    const style = document.createElement('style')
    style.id = 'falling-hearts-keyframes'
    style.textContent = `
      @keyframes heartFall {
        0%   { transform: translateY(-60px) translateX(0) rotate(-10deg); opacity: 0; }
        8%   { opacity: 1; }
        90%  { opacity: 1; }
        100% { transform: translateY(105vh) translateX(var(--drift)) rotate(10deg); opacity: 0; }
      }
    `
    document.head.appendChild(style)
    styleRef.current = style
    return () => {
      if (style.parentNode) style.parentNode.removeChild(style)
      styleRef.current = null
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
        overflow: 'hidden',
        contain: 'strict',
      }}
    >
      {hearts.map((h, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '-40px',
            left: `${h.left}%`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            '--drift': `${h.drift}px`,
            animation: `heartFall ${h.duration}s ${h.delay}s ease-in-out infinite`,
            contain: 'layout style',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: '100%',
              height: '100%',
              fill: '#f9a8d4',
              opacity: h.opacity,
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  )
}
