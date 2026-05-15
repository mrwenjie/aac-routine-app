/**
 * English translations for data content (schedule slots, AAC scenarios, activities).
 * Chinese content lives in the original data files; this file provides English overrides.
 * If a translation is missing, helpers fall back to the Chinese original.
 */
import type { Language } from './translations';

// ── Schedule slot labels ──────────────────────────────────────────────
const slotLabelsEn: Record<string, string> = {
  // Weekday
  'weekday-1': 'Home time',
  'weekday-2': 'Cooking time',
  'weekday-3': 'Dinner',
  'weekday-4': 'Screen time',
  'weekday-5': 'Bath time',
  'weekday-6': 'Activity time',
  'weekday-7': 'Quiet time',
  'weekday-8': 'Bedtime prep',
  // Weekend
  'weekend-1': 'Breakfast',
  'weekend-2': 'Screen time',
  'weekend-3': 'Outdoor play',
  'weekend-4': 'Sensory play',
  'weekend-5': 'Free play',
  'weekend-6': 'Lunch prep',
  'weekend-7': 'Lunch',
  'weekend-8': 'Screen time',
  'weekend-9': 'Nap / quiet time',
  'weekend-10': 'Outdoor play',
  'weekend-11': 'Sensory play',
  'weekend-12': 'Screen time',
  'weekend-13': 'Creative play',
  'weekend-14': 'Dinner prep',
  'weekend-15': 'Dinner',
  'weekend-16': 'Walk outside',
  'weekend-17': 'Bath',
  'weekend-18': 'Screen time',
  'weekend-19': 'Quiet activity',
  'weekend-20': 'Bedtime prep',
};

export function slotLabel(id: string, zhLabel: string, lang: Language): string {
  return lang === 'en' ? (slotLabelsEn[id] ?? zhLabel) : zhLabel;
}

// ── AAC scenario content ──────────────────────────────────────────────
interface ScenarioEn {
  title: string;
  description: string;
  modelScript: string;
  tips: string[];
}

