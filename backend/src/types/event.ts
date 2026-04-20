export interface StandardEvent {
  id: string;
  title: string;
  date: string;           // ISO string
  venue: string;
  address: string;
  lat: number | null;
  lng: number | null;
  price: string | null;
  imageUrl: string | null;
  url: string;
  source: 'ticketmaster' | 'seatgeek' | 'nyc-open-data';
  category: string | null;
}
