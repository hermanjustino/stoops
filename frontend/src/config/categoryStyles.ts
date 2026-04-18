/**
 * Central category style config used across map pins, cards, and detail panels.
 * Each category gets a unique color and emoji for quick visual scanning.
 */

export interface CategoryStyle {
  bg: string;
  emoji: string;
  label: string;
}

export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  'Music':         { bg: '#8B5CF6', emoji: '🎵', label: 'Music' },
  'Food & Drink':  { bg: '#F59E0B', emoji: '🍕', label: 'Food & Drink' },
  'Art & Culture': { bg: '#3B82F6', emoji: '🎭', label: 'Art & Culture' },
  'Comedy':        { bg: '#EC4899', emoji: '🎤', label: 'Comedy' },
  'Nightlife':     { bg: '#7C3AED', emoji: '🪩', label: 'Nightlife' },
  'Sports':        { bg: '#EF4444', emoji: '🏟️', label: 'Sports' },
  'Community':     { bg: '#22C55E', emoji: '🌱', label: 'Community' },
  'Family':        { bg: '#06B6D4', emoji: '🎠', label: 'Family' },
  'Free':          { bg: '#F97316', emoji: '🆓', label: 'Free' },
  'Bathroom':      { bg: '#F43F5E', emoji: '🚻', label: 'Bathroom' },
  'Landmark':      { bg: '#92400E', emoji: '🏛️', label: 'Landmark' },
};

export const DEFAULT_STYLE: CategoryStyle = { bg: '#94A3B8', emoji: '📌', label: 'Event' };

export function getCategoryStyle(category: string | null | undefined): CategoryStyle {
  if (!category) return DEFAULT_STYLE;
  return CATEGORY_STYLES[category] ?? DEFAULT_STYLE;
}
