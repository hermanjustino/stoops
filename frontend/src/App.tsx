import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import { useEvents } from './hooks/useEvents';
import type { StandardEvent } from './types/event';

function App() {
  const NYC_CENTER = { lat: 40.7128, lng: -74.0060 };
  const { events, loading, error } = useEvents();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Replace with your Google Maps API Key or use an env variable
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const handleEventSelect = (event: StandardEvent) => {
    setSelectedEventId(event.id);
  };

  const handleMarkerClick = (event: StandardEvent) => {
    setSelectedEventId(event.id);
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Sidebar 
        events={events} 
        loading={loading} 
        error={error} 
        selectedEventId={selectedEventId}
        onEventSelect={handleEventSelect}
      />
      <main style={{ flex: 1, position: 'relative' }}>
        <Map 
          apiKey={GOOGLE_MAPS_API_KEY} 
          center={NYC_CENTER} 
          events={events}
          selectedEventId={selectedEventId}
          onMarkerClick={handleMarkerClick}
        />
      </main>
    </div>
  );
}

export default App;
