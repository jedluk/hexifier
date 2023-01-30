/* eslint-disable @typescript-eslint/no-namespace */
export namespace Nominatim {
  type NominatimGeoJSON =
    | {
        type: 'MultiPolygon'
        coordinates: [number, number][][][]
      }
    | {
        type: 'Polygon'
        coordinates: [number, number][][]
      }

  export interface AddressDetails {
    house_number?: string
    road?: string
    neighbourhood: string
    suburb?: string
    borough: string
    city: string
    state: string
    postcode?: string
    country: string
    country_code: string
  }

  export interface OSMElement {
    place_id: number
    licence: string
    osm_id: number
    osm_type: 'node' | 'way' | 'relation'
    boundingbox: [string, string, string, string]
    display_name: string
    lat: string
    lon: string
    address: AddressDetails
    importance: number
    addresstype: string
    geojson: NominatimGeoJSON
  }
}
