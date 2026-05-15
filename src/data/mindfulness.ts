/**
 * Mindfulness exercises and default affirmation content.
 * Based on ACT, mindfulness, and self-compassion research for ASD parents.
 */

export type ExerciseCategory = 'breathing' | 'grounding' | 'defusion' | 'compassion' | 'gratitude' | 'physical';

export interface MindfulnessExercise {
  id: string;
  category: ExerciseCategory;
  title: string;
  titleEn: string;
  durationSeconds: number;
  steps: string[];
  stepsEn: string[];
}

export const exercises: MindfulnessExercise[] = [
  // Breathing (3)
  {
    id: 'ex-01',
    category: 'breathing',
    title: '方块呼吸',
    titleEn: 'Box Breathing',
    durationSeconds: 60,
    steps: [
      '吸气 4 秒',
      '屏住 4 秒',
      '呼气 4 秒',
      '屏住 4 秒',
      '重复 3-5 次',
    ],
    stepsEn: [
      'Inhale for 4 seconds',
      'Hold for 4 seconds',
      'Exhale for 4 seconds',
      'Hold for 4 seconds',
      'Repeat 3-5 cycles',
    ],
  },
  {
    id: 'ex-02',
    category: 'breathing',
    title: '延长呼气',
    titleEn: 'Extended Exhale',
    durationSeconds: 60,
    steps: [
      '吸气 4 秒',
      '慢慢呼气 6-8 秒',
      '感受身体放松下来',
      '重复 5 次',
    ],
    stepsEn: [
      'Inhale for 4 seconds',
      'Slowly exhale for 6-8 seconds',
      'Feel your body relax',
      'Repeat 5 times',
    ],
  },
  {
    id: 'ex-03',
    category: 'breathing',
    title: '"风暴过后"呼吸',
    titleEn: '"After the Storm" Breath',
    durationSeconds: 60,
    steps: [
      '三次深呼吸',
      '每次呼气时默念：',
      '"这个时刻已经过去了"',
      '"我已经尽力了"',
      '"现在可以放松了"',
    ],
    stepsEn: [
      'Take three deep breaths',
      'On each exhale, silently say:',
      '"This moment has passed"',
      '"I did my best"',
      '"I can relax now"',
    ],
  },

  // Grounding (3)
  {
    id: 'ex-04',
    category: 'grounding',
    title: '5-4-3-2-1 感官着陆',
    titleEn: '5-4-3-2-1 Grounding',
    durationSeconds: 120,
    steps: [
      '看：说出你看到的 5 样东西',
      '摸：感受你能触碰到的 4 样东西',
      '听：留意你听到的 3 种声音',
      '闻：注意 2 种气味',
      '尝：感受 1 种味道',
    ],
    stepsEn: [
      'See: Name 5 things you can see',
      'Touch: Feel 4 things you can touch',
      'Hear: Notice 3 sounds you hear',
      'Smell: Notice 2 scents',
      'Taste: Notice 1 taste',
    ],
  },
  {
    id: 'ex-05',
    category: 'grounding',
    title: '暖杯子冥想',
    titleEn: 'Warm Cup Meditation',
    durationSeconds: 120,
    steps: [
      '倒一杯温水或茶',
      '双手握住杯子',
      '感受手心的温度',
      '闻一闻杯中的气味',
      '慢慢喝一口，感受温暖流过身体',
    ],
    stepsEn: [
      'Pour a cup of warm water or tea',
      'Hold the cup with both hands',
      'Feel the warmth in your palms',
      'Smell the scent from the cup',
      'Take a slow sip, feel warmth flow through you',
    ],
  },
  {
    id: 'ex-06',
    category: 'grounding',
    title: '身体三点检查',
    titleEn: 'Body 3-Point Check',
    durationSeconds: 60,
    steps: [
      '注意你的下巴——放松它',
      '注意你的肩膀——让它们下沉',
      '注意你的双手——松开握紧的手',
      '深呼一口气',
    ],
    stepsEn: [
      'Notice your jaw — relax it',
      'Notice your shoulders — let them drop',
      'Notice your hands — unclench them',
      'Take one deep breath',
    ],
  },

  // Cognitive defusion / ACT (3)
  {
    id: 'ex-07',
    category: 'defusion',
    title: '"谢谢你，大脑"',
    titleEn: '"Thank You, Mind"',
    durationSeconds: 60,
    steps: [
      '当一个焦虑/内疚的想法出现时',
      '不要推开它',
      '默念："谢谢你，大脑，谢谢你分享"',
      '然后让它像云一样飘走',
      '想法不等于事实',
    ],
    stepsEn: [
      'When an anxious/guilty thought appears',
      'Don\'t push it away',
      'Say: "Thank you, Mind, for sharing"',
      'Then let it drift away like a cloud',
      'Thoughts are not facts',
    ],
  },
  {
    id: 'ex-08',
    category: 'defusion',
    title: '溪流上的树叶',
    titleEn: 'Leaves on a Stream',
    durationSeconds: 180,
    steps: [
      '闭上眼睛，想象一条小溪',
      '把每一个想法放在一片树叶上',
      '看着它随水流走',
      '不要推开想法，只是观察',
      '如果走神了，温柔地回来继续',
    ],
    stepsEn: [
      'Close your eyes, imagine a stream',
      'Place each thought on a leaf',
      'Watch it float downstream',
      'Don\'t push thoughts away — just observe',
      'If you drift, gently come back',
    ],
  },
  {
    id: 'ex-09',
    category: 'defusion',
    title: '想法标签',
    titleEn: 'Thought Labeling',
    durationSeconds: 60,
    steps: [
      '当痛苦的想法出现时',
      '在前面加上：',
      '"我注意到我有一个想法……"',
      '例如："我注意到我有一个「我做得不够」的想法"',
      '这改变了你和想法的关系',
    ],
    stepsEn: [
      'When a painful thought appears',
      'Add this prefix:',
      '"I notice I\'m having the thought that..."',
      'e.g. "I notice I\'m having the thought that I\'m not doing enough"',
      'This changes your relationship with the thought',
    ],
  },

  // Self-compassion (3)
  {
    id: 'ex-10',
    category: 'compassion',
    title: '自我关怀暂停',
    titleEn: 'Self-Compassion Break',
    durationSeconds: 60,
    steps: [
      '1. "这是一个艰难的时刻"（承认困难）',
      '2. "其他自闭症孩子的家长也有同样的感受"（共同人性）',
      '3. "愿我对自己多一些温柔"（自我善意）',
    ],
    stepsEn: [
      '1. "This is a moment of suffering" (acknowledge difficulty)',
      '2. "Other ASD parents feel this way too" (common humanity)',
      '3. "May I be kind to myself right now" (self-kindness)',
    ],
  },
  {
    id: 'ex-11',
    category: 'compassion',
    title: '手放心口',
    titleEn: 'Hand on Heart',
    durationSeconds: 60,
    steps: [
      '把一只手放在胸口',
      '感受心跳',
      '默念："我正在尽我所能"',
      '感受手心的温度',
      '这个简单的触碰会释放催产素',
    ],
    stepsEn: [
      'Place one hand on your chest',
      'Feel your heartbeat',
      'Say: "I am doing the best I can"',
      'Feel the warmth of your hand',
      'This simple touch releases oxytocin',
    ],
  },
  {
    id: 'ex-12',
    category: 'compassion',
    title: '许可条',
    titleEn: 'Permission Slip',
    durationSeconds: 30,
    steps: [
      '给自己一个明确的许可：',
      '"今晚，我允许自己不带内疚地休息"',
      '或者：',
      '"我允许自己不完美"',
      '"我允许今天到此为止"',
    ],
    stepsEn: [
      'Give yourself explicit permission:',
      '"Tonight I give myself permission to rest without guilt"',
      'Or:',
      '"I give myself permission to be imperfect"',
      '"I give myself permission to stop for today"',
    ],
  },

  // Gratitude (3)
  {
    id: 'ex-13',
    category: 'gratitude',
    title: '三件好事',
    titleEn: 'Three Good Things',
    durationSeconds: 120,
    steps: [
      '想一件关于孩子的好事，不管多小',
      '想一件关于自己的好事',
      '想一件今天发生的任何好事',
      '让这些感受停留片刻',
    ],
    stepsEn: [
      'Think of one good thing about your child, no matter how small',
      'Think of one good thing about yourself',
      'Think of one good thing that happened today',
      'Let these feelings linger for a moment',
    ],
  },
  {
    id: 'ex-14',
    category: 'gratitude',
    title: '小小胜利',
    titleEn: 'Small Win',
    durationSeconds: 60,
    steps: [
      '回想今天的一个小胜利',
      '可以很小："他今天看了我一眼"',
      '或者："我今天保持了冷静"',
      '感受一下这个成就，它是真实的',
    ],
    stepsEn: [
      'Recall one small win from today',
      'It can be tiny: "He looked at me today"',
      'Or: "I stayed calm today"',
      'Feel this achievement — it is real',
    ],
  },
  {
    id: 'ex-15',
    category: 'gratitude',
    title: '明天的意图',
    titleEn: 'Tomorrow\'s Intention',
    durationSeconds: 30,
    steps: [
      '设一个温柔的意图（不是目标）：',
      '"明天我会注意一个快乐的瞬间"',
      '或者：',
      '"明天我会对自己温柔一点"',
      '不是to-do，只是一个方向',
    ],
    stepsEn: [
      'Set a gentle intention (not a goal):',
      '"Tomorrow I will notice one moment of joy"',
      'Or:',
      '"Tomorrow I will be gentle with myself"',
      'Not a to-do — just a direction',
    ],
  },

  // Physical reset (2)
  {
    id: 'ex-16',
    category: 'physical',
    title: '快速肌肉放松',
    titleEn: 'Quick Muscle Release',
    durationSeconds: 90,
    steps: [
      '双手：握拳 5 秒 → 松开',
      '肩膀：耸到耳朵 5 秒 → 放下',
      '脸：皱起来 5 秒 → 放松',
      '感受每次松开时的放松感',
    ],
    stepsEn: [
      'Hands: Make fists for 5 sec → release',
      'Shoulders: Shrug to ears for 5 sec → drop',
      'Face: Scrunch for 5 sec → relax',
      'Notice the relaxation each time you release',
    ],
  },
  {
    id: 'ex-17',
    category: 'physical',
    title: '冷水激活',
    titleEn: 'Cold Water Reset',
    durationSeconds: 30,
    steps: [
      '用冷水洗手或轻拍脸部',
      '感受凉意唤醒你的感官',
      '这会刺激迷走神经',
      '帮助身体从"战斗模式"切换到"平静模式"',
    ],
    stepsEn: [
      'Wash hands with cold water or splash your face',
      'Feel the coolness awaken your senses',
      'This stimulates the vagus nerve',
      'Helps your body switch from fight-mode to calm-mode',
    ],
  },
];

