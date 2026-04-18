import axios from 'axios';
import { StandardEvent } from '../types/event';

const SODA_URL = 'https://data.cityofnewyork.us/resource/buis-pvji.json';

interface SodaLandmark {
  the_geom?: {
    type: string;
    coordinates: number[][][][];
  };
  objectid: string;
  borough: string;
  address: string;
  lpc_name: string;
  lpc_lpnumb: string;
  lpc_sitest: string;
  lpc_altern?: string;
  desdate: string;
  url_report?: string;
}

const BOROUGH_NAMES: Record<string, string> = {
  MN: 'Manhattan',
  BK: 'Brooklyn',
  QN: 'Queens',
  BX: 'Bronx',
  SI: 'Staten Island',
};

/**
 * Compute the centroid of a GeoJSON MultiPolygon by averaging all coordinates.
 */
function computeCentroid(geom: SodaLandmark['the_geom']): { lat: number; lng: number } | null {
  if (!geom?.coordinates?.length) return null;

  let sumLng = 0;
  let sumLat = 0;
  let count = 0;

  for (const polygon of geom.coordinates) {
    for (const ring of polygon) {
      for (const [lng, lat] of ring) {
        sumLng += lng;
        sumLat += lat;
        count++;
      }
    }
  }

  if (count === 0) return null;
  return { lat: sumLat / count, lng: sumLng / count };
}

export async function fetchNYCLandmarks(): Promise<StandardEvent[]> {
  const response = await axios.get<SodaLandmark[]>(SODA_URL, {
    params: {
      $where: "lpc_sitest='Designated'",
      $limit: 2000,
    },
  });

  return response.data
    .map((lm): StandardEvent | null => {
      const center = computeCentroid(lm.the_geom);
      if (!center) return null;

      const borough = BOROUGH_NAMES[lm.borough] ?? lm.borough;

      return {
        id: `lm-${lm.objectid}`,
        title: lm.lpc_name,
        date: '',
        venue: borough,
        address: lm.address || '',
        lat: center.lat,
        lng: center.lng,
        price: null,
        imageUrl: null,
        url: lm.url_report || `https://www.google.com/search?q=${encodeURIComponent(lm.lpc_name + ' NYC')}`,
        source: 'nyc-open-data',
        category: 'Landmark',
        designation: lm.desdate ? new Date(lm.desdate).getFullYear().toString() : undefined,
        alternateName: lm.lpc_altern || undefined,
      };
    })
    .filter((e): e is StandardEvent => e !== null);
}
