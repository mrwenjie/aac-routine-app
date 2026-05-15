import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppSettings, DailyLog, AACPracticeLog, ScreenTimeSession } from '../types';
import { loadSettings, saveSettings, loadTodayLog, saveDailyLog } from '../utils/storage';
import { getTodayDateStr } from '../utils/time';

interface AppState {
  settings: AppSettings;
  todayLog: DailyLog;
  activeScreenTimer: { startTime: string; running: boolean } | null;
}

type AppAction =
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> }
  | { type: 'LOG_AAC_PRACTICE'; payload: AACPracticeLog }
  | { type: 'START_SCREEN_TIME' }
  | { type: 'STOP_SCREEN_TIME'; payload: number }
  | { type: 'LOG_ACTIVITY'; payload: string }
  | { type: 'REFRESH_TODAY' };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'UPDATE_SETTINGS': {
      const settings = { ...state.settings, ...action.payload };
      saveSettings(settings);
      return { ...state, settings };
    }
    case 'LOG_AAC_PRACTICE': {
      const todayLog = {
        ...state.todayLog,
        aacPractices: [...state.todayLog.aacPractices, action.payload],
      };
      saveDailyLog(todayLog);
      return { ...state, todayLog };
    }
    case 'START_SCREEN_TIME': {
      return {
        ...state,
        activeScreenTimer: { startTime: new Date().toISOString(), running: true },
      };
    }
    case 'STOP_SCREEN_TIME': {
      const session: ScreenTimeSession = {
        id: Date.now().toString(),
        startTime: state.activeScreenTimer?.startTime ?? new Date().toISOString(),
        endTime: new Date().toISOString(),
        durationMinutes: action.payload,
        planned: true,
      };
      const todayLog = {
        ...state.todayLog,
        screenTimeSessions: [...state.todayLog.screenTimeSessions, session],
      };
      saveDailyLog(todayLog);
      return { ...state, todayLog, activeScreenTimer: null };
    }
    case 'LOG_ACTIVITY': {
      const todayLog = {
        ...state.todayLog,
        completedActivities: [...state.todayLog.completedActivities, action.payload],
      };
      saveDailyLog(todayLog);
      return { ...state, todayLog };
    }
    case 'REFRESH_TODAY': {
      return { ...state, todayLog: loadTodayLog() };
    }
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, null, () => ({
    settings: loadSettings(),
    todayLog: loadTodayLog(),
    activeScreenTimer: null,
  }));

  // Refresh today's log at midnight
  useEffect(() => {
    const checkDate = () => {
      if (state.todayLog.date !== getTodayDateStr()) {
        dispatch({ type: 'REFRESH_TODAY' });
      }
    };
    const interval = setInterval(checkDate, 60000);
    return () => clearInterval(interval);
  }, [state.todayLog.date]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
