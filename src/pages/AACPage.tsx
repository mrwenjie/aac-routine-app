import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProgressRing } from '../components/common/ProgressRing';
import { aacScenarios } from '../data/aac';
import { vocabulary } from '../data/aac/vocabulary';
import type { AACContext, AACPracticeLog, AACScenario } from '../types';

const contextLabels: Record<AACContext, string> = {
  greeting: '打招呼',
  foodChoice: '选食物',
  activityChoice: '选活动',
  requesting: '请求/要求',
  commenting: '描述/评论',
  protesting: '拒绝/说停',
  socialRoutine: '社交礼貌',
};

const vocabCategoryLabels: Record<string, string> = {
  coreWord: '核心词',
  food: '食物',
  action: '动作',
  descriptor: '描述词',
  social: '社交',
  feeling: '感受',
  object: '物品',
};

export function AACPage() {
  const { state, dispatch } = useApp();
  const [selectedContext, setSelectedContext] = useState<AACContext | 'all'>('all');
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);
  const [showVocab, setShowVocab] = useState(false);

  const aacCount = state.todayLog.aacPractices.length;
  const aacGoal = state.settings.aacDailyGoal;

  const filteredScenarios = useMemo(() => {
    if (selectedContext === 'all') return aacScenarios;
    return aacScenarios.filter(s => s.context === selectedContext);
  }, [selectedContext]);

  const handleLogAAC = (scenario: AACScenario) => {
    const practice: AACPracticeLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      scenarioId: scenario.id,
      vocabularyUsed: scenario.targetVocabulary,
      context: scenario.context,
    };
    dispatch({ type: 'LOG_AAC_PRACTICE', payload: practice });
  };

  const handleQuickLog = (context: AACContext) => {
    const practice: AACPracticeLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      vocabularyUsed: [],
      context,
    };
    dispatch({ type: 'LOG_AAC_PRACTICE', payload: practice });
  };

  const groupedVocab = useMemo(() => {
    const groups: Record<string, typeof vocabulary> = {};
    vocabulary.forEach(v => {
      if (!groups[v.category]) groups[v.category] = [];
      groups[v.category].push(v);
    });
    return groups;
  }, []);

  return (
    <div className="flex-1 overflow-y-auto pb-20 px-4 pt-4">
      {/* Header with progress */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold">AAC练习</h1>
          <p className="text-sm text-gray-400">帮助卓伟在家使用AAC</p>
        </div>
        <ProgressRing
          progress={Math.min(1, aacCount / aacGoal)}
          size={64}
          strokeWidth={5}
          color={aacCount >= aacGoal ? 'var(--color-success)' : 'var(--color-primary)'}
        >
          <span className="text-sm font-bold">{aacCount}/{aacGoal}</span>
        </ProgressRing>
      </div>

      {/* Quick log */}
      {aacCount < aacGoal && (
        <div className="bg-blue-50 rounded-xl p-4 mb-4">
          <div className="text-sm font-medium text-blue-800 mb-2">快速记录</div>
          <div className="flex flex-wrap gap-2">
            {(['foodChoice', 'requesting', 'activityChoice', 'greeting'] as AACContext[]).map(ctx => (
              <button
                key={ctx}
                onClick={() => handleQuickLog(ctx)}
                className="bg-white text-blue-700 text-xs px-3 py-1.5 rounded-lg border border-blue-200 active:bg-blue-100"
              >
                {contextLabels[ctx]}
              </button>
            ))}
          </div>
        </div>
      )}

      {aacCount >= aacGoal && (
        <div className="bg-green-50 rounded-xl p-4 mb-4 text-center">
          <div className="text-2xl mb-1">🎉</div>
          <div className="text-sm font-medium text-green-800">今天的AAC目标已达成！</div>
          <div className="text-xs text-green-600">当然，多练习更好</div>
        </div>
      )}

      {/* Tab: Scenarios vs Vocabulary */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setShowVocab(false)}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${
            !showVocab ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          练习场景
        </button>
        <button
          onClick={() => setShowVocab(true)}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${
            showVocab ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          词汇表
        </button>
      </div>

      {!showVocab ? (
        <>
          {/* Context filter */}
          <div className="flex gap-1.5 overflow-x-auto mb-4 pb-1 -mx-1 px-1">
            <button
              onClick={() => setSelectedContext('all')}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs ${
                selectedContext === 'all' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              全部
            </button>
            {Object.entries(contextLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedContext(key as AACContext)}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-xs ${
                  selectedContext === key ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Scenarios list */}
          <div className="space-y-3">
            {filteredScenarios.map(scenario => (
              <div key={scenario.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setExpandedScenario(expandedScenario === scenario.id ? null : scenario.id)}
                  className="w-full text-left p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{scenario.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{contextLabels[scenario.context]}</div>
                    </div>
                    <span className="text-gray-300 text-lg">
                      {expandedScenario === scenario.id ? '▲' : '▼'}
                    </span>
                  </div>
                </button>

                {expandedScenario === scenario.id && (
                  <div className="px-4 pb-4 border-t border-gray-50">
                    <div className="text-sm text-gray-600 mt-3 mb-2">{scenario.description}</div>

                    <div className="bg-blue-50 rounded-lg p-3 mb-3">
                      <div className="text-xs font-medium text-blue-700 mb-1">怎么做：</div>
                      <div className="text-sm text-blue-800">{scenario.modelScript}</div>
                    </div>

                    {scenario.tips.length > 0 && (
                      <div className="mb-3">
                        <div className="text-xs font-medium text-gray-500 mb-1">小提示：</div>
                        {scenario.tips.map((tip, i) => (
                          <div key={i} className="text-xs text-gray-500 flex gap-1 mb-0.5">
                            <span>-</span><span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => handleLogAAC(scenario)}
                      className="w-full bg-blue-500 text-white rounded-lg py-2 text-sm font-medium active:bg-blue-600"
                    >
                      记录AAC练习
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Vocabulary table */
        <div className="space-y-4">
          {Object.entries(groupedVocab).map(([category, words]) => (
            <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="font-medium text-sm mb-2">
                {vocabCategoryLabels[category] ?? category}
              </div>
              <div className="flex flex-wrap gap-2">
                {words.map(word => (
                  <span
                    key={word.id}
                    className={`px-3 py-1.5 rounded-lg text-sm ${
                      word.difficultyLevel === 1
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : word.difficultyLevel === 2
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}
                  >
                    {word.word}
                    <span className="text-xs ml-1 opacity-60">({word.wordEn})</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="text-xs text-gray-400 text-center pb-4">
            <span className="inline-block bg-green-50 text-green-600 px-2 py-0.5 rounded mr-2">基础</span>
            <span className="inline-block bg-blue-50 text-blue-600 px-2 py-0.5 rounded mr-2">中级</span>
            <span className="inline-block bg-purple-50 text-purple-600 px-2 py-0.5 rounded">进阶</span>
          </div>
        </div>
      )}
    </div>
  );
}
