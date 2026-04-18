export type ItemType = 'event' | 'bathroom' | 'landmark';

export interface StandardEvent {
  id: string;
  type?: ItemType;
  title: string;
  date: string;
  venue: string;
  address: string;
  lat: number | null;
  lng: number | null;
  price: string | null;
  imageUrl: string | null;
  url: string;
  source: 'ticketmaster' | 'seatgeek' | 'eventbrite' | 'nyc-open-data';
  category: string | null;
  // Bathroom-specific
  accessible?: boolean;
  operator?: string;
  hours?: string;
  // Landmark-specific
  designation?: string;
  alternateName?: string;
  // Computed at runtime
  distance?: number;
}
