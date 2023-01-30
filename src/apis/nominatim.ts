import { enhancedFetch } from '../lib/network'
import { Nominatim } from '../types/nominatim'

const REVERSE_SEARCH_ENDPOINT = 'https://nominatim.openstreetmap.org/reverse'

export async function reverseGeocode(
  lat: number,
  lon: number,
  zoom = 10
): Promise<Nominatim.OSMElement> {
  const search = new URLSearchParams()

  search.append('lat', String(lat))
  search.append('lon', String(lon))
  search.append('format', 'jsonv2')
  search.append('polygon_geojson', '1')
  search.append('limit', '1')
  search.append('zoom', String(zoom))

  return enhancedFetch([REVERSE_SEARCH_ENDPOINT, search].join('?'))
}
