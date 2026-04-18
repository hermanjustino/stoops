# Stoops — NYC Discovery Map

## Product Vision

Stoops is a **map-first** NYC discovery app. The map is not a secondary view — it **is** the product. Every event, attraction, landmark, bathroom, and neighborhood is a layer on a living, interactive map of New York City. Users explore by panning, zooming, and tapping — the city itself is the navigation.

---

## Functional Requirements (V1)

### 1. Map as Primary Interface

The full-screen interactive map is the default and primary view on app load. All content — events, attractions, landmarks, bathrooms, neighborhoods — renders as pins, clusters, and overlays directly on the map. There is no separate "feed" tab. The map **is** the feed.

**Map Behavior:**
- Full-screen Google Maps (or Mapbox) centered on NYC on load (40.7128, -74.006).
- Default zoom level shows all five boroughs. Pinch/scroll to zoom into sub-neighborhoods.
- Pins are color-coded by content type:
  - **Events:** Purple pin
  - **Attractions:** Amber pin
  - **Landmarks:** Blue pin
  - **Bathrooms:** Rose pin
- At high zoom levels (borough/city), pins cluster into numbered circles showing count per area. Clusters inherit the color of their dominant type. Tapping a cluster zooms into that area.
- At street-level zoom, individual pins are visible with small labels (event name or venue).
- Map style: Clean, muted base map (light mode default, dark mode supported) so pins and overlays stand out.
- Current user location shown as a pulsing blue dot (requires location permission).

**Floating Controls (overlaid on map):**
- **Search bar** — pinned to top of screen, glass-morphism style. Full-text search across event titles, descriptions, venue names, attraction names, and neighborhood names. Results reposition the map and highlight matching pins.
- **Category filter chips** — horizontally scrollable row below the search bar: Music, Food & Drink, Art & Culture, Comedy, Nightlife, Sports, Community, Family, Free, Attractions, Landmarks, Neighborhoods, Bathrooms. Active chips filter which pins are visible on the map. Multiple chips can be active simultaneously.
- **Time filter** — collapsible filter accessed from a clock icon: Today, Tomorrow, This Weekend, This Week, Custom Date Range, and Time of Day (Morning / Afternoon / Evening / Late Night).
- **"Happening Now" toggle** — a single-tap button (lightning bolt icon) that filters the map to show only events currently in progress or starting within 2 hours. Pins pulse/glow when this mode is active.
- **Price filter** — collapsible: Free, Under $25, Under $50, $50+, Custom Range.
- **Neighborhood filter** — tapping opens a list of boroughs that expand into sub-neighborhoods (e.g., Brooklyn > Williamsburg, DUMBO, Park Slope). Selecting a neighborhood flies the map to that area and highlights its boundary overlay.
- **Re-center button** — flies back to current user location.

**Bottom Sheet (Drawer):**
- A draggable bottom sheet sits at the bottom of the screen in a minimized state showing a handle and the text: "{N} things nearby" based on visible pins in the current map viewport.
- Pulling the sheet up reveals a **scrollable card list** of all pins currently visible on the map, sorted by proximity to map center (or user location if available).
- Each card is a compact summary: title, category badge, time, venue, price, and thumbnail image.
- Tapping a card in the list flies the map to that pin and opens the detail panel.
- The bottom sheet is the **only** list view — it is always derived from what's on the map, not a separate data source.

---

### 2. Event Aggregation Engine

**Sources:**
- Eventbrite, Dice, Meetup, NYC Parks, Broadway/TKTS, venue websites (curated list of top 50 NYC venues), and public calendar feeds (iCal/RSS).

