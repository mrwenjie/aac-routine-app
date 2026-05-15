import { useApp } from '../../context/AppContext';
import { t } from '../../i18n';

interface BottomNavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function BottomNav({ activePage, onNavigate }: BottomNavProps) {
  const { state } = useApp();
  const lang = state.settings.language;

  const tabs = [
    { id: 'home', label: t('nav.home', lang), icon: '🏠' },
    { id: 'schedule', label: t('nav.schedule', lang), icon: '📅' },
    { id: 'aac', label: t('nav.aac', lang), icon: '💬' },
    { id: 'history', label: t('nav.history', lang), icon: '📊' },
    { id: 'settings', label: t('nav.settings', lang), icon: '⚙️' },
  ];

  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-[480px] mx-auto flex justify-around items-center h-14">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center justify-center w-full h-full gap-0.5 text-xs transition-colors ${
              activePage === tab.id
                ? 'text-[var(--color-primary)] font-medium'
                : 'text-gray-400'
            }`}
          >
            <span className="text-lg leading-none">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
