import { useState, useEffect, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { ProgressRing } from '../components/common/ProgressRing';
import { getScheduleForDay, getCurrentSlot, getNextSlot, getSlotProgress, isBeforeSchedule, isAfterSchedule } from '../utils/schedule-engine';
import { formatTime, getDayOfWeek, getCurrentTimeStr, formatMinutesDisplay } from '../utils/time';
import { selectActivity } from '../utils/rotation';
import { aacScenarios } from '../data/aac';
import { recordActivityUsage } from '../utils/storage';
import { t, getDailyEncouragement, slotLabel, getSlotTips, scenarioTitle, scenarioModelScript, scenarioTips, activityName, activityDescription, activityAACWords, activityPromptScript } from '../i18n';
import type { Activity, AACScenario, AACPracticeLog } from '../types';

export function HomePage() {
  const { state, dispatch } = useApp();
  const lang = state.settings.language;
  const [currentTime, setCurrentTime] = useState(getCurrentTimeStr());
  const [suggestedActivity, setSuggestedActivity] = useState<Activity | null>(null);
  const [currentScenario, setCurrentScenario] = useState<AACScenario | null>(null);
  const [showTiredMessage, setShowTiredMessage] = useState(false);

  const schedule = useMemo(() => getScheduleForDay(), []);
  const currentSlot = getCurrentSlot(schedule);
  const nextSlot = getNextSlot(schedule);
  const beforeSchedule = isBeforeSchedule(schedule);
  const afterSchedule = isAfterSchedule(schedule);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(getCurrentTimeStr()), 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentSlot && currentSlot.activityPoolIds.length > 0) {
      const activity = selectActivity(currentSlot.activityPoolIds);
      setSuggestedActivity(activity);
    } else {
      setSuggestedActivity(null);
    }

    if (currentSlot?.isAACOpportunity && currentSlot.aacContext) {
      const matchingScenarios = aacScenarios.filter(
        s => s.context === currentSlot.aacContext && s.linkedTimeSlots.includes(currentSlot.id)
      );
      if (matchingScenarios.length > 0) {
        setCurrentScenario(matchingScenarios[Math.floor(Math.random() * matchingScenarios.length)]);
      } else {
        const contextScenarios = aacScenarios.filter(s => s.context === currentSlot.aacContext);
        if (contextScenarios.length > 0) {
          setCurrentScenario(contextScenarios[Math.floor(Math.random() * contextScenarios.length)]);
        }
      }
    } else {
      setCurrentScenario(null);
    }
  }, [currentSlot?.id]);

  const handleSwapActivity = useCallback(() => {
    if (currentSlot && currentSlot.activityPoolIds.length > 0) {
      const excluded = suggestedActivity ? [suggestedActivity.id] : [];
      const activity = selectActivity(currentSlot.activityPoolIds, excluded);
      setSuggestedActivity(activity);
    }
  }, [currentSlot, suggestedActivity]);

  const handleLogAAC = useCallback(() => {
    const practice: AACPracticeLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      scenarioId: currentScenario?.id,
      vocabularyUsed: currentScenario?.targetVocabulary ?? [],
      context: currentSlot?.aacContext ?? 'requesting',
    };
    dispatch({ type: 'LOG_AAC_PRACTICE', payload: practice });
  }, [currentScenario, currentSlot, dispatch]);

  const handleCompleteActivity = useCallback(() => {
    if (suggestedActivity) {
      dispatch({ type: 'LOG_ACTIVITY', payload: suggestedActivity.id });
      recordActivityUsage(suggestedActivity.id);
    }
  }, [suggestedActivity, dispatch]);

  const aacCount = state.todayLog.aacPractices.length;
  const aacGoal = state.settings.aacDailyGoal;
  const aacProgress = Math.min(1, aacCount / aacGoal);
  const totalScreenTime = state.todayLog.screenTimeSessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const progress = currentSlot ? getSlotProgress(currentSlot) : 0;

  return (
    <div className="flex-1 overflow-y-auto pb-20 px-4 pt-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm text-gray-500">{getDayOfWeek(lang)}</div>
          <div className="text-2xl font-semibold">{formatTime(currentTime, lang)}</div>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => dispatch({ type: 'UPDATE_SETTINGS', payload: { language: lang === 'zh' ? 'en' : 'zh' } })}
            className="text-xs text-gray-400 border border-gray-200 rounded-lg px-2 py-1 active:bg-gray-100"
          >
            {lang === 'zh' ? 'EN' : '中'}
          </button>
          <ProgressRing progress={aacProgress} size={56} strokeWidth={4} color={aacCount >= aacGoal ? 'var(--color-success)' : 'var(--color-primary)'}>
            <span className="text-xs font-bold">{aacCount}/{aacGoal}</span>
            <span className="text-[8px] text-gray-400">AAC</span>
          </ProgressRing>
        </div>
      </div>

      {/* Daily encouragement (Principle 5) */}
      <div className="bg-amber-50 rounded-xl p-3 mb-4 text-center">
        <div className="text-xs text-amber-700">{getDailyEncouragement(lang)}</div>
      </div>

      {beforeSchedule && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          <div className="text-center text-gray-400 py-8">
            <div className="text-4xl mb-2">🌅</div>
            <div className="text-lg font-medium text-gray-600">{t('home.scheduleNotStarted', lang)}</div>
            {nextSlot && (
              <div className="text-sm mt-1">{t('home.firstSlot', lang)}: {formatTime(nextSlot.startTime, lang)}</div>
            )}
          </div>
        </div>
      )}

      {afterSchedule && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          <div className="text-center text-gray-400 py-8">
            <div className="text-4xl mb-2">🌙</div>
            <div className="text-lg font-medium text-gray-600">{t('home.scheduleEnded', lang)}</div>
            <div className="text-sm mt-1">{t('home.restWell', lang)}</div>
          </div>
        </div>
      )}

      {currentSlot && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{currentSlot.icon}</span>
            <div>
              <div className="font-semibold text-lg">{slotLabel(currentSlot.id, currentSlot.label, lang)}</div>
              <div className="text-xs text-gray-400">
                {formatTime(currentSlot.startTime, lang)} - {formatTime(currentSlot.endTime, lang)}
              </div>
            </div>
            {currentSlot.isAACOpportunity && (
              <span className="ml-auto bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full font-medium">AAC</span>
            )}
          </div>

          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
            <div className="h-1.5 rounded-full transition-all duration-1000" style={{ width: `${progress * 100}%`, backgroundColor: 'var(--color-primary)' }} />
          </div>

          {/* AAC Scenario (Principle 2: modeling first) */}
          {currentScenario && (
            <div className="bg-blue-50 rounded-xl p-4 mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{currentScenario.icon}</span>
                <span className="font-medium text-blue-800 text-sm">{scenarioTitle(currentScenario.id, currentScenario.title, lang)}</span>
              </div>
              <div className="text-sm text-blue-700 mb-2">{scenarioModelScript(currentScenario.id, currentScenario.modelScript, lang)}</div>
              {currentScenario.tips.length > 0 && (
                <div className="text-xs text-blue-500 mb-2">{scenarioTips(currentScenario.id, currentScenario.tips, lang)[0]}</div>
              )}
              <div className="text-xs text-blue-400 italic mb-3">{t('home.modelingReminder', lang)}</div>
              <button
                onClick={handleLogAAC}
                className="w-full bg-blue-500 text-white rounded-lg py-2.5 text-sm font-medium active:bg-blue-600 transition-colors"
              >
                {t('home.logModeling', lang)} ({aacCount}/{aacGoal})
              </button>
            </div>
          )}

          {suggestedActivity && (
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-sm">{activityName(suggestedActivity.id, suggestedActivity.name, lang)}</div>
                <button onClick={handleSwapActivity} className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1">
                  {t('home.swapActivity', lang)}
                </button>
              </div>
              <div className="text-sm text-gray-600 mb-2">{activityDescription(suggestedActivity.id, suggestedActivity.description, lang)}</div>
              {suggestedActivity.aacIntegration && (
                <>
                  <div className="bg-green-50 rounded-lg p-2.5 mb-2">
                    <div className="text-xs font-medium text-green-700 mb-0.5">{t('home.howToPlay', lang)}</div>
                    <div className="text-xs text-green-800">{activityPromptScript(suggestedActivity.id, suggestedActivity.aacIntegration.promptScript, lang)}</div>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    {t('home.aacVocab', lang)}: {activityAACWords(suggestedActivity.id, suggestedActivity.aacIntegration.suggestedWords, lang).join(lang === 'en' ? ', ' : '、')}
                  </div>
                </>
              )}
              <button
                onClick={handleCompleteActivity}
                className="w-full bg-gray-200 text-gray-700 rounded-lg py-2 text-sm font-medium active:bg-gray-300 transition-colors"
              >
                {t('home.activityDone', lang)}
              </button>
            </div>
          )}

          {/* Slot tips for time periods without specific activities */}
          {!suggestedActivity && !currentSlot.isScreenTime && getSlotTips(currentSlot.id, lang).length > 0 && (
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="text-xs font-medium text-amber-700 mb-1.5">{t('home.slotTips', lang)}</div>
              {getSlotTips(currentSlot.id, lang).map((tip, i) => (
                <div key={i} className="text-xs text-amber-800 flex gap-1.5 mb-1">
                  <span className="flex-shrink-0">-</span><span>{tip}</span>
                </div>
              ))}
            </div>
          )}

          {currentSlot.isScreenTime && (
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="text-center mb-2">
                <div className="text-sm text-amber-700 font-medium mb-2">{t('home.screenTimeWindow', lang)}</div>
                <div className="text-3xl font-bold text-amber-800">{formatMinutesDisplay(state.settings.screenTimeWindowMinutes, lang)}</div>
                <div className="text-xs text-amber-500 mt-1">
                  {t('home.usedToday', lang)}: {formatMinutesDisplay(totalScreenTime, lang)} / {formatMinutesDisplay(state.settings.screenTimeTargetMinutes, lang)}
                </div>
              </div>
              {getSlotTips(currentSlot.id, lang).length > 0 && (
                <div className="border-t border-amber-200 pt-2 mt-2">
                  {getSlotTips(currentSlot.id, lang).map((tip, i) => (
                    <div key={i} className="text-xs text-amber-700 flex gap-1.5 mb-1">
                      <span className="flex-shrink-0">-</span><span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-xs text-gray-400 mb-1">{t('home.screenTimeToday', lang)}</div>
          <div className="text-lg font-semibold">{formatMinutesDisplay(totalScreenTime, lang)}</div>
          <div className="text-xs text-gray-400">{t('home.target', lang)}: {formatMinutesDisplay(state.settings.screenTimeTargetMinutes, lang)}</div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
            <div
              className="h-1.5 rounded-full transition-all"
              style={{
                width: `${Math.min(100, (totalScreenTime / state.settings.screenTimeTargetMinutes) * 100)}%`,
                backgroundColor: totalScreenTime > state.settings.screenTimeTargetMinutes ? 'var(--color-danger)' : 'var(--color-success)',
              }}
            />
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-xs text-gray-400 mb-1">{t('home.activitiesDone', lang)}</div>
          <div className="text-lg font-semibold">{state.todayLog.completedActivities.length}</div>
          <div className="text-xs text-gray-400 mt-1">
            {state.todayLog.completedActivities.length === 0 ? t('home.noActivities', lang) : t('home.keepGoing', lang)}
          </div>
        </div>
      </div>

      {/* "Too tired" button (Principle 5) */}
      {!showTiredMessage && aacCount < aacGoal && (
        <button onClick={() => setShowTiredMessage(true)} className="w-full text-center text-xs text-gray-400 py-2 mb-3">
          {t('home.tooTired', lang)}
        </button>
      )}
      {showTiredMessage && (
        <div className="bg-purple-50 rounded-xl p-4 mb-4 text-center">
          <div className="text-sm text-purple-700">{t('home.tooTiredConfirm', lang)}</div>
        </div>
      )}

      {nextSlot && !afterSchedule && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-xs text-gray-400 mb-2">{t('home.nextUp', lang)}</div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{nextSlot.icon}</span>
            <div>
              <div className="font-medium text-sm">{slotLabel(nextSlot.id, nextSlot.label, lang)}</div>
              <div className="text-xs text-gray-400">{formatTime(nextSlot.startTime, lang)}</div>
            </div>
            {nextSlot.isAACOpportunity && (
              <span className="ml-auto bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">AAC</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
