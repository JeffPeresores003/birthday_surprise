import { useState, useRef, useCallback } from 'react'
import { HER_NAME, HER_NICKNAME, MY_NAME } from '../constants'
import PetalField from '../components/PetalField'
import PhotoBook from '../components/PhotoBook'
import VideoReels from '../components/VideoReels'
import CakeCandle from '../components/CakeCandle'
import EnvelopeLetter from '../components/EnvelopeLetter'
import WishInput from '../components/WishInput'
import Ornament from '../components/Ornament'
import FloatingHeart, { type Heart } from '../components/FloatingHeart'
import { PETAL_COLORS } from '../constants'

/**
 * Hero Photo Frame Component for photo /photos/12.png
 */
function HeroPhotoFrame() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const frameRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)

  const handleTap = useCallback(() => {
    const rect = frameRef.current?.getBoundingClientRect()
    const cx = rect ? rect.width / 2 : 90
    const newHearts: Heart[] = Array.from({ length: 8 }, (_, i) => ({
      id: ++idRef.current,
      x: cx + (Math.random() - 0.5) * 80,
      y: 20 + Math.random() * 60,
      size: 18 + Math.random() * 16,
      hue: PETAL_COLORS[i % PETAL_COLORS.length],
    }))
    setHearts(h => [...h, ...newHearts])
  }, [])

  return (
    <div
      ref={frameRef}
      onClick={handleTap}
      style={{
        position: 'relative',
        width: 190,
        margin: '24px auto 20px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {/* Arched photo frame */}
      <div
        style={{
          width: 180,
          height: 210,
          margin: '0 auto',
          borderRadius: '90px 90px 24px 24px',
          border: '3px solid #cda86a',
          overflow: 'hidden',
          boxShadow: '0 12px 36px rgba(0,0,0,0.6), 0 0 30px rgba(205,168,106,0.35)',
          background: '#3d1723',
          position: 'relative',
        }}
      >
        <img
          src="/photos/12.png"
          alt={HER_NAME}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Gold top ornament ring */}
      <div
        style={{
          position: 'absolute',
          top: -6,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 14,
          height: 14,
          borderRadius: '50%',
          border: '2px solid #cda86a',
          backgroundColor: '#2a0f16',
        }}
      />

      {/* Floating hearts on tap */}
      {hearts.map(h => (
        <FloatingHeart
          key={h.id}
          heart={h}
          onDone={() => setHearts(prev => prev.filter(x => x.id !== h.id))}
        />
      ))}
    </div>
  )
}

/**
 * BirthdayPage — main page celebrating Jaiiii (lablab).
 */
