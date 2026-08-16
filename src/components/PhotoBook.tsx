import { useState, useRef, useCallback } from 'react'
import FloatingHeart, { type Heart } from './FloatingHeart'
import { PETAL_COLORS } from '../constants'

export interface MemoryPage {
  id: number
  title: string
  subtitle: string
  poem: string
  bgGradient: string
  accentColor: string
  imageSrc: string
}

export const MEMORY_PAGES: MemoryPage[] = [
  {
    id: 0,
    title: 'Her Radiant Smile',
    subtitle: 'Photo 01 of 18',
    poem: 'The warmth in her smile\nbrightens up any room she enters.',
    bgGradient: 'linear-gradient(145deg, #3d1723, #6b1f38)',
    accentColor: '#e6a5ac',
    imageSrc: '/photos/1.png',
  },
  {
    id: 1,
    title: 'Pure Elegance',
    subtitle: 'Photo 02 of 18',
    poem: 'Grace and beauty in every moment,\neffortless and truly captivating.',
    bgGradient: 'linear-gradient(145deg, #0d1240, #1a2070)',
    accentColor: '#a8b8f0',
    imageSrc: '/photos/2.png',
  },
  {
    id: 2,
    title: 'Golden Sunshine',
    subtitle: 'Photo 03 of 18',
    poem: 'Her presence shines as brightly\nas the warm morning sun.',
    bgGradient: 'linear-gradient(145deg, #3d2808, #6b4a12)',
    accentColor: '#cda86a',
    imageSrc: '/photos/3.png',
  },
  {
    id: 3,
    title: 'Gentle Spirit',
    subtitle: 'Photo 04 of 18',
    poem: 'Kind-hearted and gentle,\na rare gem in this world.',
    bgGradient: 'linear-gradient(145deg, #0a2a15, #1a4a2a)',
    accentColor: '#90e0a8',
    imageSrc: '/photos/4.png',
  },
  {
    id: 4,
    title: 'Unfiltered Joy',
    subtitle: 'Photo 05 of 18',
    poem: 'Her genuine laughter\nis the sweetest sound imaginable.',
    bgGradient: 'linear-gradient(145deg, #2a0a3d, #4a1a6d)',
    accentColor: '#c090f0',
    imageSrc: '/photos/5.png',
  },
  {
    id: 5,
    title: 'Timeless Beauty',
    subtitle: 'Photo 06 of 18',
    poem: 'A classic beauty,\nshining with confidence and poise.',
    bgGradient: 'linear-gradient(145deg, #4d1828, #7a203a)',
    accentColor: '#f2a4b7',
    imageSrc: '/photos/6.png',
  },
  {
    id: 6,
    title: 'Captivating Charm',
    subtitle: 'Photo 07 of 18',
    poem: 'With every glance,\nshe brings quiet joy and wonder.',
    bgGradient: 'linear-gradient(145deg, #1c2b36, #2d4558)',
    accentColor: '#80cbe5',
    imageSrc: '/photos/7.png',
  },
  {
    id: 7,
    title: 'Soft & Warm',
    subtitle: 'Photo 08 of 18',
    poem: 'A comforting soul\nwho makes everything feel peaceful.',
    bgGradient: 'linear-gradient(145deg, #3d1c08, #6b3312)',
    accentColor: '#f2be88',
    imageSrc: '/photos/8.png',
  },
  {
    id: 8,
    title: 'Precious Soul',
    subtitle: 'Photo 09 of 18',
    poem: 'Thoughtful, caring, and deeply loving,\na blessing to all around her.',
    bgGradient: 'linear-gradient(145deg, #400a20, #701438)',
    accentColor: '#ff94b8',
    imageSrc: '/photos/9.png',
  },
  {
    id: 9,
    title: 'Grace & Poise',
    subtitle: 'Photo 10 of 18',
    poem: 'Moving through life\nwith quiet elegance and strength.',
    bgGradient: 'linear-gradient(145deg, #2b173d, #4c296b)',
    accentColor: '#d6a3ff',
    imageSrc: '/photos/10.png',
  },
  {
    id: 10,
    title: 'Bright Energy',
    subtitle: 'Photo 11 of 18',
    poem: 'Her vibrant spirit\nbrings energy to every day.',
    bgGradient: 'linear-gradient(145deg, #0e3022, #18523b)',
    accentColor: '#7ae0b7',
    imageSrc: '/photos/11.png',
  },
  {
    id: 11,
    title: 'Shining Star',
    subtitle: 'Photo 12 of 18',
    poem: 'Shining effortlessly,\nalways standing out in her unique way.',
    bgGradient: 'linear-gradient(145deg, #3b0e36, #63175b)',
    accentColor: '#f28ee0',
    imageSrc: '/photos/12.png',
  },
  {
    id: 12,
    title: 'Sweet Perfection',
    subtitle: 'Photo 13 of 18',
    poem: 'Wonderful in every detail,\ntruly one of a kind.',
    bgGradient: 'linear-gradient(145deg, #451b0e, #73301a)',
    accentColor: '#f7aa88',
    imageSrc: '/photos/13.png',
  },
  {
    id: 13,
    title: 'Warm Harmony',
    subtitle: 'Photo 14 of 18',
    poem: 'Bringing peace and light\nwherever she chooses to go.',
    bgGradient: 'linear-gradient(145deg, #3d3408, #6b5c12)',
    accentColor: '#ebd778',
    imageSrc: '/photos/14.png',
  },
  {
    id: 14,
    title: 'Unforgettable',
    subtitle: 'Photo 15 of 18',
    poem: 'A presence so lovely\nit leaves a lasting impression.',
    bgGradient: 'linear-gradient(145deg, #122b3b, #1f4a66)',
    accentColor: '#88d2f7',
    imageSrc: '/photos/15.png',
  },
  {
    id: 15,
    title: 'Beautiful Soul',
    subtitle: 'Photo 16 of 18',
    poem: 'Inside and out,\nshe radiates genuine warmth.',
    bgGradient: 'linear-gradient(145deg, #3d0d1b, #6b1730)',
    accentColor: '#f788a5',
    imageSrc: '/photos/16.png',
  },
  {
    id: 16,
    title: 'Pure Serenity',
    subtitle: 'Photo 17 of 18',
    poem: 'Calm, gentle, and lovely,\na true breath of fresh air.',
    bgGradient: 'linear-gradient(145deg, #25123b, #3e1f63)',
    accentColor: '#c588f7',
    imageSrc: '/photos/17.png',
  },
  {
    id: 17,
    title: 'Celebrating Jaiiii',
    subtitle: 'Photo 18 of 18',
    poem: 'May her year ahead\nbe filled with happiness and love.',
    bgGradient: 'linear-gradient(145deg, #420f18, #731b2b)',
    accentColor: '#fca2b4',
    imageSrc: '/photos/18.png',
  },
]

