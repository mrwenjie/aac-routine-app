import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { requestNotificationPermission, canSendNotifications } from '../utils/notifications';
import { exportAllData, importAllData } from '../utils/storage';
import { t } from '../i18n';
import type { Language } from '../i18n';

const equipmentOptions: { id: string; zh: string; en: string }[] = [
  { id: 'weighted_blanket', zh: '加重毯', en: 'Weighted blanket' },
  { id: 'mini_trampoline', zh: '小蹦床', en: 'Mini trampoline' },
  { id: 'foam_roller', zh: '泡沫滚筒', en: 'Foam roller' },
  { id: 'squeeze_ball', zh: '挤压球/压力球', en: 'Squeeze ball' },
  { id: 'pop_it', zh: 'Pop-it按压板', en: 'Pop-it fidget' },
  { id: 'kinetic_sand', zh: '太空沙', en: 'Kinetic sand' },
  { id: 'playdoh', zh: '彩泥/Play-Doh', en: 'Play-Doh' },
  { id: 'bubbles', zh: '泡泡', en: 'Bubbles' },
  { id: 'sensory_bin', zh: '感官箱（米/豆子）', en: 'Sensory bin (rice/beans)' },
  { id: 'puzzle', zh: '拼图', en: 'Puzzles' },
  { id: 'blocks', zh: '积木', en: 'Blocks' },
  { id: 'magnetic_tiles', zh: '磁力片', en: 'Magnetic tiles' },
  { id: 'crayons', zh: '蜡笔/彩笔', en: 'Crayons/markers' },
  { id: 'soft_ball', zh: '软球', en: 'Soft ball' },
  { id: 'blanket', zh: '大毯子', en: 'Large blanket' },
  { id: 'bike_scooter', zh: '自行车/滑板车', en: 'Bike/scooter' },
];

export function SettingsPage() {
  const { state, dispatch } = useApp();
  const { settings } = state;
  const lang = settings.language;

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

  const handleLanguageChange = (newLang: Language) => {
    updateSetting('language', newLang);
  };

  const [importMsg, setImportMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const json = exportAllData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zw-daily-plan-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = importAllData(reader.result as string);
      if (result.success) {
        setImportMsg({ ok: true, text: t('settings.importSuccess', lang) });
      } else {
        setImportMsg({ ok: false, text: t('settings.importFail', lang) });
      }
    };
    reader.readAsText(file);
    // Reset so the same file can be re-selected
    e.target.value = '';
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 px-4 pt-4">
      <h1 className="text-xl font-semibold mb-4">{t('settings.title', lang)}</h1>

      {/* Language toggle */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="text-sm font-medium mb-3">{t('settings.language', lang)}</div>
        <div className="flex gap-2">
          <button
            onClick={() => handleLanguageChange('zh')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              lang === 'zh' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {t('settings.langZh', lang)}
          </button>
          <button
            onClick={() => handleLanguageChange('en')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              lang === 'en' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {t('settings.langEn', lang)}
          </button>
        </div>
      </div>

      {/* Time settings */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="text-sm font-medium mb-3">{t('settings.timeSection', lang)}</div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('settings.pickupTime', lang)}</span>
            <input
              type="time"
              value={settings.weekdayPickupTime}
              onChange={e => updateSetting('weekdayPickupTime', e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('settings.bedtime', lang)}</span>
            <input
              type="time"
              value={settings.weekdayBedtime}
              onChange={e => updateSetting('weekdayBedtime', e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('settings.weekendWake', lang)}</span>
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
        <div className="text-sm font-medium mb-3">{t('settings.aacGoals', lang)}</div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{t('settings.dailyGoal', lang)}</span>
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
        <div className="text-sm font-medium mb-3">{t('settings.screenTime', lang)}</div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('settings.dailyLimit', lang)}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateSetting('screenTimeTargetMinutes', Math.max(30, settings.screenTimeTargetMinutes - 15))}
                className="w-8 h-8 bg-gray-100 rounded-lg text-lg font-medium active:bg-gray-200"
              >
                -
              </button>
              <span className="w-16 text-center text-sm font-semibold">
                {settings.screenTimeTargetMinutes}{t('settings.minutes', lang)}
              </span>
              <button
                onClick={() => updateSetting('screenTimeTargetMinutes', settings.screenTimeTargetMinutes + 15)}
                className="w-8 h-8 bg-gray-100 rounded-lg text-lg font-medium active:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('settings.windowLength', lang)}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateSetting('screenTimeWindowMinutes', Math.max(10, settings.screenTimeWindowMinutes - 5))}
                className="w-8 h-8 bg-gray-100 rounded-lg text-lg font-medium active:bg-gray-200"
              >
                -
              </button>
              <span className="w-16 text-center text-sm font-semibold">
                {settings.screenTimeWindowMinutes}{t('settings.minutes', lang)}
              </span>
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
        <div className="text-sm font-medium mb-3">{t('settings.notifications', lang)}</div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-600">{t('settings.enableNotif', lang)}</span>
            {!canSendNotifications() && settings.notificationsEnabled && (
              <div className="text-xs text-amber-500 mt-0.5">{t('settings.allowNotif', lang)}</div>
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
        <div className="text-sm font-medium mb-1">{t('settings.equipment', lang)}</div>
        <div className="text-xs text-gray-400 mb-3">{t('settings.equipmentNote', lang)}</div>
        <div className="space-y-2">
          {equipmentOptions.map(item => (
            <label key={item.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.availableEquipment.includes(item.id)}
                onChange={() => toggleEquipment(item.id)}
                className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)]"
              />
              <span className="text-sm text-gray-600">{item[lang]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Data export/import */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="text-sm font-medium mb-1">{t('settings.dataSection', lang)}</div>
        <div className="text-xs text-gray-400 mb-3">{t('settings.exportNote', lang)}</div>
        <div className="flex gap-2 mb-2">
          <button
            onClick={handleExport}
            className="flex-1 bg-[var(--color-primary)] text-white rounded-lg py-2 text-sm font-medium active:opacity-80"
          >
            {t('settings.exportData', lang)}
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 bg-gray-100 text-gray-700 rounded-lg py-2 text-sm font-medium active:bg-gray-200"
          >
            {t('settings.importData', lang)}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
        {importMsg && (
          <div className={`text-xs mt-1 ${importMsg.ok ? 'text-green-600' : 'text-red-500'}`}>
            {importMsg.text}
          </div>
        )}
      </div>

      {/* Add to Home Screen Guide */}
      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        <div className="text-sm font-medium text-blue-800 mb-2">{t('settings.iosGuide', lang)}</div>
        <ol className="text-xs text-blue-700 space-y-1">
          <li>1. {t('settings.iosStep1', lang)}</li>
          <li>2. {t('settings.iosStep2', lang)}</li>
          <li>3. {t('settings.iosStep3', lang)}</li>
          <li>4. {t('settings.iosStep4', lang)}</li>
        </ol>
        <div className="text-xs text-blue-500 mt-2">{t('settings.iosNote', lang)}</div>
      </div>

      <div className="text-center text-xs text-gray-300 pb-4">
        {t('settings.version', lang)}
      </div>
    </div>
  );
}
