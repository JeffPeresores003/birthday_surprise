import { useState, useRef, useCallback } from 'react'
import { Camera, Film, Cake, Mail, Star, Heart, Sparkles } from 'lucide-react'
import { HER_NAME, HER_NICKNAME, MY_NAME } from '../constants'
import PetalField from '../components/PetalField'
import PhotoBook from '../components/PhotoBook'
import FlashCards from '../components/FlashCards'
import VideoReels from '../components/VideoReels'
import CakeCandle from '../components/CakeCandle'
import EnvelopeLetter from '../components/EnvelopeLetter'
import WishInput from '../components/WishInput'
import Ornament from '../components/Ornament'
import FloatingHeart, { type Heart as HeartType } from '../components/FloatingHeart'
import { PETAL_COLORS } from '../constants'


// ── Shared section heading component ────────────────────────────────────────
function SectionHeading({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 28 }}>
      {/* Icon badge */}
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: '50%',
          background: 'rgba(205,168,106,0.1)',
          border: '1px solid rgba(205,168,106,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(205,168,106,0.15)',
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: 'Playfair Display, serif',
          fontStyle: 'italic',
          color: '#e6cfa0',
          fontSize: 22,
          fontWeight: 400,
          margin: 0,
          letterSpacing: 0.5,
          textShadow: '0 2px 16px rgba(205,168,106,0.2)',
        }}
      >
        {children}
      </h3>
      {/* Thin accent line */}
      <div
        style={{
          width: 40,
          height: 1,
          background: 'linear-gradient(to right, transparent, #cda86a88, transparent)',
        }}
      />
    </div>
  )
}

/**
 * Hero Photo Frame Component for photo /photos/12.png
 */