function SingleBookPageContent({
  page,
  onImageClick,
}: {
  page: MemoryPage
  onImageClick: (src: string) => void
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: page.bgGradient,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 18px',
        gap: 12,
        boxSizing: 'border-box',
      }}
    >
      {/* Header info */}
      <div style={{ textAlign: 'center' }}>
        <span
          style={{
            color: page.accentColor + 'aa',
            fontFamily: 'Lato, sans-serif',
            fontSize: 9,
            letterSpacing: 2,
            textTransform: 'uppercase',
            display: 'block',
          }}
        >
          {page.subtitle}
        </span>
        <h4
          style={{
            color: page.accentColor,
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: 18,
            margin: '2px 0 0',
            fontWeight: 700,
          }}
        >
          {page.title}
        </h4>
      </div>

      {/* Photo card */}
      <div
        onClick={e => {
          e.stopPropagation()
          onImageClick(page.imageSrc)
        }}
        style={{
          width: 220,
          height: 210,
          borderRadius: 10,
          padding: 6,
          background: '#ffffff15',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px #ffffff22',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          transition: 'transform 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.03)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)' }}
        title="Click to view full photo"
      >
        <img
          src={page.imageSrc}
          alt={page.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 6,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            background: 'rgba(0,0,0,0.6)',
            color: '#fff',
            fontSize: 10,
            padding: '3px 8px',
            borderRadius: 12,
            fontFamily: 'Lato, sans-serif',
            backdropFilter: 'blur(4px)',
          }}
        >
          Expand
        </div>
      </div>

      {/* Poem / Caption */}
      <p
        style={{
          color: '#f5ecdfdd',
          fontFamily: 'Playfair Display, serif',
          fontStyle: 'italic',
          fontSize: 12.5,
          lineHeight: 1.6,
          textAlign: 'center',
          whiteSpace: 'pre-line',
          margin: 0,
          maxWidth: 240,
        }}
      >
        "{page.poem}"
      </p>

      {/* Flip hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          right: 12,
          color: page.accentColor + '77',
          fontSize: 10,
          fontFamily: 'Lato, sans-serif',
          letterSpacing: 1,
        }}
      >
        CLICK TO FLIP ➔
      </div>
    </div>
  )
}

export default function PhotoBook() {
  const [currentPage, setCurrentPage] = useState(0)
  const [targetPage, setTargetPage] = useState<number | null>(null)
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next')
  const [isFlipping, setIsFlipping] = useState(false)
  const [hearts, setHearts] = useState<Heart[]>([])
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const heartIdRef = useRef(0)

  const flipToPage = useCallback(
    (nextIdx: number, dir?: 'next' | 'prev') => {
      if (isFlipping || nextIdx === currentPage) return
      const direction = dir || (nextIdx > currentPage ? 'next' : 'prev')
      setFlipDirection(direction)
      setTargetPage(nextIdx)
      setIsFlipping(true)

      setTimeout(() => {
        setCurrentPage(nextIdx)
        setTargetPage(null)
        setIsFlipping(false)
      }, 1200)
    },
    [currentPage, isFlipping],
  )

  const handleBookClick = useCallback(
    (e: React.MouseEvent) => {
      if (isFlipping) return
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const cx = rect.width / 2

      const newHearts: Heart[] = Array.from({ length: 6 }, (_, i) => ({
        id: ++heartIdRef.current,
        x: cx + (Math.random() - 0.5) * 100,
        y: 30 + Math.random() * 80,
        size: 14 + Math.random() * 12,
        hue: PETAL_COLORS[i % PETAL_COLORS.length],
      }))
      setHearts(h => [...h, ...newHearts])

      const next = (currentPage + 1) % MEMORY_PAGES.length
      flipToPage(next, 'next')
    },
    [currentPage, flipToPage, isFlipping],
  )

  const handlePrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      const prev = currentPage > 0 ? currentPage - 1 : MEMORY_PAGES.length - 1
      flipToPage(prev, 'prev')
    },
    [currentPage, flipToPage],
  )

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      const next = (currentPage + 1) % MEMORY_PAGES.length
      flipToPage(next, 'next')
    },
    [currentPage, flipToPage],
  )

  const activePageObj = MEMORY_PAGES[currentPage]
  const targetPageObj = targetPage !== null ? MEMORY_PAGES[targetPage] : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>
      {/* ── Book Frame ── */}
      <div style={{ position: 'relative', perspective: 1200 }}>
        {/* Soft shadow */}
        <div
          style={{
            position: 'absolute',
            bottom: -12,
            left: 20,
            right: 20,
            height: 20,
            background: '#00000088',
            borderRadius: '50%',
            filter: 'blur(12px)',
          }}
        />

        {/* Book Body Container */}
        <div
          onClick={handleBookClick}
          style={{
            position: 'relative',
            width: 320,
            height: 390,
            borderRadius: '6px 16px 16px 6px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px #cda86a33',
            cursor: 'pointer',
            userSelect: 'none',
            overflow: 'hidden',
            background: '#1c0a12',
            perspective: 1200,
          }}
        >
          {/* Leather Spine */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 36,
              background:
                'linear-gradient(to right, #2d1405, #633516, #4a270f, #2d1405)',
              zIndex: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: '1px solid #cda86a44',
            }}
          >
            {[40, 160, 280, 360].map(top => (
              <div
                key={top}
                style={{
                  position: 'absolute',
                  top,
                  left: 2,
                  right: 2,
                  height: 2,
                  background: '#cda86a33',
                  borderRadius: 1,
                }}
              />
            ))}
            <div
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                color: '#cda86a88',
                fontSize: 9,
                letterSpacing: 4,
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontWeight: 600,
              }}
            >
              PHOTOS OF JAIIII
            </div>
          </div>

          {/* ── Layer 1: Target Page (Behind while flipping) ── */}
          {isFlipping && targetPageObj && (
            <div
              style={{
                position: 'absolute',
                left: 36,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: 1,
              }}
            >
              <SingleBookPageContent
                page={targetPageObj}
                onImageClick={src => setLightboxImage(src)}
              />
            </div>
          )}

          {/* ── Layer 2: Active / Flipping Page ── */}
          <div
            style={{
              position: 'absolute',
              left: 36,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: isFlipping ? 10 : 2,
              transformOrigin: 'left center',
              animation: isFlipping
                ? flipDirection === 'next'
                  ? 'pageFlipNext 1.2s cubic-bezier(0.45, 0, 0.15, 1.0) forwards'
                  : 'pageFlipPrev 1.2s cubic-bezier(0.45, 0, 0.15, 1.0) forwards'
                : 'none',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <SingleBookPageContent
              page={activePageObj}
              onImageClick={src => setLightboxImage(src)}
            />

            {/* Realistic Page Turning Shadow Overlay */}
            {isFlipping && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background:
                    'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)',
                }}
              />
            )}
          </div>

          {/* Floating hearts */}
          {hearts.map(h => (
            <FloatingHeart
              key={h.id}
              heart={h}
              onDone={() => setHearts(prev => prev.filter(x => x.id !== h.id))}
            />
          ))}
        </div>
      </div>

      {/* ── Navigation controls ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={handlePrev}
          disabled={isFlipping}
          style={{
            background: '#3d1723',
            border: '1px solid #cda86a66',
            color: '#cda86a',
            width: 36,
            height: 36,
            borderRadius: '50%',
            cursor: isFlipping ? 'default' : 'pointer',
            fontSize: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.2s',
            opacity: isFlipping ? 0.5 : 1,
          }}
        >
          ‹
        </button>

        <span
          style={{
            color: '#e6cfa0',
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: 14,
            minWidth: 90,
            textAlign: 'center',
          }}
        >
          {currentPage + 1} of {MEMORY_PAGES.length}
        </span>

        <button
          onClick={handleNext}
          disabled={isFlipping}
          style={{
            background: '#3d1723',
            border: '1px solid #cda86a66',
            color: '#cda86a',
            width: 36,
            height: 36,
            borderRadius: '50%',
            cursor: isFlipping ? 'default' : 'pointer',
            fontSize: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.2s',
            opacity: isFlipping ? 0.5 : 1,
          }}
        >
          ›
        </button>
      </div>

      {/* ── Thumbnail gallery grid ── */}
      <div style={{ width: '100%', maxWidth: 360, marginTop: 8 }}>
        <div
          style={{
            color: '#cda86a88',
            fontSize: 10,
            fontFamily: 'Lato, sans-serif',
            letterSpacing: 2,
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: 10,
          }}
        >
          Jump to Photo ({MEMORY_PAGES.length})
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 6,
            maxHeight: 120,
            overflowY: 'auto',
            padding: 4,
            background: '#1f091188',
            borderRadius: 10,
            border: '1px solid #cda86a33',
          }}
        >
          {MEMORY_PAGES.map((p, idx) => (
            <div
              key={p.id}
              onClick={() => flipToPage(idx)}
              style={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: 6,
                overflow: 'hidden',
                border: idx === currentPage ? '2px solid #e6cfa0' : '1px solid #ffffff22',
                cursor: 'pointer',
                opacity: idx === currentPage ? 1 : 0.65,
                transition: 'all 0.2s',
                boxShadow: idx === currentPage ? '0 0 10px #cda86a99' : 'none',
              }}
            >
              <img
                src={p.imageSrc}
                alt={p.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Fullscreen Lightbox Modal ── */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            animation: 'backdropIn 0.3s ease forwards',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px #cda86a44',
            }}
          >
            <button
              onClick={() => setLightboxImage(null)}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                border: 'none',
                width: 32,
                height: 32,
                borderRadius: '50%',
                fontSize: 20,
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              ×
            </button>
            <img
              src={lightboxImage}
              alt="Memory Full View"
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
