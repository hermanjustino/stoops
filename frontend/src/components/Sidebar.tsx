import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import type { StandardEvent } from '../types/event';
import EventCard from './EventCard';

const CATEGORIES = ['All', 'Music', 'Sports', 'Arts & Theatre', 'Miscellaneous'];

interface SidebarProps {
  events: StandardEvent[];
  loading: boolean;
  error: string | null;
  selectedEventId: string | null;
  onEventSelect: (event: StandardEvent) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ events, loading, error, selectedEventId, onEventSelect }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const selectedRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return events.filter(e => {
      const matchesQuery = e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.venue.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' ||
        (e.category?.toLowerCase().includes(category.toLowerCase()) ?? false);
      return matchesQuery && matchesCategory;
    });
  }, [events, query, category]);

  // Auto-scroll selected card into view
  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedEventId]);

  return (
    <aside className="glass" style={{
      width: '380px',
      minWidth: '380px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 10,
      boxShadow: '10px 0 30px rgba(0,0,0,0.05)',
    }}>
      {/* Header */}
      <div style={{ padding: '2rem 1.5rem 1rem' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>Stoops</h1>
        <p style={{ fontSize: '0.85rem' }}>Curated events across NYC</p>
      </div>

      {/* Search */}
      <div style={{ padding: '0 1.5rem', marginBottom: '0.75rem', position: 'relative' }}>
        <Search size={16} style={{
          position: 'absolute', left: '2.1rem', top: '50%',
          transform: 'translateY(-50%)', color: 'var(--text-secondary)',
          pointerEvents: 'none',
        }} />
        <input
          type="text"
          placeholder="Search events or venues..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            width: '100%', padding: '0.7rem 1rem 0.7rem 2.5rem',
            borderRadius: '10px', border: 'none',
            background: 'rgba(0,0,0,0.05)', fontSize: '0.9rem', outline: 'none',
          }}
        />
      </div>

      {/* Category Pills */}
      <div style={{ padding: '0 1.5rem 1rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: '4px 12px', borderRadius: '980px',
              border: `1px solid ${category === cat ? 'var(--accent-blue)' : 'rgba(0,0,0,0.1)'}`,
              background: category === cat ? 'var(--accent-blue)' : 'transparent',
              color: category === cat ? '#fff' : 'var(--text-secondary)',
              fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Count */}
      <div style={{ padding: '0 1.5rem 0.5rem' }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          {loading ? 'Loading…' : `${filtered.length} events`}
        </p>
      </div>

      {/* Event List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.5rem 1.5rem' }}>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
            <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent-blue)' }} />
          </div>
        )}
        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FF3B30', padding: '1rem 0' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}
        {!loading && !error && filtered.map(event => (
          <div key={event.id} ref={event.id === selectedEventId ? selectedRef : null}>
            <EventCard
              event={event}
              isSelected={event.id === selectedEventId}
              onClick={() => onEventSelect(event)}
            />
          </div>
        ))}
        {!loading && !error && filtered.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)' }}>
            No events match your search.
          </p>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </aside>
  );
};

export default Sidebar;