const scenarioContentEn: Record<string, ScenarioEn> = {
  'sc-001': {
    title: 'Greeting at home',
    description: 'Use AAC to greet ZW when picking him up',
    modelScript: 'After arriving home, bring out AAC, point to "hello" and say "Hello! We\'re home!" Wait a few seconds to see if he imitates.',
    tips: ['Don\'t rush — give him 5-10 seconds to respond', 'If he presses, give immediate positive feedback', 'Even if he doesn\'t press, your modeling is effective'],
  },
  'sc-002': {
    title: 'Saying goodnight',
    description: 'Use AAC to say goodnight/goodbye before bed',
    modelScript: 'Before turning off the light, point to "goodbye" on AAC and say "Goodnight! Bye bye!"',
    tips: ['Practice by saying goodbye to stuffed animals', 'Make it a fixed bedtime routine'],
  },
  'sc-003': {
    title: 'Choosing dinner food',
    description: 'Let ZW use AAC to choose what to eat',
    modelScript: 'Place two foods in front of him, point to the matching AAC pictures and ask "Rice or noodles?" Wait for his choice.',
    tips: ['Start with just two options', 'When he points at food, guide him to press AAC first', 'Give it immediately after he chooses to reinforce AAC'],
  },
  'sc-004': {
    title: 'Requesting more food',
    description: 'Give small portions so he can request more via AAC',
    modelScript: 'Give a small bite. After he finishes, point to AAC and say "Want more?" Point to "more". Wait for him to press.',
    tips: ['Give small portions to create multiple request opportunities', 'When he gestures wanting more, redirect to AAC', 'He already uses "more" and "water" at ABA — reinforce at home'],
  },
  'sc-005': {
    title: 'Choosing a drink',
    description: 'Let ZW use AAC to choose what to drink',
    modelScript: 'Hold up two cups (water and milk/juice), point to AAC and ask "Water? Or milk?"',
    tips: ['He already says "water" on AAC — expand to other drinks', 'If he grabs directly, gently guide: "Tell me on AAC first"'],
  },
  'sc-006': {
    title: 'Choosing what to play',
    description: 'Let ZW use AAC to pick an activity',
    modelScript: 'Hold up two options (e.g. ball and bubbles), point to AAC and ask "Ball? Or bubbles?"',
    tips: ['Pair real objects with AAC pictures', 'Start the chosen activity immediately', 'This is one of the most natural AAC use cases'],
  },
  'sc-007': {
    title: 'Go outside or stay in',
    description: 'Let ZW choose between going out or staying home',
    modelScript: 'Point to the door and "outside" on AAC: "Go outside?" Then point to toys and "play": "Stay and play?"',
    tips: ['Use gestures along with AAC', 'Go outside when possible (he loves outdoor activities)', 'Skip this choice if it\'s dark — just do indoor activities'],
  },
  'sc-008': {
    title: 'Asking for help',
    description: 'Guide him to say "help" on AAC when he needs assistance',
    modelScript: 'When he can\'t open something or needs help, point to AAC and say "Help? Need help?" Wait for him to press.',
    tips: ['Deliberately give him containers he can\'t open', 'When he cries or pulls your hand, redirect: "Tell me on AAC"', 'Help him immediately after he presses — build cause and effect'],
  },
  'sc-009': {
    title: 'Requesting to continue',
    description: 'Pause a fun activity and let him request more via AAC',
    modelScript: 'During a favorite activity (swinging, trampoline), suddenly stop. Wait for eye contact, then point to AAC: "More? Want more?"',
    tips: ['Pausing is the most powerful AAC teaching strategy', 'Use his favorite activities for this', 'Don\'t wait too long — 3-5 seconds is enough'],
  },
  'sc-010': {
    title: 'Describing feelings',
    description: 'Help ZW express feelings with AAC',
    modelScript: 'When he looks happy, point to AAC: "Happy! You\'re happy!" When tired: "Tired? You\'re tired."',
    tips: ['Start by modeling — don\'t require immediate response', 'Describe during natural emotional moments', 'Use exaggerated facial expressions'],
  },
  'sc-011': {
    title: 'Describing what we see',
    description: 'During walks or reading, name things using AAC',
    modelScript: 'Point to things and say "Look!" then find the word on AAC. "Look! Big tree!" "Look! Little dog!"',
    tips: ['He doesn\'t need to respond every time', 'Your modeling IS the teaching', 'Choose things he\'s interested in'],
  },
  'sc-012': {
    title: 'Saying "no" and "done"',
    description: 'Teach ZW to refuse or signal "done" using AAC',
    modelScript: 'When he pushes something away or turns his head, point to AAC: "No? You don\'t want it. OK!"',
    tips: ['Accept his refusal! Using AAC to say no is much better than crying', 'This teaches him that saying "no" works', 'End of screen time is a great chance to practice "done"'],
  },
  'sc-013': {
    title: 'Saying thank you',
    description: 'Guide him to say thanks on AAC when receiving things',
    modelScript: 'When giving him food/toys, point to AAC and say "Thank you!" Help him press. Gradually let him do it alone.',
    tips: ['Don\'t force it — model first', 'Give a big smile when he presses', 'Pick 1-2 moments per day to practice'],
  },
  'sc-014': {
    title: 'Taking turns',
    description: 'Practice "my turn" and "your turn" during games',
    modelScript: 'During a turn-taking game (blocks, ball), point to AAC each turn: "My turn!" or "Your turn!"',
    tips: ['Start with simple two-person turn-taking', 'Use exaggerated gestures and sounds', 'This aligns with his ABA social goals'],
  },
  'sc-015': {
    title: 'Choosing bath toys',
    description: 'Let ZW use AAC to pick bath toys',
    modelScript: 'Hold up 2-3 bath toys, point to AAC and ask "Which one?" Wait for his choice.',
    tips: ['Bath is a daily routine — easy to build habits', 'Give the chosen toy immediately to reinforce AAC', 'Gradually increase the number of options'],
  },
  'sc-016': {
    title: 'Breakfast choice (weekend)',
    description: 'Weekend breakfast — more time for ZW to choose via AAC',
    modelScript: 'Show two breakfast options, point to AAC and ask "What to eat? Milk or juice?"',
    tips: ['Weekends allow more wait time', 'Pairing with real food works best', 'Encourage him to browse AAC pictures himself'],
  },
};

