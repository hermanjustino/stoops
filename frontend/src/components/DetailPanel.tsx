import React from 'react';
import { X, Calendar, MapPin, ExternalLink } from 'lucide-react';
import type { StandardEvent } from '../types/event';

function formatDate(s: string) {
  try {
    return new Date(s).toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch { return s; }
}

interface Props {
  event: StandardEvent;
  onClose: () => void;
}

const DetailPanel: React.FC<Props> = ({ event, onClose }) => (
  <div style={{
    position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
    height: '62vh',
    background: 'rgba(255,255,255,0.99)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    borderRadius: '24px 24px 0 0',
    boxShadow: '0 -8px 40px rgba(0,0,0,0.16)',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
    animation: 'panelUp 0.3s cubic-bezier(0.4,0,0.2,1)',
  }}>
    {event.imageUrl && (
      <div style={{ flexShrink: 0, height: '180px', position: 'relative', overflow: 'hidden' }}>
        <img src={event.imageUrl} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.9) 100%)' }} />
      </div>
    )}

    <button
      onClick={onClose}
      style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 1,
        width: '32px', height: '32px', borderRadius: '50%', border: 'none',
        background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: '#fff',
      }}
    >
      <X size={16} />
    </button>

    <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.3rem', lineHeight: 1.25, marginBottom: '1rem' }}>{event.title}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          <Calendar size={14} />{formatDate(event.date)}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          <MapPin size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{event.venue}{event.address ? ` · ${event.address}` : ''}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            padding: '0.9rem', borderRadius: '14px',
            background: 'var(--accent-blue)', color: '#fff',
            fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
            fontFamily: 'var(--font-family)',
          }}
        >
          {event.price ? `Get Tickets · ${event.price}` : 'Get Tickets'} <ExternalLink size={14} />
        </a>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(event.address || event.venue)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '52px', borderRadius: '14px',
            background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none',
          }}
        >
          <MapPin size={18} />
        </a>
      </div>
    </div>

    <style>{`
      @keyframes panelUp {
        from { transform: translateY(100%); }
        to   { transform: translateY(0); }
      }
    `}</style>
  </div>
);

export default DetailPanel;