// Quick reset exercises (always available, not rotated)
export const quickResetIds = ['ex-01', 'ex-04', 'ex-10'];

// Default affirmations (bundled, can be overridden by online fetch)
export const defaultAffirmations: { zh: string; en: string }[] = [
  { zh: '我的孩子的自闭症不是我的错。我是他需要的家长', en: "My child's autism is not my fault. I am the parent they need." },
  { zh: '我正在用现有的资源做到最好', en: 'I am doing the best I can with what I have today.' },
  { zh: '每个家庭的旅程都不同。比较会偷走我的平静', en: 'Every family\'s journey is different. Comparing steals my peace.' },
  { zh: '哪怕2分钟的自我照顾，也是力量的表现，不是自私', en: 'Even 2 minutes of self-care is an act of strength, not selfishness.' },
  { zh: '我的孩子是安全的、被爱的、被照顾的。这不是失败', en: 'My child is safe, loved, and cared for. That is not failure.' },
  { zh: '进步不总是看得见的。小小的步伐也算数', en: 'Progress is not always visible. Small steps count.' },
  { zh: '现在有成千上万的家长和我有同样的感受。我不是一个人', en: 'Thousands of parents share this exact feeling right now. I am not alone.' },
  { zh: '我被允许感到挫败。挫败不代表我不爱我的孩子', en: 'I am allowed to feel frustrated. Frustration does not mean I love my child any less.' },
];

