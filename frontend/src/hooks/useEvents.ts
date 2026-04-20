import { useState, useEffect } from 'react';
import type { StandardEvent } from '../types/event';
import { MOCK_EVENTS, MOCK_BATHROOMS } from '../data/mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Maps raw API category values → standard app categories
const CATEGORY_NORMALIZE: Record<string, string> = {
  // Ticketmaster segments
  'music': 'Music',
  'sports': 'Sports',
  'arts & theatre': 'Art & Culture',
  'miscellaneous': 'Community',
  'undefined': 'Community',
  // Ticketmaster genres
  'comedy': 'Comedy',
  'family': 'Family',
  'dance': 'Art & Culture',
  'ballet': 'Art & Culture',
  'theatre': 'Art & Culture',
  'theater': 'Art & Culture',
  'musical': 'Art & Culture',
  'opera': 'Art & Culture',
  'broadway': 'Art & Culture',
  'electronic': 'Nightlife',
  'club/dance': 'Nightlife',
  // SeatGeek types
  'concert': 'Music',
  'concerts': 'Music',
  'music_festival': 'Music',
  'classical': 'Music',
  'nfl': 'Sports',
  'nba': 'Sports',
  'mlb': 'Sports',
  'nhl': 'Sports',
  'mls': 'Sports',
  'soccer': 'Sports',
  'boxing': 'Sports',
  'mma': 'Sports',
  'wrestling': 'Sports',
  'broadway_tickets_national': 'Art & Culture',
  'entertainment': 'Art & Culture',
  'dance_performance_tour': 'Art & Culture',
  'film': 'Art & Culture',
  'kids': 'Family',
  'food_and_drink': 'Food & Drink',
  'conference': 'Community',
  'charity': 'Community',
  'meetup': 'Community',
};

function normalizeCategory(raw: string | null | undefined): string | null {
  if (!raw) return null;
  return CATEGORY_NORMALIZE[raw.toLowerCase()] ?? raw;
}

interface UseEventsResult {
  events: StandardEvent[];
  loading: boolean;
  error: string | null;
}

export function useEvents(): UseEventsResult {
  const [events, setEvents] = useState<StandardEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${API_URL}/api/events`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // Tag items by type based on category
        const tagged = (data.events as StandardEvent[]).map(e => {
          const category = normalizeCategory(e.category);
          return {
            ...e,
            category,
            type: category === 'Bathroom' ? 'bathroom' as const : 'event' as const,
          };
        });
        // Merge API events with bathroom data
        setEvents([...tagged, ...MOCK_BATHROOMS]);
      } catch {
        // Fall back to mock data when API is unavailable
        setEvents([...MOCK_EVENTS, ...MOCK_BATHROOMS]);
        setError(null);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return { events, loading, error };
}
