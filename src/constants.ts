/** Her name, shown in the hero headline */
export const HER_NAME = 'Jaiiii'

/** Her nickname */
export const HER_NICKNAME = 'lablab'

/** Your name, shown in the footer credit */
export const MY_NAME = 'Jeff'

/** The full text of the birthday letter inside the envelope */
export const LOVE_LETTER = `My dearest Jaiiii (lablab),

On this special day, I celebrate everything that makes you so wonderful. You bring so much light, warmth, and quiet magic into the world just by being yourself.

Your laugh brightens up every room, your kindness touches everyone around you, and your strength and grace inspire me every single day.

I hope this birthday brings you endless happiness, peace, and all the sweet moments you truly deserve. You deserve to be celebrated today and every day.

Thank you for being the amazing, beautiful soul that you are. 

Happy Birthday, my lablab!

With all my love and admiration,
Jeff`

export const PETAL_COLORS = ['#e6a5ac', '#cda86a', '#e6cfa0', '#c87b8a', '#f5ecdf']
export const CONFETTI_COLORS = ['#cda86a', '#e6a5ac', '#f5ecdf', '#e6cfa0', '#c87b8a', '#fff']

/**
 * Music Playlist
 * Drop your audio files into /public/music/ and add entries here.
 * Format: { title, artist, src }  — src is relative to /public, e.g. '/music/song.mp3'
 */
export interface Track {
  title: string
  artist: string
  src: string
}

export const PLAYLIST: Track[] = [
  {
    title: "Aphrodite",
    artist: "The Ridleys",
    src: "/music/The Ridleys - Aphrodite (Lyrics).mp3",
  },
  {
    title: "Nobody Gets Me",
    artist: "SZA",
    src: "/music/SZA - Nobody Gets Me (Official Video).mp3",
  },
  {
    title: "Risk It All",
    artist: "Bruno Mars",
    src: "/music/Bruno Mars - Risk It All.mp3",
  },
  {
    title: "Dito Sa'kin",
    artist: "Earl Agustin",
    src: "/music/Dito Sa'kin - Earl Agustin (Official Lyric Visualizer).mp3",
  },
  {
    title: "Best Part",
    artist: "H.E.R. ft. Daniel Caesar",
    src: "/music/H.E.R. - Best Part (Lyrics) Ft. Daniel Caesar.mp3",
  },
  {
    title: "Kabisado",
    artist: "IV of Spades",
    src: "/music/IV OF SPADES - Kabisado (Lyrics).mp3",
  },
  {
    title: "Palayo Sa Mundo",
    artist: "Jolianne & Arthur Nery",
    src: "/music/Jolianne, Arthur Nery - Palayo Sa Mundo (Lyrics).mp3",
  },
  {
    title: "Libu-Libong Buwan (Uuwian)",
    artist: "Kyle Raphael",
    src: "/music/Libu-Libong Buwan (Uuwian) - Kyle Raphael (Lyric Video).mp3",
  },
  {
    title: "Weak",
    artist: "Michael Pangilinan",
    src: "/music/Michael Pangilinan - Weak (Lyrics)Sedmusic.mp3",
  },
  {
    title: "Palagi",
    artist: "TJ x KZ (Live Sessions)",
    src: "/music/PALAGI - TJxKZ  LIVE SESSIONS.mp3",
  },
]


