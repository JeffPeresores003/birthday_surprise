import { useEffect } from 'react'

/** A single floating heart that auto-removes after its animation completes. */
export interface Heart {
  id: number
  x: number
  y: number
  size: number
  hue: string
}

interface Props {
  heart: Heart
  onDone: () => void
}

export default function FloatingHeart({ heart, onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 1200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      style={{
        position: 'absolute',
        left: heart.x,
        top: heart.y,
        fontSize: heart.size,
        color: heart.hue,
        pointerEvents: 'none',
        animation: 'heartFloat 1.2s ease-out forwards',
        zIndex: 20,
        userSelect: 'none',
      }}
    >
      ♥
    </div>
  )
}
