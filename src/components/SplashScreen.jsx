import { useState, useEffect } from 'react'
import { weddingData } from '../data/weddingData'

function formatWeddingDate(dateStr) {
  const [year, month, day] = dateStr.split('-')
  return `${day} . ${month} . ${year}`
}

export default function SplashScreen({ onOpen }) {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  function handleOpen() {
    setClosing(true)
    setTimeout(() => {
      onOpen()
    }, 650)
  }

  const { bride, groom } = weddingData.couple
  const date = formatWeddingDate(weddingData.weddingDate)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #ffffff 0%, #fce7f3 50%, #fff0f5 100%)',
        opacity: closing ? 0 : visible ? 1 : 0,
        transition: 'opacity 0.65s ease-in-out',
        pointerEvents: closing ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '2rem 1.5rem',
          maxWidth: '420px',
          width: '100%',
          transform: visible && !closing ? 'translateY(0)' : 'translateY(12px)',
          transition: 'transform 0.7s ease-out, opacity 0.65s ease-in-out',
          opacity: closing ? 0 : visible ? 1 : 0,
        }}
      >
        {/* Top decorative element */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '1.4rem',
              color: '#f9a8d4',
              letterSpacing: '0.4em',
            }}
          >
            ✦ ✦ ✦
          </span>
        </div>

        {/* Kính mời label */}
        <p
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#be185d',
            marginBottom: '1.75rem',
            opacity: 0.75,
          }}
        >
          Trân trọng kính mời
        </p>

        {/* Couple names */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', 'Noto Serif', serif",
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontWeight: 400,
            lineHeight: 1.25,
            color: '#1f2937',
            margin: 0,
            marginBottom: '0.25rem',
            letterSpacing: '0.02em',
          }}
        >
          {groom}
        </h1>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', 'Noto Serif', serif",
            fontSize: 'clamp(1rem, 4vw, 1.25rem)',
            color: '#f472b6',
            margin: 0,
            marginBottom: '0.25rem',
            fontStyle: 'italic',
            letterSpacing: '0.08em',
          }}
        >
          &amp;
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', 'Noto Serif', serif",
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontWeight: 400,
            lineHeight: 1.25,
            color: '#1f2937',
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          {bride}
        </h1>

        {/* Divider */}
        <div
          style={{
            margin: '1.75rem auto',
            height: '1px',
            width: '80px',
            background: 'linear-gradient(to right, transparent, #f9a8d4, transparent)',
          }}
        />

        {/* Wedding date */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', 'Noto Serif', serif",
            fontSize: 'clamp(1rem, 4vw, 1.15rem)',
            color: '#6b7280',
            letterSpacing: '0.18em',
            marginBottom: '2.5rem',
            fontWeight: 300,
          }}
        >
          {date}
        </p>

        {/* CTA Button */}
        <button
          onClick={handleOpen}
          style={{
            display: 'inline-block',
            padding: '0.75rem 2.25rem',
            background: 'transparent',
            border: '1.5px solid #db2777',
            color: '#db2777',
            borderRadius: '999px',
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'background 0.3s ease, color 0.3s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#db2777'
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.transform = 'scale(1.03)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#db2777'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          Mở thiệp cưới
        </button>

        {/* Bottom decorative element */}
        <div style={{ marginTop: '2.5rem', opacity: 0.3 }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.6rem',
              color: '#f9a8d4',
              letterSpacing: '0.5em',
            }}
          >
            ◆ ◆ ◆
          </span>
        </div>
      </div>
    </div>
  )
}
