import React, { useState, useMemo } from 'react';
import Map from './components/Map';
import FloatingControls from './components/FloatingControls';
import BottomSheet from './components/BottomSheet';
import DetailPanel from './components/DetailPanel';
import { useEvents } from './hooks/useEvents';
import type { StandardEvent } from './types/event';

const NYC_CENTER = { lat: 40.7128, lng: -74.006 };

function isHappeningNow(dateStr: string): boolean {
  const eventDate = new Date(dateStr);
  const now = new Date();
  return (
    eventDate >= new Date(now.getTime() - 3 * 60 * 60 * 1000) &&
    eventDate <= new Date(now.getTime() + 2 * 60 * 60 * 1000)
  );
}

function App() {
  const { events, loading, error } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<StandardEvent | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [happeningNow, setHappeningNow] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all');

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const filtered = useMemo(() => {
    const now = new Date();

    return events.filter(e => {
      if (query && !e.title.toLowerCase().includes(query.toLowerCase()) && !e.venue.toLowerCase().includes(query.toLowerCase())) return false;
      if (category !== 'All' && !(e.category?.toLowerCase().includes(category.toLowerCase()) ?? false)) return false;
      if (happeningNow && !isHappeningNow(e.date)) return false;

      if (timeFilter !== 'all') {
        const eventDate = new Date(e.date);
        const today = new Date(now); today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
        const dayAfterTomorrow = new Date(today); dayAfterTomorrow.setDate(today.getDate() + 2);
        const daysUntilSat = (6 - now.getDay() + 7) % 7;
        const saturday = new Date(today); saturday.setDate(today.getDate() + daysUntilSat);
        const monday = new Date(saturday); monday.setDate(saturday.getDate() + 2);

        if (timeFilter === 'today' && !(eventDate >= today && eventDate < tomorrow)) return false;
        if (timeFilter === 'tomorrow' && !(eventDate >= tomorrow && eventDate < dayAfterTomorrow)) return false;
        if (timeFilter === 'weekend' && !(eventDate >= saturday && eventDate < monday)) return false;
      }

      return true;
    });
  }, [events, query, category, happeningNow, timeFilter]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Map
        apiKey={GOOGLE_MAPS_API_KEY}
        center={NYC_CENTER}
        events={filtered}
        selectedEventId={selectedEvent?.id ?? null}
        happeningNow={happeningNow}
        onMarkerClick={setSelectedEvent}
      />
      <FloatingControls
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        happeningNow={happeningNow}
        onHappeningNowToggle={() => setHappeningNow(h => !h)}
        timeFilter={timeFilter}
        onTimeFilterChange={setTimeFilter}
      />
      {selectedEvent ? (
        <DetailPanel event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      ) : (
        <BottomSheet
          events={filtered}
          loading={loading}
          error={error}
          selectedEventId={null}
          onEventSelect={setSelectedEvent}
        />
      )}
    </div>
  );
}

export default App;
