import { useState, useEffect, useCallback } from 'react'
import { Sparkles, Lock } from 'lucide-react'
import PetalField from '../components/PetalField'
import { HER_NAME, HER_NICKNAME } from '../constants'

interface CountdownPageProps {
  onUnlock: () => void
}

/** Secret PIN for developer override */
const SECRET_PIN = '2003'

/** Target Unlock Date: December 14 of current year */
const getTargetDate = () => {
  const now = new Date()
  const year = now.getMonth() === 11 && now.getDate() > 14 ? now.getFullYear() + 1 : now.getFullYear()
  return new Date(year, 11, 14, 0, 0, 0) // Month 11 is December (0-indexed)
}

/** Reference start date: Jan 1 of the target year (for progress calculation) */
const getStartDate = () => {
  const target = getTargetDate()
  return new Date(target.getFullYear(), 0, 1, 0, 0, 0) // Jan 1 same year
}

// ── Journey Progress SVG Component ──────────────────────────────────────────
interface JourneyProgressProps {
  timeLeft: { days: number; hours: number; minutes: number; seconds: number }
}

function JourneyProgress({ timeLeft }: JourneyProgressProps) {
  const totalMs = getTargetDate().getTime() - getStartDate().getTime()
  const remainingMs =
    (timeLeft.days * 86400 + timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds) * 1000
  // progress: 0 = just started (girl at left), 1 = arrived (girl at cake)
  const progress = Math.min(1, Math.max(0, 1 - remainingMs / totalMs))

  // SVG layout constants
  const W = 360
  const H = 130
  const pathStartX = 28
  const pathEndX = W - 28
  const pathY = 88

  // Girl x position along the path
  const girlX = pathStartX + progress * (pathEndX - pathStartX - 52)

  // Floating sparkle positions (static, decorative)
  const sparkles = [
    { cx: 60, cy: 40 },
    { cx: 140, cy: 28 },
    { cx: 220, cy: 42 },
    { cx: 300, cy: 30 },
  ]

  return (
    <div
      style={{
        width: '100%',
        margin: '8px 0 4px',
        borderRadius: 14,
        overflow: 'hidden',
        background: 'rgba(20, 8, 14, 0.55)',
        border: '1px solid #cda86a22',
        boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <defs>
          {/* Ground gradient */}
          <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d1723" />
            <stop offset="100%" stopColor="#2a0f16" />
          </linearGradient>
          {/* Path glow */}
          <linearGradient id="pathGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#cda86a" stopOpacity="0.15" />
            <stop offset={`${progress * 100}%`} stopColor="#cda86a" stopOpacity="0.8" />
            <stop offset={`${Math.min(progress * 100 + 5, 100)}%`} stopColor="#cda86a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#cda86a" stopOpacity="0.1" />
          </linearGradient>
          {/* Girl dress gradient */}
          <linearGradient id="dressGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e6a5ac" />
            <stop offset="100%" stopColor="#c87b8a" />
          </linearGradient>
          {/* Cake frosting */}
          <linearGradient id="cakeFrost" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5ecdf" />
            <stop offset="100%" stopColor="#e6cfa0" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background sky strip */}
        <rect x="0" y="0" width={W} height={H} fill="url(#groundGrad)" />

        {/* Stars / sparkles */}
        {sparkles.map((s, i) => (
          <g key={i}>
            <circle cx={s.cx} cy={s.cy} r="1.2" fill="#cda86a" opacity="0.7">
              <animate
                attributeName="opacity"
                values="0.7;0.2;0.7"
                dur={`${1.5 + i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={s.cx + 4} cy={s.cy - 3} r="0.7" fill="#e6cfa0" opacity="0.5">
              <animate
                attributeName="opacity"
                values="0.5;0.1;0.5"
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Ground line */}
        <line x1={pathStartX} y1={pathY + 2} x2={pathEndX} y2={pathY + 2} stroke="#cda86a22" strokeWidth="1" />

        {/* Dotted path (full) */}
        <line
          x1={pathStartX}
          y1={pathY}
          x2={pathEndX}
          y2={pathY}
          stroke="#cda86a33"
          strokeWidth="2"
          strokeDasharray="5 6"
        />

        {/* Travelled path highlight */}
        <line
          x1={pathStartX}
          y1={pathY}
          x2={pathStartX + progress * (pathEndX - pathStartX)}
          y2={pathY}
          stroke="url(#pathGlow)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* ── GIRL SVG (walks along the path) ── */}
        <g transform={`translate(${girlX}, ${pathY - 36})`} filter="url(#softGlow)">
          {/* Shadow */}
          <ellipse cx="10" cy="37" rx="9" ry="2.5" fill="#00000055" />

          {/* Legs */}
          <line x1="7" y1="28" x2="5" y2="37" stroke="#c87b8a" strokeWidth="2" strokeLinecap="round">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 7 28;10 7 28;0 7 28;-10 7 28;0 7 28"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </line>
          <line x1="13" y1="28" x2="15" y2="37" stroke="#c87b8a" strokeWidth="2" strokeLinecap="round">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 13 28;-10 13 28;0 13 28;10 13 28;0 13 28"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </line>

          {/* Shoes */}
          <ellipse cx="5" cy="37.5" rx="3.5" ry="1.5" fill="#2a0f16" />
          <ellipse cx="15" cy="37.5" rx="3.5" ry="1.5" fill="#2a0f16" />

          {/* Dress / body */}
          <path d="M5,14 Q10,12 15,14 L17,28 Q10,32 3,28 Z" fill="url(#dressGrad)" />

          {/* Dress collar lace */}
          <path d="M7,14 Q10,16 13,14" fill="none" stroke="#f5ecdf" strokeWidth="0.8" />

          {/* Arms */}
          <line x1="5" y1="18" x2="1" y2="24" stroke="#e6a5ac" strokeWidth="1.8" strokeLinecap="round">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 5 18;15 5 18;0 5 18;-15 5 18;0 5 18"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </line>
          <line x1="15" y1="18" x2="19" y2="24" stroke="#e6a5ac" strokeWidth="1.8" strokeLinecap="round">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 15 18;-15 15 18;0 15 18;15 15 18;0 15 18"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </line>

          {/* Hair (long, flowing) */}
          <path d="M6,7 Q3,5 4,12 Q5,16 5,14" fill="#3d1212" />
          <path d="M14,7 Q17,5 16,12 Q15,16 15,14" fill="#3d1212" />
          <path d="M6,7 Q10,4 14,7 Q16,10 15,14 Q10,12 5,14 Q4,10 6,7 Z" fill="#4a1a1a" />

          {/* Hair ribbon / bow */}
          <path d="M8,6 Q10,4 12,6 Q10,7 8,6 Z" fill="#e6a5ac" />

          {/* Face */}
          <circle cx="10" cy="9" r="4.5" fill="#f5c8a0" />
          {/* Eyes */}
          <circle cx="8.5" cy="8.5" r="0.9" fill="#3d1212" />
          <circle cx="11.5" cy="8.5" r="0.9" fill="#3d1212" />
          {/* Eye shine */}
          <circle cx="9" cy="8.2" r="0.3" fill="white" />
          <circle cx="12" cy="8.2" r="0.3" fill="white" />
          {/* Smile */}
          <path d="M8.5,11 Q10,12.5 11.5,11" fill="none" stroke="#c87b8a" strokeWidth="0.7" strokeLinecap="round" />
          {/* Blush */}
          <circle cx="7.5" cy="10.5" r="1.2" fill="#e6a5ac" opacity="0.5" />
          <circle cx="12.5" cy="10.5" r="1.2" fill="#e6a5ac" opacity="0.5" />
        </g>

        {/* ── BIRTHDAY CAKE SVG (at the end of path) ── */}
        <g transform={`translate(${pathEndX - 38}, ${pathY - 52})`} filter="url(#glow)">
          {/* Plate */}
          <ellipse cx="19" cy="52" rx="22" ry="4" fill="#cda86a44" />

          {/* Cake bottom tier */}
          <rect x="4" y="36" width="30" height="16" rx="3" fill="#e6cfa0" />
          <rect x="4" y="34" width="30" height="4" rx="2" fill="#f5ecdf" />
          {/* Bottom decorations */}
          <circle cx="10" cy="42" r="2" fill="#e6a5ac" />
          <circle cx="19" cy="42" r="2" fill="#c87b8a" />
          <circle cx="28" cy="42" r="2" fill="#e6a5ac" />

          {/* Cake top tier */}
          <rect x="8" y="20" width="22" height="16" rx="3" fill="#cda86a" />
          <rect x="8" y="18" width="22" height="4" rx="2" fill="#e6cfa0" />
          {/* Top decorations */}
          <circle cx="14" cy="27" r="1.5" fill="#f5ecdf" />
          <circle cx="19" cy="27" r="1.5" fill="#f5ecdf" />
          <circle cx="24" cy="27" r="1.5" fill="#f5ecdf" />

          {/* Candles */}
          <rect x="12" y="10" width="3" height="9" rx="1.5" fill="#e6a5ac" />
          <rect x="19" y="8" width="3" height="11" rx="1.5" fill="#cda86a" />
          <rect x="26" y="10" width="3" height="9" rx="1.5" fill="#e6a5ac" />

          {/* Flames */}
          <ellipse cx="13.5" cy="9" rx="1.5" ry="2.5" fill="#ffcc44">
            <animate attributeName="ry" values="2.5;3.2;2.5;2.8;2.5" dur="0.6s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="20.5" cy="7" rx="1.5" ry="2.8" fill="#ff9900">
            <animate attributeName="ry" values="2.8;3.6;2.8;3;2.8" dur="0.7s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="27.5" cy="9" rx="1.5" ry="2.5" fill="#ffcc44">
            <animate attributeName="ry" values="2.5;3.2;2.5;2.9;2.5" dur="0.65s" repeatCount="indefinite" />
          </ellipse>

          {/* Flame inner glow */}
          <ellipse cx="13.5" cy="9.5" rx="0.6" ry="1.2" fill="#fff9" />
          <ellipse cx="20.5" cy="7.5" rx="0.6" ry="1.4" fill="#fff9" />
          <ellipse cx="27.5" cy="9.5" rx="0.6" ry="1.2" fill="#fff9" />

          {/* Cake glow aura */}
          <ellipse cx="19" cy="28" rx="24" ry="32" fill="#cda86a" opacity="0.05">
            <animate attributeName="opacity" values="0.05;0.12;0.05" dur="1.5s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* Label: progress % */}
        <text
          x={W / 2}
          y={H - 6}
          textAnchor="middle"
          fill="#cda86a88"
          fontFamily="Lato, sans-serif"
          fontSize="8"
          letterSpacing="1"
        >
          {Math.round(progress * 100)}% of the way there
        </text>
      </svg>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────

export default function CountdownPage({ onUnlock }: CountdownPageProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [showPinModal, setShowPinModal] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)

  // Update live countdown
  useEffect(() => {
    const target = getTargetDate().getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const diff = target - now

      if (diff <= 0) {
        onUnlock()
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [onUnlock])

  const handlePinSubmit = useCallback(() => {
    if (pinInput === SECRET_PIN) {
      setPinError(false)
      onUnlock()
    } else {
      setPinError(true)
      setPinInput('')
    }
  }, [pinInput, onUnlock])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(170deg, #2a0f16 0%, #3d1723 40%, #2a0f16 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 24,
      }}
    >
      {/* Ambient Petals */}
      <PetalField />

      {/* Glow */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, #5a1f3044 0%, transparent 70%)',
        }}
      />

      {/* Main Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 420,
          width: '100%',
          textAlign: 'center',
          background: 'rgba(38, 12, 22, 0.72)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          borderRadius: 28,
          padding: '48px 32px 40px',
          border: '1px solid rgba(205,168,106,0.3)',
          animation: 'glowPulse 4s ease-in-out infinite, slideUp 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards',
          overflow: 'hidden',
        }}
      >
        {/* Shimmer top edge */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #cda86a88, #e6cfa0cc, #cda86a88, transparent)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s linear infinite',
        }} />

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(205,168,106,0.1)',
          border: '1px solid rgba(205,168,106,0.25)',
          borderRadius: 999,
          padding: '5px 14px',
          marginBottom: 18,
        }}>
          <Sparkles size={11} color="#cda86a" />
          <span style={{
            color: '#cda86acc',
            fontFamily: 'Inter, sans-serif',
            fontSize: 10,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            Something Special is Coming
          </span>
          <Sparkles size={11} color="#cda86a" />
        </div>

        <h1
          style={{
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(26px, 6vw, 36px)',
            color: '#e6cfa0',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          A Birthday Surprise for {HER_NAME}
        </h1>

        <p
          style={{
            color: '#e6a5ac',
            fontFamily: 'Lato, sans-serif',
            fontSize: 13,
            letterSpacing: 2,
            fontStyle: 'italic',
            margin: '4px 0 28px',
          }}
        >
          ({HER_NICKNAME})
        </p>

        {/* ── Countdown Timer Box ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 10,
            margin: '28px 0',
          }}
        >
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                background: 'rgba(28, 8, 16, 0.75)',
                borderRadius: 16,
                padding: '18px 6px 14px',
                border: '1px solid rgba(205,168,106,0.2)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
                overflow: 'hidden',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Shimmer top */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: 1,
                background: 'linear-gradient(90deg, transparent, #cda86a66, transparent)',
                backgroundSize: '200% 100%',
                animation: `shimmer ${2 + i * 0.3}s linear infinite`,
              }} />
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 30,
                  fontWeight: 700,
                  color: '#e6cfa0',
                  lineHeight: 1,
                  letterSpacing: -1,
                  textShadow: '0 0 20px rgba(205,168,106,0.4)',
                }}
              >
                {String(item.value).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 9,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#cda86a66',
                  marginTop: 8,
                  fontWeight: 500,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Journey Progress SVG ── */}
        <JourneyProgress timeLeft={timeLeft} />

        <p
          style={{
            color: '#f5ecdfaa',
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: 13,
            lineHeight: 1.6,
            margin: '24px 0 0',
          }}
        >
          Unlocks automatically on December 14
        </p>

        <div
          style={{
            width: 40,
            height: 1,
            background: 'linear-gradient(to right, transparent, #cda86a66, transparent)',
            margin: '20px auto 0',
          }}
        />
      </div>

      {/* Secret Dev Override Trigger (Discreet bottom button) */}
      <button
        onClick={() => setShowPinModal(true)}
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          background: 'rgba(205,168,106,0.1)',
          border: '1px solid rgba(205,168,106,0.2)',
          color: '#cda86a88',
          fontSize: 10,
          fontFamily: 'Lato, sans-serif',
          letterSpacing: 1,
          padding: '6px 12px',
          borderRadius: 20,
          cursor: 'pointer',
          zIndex: 100,
          backdropFilter: 'blur(4px)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#cda86a' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#cda86a88' }}
      >
        Developer PIN Override
      </button>

      {/* ── Secret PIN Modal ── */}
      {showPinModal && (
        <div
          onClick={() => setShowPinModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(0,0,0,0.85)',
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
              maxWidth: 320,
              width: '100%',
              background: 'linear-gradient(160deg, #3d1723, #2a0f16)',
              borderRadius: 20,
              padding: '28px 24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px #cda86a55',
              textAlign: 'center',
            }}
          >
            <button
              onClick={() => setShowPinModal(false)}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: 'none',
                width: 28,
                height: 28,
                borderRadius: '50%',
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              ×
            </button>

            <h3
              style={{
                color: '#e6cfa0',
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontSize: 18,
                margin: '0 0 6px',
              }}
            >
              Developer Access
            </h3>
            <p
              style={{
                color: '#cda86a88',
                fontFamily: 'Lato, sans-serif',
                fontSize: 11,
                margin: '0 0 20px',
              }}
            >
              Enter the 4-digit PIN to bypass the countdown
            </p>

            <input
              type="password"
              maxLength={4}
              value={pinInput}
              onChange={e => {
                setPinInput(e.target.value)
                setPinError(false)
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') handlePinSubmit()
              }}
              placeholder="••••"
              autoFocus
              style={{
                width: 140,
                textAlign: 'center',
                fontSize: 24,
                letterSpacing: 8,
                padding: '10px 14px',
                background: 'rgba(0,0,0,0.4)',
                border: `1.5px solid ${pinError ? '#f788a5' : '#cda86a66'}`,
                borderRadius: 12,
                color: '#fff',
                outline: 'none',
                fontFamily: 'monospace',
                marginBottom: 16,
              }}
            />

            {pinError && (
              <p
                style={{
                  color: '#f788a5',
                  fontSize: 11,
                  fontFamily: 'Lato, sans-serif',
                  margin: '-10px 0 12px',
                }}
              >
                Incorrect PIN. Try again.
              </p>
            )}

            <div>
              <button
                onClick={handlePinSubmit}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #cda86a, #e6cfa0)',
                  border: 'none',
                  borderRadius: 24,
                  padding: '10px 0',
                  color: '#2a0f16',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(205,168,106,0.3)',
                }}
              >
                Unlock Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
