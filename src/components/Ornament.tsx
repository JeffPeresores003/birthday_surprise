/** Decorative section divider — sparkle line with animated center gem. */
export default function Ornament() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        margin: '12px 0',
        width: '100%',
      }}
    >
      {/* Left line */}
      <div
        style={{
          flex: 1,
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(205,168,106,0.3))',
          maxWidth: 80,
        }}
      />

      {/* Center gems */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span
          style={{
            color: 'rgba(205,168,106,0.35)',
            fontSize: 10,
            lineHeight: 1,
          }}
        >
          ✦
        </span>
        <span
          style={{
            color: 'rgba(205,168,106,0.65)',
            fontSize: 14,
            lineHeight: 1,
            animation: 'heartBeat 2.5s ease-in-out infinite',
            display: 'inline-block',
          }}
        >
          ✦
        </span>
        <span
          style={{
            color: 'rgba(205,168,106,0.35)',
            fontSize: 10,
            lineHeight: 1,
          }}
        >
          ✦
        </span>
      </div>

      {/* Right line */}
      <div
        style={{
          flex: 1,
          height: 1,
          background: 'linear-gradient(to left, transparent, rgba(205,168,106,0.3))',
          maxWidth: 80,
        }}
      />
    </div>
  )
}
