import type { TimeSlot, DayType } from '../types';
import { weekdaySchedule } from '../data/weekday-schedule';
import { weekendSchedule } from '../data/weekend-schedule';
import { getCurrentMinutes, timeToMinutes, getDayType } from './time';

export function getScheduleForDay(dayType?: DayType): TimeSlot[] {
  const type = dayType ?? getDayType();
  return type === 'weekend' ? weekendSchedule : weekdaySchedule;
}

export function getCurrentSlot(schedule?: TimeSlot[]): TimeSlot | null {
  const slots = schedule ?? getScheduleForDay();
  const now = getCurrentMinutes();
  return slots.find(slot => {
    const start = timeToMinutes(slot.startTime);
    const end = timeToMinutes(slot.endTime);
    return now >= start && now < end;
  }) ?? null;
}

export function getNextSlot(schedule?: TimeSlot[]): TimeSlot | null {
  const slots = schedule ?? getScheduleForDay();
  const now = getCurrentMinutes();
  return slots.find(slot => timeToMinutes(slot.startTime) > now) ?? null;
}

export function getSlotProgress(slot: TimeSlot): number {
  const now = getCurrentMinutes();
  const start = timeToMinutes(slot.startTime);
  const end = timeToMinutes(slot.endTime);
  const total = end - start;
  if (total <= 0) return 0;
  const elapsed = now - start;
  return Math.max(0, Math.min(1, elapsed / total));
}

export function getSlotStatus(slot: TimeSlot): 'past' | 'current' | 'upcoming' {
  const now = getCurrentMinutes();
  const start = timeToMinutes(slot.startTime);
  const end = timeToMinutes(slot.endTime);
  if (now >= end) return 'past';
  if (now >= start) return 'current';
  return 'upcoming';
}

export function getMinutesUntilSlot(slot: TimeSlot): number {
  const now = getCurrentMinutes();
  const start = timeToMinutes(slot.startTime);
  return Math.max(0, start - now);
}

export function getRemainingMinutes(slot: TimeSlot): number {
  const now = getCurrentMinutes();
  const end = timeToMinutes(slot.endTime);
  return Math.max(0, end - now);
}

export function getAACOpportunitySlots(schedule?: TimeSlot[]): TimeSlot[] {
  const slots = schedule ?? getScheduleForDay();
  return slots.filter(s => s.isAACOpportunity);
}

export function getScreenTimeSlots(schedule?: TimeSlot[]): TimeSlot[] {
  const slots = schedule ?? getScheduleForDay();
  return slots.filter(s => s.isScreenTime);
}

export function isBeforeSchedule(schedule?: TimeSlot[]): boolean {
  const slots = schedule ?? getScheduleForDay();
  if (slots.length === 0) return true;
  return getCurrentMinutes() < timeToMinutes(slots[0].startTime);
}

export function isAfterSchedule(schedule?: TimeSlot[]): boolean {
  const slots = schedule ?? getScheduleForDay();
  if (slots.length === 0) return true;
  return getCurrentMinutes() >= timeToMinutes(slots[slots.length - 1].endTime);
}
