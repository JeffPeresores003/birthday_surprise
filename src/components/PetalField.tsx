import { PETAL_COLORS } from '../constants'

/**
 * Ambient falling petals in the background.
 * Petals are generated once on mount and loop indefinitely.
 */
export default function PetalField() {
  const petals = Array.from({ length: 22 }, (_, i) => {
    const size  = 8 + Math.random() * 10
    const left  = Math.random() * 100
    const delay = Math.random() * 14
    const dur   = 10 + Math.random() * 10
    const color = PETAL_COLORS[i % PETAL_COLORS.length]
    return { id: i, size, left, delay, dur, color }
  })

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {petals.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: 0,
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.3,
            borderRadius: '50% 0 50% 0',
            backgroundColor: p.color,
            opacity: 0,
            animation: `petalFall ${p.dur}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  )
}
