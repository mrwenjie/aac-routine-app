import type { Activity } from '../types';
import { activityPools } from '../data/activities';
import { loadActivityHistory } from './storage';
import { getTodayDateStr } from './time';

export function selectActivity(
  poolIds: string[],
  excludeIds: string[] = [],
  indoorOnly: boolean = false,
): Activity | null {
  // Gather all eligible activities from the specified pools
  let candidates: Activity[] = [];
  for (const poolId of poolIds) {
    const pool = activityPools[poolId];
    if (pool) {
      candidates.push(...pool);
    }
  }

  // Deduplicate
  const seen = new Set<string>();
  candidates = candidates.filter(a => {
    if (seen.has(a.id)) return false;
    seen.add(a.id);
    return true;
  });

  // Filter out excluded activities
  if (excludeIds.length > 0) {
    candidates = candidates.filter(a => !excludeIds.includes(a.id));
  }

  // Filter indoor-only if needed
  if (indoorOnly) {
    candidates = candidates.filter(a => !a.requiresOutdoor);
  }

  if (candidates.length === 0) return null;

  // Get usage history for weighting
  const history = loadActivityHistory();
  const today = getTodayDateStr();

  // Calculate weights
  const weighted = candidates.map(activity => {
    const usage = history.find(h => h.activityId === activity.id);
    let weight = 10; // base weight

    if (usage) {
      // Penalize if used today
      if (usage.lastUsedDate === today) {
        weight = 1;
      } else {
        // Calculate days since last use
        const lastDate = new Date(usage.lastUsedDate);
        const todayDate = new Date(today);
        const daysSince = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        // More days since last use = higher weight
        weight = Math.min(20, 5 + daysSince * 2);
      }
    } else {
      // Never used before - high weight
      weight = 15;
    }

    return { activity, weight };
  });

  // Weighted random selection
  const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);
  let random = Math.random() * totalWeight;
  for (const item of weighted) {
    random -= item.weight;
    if (random <= 0) return item.activity;
  }

  // Fallback
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function selectMultipleActivities(
  poolIds: string[],
  count: number,
  indoorOnly: boolean = false,
): Activity[] {
  const selected: Activity[] = [];
  const excludeIds: string[] = [];

  for (let i = 0; i < count; i++) {
    const activity = selectActivity(poolIds, excludeIds, indoorOnly);
    if (activity) {
      selected.push(activity);
      excludeIds.push(activity.id);
    }
  }

  return selected;
}
