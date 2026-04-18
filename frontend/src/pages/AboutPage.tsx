import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

type Tab = 'pitch' | 'built-with';

const TECH_STACK = [
  {
    name: 'Claude by Anthropic',
    role: 'AI Pair Programmer',
    description: 'Claude Code powered the entire development process — from architecture decisions to writing every component, API route, and deployment config.',
    icon: '🤖',
    url: 'https://claude.ai',
  },
  {
    name: 'Firebase',
    role: 'Hosting & Backend',
    description: 'Firebase Hosting serves the frontend. Cloud Run deploys the API backend. Firestore is ready for user data and personalization.',
    icon: '🔥',
    url: 'https://firebase.google.com',
  },
  {
    name: 'React 19',
    role: 'Frontend Framework',
    description: 'The latest React with hooks, concurrent features, and a component-driven architecture for a responsive map-first UI.',
    icon: '⚛️',
    url: 'https://react.dev',
  },
  {
    name: 'TypeScript',
    role: 'Type Safety',
    description: 'End-to-end type safety across the frontend and backend, catching bugs at compile time and enabling confident refactoring.',
    icon: '📘',
    url: 'https://www.typescriptlang.org',
  },
  {
    name: 'Google Maps Platform',
    role: 'Interactive Map',
    description: 'The map-first experience is powered by Google Maps via @vis.gl/react-google-maps — markers, geolocation, and custom styling.',
    icon: '🗺️',
    url: 'https://developers.google.com/maps',
  },
  {
    name: 'Vite',
    role: 'Build Tool',
    description: 'Lightning-fast HMR during development and optimized production builds. The modern alternative to Webpack.',
    icon: '⚡',
    url: 'https://vite.dev',
  },
  {
    name: 'Ticketmaster & SeatGeek APIs',
    role: 'Event Data',
    description: 'Real-time event aggregation from major ticketing platforms, normalized into a unified feed for discovery.',
    icon: '🎫',
    url: 'https://developer.ticketmaster.com',
  },
  {
    name: 'Node.js + Express',
    role: 'API Server',
    description: 'A lightweight Express server aggregates multiple event APIs, handles deduplication, and serves a clean unified endpoint.',
    icon: '🟢',
    url: 'https://nodejs.org',
  },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<Tab>('pitch');
  const navigate = useNavigate();

  return (
    <div style={{
      width: '100vw', height: '100vh', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      background: '#0d0d1f',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '1rem 1.25rem',
        background: 'rgba(13,13,31,0.95)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        flexShrink: 0,
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            width: '36px', height: '36px', borderRadius: '10px', border: 'none',
            background: 'rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          <ArrowLeft size={18} color="#fff" />
        </button>

        <span style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: '1.1rem', color: '#fff', letterSpacing: '-0.02em',
        }}>
          STOOPS
        </span>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.25rem', marginLeft: 'auto' }}>
          {([
            { key: 'pitch' as Tab, label: 'The Pitch' },
            { key: 'built-with' as Tab, label: 'Built With' },
          ]).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '0.45rem 1rem', borderRadius: '980px',
                border: 'none',
                background: activeTab === tab.key ? '#0066ff' : 'rgba(255,255,255,0.06)',
                color: activeTab === tab.key ? '#fff' : 'rgba(255,255,255,0.5)',
                fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                fontFamily: 'var(--font-family)',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {activeTab === 'pitch' ? (
          <iframe
            src="/pitch.html"
            title="Stoops Pitch Deck"
            style={{
              width: '100%', height: '100%', border: 'none',
            }}
          />
        ) : (
          <div style={{
            height: '100%', overflowY: 'auto',
            padding: 'clamp(1.5rem, 5vw, 3rem)',
          }}>
            {/* Built With Header */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem', color: '#d4ff00',
                textTransform: 'uppercase', letterSpacing: '0.25em',
                marginBottom: '0.8rem',
              }}>
                Technology Stack
              </div>
              <h1 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em',
                marginBottom: '0.8rem',
              }}>
                What Built Stoops
              </h1>
              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)',
                maxWidth: '500px', margin: '0 auto', lineHeight: 1.7,
              }}>
                Built in a day at the <strong style={{ color: '#d4ff00' }}>Second Axis Hackathon</strong> using
                AI-first development and modern web infrastructure.
              </p>
            </div>

            {/* Tech Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1rem',
              maxWidth: '900px', margin: '0 auto',
              paddingBottom: '3rem',
            }}>
              {TECH_STACK.map(tech => (
                <a
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '1.5rem',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    display: 'flex', flexDirection: 'column', gap: '0.6rem',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{tech.icon}</span>
                    <div>
                      <div style={{
                        fontWeight: 700, fontSize: '0.95rem', color: '#fff',
                        fontFamily: 'var(--font-family)',
                      }}>
                        {tech.name}
                      </div>
                      <div style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.65rem', color: '#d4ff00',
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                      }}>
                        {tech.role}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)',
                    lineHeight: 1.6,
                  }}>
                    {tech.description}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
