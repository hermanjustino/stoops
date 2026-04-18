import React from 'react';
import { APIProvider, Map as GoogleMap, Marker } from '@vis.gl/react-google-maps';

interface MapProps {
  apiKey: string;
  center: { lat: number; lng: number };
}

const Map: React.FC<MapProps> = ({ apiKey, center }) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <APIProvider apiKey={apiKey}>
        <GoogleMap
          defaultCenter={center}
          defaultZoom={11}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          style={{ height: '100%', width: '100%' }}
        >
          {/* Markers will be rendered here */}
        </GoogleMap>
      </APIProvider>
    </div>
  );
};

export default Map;
