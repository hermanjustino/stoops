import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fetchTicketmasterEvents } from './aggregators/ticketmaster';
import { fetchSeatGeekEvents } from './aggregators/seatgeek';
import { fetchEventbriteEvents } from './aggregators/eventbrite';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Unified events endpoint — fetches from all three sources in parallel
app.get('/api/events', async (req, res) => {
  try {
    const results = await Promise.allSettled([
      fetchTicketmasterEvents(),
      fetchSeatGeekEvents(),
      fetchEventbriteEvents(),
    ]);

    const events = results.flatMap((result, idx) => {
      const sources = ['ticketmaster', 'seatgeek', 'eventbrite'];
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error(`[${sources[idx]}] fetch failed:`, result.reason?.message);
        return [];
      }
    });

    // Only return events with valid coordinates so they can be pinned on the map
    const mappableEvents = events.filter(e => e.lat !== null && e.lng !== null);

    res.json({ count: mappableEvents.length, events: mappableEvents });
  } catch (err: any) {
    console.error({ error: err }, 'Unexpected error in /api/events');
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.listen(PORT, () => {
  console.log(`Stoops backend running on http://localhost:${PORT}`);
});
