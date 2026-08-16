import { useState, useCallback } from 'react'
import { LOVE_LETTER } from '../constants'

/**
 * EnvelopeLetter — a 3-stage interactive letter experience.
 *
 * Stage flow:
 *   closed  → (click envelope)  → open
 *   open    → (click "Read")    → reading   (letter expands fullscreen)
 *   reading → (click X or bg)   → closing   (letter shrinks back)
 *   closing → (after 550ms)     → closed
 */

type Stage = 'closed' | 'open' | 'reading' | 'closing'

export default function EnvelopeLetter() {
  const [stage, setStage] = useState<Stage>('closed')

  const handleEnvelopeClick = useCallback(() => {
    if (stage === 'closed') setStage('open')
    else if (stage === 'open') setStage('reading')
  }, [stage])

  const handleReadClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setStage('reading')
    },
    [],
  )

  const handleClose = useCallback(() => {
    setStage('closing')
    setTimeout(() => setStage('closed'), 560)
  }, [])

  const isOpen = stage !== 'closed'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        position: 'relative',
      }}
    >
      {/* ── Envelope ── */}
      <div
        onClick={handleEnvelopeClick}
        style={{
          width: 240,
          height: 160,
          cursor: stage === 'reading' || stage === 'closing' ? 'default' : 'pointer',
          userSelect: 'none',
          position: 'relative',
          filter: 'drop-shadow(0 8px 24px #2a0f1688)',
          flexShrink: 0,
        }}
      >
        {/* Body */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 8,
            background: 'linear-gradient(145deg, #5a1f30, #3d1723)',
            border: '1.5px solid #cda86a66',
          }}
        />

        {/* Inner fold lines (V shape) */}
        <svg
          style={{ position: 'absolute', inset: 0 }}
          width="240"
          height="160"
          viewBox="0 0 240 160"
        >
          <line x1="0" y1="160" x2="120" y2="90" stroke="#cda86a44" strokeWidth="1" />
          <line x1="240" y1="160" x2="120" y2="90" stroke="#cda86a44" strokeWidth="1" />
          <line x1="0" y1="0" x2="120" y2="90" stroke="#cda86a33" strokeWidth="1" />
          <line x1="240" y1="0" x2="120" y2="90" stroke="#cda86a33" strokeWidth="1" />
        </svg>

        {/* Flap — rotates open on interact */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50%',
            transformOrigin: 'top center',
            transform: isOpen ? 'rotateX(-160deg)' : 'rotateX(0deg)',
            transition: 'transform 0.55s ease',
            perspective: 600,
            zIndex: 2,
          }}
        >
          <svg
            width="240"
            height="80"
            viewBox="0 0 240 80"
            style={{ display: 'block' }}
          >
            <polygon
              points="0,0 240,0 120,80"
              fill="#5a1f30"
              stroke="#cda86a66"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Wax seal — fades & scales out when open */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${isOpen ? 0.4 : 1})`,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 35%, #e6a5ac, #8a1f38)',
            border: '2px solid #cda86a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            color: '#f5ecdf',
            boxShadow: '0 2px 8px #2a0f1688',
            transition: 'opacity 0.35s, transform 0.35s',
            opacity: isOpen ? 0 : 1,
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          ♡
        </div>

        {/* Hint text at bottom of envelope */}
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            width: '100%',
            textAlign: 'center',
            color: '#cda86a77',
            fontSize: 11,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            fontFamily: 'Lato, sans-serif',
            opacity: stage === 'reading' || stage === 'closing' ? 0 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {stage === 'closed' ? 'tap to open ✦' : 'tap to read ✦'}
        </div>
      </div>

      {/* ── Peeking letter card (stage: open) ── */}
      {stage === 'open' && (
        <div
          onClick={handleReadClick}
          style={{
            width: 210,
            background: 'linear-gradient(160deg, #f5ecdf, #ede0cc)',
            borderRadius: '0 0 10px 10px',
            padding: '18px 22px 22px',
            boxShadow: '0 10px 28px #2a0f1688',
            cursor: 'pointer',
            animation: 'peekOut 0.45s cubic-bezier(0.2, 0.9, 0.3, 1) forwards',
            marginTop: -2,
            zIndex: 1,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              color: '#3d1723cc',
              fontSize: 13,
              margin: 0,
              marginBottom: 10,
              lineHeight: 1.5,
            }}
          >
            A letter written for you...
          </p>
          <div
            style={{
              color: '#8a1f38',
              fontSize: 10,
              letterSpacing: 1.8,
              textTransform: 'uppercase',
              fontFamily: 'Lato, sans-serif',
            }}
          >
            click to read ✦
          </div>
        </div>
      )}

      {/* ── Fullscreen letter overlay (stage: reading | closing) ── */}
      {(stage === 'reading' || stage === 'closing') && (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 16px',
            background: 'rgba(42, 15, 22, 0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            animation:
              stage === 'closing'
                ? 'backdropOut 0.56s ease forwards'
                : 'backdropIn 0.4s ease forwards',
          }}
        >
          {/* Letter card — stops click propagation so backdrop click closes, not card */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: 520,
              width: '100%',
              maxHeight: '88vh',
              overflowY: 'auto',
              background: 'linear-gradient(160deg, #fdf8f0, #f5ecdf)',
              borderRadius: 18,
              padding: '48px 44px 44px',
              boxShadow:
                '0 32px 80px rgba(42,15,22,0.7), 0 0 0 1px #cda86a22',
              position: 'relative',
              animation:
                stage === 'closing'
                  ? 'letterCollapse 0.56s cubic-bezier(0.4, 0, 1, 1) forwards'
                  : 'letterExpand 0.56s cubic-bezier(0, 0.85, 0.3, 1) forwards',
            }}
          >
            {/* Close (X) button */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'rgba(61,23,35,0.1)',
                border: '1px solid rgba(61,23,35,0.15)',
                width: 34,
                height: 34,
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: 20,
                color: '#3d1723',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.background = 'rgba(61,23,35,0.18)'
                el.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.background = 'rgba(61,23,35,0.1)'
                el.style.transform = 'scale(1)'
              }}
            >
              ×
            </button>

            {/* Letter header */}
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div
                style={{
                  width: 80,
                  height: 1,
                  background:
                    'linear-gradient(to right, transparent, #cda86a88, transparent)',
                  margin: '0 auto',
                }}
              />
            </div>

            {/* Letter body */}
            <p
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 14.5,
                lineHeight: 2.05,
                color: '#3d1723',
                whiteSpace: 'pre-wrap',
                margin: 0,
                marginBottom: 28,
              }}
            >
              {LOVE_LETTER}
            </p>

            {/* Footer ornament */}
            <div
              style={{
                textAlign: 'center',
                color: '#cda86a66',
                fontSize: 16,
                letterSpacing: 10,
              }}
            >
              ✦ ✦ ✦
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
