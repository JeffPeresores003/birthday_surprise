import { useState, useRef, useEffect, useCallback } from 'react'
import FloatingHeart, { type Heart } from './FloatingHeart'
import { PETAL_COLORS } from '../constants'

export interface VideoItem {
  id: number
  title: string
  subtitle: string
  src: string
  caption: string
  accentColor: string
}

export const VIDEO_LIST: VideoItem[] = [
  {
    id: 1,
    title: 'Radiant Laughter',
    subtitle: 'Reel 01 of 14',
    src: '/videos/0e1ce7f0-2c60-4878-bf7a-35134276f006.mp4',
    caption: 'Her laugh is pure sunshine, warming every moment.',
    accentColor: '#e6a5ac',
  },
  {
    id: 2,
    title: 'Unfiltered Happiness',
    subtitle: 'Reel 02 of 14',
    src: '/videos/35019809-d867-4185-8b3e-80d4918b0b50.mp4',
    caption: 'A candid glimpse of her genuine and joyful spirit.',
    accentColor: '#cda86a',
  },
  {
    id: 3,
    title: 'Gentle Grace',
    subtitle: 'Reel 03 of 14',
    src: '/videos/591fcec2-eb9c-4034-a8f2-288d403eb61a.mp4',
    caption: 'Quiet confidence and natural elegance in motion.',
    accentColor: '#c090f0',
  },
  {
    id: 4,
    title: 'Captivating Presence',
    subtitle: 'Reel 04 of 14',
    src: '/videos/5ebf7610-def0-482c-b46a-7a39393c9582.mp4',
    caption: 'Her energy lights up the entire room around her.',
    accentColor: '#90e0a8',
  },
  {
    id: 5,
    title: 'Pure Joy',
    subtitle: 'Reel 05 of 14',
    src: '/videos/635fe5f1-faf1-4c46-a3b5-ff053fa4424c.mp4',
    caption: 'Simple moments filled with her beautiful smile.',
    accentColor: '#f2a4b7',
  },
  {
    id: 6,
    title: 'Sweet Charm',
    subtitle: 'Reel 06 of 14',
    src: '/videos/76b5ca57-1ae1-4089-acbe-9d1964809514.mp4',
    caption: 'Warmth, playfulness, and unforgettable charm.',
    accentColor: '#80cbe5',
  },
  {
    id: 7,
    title: 'Golden Light',
    subtitle: 'Reel 07 of 14',
    src: '/videos/98164a49-68a4-4349-acaa-d7f05f92424b.mp4',
    caption: 'Glowing with beauty, inside and out.',
    accentColor: '#f2be88',
  },
  {
    id: 8,
    title: 'Shining Bright',
    subtitle: 'Reel 08 of 14',
    src: '/videos/a5ce3771-2e55-4935-8885-c5557892436c.mp4',
    caption: 'Her unique spark makes every second special.',
    accentColor: '#ff94b8',
  },
  {
    id: 9,
    title: 'Simply Beautiful',
    subtitle: 'Reel 09 of 14',
    src: '/videos/a7b892db-85d6-4306-b3f6-de1881d4b5e3.mp4',
    caption: 'Effortlessly lovely in every way.',
    accentColor: '#d6a3ff',
  },
  {
    id: 10,
    title: 'Charming Spirit',
    subtitle: 'Reel 10 of 14',
    src: '/videos/b3ef8265-2ec6-47e9-9933-34337ef2e12d.mp4',
    caption: 'Her kind and gentle soul touches everyone.',
    accentColor: '#7ae0b7',
  },
  {
    id: 11,
    title: 'Endless Sunshine',
    subtitle: 'Reel 11 of 14',
    src: '/videos/c3f851b1-52fe-4865-8197-2f34b6166972.mp4',
    caption: 'Bringing happiness wherever she chooses to go.',
    accentColor: '#ebd778',
  },
  {
    id: 12,
    title: 'Unforgettable Sparkle',
    subtitle: 'Reel 12 of 14',
    src: '/videos/c6ad5744-5b22-4f5d-b2e1-60b5829cb233.mp4',
    caption: 'A bright light that inspires everyone around her.',
    accentColor: '#f28ee0',
  },
  {
    id: 13,
    title: 'Serene Beauty',
    subtitle: 'Reel 13 of 14',
    src: '/videos/e01e7992-37f1-4460-941a-91324e87fc7f.mp4',
    caption: 'Peaceful, beautiful, and truly wonderful.',
    accentColor: '#88d2f7',
  },
  {
    id: 14,
    title: 'Always Glowing',
    subtitle: 'Reel 14 of 14',
    src: '/videos/fb95ec4f-9d9f-436c-8953-85f453a03a68.mp4',
    caption: 'Celebrating Jaiiii and her wonderful birthday!',
    accentColor: '#f788a5',
  },
]

