import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Play, Pause, SkipForward, SkipBack,
  Volume2, VolumeX, Music2, ChevronDown, ChevronUp,
} from 'lucide-react'
import { PLAYLIST } from '../constants'

// ── Waveform bars (animated when playing) ─────────────────────────────────
function WaveformBars({ playing }: { playing: boolean }) {
  const bars = [
    { anim: 'waveBar1', delay: '0s', w: 3 },
    { anim: 'waveBar2', delay: '0.1s', w: 3 },
    { anim: 'waveBar3', delay: '0.2s', w: 3 },
    { anim: 'waveBar4', delay: '0.05s', w: 3 },
    { anim: 'waveBar5', delay: '0.15s', w: 3 },
  ]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 24 }}>
      {bars.map((b, i) => (
        <div
          key={i}
          style={{
            width: b.w,
            height: playing ? undefined : 4,
            borderRadius: 99,
            background: 'linear-gradient(to top, #e6a5ac, #cda86a)',
            animation: playing ? `${b.anim} 0.8s ease-in-out infinite` : 'none',
            animationDelay: b.delay,
            transition: 'height 0.3s',
          }}
        />
      ))}
    </div>
  )
}

// ── Format seconds to m:ss ─────────────────────────────────────────────────
function fmt(s: number) {
  if (!isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

// ── Main MusicPlayer component ─────────────────────────────────────────────
export default function MusicPlayer() {
  const [trackIdx, setTrackIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [showVolume, setShowVolume] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const track = PLAYLIST[trackIdx]
  const hasPlaylist = PLAYLIST.length > 0

  // Sync audio element when track changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !track) return
    audio.src = track.src
    audio.load()
    if (playing) audio.play().catch(() => setPlaying(false))
  }, [trackIdx]) // eslint-disable-line

  // Play / pause
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !track) return
    if (playing) {
      audio.play().catch(() => setPlaying(false))
    } else {
      audio.pause()
    }
  }, [playing, track])

  // Volume
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = muted ? 0 : volume
  }, [volume, muted])

  const handleTimeUpdate = useCallback(() => {
    setCurrentTime(audioRef.current?.currentTime ?? 0)
  }, [])

  const handleLoadedMetadata = useCallback(() => {
    setDuration(audioRef.current?.duration ?? 0)
  }, [])

  const handleEnded = useCallback(() => {
    if (PLAYLIST.length > 1) {
      setTrackIdx(i => (i + 1) % PLAYLIST.length)
    } else {
      setPlaying(false)
    }
  }, [])

  const skipNext = () => setTrackIdx(i => (i + 1) % PLAYLIST.length)
  const skipPrev = () => setTrackIdx(i => (i - 1 + PLAYLIST.length) % PLAYLIST.length)

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    const newTime = pct * duration
    if (audioRef.current) audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0

  // ── Empty state ──────────────────────────────────────────────────────────
  if (!hasPlaylist) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          animation: 'playerSlideIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards',
        }}
      >
        <div
          className="music-player"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(20, 6, 12, 0.82)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(205,168,106,0.25)',
            borderRadius: 999,
            padding: '10px 20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset',
            whiteSpace: 'nowrap',
          }}
        >
          <Music2 size={14} color="#cda86a" />
          <span style={{ fontSize: 11, color: '#cda86a88', fontFamily: 'Inter, sans-serif', letterSpacing: 0.5 }}>
            Add songs to <code style={{ color: '#e6cfa0' }}>/public/music/</code> & update <code style={{ color: '#e6cfa0' }}>PLAYLIST</code>
          </span>
        </div>
      </div>
    )
  }

  // ── Full player ──────────────────────────────────────────────────────────
  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div
        style={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          animation: 'playerSlideIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards',
          width: 'min(440px, calc(100vw - 32px))',
        }}
      >
        <div
          className="music-player"
          style={{
            background: 'rgba(18, 5, 11, 0.88)',
            backdropFilter: 'blur(28px) saturate(200%)',
            WebkitBackdropFilter: 'blur(28px) saturate(200%)',
            border: '1px solid rgba(205,168,106,0.22)',
            borderRadius: collapsed ? 999 : 24,
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset',
            transition: 'border-radius 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}
        >

          {/* ── Top bar (always visible) ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: collapsed ? '10px 16px' : '14px 16px 8px',
              transition: 'padding 0.3s',
            }}
          >
            {/* Album art / waveform */}
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #3d1723, #5a1f30)',
                border: '1px solid rgba(205,168,106,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {playing ? (
                <WaveformBars playing={playing} />
              ) : (
                <Music2 size={16} color="#cda86a88" />
              )}
            </div>

            {/* Track info */}
            <div style={{ flex: 1, overflow: 'hidden', minWidth: 0 }}>
              <div
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#e6cfa0',
                    fontFamily: 'Inter, sans-serif',
                    animation: track.title.length > 20 ? 'marquee 8s linear infinite' : 'none',
                  }}
                >
                  {track.title.length > 20 ? `${track.title}   •   ${track.title}   ` : track.title}
                </span>
              </div>
              <div style={{ fontSize: 11, color: '#cda86a88', fontFamily: 'Inter, sans-serif', marginTop: 1 }}>
                {track.artist}
              </div>
            </div>

            {/* Controls: prev, play/pause, next */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
              {PLAYLIST.length > 1 && (
                <button onClick={skipPrev} style={iconBtnStyle}>
                  <SkipBack size={14} color="#cda86a" />
                </button>
              )}

              <button
                onClick={() => setPlaying(p => !p)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'linear-gradient(135deg, #cda86a, #e6cfa0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(205,168,106,0.4)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  flexShrink: 0,
                }}
                onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.92)')}
                onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {playing
                  ? <Pause size={14} fill="#2a0f16" color="#2a0f16" />
                  : <Play size={14} fill="#2a0f16" color="#2a0f16" style={{ marginLeft: 2 }} />
                }
              </button>

              {PLAYLIST.length > 1 && (
                <button onClick={skipNext} style={iconBtnStyle}>
                  <SkipForward size={14} color="#cda86a" />
                </button>
              )}
            </div>

            {/* Volume & collapse */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setMuted(m => !m)}
                  onMouseEnter={() => setShowVolume(true)}
                  onMouseLeave={() => setShowVolume(false)}
                  style={iconBtnStyle}
                >
                  {muted || volume === 0
                    ? <VolumeX size={13} color="#cda86a88" />
                    : <Volume2 size={13} color="#cda86a88" />
                  }
                </button>

                {/* Volume popover */}
                {showVolume && (
                  <div
                    onMouseEnter={() => setShowVolume(true)}
                    onMouseLeave={() => setShowVolume(false)}
                    style={{
                      position: 'absolute',
                      bottom: '120%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(18,5,11,0.95)',
                      border: '1px solid rgba(205,168,106,0.2)',
                      borderRadius: 12,
                      padding: '10px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                      backdropFilter: 'blur(16px)',
                      animation: 'fadeIn 0.15s ease',
                    }}
                  >
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={muted ? 0 : volume}
                      onChange={e => { setVolume(+e.target.value); setMuted(false) }}
                      style={{
                        writingMode: 'vertical-lr' as const,
                        direction: 'rtl' as const,
                        height: 64,
                        width: 4,
                        cursor: 'pointer',
                        accentColor: '#cda86a',
                      }}
                    />
                    <span style={{ fontSize: 9, color: '#cda86a88', fontFamily: 'Inter, sans-serif' }}>
                      {Math.round((muted ? 0 : volume) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              <button onClick={() => setCollapsed(c => !c)} style={iconBtnStyle}>
                {collapsed
                  ? <ChevronUp size={13} color="#cda86a88" />
                  : <ChevronDown size={13} color="#cda86a88" />
                }
              </button>
            </div>
          </div>

          {/* ── Progress bar (hidden when collapsed) ── */}
          {!collapsed && (
            <div style={{ padding: '0 16px 14px' }}>
              {/* Scrubber */}
              <div
                className="progress-track"
                onClick={seek}
                style={{ height: 4, marginBottom: 6, position: 'relative', cursor: 'pointer' }}
              >
                <div
                  className="progress-fill"
                  style={{
                    height: '100%',
                    width: `${progressPct}%`,
                    background: 'linear-gradient(90deg, #c87b8a, #cda86a)',
                    borderRadius: 999,
                    transition: 'width 0.25s linear',
                    position: 'relative',
                  }}
                >
                  {/* Scrubber thumb */}
                  <div style={{
                    position: 'absolute',
                    right: -5,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#e6cfa0',
                    boxShadow: '0 0 6px rgba(205,168,106,0.6)',
                  }} />
                </div>
              </div>

              {/* Time */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, color: '#cda86a66', fontFamily: 'Inter, sans-serif' }}>
                  {fmt(currentTime)}
                </span>
                <span style={{ fontSize: 10, color: '#cda86a66', fontFamily: 'Inter, sans-serif' }}>
                  {fmt(duration)}
                </span>
              </div>

              {/* Track count indicator */}
              {PLAYLIST.length > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 8 }}>
                  {PLAYLIST.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTrackIdx(i)}
                      style={{
                        width: i === trackIdx ? 16 : 5,
                        height: 5,
                        borderRadius: 999,
                        background: i === trackIdx
                          ? 'linear-gradient(90deg, #e6a5ac, #cda86a)'
                          : 'rgba(205,168,106,0.25)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'width 0.3s, background 0.3s',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const iconBtnStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: '50%',
  border: 'none',
  background: 'rgba(255,255,255,0.05)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background 0.15s',
  flexShrink: 0,
}
