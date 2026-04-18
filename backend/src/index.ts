import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Placeholder for SeatGeek/Ticketmaster integration
app.get('/api/events', async (req, res) => {
  // Role 2 task: Implement API aggregation here
  res.json({
    message: "Data aggregation endpoint coming soon.",
    events: []
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