function HeroPhotoFrame() {
  const [hearts, setHearts] = useState<HeartType[]>([])
  const frameRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)

  const handleTap = useCallback(() => {
    const rect = frameRef.current?.getBoundingClientRect()
    const cx = rect ? rect.width / 2 : 90
    const newHearts: HeartType[] = Array.from({ length: 8 }, (_, i) => ({
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
        margin: '28px auto 24px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {/* Glow ring behind the frame */}
      <div
        style={{
          position: 'absolute',
          inset: -8,
          borderRadius: '94px 94px 28px 28px',
          background: 'radial-gradient(ellipse at center, rgba(205,168,106,0.2) 0%, transparent 70%)',
          animation: 'glowPulse 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Arched photo frame */}
      <div
        style={{
          width: 180,
          height: 220,
          margin: '0 auto',
          borderRadius: '90px 90px 24px 24px',
          border: '2px solid rgba(205,168,106,0.6)',
          overflow: 'hidden',
          boxShadow: '0 16px 48px rgba(0,0,0,0.7), 0 0 40px rgba(205,168,106,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
          background: '#3d1723',
          position: 'relative',
        }}
      >
        <img
          src="/photos/12.png"
          alt={HER_NAME}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Shimmer overlay on hover */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Gold top ornament ring */}
      <div
        style={{
          position: 'absolute',
          top: -6,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 16,
          height: 16,
          borderRadius: '50%',
          border: '2px solid #cda86a',
          backgroundColor: '#2a0f16',
          boxShadow: '0 0 8px rgba(205,168,106,0.5)',
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
        background: 'linear-gradient(170deg, #1e0a10 0%, #3d1723 45%, #2a0f16 100%)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Ambient falling petals */}
      <PetalField />

      {/* Layered ambient glows */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 25%, rgba(90,31,48,0.25) 0%, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: 'radial-gradient(ellipse 40% 30% at 80% 80%, rgba(205,168,106,0.06) 0%, transparent 60%)',
        }}
      />

      {/* ── Scrollable content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 480,
          margin: '0 auto',
          padding: '60px 24px 120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}
      >

        {/* ── SECTION 1: HERO ── */}
        <section
          style={{
            width: '100%',
            textAlign: 'center',
            marginBottom: 52,
            animation: 'slideUp 0.8s cubic-bezier(0.34,1.2,0.64,1) forwards',
          }}
        >
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 'clamp(36px, 8vw, 52px)',
              color: '#e6cfa0',
              margin: 0,
              lineHeight: 1.15,
              textShadow: '0 2px 32px rgba(205,168,106,0.5)',
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
              fontSize: 'clamp(28px, 6vw, 40px)',
              color: '#e6a5ac',
              margin: '6px 0 0',
              letterSpacing: 2,
              textShadow: '0 2px 20px rgba(230,165,172,0.3)',
            }}
          >
            {HER_NAME}
          </h2>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              color: '#f5ecdf',
              opacity: 0.5,
              fontSize: 13,
              marginTop: 4,
              letterSpacing: 3.5,
              fontStyle: 'italic',
            }}
          >
            ({HER_NICKNAME})
          </p>

          {/* Picture of Her */}
          <HeroPhotoFrame />

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              color: '#f5ecdf',
              opacity: 0.7,
              fontSize: 15,
              letterSpacing: 0.3,
              lineHeight: 1.7,
              maxWidth: 300,
              margin: '16px auto 0',
            }}
          >
            On this day the world became a little more beautiful — the day you were born.
          </p>

          {/* Gold accent line */}
          <div
            style={{
              width: 80,
              height: 1,
              background: 'linear-gradient(to right, transparent, #cda86a, transparent)',
              margin: '28px auto 0',
            }}
          />
        </section>

        <Ornament />

        {/* ── SECTION 2: HER SCRAPBOOK ── */}
        <section style={{ width: '100%', textAlign: 'center', margin: '48px 0' }}>
          <SectionHeading icon={<Camera size={18} color="#cda86a" />}>
            Her Scrapbook
          </SectionHeading>
          <p
            style={{
              color: '#cda86a88',
              fontSize: 12,
              fontFamily: 'Inter, sans-serif',
              marginBottom: 20,
              letterSpacing: 0.5,
              marginTop: -14,
            }}
          >
            Memories of Jaiiii captured with love
          </p>
          <PhotoBook />
        </section>

        <Ornament />

        {/* ── SECTION 3: 177 DAYS FLASH CARDS ── */}
        <section style={{ width: '100%', textAlign: 'center', margin: '48px 0' }}>
          <SectionHeading icon={<Sparkles size={18} color="#cda86a" />}>
            Reasons Why Your Existence Makes Me Happy
          </SectionHeading>
          <FlashCards />
        </section>

        <Ornament />

        {/* ── SECTION 4: VIDEO REELS ── */}
        <section style={{ width: '100%', textAlign: 'center', margin: '48px 0' }}>
          <SectionHeading icon={<Film size={18} color="#cda86a" />}>
            Video Reels of {HER_NAME}
          </SectionHeading>
          <p
            style={{
              color: '#cda86a88',
              fontSize: 12,
              fontFamily: 'Inter, sans-serif',
              marginBottom: 24,
              letterSpacing: 0.5,
              marginTop: -12,
            }}
          >
            Scroll through video memories celebrating her
          </p>
          <VideoReels />
        </section>

        <Ornament />

        {/* ── SECTION 4: CAKE & CANDLE ── */}
        <section style={{ width: '100%', textAlign: 'center', margin: '48px 0' }}>
          <SectionHeading icon={<Cake size={18} color="#cda86a" />}>
            Make a wish before you blow...
          </SectionHeading>
          <CakeCandle />
        </section>

        <Ornament />

        {/* ── SECTION 5: ENVELOPE & LETTER ── */}
        <section style={{ width: '100%', textAlign: 'center', margin: '48px 0' }}>
          <SectionHeading icon={<Mail size={18} color="#cda86a" />}>
            A letter written for you
          </SectionHeading>
          <EnvelopeLetter />
        </section>

        <Ornament />

        {/* ── SECTION 6: WISH INPUT ── */}
        <section style={{ width: '100%', textAlign: 'center', margin: '48px 0' }}>
          <SectionHeading icon={<Star size={18} color="#cda86a" />}>
            What do you wish for?
          </SectionHeading>
          <WishInput />
        </section>

        {/* ── FOOTER ── */}
        <footer
          style={{
            marginTop: 60,
            textAlign: 'center',
            width: '100%',
            paddingBottom: 80,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              marginBottom: 18,
            }}
          >
            {[0.8, 1, 1.4, 1, 0.8].map((scale, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  animation: `heartBeat ${1.1 + i * 0.18}s ease-in-out infinite`,
                  animationDelay: `${i * 0.12}s`,
                  transform: `scale(${scale})`,
                  color: i % 2 === 0 ? '#e6a5ac' : '#cda86a',
                }}
              >
                <Heart
                  size={i === 2 ? 22 : 14}
                  fill="currentColor"
                  color="currentColor"
                />
              </span>
            ))}
          </div>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              color: 'rgba(205,168,106,0.4)',
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontWeight: 400,
            }}
          >
            Made with love by {MY_NAME} · {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  )
}
