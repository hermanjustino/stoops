export interface StandardEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  address: string;
  lat: number | null;
  lng: number | null;
  price: string | null;
  imageUrl: string | null;
  url: string;
  source: 'ticketmaster' | 'seatgeek' | 'eventbrite';
  category: string | null;
}