**Processing:**
- Deduplicate events appearing on multiple platforms (match on title + venue + date within a tolerance window).
- Normalize all event data into a consistent schema:
  - `title` (string)
  - `datetime_start` (ISO 8601)
  - `datetime_end` (ISO 8601, nullable)
  - `venue_name` (string)
  - `venue_address` (string)
  - `latitude` (float) — **required for map placement**
  - `longitude` (float) — **required for map placement**
  - `neighborhood` (string — mapped to our neighborhood taxonomy)
  - `category` (enum: Music, Food & Drink, Art & Culture, Comedy, Nightlife, Sports, Community, Family)
  - `price_type` (enum: Free, Paid)
  - `price_min` (float, nullable)
  - `price_max` (float, nullable)
  - `image_url` (string, nullable)
  - `source_url` (string — original listing URL)
  - `description` (string)
- Events without geocodable addresses are geocoded via Google Geocoding API before ingestion. Events that fail geocoding are flagged for manual review and excluded from the map.
- Refresh event data at least every 6 hours. "Happening Now" data refreshes every 15 minutes.

---

### 3. Pin Tap & Event Detail Panel

Tapping any pin on the map opens a **detail panel** — a slide-up card that covers the bottom ~60% of the screen while keeping the map visible and the selected pin centered above.

**Event Detail Panel contains:**
- Hero image (full-width at top of panel, with parallax scroll effect).
- Event title.
- Date and time (formatted: "Sat, Apr 19 - 8:00 PM").
- Venue name (tappable — flies map to venue and shows other events at that venue).
- Venue address with a small inline map preview or "Get Directions" link (deep-links to Apple Maps / Google Maps).
- Neighborhood badge (tappable — opens neighborhood guide).
- Category badge.
- Price info (e.g., "Free" or "$25 - $45").
- Event description (pulled from source, HTML stripped and cleaned).
- **Action buttons:**
  - "Get Tickets" / "More Info" — opens source URL in an in-app browser or external browser.
  - "Save" — adds to personal saved list (requires account).
  - "Share" — native share sheet (link, iMessage, WhatsApp, etc.).
  - "Remind Me" — schedules a push notification (e.g., 2 hours before start).
- **"Similar Events" carousel** — horizontal scroll of event cards for events in the same category, neighborhood, or time window. Tapping one re-centers the map on that event's pin and opens its detail panel.

Swiping down on the detail panel dismisses it and returns to the map.

---

### 4. Attractions & Landmarks (Map Layers)

Curated database of NYC's top attractions and iconic landmarks, each geocoded and placed on the map.

**Attractions** (amber pins): Observation decks, food halls, parks, immersive experiences, museums, markets.

**Landmarks** (blue pins): Bridges, stations, monuments, plazas, historic buildings.

**Each listing includes:**
- Title, hero image, address, neighborhood, hours of operation, price (if applicable), description, source URL.
- `latitude` / `longitude` — **required**.
- Star rating (1-5) and review count aggregated from user submissions.
- **Crowdsourced local tips:** Users can submit short text tips (e.g., "Go 30 min before sunset for the best light"). Tips display with author name and timestamp. Tips are votable (upvote/downvote) to surface the best ones.
- Color-coded type badge on the pin and in the detail panel: Amber for Attractions, Blue for Landmarks.

**Detail panel (same slide-up pattern as events):**
- Hero image, title, address, hours, price, description.
- "Get Directions" — deep-links to Apple Maps / Google Maps.
- Star rating with review count.
- Top 3 tips shown inline; "See all tips" expands to full list.
- "Nearby Events" section — events happening within 0.25 miles of this attraction/landmark, shown as a horizontal card carousel.
- Save, Share, and "Submit a Tip" action buttons.

**Map behavior:**
- Attractions and Landmarks are always visible on the map unless the user explicitly filters them out via category chips.
- At high zoom, they cluster with events. At street-level, they show distinct pin shapes (amber circle for Attractions, blue diamond for Landmarks) to differentiate from event pins.

---

### 5. Neighborhood Guides (Map Overlays)

Neighborhoods render as **translucent boundary overlays** on the map when the Neighborhoods category chip is active or when zoomed to an appropriate level.

