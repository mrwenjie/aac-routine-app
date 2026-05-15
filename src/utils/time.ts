import type { DayType } from '../types';
import type { Language } from '../i18n';

export function parseTime(timeStr: string): { hours: number; minutes: number } {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return { hours, minutes };
}

export function timeToMinutes(timeStr: string): number {
  const { hours, minutes } = parseTime(timeStr);
  return hours * 60 + minutes;
}

export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function getCurrentTimeStr(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

export function getCurrentMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

export function formatTime(timeStr: string, lang: Language = 'zh'): string {
  const { hours, minutes } = parseTime(timeStr);
  if (lang === 'en') {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  const period = hours >= 12 ? '下午' : '上午';
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${period} ${displayHours}:${minutes.toString().padStart(2, '0')}`;
}

export function formatMinutesDisplay(totalMinutes: number, lang: Language = 'zh'): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (lang === 'en') {
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}min`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}min`;
  }
  if (hours > 0 && minutes > 0) return `${hours}小时${minutes}分钟`;
  if (hours > 0) return `${hours}小时`;
  return `${minutes}分钟`;
}

export function formatCountdown(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getDayType(): DayType {
  const day = new Date().getDay();
  return day === 0 || day === 6 ? 'weekend' : 'weekday';
}

export function getTodayDateStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
}

export function getDayOfWeek(lang: Language = 'zh'): string {
  const zhDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const enDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = new Date().getDay();
  return lang === 'en' ? enDays[day] : zhDays[day];
}

// Keep backward compat
export function getDayOfWeekChinese(): string {
  return getDayOfWeek('zh');
}
