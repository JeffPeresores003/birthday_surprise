import { useState } from 'react'

/** Wish input box — user types a wish and submits it to "the stars". */
export default function WishInput() {
  const [wish, setWish] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [savedWish, setSavedWish] = useState('')

  const handleSubmit = () => {
    if (!wish.trim()) return
    setSavedWish(wish.trim())
    setWish('')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        style={{
          animation: 'wishPop 0.5s ease both',
          textAlign: 'center',
          padding: '28px 20px',
          background: 'linear-gradient(135deg, #3d1723, #5a1f3044)',
          borderRadius: 16,
          border: '1.5px solid #cda86a55',
          maxWidth: 340,
          margin: '0 auto',
        }}
      >
        <p
          style={{
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            color: '#e6cfa0',
            fontSize: 18,
            marginBottom: 8,
          }}
        >
          Your wish has been sent to the stars
        </p>
        <p
          style={{
            color: '#cda86a',
            fontSize: 13,
            fontFamily: 'Lato, sans-serif',
            opacity: 0.85,
            marginBottom: 20,
            lineHeight: 1.6,
          }}
        >
          "{savedWish}"
        </p>
        <button
          onClick={() => setSubmitted(false)}
          style={{
            background: 'transparent',
            border: '1px solid #cda86a88',
            color: '#cda86a',
            padding: '8px 20px',
            borderRadius: 24,
            cursor: 'pointer',
            fontSize: 12,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            fontFamily: 'Lato, sans-serif',
          }}
        >
          Make another wish
        </button>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <p
        style={{
          color: '#e6cfa0',
          fontSize: 13,
          fontFamily: 'Lato, sans-serif',
          letterSpacing: 0.5,
          textAlign: 'center',
          opacity: 0.8,
          maxWidth: 280,
        }}
      >
        Close your eyes, take a breath, and whisper your wish...
      </p>

      <div style={{ position: 'relative', width: '100%', maxWidth: 320 }}>
        <textarea
          value={wish}
          onChange={e => setWish(e.target.value)}
          placeholder="I wish for..."
          rows={3}
          style={{
            width: '100%',
            background: '#3d172355',
            border: '1.5px solid #cda86a66',
            borderRadius: 12,
            padding: '14px 16px',
            color: '#f5ecdf',
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: 15,
            resize: 'none',
            outline: 'none',
            lineHeight: 1.6,
            boxSizing: 'border-box',
            backdropFilter: 'blur(8px)',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => { e.target.style.borderColor = '#cda86a' }}
          onBlur={e  => { e.target.style.borderColor = '#cda86a66' }}
          onKeyDown={e => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit()
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!wish.trim()}
        style={{
          background: wish.trim()
            ? 'linear-gradient(135deg, #cda86a, #e6cfa0)'
            : '#cda86a33',
          border: 'none',
          borderRadius: 30,
          padding: '12px 36px',
          color: wish.trim() ? '#2a0f16' : '#cda86a55',
          fontFamily: 'Lato, sans-serif',
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: 2,
          textTransform: 'uppercase',
          cursor: wish.trim() ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s',
          boxShadow: wish.trim() ? '0 4px 20px #cda86a44' : 'none',
        }}
      >
        ✦ Send My Wish ✦
      </button>
    </div>
  )
}
