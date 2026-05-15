// === Schedule Types ===

export type SlotCategory =
  | 'transition'
  | 'meal'
  | 'screenTime'
  | 'sensoryActivity'
  | 'outdoor'
  | 'hygiene'
  | 'bedtime'
  | 'freePlay';

export type AACContext =
  | 'greeting'
  | 'foodChoice'
  | 'activityChoice'
  | 'requesting'
  | 'commenting'
  | 'protesting'
  | 'socialRoutine';

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  label: string;
  category: SlotCategory;
  isAACOpportunity: boolean;
  aacContext?: AACContext;
  isScreenTime: boolean;
  activityPoolIds: string[];
  icon: string;
}

export type DayType = 'weekday' | 'weekend';

export interface DaySchedule {
  dayType: DayType;
  slots: TimeSlot[];
}

// === Activity Types ===

export type ActivityCategory =
  | 'deepPressure'
  | 'sensoryTactile'
  | 'grossMotor'
  | 'outdoor'
  | 'quietActivity'
  | 'creativePlay'
  | 'waterPlay';

export interface AACIntegration {
  suggestedWords: string[];
  promptScript: string;
  scenarioDescription: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  category: ActivityCategory;
  tags: string[];
  durationMinutes: number;
  requiresOutdoor: boolean;
  requiresEquipment: string[];
  aacIntegration?: AACIntegration;
}

// === AAC Types ===

export type VocabCategory =
  | 'coreWord'
  | 'food'
  | 'action'
  | 'descriptor'
  | 'social'
  | 'feeling'
  | 'object';

export interface AACVocabularyItem {
  id: string;
  word: string;
  wordEn: string;
  category: VocabCategory;
  contexts: AACContext[];
  difficultyLevel: 1 | 2 | 3;
}

export interface AACScenario {
  id: string;
  context: AACContext;
  title: string;
  description: string;
  targetVocabulary: string[];
  modelScript: string;
  tips: string[];
  linkedTimeSlots: string[];
}

// === Tracking Types ===

export interface AACPracticeLog {
  id: string;
  timestamp: string;
  scenarioId?: string;
  vocabularyUsed: string[];
  context: AACContext;
  notes?: string;
}

export interface ScreenTimeSession {
  id: string;
  startTime: string;
  endTime?: string;
  durationMinutes: number;
  planned: boolean;
}

export interface DailyLog {
  date: string;
  dayType: DayType;
  aacPractices: AACPracticeLog[];
  screenTimeSessions: ScreenTimeSession[];
  completedActivities: string[];
  notes?: string;
}

// === Settings Types ===

export interface AppSettings {
  weekdayPickupTime: string;
  weekdayBedtime: string;
  weekendWakeTime: string;
  weekendBedtime: string;
  screenTimeTargetMinutes: number;
  screenTimeWindowMinutes: number;
  notificationsEnabled: boolean;
  availableEquipment: string[];
  preferredActivities: string[];
  dislikedActivities: string[];
  aacDailyGoal: number;
}

export const DEFAULT_SETTINGS: AppSettings = {
  weekdayPickupTime: '18:00',
  weekdayBedtime: '21:00',
  weekendWakeTime: '08:00',
  weekendBedtime: '21:00',
  screenTimeTargetMinutes: 120,
  screenTimeWindowMinutes: 30,
  notificationsEnabled: true,
  availableEquipment: [],
  preferredActivities: [],
  dislikedActivities: [],
  aacDailyGoal: 3,
};
