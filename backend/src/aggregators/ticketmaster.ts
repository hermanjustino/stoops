import axios from 'axios';
import { StandardEvent } from '../types/event';
import { normalizeTicketmasterCategory, inferCategoryFromTitle } from '../utils/normalizeCategory';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

export async function fetchTicketmasterEvents(): Promise<StandardEvent[]> {
  const apiKey = process.env.TICKETMASTER_API_KEY;
  if (!apiKey) throw new Error('Missing TICKETMASTER_API_KEY');

  const response = await axios.get(BASE_URL, {
    params: {
      apikey: apiKey,
      city: 'New York',
      countryCode: 'US',
      size: 50,
      sort: 'date,asc',
    },
  });

  const items = response.data?._embedded?.events ?? [];

  return items.map((event: any): StandardEvent => {
    const venue = event._embedded?.venues?.[0];
    const priceRange = event.priceRanges?.[0];
    const classification = event.classifications?.[0];
    const title = event.name ?? '';

    const category =
      normalizeTicketmasterCategory(
        classification?.segment?.name,
        classification?.genre?.name,
        classification?.subGenre?.name,
      ) ?? inferCategoryFromTitle(title);

    return {
      id: `tm-${event.id}`,
      title,
      date: event.dates?.start?.dateTime ?? event.dates?.start?.localDate,
      venue: venue?.name ?? 'Unknown Venue',
      address: venue ? `${venue.address?.line1 ?? ''}, ${venue.city?.name ?? ''}` : '',
      lat: venue?.location?.latitude ? parseFloat(venue.location.latitude) : null,
      lng: venue?.location?.longitude ? parseFloat(venue.location.longitude) : null,
      price: priceRange ? `$${priceRange.min}` : null,
      imageUrl: event.images?.[0]?.url ?? null,
      url: event.url,
      source: 'ticketmaster',
      category,
    };
  });
}
