import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import type { StandardEvent } from '../types/event';
import { getCategoryStyle } from './Map';

const SOURCE_COLORS: Record<string, string> = {
  ticketmaster: '#0071E3',
  seatgeek:     '#34C759',
  eventbrite:   '#FF6B35',
};

const SOURCE_LABELS: Record<string, string> = {
  ticketmaster: 'Ticketmaster',
  seatgeek:     'SeatGeek',
  eventbrite:   'Eventbrite',
};

interface EventCardProps {
  event: StandardEvent;
  isSelected: boolean;
  onClick: () => void;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

const EventCard: React.FC<EventCardProps> = ({ event, isSelected, onClick }) => {
  const sourceColor = SOURCE_COLORS[event.source] ?? '#0071E3';
  const catStyle = getCategoryStyle(event.category);

  return (
    <div
      className="card glass"
      onClick={onClick}
      style={{
        marginBottom: '0.75rem',
        cursor: 'pointer',
        borderLeft: `3px solid ${isSelected ? catStyle.bg : catStyle.bg + '60'}`,
        transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          style={{ width: '100%', borderRadius: '8px', marginBottom: '0.75rem', objectFit: 'cover', height: '120px' }}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
        <h3 style={{ fontSize: '0.95rem', lineHeight: '1.3', flex: 1, marginRight: '0.5rem' }}>
          {event.title}
        </h3>
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          {event.category && (
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '980px',
              background: catStyle.bg,
              color: '#fff',
              whiteSpace: 'nowrap',
            }}>
              {catStyle.emoji} {event.category}
            </span>
          )}
          <span style={{
            fontSize: '0.65rem',
            fontWeight: 600,
            padding: '2px 6px',
            borderRadius: '4px',
            background: sourceColor + '20',
            color: sourceColor,
            whiteSpace: 'nowrap',
          }}>
            {SOURCE_LABELS[event.source]}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <Calendar size={12} />
          {formatDate(event.date)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <MapPin size={12} />
          {event.venue}
        </div>
      </div>

      <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {event.price
          ? <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>From {event.price}</span>
          : <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Price TBD</span>
        }
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: sourceColor, textDecoration: 'none', fontWeight: 500 }}
        >
          Tickets <ExternalLink size={11} />
        </a>
      </div>
    </div>
  );
};

export default EventCard;
