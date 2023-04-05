import { enhancedFetch } from '../lib/network'
import { Nominatim } from '../types/nominatim'

const NOMINATIM_API = 'https://nominatim.openstreetmap.org'
const SEARCH_ENDPOINT = `${NOMINATIM_API}/search`
const REVERSE_SEARCH_ENDPOINT = `${NOMINATIM_API}/reverse`

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

export async function geocode(
  query: string,
  limit = 3
): Promise<Nominatim.GeoJSON> {
  const searchParams = new URLSearchParams([
    ['q', query],
    ['format', 'geojson'],
    ['adressdetails', '1'],
    ['limit', String(limit)],
    ['polygon_geojson', '1']
  ])

  return enhancedFetch([SEARCH_ENDPOINT, searchParams].join('?'))
}
