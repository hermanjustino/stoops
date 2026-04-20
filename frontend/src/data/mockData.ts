import type { StandardEvent } from '../types/event';

// ── Public Bathrooms (NYC Open Data: dataset i7jb-7jku) ──

export const MOCK_BATHROOMS: StandardEvent[] = [
  { id: 'b1', type: 'bathroom', title: 'Battery Park Zone 1', date: '', venue: 'Battery Park', address: 'Battery Place & State St', lat: 40.70441, lng: -74.0159, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '8am-4pm' },
  { id: 'b2', type: 'bathroom', title: 'Bryant Park Restrooms', date: '', venue: 'Bryant Park', address: '41 W 40th St', lat: 40.7536, lng: -73.9832, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: true, operator: 'Bryant Park Corp', hours: '7am-11pm' },
  { id: 'b3', type: 'bathroom', title: 'Carl Schurz Park', date: '', venue: 'Carl Schurz Park', address: 'E 86th St & East End Ave', lat: 40.77358, lng: -73.945, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '8am-4pm' },
  { id: 'b4', type: 'bathroom', title: '575 Fifth Avenue POPS', date: '', venue: '575 Fifth Ave', address: '575 Fifth Ave', lat: 40.756276, lng: -73.978243, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: true, operator: '575 Fifth Associates', hours: '7am-12am' },
  { id: 'b5', type: 'bathroom', title: '55 East 52nd Street POPS', date: '', venue: 'Park Avenue Plaza', address: '55 E 52nd St', lat: 40.759132, lng: -73.973672, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: true, operator: 'Park Avenue Plaza', hours: '8am-10pm' },
  { id: 'b6', type: 'bathroom', title: 'Fort Greene Park', date: '', venue: 'Fort Greene Park', address: 'Myrtle Ave & Washington Park', lat: 40.69223, lng: -73.9747, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '8am-4pm' },
  { id: 'b7', type: 'bathroom', title: 'De Witt Clinton Park', date: '', venue: 'De Witt Clinton Park', address: 'W 52nd St & 11th Ave', lat: 40.76821, lng: -73.9946, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '8am-4pm' },
  { id: 'b8', type: 'bathroom', title: 'Domino Park Refinery', date: '', venue: 'Domino Park', address: '15 River St, Brooklyn', lat: 40.714424, lng: -73.967306, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'Domino Park', hours: '6am-11pm' },
  { id: 'b9', type: 'bathroom', title: 'Gertrude Ederle Rec Center', date: '', venue: 'Ederle Rec Center', address: '232 W 60th St', lat: 40.77147, lng: -73.9887, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '8am-4pm' },
  { id: 'b10', type: 'bathroom', title: 'Mathews-Palmer Playground', date: '', venue: 'Mathews-Palmer Playground', address: 'W 45th St & 10th Ave', lat: 40.76122, lng: -73.9929, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '8am-4pm' },
  { id: 'b11', type: 'bathroom', title: 'East River Park Zone 6', date: '', venue: 'East River Park', address: 'FDR Drive & Delancey St', lat: 40.72386, lng: -73.9728, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '8am-4pm' },
  { id: 'b12', type: 'bathroom', title: 'Maspeth Park', date: '', venue: 'Maspeth Park', address: '59th Rd & 57th Ave, Queens', lat: 40.7309, lng: -73.9254, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '8am-4pm' },
  { id: 'b13', type: 'bathroom', title: 'River Run Playground', date: '', venue: 'Riverside Park', address: 'W 83rd St & Riverside Dr', lat: 40.78733, lng: -73.9821, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '8am-4pm' },
  { id: 'b14', type: 'bathroom', title: 'Twenty-Four Sycamores Park', date: '', venue: '24 Sycamores Park', address: 'E 52nd St & 1st Ave', lat: 40.75942, lng: -73.9589, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '' },
  { id: 'b15', type: 'bathroom', title: 'Van Voorhees Playground', date: '', venue: 'Van Voorhees Playground', address: 'Park Pl & 3rd Ave, Brooklyn', lat: 40.68966, lng: -73.9996, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '8am-4pm' },
  { id: 'b16', type: 'bathroom', title: 'Ten Eyck Playground', date: '', venue: 'Ten Eyck Playground', address: 'Meserole St & Lorimer, Brooklyn', lat: 40.70903, lng: -73.9389, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '8am-4pm' },
  { id: 'b17', type: 'bathroom', title: 'Potomac Playground', date: '', venue: 'Potomac Playground', address: 'Gates Ave & Marcy Ave, Brooklyn', lat: 40.68205, lng: -73.9442, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '8am-4pm' },
  { id: 'b18', type: 'bathroom', title: 'John Hancock Playground', date: '', venue: 'John Hancock Playground', address: 'Hancock St & Lewis Ave, Brooklyn', lat: 40.682231, lng: -73.955236, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '' },
  { id: 'b19', type: 'bathroom', title: 'Sunset Park Playground', date: '', venue: 'Sunset Park', address: '44th St & 6th Ave, Brooklyn', lat: 40.64768, lng: -74.005, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '8am-4pm' },
  { id: 'b20', type: 'bathroom', title: 'Corona Plaza APT', date: '', venue: 'Corona Plaza', address: 'Roosevelt Ave & 103rd St, Queens', lat: 40.74965, lng: -73.862638, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: true, operator: 'NYC DOT/JCDeceaux', hours: '8am-8pm' },
  { id: 'b21', type: 'bathroom', title: 'Sheltering Arms Playground', date: '', venue: 'Sheltering Arms Park', address: 'W 129th St & Amsterdam Ave', lat: 40.81534, lng: -73.956, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '8am-4pm' },
  { id: 'b22', type: 'bathroom', title: 'Aguilar Library, NYPL', date: '', venue: 'Aguilar Library', address: '174 E 110th St', lat: 40.794223, lng: -73.94346, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYPL', hours: 'Mon-Sat 10am-6pm' },
  { id: 'b23', type: 'bathroom', title: 'Andrew Heiskell Library, NYPL', date: '', venue: 'Andrew Heiskell Library', address: '40 W 20th St', lat: 40.740474, lng: -73.993358, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: true, operator: 'NYPL', hours: 'Mon-Sat 10am-5pm' },
  { id: 'b24', type: 'bathroom', title: 'General Hart Playground', date: '', venue: 'General Hart Playground', address: '64th Rd & Booth St, Queens', lat: 40.74879, lng: -73.8972, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '8am-4pm' },
  { id: 'b25', type: 'bathroom', title: 'Gorman Playground', date: '', venue: 'Gorman Playground', address: '35th Ave & 82nd St, Queens', lat: 40.76194, lng: -73.8842, price: null, imageUrl: null, url: '#', source: 'nyc-open-data', category: 'Bathroom', accessible: false, operator: 'NYC Parks', hours: '8am-4pm' },
];

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
    price: '$25', imageUrl: null, url: '#', source: 'seatgeek', category: 'Comedy',
  },
  {
    id: 'e4', title: 'Brooklyn Night Bazaar', date: '2026-04-18T18:00',
    venue: 'Brooklyn Bazaar', address: '150 Greenpoint Ave', lat: 40.7297, lng: -73.9574,
    price: 'Free', imageUrl: null, url: '#', source: 'seatgeek', category: 'Food & Drink',
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
    price: 'Free', imageUrl: null, url: '#', source: 'seatgeek', category: 'Food & Drink',
  },
  {
    id: 'e9', title: 'Rooftop DJ Set', date: '2026-04-18T23:00',
    venue: 'Output', address: '74 Wythe Ave', lat: 40.7199, lng: -73.9634,
    price: '$30', imageUrl: null, url: '#', source: 'seatgeek', category: 'Nightlife',
  },
  {
    id: 'e10', title: 'Family Storytime at BPL', date: '2026-04-19T10:00',
    venue: 'Brooklyn Public Library', address: '10 Grand Army Plaza', lat: 40.6724, lng: -73.9683,
    price: 'Free', imageUrl: null, url: '#', source: 'seatgeek', category: 'Family',
  },
  {
    id: 'e11', title: 'LES Art Walk', date: '2026-04-18T17:00',
    venue: 'Various Galleries', address: 'Lower East Side', lat: 40.7187, lng: -73.9881,
    price: 'Free', imageUrl: null, url: '#', source: 'ticketmaster', category: 'Art & Culture',
  },
  {
    id: 'e12', title: 'Astoria Beer Garden', date: '2026-04-18T16:00',
    venue: 'Bohemian Hall', address: '29-19 24th Ave', lat: 40.7699, lng: -73.9182,
    price: 'Free', imageUrl: null, url: '#', source: 'seatgeek', category: 'Food & Drink',
  },
  {
    id: 'e13', title: 'Community Yoga in Prospect Park', date: '2026-04-19T09:00',
    venue: 'Long Meadow', address: 'Prospect Park', lat: 40.6681, lng: -73.9710,
    price: 'Free', imageUrl: null, url: '#', source: 'seatgeek', category: 'Community',
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
