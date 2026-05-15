import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { BottomNav } from './components/layout/BottomNav';
import { HomePage } from './pages/HomePage';
import { SchedulePage } from './pages/SchedulePage';
import { AACPage } from './pages/AACPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { getScheduleForDay, getCurrentSlot, getNextSlot } from './utils/schedule-engine';
import { sendNotification, canSendNotifications } from './utils/notifications';
import { timeToMinutes, getCurrentMinutes } from './utils/time';
import { t } from './i18n';

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const { state } = useApp();
  const [lastNotifiedSlot, setLastNotifiedSlot] = useState<string | null>(null);

  // In-app notification for slot transitions
  useEffect(() => {
    if (!state.settings.notificationsEnabled) return;

    const checkSlot = () => {
      const schedule = getScheduleForDay();
      const current = getCurrentSlot(schedule);
      const next = getNextSlot(schedule);

      const lang = state.settings.language;

      // Notify when entering a new slot
      if (current && current.id !== lastNotifiedSlot) {
        setLastNotifiedSlot(current.id);
        if (canSendNotifications()) {
          let body = current.label;
          if (current.isAACOpportunity) {
            body += t('notif.aacSuffix', lang);
          }
          sendNotification(t('notif.title', lang), body);
        }
      }

      // Notify 2 minutes before next slot
      if (next) {
        const minutesUntil = timeToMinutes(next.startTime) - getCurrentMinutes();
        if (minutesUntil === 2 && canSendNotifications()) {
          sendNotification(t('notif.upcoming', lang), `${next.label} ${t('notif.startsIn2', lang)}`);
        }
      }
    };

    const interval = setInterval(checkSlot, 30000);
    checkSlot(); // Initial check
    return () => clearInterval(interval);
  }, [state.settings.notificationsEnabled, state.settings.language, lastNotifiedSlot]);

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage />;
      case 'schedule': return <SchedulePage />;
      case 'aac': return <AACPage />;
      case 'history': return <HistoryPage />;
      case 'settings': return <SettingsPage />;
      default: return <HomePage />;
    }
  };

  return (
    <>
      {renderPage()}
      <BottomNav activePage={activePage} onNavigate={setActivePage} />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
