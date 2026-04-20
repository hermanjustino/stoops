import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { StandardEvent } from '../types/event';
import { getCategoryStyle } from '../config/categoryStyles';

function createMarkerIcon(category: string | null, isSelected: boolean, happeningNow: boolean): L.DivIcon {
  const { bg, emoji } = getCategoryStyle(category);
  const size = isSelected ? 42 : 34;
  const pulse = happeningNow
    ? `<div style="position:absolute;width:${size + 14}px;height:${size + 14}px;border-radius:50%;background:${bg}40;animation:lmPulse 1.5s ease-out infinite;top:50%;left:50%;transform:translate(-50%,-50%);"></div>`
    : '';

  return L.divIcon({
    className: '',
    html: `<div style="position:relative;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;">
      ${pulse}
      <div style="
        width:${size}px;height:${size}px;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg)${isSelected ? ' scale(1.1)' : ''};
        background:${isSelected ? '#1D1D1F' : bg};
        border:2.5px solid ${isSelected ? '#fff' : 'rgba(255,255,255,0.9)'};
        box-shadow:${isSelected ? `0 4px 14px rgba(0,0,0,0.3),0 0 0 3px ${bg}40` : '0 2px 8px rgba(0,0,0,0.25)'};
        display:flex;align-items:center;justify-content:center;cursor:pointer;
      ">
        <span style="transform:rotate(45deg);font-size:${isSelected ? 18 : 15}px;line-height:1;">${emoji}</span>
      </div>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
}

function createUserLocationIcon(): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div style="position:relative;width:20px;height:20px;display:flex;align-items:center;justify-content:center;">
      <div style="position:absolute;width:32px;height:32px;border-radius:50%;background:rgba(0,113,227,0.2);animation:lmPulse 2s ease-out infinite;top:50%;left:50%;transform:translate(-50%,-50%);"></div>
      <div style="width:14px;height:14px;border-radius:50%;background:#0071E3;border:2.5px solid white;box-shadow:0 2px 8px rgba(0,113,227,0.4);"></div>
    </div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

const MapController: React.FC<{ events: StandardEvent[]; selectedEventId: string | null }> = ({ events, selectedEventId }) => {
  const map = useMap();
  useEffect(() => {
    if (!selectedEventId) return;
    const selected = events.find(e => e.id === selectedEventId);
    if (selected?.lat != null && selected?.lng != null) {
      map.panTo([selected.lat, selected.lng]);
    }
  }, [map, selectedEventId, events]);
  return null;
};

interface Props {
  apiKey: string; // unused — kept so App.tsx import is a one-line swap
  center: { lat: number; lng: number };
  events: StandardEvent[];
  selectedEventId: string | null;
  happeningNow: boolean;
  onMarkerClick: (event: StandardEvent) => void;
}

const LeafletMap: React.FC<Props> = ({ center, events, selectedEventId, happeningNow, onMarkerClick }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

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
    <div style={{ height: '100%', width: '100%' }}>
      <style>{`
        @keyframes lmPulse {
          0%   { opacity: 0.8; }
          100% { transform: translate(-50%,-50%) scale(2.5); opacity: 0; }
        }
        .leaflet-container { background: #f5f5f7; z-index: 0 !important; }
        .leaflet-attribution-flag { display: none !important; }
        .leaflet-control-container { z-index: 0 !important; }
      `}</style>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; Esri'
          maxZoom={16}
        />

        <MapController events={events} selectedEventId={selectedEventId} />
        {mappable.map(event => (
          <Marker
            key={`${event.id}-${event.id === selectedEventId}-${happeningNow}`}
            position={[event.lat!, event.lng!]}
            icon={createMarkerIcon(event.category, event.id === selectedEventId, happeningNow)}
            eventHandlers={{ click: () => onMarkerClick(event) }}
            zIndexOffset={event.id === selectedEventId ? 1000 : 0}
          />
        ))}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={createUserLocationIcon()}
            zIndexOffset={2000}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