export default function BirthdayPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(170deg, #2a0f16 0%, #3d1723 40%, #2a0f16 100%)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Ambient falling petals */}
      <PetalField />

      {/* Subtle center radial glow */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background:
            'radial-gradient(ellipse 70% 50% at 50% 30%, #5a1f3033 0%, transparent 70%)',
        }}
      />

      {/* ── Scrollable content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 480,
          margin: '0 auto',
          padding: '60px 24px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}
      >

        {/* ── SECTION 1: HERO ── */}
        <section style={{ width: '100%', textAlign: 'center', marginBottom: 52 }}>
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 'clamp(36px, 8vw, 52px)',
              color: '#e6cfa0',
              margin: 0,
              lineHeight: 1.15,
              textShadow: '0 2px 24px #cda86a44',
              letterSpacing: '-0.5px',
            }}
          >
            Happy Birthday
          </h1>

          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(28px, 6vw, 38px)',
              color: '#e6a5ac',
              margin: '4px 0 0',
              letterSpacing: 2,
            }}
          >
            {HER_NAME}
          </h2>

          <p
            style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: 300,
              color: '#f5ecdf',
              opacity: 0.55,
              fontSize: 14,
              marginTop: 4,
              letterSpacing: 3,
              fontStyle: 'italic',
            }}
          >
            ({HER_NICKNAME})
          </p>

          {/* Picture of Her (/photos/12.png) */}
          <HeroPhotoFrame />

          <p
            style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: 300,
              color: '#f5ecdf',
              opacity: 0.75,
              fontSize: 15,
              letterSpacing: 0.5,
              lineHeight: 1.65,
              maxWidth: 320,
              margin: '16px auto 0',
            }}
          >
            On this day the world became a little more beautiful — the day you were born.
          </p>

          {/* Gold accent line */}
          <div
            style={{
              width: 60,
              height: 1.5,
              background:
                'linear-gradient(to right, transparent, #cda86a, transparent)',
              margin: '24px auto 0',
            }}
          />
        </section>

        <Ornament />

        {/* ── SECTION 2: HER PHOTO BOOK ── */}
        <section style={{ width: '100%', textAlign: 'center', margin: '48px 0' }}>
          <h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              color: '#e6cfa0',
              fontSize: 22,
              fontWeight: 400,
              marginBottom: 28,
              letterSpacing: 0.5,
            }}
          >
            Her Photo Book
          </h3>
          <PhotoBook />
        </section>

        <Ornament />

        {/* ── SECTION 3: VIDEO REELS OF JAIIII ── */}
        <section style={{ width: '100%', textAlign: 'center', margin: '48px 0' }}>
          <h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              color: '#e6cfa0',
              fontSize: 22,
              fontWeight: 400,
              marginBottom: 8,
              letterSpacing: 0.5,
            }}
          >
            Video Reels of Jaiiii
          </h3>
          <p
            style={{
              color: '#cda86aaa',
              fontSize: 12,
              fontFamily: 'Lato, sans-serif',
              marginBottom: 24,
              letterSpacing: 0.5,
            }}
          >
            Scroll through video memories celebrating her
          </p>
          <VideoReels />
        </section>

        <Ornament />

        {/* ── SECTION 4: CAKE & CANDLE ── */}
        <section style={{ width: '100%', textAlign: 'center', margin: '48px 0' }}>
          <h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              color: '#e6cfa0',
              fontSize: 22,
              fontWeight: 400,
              marginBottom: 28,
              letterSpacing: 0.5,
            }}
          >
            Make a wish before you blow...
          </h3>
          <CakeCandle />
        </section>

        <Ornament />

        {/* ── SECTION 5: ENVELOPE & LETTER ── */}
        <section style={{ width: '100%', textAlign: 'center', margin: '48px 0' }}>
          <h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              color: '#e6cfa0',
              fontSize: 22,
              fontWeight: 400,
              marginBottom: 28,
              letterSpacing: 0.5,
            }}
          >
            A letter written for you
          </h3>
          <EnvelopeLetter />
        </section>

        <Ornament />

        {/* ── SECTION 6: WISH INPUT ── */}
        <section style={{ width: '100%', textAlign: 'center', margin: '48px 0' }}>
          <h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              color: '#e6cfa0',
              fontSize: 22,
              fontWeight: 400,
              marginBottom: 8,
              letterSpacing: 0.5,
            }}
          >
            What do you wish for?
          </h3>
          <WishInput />
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ marginTop: 60, textAlign: 'center', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 16,
              marginBottom: 16,
            }}
          >
            {['♥', '♡', '♥', '♡', '♥'].map((h, i) => (
              <span
                key={i}
                style={{
                  color: i % 2 === 0 ? '#e6a5ac' : '#cda86a',
                  fontSize: i === 2 ? 24 : 16,
                  animation: `heartBeat ${1.2 + i * 0.15}s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                  display: 'inline-block',
                }}
              >
                {h}
              </span>
            ))}
          </div>

          <p
            style={{
              fontFamily: 'Lato, sans-serif',
              color: '#cda86a66',
              fontSize: 12,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            Made with love by {MY_NAME} · {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  )
}
