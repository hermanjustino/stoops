import { useState, useEffect } from 'react';
import type { StandardEvent } from '../types/event';
import { MOCK_EVENTS, MOCK_BATHROOMS } from '../data/mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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
        // Merge API events with bathroom data
        setEvents([...data.events, ...MOCK_BATHROOMS]);
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
