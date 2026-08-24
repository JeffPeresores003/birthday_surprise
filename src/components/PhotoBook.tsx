import { useState, useRef, useCallback, useEffect } from 'react'
import { Sparkles, Heart as HeartIcon, Maximize2 } from 'lucide-react'
import FloatingHeart, { type Heart } from './FloatingHeart'
import { PETAL_COLORS } from '../constants'

export interface ScrapPage {
  id: number
  title: string
  tag: string
  message: string
  note: string
  dateLabel?: string
  bgGradient: string
  paperColor: string
  accentColor: string
  tapeColor: string
  badgeText: string
  imageSrc: string
}

export const SCRAP_PAGES: ScrapPage[] = [
  {
    id: 0,
    title: 'That Smile of Yours',
    tag: 'Memory 01 · My Favorite View',
    dateLabel: 'Dec 14 · Special Day',
    message:
      "Every time you smile, it's like the whole room just lights up. I never get tired of seeing it — not even a single bit.",
    note: 'Saved in my heart forever',
    bgGradient: 'linear-gradient(145deg, #2a0f16 0%, #4a1827 50%, #2f1019 100%)',
    paperColor: '#fff9f2',
    accentColor: '#c85a2b',
    tapeColor: 'rgba(230,165,106,0.65)',
    badgeText: 'FAVORITE',
    imageSrc: '/photos/1.png',
  },
  {
    id: 1,
    title: 'Pure Elegance',
    tag: 'Memory 02 · Effortlessly Beautiful',
    dateLabel: 'Forever Graceful',
    message:
      "You carry yourself with a kind of gentle grace I've never seen in anyone else. You don't even have to try — you just radiate peace.",
    note: 'My dearest Jaiiii',
    bgGradient: 'linear-gradient(145deg, #101633 0%, #232c63 50%, #151b3d 100%)',
    paperColor: '#f4f6ff',
    accentColor: '#3b5cb8',
    tapeColor: 'rgba(168,184,240,0.65)',
    badgeText: 'ELEGANCE',
    imageSrc: '/photos/2.png',
  },
  {
    id: 2,
    title: 'Golden Sunshine',
    tag: 'Memory 03 · Warm & Glowing',
    dateLabel: 'Bright Days',
    message:
      "You make ordinary days feel golden. Just having you around turns everything brighter — I hope you know how much warmth you bring.",
    note: 'My sunshine always',
    bgGradient: 'linear-gradient(145deg, #2d1c06 0%, #543912 50%, #322108 100%)',
    paperColor: '#fffdf0',
    accentColor: '#b07a18',
    tapeColor: 'rgba(215,178,110,0.65)',
    badgeText: 'SUNSHINE',
    imageSrc: '/photos/3.png',
  },
  {
    id: 3,
    title: 'Gentle Spirit',
    tag: 'Memory 04 · Rare & Precious',
    dateLabel: 'Pure Heart',
    message:
      "Your genuine kindness is one of the most precious things about you. You care so deeply and softly — the world is truly better with you in it.",
    note: 'A gentle soul',
    bgGradient: 'linear-gradient(145deg, #0a1f14 0%, #18422e 50%, #0d2619 100%)',
    paperColor: '#f2fbf5',
    accentColor: '#287a48',
    tapeColor: 'rgba(144,224,168,0.65)',
    badgeText: 'GENTLE',
    imageSrc: '/photos/4.png',
  },
  {
    id: 4,
    title: 'Unfiltered Joy',
    tag: 'Memory 05 · Your Contagious Laugh',
    dateLabel: 'Sweet Memories',
    message:
      "Your laughter is the sweetest sound in the universe. When you laugh with all your heart, everything else just fades into happiness.",
    note: 'Never stop laughing',
    bgGradient: 'linear-gradient(145deg, #1f082e 0%, #3e1657 50%, #250b36 100%)',
    paperColor: '#fbf4ff',
    accentColor: '#8432bd',
    tapeColor: 'rgba(192,144,240,0.65)',
    badgeText: 'LAUGHTER',
    imageSrc: '/photos/5.png',
  },
  {
    id: 5,
    title: 'Timeless Beauty',
    tag: 'Memory 06 · Inside & Out',
    dateLabel: 'Endless Charm',
    message:
      "You are beautiful in countless ways that words can barely capture. Looking at you always reminds me how lucky I am to know you.",
    note: 'Timelessly you',
    bgGradient: 'linear-gradient(145deg, #300e18 0%, #571c2c 50%, #38121e 100%)',
    paperColor: '#fff2f5',
    accentColor: '#bf2c4c',
    tapeColor: 'rgba(242,164,183,0.65)',
    badgeText: 'TIMELESS',
    imageSrc: '/photos/6.png',
  },
  {
    id: 6,
    title: 'Captivating Charm',
    tag: 'Memory 07 · Magnetic Presence',
    dateLabel: 'Magic in You',
    message:
      "There's something about you that simply draws people in. You have this quiet, magical aura — comforting, charming, and effortlessly you.",
    note: 'One in a million',
    bgGradient: 'linear-gradient(145deg, #101c24 0%, #223c4d 50%, #15242e 100%)',
    paperColor: '#f2f8fc',
    accentColor: '#286f96',
    tapeColor: 'rgba(128,203,229,0.65)',
    badgeText: 'CHARMING',
    imageSrc: '/photos/7.png',
  },
  {
    id: 7,
    title: 'Soft & Warm',
    tag: 'Memory 08 · My Safe Place',
    dateLabel: 'Comfort & Peace',
    message:
      "Being around you feels like a warm hug on a cold day. You have this natural gift of making everything feel calm, safe, and alright.",
    note: 'Safe with you',
    bgGradient: 'linear-gradient(145deg, #2b1406 0%, #522910 50%, #301708 100%)',
    paperColor: '#fff7ed',
    accentColor: '#a65419',
    tapeColor: 'rgba(242,190,136,0.65)',
    badgeText: 'COMFORT',
    imageSrc: '/photos/8.png',
  },
  {
    id: 8,
    title: 'Precious Soul',
    tag: 'Memory 09 · A True Blessing',
    dateLabel: 'Grateful for You',
    message:
      "I am deeply grateful for every memory we share. You bring so much sweetness and sincerity into life — thank you for being you.",
    note: 'Truly precious',
    bgGradient: 'linear-gradient(145deg, #2d0818 0%, #591635 50%, #360b1e 100%)',
    paperColor: '#fff2f8',
    accentColor: '#c22765',
    tapeColor: 'rgba(255,148,184,0.65)',
    badgeText: 'PRECIOUS',
    imageSrc: '/photos/9.png',
  },
  {
    id: 9,
    title: 'Grace & Poise',
    tag: 'Memory 10 · Quiet Strength',
    dateLabel: 'Admiration',
    message:
      "I admire how calmly and bravely you handle everything. You have such inner strength wrapped in pure gentleness.",
    note: 'Beautiful strength',
    bgGradient: 'linear-gradient(145deg, #1d0f2b 0%, #3d1f59 50%, #241336 100%)',
    paperColor: '#fbf4ff',
    accentColor: '#7835b8',
    tapeColor: 'rgba(214,163,255,0.65)',
    badgeText: 'STRENGTH',
    imageSrc: '/photos/10.png',
  },
  {
    id: 10,
    title: 'Bright Energy',
    tag: 'Memory 11 · Sparkling Spirit',
    dateLabel: 'Good Vibes Only',
    message:
      "Whenever you are near, the world feels lighter. Your smile has its own way of chasing away any gloom and replacing it with joy.",
    note: 'Bright & sparkling',
    bgGradient: 'linear-gradient(145deg, #091f16 0%, #154531 50%, #0c291e 100%)',
    paperColor: '#f2fcf7',
    accentColor: '#1a8253',
    tapeColor: 'rgba(122,224,183,0.65)',
    badgeText: 'RADIANCE',
    imageSrc: '/photos/11.png',
  },
  {
    id: 11,
    title: 'Shining Star',
    tag: 'Memory 12 · Standing Out',
    dateLabel: 'My Favorite Star',
    message:
      "You don't need to try to stand out — your authenticity, kindness, and beauty shine naturally like the brightest star in the sky.",
    note: 'Shining for me',
    bgGradient: 'linear-gradient(145deg, #2b0a27 0%, #4f1547 50%, #330d2f 100%)',
    paperColor: '#fff4fc',
    accentColor: '#a6249b',
    tapeColor: 'rgba(242,142,224,0.65)',
    badgeText: 'STAR',
    imageSrc: '/photos/12.png',
  },
  {
    id: 12,
    title: 'Sweet Perfection',
    tag: 'Memory 13 · Uniquely Jaiiii',
    dateLabel: 'Sweet Moments',
    message:
      "Every single thing that makes you who you are — your thoughts, your quirks, your sweet gestures — is nothing short of lovely.",
    note: 'Sweet perfection',
    bgGradient: 'linear-gradient(145deg, #2e1209 0%, #572414 50%, #36160b 100%)',
    paperColor: '#fff6ef',
    accentColor: '#b04917',
    tapeColor: 'rgba(247,170,136,0.65)',
    badgeText: 'SWEET',
    imageSrc: '/photos/13.png',
  },
  {
    id: 13,
    title: 'Warm Harmony',
    tag: 'Memory 14 · Peaceful Moments',
    dateLabel: 'Serenade',
    message:
      "Being with you brings a serene melody to life. You bring peace to every thought and happiness to every passing second.",
    note: 'Harmony & peace',
    bgGradient: 'linear-gradient(145deg, #2b2406 0%, #524510 50%, #332b08 100%)',
    paperColor: '#fffef0',
    accentColor: '#9e7f16',
    tapeColor: 'rgba(235,215,120,0.65)',
    badgeText: 'HARMONY',
    imageSrc: '/photos/14.png',
  },
  {
    id: 14,
    title: 'Unforgettable',
    tag: 'Memory 15 · Everlasting Impression',
    dateLabel: 'Cherished',
    message:
      "Some people leave a golden imprint on your life that time can never erase. You are that person for me, Jaiiii.",
    note: 'Never forgotten',
    bgGradient: 'linear-gradient(145deg, #0d1e29 0%, #1a3c52 50%, #112633 100%)',
    paperColor: '#f0f9ff',
    accentColor: '#1d73a8',
    tapeColor: 'rgba(136,210,247,0.65)',
    badgeText: 'MEMORABLE',
    imageSrc: '/photos/15.png',
  },
  {
    id: 15,
    title: 'Beautiful Soul',
    tag: 'Memory 16 · Inside & Out',
    dateLabel: 'Pure Heart',
    message:
      "Your genuine warmth touches everyone who knows you. Thank you for always being such a glowing inspiration of kindness.",
    note: 'Forever lovely',
    bgGradient: 'linear-gradient(145deg, #2b0813 0%, #521528 50%, #330b18 100%)',
    paperColor: '#fff2f6',
    accentColor: '#bf1f49',
    tapeColor: 'rgba(247,136,165,0.65)',
    badgeText: 'BEAUTY',
    imageSrc: '/photos/16.png',
  },
  {
    id: 16,
    title: 'Pure Serenity',
    tag: 'Memory 17 · Gentle Waves',
    dateLabel: 'Calm Nights',
    message:
      "Even when the world gets noisy and busy, thinking of you brings an instant feeling of calm and clarity.",
    note: 'My serene peace',
    bgGradient: 'linear-gradient(145deg, #180c26 0%, #321b4a 50%, #1e0e2e 100%)',
    paperColor: '#f8f4ff',
    accentColor: '#7c3fb8',
    tapeColor: 'rgba(197,136,247,0.65)',
    badgeText: 'SERENITY',
    imageSrc: '/photos/17.png',
  },
  {
    id: 17,
    title: 'Celebrating You, Jaiiii',
    tag: 'Memory 18 · Happy Birthday Lablab',
    dateLabel: 'December 14 · Celebration',
    message:
      "Happy Birthday, my lablab! May this year shower you with endless joy, love, good health, and all your heart's dreams. You deserve the best!",
    note: 'With all my love — Jeff',
    bgGradient: 'linear-gradient(145deg, #300810 0%, #5c1424 50%, #3b0a15 100%)',
    paperColor: '#fff2f5',
    accentColor: '#d6184a',
    tapeColor: 'rgba(252,162,180,0.65)',
    badgeText: 'CELEBRATE',
    imageSrc: '/photos/18.png',
  },
  {
    id: 18,
    title: 'Quiet Moments',
    tag: 'Memory 19 · Soft & Genuine',
    dateLabel: 'Candid Memory',
    message:
      "I love the quiet, real moments the most. Just you being your natural, unguarded self is more beautiful than anything else.",
    note: 'Forever cherished',
    bgGradient: 'linear-gradient(145deg, #1f1224 0%, #3b2245 50%, #24142a 100%)',
    paperColor: '#faf4fc',
    accentColor: '#8a409e',
    tapeColor: 'rgba(206,160,227,0.65)',
    badgeText: 'CANDID',
    imageSrc: '/photos/209e5b06-e00f-47a3-ab08-20b32430bdb9.jfif',
  },
  {
    id: 19,
    title: 'Sweet Innocence',
    tag: 'Memory 20 · Pure Heart',
    dateLabel: 'Precious Moments',
    message:
      "There is a sweetness in your eyes that always melts my heart. You have a way of making everything feel light and innocent.",
    note: 'My sweetest dream',
    bgGradient: 'linear-gradient(145deg, #2b171f 0%, #4f2c3a 50%, #2f1922 100%)',
    paperColor: '#fff5f8',
    accentColor: '#b54e76',
    tapeColor: 'rgba(235,164,193,0.65)',
    badgeText: 'SWEETNESS',
    imageSrc: '/photos/22fadd7b-4494-4c00-91ab-8db2c3556fb9.jfif',
  },
  {
    id: 20,
    title: 'Endless Delight',
    tag: 'Memory 21 · Your Pretty Glow',
    dateLabel: 'Bright & Lovely',
    message:
      "Looking at this photo reminds me how effortlessly pretty you are. You glow from within, and it shows in every single picture.",
    note: 'Always glowing',
    bgGradient: 'linear-gradient(145deg, #241c0c 0%, #473919 50%, #2b220e 100%)',
    paperColor: '#fffcf2',
    accentColor: '#9c7b28',
    tapeColor: 'rgba(224,196,128,0.65)',
    badgeText: 'GLOW',
    imageSrc: '/photos/35a67e99-762f-401a-b8e9-d8e4ec6c8cd9.jfif',
  },
  {
    id: 21,
    title: 'Heart of Gold',
    tag: 'Memory 22 · Gentle Thoughts',
    dateLabel: 'A Blessing',
    message:
      "You always think of others before yourself. That kind of selflessness is so rare, and it is one of the thousand reasons I treasure you.",
    note: 'Pure and true',
    bgGradient: 'linear-gradient(145deg, #0e1c26 0%, #1c384d 50%, #10212e 100%)',
    paperColor: '#f2f8fc',
    accentColor: '#2b739e',
    tapeColor: 'rgba(142,197,227,0.65)',
    badgeText: 'KINDNESS',
    imageSrc: '/photos/3e2f5a5c-6a33-4d45-8e41-ebdafd94085e.jfif',
  },
  {
    id: 22,
    title: 'Warm Memories',
    tag: 'Memory 23 · Captivating Smile',
    dateLabel: 'Timeless Keepsake',
    message:
      "Every time I look at this picture, it brings an instant smile to my face. You have this magical hold on my heart.",
    note: 'In my thoughts',
    bgGradient: 'linear-gradient(145deg, #2e1014 0%, #522026 50%, #331317 100%)',
    paperColor: '#fff4f4',
    accentColor: '#ba3244',
    tapeColor: 'rgba(237,152,164,0.65)',
    badgeText: 'KEEPSAKE',
    imageSrc: '/photos/538673d5-feb6-432a-adf0-83b9824bcd95.jfif',
  },
  {
    id: 23,
    title: 'Quiet Grace',
    tag: 'Memory 24 · Peaceful Soul',
    dateLabel: 'Soothing Presence',
    message:
      "Your presence is like a quiet sanctuary. When the world is chaos, you are the calm that brings everything back into perspective.",
    note: 'My peace',
    bgGradient: 'linear-gradient(145deg, #121f18 0%, #243d30 50%, #15241c 100%)',
    paperColor: '#f3fbf6',
    accentColor: '#2b8756',
    tapeColor: 'rgba(148,219,181,0.65)',
    badgeText: 'SANCTUARY',
    imageSrc: '/photos/56829e82-5da7-448e-84be-b926d078cf8f.jfif',
  },
  {
    id: 24,
    title: 'Charming Moments',
    tag: 'Memory 25 · Adorable You',
    dateLabel: 'Sweet Memory',
    message:
      "Everything about this photo captures your charming personality. You are so genuinely lovable in every possible way.",
    note: 'Endlessly adorable',
    bgGradient: 'linear-gradient(145deg, #26152b 0%, #472952 50%, #2c1833 100%)',
    paperColor: '#faf2fc',
    accentColor: '#8a439e',
    tapeColor: 'rgba(211,162,224,0.65)',
    badgeText: 'CHARM',
    imageSrc: '/photos/76525887-f9d2-4e20-9087-8c250b0e9b66.jfif',
  },
  {
    id: 25,
    title: 'Pure Radiance',
    tag: 'Memory 26 · Lovely Sight',
    dateLabel: 'Treasured View',
    message:
      "There is an effortless elegance in the way you exist. Thank you for filling my days with so much beauty and light.",
    note: 'Forever grateful',
    bgGradient: 'linear-gradient(145deg, #2e1c0e 0%, #54341b 50%, #332011 100%)',
    paperColor: '#fff9f2',
    accentColor: '#ab6329',
    tapeColor: 'rgba(227,180,141,0.65)',
    badgeText: 'RADIANT',
    imageSrc: '/photos/9d326654-bb54-46db-9cb1-f55d16d8837f.jfif',
  },
  {
    id: 26,
    title: 'My Whole Heart',
    tag: 'Memory 27 · Everlasting Love',
    dateLabel: 'Always & Forever',
    message:
      "All these memories lead back to one simple truth: meeting you, courting you, and loving you is the greatest chapter of my life.",
    note: 'With all my heart — Jeff',
    bgGradient: 'linear-gradient(145deg, #2b0816 0%, #541630 50%, #330b1c 100%)',
    paperColor: '#fff2f7',
    accentColor: '#c2235e',
    tapeColor: 'rgba(245,152,187,0.65)',
    badgeText: 'FOREVER',
    imageSrc: '/photos/bad7d37e-a4d6-47de-a143-10366e267463.jfif',
  },
]

