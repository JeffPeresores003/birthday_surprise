/** A single confetti piece. */
export interface Piece {
  id: number
  x: number
  color: string
  size: number
  delay: number
}

interface Props {
  pieces: Piece[]
}

/** Renders animated confetti pieces across the screen. */
export default function Confetti({ pieces }: Props) {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
      {pieces.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: '30%',
            left: `${p.x}%`,
            width: p.size,
            height: p.size * 0.5,
            backgroundColor: p.color,
            borderRadius: 1,
            animation: `confettiFall 2.4s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  )
}
