/**
 * Normalizes raw category values from different event aggregators
 * into the standard app categories used by the frontend.
 *
 * App categories: Music, Food & Drink, Art & Culture, Comedy,
 *                 Nightlife, Sports, Community, Family
 */

// ---------- Ticketmaster ----------
// Segment names and genre names → app category
const TICKETMASTER_SEGMENT_MAP: Record<string, string> = {
  'music': 'Music',
  'sports': 'Sports',
  'arts & theatre': 'Art & Culture',
  'film': 'Art & Culture',
  'miscellaneous': '',  // fall through to genre or title
  'undefined': '',
};

const TICKETMASTER_GENRE_MAP: Record<string, string> = {
  'comedy': 'Comedy',
  'family': 'Family',
  "children's theatre": 'Family',
  'dance': 'Nightlife',
  'hip-hop/rap': 'Music',
  'r&b': 'Music',
  'jazz': 'Music',
  'classical': 'Music',
  'rock': 'Music',
  'pop': 'Music',
  'country': 'Music',
  'alternative': 'Music',
  'metal': 'Music',
  'electronic': 'Nightlife',
  'world': 'Music',
  'latin': 'Music',
  'folk': 'Music',
  'blues': 'Music',
  'soul': 'Music',
  'reggae': 'Music',
  'punk': 'Music',
  'new age': 'Music',
  'club/dance': 'Nightlife',
  'basketball': 'Sports',
  'football': 'Sports',
  'baseball': 'Sports',
  'hockey': 'Sports',
  'soccer': 'Sports',
  'tennis': 'Sports',
  'golf': 'Sports',
  'boxing': 'Sports',
  'wrestling': 'Sports',
  'mma/fighting': 'Sports',
  'motorsports/racing': 'Sports',
  'equestrian': 'Sports',
  'volleyball': 'Sports',
  'cricket': 'Sports',
  'rugby': 'Sports',
  'theatre': 'Art & Culture',
  'musical': 'Art & Culture',
  'opera': 'Art & Culture',
  'cirque du soleil': 'Art & Culture',
  'magic & illusion': 'Art & Culture',
  'fine art': 'Art & Culture',
  'performance art': 'Art & Culture',
  'community/civic': 'Community',
  'community': 'Community',
  'cultural': 'Community',
  'food & drink': 'Food & Drink',
  'food': 'Food & Drink',
  'dining': 'Food & Drink',
};

export function normalizeTicketmasterCategory(
  segmentName?: string,
  genreName?: string,
  subGenreName?: string,
): string | null {
  // Try genre first for more specific matches (e.g., "Comedy" under "Arts & Theatre")
  if (genreName) {
    const genreMatch = TICKETMASTER_GENRE_MAP[genreName.toLowerCase()];
    if (genreMatch) return genreMatch;
  }

  if (subGenreName) {
    const subMatch = TICKETMASTER_GENRE_MAP[subGenreName.toLowerCase()];
    if (subMatch) return subMatch;
  }

  // Then try segment
  if (segmentName) {
    const segMatch = TICKETMASTER_SEGMENT_MAP[segmentName.toLowerCase()];
    if (segMatch) return segMatch;
    // If segment mapped to empty string, it's intentionally unresolved
  }

  return null;
}

// ---------- SeatGeek ----------
const SEATGEEK_TYPE_MAP: Record<string, string> = {
  'concert': 'Music',
  'concerts': 'Music',
  'music_festival': 'Music',
  'classical': 'Music',
  'classical_opera': 'Music',
  'classical_vocal': 'Music',
  'classical_orchestral_instrumental': 'Music',

  'comedy': 'Comedy',
  'comedians': 'Comedy',

  'sports': 'Sports',
  'nfl': 'Sports',
  'nba': 'Sports',
  'mlb': 'Sports',
  'nhl': 'Sports',
  'mls': 'Sports',
  'ncaa_football': 'Sports',
  'ncaa_basketball': 'Sports',
  'ncaa_baseball': 'Sports',
  'ncaa_hockey': 'Sports',
  'ncaa_womens_basketball': 'Sports',
  'ncaa_soccer': 'Sports',
  'minor_league_baseball': 'Sports',
  'minor_league_hockey': 'Sports',
  'boxing': 'Sports',
  'mma': 'Sports',
  'fighting': 'Sports',
  'wrestling': 'Sports',
  'tennis': 'Sports',
  'golf': 'Sports',
  'soccer': 'Sports',
  'horse_racing': 'Sports',
  'auto_racing': 'Sports',
  'extreme_sports': 'Sports',
  'pga': 'Sports',
  'lpga': 'Sports',
  'wnba': 'Sports',
  'european_soccer': 'Sports',
  'world_cup': 'Sports',
  'rugby': 'Sports',
  'cricket': 'Sports',
  'lacrosse': 'Sports',
  'volleyball': 'Sports',

  'theater': 'Art & Culture',
  'broadway_tickets_national': 'Art & Culture',
  'cirque_du_soleil': 'Art & Culture',
  'musical': 'Art & Culture',
  'plays': 'Art & Culture',
  'opera': 'Art & Culture',
  'film': 'Art & Culture',

  'dance_performance_tour': 'Nightlife',
  'dance': 'Nightlife',

  'family': 'Family',
  'kids': 'Family',
  'disney_on_ice': 'Family',
  'animal_attraction': 'Family',
  'circus': 'Family',

  'food_and_drink': 'Food & Drink',
  'food': 'Food & Drink',
  'wine': 'Food & Drink',
  'beer_festival': 'Food & Drink',

  'literary': 'Community',
  'conference': 'Community',
  'charity': 'Community',
  'politics': 'Community',
  'meetup': 'Community',
};

