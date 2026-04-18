import React, { useEffect, useState } from 'react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import type { StandardEvent } from '../types/event';

const EVENT_COLOR = '#8B5CF6';

interface MapProps {
  apiKey: string;
  center: { lat: number; lng: number };
  events: StandardEvent[];
  selectedEventId: string | null;
  happeningNow: boolean;
  onMarkerClick: (event: StandardEvent) => void;
}

interface MapInnerProps {
  events: StandardEvent[];
  selectedEventId: string | null;
  happeningNow: boolean;
  onMarkerClick: (event: StandardEvent) => void;
}

const MapInner: React.FC<MapInnerProps> = ({ events, selectedEventId, happeningNow, onMarkerClick }) => {
  const map = useMap();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!map || !selectedEventId) return;
    const selected = events.find(e => e.id === selectedEventId);
    if (selected?.lat != null && selected?.lng != null) {
      map.panTo({ lat: selected.lat, lng: selected.lng });
    }
  }, [map, selectedEventId, events]);

  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {},
      { enableHighAccuracy: true },
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const mappable = events.filter(e => e.lat != null && e.lng != null);

  return (
    <>
      {mappable.map(event => {
        const isSelected = event.id === selectedEventId;
        return (
          <AdvancedMarker
            key={event.id}
            position={{ lat: event.lat!, lng: event.lng! }}
            onClick={() => onMarkerClick(event)}
            title={event.title}
            zIndex={isSelected ? 10 : 1}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {happeningNow && (
                <div style={{
                  position: 'absolute',
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: `${EVENT_COLOR}40`,
                  animation: 'markerPulse 1.5s ease-out infinite',
                }} />
              )}
              <div style={{
                width: isSelected ? 20 : 14,
                height: isSelected ? 20 : 14,
                borderRadius: '50%',
                background: isSelected ? '#1D1D1F' : EVENT_COLOR,
                border: '2.5px solid white',
                boxShadow: isSelected
                  ? '0 0 0 3px rgba(29,29,31,0.2), 0 2px 10px rgba(0,0,0,0.3)'
                  : '0 2px 8px rgba(139,92,246,0.4)',
                transition: 'all 0.2s ease',
              }} />
            </div>
          </AdvancedMarker>
        );
      })}

      {userLocation && (
        <AdvancedMarker position={userLocation} title="You are here" zIndex={100}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute',
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'rgba(0,113,227,0.2)',
              animation: 'markerPulse 2s ease-out infinite',
            }} />
            <div style={{
              width: '14px', height: '14px', borderRadius: '50%',
              background: '#0071E3', border: '2.5px solid white',
              boxShadow: '0 2px 8px rgba(0,113,227,0.4)',
            }} />
          </div>
        </AdvancedMarker>
      )}

      <style>{`
        @keyframes markerPulse {
          0%   { transform: scale(1); opacity: 0.9; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </>
  );
};

const Map: React.FC<MapProps> = ({ apiKey, center, events, selectedEventId, happeningNow, onMarkerClick }) => (
  <div style={{ height: '100%', width: '100%' }}>
    <APIProvider apiKey={apiKey}>
      <GoogleMap
        mapId="stoops-nyc-map"
        defaultCenter={center}
        defaultZoom={13}
        gestureHandling="greedy"
        disableDefaultUI={true}
        style={{ height: '100%', width: '100%' }}
      >
        <MapInner
          events={events}
          selectedEventId={selectedEventId}
          happeningNow={happeningNow}
          onMarkerClick={onMarkerClick}
        />
      </GoogleMap>
    </APIProvider>
  </div>
);

export default Map;
