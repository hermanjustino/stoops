import React from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';

function App() {
  const NYC_CENTER = { lat: 40.7128, lng: -74.0060 };
  
  // Replace with your Google Maps API Key or use an env variable
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ flex: 1, position: 'relative' }}>
        <Map apiKey={GOOGLE_MAPS_API_KEY} center={NYC_CENTER} />
      </main>
    </div>
  );
}

export default App;
