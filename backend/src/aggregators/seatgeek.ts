import axios from 'axios';
import { StandardEvent } from '../types/event';
import { normalizeSeatGeekCategory, inferCategoryFromTitle } from '../utils/normalizeCategory';

const BASE_URL = 'https://api.seatgeek.com/2/events';

export async function fetchSeatGeekEvents(): Promise<StandardEvent[]> {
  const clientId = process.env.SEATGEEK_CLIENT_ID;
  const clientSecret = process.env.SEATGEEK_CLIENT_SECRET;
  if (!clientId) throw new Error('Missing SEATGEEK_CLIENT_ID');

  const response = await axios.get(BASE_URL, {
    params: {
      client_id: clientId,
      client_secret: clientSecret,
      'venue.city': 'New York',
      per_page: 50,
      sort: 'datetime_local.asc',
    },
  });

  const items = response.data?.events ?? [];

  return items.map((event: any): StandardEvent => {
    const venue = event.venue;
    const performer = event.performers?.[0];
    const priceMin = event.stats?.lowest_price;
    const title = event.title ?? '';

    const category =
      normalizeSeatGeekCategory(event.type) ?? inferCategoryFromTitle(title);

    return {
      id: `sg-${event.id}`,
      title,
      date: event.datetime_utc,
      venue: venue?.name ?? 'Unknown Venue',
      address: venue ? `${venue.address ?? ''}, ${venue.city ?? ''}` : '',
      lat: venue?.location?.lat ?? null,
      lng: venue?.location?.lon ?? null,
      price: priceMin ? `$${priceMin}` : null,
      imageUrl: performer?.image ?? null,
      url: event.url,
      source: 'seatgeek',
      category,
    };
  });
}
