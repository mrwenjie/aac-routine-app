interface BottomNavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const tabs = [
  { id: 'home', label: '首页', icon: '🏠' },
  { id: 'schedule', label: '日程', icon: '📅' },
  { id: 'aac', label: 'AAC', icon: '💬' },
  { id: 'history', label: '记录', icon: '📊' },
  { id: 'settings', label: '设置', icon: '⚙️' },
];

export function BottomNav({ activePage, onNavigate }: BottomNavProps) {
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
