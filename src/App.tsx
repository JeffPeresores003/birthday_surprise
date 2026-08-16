import { useState, useEffect } from 'react'
import BirthdayPage from './pages/BirthdayPage'
import CountdownPage from './pages/CountdownPage'

/** Target Unlock Date: December 14 of current year */
const isPastTargetDate = () => {
  const now = new Date()
  const year = now.getMonth() === 11 && now.getDate() > 14 ? now.getFullYear() + 1 : now.getFullYear()
  const target = new Date(year, 11, 14, 0, 0, 0)
  return now.getTime() >= target.getTime()
}

export default function App() {
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    if (isPastTargetDate()) return true
    return localStorage.getItem('birthday_unlocked') === 'true'
  })

  const handleUnlock = () => {
    localStorage.setItem('birthday_unlocked', 'true')
    setUnlocked(true)
  }

  const handleRelock = () => {
    localStorage.removeItem('birthday_unlocked')
    setUnlocked(false)
  }

  if (!unlocked) {
    return <CountdownPage onUnlock={handleUnlock} />
  }

  return (
    <>
      <BirthdayPage />

      {/* Developer Re-lock button (discreet at bottom right) */}
      <button
        onClick={handleRelock}
        style={{
          position: 'fixed',
          bottom: 12,
          right: 12,
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(205,168,106,0.3)',
          color: '#cda86a88',
          fontSize: 9,
          fontFamily: 'Lato, sans-serif',
          letterSpacing: 1,
          padding: '4px 10px',
          borderRadius: 16,
          cursor: 'pointer',
          zIndex: 999,
          backdropFilter: 'blur(4px)',
          transition: 'all 0.2s',
        }}
        title="Test Countdown Page"
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#cda86a' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#cda86a88' }}
      >
        🔒 Lock App (Dev Test)
      </button>
    </>
  )
}
