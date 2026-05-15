import { useState, useEffect, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../i18n';
import { exercises, quickResetIds, defaultAffirmations, defaultPermissions, defaultMicroTips } from '../data/mindfulness';
import { loadReflection, saveReflection, loadWordsCache, saveWordsCache } from '../utils/storage';
import { getTodayDateStr } from '../utils/time';
import { formatCountdown } from '../utils/time';
import type { MindfulnessReflection } from '../types';
import type { MindfulnessExercise, ExerciseCategory } from '../data/mindfulness';

export function MindfulnessPage() {
  const { state } = useApp();
  const lang = state.settings.language;
  const today = getTodayDateStr();
  const isSunday = new Date().getDay() === 0;

  // Exercise state
  const [activeExercise, setActiveExercise] = useState<MindfulnessExercise | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [expandedQuickReset, setExpandedQuickReset] = useState<string | null>(null);

  // Words state
  const [affirmations, setAffirmations] = useState(defaultAffirmations);
  const [permissions, setPermissions] = useState(defaultPermissions);
  const [microTips, setMicroTips] = useState(defaultMicroTips);

  // Reflection state
  const [reflection, setReflection] = useState<MindfulnessReflection>(() => {
    return loadReflection(today) ?? { date: today };
  });
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Weekly check-in state
  const [checkinDone, setCheckinDone] = useState(false);
  const [q1, setQ1] = useState<number | null>(null);
  const [q2, setQ2] = useState<boolean | null>(null);
  const [q3, setQ3] = useState<number | null>(null);

  // Today's exercise (rotates daily)
  const dayOfYear = useMemo(() => {
    return Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  }, []);
  const todayExercise = exercises[dayOfYear % exercises.length];

  // Today's words (rotate by day)
  const todayAffirmation = affirmations[dayOfYear % affirmations.length];
  const todayPermission = permissions[(dayOfYear + 3) % permissions.length];
  const todayTip = microTips[(dayOfYear + 5) % microTips.length];

  // Quick reset exercises
  const quickResets = exercises.filter(e => quickResetIds.includes(e.id));

  // Category labels
  const categoryLabel = useCallback((cat: ExerciseCategory) => {
    const map: Record<ExerciseCategory, string> = {
      breathing: t('mind.catBreathing', lang),
      grounding: t('mind.catGrounding', lang),
      defusion: t('mind.catDefusion', lang),
      compassion: t('mind.catCompassion', lang),
      gratitude: t('mind.catGratitude', lang),
      physical: t('mind.catPhysical', lang),
    };
    return map[cat];
  }, [lang]);

  // Fetch online words
  useEffect(() => {
    const cache = loadWordsCache();
    if (cache) {
      setAffirmations(cache.data.affirmations);
      setPermissions(cache.data.permissions);
      setMicroTips(cache.data.microTips);
      if (cache.fetchDate === today) return; // Already fetched today
    }

    // Try to fetch updated content
    fetch('./data/mindfulness-words.json')
      .then(r => { if (!r.ok) throw new Error('fetch failed'); return r.json(); })
      .then(data => {
        if (data.affirmations && data.permissions && data.microTips) {
          setAffirmations(data.affirmations);
          setPermissions(data.permissions);
          setMicroTips(data.microTips);
          saveWordsCache({ fetchDate: today, data });
        }
      })
      .catch(() => { /* use cached or default */ });
  }, [today]);

  // Timer logic
  useEffect(() => {
    if (!timerRunning || !activeExercise) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, activeExercise]);

  const startExercise = (ex: MindfulnessExercise) => {
    setActiveExercise(ex);
    setTimerSeconds(ex.durationSeconds);
    setTimerRunning(true);
  };

  const closeExercise = () => {
    setActiveExercise(null);
    setTimerRunning(false);
    setTimerSeconds(0);
  };

  const handleSaveReflection = () => {
    saveReflection(reflection);
    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 2000);
  };

  const showBurnoutMsg = q1 !== null && q1 >= 3;

  return (
    <div className="flex-1 overflow-y-auto pb-20 px-4 pt-4">
      {/* Header */}
      <h1 className="text-xl font-semibold mb-1">{t('mind.title', lang)}</h1>
      <p className="text-sm text-gray-400 mb-4">{t('mind.subtitle', lang)}</p>

      {/* Active exercise overlay */}
      {activeExercise && (
        <div className="bg-purple-50 rounded-2xl p-5 mb-4 border border-purple-200">
          <div className="text-center mb-4">
            <div className="text-sm text-purple-500 mb-1">{categoryLabel(activeExercise.category)}</div>
            <div className="font-semibold text-lg text-purple-800">
              {lang === 'en' ? activeExercise.titleEn : activeExercise.title}
            </div>
          </div>

          {/* Timer */}
          <div className="text-center mb-4">
            <div className={`text-4xl font-bold ${timerSeconds <= 10 ? 'text-purple-400' : 'text-purple-700'}`}>
              {formatCountdown(timerSeconds)}
            </div>
            {timerSeconds === 0 && (
              <div className="text-purple-500 mt-1 text-sm">{t('mind.done', lang)} ✨</div>
            )}
          </div>

          {/* Steps */}
          <div className="space-y-2 mb-4">
            {(lang === 'en' ? activeExercise.stepsEn : activeExercise.steps).map((step, i) => (
              <div key={i} className="flex gap-2 text-sm text-purple-700">
                <span className="text-purple-400 flex-shrink-0">{i + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          <button onClick={closeExercise} className="w-full bg-purple-200 text-purple-700 rounded-lg py-2 text-sm font-medium active:bg-purple-300">
            {t('mind.close', lang)}
          </button>
        </div>
      )}

      {/* Module 1: Tonight's Moment */}
      {!activeExercise && (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 mb-4 border border-purple-100">
          <div className="text-xs text-purple-500 mb-1">{t('mind.tonight', lang)}</div>
          <div className="flex items-center gap-3 mb-2">
            <div className="text-3xl">🌙</div>
            <div>
              <div className="font-semibold text-purple-800">
                {lang === 'en' ? todayExercise.titleEn : todayExercise.title}
              </div>
              <div className="text-xs text-purple-400">
                {categoryLabel(todayExercise.category)} · {Math.ceil(todayExercise.durationSeconds / 60)} {t('mind.minuteShort', lang)}
              </div>
            </div>
          </div>
          <button
            onClick={() => startExercise(todayExercise)}
            className="w-full bg-purple-500 text-white rounded-lg py-2.5 text-sm font-medium active:bg-purple-600 transition-colors"
          >
            {t('mind.start', lang)}
          </button>
        </div>
      )}

      {/* Module 2: Quick Reset */}
      <div className="mb-4">
        <div className="text-sm font-medium mb-1">{t('mind.quickReset', lang)}</div>
        <div className="text-xs text-gray-400 mb-2">{t('mind.quickResetDesc', lang)}</div>
        <div className="space-y-2">
          {quickResets.map(ex => (
            <div key={ex.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => setExpandedQuickReset(expandedQuickReset === ex.id ? null : ex.id)}
                className="w-full text-left p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{categoryLabel(ex.category).split(' ')[0]}</span>
                  <span className="font-medium text-sm">{lang === 'en' ? ex.titleEn : ex.title}</span>
                  <span className="text-xs text-gray-400">{Math.ceil(ex.durationSeconds / 60)} {t('mind.minuteShort', lang)}</span>
                </div>
                <span className="text-gray-300">{expandedQuickReset === ex.id ? '▲' : '▼'}</span>
              </button>
              {expandedQuickReset === ex.id && (
                <div className="px-3 pb-3 border-t border-gray-50">
                  <div className="space-y-1 mt-2 mb-3">
                    {(lang === 'en' ? ex.stepsEn : ex.steps).map((step, i) => (
                      <div key={i} className="text-xs text-gray-600 flex gap-1.5">
                        <span className="text-purple-400">{i + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => startExercise(ex)}
                    className="w-full bg-purple-100 text-purple-700 rounded-lg py-1.5 text-xs font-medium active:bg-purple-200"
                  >
                    {t('mind.start', lang)}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Module 3: Words for You */}
      <div className="mb-4">
        <div className="text-sm font-medium mb-2">{t('mind.wordsTitle', lang)}</div>

        {/* Affirmation */}
        <div className="bg-purple-50 rounded-xl p-4 mb-2">
          <div className="text-xs text-purple-500 mb-1">{t('mind.affirmation', lang)}</div>
          <div className="text-sm text-purple-800 leading-relaxed">
            {lang === 'en' ? todayAffirmation.en : todayAffirmation.zh}
          </div>
        </div>

        {/* Permission */}
        <div className="bg-indigo-50 rounded-xl p-4 mb-2">
          <div className="text-xs text-indigo-500 mb-1">{t('mind.permission', lang)}</div>
          <div className="text-sm text-indigo-800 leading-relaxed">
            {lang === 'en' ? todayPermission.en : todayPermission.zh}
          </div>
        </div>

        {/* Micro tip */}
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="text-xs text-blue-500 mb-1">{t('mind.microTip', lang)}</div>
          <div className="text-sm text-blue-800 leading-relaxed">
            {lang === 'en' ? todayTip.en : todayTip.zh}
          </div>
        </div>
      </div>

      {/* Module 4: Today's Reflection */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="text-sm font-medium mb-1">{t('mind.reflectionTitle', lang)}</div>
        <div className="text-xs text-gray-400 mb-3">{t('mind.reflectionDesc', lang)}</div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-purple-600 mb-1 block">{t('mind.aboutChild', lang)}</label>
            <textarea
              value={reflection.aboutChild ?? ''}
              onChange={e => setReflection(r => ({ ...r, aboutChild: e.target.value }))}
              className="w-full text-sm border border-gray-200 rounded-lg p-2 h-16 resize-none focus:outline-none focus:border-purple-300"
              placeholder="..."
            />
          </div>
          <div>
            <label className="text-xs text-purple-600 mb-1 block">{t('mind.aboutSelf', lang)}</label>
            <textarea
              value={reflection.aboutSelf ?? ''}
              onChange={e => setReflection(r => ({ ...r, aboutSelf: e.target.value }))}
              className="w-full text-sm border border-gray-200 rounded-lg p-2 h-16 resize-none focus:outline-none focus:border-purple-300"
              placeholder="..."
            />
          </div>
          <div>
            <label className="text-xs text-purple-600 mb-1 block">{t('mind.intention', lang)}</label>
            <textarea
              value={reflection.tomorrowIntention ?? ''}
              onChange={e => setReflection(r => ({ ...r, tomorrowIntention: e.target.value }))}
              className="w-full text-sm border border-gray-200 rounded-lg p-2 h-12 resize-none focus:outline-none focus:border-purple-300"
              placeholder="..."
            />
          </div>
        </div>

        <button
          onClick={handleSaveReflection}
          className="w-full mt-3 bg-purple-100 text-purple-700 rounded-lg py-2 text-sm font-medium active:bg-purple-200"
        >
          {reflectionSaved ? `✓ ${t('mind.saved', lang)}` : t('mind.save', lang)}
        </button>
      </div>

      {/* Module 5: Weekly Check-In (Sunday only) */}
      {isSunday && !checkinDone && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100 mb-4">
          <div className="text-sm font-medium mb-1">{t('mind.checkinTitle', lang)}</div>
          <div className="text-xs text-gray-400 mb-3">{t('mind.checkinDesc', lang)}</div>

          {/* Q1: Exhaustion */}
          <div className="mb-3">
            <div className="text-xs text-gray-600 mb-1.5">{t('mind.q1', lang)}</div>
            <div className="flex gap-1.5">
              {[
                { val: 1, label: t('mind.q1a1', lang) },
                { val: 2, label: t('mind.q1a2', lang) },
                { val: 3, label: t('mind.q1a3', lang) },
                { val: 4, label: t('mind.q1a4', lang) },
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => setQ1(opt.val)}
                  className={`flex-1 py-1.5 rounded-lg text-xs ${
                    q1 === opt.val ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q2: Self-care */}
          <div className="mb-3">
            <div className="text-xs text-gray-600 mb-1.5">{t('mind.q2', lang)}</div>
            <div className="flex gap-1.5">
              <button
                onClick={() => setQ2(true)}
                className={`flex-1 py-1.5 rounded-lg text-xs ${q2 === true ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {t('mind.q2yes', lang)}
              </button>
              <button
                onClick={() => setQ2(false)}
                className={`flex-1 py-1.5 rounded-lg text-xs ${q2 === false ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {t('mind.q2no', lang)}
              </button>
            </div>
          </div>

          {/* Q3: Self-patience */}
          <div className="mb-3">
            <div className="text-xs text-gray-600 mb-1.5">{t('mind.q3', lang)}</div>
            <div className="flex gap-1.5">
              {[
                { val: 1, label: t('mind.q3a1', lang) },
                { val: 2, label: t('mind.q3a2', lang) },
                { val: 3, label: t('mind.q3a3', lang) },
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => setQ3(opt.val)}
                  className={`flex-1 py-1.5 rounded-lg text-xs ${
                    q3 === opt.val ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {q1 !== null && q2 !== null && q3 !== null && (
            <>
              <div className={`rounded-xl p-3 mb-3 text-center ${showBurnoutMsg ? 'bg-purple-50' : 'bg-green-50'}`}>
                <div className={`text-sm ${showBurnoutMsg ? 'text-purple-700' : 'text-green-700'}`}>
                  {showBurnoutMsg ? t('mind.burnoutMsg', lang) : t('mind.gentleMsg', lang)}
                </div>
              </div>
              <button
                onClick={() => setCheckinDone(true)}
                className="w-full bg-purple-100 text-purple-700 rounded-lg py-2 text-sm font-medium active:bg-purple-200"
              >
                {t('mind.done', lang)}
              </button>
            </>
          )}
        </div>
      )}

      <div className="text-center text-xs text-gray-300 pb-4">
        💜
      </div>
    </div>
  );
}
