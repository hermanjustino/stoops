import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

interface EventCardProps {
  title: string;
  date: string;
  venue: string;
  imageUrl?: string;
  price?: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, venue, imageUrl, price }) => {
  return (
    <div className="card glass" style={{ marginBottom: '1rem', cursor: 'pointer' }}>
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={title} 
          style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem', objectFit: 'cover', height: '140px' }} 
        />
      )}
      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <Calendar size={14} />
          {date}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <MapPin size={14} />
          {venue}
        </div>
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {price && <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>From {price}</span>}
        <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>View Details</button>
      </div>
    </div>
  );
};

export default EventCard;
