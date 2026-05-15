import type { AACVocabularyItem } from '../../types';

export const vocabulary: AACVocabularyItem[] = [
  // Core words
  { id: 'v-001', word: '更多', wordEn: 'more', category: 'coreWord', contexts: ['requesting', 'foodChoice'], difficultyLevel: 1 },
  { id: 'v-002', word: '停', wordEn: 'stop', category: 'coreWord', contexts: ['protesting'], difficultyLevel: 1 },
  { id: 'v-003', word: '要', wordEn: 'want', category: 'coreWord', contexts: ['requesting', 'foodChoice', 'activityChoice'], difficultyLevel: 1 },
  { id: 'v-004', word: '不要', wordEn: 'no / don\'t want', category: 'coreWord', contexts: ['protesting'], difficultyLevel: 1 },
  { id: 'v-005', word: '帮忙', wordEn: 'help', category: 'coreWord', contexts: ['requesting'], difficultyLevel: 1 },
  { id: 'v-006', word: '好了', wordEn: 'done / finished', category: 'coreWord', contexts: ['protesting', 'commenting'], difficultyLevel: 1 },
  { id: 'v-007', word: '去', wordEn: 'go', category: 'coreWord', contexts: ['requesting', 'activityChoice'], difficultyLevel: 1 },
  { id: 'v-008', word: '给我', wordEn: 'give me', category: 'coreWord', contexts: ['requesting'], difficultyLevel: 2 },
  { id: 'v-009', word: '打开', wordEn: 'open', category: 'coreWord', contexts: ['requesting'], difficultyLevel: 1 },
  { id: 'v-010', word: '是', wordEn: 'yes', category: 'coreWord', contexts: ['commenting', 'socialRoutine'], difficultyLevel: 1 },

  // Food
  { id: 'v-011', word: '水', wordEn: 'water', category: 'food', contexts: ['foodChoice', 'requesting'], difficultyLevel: 1 },
  { id: 'v-012', word: '苹果', wordEn: 'apple', category: 'food', contexts: ['foodChoice'], difficultyLevel: 1 },
  { id: 'v-013', word: '牛奶', wordEn: 'milk', category: 'food', contexts: ['foodChoice'], difficultyLevel: 1 },
  { id: 'v-014', word: '饼干', wordEn: 'cookie', category: 'food', contexts: ['foodChoice'], difficultyLevel: 1 },
  { id: 'v-015', word: '米饭', wordEn: 'rice', category: 'food', contexts: ['foodChoice'], difficultyLevel: 1 },
  { id: 'v-016', word: '面条', wordEn: 'noodles', category: 'food', contexts: ['foodChoice'], difficultyLevel: 2 },
  { id: 'v-017', word: '鸡肉', wordEn: 'chicken', category: 'food', contexts: ['foodChoice'], difficultyLevel: 2 },
  { id: 'v-018', word: '香蕉', wordEn: 'banana', category: 'food', contexts: ['foodChoice'], difficultyLevel: 2 },
  { id: 'v-019', word: '果汁', wordEn: 'juice', category: 'food', contexts: ['foodChoice'], difficultyLevel: 2 },

  // Actions
  { id: 'v-020', word: '吃', wordEn: 'eat', category: 'action', contexts: ['foodChoice', 'requesting'], difficultyLevel: 1 },
  { id: 'v-021', word: '喝', wordEn: 'drink', category: 'action', contexts: ['foodChoice', 'requesting'], difficultyLevel: 1 },
  { id: 'v-022', word: '玩', wordEn: 'play', category: 'action', contexts: ['activityChoice', 'requesting'], difficultyLevel: 1 },
  { id: 'v-023', word: '看', wordEn: 'look/watch', category: 'action', contexts: ['commenting', 'requesting'], difficultyLevel: 1 },
  { id: 'v-024', word: '推', wordEn: 'push', category: 'action', contexts: ['requesting', 'activityChoice'], difficultyLevel: 2 },
  { id: 'v-025', word: '跳', wordEn: 'jump', category: 'action', contexts: ['activityChoice'], difficultyLevel: 2 },
  { id: 'v-026', word: '洗', wordEn: 'wash', category: 'action', contexts: ['commenting'], difficultyLevel: 2 },
  { id: 'v-027', word: '跑', wordEn: 'run', category: 'action', contexts: ['activityChoice'], difficultyLevel: 2 },
  { id: 'v-028', word: '画', wordEn: 'draw', category: 'action', contexts: ['activityChoice'], difficultyLevel: 2 },
  { id: 'v-029', word: '读/念', wordEn: 'read', category: 'action', contexts: ['activityChoice'], difficultyLevel: 2 },

  // Descriptors
  { id: 'v-030', word: '大', wordEn: 'big', category: 'descriptor', contexts: ['commenting'], difficultyLevel: 2 },
  { id: 'v-031', word: '小', wordEn: 'small', category: 'descriptor', contexts: ['commenting'], difficultyLevel: 2 },
  { id: 'v-032', word: '热', wordEn: 'hot', category: 'descriptor', contexts: ['commenting', 'foodChoice'], difficultyLevel: 2 },
  { id: 'v-033', word: '冷/凉', wordEn: 'cold', category: 'descriptor', contexts: ['commenting'], difficultyLevel: 2 },
  { id: 'v-034', word: '软', wordEn: 'soft', category: 'descriptor', contexts: ['commenting'], difficultyLevel: 3 },
  { id: 'v-035', word: '湿', wordEn: 'wet', category: 'descriptor', contexts: ['commenting'], difficultyLevel: 3 },

  // Social
  { id: 'v-036', word: '你好', wordEn: 'hello', category: 'social', contexts: ['greeting', 'socialRoutine'], difficultyLevel: 1 },
  { id: 'v-037', word: '再见', wordEn: 'bye', category: 'social', contexts: ['greeting', 'socialRoutine'], difficultyLevel: 1 },
  { id: 'v-038', word: '请', wordEn: 'please', category: 'social', contexts: ['socialRoutine', 'requesting'], difficultyLevel: 2 },
  { id: 'v-039', word: '谢谢', wordEn: 'thank you', category: 'social', contexts: ['socialRoutine'], difficultyLevel: 1 },
  { id: 'v-040', word: '轮到我', wordEn: 'my turn', category: 'social', contexts: ['socialRoutine', 'requesting'], difficultyLevel: 2 },
  { id: 'v-041', word: '轮到你', wordEn: 'your turn', category: 'social', contexts: ['socialRoutine'], difficultyLevel: 2 },

  // Feelings
  { id: 'v-042', word: '开心', wordEn: 'happy', category: 'feeling', contexts: ['commenting'], difficultyLevel: 2 },
  { id: 'v-043', word: '难过', wordEn: 'sad', category: 'feeling', contexts: ['commenting'], difficultyLevel: 2 },
  { id: 'v-044', word: '累', wordEn: 'tired', category: 'feeling', contexts: ['commenting'], difficultyLevel: 2 },
  { id: 'v-045', word: '饿', wordEn: 'hungry', category: 'feeling', contexts: ['commenting', 'foodChoice'], difficultyLevel: 2 },
  { id: 'v-046', word: '生气', wordEn: 'angry', category: 'feeling', contexts: ['commenting'], difficultyLevel: 3 },

  // Objects
  { id: 'v-047', word: '球', wordEn: 'ball', category: 'object', contexts: ['activityChoice', 'requesting'], difficultyLevel: 1 },
  { id: 'v-048', word: '书', wordEn: 'book', category: 'object', contexts: ['activityChoice'], difficultyLevel: 1 },
  { id: 'v-049', word: '泡泡', wordEn: 'bubbles', category: 'object', contexts: ['activityChoice', 'requesting'], difficultyLevel: 1 },
  { id: 'v-050', word: '毯子', wordEn: 'blanket', category: 'object', contexts: ['requesting'], difficultyLevel: 2 },
  { id: 'v-051', word: '鞋子', wordEn: 'shoes', category: 'object', contexts: ['commenting'], difficultyLevel: 2 },
  { id: 'v-052', word: '外面', wordEn: 'outside', category: 'object', contexts: ['activityChoice', 'requesting'], difficultyLevel: 1 },
];

export function getVocabularyByContext(context: string): AACVocabularyItem[] {
  return vocabulary.filter(v => v.contexts.includes(context as any));
}

export function getVocabularyByCategory(category: string): AACVocabularyItem[] {
  return vocabulary.filter(v => v.category === category);
}

export function getVocabularyByLevel(level: 1 | 2 | 3): AACVocabularyItem[] {
  return vocabulary.filter(v => v.difficultyLevel <= level);
}