**Each neighborhood guide includes:**
- Neighborhood name (e.g., Williamsburg, LES, Astoria, DUMBO).
- Boundary polygon (GeoJSON) — rendered as a colored overlay on the map.
- Description (2-3 sentences about the area).
- **Vibe labels:** Community-voted tags describing the feel of the neighborhood (e.g., "Hipster," "Multicultural," "Late-Night," "Affordable"). Displayed as colored chips.
- Star rating (1-5) from user ratings.
- **Crowdsourced tips:** Where to eat, what to skip, best times to visit, transit advice. Submitted by users, displayed with author name and timestamp.

**Map interaction:**
- Tapping a neighborhood overlay opens a **neighborhood detail panel** (same slide-up pattern).
- The detail panel shows the description, vibe labels, star rating, top tips, and a **"What's happening here" section** — a list of all events, attractions, and landmarks within that neighborhood boundary, filterable by type.
- Selecting an item from this list flies the map to its pin and opens its detail panel.
- Neighborhoods are evergreen content (not time-bound).

---

### 6. Public Bathrooms (Map Layer)

Database of public and semi-public bathrooms across NYC, each geocoded and placed on the map.

**Each listing includes:**
- Location name, address, neighborhood, hours.
- `latitude` / `longitude` — **required**.
- Amenities: wheelchair accessible, changing table, attended (shown as icons).
- Real-time open/closed status (crowdsourced): **green dot** for open, **red dot** for closed. Users can flag status changes.
- Cleanliness rating (1-5 stars, crowdsourced).
- Crowdsourced tips (e.g., "Code is 1234" or "Use the entrance on 3rd Ave").

**Map behavior:**
- Bathroom pins (rose-colored) are hidden by default to reduce map clutter. They become visible when:
  - The user activates the "Bathrooms" category chip, OR
  - The user zooms to street-level (zoom level 16+).
- Tapping a bathroom pin opens a compact detail card (smaller than the full detail panel — just the essentials: name, status, hours, amenities, top tip, and "Get Directions").

---

### 7. Happening Now

Not a separate tab — it's a **map mode**.

- Activated via the lightning bolt toggle button on the map.
- When active, the map fades out all pins except events currently in progress or starting within 2 hours.
- Active "Happening Now" pins pulse with a subtle animation.
- Bottom sheet updates to show only these events, sorted by:
  - Proximity to user (if location permission granted), OR
  - Popularity (save count + click-through count).
- Deactivating the toggle restores the full map state.

---

### 8. Personalization

**Onboarding flow (after account creation):**
- Step 1: "What are you into?" — Pick 3+ interest categories from the full category list.
- Step 2: "Where do you hang out?" — Tap neighborhoods on a mini-map to select favorites. Optional.
- Step 3: Location permission prompt with clear explanation of proximity-based features.

**Implicit signals (collected passively):**
- Events saved, pins tapped, detail panels opened, categories browsed, neighborhoods zoomed into, tickets clicked, shares sent.

**"For You" mode:**
- A toggle or chip on the map that activates AI-ranked pin visibility: pins the user is most likely to engage with are shown larger/brighter, while less relevant pins shrink or fade.
- The bottom sheet, when "For You" is active, sorts by personalized relevance score rather than proximity.
- Users can reset or update preferences at any time in Settings.

---

### 9. Saved Events & Reminders

**Saved list:**
- Accessible via a bookmark icon in the top-right corner of the map.
- Opens a full-screen overlay showing saved events, attractions, and landmarks organized by date (upcoming first).
- Each saved item shows a mini-map thumbnail of its location.
- Tapping a saved item dismisses the overlay, flies the map to that pin, and opens its detail panel.
- "Show All on Map" button: highlights only saved items as pins, dimming everything else.

**Reminders:**
- When saving an event, user is prompted: "Remind me?" with options: 2 hours before, 1 day before, 1 week before.
- Push notification includes event name, time, venue, and a "Get Directions" deep-link.

---

