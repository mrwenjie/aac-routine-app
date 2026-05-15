import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getScheduleForDay, getSlotStatus } from '../utils/schedule-engine';
import { formatTime, getDayType } from '../utils/time';
import { t } from '../i18n';

export function SchedulePage() {
  const { state } = useApp();
  const lang = state.settings.language;
  const dayType = getDayType();
  const schedule = useMemo(() => getScheduleForDay(), []);

  return (
    <div className="flex-1 overflow-y-auto pb-20 px-4 pt-4">
      <h1 className="text-xl font-semibold mb-1">
        {dayType === 'weekend' ? t('schedule.weekend', lang) : t('schedule.weekday', lang)}{t('schedule.title', lang)}
      </h1>
      <p className="text-sm text-gray-400 mb-4">
        {dayType === 'weekend' ? t('schedule.weekendDesc', lang) : t('schedule.weekdayDesc', lang)}
      </p>

      <div className="relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gray-200" />

        {schedule.map((slot) => {
          const status = getSlotStatus(slot);
          const isCurrent = status === 'current';
          const isPast = status === 'past';

          return (
            <div key={slot.id} className="relative flex gap-3 mb-4">
              <div className="relative z-10 flex-shrink-0 mt-1">
                <div
                  className={`w-[10px] h-[10px] rounded-full border-2 ${
                    isCurrent
                      ? 'bg-[var(--color-primary)] border-[var(--color-primary)] ring-4 ring-blue-100'
                      : isPast
                      ? 'bg-gray-300 border-gray-300'
                      : 'bg-white border-gray-300'
                  }`}
                  style={{ marginLeft: '14px' }}
                />
              </div>

              <div
                className={`flex-1 rounded-xl p-3 transition-all ${
                  isCurrent
                    ? 'bg-white shadow-md border-2 border-[var(--color-primary)]'
                    : isPast
                    ? 'bg-gray-50 opacity-60'
                    : 'bg-white shadow-sm border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{slot.icon}</span>
                  <div className="flex-1">
                    <div className={`font-medium text-sm ${isCurrent ? 'text-[var(--color-primary)]' : ''}`}>
                      {slot.label}
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatTime(slot.startTime, lang)} - {formatTime(slot.endTime, lang)}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {slot.isAACOpportunity && (
                      <span className="bg-blue-50 text-blue-600 text-xs px-1.5 py-0.5 rounded-full">AAC</span>
                    )}
                    {slot.isScreenTime && (
                      <span className="bg-amber-50 text-amber-600 text-xs px-1.5 py-0.5 rounded-full">{t('schedule.screen', lang)}</span>
                    )}
                  </div>
                </div>
                {isCurrent && (
                  <div className="mt-2 text-xs text-[var(--color-primary)]">
                    {t('schedule.current', lang)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
