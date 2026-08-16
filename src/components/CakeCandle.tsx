import { useState, useRef, useCallback } from 'react'
import Confetti, { type Piece } from './Confetti'
import { CONFETTI_COLORS } from '../constants'

/**
 * Birthday cake with a flickering candle.
 * Tap the cake to blow out the candle (spawns confetti) or relight it.
 */
export default function CakeCandle() {
  const [lit, setLit] = useState(true)
  const [confetti, setConfetti] = useState<Piece[]>([])
  const pieceId = useRef(0)

  const handleTap = useCallback(() => {
    if (lit) {
      // Blow out — spawn confetti burst
      const pieces: Piece[] = Array.from({ length: 40 }, () => ({
        id: ++pieceId.current,
        x: 20 + Math.random() * 60,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 6 + Math.random() * 8,
        delay: Math.random() * 0.4,
      }))
      setConfetti(pieces)
      setTimeout(() => setConfetti([]), 3000)
    }
    setLit(v => !v)
  }, [lit])

  return (
    <>
      {confetti.length > 0 && <Confetti pieces={confetti} />}

      <div
        onClick={handleTap}
        style={{
          cursor: 'pointer',
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
        title={lit ? 'Tap to blow out the candle' : 'Tap to relight'}
      >
        {/* ── Candle with flame ── */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Flame container centered over wick */}
          <div
            style={{
              width: 18,
              height: 32,
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              opacity: lit ? 1 : 0,
              transform: lit ? 'scale(1)' : 'scale(0.2)',
              position: 'relative',
              marginBottom: -2,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {/* Outer flame */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                transformOrigin: 'bottom center',
                width: 18,
                height: 32,
                borderRadius: '50% 50% 30% 30% / 60% 60% 40% 40%',
                background:
                  'radial-gradient(ellipse at 50% 80%, #fff6a0 0%, #ffbe00 40%, #ff6a00 80%)',
                animation: lit ? 'flicker 1.4s ease-in-out infinite' : 'none',
                boxShadow: lit
                  ? '0 0 12px #ffbe0099, 0 0 24px #ff6a0066'
                  : 'none',
              }}
            />
            {/* Inner flame core */}
            <div
              style={{
                position: 'absolute',
                bottom: 4,
                left: '50%',
                transform: 'translateX(-50%)',
                transformOrigin: 'bottom center',
                width: 8,
                height: 16,
                borderRadius: '50% 50% 30% 30% / 60% 60% 40% 40%',
                background:
                  'radial-gradient(ellipse at 50% 80%, #ffffff 0%, #fff6a0 60%)',
                animation: lit ? 'flicker 1.2s ease-in-out infinite reverse' : 'none',
              }}
            />
          </div>

          {/* Candle body */}
          <div
            style={{
              width: 22,
              height: 70,
              borderRadius: '3px 3px 2px 2px',
              background:
                'linear-gradient(to right, #e6cfa0, #f5ecdf, #cda86a, #e6cfa0)',
              boxShadow: '2px 0 8px #2a0f1660',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {/* Wax drip */}
            <div
              style={{
                position: 'absolute',
                top: -3,
                left: 4,
                width: 10,
                height: 8,
                borderRadius: '0 0 50% 50%',
                background: '#f5ecdf99',
              }}
            />
            {/* Wick */}
            <div
              style={{
                position: 'absolute',
                top: -6,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 2,
                height: 8,
                backgroundColor: '#3d1723',
                borderRadius: 1,
              }}
            />
          </div>
        </div>

        {/* ── Cake tiers ── */}

        {/* Top tier */}
        <div
          style={{
            width: 80,
            height: 32,
            borderRadius: 6,
            background: 'linear-gradient(135deg, #8a3040, #5a1f30)',
            border: '2px solid #cda86a44',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -2,
          }}
        >
          <span style={{ color: '#e6cfa0', fontSize: 12, letterSpacing: 1 }}>
            ✦✦✦
          </span>
        </div>

        {/* Middle tier */}
        <div
          style={{
            width: 120,
            height: 40,
            borderRadius: 6,
            background: 'linear-gradient(135deg, #a03050, #701828)',
            border: '2px solid #cda86a44',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -2,
          }}
        >
          <span style={{ color: '#cda86a66', fontSize: 18 }}>♡ ♡ ♡</span>
        </div>

        {/* Bottom tier */}
        <div
          style={{
            width: 160,
            height: 48,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #c03060, #8a1f38)',
            border: '2px solid #cda86a55',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -2,
          }}
        >
          <span
            style={{
              color: '#e6cfa088',
              fontSize: 13,
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
            }}
          >
            Happy Birthday
          </span>
        </div>

        {/* Plate */}
        <div
          style={{
            width: 190,
            height: 12,
            borderRadius: '50%',
            background:
              'linear-gradient(to right, #cda86a44, #e6cfa066, #cda86a44)',
            marginTop: -2,
          }}
        />

        <p
          style={{
            color: '#cda86a88',
            fontSize: 11,
            marginTop: 8,
            fontFamily: 'Lato, sans-serif',
            letterSpacing: 1.5,
            textTransform: 'uppercase',
          }}
        >
          {lit ? 'tap to blow out ✦' : 'tap to relight ✦'}
        </p>
      </div>
    </>
  )
}