// ── Washi Tape Strip Component ──
function WashiTape({
  color,
  rotation = 0,
  top,
  left,
  right,
  bottom,
  width = 64,
}: {
  color: string
  rotation?: number
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
  width?: number | string
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        width,
        height: 16,
        background: color,
        borderRadius: 2,
        transform: `rotate(${rotation}deg)`,
        backdropFilter: 'blur(3px)',
        boxShadow: '0 2px 5px rgba(0,0,0,0.22)',
        zIndex: 25,
        backgroundImage:
          'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.2) 4px, rgba(255,255,255,0.2) 6px)',
        pointerEvents: 'none',
      }}
    />
  )
}

// ── Gold Photo Corner Clip ──
function GoldPhotoCorner({
  corner,
}: {
  corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}) {
  const styles: React.CSSProperties = {
    position: 'absolute',
    width: 14,
    height: 14,
    zIndex: 20,
    pointerEvents: 'none',
  }
  if (corner === 'top-left') {
    styles.top = -3
    styles.left = -3
    styles.borderTop = '2.5px solid #cda86a'
    styles.borderLeft = '2.5px solid #cda86a'
    styles.borderTopLeftRadius = 4
  } else if (corner === 'top-right') {
    styles.top = -3
    styles.right = -3
    styles.borderTop = '2.5px solid #cda86a'
    styles.borderRight = '2.5px solid #cda86a'
    styles.borderTopRightRadius = 4
  } else if (corner === 'bottom-left') {
    styles.bottom = -3
    styles.left = -3
    styles.borderBottom = '2.5px solid #cda86a'
    styles.borderLeft = '2.5px solid #cda86a'
    styles.borderBottomLeftRadius = 4
  } else if (corner === 'bottom-right') {
    styles.bottom = -3
    styles.right = -3
    styles.borderBottom = '2.5px solid #cda86a'
    styles.borderRight = '2.5px solid #cda86a'
    styles.borderBottomRightRadius = 4
  }

  return <div style={styles} />
}

