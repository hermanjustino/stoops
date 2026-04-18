import React, { useEffect, useState } from 'react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import type { StandardEvent } from '../types/event';

const CATEGORY_PIN: Record<string, { bg: string; emoji: string }> = {
  'Music':         { bg: '#8B5CF6', emoji: '🎵' },
  'Food & Drink':  { bg: '#F59E0B', emoji: '🍽️' },
  'Art & Culture': { bg: '#3B82F6', emoji: '🎨' },
  'Comedy':        { bg: '#EC4899', emoji: '😂' },
  'Nightlife':     { bg: '#6366F1', emoji: '🌙' },
  'Sports':        { bg: '#EF4444', emoji: '⚽' },
  'Community':     { bg: '#22C55E', emoji: '🤝' },
  'Family':        { bg: '#14B8A6', emoji: '👨‍👩‍👧' },
  'Free':          { bg: '#10B981', emoji: '🆓' },
  'Bathroom':      { bg: '#F43F5E', emoji: '🚻' },
};
const DEFAULT_PIN = { bg: '#8B5CF6', emoji: '📍' };

export function getCategoryStyle(category: string | null | undefined) {
  return CATEGORY_PIN[category ?? ''] ?? DEFAULT_PIN;
}

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
        const pin = getCategoryStyle(event.category);
        const size = isSelected ? 42 : 34;

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
                  width: `${size + 12}px`, height: `${size + 12}px`, borderRadius: '50%',
                  background: `${pin.bg}40`,
                  animation: 'markerPulse 1.5s ease-out infinite',
                }} />
              )}
              <div style={{
                width: size,
                height: size,
                borderRadius: '50% 50% 50% 0',
                transform: `rotate(-45deg)${isSelected ? ' scale(1.1)' : ''}`,
                background: pin.bg,
                border: `2.5px solid ${isSelected ? '#fff' : 'rgba(255,255,255,0.9)'}`,
                boxShadow: isSelected
                  ? `0 4px 14px rgba(0,0,0,0.3), 0 0 0 3px ${pin.bg}40`
                  : '0 2px 8px rgba(0,0,0,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}>
                <span style={{
                  transform: 'rotate(45deg)',
                  fontSize: isSelected ? 18 : 15,
                  lineHeight: 1,
                }}>
                  {pin.emoji}
                </span>
              </div>
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
