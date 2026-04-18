# Stoops — One Place for Everything in NYC

**Live Demo:** [stoops-ee7d6.web.app](https://stoops-ee7d6.web.app/)

Stoops is a map-first event discovery app for New York City. Instead of juggling Eventbrite, Instagram, Google Maps, and a dozen newsletters, Stoops aggregates events from multiple sources into a single, real-time feed on an interactive map.

## What It Does

- **Unified Event Feed** — Pulls events from Ticketmaster, SeatGeek, and other sources into one normalized view
- **Map-First Discovery** — See what's happening near you on a styled Google Map with category-colored markers
- **Smart Filtering** — Filter by category (Music, Comedy, Nightlife, Food & Drink, etc.), time window (Today, Tomorrow, This Weekend), or free-text search
- **Happening Now** — One-tap toggle to surface only events happening in the next few hours
- **Event Details** — Tap any marker or card for full details, directions, and ticket links

## Built in 2 Hours

This entire app — frontend, backend, deployment — was built from scratch in a 2-hour sprint at the **Second Axis Hackathon** (NYC, April 2025). The speed was possible because of an AI-first development workflow: Claude Code by Anthropic acted as a real-time pair programmer, generating components, writing API aggregation logic, debugging in-context, and configuring deployment — all through conversational prompts in the terminal.

No boilerplate was copy-pasted from a previous project. Every line of code was written during the hackathon.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **AI Development** | [Claude Code](https://claude.ai) by Anthropic — AI pair programmer that wrote and iterated on the entire codebase |
| **Frontend** | React 19, TypeScript, Vite |
| **Map** | Google Maps Platform via `@vis.gl/react-google-maps` |
| **Backend** | Node.js + Express (TypeScript) — aggregates and normalizes event data from multiple APIs |
| **Event APIs** | Ticketmaster Discovery API, SeatGeek API |
| **Hosting** | Firebase Hosting (frontend) + Cloud Run (backend API) |
| **Icons** | Lucide React |

## Project Structure

```
stoops/
├── frontend/          # React + Vite SPA
│   ├── src/
│   │   ├── components/   # Map, FloatingControls, BottomSheet, DetailPanel, EventCard
│   │   ├── pages/        # AboutPage (pitch deck + tech stack)
│   │   ├── hooks/        # useEvents (API fetching + fallback)
│   │   ├── types/        # StandardEvent interface
│   │   └── data/         # Mock event data
│   └── public/           # Static assets including pitch deck
├── backend/           # Express API server
│   └── src/
│       ├── index.ts         # Server entry + /api/events endpoint
│       ├── aggregators/     # Ticketmaster, SeatGeek API clients
│       └── types/           # Shared type definitions
├── firebase.json      # Firebase Hosting config with SPA rewrites
└── PRD.md             # Product Requirements Document
```

## Running Locally

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Backend:**
```bash
cd backend
npm install
npm run dev
```

Set the following environment variables:

- `VITE_GOOGLE_MAPS_API_KEY` — Google Maps API key (frontend `.env`)
- `VITE_API_URL` — Backend URL, defaults to `http://localhost:3001` (frontend `.env`)
- `TICKETMASTER_API_KEY` — Ticketmaster Discovery API key (backend `.env`)
- `SEATGEEK_CLIENT_ID` — SeatGeek API client ID (backend `.env`)

## The Pitch

The full pitch deck is available in-app at [/about](https://stoops-ee7d6.web.app/about), or you can open `Stoops_Pitch.html` directly in a browser.
