import { useState, useEffect, useCallback } from 'react'
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
          background: 'rgba(61, 23, 35, 0.45)',
          backdropFilter: 'blur(16px)',
          borderRadius: 24,
          padding: '44px 28px',
          border: '1px solid #cda86a44',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        }}
      >
        <span
          style={{
            color: '#cda86aaa',
            fontFamily: 'Lato, sans-serif',
            fontSize: 11,
            letterSpacing: 3,
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 12,
          }}
        >
          Something Special is Coming
        </span>

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
                background: 'rgba(42, 15, 22, 0.7)',
                borderRadius: 12,
                padding: '14px 6px',
                border: '1px solid #cda86a33',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 26,
                  fontWeight: 700,
                  color: '#e6cfa0',
                  lineHeight: 1,
                }}
              >
                {String(item.value).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontSize: 9,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: '#cda86a88',
                  marginTop: 6,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

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
