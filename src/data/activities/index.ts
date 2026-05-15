import { deepPressureActivities } from './deep-pressure';
import { sensoryTactileActivities } from './sensory-tactile';
import { grossMotorActivities } from './gross-motor';
import { outdoorActivities } from './outdoor';
import { quietActivities } from './quiet';
import type { Activity, ActivityCategory } from '../../types';

export const allActivities: Activity[] = [
  ...deepPressureActivities,
  ...sensoryTactileActivities,
  ...grossMotorActivities,
  ...outdoorActivities,
  ...quietActivities,
];

export const activityPools: Record<string, Activity[]> = {
  deepPressure: deepPressureActivities,
  sensoryTactile: sensoryTactileActivities,
  grossMotor: grossMotorActivities,
  outdoor: outdoorActivities,
  quietActivity: quietActivities,
  // Combined pools for time slots that accept multiple categories
  sensoryAll: [...deepPressureActivities, ...sensoryTactileActivities],
  indoorActive: [...grossMotorActivities.filter(a => !a.requiresOutdoor), ...deepPressureActivities],
  outdoorOrIndoor: [...outdoorActivities, ...grossMotorActivities.filter(a => !a.requiresOutdoor), ...sensoryTactileActivities],
  calming: [...quietActivities, ...deepPressureActivities.filter(a => a.tags.includes('calming'))],
};

export function getActivitiesByCategory(category: ActivityCategory): Activity[] {
  return allActivities.filter(a => a.category === category);
}

export function getActivitiesByTag(tag: string): Activity[] {
  return allActivities.filter(a => a.tags.includes(tag));
}

export function getIndoorActivities(): Activity[] {
  return allActivities.filter(a => !a.requiresOutdoor);
}
