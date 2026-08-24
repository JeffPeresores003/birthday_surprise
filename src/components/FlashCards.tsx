import { useState, useRef, useCallback, useMemo } from 'react'
import {
  Sparkles,
  Heart,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Calendar,
  RotateCw,
} from 'lucide-react'
import FloatingHeart, { type Heart as HeartType } from './FloatingHeart'
import { PETAL_COLORS, HER_NAME, MY_NAME } from '../constants'

export interface FlashCardReason {
  day: number
  date: string
  category: 'courting' | 'habits' | 'comfort' | 'distance' | 'love'
  categoryLabel: string
  title: string
  reason: string
  impact: string
}

// 177 Raw curated reasons from June 20 to Dec 14
const RAW_REASONS: Array<{
  category: 'courting' | 'habits' | 'comfort' | 'distance' | 'love'
  categoryLabel: string
  title: string
  reason: string
  impact: string
}> = [
  // 1 to 11 (June 20 to June 30)
  {
    category: 'courting',
    categoryLabel: 'Courting Milestone',
    title: 'The Day I Started Courting You',
    reason:
      'June 20 is where this journey officially started. Courting you was the easiest, most heartfelt decision of my life.',
    impact: 'Kay sa tanang tawo, ikaw ra gyud akong gipili, ug gipili gihapon.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Your Pre-Hello Smile',
    reason: 'The way your smile shows up before you even say hello.',
    impact: 'It instantly brightens whatever mood I was in.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Your Laughter Personality',
    reason: 'How your laugh has an entire personality of its own.',
    impact: 'It is the most genuine, joyful sound in the room.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'The Hidden Snort',
    reason: "The little snort you try to hide when something's really funny.",
    impact: 'It is effortlessly cute and always makes me laugh too.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Eyes in Video Calls',
    reason: 'How your eyes smile even through a blurry video call.',
    impact: 'Distance never dims the warmth in your expression.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Laughing at Your Own Jokes',
    reason: 'The way you laugh at your own jokes before you finish telling them.',
    impact: 'Your anticipation of the punchline is funnier than the joke itself.',
  },
  {
    category: 'love',
    categoryLabel: 'Daily Love',
    title: 'Your Selca Magic',
    reason: 'How one selca of your smile can fix my whole day.',
    impact: 'A single photo from you changes my entire day around.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Mid-Sentence Excitement',
    reason: "The way your face lights up mid-sentence when you're excited.",
    impact: 'Seeing your excitement is endlessly captivating.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Loudest at Silly Things',
    reason: "How you laugh loudest at the things that aren't even that funny.",
    impact: 'Your sense of humor makes everything more lively.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Covering Your Mouth',
    reason: 'The way you cover your mouth when you laugh too hard.',
    impact: 'One of my absolute favorite habits of yours.',
  },
  {
    category: 'love',
    categoryLabel: 'Daily Love',
    title: 'A Special Smile for Me',
    reason: 'How your smile is different for strangers and different for me.',
    impact: 'Knowing that smile is just for me means the world.',
  },

  // 12 to 42 (July 1 to July 31)
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'The Nose Scrunch',
    reason: 'The way you scrunch your nose right before you laugh.',
    impact: 'An adorable micro-expression I always look forward to.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Your Typed Laugh',
    reason: 'How even your typed "hahaha" sounds like you in my head.',
    impact: 'I can hear your voice even through plain text.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Unstoppable Giggles',
    reason: 'The way your laugh gets louder the more you try to stop it.',
    impact: 'Pure, authentic joy in its truest form.',
  },
  {
    category: 'love',
    categoryLabel: 'Daily Love',
    title: 'Full-Face Smile',
    reason: 'How you smile with your whole face, not just your mouth.',
    impact: 'Your whole energy glows whenever you are truly happy.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Smiles Through Phone Calls',
    reason: 'The way I can hear your smile through the phone.',
    impact: 'Your voice carries a warmth that needs no video to feel.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Kindness to Everyone',
    reason: "How kind you are to people who can't do anything for you.",
    impact: 'Your heart is naturally gentle and upright.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Checking on Others',
    reason: "The way you check on people even when no one's checking on you.",
    impact: 'Your thoughtfulness is a rare and precious gift.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Benefit of the Doubt',
    reason: 'How you give the benefit of the doubt before judgment.',
    impact: 'You always choose understanding first.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Saying Sorry First',
    reason: "The way you say sorry first, even when you're not fully wrong.",
    impact: 'You value peace and connection over winning an argument.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Gentle on Hard Days',
    reason: 'How gentle you are with people who are having a hard day.',
    impact: 'You bring comfort simply by understanding.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Remembering the Details',
    reason: 'The way you remember small things people tell you in passing.',
    impact: 'You make people feel genuinely heard and valued.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Never Belittling Anyone',
    reason: 'How you never make anyone feel small for asking questions.',
    impact: 'You create a space where everyone feels safe to learn.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Standing Up for Others',
    reason: "The way you stand up for people who aren't in the room.",
    impact: 'Your loyalty and integrity never waiver.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Patience with Learners',
    reason: "How you're patient with people who are still learning.",
    impact: 'You guide with warmth instead of frustration.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Everyday Respect',
    reason: 'The way you treat service staff and strangers with respect.',
    impact: 'True character shows in how you treat everyone.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Forgiving Grace',
    reason: "How you forgive quickly, even when you shouldn't have to.",
    impact: 'Your heart carries no bitter baggage.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Making People Matter',
    reason: 'The way you make people feel like they genuinely matter.',
    impact: 'You leave a warm imprint wherever you go.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Quiet Loyalty',
    reason: "How you're loyal to the people who don't even know it yet.",
    impact: 'You are dependable to your core.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Listening Completely',
    reason: "The way you listen like it's the only thing you're doing.",
    impact: 'You give your presence with zero distraction.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Never Talking Over',
    reason: "How you never talk over people, even when you're excited.",
    impact: 'Your consideration is always so natural.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Peacemaker',
    reason: 'The way you make peace instead of picking fights.',
    impact: 'Harmony is always your natural choice.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Soft-Hearted Always',
    reason: "How you're soft-hearted even after everything life tested you with.",
    impact: 'Your sweetness survived every storm.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Showing Up',
    reason: "The way you show up for people, even when it's inconvenient.",
    impact: 'Your effort speaks louder than any words.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Pure Honesty',
    reason: 'How honest you are, even when a lie would be easier.',
    impact: 'I trust your words completely.',
  },
  {
    category: 'love',
    categoryLabel: 'Gentle Heart',
    title: 'Authentic Kindness',
    reason: 'The way your kindness never feels like an act.',
    impact: 'It is simply who you are at your core.',
  },
  {
    category: 'habits',
    categoryLabel: 'How You Amaze Me',
    title: 'Sharp Wit',
    reason: "How sharp you are in conversations I didn't expect you to win.",
    impact: 'Your intelligence is as sharp as it is charming.',
  },
  {
    category: 'habits',
    categoryLabel: 'How You Amaze Me',
    title: 'Thought-Provoking Questions',
    reason: 'The way you ask questions that make me think twice.',
    impact: 'You make conversations deep and meaningful.',
  },
  {
    category: 'habits',
    categoryLabel: 'How You Amaze Me',
    title: 'Work Ethic',
    reason: 'How hard you work for things that matter to you.',
    impact: 'Your dedication inspires me every single day.',
  },
  {
    category: 'habits',
    categoryLabel: 'How You Amaze Me',
    title: 'Patient Explanations',
    reason: 'The way you explain things until they finally make sense to me.',
    impact: 'You teach with so much sweetness and patience.',
  },
  {
    category: 'habits',
    categoryLabel: 'How You Amaze Me',
    title: 'Curious Mind',
    reason: 'How you never stop wanting to learn more.',
    impact: 'Your curiosity and ambition are beautiful.',
  },
  {
    category: 'habits',
    categoryLabel: 'How You Amaze Me',
    title: 'Calm in Problems',
    reason: 'The way you handle problems calmly instead of panicking.',
    impact: 'You bring steady solutions to stressful moments.',
  },

  // 43 to 73 (August 1 to August 31)
  {
    category: 'habits',
    categoryLabel: 'How You Amaze Me',
    title: 'Thinking Ahead',
    reason: 'How you plan things three steps ahead of everyone else.',
    impact: 'Your foresight always amazes me.',
  },
  {
    category: 'habits',
    categoryLabel: 'How You Amaze Me',
    title: 'Humble Brilliance',
    reason: "The way you're humble about how smart you actually are.",
    impact: 'You let your quiet excellence speak for itself.',
  },
  {
    category: 'habits',
    categoryLabel: 'How You Amaze Me',
    title: 'Unseen Effort',
    reason: 'How you push yourself even when no one is watching.',
    impact: 'Your self-discipline is truly admirable.',
  },
  {
    category: 'habits',
    categoryLabel: 'How You Amaze Me',
    title: 'Staying True',
    reason: 'The way your ambition never makes you forget who you are.',
    impact: 'You succeed without losing your gentle nature.',
  },
  {
    category: 'habits',
    categoryLabel: 'How You Amaze Me',
    title: 'Knowing When to Rest',
    reason: 'How you know when to push and when to rest.',
    impact: 'You have a healthy balance in everything you do.',
  },
  {
    category: 'habits',
    categoryLabel: 'How You Amaze Me',
    title: 'Gracious with Feedback',
    reason: 'The way you take feedback without taking it personally.',
    impact: 'You are always open to growth.',
  },
  {
    category: 'habits',
    categoryLabel: 'How You Amaze Me',
    title: 'Next Step Mindset',
    reason: 'How you turn setbacks into "okay, next step."',
    impact: 'Your resilience makes any obstacle feel solvable.',
  },
  {
    category: 'habits',
    categoryLabel: 'How You Amaze Me',
    title: 'Thorough Research',
    reason: 'The way you research everything before deciding anything.',
    impact: 'You always make thoughtful, informed decisions.',
  },
  {
    category: 'habits',
    categoryLabel: 'How You Amaze Me',
    title: 'Surprising Mind',
    reason: 'How your mind works in ways that surprise me, still.',
    impact: 'You always bring fresh, brilliant ideas.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Talking Feels Like Exhaling',
    reason: 'How talking to you feels like exhaling after holding my breath.',
    impact: 'All tension leaves my body when we talk.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Calming Voice',
    reason: 'The way your voice slows my racing thoughts down.',
    impact: 'You are instant peace to my mind.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Fully Unfiltered',
    reason: "How I can be fully unfiltered with you and it's completely safe.",
    impact: 'No pretenses, no fear — just me and you.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Handling Bad Days',
    reason: 'The way you never make my bad days feel dramatic.',
    impact: 'You make heavy emotions feel manageable.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Comfortable Silence',
    reason: 'How you make silence comfortable instead of awkward.',
    impact: 'Just existing in the same space is enough.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'No Performance Needed',
    reason: "The way I don't have to perform or put on an act with you.",
    impact: 'You love me in my most raw, natural state.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Holding Space',
    reason: 'How you hold space for me without trying to rush and fix everything.',
    impact: 'You understand that presence matters more than quick fixes.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Goodnight Blanket',
    reason: 'The way "goodnight" from you feels like a warm blanket.',
    impact: 'I always fall asleep feeling secure and cared for.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Safe Vulnerability',
    reason: 'How you never use my vulnerable moments against me.',
    impact: 'You guard my secrets and feelings with care.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Home in Long Distance',
    reason: 'The way you make me feel like home, even from a distance.',
    impact: 'Home is not a location — it is you.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Checking In Unprompted',
    reason: 'How you check in without needing a specific reason to.',
    impact: 'Knowing you are thinking of me warms my heart.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Survivable Hard Days',
    reason: 'The way you make hard days feel survivable and lighter.',
    impact: 'With you by my side, nothing feels too heavy.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Hidden Parts of Me',
    reason: 'How I trust you with the parts of me I usually hide.',
    impact: 'You are the only one who truly knows all of me.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Virtual Presence',
    reason: 'The way your presence, even on a screen, calms me down.',
    impact: 'Your energy reaches through any distance.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Safe Being Myself',
    reason: 'How safe it feels to be fully and truly myself around you.',
    impact: 'You make self-acceptance easy.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Sleepy Personality',
    reason: "How you have a whole cute personality when you're sleepy.",
    impact: 'Sleepy Jaiiii is the sweetest person in existence.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Vlog Narration',
    reason: "The way you narrate what you're doing like a vlog, unprompted.",
    impact: 'I could listen to your daily stories forever.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Competitive in Games',
    reason: 'How competitive you get over the smallest casual games.',
    impact: 'Your playful fire is so fun to witness.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Food Opinions',
    reason: 'The way you have strong opinions about food combinations.',
    impact: 'Your foodie commentary is always top-tier.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Talking to Pets',
    reason: 'How you talk to pets like they understand full sentences.',
    impact: 'Your gentleness with animals is so endearing.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Theatrical Reactions',
    reason: 'The way you get playfully dramatic over minor inconveniences.',
    impact: 'You make everyday situations entertaining.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Fast Typing Speed',
    reason: "How your typing speed doubles when you're passionate or annoyed.",
    impact: 'I know something big is coming when the typing dots appear.',
  },

  // 74 to 103 (September 1 to September 30)
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Ranking Random Things',
    reason: 'The way you have a whole ranking system for random things.',
    impact: 'Your structured thoughts are so fun to explore.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: '10 Short Messages',
    reason: 'How you send 10 rapid messages instead of one long paragraph.',
    impact: 'My phone buzzing with your messages always makes me smile.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Tired but Awake',
    reason: 'The way you are dramatic about being "so tired" and stay up late anyway.',
    impact: 'You fight sleep just to chat a few minutes more.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Specific Preferences',
    reason: 'How you have very specific opinions about how things should be done.',
    impact: 'You have your own distinct, wonderful standards.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Excited over Small Things',
    reason: "The way you get excited about things that aren't even that big.",
    impact: 'You find joy in simple everyday moments.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Snack Opinions',
    reason: 'How you always have snack opinions, no matter what time it is.',
    impact: 'Food discussions with you are always a delight.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Playful Teasing',
    reason: 'The way you fake-argue with me just to see my reaction.',
    impact: 'Your playful banter keeps our days fun and sweet.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Good Food Shift',
    reason: 'How your energy instantly shifts the second good food arrives.',
    impact: 'A happy, well-fed Jaiiii is a joy to behold.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Passionate Explanations',
    reason: "The way you overexplain things you're passionate about.",
    impact: 'Watching your eyes light up with passion is magical.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Debating Anything',
    reason: 'How you can turn almost any random topic into a fun debate.',
    impact: 'Conversations with you are never ever boring.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Shy About Compliments',
    reason: 'The way you get shy about compliments but secretly love them.',
    impact: 'Your bashful smile is the cutest thing on earth.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Main Character Energy',
    reason: 'How you have main character energy in the smallest daily moments.',
    impact: 'You are the undeniable star of my world.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Late Meme Laughs',
    reason: 'The way you laugh at memes way after everyone else has moved on.',
    impact: 'Your sense of humor operates on its own sweet timeline.',
  },
  {
    category: 'love',
    categoryLabel: 'Growing Together',
    title: 'Fighting Fair',
    reason: "How we've learned to resolve disagreements with care instead of fighting.",
    impact: 'Every challenge has only made us closer.',
  },
  {
    category: 'love',
    categoryLabel: 'Growing Together',
    title: 'Sincere Apologies',
    reason: "The way we've figured out how to say sorry and truly mean it.",
    impact: 'We value our bond over our egos.',
  },
  {
    category: 'love',
    categoryLabel: 'Growing Together',
    title: 'Choosing Each Other',
    reason: 'How we keep choosing each other, even on the tough weeks.',
    impact: 'Consistency is our greatest superpower.',
  },
  {
    category: 'love',
    categoryLabel: 'Growing Together',
    title: 'Learning Love Languages',
    reason: "The way we've learned each other's love languages over time.",
    impact: 'Understanding you deeper is a lifelong privilege.',
  },
  {
    category: 'love',
    categoryLabel: 'Growing Together',
    title: 'Clear Communication',
    reason: "How we've gotten better at communicating instead of assuming.",
    impact: 'Clarity brings us peace and reassurance.',
  },
  {
    category: 'love',
    categoryLabel: 'Growing Together',
    title: 'Ending in Understanding',
    reason: 'The way our discussions end in mutual understanding now.',
    impact: 'We grow wiser with every conversation.',
  },
  {
    category: 'love',
    categoryLabel: 'Growing Together',
    title: 'Building Trust',
    reason: 'How we built deep trust one small kept promise at a time.',
    impact: 'My faith in you is unshakable.',
  },
  {
    category: 'love',
    categoryLabel: 'Growing Together',
    title: 'Giving Space with Security',
    reason: 'The way we learned to give each other space without panic.',
    impact: 'Our bond is strong enough to breathe.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Growing Up Together',
    reason: 'How we have grown up a little, together, even across the distance.',
    impact: 'Distance could not stop us from maturing as a pair.',
  },
  {
    category: 'love',
    categoryLabel: 'Growing Together',
    title: 'Checking Assumptions',
    reason: 'The way we check our thoughts before jumping to conclusions.',
    impact: 'We protect our peace with patient communication.',
  },
  {
    category: 'love',
    categoryLabel: 'Growing Together',
    title: 'Loud Celebrations',
    reason: "How we've learned to celebrate each other's wins loudly.",
    impact: 'Your victory is always my victory too.',
  },
  {
    category: 'love',
    categoryLabel: 'Growing Together',
    title: 'Automatic Support',
    reason: "The way we show up for each other's bad days automatically.",
    impact: 'You never have to ask — I am always here.',
  },
  {
    category: 'love',
    categoryLabel: 'Growing Together',
    title: '"We" as a Sanctuary',
    reason: 'How we turned "we" into a sanctuary instead of just a word.',
    impact: 'We created our own little world of comfort.',
  },
  {
    category: 'love',
    categoryLabel: 'Growing Together',
    title: 'Gaining Patience',
    reason: "The way we've learned patience we didn't have before each other.",
    impact: 'Loving you made me a gentler person.',
  },
  {
    category: 'love',
    categoryLabel: 'Growing Together',
    title: 'Learning Love Anew',
    reason: 'How every day with you teaches me something new about love.',
    impact: 'Loving you is an ever-deepening journey.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Time Zones as Small Hurdles',
    reason: 'How you make time zones feel like a small inconvenience, not a wall.',
    impact: 'Our connection bridges any number of hours.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'First Thought Good Morning',
    reason: 'The way "good morning" from you means someone thought of me first.',
    impact: 'Starting my day with your greeting is a blessing.',
  },

  // 104 to 134 (October 1 to October 31)
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Never Disappearing',
    reason: 'How you never let distance become an excuse to disappear.',
    impact: 'Your consistency makes distance easy to bear.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Planning Around Bad Signal',
    reason: 'The way you plan around bad signal instead of giving up on the call.',
    impact: 'Your effort to stay connected means everything.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Effort When Inconvenient',
    reason: "How you make effort even when it's inconvenient for you.",
    impact: 'Your dedication is pure and unconditional.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Staying Up Late to Talk',
    reason: 'The way you stay up late just so we can talk a little longer.',
    impact: 'Those late-night conversations are priceless.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Blurry Calls Beat Anything',
    reason: 'How a blurry video call with you beats a clear one with anyone else.',
    impact: 'Seeing your face in any quality makes my day.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Sharing Daily Photos',
    reason: 'The way you send photos of your day so I feel included in it.',
    impact: 'I feel like I am walking beside you every step.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'No Guilt in Longing',
    reason: 'How you never make me feel guilty for missing you.',
    impact: 'Longing for you is recognized as love, not pressure.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Counting Down Visits',
    reason: 'The way you count down to visits like the biggest event of the year.',
    impact: 'The anticipation of seeing you makes my heart race.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: '"See You Soon" as a Promise',
    reason: 'How you make "see you soon" feel like a promise, not a maybe.',
    impact: 'Your certainty gives me unwavering hope.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Never Giving Up',
    reason: 'The way you never once made distance an excuse to give up on us.',
    impact: 'We are in this together, through thick and thin.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Chosen Through the Screen',
    reason: 'How you still make me feel chosen, screen and all.',
    impact: 'Your love breaks through pixels and miles.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Text to Whole Conversation',
    reason: "The way you turn a text into a whole conversation so it doesn't feel far.",
    impact: 'Distance melts when we chat.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Telling the Small Parts',
    reason: 'How you remember to tell me the small, ordinary parts of your day.',
    impact: 'Every tiny detail about your day matters to me.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'A Season, Not a Sentence',
    reason: 'The way you make long distance feel like a season, not a sentence.',
    impact: 'We know this temporary distance will pass.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Never Ceasing to Try',
    reason: 'How you never stopped trying, even when it got hard.',
    impact: 'Your persistence is proof of our love.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Sincere "I Miss You"',
    reason: 'The way "I miss you" from you never feels like a routine line.',
    impact: 'It carries deep, genuine emotion every single time.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Constant Love Apart',
    reason: 'How being apart never made you love me any less.',
    impact: 'Physical distance cannot weaken our bond.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Reunions Worth Every Mile',
    reason: 'The way you make every reunion worth every single mile.',
    impact: 'Seeing you in person is the sweetest reward.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Half-Asleep Messages',
    reason: "How you send good morning texts even when you're half asleep.",
    impact: 'You think of me in your very first waking thoughts.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Remembering My Plans',
    reason: "The way you remember what I said I'd do today and ask about it later.",
    impact: 'Your attentiveness makes me feel so cared for.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Memes Saved Just for Me',
    reason: 'How you save specific memes with me in mind.',
    impact: 'Sharing laughs across the day is so sweet.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Reminding Me to Eat',
    reason: 'The way you tell me to eat before I even remember to.',
    impact: 'You look out for my health constantly.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Noticing My Silence',
    reason: 'How you notice when I go quiet and gently check on it.',
    impact: 'You read my mood without me having to explain.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Sweet Voice Messages',
    reason: 'The way you send voice messages just so I can hear your voice.',
    impact: 'Your recorded voice is my favorite audio.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Remembering Small Preferences',
    reason: 'How you remember small preferences I mentioned only once.',
    impact: 'You pay attention with so much heart.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Water Check',
    reason: 'The way you ask "did you drink water today" like a real question.',
    impact: 'Your caring reminders keep me going.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: '"Sleep Na" Directives',
    reason: 'How you send "sleep na" like it is completely non-negotiable.',
    impact: 'Your protective, caring side is so sweet.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Detailed Day Stories',
    reason: 'The way you tell me about your day in full detail, and I love it.',
    impact: 'I never get tired of your stories.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Knowing My Schedule',
    reason: 'How you remember my schedule better than I do myself.',
    impact: 'You are my greatest supporter and guide.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Songs that Remind You of Me',
    reason: 'The way you send songs that remind you of us.',
    impact: 'Music connects our souls across the miles.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Screenshots of Memories',
    reason: 'How you screenshot things "just because it reminded me of you."',
    impact: 'You keep me in your thoughts constantly.',
  },

  // 135 to 164 (November 1 to November 30)
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Asking the Small Stuff',
    reason: 'The way you ask about the small stuff, not just the big updates.',
    impact: 'You value the quiet everyday moments.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: '"Have You Eaten?"',
    reason: 'How you always ask if I have eaten, no matter what hour it is.',
    impact: 'A classic expression of your deep care.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Remembering Names',
    reason: "The way you remember the names of people I've only mentioned once.",
    impact: 'Your sharp memory and attention to detail are amazing.',
  },
  {
    category: 'love',
    categoryLabel: 'Daily Love',
    title: 'Rereading Old Messages',
    reason: 'How you keep our old messages just to reread them sometimes.',
    impact: 'Our shared history is treasured by you.',
  },
  {
    category: 'love',
    categoryLabel: 'Daily Love',
    title: 'Little Surprises',
    reason: 'The way you plan little sweet surprises on ordinary days.',
    impact: 'You make everyday moments feel special.',
  },
  {
    category: 'love',
    categoryLabel: 'Daily Love',
    title: 'Lighter Mondays',
    reason: 'How you make Mondays feel less heavy with a single message.',
    impact: 'A message from you makes any start of the week easy.',
  },
  {
    category: 'love',
    categoryLabel: 'Daily Love',
    title: 'Always Answering Goodnight',
    reason: 'The way you never let a "goodnight" go unanswered.',
    impact: 'We always end our day connected.',
  },
  {
    category: 'distance',
    categoryLabel: 'Our Connection',
    title: 'Checking My Weather',
    reason: 'How you check the weather where I am, just to know.',
    impact: 'You look after me from afar.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Remembering Deadlines',
    reason: 'The way you remember deadlines and exams I mentioned in passing.',
    impact: 'You carry my responsibilities in your heart too.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: '"Kaon Na" Reminders',
    reason: 'How you send "kaon na" before I even thought about food.',
    impact: 'Your loving reminders keep me healthy.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Tracking My Stress',
    reason: 'The way you keep track of the little things that stress me out.',
    impact: 'You help me untangle worries with ease.',
  },
  {
    category: 'love',
    categoryLabel: 'Daily Love',
    title: 'Never Boring',
    reason: 'How ordinary days with you never feel boring or plain.',
    impact: 'Every second with you is interesting and warm.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Showing Up at My Lowest',
    reason: "How you show up hardest when I'm at my lowest point.",
    impact: 'You are my steadfast rock in times of need.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Never Rushing My Feelings',
    reason: 'The way you never rush me to "just get over it."',
    impact: 'You allow me time to heal and breathe.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Sitting with Hard Feelings',
    reason: 'How you sit with me in difficult feelings instead of dismissing them.',
    impact: 'Your quiet companionship heals everything.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Reminding Me of My Worth',
    reason: 'The way you remind me of my worth when I forget it myself.',
    impact: 'You lift my confidence whenever I feel down.',
  },
  {
    category: 'love',
    categoryLabel: 'Daily Love',
    title: 'Celebrating Small Wins',
    reason: 'How you celebrate my small victories like they are massive.',
    impact: 'You are my loudest and most genuine cheerleader.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Stress is Never a Burden',
    reason: 'The way you never make my stress feel like a burden to you.',
    impact: 'You listen with pure open-hearted willingness.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Calming My Spirals',
    reason: 'How you talk me down when I spiral over small worries.',
    impact: 'Your calm logic is the antidote to my anxiety.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Reminding Me to Rest',
    reason: 'The way you remind me to rest when I push myself too far.',
    impact: 'You protect my peace of mind.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Never Alone in Seasons',
    reason: 'How you never once made me feel alone in a hard season.',
    impact: 'We navigate every challenge as one unit.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Sharing Responsibilities',
    reason: "The way you treat my responsibilities like they're yours too.",
    impact: 'True teamwork and mutual care.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Space to Recover',
    reason: 'How you never guilt me for needing a little quiet space to recover.',
    impact: 'Your understanding is limitless.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Checking Mental Load',
    reason: 'The way you check on my mental load, not just my outer mood.',
    impact: 'You understand what is happening beneath the surface.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Permission to be Soft',
    reason: "How you remind me I don't have to be strong all the time.",
    impact: 'With you, I can just let my guard down.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Unconditional Support',
    reason: 'The way your support never comes with strings attached.',
    impact: 'Your love is pure, sincere, and steadfast.',
  },
  {
    category: 'comfort',
    categoryLabel: 'My Safe Place',
    title: 'Hard Seasons Made Easy',
    reason: 'How you make difficult seasons easier just by walking in them with me.',
    impact: 'Your presence turns hardship into hope.',
  },
  {
    category: 'love',
    categoryLabel: 'Daily Love',
    title: 'Smiling in Photos',
    reason: 'How your smile in photos never gets old to look at.',
    impact: 'Every picture of you is a treasure.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Mid-Laugh Unfiltered',
    reason: 'The way you look mid-laugh, caught completely off guard.',
    impact: 'The most authentic, beautiful vision.',
  },
  {
    category: 'habits',
    categoryLabel: 'Little Things I Adore',
    title: 'Effortless in Comfy Clothes',
    reason: 'How you look effortlessly lovely in your comfiest casual clothes.',
    impact: 'Your natural beauty shines without any effort.',
  },

  // 165 to 177 (December 1 to December 14)
  {
    category: 'love',
    categoryLabel: 'Daily Love',
    title: 'Softened Eyes',
    reason: "The way your eyes soften when you're really listening intently.",
    impact: 'A reflection of your deep, gentle heart.',
  },
  {
    category: 'love',
    categoryLabel: 'Daily Love',
    title: 'Glow on Ordinary Days',
    reason: 'The way you look on lazy, ordinary days and still look gorgeous.',
    impact: 'Beauty that radiates from your genuine spirit.',
  },
  {
    category: 'love',
    categoryLabel: 'Bisaya Heart Notes',
    title: 'Paborito nga Tawo',
    reason: 'Kay ikaw akong paborito nga tawo sa tibuok kalibutan.',
    impact: 'Out of all the people in the world, it is always you.',
  },
  {
    category: 'love',
    categoryLabel: 'Bisaya Heart Notes',
    title: 'Mahal Ko Ikaw',
    reason: 'How "mahal ko ikaw" from you hits different every single time.',
    impact: 'Those three words from you feel brand new and deeply touching.',
  },
  {
    category: 'distance',
    categoryLabel: 'Bisaya Heart Notes',
    title: 'Dili Mubiya',
    reason: 'Kay bisan layo, dili gyud ka mubiya sa akoa.',
    impact: 'Even with the distance, you never let go of my hand.',
  },
  {
    category: 'love',
    categoryLabel: 'Bisaya Heart Notes',
    title: 'Calling Me "Gwapo"',
    reason: 'How you say "gwapo" like you mean it, even on my worst days.',
    impact: 'You make me feel handsome and loved effortlessly.',
  },
  {
    category: 'love',
    categoryLabel: 'Bisaya Heart Notes',
    title: 'Tinuod Jud Ka',
    reason: 'Kay wala ka nagpakaaron-ingnon, tinuod jud ka sa tanan.',
    impact: 'Your honesty and authenticity are what I cherish most.',
  },
  {
    category: 'love',
    categoryLabel: 'Bisaya Heart Notes',
    title: 'Love in "Kaon Na"',
    reason: 'How "kaon na" and "ingana lang na" somehow mean I love you too.',
    impact: 'Love expressed in the sweetest, most caring daily phrases.',
  },
  {
    category: 'love',
    categoryLabel: 'Bisaya Heart Notes',
    title: 'Mo-adjust Para sa Amoa',
    reason: 'Kay bisan unsa pa ka lisod, andam gihapon ka mo-adjust para sa amoa.',
    impact: 'Your dedication to our relationship is beyond words.',
  },
  {
    category: 'love',
    categoryLabel: 'Bisaya Heart Notes',
    title: 'The Softest Person',
    reason: "How you're the softest person I've ever loved this loudly.",
    impact: 'Loving you is the easiest, most rewarding thing in my life.',
  },
  {
    category: 'love',
    categoryLabel: 'Bisaya Heart Notes',
    title: 'Ikaw Ra Jud',
    reason: 'How "ikaw ra jud" is a promise you actually keep every single day.',
    impact: 'Your loyalty is steady, real, and true.',
  },
  {
    category: 'comfort',
    categoryLabel: 'Bisaya Heart Notes',
    title: 'Akong Safe Space',
    reason: 'Kay ikaw akong safe space, bisan sa layo.',
    impact: 'No matter the miles, you are my sanctuary.',
  },
  {
    category: 'love',
    categoryLabel: 'Bisaya Heart Notes',
    title: 'Ikaw Gihapon Akong Pilion',
    reason: 'Kay bisan pila pa katuig, ikaw gihapon akong pilion.',
    impact: 'No matter how many years pass, my choice will always be you.',
  },
  {
    category: 'love',
    categoryLabel: 'Birthday Dedication',
    title: 'Hangtod sa Kataposan, Akoa Ra Jud',
    reason:
      'And most of all — kay ikaw, hangtod sa kataposan, akoa ra jud. Happy Birthday, my lablab Jaiiii!',
    impact: `Happy Birthday on December 14! From June 20 until forever, with all my love — ${MY_NAME}.`,
  },
]

