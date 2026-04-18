import React from 'react';
import EventCard from './EventCard';
import { Search } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="glass" style={{
      width: '400px',
      height: '100%',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 10,
      boxShadow: '10px 0 30px rgba(0,0,0,0.05)'
    }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>NYC Events</h1>
        <p>Curated events across the city.</p>
      </header>

      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <Search size={18} style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-secondary)'
        }} />
        <input 
          type="text" 
          placeholder="Search events..." 
          style={{
            width: '100%',
            padding: '0.8rem 1rem 0.8rem 2.5rem',
            borderRadius: '12px',
            border: 'none',
            background: 'rgba(0,0,0,0.04)',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
        {/* Mock data for visualization */}
        <EventCard 
          title="Central Park Summer Concert" 
          date="Aug 14, 2026 • 7:00 PM" 
          venue="Central Park Rumsey Playfield"
          price="$45"
        />
        <EventCard 
          title="Broadway: The Lion King" 
          date="Aug 15, 2026 • 2:00 PM" 
          venue="Minskoff Theatre"
          price="$99"
        />
        <EventCard 
          title="Jazz at Lincoln Center" 
          date="Aug 16, 2026 • 8:00 PM" 
          venue="Appel Room"
          price="$60"
        />
      </div>
    </aside>
  );
};

export default Sidebar;