export const defaultPermissions: { zh: string; en: string }[] = [
  { zh: '你今天已经做了足够多。可以停下来了', en: 'You have done enough today. It is okay to stop.' },
  { zh: '你的孩子需要一个休息好的家长，而不是一个完美的家长', en: 'Your child needs a rested parent, not a perfect one.' },
  { zh: '给自己5分钟不是自私——是必须的', en: 'Taking 5 minutes for yourself is not selfish — it is necessary.' },
  { zh: '今晚，你不需要研究、计划或修复任何事情。只需要存在', en: 'Tonight, you don\'t need to research, plan, or fix anything. Just be.' },
  { zh: '照顾好自己，才能更好地照顾他', en: 'Take care of yourself first, so you can better care for him.' },
  { zh: '休息不是放弃。休息是为了走更远的路', en: 'Rest is not giving up. Rest is preparation for the road ahead.' },
];

export const defaultMicroTips: { zh: string; en: string }[] = [
  { zh: '研究显示：自闭症家长的压力水平相当于战区退伍军人。你面对的确实很难', en: 'Research shows: ASD parents experience stress levels comparable to combat veterans. What you face is genuinely hard.' },
  { zh: '研究证明：每天5分钟的正念练习就能降低皮质醇水平、改善情绪', en: 'Studies show: just 5 minutes of daily mindfulness reduces cortisol and improves mood.' },
  { zh: '自我关怀不是自我怜悯。研究表明它实际上让你成为更有效的家长', en: 'Self-compassion is not self-pity. Research shows it actually makes you a more effective parent.' },
  { zh: '同时感到悲伤和爱是正常的。两种感受都是有效的', en: 'It is normal to grieve and love at the same time. Both feelings are valid.' },
  { zh: '寻求帮助不是软弱。建立支持网络是最有效的应对策略之一', en: 'Asking for help is not weakness. Building a support network is one of the most effective coping strategies.' },
  { zh: '研究表明：每天15-20分钟的有意识互动就足以产生显著效果', en: 'Research shows: just 15-20 minutes of intentional interaction daily makes a significant impact.' },
];
