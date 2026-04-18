import type { StandardEvent } from '../types/event';

export const MOCK_EVENTS: StandardEvent[] = [
  {
    id: 'e1', title: 'Jazz at Lincoln Center', date: '2026-04-18T20:00',
    venue: 'Appel Room', address: '10 Columbus Cir', lat: 40.7688, lng: -73.9830,
    price: '$60', imageUrl: null, url: '#', source: 'ticketmaster', category: 'Music',
  },
  {
    id: 'e2', title: 'Central Park Summer Concert', date: '2026-04-19T19:00',
    venue: 'Rumsey Playfield', address: 'Central Park', lat: 40.7712, lng: -73.9714,
    price: '$45', imageUrl: null, url: '#', source: 'seatgeek', category: 'Music',
  },
  {
    id: 'e3', title: 'Comedy Cellar Late Show', date: '2026-04-18T22:00',
    venue: 'Comedy Cellar', address: '117 MacDougal St', lat: 40.7301, lng: -74.0005,
    price: '$25', imageUrl: null, url: '#', source: 'eventbrite', category: 'Comedy',
  },
  {
    id: 'e4', title: 'Brooklyn Night Bazaar', date: '2026-04-18T18:00',
    venue: 'Brooklyn Bazaar', address: '150 Greenpoint Ave', lat: 40.7297, lng: -73.9574,
    price: 'Free', imageUrl: null, url: '#', source: 'eventbrite', category: 'Food & Drink',
  },
  {
    id: 'e5', title: 'MoMA First Friday', date: '2026-04-18T16:00',
    venue: 'Museum of Modern Art', address: '11 W 53rd St', lat: 40.7614, lng: -73.9776,
    price: 'Free', imageUrl: null, url: '#', source: 'ticketmaster', category: 'Art & Culture',
  },
  {
    id: 'e6', title: 'Knicks vs Celtics', date: '2026-04-19T19:30',
    venue: 'Madison Square Garden', address: '4 Pennsylvania Plaza', lat: 40.7505, lng: -73.9934,
    price: '$85', imageUrl: null, url: '#', source: 'seatgeek', category: 'Sports',
  },
  {
    id: 'e7', title: 'Shakespeare in the Park', date: '2026-04-20T20:00',
    venue: 'Delacorte Theater', address: 'Central Park', lat: 40.7796, lng: -73.9690,
    price: 'Free', imageUrl: null, url: '#', source: 'ticketmaster', category: 'Art & Culture',
  },
  {
    id: 'e8', title: 'Smorgasburg Williamsburg', date: '2026-04-19T11:00',
    venue: 'East River State Park', address: '90 Kent Ave', lat: 40.7216, lng: -73.9614,
    price: 'Free', imageUrl: null, url: '#', source: 'eventbrite', category: 'Food & Drink',
  },
  {
    id: 'e9', title: 'Rooftop DJ Set', date: '2026-04-18T23:00',
    venue: 'Output', address: '74 Wythe Ave', lat: 40.7199, lng: -73.9634,
    price: '$30', imageUrl: null, url: '#', source: 'seatgeek', category: 'Nightlife',
  },
  {
    id: 'e10', title: 'Family Storytime at BPL', date: '2026-04-19T10:00',
    venue: 'Brooklyn Public Library', address: '10 Grand Army Plaza', lat: 40.6724, lng: -73.9683,
    price: 'Free', imageUrl: null, url: '#', source: 'eventbrite', category: 'Family',
  },
  {
    id: 'e11', title: 'LES Art Walk', date: '2026-04-18T17:00',
    venue: 'Various Galleries', address: 'Lower East Side', lat: 40.7187, lng: -73.9881,
    price: 'Free', imageUrl: null, url: '#', source: 'ticketmaster', category: 'Art & Culture',
  },
  {
    id: 'e12', title: 'Astoria Beer Garden', date: '2026-04-18T16:00',
    venue: 'Bohemian Hall', address: '29-19 24th Ave', lat: 40.7699, lng: -73.9182,
    price: 'Free', imageUrl: null, url: '#', source: 'eventbrite', category: 'Food & Drink',
  },
  {
    id: 'e13', title: 'Community Yoga in Prospect Park', date: '2026-04-19T09:00',
    venue: 'Long Meadow', address: 'Prospect Park', lat: 40.6681, lng: -73.9710,
    price: 'Free', imageUrl: null, url: '#', source: 'eventbrite', category: 'Community',
  },
  {
    id: 'e14', title: 'The Lion King on Broadway', date: '2026-04-19T14:00',
    venue: 'Minskoff Theatre', address: '200 W 45th St', lat: 40.7580, lng: -73.9855,
    price: '$99', imageUrl: null, url: '#', source: 'ticketmaster', category: 'Art & Culture',
  },
  {
    id: 'e15', title: 'Salsa Night at SOBs', date: '2026-04-18T21:00',
    venue: 'SOBs', address: '204 Varick St', lat: 40.7269, lng: -74.0055,
    price: '$20', imageUrl: null, url: '#', source: 'seatgeek', category: 'Nightlife',
  },
];
