import axios from 'axios';
import { StandardEvent } from '../types/event';

const BASE_URL = 'https://www.eventbriteapi.com/v3/events/search';

export async function fetchEventbriteEvents(): Promise<StandardEvent[]> {
  const apiKey = process.env.EVENTBRITE_API_KEY;
  if (!apiKey) throw new Error('Missing EVENTBRITE_API_KEY');

  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${apiKey}` },
    params: {
      q: 'events',
      'location.latitude': 40.7128,
      'location.longitude': -74.006,
      'location.within': '10km',
      expand: 'venue,ticket_classes',
      page_size: 50,
      sort_by: 'date',
    },
  });

  const items = response.data?.events ?? [];

  return items.map((event: any): StandardEvent => {
    const venue = event.venue;
    const ticketClass = event.ticket_classes?.[0];

    return {
      id: `eb-${event.id}`,
      title: event.name?.text ?? 'Untitled Event',
      date: event.start?.utc,
      venue: venue?.name ?? 'Unknown Venue',
      address: venue ? `${venue.address?.address_1 ?? ''}, ${venue.address?.city ?? ''}` : '',
      lat: venue?.latitude ? parseFloat(venue.latitude) : null,
      lng: venue?.longitude ? parseFloat(venue.longitude) : null,
      price: ticketClass?.cost?.display ?? (event.is_free ? 'Free' : null),
      imageUrl: event.logo?.url ?? null,
      url: event.url,
      source: 'eventbrite',
      category: event.category_id ?? null,
    };
  });
}
