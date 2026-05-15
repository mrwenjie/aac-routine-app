import type { AppSettings, DailyLog, MindfulnessReflection } from '../types';
import { DEFAULT_SETTINGS } from '../types';
import { getTodayDateStr, getDayType } from './time';

const SETTINGS_KEY = 'aac-app-settings';
const DAILY_LOG_PREFIX = 'aac-daily-log-';
const ACTIVITY_HISTORY_KEY = 'aac-activity-history';

// Settings
export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch { /* ignore */ }
  return { ...DEFAULT_SETTINGS };
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// Daily Log
export function loadTodayLog(): DailyLog {
  const dateStr = getTodayDateStr();
  try {
    const raw = localStorage.getItem(DAILY_LOG_PREFIX + dateStr);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {
    date: dateStr,
    dayType: getDayType(),
    aacPractices: [],
    screenTimeSessions: [],
    completedActivities: [],
  };
}

export function saveDailyLog(log: DailyLog): void {
  localStorage.setItem(DAILY_LOG_PREFIX + log.date, JSON.stringify(log));
}

export function loadLogForDate(dateStr: string): DailyLog | null {
  try {
    const raw = localStorage.getItem(DAILY_LOG_PREFIX + dateStr);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

export function getRecentLogs(days: number): DailyLog[] {
  const logs: DailyLog[] = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    const log = loadLogForDate(dateStr);
    if (log) logs.push(log);
  }
  return logs;
}

// Activity history (for rotation algorithm)
export interface ActivityUsage {
  activityId: string;
  lastUsedDate: string;
  usageCount: number;
}

export function loadActivityHistory(): ActivityUsage[] {
  try {
    const raw = localStorage.getItem(ACTIVITY_HISTORY_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [];
}

export function saveActivityHistory(history: ActivityUsage[]): void {
  localStorage.setItem(ACTIVITY_HISTORY_KEY, JSON.stringify(history));
}

export function recordActivityUsage(activityId: string): void {
  const history = loadActivityHistory();
  const today = getTodayDateStr();
  const existing = history.find(h => h.activityId === activityId);
  if (existing) {
    existing.lastUsedDate = today;
    existing.usageCount++;
  } else {
    history.push({ activityId, lastUsedDate: today, usageCount: 1 });
  }
  saveActivityHistory(history);
}

// Mindfulness reflections
const REFLECTION_PREFIX = 'mindfulness-reflection-';
const WORDS_CACHE_KEY = 'mindfulness-words-cache';

export function loadReflection(dateStr: string): MindfulnessReflection | null {
  try {
    const raw = localStorage.getItem(REFLECTION_PREFIX + dateStr);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

export function saveReflection(reflection: MindfulnessReflection): void {
  localStorage.setItem(REFLECTION_PREFIX + reflection.date, JSON.stringify(reflection));
}

export interface WordsCache {
  fetchDate: string;
  data: {
    affirmations: { zh: string; en: string }[];
    permissions: { zh: string; en: string }[];
    microTips: { zh: string; en: string }[];
  };
}

export function loadWordsCache(): WordsCache | null {
  try {
    const raw = localStorage.getItem(WORDS_CACHE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

export function saveWordsCache(cache: WordsCache): void {
  localStorage.setItem(WORDS_CACHE_KEY, JSON.stringify(cache));
}

// Screen time tracking
export function getTodayScreenTimeMinutes(): number {
  const log = loadTodayLog();
  return log.screenTimeSessions.reduce((total, s) => total + s.durationMinutes, 0);
}

// Data export/import
export function exportAllData(): string {
  const data: Record<string, unknown> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('aac-') || key.startsWith('mindfulness-'))) {
      try {
        data[key] = JSON.parse(localStorage.getItem(key)!);
      } catch {
        data[key] = localStorage.getItem(key);
      }
    }
  }
  return JSON.stringify({
    exportVersion: 1,
    exportDate: new Date().toISOString(),
    data,
  }, null, 2);
}

export function importAllData(jsonStr: string): { success: boolean; keysImported: number } {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed.data || typeof parsed.data !== 'object') {
      return { success: false, keysImported: 0 };
    }
    let count = 0;
    for (const [key, value] of Object.entries(parsed.data)) {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
      count++;
    }
    return { success: true, keysImported: count };
  } catch {
    return { success: false, keysImported: 0 };
  }
}