// Map to strict 177 FlashCardReason items with Day and Date
const monthsInfo = [
  { name: 'June', startDay: 20, endDay: 30 },
  { name: 'July', startDay: 1, endDay: 31 },
  { name: 'August', startDay: 1, endDay: 31 },
  { name: 'September', startDay: 1, endDay: 30 },
  { name: 'October', startDay: 1, endDay: 31 },
  { name: 'November', startDay: 1, endDay: 30 },
  { name: 'December', startDay: 1, endDay: 14 },
]

export const REASONS_LIST: FlashCardReason[] = []

let dayCounter = 1
for (const m of monthsInfo) {
  for (let d = m.startDay; d <= m.endDay; d++) {
    const raw = RAW_REASONS[dayCounter - 1] || RAW_REASONS[RAW_REASONS.length - 1]
    REASONS_LIST.push({
      day: dayCounter,
      date: `${m.name} ${d}`,
      category: raw.category,
      categoryLabel: raw.categoryLabel,
      title: raw.title,
      reason: raw.reason,
      impact: raw.impact,
    })
    dayCounter++
  }
}

export default function FlashCards() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [likedDays, setLikedDays] = useState<number[]>([])
  const [hearts, setHearts] = useState<HeartType[]>([])
  const [animDirection, setAnimDirection] = useState<'next' | 'prev'>('next')
  const [animKey, setAnimKey] = useState(0)
  const heartIdRef = useRef(0)

  // Filtered reasons list
  const filteredReasons = useMemo(() => {
    if (filterCategory === 'all') return REASONS_LIST
    if (filterCategory === 'liked')
      return REASONS_LIST.filter(r => likedDays.includes(r.day))
    return REASONS_LIST.filter(r => r.category === filterCategory)
  }, [filterCategory, likedDays])

  // Ensure valid current card
  const activeCard = filteredReasons[currentIndex] || REASONS_LIST[0]
  const totalCards = filteredReasons.length

  const changeCard = useCallback(
    (newIdx: number, dir: 'next' | 'prev' = 'next') => {
      setIsFlipped(false)
      setAnimDirection(dir)
      setCurrentIndex(newIdx)
      setAnimKey(k => k + 1)
    },
    [],
  )

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % totalCards
    changeCard(nextIdx, 'next')
  }, [currentIndex, totalCards, changeCard])

  const handlePrev = useCallback(() => {
    const prevIdx = currentIndex > 0 ? currentIndex - 1 : totalCards - 1
    changeCard(prevIdx, 'prev')
  }, [currentIndex, totalCards, changeCard])

  const handleRandom = useCallback(() => {
    const randIdx = Math.floor(Math.random() * totalCards)
    changeCard(randIdx, randIdx > currentIndex ? 'next' : 'prev')
  }, [totalCards, currentIndex, changeCard])

  const handleLike = useCallback(
    (e: React.MouseEvent, day: number) => {
      e.stopPropagation()
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const cx = rect.width / 2

      // Spawn floating hearts
      const newHearts: HeartType[] = Array.from({ length: 6 }, (_, i) => ({
        id: ++heartIdRef.current,
        x: cx + (Math.random() - 0.5) * 60,
        y: 20 + Math.random() * 40,
        size: 14 + Math.random() * 14,
        hue: PETAL_COLORS[i % PETAL_COLORS.length],
      }))
      setHearts(h => [...h, ...newHearts])

      setLikedDays(prev =>
        prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day],
      )
    },
    [],
  )

  const isCurrentLiked = likedDays.includes(activeCard.day)

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
      {/* ── SUBTITLE BANNER ── */}
      <div style={{ textAlign: 'center', maxWidth: 420, padding: '0 12px' }}>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 12.5,
            color: '#e6cfa0cc',
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          From <span style={{ color: '#e6cfa0', fontWeight: 600 }}>June 20</span> (the day I started courting you) to{' '}
          <span style={{ color: '#e6a5ac', fontWeight: 600 }}>December 14</span> (your birthday) — 177 days of reasons why your existence changed my life for the better.
        </p>
      </div>

      {/* ── CATEGORY FILTER PILLS ── */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          maxWidth: '100%',
          padding: '4px 8px',
          scrollbarWidth: 'none',
        }}
      >
        {[
          { id: 'all', label: 'All 177 Days' },
          { id: 'courting', label: 'Courting Milestone' },
          { id: 'habits', label: 'Little Habits I Adore' },
          { id: 'comfort', label: 'Safe Place & Comfort' },
          { id: 'distance', label: 'Our Connection' },
          { id: 'love', label: 'Daily Love' },
          { id: 'liked', label: `Liked (${likedDays.length})` },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setFilterCategory(cat.id)
              setCurrentIndex(0)
              setIsFlipped(false)
            }}
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              border:
                filterCategory === cat.id
                  ? '1px solid #e6cfa0'
                  : '1px solid rgba(205,168,106,0.2)',
              background:
                filterCategory === cat.id
                  ? 'linear-gradient(135deg, rgba(205,168,106,0.35), rgba(230,165,172,0.25))'
                  : 'rgba(38, 12, 22, 0.6)',
              color: filterCategory === cat.id ? '#e6cfa0' : '#cda86a88',
              fontSize: 11,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              backdropFilter: 'blur(8px)',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── 3D FLASH CARD STACK CONTAINER ── */}
      <div
        style={{
          position: 'relative',
          width: 'min(380px, 92vw)',
          minHeight: 390,
          perspective: 1200,
        }}
      >
        {/* Soft Background Card Stacks */}
        <div
          style={{
            position: 'absolute',
            inset: 8,
            borderRadius: 24,
            background: 'rgba(40, 14, 24, 0.5)',
            border: '1px solid rgba(205,168,106,0.15)',
            transform: 'rotate(2.5deg) scale(0.97)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 4,
            borderRadius: 24,
            background: 'rgba(50, 18, 30, 0.6)',
            border: '1px solid rgba(205,168,106,0.2)',
            transform: 'rotate(-1.5deg) scale(0.985)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* ── ACTIVE FLASH CARD ── */}
        <div
          key={animKey}
          onClick={() => setIsFlipped(f => !f)}
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            minHeight: 390,
            borderRadius: 24,
            background: 'rgba(30, 10, 18, 0.88)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            border: '1.5px solid rgba(205,168,106,0.4)',
            boxShadow:
              '0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(205,168,106,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
            padding: '24px 22px 20px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            userSelect: 'none',
            animation:
              animDirection === 'next'
                ? 'scrapbookShuffleNext 0.5s cubic-bezier(0.2, 0.9, 0.4, 1) forwards'
                : 'scrapbookShufflePrev 0.5s cubic-bezier(0.2, 0.9, 0.4, 1) forwards',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.4s ease, border-color 0.2s',
          }}
          title="Click to flip card"
        >
          {/* Top Edge Shimmer */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 1.5,
              background:
                'linear-gradient(90deg, transparent, #cda86a88, #e6cfa0, #cda86a88, transparent)',
            }}
          />

          {/* Top Card Meta Info */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 14,
              }}
            >
              {/* Day & Date Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(205,168,106,0.12)',
                  border: '1px solid rgba(205,168,106,0.3)',
                  padding: '4px 12px',
                  borderRadius: 999,
                }}
              >
                <Calendar size={12} color="#cda86a" />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 10.5,
                    fontWeight: 600,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: '#e6cfa0',
                  }}
                >
                  Day {activeCard.day} of 177 · {activeCard.date}
                </span>
              </div>

              {/* Heart Like / Bookmark Button */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={e => handleLike(e, activeCard.day)}
                  style={{
                    background: isCurrentLiked
                      ? 'rgba(230,165,172,0.25)'
                      : 'rgba(255,255,255,0.06)',
                    border: isCurrentLiked
                      ? '1px solid #e6a5ac'
                      : '1px solid rgba(205,168,106,0.25)',
                    borderRadius: '50%',
                    width: 34,
                    height: 34,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.15s, background 0.2s',
                  }}
                  title={isCurrentLiked ? 'Liked' : 'Like Reason'}
                  onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.88)')}
                  onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <Heart
                    size={16}
                    color={isCurrentLiked ? '#e6a5ac' : '#cda86a88'}
                    fill={isCurrentLiked ? '#e6a5ac' : 'transparent'}
                  />
                </button>

                {/* Floating Heart Bursts */}
                {hearts.map(h => (
                  <FloatingHeart
                    key={h.id}
                    heart={h}
                    onDone={() => setHearts(prev => prev.filter(x => x.id !== h.id))}
                  />
                ))}
              </div>
            </div>

            {/* Category tag */}
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 10,
                color: '#cda86a88',
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                marginBottom: 6,
                fontWeight: 500,
              }}
            >
              {activeCard.categoryLabel}
            </div>

            {/* Title */}
            <h4
              style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(19px, 5vw, 23px)',
                fontWeight: 700,
                color: '#e6cfa0',
                margin: '0 0 14px',
                lineHeight: 1.25,
                textShadow: '0 2px 14px rgba(205,168,106,0.3)',
              }}
            >
              {activeCard.title}
            </h4>

            {/* Card Content (Front / Back Flip View) */}
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(205,168,106,0.18)',
                borderRadius: 16,
                padding: '16px 16px',
                minHeight: 140,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {!isFlipped ? (
                // ── FRONT VIEW: The Reason & Story ──
                <div>
                  <p
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontStyle: 'italic',
                      fontSize: 14.5,
                      lineHeight: 1.7,
                      color: '#f5ecdf',
                      margin: 0,
                    }}
                  >
                    "{activeCard.reason}"
                  </p>
                </div>
              ) : (
                // ── BACK VIEW: The Sweet Impact / Bisaya Note ──
                <div style={{ animation: 'fadeIn 0.25s ease' }}>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 9.5,
                      color: '#e6a5ac',
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      marginBottom: 6,
                      fontWeight: 600,
                    }}
                  >
                    How you changed my life:
                  </div>
                  <p
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontStyle: 'italic',
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: '#e6cfa0',
                      margin: 0,
                    }}
                  >
                    {activeCard.impact}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Controls & Flip Hint */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 14,
              paddingTop: 10,
              borderTop: '1px solid rgba(205,168,106,0.15)',
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 10,
                color: '#cda86a88',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <RotateCw size={11} color="#cda86a" />
              {isFlipped ? 'Tap to see reason' : 'Tap card to flip reflection'}
            </span>

            <span
              style={{
                fontSize: 11,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                color: '#e6cfa0',
                letterSpacing: 1,
              }}
            >
              #{activeCard.day}
            </span>
          </div>
        </div>
      </div>

      {/* ── CARD NAVIGATION & RANDOM BUTTON ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginTop: 2,
        }}
      >
        <button
          onClick={handlePrev}
          style={navBtnStyle}
          title="Previous Day Reason"
        >
          <ChevronLeft size={18} color="#cda86a" />
        </button>

        <button
          onClick={handleRandom}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'linear-gradient(135deg, rgba(205,168,106,0.2), rgba(230,165,172,0.15))',
            border: '1px solid rgba(205,168,106,0.4)',
            color: '#e6cfa0',
            fontFamily: 'Inter, sans-serif',
            fontSize: 11.5,
            fontWeight: 600,
            letterSpacing: 1,
            padding: '10px 18px',
            borderRadius: 999,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            transition: 'all 0.2s',
          }}
          title="Pick a Random Day Reason"
        >
          <Shuffle size={13} color="#cda86a" />
          Surprise Reason
        </button>

        <button
          onClick={handleNext}
          style={navBtnStyle}
          title="Next Day Reason"
        >
          <ChevronRight size={18} color="#cda86a" />
        </button>
      </div>

      {/* ── PROGRESS BAR SCRUBBER ── */}
      <div style={{ width: 'min(360px, 90vw)', marginTop: 4 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 10,
            fontFamily: 'Inter, sans-serif',
            color: '#cda86a88',
            marginBottom: 6,
          }}
        >
          <span>June 20 (Courting Start)</span>
          <span style={{ color: '#e6cfa0', fontWeight: 600 }}>
            {activeCard.date} · Card {currentIndex + 1} of {totalCards}
          </span>
          <span>Dec 14 (Birthday)</span>
        </div>

        <input
          type="range"
          min={0}
          max={Math.max(0, totalCards - 1)}
          value={currentIndex}
          onChange={e => changeCard(parseInt(e.target.value), 'next')}
          style={{
            width: '100%',
            height: 4,
            cursor: 'pointer',
            accentColor: '#cda86a',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  )
}

const navBtnStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  border: '1px solid rgba(205,168,106,0.35)',
  background: 'rgba(42, 15, 22, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
  backdropFilter: 'blur(8px)',
  transition: 'transform 0.15s, background 0.2s',
}
