import { useMemo } from 'react';
import { getRecentLogs } from '../utils/storage';
import { formatMinutesDisplay } from '../utils/time';
import { useApp } from '../context/AppContext';

export function HistoryPage() {
  const { state } = useApp();
  const recentLogs = useMemo(() => getRecentLogs(7), [state.todayLog]);

  const aacGoal = state.settings.aacDailyGoal;

  // Calculate stats
  const stats = useMemo(() => {
    if (recentLogs.length === 0) return null;
    const totalAAC = recentLogs.reduce((sum, log) => sum + log.aacPractices.length, 0);
    const totalScreen = recentLogs.reduce(
      (sum, log) => sum + log.screenTimeSessions.reduce((t, s) => t + s.durationMinutes, 0),
      0
    );
    const goalMetDays = recentLogs.filter(log => log.aacPractices.length >= aacGoal).length;

    // Calculate streak
    let streak = 0;
    for (const log of recentLogs) {
      if (log.aacPractices.length >= aacGoal) {
        streak++;
      } else {
        break;
      }
    }

    return {
      avgAAC: (totalAAC / recentLogs.length).toFixed(1),
      avgScreen: Math.round(totalScreen / recentLogs.length),
      goalMetDays,
      streak,
      totalDays: recentLogs.length,
    };
  }, [recentLogs, aacGoal]);

  const maxAAC = Math.max(aacGoal, ...recentLogs.map(l => l.aacPractices.length));

  return (
    <div className="flex-1 overflow-y-auto pb-20 px-4 pt-4">
      <h1 className="text-xl font-semibold mb-1">历史记录</h1>
      <p className="text-sm text-gray-400 mb-4">过去7天的数据</p>

      {/* Summary stats */}
      {stats && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-xs text-gray-400">日均AAC</div>
            <div className="text-2xl font-bold text-[var(--color-primary)]">{stats.avgAAC}次</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-xs text-gray-400">日均屏幕时间</div>
            <div className="text-2xl font-bold">{formatMinutesDisplay(stats.avgScreen)}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-xs text-gray-400">达标天数</div>
            <div className="text-2xl font-bold text-[var(--color-success)]">
              {stats.goalMetDays}/{stats.totalDays}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-xs text-gray-400">连续达标</div>
            <div className="text-2xl font-bold text-amber-500">
              {stats.streak}天
            </div>
          </div>
        </div>
      )}

      {/* AAC Bar Chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="text-sm font-medium mb-3">AAC练习次数</div>
        <div className="flex items-end gap-1.5 h-32">
          {[...recentLogs].reverse().map((log) => {
            const count = log.aacPractices.length;
            const height = maxAAC > 0 ? (count / maxAAC) * 100 : 0;
            const metGoal = count >= aacGoal;
            const dateLabel = log.date.slice(5); // MM-DD

            return (
              <div key={log.date} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500">{count}</span>
                <div className="w-full relative" style={{ height: '100px' }}>
                  <div
                    className={`absolute bottom-0 w-full rounded-t-sm ${
                      metGoal ? 'bg-[var(--color-success)]' : 'bg-blue-200'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  {/* Goal line */}
                  <div
                    className="absolute w-full border-t border-dashed border-gray-300"
                    style={{ bottom: `${(aacGoal / maxAAC) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400">{dateLabel}</span>
              </div>
            );
          })}
        </div>
        {recentLogs.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-8">还没有数据</div>
        )}
      </div>

      {/* Screen Time Chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="text-sm font-medium mb-3">屏幕时间（分钟）</div>
        <div className="flex items-end gap-1.5 h-32">
          {[...recentLogs].reverse().map((log) => {
            const minutes = log.screenTimeSessions.reduce((t, s) => t + s.durationMinutes, 0);
            const target = state.settings.screenTimeTargetMinutes;
            const maxMinutes = Math.max(target, ...recentLogs.map(l =>
              l.screenTimeSessions.reduce((t, s) => t + s.durationMinutes, 0)
            ));
            const height = maxMinutes > 0 ? (minutes / maxMinutes) * 100 : 0;
            const overTarget = minutes > target;
            const dateLabel = log.date.slice(5);

            return (
              <div key={log.date} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500">{minutes}</span>
                <div className="w-full relative" style={{ height: '100px' }}>
                  <div
                    className={`absolute bottom-0 w-full rounded-t-sm ${
                      overTarget ? 'bg-red-300' : 'bg-amber-300'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400">{dateLabel}</span>
              </div>
            );
          })}
        </div>
        {recentLogs.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-8">还没有数据</div>
        )}
      </div>

      {/* Daily Details */}
      <div className="text-sm font-medium mb-2">每日详情</div>
      <div className="space-y-2">
        {recentLogs.map(log => {
          const screenMin = log.screenTimeSessions.reduce((t, s) => t + s.durationMinutes, 0);
          return (
            <div key={log.date} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="text-sm font-medium w-16">{log.date.slice(5)}</div>
              <div className="flex-1 flex gap-4 text-xs">
                <span className={log.aacPractices.length >= aacGoal ? 'text-green-600' : 'text-gray-500'}>
                  AAC: {log.aacPractices.length}次
                </span>
                <span className="text-gray-500">
                  屏幕: {formatMinutesDisplay(screenMin)}
                </span>
                <span className="text-gray-500">
                  活动: {log.completedActivities.length}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