export function scenarioTitle(id: string, zhTitle: string, lang: Language): string {
  return lang === 'en' ? (scenarioContentEn[id]?.title ?? zhTitle) : zhTitle;
}
export function scenarioDescription(id: string, zhDesc: string, lang: Language): string {
  return lang === 'en' ? (scenarioContentEn[id]?.description ?? zhDesc) : zhDesc;
}
export function scenarioModelScript(id: string, zhScript: string, lang: Language): string {
  return lang === 'en' ? (scenarioContentEn[id]?.modelScript ?? zhScript) : zhScript;
}
export function scenarioTips(id: string, zhTips: string[], lang: Language): string[] {
  return lang === 'en' ? (scenarioContentEn[id]?.tips ?? zhTips) : zhTips;
}

// ── Activity content ──────────────────────────────────────────────────
interface ActivityEn {
  name: string;
  description: string;
  aacWords?: string[];
  promptScript?: string;
  scenarioDesc?: string;
}

const activityContentEn: Record<string, ActivityEn> = {
  // Deep pressure
  'dp-001': { name: 'Pillow sandwich', description: 'Place child between two big pillows, gently press. Count 1-2-3 and ask "more?"', aacWords: ['more', 'stop', 'press', 'good'], promptScript: 'Before each press, point to AAC "press". After, ask "more?" pointing to "more" or "stop"', scenarioDesc: 'Practice "more" and "stop" during deep pressure' },
  'dp-002': { name: 'Blanket burrito', description: 'Roll child tightly in a blanket like a burrito, then slowly unroll. Repeat.', aacWords: ['roll', 'open', 'more', 'tight'], promptScript: 'Before rolling say "roll roll roll", unrolling say "open!" Let child choose "roll" or "open" on AAC', scenarioDesc: 'Practice action words during blanket game' },
  'dp-003': { name: 'Wall push', description: 'Push the wall together with both hands, pretending to push it down. Count or sing along.', aacWords: ['push', 'hard', 'stop', '1-2-3'], promptScript: 'Push together, press "push" on AAC before each push, say "harder!" when pushing', scenarioDesc: 'Practice verbs during wall push' },
  'dp-004': { name: 'Bear hug', description: 'Give a tight hug, pressing steadily from shoulders to arms for 10-15 seconds.', aacWords: ['hug', 'more', 'tight', 'good'], promptScript: 'Before hugging, point to AAC "hug". After, ask "more?"', scenarioDesc: 'Practice requesting during hugs' },
  'dp-005': { name: 'Cushion stacking', description: 'Child lies down while you stack sofa cushions on them one by one, feeling the weight.', aacWords: ['more', 'heavy', 'off', 'good'], promptScript: 'Each cushion added, point to AAC "more". Ask "more?" or "off?"', scenarioDesc: 'Practice "more" and "off" during stacking game' },
  'dp-006': { name: 'Joint compressions', description: 'Gently press shoulders, elbows, wrists, knees — 5 presses per joint.', aacWords: ['hand', 'foot', 'more', 'done'], promptScript: 'Before pressing, choose body part on AAC: "Press hand? Or foot?"', scenarioDesc: 'Practice body part vocabulary during joint compressions' },
  'dp-007': { name: 'Towel wrap', description: 'After bath, wrap child tightly in a large towel — the rubbing and pressure provide deep input.', aacWords: ['wrap', 'tight', 'open', 'done'], promptScript: 'Wrapping: "wrap wrap wrap". Let child use AAC to say "open" to unwrap.', scenarioDesc: 'Practice verbs during towel game' },
  'dp-008': { name: 'Squeeze ball', description: 'Give child a squeeze/stress ball to squeeze hard. Can compete who squeezes harder.', aacWords: ['squeeze', 'hard', 'soft', 'fun'], promptScript: 'Squeeze together, say "squeeze!" each time, encourage child to say "hard" on AAC', scenarioDesc: 'Practice verbs and descriptors with squeeze ball' },
  'dp-009': { name: 'Foam roller massage', description: 'Gently roll a foam roller on child\'s back and legs, like a massage.', aacWords: ['roll', 'back', 'legs', 'more'], promptScript: 'Ask "roll back? Or roll legs?" Let child choose on AAC', scenarioDesc: 'Practice body parts and choices during massage' },
  'dp-010': { name: 'Weighted blanket rest', description: 'Rest under a weighted blanket while reading or relaxing — continuous deep pressure.', aacWords: ['cover', 'heavy', 'comfy', 'done'], promptScript: 'Covering up: "cover". Ask "comfy?"', scenarioDesc: 'Practice describing feelings during rest time' },

  // Sensory tactile
  'st-001': { name: 'Water play', description: 'A basin of warm water with cups, funnels, and small toys for pouring and splashing.', aacWords: ['water', 'pour', 'wet', 'more'], promptScript: 'Pouring: "pour!". Splashing: "wet!" Guide child to describe on AAC', scenarioDesc: 'Practice descriptors and verbs during water play' },
  'st-002': { name: 'Kinetic sand', description: 'Squeeze, press, and cut kinetic sand. Use molds to make shapes.', aacWords: ['squeeze', 'cut', 'soft', 'make'], promptScript: 'Before making shapes ask "make what?" When using molds say "cut!" Encourage AAC', scenarioDesc: 'Practice action words during sand play' },
  'st-003': { name: 'Play-Doh', description: 'Roll, press, cut, and stretch Play-Doh. Make simple shapes together.', aacWords: ['roll', 'press', 'big', 'small'], promptScript: 'Describe sizes while making things: "Big! Small!" Let child choose on AAC', scenarioDesc: 'Practice size words and verbs with Play-Doh' },
  'st-004': { name: 'Bubble blowing', description: 'Blow bubbles indoors or outdoors. Chase and pop them!', aacWords: ['bubble', 'blow', 'pop', 'more'], promptScript: 'Wait before blowing — let child say "blow" or "bubble" on AAC first. When popping: "pop!"', scenarioDesc: 'Practice requesting and verbs with bubbles' },
  'st-005': { name: 'Sensory bin (rice/beans)', description: 'Fill a box with rice or beans, hide small toys for child to find.', aacWords: ['find', 'where', 'found it', 'more'], promptScript: 'After hiding toys ask "where?" When found: "found it!" Encourage AAC', scenarioDesc: 'Practice question words during treasure hunt' },
  'st-006': { name: 'Pop-it fidget', description: 'Press silicone pop-it toy, flip and press again.', aacWords: ['press', 'flip', 'more', 'done'], promptScript: 'Take turns pressing: "My turn! Your turn!" Practice turn-taking', scenarioDesc: 'Practice turn-taking and verbs with Pop-it' },
  'st-007': { name: 'Sticker activity', description: 'Peel stickers and stick them on paper or body parts — fine motor and tactile input.', aacWords: ['stick', 'here', 'hand', 'star'], promptScript: 'Ask "stick where?" Let child choose location on AAC', scenarioDesc: 'Practice location words during sticker activity' },
  'st-008': { name: 'Shaving cream art', description: 'Spray shaving cream on a tray, draw with fingers, write letters.', aacWords: ['draw', 'slippery', 'cool', 'fun'], promptScript: 'Draw together, describe: "slippery! cool!" Encourage child to describe on AAC', scenarioDesc: 'Practice descriptors during sensory art' },

  // Gross motor
  'gm-001': { name: 'Chase game', description: 'Chase each other around the house: "I\'m gonna get you!" End with a big bear hug.', aacWords: ['run', 'catch', 'more', 'stop'], promptScript: 'Before running: "Ready! Run!" Encourage child to say "run" or "more" on AAC to continue', scenarioDesc: 'Practice verbs and requesting during chase' },
  'gm-002': { name: 'Mini trampoline', description: 'Jump on a small indoor trampoline. Count jumps or sing while jumping.', aacWords: ['jump', 'high', 'more', 'stop'], promptScript: 'Pause jumping — let child say "jump" or "more" on AAC to continue', scenarioDesc: 'Practice requesting to continue on trampoline' },
  'gm-003': { name: 'Pillow fight', description: 'Gently hit each other with soft pillows and throw them. Big motor + deep pressure.', aacWords: ['hit', 'throw', 'mine', 'my turn'], promptScript: 'Before throwing: "throw!" Practice turns: "your turn! my turn!"', scenarioDesc: 'Practice turn-taking during pillow fight' },
  'gm-004': { name: 'Animal walks', description: 'Walk like animals: bear walk (all fours), crab walk (sideways), frog jump, penguin waddle.', aacWords: ['bear', 'frog', 'jump', 'walk'], promptScript: 'Let child choose on AAC: "Walk like which animal?" Then imitate together', scenarioDesc: 'Practice animal and action words' },
  'gm-005': { name: 'Hide and seek', description: 'Play hide and seek at home. Take turns hiding and finding.', aacWords: ['hide', 'find', 'where', 'found you'], promptScript: 'While seeking: "where?" When found: "found you!" Encourage AAC', scenarioDesc: 'Practice question words and exclamations' },
  'gm-006': { name: 'Obstacle course', description: 'Build a simple course with pillows and chairs — crawl, duck, and jump through.', aacWords: ['crawl', 'jump', 'duck', 'go'], promptScript: 'At each obstacle say the action: "crawl! jump!" Let child choose action on AAC', scenarioDesc: 'Practice action words during obstacle course' },
  'gm-007': { name: 'Dance party', description: 'Play music and dance together. Sway to the beat, clap hands, spin around.', aacWords: ['dance', 'music', 'spin', 'stop'], promptScript: 'When music stops: "stop!" When it starts: "dance!" Let child control music via AAC', scenarioDesc: 'Practice control words during dancing' },
  'gm-008': { name: 'Kick ball', description: 'Kick a soft ball back and forth indoors or outdoors.', aacWords: ['kick', 'ball', 'my turn', 'your turn'], promptScript: 'Before kicking: "kick!" Take turns: "your turn! my turn!"', scenarioDesc: 'Practice turn-taking and verbs with ball' },

  // Outdoor
  'od-001': { name: 'Walk', description: 'Walk around the neighborhood, look at surroundings, talk about what you see.', aacWords: ['walk', 'look', 'tree', 'car'], promptScript: 'Point at things: "look! tree!" "look! car!" Let child name things on AAC', scenarioDesc: 'Practice naming and describing during walks' },
  'od-002': { name: 'Swings', description: 'Swing at the park. Wait for child to request a push via AAC.', aacWords: ['push', 'high', 'more', 'stop'], promptScript: 'Push then stop — wait for child to say "push" or "more" on AAC before pushing again', scenarioDesc: 'Practice requesting on the swings' },
  'od-003': { name: 'Slide', description: 'Play on the slide at the park. Climb up, slide down, repeat.', aacWords: ['up', 'down', 'slide', 'more'], promptScript: 'Climbing: "up!" Sliding: "down! slide!" Let child say "slide" on AAC', scenarioDesc: 'Practice direction words and verbs on the slide' },
  'od-004': { name: 'Bike / scooter', description: 'Ride a tricycle or scooter around the neighborhood. Practice direction control.', aacWords: ['ride', 'go', 'fast', 'stop'], promptScript: 'Before riding say "go" on AAC. At intersections say "stop"', scenarioDesc: 'Practice verbs and safety words while riding' },
  'od-005': { name: 'Collect leaves/rocks', description: 'Pick up different colored leaves and shaped rocks, put them in a bag.', aacWords: ['leaf', 'rock', 'big', 'small'], promptScript: 'When picking up: "leaf! big one!" "rock! small one!" Let child describe on AAC', scenarioDesc: 'Practice nouns and size words during outdoor exploring' },
  'od-006': { name: 'Chase bubbles', description: 'Blow bubbles outdoors for child to chase and pop. Running + visual tracking.', aacWords: ['bubble', 'blow', 'pop', 'more'], promptScript: 'Wait for child to say "bubble" or "blow" on AAC before blowing more', scenarioDesc: 'Practice requesting during outdoor bubbles' },
  'od-007': { name: 'Play in sand', description: 'Dig, pile, and fill buckets in the park sandbox. Tactile + creative.', aacWords: ['dig', 'pour', 'pile', 'more'], promptScript: 'Digging together, say action words: "dig! pour! pile!" Let child choose action on AAC', scenarioDesc: 'Practice action words during sand play' },
  'od-008': { name: 'Puddle jumping', description: 'After rain, find puddles to jump in. Wear rain boots and splash!', aacWords: ['jump', 'water', 'wet', 'fun'], promptScript: 'Before jumping: "jump!" Splashing: "wet! fun!"', scenarioDesc: 'Practice descriptors during puddle jumping' },

  // Quiet activities
  'qa-001': { name: 'Picture books', description: 'Look at picture books together, point at pictures and name them. No need to read text.', aacWords: ['look', 'turn', 'what', 'this'], promptScript: 'Point at pictures: "what\'s this?" Let child name things on AAC', scenarioDesc: 'Practice naming and pointing during reading' },
  'qa-002': { name: 'Puzzles', description: 'Do simple puzzles (6-12 pieces). Work together to complete them.', aacWords: ['put', 'here', 'help', 'done'], promptScript: 'While placing pieces: "put here!" When stuck, let child say "help" on AAC', scenarioDesc: 'Practice requesting help during puzzles' },
  'qa-003': { name: 'Building blocks', description: 'Stack blocks into a tower, then knock it down. Simple and fun!', aacWords: ['put', 'tall', 'fall', 'more'], promptScript: 'Stacking: "put! put! so tall!" Knocking down: "fall!"', scenarioDesc: 'Practice verbs and descriptors with blocks' },
  'qa-004': { name: 'Coloring', description: 'Color with crayons or markers. Choose simple, large-area pictures.', aacWords: ['red', 'blue', 'draw', 'done'], promptScript: 'Ask "what color?" Let child choose colors on AAC', scenarioDesc: 'Practice color words during coloring' },
  'qa-005': { name: 'Matching game', description: 'Play matching/memory card game. Flip two cards to see if they match.', aacWords: ['flip', 'same', 'different', 'my turn'], promptScript: 'Flipping: "flip!" Match: "same!" No match: "different!" Encourage AAC', scenarioDesc: 'Practice descriptions and turn-taking in matching game' },
  'qa-006': { name: 'Bead stringing', description: 'String large beads on a cord — fine motor and hand-eye coordination.', aacWords: ['thread', 'red', 'blue', 'more'], promptScript: 'For each bead, choose color: "red? blue?" Let child pick on AAC', scenarioDesc: 'Practice color choices during bead stringing' },
  'qa-007': { name: 'Magnetic tiles', description: 'Build shapes with magnetic tiles — houses, cars, etc.', aacWords: ['build', 'house', 'big', 'done'], promptScript: 'Building: "build! build a house!" When finished: "done!"', scenarioDesc: 'Practice nouns and verbs with magnetic tiles' },
  'qa-008': { name: 'Listen to music', description: 'Lie down or sit and listen to calm music. Can combine with deep breathing.', aacWords: ['music', 'listen', 'quiet', 'good'], promptScript: 'Before playing music, let child say "music" or "listen" on AAC', scenarioDesc: 'Practice requesting during music time' },
};

export function activityName(id: string, zhName: string, lang: Language): string {
  return lang === 'en' ? (activityContentEn[id]?.name ?? zhName) : zhName;
}
export function activityDescription(id: string, zhDesc: string, lang: Language): string {
  return lang === 'en' ? (activityContentEn[id]?.description ?? zhDesc) : zhDesc;
}
export function activityAACWords(id: string, zhWords: string[], lang: Language): string[] {
  return lang === 'en' ? (activityContentEn[id]?.aacWords ?? zhWords) : zhWords;
}
export function activityPromptScript(id: string, zhScript: string, lang: Language): string {
  return lang === 'en' ? (activityContentEn[id]?.promptScript ?? zhScript) : zhScript;
}
