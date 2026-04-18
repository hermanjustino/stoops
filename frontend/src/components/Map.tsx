import React, { useEffect } from 'react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { StandardEvent } from '../types/event';

type MapStyle = { featureType?: string; elementType?: string; stylers: Record<string, string>[] };

const MAP_STYLES: MapStyle[] = [
  { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ visibility: 'on' }, { color: '#e8f0e4' }] },
  { featureType: 'transit', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#f0f0f0' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#e8e8e8' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9d8e8' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f5f5f7' }] },
  { featureType: 'administrative.neighborhood', elementType: 'labels.text.fill', stylers: [{ color: '#86868b' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca3af' }] },
];

// Color per source for easy visual differentiation
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
          styles={MAP_STYLES}
        >
          <MapInner events={events} selectedEventId={selectedEventId} onMarkerClick={onMarkerClick} />
        </GoogleMap>
      </APIProvider>
    </div>
  );
};

export default Map;
