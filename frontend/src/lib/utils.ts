import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Fursuit Models': 'from-pink-500 to-rose-500',
    'Fursuit Accessories': 'from-purple-500 to-violet-500',
    'Digital Art': 'from-blue-500 to-cyan-500',
    '2D & 3D': 'from-orange-500 to-amber-500',
    'Video Projects': 'from-green-500 to-emerald-500',
  };
  return colors[category] || 'from-gray-500 to-slate-500';
}

export function getCategoryGlow(category: string): string {
  const glows: Record<string, string> = {
    'Fursuit Models': 'glow-pink',
    'Fursuit Accessories': 'glow-purple',
    'Digital Art': 'glow-blue',
    '2D & 3D': 'shadow-orange-500/30',
    'Video Projects': 'glow-green',
  };
  return glows[category] || '';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
