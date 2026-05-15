import { useApp } from '../context/AppContext';
import { requestNotificationPermission, canSendNotifications } from '../utils/notifications';

const equipmentOptions = [
  { id: 'weighted_blanket', name: '加重毯' },
  { id: 'mini_trampoline', name: '小蹦床' },
  { id: 'foam_roller', name: '泡沫滚筒' },
  { id: 'squeeze_ball', name: '挤压球/压力球' },
  { id: 'pop_it', name: 'Pop-it按压板' },
  { id: 'kinetic_sand', name: '太空沙' },
  { id: 'playdoh', name: '彩泥/Play-Doh' },
  { id: 'bubbles', name: '泡泡' },
  { id: 'sensory_bin', name: '感官箱（米/豆子）' },
  { id: 'puzzle', name: '拼图' },
  { id: 'blocks', name: '积木' },
  { id: 'magnetic_tiles', name: '磁力片' },
  { id: 'crayons', name: '蜡笔/彩笔' },
  { id: 'soft_ball', name: '软球' },
  { id: 'blanket', name: '大毯子' },
  { id: 'bike_scooter', name: '自行车/滑板车' },
];

export function SettingsPage() {
  const { state, dispatch } = useApp();
  const { settings } = state;

  const updateSetting = (key: string, value: any) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [key]: value } });
  };

  const toggleEquipment = (id: string) => {
    const current = settings.availableEquipment;
    const updated = current.includes(id)
      ? current.filter(e => e !== id)
      : [...current, id];
    updateSetting('availableEquipment', updated);
  };

  const handleNotificationToggle = async () => {
    if (!settings.notificationsEnabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        updateSetting('notificationsEnabled', true);
      }
    } else {
      updateSetting('notificationsEnabled', false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 px-4 pt-4">
      <h1 className="text-xl font-semibold mb-4">设置</h1>

      {/* Time settings */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="text-sm font-medium mb-3">时间安排</div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">平日接孩子时间</span>
            <input
              type="time"
              value={settings.weekdayPickupTime}
              onChange={e => updateSetting('weekdayPickupTime', e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">平日睡觉时间</span>
            <input
              type="time"
              value={settings.weekdayBedtime}
              onChange={e => updateSetting('weekdayBedtime', e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">周末起床时间</span>
            <input
              type="time"
              value={settings.weekendWakeTime}
              onChange={e => updateSetting('weekendWakeTime', e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5"
            />
          </div>
        </div>
      </div>

      {/* AAC Goals */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="text-sm font-medium mb-3">AAC目标</div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">每日AAC练习次数</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateSetting('aacDailyGoal', Math.max(1, settings.aacDailyGoal - 1))}
              className="w-8 h-8 bg-gray-100 rounded-lg text-lg font-medium active:bg-gray-200"
            >
              -
            </button>
            <span className="w-8 text-center font-semibold">{settings.aacDailyGoal}</span>
            <button
              onClick={() => updateSetting('aacDailyGoal', settings.aacDailyGoal + 1)}
              className="w-8 h-8 bg-gray-100 rounded-lg text-lg font-medium active:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Screen Time */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="text-sm font-medium mb-3">屏幕时间</div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">每日目标上限</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateSetting('screenTimeTargetMinutes', Math.max(30, settings.screenTimeTargetMinutes - 15))}
                className="w-8 h-8 bg-gray-100 rounded-lg text-lg font-medium active:bg-gray-200"
              >
                -
              </button>
              <span className="w-16 text-center text-sm font-semibold">{settings.screenTimeTargetMinutes}分钟</span>
              <button
                onClick={() => updateSetting('screenTimeTargetMinutes', settings.screenTimeTargetMinutes + 15)}
                className="w-8 h-8 bg-gray-100 rounded-lg text-lg font-medium active:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">每次窗口时长</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateSetting('screenTimeWindowMinutes', Math.max(10, settings.screenTimeWindowMinutes - 5))}
                className="w-8 h-8 bg-gray-100 rounded-lg text-lg font-medium active:bg-gray-200"
              >
                -
              </button>
              <span className="w-16 text-center text-sm font-semibold">{settings.screenTimeWindowMinutes}分钟</span>
              <button
                onClick={() => updateSetting('screenTimeWindowMinutes', settings.screenTimeWindowMinutes + 5)}
                className="w-8 h-8 bg-gray-100 rounded-lg text-lg font-medium active:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="text-sm font-medium mb-3">通知</div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-600">开启提醒通知</span>
            {!canSendNotifications() && settings.notificationsEnabled && (
              <div className="text-xs text-amber-500 mt-0.5">请在浏览器设置中允许通知</div>
            )}
          </div>
          <button
            onClick={handleNotificationToggle}
            className={`w-12 h-7 rounded-full transition-colors relative ${
              settings.notificationsEnabled ? 'bg-[var(--color-primary)]' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                settings.notificationsEnabled ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Equipment */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="text-sm font-medium mb-1">家里有的设备/玩具</div>
        <div className="text-xs text-gray-400 mb-3">勾选后APP只会推荐你有的</div>
        <div className="space-y-2">
          {equipmentOptions.map(item => (
            <label key={item.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.availableEquipment.includes(item.id)}
                onChange={() => toggleEquipment(item.id)}
                className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)]"
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Add to Home Screen Guide */}
      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        <div className="text-sm font-medium text-blue-800 mb-2">添加到iPhone主屏幕</div>
        <ol className="text-xs text-blue-700 space-y-1">
          <li>1. 在Safari中打开此页面</li>
          <li>2. 点击底部的分享按钮（方框+箭头）</li>
          <li>3. 选择"添加到主屏幕"</li>
          <li>4. 点击"添加"</li>
        </ol>
        <div className="text-xs text-blue-500 mt-2">添加后可获得全屏体验和通知功能</div>
      </div>

      <div className="text-center text-xs text-gray-300 pb-4">
        卓伟每日计划 v1.0
      </div>
    </div>
  );
}
