import { useState, useMemo, useEffect } from 'react';
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

/** Haversine distance in miles */
function getDistanceMi(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function App() {
  const { events, loading, error } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<StandardEvent | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [happeningNow, setHappeningNow] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // Request user location on mount
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => { /* permission denied — fall back to no location */ },
      { enableHighAccuracy: true },
    );
  }, []);

  const filtered = useMemo(() => {
    const now = new Date();

    const items = events.filter(e => {
      // Text search
      if (query && !e.title.toLowerCase().includes(query.toLowerCase()) && !e.venue.toLowerCase().includes(query.toLowerCase())) return false;

      // Category filter — special chips for Bathrooms and Landmarks
      if (category === 'Bathrooms') {
        if (e.type !== 'bathroom') return false;
      } else if (category === 'Landmarks') {
        if (e.type !== 'landmark') return false;
      } else if (category !== 'All') {
        // Non-special categories should hide bathrooms and landmarks
        if (e.type === 'bathroom' || e.type === 'landmark') return false;
        if (!(e.category?.toLowerCase().includes(category.toLowerCase()) ?? false)) return false;
      }

      // Happening Now — skip bathrooms and landmarks (they're not time-bound)
      if (happeningNow && e.type !== 'bathroom' && e.type !== 'landmark' && !isHappeningNow(e.date)) return false;

      // Time filter — skip bathrooms and landmarks
      if (timeFilter !== 'all' && e.type !== 'bathroom' && e.type !== 'landmark') {
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

    // Compute distance and sort by nearest if user location is available
    if (userLocation) {
      for (const item of items) {
        if (item.lat != null && item.lng != null) {
          item.distance = getDistanceMi(userLocation.lat, userLocation.lng, item.lat, item.lng);
        }
      }
      items.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
    }

    return items;
  }, [events, query, category, happeningNow, timeFilter, userLocation]);

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
