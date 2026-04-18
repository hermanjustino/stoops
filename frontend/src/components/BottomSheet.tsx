import React, { useRef, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import type { StandardEvent } from '../types/event';
import EventCard from './EventCard';

const PEEK_HEIGHT = 72;

interface Props {
  events: StandardEvent[];
  loading: boolean;
  error: string | null;
  selectedEventId: string | null;
  onEventSelect: (event: StandardEvent) => void;
}

const BottomSheet: React.FC<Props> = ({ events, loading, error, selectedEventId, onEventSelect }) => {
  const [expanded, setExpanded] = useState(false);
  const dragRef = useRef<{ startY: number } | null>(null);

  const onDragStart = (y: number) => { dragRef.current = { startY: y }; };
  const onDragEnd = (y: number) => {
    if (!dragRef.current) return;
    const delta = dragRef.current.startY - y;
    if (delta > 40) setExpanded(true);
    else if (delta < -40) setExpanded(false);
    dragRef.current = null;
  };

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
      height: expanded ? '58vh' : `${PEEK_HEIGHT}px`,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
      borderRadius: '20px 20px 0 0',
      boxShadow: '0 -4px 30px rgba(0,0,0,0.1)',
      transition: 'height 0.35s cubic-bezier(0.4,0,0.2,1)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Handle */}
      <div
        style={{
          padding: '10px 0 8px', display: 'flex', flexDirection: 'column',
          alignItems: 'center', cursor: 'grab', userSelect: 'none', flexShrink: 0,
        }}
        onClick={() => setExpanded(e => !e)}
        onMouseDown={e => onDragStart(e.clientY)}
        onMouseUp={e => onDragEnd(e.clientY)}
        onTouchStart={e => onDragStart(e.touches[0].clientY)}
        onTouchEnd={e => onDragEnd(e.changedTouches[0].clientY)}
      >
        <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: 'rgba(0,0,0,0.12)', marginBottom: '6px' }} />
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          {loading ? 'Loading…' : `${events.length} things nearby`}
        </span>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 1rem 2rem' }}>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <Loader2 size={22} style={{ animation: 'bsspin 1s linear infinite', color: 'var(--accent-blue)' }} />
          </div>
        )}
        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FF3B30', padding: '1rem 0' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}
        {!loading && !error && events.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            No events match your filters.
          </p>
        )}
        {!loading && !error && events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            isSelected={event.id === selectedEventId}
            onClick={() => onEventSelect(event)}
          />
        ))}
      </div>
      <style>{`@keyframes bsspin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }`}</style>
    </div>
  );
};

export default BottomSheet;
