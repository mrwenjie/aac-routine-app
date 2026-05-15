import { useState, useEffect, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { ProgressRing } from '../components/common/ProgressRing';
import { getScheduleForDay, getCurrentSlot, getNextSlot, getSlotProgress, isBeforeSchedule, isAfterSchedule } from '../utils/schedule-engine';
import { formatTime, getDayOfWeekChinese, getCurrentTimeStr, formatMinutesDisplay } from '../utils/time';
import { selectActivity } from '../utils/rotation';
import { aacScenarios } from '../data/aac';
import { recordActivityUsage } from '../utils/storage';
import type { Activity, AACScenario, AACPracticeLog } from '../types';

export function HomePage() {
  const { state, dispatch } = useApp();
  const [currentTime, setCurrentTime] = useState(getCurrentTimeStr());
  const [suggestedActivity, setSuggestedActivity] = useState<Activity | null>(null);
  const [currentScenario, setCurrentScenario] = useState<AACScenario | null>(null);

  const schedule = useMemo(() => getScheduleForDay(), []);
  const currentSlot = getCurrentSlot(schedule);
  const nextSlot = getNextSlot(schedule);
  const beforeSchedule = isBeforeSchedule(schedule);
  const afterSchedule = isAfterSchedule(schedule);

  // Update current time every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(getCurrentTimeStr()), 30000);
    return () => clearInterval(interval);
  }, []);

  // Select an activity for current slot
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
  const totalScreenTime = state.todayLog.screenTimeSessions.reduce((t, s) => t + s.durationMinutes, 0);
  const progress = currentSlot ? getSlotProgress(currentSlot) : 0;

  return (
    <div className="flex-1 overflow-y-auto pb-20 px-4 pt-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm text-gray-500">{getDayOfWeekChinese()}</div>
          <div className="text-2xl font-semibold">{formatTime(currentTime)}</div>
        </div>
        <div className="flex gap-3">
          <ProgressRing progress={aacProgress} size={56} strokeWidth={4} color={aacCount >= aacGoal ? 'var(--color-success)' : 'var(--color-primary)'}>
            <span className="text-xs font-bold">{aacCount}/{aacGoal}</span>
            <span className="text-[8px] text-gray-400">AAC</span>
          </ProgressRing>
        </div>
      </div>

      {/* Current Activity Card */}
      {beforeSchedule && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          <div className="text-center text-gray-400 py-8">
            <div className="text-4xl mb-2">🌅</div>
            <div className="text-lg font-medium text-gray-600">日程还没开始</div>
            {nextSlot && (
              <div className="text-sm mt-1">第一个时间段: {formatTime(nextSlot.startTime)}</div>
            )}
          </div>
        </div>
      )}

      {afterSchedule && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          <div className="text-center text-gray-400 py-8">
            <div className="text-4xl mb-2">🌙</div>
            <div className="text-lg font-medium text-gray-600">今天的日程已结束</div>
            <div className="text-sm mt-1">好好休息，明天继续加油</div>
          </div>
        </div>
      )}

      {currentSlot && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          {/* Slot header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{currentSlot.icon}</span>
            <div>
              <div className="font-semibold text-lg">{currentSlot.label}</div>
              <div className="text-xs text-gray-400">
                {formatTime(currentSlot.startTime)} - {formatTime(currentSlot.endTime)}
              </div>
            </div>
            {currentSlot.isAACOpportunity && (
              <span className="ml-auto bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full font-medium">
                AAC
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
            <div
              className="h-1.5 rounded-full transition-all duration-1000"
              style={{ width: `${progress * 100}%`, backgroundColor: 'var(--color-primary)' }}
            />
          </div>

          {/* AAC Scenario */}
          {currentScenario && (
            <div className="bg-blue-50 rounded-xl p-4 mb-3">
              <div className="font-medium text-blue-800 text-sm mb-1">{currentScenario.title}</div>
              <div className="text-sm text-blue-700 mb-2">{currentScenario.modelScript}</div>
              {currentScenario.tips.length > 0 && (
                <div className="text-xs text-blue-500">
                  {currentScenario.tips[0]}
                </div>
              )}
              <button
                onClick={handleLogAAC}
                className="mt-3 w-full bg-blue-500 text-white rounded-lg py-2.5 text-sm font-medium active:bg-blue-600 transition-colors"
              >
                记录AAC练习 ({aacCount}/{aacGoal})
              </button>
            </div>
          )}

          {/* Suggested Activity */}
          {suggestedActivity && (
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-sm">{suggestedActivity.name}</div>
                <button
                  onClick={handleSwapActivity}
                  className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1"
                >
                  换一个
                </button>
              </div>
              <div className="text-sm text-gray-600 mb-2">{suggestedActivity.description}</div>
              {suggestedActivity.aacIntegration && (
                <div className="text-xs text-gray-400 mb-2">
                  AAC词汇: {suggestedActivity.aacIntegration.suggestedWords.join('、')}
                </div>
              )}
              <button
                onClick={handleCompleteActivity}
                className="w-full bg-gray-200 text-gray-700 rounded-lg py-2 text-sm font-medium active:bg-gray-300 transition-colors"
              >
                完成活动
              </button>
            </div>
          )}

          {/* Screen Time */}
          {currentSlot.isScreenTime && (
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="text-center">
                <div className="text-sm text-amber-700 font-medium mb-2">屏幕时间窗口</div>
                <div className="text-3xl font-bold text-amber-800">
                  {formatMinutesDisplay(state.settings.screenTimeWindowMinutes)}
                </div>
                <div className="text-xs text-amber-500 mt-1">
                  今日已用: {formatMinutesDisplay(totalScreenTime)} / {formatMinutesDisplay(state.settings.screenTimeTargetMinutes)}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-xs text-gray-400 mb-1">今日屏幕时间</div>
          <div className="text-lg font-semibold">{formatMinutesDisplay(totalScreenTime)}</div>
          <div className="text-xs text-gray-400">目标: {formatMinutesDisplay(state.settings.screenTimeTargetMinutes)}</div>
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
          <div className="text-xs text-gray-400 mb-1">已完成活动</div>
          <div className="text-lg font-semibold">{state.todayLog.completedActivities.length}</div>
          <div className="text-xs text-gray-400 mt-1">
            {state.todayLog.completedActivities.length === 0 ? '还没有活动' : '继续加油'}
          </div>
        </div>
      </div>

      {/* Next Up */}
      {nextSlot && !afterSchedule && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-xs text-gray-400 mb-2">接下来</div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{nextSlot.icon}</span>
            <div>
              <div className="font-medium text-sm">{nextSlot.label}</div>
              <div className="text-xs text-gray-400">{formatTime(nextSlot.startTime)}</div>
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