export function normalizeSeatGeekCategory(type?: string): string | null {
  if (!type) return null;
  return SEATGEEK_TYPE_MAP[type.toLowerCase()] ?? null;
}

// ---------- Eventbrite ----------
// Eventbrite category IDs: https://www.eventbrite.com/platform/api#/reference/categories
const EVENTBRITE_CATEGORY_MAP: Record<string, string> = {
  '103': 'Music',
  '104': 'Art & Culture',       // Film, Media & Entertainment
  '105': 'Art & Culture',       // Performing & Visual Arts
  '108': 'Sports',              // Sports & Fitness
  '110': 'Food & Drink',
  '111': 'Community',           // Charity & Causes
  '112': 'Community',           // Government & Politics
  '113': 'Community',           // Community & Culture
  '114': 'Community',           // Religion & Spirituality
  '115': 'Family',              // Family & Education
  '116': 'Community',           // Seasonal & Holiday
  '101': 'Community',           // Business & Professional
  '102': 'Community',           // Science & Technology
  '106': 'Nightlife',           // Fashion & Beauty
  '107': 'Community',           // Health & Wellness
  '109': 'Community',           // Travel & Outdoor
  '117': 'Community',           // Home & Lifestyle
  '119': 'Community',           // Hobbies & Special Interest
};

// Eventbrite subcategory IDs for finer-grained mapping
const EVENTBRITE_SUBCATEGORY_MAP: Record<string, string> = {
  // Under 103 Music
  '3001': 'Music',     // Alternative
  '3002': 'Music',     // Blues & Jazz
  '3003': 'Music',     // Country
  '3006': 'Music',     // Hip Hop / Rap
  '3007': 'Music',     // Indie
  '3011': 'Music',     // Pop
  '3012': 'Music',     // R&B
  '3013': 'Music',     // Rock
  '3004': 'Nightlife', // DJ / Dance
  '3005': 'Nightlife', // EDM / Electronic

  // Under 104 Film & Media
  '4001': 'Comedy',    // Comedy
  '4003': 'Art & Culture', // Film
  '4004': 'Nightlife', // Gaming
  '4005': 'Art & Culture', // TV

  // Under 105 Performing Arts
  '5001': 'Comedy',    // Comedy
  '5002': 'Art & Culture', // Craft
  '5003': 'Art & Culture', // Dance
  '5004': 'Art & Culture', // Fine Art
  '5005': 'Art & Culture', // Literary Arts
  '5006': 'Art & Culture', // Musical
  '5007': 'Art & Culture', // Opera
  '5008': 'Art & Culture', // Theatre
};

export function normalizeEventbriteCategory(
  categoryId?: string,
  subcategoryId?: string,
): string | null {
  // Try subcategory first for more specific matches
  if (subcategoryId) {
    const subMatch = EVENTBRITE_SUBCATEGORY_MAP[subcategoryId];
    if (subMatch) return subMatch;
  }

  if (!categoryId) return null;
  return EVENTBRITE_CATEGORY_MAP[categoryId] ?? null;
}

// ---------- Title-based fallback ----------
const TITLE_KEYWORDS: [RegExp, string][] = [
  [/\b(concert|live music|dj set|band|singer|rapper|hip.?hop|jazz|blues|rock|pop|country|folk|orchestra|symphony|choir|karaoke)\b/i, 'Music'],
  [/\b(comedy|stand.?up|improv|open mic|roast|sketch)\b/i, 'Comedy'],
  [/\b(game|match|tournament|championship|playoffs|vs\.?|boxing|fight night|wrestling|mma|ufc)\b/i, 'Sports'],
  [/\b(art|gallery|exhibit|museum|theater|theatre|ballet|opera|dance show|film screening|book reading|poetry|literary)\b/i, 'Art & Culture'],
  [/\b(food|tasting|brunch|dinner|cocktail|wine|beer|happy hour|chef|cooking class|supper club|food truck)\b/i, 'Food & Drink'],
  [/\b(club night|nightclub|rave|afterparty|after party|late night|dance party|glow party)\b/i, 'Nightlife'],
  [/\b(kids|children|family|toddler|puppet|storytime|story time)\b/i, 'Family'],
  [/\b(volunteer|community|fundraiser|charity|workshop|meetup|meet.?up|networking|town hall|rally|march|cleanup|block party)\b/i, 'Community'],
];

export function inferCategoryFromTitle(title: string): string | null {
  for (const [pattern, category] of TITLE_KEYWORDS) {
    if (pattern.test(title)) return category;
  }
  return null;
}
