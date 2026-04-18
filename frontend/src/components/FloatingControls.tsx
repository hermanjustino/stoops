import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Zap, Clock, Info } from 'lucide-react';

const CATEGORIES = ['All', 'Music', 'Food & Drink', 'Art & Culture', 'Comedy', 'Nightlife', 'Sports', 'Community', 'Family', 'Free', 'Bathrooms'];

const TIME_OPTIONS = [
  { value: 'all', label: 'Any time' },
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'weekend', label: 'This Weekend' },
];

interface Props {
  query: string;
  onQueryChange: (q: string) => void;
  category: string;
  onCategoryChange: (c: string) => void;
  happeningNow: boolean;
  onHappeningNowToggle: () => void;
  timeFilter: string;
  onTimeFilterChange: (t: string) => void;
}

const FloatingControls: React.FC<Props> = ({
  query, onQueryChange, category, onCategoryChange,
  happeningNow, onHappeningNowToggle, timeFilter, onTimeFilterChange,
}) => {
  const [timeOpen, setTimeOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
      padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem',
      pointerEvents: 'none',
    }}>
      {/* Search + action buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', pointerEvents: 'auto' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={15} style={{
            position: 'absolute', left: '1rem', top: '50%',
            transform: 'translateY(-50%)', color: 'var(--text-secondary)', pointerEvents: 'none',
          }} />
          <input
            type="text"
            placeholder="Search events, venues…"
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            style={{
              width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem',
              borderRadius: '14px', border: 'none',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
              fontSize: '0.9rem', outline: 'none',
              fontFamily: 'var(--font-family)', color: 'var(--text-primary)',
            }}
          />
        </div>

        <button
          onClick={onHappeningNowToggle}
          title="Happening Now"
          style={{
            width: '46px', height: '46px', borderRadius: '14px', border: 'none',
            background: happeningNow ? '#FFD60A' : 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s',
          }}
        >
          <Zap size={18} fill={happeningNow ? '#1D1D1F' : 'none'} color={happeningNow ? '#1D1D1F' : 'var(--text-secondary)'} />
        </button>

        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={() => setTimeOpen(o => !o)}
            style={{
              width: '46px', height: '46px', borderRadius: '14px', border: 'none',
              background: timeFilter !== 'all' ? 'var(--accent-blue)' : 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'background 0.2s',
            }}
          >
            <Clock size={18} color={timeFilter !== 'all' ? '#fff' : 'var(--text-secondary)'} />
          </button>

          {timeOpen && (
            <div style={{
              position: 'absolute', top: '52px', right: 0, zIndex: 20,
              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '14px', boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              padding: '0.4rem', minWidth: '160px',
            }}>
              {TIME_OPTIONS.map(o => (
                <button
                  key={o.value}
                  onClick={() => { onTimeFilterChange(o.value); setTimeOpen(false); }}
                  style={{
                    display: 'block', width: '100%',
                    padding: '0.6rem 1rem', textAlign: 'left',
                    border: 'none', borderRadius: '8px',
                    background: timeFilter === o.value ? 'rgba(0,113,227,0.08)' : 'transparent',
                    color: timeFilter === o.value ? 'var(--accent-blue)' : 'var(--text-primary)',
                    fontSize: '0.85rem', fontWeight: timeFilter === o.value ? 600 : 400,
                    cursor: 'pointer', fontFamily: 'var(--font-family)',
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => navigate('/about')}
          title="About Stoops"
          style={{
            width: '46px', height: '46px', borderRadius: '14px', border: 'none',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          <Info size={18} color="var(--text-secondary)" />
        </button>
      </div>

      {/* Category chips */}
      <div style={{
        display: 'flex', gap: '0.4rem', overflowX: 'auto',
        pointerEvents: 'auto', scrollbarWidth: 'none',
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            style={{
              padding: '6px 14px', borderRadius: '980px',
              whiteSpace: 'nowrap', flexShrink: 0,
              border: `1px solid ${category === cat ? 'var(--accent-blue)' : 'rgba(255,255,255,0.5)'}`,
              background: category === cat ? 'var(--accent-blue)' : 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              color: category === cat ? '#fff' : 'var(--text-secondary)',
              fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer',
              boxShadow: '0 1px 8px rgba(0,0,0,0.08)', transition: 'all 0.2s ease',
              fontFamily: 'var(--font-family)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloatingControls;
