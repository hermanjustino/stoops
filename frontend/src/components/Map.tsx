import React, { useEffect } from 'react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import type { StandardEvent } from '../types/event';

const SOURCE_COLORS: Record<string, string> = {
  ticketmaster: '#0071E3',
  seatgeek:     '#34C759',
  eventbrite:   '#FF6B35',
};

interface MapProps {
  apiKey: string;
  center: { lat: number; lng: number };
  events: StandardEvent[];
  selectedEventId: string | null;
  onMarkerClick: (event: StandardEvent) => void;
}

const NYC_MAP_ID = 'stoops-nyc-map';

interface MapInnerProps {
  events: StandardEvent[];
  selectedEventId: string | null;
  onMarkerClick: (event: StandardEvent) => void;
}

const MapInner: React.FC<MapInnerProps> = ({ events, selectedEventId, onMarkerClick }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !selectedEventId) return;
    const selected = events.find(e => e.id === selectedEventId);
    if (selected?.lat != null && selected?.lng != null) {
      map.panTo({ lat: selected.lat, lng: selected.lng });
    }
  }, [map, selectedEventId, events]);

  return (
    <>
      {events.filter(e => e.lat !== null && e.lng !== null).map(event => {
        const isSelected = event.id === selectedEventId;
        const color = SOURCE_COLORS[event.source] ?? '#0071E3';
        return (
          <AdvancedMarker
            key={event.id}
            position={{ lat: event.lat!, lng: event.lng! }}
            onClick={() => onMarkerClick(event)}
            title={event.title}
          >
            <Pin
              background={isSelected ? '#1D1D1F' : color}
              borderColor={isSelected ? '#1D1D1F' : color}
              glyphColor="#ffffff"
              scale={isSelected ? 1.4 : 1}
            />
          </AdvancedMarker>
        );
      })}
    </>
  );
};

const Map: React.FC<MapProps> = ({ apiKey, center, events, selectedEventId, onMarkerClick }) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <APIProvider apiKey={apiKey}>
        <GoogleMap
          mapId={NYC_MAP_ID}
          defaultCenter={center}
          defaultZoom={12}
          gestureHandling="greedy"
          disableDefaultUI={true}
          style={{ height: '100%', width: '100%' }}
        >
          <MapInner events={events} selectedEventId={selectedEventId} onMarkerClick={onMarkerClick} />
        </GoogleMap>
      </APIProvider>
    </div>
  );
};

export default Map;