export default function PhotoBook() {
  const [currentPage, setCurrentPage] = useState(0)
  const [animDirection, setAnimDirection] = useState<'next' | 'prev'>('next')
  const [animKey, setAnimKey] = useState(0)
  const [hearts, setHearts] = useState<Heart[]>([])
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const heartIdRef = useRef(0)

  const activePage = SCRAP_PAGES[currentPage]

  // Preload adjacent images in the background for instantaneous flip transitions
  useEffect(() => {
    const nextIdx = (currentPage + 1) % SCRAP_PAGES.length
    const prevIdx = (currentPage - 1 + SCRAP_PAGES.length) % SCRAP_PAGES.length
    const imgNext = new Image()
    imgNext.src = SCRAP_PAGES[nextIdx].imageSrc
    const imgPrev = new Image()
    imgPrev.src = SCRAP_PAGES[prevIdx].imageSrc
  }, [currentPage])

  const triggerPageChange = useCallback(
    (nextIdx: number, dir: 'next' | 'prev' = 'next') => {
      setAnimDirection(dir)
      setCurrentPage(nextIdx)
      setAnimKey(k => k + 1)
    },
    [],
  )

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const cx = e.clientX - rect.left

      // Spawn celebratory hearts on tap
      const newHearts: Heart[] = Array.from({ length: 7 }, (_, i) => ({
        id: ++heartIdRef.current,
        x: cx + (Math.random() - 0.5) * 80,
        y: 40 + Math.random() * 80,
        size: 14 + Math.random() * 14,
        hue: PETAL_COLORS[i % PETAL_COLORS.length],
      }))
      setHearts(h => [...h, ...newHearts])

      const next = (currentPage + 1) % SCRAP_PAGES.length
      triggerPageChange(next, 'next')
    },
    [currentPage, triggerPageChange],
  )

  const handlePrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      const prev = currentPage > 0 ? currentPage - 1 : SCRAP_PAGES.length - 1
      triggerPageChange(prev, 'prev')
    },
    [currentPage, triggerPageChange],
  )

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      const next = (currentPage + 1) % SCRAP_PAGES.length
      triggerPageChange(next, 'next')
    },
    [currentPage, triggerPageChange],
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        width: '100%',
      }}
    >
      {/* ── SQUARE SCRAPBOOK CARD CONTAINER ── */}
      <div
        style={{
          position: 'relative',
          width: 'min(380px, 92vw)',
          aspectRatio: '1 / 1.15',
          maxWidth: 380,
        }}
      >
        {/* Ambient Warm Underglow */}
        <div
          style={{
            position: 'absolute',
            inset: 8,
            borderRadius: 28,
            background: 'radial-gradient(ellipse at center, rgba(205,168,106,0.3) 0%, transparent 70%)',
            filter: 'blur(20px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Outer Craft Scrapbook Frame (Square Div) */}
        <div
          onClick={handleCardClick}
          style={{
            position: 'relative',
            zIndex: 5,
            width: '100%',
            height: '100%',
            borderRadius: 24,
            background: 'rgba(28, 10, 18, 0.85)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            border: '1.5px solid rgba(205, 168, 106, 0.35)',
            boxShadow:
              '0 24px 60px rgba(0, 0, 0, 0.65), 0 4px 16px rgba(205, 168, 106, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
            cursor: 'pointer',
            userSelect: 'none',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
            boxSizing: 'border-box',
          }}
        >
          {/* Top Scrapbook Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
              padding: '0 4px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={12} color="#cda86a" />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#e6cfa0',
                }}
              >
                SCRAPBOOK
              </span>
            </div>

            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 10,
                color: '#cda86a99',
                letterSpacing: 1,
                background: 'rgba(205,168,106,0.12)',
                padding: '2px 8px',
                borderRadius: 999,
                border: '1px solid rgba(205,168,106,0.25)',
              }}
            >
              {currentPage + 1} / {SCRAP_PAGES.length}
            </div>
          </div>

          {/* ── ANIMATING SCRAPBOOK CONTENT CANVAS ── */}
          <div
            key={animKey}
            style={{
              flex: 1,
              position: 'relative',
              borderRadius: 18,
              background: activePage.bgGradient,
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
              padding: '14px 14px 10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              animation:
                animDirection === 'next'
                  ? 'scrapbookShuffleNext 0.55s cubic-bezier(0.25, 1, 0.5, 1) forwards'
                  : 'scrapbookShufflePrev 0.55s cubic-bezier(0.25, 1, 0.5, 1) forwards',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.35)',
            }}
          >
            {/* Scrapbook Dot Grid Texture */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
                pointerEvents: 'none',
              }}
            />

            {/* Corner Washi Tapes */}
            <WashiTape
              color={activePage.tapeColor}
              rotation={-25}
              top={-4}
              left={-10}
              width={54}
            />
            <WashiTape
              color={activePage.tapeColor}
              rotation={25}
              top={-4}
              right={-10}
              width={54}
            />

            {/* ── PHOTO CARD (Mounted Polaroid / Craft Frame) ── */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                marginTop: 2,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  background: '#ffffff',
                  padding: '6px 6px 18px',
                  borderRadius: 6,
                  boxShadow:
                    '0 10px 25px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.3)',
                  transform: `rotate(${activePage.id % 2 === 0 ? -1.5 : 1.5}deg)`,
                  transition: 'transform 0.25s ease',
                  cursor: 'pointer',
                  maxWidth: 240,
                  width: '100%',
                }}
                onClick={e => {
                  e.stopPropagation()
                  setLightboxImage(activePage.imageSrc)
                }}
                title="Click to zoom photo"
              >
                {/* Photo Corner Clips */}
                <GoldPhotoCorner corner="top-left" />
                <GoldPhotoCorner corner="top-right" />
                <GoldPhotoCorner corner="bottom-left" />
                <GoldPhotoCorner corner="bottom-right" />

                {/* Photo Image */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '1.2 / 1',
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: 3,
                    background: '#1a0d14',
                  }}
                >
                  <img
                    src={activePage.imageSrc}
                    alt={activePage.title}
                    loading="eager"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />

                  {/* Zoom badge */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 6,
                      right: 6,
                      background: 'rgba(0,0,0,0.55)',
                      backdropFilter: 'blur(4px)',
                      color: '#fff',
                      padding: '3px 6px',
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 9,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    <Maximize2 size={10} />
                  </div>
                </div>

                {/* Polaroid Tag Label */}
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: 4,
                    fontFamily: 'Playfair Display, serif',
                    fontStyle: 'italic',
                    fontSize: 10,
                    color: '#666',
                    letterSpacing: 0.5,
                  }}
                >
                  {activePage.tag}
                </div>
              </div>

              {/* Decorative Stamp Badge (Clean, No Emoji) */}
              <div
                style={{
                  position: 'absolute',
                  top: -8,
                  right: 14,
                  background: 'rgba(205,168,106,0.95)',
                  color: '#2a0f16',
                  fontSize: 9,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  padding: '3px 8px',
                  borderRadius: 4,
                  boxShadow: '0 3px 8px rgba(0,0,0,0.4)',
                  transform: 'rotate(12deg)',
                  zIndex: 30,
                  pointerEvents: 'none',
                  border: '1px dashed #2a0f16',
                }}
              >
                {activePage.badgeText}
              </div>
            </div>

            {/* ── SWEET MESSAGE NOTEPAD ── */}
            <div
              style={{
                position: 'relative',
                background: activePage.paperColor,
                borderRadius: 10,
                padding: '10px 14px 8px',
                boxShadow:
                  '0 4px 14px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15)',
                transform: `rotate(${activePage.id % 2 === 0 ? 0.8 : -0.8}deg)`,
                backgroundImage:
                  `linear-gradient(${activePage.paperColor} 0%, ${activePage.paperColor} 100%), repeating-linear-gradient(transparent, transparent 17px, rgba(0,0,0,0.06) 17px, rgba(0,0,0,0.06) 18px)`,
                backgroundBlendMode: 'multiply',
                marginTop: 6,
              }}
            >
              {/* Title & Tag */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: 3,
                }}
              >
                <span
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontStyle: 'italic',
                    fontWeight: 700,
                    fontSize: 14,
                    color: activePage.accentColor,
                  }}
                >
                  {activePage.title}
                </span>

                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 8.5,
                    color: activePage.accentColor + 'aa',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}
                >
                  {activePage.dateLabel || 'Memory'}
                </span>
              </div>

              {/* Sweet message */}
              <p
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontStyle: 'italic',
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: '#2a141b',
                  margin: '4px 0 6px',
                  textAlign: 'left',
                }}
              >
                "{activePage.message}"
              </p>

              {/* Note / Postscript */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 4,
                }}
              >
                <HeartIcon size={10} color={activePage.accentColor} fill={activePage.accentColor} />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 9.5,
                    fontWeight: 500,
                    color: activePage.accentColor,
                    fontStyle: 'italic',
                  }}
                >
                  {activePage.note}
                </span>
              </div>
            </div>

            {/* Tap to flip hint */}
            <div
              style={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.4)',
                fontSize: 8.5,
                fontFamily: 'Inter, sans-serif',
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginTop: 4,
              }}
            >
              Tap card for next memory
            </div>
          </div>

          {/* Floating burst hearts */}
          {hearts.map(h => (
            <FloatingHeart
              key={h.id}
              heart={h}
              onDone={() => setHearts(prev => prev.filter(x => x.id !== h.id))}
            />
          ))}
        </div>
      </div>

      {/* ── NAVIGATION BUTTONS ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={handlePrev}
          style={{
            background: 'rgba(45, 14, 24, 0.85)',
            border: '1px solid rgba(205,168,106,0.4)',
            color: '#cda86a',
            width: 40,
            height: 40,
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            transition: 'all 0.2s',
            backdropFilter: 'blur(8px)',
          }}
          title="Previous Memory"
        >
          ‹
        </button>

        <div style={{ textAlign: 'center', minWidth: 140 }}>
          <span
            style={{
              color: '#e6cfa0',
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            {activePage.title}
          </span>
          <div
            style={{
              fontSize: 9.5,
              color: '#cda86a88',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              marginTop: 2,
            }}
          >
            Photo {currentPage + 1} of {SCRAP_PAGES.length}
          </div>
        </div>

        <button
          onClick={handleNext}
          style={{
            background: 'rgba(45, 14, 24, 0.85)',
            border: '1px solid rgba(205,168,106,0.4)',
            color: '#cda86a',
            width: 40,
            height: 40,
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            transition: 'all 0.2s',
            backdropFilter: 'blur(8px)',
          }}
          title="Next Memory"
        >
          ›
        </button>
      </div>

      {/* ── THUMBNAIL QUICK-JUMP GALLERY (All 27 Photos) ── */}
      <div style={{ width: '100%', maxWidth: 380, marginTop: 2 }}>
        <div
          style={{
            color: '#cda86a77',
            fontSize: 9,
            fontFamily: 'Inter, sans-serif',
            letterSpacing: 2,
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          Jump to Scrapbook Memory ({SCRAP_PAGES.length})
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 6,
            maxHeight: 140,
            overflowY: 'auto',
            padding: 6,
            background: 'rgba(24, 8, 14, 0.65)',
            borderRadius: 14,
            border: '1px solid rgba(205,168,106,0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {SCRAP_PAGES.map((p, idx) => (
            <div
              key={p.id}
              onClick={() => triggerPageChange(idx, idx > currentPage ? 'next' : 'prev')}
              title={p.title}
              style={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: 8,
                overflow: 'hidden',
                border:
                  idx === currentPage
                    ? '2px solid #e6cfa0'
                    : '1px solid rgba(255,255,255,0.12)',
                cursor: 'pointer',
                opacity: idx === currentPage ? 1 : 0.5,
                transition: 'all 0.2s',
                boxShadow:
                  idx === currentPage
                    ? '0 0 12px rgba(205,168,106,0.65)'
                    : 'none',
                transform: idx === currentPage ? 'scale(1.06)' : 'scale(1)',
              }}
            >
              <img
                src={p.imageSrc}
                alt={p.title}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── FULLSCREEN PHOTO LIGHTBOX MODAL ── */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            animation: 'fadeIn 0.25s ease forwards',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              background: '#ffffff',
              padding: '10px 10px 32px',
              borderRadius: 8,
              boxShadow:
                '0 24px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(205,168,106,0.4)',
              maxWidth: '88vw',
              maxHeight: '90vh',
              transform: 'rotate(-0.5deg)',
            }}
          >
            <button
              onClick={() => setLightboxImage(null)}
              style={{
                position: 'absolute',
                top: -14,
                right: -14,
                background: '#2a0f16',
                color: '#cda86a',
                border: '1.5px solid #cda86a88',
                width: 32,
                height: 32,
                borderRadius: '50%',
                fontSize: 18,
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              }}
            >
              ×
            </button>
            <img
              src={lightboxImage}
              alt="Memory Expanded"
              decoding="async"
              style={{
                maxWidth: '100%',
                maxHeight: '78vh',
                objectFit: 'contain',
                display: 'block',
                borderRadius: 4,
              }}
            />
            <div
              style={{
                textAlign: 'center',
                marginTop: 8,
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontSize: 12,
                color: '#666',
              }}
            >
              {activePage.title} · {activePage.tag}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