### 10. Search

Search is the primary non-spatial navigation method and sits at the top of the map.

**Behavior:**
- Tapping the search bar opens a full-screen search overlay with:
  - Recent searches.
  - Trending events (top 5 by saves/clicks in the last 24 hours).
  - Suggested categories.
- As the user types, results appear in real-time (debounced 300ms) grouped by type: Events, Attractions, Landmarks, Neighborhoods, Venues.
- Selecting a result:
  - If it's a point (event, attraction, landmark, bathroom): flies the map to that pin and opens its detail panel.
  - If it's an area (neighborhood): flies the map to that neighborhood and highlights its boundary overlay.
  - If it's a venue: flies to the venue location and shows all events at that venue in the bottom sheet.
- Search indexes: event titles, event descriptions, venue names, attraction names, landmark names, neighborhood names, vibe labels.

---

### 11. User Accounts

**Authentication:**
- Sign up / log in via email, Google, or Apple.
- Guest browsing allowed — full map interaction, search, and filtering. No saves, personalization, reminders, or tip submissions.

**Account required for:**
- Saving events / attractions / landmarks.
- Setting preferences and receiving personalized recommendations.
- Push notification reminders.
- Submitting tips, ratings, and bathroom status updates.
- Voting on vibe labels and tips.

---

### 12. Browse & Discover (Supporting the Map)

While the map is primary, the bottom sheet card list provides a structured browse experience within the map context.

**Card format in the bottom sheet:**
- Compact horizontal card: thumbnail (left), title + venue + time + price + category badge (right).
- Tapping any card flies the map to its pin and opens the detail panel.
- Cards are color-accented on the left border by content type (purple/amber/blue/rose) matching pin colors.

**Sorting options (in bottom sheet header):**
- Nearest (default when location available)
- Soonest (by start time)
- Popular (by saves + clicks)
- For You (personalized, requires account)

---

## Map Interaction Summary

| Action | Result |
|---|---|
| Pan / zoom the map | Pins update dynamically to show content in the viewport. Bottom sheet count and list update. |
| Tap a pin | Map centers on pin. Detail panel slides up from bottom. |
| Tap a cluster | Map zooms in to reveal individual pins. |
| Tap a neighborhood overlay | Neighborhood detail panel opens with "What's happening here." |
| Long-press a spot on the map | Shows nearest events/places within 0.25 miles in a quick-look popover. |
| Activate "Happening Now" | Non-active events fade. Active event pins pulse. |
| Activate "For You" | Pin sizes/brightness reflect personal relevance. |
| Search and select a result | Map flies to location. Detail panel opens. |
| Tap "Show All on Map" in Saved | Only saved items visible. All other pins dimmed. |
| Tap category chip | Only that category's pins visible. Others hidden. |
| Tap neighborhood in filter | Map flies to neighborhood. Boundary overlay shown. |

---

## Non-Functional Requirements

- **Performance:** Map should render up to 10,000 pins via clustering without frame drops. Pin updates on pan/zoom should complete within 200ms.
- **Offline:** Cache last-viewed map region and event data for offline access. Show "Last updated" timestamp.
- **Accessibility:** All map interactions must have equivalent non-map pathways via the bottom sheet card list. VoiceOver/TalkBack support for pins and detail panels.
- **Privacy:** Location data used only for proximity sorting. Never shared with third parties. Clear opt-out in Settings.
- **Platform:** Mobile-first (iOS + Android via React Native or web PWA). Desktop web supported with the same map-first layout.

---

## Design Principles

1. **The map is the product.** If it's not on the map, it doesn't exist in Stoops.
2. **Spatial over sequential.** Users discover by exploring a place, not scrolling a list.
3. **One tap to detail.** Every pin is one tap away from full information.
4. **Layers, not pages.** Content types are map layers the user toggles — not separate screens to navigate between.
5. **The city is always visible.** Detail panels and sheets overlay the map; they never fully replace it.
