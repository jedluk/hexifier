import { LineString, MultiPolygon, Point, Polygon } from './index'
/* eslint-disable @typescript-eslint/no-namespace */
export namespace Nominatim {
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
    geojson: Point | LineString | Polygon | MultiPolygon
  }

  export interface OSMElementGeoJSON {
    type: 'Feature'
    properties: Omit<OSMElement, 'geojson'>
    bbox: [number, number, number, number]
    geometry: Point | Polygon | MultiPolygon
  }

  export interface GeoJSON {
    features: OSMElementGeoJSON[]
    licence: 'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright'
    type: 'FeatureCollection'
  }
}