interface TikTokCardProps {
  video: VideoItem
  index: number
  total: number
  isMuted: boolean
  onToggleMute: () => void
  onFullscreen: (src: string) => void
}

function TikTokReelCard({
  video,
  index,
  total,
  isMuted,
  onToggleMute,
  onFullscreen,
}: TikTokCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isNearViewport, setIsNearViewport] = useState(index <= 1)
  const [likeCount, setLikeCount] = useState(1)
  const [hearts, setHearts] = useState<Heart[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const heartIdRef = useRef(0)

  // IntersectionObserver to lazy load video source when within 400px of viewport
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Proximity observer to start buffering only when near
    const proximityObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsNearViewport(true)
          }
        })
      },
      { rootMargin: '400px 0px' },
    )

    // Playback observer to play/pause when centered
    const playObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!videoRef.current) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            videoRef.current.play().catch(() => {})
            setIsPlaying(true)
          } else {
            videoRef.current.pause()
            setIsPlaying(false)
          }
        })
      },
      { threshold: 0.6 },
    )

    proximityObserver.observe(el)
    playObserver.observe(el)

    return () => {
      proximityObserver.disconnect()
      playObserver.disconnect()
    }
  }, [])

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const cx = rect.width / 2

      // Spawn floating hearts
      const newHearts: Heart[] = Array.from({ length: 6 }, (_, i) => ({
        id: ++heartIdRef.current,
        x: cx + (Math.random() - 0.5) * 120,
        y: 120 + Math.random() * 100,
        size: 16 + Math.random() * 14,
        hue: PETAL_COLORS[i % PETAL_COLORS.length],
      }))
      setHearts(h => [...h, ...newHearts])
      setLikeCount(c => c + 1)

      togglePlay()
    },
    [togglePlay],
  )

  return (
    <div
      ref={containerRef}
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        flexShrink: 0,
        width: '100%',
        height: 520,
        position: 'relative',
        background: '#12050b',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background ambient gradient placeholder before video is loaded */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, ${video.accentColor}22 0%, #12050b 80%)`,
          display: isLoaded ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <span style={{ color: video.accentColor, fontSize: 12, fontFamily: 'Lato, sans-serif', opacity: 0.6, letterSpacing: 1.5 }}>
          Loading Reel...
        </span>
      </div>

      {/* Lazy Loaded Video Element */}
      <video
        ref={videoRef}
        src={isNearViewport ? video.src : undefined}
        preload={index === 0 ? 'auto' : isNearViewport ? 'metadata' : 'none'}
        loop
        muted={isMuted}
        playsInline
        onClick={handleCardClick}
        onLoadedData={() => setIsLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          cursor: 'pointer',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 2,
        }}
      />

      {/* Top Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
          pointerEvents: 'none',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <span
          style={{
            color: video.accentColor,
            fontFamily: 'Lato, sans-serif',
            fontSize: 10,
            letterSpacing: 2,
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          {video.subtitle}
        </span>

        <span
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'Lato, sans-serif',
            fontSize: 10,
            letterSpacing: 1,
          }}
        >
          {index + 1} / {total}
        </span>
      </div>

      {/* Play/Pause Overlay Indicator when paused */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #cda86a, #e6cfa0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2a0f16',
              fontSize: 18,
              fontWeight: 'bold',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              paddingLeft: 3,
            }}
          >
            ▶
          </div>
        </div>
      )}

      {/* Right Side Action Bar (TikTok Style) */}
      <div
        style={{
          position: 'absolute',
          right: 12,
          bottom: 90,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          zIndex: 20,
        }}
      >
        {/* Heart Reaction */}
        <button
          onClick={e => {
            e.stopPropagation()
            setLikeCount(c => c + 1)
          }}
          style={{
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#e6a5ac',
            width: 42,
            height: 42,
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: 18,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}
        >
          ♥
        </button>
        <span
          style={{
            color: '#fff',
            fontSize: 9,
            fontFamily: 'Lato, sans-serif',
            marginTop: -10,
          }}
        >
          {likeCount}
        </span>

        {/* Mute Toggle */}
        <button
          onClick={e => {
            e.stopPropagation()
            onToggleMute()
          }}
          style={{
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
            width: 42,
            height: 42,
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: 10,
            fontFamily: 'Lato, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? 'MUTE' : 'AUDIO'}
        </button>

        {/* Fullscreen Expand */}
        <button
          onClick={e => {
            e.stopPropagation()
            onFullscreen(video.src)
          }}
          style={{
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
            width: 42,
            height: 42,
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: 9,
            fontFamily: 'Lato, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}
          title="Fullscreen View"
        >
          FULL
        </button>
      </div>

      {/* Bottom Information Overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
          padding: '24px 70px 18px 16px',
          pointerEvents: 'none',
          textAlign: 'left',
        }}
      >
        <h4
          style={{
            color: '#f5ecdf',
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: 16,
            margin: 0,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {video.title}
        </h4>
        <p
          style={{
            color: 'rgba(245,236,223,0.85)',
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: 12,
            margin: '4px 0 0',
            lineHeight: 1.4,
          }}
        >
          "{video.caption}"
        </p>
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
  )
}

export default function VideoReels() {
  const [isMuted, setIsMuted] = useState(true)
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null)
  const feedRef = useRef<HTMLDivElement>(null)

  const toggleGlobalMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])

  const scrollUp = useCallback(() => {
    if (feedRef.current) {
      feedRef.current.scrollBy({ top: -520, behavior: 'smooth' })
    }
  }, [])

  const scrollDown = useCallback(() => {
    if (feedRef.current) {
      feedRef.current.scrollBy({ top: 520, behavior: 'smooth' })
    }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        maxWidth: 320,
        margin: '0 auto',
      }}
    >
      {/* Sound & Vertical Navigation Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0 4px',
        }}
      >
        <button
          onClick={toggleGlobalMute}
          style={{
            background: 'transparent',
            border: '1px solid #cda86a66',
            color: '#cda86a',
            borderRadius: 20,
            padding: '5px 14px',
            fontSize: 11,
            fontFamily: 'Lato, sans-serif',
            cursor: 'pointer',
          }}
        >
          {isMuted ? 'Muted (Tap to Unmute)' : 'Sound On'}
        </button>

        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={scrollUp}
            style={{
              background: '#3d1723',
              border: '1px solid #cda86a66',
              color: '#cda86a',
              width: 30,
              height: 30,
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Scroll Up"
          >
            ▲
          </button>
          <button
            onClick={scrollDown}
            style={{
              background: '#3d1723',
              border: '1px solid #cda86a66',
              color: '#cda86a',
              width: 30,
              height: 30,
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Scroll Down"
          >
            ▼
          </button>
        </div>
      </div>

      {/* ── TikTok-Style Vertical Scroll Snap Phone Viewport ── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 520,
          borderRadius: 24,
          boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 0 2px #cda86a44',
          overflow: 'hidden',
          background: '#000',
        }}
      >
        <div
          ref={feedRef}
          style={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            scrollSnapType: 'y mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
          }}
        >
          {VIDEO_LIST.map((v, idx) => (
            <TikTokReelCard
              key={v.id}
              video={v}
              index={idx}
              total={VIDEO_LIST.length}
              isMuted={isMuted}
              onToggleMute={toggleGlobalMute}
              onFullscreen={src => setFullscreenVideo(src)}
            />
          ))}
        </div>
      </div>

      <p
        style={{
          color: '#cda86a55',
          fontSize: 10,
          fontFamily: 'Lato, sans-serif',
          letterSpacing: 2,
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        Swipe vertically or use ▲ ▼ to scroll (14 Reels)
      </p>

      {/* ── Fullscreen Video Lightbox Modal ── */}
      {fullscreenVideo && (
        <div
          onClick={() => setFullscreenVideo(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            animation: 'backdropIn 0.3s ease forwards',
          }}
        >
          <button
            onClick={() => setFullscreenVideo(null)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              border: 'none',
              width: 38,
              height: 38,
              borderRadius: '50%',
              fontSize: 22,
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            ×
          </button>
          <video
            src={fullscreenVideo}
            autoPlay
            controls
            playsInline
            style={{
              maxWidth: '95vw',
              maxHeight: '90vh',
              borderRadius: 12,
              boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 0 1px #cda86a66',
            }}
          />
        </div>
      )}
    </div>
  )
}
